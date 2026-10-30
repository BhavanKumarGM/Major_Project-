/**
 * Prompt Refinement & Breakdown Engine for Fusion AI
 * Fixes spelling/grammar, then adds a short list of task-appropriate requirements to the
 * user's own wording (never wraps it in quotes or replaces it), and extracts a task breakdown.
 * Refining an already refined prompt does not add a second requirements block.
 */

import { correctPrompt } from './spellingService.js';

const REQUIREMENTS_HEADER = 'Requirements:';
const ALREADY_REFINED = /\n\s*Requirements:\s*\n\s*[-\d]/i;

// Constraint labels produced by analyzePrompt → requirement wording
const CONSTRAINT_REQUIREMENTS = {
  'Beginner-friendly simplicity & clear commentary': 'Explain in beginner-friendly terms and avoid unexplained jargon.',
  'Optimized performance and algorithmic efficiency': 'Prefer an efficient approach and mention its performance characteristics.',
  'Restricted to standard library only (no 3rd party dependencies)': 'Use only the standard library (no third-party dependencies).',
  'Concise output without unnecessary fluff': 'Keep the answer concise.'
};

function categoryRequirements(category, analysis, lower) {
  const tech = analysis.technologies?.[0] || null;

  if (category === 'Coding') {
    if (/\bprime\b/.test(lower)) {
      return [
        tech ? `Use ${tech}.` : 'State which programming language you use.',
        'Handle edge cases: numbers <= 1, 2, even numbers, negative input and large integers.',
        'Use an efficient check (test divisors only up to √n).',
        'Explain the mathematical and algorithmic logic step by step.',
        'Show example inputs with expected outputs (e.g. 2, 17, 25, -5).'
      ];
    }
    const useTech = tech ? `Use ${tech}${analysis.technologies.length > 1 ? ` (with ${analysis.technologies.slice(1).join(', ')})` : ''}.`
      : 'Choose a suitable programming language and say which one you used.';
    // Conceptual questions ("explain what a closure is") need an explanation, not a full program
    const isConceptual = /^\s*(explain|what|why|how does|how do|when|describe|compare|difference)\b/.test(lower) &&
      !/\b(write|implement|build|create|code|program|script|fix|debug|refactor)\b/.test(lower);
    if (isConceptual) {
      return [
        useTech,
        'Explain the concept clearly, starting with a one-sentence definition.',
        'Include a short code example that illustrates it.',
        'Mention common pitfalls or typical use cases.'
      ];
    }
    return [
      useTech,
      'Provide complete, runnable code with brief comments.',
      'Handle edge cases and invalid input.',
      'Explain the approach, including time and space complexity where relevant.',
      'Include a short usage example with expected output.'
    ];
  }
  if (category === 'Summarization') {
    return [
      'Start with a one-sentence TL;DR.',
      'List the 3-5 most important points as bullets.',
      'Note key implications or trade-offs.',
      'Stay faithful to the source; do not add facts that are not in it.'
    ];
  }
  if (category === 'Reasoning & Logic') {
    return [
      'State any assumptions first.',
      'Work through the reasoning step by step without skipping steps.',
      'Consider alternative views or counterarguments where relevant.',
      'End with a clear, justified conclusion.'
    ];
  }
  if (category === 'Creative Writing') {
    return [
      'Respect any requested form, length and tone.',
      'Use vivid, concrete detail and a consistent voice.',
      'Give the piece a clear structure and a satisfying ending.'
    ];
  }
  if (category === 'Research & Fact-finding') {
    return [
      'Separate established facts from estimates or opinions.',
      'Cite sources where possible, and say clearly when you are unsure.',
      'Mention if the information may be out of date.'
    ];
  }
  if (category === 'Documentation') {
    return [
      `Write for a ${analysis.targetAudience?.toLowerCase().includes('beginner') ? 'beginner' : 'technical'} reader with clear headings.`,
      'Explain step by step, with examples.',
      'Point out common mistakes or pitfalls.'
    ];
  }
  return [
    'Answer the question directly first, then add supporting detail.',
    'Use headings, bullet points or tables where they make the answer clearer.',
    'Include practical examples or next steps where useful.'
  ];
}

