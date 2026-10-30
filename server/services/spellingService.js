/**
 * Offline Spelling & Light Grammar Correction for Fusion AI
 * Uses a Hunspell English dictionary (nspell + dictionary-en); no network calls.
 * Only confident fixes are applied; ambiguous words are reported, never guessed.
 * Code, URLs, emails, paths, identifiers and proper nouns are left untouched.
 */

import nspell from 'nspell';
import dictionary from 'dictionary-en';

const spell = nspell(dictionary);

// Frequent typos whose dictionary suggestion would be wrong or missing
const TYPO_OVERRIDES = {
  teh: 'the', hte: 'the', taht: 'that', wich: 'which', whcih: 'which', thier: 'their', ther: 'there',
  adn: 'and', nad: 'and', fo: 'of', ot: 'to', yuo: 'you', tehm: 'them', becuase: 'because', beacuse: 'because',
  fuction: 'function', funtion: 'function', fucntion: 'function', buld: 'build', biuld: 'build', bulid: 'build',
  wirte: 'write', wrtie: 'write', wriet: 'write', mkae: 'make', amke: 'make', creat: 'create', craete: 'create',
  progam: 'program', programe: 'program', proggram: 'program', calculater: 'calculator', explin: 'explain',
  expalin: 'explain', exlpain: 'explain', explane: 'explain', exmaple: 'example', exampel: 'example',
  dont: "don't", cant: "can't", doesnt: "doesn't", isnt: "isn't", didnt: "didn't", wouldnt: "wouldn't",
  shouldnt: "shouldn't", couldnt: "couldn't", im: "I'm", ive: "I've", thats: "that's", whats: "what's",
  pls: 'please', plz: 'please', u: 'you', ur: 'your', wat: 'what', abt: 'about'
};

// Words to prefer when ranking dictionary suggestions (common English + prompt/tech vocabulary)
const PREFERRED = new Set(`
the be to of and a in that have it for not on with he as you do at this but his by from they we say her she
or an will my one all would there their what so up out if about who get which go me when make can like time no
just him know take people into year your good some could them see other than then now look only come its over
think also back after use two how our work first well way even new want because any these give day most us
write build create explain example program function code calculator dashboard application website database
algorithm language python javascript script server client design develop implement generate compare describe
summary summarize analysis analyze detail details detailed explanation simple simply beginner question answer
please help list steps step table chart report project system data model models user users farmer farmers
receive believe separate definitely necessary occurred length language component components responsive
learning machine difference different between types type deep neural network networks training test testing
security secure authentication application applications feature features interface management mobile
environment performance optimize optimization recursion recursive variable variables string strings number
numbers array arrays object objects class classes method methods error errors debug file files folder
`.trim().split(/\s+/));

// Programming and product terms the English dictionary does not know (lowercase)
const TECH_TERMS = new Set(`
api apis json yaml xml html css scss sql nosql graphql rest restful http https url urls uri cli gui ui ux
frontend backend fullstack devops dataset datasets javascript typescript nodejs npm yarn pnpm vite webpack
react reactjs nextjs vue vuejs angular svelte tailwind bootstrap jquery django fastapi numpy pandas scipy
pytorch tensorflow keras sklearn matplotlib golang rustc cpp csharp kotlin swift php laravel mysql postgres
postgresql sqlite mongodb redis kafka docker kubernetes kubectl aws gcp azure github gitlab git repo repos
oauth jwt cors crud regex async await middleware webhook webhooks microservice microservices llm llms gpt
openai anthropic gemini groq ollama sarvam chatbot chatbots dropdown navbar sidebar login signup subnet ipv
localhost config env dotenv eslint jsx tsx boolean enum enums param params args stdin stdout iot ml ai
runnable codebase refactor refactoring linter lint toolchain runtime runtimes serverless pseudocode
tokenizer tokenize async sync autoscaling hashmap hashtable linkedlist stdlib boilerplate
`.trim().split(/\s+/));

// Unambiguous product/language names normalized to their usual casing
const CASING = {
  javascript: 'JavaScript', typescript: 'TypeScript', json: 'JSON', html: 'HTML', css: 'CSS', sql: 'SQL',
  api: 'API', apis: 'APIs', nodejs: 'Node.js', github: 'GitHub', mongodb: 'MongoDB', mysql: 'MySQL',
  postgresql: 'PostgreSQL', fastapi: 'FastAPI', numpy: 'NumPy', python: 'Python', iot: 'IoT', ui: 'UI', ux: 'UX',
  nosql: 'NoSQL', graphql: 'GraphQL'
};

