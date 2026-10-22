/**
 * Task-Specific Validation Layer
 * Extensible validators for Coding, Research, Summarization, and General Reasoning.
 * Strictly adheres to safety constraints: never executes arbitrary code directly,
 * and never claims independent verification when evidence is absent.
 */

class BaseTaskValidator {
  constructor(taskType) {
    this.taskType = taskType;
  }

  validate(candidate, context) {
    return {
      taskType: this.taskType,
      passed: true,
      findings: [],
      scoreAdjustments: { correctness: 0, completeness: 0, clarity: 0 }
    };
  }
}

/**
 * 1. Coding Task Validator
 */
export class CodingTaskValidator extends BaseTaskValidator {
  constructor() {
    super('Coding');
  }

  validate(candidate, context = {}) {
    const text = candidate.text || '';
    const textLower = text.toLowerCase();
    const findings = [];
    const scoreAdjustments = { correctness: 0, completeness: 0, clarity: 0 };

    // Extract code fence blocks
    const codeBlocks = [];
    const regex = /```([a-z0-9_-]*)\s*([\s\S]*?)```/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      codeBlocks.push({ lang: match[1]?.trim().toLowerCase() || '', code: match[2] });
    }

    if (codeBlocks.length === 0) {
      findings.push({
        rule: 'code_block_required',
        status: 'fail',
        severity: 'high',
        category: 'code_validation_failure',
        description: 'No formatted code blocks found for coding prompt.',
        evidence: text.substring(0, 100),
        recommendedCorrection: 'Provide the code enclosed in markdown code fences with a language identifier.'
      });
      scoreAdjustments.correctness -= 15;
    } else {
      scoreAdjustments.clarity += 5;

      // Safe static syntax validation: check balanced delimiters
      for (const block of codeBlocks) {
        const syntaxCheck = this.checkBalancedDelimiters(block.code);
        if (!syntaxCheck.balanced) {
          findings.push({
            rule: 'syntax_delimiters',
            status: 'fail',
            severity: 'high',
            category: 'code_validation_failure',
            description: `Unbalanced code syntax delimiters in code block (${syntaxCheck.error}).`,
            evidence: syntaxCheck.snippet,
            recommendedCorrection: 'Fix mismatched parentheses, brackets, or braces.'
          });
          scoreAdjustments.correctness -= 10;
        } else {
          findings.push({
            rule: 'syntax_delimiters',
            status: 'pass',
            severity: 'low',
            category: 'code_validation_failure',
            description: 'Static delimiter balance check passed for code block.',
            evidence: 'Balanced brackets and braces.'
          });
        }
      }
    }

    // Boundary & Edge-case handling
    const hasEdgeCases = /<= 1|<= 0|negative|sqrt|isqrt|zero|boundary|empty|non-positive|null|range|invalid/i.test(textLower);
    if (hasEdgeCases) {
      scoreAdjustments.completeness += 6;
      scoreAdjustments.correctness += 4;
      findings.push({
        rule: 'edge_case_handling',
        status: 'pass',
        severity: 'low',
        category: 'missing_requirement',
        description: 'Includes explicit handling for boundary values or edge cases.',
        evidence: 'Detected boundary validation logic.'
      });
    } else {
      scoreAdjustments.completeness -= 6;
      findings.push({
        rule: 'edge_case_handling',
        status: 'partial',
        severity: 'medium',
        category: 'missing_requirement',
        description: 'Candidate could include more explicit edge-case filtering and input guards.',
        evidence: 'No explicit boundary guards detected.',
        recommendedCorrection: 'Add explicit guards for negative numbers, zero, or invalid inputs.'
      });
    }

    // Time & Space complexity annotations
    const hasComplexity = /o\([a-z0-9\s√]+\)|time complexity|space complexity/i.test(textLower);
    if (hasComplexity) {
      scoreAdjustments.completeness += 4;
      scoreAdjustments.clarity += 4;
      findings.push({
        rule: 'complexity_annotations',
        status: 'pass',
        severity: 'low',
        category: 'missing_requirement',
        description: 'Includes explicit computational time and space complexity annotations.',
        evidence: 'Big-O notation or complexity section found.'
      });
    }

    return {
      taskType: 'Coding',
      passed: !findings.some(f => f.severity === 'critical'),
      findings,
      scoreAdjustments,
      executionNotice: 'Code execution was not performed. Safe isolated sandboxing is not configured on this host. Static validation only.'
    };
  }

  checkBalancedDelimiters(code) {
    const stack = [];
    const pairs = { '(': ')', '[': ']', '{': '}' };
    const openers = new Set(Object.keys(pairs));
    const closers = new Set(Object.values(pairs));

    // Simple tokenizer ignoring string literals
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < code.length; i++) {
      const ch = code[i];
      if (inString) {
        if (ch === stringChar && code[i - 1] !== '\\') {
          inString = false;
        }
        continue;
      }

      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
        continue;
      }

      if (openers.has(ch)) {
        stack.push({ ch, pos: i });
      } else if (closers.has(ch)) {
        if (stack.length === 0) {
          return { balanced: false, error: `Unexpected closing '${ch}'`, snippet: code.substring(Math.max(0, i - 15), i + 15) };
        }
        const last = stack.pop();
        if (pairs[last.ch] !== ch) {
          return { balanced: false, error: `Mismatched '${last.ch}' and '${ch}'`, snippet: code.substring(Math.max(0, i - 15), i + 15) };
        }
      }
    }

    if (stack.length > 0) {
      const unclosed = stack.pop();
      return { balanced: false, error: `Unclosed '${unclosed.ch}'`, snippet: code.substring(Math.max(0, unclosed.pos - 15), unclosed.pos + 15) };
    }

    return { balanced: true };
  }
}

