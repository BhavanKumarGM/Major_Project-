import React from 'react';
import { GitBranch, Check, Clock, Cpu, ArrowRight, CornerDownRight } from 'lucide-react';

export default function BranchViewer({ conversation, onSelectBranch }) {
  if (!conversation || !conversation.turns || conversation.turns.length === 0) {
    return (
      <div className="branch-viewer-empty glass-panel">
        <GitBranch size={32} className="text-dim" />
        <p>No active conversation turns yet. Send a prompt to start building the branch tree.</p>
      </div>
    );
  }

  return (
    <div className="branch-viewer-container glass-panel">
      <div className="branch-header">
        <div className="branch-title-wrap">
          <GitBranch size={18} className="text-emerald" />
          <h3>Provider-Neutral Shared Memory & Branch Tree</h3>
        </div>
        <span className="badge badge-indigo">{conversation.turns.length} Turn(s)</span>
      </div>

      <div className="turns-timeline">
        {conversation.turns.map((turn, turnIdx) => (
          <div key={turn.turnId} className="turn-branch-node">
            {/* Turn Prompt */}
            <div className="turn-prompt-badge">
              <span className="turn-num">Turn {turnIdx + 1}</span>
              <span className="turn-prompt-text">{turn.userPrompt}</span>
            </div>

            {/* Candidate Branches for this turn */}
            <div className="candidate-branches-row">
              <CornerDownRight size={16} className="branch-arrow text-muted" />
              <div className="branch-chips-list">
                {turn.responses?.map((resp) => {
                  const isActive = turn.selectedModelId === resp.modelId;
                  return (
                    <button
                      key={resp.modelId}
                      className={`branch-chip glass-card ${isActive ? 'active-branch' : ''}`}
                      onClick={() => onSelectBranch(turn.turnId, resp.modelId)}
                      title={`Click to activate ${resp.modelName} branch for downstream turns`}
                    >
                      <span className="chip-avatar">{resp.avatar}</span>
                      <span className="chip-name">{resp.modelName}</span>
                      {isActive ? (
                        <span className="active-tag"><Check size={12} /> Active</span>
                      ) : (
                        <span className="switch-tag">Switch</span>
                      )}
                    </button>
                  );
                })}

                {turn.synthesis && (
                  <button
                    className={`branch-chip glass-card ${turn.selectedModelId === 'synthesis' ? 'active-branch' : ''}`}
                    onClick={() => onSelectBranch(turn.turnId, 'synthesis')}
                  >
                    <span className="chip-avatar">🔮</span>
                    <span className="chip-name">Synthesized Consensus</span>
                    {turn.selectedModelId === 'synthesis' && (
                      <span className="active-tag"><Check size={12} /> Active</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .branch-viewer-container {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(13, 18, 28, 0.9);
        }
        .branch-viewer-empty {
          padding: 3rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
        }
        .branch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.25rem;
        }
        .branch-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .branch-title-wrap h3 {
          font-size: 1rem;
          font-weight: 700;
        }
        .text-emerald { color: var(--accent-emerald); }
        .text-dim { color: var(--text-dim); }
        .text-muted { color: var(--text-muted); }
        .turns-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
        }
        .turn-branch-node {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .turn-prompt-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .turn-num {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.15);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .turn-prompt-text {
          font-size: 0.85rem;
          color: #fff;
          font-weight: 500;
        }
        .candidate-branches-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 1.25rem;
        }
        .branch-arrow {
          flex-shrink: 0;
        }
        .branch-chips-list {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }
        .branch-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
        }
        .branch-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          transform: translateY(-1px);
        }
        .branch-chip.active-branch {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.5);
          color: #6ee7b7;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
        }
        .active-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-weight: 700;
          font-size: 0.7rem;
        }
        .switch-tag {
          font-size: 0.68rem;
          color: var(--text-dim);
        }
      `}</style>
    </div>
  );
}
