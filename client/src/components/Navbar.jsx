import React from 'react';
import { Sparkles, Layers, BarChart3, Settings, ShieldCheck, Scale, Cpu } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenSettings }) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand-badge" onClick={() => setActiveView('landing')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-wrap">
            <Cpu className="logo-icon" size={22} />
            <div className="logo-glow"></div>
          </div>
          <div className="brand-text">
            <span className="brand-name">AI HIVE MIND</span>
            <span className="brand-tagline">Multi-LLM Intelligence Layer</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeView === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveView('landing')}
          >
            Overview
          </button>
          <button 
            className={`nav-btn ${activeView === 'workspace' ? 'active' : ''}`}
            onClick={() => setActiveView('workspace')}
          >
            <Sparkles size={16} />
            AI Workspace
          </button>
          <button 
            className={`nav-btn ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <BarChart3 size={16} />
            Telemetry & Stats
          </button>
          <button 
            className={`nav-btn ${activeView === 'legal' ? 'active' : ''}`}
            onClick={() => setActiveView('legal')}
          >
            <Scale size={16} />
            Doc Analyzer
          </button>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenSettings}
            title="Configure API Keys & Model Profiles"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setActiveView('workspace')}
          >
            <Sparkles size={15} />
            <span>Launch Workspace</span>
          </button>
        </div>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(7, 9, 14, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .navbar-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .brand-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          user-select: none;
        }
        .logo-icon-wrap {
          position: relative;
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        .logo-glow {
          position: absolute;
          inset: -4px;
          background: radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%);
          z-index: -1;
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          background: linear-gradient(90deg, #fff, #c7d2fe);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .brand-tagline {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-btn.active {
          color: #fff;
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-sm {
          padding: 0.45rem 0.95rem;
          font-size: 0.825rem;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
