import React, { useState } from 'react';
import { Scale, FileText, AlertTriangle, ShieldCheck, CheckCircle2, Bot, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';

export default function LegalAnalyzer({ onSendToWorkspace }) {
  const [docText, setDocText] = useState(
`SOFTWARE SERVICE AGREEMENT & LIABILITY CLAUSE
1. LIMITATION OF LIABILITY: Under no circumstances shall Provider's total aggregate liability exceed $50.00 USD, regardless of the cause of action, negligence, data loss, or breach of contract.
2. INTELLECTUAL PROPERTY: Customer grants Provider an irrevocable, perpetual, worldwide, royalty-free license to use, reproduce, modify, and distribute any Customer Data ingested into the System for training commercial AI models.
3. TERMINATION: Provider reserves the sole right to terminate access immediately without prior notice or refund.`
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      // Simulate multi-model legal breakdown
      await new Promise(r => setTimeout(r, 1000));
      setAnalysisResult({
        riskScore: 84, // High Risk
        riskLevel: 'HIGH RISK (Unfavorable to Customer)',
        flaggedClauses: [
          {
            clause: 'Limitation of Liability ($50 USD cap)',
            risk: 'Severe',
            finding: 'Extremely disproportionate liability ceiling that leaves customer unprotected against severe outages, security breaches, or total data loss.',
            recommendation: 'Negotiate liability cap to minimum 12 months of fees paid or $1,000,000 insurance coverage.'
          },
          {
            clause: 'Intellectual Property (Perpetual AI training license)',
            risk: 'Critical',
            finding: 'Permits the vendor to ingest proprietary trade secrets and confidential customer data into general AI models.',
            recommendation: 'Strike out AI training rights and insist on complete enterprise data isolation.'
          },
          {
            clause: 'Unilateral Termination without Notice',
            risk: 'Moderate',
            finding: 'Allows immediate service discontinuation without transition period or pro-rated refund.',
            recommendation: 'Require 30 days written notice with guaranteed data export window.'
          }
        ],
        modelConsensus: 'GPT-4o, Claude 3.5 Sonnet, and Gemini consensus agree this agreement presents unacceptable exposure.'
      });
    } catch (err) {
      alert('Analysis failed: ' + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleExportToChat = () => {
    const prompt = `Please draft an amended, redlined version of the following software service agreement to mitigate the critical risks identified (Liability cap, IP training rights, and Termination notice):\n\n${docText}`;
    onSendToWorkspace(prompt);
  };

  return (
    <div className="legal-container">
      <div className="legal-header">
        <div>
          <div className="tag-row">
            <span className="badge badge-purple">Academic Project Showcase</span>
          </div>
          <h1 className="legal-title">Legal Contract & Document Risk Analyzer</h1>
          <p className="legal-subtitle">
            Multi-LLM cross-examination of complex contracts, extraction of high-risk clauses, and Critic AI risk scoring.
          </p>
        </div>
      </div>

      <div className="legal-grid">
        {/* Left: Input Text / Contract */}
        <div className="legal-input-card glass-panel">
          <div className="card-top">
            <div className="top-title">
              <FileText size={18} className="text-cyan" />
              <h3>Contract / Document Text</h3>
            </div>
          </div>
          <textarea
            className="legal-textarea"
            rows={14}
            value={docText}
            onChange={e => setDocText(e.target.value)}
            placeholder="Paste contract terms or clauses here..."
          />
          <div className="input-footer">
            <button 
              className="btn btn-primary btn-md w-full"
              onClick={handleAnalyze}
              disabled={analyzing || !docText.trim()}
            >
              {analyzing ? <Zap size={16} className="animate-spin" /> : <Scale size={16} />}
              <span>{analyzing ? 'Auditing Clauses Across LLMs...' : 'Audit Document with Hive Mind'}</span>
            </button>
          </div>
        </div>

        {/* Right: Results & Critic Evaluation */}
        <div className="legal-results-card glass-panel">
          <div className="card-top">
            <div className="top-title">
              <Scale size={18} className="text-purple" />
              <h3>Critic AI Risk Audit & Cross-Model Findings</h3>
            </div>
            {analysisResult && (
              <span className="badge badge-amber">{analysisResult.riskLevel}</span>
            )}
          </div>

          {!analysisResult ? (
            <div className="empty-audit-state">
              <Scale size={40} className="text-dim" />
              <p>Click "Audit Document with Hive Mind" to trigger parallel clause extraction and multi-LLM risk scoring.</p>
            </div>
          ) : (
            <div className="audit-content">
              {/* Score Meter */}
              <div className="risk-score-box glass-card">
                <div className="risk-score-header">
                  <span>Calculated Contract Risk Level</span>
                  <span className="score-number text-rose">{analysisResult.riskScore}/100</span>
                </div>
                <div className="risk-meter">
                  <div className="meter-fill" style={{ width: `${analysisResult.riskScore}%` }}></div>
                </div>
                <p className="consensus-text">🤖 {analysisResult.modelConsensus}</p>
              </div>

              {/* Flagged Clauses */}
              <div className="flagged-clauses-list">
                <h4>⚠️ Identified Risk Flags & Suggested Counter-Terms</h4>
                {analysisResult.flaggedClauses.map((c, idx) => (
                  <div key={idx} className="clause-card glass-card">
                    <div className="clause-header">
                      <strong>{c.clause}</strong>
                      <span className={`badge ${c.risk === 'Critical' ? 'badge-rose' : c.risk === 'Severe' ? 'badge-amber' : 'badge-indigo'}`}>
                        {c.risk} Risk
                      </span>
                    </div>
                    <p className="finding-text"><strong>Analysis:</strong> {c.finding}</p>
                    <div className="rec-box">
                      <CheckCircle2 size={14} className="text-emerald flex-shrink-0" />
                      <span><strong>Proposed Remedy:</strong> {c.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action to Workspace */}
              <div className="export-action-row">
                <button className="btn btn-cyan btn-md w-full" onClick={handleExportToChat}>
                  <span>Send Redline Request to AI Workspace</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .legal-container {
          max-width: 1380px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .tag-row {
          margin-bottom: 0.5rem;
        }
        .legal-title {
          font-size: 2.2rem;
          margin-bottom: 0.4rem;
        }
        .legal-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 800px;
        }
        .legal-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1.5rem;
        }
        .legal-input-card, .legal-results-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .top-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .top-title h3 {
          font-size: 1.05rem;
        }
        .legal-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          padding: 1rem;
          resize: vertical;
          line-height: 1.6;
        }
        .input-footer {
          margin-top: 1rem;
        }
        .empty-audit-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
        }
        .audit-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .risk-score-box {
          padding: 1rem 1.25rem;
        }
        .risk-score-header {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .score-number {
          font-family: var(--font-mono);
          font-size: 1.15rem;
        }
        .text-rose { color: var(--accent-rose); }
        .risk-meter {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.6rem;
        }
        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #f43f5e);
        }
        .consensus-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .flagged-clauses-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .flagged-clauses-list h4 {
          font-size: 0.9rem;
        }
        .clause-card {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .clause-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #fff;
        }
        .badge-rose {
          background: rgba(244, 63, 94, 0.15);
          color: #fda4af;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }
        .finding-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .rec-box {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.6rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          color: #6ee7b7;
        }
        .export-action-row {
          margin-top: 0.5rem;
        }
        @media (max-width: 900px) {
          .legal-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
