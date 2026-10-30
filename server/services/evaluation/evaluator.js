/**
 * Evidence-Based Evaluation Orchestrator
 * Integrates deterministic validation, task verification, requirement analysis,
 * and optional LLM-as-a-judge into a unified, unbiased evaluation report.
 */

import { validateAndNormalizeWeights, runDeterministicChecks } from './ruleValidator.js';
import { extractRequirements, evaluateRequirementCoverage } from './requirementAnalyzer.js';
import { getTaskValidator, CodingTaskValidator } from './taskValidators.js';
import { createDiagnosticIssue } from './diagnostics.js';
import { LLMJudge, DEFAULT_JUDGE_TIMEOUT_MS } from './llmJudge.js';
import { detectAnswerDisagreement } from './disagreement.js';

// Score deductions per issue category; returns new scores
function applyIssuePenalty(iss, s) {
  const critical = iss.severity === 'critical';
  switch (iss.category) {
    case 'format_violation':
      return { ...s, instructionFollowing: s.instructionFollowing - (critical ? 35 : 15), clarity: s.clarity - 10 };
    case 'instruction_violation':
      return { ...s, instructionFollowing: s.instructionFollowing - (critical ? 40 : 20), correctness: s.correctness - 15 };
    case 'code_validation_failure':
      return { ...s, correctness: s.correctness - (critical ? 30 : 15) };
    case 'missing_requirement':
      return { ...s, completeness: s.completeness - (critical ? 30 : 10) };
    case 'off_topic':
      return { ...s, relevance: s.relevance - 50, correctness: s.correctness - 20 };
    case 'incomplete_response':
      return { ...s, completeness: s.completeness - (critical ? 40 : 25) };
    default:
      return s;
  }
}