const PROTECTED = /```[\s\S]*?```|`[^`\n]*`|https?:\/\/\S+|www\.\S+|\S+@\S+\.\S+|(?:[\w.-]+[\\/])+[\w.-]+|\b\w+\.(?:js|jsx|ts|tsx|py|java|c|cpp|h|go|rs|json|md|html|css|sql|txt|csv)\b/g;
const QUESTION_START = /^(what|how|why|when|where|who|which|can|could|should|would|is|are|do|does|did|will|whats)\b/i;
const MAX_FIXES = 40;

function damerau(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

function matchCase(original, replacement) {
  if (original[0] === original[0].toUpperCase() && replacement[0] === replacement[0].toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

/**
 * Picks a correction only when it is clearly the intended word; otherwise returns null.
 */
function chooseCorrection(lower) {
  if (TYPO_OVERRIDES[lower]) return { word: TYPO_OVERRIDES[lower], confident: true };
  const suggestions = spell.suggest(lower).filter(s => /^[a-z']+$/.test(s));
  if (suggestions.length === 0) return null;

  const ranked = suggestions
    .map((s, index) => {
      const dist = damerau(lower, s);
      let score = index + dist * 2;
      if (PREFERRED.has(s)) score -= 10;
      if (s[0] === lower[0]) score -= 1;
      return { s, dist, score };
    })
    .sort((a, b) => a.score - b.score);

  const best = ranked[0];
  if (best.dist > 2) return { word: null, suggestions: suggestions.slice(0, 3) };
  const closeRivals = ranked.filter(r => r.dist === best.dist && !PREFERRED.has(r.s) && r.s !== best.s);
  // Equally close inflections (give / gives / giver for "gived") mean the intended form is unknown
  const inflectionRival = ranked.some(r => r.dist === best.dist && r.s !== best.s &&
    (r.s.startsWith(best.s) || best.s.startsWith(r.s)));
  if (inflectionRival) return { word: null, suggestions: suggestions.slice(0, 3) };
  // Two-edit fixes are only trusted for common words ("runnable" must not become "winnable")
  const confident = PREFERRED.has(best.s) || (best.dist === 1 && closeRivals.length === 0);
  return confident ? { word: best.s, confident: true } : { word: null, suggestions: suggestions.slice(0, 3) };
}

function isSentenceStart(textBefore) {
  return /(^|[.!?]\s+|\n\s*)$/.test(textBefore);
}

function correctSegment(segment, isFirstSegment, corrections, flagged) {
  let out = segment.replace(/[A-Za-z][A-Za-z']*/g, (word, offset, whole) => {
    if (corrections.length >= MAX_FIXES) return word;
    const lower = word.toLowerCase();
    const before = whole.slice(0, offset);
    const atStart = isSentenceStart(before) && (isFirstSegment || before.length > 0);

    // Leave identifiers, acronyms and mid-sentence proper nouns alone
    if (/[a-z][A-Z]/.test(word) || (word.length > 1 && word === word.toUpperCase())) return word;
    if (word[0] === word[0].toUpperCase() && !atStart) return word;

    if (CASING[lower] && word !== CASING[lower]) {
      corrections.push({ from: word, to: CASING[lower], type: 'casing' });
      return CASING[lower];
    }
    if (TECH_TERMS.has(lower)) return word;
    if (lower.length < 3 && !TYPO_OVERRIDES[lower]) return word;
    if (!TYPO_OVERRIDES[lower] && (spell.correct(word) || spell.correct(lower))) return word;

    const choice = chooseCorrection(lower);
    if (choice?.word) {
      const fixed = CASING[choice.word] || matchCase(word, choice.word);
      if (fixed !== word) corrections.push({ from: word, to: fixed, type: 'spelling' });
      return fixed;
    }
    if (choice?.suggestions?.length) flagged.push({ word, suggestions: choice.suggestions });
    return word;
  });

  // Light grammar: standalone "i", repeated words, spacing around punctuation
  out = out.replace(/(^|[\s(])i(?=[\s,.!?']|$)/g, (m, pre) => {
    corrections.push({ from: 'i', to: 'I', type: 'grammar' });
    return `${pre}I`;
  });
  out = out.replace(/\b([A-Za-z]+)\s+\1\b/gi, (m, w) => {
    if (['that', 'had', 'is'].includes(w.toLowerCase())) return m;
    corrections.push({ from: m, to: w, type: 'grammar' });
    return w;
  });
  out = out.replace(/[ \t]+([,.!?;:])(?=\s|$)/g, '$1').replace(/[ \t]{2,}/g, ' ');
  return out;
}

const cache = new Map();

/**
 * @returns {{ text: string, corrections: Array<{from,to,type}>, flagged: Array<{word,suggestions}> }}
 */
export function correctPrompt(raw) {
  const input = typeof raw === 'string' ? raw : '';
  if (cache.has(input)) return cache.get(input);

  const corrections = [];
  const flagged = [];
  const trimmed = input.trim();
  let text = '';
  let last = 0;
  let segIndex = 0;
  let endsProtected = false;

  for (const m of trimmed.matchAll(PROTECTED)) {
    text += correctSegment(trimmed.slice(last, m.index), segIndex++ === 0, corrections, flagged) + m[0];
    last = m.index + m[0].length;
    endsProtected = last === trimmed.length;
  }
  text += correctSegment(trimmed.slice(last), segIndex === 0, corrections, flagged);

  // Capitalize the first letter and close the final sentence when the prompt is plain prose
  if (/^[a-z]/.test(text)) {
    const firstWord = text.match(/^[a-z']+/)[0];
    const capitalized = firstWord[0].toUpperCase() + firstWord.slice(1);
    const earlierFix = corrections.find(c => c.to === firstWord);
    if (earlierFix) earlierFix.to = capitalized;
    else corrections.push({ from: firstWord, to: capitalized, type: 'grammar' });
    text = text[0].toUpperCase() + text.slice(1);
  }
  if (text && !endsProtected && !/[.!?:;`)\]}"'>]$/.test(text) && !text.includes('\n')) {
    text += QUESTION_START.test(text) ? '?' : '.';
  }

  const result = { text, corrections, flagged };
  if (cache.size > 100) cache.clear();
  cache.set(input, result);
  return result;
}
