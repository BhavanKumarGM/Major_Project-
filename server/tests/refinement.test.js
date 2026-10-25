import { describe, it } from 'node:test';
import assert from 'node:assert';

import { correctPrompt } from '../services/spellingService.js';
import { analyzePrompt } from '../services/analysisEngine.js';
import { refinePrompt } from '../services/refinementEngine.js';
import { refinePromptWithAI, parseRefinerOutput } from '../services/aiRefinementService.js';
import { DEFAULT_MODELS } from '../config/models.js';

function mockLlm({ available = ['gemini-2-5-flash'], respond } = {}) {
  const calls = [];
  return {
    calls,
    hasCredentials: id => available.includes(id),
    redactSecrets: t => t,
    async generateSingle(model, prompt) {
      calls.push({ modelId: model.id, prompt });
      return respond(model, prompt);
    }
  };
}

describe('Spelling correction', () => {
  it('fixes common misspellings and keeps case', () => {
    const r = correctPrompt('give me the detail explaination for diffrent types of machine lerning');
    assert.strictEqual(r.text, 'Give me the detail explanation for different types of machine learning.');
    assert.ok(r.corrections.some(c => c.from === 'explaination' && c.to === 'explanation'));
  });

  it('handles keyboard slips, short forms, repeated words and tech casing', () => {
    assert.strictEqual(correctPrompt('wirte a pyhton fuction to calculte factorial').text, 'Write a Python function to calculate factorial.');
    assert.strictEqual(correctPrompt('i want teh the code in javascript , ok').text, 'I want the code in JavaScript, ok.');
    assert.strictEqual(correctPrompt('can u explane recursion').text, 'Can you explain recursion?');
  });

  it('never touches code, URLs, paths, identifiers or proper nouns', () => {
    const input = 'Explain how `useStaet` works and fix src/Appp.jsx, see https://exmaple.com/docs';
    assert.strictEqual(correctPrompt(input).text, input);
    assert.strictEqual(correctPrompt('Summarize the report by Jhon Smiht').text, 'Summarize the report by Jhon Smiht.');
    assert.strictEqual(correctPrompt('Write runnable code').text, 'Write runnable code.');
  });

  it('reports ambiguous words instead of guessing', () => {
    const r = correctPrompt('the gived value');
    assert.ok(!r.corrections.some(c => c.from === 'gived'));
  });
});

describe('Rule-based refinement', () => {
  it('builds on the corrected wording instead of quoting the raw prompt', () => {
    const raw = 'wirte a pyhton fuction to calculte factorial of a number';
    const r = refinePrompt(raw, analyzePrompt(raw));
    assert.ok(r.refinedPrompt.startsWith('Write a Python function to calculate factorial of a number.'));
    assert.ok(!r.refinedPrompt.includes(raw));
    assert.match(r.refinedPrompt, /Requirements:\n- Use Python\./);
    assert.ok(r.improvements[0].startsWith('Fixed spelling'));
    assert.strictEqual(r.refinementMethod, 'rules');
  });

  it('does not force Python when no language is named', () => {
    const p = 'implement a function that reverses a linked list';
    const r = refinePrompt(p, analyzePrompt(p));
    assert.ok(!/Python/.test(r.refinedPrompt));
    assert.match(r.refinedPrompt, /Choose a suitable programming language/);
  });

  it('is idempotent: refining a refined prompt adds nothing', () => {
    const p = 'explain the diffrence between tcp and udp';
    const once = refinePrompt(p, analyzePrompt(p)).refinedPrompt;
    const twice = refinePrompt(once, analyzePrompt(once)).refinedPrompt;
    assert.strictEqual(twice, once);
    assert.strictEqual((twice.match(/Requirements:/g) || []).length, 1);
  });

  it('analysis sees through typos', () => {
    assert.ok(analyzePrompt('wirte a pyhton script').technologies.includes('Python'));
  });
});

describe('AI refinement (opt-in)', () => {
  const prompt = 'give me  prompt to build a farmer dashbord';

  it('uses a live model and returns its rewrite', async () => {
    const llm = mockLlm({
      respond: m => ({
        modelId: m.id, status: 'success', isLive: true, isSimulated: false,
        text: '```json\n{"refinedPrompt": "Design a responsive dashboard for farmers that shows crop status, weather and market prices.", "changes": ["Fixed spelling", "Specified the dashboard contents"]}\n```'
      })
    });
    const r = await refinePromptWithAI({ prompt, analysis: analyzePrompt(prompt), models: DEFAULT_MODELS, llmService: llm });
    assert.strictEqual(r.refinementMethod, 'ai');
    assert.strictEqual(r.refinedBy.modelId, 'gemini-2-5-flash');
    assert.match(r.refinedPrompt, /dashboard for farmers/);
    assert.strictEqual(llm.calls.length, 1);
    assert.match(llm.calls[0].prompt, /<user_prompt>\nGive me prompt to build a farmer dashboard\.\n<\/user_prompt>/);
  });

  it('never calls a model without credentials', async () => {
    const llm = mockLlm({ available: [], respond: () => { throw new Error('should not be called'); } });
    const r = await refinePromptWithAI({ prompt, analysis: analyzePrompt(prompt), models: DEFAULT_MODELS, llmService: llm });
    assert.strictEqual(r.aiStatus, 'unavailable');
    assert.strictEqual(r.refinementMethod, 'rules');
    assert.strictEqual(llm.calls.length, 0);
  });

  it('falls back to rules on provider errors, simulated output or bad JSON', async () => {
    for (const reply of [
      { status: 'error', errorMessage: 'HTTP 429' },
      { status: 'success', isSimulated: true, text: '{"refinedPrompt":"x"}' },
      { status: 'success', isLive: true, text: 'Sure! Here is a dashboard...' }
    ]) {
      const llm = mockLlm({ respond: m => ({ modelId: m.id, ...reply }) });
      const r = await refinePromptWithAI({ prompt, analysis: analyzePrompt(prompt), models: DEFAULT_MODELS, llmService: llm });
      assert.strictEqual(r.refinementMethod, 'rules');
      assert.strictEqual(r.aiStatus, 'failed');
      assert.ok(r.refinedPrompt.includes('dashboard'));
    }
  });

  it('rejects empty or runaway rewrites', () => {
    assert.throws(() => parseRefinerOutput('{"refinedPrompt": ""}', 'hi'), /empty/);
    assert.throws(() => parseRefinerOutput(JSON.stringify({ refinedPrompt: 'x'.repeat(5000) }), 'hi'), /long/);
  });
});
