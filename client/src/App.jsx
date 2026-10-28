import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import Workspace from './components/Workspace.jsx';
import Dashboard from './components/Dashboard.jsx';
import LegalAnalyzer from './components/LegalAnalyzer.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import BenchmarkRanker from './components/BenchmarkRanker.jsx';
import { api } from './services/api.js';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'workspace' | 'benchmark' | 'dashboard' | 'legal'
  const [models, setModels] = useState([]);
  const [criticWeights, setCriticWeights] = useState({});
  // modelId -> whether the server has credentials for it
  const [modelAvailability, setModelAvailability] = useState({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [initialPromptForWorkspace, setInitialPromptForWorkspace] = useState('');
  const [initialModelsForWorkspace, setInitialModelsForWorkspace] = useState(null);

  // Load models from server
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const data = await api.getModels();
      if (data.models) setModels(data.models);
      if (data.criticWeights) setCriticWeights(data.criticWeights);
      if (data.availability) setModelAvailability(data.availability);
    } catch (err) {
      console.error('Failed to load models:', err);
    }
  };

  const handleStartWorkspaceWithPrompt = (prompt = '', modelIds = null) => {
    setInitialPromptForWorkspace(prompt);
    if (modelIds && Array.isArray(modelIds)) {
      setInitialModelsForWorkspace(modelIds);
    }
    setActiveView('workspace');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar 
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Router */}
      <div className="main-content">
        {activeView === 'landing' && (
          <LandingPage 
            onStartWorkspace={() => handleStartWorkspaceWithPrompt('')}
            onSelectSamplePrompt={(prompt) => handleStartWorkspaceWithPrompt(prompt)}
          />
        )}

        {activeView === 'workspace' && (
          <Workspace 
            models={models}
            modelAvailability={modelAvailability}
            criticWeights={criticWeights}
            initialPrompt={initialPromptForWorkspace}
            initialModelIds={initialModelsForWorkspace}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {activeView === 'benchmark' && (
          <BenchmarkRanker 
            onSendToWorkspace={(prompt, modelIds) => handleStartWorkspaceWithPrompt(prompt, modelIds)}
          />
        )}

        {activeView === 'dashboard' && (
          <Dashboard 
            models={models}
          />
        )}

        {activeView === 'legal' && (
          <LegalAnalyzer 
            onSendToWorkspace={(prompt) => handleStartWorkspaceWithPrompt(prompt)}
          />
        )}
      </div>

      {/* Settings & Configuration Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          // Keys may have been added or removed; refresh which models can answer
          loadModels();
        }}
        models={models}
        onSaveModels={(updated) => setModels(updated)}
        criticWeights={criticWeights}
        onSaveCriticWeights={(updated) => setCriticWeights(updated)}
      />
    </div>
  );
}
