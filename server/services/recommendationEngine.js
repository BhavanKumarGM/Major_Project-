/**
 * Model Recommendation Engine for AI Hive Mind
 * Matches prompt intent with configurable model capability profiles
 * and outputs transparent, explainable recommendations.
 */

// Past Critic results start to count once a model has this many evaluated live answers
export const MIN_OBSERVATIONS = 3;
const OBSERVED_WEIGHT = 0.3;

/**
 * @param performance optional { [modelId]: { avgScore, count } } from memoryService.getModelPerformance()
 */
export function recommendModels(models, analysis, isAvailable = () => true, performance = {}) {
  const intentWeights = {};
  
  // Default mapping of prompt categories to capability profile keys
  const categoryToCapability = {
    'Coding': 'coding',
    'Reasoning & Logic': 'reasoning',
    'Documentation': 'summarization',
    'Research & Fact-finding': 'reasoning',
    'Creative Writing': 'creative',
    'Summarization': 'summarization',
    'General Assistance': 'general'
  };

  // Convert intent distribution to weights
  (analysis.intentDistribution || []).forEach(item => {
    const key = categoryToCapability[item.category] || 'general';
    intentWeights[key] = (intentWeights[key] || 0) + (item.percentage / 100);
  });

  // Ensure weights sum to 1
  const totalWeight = Object.values(intentWeights).reduce((a, b) => a + b, 0) || 1;
  for (const k in intentWeights) {
    intentWeights[k] = intentWeights[k] / totalWeight;
  }

  // Calculate score for each model
  const scoredModels = models.map(model => {
    let score = 0;
    const caps = model.capabilities || {};

    for (const [capKey, weight] of Object.entries(intentWeights)) {
      const capValue = caps[capKey] || 85;
      score += capValue * weight;
    }

    // Add speed consideration if general or prompt is simple
    if (analysis.ambiguityLevel === 'Low' && (caps.speed || 80) > 90) {
      score += 1.5; // slight speed bonus
    }

    const profileScore = Math.min(99, Math.max(50, Math.round(score * 10) / 10));

    // Blend in how this model actually scored with the Critic on this task type
    const observed = performance[model.id];
    const hasObserved = observed && observed.count >= MIN_OBSERVATIONS;
    const finalScore = hasObserved
      ? Math.min(99, Math.max(50, Math.round(((1 - OBSERVED_WEIGHT) * profileScore + OBSERVED_WEIGHT * observed.avgScore) * 10) / 10))
      : profileScore;

    // Formulate rationale based on prompt type and model traits
    let rationale = '';
    const isCoding = analysis.primaryCategory === 'Coding';
    const isReasoning = analysis.primaryCategory === 'Reasoning & Logic';

    if (model.id === 'claude-opus-5-5') {
      rationale = isCoding 
        ? 'Unmatched precision in syntax formatting, edge-case coverage, and clean algorithmic structure.'
        : 'Nuanced reasoning depth, structured explanations, and natural articulate prose.';
    } else if (model.id === 'gpt-4o') {
      rationale = isCoding
        ? 'High-speed code synthesis, strong logic verification, and balanced commentary.'
        : 'Versatile multi-domain knowledge with consistent instruction adherence and speed.';
    } else if (model.id === 'gemini-2-5-flash') {
      rationale = 'Ultra-low latency inference, large context handling, and rapid code generation.';
    } else if (model.id === 'llama-3-3-70b') {
      rationale = 'Open-weight reasoning model (GPT-OSS 120B) with fast responses on Groq.';
    } else if (model.id === 'sarvam-105b') {
      rationale = 'Large multilingual model with strong Indic-language coverage and balanced reasoning and coding profiles.';
    } else if (model.id === 'ollama-local') {
      rationale = 'Reliable local execution with complete data privacy and solid foundational performance.';
    } else {
      rationale = `Configured capability profile fits the detected ${analysis.primaryCategory || 'task'} intent.`;
    }

    return {
      ...model,
      recommendationScore: finalScore,
      profileScore,
      observedPerformance: observed ? { ...observed, applied: Boolean(hasObserved) } : null,
      recommendationRationale: hasObserved
        ? `${rationale} Averaged ${observed.avgScore}/100 across ${observed.count} past Critic evaluations for ${analysis.primaryCategory}.`
        : rationale,
      isTopPick: false,
      isAvailable: Boolean(isAvailable(model.id))
    };
  });

  // Models that can answer live come first, then by descending score
  scoredModels.sort((a, b) => (b.isAvailable - a.isAvailable) || (b.recommendationScore - a.recommendationScore));

  if (scoredModels.length > 0) {
    scoredModels[0].isTopPick = true;
  }

  const topPick = scoredModels[0];
  const runnerUp = scoredModels[1];

  return {
    topRecommendation: {
      modelId: topPick?.id,
      modelName: topPick?.name,
      score: topPick?.recommendationScore,
      provider: topPick?.provider,
      reason: `Configured suitability score of ${topPick?.recommendationScore}% for ${analysis.primaryCategory}. ${topPick?.recommendationRationale}`
    },
    runnerUp: runnerUp ? {
      modelId: runnerUp.id,
      modelName: runnerUp.name,
      score: runnerUp.recommendationScore,
      provider: runnerUp.provider,
      reason: runnerUp.recommendationRationale
    } : null,
    models: scoredModels,
    suggestedComparisonPair: scoredModels.length >= 2 ? [scoredModels[0].id, scoredModels[1].id] : [scoredModels[0]?.id]
  };
}
