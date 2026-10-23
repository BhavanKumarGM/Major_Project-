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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// In-Memory state
let configuredModels = JSON.parse(JSON.stringify(DEFAULT_MODELS));
let criticWeights = { ...DEFAULT_CRITIC_WEIGHTS };
const apiKeys = {
  sarvam: process.env.SARVAM_API_KEY || '',
  openai: process.env.OPENAI_API_KEY || '',
  gemini: process.env.GEMINI_API_KEY || '',
  anthropic: process.env.ANTHROPIC_API_KEY || '',
  groq: process.env.GROQ_API_KEY || '',
  ollamaUrl: process.env.OLLAMA_URL || 'http://127.0.0.1:11434'
};

const llmService = new LLMService(apiKeys);

// --- Model Management & Settings ---

app.get('/api/models', (req, res) => {
  res.json({
    models: configuredModels,
    criticWeights
  });
});

app.post('/api/models/update', (req, res) => {
  const { models, weights } = req.body;
  if (models && Array.isArray(models)) {
    configuredModels = models;
  }
  if (weights) {
    criticWeights = { ...criticWeights, ...weights };
  }
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
    ollamaUrl: apiKeys.ollamaUrl || 'http://127.0.0.1:11434'
  });
});

app.post('/api/settings/keys', (req, res) => {
  const { sarvam, openai, gemini, anthropic, groq, ollamaUrl } = req.body;
  if (sarvam !== undefined) apiKeys.sarvam = sarvam;
  if (openai !== undefined) apiKeys.openai = openai;
  if (gemini !== undefined) apiKeys.gemini = gemini;
  if (anthropic !== undefined) apiKeys.anthropic = anthropic;
  if (groq !== undefined) apiKeys.groq = groq;
  if (ollamaUrl !== undefined) apiKeys.ollamaUrl = ollamaUrl;

  llmService.updateKeys(apiKeys);
  res.json({ success: true, message: 'API keys updated securely in server memory.' });
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

// 3. Model Recommendation
app.post('/api/recommend-models', (req, res) => {
  try {
    const { prompt, analysis } = req.body;
    const promptAnalysis = analysis || analyzePrompt(prompt);
    const recommendations = recommendModels(configuredModels, promptAnalysis);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Combined Pre-flight Endpoint (Analyze + Refine + Recommend in one pass)
app.post('/api/preflight-prompt', (req, res) => {
  try {
    const { prompt } = req.body;
    const analysis = analyzePrompt(prompt);
    const refinement = refinePrompt(prompt, analysis);
    const recommendations = recommendModels(configuredModels, analysis);

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
    const categories = BenchmarkRankerService.getAllCategories();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const parsed = parseDocument(req.file.buffer, req.file.mimetype, req.file.originalname);
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

app.listen(PORT, () => {
  console.log(`[AI Hive Mind Server] Listening on http://localhost:${PORT}`);
});
