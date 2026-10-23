import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, Clock, Cpu, Award, Zap, RefreshCw, Layers } from 'lucide-react';
import { api } from '../services/api.js';

export default function Dashboard({ models = [] }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const hasData = stats && stats.totalRequests > 0;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Telemetry & Usage Analytics</h1>
          <p className="dash-subtitle">Real-time performance metrics and multi-model consensus statistics</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={loadStats} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {!hasData ? (
        <div className="empty-stats-card glass-panel">
          <Activity size={48} className="text-dim animate-pulse" />
          <h3>No Telemetry Data Recorded Yet</h3>
          <p>Real performance data, latency benchmarks, token usage, and Critic AI selections will appear here as you run prompts in the AI Workspace.</p>
        </div>
      ) : (
        <div className="stats-layout">
          {/* Quick Metrics Bar */}
          <div className="metric-cards-grid">
            <div className="metric-card glass-card">
              <div className="metric-icon-wrap" style={{ color: '#6366f1', background: 'rgba(99,102,241,0.12)' }}>
                <Activity size={22} />
              </div>
              <div>
                <span className="metric-label">Total Orchestrated Turns</span>
                <span className="metric-value">{stats.totalRequests}</span>
              </div>
            </div>

            <div className="metric-card glass-card">
              <div className="metric-icon-wrap" style={{ color: '#06b6d4', background: 'rgba(6,182,212,0.12)' }}>
                <Clock size={22} />
              </div>
              <div>
                <span className="metric-label">Connected Models</span>
                <span className="metric-value">{models.length}</span>
              </div>
            </div>

            <div className="metric-card glass-card">
              <div className="metric-icon-wrap" style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)' }}>
                <Award size={22} />
              </div>
              <div>
                <span className="metric-label">Critic Top Picks Logged</span>
                <span className="metric-value">
                  {Object.values(stats.criticWins || {}).reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </div>

            <div className="metric-card glass-card">
              <div className="metric-icon-wrap" style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.12)' }}>
                <Zap size={22} />
              </div>
              <div>
                <span className="metric-label">User Chosen Branches</span>
                <span className="metric-value">
                  {Object.values(stats.userSelections || {}).reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Model Breakdown Table */}
          <div className="model-stats-card glass-panel">
            <h3 className="section-heading">Model Performance & Usage Distribution</h3>
            <div className="table-responsive">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Model Name</th>
                    <th>Provider</th>
                    <th>Requests Served</th>
                    <th>Average Latency</th>
                    <th>Critic Recommendation Wins</th>
                    <th>User Final Selections</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m) => {
                    const usage = stats.modelUsage?.[m.id] || 0;
                    const latency = stats.averageLatency?.[m.id] ? `${stats.averageLatency[m.id]} ms` : '—';
                    const criticWins = stats.criticWins?.[m.id] || 0;
                    const userWins = stats.userSelections?.[m.id] || 0;

                    return (
                      <tr key={m.id}>
                        <td className="model-name-cell">
                          <span>{m.avatar}</span>
                          <strong>{m.name}</strong>
                        </td>
                        <td><span className="badge badge-indigo">{m.provider}</span></td>
                        <td><span className="num-cell">{usage}</span></td>
                        <td><span className="num-cell">{latency}</span></td>
                        <td><span className="num-cell text-emerald">{criticWins}</span></td>
                        <td><span className="num-cell text-cyan">{userWins}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence-Based Evaluation Quality & Diagnostic Telemetry */}
          {stats.evaluationMetrics && (
            <div className="model-stats-card glass-panel" style={{ marginTop: '1.25rem' }}>
              <h3 className="section-heading">Evidence Evaluation Diagnostics & Telemetry</h3>
              <div className="eval-metrics-grid">
                <div className="eval-metric-box">
                  <span className="eval-metric-lbl">Evaluations Conducted</span>
                  <span className="eval-metric-val text-purple">{stats.evaluationMetrics.evaluationsCompleted}</span>
                  <span className="eval-metric-sub">{stats.evaluationMetrics.evaluationsDegraded} in degraded rule fallback</span>
                </div>
                <div className="eval-metric-box">
                  <span className="eval-metric-lbl">Critical Failures Intercepted</span>
                  <span className="eval-metric-val text-rose">{stats.evaluationMetrics.criticalFailuresDetected}</span>
                  <span className="eval-metric-sub">Negative constraint & syntax violations</span>
                </div>
                <div className="eval-metric-box">
                  <span className="eval-metric-lbl">Avg Requirement Coverage</span>
                  <span className="eval-metric-val text-cyan">{stats.evaluationMetrics.averageRequirementCoverage}%</span>
                  <span className="eval-metric-sub">Discrete prompt requirements verified</span>
                </div>
                <div className="eval-metric-box">
                  <span className="eval-metric-lbl">Human vs Critic Alignment</span>
                  <span className="eval-metric-val text-emerald">
                    {stats.evaluationMetrics.userAgreementRate != null ? `${stats.evaluationMetrics.userAgreementRate}%` : 'N/A'}
                  </span>
                  <span className="eval-metric-sub">
                    {stats.evaluationMetrics.isAgreementMeasured ? 'Empirically measured user choices' : 'Awaiting user selections'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .dashboard-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .dash-title {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }
        .dash-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .empty-stats-card {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          max-width: 600px;
          margin: 2rem auto;
        }
        .empty-stats-card h3 {
          font-size: 1.3rem;
        }
        .empty-stats-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .stats-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .metric-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }
        .metric-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .metric-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .metric-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .metric-value {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 800;
          color: #fff;
        }
        .model-stats-card {
          padding: 1.5rem;
        }
        .section-heading {
          font-size: 1.15rem;
          margin-bottom: 1.25rem;
        }
        .table-responsive {
          overflow-x: auto;
        }
        .stats-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.875rem;
        }
        .stats-table th {
          padding: 0.85rem 1rem;
          color: var(--text-muted);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
        }
        .stats-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .model-name-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .eval-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .eval-metric-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: var(--radius-sm);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .eval-metric-lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }
        .eval-metric-val {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
        }
        .eval-metric-sub {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
        .text-purple { color: #c084fc; }
        .text-rose { color: #fb7185; }
        .text-cyan { color: #22d3ee; }
        .text-emerald { color: #34d399; }
      `}</style>
    </div>
  );
}
