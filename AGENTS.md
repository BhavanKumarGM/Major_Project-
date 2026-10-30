# AGENTS.md: AI Hive Mind project context

This file is for AI coding agents (and new developers) working in this repository. It describes what the app does, how the code is organized, how data flows, and the rules and known issues to keep in mind before changing anything. Paths are relative to the repo root.

---

## 1. What the app is

AI Hive Mind is a web app that sends one user prompt to several LLMs at once, scores their answers, and lets the user continue the conversation from whichever answer they choose.

The Workspace has two execution modes (header toggle "Execution: Single AI / Multi AI"; Multi AI is the default).

**Single AI Mode** (see §5a):

```
user prompt
  → preflight                                   (POST /api/preflight-prompt)
  → Decision Model picks ONE model (preview)    (POST /api/decide-model, no LLM calls)
  → server: generate once → Critic → save turn  (POST /api/decision-execute)
```

**Multi AI Mode** (the original flow):

```
user prompt
  → preflight: analyze + refine + recommend    (POST /api/preflight-prompt, no LLM calls)
  → parallel generation on selected models     (POST /api/generate, real provider APIs)
  → Critic evaluation of all answers           (POST /api/critic-evaluate)
  → turn saved, critic winner pre-selected     (POST /api/conversations/:id/turn)
  → user may switch branch / synthesize        (POST .../branch, /api/synthesize, .../synthesis)
  → follow-up prompt reuses the chosen branch as history
```

**Only generation, connection tests, the optional LLM judge and the optional revision loop call external LLMs.** Analysis, refinement, recommendation, benchmark ranking, synthesis and most of the Critic are deterministic JavaScript (regexes, templates, fixed capability numbers).

---

## 2. Tech stack and running it

| Part | Tech | Port |
|---|---|---|
| Backend | Node.js (ES modules, `"type": "module"`), Express 4, multer, uuid, dotenv, pdf-parse 1.1.1, mammoth, nspell + dictionary-en | 5050 |
| Frontend | React 18 + Vite 6, lucide-react icons, canvas-confetti; no router, no state library, no TypeScript | 3045 |
| Tests | Node built-in test runner (`node:test`), no framework | n/a |

```bash
npm run install-all          # root + server + client installs
npm run dev                  # concurrently: node server/server.js + vite (client)
npm test                     # = npm test --prefix server  (node --test tests/**/*.test.js)
node server/verify-e2e.js    # run from server/: spawns server, walks the full 11-step flow
cd client && npx vite build  # production build into client/dist (gitignored)
```

- Vite proxies `/api` to `BACKEND_URL` or `http://127.0.0.1:5050` ([client/vite.config.js](client/vite.config.js)). The browser therefore calls the API same-origin.
- The server binds to `127.0.0.1` by default. Use `127.0.0.1`, not `localhost`, in scripts and tests, because Node may resolve `localhost` to `::1`.
- `dotenv.config()` reads `.env` from the **current working directory**. `npm run server` from the root reads the root `.env`. Running from `server/` reads `server/.env`. Both exist and are gitignored; only the `.env.example` files are committed.

---

## 3. Directory map

