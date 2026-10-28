/**
 * AI HIVE MIND - Main API Server
 */

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { DEFAULT_MODELS, DEFAULT_CRITIC_WEIGHTS } from './config/models.js';
import { analyzePrompt } from './services/analysisEngine.js';
import { refinePrompt } from './services/refinementEngine.js';
import { recommendModels } from './services/recommendationEngine.js';
import { LLMService } from './services/llmService.js';
import { evaluateResponses } from './services/criticEngine.js';
import { memoryService } from './services/memoryService.js';
import { parseDocument } from './services/documentService.js';
import { synthesizeResponses } from './services/synthesisService.js';
import { BenchmarkRankerService } from './services/benchmarkRankerService.js';
import { loadState, saveState } from './services/persistenceService.js';
import { validateDecisionRequest, previewDecision, executeDecision, RequestError, MAX_PROMPT_CHARS } from './services/decisionExecutionService.js';
import { refinePromptWithAI } from './services/aiRefinementService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || '127.0.0.1';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || `http://localhost:${process.env.VITE_PORT || 3045},http://127.0.0.1:${process.env.VITE_PORT || 3045}`)
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Same-origin requests (via the Vite proxy) carry no Origin header and are always allowed
app.use(cors({
  origin(origin, callback) {
    callback(null, !origin || ALLOWED_ORIGINS.includes(origin));
  }
}));
app.use(express.json({ limit: '10mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Persisted state (server/data/*.json); keys entered in the UI override .env values
const savedSettings = loadState('settings', {});
const savedKeys = loadState('keys', {});
let configuredModels = Array.isArray(savedSettings.models) ? savedSettings.models : JSON.parse(JSON.stringify(DEFAULT_MODELS));
let criticWeights = { ...DEFAULT_CRITIC_WEIGHTS, ...(savedSettings.criticWeights || {}) };
const apiKeys = {
  sarvam: process.env.SARVAM_API_KEY || '',
  openai: process.env.OPENAI_API_KEY || '',
  gemini: process.env.GEMINI_API_KEY || '',
  anthropic: process.env.ANTHROPIC_API_KEY || '',
  groq: process.env.GROQ_API_KEY || '',
  ollamaUrl: process.env.OLLAMA_URL || '',
  ...savedKeys
};

const llmService = new LLMService(apiKeys);

function persistSettings() {
  saveState('settings', { models: configuredModels, criticWeights });
}

// Settings endpoints can change keys and models; protect them when ADMIN_TOKEN is set
function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN || req.get('x-admin-token') === ADMIN_TOKEN) return next();
  res.status(401).json({ error: 'Admin token required. Set it in Settings to change configuration.' });
}

// --- Model Management & Settings ---

app.get('/api/models', (req, res) => {
  res.json({
    models: configuredModels,
    criticWeights,
    // Which models can answer live right now (kept out of the model objects so Settings never saves it)
    availability: Object.fromEntries(configuredModels.map(m => [m.id, llmService.hasCredentials(m.id)]))
  });
});

app.post('/api/models/update', requireAdmin, (req, res) => {
  const { models, weights } = req.body;
  if (models && Array.isArray(models)) {
    configuredModels = models;
  }
  if (weights) {
    criticWeights = { ...criticWeights, ...weights };
  }
  persistSettings();
  res.json({ success: true, models: configuredModels, criticWeights });
});

app.post('/api/models/test', async (req, res) => {
  const { modelId } = req.body;
  const result = await llmService.testConnection(modelId);
  res.json(result);
});

app.get('/api/settings/keys/status', (req, res) => {
  res.json({
    sarvam: !!apiKeys.sarvam,
    openai: !!apiKeys.openai,
    gemini: !!apiKeys.gemini,
    anthropic: !!apiKeys.anthropic,
    groq: !!apiKeys.groq,
    ollamaUrl: apiKeys.ollamaUrl || 'http://127.0.0.1:11434',
    adminTokenRequired: Boolean(ADMIN_TOKEN)
  });
});

app.post('/api/settings/keys', requireAdmin, (req, res) => {
  const fields = ['sarvam', 'openai', 'gemini', 'anthropic', 'groq', 'ollamaUrl'];
  // Blank inputs mean "unchanged" so saving the form never wipes keys loaded from .env
  for (const field of fields) {
    if (typeof req.body[field] === 'string' && req.body[field].trim()) {
      apiKeys[field] = req.body[field].trim();
      savedKeys[field] = apiKeys[field];
    }
  }

  llmService.updateKeys(apiKeys);
  saveState('keys', savedKeys);
  res.json({ success: true, message: 'API keys saved on the server (server/data/keys.json).' });
});

// --- Core Workflow Pipelines ---

// 1. Prompt Analysis
app.post('/api/analyze-prompt', (req, res) => {
  try {
    const { prompt } = req.body;
    const analysis = analyzePrompt(prompt);
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Prompt Refinement & Breakdown
app.post('/api/refine-prompt', (req, res) => {
  try {
    const { prompt, analysis } = req.body;
    const promptAnalysis = analysis || analyzePrompt(prompt);
    const refinement = refinePrompt(prompt, promptAnalysis);
    res.json(refinement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2b. Opt-in AI refinement (one billable call to a configured model; falls back to rules)
app.post('/api/refine-prompt-ai', async (req, res) => {
  try {
    const { prompt, modelId = null } = req.body;
    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ success: false, code: 'invalid_prompt', error: 'A non-empty prompt is required.' });
    }
    if (prompt.length > MAX_PROMPT_CHARS) {
      return res.status(413).json({ success: false, code: 'prompt_too_long', error: `Prompt exceeds ${MAX_PROMPT_CHARS} characters.` });
    }
    if (modelId !== null && !configuredModels.some(m => m.id === modelId)) {
      return res.status(400).json({ success: false, code: 'invalid_model', error: 'modelId must be one of the configured model ids.' });
    }
    const analysis = analyzePrompt(prompt);
    const refinement = await refinePromptWithAI({ prompt, analysis, models: configuredModels, llmService, modelId });
    res.json({ analysis, refinement });
  } catch (err) {
    console.error('[Refine] Unexpected failure:', llmService.redactSecrets(err.message));
    res.status(500).json({ success: false, code: 'internal_error', error: 'Prompt refinement failed unexpectedly.' });
  }
});

// 3. Model Recommendation
app.post('/api/recommend-models', (req, res) => {
  try {
    const { prompt, analysis } = req.body;
    const promptAnalysis = analysis || analyzePrompt(prompt);
    const recommendations = recommendModels(configuredModels, promptAnalysis, id => llmService.hasCredentials(id),
      memoryService.getModelPerformance(promptAnalysis.primaryCategory));
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Combined Pre-flight Endpoint (Analyze + Refine + Recommend in one pass)
app.post('/api/preflight-prompt', (req, res) => {
  try {
    const { prompt, skipRefinement = false } = req.body;
    const analysis = analyzePrompt(prompt);
    let refinement = refinePrompt(prompt, analysis);
    // An already accepted refined prompt is analyzed and ranked as-is, not refined again
    if (skipRefinement === true && typeof prompt === 'string') {
      refinement = { ...refinement, refinedPrompt: prompt.trim(), improvements: ['Using the refined prompt you accepted.'] };
    }
    const recommendations = recommendModels(configuredModels, analysis, id => llmService.hasCredentials(id),
      memoryService.getModelPerformance(analysis.primaryCategory));

    res.json({
      analysis,
      refinement,
      recommendations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Benchmark Classification & Model Ranking
app.post('/api/benchmark-ranker', (req, res) => {
  try {
    const { prompt } = req.body;
    const rankingResult = BenchmarkRankerService.rankModelsForPrompt(prompt, configuredModels);
    res.json(rankingResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/benchmark-categories', (req, res) => {
  try {
    const categories = BenchmarkRankerService.getAllCategories(configuredModels);
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single AI Mode: Decision Model preview (deterministic, no LLM calls)
app.post('/api/decide-model', (req, res) => {
  try {
    const request = validateDecisionRequest(req.body, configuredModels);
    const { analysis, refinement, decision } = previewDecision(request, { models: configuredModels, llmService, memoryService });
    const { recommendations, ...decisionSummary } = decision;
    res.json({ analysis, refinement, decision: decisionSummary });
  } catch (err) {
    sendDecisionError(res, err);
  }
});

// Single AI Mode: decide → generate once → Critic evaluation → save turn
app.post('/api/decision-execute', async (req, res) => {
  try {
    const request = validateDecisionRequest(req.body, configuredModels);
    const result = await executeDecision(request, {
      models: configuredModels,
      criticWeights,
      llmService,
      memoryService
    });
    res.json(result);
  } catch (err) {
    sendDecisionError(res, err);
  }
});

function sendDecisionError(res, err) {
  if (err instanceof RequestError) {
    return res.status(err.status).json({ success: false, code: err.code, error: err.message });
  }
  console.error('[Decision] Unexpected failure:', llmService.redactSecrets(err.message));
  res.status(500).json({ success: false, code: 'internal_error', error: 'Single AI execution failed unexpectedly.' });
}

// 5. Multi-Model Parallel Generation
app.post('/api/generate', async (req, res) => {
  try {
    const {
      prompt,
      modelIds, // e.g. ['gpt-4o', 'claude-3-5-sonnet']
      conversationId,
      documentContext
    } = req.body;

    if (!prompt || !modelIds || modelIds.length === 0) {
      return res.status(400).json({ error: 'Missing prompt or modelIds' });
    }

    // Retrieve shared provider-neutral context
    const conversationContext = conversationId ? memoryService.getActiveHistoryContext(conversationId) : [];

    const selectedModels = configuredModels.filter(m => modelIds.includes(m.id));
    if (selectedModels.length === 0) {
      return res.status(400).json({ error: 'Selected models not found' });
    }

    const responses = await llmService.generateParallel(
      selectedModels,
      prompt,
      conversationContext,
      documentContext || ''
    );

    res.json({
      prompt,
      responses,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Critic AI Evaluation
app.post('/api/critic-evaluate', async (req, res) => {
  try {
    const {
      originalPrompt,
      refinedPrompt,
      responses,
      weights,
      analysis,
      documentContext,
      referenceAnswer,
      options,
      revisionSettings
    } = req.body;

    if (!originalPrompt && (!responses || responses.length === 0)) {
      return res.status(400).json({ error: 'Missing prompt and candidate responses for evaluation.' });
    }

    const evaluation = await evaluateResponses(
      originalPrompt,
      refinedPrompt,
      responses,
      weights || criticWeights,
      {
        analysis,
        documentContext,
        referenceAnswer,
        options,
        revisionSettings,
        llmService
      }
    );
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Synthesis Endpoint
app.post('/api/synthesize', (req, res) => {
  try {
    const { originalPrompt, refinedPrompt, responses, criticEvaluation } = req.body;
    const synthesis = synthesizeResponses(
      originalPrompt,
      refinedPrompt,
      responses,
      criticEvaluation
    );
    res.json(synthesis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Document Processing ---

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const parsed = await parseDocument(req.file.buffer, req.file.mimetype, req.file.originalname);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Shared Memory & Conversation History Endpoints ---

app.get('/api/conversations', (req, res) => {
  res.json(memoryService.listConversations());
});

app.post('/api/conversations', (req, res) => {
  const { title } = req.body;
  const conv = memoryService.createConversation(title || 'New Hive Mind Chat');
  res.json(conv);
});

app.get('/api/conversations/:id', (req, res) => {
  const conv = memoryService.getConversation(req.params.id);
  if (!conv) return res.status(404).json({ error: 'Conversation not found' });
  res.json(conv);
});

app.post('/api/conversations/:id/turn', (req, res) => {
  try {
    const turn = memoryService.addTurn(req.params.id, req.body);
    res.json({ success: true, turn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/conversations/:id/branch', (req, res) => {
  const { turnId, selectedModelId } = req.body;
  const turn = memoryService.selectBranch(req.params.id, turnId, selectedModelId);
  if (!turn) return res.status(404).json({ error: 'Turn or conversation not found' });
  res.json({ success: true, turn });
});

app.post('/api/conversations/:id/synthesis', (req, res) => {
  const { turnId, synthesis } = req.body;
  const turn = memoryService.setSynthesis(req.params.id, turnId, synthesis);
  if (!turn) return res.status(404).json({ error: 'Turn not found' });
  res.json({ success: true, turn });
});

// Re-grade a saved turn's answers, e.g. with the LLM judge after rule checks found the answers disagree.
// Uses the answers stored on the server, never answers sent by the client.
const turnsBeingEvaluated = new Set();
app.post('/api/conversations/:id/turns/:turnId/evaluate', async (req, res) => {
  const { id, turnId } = req.params;
  const { enableLLMJudge = true, judgeModel } = req.body || {};
  const turn = memoryService.getConversation(id)?.turns.find(t => t.turnId === turnId);
  if (!turn) return res.status(404).json({ error: 'Turn or conversation not found' });
  if (judgeModel && !configuredModels.some(m => m.id === judgeModel)) {
    return res.status(400).json({ error: `Unknown judge model "${judgeModel}".`, code: 'invalid_model' });
  }
  if (turnsBeingEvaluated.has(turnId)) {
    return res.status(409).json({ error: 'This turn is already being evaluated.', code: 'turn_busy' });
  }

  turnsBeingEvaluated.add(turnId);
  try {
    const evaluation = await evaluateResponses(turn.userPrompt, turn.refinedPrompt, turn.responses || [], criticWeights, {
      analysis: turn.analysis || {},
      options: { enableLLMJudge: Boolean(enableLLMJudge), ...(judgeModel ? { judgeModel } : {}) },
      llmService
    });
    const updated = memoryService.setCriticEvaluation(id, turnId, evaluation);
    res.json({ success: true, turn: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    turnsBeingEvaluated.delete(turnId);
  }
});

app.put('/api/conversations/:id/title', (req, res) => {
  const { title } = req.body;
  const success = memoryService.updateTitle(req.params.id, title);
  res.json({ success });
});

app.delete('/api/conversations/:id', (req, res) => {
  const success = memoryService.deleteConversation(req.params.id);
  res.json({ success });
});

// --- Telemetry & Analytics ---

app.get('/api/stats', (req, res) => {
  res.json(memoryService.getAnalytics());
});

app.listen(PORT, HOST, () => {
  console.log(`[AI Hive Mind Server] Listening on http://${HOST}:${PORT}`);
});
