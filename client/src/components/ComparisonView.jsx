import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Scale, 
  Check, 
  Copy, 
  Sparkles, 
  Zap, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

export default function ComparisonView({
  turnData,
  onSelectBranch,
  onSynthesize,
  isSynthesizing,
  activeSelectedModelId
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [showFullCritic, setShowFullCritic] = useState(true);

  if (!turnData || !turnData.responses || turnData.responses.length === 0) {
    return null;
  }

  const responses = turnData.responses;
  const critic = turnData.criticEvaluation;
  const isMultiple = responses.length > 1;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBranchSelection = (modelId) => {
    // Trigger confetti micro-celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']
      });
    } catch (e) {}

    onSelectBranch(modelId);
  };

  return (
    <div className="comparison-arena-wrap">
      {/* Critic AI Evaluation Banner / Scorecard (If Multiple Models) */}
      {isMultiple && critic && (
        <div className="critic-evaluation-panel glass-panel">
          <div className="critic-header" onClick={() => setShowFullCritic(!showFullCritic)}>
            <div className="critic-title-row">
              <div className="critic-badge">
                <Scale size={16} className="text-purple" />
                <span>Critic AI Evaluation</span>
              </div>
              {critic.winner && (
                <span className="critic-winner-tag">
                  <Award size={14} className="text-amber" />
                  Critic Pick: <strong>{critic.winner.modelName}</strong> ({critic.winner.score}/100)
                </span>
              )}
            </div>
            <button className="btn-icon">
              {showFullCritic ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showFullCritic && (
            <div className="critic-body">
              {/* Recommendation Reason */}
              {critic.recommendationReason && (
                <div className="critic-rationale-box">
                  <strong>💡 Evaluator Verdict:</strong> {critic.recommendationReason}
                </div>
              )}

              {/* Compact Dimension Score Table */}
              <div className="score-table-wrap">
                <table className="score-table">
                  <thead>
                    <tr>
                      <th>Candidate Model</th>
                      <th>Correctness (35%)</th>
                      <th>Relevance (20%)</th>
                      <th>Completeness (20%)</th>
                      <th>Clarity (15%)</th>
                      <th>Instruction Following (10%)</th>
                      <th>Overall Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {critic.evaluations?.map((ev) => {
                      const isWinner = ev.modelId === critic.winner?.modelId;
                      return (
                        <tr key={ev.modelId} className={isWinner ? 'winner-row' : ''}>
                          <td className="model-cell">
                            <span className="ev-avatar">{ev.avatar}</span>
                            <strong>{ev.modelName}</strong>
                            {isWinner && <span className="winner-pill">⭐ Recommended</span>}
                          </td>
                          <td><span className="score-cell">{ev.scores.correctness}</span></td>
                          <td><span className="score-cell">{ev.scores.relevance}</span></td>
                          <td><span className="score-cell">{ev.scores.completeness}</span></td>
                          <td><span className="score-cell">{ev.scores.clarity}</span></td>
                          <td><span className="score-cell">{ev.scores.instructionFollowing}</span></td>
                          <td>
                            <span className={`score-badge ${isWinner ? 'high-score' : ''}`}>
                              {ev.scores.overall}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Strengths & Weaknesses Comparison Grid */}
              <div className="critique-details-grid">
                {critic.evaluations?.map((ev) => (
                  <div key={ev.modelId} className="critique-card glass-card">
                    <div className="critique-card-title">
                      <span>{ev.avatar} {ev.modelName} Critique</span>
                    </div>
                    <div className="critique-points">
                      <div className="strengths-col">
                        <span className="col-label text-emerald">Key Strengths</span>
                        <ul>
                          {ev.strengths?.map((s, idx) => (
                            <li key={idx}><CheckCircle2 size={12} className="text-emerald" /> {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="weaknesses-col">
                        <span className="col-label text-amber">Observations</span>
                        <ul>
                          {ev.weaknesses?.map((w, idx) => (
                            <li key={idx}><AlertCircle size={12} className="text-amber" /> {w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="critic-disclaimer">
                ℹ️ {critic.disclaimer} You retain full authority to select whichever response fits your workflow.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Synthesis Banner (Optional consensus generation) */}
      {isMultiple && onSynthesize && (
        <div className="synthesis-action-bar">
          <div className="synthesis-text">
            <Sparkles size={16} className="text-purple" />
            <span>Want the best of all models combined into one consolidated answer?</span>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={onSynthesize}
            disabled={isSynthesizing}
          >
            {isSynthesizing ? <Zap size={14} className="animate-spin" /> : <BrainCircuit size={14} />}
            <span>{isSynthesizing ? 'Synthesizing Answers...' : 'Create Best Combined Answer'}</span>
          </button>
        </div>
      )}

      {/* Synthesis Active Display (If synthesized) */}
      {turnData.synthesis && (
        <div className="synthesis-response-card glass-panel">
          <div className="response-card-header">
            <div className="model-id-badge">
              <span className="avatar">🔮</span>
              <div>
                <div className="model-name">Hive Mind Synthesis AI</div>
                <div className="model-sub">Consensus from {turnData.synthesis.sources?.map(s => s.name).join(' & ')}</div>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-icon" onClick={() => handleCopy('synthesis', turnData.synthesis.text)}>
                {copiedId === 'synthesis' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              </button>
              <button 
                className={`btn btn-sm ${activeSelectedModelId === 'synthesis' ? 'btn-emerald' : 'btn-secondary'}`}
                onClick={() => handleBranchSelection('synthesis')}
              >
                {activeSelectedModelId === 'synthesis' ? <Check size={14} /> : null}
                <span>{activeSelectedModelId === 'synthesis' ? 'Active Continuation Branch' : 'Use Synthesized Branch'}</span>
              </button>
            </div>
          </div>
          <div className="response-body markdown-body">
            <pre style={{ whiteSpace: 'pre-wrap' }}>{turnData.synthesis.text}</pre>
          </div>
        </div>
      )}

      {/* Side-by-Side Model Response Columns */}
      <div className={`response-columns-container ${responses.length > 1 ? 'multi-col' : 'single-col'}`}>
        {responses.map((resp, index) => {
          const isSelectedBranch = activeSelectedModelId === resp.modelId;
          const isCriticPick = critic?.winner?.modelId === resp.modelId;

          return (
            <div 
              key={resp.modelId || index} 
              className={`response-col-card glass-panel ${isSelectedBranch ? 'selected-branch-card' : ''}`}
            >
              {/* Column Header */}
              <div className="response-card-header">
                <div className="model-id-badge">
                  <span className="avatar">{resp.avatar || '🤖'}</span>
                  <div>
                    <div className="model-name-wrap">
                      <span className="model-name">{resp.modelName}</span>
                      {isCriticPick && <span className="badge badge-amber badge-xs">Critic Top Pick</span>}
                    </div>
                    <div className="telemetry-tags">
                      <span className="telemetry-tag"><Cpu size={10} /> {resp.provider}</span>
                      <span className="telemetry-tag"><Clock size={10} /> {resp.latency}ms</span>
                      {resp.tokenUsage?.totalTokens > 0 && (
                        <span className="telemetry-tag">{resp.tokenUsage.totalTokens} tokens</span>
                      )}
                      {resp.isLive && (
                        <span className="badge badge-emerald badge-xs">Live API</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="header-actions">
                  <button 
                    className="btn-icon" 
                    onClick={() => handleCopy(resp.modelId, resp.text)}
                    title="Copy Answer"
                  >
                    {copiedId === resp.modelId ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  </button>
                  <button 
                    className={`btn btn-sm ${isSelectedBranch ? 'btn-emerald' : 'btn-secondary'}`}
                    onClick={() => handleBranchSelection(resp.modelId)}
                  >
                    {isSelectedBranch ? <Check size={14} /> : null}
                    <span>{isSelectedBranch ? 'Active Branch' : 'Use this response'}</span>
                  </button>
                </div>
              </div>

              {/* Response Content */}
              <div className="response-body markdown-body">
                <pre style={{ whiteSpace: 'pre-wrap', background: 'transparent !important' }}>
                  {resp.text}
                </pre>
              </div>

              {/* Footer Branch CTA */}
              <div className="card-footer-branch">
                <button 
                  className={`btn btn-sm w-full ${isSelectedBranch ? 'btn-emerald' : 'btn-secondary'}`}
                  onClick={() => handleBranchSelection(resp.modelId)}
                >
                  {isSelectedBranch ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Currently Active Branch for Follow-ups</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare size={14} />
                      <span>Select Response to Continue Conversation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .comparison-arena-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .critic-evaluation-panel {
          border: 1px solid rgba(168, 85, 247, 0.3);
          background: rgba(22, 18, 38, 0.85);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .critic-header {
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid rgba(168, 85, 247, 0.15);
          background: rgba(168, 85, 247, 0.06);
        }
        .critic-title-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .critic-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          color: #d8b4fe;
        }
        .text-purple { color: #c084fc; }
        .text-amber { color: #fbbf24; }
        .critic-winner-tag {
          font-size: 0.8rem;
          color: #fef08a;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(245, 158, 11, 0.15);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .critic-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .critic-rationale-box {
          font-size: 0.85rem;
          color: #f1f5f9;
          background: rgba(255, 255, 255, 0.04);
          border-left: 3px solid var(--accent-purple);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          line-height: 1.5;
        }
        .score-table-wrap {
          overflow-x: auto;
        }
        .score-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8rem;
          text-align: left;
        }
        .score-table th {
          padding: 0.6rem 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
        }
        .score-table td {
          padding: 0.65rem 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: middle;
        }
        .model-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .winner-row {
          background: rgba(168, 85, 247, 0.08);
        }
        .winner-pill {
          font-size: 0.65rem;
          font-weight: 700;
          color: #fef08a;
          background: rgba(245, 158, 11, 0.2);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .score-cell {
          font-family: var(--font-mono);
          color: #cbd5e1;
        }
        .score-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .score-badge.high-score {
          background: rgba(16, 185, 129, 0.2);
          color: #6ee7b7;
          border: 1px solid rgba(16, 185, 129, 0.4);
        }
        .critique-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        .critique-card {
          padding: 0.85rem 1rem;
        }
        .critique-card-title {
          font-size: 0.825rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: #fff;
        }
        .critique-points {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .col-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }
        .critique-points ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .critique-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
        }
        .critic-disclaimer {
          font-size: 0.72rem;
          color: var(--text-dim);
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.65rem;
        }
        .synthesis-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px dashed rgba(168, 85, 247, 0.35);
          border-radius: var(--radius-md);
        }
        .synthesis-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #e9d5ff;
        }
        .synthesis-response-card {
          border: 1px solid rgba(168, 85, 247, 0.4);
          background: rgba(24, 18, 42, 0.9);
          padding: 1.25rem;
        }
        .response-columns-container {
          display: grid;
          gap: 1.25rem;
        }
        .multi-col {
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
        }
        .single-col {
          grid-template-columns: 1fr;
        }
        .response-col-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          position: relative;
          transition: all 0.25s ease;
        }
        .selected-branch-card {
          border-color: var(--accent-emerald);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.2);
          background: rgba(16, 32, 28, 0.75);
        }
        .response-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1rem;
        }
        .model-id-badge {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .model-id-badge .avatar {
          font-size: 1.4rem;
        }
        .model-name-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .model-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .model-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .telemetry-tags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.2rem;
          flex-wrap: wrap;
        }
        .telemetry-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }
        .badge-xs {
          font-size: 0.65rem;
          padding: 0.1rem 0.45rem;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .response-body {
          flex: 1;
          font-size: 0.875rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .card-footer-branch {
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }
        .w-full { width: 100%; }
        @media (max-width: 800px) {
          .multi-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