```
.
├── AGENTS.md                      ← this file
├── README.md                      user-facing overview + quick start
├── BACKEND_DOCUMENTATION.md       older backend write-up (mermaid diagram, module table)
├── .env.example, server/.env.example
├── package.json                   root scripts only (concurrently)
├── server/
│   ├── server.js                  ALL HTTP routes + in-process state (models, weights, keys)
│   ├── config/
│   │   ├── models.js              DEFAULT_MODELS catalog + DEFAULT_CRITIC_WEIGHTS
│   │   └── benchmarks.js          BENCHMARK_CATEGORIES + MODEL_BENCHMARKS (hand-entered scores)
│   ├── services/
│   │   ├── analysisEngine.js      analyzePrompt(): regex intent/tech/constraint detection
│   │   ├── spellingService.js     correctPrompt(): offline spelling/grammar fixes
│   │   ├── refinementEngine.js    refinePrompt(): corrected wording + requirements list + breakdown
│   │   ├── aiRefinementService.js refinePromptWithAI(): opt-in LLM rewrite with rules fallback
│   │   ├── recommendationEngine.js recommendModels(): capability-weighted model scoring
│   │   ├── decisionEngine.js      decideModel(): Single AI model choice (availability is a hard filter)
│   │   ├── decisionExecutionService.js  validate → preview → generate once → critic → save (DI for tests)
│   │   ├── llmService.js          LLMService class: provider calls, simulation fallback
│   │   ├── criticEngine.js        evaluateResponses(): entry point to evaluation/*
│   │   ├── evaluation/
│   │   │   ├── evaluator.js       runEvidenceEvaluation(): scoring + winner selection
│   │   │   ├── ruleValidator.js   weight normalization + deterministic checks
│   │   │   ├── requirementAnalyzer.js  requirement extraction, conflicts, coverage
│   │   │   ├── taskValidators.js  Coding / Research / Summarization / GeneralReasoning validators
│   │   │   ├── llmJudge.js        optional LLM-as-judge (JSON rubric, timeout, degrade)
│   │   │   ├── revisionLoop.js    optional bounded revise→re-evaluate loop
│   │   │   └── diagnostics.js     issue categories, severities, createDiagnosticIssue()
│   │   ├── synthesisService.js    synthesizeResponses() + evaluateSynthesis() (no LLM)
│   │   ├── benchmarkRankerService.js  classifyPrompt(), rankModelsForPrompt(), getAllCategories()
│   │   ├── documentService.js     parseDocument() (async): PDF/DOCX/text extraction + chunking
│   │   ├── memoryService.js       singleton: conversations, turns, branches, analytics
│   │   └── persistenceService.js  loadState()/saveState(): JSON files under DATA_DIR
│   ├── classify-and-rank.js       CLI: node classify-and-rank.js "prompt"
│   ├── verify-e2e.js              end-to-end script
│   ├── tests/
│   │   ├── api.test.js            HTTP tests (spawns server.js on 5050 with temp DATA_DIR)
│   │   ├── evaluation.test.js     21 evaluation-engine tests
│   │   ├── fixes.test.js          persistence, parsing, simulation, analysis, recommendation
│   │   ├── decision.test.js       Single AI Mode / Decision Model (mocked LLMService)
│   │   └── setup.js               --import'ed by `npm test`: temp DATA_DIR for every test file
│   └── data/                      runtime state (gitignored, created on first write)
└── client/
    ├── vite.config.js
    └── src/
        ├── main.jsx, App.jsx      App holds activeView state and switches views (no router)
        ├── index.css              all styles (dark glass theme, .badge-* classes, etc.)
        ├── services/api.js        every fetch call; admin-token helpers
        └── components/
            ├── Navbar.jsx                 view switcher + settings button
            ├── LandingPage.jsx            marketing page, sample prompts
            ├── Workspace.jsx              main flow (sidebar chats, input, pipeline)
            ├── PromptAnalysisPanel.jsx    shows preflight analysis/refinement/recommendations
            ├── WorkflowPipeline.jsx       stage indicator (prompt→analysis→…→critic)
            ├── ComparisonView.jsx         side-by-side answers, critic scores, badges (also renders single turns)
            ├── DecisionPanel.jsx          DecisionRunPanel (live progress/blocked) + DecisionTurnPanel (per single turn)
            ├── BranchViewer.jsx           branch tree for a conversation
            ├── BenchmarkRanker.jsx        benchmark ranking view
            ├── Dashboard.jsx              telemetry (GET /api/stats)
            ├── LegalAnalyzer.jsx          DEMO ONLY, hard-coded output
            └── SettingsModal.jsx          keys, admin token, capability + weight sliders
```

Views (`App.jsx` `activeView`): `landing | workspace | benchmark | dashboard | legal`, plus `SettingsModal` as an overlay.

---

## 4. Model catalog

Defined in [server/config/models.js](server/config/models.js). The **`id` is the key used everywhere**: in `llmService`, `recommendationEngine`, `benchmarks.js`, the client's Settings and Workspace defaults, and the tests.

| id | Display name | Provider | Credential | Real API model called | Default-recommended |
|---|---|---|---|---|---|
| `sarvam-105b` | Sarvam 105B | Sarvam AI | `SARVAM_API_KEY` (header `api-subscription-key`) | `sarvam-105b` | yes |
| `gemini-2-5-flash` | Gemini 2.5 Flash | Google | `GEMINI_API_KEY` (header `x-goog-api-key`) | `gemini-2.5-flash` | yes |
| `llama-3-3-70b` | GPT-OSS 120B (Groq) | Groq | `GROQ_API_KEY` | `openai/gpt-oss-120b` (`GROQ_MODEL` overrides). The id is historical: Groq no longer serves Llama chat models. Old "Llama 3.3 70B (Groq)" labels in saved settings/chats are corrected on load (`applyModelRenames`). No benchmark profile, so the ranker lists it as unranked. | yes |
| `gpt-4o` | GPT-4o | OpenAI | `OPENAI_API_KEY` | `gpt-4o` | no |
| `claude-opus-5-5` | Claude Opus 5.5 | Anthropic | `ANTHROPIC_API_KEY` | `claude-opus-5-5` | no |
| `ollama-local` | Ollama (Local) | Local | `OLLAMA_URL` | `llama3` via `/api/chat` | no |

Each model entry has: `id, name, provider, avatar, badgeColor, description, contextWindow, latencyAvg, capabilities{coding,reasoning,creative,summarization,general,speed}, status, isRecommendedDefault`. The `capabilities` numbers are hand-set and drive recommendations. They are not measured.

Workspace default selection: `['gemini-2-5-flash', 'llama-3-3-70b']` ([Workspace.jsx](client/src/components/Workspace.jsx)).

**Anthropic call details** (`callAnthropic` in [llmService.js](server/services/llmService.js)): raw `fetch` to `https://api.anthropic.com/v1/messages` with headers `x-api-key`, `anthropic-version: 2023-06-01` and `anthropic-beta: server-side-fallback-2026-07-01`, and body `{model:'claude-opus-5-5', max_tokens:16000, fallbacks:'default', messages}`. It reads only `type === 'text'` content blocks (thinking blocks can come first) and throws if `stop_reason === 'refusal'`. Do not add `temperature`, `top_p`, `top_k`, `budget_tokens` or `thinking:{type:'disabled'}`: the current API rejects these for this model. All providers deliberately use raw `fetch` (no SDKs) to keep one consistent pattern.