/**
 * 2. Research & Fact-finding Task Validator
 */
export class ResearchTaskValidator extends BaseTaskValidator {
  constructor() {
    super('Research & Fact-finding');
  }

  validate(candidate, context = {}) {
    const text = candidate.text || '';
    const textLower = text.toLowerCase();
    const docContext = (context.documentContext || '').trim();
    const findings = [];
    const scoreAdjustments = { correctness: 0, completeness: 0, clarity: 0 };

    if (docContext.length > 0) {
      // We have reference evidence! Check if candidate references evidence accurately
      const docLower = docContext.toLowerCase();
      // Extract key nouns/words (>5 chars) from document
      const docKeywords = Array.from(new Set(docLower.match(/\b[a-z]{5,}\b/g) || [])).slice(0, 30);
      const matched = docKeywords.filter(k => textLower.includes(k));

      if (matched.length > 0) {
        scoreAdjustments.relevance = 5;
        scoreAdjustments.correctness = 5;
        findings.push({
          rule: 'evidence_alignment',
          status: 'pass',
          severity: 'low',
          category: 'unsupported_claim',
          description: 'Candidate assertions align with supplied document evidence.',
          evidence: `Referenced source concepts: ${matched.slice(0, 5).join(', ')}`
        });
      }
    } else {
      // No reference document provided.
      // Explicitly mark factual claims as unverified / insufficient_evidence rather than false.
      findings.push({
        rule: 'evidence_verification',
        status: 'unknown',
        severity: 'info',
        category: 'insufficient_evidence',
        description: 'No reference document or trusted evidence source was attached. Specific factual claims remain unverified rather than confirmed false.',
        evidence: 'Absence of external ground-truth dataset.',
        recommendedCorrection: 'Attach source material or document context for verified factual grounding.'
      });
    }

    return {
      taskType: 'Research & Fact-finding',
      passed: true,
      findings,
      scoreAdjustments
    };
  }
}

/**
 * 3. Summarization Task Validator
 */
export class SummarizationTaskValidator extends BaseTaskValidator {
  constructor() {
    super('Summarization');
  }

  validate(candidate, context = {}) {
    const text = candidate.text || '';
    const docContext = (context.documentContext || '').trim();
    const findings = [];
    const scoreAdjustments = { correctness: 0, completeness: 0, clarity: 0 };

    // Check for executive highlights or bullet points
    const hasBullets = /^[*\-•]\s+|\n[*\-•]\s+/m.test(text);
    if (hasBullets) {
      scoreAdjustments.clarity += 5;
      findings.push({
        rule: 'structured_summary_format',
        status: 'pass',
        severity: 'low',
        category: 'format_violation',
        description: 'Formatted with bullet points and clear executive structure.',
        evidence: 'Bullet points present.'
      });
    }

    if (docContext.length > 0) {
      const docWords = new Set(docContext.toLowerCase().match(/\b[a-z]{4,}\b/g) || []);
      const summaryWords = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
      const overlaps = summaryWords.filter(w => docWords.has(w));
      const overlapRatio = summaryWords.length > 0 ? (overlaps.length / summaryWords.length) : 0;

      if (overlapRatio > 0.4) {
        scoreAdjustments.relevance = 6;
        scoreAdjustments.completeness = 5;
        findings.push({
          rule: 'source_coverage',
          status: 'pass',
          severity: 'low',
          category: 'missing_requirement',
          description: 'High semantic alignment with source document text.',
          evidence: `${Math.round(overlapRatio * 100)}% vocabulary alignment with source.`
        });
      }
    }

    return {
      taskType: 'Summarization',
      passed: true,
      findings,
      scoreAdjustments
    };
  }
}

/**
 * 4. General Reasoning Task Validator
 */
export class GeneralReasoningValidator extends BaseTaskValidator {
  constructor() {
    super('General Reasoning');
  }

  validate(candidate, context = {}) {
    const text = candidate.text || '';
    const findings = [];
    const scoreAdjustments = { correctness: 0, completeness: 0, clarity: 0 };

    // Structure checks
    const hasStructure = /#|\*|\-|\d+\./.test(text);
    if (hasStructure) {
      scoreAdjustments.clarity += 4;
      findings.push({
        rule: 'logical_structuring',
        status: 'pass',
        severity: 'low',
        category: 'format_violation',
        description: 'Uses headings, enumerations, or bulleted items for logical flow.',
        evidence: 'Structured markup found.'
      });
    }

    // Depth checks
    if (text.length > 300) {
      scoreAdjustments.completeness += 4;
    }

    return {
      taskType: 'General Reasoning',
      passed: true,
      findings,
      scoreAdjustments
    };
  }
}

export function getTaskValidator(taskCategory = 'General') {
  const catLower = (taskCategory || '').toLowerCase();
  if (catLower.includes('code') || catLower.includes('programming')) {
    return new CodingTaskValidator();
  }
  if (catLower.includes('research') || catLower.includes('fact')) {
    return new ResearchTaskValidator();
  }
  if (catLower.includes('summar') || catLower.includes('tldr')) {
    return new SummarizationTaskValidator();
  }
  return new GeneralReasoningValidator();
}
