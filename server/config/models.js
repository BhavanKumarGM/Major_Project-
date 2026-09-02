export const DEFAULT_MODELS = [
  {
    id: "sarvam-105b",
    name: "Sarvam 105B",
    provider: "Sarvam AI",
    avatar: "🇮🇳",
    badgeColor: "#ff7700",
    description: "Sovereign 105B Indic foundation model with advanced multilingual reasoning, coding, and synthesis.",
    contextWindow: "128k tokens",
    latencyAvg: 950,
    capabilities: {
      coding: 93,
      reasoning: 95,
      creative: 94,
      summarization: 96,
      general: 95,
      speed: 88
    },
    status: "ready",
    isRecommendedDefault: true
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    avatar: "🧠",
    badgeColor: "#10a37f",
    description: "Flagship multimodal intelligence with superior reasoning and versatility.",
    contextWindow: "128k tokens",
    latencyAvg: 1100,
    capabilities: {
      coding: 94,
      reasoning: 95,
      creative: 92,
      summarization: 93,
      general: 96,
      speed: 85
    },
    status: "configured",
    isRecommendedDefault: true
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    avatar: "🎭",
    badgeColor: "#d97706",
    description: "State-of-the-art code generation, nuanced reasoning, and articulate writing.",
    contextWindow: "200k tokens",
    latencyAvg: 1250,
    capabilities: {
      coding: 97,
      reasoning: 96,
      creative: 95,
      summarization: 94,
      general: 95,
      speed: 82
    },
    status: "configured",
    isRecommendedDefault: true
  },
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    avatar: "✨",
    badgeColor: "#3b82f6",
    description: "Next-gen ultra-fast multimodal model with expansive context and precision.",
    contextWindow: "1M tokens",
    latencyAvg: 650,
    capabilities: {
      coding: 91,
      reasoning: 93,
      creative: 90,
      summarization: 96,
      general: 92,
      speed: 98
    },
    status: "configured",
    isRecommendedDefault: false
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B (Groq)",
    provider: "Groq",
    avatar: "⚡",
    badgeColor: "#f97316",
    description: "Blazing-fast open-weight powerhouse optimized for real-time coding and reasoning.",
    contextWindow: "128k tokens",
    latencyAvg: 380,
    capabilities: {
      coding: 90,
      reasoning: 89,
      creative: 88,
      summarization: 92,
      general: 90,
      speed: 99
    },
    status: "configured",
    isRecommendedDefault: false
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    avatar: "🔬",
    badgeColor: "#6366f1",
    description: "Advanced chain-of-thought open reasoning model specializing in math and complex logic.",
    contextWindow: "64k tokens",
    latencyAvg: 1600,
    capabilities: {
      coding: 96,
      reasoning: 98,
      creative: 80,
      summarization: 87,
      general: 91,
      speed: 70
    },
    status: "configured",
    isRecommendedDefault: false
  },
  {
    id: "ollama-local",
    name: "Ollama (Local)",
    provider: "Local AI",
    avatar: "🦙",
    badgeColor: "#8b5cf6",
    description: "Locally hosted private model running on your local machine (e.g. Qwen, Mistral).",
    contextWindow: "32k tokens",
    latencyAvg: 850,
    capabilities: {
      coding: 85,
      reasoning: 84,
      creative: 82,
      summarization: 85,
      general: 84,
      speed: 80
    },
    status: "configured",
    isRecommendedDefault: false
  }
];

export const DEFAULT_CRITIC_WEIGHTS = {
  correctness: 0.35,
  relevance: 0.20,
  completeness: 0.20,
  clarity: 0.15,
  instructionFollowing: 0.10
};