### Adding a new model (checklist)
1. Add an entry to `DEFAULT_MODELS` in `config/models.js`.
2. In `llmService.js`: add a `call<Provider>()` method, a branch in `testConnection()`, and an entry in `getLiveCall()`. `hasCredentials()` derives from `getLiveCall()` automatically.
3. Add the key to `apiKeys` in `server.js`, to the `fields` list in `POST /api/settings/keys`, to `GET /api/settings/keys/status`, to both `.env.example` files, and to a key row in `SettingsModal.jsx`.
4. Optionally add a rationale branch in `recommendationEngine.js` and a simulation branch in `simulateModelResponse()`.
5. Optionally add a `MODEL_BENCHMARKS` profile in `benchmarks.js`. **Only with real, sourced numbers**; otherwise the model shows as "unranked".
6. Note that `server/data/settings.json` (if present) overrides `DEFAULT_MODELS`. Delete it or update models via the API to see catalog changes.

---

## 5. Generation and simulation rules (`LLMService.generateSingle`)

1. If `documentContext` is given, the prompt becomes `[Referenced Document Context]:\n…\n\n[User Instruction]:\n…`.
2. `getLiveCall(model.id)` returns a caller when the provider has a key. Ollama is always attempted.
   - Success returns `{...result, isLive: true, isSimulated: false}`.
   - Failure returns `{status: 'error', errorMessage, text: '[Error from X: …]', isLive: false, isSimulated: false}`. **A configured provider never silently falls back to fake output.**
3. No credentials and `ALLOW_SIMULATION === 'false'` returns `status: 'error'`, "No API key configured…".
4. No credentials otherwise runs `simulateModelResponse()`: canned demo text (e.g. a C prime-number program), an artificial delay, and `{isLive: false, isSimulated: true, status: 'success'}`.

Response object shape (each element of `/api/generate` → `responses[]`):
```js
{ modelId, modelName, provider, avatar, badgeColor,
  text, tokenUsage: { promptTokens, completionTokens, totalTokens },
  latency, status: 'success' | 'error', errorMessage?, isLive, isSimulated }
```
The UI shows the badges "Live API" (`isLive`), "Simulated" (`isSimulated`) and "Error" (`status === 'error'`) in [ComparisonView.jsx](client/src/components/ComparisonView.jsx).

`generateParallel` runs all selected models with `Promise.all`. A thrown error is converted to an error response, so one failure never fails the request.

**Provider failures** carry `errorType`, set by `classifyProviderError()`:

| `errorType` | Cause |
|---|---|
| `auth` | HTTP 401/403 |
| `quota` | HTTP 402, or a quota/billing message |
| `rate_limit` | HTTP 429 |
| `invalid_model` | HTTP 404, or a "model not found" message |
| `timeout` | `AbortSignal.timeout`; `GENERATION_TIMEOUT_MS`, default 120000 |
| `network` | the fetch failed with a DNS or connection error |
| `provider_error` | anything else |

`errorMessage` is a friendly hint followed by the provider detail, passed through `redactSecrets()`. That function removes configured key values and `sk-…`, `gsk_…` and `AIza…` tokens; logs are redacted the same way. Every provider `fetch` has a timeout. The OpenAI model is `OPENAI_MODEL` (default `gpt-4o`), because API model ids are not ChatGPT website names.

---

## 5a. Single AI Mode (Decision Model)

