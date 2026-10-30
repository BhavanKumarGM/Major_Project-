/**
 * Industry-Standard AI Benchmarks & Capability Dataset
 * Maps recognized academic & industry benchmarks (HumanEval, GSM8K, SWE-bench, MMLU-Pro, etc.)
 * across models for verifiable category-based ranking.
 */

export const BENCHMARK_CATEGORIES = {
  'coding': {
    id: 'coding',
    name: 'Coding & Software Engineering',
    icon: '💻',
    description: 'Algorithm generation, syntax precision, bug fixing, and software engineering.',
    primaryBenchmarks: [
      { id: 'humaneval', name: 'HumanEval (0-shot Python)', max: 100, unit: '%', weight: 0.45, description: 'Code synthesis accuracy on standard algorithmic problems' },
      { id: 'swebench', name: 'SWE-bench Lite', max: 100, unit: '%', weight: 0.35, description: 'Resolving real GitHub issues and multi-file codebases' },
      { id: 'mbpp', name: 'MBPP (Python Pass@1)', max: 100, unit: '%', weight: 0.20, description: 'Mostly Basic Python Problems correctness' }
    ],
    topMetricKey: 'humaneval'
  },
  'reasoning': {
    id: 'reasoning',
    name: 'Mathematics & Complex Reasoning',
    icon: '🔬',
    description: 'Multi-step deduction, competitive math, chain-of-thought logic, and hard reasoning.',
    primaryBenchmarks: [
      { id: 'gsm8k', name: 'GSM8K (5-shot)', max: 100, unit: '%', weight: 0.35, description: 'Grade-school multi-step mathematical word problems' },
      { id: 'math', name: 'MATH (Hard Competition)', max: 100, unit: '%', weight: 0.40, description: 'High-school competition math problem solving' },
      { id: 'gpqa', name: 'GPQA Diamond', max: 100, unit: '%', weight: 0.25, description: 'PhD-level biology, physics, and chemistry reasoning' }
    ],
    topMetricKey: 'math'
  },
  'multilingual': {
    id: 'multilingual',
    name: 'Indic & Multilingual Processing',
    icon: '🇮🇳',
    description: 'Vernacular comprehension, Indic script processing, and cross-lingual translation.',
    primaryBenchmarks: [
      { id: 'indicllm', name: 'IndicLLM Suite', max: 100, unit: '%', weight: 0.45, description: 'Multi-task evaluation across 22 scheduled Indian languages' },
      { id: 'bhashaeval', name: 'BhashaEval Benchmark', max: 100, unit: '%', weight: 0.35, description: 'Contextual nuance, grammar, and idiom preservation in Indic NLP' },
      { id: 'flores', name: 'Flores-200 Cross-lingual', max: 100, unit: '%', weight: 0.20, description: 'High-fidelity cross-lingual translation and zero-shot transfer' }
    ],
    topMetricKey: 'indicllm'
  },
  'knowledge': {
    id: 'knowledge',
    name: 'General Knowledge & Multidisciplinary',
    icon: '🧠',
    description: 'Broad academic breadth, factual QA, humanities, and STEM knowledge breadth.',
    primaryBenchmarks: [
      { id: 'mmlupro', name: 'MMLU-Pro (Reasoning-focused)', max: 100, unit: '%', weight: 0.50, description: 'Challenging college-level multidisciplinary evaluation' },
      { id: 'arenaelo', name: 'LMSYS Chatbot Arena Elo', max: 1350, unit: 'Elo', weight: 0.35, description: 'Crowd-sourced human blind pairwise preference ranking' },
      { id: 'arc', name: 'ARC-Challenge', max: 100, unit: '%', weight: 0.15, description: 'Complex scientific question answering requiring reasoning' }
    ],
    topMetricKey: 'mmlupro'
  },
  'summarization': {
    id: 'summarization',
    name: 'Summarization & Long-Context Retrieval',
    icon: '📑',
    description: 'Document extraction, synthesis, and Needle-in-a-Haystack recall over long contexts.',
    primaryBenchmarks: [
      { id: 'ruler', name: 'RULER (Effective Context 128k+)', max: 100, unit: '%', weight: 0.50, description: 'Needle-in-a-Haystack multi-hop context retrieval' },
      { id: 'qmsum', name: 'QMSum / LongEval', max: 100, unit: '%', weight: 0.30, description: 'Query-based meeting and document summarization fidelity' },
      { id: 'faithfulness', name: 'Hallucination Minimization', max: 100, unit: '%', weight: 0.20, description: 'Factual consistency rate against source reference texts' }
    ],
    topMetricKey: 'ruler'
  },
  'creative': {
    id: 'creative',
    name: 'Creative Writing & Conversational Style',
    icon: '🎭',
    description: 'Story generation, poetic flair, brainstorming, and engaging conversational tone.',
    primaryBenchmarks: [
      { id: 'mtbench', name: 'MT-Bench (Multi-turn Quality)', max: 10, unit: '/10', weight: 0.50, description: 'GPT-4 judged multi-turn conversational quality' },
      { id: 'creativeelo', name: 'Creative Writing Arena Elo', max: 1350, unit: 'Elo', weight: 0.35, description: 'Human preference for creative prose and storytelling' },
      { id: 'variety', name: 'Lexical Diversity Index', max: 100, unit: '%', weight: 0.15, description: 'Vocabulary richness and avoidance of generic boilerplate' }
    ],
    topMetricKey: 'mtbench'
  },
  'instruction': {
    id: 'instruction',
    name: 'Instruction Following & Constraint Compliance',
    icon: '🎯',
    description: 'Strict adherence to negative constraints, specific formatting, and JSON schemas.',
    primaryBenchmarks: [
      { id: 'ifeval', name: 'IFEval (Strict Constraint Following)', max: 100, unit: '%', weight: 0.60, description: 'Verifiable constraint satisfaction (word counts, JSON, no-mentions)' },
      { id: 'jsonformat', name: 'Schema & JSON Adherence', max: 100, unit: '%', weight: 0.25, description: 'Strict output structure validation without preamble' },
      { id: 'negativecon', name: 'Negative Constraint Adherence', max: 100, unit: '%', weight: 0.15, description: 'Adherence to forbidden words or excluded elements' }
    ],
    topMetricKey: 'ifeval'
  }
};

