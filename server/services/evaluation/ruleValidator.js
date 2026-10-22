/**
 * Deterministic Rule-Based Validation Layer
 * Evaluates candidates against verifiable constraints: empty text, syntax/format,
 * negative constraints, weight normalization, and truncation.
 */

import { DEFAULT_CRITIC_WEIGHTS } from '../../config/models.js';

/**
 * Validates and normalizes evaluation weights.
 * Safe fallback to DEFAULT_CRITIC_WEIGHTS if invalid or non-positive.
 */
export function validateAndNormalizeWeights(customWeights = {}) {
  const base = { ...DEFAULT_CRITIC_WEIGHTS, ...customWeights };
  const keys = ['correctness', 'relevance', 'completeness', 'clarity', 'instructionFollowing'];
  
  let isValid = true;
  let errorMsg = null;
  const numericWeights = {};

  for (const k of keys) {
    const val = Number(base[k]);
    if (typeof val !== 'number' || isNaN(val) || !isFinite(val) || val < 0) {
      isValid = false;
      errorMsg = `Weight '${k}' must be a finite, non-negative number. Received: ${base[k]}`;
      break;
    }
    numericWeights[k] = val;
  }

  const sum = keys.reduce((acc, k) => acc + (numericWeights[k] || 0), 0);
  if (sum <= 0) {
    isValid = false;
    errorMsg = 'Sum of evaluation weights must be strictly greater than 0.';
  }

  if (!isValid) {
    return {
      valid: false,
      normalized: { ...DEFAULT_CRITIC_WEIGHTS },
      raw: customWeights,
      warning: `${errorMsg} Defaulting to standard normalized weights.`
    };
  }

  // Normalize so weights sum strictly to 1.0
  const normalized = {};
  for (const k of keys) {
    normalized[k] = Math.round((numericWeights[k] / sum) * 10000) / 10000;
  }

  return {
    valid: true,
    normalized,
    raw: customWeights,
    warning: null
  };
}

/**
 * Deterministically checks a candidate response for structural, negative constraint,
 * and format violations.
 */
