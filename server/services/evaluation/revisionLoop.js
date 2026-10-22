/**
 * Controlled Revision Loop Layer
 * Bounded feedback mechanism that routes targeted corrections to refinement or generation,
 * respects a maximum retry budget, and prevents infinite loops.
 */

import { runEvidenceEvaluation } from './evaluator.js';

export async function runControlledRevisionLoop({
  originalPrompt,
  refinedPrompt,
  initialResponses,
  weights,
  analysis,
  documentContext,
  referenceAnswer,
  llmService,
  llmJudge,
  revisionConfig = {}
}) {
  const maxRevisions = typeof revisionConfig.maxRevisions === 'number' ? revisionConfig.maxRevisions : 0;
  const isEnabled = revisionConfig.enabled === true && maxRevisions > 0;

  // Step 1: Initial Evaluation
  let currentEvaluation = await runEvidenceEvaluation({
    originalPrompt,
    refinedPrompt,
    responses: initialResponses,
    weights,
    analysis,
    documentContext,
    referenceAnswer,
    options: revisionConfig,
    llmJudge
  });

  if (!isEnabled) {
    return {
      evaluation: currentEvaluation,
      revisionHistory: [],
      revisionsAttempted: 0,
      revisedCandidate: null
    };
  }

  const revisionHistory = [];
  let attempts = 0;
  let currentResponses = [...initialResponses];

  while (attempts < maxRevisions && currentEvaluation.nextAction === 'revise') {
    attempts++;

    // Identify candidate with issues that can be improved
    const targetCandidate = currentEvaluation.evaluations.find(c => c.status === 'needs_revision') ||
      currentEvaluation.evaluations[0];

    if (!targetCandidate || targetCandidate.issues.length === 0) {
      break;
    }

    const primaryIssue = targetCandidate.issues[0];
    const correctionInstruction = primaryIssue.recommendedCorrection || 'Improve completeness and correctness.';
    const targetStage = primaryIssue.likelySource === 'prompt_refinement' ? 'prompt_refinement' : 'generation';

    // Route correction
    let revisedPromptToSend = refinedPrompt || originalPrompt;
    if (targetStage === 'prompt_refinement') {
      revisedPromptToSend = `${refinedPrompt}\n\n[Correction Directive]: Specifically address: ${correctionInstruction}`;
    }

    // Call model to produce revised candidate
    let revisedResponseText = '';
    if (llmService) {
      const correctionPrompt = `Original Request: ${originalPrompt}\n\nPrevious Answer:\n${targetCandidate.text || ''}\n\nRequired Correction: ${correctionInstruction}\nPlease produce a revised answer addressing this correction.`;
      const modelObj = { id: targetCandidate.modelId, name: targetCandidate.modelName, provider: targetCandidate.provider };
      try {
        const genResult = await llmService.generateSingle(modelObj, correctionPrompt, [], documentContext);
        revisedResponseText = genResult.text;
      } catch (err) {
        break; // Provider failed, terminate revision
      }
    } else {
      break; // No generator available
    }

    const previousScore = targetCandidate.scores.overall;

    // Update response list with revised candidate
    currentResponses = currentResponses.map(r => {
      if (r.modelId === targetCandidate.modelId) {
        return {
          ...r,
          text: revisedResponseText,
          revisionAttempt: attempts
        };
      }
      return r;
    });

    // Re-evaluate
    const newEvaluation = await runEvidenceEvaluation({
      originalPrompt,
      refinedPrompt: revisedPromptToSend,
      responses: currentResponses,
      weights,
      analysis,
      documentContext,
      referenceAnswer,
      options: revisionConfig,
      llmJudge
    });

    const newTarget = newEvaluation.evaluations.find(c => c.modelId === targetCandidate.modelId);
    const newScore = newTarget ? newTarget.scores.overall : previousScore;
    const scoreDelta = Math.round((newScore - previousScore) * 10) / 10;

    revisionHistory.push({
      attempt: attempts,
      modelId: targetCandidate.modelId,
      targetStage,
      issueAddressed: primaryIssue.description,
      correctionApplied: correctionInstruction,
      previousScore,
      newScore,
      scoreDelta,
      improved: scoreDelta > 0
    });

    currentEvaluation = newEvaluation;

    // Stop if score improved above threshold or stopped progressing
    if (scoreDelta <= 0 || newTarget?.status === 'accepted') {
      break;
    }
  }

  return {
    evaluation: currentEvaluation,
    revisionHistory,
    revisionsAttempted: attempts,
    revisedResponses: currentResponses
  };
}
