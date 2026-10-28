import { describe, it } from 'node:test';
import assert from 'node:assert';

import { evaluateResponses, pickJudgeModel } from '../services/criticEngine.js';
import { DEFAULT_JUDGE_TIMEOUT_MS } from '../services/evaluation/llmJudge.js';
import { analyzePrompt } from '../services/analysisEngine.js';
import { refinePrompt } from '../services/refinementEngine.js';
import { getTaskValidator, CodingTaskValidator, checkJavaScriptSyntax, checkPythonSyntax } from '../services/evaluation/taskValidators.js';
import { isCodeRequested } from '../services/evaluation/ruleValidator.js';

const R = (modelId, text, extra = {}) => ({ modelId, modelName: modelId, text, status: 'success', isLive: true, isSimulated: false, ...extra });

// Evaluates the way the app does: analysis + rule-refined prompt, no LLM judge
async function evaluate(prompt, responses) {
  const analysis = analyzePrompt(prompt);
  const refined = refinePrompt(prompt, analysis).refinedPrompt;
  return evaluateResponses(prompt, refined, responses, {}, { analysis, llmService: { hasCredentials: () => false } });
}
const byId = (ev, id) => ev.evaluations.find(e => e.modelId === id);

const GOOD_CODE = "```javascript\nfunction reverseString(str) {\n  if (typeof str !== 'string') throw new TypeError('Expected a string');\n  return Array.from(str).reverse().join('');\n}\nconsole.log(reverseString('hello')); // 'olleh'\n```\nEmpty input returns ''; invalid input throws.";
const BROKEN_CODE = "```javascript\nfunction reverseString(str {\n  return str.split('').reverse().join(''\n```";

