/**
 * Requirement Coverage Analysis Layer
 * Extracts discrete requirements from original prompt & constraints, checks candidate coverage,
 * and identifies conflicts between original intent and refinement assumptions.
 */

export function extractRequirements(originalPrompt = '', refinedPrompt = '', analysisContext = {}) {
  const requirements = [];
  const orig = originalPrompt.trim();
  const refined = (refinedPrompt || '').trim();
  const constraints = analysisContext.constraints || [];
  const technologies = analysisContext.technologies || [];

  let reqIndex = 1;

  // 1. Core Goal Requirement
  if (orig.length > 0) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: `Fulfill core user intent: "${orig.length > 100 ? orig.substring(0, 97) + '...' : orig}"`,
      isMandatory: true,
      severity: 'critical',
      rationale: 'Primary user objective is essential for task satisfaction.'
    });
  }

  // 2. Explicit Language / Technology requirements
  if (technologies.length > 0) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: `Implement solution using specified technology/language: ${technologies.join(', ')}`,
      isMandatory: true,
      severity: 'high',
      rationale: 'Technology choice dictates runtime and syntax compatibility.'
    });
  }

  // 3. Format / Schema requirements
  if (/\b(json|json format|schema)\b/i.test(orig) || /\b(json|json format|schema)\b/i.test(refined)) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: 'Format output as valid JSON structure',
      isMandatory: true,
      severity: 'critical',
      rationale: 'Machine readability requires strictly parseable JSON.'
    });
  }

  // 4. Edge-case / Boundary handling
  if (/\b(edge cases?|boundary|negative|zero|non-positive|null|empty)\b/i.test(orig) || 
      /\b(edge cases?|boundary|negative|zero|non-positive|null|empty)\b/i.test(refined)) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: 'Handle boundary conditions and edge cases gracefully',
      isMandatory: true,
      severity: 'high',
      rationale: 'Robust solutions must guard against invalid or boundary inputs.'
    });
  }

  // 5. Complexity / Performance constraints
  if (/\b(complexity|o\([a-z0-9\s√]+\)|optimize|efficient|fast)\b/i.test(orig) || 
      /\b(complexity|o\([a-z0-9\s√]+\)|optimize|efficient|fast)\b/i.test(refined)) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: 'Provide computational time and space complexity analysis or optimization',
      isMandatory: false,
      severity: 'medium',
      rationale: 'Performance characteristics assist engineering trade-off evaluations.'
    });
  }

  // 6. Explanation / Walkthrough requirements
  if (/\b(explain|explanation|step-by-step|logic|walkthrough|teach me)\b/i.test(orig) || 
      /\b(explain|explanation|step-by-step|logic|walkthrough)\b/i.test(refined)) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: 'Include conceptual step-by-step logic breakdown',
      isMandatory: true,
      severity: 'high',
      rationale: 'User explicitly requested instructive explanations.'
    });
  }

  // 7. Negative constraints
  if (/\b(without|no external|pure|do not use|avoid)\b/i.test(orig)) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: 'Comply with negative restrictions (e.g. no external dependencies or prohibited patterns)',
      isMandatory: true,
      severity: 'critical',
      rationale: 'Negative constraints must not be bypassed.'
    });
  }

  // 8. Test cases / Examples
  if (/\b(test cases?|examples?|sample input|usage example)\b/i.test(orig) ||
      /\b(test cases?|examples?|sample input|usage example)\b/i.test(refined)) {
    requirements.push({
      id: `req-${reqIndex++}`,
      description: 'Include verifiable test cases or practical usage examples',
      isMandatory: false,
      severity: 'medium',
      rationale: 'Examples demonstrate practical correctness.'
    });
  }

  // Check for conflicts between original prompt and refined prompt
  const conflicts = [];
  if (/\b(concise|brief|short|1 sentence|tldr)\b/i.test(orig) && 
      /\b(comprehensive|exhaustive|in-depth|extensive|detailed breakdown)\b/i.test(refined)) {
    conflicts.push({
      type: 'brevity_conflict',
      description: 'Original prompt requested concise brevity, but prompt refinement added exhaustive/detailed expansion.',
      severity: 'medium'
    });
  }
  if (/\b(python)\b/i.test(orig) && /\b(c\+\+|java|rust)\b/i.test(refined)) {
    conflicts.push({
      type: 'tech_conflict',
      description: 'Refined prompt altered the requested programming language.',
      severity: 'critical'
    });
  }

  return {
    requirements,
    conflicts,
    inferenceDisclaimer: 'Requirement extraction is an automated heuristic inference and may not represent an exhaustive formal specification.'
  };
}

/**
 * Evaluates candidate text against discrete requirements.
 */
