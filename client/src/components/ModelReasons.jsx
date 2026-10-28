import React, { useEffect, useState } from 'react';
import { Info, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const SHOW_KEY = 'hiveShowModelReasons';
const CAPABILITY_LABELS = { coding: 'coding', reasoning: 'reasoning', creative: 'creative writing', summarization: 'summaries', general: 'general questions', speed: 'speed' };

function readShowPref() {
  try { return localStorage.getItem(SHOW_KEY) !== 'false'; } catch { return true; }
}

/**
 * Why a model is (or is not) a good pick: its rank and score for the analysed prompt when there is one,
 * otherwise its strongest configured capabilities. Also warns when the model cannot answer live.
 */
export function explainModel(model, { recommendations = [], category = null, availability = {}, selectedIds = [] } = {}) {
  const available = availability[model.id];
  const rec = recommendations.find(r => r.id === model.id);
  const warnings = [];

  if (available === false) {
    warnings.push(model.id === 'ollama-local'
      ? 'Needs Ollama running on this computer.'
      : `No ${model.provider} API key, so it cannot answer live. Add one in Settings.`);
  }

  if (rec) {
    const byScore = [...recommendations].sort((a, b) => b.recommendationScore - a.recommendationScore);
    const rank = byScore.findIndex(r => r.id === model.id) + 1;
    // A better-scoring model that could answer but is not selected
    const better = byScore.find(r => r.recommendationScore > rec.recommendationScore && r.isAvailable && !selectedIds.includes(r.id));
    if (better) warnings.push(`${better.name} scores higher for this task (${better.recommendationScore}).`);
    return {
      headline: `#${rank} of ${byScore.length} for ${category || 'this prompt'} · score ${rec.recommendationScore}`,
      reason: rec.recommendationRationale,
      warnings,
      rank
    };
  }

  // No prompt analysed yet: describe what the model is configured to be good at
  const strongest = Object.entries(model.capabilities || {})
    .filter(([k]) => k !== 'speed')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([k, v]) => `${CAPABILITY_LABELS[k] || k} ${v}`);
  return {
    headline: strongest.length ? `Strongest at ${strongest.join(' and ')}` : model.provider,
    reason: model.description || '',
    warnings,
    rank: null
  };
}

// One-line version for chip tooltips
export function shortModelReason(model, ctx) {
  const r = explainModel(model, ctx);
  return [`${model.name}: ${r.headline}`, ...r.warnings].join(' — ');
}

/**
 * Shown with a sent message: why the model(s) that answered it were used, from the recommendations
 * saved on the turn (Multi AI) or the Decision Model's choice (Single AI).
 */
export default function TurnModelReasons({ turn, models = [] }) {
  const [show, setShow] = useState(readShowPref);
  useEffect(() => {
    try { localStorage.setItem(SHOW_KEY, String(show)); } catch { /* storage blocked: preference lasts this visit */ }
  }, [show]);

  const responses = (turn.responses || []).filter(r => r.modelId && r.modelId !== 'synthesis');
  if (responses.length === 0) return null;

  const category = turn.analysis?.primaryCategory || null;
  const recommendations = turn.recommendations?.models || [];
  const usedIds = responses.map(r => r.modelId);
  const availability = Object.fromEntries(recommendations.map(r => [r.id, r.isAvailable]));
  const modelFor = r => models.find(m => m.id === r.modelId) ||
    { id: r.modelId, name: r.modelName || r.modelId, provider: r.provider, avatar: r.avatar };

  let intro = null;
  let rows;
  const decision = turn.decision;
  if (turn.executionMode === 'single' && decision?.selectedModelId) {
    intro = decision.selectionMethod === 'manual'
      ? `You chose ${decision.selectedModelName}.`
      : `The Decision Model picked ${decision.selectedModelName}${decision.suitabilityScore != null ? ` (score ${decision.suitabilityScore})` : ''}.`;
    rows = [{ model: modelFor(responses[0]), headline: category ? `for ${category}` : null, reason: decision.reason, warnings: [] }];
  } else {
    rows = responses.map(r => {
      const model = modelFor(r);
      return { model, ...explainModel(model, { recommendations, category, availability, selectedIds: usedIds }) };
    });
  }

  return (
    <div className="model-reasons">
      <button className="model-reasons-toggle" onClick={() => setShow(!show)} aria-expanded={show}>
        <Info size={13} aria-hidden="true" />
        <span>{rows.length > 1 ? `Why these models (${rows.length})` : 'Why this model'}</span>
        {show ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {show && (
        <div className="model-reasons-list">
          {intro && <p className="model-reasons-intro">{intro}</p>}
          {rows.map(({ model, headline, reason, warnings, rank }) => (
            <div key={model.id} className="model-reason-row">
              <div className="model-reason-head">
                <span className="model-reason-name">{model.avatar} {model.name}</span>
                {headline && <span className={`model-reason-badge ${rank === 1 ? 'is-top' : ''}`}>{headline}</span>}
              </div>
              {reason && <p className="model-reason-text">{reason}</p>}
              {warnings.map(w => (
                <p key={w} className="model-reason-warning"><AlertTriangle size={12} aria-hidden="true" /> {w}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .model-reasons {
          margin: 0.6rem 0;
          font-size: 0.78rem;
        }
        .model-reasons-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font: inherit;
          font-weight: 600;
          cursor: pointer;
          padding: 0.15rem 0;
        }
        .model-reasons-toggle:hover { color: var(--text-primary); }
        .model-reasons-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.35rem;
        }
        .model-reasons-intro { color: var(--text-secondary); }
        .model-reason-row {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.45rem 0.65rem;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.03);
        }
        .model-reason-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .model-reason-name { font-weight: 600; color: var(--text-primary); }
        .model-reason-badge {
          font-size: 0.72rem;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          padding: 0.05rem 0.5rem;
        }
        .model-reason-badge.is-top {
          color: var(--tint-emerald, #6ee7b7);
          border-color: rgba(16, 185, 129, 0.4);
        }
        .model-reason-text { color: var(--text-secondary); margin-top: 0.2rem; line-height: 1.4; }
        .model-reason-warning {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--tint-amber, #fcd34d);
          margin-top: 0.2rem;
        }
      `}</style>
    </div>
  );
}
