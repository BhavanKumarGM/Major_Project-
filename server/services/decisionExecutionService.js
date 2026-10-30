/**
 * Single AI Mode Orchestration for Fusion AI
 * Analyze → Decision Model picks one model → one generation call → Critic evaluation → save turn.
 * Dependencies are injected so the flow can be tested with a mocked LLMService.
 */

import { analyzePrompt } from './analysisEngine.js';
import { refinePrompt } from './refinementEngine.js';
import { decideModel } from './decisionEngine.js';
import { evaluateResponses } from './criticEngine.js';

export const MAX_PROMPT_CHARS = 20000;
export const MAX_DOCUMENT_CHARS = 500000;

// Conversations with a Single AI run in flight; a second run would race the turn save
const inFlightConversations = new Set();

export class RequestError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/**
 * Validates and normalizes a /api/decide-model or /api/decision-execute body.
 */
export function validateDecisionRequest(body = {}, models = []) {
  const { prompt, modelId = null, conversationId = null, documentContext = null, options = {} } = body;

  if (typeof prompt !== 'string' || !prompt.trim()) {
    throw new RequestError(400, 'invalid_prompt', 'A non-empty prompt is required.');
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    throw new RequestError(413, 'prompt_too_long', `Prompt exceeds ${MAX_PROMPT_CHARS} characters.`);
  }
  if (modelId !== null && (typeof modelId !== 'string' || !models.some(m => m.id === modelId))) {
    throw new RequestError(400, 'invalid_model', 'modelId must be one of the configured model ids.');
  }
  if (conversationId !== null && typeof conversationId !== 'string') {
    throw new RequestError(400, 'invalid_conversation', 'conversationId must be a string.');
  }
  if (documentContext !== null && typeof documentContext !== 'string') {
    throw new RequestError(400, 'invalid_document', 'documentContext must be a string.');
  }
  if (typeof documentContext === 'string' && documentContext.length > MAX_DOCUMENT_CHARS) {
    throw new RequestError(413, 'document_too_long', `Document context exceeds ${MAX_DOCUMENT_CHARS} characters.`);
  }
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new RequestError(400, 'invalid_options', 'options must be an object.');
  }

  return {
    prompt: prompt.trim(),
    modelId,
    conversationId,
    documentContext: documentContext || '',
    options: {
      enableLLMJudge: options.enableLLMJudge === true,
      allowSimulation: options.allowSimulation === true,
      // The prompt is already a refined prompt the user accepted; send it as-is
      skipRefinement: options.skipRefinement === true
    }
  };
}

/**
 * Runs the deterministic preflight and the Decision Model without calling any LLM.
 */
export function previewDecision(request, { models, llmService, memoryService = null }) {
  const analysis = analyzePrompt(request.prompt);
  const refinement = refinePrompt(request.prompt, analysis);
  const decision = decideModel({
    models,
    analysis,
    isAvailable: id => llmService.hasCredentials(id),
    modelId: request.modelId,
    allowSimulation: request.options.allowSimulation,
    performance: memoryService?.getModelPerformance ? memoryService.getModelPerformance(analysis.primaryCategory) : {}
  });
  return { analysis, refinement, decision };
}

/**
 * Full Single AI Mode run. Returns the API response body.
 */
export async function executeDecision(request, { models, criticWeights, llmService, memoryService }) {
  const { analysis, refinement, decision } = previewDecision(request, { models, llmService, memoryService });
  const { recommendations, ...decisionSummary } = decision;

  if (decision.status !== 'selected') {
    return {
      success: false,
      code: decision.status,
      error: decision.reason,
      analysis,
      refinement,
      decision: decisionSummary,
      generation: null,
      criticEvaluation: null,
      conversation: null
    };
  }

  if (request.conversationId && !memoryService.getConversation(request.conversationId)) {
    throw new RequestError(404, 'conversation_not_found', 'Conversation not found.');
  }
  if (request.conversationId && inFlightConversations.has(request.conversationId)) {
    throw new RequestError(409, 'conversation_busy', 'A response is already being generated for this conversation.');
  }
  const conversationId = request.conversationId || memoryService.createConversation('New Fusion AI Chat').id;
  inFlightConversations.add(conversationId);

  try {
    const model = models.find(m => m.id === decision.selectedModelId);
    const refinedPrompt = request.options.skipRefinement ? request.prompt : (refinement.refinedPrompt || request.prompt);
    const history = memoryService.getActiveHistoryContext(conversationId);

    // Exactly one generation call in Single AI Mode
    const response = await llmService.generateSingle(model, refinedPrompt, history, request.documentContext);
    const generationOk = response.status !== 'error';

    // An error message is never evaluated as if it were an answer
    let criticEvaluation = null;
    if (generationOk) {
      criticEvaluation = await evaluateResponses(
        request.prompt,
        refinedPrompt,
        [response],
        criticWeights,
        {
          analysis,
          documentContext: request.documentContext,
          options: { enableLLMJudge: request.options.enableLLMJudge },
          llmService
        }
      );
    }

    const turn = memoryService.addTurn(conversationId, {
      userPrompt: request.prompt,
      refinedPrompt,
      analysis,
      breakdown: refinement.breakdown,
      recommendations,
      responses: [response],
      criticEvaluation,
      selectedModelId: response.modelId,
      executionMode: 'single',
      decision: decisionSummary
    });

    return {
      success: generationOk,
      code: generationOk ? 'ok' : 'generation_failed',
      error: generationOk ? undefined : response.errorMessage,
      analysis,
      refinement,
      decision: decisionSummary,
      generation: {
        status: response.status,
        isLive: response.isLive === true,
        isSimulated: response.isSimulated === true,
        errorType: response.errorType || null,
        response
      },
      criticEvaluation,
      conversation: { id: conversationId, turnId: turn.turnId }
    };
  } finally {
    inFlightConversations.delete(conversationId);
  }
}
