/**
 * Prompt Analysis Engine for Fusion AI
 * Analyzes raw user prompts for intent distribution, category, constraints, and ambiguity.
 */

import { correctPrompt } from './spellingService.js';

export function analyzePrompt(rawPrompt) {
  if (!rawPrompt || typeof rawPrompt !== 'string' || !rawPrompt.trim()) {
    return {
      primaryCategory: 'General',
      intentDistribution: [{ category: 'General', percentage: 100 }],
      requestedOutputType: 'Direct Answer',
      constraints: [],
      technologies: [],
      targetAudience: 'General',
      tone: 'Helpful & Direct',
      ambiguityLevel: 'None',
      missingInfoNotes: []
    };
  }

  // Classify the spell-corrected text so typos ("pyhton", "fuction") don't hide the intent
  const prompt = correctPrompt(rawPrompt).text;
  const lower = prompt.toLowerCase();

  // 1. Detect Technologies / Languages
  const techKeywords = {
    // Patterns need language context: bare words like "c", "go", "from" or "function" are common English
    'C': [/\b(in|using|with|write a|a) c\b(?![+#])/i, /\bc (program|programming|language|code)\b/i, /\bansi c\b/i, /#include\s*<(stdio|stdlib|string)\.h>/i],
    'C++': [/(^|[^\w])c\+\+(?![\w+])/i, /\bcpp\b/i, /#include\s*<iostream>/i, /\bstd::/i],
    'Python': [/\bpython\d?\b/i, /\bdef \w+\(/, /\bimport (numpy|pandas|math|sys|os)\b/i],
    'JavaScript': [/\bjavascript\b/i, /\bjs\b/i, /\bnode\.?js\b/i, /\bconsole\.log\b/, /\b(const|let|var) \w+ =/],
    'TypeScript': [/\btypescript\b/i, /\.tsx?\b/i, /\binterface \w+ \{/, /\btype \w+ =/],
    'Java': [/\bjava\b(?!script)/i, /\bpublic class\b/, /\bSystem\.out\.print/],
    'Rust': [/\brust(lang)?\b(?! (stain|remover))/i, /\bfn main\b/, /\bcargo (build|run|new)\b/i],
    'Go': [/\bgolang\b/i, /\b(in|using|with) go\b(?! (to|for|ahead|back|through|on|over|out|into)\b)/i, /\bgo (program|code|language|module|routine)s?\b/i, /\bpackage main\b/],
    'SQL': [/\bsql\b/i, /\bselect\s+[\w*,\s]+\s+from\s+\w+/i, /\b(inner|left|right|outer) join\b/i, /\b(postgres(ql)?|mysql|sqlite)\b/i],
    'HTML/CSS': [/\bhtml5?\b/i, /\bcss3?\b/i, /\btailwind\b/i],
    'React': [/\breact(\.js|js)?\b/i, /\buse(State|Effect|Memo|Ref|Context)\b/]
  };

  const detectedTechnologies = [];
  for (const [tech, patterns] of Object.entries(techKeywords)) {
    if (patterns.some(p => p.test(prompt))) {
      detectedTechnologies.push(tech);
    }
  }

  // 2. Score Categories for Intent Distribution
  const categories = {
    'Coding': 0,
    'Reasoning & Logic': 0,
    'Documentation': 0,
    'Research & Fact-finding': 0,
    'Creative Writing': 0,
    'Summarization': 0,
    'General Assistance': 0
  };

  // Coding signals
  if (detectedTechnologies.length > 0) categories['Coding'] += 45;
  // Generic verbs (write/create/build) and words like "script" or "class" also fit essays and stories
  if (/\b(implement|code|coding|program|debug|refactor|compile|function|algorithm|api|regex|prime)\b/i.test(lower)) {
    categories['Coding'] += 40;
  }
  if (/\b(explain the logic|commented|optimize|time complexity|space complexity|recursion|loop|pointer)\b/i.test(lower)) {
    categories['Coding'] += 20;
    categories['Documentation'] += 20;
    categories['Reasoning & Logic'] += 15;
  }

  // Reasoning & Logic signals
  if (/\b(why|how come|prove|solve|math|logic|compare|evaluate|analyze|step by step|trade-off|pros and cons)\b/i.test(lower)) {
    categories['Reasoning & Logic'] += 35;
  }

  // Documentation signals
  if (/\b(explain|documentation|readme|how does it work|tutorial|guide|teach me|break down)\b/i.test(lower)) {
    categories['Documentation'] += 30;
  }

  // Research signals
  if (/\b(what is the history|find sources|papers|statistics|who discovered|literature|benchmark|dataset)\b/i.test(lower)) {
    categories['Research & Fact-finding'] += 40;
  }

  // Creative Writing signals
  if (/\b(story|poem|essay|script|dialogue|creative|blog post|copywriting|metaphor|fiction)\b/i.test(lower)) {
    categories['Creative Writing'] += 45;
  }

  // Summarization signals
  if (/\b(summarize|summary|tldr|key points|bullet points|abstract|condense|digest)\b/i.test(lower)) {
    categories['Summarization'] += 45;
  }

  // Base fallback
  if (Object.values(categories).every(v => v === 0)) {
    categories['General Assistance'] = 80;
  } else {
    categories['General Assistance'] = 10;
  }

  // Normalize to 100%
  const totalScore = Object.values(categories).reduce((a, b) => a + b, 0);
  const distribution = Object.entries(categories)
    .filter(([_, score]) => score > 0)
    .map(([cat, score]) => ({
      category: cat,
      percentage: Math.round((score / totalScore) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Fix rounding diff to sum to 100
  const currentSum = distribution.reduce((sum, item) => sum + item.percentage, 0);
  if (distribution.length > 0 && currentSum !== 100) {
    distribution[0].percentage += (100 - currentSum);
  }

  const primaryCategory = distribution[0]?.category || 'General';

  // 3. Identify Requested Output Type
  let outputType = 'Structured Answer';
  if (categories['Coding'] > 40) {
    outputType = detectedTechnologies.length > 0 ? `${detectedTechnologies[0]} Source Code + Explanation` : 'Source Code & Walkthrough';
  } else if (categories['Summarization'] > 40) {
    outputType = 'Executive Summary & Key Takeaways';
  } else if (categories['Creative Writing'] > 40) {
    outputType = 'Creative Prose / Narrative';
  } else if (categories['Reasoning & Logic'] > 40) {
    outputType = 'Step-by-Step Logical Derivation';
  } else if (categories['Documentation'] > 40) {
    outputType = 'Technical Guide & Documentation';
  }

  // 4. Extract Constraints
  const constraints = [];
  if (/\bbeginner|simple|easy|straightforward\b/i.test(lower)) {
    constraints.push('Beginner-friendly simplicity & clear commentary');
  }
  if (/\boptimize|efficient|fast|o\(1\)|o\(n\)|best practices\b/i.test(lower)) {
    constraints.push('Optimized performance and algorithmic efficiency');
  }
  if (/\bexplain\b/i.test(lower)) {
    constraints.push('Include conceptual step-by-step logic breakdown');
  }
  if (/\bno external library|pure|standard library|vanilla\b/i.test(lower)) {
    constraints.push('Restricted to standard library only (no 3rd party dependencies)');
  }
  if (/\bconcise|brief|short\b/i.test(lower)) {
    constraints.push('Concise output without unnecessary fluff');
  }
  if (constraints.length === 0) {
    constraints.push('Standard production formatting & correctness');
  }

  // 5. Ambiguity & Missing Information Analysis
  const missingInfo = [];
  let ambiguityLevel = 'Low';

  if (categories['Coding'] > 40) {
    if (detectedTechnologies.length === 0 && !/\blanguage\b/i.test(lower)) {
      missingInfo.push('Target programming language not explicitly mentioned (defaulting to standard conventions).');
      ambiguityLevel = 'Medium';
    }
    if (!/\b(input|edge case|negative|zero|large|range|float|integer)\b/i.test(lower) && prompt.length < 50) {
      missingInfo.push('Edge-case handling (e.g. negative numbers, 0, 1, non-integers) was unspecified.');
    }
  }

  if (prompt.split(/\s+/).length < 6) {
    ambiguityLevel = 'Medium';
    missingInfo.push('Prompt is very brief; assuming standard defaults and best-practice requirements.');
  }

  return {
    primaryCategory,
    intentDistribution: distribution.slice(0, 4), // Top categories
    requestedOutputType: outputType,
    constraints,
    technologies: detectedTechnologies,
    targetAudience: /\bbeginner\b/i.test(lower) ? 'Beginner / Student' : 'Developer / General Professional',
    tone: /\bformal|academic\b/i.test(lower) ? 'Formal / Academic' : 'Technical, Clear & Instructive',
    ambiguityLevel,
    missingInfoNotes: missingInfo
  };
}
