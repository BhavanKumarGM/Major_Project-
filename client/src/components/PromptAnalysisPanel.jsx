import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  Copy, 
  Edit3, 
  Bot, 
  ListTree, 
  ShieldAlert, 
  Check, 
  Zap, 
  HelpCircle,
  X,
  ChevronRight,
  Layers,
  Award,
  Trophy
} from 'lucide-react';
import { api } from '../services/api.js';

export default function PromptAnalysisPanel({
  analysis,
  refinement,
  recommendations,
  onUseRefined,
  onUseOriginal,
  onSelectRecommendedModels,
  onImproveWithAI,
  isImprovingWithAI = false,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('refinement'); // 'refinement' | 'breakdown' | 'recommendation' | 'benchmark'
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableRefined, setEditableRefined] = useState(refinement?.refinedPrompt || '');
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [loadingBenchmark, setLoadingBenchmark] = useState(false);

  useEffect(() => {
    const promptToRank = refinement?.originalPrompt || refinement?.refinedPrompt;
    if (promptToRank) {
      loadBenchmarkRanking(promptToRank);
    }
  }, [refinement?.originalPrompt, refinement?.refinedPrompt]);

  const loadBenchmarkRanking = async (prompt) => {
    setLoadingBenchmark(true);
    try {
      const data = await api.rankModelsByBenchmark(prompt);
      setBenchmarkData(data);
    } catch (err) {
      console.error('Failed to load benchmark ranker data:', err);
    } finally {
      setLoadingBenchmark(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyEdit = () => {
    onUseRefined(editableRefined);
    setIsEditing(false);
  };

  return (
    <div className="analysis-panel glass-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="panel-title-wrap">
          <BrainCircuit size={18} className="text-cyan" />
          <h3>Prompt Intelligence & Strategy</h3>
        </div>
        {onClose && (
          <button className="btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="panel-tabs">
        <button 
          className={`panel-tab ${activeTab === 'refinement' ? 'active' : ''}`}
          onClick={() => setActiveTab('refinement')}
        >
          <Sparkles size={14} />
          <span>Refinement</span>
        </button>
        <button 
          className={`panel-tab ${activeTab === 'breakdown' ? 'active' : ''}`}
          onClick={() => setActiveTab('breakdown')}
        >
          <ListTree size={14} />
          <span>Breakdown</span>
        </button>
        <button 
          className={`panel-tab ${activeTab === 'recommendation' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendation')}
        >
          <Bot size={14} />
          <span>Models</span>
        </button>
        <button 
          className={`panel-tab ${activeTab === 'benchmark' ? 'active' : ''}`}
          onClick={() => setActiveTab('benchmark')}
        >
          <Award size={14} />
          <span>Benchmarks</span>
        </button>
      </div>

      {/* Intent Distribution Bar */}
      {analysis?.intentDistribution && (
        <div className="intent-bar-section">
          <div className="intent-header">
            <span className="intent-title">Intent Distribution (AI-Estimated)</span>
            <span className="intent-badge badge badge-indigo">{analysis.primaryCategory}</span>
          </div>
          <div className="intent-meter">
            {analysis.intentDistribution.map((item, idx) => (
              <div 
                key={idx}
                className="meter-segment"
                style={{
                  width: `${item.percentage}%`,
                  background: idx === 0 ? '#6366f1' : idx === 1 ? '#06b6d4' : idx === 2 ? '#10b981' : '#a855f7'
                }}
                title={`${item.category}: ${item.percentage}%`}
              />
            ))}
          </div>
          <div className="intent-legend">
            {analysis.intentDistribution.map((item, idx) => (
              <div key={idx} className="legend-item">
                <span 
                  className="legend-dot" 
                  style={{
                    background: idx === 0 ? '#6366f1' : idx === 1 ? '#06b6d4' : idx === 2 ? '#10b981' : '#a855f7'
                  }}
                />
                <span>{item.category}: <strong>{item.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 1: Refinement */}
      {activeTab === 'refinement' && (
        <div className="tab-body">
          {/* Refined Prompt Box */}
          <div className="card-box glass-card">
            <div className="card-box-header">
              <div className="card-label">
                <Sparkles size={14} className="text-cyan" />
                <span>Refined & Augmented Prompt</span>
                {refinement?.refinementMethod === 'ai' ? (
                  <span className="method-tag method-ai" title="Rewritten by a live model">AI · {refinement.refinedBy?.modelName}</span>
                ) : refinement?.refinedPrompt ? (
                  <span className="method-tag" title="Offline spelling fixes + rule-based requirements">Rules</span>
                ) : null}
              </div>
              <div className="card-actions">
                <button className="btn-icon" onClick={() => handleCopy(refinement?.refinedPrompt || '')} title="Copy">
                  {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                </button>
                <button className="btn-icon" onClick={() => { setIsEditing(!isEditing); setEditableRefined(refinement?.refinedPrompt || ''); }} title="Edit">
                  <Edit3 size={14} />
                </button>
              </div>
            </div>

            {refinement?.corrections?.some(c => c.type === 'spelling') && (
              <div className="corrections-row" aria-label="Spelling corrections">
                {refinement.corrections.filter(c => c.type === 'spelling').map((c, idx) => (
                  <span key={idx} className="correction-chip"><s>{c.from}</s> → {c.to}</span>
                ))}
              </div>
            )}
            {refinement?.flaggedWords?.length > 0 && (
              <div className="corrections-row" aria-label="Possible typos">
                {refinement.flaggedWords.map((f, idx) => (
                  <span key={idx} className="correction-chip chip-flag" title={`Did you mean ${f.suggestions.join(' or ')}?`}>
                    {f.word}?
                  </span>
                ))}
              </div>
            )}
            {refinement?.aiNote && <div className="ai-note">{refinement.aiNote}</div>}

            {isEditing ? (
              <div className="edit-wrap">
                <textarea
                  className="edit-textarea"
                  value={editableRefined}
                  onChange={(e) => setEditableRefined(e.target.value)}
                  rows={6}
                />
                <div className="edit-btn-row">
                  <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={handleApplyEdit}>Save & Apply</button>
                </div>
              </div>
            ) : (
              <div className="prompt-text-display">
                <pre>{refinement?.refinedPrompt || 'Enter a prompt to see automated refinement...'}</pre>
              </div>
            )}

            {/* Improvement Highlights */}
            {refinement?.improvements && refinement.improvements.length > 0 && (
              <div className="improvements-list">
                <span className="imp-title">✨ Enhancements Applied:</span>
                <ul>
                  {refinement.improvements.map((imp, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="refinement-action-row">
              <button 
                className="btn btn-cyan btn-sm flex-1"
                onClick={() => onUseRefined(refinement?.refinedPrompt)}
              >
                <Check size={14} />
                <span>Use Refined Prompt</span>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onUseOriginal(refinement?.originalPrompt)}
              >
                <span>Use Original</span>
              </button>
            </div>
            <div className="refinement-action-row">
              {refinement?.correctedPrompt && refinement.correctedPrompt !== refinement.originalPrompt && (
                <button
                  className="btn btn-secondary btn-sm flex-1"
                  onClick={() => onUseRefined(refinement.correctedPrompt)}
                  title="Keep your wording with only spelling and grammar fixed"
                >
                  <span>Use Spelling Fixes Only</span>
                </button>
              )}
              {onImproveWithAI && (
                <button
                  className="btn btn-secondary btn-sm flex-1"
                  onClick={onImproveWithAI}
                  disabled={isImprovingWithAI || !refinement?.originalPrompt}
                  title="Rewrites the prompt with one of your configured models (one billable API call)"
                >
                  <Sparkles size={14} className={isImprovingWithAI ? 'animate-spin text-cyan' : 'text-cyan'} />
                  <span>{isImprovingWithAI ? 'Improving…' : 'Improve with AI'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Structured Breakdown */}
      {activeTab === 'breakdown' && (
        <div className="tab-body">
          <div className="breakdown-grid">
            <div className="breakdown-item glass-card">
              <span className="bd-label">Goal & Purpose</span>
              <span className="bd-value">{refinement?.breakdown?.goal || 'N/A'}</span>
            </div>
            <div className="breakdown-item glass-card">
              <span className="bd-label">Task Type</span>
              <span className="bd-value">{refinement?.breakdown?.taskType || 'N/A'}</span>
            </div>
            <div className="breakdown-item glass-card">
              <span className="bd-label">Required Output Format</span>
              <span className="bd-value">{refinement?.breakdown?.requiredOutput || 'N/A'}</span>
            </div>
            <div className="breakdown-item glass-card">
              <span className="bd-label">Detected Tech / Language</span>
              <span className="bd-value">{refinement?.breakdown?.technologies?.join(', ') || 'None specified'}</span>
            </div>
            <div className="breakdown-item glass-card">
              <span className="bd-label">Expected Complexity</span>
              <span className="bd-value">{refinement?.breakdown?.expectedComplexity || 'Standard'}</span>
            </div>
            <div className="breakdown-item glass-card">
              <span className="bd-label">Ambiguity / Assumptions</span>
              <span className="bd-value">
                {refinement?.breakdown?.assumptions?.join('; ') || 'No ambiguity flagged'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Model Recommendations */}
      {activeTab === 'recommendation' && (
        <div className="tab-body">
          {recommendations?.topRecommendation ? (
            <div className="rec-wrap">
              {/* Top Pick Banner */}
              <div className="top-rec-card glass-card">
                <div className="rec-badge-row">
                  <span className="badge badge-emerald">
                    <Sparkles size={12} /> Top Recommendation ({recommendations.topRecommendation.score}%)
                  </span>
                  <span className="rec-provider">{recommendations.topRecommendation.provider}</span>
                </div>
                <h4 className="rec-model-name">{recommendations.topRecommendation.modelName}</h4>
                <p className="rec-reason">{recommendations.topRecommendation.reason}</p>

                <div className="rec-actions">
                  <button 
                    className="btn btn-primary btn-sm flex-1"
                    onClick={() => onSelectRecommendedModels([recommendations.topRecommendation.modelId])}
                  >
                    <span>Select {recommendations.topRecommendation.modelName}</span>
                  </button>
                  {recommendations.suggestedComparisonPair && recommendations.suggestedComparisonPair.length > 1 && (
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectRecommendedModels(recommendations.suggestedComparisonPair)}
                      title="Select top 2 models for multi-model comparison"
                    >
                      <Layers size={14} />
                      <span>Compare Top 2</span>
                    </button>
                  )}
                </div>
              </div>

              {/* All Scored Models List */}
              <div className="all-models-list">
                <span className="list-title">Model Suitability Rankings</span>
                {recommendations.models?.map((m) => (
                  <div key={m.id} className="model-score-row glass-card">
                    <div className="model-left">
                      <span className="model-avatar">{m.avatar}</span>
                      <div>
                        <div className="model-name-text">{m.name}</div>
                        <div className="model-rationale-text">{m.recommendationRationale}</div>
                      </div>
                    </div>
                    <div className="model-right">
                      <span className="score-num">{m.recommendationScore}%</span>
                      <button 
                        className="btn btn-secondary btn-xs"
                        onClick={() => onSelectRecommendedModels([m.id])}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state-text">
              Enter a prompt to calculate dynamic model capability scores.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Benchmark Leaderboard */}
      {activeTab === 'benchmark' && (
        <div className="tab-body">
          {loadingBenchmark ? (
            <div className="empty-state-text">
              <div className="spinner-sm" style={{ margin: '0 auto 0.5rem auto' }} />
              Classifying prompt and retrieving verified benchmark leaderboards...
            </div>
          ) : benchmarkData ? (
            <div className="rec-wrap">
              {/* Category Classification Spotlight */}
              <div className="top-rec-card glass-card" style={{ borderColor: 'rgba(6, 182, 212, 0.4)' }}>
                <div className="rec-badge-row">
                  <span className="badge badge-indigo">
                    {benchmarkData.categoryIcon} {benchmarkData.categoryName}
                  </span>
                  <span className="badge badge-emerald">
                    {benchmarkData.classification?.confidence}% Conf.
                  </span>
                </div>
                <p className="rec-reason" style={{ marginTop: '0.4rem', fontSize: '0.75rem' }}>
                  {benchmarkData.categoryDescription}
                </p>

                {/* Primary Benchmarks List */}
                <div style={{ marginTop: '0.6rem', padding: '0.5rem', background: 'rgba(var(--shade-rgb, 0,0,0),0.3)', borderRadius: '6px', fontSize: '0.72rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Active Benchmark Suite:
                  </div>
                  {benchmarkData.primaryBenchmarks?.map((bm, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', padding: '0.1rem 0' }}>
                      <span>{bm.name}</span>
                      <strong style={{ color: 'var(--accent-cyan)' }}>{Math.round(bm.weight * 100)}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Ranked Model Banner */}
              {benchmarkData.topRankedModel && (
                <div className="top-rec-card glass-card" style={{ borderColor: 'rgba(245, 158, 11, 0.5)', background: 'rgba(245, 158, 11, 0.05)' }}>
                  <div className="rec-badge-row">
                    <span className="badge badge-emerald" style={{ background: '#f59e0b', color: '#000', fontWeight: 800 }}>
                      <Trophy size={12} /> #1 BENCHMARK WINNER
                    </span>
                    <span className="rec-provider">{benchmarkData.topRankedModel.provider}</span>
                  </div>
                  <h4 className="rec-model-name">{benchmarkData.topRankedModel.name}</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--tint-amber, #fbbf24)', margin: '0.2rem 0' }}>
                    {benchmarkData.topRankedModel.compositeScore}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100 Composite</span>
                  </div>
                  <p className="rec-reason">{benchmarkData.topRankedModel.keyStrength}</p>

                  <div className="rec-actions">
                    <button 
                      className="btn btn-primary btn-sm flex-1"
                      onClick={() => onSelectRecommendedModels([benchmarkData.topRankedModel.modelId])}
                    >
                      <Zap size={13} />
                      <span>Select #1 Model</span>
                    </button>
                    {benchmarkData.runnerUpModel && (
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => onSelectRecommendedModels([benchmarkData.topRankedModel.modelId, benchmarkData.runnerUpModel.modelId])}
                        title="Compare Top 2 Benchmark Performers"
                      >
                        <Layers size={13} />
                        <span>Compare Top 2</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* All Ranked Models */}
              <div className="all-models-list">
                <span className="list-title">Category Benchmark Leaderboard</span>
                {benchmarkData.rankedModels?.map((m) => (
                  <div key={m.modelId} className="model-score-row glass-card" style={m.rank === 1 ? { borderColor: 'rgba(245, 158, 11, 0.4)' } : {}}>
                    <div className="model-left">
                      <span className="model-avatar" style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                        {m.rank === 1 ? '🥇' : m.rank === 2 ? '🥈' : `#${m.rank}`}
                      </span>
                      <div>
                        <div className="model-name-text">
                          {m.name} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({m.provider})</span>
                        </div>
                        <div className="model-rationale-text" style={{ fontSize: '0.7rem' }}>
                          {m.benchmarkMetrics?.[0]?.name.split(' ')[0]}: <strong>{m.benchmarkMetrics?.[0]?.value}{m.benchmarkMetrics?.[0]?.unit}</strong> | LMSYS: <strong>{m.arenaElo}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="model-right">
                      <span className="score-num" style={m.rank === 1 ? { color: 'var(--tint-amber, #fbbf24)' } : {}}>{m.compositeScore}</span>
                      <button 
                        className="btn btn-secondary btn-xs"
                        onClick={() => onSelectRecommendedModels([m.modelId])}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state-text">
              Enter a prompt to calculate verifiable benchmark leaderboards.
            </div>
          )}
        </div>
      )}


      <style>{`
        .analysis-panel {
          width: 380px;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 1px solid var(--border-subtle);
          background: rgba(var(--surface-rgb, 13, 18, 28), 0.95);
          overflow-y: auto;
          position: relative;
        }
        .panel-header {
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }
        .panel-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .panel-title-wrap h3 {
          font-size: 0.95rem;
          font-weight: 700;
        }
        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .panel-tabs {
          display: flex;
          padding: 0.5rem 0.85rem;
          gap: 0.35rem;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.2);
        }
        .panel-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.45rem 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .panel-tab:hover {
          color: var(--text-primary);
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.04);
        }
        .panel-tab.active {
          color: var(--text-strong, #fff);
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .intent-bar-section {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .intent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .intent-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .intent-meter {
          height: 6px;
          border-radius: 3px;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.08);
          overflow: hidden;
          display: flex;
          margin-bottom: 0.5rem;
        }
        .meter-segment {
          height: 100%;
          transition: width 0.3s ease;
        }
        .intent-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
        .legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .tab-body {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card-box {
          padding: 1rem;
        }
        .card-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.65rem;
        }
        .card-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-strong, #fff);
        }
        .card-actions {
          display: flex;
          gap: 0.25rem;
        }
        .prompt-text-display pre {
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 0.8rem;
          color: var(--text-strong, #e2e8f0);
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.35) !important;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          line-height: 1.5;
        }
        .method-tag {
          margin-left: 0.4rem;
          font-size: 0.66rem;
          font-weight: 700;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          background: rgba(148, 163, 184, 0.15);
          color: var(--text-secondary);
        }
        .method-tag.method-ai { background: rgba(6, 182, 212, 0.15); color: var(--tint-cyan, #67e8f9); }
        .corrections-row { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.4rem 0; }
        .correction-chip {
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--tint-emerald, #6ee7b7);
        }
        .correction-chip s { color: var(--text-muted); }
        .correction-chip.chip-flag { background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.3); color: var(--tint-amber, #fcd34d); }
        .ai-note { font-size: 0.74rem; color: var(--tint-amber, #fcd34d); margin: 0.35rem 0; }
        .improvements-list {
          margin-top: 0.75rem;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-sm);
          padding: 0.65rem;
        }
        .imp-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--tint-emerald, #6ee7b7);
          display: block;
          margin-bottom: 0.35rem;
        }
        .improvements-list ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .improvements-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .refinement-action-row {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.85rem;
        }
        .flex-1 { flex: 1; }
        .edit-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .edit-textarea {
          width: 100%;
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.4);
          border: 1px solid var(--border-focus);
          border-radius: var(--radius-sm);
          color: var(--text-strong, #fff);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          padding: 0.5rem;
          resize: vertical;
        }
        .edit-btn-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .breakdown-grid {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .breakdown-item {
          padding: 0.75rem 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .bd-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .bd-value {
          font-size: 0.8rem;
          color: var(--text-strong, #f1f5f9);
        }
        .top-rec-card {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.04);
          padding: 1rem;
        }
        .rec-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .rec-provider {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .rec-model-name {
          font-size: 1.1rem;
          margin-bottom: 0.35rem;
        }
        .rec-reason {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.85rem;
        }
        .rec-actions {
          display: flex;
          gap: 0.5rem;
        }
        .all-models-list {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .list-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .model-score-row {
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .model-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .model-avatar {
          font-size: 1.1rem;
        }
        .model-name-text {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-strong, #fff);
        }
        .model-rationale-text {
          font-size: 0.7rem;
          color: var(--text-muted);
          max-width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .model-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .score-num {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .btn-xs {
          padding: 0.25rem 0.55rem;
          font-size: 0.72rem;
        }
        .empty-state-text {
          text-align: center;
          color: var(--text-dim);
          font-size: 0.85rem;
          padding: 2rem 1rem;
        }
      `}</style>
    </div>
  );
}
