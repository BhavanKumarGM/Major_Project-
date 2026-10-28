/**
 * Answer Disagreement Detection
 * Rule checks cannot tell which of two confident answers is factually right ("Sydney" vs "Canberra").
 * For short factual questions this compares the key facts each answer states, so the evaluation can
 * say the answers disagree instead of silently ranking one above the other.
 */

// Capitalized words that start sentences without naming anything
const COMMON_CAPITALIZED = new Set(['The', 'This', 'That', 'These', 'Those', 'There', 'It', 'Its', 'Yes', 'No', 'In', 'On', 'At', 'As', 'So', 'And', 'But', 'For', 'If', 'When', 'However', 'Therefore', 'Thus', 'Answer', 'Note', 'Great', 'Good', 'Sure', 'Certainly', 'Absolutely', 'Well', 'Okay', 'Hello', 'Anyway', 'Here', 'You', 'We', 'They', 'He', 'She', 'Of', 'To']);

// "seven continents" and "7 continents" state the same fact
const NUMBER_WORDS = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100
};
const NUMBER_WORD_RE = new RegExp(`\\b(${Object.keys(NUMBER_WORDS).join('|')})\\b`, 'gi');

function sentences(text) {
  return text.replace(/```[\s\S]*?```/g, ' ').split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

// Numbers and proper nouns in a sentence that the prompt did not already contain
function keyFacts(sentence, promptLower) {
  const facts = new Set();
  sentence = sentence.replace(NUMBER_WORD_RE, w => String(NUMBER_WORDS[w.toLowerCase()]));
  for (const n of sentence.match(/-?\d+(?:[.,]\d+)*/g) || []) {
    const clean = n.replace(/,/g, '');
    if (!new RegExp(`(^|[^\\d])${clean.replace('.', '\\.')}([^\\d]|$)`).test(promptLower)) facts.add(clean);
  }
  const words = sentence.split(/\s+/);
  words.forEach(w => {
    const word = w.replace(/[^A-Za-z]/g, '');
    if (word.length < 3 || !/^[A-Z][a-z]/.test(word) || COMMON_CAPITALIZED.has(word)) return;
    if (!promptLower.includes(word.toLowerCase())) facts.add(word.toLowerCase());
  });
  return facts;
}

// The main clause holds the answer; side remarks after a comma or "which ..." may mention the wrong option too
// ("Canberra, chosen as a compromise between Sydney and Melbourne")
const CLAUSE_BREAK = /[,;:(—]|\s(?:which|who|and|but|because|while|although)\s/;

function sentenceAnswer(sentence, promptLower) {
  const clause = keyFacts(sentence.split(CLAUSE_BREAK)[0], promptLower);
  return clause.size > 0 ? clause : keyFacts(sentence, promptLower);
}

// The opening sentence usually carries the answer; a filler opener ("Great question!") is skipped for the last sentence
function answerFacts(text, promptLower) {
  const parts = sentences(text);
  if (parts.length === 0) return new Set();
  const first = sentenceAnswer(parts[0], promptLower);
  return first.size > 0 ? first : sentenceAnswer(parts[parts.length - 1], promptLower);
}

/**
 * @param {string} prompt
 * @param {Array<{modelId, modelName, text}>} responses live, successful answers only
 * @returns {null | {type, severity, description, models}}
 */
export function detectAnswerDisagreement(prompt, responses) {
  const promptLower = (prompt || '').toLowerCase();
  const withFacts = responses
    .map(r => ({ r, facts: answerFacts((r.text || '').trim(), promptLower) }))
    .filter(x => x.facts.size > 0);
  if (withFacts.length < 2) return null;

  for (let i = 0; i < withFacts.length; i++) {
    for (let j = i + 1; j < withFacts.length; j++) {
      const a = withFacts[i], b = withFacts[j];
      const overlap = [...a.facts].some(f => b.facts.has(f));
      if (!overlap) {
        const show = x => `${x.r.modelName || x.r.modelId}: ${[...x.facts].slice(0, 3).join(', ')}`;
        return {
          type: 'answer_disagreement',
          severity: 'medium',
          description: `The answers disagree on the key fact (${show(a)} vs ${show(b)}). Rule checks cannot tell which is correct; turn on the LLM judge or verify it yourself.`,
          models: [a.r.modelId, b.r.modelId]
        };
      }
    }
  }
  return null;
}