describe('Critic evaluation', () => {
  it('runs the coding validator for the "Coding" category', () => {
    assert.ok(getTaskValidator('Coding') instanceof CodingTaskValidator);
  });

  it('flags broken code and ranks working code first', async () => {
    const ev = await evaluate('Write a JavaScript function to reverse a string and handle edge cases', [R('broken', BROKEN_CODE), R('good', GOOD_CODE)]);
    assert.strictEqual(ev.winner.modelId, 'good');
    assert.ok(byId(ev, 'broken').issues.some(i => /Unbalanced code syntax/.test(i.description)));
  });

  it('penalizes a refusal but not an answer that mentions a limitation', async () => {
    const ev = await evaluate('Give me tips for better sleep', [
      R('refusal', "I'm sorry, but I can't help with that request."),
      R('real', 'Keep a consistent schedule, avoid screens before bed, limit caffeine after noon and keep the room cool and dark.')
    ]);
    assert.strictEqual(ev.winner.modelId, 'real');
    assert.ok(byId(ev, 'refusal').issues.some(i => /declined to answer/.test(i.description)));

    const honest = await evaluate('What is the weather in Paris today?', [R('honest', "I can't access live weather data, but a weather app will have it. Late October highs in Paris are usually around 14°C.")]);
    assert.ok(!byId(honest, 'honest').issues.some(i => /declined to answer/.test(i.description)));
  });

  it('checks an explicit item count', async () => {
    const ev = await evaluate('List exactly 3 benefits of exercise as bullet points', [
      R('five', '- Better heart health\n- Improved mood\n- Stronger muscles\n- Better sleep\n- More energy'),
      R('three', '- Better heart health\n- Improved mood\n- Stronger muscles')
    ]);
    assert.strictEqual(ev.winner.modelId, 'three');
    assert.ok(byId(ev, 'five').issues.some(i => /asked for 3 benefits, but the response lists 5/.test(i.description)));
  });

  it('checks a word limit, ignoring code blocks', async () => {
    const long = 'Photosynthesis is the process by which green plants, algae and some bacteria use sunlight, water and carbon dioxide to produce glucose and oxygen. It happens mainly in chloroplasts, where chlorophyll absorbs light energy that drives the Calvin cycle.';
    const ev = await evaluate('Explain photosynthesis in under 30 words', [R('long', long), R('short', 'Plants use sunlight, water and carbon dioxide to make glucose and release oxygen, mainly in chloroplasts.')]);
    assert.strictEqual(ev.winner.modelId, 'short');
    assert.ok(byId(ev, 'long').issues.some(i => /30-word limit/.test(i.description)));
  });

  it('does not treat refinement suggestions as user requirements', async () => {
    const ev = await evaluate('Write a JavaScript function to reverse a string and handle edge cases', [R('good', GOOD_CODE)]);
    assert.ok(!byId(ev, 'good').issues.some(i => /Complexity Analysis/.test(i.description)));
  });

  it('parses JavaScript without executing it, catching errors the bracket check misses', async () => {
    globalThis.__criticRan = false;
    assert.deepStrictEqual(checkJavaScriptSyntax('globalThis.__criticRan = true;'), { valid: true });
    assert.strictEqual(globalThis.__criticRan, false);
    assert.strictEqual(checkJavaScriptSyntax("import fs from 'fs';\nexport default async function f() { return await fs; }").valid, true);
    assert.strictEqual(checkJavaScriptSyntax('function f() { return await g(); }').valid, false);
    assert.strictEqual(checkJavaScriptSyntax('function f() { return 1 +; }').valid, false);

    const ev = await evaluate('Write a JavaScript function to reverse a string and handle edge cases', [
      R('bad', "```javascript\nfunction reverseString(str) {\n  if (typeof str !== 'string') return '';\n  return str.split('').reverse().join('') +;\n}\n```"),
      R('good', GOOD_CODE)
    ]);
    assert.strictEqual(ev.winner.modelId, 'good');
    assert.ok(byId(ev, 'bad').issues.some(i => /does not parse/.test(i.description)));
  });

  it('reports rule-only scoring as deterministic, and degraded only when a requested judge did not run', async () => {
    const prompt = 'Explain recursion';
    const resp = [R('a', 'Recursion is when a function calls itself on a smaller input until it reaches a base case.')];
    const off = await evaluateResponses(prompt, '', resp, {}, { analysis: analyzePrompt(prompt) });
    assert.strictEqual(off.evaluationStatus, 'deterministic_only');
    const on = await evaluateResponses(prompt, '', resp, {}, { analysis: analyzePrompt(prompt), options: { enableLLMJudge: true }, llmService: { hasCredentials: () => false } });
    assert.strictEqual(on.evaluationStatus, 'degraded');
  });

  it('flags an off-topic answer but not a relevant one that uses different words', async () => {
    const ev = await evaluate('Explain how photosynthesis works in plants', [
      R('offtopic', 'Football is played by two teams of eleven players on a rectangular field. Each team tries to score by getting the ball into the opposing goal. Matches last ninety minutes with a halftime break, and the referee enforces the rules.'),
      R('ontopic', 'Photosynthesis lets plants turn light into chemical energy: chlorophyll absorbs sunlight, water is split and oxygen released, and the Calvin cycle fixes carbon dioxide into glucose.')
    ]);
    assert.strictEqual(ev.winner.modelId, 'ontopic');
    assert.ok(byId(ev, 'offtopic').issues.some(i => i.category === 'off_topic'));

    const brief = await evaluate('Explain photosynthesis in under 30 words', [R('a', 'Plants use sunlight, water and carbon dioxide to make glucose and release oxygen, mainly in chloroplasts.')]);
    assert.ok(!byId(brief, 'a').issues.some(i => i.category === 'off_topic'));
  });

  it('accepts a short direct answer to a short question and prefers it over padding', async () => {
    const ev = await evaluate('What is 12 multiplied by 12?', [
      R('padded', 'Great question! Multiplication is one of the four basic operations of arithmetic. It can be thought of as repeated addition. People have used it for thousands of years in trade and engineering. Anyway, the answer is 144.'),
      R('concise', '12 × 12 = 144.')
    ]);
    assert.strictEqual(ev.winner.modelId, 'concise');
    assert.ok(!byId(ev, 'concise').issues.some(i => i.isCritical));
  });

  it('only expects code when the prompt asks for code', () => {
    assert.strictEqual(isCodeRequested('Give me 5 tips for learning to code'), false);
    assert.strictEqual(isCodeRequested('Explain what a closure is in JavaScript'), false);
    assert.strictEqual(isCodeRequested('Show me how to code a linked list in C'), true);
    assert.strictEqual(isCodeRequested('Write a Python function to compute factorial'), true);
    assert.strictEqual(isCodeRequested('Write a C program to check whether a number is prime'), true);
  });

  it('refines conceptual coding questions without demanding a full program', () => {
    const prompt = 'Explain what a closure is in JavaScript';
    const refined = refinePrompt(prompt, analyzePrompt(prompt)).refinedPrompt;
    assert.match(refined, /short code example/);
    assert.doesNotMatch(refined, /runnable code|time and space complexity/);
  });
});

