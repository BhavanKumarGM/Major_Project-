/**
 * Error Classification and Root-Cause Diagnostics Layer
 * Defines structured issue categories, root-cause attribution, and diagnostic records.
 */

export const ISSUE_CATEGORIES = [
  'factual_error',
  'unsupported_claim',
  'logical_contradiction',
  'missing_requirement',
  'instruction_violation',
  'format_violation',
  'incomplete_response',
  'code_validation_failure',
  'insufficient_evidence',
  'provider_error',
  'evaluation_error'
];

export const RESPONSIBLE_STAGES = [
  'prompt_refinement',
  'decision_model',
  'provider_or_execution',
  'evaluation_agent',
  'input_or_context',
  'unknown'
];

export const SEVERITIES = ['critical', 'high', 'medium', 'low', 'info'];

let issueCounter = 1;

/**
 * Creates a normalized diagnostic issue object.
 */
export function createDiagnosticIssue({
  category = 'evaluation_error',
  severity = 'medium',
  description = '',
  evidence = '',
  likelySource = 'unknown',
  recommendedCorrection = '',
  isCritical = false,
  modelId = null
}) {
  const safeCategory = ISSUE_CATEGORIES.includes(category) ? category : 'evaluation_error';
  const safeSeverity = SEVERITIES.includes(severity) ? severity : 'medium';
  const safeSource = RESPONSIBLE_STAGES.includes(likelySource) ? likelySource : 'unknown';
  const critical = isCritical || safeSeverity === 'critical';

  return {
    id: `diag-${Date.now().toString(36)}-${issueCounter++}`,
    modelId,
    category: safeCategory,
    severity: safeSeverity,
    description: String(description).trim(),
    evidence: String(evidence).trim(),
    likelySource: safeSource,
    recommendedCorrection: String(recommendedCorrection).trim(),
    isCritical: critical
  };
}

/**
 * Attributes the root cause based on execution context and artifacts.
 * If artifacts do not decisively establish responsibility, defaults to 'unknown'.
 */
export function attributeRootCause({
  issueCategory,
  hasRefinementArtifacts = false,
  wasConstraintInOriginalPrompt = true,
  wasConstraintInRefinedPrompt = true,
  isProviderError = false,
  isModelOutputViolation = false
}) {
  if (isProviderError) {
    return 'provider_or_execution';
  }

  // If a user constraint was present in original prompt but dropped during refinement
  if (wasConstraintInOriginalPrompt && !wasConstraintInRefinedPrompt && hasRefinementArtifacts) {
    return 'prompt_refinement';
  }

  // If the constraint was preserved in refined prompt, but candidate output omitted it
  if (wasConstraintInRefinedPrompt && isModelOutputViolation) {
    return 'decision_model';
  }

  if (issueCategory === 'insufficient_evidence') {
    return 'input_or_context';
  }

  return 'unknown';
}