/**
 * Benchmark profiles for the models the app can run (keyed by model id in config/models.js).
 * Scores are hand-entered reference values, not measured by this app; verify them against
 * the published leaderboards before relying on them. The Gemini 2.5 Flash entry still
 * carries figures recorded for Gemini 2.0 Flash. Models without a profile here (e.g.
 * Claude Opus 5.5) are listed as unranked rather than given invented numbers.
 */
export const MODEL_BENCHMARKS = {
  'gpt-4o': {
    name: 'GPT-4o',
    provider: 'OpenAI',
    scores: {
      humaneval: 90.2,
      swebench: 38.8,
      mbpp: 87.2,
      gsm8k: 95.8,
      math: 76.6,
      gpqa: 53.6,
      indicllm: 76.0,
      bhashaeval: 77.8,
      flores: 89.5,
      mmlupro: 72.6,
      arenaelo: 1286,
      arc: 96.3,
      ruler: 93.0,
      qmsum: 90.5,
      faithfulness: 93.5,
      mtbench: 9.1,
      creativeelo: 1280,
      variety: 92.0,
      ifeval: 84.3,
      jsonformat: 96.0,
      negativecon: 90.0
    },
    standoutCategory: 'knowledge',
    standoutBadge: 'Arena Elo Leader',
    keyStrength: 'Peak LMSYS Arena Elo (1286) with versatile multimodal capabilities and balanced cross-domain consistency.'
  },
  'sarvam-105b': {
    name: 'Sarvam 105B',
    provider: 'Sarvam AI',
    scores: {
      humaneval: 78.5,
      swebench: 28.0,
      mbpp: 76.0,
      gsm8k: 82.4,
      math: 68.5,
      gpqa: 46.0,
      indicllm: 92.4,
      bhashaeval: 94.1,
      flores: 91.8,
      mmlupro: 65.0,
      arenaelo: 1210,
      arc: 89.0,
      ruler: 88.0,
      qmsum: 89.0,
      faithfulness: 93.0,
      mtbench: 8.7,
      creativeelo: 1225,
      variety: 93.5,
      ifeval: 83.0,
      jsonformat: 91.0,
      negativecon: 88.0
    },
    standoutCategory: 'multilingual',
    standoutBadge: 'Indic Sovereign Leader',
    keyStrength: 'Dominates IndicLLM (92.4%) and BhashaEval (94.1%) across 22 Indian languages with culturally grounded nuance.'
  },
  'gemini-2-5-flash': {
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    scores: {
      humaneval: 82.5,
      swebench: 32.0,
      mbpp: 81.0,
      gsm8k: 91.2,
      math: 71.0,
      gpqa: 52.0,
      indicllm: 75.0,
      bhashaeval: 76.0,
      flores: 88.0,
      mmlupro: 69.5,
      arenaelo: 1245,
      arc: 93.5,
      ruler: 96.8,
      qmsum: 92.5,
      faithfulness: 92.0,
      mtbench: 8.6,
      creativeelo: 1230,
      variety: 90.0,
      ifeval: 81.0,
      jsonformat: 93.0,
      negativecon: 86.0
    },
    standoutCategory: 'summarization',
    standoutBadge: 'Long-Context & Speed',
    keyStrength: 'Leads RULER benchmark (96.8%) with an expansive 1M context window and rapid 650ms average latency.'
  },
  // 'llama-3-3-70b' has no profile: Groq now serves GPT-OSS 120B under that id, and the Llama 3.3 70B
  // scores that used to be here do not describe it. The ranker lists it as unranked.
  'ollama-local': {
    name: 'Ollama (Local)',
    provider: 'Local AI',
    scores: {
      humaneval: 71.0,
      swebench: 22.0,
      mbpp: 72.0,
      gsm8k: 77.0,
      math: 52.0,
      gpqa: 38.0,
      indicllm: 55.0,
      bhashaeval: 56.0,
      flores: 75.0,
      mmlupro: 58.0,
      arenaelo: 1140,
      arc: 84.0,
      ruler: 78.0,
      qmsum: 80.0,
      faithfulness: 86.0,
      mtbench: 7.8,
      creativeelo: 1150,
      variety: 82.0,
      ifeval: 72.0,
      jsonformat: 84.0,
      negativecon: 78.0
    },
    standoutCategory: 'instruction',
    standoutBadge: 'Privacy & Local',
    keyStrength: '100% private offline inference with zero telemetry, suitable for confidential workloads.'
  }
};
