/**
 * Critic AI Evaluation Engine for AI Hive Mind
 * Evidence-based evaluation system integrating deterministic rule checks,
 * task-specific verification, requirement coverage analysis, and optional LLM judging.
 */

import { DEFAULT_CRITIC_WEIGHTS } from '../config/models.js';
import { runEvidenceEvaluation } from './evaluation/evaluator.js';
import { runControlledRevisionLoop } from './evaluation/revisionLoop.js';
import { LLMJudge } from './evaluation/llmJudge.js';

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
  // A judge without real credentials would grade simulated text, so it is skipped (status stays 'degraded')
  let judge = null;
  const judgeModel = options.judgeModel || 'gemini-2-5-flash';
  const judgeAvailable = !extraContext.llmService?.hasCredentials || extraContext.llmService.hasCredentials(judgeModel);
  if (extraContext.llmService && options.enableLLMJudge && judgeAvailable) {
    judge = new LLMJudge({
      llmService: extraContext.llmService,
      defaultJudgeModel: judgeModel,
      enabled: true
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
      note: judgeAvailable ? undefined : `LLM judge skipped: ${judgeModel} has no API credentials.`
    };
  }
  return result;
}
