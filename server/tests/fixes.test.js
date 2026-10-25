import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'hive-fixes-'));

const { analyzePrompt } = await import('../services/analysisEngine.js');
const { parseDocument } = await import('../services/documentService.js');
const { runEvidenceEvaluation } = await import('../services/evaluation/evaluator.js');
const { LLMService } = await import('../services/llmService.js');
const { recommendModels } = await import('../services/recommendationEngine.js');
const { loadState, saveState } = await import('../services/persistenceService.js');

// Real sample PDF shipped with pdf-parse (pinned in package-lock)
const SAMPLE_PDF = path.resolve('node_modules/pdf-parse/test/data/05-versions-space.pdf');

describe('Project fixes', () => {
  it('does not tag ordinary English as code', () => {
    const a = analyzePrompt('Let me know where to go from here with my career');
    assert.deepStrictEqual(a.technologies, []);
    assert.notStrictEqual(a.primaryCategory, 'Coding');

    const poem = analyzePrompt('Write a poem about autumn leaves');
    assert.strictEqual(poem.primaryCategory, 'Creative Writing');
  });

  it('still detects explicit languages', () => {
    assert.ok(analyzePrompt('Write a C program to check prime numbers').technologies.includes('C'));
    assert.ok(analyzePrompt('Write a go program that reads a file').technologies.includes('Go'));
    assert.ok(analyzePrompt('Explain C++ templates').technologies.includes('C++'));
  });

  it('extracts real text from PDF files', async () => {
    const doc = await parseDocument(fs.readFileSync(SAMPLE_PDF), 'application/pdf', 'sample.pdf');
    assert.match(doc.fullText, /Dadfrtfjh/);
    assert.doesNotMatch(doc.fullText, /%PDF|endobj/);
    assert.strictEqual(doc.fileType, 'pdf');
  });

  it('rejects unsupported binary files instead of returning garbage', async () => {
    await assert.rejects(
      parseDocument(Buffer.from([0, 1, 2, 3]), 'application/octet-stream', 'image.png'),
      /Unsupported file type/
    );
  });

  it('never picks a simulated response over a live one', async () => {
    const text = 'Here is a thorough, well structured answer that addresses the question in detail with clear reasoning and examples.';
    const result = await runEvidenceEvaluation({
      originalPrompt: 'Explain why the sky is blue',
      responses: [
        { modelId: 'sim', modelName: 'Sim', text: text + ' Extra detail about Rayleigh scattering.', isSimulated: true },
        { modelId: 'live', modelName: 'Live', text, isLive: true }
      ],
      options: { enableLLMJudge: false }
    });
    assert.strictEqual(result.winner?.modelId, 'live');
    assert.ok(result.evaluations.find(e => e.modelId === 'sim').isSimulated);
  });

  it('reports an error instead of simulating when a configured provider fails', async () => {
    const service = new LLMService({ groq: 'bad-key' });
    service.callGroq = async () => { throw new Error('HTTP 401'); };
    const model = { id: 'llama-3-3-70b', name: 'Llama', provider: 'Groq', latencyAvg: 10 };
    const resp = await service.generateSingle(model, 'hi');
    assert.strictEqual(resp.status, 'error');
    assert.strictEqual(resp.isSimulated, false);
  });

  it('flags simulated output for providers without keys', async () => {
    const service = new LLMService({});
    const model = { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', latencyAvg: 10 };
    const resp = await service.generateSingle(model, 'hi');
    assert.strictEqual(resp.isSimulated, true);
    assert.strictEqual(resp.isLive, false);
  });

  it('recommends models with credentials first', () => {
    const models = [
      { id: 'a', name: 'A', capabilities: { general: 99 } },
      { id: 'b', name: 'B', capabilities: { general: 60 } }
    ];
    const rec = recommendModels(models, analyzePrompt('hello there friend, how are you today'), id => id === 'b');
    assert.strictEqual(rec.topRecommendation.modelId, 'b');
  });

  it('persists state to disk', () => {
    saveState('roundtrip', { value: 42 });
    assert.deepStrictEqual(loadState('roundtrip', null), { value: 42 });
    assert.strictEqual(loadState('missing', 'fallback'), 'fallback');
  });
});