**Decision Model:** `decideModel({ models, analysis, isAvailable, modelId, allowSimulation })` in [decisionEngine.js](server/services/decisionEngine.js).
- **Ranking:** it reuses `recommendModels`.
- **Automatic choice:** the highest-suitability model that has credentials wins. It also names any higher-scored models it skipped because they have no credentials.
- **Manual override (`modelId`):** the model must be in the catalog. Without credentials it returns `provider_unavailable`, unless `allowSimulation` is set.
- **Nothing live and no opt-in:** returns `no_live_provider`. It **never silently simulates**.
- **Statuses:** `selected | no_live_provider | provider_unavailable | invalid_model | no_models`.
- **Other returned fields:** `selectedModelId/Name`, `provider`, `selectionMethod: 'automatic'|'manual'`, `isAvailable`, `willSimulate`, `suitabilityScore`, `reason`, `candidates[]` (every model with score and availability), `scoreDisclaimer` (scores are configured profiles, not measured), `clarificationNotes` (the analysis' `missingInfoNotes`, shown but not blocking).

**Orchestration:** in [decisionExecutionService.js](server/services/decisionExecutionService.js), with dependencies injected (`models`, `criticWeights`, `llmService`, `memoryService`).
1. **Validation:** `validateDecisionRequest()` checks the body.
   - The prompt must be a non-empty string of at most 20,000 characters; `documentContext` at most 500,000.
   - `modelId` must be in the server catalog (else 400 `invalid_model`). `options` must be an object.
   - The only flags read are `options.enableLLMJudge === true` and `options.allowSimulation === true`. Both default to false.
2. **Decision:** if it isn't `selected`, the service returns `200 { success:false, code:<status>, error, decision, conversation:null }`. Nothing is generated or saved.
3. **Conversation:** an unknown `conversationId` gives 404. If none is given, a conversation is created. Only one run per conversation may be in flight; a second gets 409 `conversation_busy`.
4. **Generation:** **exactly one** `llmService.generateSingle()` call, using the refined prompt, the active-branch history and `documentContext`.
5. **Evaluation:** only on success does it call `evaluateResponses()`, with `options.enableLLMJudge` passed explicitly. With the judge off, `evaluationStatus` is `deterministic_only`. **Error responses are never evaluated.**
6. **Saving:** `memoryService.addTurn()` stores the turn with `executionMode: 'single'`, `decision` and `selectedModelId = response.modelId`. Failed turns are saved for diagnostics but **left out of follow-up history** (`getActiveHistoryContext` drops turns whose chosen response has `status: 'error'`).
7. **Response:** `{ success, code: 'ok'|'generation_failed'|…, error?, analysis, refinement, decision, generation: { status, isLive, isSimulated, errorType, response }, criticEvaluation | null, conversation: { id, turnId } }`.

**LLM judge** (both modes): opt-in through the Workspace "LLM judge" checkbox, stored in `localStorage['hiveJudgeEnabled']`. If no judge model has credentials (or a named `judgeModel` has none), `criticEngine` skips it. In that case `evaluationMetadata.judge = { requested, model, available:false, note }` and the status is `degraded`, so simulated text is never graded as if a judge had run.

**UI** (Workspace + [DecisionPanel.jsx](client/src/components/DecisionPanel.jsx)):
- **Model pills:** in Single AI the bar shows "Auto (Decision Model)" plus one pill per model; clicking a model pill sets a manual override.
- **Progress steps:** Analyzing prompt → Selecting model → "Generating response, evaluating it and saving the turn (one server request)". The last three really happen in one request, so they are shown together.
- **Blocked runs:** the panel offers Configure API keys, Run demo simulation (sends `allowSimulation: true`), Switch to Multi AI, and Dismiss.
- **Each saved single turn** shows the decision, Live/Simulated/Error badges, the critic score, the recommended `nextAction`, and a reminder that the rule checks do not prove factual correctness. Actions: Retry (failed turns), Try another model, Compare in Multi AI. The answer and the full critic breakdown are rendered by `ComparisonView`, as in Multi AI.

---

## 6. Prompt analysis, refinement, recommendation (deterministic)

**`analyzePrompt(prompt)`** ([analysisEngine.js](server/services/analysisEngine.js)) returns:
```js
{ primaryCategory, intentDistribution: [{category, percentage}] (top 4, sums to 100),
  requestedOutputType, constraints: [string], technologies: [string],
  targetAudience, tone, ambiguityLevel: 'None'|'Low'|'Medium', missingInfoNotes: [string] }
```
- Categories: `Coding`, `Reasoning & Logic`, `Documentation`, `Research & Fact-finding`, `Creative Writing`, `Summarization`, `General Assistance`.
- Technology regexes are intentionally context-bound. Bare words like "c", "go", "from", "function", "let" or "class" must **not** trigger a language. Examples: `C` needs "in C", "C program" or `#include <stdio.h>`; `Go` needs "golang", "in Go" or "Go program"; `SQL` needs `SELECT … FROM table` or "inner join". Coding verbs exclude write/create/build/script/class. Keep this property when editing; `tests/fixes.test.js` checks it.

**Spelling** ([spellingService.js](server/services/spellingService.js)): `correctPrompt(text)` returns `{ text, corrections[{from,to,type:'spelling'|'grammar'|'casing'}], flagged[{word,suggestions}] }`.
- It works offline: `nspell` with the `dictionary-en` Hunspell dictionary. Results are cached, and a typical prompt takes about 5 ms.
- A fix is applied only when it's confident: a `TYPO_OVERRIDES` entry, a `PREFERRED` common word, or a single one-edit candidate. Equally close inflections ("gived" → give/gives/giver) are flagged and left unchanged.
- It never touches code fences, inline code, URLs, emails, paths, file names, camelCase/ALLCAPS identifiers, mid-sentence capitalized words (names) or `TECH_TERMS`.
- It normalizes the casing of `CASING` terms (javascript → JavaScript, nodejs → Node.js, …), fixes standalone "i", repeated words and stray spaces before punctuation, capitalizes the first letter, and adds final punctuation (not after a trailing URL or code).
- `analyzePrompt` classifies the corrected text, so typos don't hide the intent.

**`refinePrompt(prompt, analysis)`** ([refinementEngine.js](server/services/refinementEngine.js)) returns `{ originalPrompt, correctedPrompt, refinedPrompt, corrections[], flaggedWords[], improvements[], refinementMethod:'rules', breakdown{…} }`.
- The refined prompt is the **corrected wording** followed by a `Requirements:` bullet list chosen per category, plus bullets for analysis constraints.
- It never quotes the raw prompt and never forces a language. Coding prompts without a language get "Choose a suitable programming language and say which one you used".
- It is **idempotent**: if the input already contains a `Requirements:` list, only the spelling is fixed.

**AI refinement** ([aiRefinementService.js](server/services/aiRefinementService.js), `POST /api/refine-prompt-ai`) is opt-in: one billable call, triggered only by the "Improve with AI" button.
- **Model choice:** the first model with credentials, in the order gemini-2-5-flash → llama-3-3-70b → gpt-4o → sarvam-105b → claude-opus-5-5 → ollama-local.
- **Instruction:** keep the intent and every detail, don't answer the prompt; the user text sits inside `<user_prompt>` as data. The model must reply with JSON `{refinedPrompt, changes[]}`.
- **Validation:** the output must be non-empty and at most `max(2500, 4×input)` characters. A provider error, simulated output, bad JSON or a 30 s timeout falls back to the rules result with `aiStatus:'failed'` and an `aiNote`. With no credentials it returns `aiStatus:'unavailable'` and makes no call.
- **Success** returns `refinementMethod:'ai'` and `refinedBy`.

**Adopted prompts:**
- **Accepting a prompt:** "Use Refined Prompt", "Use Spelling Fixes Only" or "Save & Apply" sets `adoptedRefinedPrompt` in the Workspace. That text is then sent **as-is**: Multi AI uses it as `refinedPrompt`, and Single AI sends `options.skipRefinement:true` to `/api/decision-execute`.
- **Stale analysis:** Multi AI re-runs preflight when the stored analysis belongs to older text, because preflight runs on every space while typing.

**`recommendModels(models, analysis, isAvailable)`** ([recommendationEngine.js](server/services/recommendationEngine.js)):
- Weights each model's `capabilities` by the intent distribution and adds a speed bonus for low-ambiguity prompts. Scores are clamped to 50–99.
- `isAvailable(id)` (the server passes `llmService.hasCredentials`) sets `isAvailable` on each model, and **available models sort first**.
- Returns `{ topRecommendation, runnerUp, models[], suggestedComparisonPair }`. The Workspace auto-selects `topRecommendation.modelId` after preflight.

---

## 7. Critic evaluation (`POST /api/critic-evaluate`)

Entry: `evaluateResponses()` in [criticEngine.js](server/services/criticEngine.js) → `runEvidenceEvaluation()` in [evaluator.js](server/services/evaluation/evaluator.js), or `runControlledRevisionLoop()` when `revisionSettings.enabled`.

Request body: `{ originalPrompt, refinedPrompt, responses[], weights?, analysis?, documentContext?, referenceAnswer?, options?: { enableLLMJudge, judgeModel }, revisionSettings?: { enabled, maxRevisions } }`.

Per candidate:
1. **Deterministic checks** (`ruleValidator.runDeterministicChecks`): empty or malformed text, provider error text, JSON validity, code fences (only when `isCodeRequested(prompt)`, and skipped for coding prompts where the task validator checks them), negative constraints (no recursion/loops/external libraries), requested sections, refusals, item counts ("exactly 3", "give 5 tips"), word limits (any script), requested formats (table, numbered/bullet list, N sentences, N paragraphs, one word), answer language ("explain X in Kannada", checked by Unicode script), off-topic answers (long answer sharing no content word with the prompt), unclosed code fences. Checks use the user's prompt, not refinement suggestions.
2. **Requirement coverage** (`requirementAnalyzer`): requirements extracted from prompt and analysis (core goal, language/technology, format, edge cases, …), each marked `satisfied | missing | unverifiable`. Also detects conflicts between the original and refined prompt.
3. **Task validator** (`taskValidators.getTaskValidator(primaryCategory)`): Coding (bracket balance; JavaScript compiled with `vm.Script`, Python parsed with `ast.parse` in a `python -I` subprocess when Python is installed (`PYTHON_BIN`); **code is never executed**), Research, Summarization, General reasoning. Returns score adjustments and issues; the evaluator does not penalize task issues a second time.
4. **Optional LLM judge** (`llmJudge.js`): only when `options.enableLLMJudge` is true. All answers are graded in parallel. Judge model: `options.judgeModel`, else the models with credentials in `JUDGE_PRIORITY` order (`criticEngine.judgeModelsFor`), the answer's own model last so no model grades itself when another is available. Timeout `JUDGE_TIMEOUT_MS` (60 s). At most 2 judge calls per answer: if another judge model has a key, any failure moves straight to it; with only one model, overload, rate limits, timeouts and bad JSON are retried once after `JUDGE_RETRY_DELAY_MS` (1.5 s), while auth/quota errors are not retried. Output missing any of the five scores is rejected. Judge scores replace the baseline only when the judge graded **every** eligible answer; otherwise all answers keep rule scores (judge findings such as a critical `factual_error` still apply) and the status is `degraded` with `evaluationMetadata.judge.note` ("graded 1 of 2 answers…"). Verified rule findings keep their penalty in judge mode unless the judge reported the same category.
5. **Simulated output**: `isSimulated === true` adds a `provider_error` / `high` issue.
6. **Scores (0–100)**: `correctness, relevance, completeness, clarity, instructionFollowing`. Execution errors score 0. Critical failures cap correctness at 35 and instructionFollowing at 30. `overall` = weighted sum using normalized weights (default 0.35 / 0.20 / 0.20 / 0.15 / 0.10; invalid weights fall back to defaults with a warning).
7. **Eligibility**: `!hasCritical && !executionError && overall >= 40`. Status is `accepted | needs_revision | rejected`.

**Winner selection**: highest `overall` among eligible candidates. **Simulated candidates are excluded whenever at least one live candidate is eligible.** A gap of ≤ 2 points produces a "near-tied" message. No eligible candidate gives `winner: null` and `nextAction: 'reject'`.

**Answer disagreement** (`disagreement.js`): for short factual questions without full judge coverage, the key facts (numbers, proper nouns) of each answer's first sentence (or last, after a filler opener) are compared; disjoint facts add `{ type: 'answer_disagreement' }` to `conflictsDetected` and a note to `recommendationReason`, since rule checks cannot tell which answer is right.

Response (legacy fields kept for backward compatibility; do not remove them):
```js
{ evaluationStatus: 'complete'|'degraded'|'deterministic_only'|'empty_input',
  evaluations: [{ modelId, modelName, provider, avatar, badgeColor, isEligible, isSimulated, status,
                  scores:{correctness,relevance,completeness,clarity,instructionFollowing,overall},
                  strengths[], weaknesses[], requirementResults[], issues[], hasCriticalFailure,
                  judgeDetails:{status, model, reason, verdict} }],
  winner: { modelId, modelName, score } | null,
  recommendationReason, weightsUsed, disclaimer,
  requirementCoverage: { results[], coveragePercent },
  conflictsDetected, issues[], criticalFailures, nextAction: 'accept'|'revise'|'reject',
  evaluationMetadata: { timestamp, durationMs, weightsWarning, hasUnverifiableClaims,
                        eligibleCandidatesCount, totalCandidatesCount, taskCategory, judgeNote?,
                        judge?: { requested, model, available, note } },
  revisionHistory?, revisionsAttempted? }
```

Issue object (`diagnostics.createDiagnosticIssue`): `{ id, modelId, category, severity, description, evidence, likelySource, recommendedCorrection, isCritical }`.
- Categories: `factual_error, unsupported_claim, logical_contradiction, missing_requirement, instruction_violation, format_violation, incomplete_response, code_validation_failure, insufficient_evidence, provider_error, evaluation_error`.
- Severities: `critical, high, medium, low, info`.
- Sources: `prompt_refinement, decision_model, provider_or_execution, evaluation_agent, input_or_context, unknown`.

---

## 8. Synthesis, benchmark ranking, documents

- **Synthesis** ([synthesisService.js](server/services/synthesisService.js)): **no LLM call**. It starts from the critic winner (or the first valid answer), merges in elements from the other valid answers, and never claims consensus that isn't there. Returns a response-shaped object with `modelId: 'synthesis'`, `isSynthesized: true`, `sources[]` and `evaluation{passed, score, status, reason}` (checked separately by `evaluateSynthesis`). Saving it via `/conversations/:id/synthesis` makes `selectedModelId = 'synthesis'`.
- **Benchmark ranker** ([benchmarkRankerService.js](server/services/benchmarkRankerService.js)):
  - Classifies the prompt into `coding | reasoning | multilingual | knowledge | summarization | creative | instruction`.
  - Ranks **only configured models that have a `MODEL_BENCHMARKS` profile**, normalizing MT-Bench /10 and Arena Elo.
  - Returns `rankedModels[]`, `topRankedModel`, `runnerUpModel`, `unrankedModels[]` (configured models without data, currently Claude Opus 5.5), `classification` and `verdictRationale`.
  - **The scores in `benchmarks.js` are hand-entered and unverified; the Gemini 2.5 entry still holds Gemini 2.0 figures. Never invent new numbers.**
- **Documents** ([documentService.js](server/services/documentService.js)):
  - `async parseDocument(buffer, mime, name)` handles PDF via `pdf-parse/lib/pdf-parse.js`. Import that path, not the package index, which runs a debug self-test on import.
  - DOCX goes through `mammoth.extractRawText`; `txt, md, markdown, json, csv, log` and `text/*` are read as UTF-8.
  - Anything else throws "Unsupported file type". Empty text throws (scanned PDFs need OCR).
  - Returns `{ filename, fileType, charCount, wordCount, chunksCount, preview, fullText }`. Chunks are paragraph-based, about 1200 characters, and only counted; `fullText` is what is sent as `documentContext`.
  - Upload limit: 10 MB (multer memory storage).

---

## 9. Conversations, memory and persistence

[memoryService.js](server/services/memoryService.js) is a singleton.
- Conversation: `{ id, title, createdAt, updatedAt, turns[] }`.
- Turn: `{ turnId, timestamp, userPrompt, refinedPrompt, analysis, breakdown, recommendations, responses[], criticEvaluation, selectedModelId, synthesis }`.
- `getActiveHistoryContext(convId)` builds `[{role:'user', content: refinedPrompt||userPrompt}, {role:'assistant', content: chosen answer}]…` along the selected branch. This is the provider-neutral history passed to every model.
- Analytics counters: `totalRequests`, `modelUsage`, `averageLatency`, `criticWins`, `userSelections`, `evaluationsCompleted/Degraded`, `criticalFailuresDetected`, requirement coverage, revisions improved/regressed, user–critic agreement. Exposed as `GET /api/stats`.

Persistence ([persistenceService.js](server/services/persistenceService.js)): `loadState(name, fallback)` and `saveState(name, data)` write `${DATA_DIR}/${name}.json` atomically (temp file + rename, mode 0600). `DATA_DIR` defaults to `server/data` (gitignored).

| File | Contents | Written when |
|---|---|---|
| `memory.json` | all conversations + analytics | every create/turn/branch/synthesis/rename/delete |
| `settings.json` | `{ models, criticWeights }` | `POST /api/models/update` |
| `keys.json` | only keys entered in the UI (plain text) | `POST /api/settings/keys` |

At startup, saved keys override `.env` keys and saved models replace `DEFAULT_MODELS`. The whole conversation store is rewritten on each change, which is fine at this scale.

---

## 10. HTTP API reference (`server/server.js`)

| Method & path | Body → Response | Notes |
|---|---|---|
| GET `/api/models` | → `{ models, criticWeights }` | |
| POST `/api/models/update` | `{ models?, weights? }` → `{ success, models, criticWeights }` | **admin**; persisted |
| POST `/api/models/test` | `{ modelId }` → `{ status, latency, message }` | real ping per provider |
| GET `/api/settings/keys/status` | → `{ sarvam, openai, gemini, anthropic, groq: bool, ollamaUrl, adminTokenRequired }` | never returns key values |
| POST `/api/settings/keys` | `{ sarvam?, openai?, gemini?, anthropic?, groq?, ollamaUrl? }` | **admin**; blank strings are ignored (never wipe keys) |
| POST `/api/analyze-prompt` | `{ prompt }` → analysis | |
| POST `/api/refine-prompt` | `{ prompt, analysis? }` → refinement | |
| POST `/api/refine-prompt-ai` | `{ prompt, modelId? }` → `{ analysis, refinement }` | opt-in, one billable call; falls back to rules |
| POST `/api/recommend-models` | `{ prompt, analysis? }` → recommendations | |
| POST `/api/preflight-prompt` | `{ prompt }` → `{ analysis, refinement, recommendations }` | used by Workspace |
| POST `/api/benchmark-ranker` | `{ prompt }` → ranking result | |
| GET `/api/benchmark-categories` | → `{ categories }` (each with `topModel` or null) | |
| POST `/api/decide-model` | `{ prompt, modelId?, options?: { allowSimulation } }` → `{ analysis, refinement, decision }` | Single AI preview; deterministic |
| POST `/api/decision-execute` | `{ prompt, conversationId?, modelId?, documentContext?, options?: { enableLLMJudge, allowSimulation } }` → see §5a | Single AI run; 400/404/409/413 errors are `{ success:false, code, error }` |
| POST `/api/generate` | `{ prompt, modelIds[], conversationId?, documentContext? }` → `{ prompt, responses[], timestamp }` | 400 if no prompt/models |
| POST `/api/critic-evaluate` | see §7 | |
| POST `/api/synthesize` | `{ originalPrompt, refinedPrompt, responses, criticEvaluation }` → synthesis | |
| POST `/api/upload` | multipart field `file` → parsed document | |
| GET `/api/conversations` | → list summaries (sorted by updatedAt desc) | |
| POST `/api/conversations` | `{ title? }` → conversation | |
| GET `/api/conversations/:id` | → conversation or 404 | |
| POST `/api/conversations/:id/turn` | turn fields → `{ success, turn }` | creates the conversation if the id is unknown |
| POST `/api/conversations/:id/branch` | `{ turnId, selectedModelId }` | updates agreement analytics |
| POST `/api/conversations/:id/synthesis` | `{ turnId, synthesis }` | |
| POST `/api/conversations/:id/turns/:turnId/evaluate` | `{ enableLLMJudge? = true, judgeModel? }` | Re-grades the turn's **saved** answers (never client-sent ones) and saves the new `criticEvaluation` plus `reevaluatedAt`; moves the critic-win count. 404 unknown turn, 400 unknown judge model, 409 while that turn is being evaluated. Used by the "Check facts with LLM judge" button. |
| PUT `/api/conversations/:id/title` | `{ title }` | |
| DELETE `/api/conversations/:id` | | |
| GET `/api/stats` | → analytics | |

"Admin" means: if `ADMIN_TOKEN` is set, the request needs header `x-admin-token: <token>`, otherwise 401. The client stores the token in `localStorage['hiveAdminToken']` (see `getAdminToken/setAdminToken` in [api.js](client/src/services/api.js)) and sends it only on the two admin endpoints.

---

## 11. Configuration (environment variables)

| Var | Default | Meaning |
|---|---|---|
| `PORT` | 5050 | API port |
| `VITE_PORT` | 3045 | dev UI port (also used to build the default CORS origins) |
| `BACKEND_URL` | `http://127.0.0.1:5050` | Vite proxy target |
| `HOST` | `127.0.0.1` | bind address |
| `ADMIN_TOKEN` | empty (off) | protects settings/keys endpoints |
| `CORS_ORIGINS` | `http://localhost:$VITE_PORT,http://127.0.0.1:$VITE_PORT` | comma-separated allowed browser origins; requests with no Origin header (same-origin/proxy, curl) are allowed |
| `ALLOW_SIMULATION` | true | `false` = keyless models return errors instead of demo text |
| `DATA_DIR` | `server/data` | persistence directory |
| `OPENAI_MODEL` | `gpt-4o` | OpenAI API model id used by the `gpt-4o` catalog entry |
| `GENERATION_TIMEOUT_MS` | 120000 | per-request timeout for provider calls |
| `JUDGE_TIMEOUT_MS` | 60000 | per-call timeout for the LLM judge |
| `JUDGE_RETRY_DELAY_MS` | 1500 | wait before retrying an overloaded or failed judge call |
| `PYTHON_BIN` | auto (`python3`, `python`, `py`) | Python used to syntax-check Python answers; check is skipped if none is found |
| `SARVAM_API_KEY`, `GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` | empty | provider keys |
| `OLLAMA_URL` | empty | set to e.g. `http://127.0.0.1:11434` to count Ollama as available |

---

## 12. Testing

- `npm test` (from `server/`): 85 tests, all passing (including `refinement.test.js`). The script is `node --import ./tests/setup.js --test …`; `setup.js` gives every test file a temp `DATA_DIR`. Before it existed, `evaluation.test.js` wrote "Test prompt" conversations into the real `server/data`.
  - `api.test.js` reuses a server already running on 5050. Otherwise it spawns one with a temp `DATA_DIR` and **blank provider keys**, so the suite makes no billable calls.
  - `decision.test.js` mocks `LLMService` and covers all 16 Single AI requirements: choice, override, validation, unavailable providers, a single call, critic integration, failures, simulation labels, consistency, persistence, history, the legacy contract, document context, judge behaviour, and secret redaction.
  - `evaluation.test.js` and `fixes.test.js` are unit-level. `fixes.test.js` sets `process.env.DATA_DIR` before dynamically importing the services; keep that ordering.
- The PDF test uses the real sample `node_modules/pdf-parse/test/data/05-versions-space.pdf` (a hand-built minimal PDF was rejected by the bundled pdf.js). There is no DOCX fixture yet, so DOCX parsing is untested.
- If real keys are in `.env`, API tests and `verify-e2e.js` make **real, billable provider calls**. Invalid keys now produce error responses rather than simulated success.
- After UI changes, run `npx vite build` in `client/`; there is no frontend test suite or linter.

---

## 13. Conventions

- ES modules everywhere on the server; relative imports include the `.js` extension.
- Services are plain exported functions or classes; `server.js` holds all routes and wraps each in try/catch, returning `500 {error}`.
- Comments explain *why*, briefly; file headers are `/** … */` blocks describing the module.
- Client: function components with hooks, inline `useState`, all styling in `index.css` with utility-like classes (`btn`, `badge badge-emerald|amber|indigo|cyan|purple|rose`, `glass-card`, `telemetry-tag`, …). Icons come from `lucide-react`.
- Never return API key values to the client. Never log them.
- Don't break the legacy critic fields (`winner`, `recommendationReason`, `evaluations`, `weightsUsed`, `disclaimer`); tests check them.
- When renaming a model id, grep the whole repo (server, client, tests, docs): ids are duplicated as string literals.

---

## 14. Known limitations and open issues (true as of commit `a2314e4`)

1. **The revision loop is never used from the UI.** `revisionSettings` is never sent. (The LLM judge is an opt-in Workspace checkbox for both modes.)
2. **Cut-off answers.** Providers report when an answer hit the output limit (`truncated: true`; finish_reason `length`, Gemini `MAX_TOKENS`, Claude `max_tokens`, Ollama `done_reason: length`). The critic marks it as an incomplete response and the UI shows a "Cut off" badge; an empty cut-off answer is an error. Sarvam asks for `SARVAM_MAX_TOKENS` (8192) because it reasons before answering and its 2048 default cut answers off.
3. **Legal Analyzer is a mock.** `LegalAnalyzer.jsx` waits 1 s and shows hard-coded results; it calls no API.
4. **Benchmark data is unverified** and Claude Opus 5.5 has no profile (shown as unranked). Capability numbers in `models.js` are also hand-set.
5. **No authentication or users.** `ADMIN_TOKEN` only guards settings and keys; conversations are global to the server. Keys in `server/data/keys.json` are plain text.
6. **`settings.json` freezes the model catalog.** Once saved, new entries added to `DEFAULT_MODELS` won't appear until that file is deleted or updated.
7. **Ollama counts as available whenever `ollamaUrl` is set.** Saving the Settings form sends the prefilled default URL, so after any save Ollama may be recommended even if it isn't running (it will then show an Error badge).
8. **Document chunks are not used for retrieval.** The entire `fullText` is sent as context, so large documents may exceed small context windows.
9. **Scanned or image-only PDFs** produce "No extractable text".
10. `POST /api/upload` returns 500, not 400, for unsupported files.
11. `multer` is on the 1.x line; consider upgrading to 2.x.
12. **Single AI progress is coarse.** Generation, evaluation and saving happen in one request, so the UI cannot show them separately. Doing so would need streaming (SSE) or splitting the endpoint.
13. **A simulated-only single run "wins" its own evaluation.** With one simulated candidate and no live one, `winner` is that model; the Simulated badge and the `provider_error` issue are the signals.
14. The in-flight lock is per process, which is fine for this single-instance server.

---

## 15. Repository and history notes

- Git remote: `https://github.com/BhavanKumarGM/Major_Project-.git`. The real project root is `Major_Project-/`.
- The parent folder `C:\Users\bhava\OneDrive\Desktop\Akash` is a **separate, older git repo** that shows every file as deleted (the code was moved into `Major_Project-/`). Don't commit from it by accident.
- Branches: `main` (upstream, last commit `c421e1a`, merge of PR #1) and `fix/persistence-docs-security` (commit `a2314e4`, **local only, not pushed**). That commit added: persistence, real PDF/DOCX parsing, honest simulation/error handling, the GPT-4o and Claude Opus 5.5 catalog entries, the Gemini 2.5 rename, security hardening (bind address, CORS, admin token, Gemini header auth, body-parser patch), the blank-key wipe fix, tighter analysis regexes, configured-only benchmark ranking, and `tests/fixes.test.js`.
- `architecture-flow.svg` at the repo root is untracked and was not created by the agent that wrote this file.
- The GitHub CLI (`gh`) is not installed on this machine.
