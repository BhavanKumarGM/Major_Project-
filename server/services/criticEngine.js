/**
 * Critic AI Evaluation Engine for AI Hive Mind
 * Evidence-based evaluation system integrating deterministic rule checks,
 * task-specific verification, requirement coverage analysis, and optional LLM judging.
 */

import { DEFAULT_CRITIC_WEIGHTS } from '../config/models.js';
import { runEvidenceEvaluation } from './evaluation/evaluator.js';
import { runControlledRevisionLoop } from './evaluation/revisionLoop.js';
import { LLMJudge } from './evaluation/llmJudge.js';

// Judge preference when none is named: fast hosted models first; local Ollama last since it may not be running
const JUDGE_PRIORITY = ['gemini-2-5-flash', 'gpt-4o', 'claude-opus-5-5', 'llama-3-3-70b', 'sarvam-105b', 'ollama-local'];

/**
 * An explicitly requested judge is used as is (and reported unavailable if it has no key);
 * otherwise the first model in JUDGE_PRIORITY with credentials grades the answers.
 * excludeId: the model that wrote the answer; another model with a key is preferred so no model grades itself.
 */
export function pickJudgeModel(requested, llmService, excludeId = null) {
  if (requested) return requested;
  if (!llmService?.hasCredentials) return JUDGE_PRIORITY[0];
  return judgeModelsFor(llmService, excludeId)[0] || JUDGE_PRIORITY[0];
}

// Every model with credentials in priority order, the answer's own model last
export function judgeModelsFor(llmService, excludeId = null) {
  const withKey = JUDGE_PRIORITY.filter(id => llmService.hasCredentials(id));
  return [...withKey.filter(id => id !== excludeId), ...withKey.filter(id => id === excludeId)];
}

/**
 * Evaluates candidate model responses against user intent and prompt constraints.
 * Preserves 100% backward compatibility for all legacy fields (winner, recommendationReason,
 * evaluations, weightsUsed, disclaimer) while returning rich evidence diagnostics.
 */
export async function evaluateResponses(
  originalPrompt,
  refinedPrompt,
  responses,
  customWeights = {},
  extraContext = {}
) {
  const analysis = extraContext.analysis || {};
  const documentContext = extraContext.documentContext || '';
  const referenceAnswer = extraContext.referenceAnswer || '';
  const options = extraContext.options || {};
  const revisionSettings = extraContext.revisionSettings || {};

  // Setup LLM Judge if an LLM service is passed and judge is enabled
  // A judge without real credentials would grade simulated text, so it is skipped (status becomes 'degraded')
  let judge = null;
  const judgeModel = pickJudgeModel(options.judgeModel, extraContext.llmService);
  const judgeAvailable = !extraContext.llmService?.hasCredentials || extraContext.llmService.hasCredentials(judgeModel);
  if (extraContext.llmService && options.enableLLMJudge && judgeAvailable) {
    judge = new LLMJudge({
      llmService: extraContext.llmService,
      defaultJudgeModel: judgeModel,
      enabled: true,
      // Unless the user named a judge, each answer is graded by a model other than the one that wrote it,
      // falling back to the next model with a key if that provider is down
      selectModel: options.judgeModel ? null : candidate => judgeModelsFor(extraContext.llmService, candidate.modelId)
    });
  }

  // If revision loop is requested and enabled
  if (revisionSettings.enabled && extraContext.llmService) {
    const revisionResult = await runControlledRevisionLoop({
      originalPrompt,
      refinedPrompt,
      initialResponses: responses,
      weights: customWeights,
      analysis,
      documentContext,
      referenceAnswer,
      llmService: extraContext.llmService,
      llmJudge: judge,
      revisionConfig: revisionSettings
    });

    return {
      ...revisionResult.evaluation,
      revisionHistory: revisionResult.revisionHistory,
      revisionsAttempted: revisionResult.revisionsAttempted
    };
  }

  // Standard Evidence Evaluation
  const result = await runEvidenceEvaluation({
    originalPrompt,
    refinedPrompt,
    responses,
    weights: customWeights,
    analysis,
    documentContext,
    referenceAnswer,
    options,
    llmJudge: judge
  });

  if (options.enableLLMJudge && result.evaluationMetadata) {
    result.evaluationMetadata.judge = {
      requested: true,
      model: judgeModel,
      available: judgeAvailable,
      note: judgeAvailable ? result.evaluationMetadata.judgeNote : `LLM judge skipped: ${judgeModel} has no API credentials.`
    };
  }
  return result;
}
