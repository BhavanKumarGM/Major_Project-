import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  FileSearch,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Info,
  RefreshCw
} from 'lucide-react';

export default function ComparisonView({
  turnData,
  onSelectBranch,
  onSynthesize,
  isSynthesizing,
  activeSelectedModelId,
  onCheckWithJudge,
  isCheckingWithJudge,
  judgeCheckError
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [showFullCritic, setShowFullCritic] = useState(true);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  // After the user picks a branch, only that answer is shown until they expand the rest
  const [showAllResponses, setShowAllResponses] = useState(false);

  useEffect(() => {
    setShowAllResponses(false);
  }, [activeSelectedModelId]);

  if (!turnData || !turnData.responses || turnData.responses.length === 0) {
    return null;
  }

  const responses = turnData.responses;
  const critic = turnData.criticEvaluation;
  const isMultiple = responses.length > 1;
  const isCollapsed = isMultiple && turnData.branchChosenByUser && !showAllResponses;
  const chosenIsSynthesis = activeSelectedModelId === 'synthesis' && !!turnData.synthesis;
  const visibleResponses = isCollapsed
    ? responses.filter(r => !chosenIsSynthesis && r.modelId === activeSelectedModelId)
    : responses;
  // Collapsed turns also limit the critic details to the chosen model (issues without a model stay)
  const focusOnChosen = isCollapsed && !chosenIsSynthesis;
  const visibleEvaluations = (critic?.evaluations || []).filter(ev => !focusOnChosen || ev.modelId === activeSelectedModelId);
  const visibleIssues = (critic?.issues || []).filter(iss => !focusOnChosen || !iss.modelId || iss.modelId === activeSelectedModelId);
  const chosenName = chosenIsSynthesis
    ? 'Hive Mind Synthesis'
    : responses.find(r => r.modelId === activeSelectedModelId)?.modelName;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBranchSelection = (modelId) => {
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
      {/* Chosen-branch focus bar */}
      {isMultiple && turnData.branchChosenByUser && (
        <div className="chosen-branch-bar">
          <span>
            {isCollapsed
              ? <>Showing your chosen answer{chosenName ? <> from <strong>{chosenName}</strong></> : null}. {responses.length - visibleResponses.length} other response(s) hidden.</>
              : <>Showing all {responses.length} responses.</>}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAllResponses(!showAllResponses)}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? `Show all ${responses.length} responses` : 'Show only chosen answer'}
          </button>
        </div>
      )}

      {/* Evidence-Based Critic AI Evaluation Scorecard */}
      {critic && (
        <div className="critic-evaluation-panel glass-panel">
          <div className="critic-header" onClick={() => setShowFullCritic(!showFullCritic)}>
            <div className="critic-title-row">
              <div className="critic-badge">
                <Scale size={16} className="text-purple" />
                <span>Critic AI Evaluation</span>
              </div>

              {/* Evaluation Mode Indicator */}
              {critic.evaluationStatus === 'complete' && (
                <span className="eval-status-tag tag-semantic" title="Independent semantic LLM judge executed successfully">
                  <ShieldCheck size={12} /> Semantic Evaluator Active
                </span>
              )}
              {critic.evaluationStatus === 'degraded' && (
                <span className="eval-status-tag tag-degraded" title="Operating in deterministic fallback mode">
                  <AlertTriangle size={12} /> Degraded Mode (Rule Baseline)
                </span>
              )}
              {critic.evaluationStatus === 'deterministic_only' && (
                <span className="eval-status-tag tag-deterministic" title="Deterministic validation rules active">
                  <ShieldCheck size={12} /> Deterministic Rules Mode
                </span>
              )}

              {/* Critical Failures Badge */}
              {critic.criticalFailures > 0 && (
                <span className="eval-status-tag tag-critical-fail">
                  <ShieldAlert size={12} /> {critic.criticalFailures} Critical Failure(s) Detected
                </span>
              )}

              {/* Requirement Coverage Badge */}
              {critic.requirementCoverage?.coveragePercent != null && (
                <span className="eval-status-tag tag-coverage">
                  <FileSearch size={12} /> {critic.requirementCoverage.coveragePercent}% Req Coverage
                </span>
              )}

              {critic.winner ? (
                <span className="critic-winner-tag">
                  <Award size={14} className="text-amber" />
                  Critic Pick: <strong>{critic.winner.modelName}</strong> ({critic.winner.score}/100)
                </span>
              ) : (
                <span className="critic-no-winner-tag">
                  <AlertCircle size={14} /> No Recommended Winner
                </span>
              )}
            </div>

            <button className="btn-icon" aria-label="Toggle critic details">
              {showFullCritic ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showFullCritic && (
            <div className="critic-body">
              {/* Evaluator Verdict Box */}
              {critic.recommendationReason && (
                <div className="critic-rationale-box">
                  <strong>💡 Evaluator Verdict:</strong> {critic.recommendationReason}
                </div>
              )}

              {/* Conflicts Detected Box (if any) */}
              {critic.conflictsDetected && critic.conflictsDetected.length > 0 && (
                <div className="critic-conflict-box">
                  <AlertTriangle size={15} className="text-amber" />
                  <div>
                    <strong>{critic.conflictsDetected.every(c => c.type === 'answer_disagreement') ? 'Answers Disagree:' : 'Conflict Detected:'}</strong>
                    {critic.conflictsDetected.map((c, i) => (
                      <div key={i} className="conflict-desc">{c.description}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rule checks cannot verify facts: let the user ask the LLM judge for this turn */}
              {onCheckWithJudge && critic.evaluationStatus !== 'complete' && responses.some(r => r.status !== 'error' && !r.isSimulated) && (
                <div className="judge-check-row">
                  <span>
                    {critic.conflictsDetected?.some(c => c.type === 'answer_disagreement')
                      ? 'The answers disagree. An LLM judge can check which one is right.'
                      : critic.evaluationStatus === 'degraded'
                        ? (critic.evaluationMetadata?.judge?.note || 'The LLM judge could not grade these answers.')
                        : 'Scored by rule checks only, which cannot verify facts.'}
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={onCheckWithJudge}
                    disabled={isCheckingWithJudge}
                    title={`Grades each answer with an LLM call (${responses.length} billable call${responses.length > 1 ? 's' : ''}, up to ${responses.length * 2} if a provider is busy).`}
                  >
                    {isCheckingWithJudge ? <RefreshCw size={13} className="animate-spin" /> : <ShieldCheck size={13} />}
                    <span>{isCheckingWithJudge ? 'Checking…' : 'Check facts with LLM judge'}</span>
                  </button>
                  {judgeCheckError && <div className="judge-check-error">Could not run the judge: {judgeCheckError}</div>}
                </div>
              )}

              {/* Dimension Score Table */}
              <div className="score-table-wrap">
                <table className="score-table">
                  <thead>
                    <tr>
                      <th>Candidate Model</th>
                      <th>Status & Eligibility</th>
                      <th>Correctness (35%)</th>
                      <th>Relevance (20%)</th>
                      <th>Completeness (20%)</th>
                      <th>Clarity (15%)</th>
                      <th>Instruction Following (10%)</th>
                      <th>Overall Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleEvaluations.map((ev) => {
                      const isWinner = ev.modelId === critic.winner?.modelId;
                      const hasCritical = ev.hasCriticalFailure || ev.isEligible === false;

                      return (
                        <tr key={ev.modelId} className={`${isWinner ? 'winner-row' : ''} ${hasCritical ? 'failed-row' : ''}`}>
                          <td className="model-cell">
                            <span className="ev-avatar">{ev.avatar}</span>
                            <strong>{ev.modelName}</strong>
                            {isWinner && <span className="winner-pill">⭐ Recommended</span>}
                          </td>
                          <td>
                            {hasCritical ? (
                              <span className="pill-badge pill-rejected">
                                <XCircle size={11} /> Critical Failure
                              </span>
                            ) : ev.status === 'needs_revision' ? (
                              <span className="pill-badge pill-revision">
                                <AlertTriangle size={11} /> Needs Revision
                              </span>
                            ) : (
                              <span className="pill-badge pill-accepted">
                                <CheckCircle size={11} /> Validated
                              </span>
                            )}
                          </td>
                          <td><span className="score-cell">{ev.scores.correctness}</span></td>
                          <td><span className="score-cell">{ev.scores.relevance}</span></td>
                          <td><span className="score-cell">{ev.scores.completeness}</span></td>
                          <td><span className="score-cell">{ev.scores.clarity}</span></td>
                          <td><span className="score-cell">{ev.scores.instructionFollowing}</span></td>
                          <td>
                            <span className={`score-badge ${isWinner ? 'high-score' : ''} ${hasCritical ? 'critical-fail-score' : ''}`}>
                              {ev.scores.overall}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Diagnostics & Coverage Toggle */}
              <div className="diagnostics-action-row">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => { e.stopPropagation(); setShowDiagnostics(!showDiagnostics); }}
                  id="toggle-evidence-diagnostics"
                >
                  <FileSearch size={14} />
                  <span>
                    {showDiagnostics ? 'Hide Evidence Diagnostics' : 'Inspect Evidence Diagnostics & Requirement Audit'}
                    {visibleIssues.length > 0 ? ` (${visibleIssues.length} findings)` : ''}
                  </span>
                  {showDiagnostics ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Collapsible Diagnostics & Requirement Matrix */}
              {showDiagnostics && (
                <div className="diagnostics-panel glass-panel">
                  {/* 1. Discrete Requirement Audit */}
                  <div className="diag-section">
                    <h4 className="diag-heading">
                      <FileSearch size={14} className="text-cyan" />
                      <span>Discrete Requirement Audit & Coverage</span>
                    </h4>
                    {critic.requirementCoverage?.results?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="diag-table">
                          <thead>
                            <tr>
                              <th>Requirement</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Evidence / Explanation</th>
                              <th>Correction Needed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {critic.requirementCoverage.results.map((r) => (
                              <tr key={r.id}>
                                <td><strong>{r.description}</strong></td>
                                <td>
                                  <span className={`type-tag ${r.isMandatory ? 'tag-mandatory' : 'tag-optional'}`}>
                                    {r.isMandatory ? 'Mandatory' : 'Optional'}
                                  </span>
                                </td>
                                <td>
                                  {r.status === 'satisfied' && (
                                    <span className="status-tag status-satisfied"><CheckCircle size={12} /> Satisfied</span>
                                  )}
                                  {r.status === 'partially_satisfied' && (
                                    <span className="status-tag status-partial"><AlertCircle size={12} /> Partial</span>
                                  )}
                                  {r.status === 'missing' && (
                                    <span className="status-tag status-missing"><XCircle size={12} /> Missing</span>
                                  )}
                                  {r.status === 'contradicted' && (
                                    <span className="status-tag status-contradicted"><XCircle size={12} /> Contradicted</span>
                                  )}
                                  {r.status === 'unverifiable' && (
                                    <span className="status-tag status-unverifiable"><HelpCircle size={12} /> Unverified</span>
                                  )}
                                </td>
                                <td className="evidence-cell">{r.evidence || '—'}</td>
                                <td className="correction-cell">{r.recommendedCorrection || 'None'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="empty-diag-note">Standard requirement heuristics applied.</p>
                    )}
                  </div>

                  {/* 2. Structured Failure Diagnostics */}
                  <div className="diag-section">
                    <h4 className="diag-heading">
                      <ShieldAlert size={14} className="text-amber" />
                      <span>Evidence-Backed Root Cause Diagnostics</span>
                    </h4>
                    {visibleIssues.length > 0 ? (
                      <div className="issues-grid">
                        {visibleIssues.map((iss) => (
                          <div key={iss.id} className={`issue-card ${iss.isCritical ? 'issue-critical' : ''}`}>
                            <div className="issue-header">
                              <span className={`issue-severity sev-${iss.severity}`}>{iss.severity.toUpperCase()}</span>
                              <span className="issue-category">{iss.category.replace(/_/g, ' ')}</span>
                              {iss.modelId && <span className="issue-model">Model: {iss.modelId}</span>}
                              <span className="issue-stage">Stage: {iss.likelySource.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="issue-desc">{iss.description}</div>
                            {iss.evidence && (
                              <div className="issue-evidence">
                                <strong>Evidence:</strong> <code>{iss.evidence}</code>
                              </div>
                            )}
                            {iss.recommendedCorrection && (
                              <div className="issue-correction">
                                <strong>Recommended Correction:</strong> {iss.recommendedCorrection}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-issues-box">
                        <CheckCircle size={16} className="text-emerald" />
                        <span>No critical failures, syntax errors, or negative constraint violations identified.</span>
                      </div>
                    )}
                  </div>

                  <div className="diag-disclaimer">
                    <Info size={13} />
                    <span>Findings marked <em>Unverified</em> indicate no trusted ground-truth reference was attached; they are not assumed false. Requirement extraction is automated and model-independent.</span>
                  </div>
                </div>
              )}

              {/* Strengths & Weaknesses Comparison Grid */}
              <div className="critique-details-grid">
                {visibleEvaluations.map((ev) => (
                  <div key={ev.modelId} className="critique-card glass-card">
                    <div className="critique-card-title">
                      <span>{ev.avatar} {ev.modelName} Critique</span>
                      {ev.isEligible === false && (
                        <span className="badge badge-rose badge-xs">Ineligible for Ranking</span>
                      )}
                    </div>
                    <div className="critique-points">
                      <div className="strengths-col">
                        <span className="col-label text-emerald">Verified Strengths</span>
                        <ul>
                          {ev.strengths?.map((s, idx) => (
                            <li key={idx}><CheckCircle2 size={12} className="text-emerald" /> {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="weaknesses-col">
                        <span className="col-label text-amber">Diagnostic Observations</span>
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
      {isMultiple && onSynthesize && !isCollapsed && (
        <div className="synthesis-action-bar">
          <div className="synthesis-text">
            <Sparkles size={16} className="text-purple" />
            <span>Want the best of all models combined into one consolidated answer?</span>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={onSynthesize}
            disabled={isSynthesizing}
            id="create-combined-answer-btn"
          >
            {isSynthesizing ? <Zap size={14} className="animate-spin" /> : <BrainCircuit size={14} />}
            <span>{isSynthesizing ? 'Synthesizing Answers...' : 'Create Best Combined Answer'}</span>
          </button>
        </div>
      )}

      {/* Synthesis Active Display (If synthesized) */}
      {turnData.synthesis && (!isCollapsed || chosenIsSynthesis) && (
        <div className="synthesis-response-card glass-panel">
          <div className="response-card-header">
            <div className="model-id-badge">
              <span className="avatar">🔮</span>
              <div>
                <div className="model-name">Hive Mind Synthesis AI</div>
                <div className="model-sub">Consensus from {turnData.synthesis.sources?.map(s => s.name).join(' & ')}</div>
                {turnData.synthesis.evaluation && (
                  <div className="synthesis-eval-pill">
                    <ShieldCheck size={12} className="text-emerald" />
                    <span>Verified Synthesis ({turnData.synthesis.evaluation.score}/100) — {turnData.synthesis.evaluation.coveragePercent}% Coverage</span>
                  </div>
                )}
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
      <div className={`response-columns-container ${visibleResponses.length > 1 ? 'multi-col' : 'single-col'}`}>
        {visibleResponses.map((resp, index) => {
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
                      {resp.isSimulated && (
                        <span className="badge badge-amber badge-xs" title="No API key configured for this provider; this is demo output, not a real model answer.">Simulated</span>
                      )}
                      {resp.status === 'error' && (
                        <span className="badge badge-rose badge-xs" title={resp.errorMessage}>Error</span>
                      )}
                      {resp.revisionAttempt && (
                        <span className="badge badge-indigo badge-xs">Revision v{resp.revisionAttempt}</span>
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
          background: rgba(var(--surface-rgb, 22, 18, 38), 0.85);
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
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .critic-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--tint-purple, #d8b4fe);
        }
        .eval-status-tag {
          font-size: 0.72rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .tag-semantic {
          background: rgba(16, 185, 129, 0.15);
          color: var(--tint-emerald, #6ee7b7);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .tag-degraded {
          background: rgba(245, 158, 11, 0.15);
          color: var(--tint-amber, #fde047);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .tag-deterministic {
          background: rgba(6, 182, 212, 0.15);
          color: var(--tint-cyan, #67e8f9);
          border: 1px solid rgba(6, 182, 212, 0.3);
        }
        .tag-critical-fail {
          background: rgba(244, 63, 94, 0.2);
          color: var(--tint-rose, #fda4af);
          border: 1px solid rgba(244, 63, 94, 0.4);
        }
        .tag-coverage {
          background: rgba(168, 85, 247, 0.15);
          color: var(--tint-purple, #e9d5ff);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        .text-purple { color: var(--tint-purple, #c084fc); }
        .text-amber { color: var(--tint-amber, #fbbf24); }
        .text-cyan { color: var(--tint-cyan, #22d3ee); }
        .text-emerald { color: var(--tint-emerald, #34d399); }
        .text-rose { color: var(--tint-rose, #fb7185); }
        .critic-winner-tag {
          font-size: 0.8rem;
          color: var(--tint-amber, #fef08a);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(245, 158, 11, 0.15);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .critic-no-winner-tag {
          font-size: 0.8rem;
          color: var(--tint-rose, #fda4af);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(244, 63, 94, 0.15);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(244, 63, 94, 0.3);
        }
        .critic-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .critic-rationale-box {
          font-size: 0.85rem;
          color: var(--text-strong, #f1f5f9);
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.04);
          border-left: 3px solid var(--accent-purple);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          line-height: 1.5;
        }
        .judge-check-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem 0.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          padding: 0.55rem 0.9rem;
          border: 1px dashed var(--border-light);
          border-radius: var(--radius-sm);
        }
        .judge-check-row > span { flex: 1; min-width: 200px; }
        .judge-check-error { flex-basis: 100%; color: var(--tint-rose, #fda4af); }
        .critic-conflict-box {
          font-size: 0.82rem;
          color: var(--tint-amber, #fef08a);
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 0.6rem 0.9rem;
          border-radius: var(--radius-sm);
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .conflict-desc {
          margin-top: 0.2rem;
          font-size: 0.78rem;
          color: var(--tint-amber, #fde68a);
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
          border-bottom: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.04);
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
        .failed-row {
          background: rgba(244, 63, 94, 0.05);
        }
        .pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .pill-accepted {
          background: rgba(16, 185, 129, 0.15);
          color: var(--tint-emerald, #6ee7b7);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .pill-revision {
          background: rgba(245, 158, 11, 0.15);
          color: var(--tint-amber, #fde047);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .pill-rejected {
          background: rgba(244, 63, 94, 0.2);
          color: var(--tint-rose, #fda4af);
          border: 1px solid rgba(244, 63, 94, 0.4);
        }
        .winner-pill {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--tint-amber, #fef08a);
          background: rgba(245, 158, 11, 0.2);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .score-cell {
          font-family: var(--font-mono);
          color: var(--text-body, #cbd5e1);
        }
        .score-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.08);
          color: var(--text-strong, #fff);
        }
        .score-badge.high-score {
          background: rgba(16, 185, 129, 0.2);
          color: var(--tint-emerald, #6ee7b7);
          border: 1px solid rgba(16, 185, 129, 0.4);
        }
        .score-badge.critical-fail-score {
          background: rgba(244, 63, 94, 0.2);
          color: var(--tint-rose, #fda4af);
          border: 1px solid rgba(244, 63, 94, 0.4);
        }
        .diagnostics-action-row {
          display: flex;
          justify-content: flex-start;
          margin-top: 0.25rem;
        }
        .diagnostics-panel {
          background: rgba(var(--surface-rgb, 15, 23, 42), 0.7);
          border: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.1);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .diag-heading {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-strong, #f1f5f9);
          margin-bottom: 0.6rem;
        }
        .diag-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.78rem;
        }
        .diag-table th {
          text-align: left;
          padding: 0.5rem;
          color: var(--text-muted);
          border-bottom: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.08);
        }
        .diag-table td {
          padding: 0.55rem;
          border-bottom: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.04);
          vertical-align: top;
        }
        .type-tag {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
        }
        .tag-mandatory { background: rgba(244, 63, 94, 0.2); color: var(--tint-rose, #fda4af); }
        .tag-optional { background: rgba(100, 116, 139, 0.2); color: var(--text-body, #cbd5e1); }
        .status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.12rem 0.4rem;
          border-radius: 4px;
        }
        .status-satisfied { background: rgba(16, 185, 129, 0.15); color: var(--tint-emerald, #6ee7b7); }
        .status-partial { background: rgba(245, 158, 11, 0.15); color: var(--tint-amber, #fde047); }
        .status-missing { background: rgba(244, 63, 94, 0.2); color: var(--tint-rose, #fda4af); }
        .status-contradicted { background: rgba(244, 63, 94, 0.25); color: #f43f5e; }
        .status-unverifiable { background: rgba(6, 182, 212, 0.15); color: var(--tint-cyan, #67e8f9); }
        .evidence-cell { color: var(--text-secondary, #94a3b8); font-family: var(--font-mono); font-size: 0.75rem; }
        .correction-cell { color: var(--tint-amber, #fef08a); font-size: 0.75rem; }
        .chosen-branch-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.6rem;
          padding: 0.55rem 0.9rem;
          margin-bottom: 0.75rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          background: rgba(16, 185, 129, 0.07);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
        }
        .chosen-branch-bar strong { color: var(--text-primary); }
        .issues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 0.75rem;
        }
        .issue-card {
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.03);
          border: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.08);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .issue-critical {
          border-color: rgba(244, 63, 94, 0.4);
          background: rgba(244, 63, 94, 0.05);
        }
        .issue-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          font-size: 0.68rem;
        }
        .issue-severity {
          font-weight: 800;
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
        }
        .sev-critical { background: #e11d48; color: #fff; }
        .sev-high { background: #ea580c; color: #fff; }
        .sev-medium { background: #d97706; color: #fff; }
        .sev-low { background: #0284c7; color: #fff; }
        .issue-category {
          color: var(--text-body, #cbd5e1);
          font-weight: 600;
          text-transform: capitalize;
        }
        .issue-model, .issue-stage {
          color: var(--text-secondary, #94a3b8);
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.05);
          padding: 0.05rem 0.3rem;
          border-radius: 3px;
        }
        .issue-desc { font-size: 0.8rem; color: var(--text-strong, #f1f5f9); font-weight: 500; }
        .issue-evidence { font-size: 0.75rem; color: var(--text-secondary, #94a3b8); }
        .issue-evidence code { background: rgba(var(--shade-rgb, 0,0,0),0.3); padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.72rem; }
        .issue-correction { font-size: 0.75rem; color: var(--tint-amber, #fef08a); }
        .no-issues-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--tint-emerald, #a7f3d0);
          padding: 0.5rem 0;
        }
        .diag-disclaimer {
          font-size: 0.72rem;
          color: var(--text-secondary, #94a3b8);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border-top: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.06);
          padding-top: 0.6rem;
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
          color: var(--text-strong, #fff);
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        }
        .critique-points li {
          font-size: 0.775rem;
          color: var(--text-body, #cbd5e1);
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          line-height: 1.4;
        }
        .critic-disclaimer {
          font-size: 0.75rem;
          color: var(--text-dim);
          border-top: 1px solid rgba(var(--overlay-rgb, 255, 255, 255), 0.06);
          padding-top: 0.75rem;
        }
        .synthesis-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px dashed rgba(168, 85, 247, 0.3);
          border-radius: var(--radius-md);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .synthesis-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--tint-purple, #f3e8ff);
          font-weight: 500;
        }
        .synthesis-response-card {
          border: 1px solid rgba(168, 85, 247, 0.4);
          background: rgba(var(--surface-rgb, 22, 16, 36), 0.85);
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.15);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
        }
        .synthesis-eval-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--tint-emerald, #6ee7b7);
          background: rgba(16, 185, 129, 0.15);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          margin-top: 0.25rem;
        }
        .response-columns-container {
          display: grid;
          gap: 1.25rem;
        }
        .multi-col {
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
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
          background: rgba(var(--surface-rgb, 16, 32, 28), 0.75);
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
          color: var(--text-strong, #fff);
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
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.05);
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