export function evaluateRequirementCoverage(requirements, candidateText = '', context = {}) {
  const text = (candidateText || '').trim();
  const textLower = text.toLowerCase();
  const docContext = (context.documentContext || '').toLowerCase();

  const results = requirements.map(req => {
    let status = 'unverifiable';
    let evidence = '';
    let correction = '';

    if (!text) {
      return {
        id: req.id,
        description: req.description,
        isMandatory: req.isMandatory,
        status: 'missing',
        evidence: 'Response is empty; requirement omitted.',
        severity: req.severity,
        rationale: req.rationale,
        recommendedCorrection: 'Provide full implementation addressing this requirement.'
      };
    }

    // Technology check
    if (/specified technology/i.test(req.description)) {
      const techList = context.technologies || [];
      const hasTech = techList.some(t => {
        if (t.toLowerCase() === 'c') return /#include\s*<|\bint main\b|\bprintf\b/i.test(text);
        if (t.toLowerCase() === 'python') return /def |\bimport |print\(/i.test(text);
        if (t.toLowerCase() === 'javascript') return /const |let |function |console\.log/i.test(text);
        return textLower.includes(t.toLowerCase());
      });

      if (hasTech || techList.length === 0) {
        status = 'satisfied';
        evidence = `Detected syntax/constructs matching ${techList.join(', ') || 'requested stack'}.`;
      } else {
        status = 'missing';
        evidence = `Did not find explicit code or syntax for ${techList.join(', ')}.`;
        correction = `Implement the solution in ${techList.join(', ')}.`;
      }
    }
    // JSON check
    else if (/valid json/i.test(req.description)) {
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch) {
        try {
          JSON.parse(jsonMatch[1] || jsonMatch[0]);
          status = 'satisfied';
          evidence = 'Valid JSON parsed successfully.';
        } catch (e) {
          status = 'partially_satisfied';
          evidence = 'Found JSON-like block but syntax parsing failed.';
          correction = 'Correct syntax errors to form valid JSON.';
        }
      } else {
        status = 'missing';
        evidence = 'No JSON block or object found in response.';
        correction = 'Wrap output in valid JSON format.';
      }
    }
    // Edge-case check
    else if (/boundary conditions and edge cases/i.test(req.description)) {
      if (/<= 1|<= 0|negative|zero|boundary|empty|non-positive|null|range|invalid/i.test(textLower)) {
        status = 'satisfied';
        evidence = 'Explicit boundary or edge-case handling identified in response.';
      } else {
        status = 'partially_satisfied';
        evidence = 'Basic algorithm present, but specific edge-case branches are not clearly highlighted.';
        correction = 'Add explicit validation for boundary values (e.g. non-positive numbers, empty inputs).';
      }
    }
    // Complexity check
    else if (/complexity/i.test(req.description)) {
      if (/o\([a-z0-9\s√]+\)|time complexity|space complexity/i.test(textLower)) {
        status = 'satisfied';
        evidence = 'Found explicit complexity notation (e.g. Big-O annotations).';
      } else {
        status = 'missing';
        evidence = 'Complexity analysis was omitted.';
        correction = 'Add a brief note explaining algorithmic time and space complexity.';
      }
    }
    // Explanation check
    else if (/step-by-step logic/i.test(req.description)) {
      if (/step \d|explanation|logic|walkthrough|how it works|first,|then,|finally,/i.test(textLower)) {
        status = 'satisfied';
        evidence = 'Step-by-step conceptual logic explanation present.';
      } else {
        status = 'partially_satisfied';
        evidence = 'Code or answer provided with minimal conceptual walkthrough.';
        correction = 'Include a structured walkthrough of the underlying logic.';
      }
    }
    // Negative restrictions
    else if (/negative restrictions/i.test(req.description)) {
      if (context.hasNegativeViolation) {
        status = 'contradicted';
        evidence = 'Response violates explicit negative restriction.';
        correction = 'Remove prohibited external libraries or restricted language constructs.';
      } else {
        status = 'satisfied';
        evidence = 'No prohibited elements detected in response.';
      }
    }
    // Test cases / examples
    else if (/test cases/i.test(req.description)) {
      if (/(input:|output:|example:|sample:|assert|\btest\b)/i.test(textLower)) {
        status = 'satisfied';
        evidence = 'Found sample test inputs/outputs or usage examples.';
      } else {
        status = 'missing';
        evidence = 'No test cases or sample runs included.';
        correction = 'Provide 2-3 sample test cases demonstrating expected behavior.';
      }
    }
    // Default core goal
    else {
      if (text.length > 80) {
        status = 'satisfied';
        evidence = 'Response addresses primary topic comprehensively.';
      } else if (text.length > 20) {
        status = 'partially_satisfied';
        evidence = 'Brief response; core intent partially addressed.';
        correction = 'Elaborate with more depth and precision.';
      } else {
        status = 'missing';
        evidence = 'Response is too sparse to satisfy primary intent.';
        correction = 'Address the primary question thoroughly.';
      }
    }

    return {
      id: req.id,
      description: req.description,
      isMandatory: req.isMandatory,
      status,
      evidence,
      severity: req.severity,
      rationale: req.rationale,
      recommendedCorrection: correction
    };
  });

  const total = results.length;
  const satisfiedCount = results.filter(r => r.status === 'satisfied').length;
  const coveragePercent = total > 0 ? Math.round((satisfiedCount / total) * 100) : 100;

  return {
    results,
    coveragePercent,
    satisfiedCount,
    totalCount: total
  };
}