export function refinePrompt(rawPrompt, analysis = {}) {
  if (!rawPrompt || !rawPrompt.trim()) {
    return {
      originalPrompt: '',
      correctedPrompt: '',
      refinedPrompt: '',
      corrections: [],
      flaggedWords: [],
      improvements: [],
      refinementMethod: 'rules',
      breakdown: {
        goal: 'No input provided',
        taskType: 'General',
        requiredOutput: 'Text',
        constraints: [],
        technologies: [],
        expectedComplexity: 'N/A',
        assumptions: []
      }
    };
  }

  const prompt = rawPrompt.trim();
  const { text: corrected, corrections, flagged } = correctPrompt(prompt);
  const lower = corrected.toLowerCase();
  const category = analysis.primaryCategory || 'General Assistance';
  const improvements = [];

  const spelling = corrections.filter(c => c.type === 'spelling');
  const other = corrections.filter(c => c.type !== 'spelling');
  if (spelling.length > 0) {
    improvements.push(`Fixed spelling: ${spelling.map(c => `${c.from} → ${c.to}`).join(', ')}.`);
  }
  if (other.length > 0) {
    improvements.push(`Tidied grammar and casing: ${other.map(c => `${c.from} → ${c.to}`).join(', ')}.`);
  }
  for (const f of flagged) {
    improvements.push(`Possible typo left unchanged: "${f.word}" (did you mean ${f.suggestions.join(' or ')}?).`);
  }

  let refined = corrected;
  if (ALREADY_REFINED.test(prompt)) {
    improvements.push('Prompt already contains a requirements list; only spelling and grammar were adjusted.');
  } else {
    const requirements = categoryRequirements(category, analysis, lower);
    for (const c of analysis.constraints || []) {
      if (CONSTRAINT_REQUIREMENTS[c]) requirements.push(CONSTRAINT_REQUIREMENTS[c]);
    }
    if ((analysis.missingInfoNotes || []).some(n => /language not explicitly/i.test(n)) && category !== 'Coding') {
      requirements.push('If a programming language is needed, choose a suitable one and say which.');
    }
    if ((analysis.missingInfoNotes || []).some(n => /very brief/i.test(n))) {
      requirements.push('If the request is ambiguous, state the interpretation you chose.');
    }
    const unique = [...new Set(requirements)];
    refined = `${corrected}\n\n${REQUIREMENTS_HEADER}\n${unique.map(r => `- ${r}`).join('\n')}`;
    improvements.push(`Added ${unique.length} ${category.toLowerCase()} requirements while keeping your original wording.`);
  }

  // Structured Breakdown
  const isCoding = category === 'Coding';
  let expectedComplexity = 'O(1) to O(N) Standard';
  if (/\b(prime|matrix|sort|search|graph|tree|dynamic programming|dp)\b/i.test(lower)) {
    expectedComplexity = 'Algorithmic O(√N) to O(N log N)';
  } else if (!isCoding) {
    expectedComplexity = 'Conceptual / Multi-step Synthesis';
  }

  const constraints = analysis.constraints || [];
  const technologies = analysis.technologies || [];
  const missingInfo = analysis.missingInfoNotes || [];
  const breakdown = {
    goal: `Fulfill the user's request: ${corrected.length > 80 ? corrected.substring(0, 77) + '...' : corrected}`,
    taskType: category,
    requiredOutput: analysis.requestedOutputType,
    constraints: constraints.length > 0 ? constraints : ['Accuracy, clarity, and idiomatic best practices'],
    technologies: technologies.length > 0 ? technologies : ['General AI / Domain standard'],
    expectedComplexity,
    assumptions: missingInfo.length > 0 ? missingInfo : ['Standard modern environment and default parameters assumed']
  };

  return {
    originalPrompt: prompt,
    correctedPrompt: corrected,
    refinedPrompt: refined,
    corrections,
    flaggedWords: flagged,
    improvements,
    refinementMethod: 'rules',
    breakdown
  };
}
