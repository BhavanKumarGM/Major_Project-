import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  BrainCircuit, 
  Target, 
  BarChart2, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Award,
  BookOpen,
  Cpu,
  Layers,
  Flame,
  Info
} from 'lucide-react';
import { api } from '../services/api.js';

const SAMPLE_PROMPTS = [
  { label: 'Coding / Python', prompt: 'Write a Python script to solve the 0/1 knapsack problem using dynamic programming and explain time complexity.', category: 'coding' },
  { label: 'Math / Logic', prompt: 'Prove that the square root of 2 is irrational and solve the equation x^2 - 2 = 0 with step-by-step reasoning.', category: 'reasoning' },
  { label: 'Indic / Vernacular', prompt: 'ಕನ್ನಡದಲ್ಲಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಬಗ್ಗೆ ಒಂದು ಸಣ್ಣ ಪ್ರಬಂಧ ಬರೆಯಿರಿ ಮತ್ತು ಅದರ ಮಹತ್ವವನ್ನು ತಿಳಿಸಿ.', category: 'multilingual' },
  { label: 'Summarization', prompt: 'Summarize the quarterly cloud computing trends report, highlight gross margins, and extract 5 strategic risk factors.', category: 'summarization' },
  { label: 'Creative Prose', prompt: 'Write an atmospheric neo-noir short story about an autonomous AI investigator solving a memory theft in Tokyo.', category: 'creative' },
  { label: 'Strict JSON', prompt: 'Strictly return valid JSON only with keys "status", "data", "summary" without any introductory conversational text or markdown blocks.', category: 'instruction' }
];

