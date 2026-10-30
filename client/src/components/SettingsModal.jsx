import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  Sliders, 
  Scale, 
  Check, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Save, 
  RotateCcw,
  Zap,
  ShieldCheck,
  Server
} from 'lucide-react';
import { api, getAdminToken, setAdminToken } from '../services/api.js';

export default function SettingsModal({
  isOpen,
  onClose,
  models,
  onSaveModels,
  criticWeights,
  onSaveCriticWeights
}) {
  const [activeTab, setActiveTab] = useState('keys'); // 'keys' | 'capabilities' | 'critic'
  const [keyStatus, setKeyStatus] = useState({});
  const [keyInputs, setKeyInputs] = useState({
    sarvam: '',
    openai: '',
    gemini: '',
    anthropic: '',
    groq: '',
    ollamaUrl: 'http://127.0.0.1:11434'
  });
  const [testResults, setTestResults] = useState({});
  const [testingModelId, setTestingModelId] = useState(null);
  const [localModels, setLocalModels] = useState(models || []);
  const [localWeights, setLocalWeights] = useState(criticWeights || {});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [adminToken, setAdminTokenInput] = useState(getAdminToken());

  useEffect(() => {
    if (isOpen) {
      api.getKeyStatus().then(status => {
        setKeyStatus(status || {});
        if (status.ollamaUrl) {
          setKeyInputs(prev => ({ ...prev, ollamaUrl: status.ollamaUrl }));
        }
      }).catch(console.error);
      setLocalModels(JSON.parse(JSON.stringify(models)));
      setLocalWeights({ ...criticWeights });
    }
  }, [isOpen, models, criticWeights]);

  if (!isOpen) return null;

  const handleTestConnection = async (modelId) => {
    setTestingModelId(modelId);
    try {
      const result = await api.testModelConnection(modelId);
      setTestResults(prev => ({ ...prev, [modelId]: result }));
    } catch (err) {
      setTestResults(prev => ({ ...prev, [modelId]: { status: 'error', message: err.message } }));
    } finally {
      setTestingModelId(null);
    }
  };

  const handleSaveKeys = async () => {
    setAdminToken(adminToken.trim());
    try {
      await api.updateKeys(keyInputs);
      const status = await api.getKeyStatus();
      setKeyStatus(status);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      alert('Error saving keys: ' + err.message);
    }
  };

  const handleCapabilityChange = (modelId, capKey, value) => {
    setLocalModels(prev => prev.map(m => {
      if (m.id === modelId) {
        return {
          ...m,
          capabilities: {
            ...m.capabilities,
            [capKey]: parseInt(value, 10)
          }
        };
      }
      return m;
    }));
  };

  const handleWeightChange = (weightKey, value) => {
    setLocalWeights(prev => ({
      ...prev,
      [weightKey]: parseFloat(value)
    }));
  };

  const handleSaveAll = async () => {
    await handleSaveKeys();
    try {
      await api.updateModelSettings(localModels, localWeights);
    } catch (err) {
      alert('Error saving settings: ' + err.message);
      return;
    }
    onSaveModels(localModels);
    onSaveCriticWeights(localWeights);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="settings-header">
          <div className="title-with-icon">
            <Sliders size={20} className="text-indigo" />
            <h2>System Settings & Model Configuration</h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'keys' ? 'active' : ''}`}
            onClick={() => setActiveTab('keys')}
          >
            <Key size={15} />
            <span>API Keys & Providers</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'capabilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('capabilities')}
          >
            <Cpu size={15} />
            <span>Model Profiles</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'critic' ? 'active' : ''}`}
            onClick={() => setActiveTab('critic')}
          >
            <Scale size={15} />
            <span>Critic AI Weights</span>
          </button>
        </div>

        <div className="settings-body">
          {/* TAB 1: API KEYS */}
          {activeTab === 'keys' && (
            <div className="tab-section">
              <div className="info-banner">
                <ShieldCheck size={18} className="text-emerald" />
                <p>
                  Keys are handled exclusively on the backend server and saved to server/data/keys.json.
                  Providers without a key return clearly labelled simulated demo answers; a configured provider that fails shows an error.
                </p>
              </div>

              {keyStatus.adminTokenRequired && (
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>🔒 Admin Token</span>
                    </div>
                    <p className="key-desc">This server requires its ADMIN_TOKEN to change keys or settings. Stored in this browser only.</p>
                  </div>
                  <div className="key-input-row">
                    <input
                      type="password"
                      placeholder="Paste the server's ADMIN_TOKEN"
                      className="key-input"
                      value={adminToken}
                      onChange={e => setAdminTokenInput(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="keys-grid">
                {/* Sarvam AI (Indic 105B) */}
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>🇮🇳 Sarvam AI (105B Indic Model)</span>
                      {keyStatus.sarvam ? (
                        <span className="badge badge-emerald">Active & Configured</span>
                      ) : (
                        <span className="badge badge-amber">Offline / Fallback</span>
                      )}
                    </div>
                    <p className="key-desc">Powers Sarvam 105B multilingual and Indic domain intelligence.</p>
                  </div>
                  <div className="key-input-row">
                    <input 
                      type="password"
                      placeholder={keyStatus.sarvam ? "••••••••••••••••" : "Paste Sarvam API Key"}
                      className="key-input"
                      value={keyInputs.sarvam}
                      onChange={e => setKeyInputs({ ...keyInputs, sarvam: e.target.value })}
                    />
                    <button 
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleTestConnection('sarvam-105b')}
                      disabled={testingModelId === 'sarvam-105b'}
                    >
                      {testingModelId === 'sarvam-105b' ? 'Testing...' : 'Test'}
                    </button>
                  </div>
                  {testResults['sarvam-105b'] && (
                    <div className="test-feedback">
                      Status: {testResults['sarvam-105b'].message} ({testResults['sarvam-105b'].latency}ms)
                    </div>
                  )}
                </div>

                {/* Google Gemini */}
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>✨ Google Gemini API Key</span>
                      {keyStatus.gemini ? (
                        <span className="badge badge-emerald">Configured</span>
                      ) : (
                        <span className="badge badge-amber">Offline / Fallback</span>
                      )}
                    </div>
                    <p className="key-desc">Powers Gemini 2.5 Flash / Pro models.</p>
                  </div>
                  <div className="key-input-row">
                    <input 
                      type="password"
                      placeholder={keyStatus.gemini ? "••••••••••••••••" : "Paste AI Studio API Key"}
                      className="key-input"
                      value={keyInputs.gemini}
                      onChange={e => setKeyInputs({ ...keyInputs, gemini: e.target.value })}
                    />
                    <button 
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleTestConnection('gemini-2-5-flash')}
                      disabled={testingModelId === 'gemini-2-5-flash'}
                    >
                      {testingModelId === 'gemini-2-5-flash' ? 'Testing...' : 'Test'}
                    </button>
                  </div>
                  {testResults['gemini-2-5-flash'] && (
                    <div className="test-feedback">
                      Status: {testResults['gemini-2-5-flash'].message} ({testResults['gemini-2-5-flash'].latency}ms)
                    </div>
                  )}
                </div>

                {/* OpenAI */}
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>🧠 OpenAI API Key</span>
                      {keyStatus.openai ? (
                        <span className="badge badge-emerald">Configured</span>
                      ) : (
                        <span className="badge badge-amber">Offline / Fallback</span>
                      )}
                    </div>
                    <p className="key-desc">Powers GPT-4o and OpenAI endpoints.</p>
                  </div>
                  <div className="key-input-row">
                    <input 
                      type="password"
                      placeholder={keyStatus.openai ? "••••••••••••••••" : "Paste OpenAI sk-..."}
                      className="key-input"
                      value={keyInputs.openai}
                      onChange={e => setKeyInputs({ ...keyInputs, openai: e.target.value })}
                    />
                    <button 
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleTestConnection('gpt-4o')}
                      disabled={testingModelId === 'gpt-4o'}
                    >
                      {testingModelId === 'gpt-4o' ? 'Testing...' : 'Test'}
                    </button>
                  </div>
                  {testResults['gpt-4o'] && (
                    <div className="test-feedback">
                      Status: {testResults['gpt-4o'].message} ({testResults['gpt-4o'].latency}ms)
                    </div>
                  )}
                </div>

                {/* Anthropic Claude */}
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>🎭 Anthropic Claude API Key</span>
                      {keyStatus.anthropic ? (
                        <span className="badge badge-emerald">Configured</span>
                      ) : (
                        <span className="badge badge-amber">Offline / Fallback</span>
                      )}
                    </div>
                    <p className="key-desc">Powers Claude Opus 5.5.</p>
                  </div>
                  <div className="key-input-row">
                    <input 
                      type="password"
                      placeholder={keyStatus.anthropic ? "••••••••••••••••" : "Paste sk-ant-..."}
                      className="key-input"
                      value={keyInputs.anthropic}
                      onChange={e => setKeyInputs({ ...keyInputs, anthropic: e.target.value })}
                    />
                    <button 
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleTestConnection('claude-opus-5-5')}
                      disabled={testingModelId === 'claude-opus-5-5'}
                    >
                      {testingModelId === 'claude-opus-5-5' ? 'Testing...' : 'Test'}
                    </button>
                  </div>
                </div>

                {/* Groq Cloud */}
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>⚡ Groq Cloud API Key</span>
                      {keyStatus.groq ? (
                        <span className="badge badge-emerald">Configured</span>
                      ) : (
                        <span className="badge badge-amber">Offline / Fallback</span>
                      )}
                    </div>
                    <p className="key-desc">Powers GPT-OSS 120B on Groq's fast inference.</p>
                  </div>
                  <div className="key-input-row">
                    <input 
                      type="password"
                      placeholder={keyStatus.groq ? "••••••••••••••••" : "Paste gsk_..."}
                      className="key-input"
                      value={keyInputs.groq}
                      onChange={e => setKeyInputs({ ...keyInputs, groq: e.target.value })}
                    />
                    <button 
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleTestConnection('llama-3-3-70b')}
                      disabled={testingModelId === 'llama-3-3-70b'}
                    >
                      {testingModelId === 'llama-3-3-70b' ? 'Testing...' : 'Test'}
                    </button>
                  </div>
                </div>

                {/* Ollama Local URL */}
                <div className="key-row glass-card">
                  <div className="key-info">
                    <div className="key-title">
                      <span>🦙 Ollama Local Host URL</span>
                    </div>
                    <p className="key-desc">Private local model instance.</p>
                  </div>
                  <div className="key-input-row">
                    <input 
                      type="text"
                      placeholder="http://127.0.0.1:11434"
                      className="key-input"
                      value={keyInputs.ollamaUrl}
                      onChange={e => setKeyInputs({ ...keyInputs, ollamaUrl: e.target.value })}
                    />
                    <button 
                      className="btn btn-secondary btn-xs"
                      onClick={() => handleTestConnection('ollama-local')}
                      disabled={testingModelId === 'ollama-local'}
                    >
                      {testingModelId === 'ollama-local' ? 'Testing...' : 'Test'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODEL CAPABILITY PROFILES */}
          {activeTab === 'capabilities' && (
            <div className="tab-section">
              <p className="section-instruction">
                Adjust capability profiles to customize how the Recommendation Engine calculates match percentages for different prompt types.
              </p>
              <div className="capabilities-editor-list">
                {localModels.map((m) => (
                  <div key={m.id} className="model-cap-card glass-card">
                    <div className="cap-card-header">
                      <span className="avatar">{m.avatar}</span>
                      <div>
                        <strong>{m.name}</strong>
                        <span className="cap-provider-tag"> ({m.provider})</span>
                      </div>
                    </div>

                    <div className="sliders-grid">
                      {['coding', 'reasoning', 'creative', 'summarization', 'speed'].map(capKey => (
                        <div key={capKey} className="slider-item">
                          <div className="slider-label-row">
                            <span className="cap-name">{capKey}</span>
                            <span className="cap-val">{m.capabilities?.[capKey] || 85}%</span>
                          </div>
                          <input 
                            type="range"
                            min="50"
                            max="99"
                            value={m.capabilities?.[capKey] || 85}
                            onChange={(e) => handleCapabilityChange(m.id, capKey, e.target.value)}
                            className="cap-range"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CRITIC AI WEIGHTS */}
          {activeTab === 'critic' && (
            <div className="tab-section">
              <p className="section-instruction">
                Customize the weighting formulas used by Critic AI to evaluate candidate responses.
              </p>
              <div className="critic-weights-card glass-card">
                {[
                  { key: 'correctness', label: 'Correctness & Accuracy', default: 35 },
                  { key: 'relevance', label: 'Relevance to Prompt', default: 20 },
                  { key: 'completeness', label: 'Completeness & Depth', default: 20 },
                  { key: 'clarity', label: 'Clarity & Formatting', default: 15 },
                  { key: 'instructionFollowing', label: 'Instruction Following', default: 10 }
                ].map(w => (
                  <div key={w.key} className="weight-slider-row">
                    <div className="weight-info">
                      <span className="weight-title">{w.label}</span>
                      <span className="weight-percent">
                        {Math.round((localWeights[w.key] || (w.default / 100)) * 100)}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="0.05"
                      max="0.6"
                      step="0.05"
                      value={localWeights[w.key] || (w.default / 100)}
                      onChange={(e) => handleWeightChange(w.key, e.target.value)}
                      className="cap-range"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="settings-footer">
          {saveSuccess && <span className="save-toast text-emerald"><Check size={16} /> Saved!</span>}
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={handleSaveAll}>
            <Save size={15} />
            <span>Apply & Save Configuration</span>
          </button>
        </div>

      </div>

      <style>{`
        .settings-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }
        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .title-with-icon h2 {
          font-size: 1.15rem;
        }
        .text-indigo { color: var(--accent-primary); }
        .settings-tabs {
          display: flex;
          padding: 0.6rem 1.5rem;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.2);
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          color: var(--text-strong, #fff);
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.05);
        }
        .tab-btn.active {
          color: var(--text-strong, #fff);
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .settings-body {
          padding: 1.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }
        .info-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--tint-emerald, #a7f3d0);
          margin-bottom: 1.25rem;
        }
        .keys-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .key-row {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .key-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-strong, #fff);
        }
        .key-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .key-input-row {
          display: flex;
          gap: 0.5rem;
        }
        .key-input {
          flex: 1;
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.4);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          color: var(--text-strong, #fff);
          padding: 0.45rem 0.75rem;
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }
        .test-feedback {
          font-size: 0.72rem;
          color: var(--accent-cyan);
        }
        .section-instruction {
          font-size: 0.825rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .capabilities-editor-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .model-cap-card {
          padding: 1rem;
        }
        .cap-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .cap-provider-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .sliders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }
        .slider-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .slider-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-secondary);
          text-transform: capitalize;
        }
        .cap-val {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-cyan);
        }
        .cap-range {
          accent-color: var(--accent-primary);
          cursor: pointer;
        }
        .critic-weights-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .weight-slider-row {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .weight-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-strong, #fff);
          font-weight: 600;
        }
        .weight-percent {
          font-family: var(--font-mono);
          color: var(--accent-purple);
        }
        .settings-footer {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.25);
        }
        .save-toast {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
