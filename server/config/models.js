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
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
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
    isRecommendedDefault: true
  },
  {
    // Id kept for saved chats and settings; Groq stopped serving Llama chat models, so this runs GPT-OSS 120B
    id: "llama-3-3-70b",
    name: "GPT-OSS 120B (Groq)",
    provider: "Groq",
    avatar: "⚡",
    badgeColor: "#f97316",
    description: "OpenAI's open-weight 120B reasoning model, served on Groq's low-latency hardware.",
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
    isRecommendedDefault: true
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    avatar: "🧠",
    badgeColor: "#10a37f",
    description: "OpenAI's multimodal flagship. Requires an OpenAI API key.",
    contextWindow: "128k tokens",
    latencyAvg: 900,
    capabilities: {
      coding: 92,
      reasoning: 92,
      creative: 91,
      summarization: 93,
      general: 93,
      speed: 90
    },
    status: "configured",
    isRecommendedDefault: false
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    provider: "Anthropic",
    avatar: "🎼",
    badgeColor: "#d97706",
    description: "Anthropic's Opus model for deep reasoning and coding. Requires an Anthropic API key.",
    contextWindow: "1M tokens",
    latencyAvg: 1400,
    capabilities: {
      coding: 97,
      reasoning: 97,
      creative: 94,
      summarization: 95,
      general: 96,
      speed: 80
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

// Labels that were wrong in earlier versions and are corrected in saved settings and conversations on load.
// The "llama-3-3-70b" id has always run GPT-OSS 120B on Groq; only its label said Llama.
export const RENAMED_MODEL_TEXT = {
  'Llama 3.3 70B (Groq)': 'GPT-OSS 120B (Groq)',
  'Blazing-fast open-weight powerhouse optimized for real-time coding and reasoning.': "OpenAI's open-weight 120B reasoning model, served on Groq's low-latency hardware.",
  'Fast execution with strong open-weight logic and efficient step-by-step reasoning.': 'Open-weight reasoning model (GPT-OSS 120B) with fast responses on Groq.'
};

// Returns a copy of saved data with old labels replaced (exact text only); unchanged data is returned as is
export function applyModelRenames(data) {
  if (data == null) return data;
  let json = JSON.stringify(data);
  const before = json;
  for (const [from, to] of Object.entries(RENAMED_MODEL_TEXT)) {
    const encFrom = JSON.stringify(from).slice(1, -1);
    const encTo = JSON.stringify(to).slice(1, -1);
    json = json.split(encFrom).join(encTo);
  }
  return json === before ? data : JSON.parse(json);
}
