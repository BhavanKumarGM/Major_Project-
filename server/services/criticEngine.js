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
  let judge = null;
  if (extraContext.llmService && options.enableLLMJudge) {
    judge = new LLMJudge({
      llmService: extraContext.llmService,
      defaultJudgeModel: options.judgeModel || 'gemini-2-5-flash',
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
  return runEvidenceEvaluation({
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
}
