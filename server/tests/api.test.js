import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'child_process';
import path from 'path';

const BASE_URL = 'http://localhost:5050/api';
let serverProcess = null;

describe('AI Hive Mind — Comprehensive Backend API Test Suite', () => {
  before(async () => {
    // Check if server is already running
    try {
      const res = await fetch(`${BASE_URL}/models`);
      if (res.ok) return; // already running
    } catch (_) {
      // not running, spawn it
    }

    serverProcess = spawn(process.execPath, [path.resolve(process.cwd(), 'server.js')], {
      env: { ...process.env, PORT: '5050' },
      stdio: 'inherit'
    });

    // Wait for server to become responsive
    const start = Date.now();
    while (Date.now() - start < 10000) {
      try {
        const res = await fetch(`${BASE_URL}/models`);
        if (res.ok) return;
      } catch (_) {}
      await new Promise(r => setTimeout(r, 200));
    }
    throw new Error('Server failed to start within timeout');
  });

  after(() => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  // 1. Models & Configuration
  it('GET /api/models returns model registry and default critic weights', async () => {
    const res = await fetch(`${BASE_URL}/models`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.models));
    assert.ok(data.models.length > 0);
    assert.ok(data.criticWeights);
    assert.strictEqual(typeof data.criticWeights.correctness, 'number');
  });

  it('POST /api/models/update updates models and weights in memory', async () => {
    const res = await fetch(`${BASE_URL}/models/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        weights: { correctness: 0.40, relevance: 0.15 }
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.criticWeights.correctness, 0.40);
  });

  it('POST /api/models/test tests model connection status', async () => {
    const res = await fetch(`${BASE_URL}/models/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId: 'gemini-2-0-flash' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.status);
    assert.ok(data.message);
  });

  // 2. Settings & Keys
  it('GET /api/settings/keys/status reports provider API key presence without exposing secrets', async () => {
    const res = await fetch(`${BASE_URL}/settings/keys/status`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(typeof data.sarvam, 'boolean');
    assert.strictEqual(typeof data.gemini, 'boolean');
    assert.strictEqual(typeof data.groq, 'boolean');
    assert.strictEqual(typeof data.ollamaUrl, 'string');
    // Ensure no actual secret strings are leaked in this endpoint
    for (const [k, v] of Object.entries(data)) {
      if (k !== 'ollamaUrl') {
        assert.strictEqual(typeof v, 'boolean', `Key ${k} should only be boolean`);
      }
    }
  });

  it('POST /api/settings/keys updates keys in server memory safely', async () => {
    const res = await fetch(`${BASE_URL}/settings/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ollamaUrl: 'http://127.0.0.1:11434' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  // 3. Workflow Pipelines
  it('POST /api/analyze-prompt analyzes valid, empty, and edge-case prompts', async () => {
    // Valid prompt
    const res = await fetch(`${BASE_URL}/analyze-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Write a Python program to sort a list of numbers.' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.primaryCategory, 'Coding');
    assert.ok(data.technologies.includes('Python'));

    // Empty prompt
    const emptyRes = await fetch(`${BASE_URL}/analyze-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '' })
    });
    assert.strictEqual(emptyRes.status, 200);
    const emptyData = await emptyRes.json();
    assert.strictEqual(emptyData.primaryCategory, 'General');
  });

  it('POST /api/refine-prompt returns intent-preserving optimization', async () => {
    const res = await fetch(`${BASE_URL}/refine-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Check if number is prime in Python' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.refinedPrompt);
    assert.ok(Array.isArray(data.improvements));
    assert.ok(data.breakdown);
  });

  it('POST /api/preflight-prompt runs analysis, refinement, and recommendation in one pass', async () => {
    const res = await fetch(`${BASE_URL}/preflight-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Write a fast binary search algorithm in C++' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.analysis);
    assert.ok(data.refinement);
    assert.ok(data.recommendations);
  });

  // 4. Benchmark Classification & Ranking
  it('GET /api/benchmark-categories returns categories and benchmarks', async () => {
    const res = await fetch(`${BASE_URL}/benchmark-categories`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.categories);
  });

  it('POST /api/benchmark-ranker classifies prompt and ranks models by benchmark scores', async () => {
    const res = await fetch(`${BASE_URL}/benchmark-ranker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Solve the differential equation dy/dx + 2y = 4x' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.categoryName);
    assert.ok(Array.isArray(data.rankedModels));
    assert.ok(data.verdictRationale);
  });

  // 5. Parallel Generation
  it('POST /api/generate rejects requests missing prompt or modelIds with 400', async () => {
    const noPrompt = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelIds: ['gemini-2-0-flash'] })
    });
    assert.strictEqual(noPrompt.status, 400);

    const noModels = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Hello', modelIds: [] })
    });
    assert.strictEqual(noModels.status, 400);

    const unknownModel = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Hello', modelIds: ['non-existent-model-xyz'] })
    });
    assert.strictEqual(unknownModel.status, 400);
  });

  it('POST /api/generate executes parallel generation for valid models', async () => {
    const res = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Say hello in 5 words or less.',
        modelIds: ['gemini-2-0-flash', 'llama-3-3-70b']
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.responses));
    assert.strictEqual(data.responses.length, 2);
    for (const r of data.responses) {
      assert.ok(r.text);
      assert.strictEqual(typeof r.latency, 'number');
    }
  });

  // 6. Critic AI Evaluation
  it('POST /api/critic-evaluate evaluates candidate responses and returns rich diagnostics', async () => {
    const candidateResponses = [
      {
        modelId: 'gemini-2-0-flash',
        modelName: 'Gemini 2.0 Flash',
        provider: 'Google',
        text: '```python\ndef is_prime(n):\n    if n <= 1: return False\n    return True\n```'
      },
      {
        modelId: 'llama-3-3-70b',
        modelName: 'Llama 3.3 70B',
        provider: 'Groq',
        text: 'A prime number is a number greater than 1 with no positive divisors other than 1 and itself.'
      }
    ];

    const res = await fetch(`${BASE_URL}/critic-evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalPrompt: 'Write a Python program to check prime numbers.',
        refinedPrompt: 'Write Python code for prime checking with boundary handling.',
        responses: candidateResponses
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.evaluations));
    assert.strictEqual(data.evaluations.length, 2);
    assert.ok(data.winner);
    assert.ok(data.recommendationReason);
    assert.ok(data.weightsUsed);
    assert.ok(data.disclaimer);
    assert.ok(data.requirementCoverage);
    assert.ok(Array.isArray(data.issues));
    assert.ok(data.nextAction);
  });

  it('POST /api/critic-evaluate rejects completely empty input with 400', async () => {
    const res = await fetch(`${BASE_URL}/critic-evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(res.status, 400);
  });

  // 7. Synthesis
  it('POST /api/synthesize merges responses and independently evaluates consensus', async () => {
    const candidateResponses = [
      {
        modelId: 'gemini-2-0-flash',
        modelName: 'Gemini 2.0 Flash',
        text: 'Solution part 1'
      },
      {
        modelId: 'llama-3-3-70b',
        modelName: 'Llama 3.3 70B',
        text: 'Solution part 2'
      }
    ];

    const res = await fetch(`${BASE_URL}/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalPrompt: 'Explain quantum computing.',
        responses: candidateResponses
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.isSynthesized, true);
    assert.strictEqual(data.modelId, 'synthesis');
    assert.ok(data.evaluation);
    assert.strictEqual(typeof data.evaluation.score, 'number');
  });

  // 8. Document Upload
  it('POST /api/upload handles text file upload and chunking', async () => {
    const boundary = '----WebKitFormBoundaryTest123';
    const body = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="file"; filename="sample.txt"',
      'Content-Type: text/plain',
      '',
      'This is a sample document for testing the document processing pipeline. It should be parsed and chunked appropriately.',
      `--${boundary}--`
    ].join('\r\n');

    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
      body
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.filename, 'sample.txt');
    assert.ok(data.charCount > 0);
    assert.ok(data.chunksCount > 0);
  });

  it('POST /api/upload returns 400 when no file is uploaded', async () => {
    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(res.status, 400);
  });

  // 9. Conversations, Turns & Branches
  let testConvId = null;
  let testTurnId = null;

  it('POST /api/conversations creates a new conversation with unique ID', async () => {
    const res = await fetch(`${BASE_URL}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Integration Test Conversation' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.id);
    assert.strictEqual(data.title, 'Integration Test Conversation');
    testConvId = data.id;
  });

  it('GET /api/conversations lists conversations including the new one', async () => {
    const res = await fetch(`${BASE_URL}/conversations`);
    assert.strictEqual(res.status, 200);
    const list = await res.json();
    assert.ok(Array.isArray(list));
    assert.ok(list.some(c => c.id === testConvId));
  });

  it('GET /api/conversations/:id returns conversation details or 404 for missing ID', async () => {
    const valid = await fetch(`${BASE_URL}/conversations/${testConvId}`);
    assert.strictEqual(valid.status, 200);
    const data = await valid.json();
    assert.strictEqual(data.id, testConvId);

    const invalid = await fetch(`${BASE_URL}/conversations/non-existent-uuid-9999`);
    assert.strictEqual(invalid.status, 404);
  });

  it('POST /api/conversations/:id/turn appends turn with responses and evaluation', async () => {
    const res = await fetch(`${BASE_URL}/conversations/${testConvId}/turn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userPrompt: 'Tell me a joke',
        responses: [
          { modelId: 'gemini-2-0-flash', text: 'Why do programmers prefer dark mode? Because light attracts bugs.' },
          { modelId: 'llama-3-3-70b', text: 'There are 10 types of people: those who understand binary and those who do not.' }
        ],
        selectedModelId: 'gemini-2-0-flash'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.turn.turnId);
    testTurnId = data.turn.turnId;
  });

  it('POST /api/conversations/:id/branch switches active continuation branch', async () => {
    const res = await fetch(`${BASE_URL}/conversations/${testConvId}/branch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        turnId: testTurnId,
        selectedModelId: 'llama-3-3-70b'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.turn.selectedModelId, 'llama-3-3-70b');

    // Missing turn returns 404
    const badTurn = await fetch(`${BASE_URL}/conversations/${testConvId}/branch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        turnId: 'non-existent-turn-id',
        selectedModelId: 'llama-3-3-70b'
      })
    });
    assert.strictEqual(badTurn.status, 404);
  });

  it('POST /api/conversations/:id/synthesis attaches synthesis to turn', async () => {
    const res = await fetch(`${BASE_URL}/conversations/${testConvId}/synthesis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        turnId: testTurnId,
        synthesis: { text: 'Synthesized consensus answer', isSynthesized: true }
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.turn.selectedModelId, 'synthesis');
  });

  it('PUT /api/conversations/:id/title updates conversation title', async () => {
    const res = await fetch(`${BASE_URL}/conversations/${testConvId}/title`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated Title for Integration Test' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    const getRes = await fetch(`${BASE_URL}/conversations/${testConvId}`);
    const getData = await getRes.json();
    assert.strictEqual(getData.title, 'Updated Title for Integration Test');
  });

  it('DELETE /api/conversations/:id deletes the conversation session', async () => {
    const res = await fetch(`${BASE_URL}/conversations/${testConvId}`, {
      method: 'DELETE'
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    const checkRes = await fetch(`${BASE_URL}/conversations/${testConvId}`);
    assert.strictEqual(checkRes.status, 404);
  });

  // 10. Telemetry & Stats
  it('GET /api/stats returns analytics and evaluation metrics', async () => {
    const res = await fetch(`${BASE_URL}/stats`);
    assert.strictEqual(res.status, 200);
    const stats = await res.json();
    assert.strictEqual(typeof stats.totalRequests, 'number');
    assert.ok(stats.modelUsage);
    assert.ok(stats.averageLatency);
    assert.ok(stats.criticWins);
    assert.ok(stats.userSelections);
    assert.ok(stats.evaluationMetrics);
    assert.strictEqual(typeof stats.evaluationMetrics.evaluationsCompleted, 'number');
    assert.strictEqual(typeof stats.evaluationMetrics.criticalFailuresDetected, 'number');
  });

});
