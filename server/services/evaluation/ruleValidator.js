/**
 * Deterministic Rule-Based Validation Layer
 * Evaluates candidates against verifiable constraints: empty text, syntax/format,
 * negative constraints, weight normalization, and truncation.
 */

import { DEFAULT_CRITIC_WEIGHTS } from '../../config/models.js';

const REFUSAL_PATTERN = /^(?:(?:i'?m|i am) sorry|sorry|i apologi[sz]e|unfortunately)?[^.!?]{0,60}?\b(?:i (?:can(?:'|’)?t|cannot|can not|am unable to|am not able to|won(?:'|’)?t|will not)|i'?m (?:unable|not able) to)\s+(?:help|assist|provide|do|comply|fulfill|answer|support|complete|write)\b/i;

const NUMBER_WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twelve: 12, fifteen: 15, twenty: 20 };
const LIST_NOUNS = 'bullet points?|bullets|items|points|reasons|benefits|advantages|disadvantages|examples|tips|ways|steps|ideas|things|facts|questions|options|features|names|tools|methods|strategies|differences|uses';
const ITEM_COUNT_RE = new RegExp(`\\b(?:exactly|only|just|top|list|give(?: me)?|name|provide|write|suggest)\\s+(\\d{1,2}|${Object.keys(NUMBER_WORDS).join('|')})\\s+(?:[a-z-]+\\s+){0,2}?(${LIST_NOUNS})\\b`, 'gi');

// Returns { count, noun } only when the prompt states one unambiguous item count
function parseItemCount(prompt) {
  const matches = [...prompt.matchAll(ITEM_COUNT_RE)];
  if (matches.length !== 1) return null;
  const raw = matches[0][1].toLowerCase();
  const count = NUMBER_WORDS[raw] || parseInt(raw, 10);
  return count >= 1 && count <= 30 ? { count, noun: matches[0][2].toLowerCase() } : null;
}

// Counts list items at the outermost indentation level, outside code blocks
function countTopLevelListItems(text) {
  const indents = text.replace(/```[\s\S]*?```/g, '')
    .split('\n')
    .map(line => line.match(/^(\s*)(?:[-*•]|\d{1,2}[.)])\s+\S/))
    .filter(Boolean)
    .map(m => m[1].replace(/\t/g, '    ').length);
  if (indents.length === 0) return 0;
  const top = Math.min(...indents);
  return indents.filter(i => i === top).length;
}

// Code counts as requested when the prompt asks to produce or change code, not when it merely mentions coding
// ("tips for learning to code" is not a request for code)
const CODE_NOUN = '(?:code|function|program|script|class|method|implementation|query|regex|snippet|algorithm)';
const CODE_REQUEST_RE = new RegExp(
  `\\b(?:write|implement|create|build|generate|give|show|provide|fix|debug|refactor|optimi[sz]e|convert|complete)\\b[^.?!]{0,40}(?<!\\b(?:learn|learning|start|starting|begin|beginning) to )\\b${CODE_NOUN}s?\\b` +
  `|\\b${CODE_NOUN}s?\\s+(?:to|for|that)\\b|\\bc program\\b|\\bpython script\\b`, 'i');

export function isCodeRequested(prompt = '') {
  return CODE_REQUEST_RE.test(prompt);
}

const STOP_WORDS = new Set(('about above after again also answer because before being below between both could does doing down during each explain few from further give have having here how into just like list make many more most much need only other over please provide same should show some such tell than that their them then there these they this those through very want what when where which while with would write your describe example examples using used use help works work under words word within less least exactly bullet bullets points point sentence sentences lines line paragraph paragraphs brief briefly short detail details detailed simple simply step steps tips tip better best good ways ideas things important main basic').split(' '));

function contentTerms(prompt) {
  const words = (prompt.toLowerCase().match(/[a-z]{4,}/g) || []).filter(w => !STOP_WORDS.has(w));
  return [...new Set(words)];
}

// Loose stem match so "photosynthesis" matches "photosynthetic" and "plants" matches "plant"
function sameStem(a, b) {
  const n = Math.min(5, a.length, b.length);
  return n >= 4 && a.slice(0, n) === b.slice(0, n);
}

