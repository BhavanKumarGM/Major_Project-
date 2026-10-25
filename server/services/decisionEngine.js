/**
 * Decision Model for AI Hive Mind
 * Chooses exactly one model for Single AI Mode. Ranking reuses the configured capability
 * profiles from the recommendation engine; real provider availability is a hard filter,
 * so a model without credentials is never picked for live execution.
 */

import { recommendModels, MIN_OBSERVATIONS } from './recommendationEngine.js';

/**
 * @param {object} params
 * @param {Array} params.models          configured model catalog
 * @param {object} params.analysis       analyzePrompt() output
 * @param {Function} params.isAvailable  modelId -> boolean (has real provider credentials)
 * @param {string|null} params.modelId   optional manual override (already validated by caller or here)
 * @param {boolean} params.allowSimulation explicit user opt-in to demo output when nothing is live
 * @param {object} params.performance   optional observed Critic results per model (see recommendModels)
 */
export function decideModel({ models = [], analysis = {}, isAvailable = () => false, modelId = null, allowSimulation = false, performance = {} }) {
  const recommendations = recommendModels(models, analysis, isAvailable, performance);

  // Eligibility for every configured model, in recommendation order
  const candidates = recommendations.models.map(m => ({
    modelId: m.id,
    modelName: m.name,
    provider: m.provider,
    suitabilityScore: m.recommendationScore,
    isAvailable: m.isAvailable,
    observedPerformance: m.observedPerformance,
    rationale: m.recommendationRationale
  }));

  const base = {
    candidates,
    recommendations,
    scoreDisclaimer: `Suitability comes from configured capability profiles. Once a model has ${MIN_OBSERVATIONS}+ evaluated live answers for this task type in this app, 30% of its score is its average Critic score; that is a rule-based score, not a benchmark.`,
    clarificationNotes: analysis.missingInfoNotes || []
  };

  if (modelId) {
    const chosen = candidates.find(c => c.modelId === modelId);
    if (!chosen) {
      return { ...base, status: 'invalid_model', selectedModelId: null, reason: `Unknown model id "${modelId}".` };
    }
    if (!chosen.isAvailable && !allowSimulation) {
      return {
        ...base,
        status: 'provider_unavailable',
        selectedModelId: chosen.modelId,
        selectedModelName: chosen.modelName,
        provider: chosen.provider,
        selectionMethod: 'manual',
        reason: `${chosen.modelName} has no API credentials configured. Add a ${chosen.provider} key in Settings, or explicitly run a demo simulation.`
      };
    }
    return {
      ...base,
      status: 'selected',
      selectedModelId: chosen.modelId,
      selectedModelName: chosen.modelName,
      provider: chosen.provider,
      selectionMethod: 'manual',
      isAvailable: chosen.isAvailable,
      willSimulate: !chosen.isAvailable,
      suitabilityScore: chosen.suitabilityScore,
      reason: `Manually selected by the user. ${chosen.rationale}`
    };
  }

  const liveCandidates = candidates.filter(c => c.isAvailable);
  if (liveCandidates.length === 0 && !allowSimulation) {
    return {
      ...base,
      status: 'no_live_provider',
      selectedModelId: null,
      selectionMethod: 'automatic',
      suggestedModelId: candidates[0]?.modelId || null,
      reason: 'No configured model has API credentials, so no real answer can be generated. Add a provider key in Settings, or explicitly run a demo simulation.'
    };
  }

  const chosen = liveCandidates[0] || candidates[0];
  if (!chosen) {
    return { ...base, status: 'no_models', selectedModelId: null, reason: 'No models are configured.' };
  }

  const category = analysis.primaryCategory || 'General';
  const skipped = candidates.filter(c => !c.isAvailable && c.suitabilityScore > chosen.suitabilityScore);
  const scoreLabel = chosen.observedPerformance?.applied ? 'combined suitability and past Critic score' : 'configured suitability';
  let reason = `Highest ${scoreLabel} (${chosen.suitabilityScore}) for ${category} among models with credentials. ${chosen.rationale}`;
  if (!chosen.isAvailable) {
    reason = `Demo simulation requested: ${chosen.modelName} has the highest configured suitability (${chosen.suitabilityScore}) for ${category}, but no credentials, so its answer will be simulated.`;
  } else if (skipped.length > 0) {
    reason += ` Skipped higher-scored but unconfigured: ${skipped.map(s => s.modelName).join(', ')}.`;
  }

  return {
    ...base,
    status: 'selected',
    selectedModelId: chosen.modelId,
    selectedModelName: chosen.modelName,
    provider: chosen.provider,
    selectionMethod: 'automatic',
    isAvailable: chosen.isAvailable,
    willSimulate: !chosen.isAvailable,
    suitabilityScore: chosen.suitabilityScore,
    reason
  };
}
