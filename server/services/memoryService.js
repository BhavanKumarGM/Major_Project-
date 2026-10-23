/**
 * Provider-Neutral Shared Memory & Branching Service for AI Hive Mind
 * Manages multi-turn conversation trees, active branches, and cross-model context.
 */

import { v4 as uuidv4 } from 'uuid';

class MemoryService {
  constructor() {
    this.conversations = new Map(); // id -> Conversation object
    this.analytics = {
      totalRequests: 0,
      modelUsage: {},
      averageLatency: {},
      criticWins: {},
      userSelections: {},
      // Extended evaluation telemetry
      evaluationsCompleted: 0,
      evaluationsDegraded: 0,
      criticalFailuresDetected: 0,
      totalRequirementCoverageSum: 0,
      totalRequirementCoverageCount: 0,
      revisionsAttempted: 0,
      revisionsImproved: 0,
      revisionsRegressed: 0,
      userAgreementsWithCritic: 0,
      totalUserBranchDecisions: 0
    };
  }

  createConversation(initialTitle = 'New Hive Mind Chat') {
    const id = uuidv4();
    const conv = {
      id,
      title: initialTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      turns: [] // Array of Turn objects
    };
    this.conversations.set(id, conv);
    return conv;
  }

  getConversation(id) {
    return this.conversations.get(id) || null;
  }

