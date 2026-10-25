/**
 * Benchmark Intelligence & Model Ranker Engine
 * 
 * 1. Deeply classifies prompts into distinct task categories with confidence weights.
 * 2. Cross-references verified academic & industry benchmarks (HumanEval, GSM8K, SWE-bench, etc.).
 * 3. Ranks models by verifiable benchmark performance tailored to the prompt's category.
 */

import { BENCHMARK_CATEGORIES, MODEL_BENCHMARKS } from '../config/benchmarks.js';

// Benchmark profiles limited to the models currently configured (all profiles when none given)
function profilesFor(models) {
  const entries = Object.entries(MODEL_BENCHMARKS);
  if (!Array.isArray(models)) return entries;
  const ids = new Set(models.map(m => m.id));
  return entries.filter(([id]) => ids.has(id));
}

export class BenchmarkRankerService {
  /**
   * Classify prompt into categories with confidence scores
   */
  static classifyPrompt(rawPrompt = '') {
    if (!rawPrompt || typeof rawPrompt !== 'string' || !rawPrompt.trim()) {
      return {
        primaryCategory: 'knowledge',
        categoryDetails: BENCHMARK_CATEGORIES['knowledge'],
        secondaryCategory: null,
        confidence: 100,
        distribution: [{ category: 'knowledge', name: BENCHMARK_CATEGORIES['knowledge'].name, percentage: 100 }],
        detectedTraits: ['General inquiry']
      };
    }

    const prompt = rawPrompt.trim();
    const lower = prompt.toLowerCase();

    // Signal scoring buckets
    const scores = {
      coding: 0,
      reasoning: 0,
      multilingual: 0,
      summarization: 0,
      creative: 0,
      instruction: 0,
      knowledge: 5 // baseline prior
    };

    const detectedTraits = [];

    // --- 1. Coding Signals ---
    const codeTechs = [
      /\b(python|javascript|typescript|c\+\+|golang|rust|java|c program|c language|sql|html|css|react|node|docker|bash|git)\b/i,
      /\b(function|class|algorithm|recursion|binary tree|linked list|dynamic programming|regex|api endpoint|frontend|backend)\b/i,
      /\b(def |const |let |var |import |#include|public static void|SELECT \* FROM)\b/i,
      /```[\s\S]*?```/,
      /\b(debug|fix this code|syntax error|refactor|unit test|compile)\b/i
    ];
    if (codeTechs.some(regex => regex.test(prompt))) {
      scores.coding += 55;
      detectedTraits.push('Source code / programming syntax detected');
    }
    if (/\b(prime|fibonacci|knapsack|sorting|array|matrix|graph|json)\b/i.test(lower)) {
      scores.coding += 30;
    }

    // --- 2. Mathematics & Reasoning Signals ---
    const mathSignals = [
      /\b(prove|theorem|integral|derivative|calculus|algebra|matrix|probability|permutations|combinations|logarithm)\b/i,
      /\b(solve for x|equation|math problem|step by step reasoning|deduction|logic puzzle|riddle)\b/i,
      /(\d+[\+\-\*\/]\d+|\b[xyz]\^2\b|\bsqrt\b|\bpi\b|\be\^x\b)/i,
      /\b(if and only if|hypothesis|premise|syllogism|contradiction)\b/i
    ];
    if (mathSignals.some(regex => regex.test(prompt))) {
      scores.reasoning += 50;
      detectedTraits.push('Mathematical logic / formal reasoning triggers');
    }

    // --- 3. Indic & Multilingual Signals ---
    // Unicode ranges: Devanagari (\u0900-\u097F), Bengali (\u0980-\u09FF), Gurmukhi (\u0A00-\u0A7F),
    // Gujarati (\u0A80-\u0AFF), Tamil (\u0B80-\u0BFF), Telugu (\u0C00-\u0C7F), Kannada (\u0C80-\u0CFF), Malayalam (\u0D00-\u0D7F)
    const indicScriptPattern = /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]/;
    const indicKeywords = /\b(hindi|tamil|telugu|kannada|malayalam|bengali|marathi|sanskrit|gujarati|bhasha|translation|translate to)\b/i;
    
    if (indicScriptPattern.test(prompt)) {
      scores.multilingual += 80;
      detectedTraits.push('Native Indic script detected (Devanagari/Dravidian/Eastern Indic)');
    } else if (indicKeywords.test(prompt)) {
      scores.multilingual += 60;
      detectedTraits.push('Multilingual / Indic translation intent');
    }

    // --- 4. Summarization Signals ---
    if (/\b(summarize|summary|tldr|tl;dr|key takeaways|executive summary|condense|bullet points of|extract main points)\b/i.test(lower)) {
      scores.summarization += 60;
      detectedTraits.push('Text summarization & condensation request');
    }
    if (prompt.length > 800) {
      scores.summarization += 20;
      detectedTraits.push('Extensive long-context input (>800 chars)');
    }

    // --- 5. Creative Writing Signals ---
    if (/\b(write a story|write a poem|compose a poem|creative writing|fiction|dialogue between|brainstorm creative|novel|screenplay|rhyme|metaphor|haiku|fairy tale)\b/i.test(lower)) {
      scores.creative += 60;
      detectedTraits.push('Creative storytelling & expressive generation');
    }

    // --- 6. Instruction Following & Constraints Signals ---
    if (/\b(strictly|do not include|only return json|without preamble|must be exactly|word limit|follow these rules|format as table)\b/i.test(lower)) {
      scores.instruction += 45;
      detectedTraits.push('Explicit negative or structural constraints flagged');
    }

    // --- 7. General Knowledge Signals ---
    if (/\b(what is|explain|who was|history of|overview|describe|difference between|how does|why is)\b/i.test(lower)) {
      scores.knowledge += 35;
      detectedTraits.push('Factual explanation / conceptual overview');
    }

    // Total score calculation
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    
    // Sort categories by score
    const sortedCategories = Object.entries(scores)
      .map(([cat, val]) => ({
        category: cat,
        name: BENCHMARK_CATEGORIES[cat]?.name || cat,
        percentage: Math.round((val / totalScore) * 100)
      }))
      .filter(item => item.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);

    const primaryCategory = sortedCategories[0]?.category || 'knowledge';
    const secondaryCategory = sortedCategories[1]?.percentage > 15 ? sortedCategories[1].category : null;

    return {
      primaryCategory,
      categoryDetails: BENCHMARK_CATEGORIES[primaryCategory],
      secondaryCategory,
      secondaryDetails: secondaryCategory ? BENCHMARK_CATEGORIES[secondaryCategory] : null,
      confidence: sortedCategories[0]?.percentage || 100,
      distribution: sortedCategories,
      detectedTraits
    };
  }

