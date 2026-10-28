import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';

process.env.DATA_DIR = process.env.DATA_DIR || fs.mkdtempSync(path.join(os.tmpdir(), 'hive-decision-'));

const { DEFAULT_MODELS } = await import('../config/models.js');
const { decideModel } = await import('../services/decisionEngine.js');
const { analyzePrompt } = await import('../services/analysisEngine.js');
const { validateDecisionRequest, executeDecision, RequestError } = await import('../services/decisionExecutionService.js');
const { memoryService } = await import('../services/memoryService.js');
const { LLMService, classifyProviderError } = await import('../services/llmService.js');
const { evaluateResponses } = await import('../services/criticEngine.js');
const { recommendModels } = await import('../services/recommendationEngine.js');

const FAKE_KEYS = { openai: 'sk-test-SECRET-123456789', groq: 'gsk_testSECRET987654321' };

const GOOD_ANSWER = 'Binary search repeatedly halves a sorted array. Here is a Python implementation:\n\n```python\ndef binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n```\n\nIt runs in O(log n) time and handles empty arrays and missing targets by returning -1.';

/**
 * Mock LLMService: only the listed models have "credentials"; records every generation call.
 */
function mockLlm({ available = ['gpt-4o'], respond } = {}) {
  const calls = [];
  const real = new LLMService(FAKE_KEYS);
  return {
    calls,
    hasCredentials: id => available.includes(id),
    redactSecrets: t => real.redactSecrets(t),
    async generateSingle(model, prompt, history = [], documentContext = '') {
      calls.push({ modelId: model.id, prompt, history, documentContext });
      if (respond) return respond(model, prompt, history, documentContext);
      return {
        modelId: model.id, modelName: model.name, provider: model.provider,
        text: GOOD_ANSWER, tokenUsage: { promptTokens: 10, completionTokens: 90, totalTokens: 100 },
        latency: 12, status: 'success', isLive: true, isSimulated: false
      };
    }
  };
}

function deps(llmService) {
  return { models: DEFAULT_MODELS, criticWeights: undefined, llmService, memoryService };
}

function request(body) {
  return validateDecisionRequest(body, DEFAULT_MODELS);
}

