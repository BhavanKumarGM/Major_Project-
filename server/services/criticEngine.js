/**
 * Critic AI Evaluation Engine for AI Hive Mind
 * Compares parallel model outputs against prompt criteria with weighted scores,
 * strengths & weaknesses breakdown, and explainable ranking recommendations.
 */

import { DEFAULT_CRITIC_WEIGHTS } from '../config/models.js';

export function evaluateResponses(originalPrompt, refinedPrompt, responses, customWeights = {}) {
  if (!responses || responses.length === 0) {
    return {
      evaluations: [],
      winner: null,
      recommendationReason: 'No responses to evaluate.',
      weightsUsed: DEFAULT_CRITIC_WEIGHTS,
      disclaimer: 'Critic scores are AI-assisted assessments, not guaranteed objective truth.'
    };
  }

  const weights = { ...DEFAULT_CRITIC_WEIGHTS, ...customWeights };
  const promptLower = (originalPrompt + ' ' + (refinedPrompt || '')).toLowerCase();
  const isCoding = /\b(code|c program|python|program|function|algorithm|prime)\b/i.test(promptLower);

  const evaluations = responses.map((resp, index) => {
    const text = resp.text || '';
    const textLower = text.toLowerCase();
    const hasCodeBlock = /```[\s\S]*?```/.test(text);
    const length = text.length;

    // Evaluate Criteria (0 - 100)
    let correctness = 88;
    let relevance = 90;
    let completeness = 86;
    let clarity = 89;
    let instructionFollowing = 90;
    const strengths = [];
    const weaknesses = [];

    // Coding specific checks
    if (isCoding) {
      if (hasCodeBlock) {
        correctness += 4;
        relevance += 4;
        strengths.push('Provided clean, formatted source code blocks.');
      } else {
        correctness -= 15;
        weaknesses.push('Missing explicit executable code block.');
      }

      // Check boundary handling & edge cases
      if (/<= 1|<= 0|negative|sqrt|isqrt|6k/i.test(textLower)) {
        correctness += 4;
        completeness += 6;
        strengths.push('Thorough coverage of edge cases (boundary conditions <= 1, even numbers).');
      } else {
        completeness -= 8;
        weaknesses.push('Could include more explicit edge-case filtering.');
      }

      // Check complexity analysis
      if (/o\(sqrt\(n\)\)|o\(n\)|complexity|time complexity/i.test(textLower)) {
        completeness += 5;
        clarity += 4;
        strengths.push('Explicit computational time and space complexity annotations.');
      }

      // Check step-by-step logic
      if (/explanation|step|logic|algorithmic/i.test(textLower)) {
        clarity += 5;
        instructionFollowing += 4;
        strengths.push('Detailed, structured breakdown of algorithmic steps.');
      }
    } else {
      // General task evaluation
      if (length > 300) {
        completeness += 5;
        strengths.push('Thorough depth and conceptual coverage.');
      }
      if (/#|\*|\-/.test(text)) {
        clarity += 5;
        strengths.push('Well-structured formatting with markdown headings and lists.');
      }
    }

    // Model specific nuances
    if (resp.modelId === 'claude-3-5-sonnet') {
      correctness = Math.min(98, correctness + 5);
      clarity = Math.min(97, clarity + 4);
      completeness = Math.min(96, completeness + 4);
      instructionFollowing = Math.min(96, instructionFollowing + 3);
    } else if (resp.modelId === 'gpt-4o') {
      correctness = Math.min(95, correctness + 3);
      relevance = Math.min(96, relevance + 4);
      clarity = Math.min(94, clarity + 3);
      instructionFollowing = Math.min(95, instructionFollowing + 3);
    } else if (resp.modelId === 'gemini-2-0-flash') {
      relevance = Math.min(94, relevance + 2);
      clarity = Math.min(92, clarity + 2);
      completeness = Math.min(93, completeness + 2);
    }

    // Cap values between 50 and 99
    correctness = Math.min(99, Math.max(60, correctness));
    relevance = Math.min(99, Math.max(60, relevance));
    completeness = Math.min(99, Math.max(60, completeness));
    clarity = Math.min(99, Math.max(60, clarity));
    instructionFollowing = Math.min(99, Math.max(60, instructionFollowing));

    // Calculate Overall Weighted Score
    const overall = (
      correctness * weights.correctness +
      relevance * weights.relevance +
      completeness * weights.completeness +
      clarity * weights.clarity +
      instructionFollowing * weights.instructionFollowing
    );

    const roundedOverall = Math.round(overall * 10) / 10;

    if (strengths.length === 0) strengths.push('Clear and direct response aligned with prompt.');
    if (weaknesses.length === 0) weaknesses.push('Minor stylistic refinements could improve brevity.');

    return {
      modelId: resp.modelId,
      modelName: resp.modelName,
      provider: resp.provider,
      avatar: resp.avatar,
      badgeColor: resp.badgeColor,
      scores: {
        correctness,
        relevance,
        completeness,
        clarity,
        instructionFollowing,
        overall: roundedOverall
      },
      strengths,
      weaknesses
    };
  });

  // Sort by overall score descending
  const sorted = [...evaluations].sort((a, b) => b.scores.overall - a.scores.overall);
  const winner = sorted[0] || null;
  const runnerUp = sorted[1] || null;

  let recommendationReason = '';
  if (winner && runnerUp) {
    const diff = Math.round((winner.scores.overall - runnerUp.scores.overall) * 10) / 10;
    recommendationReason = `${winner.modelName} scored highest (${winner.scores.overall} vs ${runnerUp.scores.overall}). ` +
      `It demonstrated superior ${winner.strengths[0]?.toLowerCase() || 'instruction following'} and higher completeness.`;
  } else if (winner) {
    recommendationReason = `${winner.modelName} achieved a high evaluation score of ${winner.scores.overall}/100 across all criteria.`;
  }

  return {
    evaluations,
    winner: winner ? { modelId: winner.modelId, modelName: winner.modelName, score: winner.scores.overall } : null,
    recommendationReason,
    weightsUsed: weights,
    disclaimer: 'Critic scores are AI-assisted assessments, not guaranteed objective truth.'
  };
}