  /**
   * Rank all models for the given prompt's classified category using verified benchmarks
   */
  static rankModelsForPrompt(rawPrompt, models = null) {
    const classification = this.classifyPrompt(rawPrompt);
    const primaryCat = classification.primaryCategory;
    const catConfig = BENCHMARK_CATEGORIES[primaryCat];

    // Compute composite benchmark score for each model
    const scoredList = profilesFor(models).map(([modelId, data]) => {
      let weightedSum = 0;
      let totalWeight = 0;

      // Primary Category Benchmarks
      const benchmarkDetails = catConfig.primaryBenchmarks.map(bm => {
        let rawVal = data.scores[bm.id];
        // Handle max normalization (e.g., MT-Bench is out of 10, Arena Elo out of 1350)
        let normalizedVal = rawVal;
        if (bm.max === 10) {
          normalizedVal = (rawVal / 10) * 100;
        } else if (bm.max === 1350) {
          normalizedVal = Math.min(100, Math.max(50, ((rawVal - 1000) / 350) * 100));
        }

        weightedSum += normalizedVal * bm.weight;
        totalWeight += bm.weight;

        return {
          id: bm.id,
          name: bm.name,
          value: rawVal,
          unit: bm.unit,
          description: bm.description,
          isKeyMetric: bm.id === catConfig.topMetricKey
        };
      });

      let compositeScore = Math.round((weightedSum / (totalWeight || 1)) * 10) / 10;

      // Minor secondary category blending if significant
      if (classification.secondaryCategory) {
        const secCatConfig = BENCHMARK_CATEGORIES[classification.secondaryCategory];
        let secSum = 0;
        let secWeight = 0;
        secCatConfig.primaryBenchmarks.forEach(bm => {
          let rawVal = data.scores[bm.id];
          let norm = bm.max === 10 ? (rawVal / 10) * 100 : (bm.max === 1350 ? ((rawVal - 1000) / 350) * 100 : rawVal);
          secSum += norm * bm.weight;
          secWeight += bm.weight;
        });
        const secComposite = secSum / (secWeight || 1);
        compositeScore = Math.round(((compositeScore * 0.8) + (secComposite * 0.2)) * 10) / 10;
      }

      // Add general LMSYS Arena Elo calibration (bonus for high crowd preference)
      const elo = data.scores.arenaelo || 1200;
      const eloBonus = Math.round(((elo - 1200) / 40) * 10) / 10;
      const finalRankScore = Math.min(99.5, Math.max(55, Math.round((compositeScore + (eloBonus * 0.2)) * 10) / 10));

      return {
        modelId,
        name: data.name,
        provider: data.provider,
        compositeScore: finalRankScore,
        standoutBadge: data.standoutBadge,
        keyStrength: data.keyStrength,
        benchmarkMetrics: benchmarkDetails,
        arenaElo: data.scores.arenaelo,
        isStandoutForCategory: data.standoutCategory === primaryCat
      };
    });

    // Sort descending by composite score
    scoredList.sort((a, b) => b.compositeScore - a.compositeScore);

    // Annotate rank
    scoredList.forEach((item, index) => {
      item.rank = index + 1;
      item.isWinner = index === 0;
    });

    const winner = scoredList[0] || null;
    const runnerUp = scoredList[1] || null;

    // Configured models with no benchmark profile are reported, not scored
    const unrankedModels = (Array.isArray(models) ? models : [])
      .filter(m => !MODEL_BENCHMARKS[m.id])
      .map(m => ({ modelId: m.id, name: m.name, provider: m.provider, reason: 'No benchmark data recorded for this model.' }));

    // Formulate transparent explanation
    let rationale = 'No configured model has benchmark data for this category.';
    if (winner) {
      rationale = `${winner.name} ranks #1 for ${catConfig.name} with a composite benchmark score of ${winner.compositeScore}/100. ${winner.keyStrength}`;
      if (runnerUp) {
        rationale += ` It outperforms runner-up ${runnerUp.name} (${runnerUp.compositeScore}/100) on the ${catConfig.primaryBenchmarks[0]?.name} benchmark.`;
      }
    }

    return {
      prompt: rawPrompt,
      classification,
      categoryName: catConfig.name,
      categoryIcon: catConfig.icon,
      categoryDescription: catConfig.description,
      primaryBenchmarks: catConfig.primaryBenchmarks,
      topRankedModel: winner,
      runnerUpModel: runnerUp,
      rankedModels: scoredList,
      unrankedModels,
      verdictRationale: rationale
    };
  }

  /**
   * Get all benchmark categories and leaderboards
   */
  static getAllCategories(models = null) {
    return Object.values(BENCHMARK_CATEGORIES).map(cat => {
      // Find top model for this category
      const topModelEntry = profilesFor(models).map(([id, d]) => {
        let sum = 0;
        cat.primaryBenchmarks.forEach(bm => {
          let v = d.scores[bm.id];
          if (bm.max === 10) v = (v / 10) * 100;
          if (bm.max === 1350) v = ((v - 1000) / 350) * 100;
          sum += v * bm.weight;
        });
        return { id, name: d.name, score: Math.round(sum * 10) / 10, badge: d.standoutBadge };
      }).sort((a, b) => b.score - a.score)[0] || null;

      return {
        ...cat,
        topModel: topModelEntry
      };
    });
  }
}
