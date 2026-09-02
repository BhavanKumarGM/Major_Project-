/**
 * Prompt Refinement & Breakdown Engine for AI Hive Mind
 * Generates an improved version of the user prompt without changing intent,
 * and extracts a structured task breakdown.
 */

export function refinePrompt(rawPrompt, analysis) {
  if (!rawPrompt || !rawPrompt.trim()) {
    return {
      originalPrompt: '',
      refinedPrompt: '',
      improvements: [],
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
  const lower = prompt.toLowerCase();
  const improvements = [];
  let refined = prompt;

  const isCoding = analysis.primaryCategory === 'Coding' || (analysis.technologies && analysis.technologies.length > 0);
  const tech = analysis.technologies && analysis.technologies.length > 0 ? analysis.technologies[0] : (isCoding ? 'Python' : null);

  // Prime number specific example enhancement
  if (/\bprime\b/i.test(lower) && (isCoding || /\bprogram|code|check\b/i.test(lower))) {
    const lang = tech || 'Python';
    refined = `Write a clean, well-commented ${lang} program to determine whether a given integer is prime. Include:
1. Robust edge-case handling (numbers <= 1, 2, even numbers, and large integers).
2. An efficient algorithm (testing divisibility up to √n).
3. A clear step-by-step explanation of the mathematical and algorithmic logic.
4. Example inputs with their corresponding expected outputs (e.g., test with 2, 17, 25, -5).`;

    improvements.push('Added explicit edge-case specifications (<= 1, 2, negative numbers).');
    improvements.push('Specified mathematical optimization constraint (testing up to √n for O(√n) efficiency).');
    improvements.push('Requested structured code commentary and logic breakdown.');
    improvements.push('Added sample test cases for verification.');
  } else if (isCoding) {
    // General coding refinement
    const parts = [];
    parts.push(`Implement a complete, production-ready ${tech || 'programming'} solution for the following request: "${prompt}".`);
    parts.push(`Requirements:`);
    parts.push(`1. Provide clean, idiomatic code with thorough inline comments.`);
    parts.push(`2. Handle common boundary conditions and potential edge cases gracefully.`);
    parts.push(`3. Briefly explain the algorithmic approach, time complexity, and space complexity.`);
    parts.push(`4. Include a working usage example with sample input and expected output.`);

    refined = parts.join('\n');
    improvements.push('Enriched with edge-case handling and boundary validation.');
    improvements.push('Explicitly requested time and space complexity annotations.');
    improvements.push('Requested runnable usage examples.');
  } else if (analysis.primaryCategory === 'Summarization') {
    refined = `Provide an insightful and structured executive summary of the following topic: "${prompt}".
Key requirements:
- Highlight the core thesis and 3-5 pivotal points with concise bullet points.
- Identify key implications, trade-offs, and takeaways.
- Conclude with a 1-sentence TL;DR summary.`;
    improvements.push('Structured output into bulleted highlights and executive takeaways.');
    improvements.push('Added requirement for a concise TL;DR conclusion.');
  } else if (analysis.primaryCategory === 'Reasoning & Logic') {
    refined = `Provide a rigorous, step-by-step analysis and solution for: "${prompt}".
Please ensure:
1. Clearly state foundational principles and any underlying assumptions.
2. Walk through the logical deduction sequentially without skipping intermediate steps.
3. Compare potential alternative perspectives or counterarguments.
4. Provide a definitive, well-justified final conclusion.`;
    improvements.push('Added structured step-by-step logical decomposition.');
    improvements.push('Required explicit statement of assumptions and counterarguments.');
  } else if (analysis.primaryCategory === 'Creative Writing') {
    refined = `Craft a compelling and evocative piece based on: "${prompt}".
Guidelines:
- Establish a distinct voice, vivid sensory details, and engaging pacing.
- Ensure natural dialogue and well-developed emotional resonance.
- Maintain stylistic consistency and polished narrative flow throughout.`;
    improvements.push('Specified sensory detail and pacing guidelines.');
    improvements.push('Enhanced stylistic polish and emotional depth.');
  } else {
    // General refinement
    refined = `Please provide a comprehensive, well-structured, and accurate answer to: "${prompt}".
- Break down the core concepts clearly with relevant context.
- Use clear headings, bullet points, or code blocks where appropriate.
- Highlight practical implications or actionable takeaways.`;
    improvements.push('Added structural clarity with headings and key takeaways.');
    improvements.push('Requested actionable context and clarity.');
  }

  // Structured Breakdown
  let expectedComplexity = 'O(1) to O(N) Standard';
  if (/\bprime|matrix|sort|search|graph|tree|dynamic programming|dp\b/i.test(lower)) {
    expectedComplexity = 'Algorithmic O(√N) to O(N log N)';
  } else if (!isCoding) {
    expectedComplexity = 'Conceptual / Multi-step Synthesis';
  }

  const breakdown = {
    goal: `Fulfill the user's request: ${prompt.length > 80 ? prompt.substring(0, 77) + '...' : prompt}`,
    taskType: analysis.primaryCategory,
    requiredOutput: analysis.requestedOutputType,
    constraints: analysis.constraints.length > 0 ? analysis.constraints : ['Accuracy, clarity, and idiomatic best practices'],
    technologies: analysis.technologies.length > 0 ? analysis.technologies : ['General AI / Domain standard'],
    expectedComplexity: expectedComplexity,
    assumptions: analysis.missingInfoNotes.length > 0 ? analysis.missingInfoNotes : ['Standard modern environment and default parameters assumed']
  };

  return {
    originalPrompt: prompt,
    refinedPrompt: refined,
    improvements,
    breakdown
  };
}
