/**
 * Standalone CLI Runner for Benchmark Classifier & Ranker Model
 * Usage:
 *   node server/classify-and-rank.js "Write a Python script to solve knapsack using dynamic programming"
 *   node server/classify-and-rank.js "Solve the differential equation dy/dx + 2y = 4x"
 *   node server/classify-and-rank.js "ಕನ್ನಡದಲ್ಲಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಬಗ್ಗೆ ಒಂದು ಸಣ್ಣ ಪ್ರಬಂಧ ಬರೆಯಿರಿ"
 */

import { BenchmarkRankerService } from './services/benchmarkRankerService.js';

const promptArg = process.argv.slice(2).join(' ') || 
  'Write a Python script to solve knapsack problem using dynamic programming and explain time complexity.';

console.log('\n===============================================================');
console.log('🤖 FUSION AI — BENCHMARK CLASSIFIER & MODEL RANKER');
console.log('===============================================================\n');

console.log(`📌 Input Prompt:\n"${promptArg}"\n`);

const result = BenchmarkRankerService.rankModelsForPrompt(promptArg);

console.log('---------------------------------------------------------------');
console.log(`🏷️  PROMPT CLASSIFICATION`);
console.log('---------------------------------------------------------------');
console.log(`• Primary Category  : ${result.categoryIcon} ${result.categoryName}`);
console.log(`• Confidence Score  : ${result.classification.confidence}%`);
if (result.classification.secondaryCategory) {
  console.log(`• Secondary Category: ${result.classification.secondaryDetails?.icon} ${result.classification.secondaryDetails?.name}`);
}
console.log(`• Detected Traits   : ${result.classification.detectedTraits.join(' | ')}`);
console.log(`• Description       : ${result.categoryDescription}\n`);

console.log('---------------------------------------------------------------');
console.log(`📊 BENCHMARK SUITE FOR THIS CATEGORY`);
console.log('---------------------------------------------------------------');
result.primaryBenchmarks.forEach(bm => {
  console.log(`  [${Math.round(bm.weight * 100)}% Weight] ${bm.name}: ${bm.description}`);
});
console.log('');

console.log('---------------------------------------------------------------');
console.log(`🏆 MODEL BENCHMARK LEADERBOARD (Ranked Best to Lowest)`);
console.log('---------------------------------------------------------------');

result.rankedModels.forEach(m => {
  const trophy = m.rank === 1 ? '🥇 WINNER' : m.rank === 2 ? '🥈 RUNNER-UP' : `   #${m.rank}`;
  console.log(`${trophy} | ${m.name.padEnd(22)} [${m.provider.padEnd(10)}] -> Composite: ${m.compositeScore}/100`);
  
  // Print benchmark metrics
  const metricsStr = m.benchmarkMetrics.map(b => `${b.name.split(' ')[0]}: ${b.value}${b.unit}`).join(' | ');
  console.log(`      Metrics: ${metricsStr} | LMSYS Elo: ${m.arenaElo}`);
  console.log(`      Key Strength: ${m.keyStrength}`);
  console.log('');
});

console.log('===============================================================');
console.log(`🎯 VERDICT & EXPLANATION`);
console.log('===============================================================');
console.log(result.verdictRationale);
console.log('===============================================================\n');
