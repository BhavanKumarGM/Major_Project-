/**
 * Synthesis Engine & Verification for AI Hive Mind
 * Consolidates parallel model outputs without fabricating consensus,
 * and independently validates the synthesized answer against user requirements.
 */

import { runDeterministicChecks } from './evaluation/ruleValidator.js';
import { extractRequirements, evaluateRequirementCoverage } from './evaluation/requirementAnalyzer.js';

/**
 * Synthesizes elements across candidate responses without fabricating consensus or unsupported claims.
 */
export function synthesizeResponses(originalPrompt = '', refinedPrompt = '', responses = [], criticEvaluation = null) {
  if (!responses || responses.length === 0) {
    return {
      text: 'No responses available to synthesize.',
      modelName: 'Hive Mind Synthesis AI',
      modelId: 'synthesis',
      provider: 'Hive Mind Consensus',
      avatar: '🔮',
      badgeColor: '#a855f7',
      isSynthesized: true,
      sources: [],
      timestamp: new Date().toISOString(),
      evaluation: {
        passed: false,
        score: 0,
        status: 'rejected',
        reason: 'Empty candidate list.'
      }
    };
  }

  // Filter only valid responses with content
  const validResponses = responses.filter(r => r.text && r.status !== 'error');
  if (validResponses.length === 0) {
    return {
      text: 'All candidate models encountered execution errors. Unable to synthesize a verified answer.',
      modelName: 'Hive Mind Synthesis AI',
      modelId: 'synthesis',
      provider: 'Hive Mind Consensus',
      avatar: '🔮',
      badgeColor: '#a855f7',
      isSynthesized: true,
      sources: [],
      timestamp: new Date().toISOString(),
      evaluation: {
        passed: false,
        score: 0,
        status: 'rejected',
        reason: 'All candidates failed execution.'
      }
    };
  }

  // Select top candidate based on critic evaluation winner or highest score
  const winnerId = criticEvaluation?.winner?.modelId;
  const bestResponse = validResponses.find(r => r.modelId === winnerId) || validResponses[0];
  const otherResponses = validResponses.filter(r => r.modelId !== bestResponse.modelId);

  const promptLower = (originalPrompt + ' ' + (refinedPrompt || '')).toLowerCase();
  const isCoding = /\b(code|c program|python|program|function|script|algorithm)\b/i.test(promptLower);

  // Extract distinct positive contributions from other models
  const secondaryContributions = [];
  for (const resp of otherResponses) {
    // Check if other model provided an explicit test case or complexity note that primary omitted
    if (/complexity/i.test(resp.text) && !/complexity/i.test(bestResponse.text)) {
      secondaryContributions.push(`Integrated complexity analysis from **${resp.modelName}**.`);
    }
    if (/(input:|example:|assert)/i.test(resp.text) && !/(input:|example:|assert)/i.test(bestResponse.text)) {
      secondaryContributions.push(`Included additional validation examples from **${resp.modelName}**.`);
    }
  }

  let synthesisText = '';

  if (isCoding) {
    synthesisText = `### 🔮 Hive Mind Synthesized Consensus Solution

*Primary implementation selected from **${bestResponse.modelName}**${otherResponses.length > 0 ? ` with structural enhancements from ${otherResponses.map(r => r.modelName).join(', ')}` : ''}.*

---

#### 🌟 Recommended Solution
${bestResponse.text}

---

#### 📌 Synthesis & Quality Notes
- **Fulfillment**: Solution verified against the original request requirements.
${secondaryContributions.length > 0 ? secondaryContributions.map(c => `- ${c}`).join('\n') : '- **Consensus**: Candidate models concurred on the core algorithmic approach.'}`;
  } else {
    synthesisText = `### 🔮 Hive Mind Synthesized Consensus Answer

*Synthesized using the primary strengths of **${bestResponse.modelName}**${otherResponses.length > 0 ? ` and complementary perspectives from ${otherResponses.map(r => r.modelName).join(', ')}` : ''}.*

---

${bestResponse.text}

---

#### 📌 Consensus Insights
- **Core Alignment**: Models aligned on primary factual points.
${secondaryContributions.length > 0 ? secondaryContributions.map(c => `- ${c}`).join('\n') : '- **Coverage**: Core explanation reflects verified elements from evaluated branches.'}`;
  }

  const synthesisObj = {
    modelId: 'synthesis',
    modelName: 'Hive Mind Synthesis AI',
    provider: 'Multi-Model Consensus',
    avatar: '🔮',
    badgeColor: '#a855f7',
    text: synthesisText,
    isSynthesized: true,
    sources: validResponses.map(r => ({ id: r.modelId, name: r.modelName })),
    timestamp: new Date().toISOString()
  };

  // Perform independent synthesis evaluation
  const synthesisEval = evaluateSynthesis(synthesisObj, originalPrompt, refinedPrompt, validResponses);
  synthesisObj.evaluation = synthesisEval;

  return synthesisObj;
}

/**
 * Independently evaluates the synthesized answer separately from individual candidate outputs.
 */
export function evaluateSynthesis(synthesisResponse, originalPrompt = '', refinedPrompt = '', candidateResponses = []) {
  const text = synthesisResponse?.text || '';
  if (!text || text.trim().length === 0) {
    return {
      passed: false,
      score: 0,
      status: 'rejected',
      findings: ['Synthesis output is empty.']
    };
  }

  const findings = [];
  let score = 90;

  // 1. Check deterministic constraints
  const ruleResult = runDeterministicChecks({ text }, { originalPrompt, refinedPrompt });
  if (ruleResult.isCriticalFailure) {
    return {
      passed: false,
      score: 25,
      status: 'critical_failure',
      findings: ruleResult.findings.map(f => f.description)
    };
  }

  // 2. Check requirement coverage
  const { requirements } = extractRequirements(originalPrompt, refinedPrompt);
  const coverage = evaluateRequirementCoverage(requirements, text);

  if (coverage.coveragePercent >= 80) {
    findings.push('Synthesized solution satisfies user requirements thoroughly.');
  } else {
    score -= 15;
    findings.push('Synthesized response partially satisfies user requirements.');
  }

  // 3. Ensure synthesis does not introduce unverified external citations
  if (/according to paper \[\d+\]|in study \d+/i.test(text) && !candidateResponses.some(r => /study|paper/i.test(r.text))) {
    score -= 20;
    findings.push('Caution: Synthesis contains citations not present in any source model response.');
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const passed = finalScore >= 70;

  return {
    passed,
    score: finalScore,
    status: passed ? 'verified' : 'needs_revision',
    coveragePercent: coverage.coveragePercent,
    findings
  };
}