const SMALL_NUMBERS = { one: 1, a: 1, single: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const toCount = s => SMALL_NUMBERS[s] || parseInt(s, 10);

// Unicode ranges for languages an answer can be asked to use
const SCRIPTS = {
  hindi: /[ऀ-ॿ]/g, marathi: /[ऀ-ॿ]/g, nepali: /[ऀ-ॿ]/g, sanskrit: /[ऀ-ॿ]/g,
  bengali: /[ঀ-৿]/g, punjabi: /[਀-੿]/g, gujarati: /[઀-૿]/g, odia: /[଀-୿]/g,
  tamil: /[஀-௿]/g, telugu: /[ఀ-౿]/g, kannada: /[ಀ-೿]/g, malayalam: /[ഀ-ൿ]/g,
  urdu: /[؀-ۿ]/g, arabic: /[؀-ۿ]/g, russian: /[Ѐ-ӿ]/g, greek: /[Ͱ-Ͽ]/g,
  chinese: /[一-鿿]/g, japanese: /[぀-ヿ一-鿿]/g, korean: /[가-힯]/g
};
// Only phrasing that asks for the reply itself in a language ("explain X in Kannada", "translate this into Hindi"),
// not questions about a language ("what does namaste mean in Hindi?")
const LANGUAGE_REQUEST_RE = new RegExp(
  `\\b(?:respond|reply|answer|write|explain|describe|tell me|summari[sz]e|translate|list|give)\\b[^.?!]{0,80}?\\b(?:in|into|to)\\s+(${Object.keys(SCRIPTS).join('|')})\\b`);

function finding(id, ok, okText, failText, evidence, correction) {
  return {
    id: `rule-${id}`,
    rule: id.replace(/-/g, '_'),
    status: ok ? 'pass' : 'fail',
    severity: ok ? 'low' : 'high',
    category: 'format_violation',
    description: ok ? okText : failText,
    evidence,
    likelySource: 'decision_model',
    recommendedCorrection: ok ? undefined : correction
  };
}

function checkRequestedFormats(promptLower, text) {
  const results = [];
  const prose = text.replace(/```[\s\S]*?```/g, ' ');

  if (/\b(in|as|into|using|with) (a |an )?(markdown |comparison )?table\b|\btabular\b|\btable format\b/.test(promptLower)) {
    const hasTable = /^\s*\|.*\|\s*$/m.test(prose) && /^\s*\|?\s*:?-{3,}/m.test(prose) || /<table[\s>]/i.test(prose);
    results.push(finding('table-format', hasTable, 'Provided the requested table.',
      'Prompt asked for a table, but the response has none.', hasTable ? 'Table found.' : 'No markdown table found.', 'Present the answer as a markdown table.'));
  }

  if (/\bnumbered (list|steps|points)\b/.test(promptLower)) {
    const ok = /^\s*\d{1,2}[.)]\s+\S/m.test(prose);
    results.push(finding('numbered-list', ok, 'Provided the requested numbered list.',
      'Prompt asked for a numbered list, but the response has none.', ok ? 'Numbered items found.' : 'No numbered items found.', 'Use a numbered list.'));
  } else if (/\b(bullet(ed)? (points?|list)|as bullets|in bullets)\b/.test(promptLower)) {
    const ok = /^\s*[-*•]\s+\S/m.test(prose);
    results.push(finding('bullet-list', ok, 'Provided the requested bullet points.',
      'Prompt asked for bullet points, but the response has none.', ok ? 'Bullets found.' : 'No bullet items found.', 'Use bullet points.'));
  }

  const sentenceReq = promptLower.match(/\b(?:in|using|with|within|at most)\s+(one|a single|single|two|three|four|five|\d)\s+sentences?\b|\b(one|single)[- ]sentence\b/);
  if (sentenceReq) {
    const limit = toCount((sentenceReq[1] || sentenceReq[2]).replace('a single', 'single'));
    // Abbreviations and decimals would otherwise split sentences
    const cleaned = prose.replace(/\b(e\.g|i\.e|etc|vs|dr|mr|mrs|ms|st|no)\./gi, '$1').replace(/(\d)\.(\d)/g, '$1$2');
    const count = (cleaned.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (cleaned.trim() ? 1 : 0);
    const ok = count <= limit;
    results.push(finding('sentence-count', ok, `Kept to ${limit} sentence${limit > 1 ? 's' : ''}.`,
      `Prompt asked for ${limit} sentence${limit > 1 ? 's' : ''}, but the response has ${count}.`, `${count} sentences.`, `Answer in ${limit} sentence${limit > 1 ? 's' : ''}.`));
  }

  const paragraphReq = promptLower.match(/\b(?:in|using|with|within|at most)\s+(one|a single|single|two|three|four|five|\d)\s+paragraphs?\b|\b(one|single)[- ]paragraph\b/);
  if (paragraphReq) {
    const limit = toCount((paragraphReq[1] || paragraphReq[2]).replace('a single', 'single'));
    const count = prose.split(/\n\s*\n/).filter(p => /[\p{L}\p{N}]/u.test(p) && !/^\s*#/.test(p)).length;
    const ok = count <= limit;
    results.push(finding('paragraph-count', ok, `Kept to ${limit} paragraph${limit > 1 ? 's' : ''}.`,
      `Prompt asked for ${limit} paragraph${limit > 1 ? 's' : ''}, but the response has ${count}.`, `${count} paragraphs.`, `Answer in ${limit} paragraph${limit > 1 ? 's' : ''}.`));
  }

  if (/\b(in one word|one[- ]word (answer|reply|response)|single[- ]word (answer|reply|response)|answer in a word)\b/.test(promptLower)) {
    const words = prose.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
    const ok = words <= 3;
    results.push(finding('one-word', ok, 'Answered in a word.', `Prompt asked for a one-word answer, but the response has ${words} words.`,
      `${words} words.`, 'Reply with a single word.'));
  }

  const lang = promptLower.match(LANGUAGE_REQUEST_RE)?.[1];
  if (lang) {
    const letters = (prose.match(/\p{L}/gu) || []).length;
    const inScript = (prose.match(SCRIPTS[lang]) || []).length;
    const share = letters ? inScript / letters : 0;
    const ok = share >= 0.4;
    const name = lang[0].toUpperCase() + lang.slice(1);
    results.push(finding('response-language', ok, `Answered in ${name}.`,
      `Prompt asked for an answer in ${name}, but the response is mostly in another script.`,
      `${Math.round(share * 100)}% of letters are in the ${name} script.`, `Write the answer in ${name}.`));
  }

  return results;
}

function parseWordLimit(prompt) {
  const m = prompt.match(/\b(?:in|under|within|at most|no more than|max(?:imum)?(?: of)?|less than|fewer than|up to)\s+(\d{1,4})\s+words?\b/i);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Validates and normalizes evaluation weights.
 * Safe fallback to DEFAULT_CRITIC_WEIGHTS if invalid or non-positive.
 */
export function validateAndNormalizeWeights(customWeights = {}) {
  const base = { ...DEFAULT_CRITIC_WEIGHTS, ...customWeights };
  const keys = ['correctness', 'relevance', 'completeness', 'clarity', 'instructionFollowing'];
  
  let isValid = true;
  let errorMsg = null;
  const numericWeights = {};

  for (const k of keys) {
    const val = Number(base[k]);
    if (typeof val !== 'number' || isNaN(val) || !isFinite(val) || val < 0) {
      isValid = false;
      errorMsg = `Weight '${k}' must be a finite, non-negative number. Received: ${base[k]}`;
      break;
    }
    numericWeights[k] = val;
  }

  const sum = keys.reduce((acc, k) => acc + (numericWeights[k] || 0), 0);
  if (sum <= 0) {
    isValid = false;
    errorMsg = 'Sum of evaluation weights must be strictly greater than 0.';
  }

  if (!isValid) {
    return {
      valid: false,
      normalized: { ...DEFAULT_CRITIC_WEIGHTS },
      raw: customWeights,
      warning: `${errorMsg} Defaulting to standard normalized weights.`
    };
  }

  // Normalize so weights sum strictly to 1.0
  const normalized = {};
  for (const k of keys) {
    normalized[k] = Math.round((numericWeights[k] / sum) * 10000) / 10000;
  }

  return {
    valid: true,
    normalized,
    raw: customWeights,
    warning: null
  };
}

/**
 * Deterministically checks a candidate response for structural, negative constraint,
 * and format violations.
 */
export function runDeterministicChecks(candidate, promptContext = {}) {
  const findings = [];
  let isCriticalFailure = false;
  let isEligible = true;

  const originalPrompt = (promptContext.originalPrompt || '').trim();
  const refinedPrompt = (promptContext.refinedPrompt || '').trim();
  const fullPromptText = `${originalPrompt} ${refinedPrompt}`.toLowerCase();
  // What the user actually asked for. Auto-added refinement suggestions ("complexity where relevant") are not hard requirements;
  // when the user adopts a refined prompt, it arrives here as originalPrompt.
  const userPromptText = originalPrompt.toLowerCase();
  const constraints = promptContext.constraints || [];

  const text = candidate.text != null ? String(candidate.text).trim() : '';
  const textLower = text.toLowerCase();

  // 1. Empty or malformed response
  if (!text || text.length === 0) {
    isCriticalFailure = true;
    isEligible = false;
    findings.push({
      id: 'rule-empty-response',
      rule: 'non_empty_content',
      status: 'fail',
      severity: 'critical',
      category: 'incomplete_response',
      description: 'Candidate response is empty or contains only whitespace.',
      evidence: `Response length: ${text.length} characters.`,
      likelySource: candidate.status === 'error' ? 'provider_or_execution' : 'decision_model',
      recommendedCorrection: 'Regenerate response ensuring the model produces complete content.'
    });
    return {
      passed: false,
      isCriticalFailure,
      isEligible,
      findings
    };
  }

  // 2. Provider execution error returned as content
  if (candidate.status === 'error' || /\[error from|failed to generate|internal server error|rate limit exceeded/i.test(text)) {
    isCriticalFailure = true;
    isEligible = false;
    findings.push({
      id: 'rule-provider-error',
      rule: 'error_free_execution',
      status: 'fail',
      severity: 'critical',
      category: 'provider_error',
      description: 'Candidate execution encountered an upstream error or returned an error payload.',
      evidence: text.substring(0, 150),
      likelySource: 'provider_or_execution',
      recommendedCorrection: 'Check provider API keys, quota, or network connectivity before retrying.'
    });
  }

  // 3. Output Format Checks: JSON Requirement
  const requiresJson = /\b(json|json format|valid json|json schema|return a json object|in json)\b/i.test(fullPromptText);
  if (requiresJson) {
    let jsonValid = false;
    let jsonSnippet = '';
    // Look for json inside ```json ... ``` or raw {...} / [...]
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      jsonSnippet = jsonMatch[1] || jsonMatch[0];
      try {
        JSON.parse(jsonSnippet);
        jsonValid = true;
      } catch (err) {
        jsonValid = false;
      }
    }

    if (jsonValid) {
      findings.push({
        id: 'rule-format-json',
        rule: 'json_syntax_validation',
        status: 'pass',
        severity: 'low',
        category: 'format_violation',
        description: 'Successfully parsed and validated requested JSON output structure.',
        evidence: jsonSnippet.substring(0, 100),
        likelySource: 'decision_model'
      });
    } else {
      isCriticalFailure = true;
      findings.push({
        id: 'rule-format-json',
        rule: 'json_syntax_validation',
        status: 'fail',
        severity: 'critical',
        category: 'format_violation',
        description: 'User prompt requested valid JSON output, but response failed JSON parsing.',
        evidence: text.substring(0, 150),
        likelySource: 'decision_model',
        recommendedCorrection: 'Format the output as strictly valid JSON without conversational wrapper text.'
      });
    }
  }

  // 4. Output Format Checks: Code blocks when code explicitly requested
  // For coding-category prompts the coding task validator checks code blocks itself; checking here too would double-count
  const requiresCode = !promptContext.codeCheckedByTask && isCodeRequested(userPromptText);
  if (requiresCode) {
    const hasCodeBlock = /```[a-z0-9_-]*[\s\S]*?```/i.test(text);
    if (hasCodeBlock) {
      findings.push({
        id: 'rule-code-fence',
        rule: 'code_block_structure',
        status: 'pass',
        severity: 'low',
        category: 'code_validation_failure',
        description: 'Formatted markdown code block provided as requested.',
        evidence: 'Code block detected.',
        likelySource: 'decision_model'
      });
    } else {
      findings.push({
        id: 'rule-code-fence',
        rule: 'code_block_structure',
        status: 'fail',
        severity: 'medium',
        category: 'code_validation_failure',
        description: 'Code implementation requested but missing explicit markdown code fence block.',
        evidence: text.substring(0, 100),
        likelySource: 'decision_model',
        recommendedCorrection: 'Enclose programming solutions in standard markdown triple backticks with language specifier.'
      });
    }
  }

  // 5. Negative Constraints & Prohibited Elements
  // Check for "without ...", "no ...", "do not use ...", "avoid ..."
  const negativePatterns = [
    {
      regex: /\b(without (?:using )?external librar(?:y|ies)|no external librar(?:y|ies)|pure (?:python|c|js)|standard library only)\b/i,
      prohibitedRegex: /\b(pip install|npm install|import (?:numpy|pandas|requests|axios|lodash|scipy|react))\b/i,
      name: 'No External Libraries'
    },
    {
      regex: /\b(no recursion|without (?:using )?recursion|iterative(?:ly)? only)\b/i,
      prohibitedRegex: /\b(recurse|recursive call|self\(|fibonacci\((?:n-1|n-2)\))\b/i,
      name: 'Prohibit Recursion'
    },
    {
      regex: /\b(no loops?|without (?:using )?loops?|without while|without for)\b/i,
      prohibitedRegex: /\b(for\s*\(|while\s*\(|for\s+\w+\s+in\s+)\b/i,
      name: 'Prohibit Loops'
    }
  ];

  for (const neg of negativePatterns) {
    if (neg.regex.test(fullPromptText)) {
      if (neg.prohibitedRegex.test(text)) {
        isCriticalFailure = true;
        findings.push({
          id: `rule-negative-constraint-${neg.name.toLowerCase().replace(/\s+/g, '-')}`,
          rule: `prohibited_${neg.name}`,
          status: 'fail',
          severity: 'critical',
          category: 'instruction_violation',
          description: `Violated explicit negative constraint: "${neg.name}".`,
          evidence: (text.match(neg.prohibitedRegex) || [])[0] || 'Prohibited pattern found',
          likelySource: 'decision_model',
          recommendedCorrection: `Ensure the response strictly complies with the constraint "${neg.name}".`
        });
      } else {
        findings.push({
          id: `rule-negative-constraint-${neg.name.toLowerCase().replace(/\s+/g, '-')}`,
          rule: `prohibited_${neg.name}`,
          status: 'pass',
          severity: 'low',
          category: 'instruction_violation',
          description: `Successfully adhered to negative constraint: "${neg.name}".`,
          evidence: 'No prohibited construct detected.',
          likelySource: 'decision_model'
        });
      }
    }
  }

  // 6. Explicitly requested sections check
  const requestedSections = [
    { pattern: /\b(time complexity|space complexity|complexity analysis)\b/i, name: 'Complexity Analysis' },
    { pattern: /\b(test cases?|sample inputs?|example usage|example inputs?)\b/i, name: 'Sample Test Cases / Usage' },
    { pattern: /\b(step-by-step|explanation of the logic|explain the logic|walkthrough)\b/i, name: 'Step-by-step Logic Explanation' }
  ];

  for (const sec of requestedSections) {
    if (sec.pattern.test(userPromptText)) {
      const presentInResponse = sec.pattern.test(textLower) || 
        (/\bcomplexity\b/i.test(textLower) && sec.name === 'Complexity Analysis') ||
        (/\b(input:|output:|example:)/i.test(textLower) && sec.name === 'Sample Test Cases / Usage');

      if (!presentInResponse) {
        findings.push({
          id: `rule-missing-section-${sec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          rule: `section_${sec.name}`,
          status: 'fail',
          severity: 'high',
          category: 'missing_requirement',
          description: `Prompt requested "${sec.name}", but it was omitted from the candidate response.`,
          evidence: 'Section not located in candidate text.',
          likelySource: 'decision_model',
          recommendedCorrection: `Include an explicit section for ${sec.name}.`
        });
      } else {
        findings.push({
          id: `rule-missing-section-${sec.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          rule: `section_${sec.name}`,
          status: 'pass',
          severity: 'low',
          category: 'missing_requirement',
          description: `Provided requested section: "${sec.name}".`,
          evidence: 'Section identified in text.',
          likelySource: 'decision_model'
        });
      }
    }
  }

  // 7. Refusal instead of an answer (short replies only, so answers that mention a limitation are not caught)
  if (text.length < 400 && REFUSAL_PATTERN.test(text)) {
    findings.push({
      id: 'rule-refusal',
      rule: 'answers_the_prompt',
      status: 'fail',
      severity: 'high',
      category: 'instruction_violation',
      description: 'Candidate declined to answer instead of addressing the prompt.',
      evidence: text.substring(0, 150),
      likelySource: 'decision_model',
      recommendedCorrection: 'Answer the request, or explain specifically what is missing to do so.'
    });
  }

  // 8. Explicit item count ("exactly 3 bullet points", "list 5 tips") and word limits ("under 50 words").
  // Uses the original prompt: refinement adds its own "Requirements:" bullets.
  const itemLimit = parseItemCount(originalPrompt);
  if (itemLimit) {
    const items = countTopLevelListItems(text);
    if (items > 0) {
      const ok = items === itemLimit.count;
      findings.push({
        id: 'rule-item-count',
        rule: 'requested_item_count',
        status: ok ? 'pass' : 'fail',
        severity: ok ? 'low' : 'high',
        category: 'instruction_violation',
        description: ok
          ? `Provided the requested ${itemLimit.count} ${itemLimit.noun}.`
          : `Prompt asked for ${itemLimit.count} ${itemLimit.noun}, but the response lists ${items}.`,
        evidence: `${items} top-level list items found.`,
        likelySource: 'decision_model',
        recommendedCorrection: ok ? undefined : `Return exactly ${itemLimit.count} ${itemLimit.noun}.`
      });
    }
  }

  const wordLimit = parseWordLimit(originalPrompt);
  if (wordLimit) {
    // Any letter or digit counts, so Hindi or Kannada answers are measured too
    const words = text.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
    const ok = words <= wordLimit;
    findings.push({
      id: 'rule-word-limit',
      rule: 'word_limit',
      status: ok ? 'pass' : 'fail',
      severity: ok ? 'low' : 'high',
      category: 'instruction_violation',
      description: ok
        ? `Stayed within the ${wordLimit}-word limit (${words} words).`
        : `Prompt set a ${wordLimit}-word limit, but the response has ${words} words.`,
      evidence: `${words} words (code blocks excluded).`,
      likelySource: 'decision_model',
      recommendedCorrection: ok ? undefined : `Shorten the response to at most ${wordLimit} words.`
    });
  }

  // 8b. Requested output formats (table, numbered/bulleted list, sentence/paragraph counts, one word)
  //     and requested response language
  findings.push(...checkRequestedFormats(userPromptText, text));

  // 9. Relevance: a longer answer that shares no content words with the prompt is likely off-topic.
  // Only longer answers are judged (short ones may answer without repeating the topic), and only prompts with English content words.
  const promptTerms = contentTerms(originalPrompt);
  if (promptTerms.length >= 2 && text.length > 200) {
    const responseWords = text.toLowerCase().match(/[a-z]{4,}/g) || [];
    const shared = promptTerms.filter(t => responseWords.some(w => sameStem(t, w)));
    if (shared.length === 0) {
      findings.push({
        id: 'rule-off-topic',
        rule: 'relevance_to_prompt',
        status: 'fail',
        severity: 'high',
        category: 'off_topic',
        description: 'Response does not mention any of the main terms in the prompt and may be off-topic.',
        evidence: `Prompt terms not found: ${promptTerms.slice(0, 6).join(', ')}.`,
        likelySource: 'decision_model',
        recommendedCorrection: 'Answer the question that was asked.'
      });
    }
  }

  // 10. Incomplete generation check (unclosed code fences or abrupt cut-off)
  const codeFenceCount = (text.match(/```/g) || []).length;
  if (codeFenceCount % 2 !== 0) {
    findings.push({
      id: 'rule-unclosed-code-block',
      rule: 'complete_generation',
      status: 'fail',
      severity: 'high',
      category: 'incomplete_response',
      description: 'Candidate response contains an unclosed code block (odd number of code fences), indicating truncated generation.',
      evidence: `Detected ${codeFenceCount} code fence delimiters.`,
      likelySource: 'provider_or_execution',
      recommendedCorrection: 'Increase token budget or regenerate to ensure response terminates completely.'
    });
  }

  const hasCritical = findings.some(f => f.status === 'fail' && f.severity === 'critical');
  if (hasCritical) {
    isCriticalFailure = true;
    isEligible = false;
  }

  return {
    passed: !hasCritical,
    isCriticalFailure,
    isEligible,
    findings
  };
}
