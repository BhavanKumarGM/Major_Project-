# AI HIVE MIND
*One Question. Multiple Minds. One Better Answer.*

AI Hive Mind is a production-quality web-based multi-LLM assistant that acts as an intelligent orchestration layer between the user and multiple AI models.

---

## ⚡ Primary Product Loop

```
USER PROMPT → PROMPT ANALYSIS → PROMPT REFINEMENT → PROMPT BREAKDOWN → MODEL RECOMMENDATION → USER MODEL SELECTION → PARALLEL RESPONSE GENERATION → CRITIC AI EVALUATION → BRANCH SELECTION → CONTINUOUS CONVERSATION → SHARED MEMORY
```

---

## 🚀 Key Modules & Capabilities

1. **Prompt Analysis Engine**: Identifies task categories (Coding, Reasoning, Creative Writing, Summarization, Documentation), intent confidence distributions, constraints, language/technology tags, and ambiguity flags.
2. **Prompt Refinement & Breakdown**: Enhances prompts with boundary conditions, algorithmic constraints, and clear commentary while preserving original user intent.
3. **Smart Model Recommendation**: Computes dynamic suitability match scores across configurable model profiles and provides explainable rationales.
4. **Side-by-Side Arena**: Dispatches parallel queries across configured models (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 2.0 Flash, Groq Llama 3.3 70B, DeepSeek R1, Ollama Local).
5. **Critic AI Evaluation**: Independent evaluation matrix scoring responses across:
   - **Correctness** (35%)
   - **Relevance** (20%)
   - **Completeness** (20%)
   - **Clarity** (15%)
   - **Instruction Following** (10%)
   - Itemized Strengths & Weaknesses comparison.
6. **Provider-Neutral Shared Memory & Branching**: Users choose which response becomes the continuation branch for follow-up prompts. Alternative branches remain accessible.
7. **Consensus Synthesis Engine**: 1-click synthesis of the best elements across all models into a single consolidated answer.
8. **Document Context Ingestion**: Extracts and chunks text from PDF, DOCX, and TXT files for document-aware prompting.
9. **Telemetry & Usage Dashboard**: Real-time performance metrics, requests per model, latency graphs, and Critic AI selection accuracy.
10. **Settings & Configuration**: Secure server-side API key manager, live connection test utilities, and profile/weight customizer sliders.
11. **Academic Showcase: Legal Document Analyzer**: Automatic clause extraction, high-risk detection, and multi-LLM redline generation.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Start Application
```bash
npm run dev
```

- **Frontend**: [http://localhost:3045](http://localhost:3045)
- **Backend API**: [http://localhost:5050](http://localhost:5050)

### 3. Run Automated E2E Verification
```bash
node server/verify-e2e.js
```
