/**
 * AI HIVE MIND - API Client Service
 */

const BASE_URL = '/api';

async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  // Models & Settings
  async getModels() {
    const res = await fetch(`${BASE_URL}/models`);
    return handleResponse(res);
  },

  async updateModelSettings(models, weights) {
    const res = await fetch(`${BASE_URL}/models/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ models, weights })
    });
    return handleResponse(res);
  },

  async testModelConnection(modelId) {
    const res = await fetch(`${BASE_URL}/models/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId })
    });
    return handleResponse(res);
  },

  async getKeyStatus() {
    const res = await fetch(`${BASE_URL}/settings/keys/status`);
    return handleResponse(res);
  },

  async updateKeys(keys) {
    const res = await fetch(`${BASE_URL}/settings/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keys)
    });
    return handleResponse(res);
  },

  // Pipeline Steps
  async analyzePrompt(prompt) {
    const res = await fetch(`${BASE_URL}/analyze-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return handleResponse(res);
  },

  async refinePrompt(prompt, analysis) {
    const res = await fetch(`${BASE_URL}/refine-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, analysis })
    });
    return handleResponse(res);
  },

  async recommendModels(prompt, analysis) {
    const res = await fetch(`${BASE_URL}/recommend-models`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, analysis })
    });
    return handleResponse(res);
  },

  async preflightPrompt(prompt) {
    const res = await fetch(`${BASE_URL}/preflight-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return handleResponse(res);
  },

  // Generation & Critic
  async generateResponses({ prompt, modelIds, conversationId, documentContext }) {
    const res = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, modelIds, conversationId, documentContext })
    });
    return handleResponse(res);
  },

  async criticEvaluate({ originalPrompt, refinedPrompt, responses, weights }) {
    const res = await fetch(`${BASE_URL}/critic-evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalPrompt, refinedPrompt, responses, weights })
    });
    return handleResponse(res);
  },

  async synthesize({ originalPrompt, refinedPrompt, responses, criticEvaluation }) {
    const res = await fetch(`${BASE_URL}/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalPrompt, refinedPrompt, responses, criticEvaluation })
    });
    return handleResponse(res);
  },

  // Documents
  async uploadDocument(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    return handleResponse(res);
  },

  // Conversations & History
  async getConversations() {
    const res = await fetch(`${BASE_URL}/conversations`);
    return handleResponse(res);
  },

  async createConversation(title) {
    const res = await fetch(`${BASE_URL}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    return handleResponse(res);
  },

  async getConversation(id) {
    const res = await fetch(`${BASE_URL}/conversations/${id}`);
    return handleResponse(res);
  },

  async saveTurn(conversationId, turnData) {
    const res = await fetch(`${BASE_URL}/conversations/${conversationId}/turn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turnData)
    });
    return handleResponse(res);
  },

  async selectBranch(conversationId, turnId, selectedModelId) {
    const res = await fetch(`${BASE_URL}/conversations/${conversationId}/branch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turnId, selectedModelId })
    });
    return handleResponse(res);
  },

  async saveSynthesis(conversationId, turnId, synthesis) {
    const res = await fetch(`${BASE_URL}/conversations/${conversationId}/synthesis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turnId, synthesis })
    });
    return handleResponse(res);
  },

  async updateConversationTitle(id, title) {
    const res = await fetch(`${BASE_URL}/conversations/${id}/title`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    return handleResponse(res);
  },

  async deleteConversation(id) {
    const res = await fetch(`${BASE_URL}/conversations/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Stats
  async getStats() {
    const res = await fetch(`${BASE_URL}/stats`);
    return handleResponse(res);
  }
};
