import React, { useState } from 'react';
import {
  Compass,
  Loader2,
  CheckCircle2,
  Circle,
  AlertTriangle,
  RotateCcw,
  Layers,
  Settings,
  PlayCircle
} from 'lucide-react';

// Single AI progress: the last three steps run inside one server request, so they finish together
const RUN_STEPS = [
  { id: 'analyze', label: 'Analyzing prompt' },
  { id: 'select', label: 'Selecting model' },
  { id: 'execute', label: 'Generating response, evaluating it and saving the turn', note: 'one server request' }
];

const NEXT_ACTION_LABELS = {
  accept: 'Accept: the answer passed the evaluation checks.',
  revise: 'Revise: the answer has issues worth fixing before relying on it.',
  reject: 'Reject: the answer failed critical checks; retry or choose another model.'
};

function DecisionSummary({ decision, generation }) {
  if (!decision) return null;
  return (
    <div className="decision-summary">
      <div className="decision-model-row">
        <span className="decision-model-name">{decision.selectedModelName || 'No model selected'}</span>
        {decision.provider && <span className="decision-provider">{decision.provider}</span>}
        <span className="badge badge-indigo badge-xs">
          {decision.selectionMethod === 'manual' ? 'Manual choice' : 'Decision Model'}
        </span>
        {generation?.isLive && <span className="badge badge-emerald badge-xs">Live API</span>}
        {(generation?.isSimulated || (!generation && decision.willSimulate)) && (
          <span className="badge badge-amber badge-xs">Simulated</span>
        )}
        {generation?.status === 'error' && <span className="badge badge-rose badge-xs">Error</span>}
        {decision.isAvailable === false && !decision.willSimulate && (
          <span className="badge badge-rose badge-xs">No credentials</span>
        )}
      </div>
      {decision.reason && <p className="decision-reason">{decision.reason}</p>}
      {decision.scoreDisclaimer && <p className="decision-note">{decision.scoreDisclaimer}</p>}
      {decision.clarificationNotes?.length > 0 && (
        <ul className="decision-notes-list" aria-label="Assumptions made about the prompt">
          {decision.clarificationNotes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      )}
    </div>
  );
}

/**
 * Live view of a Single AI run in progress, or of a run the Decision Model could not start.
 */
export function DecisionRunPanel({ run, onRunSimulation, onOpenSettings, onSwitchToMulti, onDismiss }) {
  if (!run) return null;
  const currentIndex = RUN_STEPS.findIndex(s => s.id === run.stage);
  const isBlocked = run.stage === 'blocked';
  const isFailed = run.stage === 'error';

  return (
    <div className="decision-panel glass-panel" role="region" aria-label="Single AI execution">
      <div className="decision-header">
        <Compass size={16} className="decision-icon" />
        <span>Single AI Mode</span>
      </div>

      {!isBlocked && !isFailed && (
        <ol className="decision-steps" role="status" aria-live="polite">
          {RUN_STEPS.map((step, i) => {
            const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'pending';
            return (
              <li key={step.id} className={`decision-step step-${state}`}>
                {state === 'done' && <CheckCircle2 size={14} aria-hidden="true" />}
                {state === 'active' && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                {state === 'pending' && <Circle size={14} aria-hidden="true" />}
                <span>{step.label}</span>
                {step.note && <span className="decision-step-note">({step.note})</span>}
                <span className="sr-only">{state}</span>
              </li>
            );
          })}
        </ol>
      )}

      <DecisionSummary decision={run.decision} />

      {(isBlocked || isFailed) && (
        <div className="decision-blocked" role="alert">
          <AlertTriangle size={15} aria-hidden="true" />
          <span>{run.error || run.decision?.reason}</span>
        </div>
      )}

      {(isBlocked || isFailed) && (
        <div className="decision-actions">
          {isBlocked && ['no_live_provider', 'provider_unavailable'].includes(run.decision?.status) && (
            <>
              <button className="btn btn-secondary btn-xs" onClick={onOpenSettings}>
                <Settings size={13} /> Configure API keys
              </button>
              <button className="btn btn-secondary btn-xs" onClick={onRunSimulation}
                title="Produces clearly labelled demo text, not a real model answer">
                <PlayCircle size={13} /> Run demo simulation
              </button>
            </>
          )}
          <button className="btn btn-secondary btn-xs" onClick={onSwitchToMulti}>
            <Layers size={13} /> Switch to Multi AI
          </button>
          <button className="btn btn-secondary btn-xs" onClick={onDismiss}>Dismiss</button>
        </div>
      )}
      <DecisionStyles />
    </div>
  );
}

/**
 * Decision details and follow-up actions shown above a saved Single AI turn.
 */
export function DecisionTurnPanel({ turn, onRetry, onRunWithModel, onSwitchToMulti, disabled }) {
  const [otherModelId, setOtherModelId] = useState('');
  const decision = turn.decision;
  const response = turn.responses?.[0];
  const critic = turn.criticEvaluation;
  const failed = response?.status === 'error';
  const others = (decision?.candidates || []).filter(c => c.modelId !== decision?.selectedModelId);

  const generation = response && {
    status: response.status,
    isLive: response.isLive,
    isSimulated: response.isSimulated
  };

  return (
    <div className="decision-panel glass-panel" role="region" aria-label="Decision Model result">
      <div className="decision-header">
        <Compass size={16} className="decision-icon" />
        <span>Single AI Mode · Decision</span>
      </div>

      <DecisionSummary decision={decision} generation={generation} />

      {failed && (
        <div className="decision-blocked" role="alert">
          <AlertTriangle size={15} aria-hidden="true" />
          <span>Generation failed{response.errorType ? ` (${response.errorType.replace('_', ' ')})` : ''}: {response.errorMessage}. The error was not evaluated and is left out of the conversation history.</span>
        </div>
      )}

      {critic && (
        <div className="decision-eval-summary">
          {critic.evaluations?.[0]?.scores && (
            <span className="decision-score">Critic score: <strong>{critic.evaluations[0].scores.overall}/100</strong></span>
          )}
          {critic.nextAction && <span className="decision-next">{NEXT_ACTION_LABELS[critic.nextAction] || critic.nextAction}</span>}
          {critic.evaluationStatus !== 'complete' && (
            <p className="decision-note">
              Scored by deterministic rule checks{critic.evaluationMetadata?.judge?.note ? ` (${critic.evaluationMetadata.judge.note})` : ''}.
              These checks assess structure and requirement coverage; they do not prove factual correctness.
            </p>
          )}
        </div>
      )}

      <div className="decision-actions">
        {failed && (
          <button className="btn btn-primary btn-xs" onClick={() => onRetry(turn)} disabled={disabled}>
            <RotateCcw size={13} /> Retry
          </button>
        )}
        {others.length > 0 && (
          <span className="decision-other">
            <label htmlFor={`other-model-${turn.turnId}`} className="sr-only">Choose another model</label>
            <select
              id={`other-model-${turn.turnId}`}
              className="decision-select"
              value={otherModelId}
              onChange={e => setOtherModelId(e.target.value)}
            >
              <option value="">Try another model…</option>
              {others.map(c => (
                <option key={c.modelId} value={c.modelId}>
                  {c.modelName}{c.isAvailable ? '' : ' (no credentials)'}
                </option>
              ))}
            </select>
            <button
              className="btn btn-secondary btn-xs"
              disabled={!otherModelId || disabled}
              onClick={() => onRunWithModel(turn, otherModelId)}
            >
              Run
            </button>
          </span>
        )}
        <button className="btn btn-secondary btn-xs" onClick={() => onSwitchToMulti(turn)}>
          <Layers size={13} /> Compare in Multi AI
        </button>
      </div>
      <DecisionStyles />
    </div>
  );
}

function DecisionStyles() {
  return (
    <style>{`
      .decision-panel {
        padding: 0.9rem 1.1rem;
        margin: 0.6rem 0;
        border: 1px solid rgba(99, 102, 241, 0.25);
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
      }
      .decision-header {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-secondary);
      }
      .decision-icon { color: var(--accent-primary); }
      .decision-steps {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        font-size: 0.82rem;
      }
      .decision-step { display: flex; align-items: center; gap: 0.45rem; color: var(--text-muted); }
      .decision-step.step-done { color: var(--accent-emerald); }
      .decision-step.step-active { color: var(--accent-cyan); }
      .decision-step-note { color: var(--text-dim); font-size: 0.74rem; }
      .decision-summary { display: flex; flex-direction: column; gap: 0.35rem; }
      .decision-model-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem; }
      .decision-model-name { font-weight: 700; color: var(--text-primary); }
      .decision-provider { font-size: 0.78rem; color: var(--text-secondary); }
      .decision-reason { margin: 0; font-size: 0.83rem; color: var(--text-secondary); line-height: 1.45; }
      .decision-note { margin: 0; font-size: 0.74rem; color: var(--text-muted); }
      .decision-notes-list { margin: 0; padding-left: 1.1rem; font-size: 0.76rem; color: var(--text-muted); }
      .decision-blocked {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        font-size: 0.82rem;
        color: var(--tint-rose, #fda4af);
        background: rgba(244, 63, 94, 0.08);
        border: 1px solid rgba(244, 63, 94, 0.25);
        border-radius: var(--radius-sm);
        padding: 0.55rem 0.7rem;
      }
      .decision-eval-summary { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: baseline; font-size: 0.83rem; color: var(--text-secondary); }
      .decision-score strong { color: var(--text-primary); }
      .decision-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
      .decision-other { display: inline-flex; gap: 0.35rem; align-items: center; }
      .decision-select {
        background: rgba(var(--shade-rgb, 0, 0, 0), 0.3);
        color: var(--text-primary);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-sm);
        font-size: 0.78rem;
        padding: 0.3rem 0.45rem;
      }
      .decision-panel .btn-xs { padding: 0.3rem 0.6rem; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 0.3rem; }
      .sr-only {
        position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
        overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
      }
    `}</style>
  );
}