export function runDeterministicChecks(candidate, promptContext = {}) {
  const findings = [];
  let isCriticalFailure = false;
  let isEligible = true;

  const originalPrompt = (promptContext.originalPrompt || '').trim();
  const refinedPrompt = (promptContext.refinedPrompt || '').trim();
  const fullPromptText = `${originalPrompt} ${refinedPrompt}`.toLowerCase();
  const constraints = promptContext.constraints || [];

  const text = candidate.text != null ? String(candidate.text).trim() : '';
  const textLower = text.toLowerCase();

  // 1. Empty or malformed response
  if (!text || text.length === 0) {
    isCriticalFailure = true;
    isEligible = false;
    findings.push({
      id: 'rule-empty-response',
      rule: 'non_empty_content',
      status: 'fail',
      severity: 'critical',
      category: 'incomplete_response',
      description: 'Candidate response is empty or contains only whitespace.',
      evidence: `Response length: ${text.length} characters.`,
      likelySource: candidate.status === 'error' ? 'provider_or_execution' : 'decision_model',
      recommendedCorrection: 'Regenerate response ensuring the model produces complete content.'
    });
    return {
      passed: false,
      isCriticalFailure,
      isEligible,
      findings
    };
  }

  // 2. Provider execution error returned as content
  if (candidate.status === 'error' || /\[error from|failed to generate|internal server error|rate limit exceeded/i.test(text)) {
    isCriticalFailure = true;
    isEligible = false;
    findings.push({
      id: 'rule-provider-error',
      rule: 'error_free_execution',
      status: 'fail',
      severity: 'critical',
      category: 'provider_error',
      description: 'Candidate execution encountered an upstream error or returned an error payload.',
      evidence: text.substring(0, 150),
      likelySource: 'provider_or_execution',
      recommendedCorrection: 'Check provider API keys, quota, or network connectivity before retrying.'
    });
  }

  // 3. Output Format Checks: JSON Requirement
  const requiresJson = /\b(json|json format|valid json|json schema|return a json object|in json)\b/i.test(fullPromptText);
  if (requiresJson) {
    let jsonValid = false;
    let jsonSnippet = '';
    // Look for json inside ```json ... ``` or raw {...} / [...]
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      jsonSnippet = jsonMatch[1] || jsonMatch[0];
      try {
        JSON.parse(jsonSnippet);
        jsonValid = true;
      } catch (err) {
        jsonValid = false;
      }
    }

    if (jsonValid) {
      findings.push({
        id: 'rule-format-json',
        rule: 'json_syntax_validation',
        status: 'pass',
        severity: 'low',
        category: 'format_violation',
        description: 'Successfully parsed and validated requested JSON output structure.',
        evidence: jsonSnippet.substring(0, 100),
        likelySource: 'decision_model'
      });
    } else {
      isCriticalFailure = true;
      findings.push({
        id: 'rule-format-json',
        rule: 'json_syntax_validation',
        status: 'fail',
        severity: 'critical',
        category: 'format_violation',
        description: 'User prompt requested valid JSON output, but response failed JSON parsing.',
        evidence: text.substring(0, 150),
        likelySource: 'decision_model',
        recommendedCorrection: 'Format the output as strictly valid JSON without conversational wrapper text.'
      });
    }
  }

  // 4. Output Format Checks: Code blocks when code explicitly requested
  const requiresCode = /\b(code|function|program|script|c program|python script|implementation)\b/i.test(fullPromptText);
  if (requiresCode) {
    const hasCodeBlock = /```[a-z0-9_-]*[\s\S]*?```/i.test(text);
    if (hasCodeBlock) {
      findings.push({
        id: 'rule-code-fence',
        rule: 'code_block_structure',
        status: 'pass',
        severity: 'low',
        category: 'code_validation_failure',
        description: 'Formatted markdown code block provided as requested.',
        evidence: 'Code block detected.',
        likelySource: 'decision_model'
      });
    } else {
      findings.push({
        id: 'rule-code-fence',
        rule: 'code_block_structure',
        status: 'fail',
        severity: 'medium',
        category: 'code_validation_failure',
        description: 'Code implementation requested but missing explicit markdown code fence block.',
        evidence: text.substring(0, 100),
        likelySource: 'decision_model',
        recommendedCorrection: 'Enclose programming solutions in standard markdown triple backticks with language specifier.'
      });
    }
  }

  // 5. Negative Constraints & Prohibited Elements
  // Check for "without ...", "no ...", "do not use ...", "avoid ..."
  const negativePatterns = [
    {
      regex: /\b(without (?:using )?external librar(?:y|ies)|no external librar(?:y|ies)|pure (?:python|c|js)|standard library only)\b/i,
      prohibitedRegex: /\b(pip install|npm install|import (?:numpy|pandas|requests|axios|lodash|scipy|react))\b/i,
      name: 'No External Libraries'
    },
    {
      regex: /\b(no recursion|without (?:using )?recursion|iterative(?:ly)? only)\b/i,
      prohibitedRegex: /\b(recurse|recursive call|self\(|fibonacci\((?:n-1|n-2)\))\b/i,
      name: 'Prohibit Recursion'
    },
    {
      regex: /\b(no loops?|without (?:using )?loops?|without while|without for)\b/i,
      prohibitedRegex: /\b(for\s*\(|while\s*\(|for\s+\w+\s+in\s+)\b/i,
      name: 'Prohibit Loops'
    }
  ];

  for (const neg of negativePatterns) {
    if (neg.regex.test(fullPromptText)) {
      if (neg.prohibitedRegex.test(text)) {
        isCriticalFailure = true;
        findings.push({
          id: `rule-negative-constraint-${neg.name.toLowerCase().replace(/\s+/g, '-')}`,
          rule: `prohibited_${neg.name}`,
          status: 'fail',
          severity: 'critical',
          category: 'instruction_violation',
          description: `Violated explicit negative constraint: "${neg.name}".`,
          evidence: (text.match(neg.prohibitedRegex) || [])[0] || 'Prohibited pattern found',
          likelySource: 'decision_model',
          recommendedCorrection: `Ensure the response strictly complies with the constraint "${neg.name}".`
        });
      } else {
        findings.push({
          id: `rule-negative-constraint-${neg.name.toLowerCase().replace(/\s+/g, '-')}`,
          rule: `prohibited_${neg.name}`,
          status: 'pass',
          severity: 'low',
          category: 'instruction_violation',
          description: `Successfully adhered to negative constraint: "${neg.name}".`,
          evidence: 'No prohibited construct detected.',
          likelySource: 'decision_model'
        });
      }
    }
  }

  // 6. Explicitly requested sections check
  const requestedSections = [
    { pattern: /\b(time complexity|space complexity|complexity analysis)\b/i, name: 'Complexity Analysis' },
    { pattern: /\b(test cases?|sample inputs?|example usage|example inputs?)\b/i, name: 'Sample Test Cases / Usage' },
    { pattern: /\b(step-by-step|explanation of the logic|explain the logic|walkthrough)\b/i, name: 'Step-by-step Logic Explanation' }
  ];

  for (const sec of requestedSections) {
    if (sec.pattern.test(fullPromptText)) {
      const presentInResponse = sec.pattern.test(textLower) || 
        (/\bcomplexity\b/i.test(textLower) && sec.name === 'Complexity Analysis') ||
        (/\b(input:|output:|example:)/i.test(textLower) && sec.name === 'Sample Test Cases / Usage');

      if (!presentInResponse) {
        findings.push({
          id: `rule-missing-section-${sec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          rule: `section_${sec.name}`,
          status: 'fail',
          severity: 'high',
          category: 'missing_requirement',
          description: `Prompt requested "${sec.name}", but it was omitted from the candidate response.`,
          evidence: 'Section not located in candidate text.',
          likelySource: 'decision_model',
          recommendedCorrection: `Include an explicit section for ${sec.name}.`
        });
      } else {
        findings.push({
          id: `rule-missing-section-${sec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          rule: `section_${sec.name}`,
          status: 'pass',
          severity: 'low',
          category: 'missing_requirement',
          description: `Provided requested section: "${sec.name}".`,
          evidence: 'Section identified in text.',
          likelySource: 'decision_model'
        });
      }
    }
  }

  // 7. Incomplete generation check (unclosed code fences or abrupt cut-off)
  const codeFenceCount = (text.match(/```/g) || []).length;
  if (codeFenceCount % 2 !== 0) {
    findings.push({
      id: 'rule-unclosed-code-block',
      rule: 'complete_generation',
      status: 'fail',
      severity: 'high',
      category: 'incomplete_response',
      description: 'Candidate response contains an unclosed code block (odd number of code fences), indicating truncated generation.',
      evidence: `Detected ${codeFenceCount} code fence delimiters.`,
      likelySource: 'provider_or_execution',
      recommendedCorrection: 'Increase token budget or regenerate to ensure response terminates completely.'
    });
  }

  const hasCritical = findings.some(f => f.status === 'fail' && f.severity === 'critical');
  if (hasCritical) {
    isCriticalFailure = true;
    isEligible = false;
  }

  return {
    passed: !hasCritical,
    isCriticalFailure,
    isEligible,
    findings
  };
}