// Mock provider for the judge: grades by looking for a known wrong fact, optionally slow or failing
function mockJudgeLlm({ available = ['gemini-2-5-flash'], delayMs = 0, fail = false } = {}) {
  const calls = [];
  return {
    calls,
    hasCredentials: id => available.includes(id),
    async generateSingle(model, prompt) {
      calls.push({ model: model.id, at: Date.now() });
      if (delayMs) await new Promise(r => setTimeout(r, delayMs));
      if (fail) return { status: 'error', errorMessage: 'Quota exceeded for this API key.', text: '[Error from judge]' };
      const wrong = /UNTRUSTED CANDIDATE RESPONSE TO EVALUATE\]:\s*"""[^"]*\bis Sydney\b/.test(prompt);
      return {
        status: 'success', isLive: true, isSimulated: false,
        text: JSON.stringify({
          scores: wrong
            ? { correctness: 10, relevance: 80, completeness: 70, clarity: 85, instructionFollowing: 80 }
            : { correctness: 95, relevance: 95, completeness: 90, clarity: 90, instructionFollowing: 95 },
          strengths: [], weaknesses: wrong ? ['States the wrong capital.'] : [],
          diagnosticIssues: wrong ? [{ category: 'factual_error', severity: 'critical', description: 'Canberra, not Sydney, is the capital.', evidence: 'Sydney', recommendedCorrection: 'Say Canberra.' }] : [],
          verdict: wrong ? 'Factually wrong.' : 'Correct.'
        })
      };
    }
  };
}

const CAPITAL_PROMPT = 'What is the capital of Australia?';
const CAPITAL_ANSWERS = [
  R('wrong', 'The capital of Australia is Sydney, its largest city and home to the Opera House.'),
  R('right', 'The capital of Australia is Canberra, chosen as a compromise between Sydney and Melbourne.')
];
const judged = (llm, options = {}) => evaluateResponses(CAPITAL_PROMPT, '', CAPITAL_ANSWERS, {}, {
  analysis: analyzePrompt(CAPITAL_PROMPT), llmService: llm, options: { enableLLMJudge: true, ...options }
});

describe('LLM judge', () => {
  it('catches a factual error the rule checks cannot see', async () => {
    const ev = await judged(mockJudgeLlm());
    assert.strictEqual(ev.evaluationStatus, 'complete');
    assert.strictEqual(ev.winner.modelId, 'right');
    const wrong = byId(ev, 'wrong');
    assert.ok(wrong.issues.some(i => i.category === 'factual_error' && i.isCritical));
    assert.strictEqual(wrong.isEligible, false);
  });

  it('grades answers in parallel', async () => {
    const llm = mockJudgeLlm({ delayMs: 150 });
    const started = Date.now();
    await judged(llm);
    assert.strictEqual(llm.calls.length, 2);
    assert.ok(Math.abs(llm.calls[0].at - llm.calls[1].at) < 100, 'both judge calls should start together');
    assert.ok(Date.now() - started < 290, 'two 150 ms calls should not run back to back');
  });

  it('allows slow providers by default and reports a real timeout clearly', async () => {
    assert.ok(DEFAULT_JUDGE_TIMEOUT_MS >= 30000);
    const ev = await judged(mockJudgeLlm({ delayMs: 200 }), { judgeTimeoutMs: 50 });
    assert.strictEqual(ev.evaluationStatus, 'degraded');
    assert.match(byId(ev, 'right').judgeDetails.reason, /timed out after 50ms/);
  });

  it('reports the provider error instead of trying to grade with it', async () => {
    const ev = await judged(mockJudgeLlm({ fail: true }));
    assert.strictEqual(ev.evaluationStatus, 'degraded');
    assert.match(byId(ev, 'right').judgeDetails.reason, /Quota exceeded/);
  });

  it('falls back to another model with a key when Gemini has none', async () => {
    assert.strictEqual(pickJudgeModel(null, { hasCredentials: id => id === 'llama-3-3-70b' }), 'llama-3-3-70b');
    assert.strictEqual(pickJudgeModel('gpt-4o', { hasCredentials: () => false }), 'gpt-4o');
    const llm = mockJudgeLlm({ available: ['llama-3-3-70b'] });
    const ev = await judged(llm);
    assert.strictEqual(ev.evaluationStatus, 'complete');
    assert.ok(llm.calls.every(c => c.model === 'llama-3-3-70b'));
  });
});

// Judge mock with a custom grading function
function scriptedJudge({ available = ['gemini-2-5-flash'], grade }) {
  const calls = [];
  return {
    calls,
    hasCredentials: id => available.includes(id),
    async generateSingle(model, prompt) {
      const answer = prompt.split('[UNTRUSTED CANDIDATE RESPONSE TO EVALUATE]:')[1] || '';
      calls.push({ judge: model.id, answer });
      return { status: 'success', isLive: true, isSimulated: false, text: JSON.stringify(grade(answer)) };
    }
  };
}
const ALL_95 = { scores: { correctness: 95, relevance: 95, completeness: 95, clarity: 95, instructionFollowing: 95 }, diagnosticIssues: [] };

describe('Evaluation in more situations', () => {
  it('keeps verified rule findings when the judge misses them', async () => {
    const prompt = 'List exactly 3 benefits of exercise as bullet points';
    const ev = await evaluateResponses(prompt, '', [
      R('five', '- Better heart health\n- Improved mood\n- Stronger muscles\n- Better sleep\n- More energy'),
      R('three', '- Better heart health\n- Improved mood\n- Stronger muscles')
    ], {}, { analysis: analyzePrompt(prompt), llmService: scriptedJudge({ grade: () => ALL_95 }), options: { enableLLMJudge: true } });
    assert.strictEqual(ev.evaluationStatus, 'complete');
    assert.strictEqual(ev.winner.modelId, 'three');
    assert.ok(byId(ev, 'five').scores.instructionFollowing < 95);
  });

  it('never lets a model grade its own answer when another model has a key', async () => {
    const llm = scriptedJudge({ available: ['gemini-2-5-flash', 'llama-3-3-70b'], grade: () => ALL_95 });
    const prompt = 'Explain recursion';
    await evaluateResponses(prompt, '', [
      R('gemini-2-5-flash', 'Recursion is when a function calls itself on a smaller input until it reaches a base case.'),
      R('llama-3-3-70b', 'A recursive function solves a problem by calling itself on smaller pieces, stopping at a base case.')
    ], {}, { analysis: analyzePrompt(prompt), llmService: llm, options: { enableLLMJudge: true } });
    const judgeOf = text => llm.calls.find(c => c.answer.includes(text)).judge;
    assert.strictEqual(judgeOf('Recursion is when'), 'llama-3-3-70b');
    assert.strictEqual(judgeOf('A recursive function'), 'gemini-2-5-flash');
  });

  it('rejects judge output with missing scores instead of filling in 50', async () => {
    const llm = scriptedJudge({ grade: () => ({ scores: { correctness: 90, relevance: 90, completeness: 90, instructionFollowing: 90 } }) });
    const ev = await evaluateResponses('Explain recursion', '', [R('a', 'Recursion is a function calling itself until a base case.')], {},
      { analysis: analyzePrompt('Explain recursion'), llmService: llm, options: { enableLLMJudge: true } });
    assert.strictEqual(ev.evaluationStatus, 'degraded');
    assert.match(byId(ev, 'a').judgeDetails.reason, /missing scores: clarity/);
  });

  it('says when answers to a factual question disagree, and stays quiet when they agree', async () => {
    const ask = (prompt, texts) => evaluate(prompt, texts.map((t, i) => R(`m${i}`, t)));
    const disagree = await ask('What is the capital of Australia?', ['The capital of Australia is Sydney.', 'The capital of Australia is Canberra.']);
    assert.ok(disagree.conflictsDetected.some(c => c.type === 'answer_disagreement'));
    assert.match(disagree.recommendationReason, /does not confirm which one is correct/);

    // The right answer mentioning the wrong option in a side remark is still a disagreement
    const sideRemark = await ask('What is the capital of Australia?', [
      'The capital of Australia is Sydney, its largest city and home to the Opera House.',
      'The capital of Australia is Canberra, a planned city chosen as a compromise between Sydney and Melbourne.'
    ]);
    assert.ok(sideRemark.conflictsDetected.some(c => c.type === 'answer_disagreement'));

    const numbers = await ask('What is 12 multiplied by 12?', ['Great question! The answer is 124.', '12 × 12 = 144.']);
    assert.ok(numbers.conflictsDetected.some(c => c.type === 'answer_disagreement'));

    for (const [prompt, texts] of [
      ['What is the capital of France?', ['The capital of France is Paris.', 'Paris is the capital of France, on the Seine.']],
      ['How many continents are there?', ['There are 7 continents.', 'There are seven continents.']],
      ['Who wrote Hamlet?', ['William Shakespeare wrote Hamlet.', 'Hamlet was written by Shakespeare.']]
    ]) {
      const ev = await ask(prompt, texts);
      assert.ok(!ev.conflictsDetected.some(c => c.type === 'answer_disagreement'), prompt);
    }
  });

  it('checks requested formats and response language', async () => {
    const fails = async (prompt, text) => byId(await evaluate(prompt, [R('a', text)]), 'a').issues.some(i => i.category === 'format_violation');
    assert.strictEqual(await fails('Compare Python and Java in a table', 'Python is dynamic; Java is static.'), true);
    assert.strictEqual(await fails('Compare Python and Java in a table', '| Feature | Python | Java |\n|---|---|---|\n| Typing | Dynamic | Static |'), false);
    assert.strictEqual(await fails('Give the steps as a numbered list', '- Open the file\n- Save it'), true);
    assert.strictEqual(await fails('Explain recursion in one sentence', 'Recursion is when a function calls itself. It needs a base case.'), true);
    assert.strictEqual(await fails('Explain recursion in one sentence', 'Recursion is when a function calls itself until a base case, e.g. factorial.'), false);
    assert.strictEqual(await fails('Describe Rome in two paragraphs', 'Rome is old.\n\nRome is big.\n\nRome is in Italy.'), true);
    assert.strictEqual(await fails('Explain photosynthesis in Kannada', 'Photosynthesis is how plants turn light into energy.'), true);
    assert.strictEqual(await fails('Explain photosynthesis in Kannada', 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಎಂದರೆ ಸಸ್ಯಗಳು ಬೆಳಕನ್ನು ಶಕ್ತಿಯಾಗಿ ಬದಲಾಯಿಸುವ ಪ್ರಕ್ರಿಯೆ.'), false);
    // A question about a language is not a request to answer in it
    assert.strictEqual(await fails('What does namaste mean in Hindi?', 'It is a respectful greeting.'), false);
  });

  it('counts words in any script against a word limit', async () => {
    const ev = await evaluate('Summarize this in under 10 words', [R('a', 'यह एक बहुत लंबा उत्तर है जिसमें दस से अधिक शब्द हैं और यह सीमा तोड़ता है')]);
    assert.ok(byId(ev, 'a').issues.some(i => /10-word limit/.test(i.description)));
  });

  it('counts a missing code block once, not in two places', async () => {
    const ev = await evaluate('Write a JavaScript function to reverse a string', [R('a', 'You can reverse a string by looping over it backwards.')]);
    const a = byId(ev, 'a');
    assert.strictEqual(a.issues.filter(i => /code (fence|block)/i.test(i.description)).length, 1);
    assert.strictEqual(a.scores.correctness, 70);
  });

  it('parses Python without running it', { skip: checkPythonSyntax('x = 1') === null && 'Python is not installed' }, async () => {
    assert.match(checkPythonSyntax('def f(n):\nreturn n').error, /indented block/);
    assert.deepStrictEqual(checkPythonSyntax('import os\nos.remove("nothing")'), { valid: true });
    const ev = await evaluate('Write a Python function to add two numbers', [R('a', '```python\ndef add(a, b)\n    return a + b\n```\nHandles invalid input by raising TypeError.')]);
    assert.ok(byId(ev, 'a').issues.some(i => /Python code block does not parse/.test(i.description)));
  });
});

// Judge mock whose provider fails a set number of times per judge model before answering
function flakyJudge({ available, failures = {}, errorType = 'provider_error', grade = () => ALL_95 }) {
  const calls = [];
  const left = { ...failures };
  return {
    calls,
    hasCredentials: id => available.includes(id),
    async generateSingle(model, prompt) {
      calls.push(model.id);
      if (left[model.id] > 0) {
        left[model.id]--;
        return { status: 'error', errorType, errorMessage: 'This model is currently experiencing high demand.', text: '[Error]' };
      }
      const answer = prompt.split('[UNTRUSTED CANDIDATE RESPONSE TO EVALUATE]:')[1] || '';
      return { status: 'success', isLive: true, isSimulated: false, text: JSON.stringify(grade(answer)) };
    }
  };
}
const judgeCapital = llm => evaluateResponses(CAPITAL_PROMPT, '', CAPITAL_ANSWERS, {}, {
  analysis: analyzePrompt(CAPITAL_PROMPT), llmService: llm, options: { enableLLMJudge: true }
});

describe('LLM judge resilience', () => {
  it('retries a temporarily overloaded judge', async () => {
    const llm = flakyJudge({ available: ['gemini-2-5-flash'], failures: { 'gemini-2-5-flash': 1 } });
    const ev = await judgeCapital(llm);
    assert.strictEqual(ev.evaluationStatus, 'complete');
    assert.strictEqual(llm.calls.length, 3, 'one failed call, then two successful ones');
  });

  it('switches to another judge model when one provider stays down', async () => {
    const llm = flakyJudge({ available: ['gemini-2-5-flash', 'llama-3-3-70b'], failures: { 'gemini-2-5-flash': 99 } });
    const ev = await judgeCapital(llm);
    assert.strictEqual(ev.evaluationStatus, 'complete');
    assert.ok(ev.evaluations.every(e => e.judgeDetails.model === 'llama-3-3-70b'));
  });

  it('does not retry errors that cannot recover, such as a bad key', async () => {
    const llm = flakyJudge({ available: ['gemini-2-5-flash'], failures: { 'gemini-2-5-flash': 99 }, errorType: 'auth' });
    const ev = await judgeCapital(llm);
    assert.strictEqual(ev.evaluationStatus, 'degraded');
    assert.strictEqual(llm.calls.length, 2, 'one call per answer, no retries');
  });

  it('ranks everyone on rule scores when the judge graded only some answers', async () => {
    // The judge fails for good on the "right" answer only, and flags the wrong answer as a factual error
    let rightFailures = 2;
    const llm = {
      calls: [],
      hasCredentials: id => id === 'gemini-2-5-flash',
      async generateSingle(model, prompt) {
        const isRight = /is Canberra/.test(prompt.split('[UNTRUSTED CANDIDATE RESPONSE TO EVALUATE]:')[1] || '');
        if (isRight && rightFailures-- > 0) return { status: 'error', errorType: 'provider_error', errorMessage: 'high demand' };
        return { status: 'success', isLive: true, text: JSON.stringify(isRight ? ALL_95 : {
          scores: { correctness: 10, relevance: 80, completeness: 70, clarity: 85, instructionFollowing: 80 },
          diagnosticIssues: [{ category: 'factual_error', severity: 'critical', description: 'Canberra is the capital.' }]
        }) };
      }
    };
    const ev = await judgeCapital(llm);
    assert.strictEqual(ev.evaluationStatus, 'degraded');
    assert.match(ev.evaluationMetadata.judge.note, /graded 1 of 2 answers/);
    // Same scale for both: no judge 95s mixed with rule scores
    assert.ok(ev.evaluations.every(e => e.scores.overall < 95));
    // The judge's factual-error finding still rules the wrong answer out
    assert.strictEqual(byId(ev, 'wrong').isEligible, false);
    assert.strictEqual(ev.winner.modelId, 'right');
  });
});