export async function runEvidenceEvaluation({
  originalPrompt = '',
  refinedPrompt = '',
  responses = [],
  weights = {},
  analysis = {},
  documentContext = '',
  referenceAnswer = '',
  options = {},
  llmJudge = null
}) {
  const startTime = Date.now();

  // Validate and normalize weights
  const { valid: weightsValid, normalized: normalizedWeights, warning: weightsWarning } =
    validateAndNormalizeWeights(weights);

  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return {
      evaluationStatus: 'empty_input',
      evaluations: [],
      winner: null,
      recommendationReason: 'No model responses were provided for evaluation.',
      weightsUsed: normalizedWeights,
      disclaimer: 'Critic scores are evidence-assisted assessments based on verifiable criteria.',
      requirementCoverage: { results: [], coveragePercent: 0, satisfiedCount: 0, totalCount: 0 },
      issues: [],
      criticalFailures: 0,
      nextAction: 'reject',
      evaluationMetadata: {
        durationMs: Date.now() - startTime,
        weightsWarning,
        judgeStatus: 'skipped'
      }
    };
  }

  // 1. Requirement Extraction & Conflict Detection
  const { requirements, conflicts } = extractRequirements(originalPrompt, refinedPrompt, analysis);

  // 2. Select Task-specific Validator
  const taskCategory = analysis.primaryCategory || 'General';
  const taskValidator = getTaskValidator(taskCategory);
  const codeCheckedByTask = taskValidator instanceof CodingTaskValidator;
  // Brevity is fine when asked for, and for short direct questions ("What is 12 times 12?")
  const isShortQuestion = (originalPrompt || '').trim().length < 100 &&
    (/\?\s*$/.test(originalPrompt.trim()) || /^\s*(what|who|when|where|which|how many|how much|is|are|does|do|can|calculate|convert)\b/i.test(originalPrompt));
  const shortFormRequested = isShortQuestion ||
    /\b(brief|briefly|short|concise|one word|one sentence|one line|tl;?dr|exactly \w+|under \d+ words|in \d+ words|list \w+|top \w+)\b/i.test(originalPrompt || '');

  const candidateEvaluations = [];
  const allIssues = [];
  let overallCriticalCount = 0;
  let usedJudgeCount = 0;

  // D (started up front). Judge calls run in parallel: one provider call per answer takes seconds each,
  // so running them one after another would multiply the wait.
  const judgeResults = await Promise.all(responses.map(resp => {
    if (!llmJudge || options.enableLLMJudge === false) return null;
    const eligible = runDeterministicChecks(resp, { originalPrompt, refinedPrompt, constraints: analysis.constraints || [], codeCheckedByTask }).isEligible;
    if (!eligible) return null;
    return llmJudge.evaluateCandidate({
      candidate: resp,
      originalPrompt,
      refinedPrompt,
      constraints: analysis.constraints || [],
      documentContext,
      referenceAnswer,
      judgeModel: options.judgeModel || null,
      timeoutMs: options.judgeTimeoutMs || DEFAULT_JUDGE_TIMEOUT_MS
    }).catch(e => ({ judgeStatus: 'degraded', reason: e.message, scores: null, strengths: [], weaknesses: [], diagnosticIssues: [] }));
  }));

  // Judge scores and rule scores are not on the same scale. If the judge could not grade every answer it was
  // asked to, everyone is ranked on rule scores; findings the judge did report (e.g. factual errors) still apply.
  const judgeAttempts = judgeResults.filter(Boolean);
  const judgeGraded = judgeAttempts.filter(r => r.judgeStatus === 'complete').length;
  const judgeCoversAll = judgeAttempts.length > 0 && judgeGraded === judgeAttempts.length;

  for (const [index, resp] of responses.entries()) {
    const modelId = resp.modelId || 'unknown-model';
    const modelName = resp.modelName || modelId;
    const provider = resp.provider || 'AI Provider';
    const avatar = resp.avatar || '🤖';
    const badgeColor = resp.badgeColor || '#6366f1';
    const text = (resp.text || '').trim();

    // A. Deterministic Rule Checks
    const ruleResult = runDeterministicChecks(resp, {
      originalPrompt,
      refinedPrompt,
      constraints: analysis.constraints || [],
      codeCheckedByTask
    });

    // B. Requirement Coverage
    const reqCoverage = evaluateRequirementCoverage(requirements, text, {
      technologies: analysis.technologies || [],
      documentContext,
      hasNegativeViolation: ruleResult.findings.some(f => f.category === 'instruction_violation' && f.status === 'fail'),
      shortFormRequested
    });

    // C. Task-specific Validation
    const taskResult = taskValidator.validate(resp, { documentContext, referenceAnswer, originalPrompt });

    // D. LLM-as-a-judge Semantic Layer (if provided and enabled)
    const judgeResult = judgeResults[index] || { judgeStatus: 'disabled', scores: null, strengths: [], weaknesses: [], diagnosticIssues: [] };
    if (judgeResult.judgeStatus === 'complete') {
      usedJudgeCount++;
    }

    // E. Assemble Diagnostic Issues
    // `origin` records which layer found the issue: scoring treats verified rule findings, task findings
    // (already priced in by the task validator) and the judge's opinions differently.
    const candidateIssues = [];
    const addIssue = (origin, fields) => {
      const issue = createDiagnosticIssue({ modelId, ...fields });
      issue.origin = origin;
      candidateIssues.push(issue);
      allIssues.push(issue);
    };

    for (const rf of ruleResult.findings) {
      if (rf.status === 'fail') {
        addIssue('rule', {
          category: rf.category,
          severity: rf.severity,
          description: rf.description,
          evidence: rf.evidence,
          likelySource: rf.likelySource || 'decision_model',
          recommendedCorrection: rf.recommendedCorrection,
          isCritical: rf.severity === 'critical'
        });
      }
    }

    for (const tf of taskResult.findings) {
      if (tf.status === 'fail' || tf.status === 'unknown') {
        addIssue('task', {
          category: tf.category,
          severity: tf.severity,
          description: tf.description,
          evidence: tf.evidence,
          likelySource: 'decision_model',
          recommendedCorrection: tf.recommendedCorrection,
          isCritical: tf.severity === 'critical'
        });
      }
    }

    for (const req of reqCoverage.results) {
      if (req.status === 'missing' && req.isMandatory) {
        addIssue('requirement', {
          category: 'missing_requirement',
          severity: req.severity,
          description: `Mandatory requirement unmet: ${req.description}`,
          evidence: req.evidence,
          likelySource: 'decision_model',
          recommendedCorrection: req.recommendedCorrection,
          isCritical: req.severity === 'critical'
        });
      }
    }

    // Simulated (non-live) output is not real model evidence
    const isSimulated = resp.isSimulated === true;
    if (isSimulated) {
      addIssue('simulation', {
        category: 'provider_error',
        severity: 'high',
        description: 'Response was produced by the offline simulation engine, not by the live model.',
        evidence: 'isSimulated=true',
        likelySource: 'provider_or_execution',
        recommendedCorrection: 'Configure an API key for this provider to get a real response.'
      });
    }

    for (const jf of judgeResult.diagnosticIssues || []) {
      addIssue('judge', {
        category: jf.category,
        severity: jf.severity,
        description: jf.description,
        evidence: jf.evidence,
        likelySource: 'decision_model',
        recommendedCorrection: jf.recommendedCorrection,
        isCritical: jf.severity === 'critical'
      });
    }

    // F. Compute Dimension Scores (0 - 100)
    // Handle truly empty or provider error responses honestly
    let correctness = 85;
    let relevance = 85;
    let completeness = 80;
    let clarity = 85;
    let instructionFollowing = 85;

    const isExecutionError = resp.status === 'error' || !text;
    if (isExecutionError) {
      correctness = 0;
      relevance = 0;
      completeness = 0;
      clarity = 0;
      instructionFollowing = 0;
    } else if (judgeResult.scores && judgeCoversAll) {
      // Use judge scores directly as primary semantic truth
      correctness = judgeResult.scores.correctness;
      relevance = judgeResult.scores.relevance;
      completeness = judgeResult.scores.completeness;
      clarity = judgeResult.scores.clarity;
      instructionFollowing = judgeResult.scores.instructionFollowing;

      // Apply task-specific adjustments
      correctness += taskResult.scoreAdjustments.correctness || 0;
      completeness += taskResult.scoreAdjustments.completeness || 0;
      clarity += taskResult.scoreAdjustments.clarity || 0;

      // Rule findings are verified facts (item counts, word limits, JSON, refusals); keep their penalty
      // unless the judge already reported a problem of the same kind
      const judgeCategories = new Set(candidateIssues.filter(i => i.origin === 'judge').map(i => i.category));
      for (const iss of candidateIssues.filter(i => i.origin === 'rule' && !judgeCategories.has(i.category))) {
        ({ correctness, relevance, completeness, clarity, instructionFollowing } =
          applyIssuePenalty(iss, { correctness, relevance, completeness, clarity, instructionFollowing }));
      }
    } else {
      // Deterministic evidence-based scoring
      // Base on requirement coverage
      // Length earns a bonus only when the prompt did not ask for a short answer
      completeness = Math.round((reqCoverage.coveragePercent * 0.7) + (text.length > 200 || shortFormRequested ? 25 : 10));
      // Filler openers add nothing to an answer
      if (/^\s*(great|good|excellent|what a great) question\b|^\s*(certainly|sure|absolutely|of course)!/i.test(text)) {
        clarity -= 8;
      }
      
      // Penalize for issues. Task findings are skipped: the task validator's scoreAdjustments already count them.
      for (const iss of candidateIssues.filter(i => i.origin !== 'task')) {
        ({ correctness, relevance, completeness, clarity, instructionFollowing } =
          applyIssuePenalty(iss, { correctness, relevance, completeness, clarity, instructionFollowing }));
      }

      // Apply task validator score adjustments
      correctness += taskResult.scoreAdjustments.correctness || 0;
      completeness += taskResult.scoreAdjustments.completeness || 0;
      clarity += taskResult.scoreAdjustments.clarity || 0;
      if (taskResult.scoreAdjustments.relevance) {
        relevance += taskResult.scoreAdjustments.relevance;
      }
    }

    // CRITICAL FAILURE PENALTY:
    // If a mandatory constraint or negative constraint failed, cap correctness and overall
    const hasCritical = candidateIssues.some(i => i.isCritical) || ruleResult.isCriticalFailure;
    if (hasCritical) {
      overallCriticalCount++;
      correctness = Math.min(correctness, 35);
      instructionFollowing = Math.min(instructionFollowing, 30);
    }

    // Bound 0 - 100 without artificial clamping to 60!
    correctness = Math.max(0, Math.min(100, Math.round(correctness)));
    relevance = Math.max(0, Math.min(100, Math.round(relevance)));
    completeness = Math.max(0, Math.min(100, Math.round(completeness)));
    clarity = Math.max(0, Math.min(100, Math.round(clarity)));
    instructionFollowing = Math.max(0, Math.min(100, Math.round(instructionFollowing)));

    // Calculate normalized weighted overall score
    const overallScore = (
      correctness * normalizedWeights.correctness +
      relevance * normalizedWeights.relevance +
      completeness * normalizedWeights.completeness +
      clarity * normalizedWeights.clarity +
      instructionFollowing * normalizedWeights.instructionFollowing
    );
    const roundedOverall = Math.round(overallScore * 10) / 10;

    // Strengths & Weaknesses
    const strengths = [];
    const weaknesses = [];

    if (judgeResult.strengths?.length > 0) {
      strengths.push(...judgeResult.strengths);
    } else {
      if (correctness >= 80) strengths.push('High factual accuracy and sound reasoning.');
      if (clarity >= 80) strengths.push('Clear structure and readable formatting.');
      if (reqCoverage.coveragePercent >= 80) strengths.push('Comprehensive coverage of stated requirements.');
      if (strengths.length === 0 && !isExecutionError) strengths.push('Direct response relevant to the prompt.');
    }

    if (judgeResult.weaknesses?.length > 0) {
      weaknesses.push(...judgeResult.weaknesses);
    } else {
      for (const iss of candidateIssues.slice(0, 3)) {
        weaknesses.push(`${iss.description} (${iss.recommendedCorrection || 'Review needed'})`);
      }
      if (weaknesses.length === 0 && roundedOverall < 85) {
        weaknesses.push('Could provide more exhaustive boundary verification.');
      }
    }

    // Candidate Eligibility and Status
    const isEligible = !hasCritical && !isExecutionError && roundedOverall >= 40;
    let candidateStatus = 'accepted';
    if (hasCritical || isExecutionError) candidateStatus = 'rejected';
    else if (roundedOverall < 70 || candidateIssues.length > 0) candidateStatus = 'needs_revision';

    candidateEvaluations.push({
      modelId,
      modelName,
      provider,
      avatar,
      badgeColor,
      isEligible,
      isSimulated,
      status: candidateStatus,
      scores: {
        correctness,
        relevance,
        completeness,
        clarity,
        instructionFollowing,
        overall: roundedOverall
      },
      strengths: strengths.slice(0, 4),
      weaknesses: weaknesses.slice(0, 4),
      requirementResults: reqCoverage.results,
      issues: candidateIssues,
      hasCriticalFailure: hasCritical,
      judgeDetails: {
        status: judgeResult.judgeStatus,
        model: judgeResult.judgeModel || null,
        // Why a requested judge did not score this answer (timeout, provider error, unreadable output)
        reason: judgeResult.judgeStatus === 'degraded' ? judgeResult.reason || null : null,
        verdict: judgeResult.verdict || null
      }
    });
  }

  // 3. Winner Determination (Section 12)
  // Only eligible candidates are considered; simulated output never beats a live response
  const hasLiveEligible = candidateEvaluations.some(c => c.isEligible && !c.isSimulated);
  const eligibleCandidates = candidateEvaluations
    .filter(c => c.isEligible && (!hasLiveEligible || !c.isSimulated))
    .sort((a, b) => b.scores.overall - a.scores.overall);

  let winner = null;
  let recommendationReason = '';
  let nextAction = 'accept';

  if (eligibleCandidates.length === 0) {
    winner = null;
    recommendationReason = 'No recommended winner: all evaluated candidates failed critical constraints, contained errors, or omitted mandatory requirements.';
    nextAction = 'reject';
  } else {
    const topCandidate = eligibleCandidates[0];
    const runnerUp = eligibleCandidates[1] || null;

    winner = {
      modelId: topCandidate.modelId,
      modelName: topCandidate.modelName,
      score: topCandidate.scores.overall
    };

    if (runnerUp) {
      const diff = Math.round(Math.abs(topCandidate.scores.overall - runnerUp.scores.overall) * 10) / 10;
      if (diff <= 2.0) {
        recommendationReason = `Near-tied evaluation: ${topCandidate.modelName} (${topCandidate.scores.overall}) and ${runnerUp.modelName} (${runnerUp.scores.overall}) scored within ${diff} points of each other. Ranking is uncertain; review individual strengths to decide.`;
      } else {
        recommendationReason = `${topCandidate.modelName} scored highest (${topCandidate.scores.overall} vs ${runnerUp.scores.overall}). ` +
          `It demonstrated superior ${topCandidate.strengths[0]?.toLowerCase() || 'instruction adherence'} and higher requirement coverage.`;
      }
    } else {
      recommendationReason = `${topCandidate.modelName} achieved a validated evaluation score of ${topCandidate.scores.overall}/100 across all criteria.`;
    }

    if (topCandidate.status === 'needs_revision') {
      nextAction = 'revise';
    }
  }

  // Without a judge, two confident answers to a factual question that state different facts cannot be ranked
  // on correctness; say so rather than presenting the rule-based winner as right
  if (!judgeCoversAll && isShortQuestion) {
    const liveAnswers = responses.filter((r, i) => !r.isSimulated && candidateEvaluations[i]?.isEligible);
    const disagreement = detectAnswerDisagreement(originalPrompt, liveAnswers);
    if (disagreement) {
      conflicts.push(disagreement);
      if (winner) {
        recommendationReason += ' The answers disagree on the key fact, so this ranking does not confirm which one is correct.';
      }
    }
  }

  // Determine overall evaluation status
  // 'degraded' only when a judge was requested but did not run; judge off by choice is 'deterministic_only'
  const judgeRequested = options.enableLLMJudge === true || (Boolean(llmJudge) && options.enableLLMJudge !== false);
  let evaluationStatus = 'deterministic_only';
  if (judgeRequested) {
    evaluationStatus = judgeCoversAll ? 'complete' : 'degraded';
  }

  // Check if any finding has unverified evidence
  const hasUnverifiableClaims = allIssues.some(i => i.category === 'insufficient_evidence');

  return {
    evaluationStatus,
    evaluations: candidateEvaluations,
    winner,
    recommendationReason,
    weightsUsed: normalizedWeights,
    disclaimer: 'Critic scores are evidence-assisted assessments based on verifiable criteria.',
    requirementCoverage: {
      results: requirements.map(r => ({
        ...r,
        status: candidateEvaluations[0]?.requirementResults.find(res => res.id === r.id)?.status || 'unverifiable'
      })),
      coveragePercent: Math.round(
        candidateEvaluations.reduce((acc, c) => {
          const satisfied = c.requirementResults.filter(r => r.status === 'satisfied').length;
          return acc + (c.requirementResults.length > 0 ? (satisfied / c.requirementResults.length) : 1);
        }, 0) / candidateEvaluations.length * 100
      )
    },
    conflictsDetected: conflicts,
    issues: allIssues,
    criticalFailures: overallCriticalCount,
    nextAction,
    evaluationMetadata: {
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      weightsWarning,
      hasUnverifiableClaims,
      eligibleCandidatesCount: eligibleCandidates.length,
      // Set when a requested judge graded only some answers (scores then come from the rule checks for all)
      judgeNote: judgeAttempts.length > 0 && !judgeCoversAll
        ? `LLM judge graded ${judgeGraded} of ${judgeAttempts.length} answers, so all answers were ranked on rule checks${judgeGraded > 0 ? '; problems the judge found still count' : ''}.`
        : undefined,
      totalCandidatesCount: responses.length,
      taskCategory
    }
  };
}