export default function BenchmarkRanker({ onSendToWorkspace }) {
  const [promptInput, setPromptInput] = useState('');
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(null);

  // Load benchmark categories on mount
  useEffect(() => {
    loadCategories();
    // Run default classification
    handleClassifyAndRank(SAMPLE_PROMPTS[0].prompt);
  }, []);

  const loadCategories = async () => {
    try {
      const data = await api.getBenchmarkCategories();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Failed to load benchmark categories:', err);
    }
  };

  const handleClassifyAndRank = async (promptToUse = null) => {
    const p = promptToUse !== null ? promptToUse : promptInput;
    if (!p || !p.trim()) return;

    setLoading(true);
    try {
      setPromptInput(p);
      const res = await api.rankModelsByBenchmark(p);
      setRankingData(res);
      setSelectedCategoryTab(res.classification?.primaryCategory);
    } catch (err) {
      console.error('Failed to rank models by benchmark:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategoryTab = (catId) => {
    setSelectedCategoryTab(catId);
    // Find matching sample prompt or generate one
    const matchingSample = SAMPLE_PROMPTS.find(s => s.category === catId);
    if (matchingSample) {
      handleClassifyAndRank(matchingSample.prompt);
    }
  };

  const handleLaunchInArena = (modelId) => {
    if (onSendToWorkspace) {
      onSendToWorkspace(promptInput, [modelId]);
    }
  };

  const handleLaunchComparison = (modelId1, modelId2) => {
    if (onSendToWorkspace) {
      onSendToWorkspace(promptInput, [modelId1, modelId2]);
    }
  };

  return (
    <div className="benchmark-container">
      {/* Top Hero Banner */}
      <div className="benchmark-hero">
        <div className="hero-badge">
          <Award size={14} className="text-amber" />
          <span>Verifiable Academic & Industry LLM Benchmarks</span>
        </div>
        <h1 className="hero-title">
          Prompt Classification & <span className="text-gradient">Benchmark Model Ranker</span>
        </h1>
        <p className="hero-subtitle">
          Intelligently classifies any prompt into its task category, cross-references empirical benchmark datasets (HumanEval, GSM8K, IndicLLM, MMLU-Pro, LMSYS Elo), and ranks the best-performing models with verifiable accuracy.
        </p>

        {/* Input Bar */}
        <div className="prompt-input-card glass-panel">
          <div className="input-row">
            <textarea
              className="benchmark-textarea"
              placeholder="Type or paste any prompt (coding, math, Indic language, analysis, creative)..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleClassifyAndRank();
                }
              }}
            />
            <button 
              className="btn btn-primary rank-submit-btn"
              onClick={() => handleClassifyAndRank()}
              disabled={loading || !promptInput.trim()}
            >
              {loading ? (
                <div className="spinner-sm" />
              ) : (
                <>
                  <Zap size={16} />
                  <span>Classify & Rank</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Samples */}
          <div className="sample-pills-row">
            <span className="sample-label">Try test queries:</span>
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button 
                key={idx} 
                className={`sample-pill ${promptInput === sample.prompt ? 'active' : ''}`}
                onClick={() => handleClassifyAndRank(sample.prompt)}
              >
                <span>{sample.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      {categories.length > 0 && (
        <div className="category-tabs-bar">
          <div className="category-tabs-inner">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-tab-btn ${selectedCategoryTab === cat.id ? 'active' : ''}`}
                onClick={() => handleSelectCategoryTab(cat.id)}
              >
                <span className="cat-tab-icon">{cat.icon}</span>
                <span className="cat-tab-name">{cat.name}</span>
                {cat.topModel && (
                  <span className="cat-top-model-pill">
                    Top: {cat.topModel.name}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Analysis & Leaderboard View */}
      {rankingData && (
        <div className="benchmark-results-grid">
          {/* Left Column: Classification & Benchmark Suite */}
          <div className="benchmark-sidebar">
            {/* Classification Card */}
            <div className="glass-card result-panel-card">
              <div className="card-header-line">
                <BrainCircuit size={18} className="text-cyan" />
                <h3>Prompt Category Classification</h3>
              </div>

              <div className="category-spotlight">
                <div className="category-icon-large">{rankingData.categoryIcon}</div>
                <div>
                  <h4 className="spotlight-title">{rankingData.categoryName}</h4>
                  <p className="spotlight-desc">{rankingData.categoryDescription}</p>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="confidence-meter-block">
                <div className="meter-label-row">
                  <span>Classification Confidence</span>
                  <span className="confidence-number">{rankingData.classification.confidence}%</span>
                </div>
                <div className="meter-bar-track">
                  <div 
                    className="meter-bar-fill"
                    style={{ width: `${rankingData.classification.confidence}%` }}
                  />
                </div>
              </div>

              {/* Category Distribution Breakdown */}
              <div className="distribution-block">
                <span className="sub-label">Category Intent Distribution:</span>
                <div className="distribution-list">
                  {rankingData.classification.distribution?.map((item, i) => (
                    <div key={i} className="dist-row">
                      <span className="dist-name">{item.name}</span>
                      <div className="dist-bar-wrap">
                        <div 
                          className="dist-bar-fill" 
                          style={{ 
                            width: `${item.percentage}%`,
                            background: i === 0 ? 'var(--accent-indigo)' : i === 1 ? 'var(--accent-cyan)' : 'var(--accent-emerald)'
                          }} 
                        />
                      </div>
                      <span className="dist-pct">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Traits */}
              {rankingData.classification.detectedTraits?.length > 0 && (
                <div className="traits-block">
                  <span className="sub-label">Signals & Heuristics Detected:</span>
                  <div className="trait-tags">
                    {rankingData.classification.detectedTraits.map((t, idx) => (
                      <span key={idx} className="trait-tag">
                        <CheckCircle2 size={12} className="text-emerald" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Benchmark Suite Card */}
            <div className="glass-card result-panel-card">
              <div className="card-header-line">
                <BarChart2 size={18} className="text-indigo" />
                <h3>Official Benchmark Suite Evaluated</h3>
              </div>
              <p className="suite-intro">
                The benchmark composite score combines verified academic evaluations tailored to <strong>{rankingData.categoryName}</strong>:
              </p>
              <div className="suite-benchmarks-list">
                {rankingData.primaryBenchmarks?.map((bm, idx) => (
                  <div key={idx} className="suite-bm-item">
                    <div className="suite-bm-top">
                      <span className="bm-name-highlight">{bm.name}</span>
                      <span className="bm-weight-badge">{Math.round(bm.weight * 100)}% Weight</span>
                    </div>
                    <p className="bm-desc-text">{bm.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ranked Model Leaderboard */}
          <div className="benchmark-main-column">
            {/* Winner Spotlight Card */}
            {rankingData.topRankedModel && (
              <div className="winner-spotlight-card glass-panel">
                <div className="winner-badge-header">
                  <div className="crown-badge">
                    <Trophy size={16} />
                    <span>#1 RECOMMENDED MODEL</span>
                  </div>
                  <span className="standout-tag">{rankingData.topRankedModel.standoutBadge}</span>
                </div>

                <div className="winner-info-row">
                  <div className="winner-title-group">
                    <h2>{rankingData.topRankedModel.name}</h2>
                    <span className="winner-provider">{rankingData.topRankedModel.provider}</span>
                  </div>
                  <div className="winner-score-box">
                    <div className="score-num-big">{rankingData.topRankedModel.compositeScore}</div>
                    <div className="score-label-small">Composite Score</div>
                  </div>
                </div>

                <p className="verdict-text-box">
                  <Info size={16} className="text-cyan shrink-0" />
                  <span>{rankingData.verdictRationale}</span>
                </p>

                {/* Benchmark metric cards */}
                <div className="metrics-grid">
                  {rankingData.topRankedModel.benchmarkMetrics?.map((m, idx) => (
                    <div key={idx} className="metric-pill-box glass-card">
                      <span className="metric-name-label">{m.name}</span>
                      <div className="metric-score-display">
                        {m.value}
                        <span className="metric-unit-text">{m.unit}</span>
                      </div>
                    </div>
                  ))}
                  <div className="metric-pill-box glass-card elo-box">
                    <span className="metric-name-label">Chatbot Arena Elo</span>
                    <div className="metric-score-display text-amber">
                      {rankingData.topRankedModel.arenaElo}
                      <span className="metric-unit-text">Elo</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="winner-cta-row">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleLaunchInArena(rankingData.topRankedModel.modelId)}
                  >
                    <Zap size={16} />
                    <span>Launch {rankingData.topRankedModel.name} in Arena</span>
                  </button>
                  {rankingData.runnerUpModel && (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleLaunchComparison(rankingData.topRankedModel.modelId, rankingData.runnerUpModel.modelId)}
                    >
                      <Layers size={16} />
                      <span>Compare #1 vs #2 ({rankingData.runnerUpModel.name})</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Complete Ranked Leaderboard Table */}
            <div className="glass-card result-panel-card">
              <div className="card-header-line">
                <Target size={18} className="text-amber" />
                <h3>Model Benchmark Leaderboard for "{rankingData.categoryName}"</h3>
              </div>

              <div className="leaderboard-table-wrap">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Model & Provider</th>
                      <th>Key Strengths & Accolades</th>
                      <th>Primary Benchmark</th>
                      <th>LMSYS Elo</th>
                      <th>Composite Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankingData.rankedModels?.map((m) => {
                      const isFirst = m.rank === 1;
                      const isSecond = m.rank === 2;
                      const primaryMetric = m.benchmarkMetrics?.[0];

                      return (
                        <tr key={m.modelId} className={isFirst ? 'row-winner' : ''}>
                          <td>
                            <div className="rank-badge-cell">
                              {isFirst ? (
                                <span className="trophy-gold"><Trophy size={16} /> #1</span>
                              ) : isSecond ? (
                                <span className="trophy-silver"><Award size={15} /> #2</span>
                              ) : (
                                <span className="rank-num">#{m.rank}</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="model-cell-name">
                              <span className="model-bold">{m.name}</span>
                              <span className="provider-sub">{m.provider}</span>
                            </div>
                          </td>
                          <td>
                            <span className="strength-text">{m.keyStrength}</span>
                          </td>
                          <td>
                            {primaryMetric && (
                              <span className="metric-chip">
                                {primaryMetric.name.split(' ')[0]}: <strong>{primaryMetric.value}{primaryMetric.unit}</strong>
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="elo-chip">{m.arenaElo}</span>
                          </td>
                          <td>
                            <div className="composite-cell">
                              <span className="comp-score-bold">{m.compositeScore}</span>
                              <div className="comp-score-bar">
                                <div 
                                  className="comp-bar-fill"
                                  style={{ 
                                    width: `${m.compositeScore}%`,
                                    background: isFirst ? 'var(--accent-amber)' : 'var(--accent-indigo)'
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <button 
                              className={`btn btn-xs ${isFirst ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => handleLaunchInArena(m.modelId)}
                            >
                              Arena
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {rankingData.unrankedModels?.length > 0 && (
                <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
                  Not ranked (no benchmark data): {rankingData.unrankedModels.map(m => m.name).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Styled JSX */}
      <style>{`
        .benchmark-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem 1.5rem;
          color: var(--text-primary);
        }
        .benchmark-hero {
          text-align: center;
          margin-bottom: 2rem;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fbbf24;
          margin-bottom: 1rem;
        }
        .text-amber { color: #f59e0b; }
        .hero-title {
          font-size: 2.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }
        .text-gradient {
          background: linear-gradient(135deg, #6366f1, #06b6d4, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          max-width: 820px;
          margin: 0 auto 1.75rem auto;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .prompt-input-card {
          max-width: 960px;
          margin: 0 auto;
          padding: 1.25rem;
          text-align: left;
        }
        .input-row {
          display: flex;
          gap: 0.75rem;
          align-items: stretch;
        }
        .benchmark-textarea {
          flex: 1;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          line-height: 1.5;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .benchmark-textarea:focus {
          border-color: var(--accent-indigo);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        .rank-submit-btn {
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
        }
        .sample-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.85rem;
          flex-wrap: wrap;
        }
        .sample-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .sample-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.3rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sample-pill:hover, .sample-pill.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--accent-indigo);
          color: #fff;
        }
        .category-tabs-bar {
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .category-tabs-inner {
          display: flex;
          gap: 0.65rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cat-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.9rem;
          background: rgba(13, 18, 28, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.82rem;
        }
        .cat-tab-btn:hover {
          border-color: var(--accent-cyan);
          color: #fff;
        }
        .cat-tab-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--accent-indigo);
          color: #fff;
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
        }
        .cat-top-model-pill {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.7rem;
          color: var(--accent-cyan);
        }
        .benchmark-results-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .benchmark-results-grid {
            grid-template-columns: 1fr;
          }
        }
        .benchmark-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .result-panel-card {
          padding: 1.25rem;
        }
        .card-header-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .card-header-line h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .category-spotlight {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }
        .category-icon-large {
          font-size: 2rem;
        }
        .spotlight-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .spotlight-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .confidence-meter-block {
          margin-bottom: 1.25rem;
        }
        .meter-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 0.35rem;
          color: var(--text-secondary);
        }
        .confidence-number {
          font-weight: 700;
          color: var(--accent-emerald);
        }
        .meter-bar-track {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          overflow: hidden;
        }
        .meter-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #10b981);
          border-radius: 9999px;
          transition: width 0.4s ease;
        }
        .distribution-block {
          margin-bottom: 1.25rem;
        }
        .sub-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.6rem;
        }
        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .dist-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.78rem;
        }
        .dist-name {
          width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-secondary);
        }
        .dist-bar-wrap {
          flex: 1;
          height: 5px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 9999px;
          overflow: hidden;
        }
        .dist-bar-fill {
          height: 100%;
          border-radius: 9999px;
        }
        .dist-pct {
          width: 32px;
          text-align: right;
          font-weight: 600;
          color: var(--text-muted);
        }
        .traits-block {
          margin-top: 1rem;
        }
        .trait-tags {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .trait-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.35rem 0.6rem;
          border-radius: 4px;
        }
        .suite-intro {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .suite-benchmarks-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .suite-bm-item {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
        }
        .suite-bm-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .bm-name-highlight {
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
        }
        .bm-weight-badge {
          background: rgba(99, 102, 241, 0.2);
          color: var(--accent-indigo);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .bm-desc-text {
          font-size: 0.74rem;
          color: var(--text-muted);
          line-height: 1.3;
        }
        .benchmark-main-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .winner-spotlight-card {
          padding: 1.5rem;
          border: 1px solid rgba(245, 158, 11, 0.4);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(99, 102, 241, 0.06));
          box-shadow: 0 0 32px rgba(245, 158, 11, 0.12);
        }
        .winner-badge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .crown-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #000;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          letter-spacing: 0.03em;
        }
        .standout-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #fcd34d;
          background: rgba(245, 158, 11, 0.15);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }
        .winner-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .winner-title-group h2 {
          font-size: 1.7rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.2rem;
        }
        .winner-provider {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .winner-score-box {
          text-align: right;
        }
        .score-num-big {
          font-size: 2.2rem;
          font-weight: 900;
          color: #fbbf24;
          line-height: 1;
        }
        .score-label-small {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 0.2rem;
        }
        .verdict-text-box {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: rgba(0, 0, 0, 0.35);
          border-left: 3px solid var(--accent-cyan);
          padding: 0.85rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #e2e8f0;
          margin-bottom: 1.25rem;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .metric-pill-box {
          padding: 0.75rem;
          text-align: center;
        }
        .metric-name-label {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .metric-score-display {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
        }
        .metric-unit-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-left: 0.15rem;
        }
        .winner-cta-row {
          display: flex;
          gap: 0.85rem;
        }
        .leaderboard-table-wrap {
          overflow-x: auto;
        }
        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
          text-align: left;
        }
        .leaderboard-table th {
          padding: 0.75rem 0.65rem;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          text-transform: uppercase;
        }
        .leaderboard-table td {
          padding: 0.85rem 0.65rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: middle;
        }
        .leaderboard-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .row-winner {
          background: rgba(245, 158, 11, 0.04) !important;
        }
        .rank-badge-cell {
          font-weight: 700;
        }
        .trophy-gold {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #fbbf24;
          font-weight: 800;
        }
        .trophy-silver {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #94a3b8;
          font-weight: 700;
        }
        .rank-num {
          color: var(--text-muted);
        }
        .model-cell-name {
          display: flex;
          flex-direction: column;
        }
        .model-bold {
          font-weight: 700;
          color: #fff;
        }
        .provider-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .strength-text {
          color: var(--text-secondary);
          font-size: 0.76rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 280px;
        }
        .metric-chip {
          background: rgba(6, 182, 212, 0.15);
          color: var(--accent-cyan);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.72rem;
          white-space: nowrap;
        }
        .elo-chip {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .composite-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 80px;
        }
        .comp-score-bold {
          font-weight: 800;
          color: #fff;
          font-size: 0.9rem;
        }
        .comp-score-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
        }
        .comp-bar-fill {
          height: 100%;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