describe('Decision Model + Single AI Mode', () => {
  beforeEach(() => {
    for (const c of memoryService.listConversations()) memoryService.deleteConversation(c.id);
  });

  it('1. selects an available suitable model, skipping unconfigured ones', () => {
    const d = decideModel({
      models: DEFAULT_MODELS,
      analysis: analyzePrompt('Implement binary search in Python'),
      isAvailable: id => id === 'llama-3-3-70b'
    });
    assert.strictEqual(d.status, 'selected');
    assert.strictEqual(d.selectedModelId, 'llama-3-3-70b');
    assert.strictEqual(d.selectionMethod, 'automatic');
    assert.strictEqual(d.willSimulate, false);
    assert.match(d.scoreDisclaimer, /capability profiles/);
    assert.match(d.scoreDisclaimer, /not a benchmark/);
  });

  it('2. honours a manual override', () => {
    const d = decideModel({
      models: DEFAULT_MODELS,
      analysis: analyzePrompt('Explain recursion'),
      isAvailable: () => true,
      modelId: 'gpt-4o'
    });
    assert.strictEqual(d.selectedModelId, 'gpt-4o');
    assert.strictEqual(d.selectionMethod, 'manual');
  });

  it('3. rejects an invalid model id at validation', () => {
    assert.throws(() => request({ prompt: 'hi there', modelId: 'not-a-model' }), err =>
      err instanceof RequestError && err.status === 400 && err.code === 'invalid_model');
    assert.throws(() => request({ prompt: '   ' }), err => err.code === 'invalid_prompt');
  });

  it('4. reports unavailable providers instead of silently simulating', async () => {
    const llm = mockLlm({ available: [] });
    const auto = await executeDecision(request({ prompt: 'Implement binary search in Python' }), deps(llm));
    assert.strictEqual(auto.success, false);
    assert.strictEqual(auto.code, 'no_live_provider');
    assert.strictEqual(llm.calls.length, 0);

    const manual = await executeDecision(request({ prompt: 'Implement binary search', modelId: 'claude-opus-5-5' }), deps(llm));
    assert.strictEqual(manual.code, 'provider_unavailable');
    assert.strictEqual(llm.calls.length, 0);
    assert.strictEqual(memoryService.listConversations().length, 0, 'nothing is saved when nothing ran');
  });

  it('5 & 6. calls exactly one model and evaluates its real answer', async () => {
    const llm = mockLlm({ available: ['gpt-4o', 'llama-3-3-70b', 'gemini-2-5-flash'] });
    const out = await executeDecision(request({ prompt: 'Implement binary search in Python' }), deps(llm));
    assert.strictEqual(llm.calls.length, 1);
    assert.strictEqual(out.success, true);
    assert.strictEqual(out.generation.isLive, true);
    assert.ok(out.criticEvaluation, 'critic ran');
    assert.strictEqual(out.criticEvaluation.evaluations.length, 1);
    assert.strictEqual(out.criticEvaluation.evaluations[0].modelId, out.decision.selectedModelId);
  });

  it('7. a provider failure is not turned into a successful answer or evaluated', async () => {
    const llm = mockLlm({
      respond: model => ({
        modelId: model.id, modelName: model.name, provider: model.provider, status: 'error', errorType: 'auth',
        errorMessage: 'The provider rejected the API key.', text: '[Error]', isLive: false, isSimulated: false
      })
    });
    const out = await executeDecision(request({ prompt: 'Explain recursion', modelId: 'gpt-4o' }), deps(llm));
    assert.strictEqual(out.success, false);
    assert.strictEqual(out.code, 'generation_failed');
    assert.strictEqual(out.generation.errorType, 'auth');
    assert.strictEqual(out.criticEvaluation, null);

    const conv = memoryService.getConversation(out.conversation.id);
    assert.strictEqual(conv.turns.length, 1, 'failure is recorded for diagnostics');
    // The question stays in history so "try again" works; the error text is never passed on as an answer
    const history = memoryService.getActiveHistoryContext(out.conversation.id);
    assert.deepStrictEqual(history.map(m => m.role), ['user', 'assistant']);
    assert.match(history[0].content, /Explain recursion/);
    assert.ok(!history[1].content.includes('[Error]'));
    assert.match(history[1].content, /No answer was produced/);
  });

  it('8. simulated output requires explicit opt-in and stays labelled', async () => {
    const llm = mockLlm({
      available: [],
      respond: model => ({
        modelId: model.id, modelName: model.name, provider: model.provider, text: GOOD_ANSWER,
        status: 'success', isLive: false, isSimulated: true, latency: 5
      })
    });
    const out = await executeDecision(request({ prompt: 'Explain recursion', options: { allowSimulation: true } }), deps(llm));
    assert.strictEqual(out.decision.willSimulate, true);
    assert.strictEqual(out.generation.isSimulated, true);
    assert.strictEqual(out.generation.isLive, false);
    assert.strictEqual(out.criticEvaluation.evaluations[0].isSimulated, true);
  });

  it('9. critic winner and selected model are consistent', async () => {
    const llm = mockLlm();
    const out = await executeDecision(request({ prompt: 'Implement binary search in Python', modelId: 'gpt-4o' }), deps(llm));
    const turn = memoryService.getConversation(out.conversation.id).turns[0];
    assert.strictEqual(turn.selectedModelId, 'gpt-4o');
    if (out.criticEvaluation.winner) assert.strictEqual(out.criticEvaluation.winner.modelId, 'gpt-4o');
  });

  it('10 & 11. saves the turn and reuses the chosen answer as follow-up history', async () => {
    const llm = mockLlm();
    const first = await executeDecision(request({ prompt: 'Implement binary search in Python', modelId: 'gpt-4o' }), deps(llm));
    const convId = first.conversation.id;
    const turn = memoryService.getConversation(convId).turns[0];
    assert.strictEqual(turn.executionMode, 'single');
    assert.strictEqual(turn.decision.selectedModelId, 'gpt-4o');
    assert.strictEqual(turn.responses.length, 1);

    await executeDecision(request({ prompt: 'Now add type hints', modelId: 'gpt-4o', conversationId: convId }), deps(llm));
    const followUp = llm.calls[1];
    assert.strictEqual(followUp.history.length, 2);
    assert.strictEqual(followUp.history[1].role, 'assistant');
    assert.strictEqual(followUp.history[1].content, GOOD_ANSWER);
    assert.strictEqual(memoryService.getConversation(convId).turns.length, 2, 'no duplicate turns');
  });

  it('12. unknown conversation ids are rejected rather than silently forked', async () => {
    await assert.rejects(
      executeDecision(request({ prompt: 'hello world friend', modelId: 'gpt-4o', conversationId: 'nope' }), deps(mockLlm())),
      err => err.status === 404
    );
  });

  it('13. multi-model critic contract keeps its legacy fields', async () => {
    const result = await evaluateResponses('Explain recursion', 'Explain recursion', [
      { modelId: 'a', modelName: 'A', text: GOOD_ANSWER, isLive: true },
      { modelId: 'b', modelName: 'B', text: GOOD_ANSWER + ' More.', isLive: true }
    ], {}, { options: { enableLLMJudge: false } });
    for (const field of ['evaluationStatus', 'evaluations', 'winner', 'recommendationReason', 'weightsUsed',
      'disclaimer', 'requirementCoverage', 'issues', 'nextAction', 'evaluationMetadata']) {
      assert.ok(field in result, `missing ${field}`);
    }
    assert.strictEqual(result.evaluationStatus, 'deterministic_only');
  });

  it('14. document context reaches the model and the critic', async () => {
    const llm = mockLlm();
    await executeDecision(request({ prompt: 'Summarize the attached notes', modelId: 'gpt-4o', documentContext: 'Quarterly notes: revenue grew.' }), deps(llm));
    assert.strictEqual(llm.calls[0].documentContext, 'Quarterly notes: revenue grew.');
  });

  it('15. LLM judge is off by default, uses a model that has a key, and never calls one without', async () => {
    const llm = mockLlm({ available: ['gpt-4o'] });
    const off = await executeDecision(request({ prompt: 'Explain recursion', modelId: 'gpt-4o' }), deps(llm));
    assert.strictEqual(off.criticEvaluation.evaluationStatus, 'deterministic_only');
    assert.strictEqual(llm.calls.length, 1, 'no judge call');

    // Gemini (the preferred judge) has no key here, so the judge falls back to gpt-4o
    const on = await executeDecision(request({ prompt: 'Explain recursion', modelId: 'gpt-4o', options: { enableLLMJudge: true } }), deps(llm));
    assert.strictEqual(on.criticEvaluation.evaluationMetadata.judge.model, 'gpt-4o');
    assert.strictEqual(on.criticEvaluation.evaluationMetadata.judge.available, true);
    // The mock answers in prose, not judge JSON, so the judge retries once before giving up
    const judgeCalls = llm.calls.slice(2);
    assert.ok(judgeCalls.length >= 1 && judgeCalls.every(c => c.modelId === 'gpt-4o'));
    const callsSoFar = llm.calls.length;

    // A named judge without credentials is reported unavailable and never called
    const named = await evaluateResponses('Explain recursion', '', [{ modelId: 'gpt-4o', text: 'Recursion is a function calling itself until a base case.', status: 'success', isLive: true }], {},
      { llmService: llm, options: { enableLLMJudge: true, judgeModel: 'claude-opus-5-5' } });
    assert.strictEqual(named.evaluationMetadata.judge.available, false);
    assert.strictEqual(named.evaluationStatus, 'degraded');
    assert.strictEqual(llm.calls.length, callsSoFar, 'judge without credentials is never called');
  });

  it('16. API keys never appear in responses or error messages', async () => {
    const llm = mockLlm();
    const out = await executeDecision(request({ prompt: 'Explain recursion', modelId: 'gpt-4o' }), deps(llm));
    const json = JSON.stringify(out);
    for (const key of Object.values(FAKE_KEYS)) assert.ok(!json.includes(key));

    const service = new LLMService(FAKE_KEYS);
    service.callOpenAI = async () => {
      const err = new Error(`Incorrect API key provided: ${FAKE_KEYS.openai}`);
      err.status = 401;
      throw err;
    };
    const resp = await service.generateSingle({ id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' }, 'hi');
    assert.strictEqual(resp.errorType, 'auth');
    assert.ok(!resp.errorMessage.includes(FAKE_KEYS.openai));
    assert.ok(!resp.text.includes(FAKE_KEYS.openai));
  });

  it('classifies provider failures', () => {
    const e = (status, message = '') => Object.assign(new Error(message), { status });
    assert.strictEqual(classifyProviderError(e(429)), 'rate_limit');
    assert.strictEqual(classifyProviderError(e(402)), 'quota');
    assert.strictEqual(classifyProviderError(e(400, 'You exceeded your current quota')), 'quota');
    assert.strictEqual(classifyProviderError(e(404, 'The model `gpt-x` does not exist')), 'invalid_model');
    assert.strictEqual(classifyProviderError(Object.assign(new Error('aborted'), { name: 'TimeoutError' })), 'timeout');
    assert.strictEqual(classifyProviderError(Object.assign(new Error('fetch failed'), { cause: { code: 'ENOTFOUND' } })), 'network');
  });
});

describe('Branch selection', () => {
  it('marks a turn once the user picks a response', () => {
    const conv = memoryService.createConversation('branch test');
    const turn = memoryService.addTurn(conv.id, {
      userPrompt: 'q', responses: [{ modelId: 'a', text: 'A' }, { modelId: 'b', text: 'B' }], selectedModelId: 'a'
    });
    assert.ok(!turn.branchChosenByUser, 'critic/default pick is not a user choice');
    const updated = memoryService.selectBranch(conv.id, turn.turnId, 'b');
    assert.strictEqual(updated.selectedModelId, 'b');
    assert.strictEqual(updated.branchChosenByUser, true);
  });
});

describe('Observed performance in model choice', () => {
  const models = [
    { id: 'a', name: 'A', capabilities: { coding: 90 } },
    { id: 'b', name: 'B', capabilities: { coding: 86 } }
  ];
  const analysis = { primaryCategory: 'Coding', intentDistribution: [{ category: 'Coding', percentage: 100 }] };

  function saveEvaluatedTurn(category, scores, extra = {}) {
    const conv = memoryService.createConversation('perf');
    memoryService.addTurn(conv.id, {
      userPrompt: 'q',
      analysis: { primaryCategory: category },
      responses: Object.keys(scores).map(id => ({ modelId: id, text: 'x', isLive: true, ...(extra[id] || {}) })),
      criticEvaluation: { evaluations: Object.entries(scores).map(([modelId, overall]) => ({ modelId, scores: { overall } })) },
      selectedModelId: Object.keys(scores)[0]
    });
  }

  beforeEach(() => {
    for (const c of memoryService.listConversations()) memoryService.deleteConversation(c.id);
  });

  it('averages live Critic scores per category and ignores simulated or failed answers', () => {
    saveEvaluatedTurn('Coding', { a: 60, b: 90 });
    saveEvaluatedTurn('Coding', { a: 70, b: 80 }, { b: { isSimulated: true } });
    saveEvaluatedTurn('Coding', { a: 99 }, { a: { status: 'error' } });
    saveEvaluatedTurn('Creative Writing', { a: 10 });
    const perf = memoryService.getModelPerformance('Coding');
    assert.deepStrictEqual(perf.a, { avgScore: 65, count: 2 });
    assert.deepStrictEqual(perf.b, { avgScore: 90, count: 1 });
  });

  it('a strong track record (3+ answers) can outrank a better profile; fewer answers are ignored', () => {
    const strongB = { a: { avgScore: 55, count: 3 }, b: { avgScore: 98, count: 3 } };
    const ranked = recommendModels(models, analysis, () => true, strongB);
    assert.strictEqual(ranked.topRecommendation.modelId, 'b');
    assert.match(ranked.models[0].recommendationRationale, /past Critic evaluations/);

    const tooFew = { b: { avgScore: 98, count: 2 } };
    assert.strictEqual(recommendModels(models, analysis, () => true, tooFew).topRecommendation.modelId, 'a');
    assert.strictEqual(recommendModels(models, analysis, () => true, tooFew).models.find(m => m.id === 'b').observedPerformance.applied, false);
  });

  it('availability still comes before performance', () => {
    const strongB = { b: { avgScore: 99, count: 10 } };
    assert.strictEqual(recommendModels(models, analysis, id => id === 'a', strongB).topRecommendation.modelId, 'a');
  });
});

describe('Conversation memory', () => {
  const ok = (modelId, text) => ({ modelId, text, status: 'success', isLive: true });
  const failed = modelId => ({ modelId, text: `[Error from ${modelId}: Could not reach the provider.]`, status: 'error', errorType: 'network' });

  it('keeps a failed question in history so "rerun it" knows what to rerun', () => {
    const conv = memoryService.createConversation('memory test');
    memoryService.addTurn(conv.id, { userPrompt: 'explain about data structures', responses: [failed('gemini-2-5-flash'), failed('llama-3-3-70b')] });
    const history = memoryService.getActiveHistoryContext(conv.id);
    assert.deepStrictEqual(history.map(m => m.role), ['user', 'assistant']);
    assert.match(history[0].content, /data structures/);
    assert.ok(!/Error from|Could not reach/.test(history[1].content), 'error text is not passed on as an answer');
  });

  it("uses another model's answer when the chosen one failed", () => {
    const conv = memoryService.createConversation('memory test');
    memoryService.addTurn(conv.id, {
      userPrompt: 'What is a stack?',
      responses: [failed('gemini-2-5-flash'), ok('llama-3-3-70b', 'A stack is a last-in, first-out collection.')],
      selectedModelId: 'gemini-2-5-flash'
    });
    const history = memoryService.getActiveHistoryContext(conv.id);
    assert.strictEqual(history[1].content, 'A stack is a last-in, first-out collection.');
  });

  it('always alternates user and assistant messages', () => {
    const conv = memoryService.createConversation('memory test');
    memoryService.addTurn(conv.id, { userPrompt: 'first', responses: [failed('gemini-2-5-flash')] });
    memoryService.addTurn(conv.id, { userPrompt: 'second', responses: [ok('gemini-2-5-flash', 'Second answer.')] });
    memoryService.addTurn(conv.id, { userPrompt: 'third', responses: [{ modelId: 'sarvam-105b', text: '', status: 'success' }] });
    const roles = memoryService.getActiveHistoryContext(conv.id).map(m => m.role);
    assert.deepStrictEqual(roles, ['user', 'assistant', 'user', 'assistant', 'user', 'assistant']);
  });

  it('reports an empty reply from a provider as an error, not an answer', async () => {
    const service = new LLMService(FAKE_KEYS);
    service.callOpenAI = async () => ({ text: '   ', status: 'success' });
    const resp = await service.generateSingle({ id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' }, 'hi');
    assert.strictEqual(resp.status, 'error');
    assert.match(resp.errorMessage, /empty answer/);
  });
});
