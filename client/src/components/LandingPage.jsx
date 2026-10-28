import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Scale, 
  ShieldCheck, 
  GitBranch, 
  Zap, 
  CheckCircle2, 
  BarChart, 
  Bot, 
  BrainCircuit,
  Sliders,
  FileCode2,
  Share2
} from 'lucide-react';

export default function LandingPage({ onStartWorkspace, onSelectSamplePrompt }) {
  const [activeTab, setActiveTab] = useState('flow');

  const samplePrompts = [
    {
      title: "C Prime Number Checker",
      category: "Coding",
      prompt: "Write a C program to check whether a number is prime and explain the logic.",
      icon: "⚡"
    },
    {
      title: "Python Async Architecture",
      category: "Architecture",
      prompt: "Design a high-throughput async worker pool in Python with error handling.",
      icon: "🐍"
    },
    {
      title: "Quantum Key Distribution",
      category: "Reasoning",
      prompt: "Explain how BB84 protocol detects quantum eavesdropping step by step.",
      icon: "🔬"
    }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="hero-badge-pill">
            <Sparkles size={13} className="hero-sparkle" />
            Next-Gen Multi-LLM Orchestration Layer
          </span>
        </div>

        <h1 className="hero-title">
          One Question. <span className="shimmer-text">Multiple Minds.</span><br />
          One Better Answer.
        </h1>

        <p className="hero-subtitle">
          AI Hive Mind analyzes your prompt, refines it with precision, recommends the optimal AI models, 
          generates parallel responses, and evaluates them with a dedicated <strong>Critic AI</strong>—putting you in complete control.
        </p>

        <div className="hero-cta-group">
          <button className="btn btn-primary btn-lg" onClick={() => onStartWorkspace()}>
            <span>Start AI Hive Mind</span>
            <ArrowRight size={18} />
          </button>
          <a href="#pipeline-demo" className="btn btn-secondary btn-lg">
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Quick Sample Chips */}
        <div className="sample-prompts-bar">
          <span className="sample-label">Try primary benchmark:</span>
          {samplePrompts.map((s, idx) => (
            <button 
              key={idx} 
              className="sample-chip"
              onClick={() => onSelectSamplePrompt(s.prompt)}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Animated Hive Mind Pipeline Visualization */}
      <section id="pipeline-demo" className="pipeline-visual-section">
        <div className="section-header">
          <span className="section-tag">Interactive Architecture</span>
          <h2 className="section-title">The Multi-LLM Consensus Loop</h2>
          <p className="section-desc">How a single raw prompt gets transformed through our multi-agent consensus workflow</p>
        </div>

        <div className="pipeline-graph-card glass-panel">
          <div className="pipeline-nodes">
            {/* Stage 1: Input */}
            <div className="pipeline-node user-node">
              <div className="node-icon bg-indigo"><Sparkles size={20} /></div>
              <div className="node-title">1. User Prompt</div>
              <div className="node-desc">Raw input entered</div>
            </div>

            <div className="flow-arrow"><ArrowRight size={16} /></div>

            {/* Stage 2: Prompt Engine */}
            <div className="pipeline-node engine-node">
              <div className="node-icon bg-cyan"><BrainCircuit size={20} /></div>
              <div className="node-title">2. Analysis & Refinement</div>
              <div className="node-desc">Intent %, breakdown & fit scoring</div>
            </div>

            <div className="flow-arrow"><ArrowRight size={16} /></div>

            {/* Stage 3: Multi-Model Fanout */}
            <div className="pipeline-node fanout-node">
              <div className="fanout-header">
                <span className="node-title">3. Parallel Execution</span>
              </div>
              <div className="model-pill-stack">
                <div className="model-chip"><span className="dot" style={{background: '#10a37f'}}></span> GPT-4o</div>
                <div className="model-chip"><span className="dot" style={{background: '#d97706'}}></span> Claude Opus 5.5</div>
                <div className="model-chip"><span className="dot" style={{background: '#3b82f6'}}></span> Gemini 2.5</div>
              </div>
            </div>

            <div className="flow-arrow"><ArrowRight size={16} /></div>

            {/* Stage 4: Critic AI */}
            <div className="pipeline-node critic-node">
              <div className="node-icon bg-purple"><Scale size={20} /></div>
              <div className="node-title">4. Critic AI</div>
              <div className="node-desc">Multi-criteria scoring & ranking</div>
            </div>

            <div className="flow-arrow"><ArrowRight size={16} /></div>

            {/* Stage 5: User Continuation */}
            <div className="pipeline-node memory-node">
              <div className="node-icon bg-emerald"><GitBranch size={20} /></div>
              <div className="node-title">5. Active Branch</div>
              <div className="node-desc">Provider-neutral shared memory</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Feature Grid */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">Core Capabilities</span>
          <h2 className="section-title">Built For Precision & Control</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon-wrap" style={{ color: 'var(--tint-indigo, #818cf8)', background: 'rgba(99, 102, 241, 0.12)' }}>
              <Sparkles size={24} />
            </div>
            <h3 className="feature-card-title">Prompt Refinement & Breakdown</h3>
            <p className="feature-card-text">
              Automatically diagnoses prompt ambiguity, identifies task categories, extracts boundary constraints, 
              and constructs a refined version without altering your true intent.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrap" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.12)' }}>
              <Bot size={24} />
            </div>
            <h3 className="feature-card-title">Smart Model Recommendation</h3>
            <p className="feature-card-text">
              Dynamic matching engine pairs your prompt intent with configurable model capability profiles, 
              providing transparent recommendation scores with explainable rationale.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrap" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)' }}>
              <Layers size={24} />
            </div>
            <h3 className="feature-card-title">Multi-Model Arena Comparison</h3>
            <p className="feature-card-text">
              Dispatch requests to multiple LLMs simultaneously (OpenAI, Claude, Gemini, Groq, Ollama) and view streaming answers in side-by-side comparison columns.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrap" style={{ color: '#a855f7', background: 'rgba(168, 85, 247, 0.12)' }}>
              <Scale size={24} />
            </div>
            <h3 className="feature-card-title">Critic AI Evaluation</h3>
            <p className="feature-card-text">
              An impartial evaluator grades generated responses across Correctness (35%), Relevance (20%), Completeness (20%), Clarity (15%), and Instruction Adherence (10%).
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrap" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.12)' }}>
              <GitBranch size={24} />
            </div>
            <h3 className="feature-card-title">Provider-Neutral Shared Memory</h3>
            <p className="feature-card-text">
              You choose which answer becomes the active conversation branch. Easily switch between AI models mid-conversation while preserving full conversational context.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrap" style={{ color: '#f43f5e', background: 'rgba(244, 63, 94, 0.12)' }}>
              <Zap size={24} />
            </div>
            <h3 className="feature-card-title">Consensus Synthesis Engine</h3>
            <p className="feature-card-text">
              Merge the highest scoring algorithmic logic, clarity, and syntax from multiple candidate models into a single, unified "Best Combined Answer".
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner glass-panel">
          <div className="cta-content">
            <h2>Ready to experience the power of the Hive Mind?</h2>
            <p>Start a session, test prompt refinement, and see multi-model comparison in real-time.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => onStartWorkspace()}>
            <span>Launch Workspace</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <style>{`
        .landing-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 3rem 1.5rem 6rem;
          display: flex;
          flex-direction: column;
          gap: 5rem;
        }
        .hero-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          padding-top: 2rem;
        }
        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--tint-indigo, #a5b4fc);
        }
        .hero-sparkle {
          color: var(--tint-indigo, #818cf8);
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          font-weight: 800;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 750px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn-lg {
          padding: 0.85rem 1.85rem;
          font-size: 1rem;
          border-radius: var(--radius-lg);
        }
        .sample-prompts-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .sample-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .sample-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.04);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sample-chip:hover {
          color: var(--text-strong, #fff);
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .section-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-cyan);
          display: block;
          margin-bottom: 0.5rem;
        }
        .section-title {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }
        .section-desc {
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .pipeline-graph-card {
          padding: 2.5rem 1.5rem;
          overflow-x: auto;
        }
        .pipeline-nodes {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 950px;
          gap: 1rem;
        }
        .pipeline-node {
          background: rgba(var(--surface-rgb, 13, 18, 28), 0.9);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 170px;
          position: relative;
        }
        .node-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          color: white;
        }
        .bg-indigo { background: linear-gradient(135deg, #6366f1, var(--tint-indigo, #818cf8)); }
        .bg-cyan { background: linear-gradient(135deg, #0891b2, #06b6d4); }
        .bg-purple { background: linear-gradient(135deg, #9333ea, var(--tint-purple, #c084fc)); }
        .bg-emerald { background: linear-gradient(135deg, #059669, var(--tint-emerald, #34d399)); }
        .node-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-strong, #fff);
          margin-bottom: 0.25rem;
        }
        .node-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .flow-arrow {
          color: var(--text-dim);
        }
        .fanout-node {
          width: 200px;
        }
        .model-pill-stack {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          width: 100%;
          margin-top: 0.5rem;
        }
        .model-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.05);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .model-chip .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .feature-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-card-title {
          font-size: 1.25rem;
        }
        .feature-card-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .cta-banner {
          padding: 3rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%), var(--bg-surface);
        }
        .cta-content h2 {
          font-size: 1.85rem;
          margin-bottom: 0.5rem;
        }
        .cta-content p {
          color: var(--text-secondary);
        }
        @media (max-width: 900px) {
          .hero-title { font-size: 2.5rem; }
          .cta-banner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}
