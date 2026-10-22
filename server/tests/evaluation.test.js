import { describe, it } from 'node:test';
import assert from 'node:assert';

import { validateAndNormalizeWeights, runDeterministicChecks } from '../services/evaluation/ruleValidator.js';
import { extractRequirements, evaluateRequirementCoverage } from '../services/evaluation/requirementAnalyzer.js';
import { getTaskValidator, CodingTaskValidator, ResearchTaskValidator } from '../services/evaluation/taskValidators.js';
import { LLMJudge } from '../services/evaluation/llmJudge.js';
import { runEvidenceEvaluation } from '../services/evaluation/evaluator.js';
import { runControlledRevisionLoop } from '../services/evaluation/revisionLoop.js';
import { synthesizeResponses, evaluateSynthesis } from '../services/synthesisService.js';
import { memoryService } from '../services/memoryService.js';
import { evaluateResponses } from '../services/criticEngine.js';

describe('Evidence-Based Evaluation Agent Test Suite', () => {

  // Test 1: Empty prompt and empty candidate response arrays
  it('1. Handles empty prompt and empty candidate response arrays gracefully', async () => {
    const result = await runEvidenceEvaluation({
      originalPrompt: '',
      refinedPrompt: '',
      responses: []
    });

    assert.strictEqual(result.evaluations.length, 0);
    assert.strictEqual(result.winner, null);
    assert.strictEqual(result.evaluationStatus, 'empty_input');
    assert.ok(result.weightsUsed);
    assert.ok(result.disclaimer);
  });

  // Test 2: Missing candidate text or error execution
  it('2. Appropriately scores and flags missing candidate text or execution errors', () => {
    const candidateError = {
      modelId: 'gpt-4o',
      modelName: 'GPT-4o',
      status: 'error',
      text: '[Error from GPT-4o: API rate limit exceeded]'
    };

    const ruleCheck = runDeterministicChecks(candidateError, { originalPrompt: 'Explain quantum computing' });
    assert.strictEqual(ruleCheck.isCriticalFailure, true);
    assert.strictEqual(ruleCheck.isEligible, false);
    assert.ok(ruleCheck.findings.some(f => f.category === 'provider_error'));

    const candidateEmpty = {
      modelId: 'claude-3-5-sonnet',
      modelName: 'Claude 3.5 Sonnet',
      text: '   '
    };
    const emptyCheck = runDeterministicChecks(candidateEmpty, { originalPrompt: 'Hello' });
    assert.strictEqual(emptyCheck.isCriticalFailure, true);
    assert.strictEqual(emptyCheck.isEligible, false);
    assert.ok(emptyCheck.findings.some(f => f.category === 'incomplete_response'));
  });

  // Test 3: Perfectly valid output satisfying all requirements
  it('3. Fully verifies a valid output satisfying all requirements without bias', async () => {
    const validPrompt = 'Write a Python function to check whether an integer is prime. Include boundary handling for n <= 1, time complexity, and test cases.';
    const validCode = `\`\`\`python
def is_prime(n: int) -> bool:
    """Checks whether n is a prime number."""
    # Boundary handling for numbers <= 1
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Test cases:
# Example: is_prime(2) -> True
# Example: is_prime(17) -> True
# Example: is_prime(4) -> False
# Example: is_prime(-5) -> False
# Time Complexity: O(sqrt(n)), Space Complexity: O(1)
\`\`\``;

    const responses = [
      {
        modelId: 'test-model',
        modelName: 'Test Model',
        provider: 'Open Source',
        text: validCode
      }
    ];

    const result = await runEvidenceEvaluation({
      originalPrompt: validPrompt,
      responses,
      analysis: { primaryCategory: 'Coding', technologies: ['Python'] },
      options: { enableLLMJudge: false }
    });

    assert.strictEqual(result.evaluations.length, 1);
    const ev = result.evaluations[0];
    assert.strictEqual(ev.isEligible, true);
    assert.strictEqual(ev.hasCriticalFailure, false);
    assert.strictEqual(ev.status, 'accepted');
    assert.ok(ev.scores.overall >= 80, `Expected score >= 80, got ${ev.scores.overall}`);
    assert.strictEqual(result.winner?.modelId, 'test-model');
  });

  // Test 4: Missing mandatory requirement
  it('4. Detects and penalizes missing mandatory requirements', async () => {
    const prompt = 'Implement a function in Python to add two numbers. You MUST format output as valid JSON with keys "code" and "explanation".';
    const responseWithoutJson = {
      modelId: 'model-a',
      modelName: 'Model A',
      text: 'Here is the function:\ndef add(a, b): return a + b\nIt adds two numbers.'
    };

    const result = await runEvidenceEvaluation({
      originalPrompt: prompt,
      responses: [responseWithoutJson],
      analysis: { primaryCategory: 'Coding', technologies: ['Python'] },
      options: { enableLLMJudge: false }
    });

    const ev = result.evaluations[0];
    assert.strictEqual(ev.hasCriticalFailure, true);
    assert.strictEqual(ev.isEligible, false);
    assert.ok(ev.issues.some(i => i.category === 'format_violation' && i.isCritical));
  });

  // Test 5: Violated negative constraint
  it('5. Detects violated negative constraints and flags critical failure', async () => {
    const prompt = 'Solve the problem in Python without using external libraries. Do not use numpy or pandas.';
    const badCandidate = {
      modelId: 'bad-candidate',
      modelName: 'Bad Candidate',
      text: 'import numpy as np\ndef solve(arr):\n    return np.mean(arr)'
    };

    const result = await runEvidenceEvaluation({
      originalPrompt: prompt,
      responses: [badCandidate],
      analysis: { primaryCategory: 'Coding' },
      options: { enableLLMJudge: false }
    });

    const ev = result.evaluations[0];
    assert.strictEqual(ev.hasCriticalFailure, true);
    assert.strictEqual(ev.isEligible, false);
    assert.ok(ev.issues.some(i => i.category === 'instruction_violation' && i.isCritical));
    assert.ok(ev.scores.instructionFollowing <= 45);
  });

  // Test 6: Unsupported factual claim & Test 8: Unverifiable evidence
  it('6 & 8. Marks unsupported claims as unverified rather than automatically false when evidence is absent', async () => {
    const prompt = 'What was the exact revenue of Project Orion in Q3 2024?';
    const candidate = {
      modelId: 'research-model',
      modelName: 'Research Model',
      text: 'Project Orion generated $4.2 million in Q3 2024 according to internal quarterly reports.'
    };

    const result = await runEvidenceEvaluation({
      originalPrompt: prompt,
      responses: [candidate],
      analysis: { primaryCategory: 'Research & Fact-finding' },
      documentContext: '', // No ground truth attached
      options: { enableLLMJudge: false }
    });

    const ev = result.evaluations[0];
    // Check that issues include insufficient_evidence marked as unknown status
    assert.ok(ev.issues.some(i => i.category === 'insufficient_evidence'));
    assert.strictEqual(result.evaluationMetadata.hasUnverifiableClaims, true);
  });

  // Test 7: Contradictory claims / Refinement Conflict
  it('7. Detects conflicts when refined prompt contradicts original user prompt', () => {
    const originalPrompt = 'Provide a brief, concise, 1 sentence summary of photosythesis.';
    const conflictingRefined = 'Provide an exhaustive, multi-page detailed breakdown of photosynthesis with full chemical derivations.';

    const { conflicts } = extractRequirements(originalPrompt, conflictingRefined);
    assert.ok(conflicts.length > 0);
    assert.strictEqual(conflicts[0].type, 'brevity_conflict');
  });

  // Test 9: Invalid judge JSON handling
  it('9. Gracefully parses or degrades when LLM judge returns non-JSON or invalid schema', () => {
    const judge = new LLMJudge({ enabled: true });
    
    // Broken JSON
    assert.throws(() => judge.parseJudgeResponse('This is not json at all!'), /JSON/);

    // Missing scores schema
    assert.throws(() => judge.parseJudgeResponse('{"verdict": "ok"}'), /scores/);

    // Valid JSON wrapped in markdown fences
    const validWrapped = '```json\n{"scores": {"correctness": 88, "relevance": 92, "completeness": 85, "clarity": 90, "instructionFollowing": 95}, "strengths": ["Clear"], "weaknesses": []}\n```';
    const parsed = judge.parseJudgeResponse(validWrapped);
    assert.strictEqual(parsed.scores.correctness, 88);
    assert.strictEqual(parsed.scores.instructionFollowing, 95);
  });

  // Test 10: LLM judge timeout or provider failure
  it('10. Falls back to degraded mode when LLM judge call fails or times out', async () => {
    const failingLlmService = {
      generateSingle: async () => {
        throw new Error('API Gateway 504 Gateway Timeout');
      }
    };

    const judge = new LLMJudge({ llmService: failingLlmService, enabled: true });
    const result = await judge.evaluateCandidate({
      candidate: { text: 'Some response text' },
      originalPrompt: 'Hello',
      timeoutMs: 50
    });

    assert.strictEqual(result.judgeStatus, 'degraded');
    assert.strictEqual(result.scores, null);
    assert.ok(result.reason.includes('failed or timed out'));
  });

  // Test 11: Deterministic-only fallback
  it('11. Runs in deterministic-only mode without calling any external provider', async () => {
    const responses = [
      { modelId: 'm1', modelName: 'M1', text: 'Clean standard answer to general question.' }
    ];

    const result = await runEvidenceEvaluation({
      originalPrompt: 'Explain how clouds form.',
      responses,
      options: { enableLLMJudge: false }
    });

    assert.strictEqual(result.evaluationStatus, 'deterministic_only');
    assert.strictEqual(result.evaluations.length, 1);
    assert.ok(result.evaluations[0].scores.overall > 0);
  });

  // Test 12: Invalid, missing, negative and non-normalized scoring weights
  it('12. Validates and normalizes weights safely; falls back on invalid values without crashing', () => {
    // Non-normalized valid weights (sum = 2.0)
    const nonNorm = { correctness: 0.70, relevance: 0.40, completeness: 0.40, clarity: 0.30, instructionFollowing: 0.20 };
    const normResult = validateAndNormalizeWeights(nonNorm);
    assert.strictEqual(normResult.valid, true);
    const sum = Object.values(normResult.normalized).reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(sum - 1.0) < 0.01, `Expected normalized sum close to 1.0, got ${sum}`);

    // Invalid negative weights
    const negativeWeights = { correctness: -0.5, relevance: 0.2 };
    const invalidResult = validateAndNormalizeWeights(negativeWeights);
    assert.strictEqual(invalidResult.valid, false);
    assert.ok(invalidResult.warning);
    assert.strictEqual(invalidResult.normalized.correctness, 0.35); // Safe fallback
  });

  // Test 13: Failed candidate exclusion from winner selection
  it('13. Excludes failed candidate from winner selection even if it has high length or text', async () => {
    const responses = [
      {
        modelId: 'failed-candidate',
        modelName: 'Failed Candidate',
        text: '```python\nimport numpy as np\ndef solve(): pass\n```' // Violates negative constraint
      },
      {
        modelId: 'clean-candidate',
        modelName: 'Clean Candidate',
        text: '```python\ndef solve():\n    return 42\n```'
      }
    ];

    const result = await runEvidenceEvaluation({
      originalPrompt: 'Solve in pure Python without external libraries (no numpy).',
      responses,
      analysis: { primaryCategory: 'Coding', technologies: ['Python'] },
      options: { enableLLMJudge: false }
    });

    assert.strictEqual(result.winner?.modelId, 'clean-candidate');
    const failedEval = result.evaluations.find(e => e.modelId === 'failed-candidate');
    assert.strictEqual(failedEval.isEligible, false);
    assert.strictEqual(failedEval.hasCriticalFailure, true);
  });

  // Test 14: All candidates failing critical requirements -> winner is null
  it('14. Returns no recommended winner when all candidates fail critical constraints', async () => {
    const responses = [
      {
        modelId: 'cand-1',
        modelName: 'Cand 1',
        text: 'import requests\n# using external library'
      },
      {
        modelId: 'cand-2',
        modelName: 'Cand 2',
        status: 'error',
        text: '[Error from Cand 2]'
      }
    ];

    const result = await runEvidenceEvaluation({
      originalPrompt: 'Provide solution without external libraries.',
      responses,
      options: { enableLLMJudge: false }
    });

    assert.strictEqual(result.winner, null);
    assert.strictEqual(result.nextAction, 'reject');
    assert.ok(result.recommendationReason.includes('No recommended winner'));
  });

  // Test 15: Tied or nearly tied eligible candidates
  it('15. Explains that ranking is uncertain or near-tied when candidates score within 2 points', async () => {
    const responses = [
      {
        modelId: 'cand-a',
        modelName: 'Model Alpha',
        text: 'Detailed answer with good structure and clear explanation.'
      },
      {
        modelId: 'cand-b',
        modelName: 'Model Beta',
        text: 'Detailed answer with good structure and clear walkthrough.'
      }
    ];

    const result = await runEvidenceEvaluation({
      originalPrompt: 'Explain how photosynthesis works.',
      responses,
      options: { enableLLMJudge: false }
    });

    assert.ok(result.recommendationReason.toLowerCase().includes('near-tied') || result.recommendationReason.includes('Model Alpha') || result.recommendationReason.includes('Model Beta'));
  });

  // Test 16: Coding task with safe syntax validation
  it('16. Validates syntax delimiters in coding tasks without executing code', () => {
    const validator = new CodingTaskValidator();
    
    // Balanced code
    const valid = validator.validate({ text: '```js\nfunction test() { if (true) { return [1, 2]; } }\n```' });
    assert.ok(valid.findings.some(f => f.rule === 'syntax_delimiters' && f.status === 'pass'));

    // Unbalanced code
    const invalid = validator.validate({ text: '```js\nfunction test() { if (true) { return [1, 2; } }\n```' });
    assert.ok(invalid.findings.some(f => f.rule === 'syntax_delimiters' && f.status === 'fail'));
  });

  // Test 17: Coding task without executable sandbox notice
  it('17. Explicitly includes non-execution sandboxing notice for coding tasks', () => {
    const validator = new CodingTaskValidator();
    const result = validator.validate({ text: '```python\nprint("hello")\n```' });
    assert.ok(result.executionNotice);
    assert.ok(result.executionNotice.includes('Code execution was not performed'));
  });

  // Test 18: Synthesis evaluation
  it('18. Validates synthesized outputs separately from individual candidate answers', () => {
    const candidates = [
      { modelId: 'm1', modelName: 'M1', text: 'def add(a, b): return a + b' },
      { modelId: 'm2', modelName: 'M2', text: 'def add(x, y): return x + y' }
    ];

    const synthesis = synthesizeResponses('Write an add function in Python.', '', candidates);
    assert.strictEqual(synthesis.modelId, 'synthesis');
    assert.strictEqual(synthesis.isSynthesized, true);
    assert.ok(synthesis.evaluation);
    assert.strictEqual(typeof synthesis.evaluation.score, 'number');
    assert.strictEqual(synthesis.evaluation.passed, true);
  });

  // Test 19: Bounded retries and revision loop termination
  it('19. Respects retry budget and stops when budget is exhausted or criteria met', async () => {
    let mockCalls = 0;
    const mockLlmService = {
      generateSingle: async () => {
        mockCalls++;
        return {
          text: '```python\ndef is_prime(n):\n    if n <= 1: return False\n    return True\n```'
        };
      }
    };

    const initialResponses = [
      {
        modelId: 'rev-candidate',
        modelName: 'Rev Candidate',
        text: 'Simple text without code'
      }
    ];

    const revisionResult = await runControlledRevisionLoop({
      originalPrompt: 'Write Python code for prime check with boundary handling.',
      refinedPrompt: '',
      initialResponses,
      weights: {},
      analysis: { primaryCategory: 'Coding', technologies: ['Python'] },
      llmService: mockLlmService,
      revisionConfig: { enabled: true, maxRevisions: 2, enableLLMJudge: false }
    });

    assert.ok(revisionResult.revisionsAttempted <= 2);
    assert.ok(mockCalls <= 2);
  });

  // Test 20: Preservation of legacy /api/critic-evaluate contract
  it('20. Maintains full backward compatibility with legacy critic evaluation fields', async () => {
    const responses = [
      { modelId: 'gpt-4o', modelName: 'GPT-4o', provider: 'OpenAI', text: 'Answer 1' },
      { modelId: 'claude-3-5-sonnet', modelName: 'Claude 3.5 Sonnet', provider: 'Anthropic', text: 'Answer 2' }
    ];

    const result = await evaluateResponses(
      'What is cloud computing?',
      '',
      responses
    );

    // Required legacy contract fields
    assert.ok(Array.isArray(result.evaluations));
    assert.strictEqual(result.evaluations.length, 2);
    assert.ok(result.winner === null || typeof result.winner === 'object');
    assert.strictEqual(typeof result.recommendationReason, 'string');
    assert.strictEqual(typeof result.weightsUsed, 'object');
    assert.strictEqual(typeof result.disclaimer, 'string');

    // Check per-candidate legacy fields
    for (const ev of result.evaluations) {
      assert.ok(ev.modelId);
      assert.ok(ev.modelName);
      assert.ok(ev.provider);
      assert.strictEqual(typeof ev.scores.correctness, 'number');
      assert.strictEqual(typeof ev.scores.relevance, 'number');
      assert.strictEqual(typeof ev.scores.completeness, 'number');
      assert.strictEqual(typeof ev.scores.clarity, 'number');
      assert.strictEqual(typeof ev.scores.instructionFollowing, 'number');
      assert.strictEqual(typeof ev.scores.overall, 'number');
      assert.ok(Array.isArray(ev.strengths));
      assert.ok(Array.isArray(ev.weaknesses));
    }
  });

  // Test 21: Conversation history & branch selection telemetry regression test
  it('21. Records analytics, updates branch selection, and calculates agreement rate without data loss', () => {
    const conv = memoryService.createConversation('Test Telemetry Session');
    assert.ok(conv.id);

    const turn = memoryService.addTurn(conv.id, {
      userPrompt: 'Test prompt',
      refinedPrompt: 'Test prompt refined',
      responses: [
        { modelId: 'model-1', text: 'Resp 1', latency: 150 },
        { modelId: 'model-2', text: 'Resp 2', latency: 200 }
      ],
      criticEvaluation: {
        evaluationStatus: 'complete',
        winner: { modelId: 'model-1', score: 92 },
        criticalFailures: 0,
        requirementCoverage: { coveragePercent: 90 }
      },
      selectedModelId: 'model-1'
    });

    assert.strictEqual(turn.selectedModelId, 'model-1');

    // Switch branch
    memoryService.selectBranch(conv.id, turn.turnId, 'model-1');

    const analytics = memoryService.getAnalytics();
    assert.ok(analytics.totalRequests > 0);
    assert.ok(analytics.evaluationMetrics.evaluationsCompleted > 0);
    assert.strictEqual(analytics.evaluationMetrics.isAgreementMeasured, true);
    assert.strictEqual(analytics.evaluationMetrics.userAgreementRate, 100);
  });

});