  listConversations() {
    return Array.from(this.conversations.values())
      .map(c => ({
        id: c.id,
        title: c.title,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        turnCount: c.turns.length,
        lastPrompt: c.turns[c.turns.length - 1]?.userPrompt || ''
      }))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  updateTitle(id, newTitle) {
    const conv = this.conversations.get(id);
    if (conv) {
      conv.title = newTitle;
      conv.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  deleteConversation(id) {
    return this.conversations.delete(id);
  }

  /**
   * Appends a turn with multi-model candidate responses, prompt analysis, and critic evaluation
   */
  addTurn(conversationId, {
    userPrompt,
    refinedPrompt,
    analysis,
    breakdown,
    recommendations,
    responses, // Array of response objects from parallel models
    criticEvaluation,
    selectedModelId // Default or chosen response
  }) {
    let conv = this.conversations.get(conversationId);
    if (!conv) {
      conv = this.createConversation(userPrompt.substring(0, 35) + '...');
    }

    // Auto-update title on first turn
    if (conv.turns.length === 0 && userPrompt) {
      conv.title = userPrompt.length > 40 ? userPrompt.substring(0, 37) + '...' : userPrompt;
    }

    const defaultSelectedId = selectedModelId || responses[0]?.modelId || null;

    const turn = {
      turnId: uuidv4(),
      timestamp: new Date().toISOString(),
      userPrompt,
      refinedPrompt,
      analysis,
      breakdown,
      recommendations,
      responses,
      criticEvaluation,
      selectedModelId: defaultSelectedId,
      synthesis: null
    };

    conv.turns.push(turn);
    conv.updatedAt = new Date().toISOString();

    // Track analytics
    this.recordAnalytics(turn);

    return turn;
  }

  /**
   * Switch the active branch/model response for a specific turn
   */
  selectBranch(conversationId, turnId, selectedModelId) {
    const conv = this.conversations.get(conversationId);
    if (!conv) return null;

    const turn = conv.turns.find(t => t.turnId === turnId);
    if (turn) {
      turn.selectedModelId = selectedModelId;
      conv.updatedAt = new Date().toISOString();
      
      // Update analytics
      this.analytics.userSelections[selectedModelId] = (this.analytics.userSelections[selectedModelId] || 0) + 1;
      
      // Track agreement between user choice and evaluator recommendation
      if (turn.criticEvaluation?.winner?.modelId) {
        this.analytics.totalUserBranchDecisions += 1;
        if (turn.criticEvaluation.winner.modelId === selectedModelId) {
          this.analytics.userAgreementsWithCritic += 1;
        }
      }

      return turn;
    }
    return null;
  }

  /**
   * Add a synthesized answer to a turn and make it the active branch
   */
  setSynthesis(conversationId, turnId, synthesisResponse) {
    const conv = this.conversations.get(conversationId);
    if (!conv) return null;

    const turn = conv.turns.find(t => t.turnId === turnId);
    if (turn) {
      turn.synthesis = synthesisResponse;
      turn.selectedModelId = 'synthesis';
      conv.updatedAt = new Date().toISOString();
      return turn;
    }
    return null;
  }

  /**
   * Retrieves clean provider-neutral message history along the active branches
   */
  getActiveHistoryContext(conversationId) {
    const conv = this.conversations.get(conversationId);
    if (!conv || !conv.turns) return [];

    const context = [];
    for (const turn of conv.turns) {
      context.push({ role: 'user', content: turn.refinedPrompt || turn.userPrompt });
      
      let chosenText = '';
      if (turn.selectedModelId === 'synthesis' && turn.synthesis) {
        chosenText = turn.synthesis.text;
      } else {
        const resp = turn.responses.find(r => r.modelId === turn.selectedModelId) || turn.responses[0];
        chosenText = resp ? resp.text : '';
      }

      if (chosenText) {
        context.push({ role: 'assistant', content: chosenText });
      }
    }
    return context;
  }

  recordAnalytics(turn) {
    this.analytics.totalRequests += 1;
    (turn.responses || []).forEach(r => {
      this.analytics.modelUsage[r.modelId] = (this.analytics.modelUsage[r.modelId] || 0) + 1;
      
      // Update latency average
      if (r.latency > 0) {
        const current = this.analytics.averageLatency[r.modelId] || { sum: 0, count: 0 };
        current.sum += r.latency;
        current.count += 1;
        this.analytics.averageLatency[r.modelId] = current;
      }
    });

    if (turn.criticEvaluation?.winner?.modelId) {
      const winnerId = turn.criticEvaluation.winner.modelId;
      this.analytics.criticWins[winnerId] = (this.analytics.criticWins[winnerId] || 0) + 1;
    }

    if (turn.selectedModelId) {
      this.analytics.userSelections[turn.selectedModelId] = (this.analytics.userSelections[turn.selectedModelId] || 0) + 1;
    }

    // Extended evaluation analytics
    if (turn.criticEvaluation) {
      const evalData = turn.criticEvaluation;
      this.analytics.evaluationsCompleted += 1;

      if (evalData.evaluationStatus === 'degraded') {
        this.analytics.evaluationsDegraded += 1;
      }

      if (typeof evalData.criticalFailures === 'number') {
        this.analytics.criticalFailuresDetected += evalData.criticalFailures;
      }

      if (evalData.requirementCoverage?.coveragePercent != null) {
        this.analytics.totalRequirementCoverageSum += evalData.requirementCoverage.coveragePercent;
        this.analytics.totalRequirementCoverageCount += 1;
      }

      if (evalData.revisionsAttempted) {
        this.analytics.revisionsAttempted += evalData.revisionsAttempted;
      }

      if (Array.isArray(evalData.revisionHistory)) {
        evalData.revisionHistory.forEach(rev => {
          if (rev.improved) this.analytics.revisionsImproved += 1;
          else if (rev.scoreDelta < 0) this.analytics.revisionsRegressed += 1;
        });
      }
    }
  }

  getAnalytics() {
    const avgLatency = {};
    for (const [id, data] of Object.entries(this.analytics.averageLatency)) {
      avgLatency[id] = Math.round(data.sum / data.count);
    }

    const avgReqCoverage = this.analytics.totalRequirementCoverageCount > 0
      ? Math.round(this.analytics.totalRequirementCoverageSum / this.analytics.totalRequirementCoverageCount)
      : 0;

    const agreementRate = this.analytics.totalUserBranchDecisions > 0
      ? Math.round((this.analytics.userAgreementsWithCritic / this.analytics.totalUserBranchDecisions) * 100)
      : null;

    return {
      totalRequests: this.analytics.totalRequests,
      modelUsage: this.analytics.modelUsage,
      averageLatency: avgLatency,
      criticWins: this.analytics.criticWins,
      userSelections: this.analytics.userSelections,
      evaluationMetrics: {
        evaluationsCompleted: this.analytics.evaluationsCompleted,
        evaluationsDegraded: this.analytics.evaluationsDegraded,
        criticalFailuresDetected: this.analytics.criticalFailuresDetected,
        averageRequirementCoverage: avgReqCoverage,
        revisionsAttempted: this.analytics.revisionsAttempted,
        revisionsImproved: this.analytics.revisionsImproved,
        revisionsRegressed: this.analytics.revisionsRegressed,
        userAgreementRate: agreementRate,
        isAgreementMeasured: this.analytics.totalUserBranchDecisions > 0
      }
    };
  }
}

export const memoryService = new MemoryService();
