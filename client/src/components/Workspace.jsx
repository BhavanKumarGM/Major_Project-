import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Plus, 
  Trash2, 
  Search, 
  BrainCircuit, 
  Sliders, 
  GitBranch, 
  Layers, 
  Bot, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  X, 
  Loader2, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  CheckSquare,
  Square
} from 'lucide-react';
import { api } from '../services/api.js';
import WorkflowPipeline from './WorkflowPipeline.jsx';
import PromptAnalysisPanel from './PromptAnalysisPanel.jsx';
import ComparisonView from './ComparisonView.jsx';
import BranchViewer from './BranchViewer.jsx';

export default function Workspace({ 
  models = [], 
  criticWeights, 
  initialPrompt = '', 
  initialModelIds = null,
  onOpenSettings 
}) {
  // Conversations State
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mode Selection: 'auto' | 'single' | 'compare' | 'critic'
  const [activeMode, setActiveMode] = useState('compare'); 
  const [selectedModelIds, setSelectedModelIds] = useState(['gemini-2-0-flash', 'llama-3-3-70b']);

  // Composer State
  const [inputPrompt, setInputPrompt] = useState(initialPrompt);
  const [attachedDoc, setAttachedDoc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Workflow Pipeline Stage: 'prompt' | 'analyze' | 'refine' | 'breakdown' | 'recommend' | 'select_model' | 'generate' | 'compare' | 'critic' | 'branch'
  const [currentPipelineStage, setCurrentPipelineStage] = useState('prompt');

  // Pre-flight Analysis State (Drawer)
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(true);
  const [showBranchTree, setShowBranchTree] = useState(false);
  const [preflightData, setPreflightData] = useState(null);
  const [isPreflightLoading, setIsPreflightLoading] = useState(false);

  // Generation & Execution State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load initial conversations
  useEffect(() => {
    loadConversations();
  }, []);

  // Set initial prompt if passed from landing or benchmark ranker
  useEffect(() => {
    if (initialPrompt) {
      setInputPrompt(initialPrompt);
      runPreflight(initialPrompt);
    }
  }, [initialPrompt]);

  // Set initial models if passed from benchmark ranker
  useEffect(() => {
    if (initialModelIds && initialModelIds.length > 0) {
      setSelectedModelIds(initialModelIds);
      if (initialModelIds.length === 1) {
        setActiveMode('single');
      } else {
        setActiveMode('compare');
      }
    }
  }, [initialModelIds]);

  const loadConversations = async () => {
    try {
      const list = await api.getConversations();
      setConversations(list || []);
      if (list && list.length > 0 && !activeConversationId) {
        loadConversation(list[0].id);
      }
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  };

  const loadConversation = async (id) => {
    try {
      const conv = await api.getConversation(id);
      setActiveConversation(conv);
      setActiveConversationId(id);
      setCurrentPipelineStage('prompt');
    } catch (err) {
      console.error('Failed to load conversation:', err);
    }
  };

  const handleNewChat = async () => {
    try {
      const conv = await api.createConversation('New Hive Mind Chat');
      setConversations(prev => [conv, ...prev]);
      setActiveConversation(conv);
      setActiveConversationId(conv.id);
      setInputPrompt('');
      setAttachedDoc(null);
      setPreflightData(null);
      setCurrentPipelineStage('prompt');
    } catch (err) {
      console.error('Failed to create new chat:', err);
    }
  };

  const handleDeleteConversation = async (e, id) => {
    e.stopPropagation();
    try {
      await api.deleteConversation(id);
      const remaining = conversations.filter(c => c.id !== id);
      setConversations(remaining);
      if (activeConversationId === id) {
        if (remaining.length > 0) loadConversation(remaining[0].id);
        else handleNewChat();
      }
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  // Run pre-flight prompt analysis, refinement, and model recommendation
  const runPreflight = async (text) => {
    if (!text || text.trim().length < 3) return;
    setIsPreflightLoading(true);
    setCurrentPipelineStage('analyze');

    try {
      const data = await api.preflightPrompt(text);
      setPreflightData(data);
      setCurrentPipelineStage('refine');
      
      // If in Auto Mode, auto-apply top recommendation
      if (activeMode === 'auto' && data.recommendations?.topRecommendation) {
        setSelectedModelIds([data.recommendations.topRecommendation.modelId]);
      }
    } catch (err) {
      console.error('Preflight analysis error:', err);
    } finally {
      setIsPreflightLoading(false);
    }
  };

  // Toggle model selection
  const handleToggleModel = (modelId) => {
    if (activeMode === 'single') {
      setSelectedModelIds([modelId]);
    } else {
      if (selectedModelIds.includes(modelId)) {
        if (selectedModelIds.length > 1) {
          setSelectedModelIds(selectedModelIds.filter(id => id !== modelId));
        }
      } else {
        setSelectedModelIds([...selectedModelIds, modelId]);
      }
    }
  };

  // Handle Document Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const doc = await api.uploadDocument(file);
      setAttachedDoc(doc);
    } catch (err) {
      alert('File upload error: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // MAIN SUBMIT ACTION: Full Loop Execution
  const handleSendPrompt = async () => {
    const promptToSend = inputPrompt.trim();
    if (!promptToSend || isGenerating) return;

    setIsGenerating(true);
    setCurrentPipelineStage('generate');

    try {
      // 1. Ensure Preflight is completed
      let pf = preflightData;
      if (!pf) {
        pf = await api.preflightPrompt(promptToSend);
        setPreflightData(pf);
      }

      // 2. Ensure Conversation Exists
      let convId = activeConversationId;
      if (!convId) {
        const newConv = await api.createConversation(promptToSend.substring(0, 35));
        convId = newConv.id;
        setActiveConversationId(convId);
      }

      // 3. Parallel Multi-Model Generation
      const targetModelIds = selectedModelIds.length > 0 ? selectedModelIds : ['gemini-2-0-flash', 'llama-3-3-70b'];
      const genResult = await api.generateResponses({
        prompt: pf.refinement?.refinedPrompt || promptToSend,
        modelIds: targetModelIds,
        conversationId: convId,
        documentContext: attachedDoc ? attachedDoc.fullText : ''
      });

      setCurrentPipelineStage('compare');

      // 4. Evidence-Based Critic AI Evaluation
      let criticResult = null;
      if (genResult.responses && genResult.responses.length >= 1) {
        setCurrentPipelineStage('critic');
        criticResult = await api.criticEvaluate({
          originalPrompt: promptToSend,
          refinedPrompt: pf.refinement?.refinedPrompt || promptToSend,
          responses: genResult.responses,
          weights: criticWeights,
          analysis: pf.analysis,
          documentContext: attachedDoc ? attachedDoc.fullText : ''
        });
      }

      // 5. Default Winning Selection
      const defaultSelectedId = criticResult?.winner?.modelId || genResult.responses[0]?.modelId;

      // 6. Save Turn to Backend Shared Memory
      const saveRes = await api.saveTurn(convId, {
        userPrompt: promptToSend,
        refinedPrompt: pf.refinement?.refinedPrompt || promptToSend,
        analysis: pf.analysis,
        breakdown: pf.refinement?.breakdown,
        recommendations: pf.recommendations,
        responses: genResult.responses,
        criticEvaluation: criticResult,
        selectedModelId: defaultSelectedId
      });

      // 7. Refresh Conversation
      await loadConversation(convId);
      await loadConversations();

      // Reset prompt composer
      setInputPrompt('');
      setAttachedDoc(null);
      setCurrentPipelineStage('branch');

      // Auto scroll
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      alert('Workflow execution error: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Switch Active Branch
  const handleSelectBranch = async (turnId, modelId) => {
    if (!activeConversationId) return;
    try {
      await api.selectBranch(activeConversationId, turnId, modelId);
      await loadConversation(activeConversationId);
    } catch (err) {
      console.error('Failed to select branch:', err);
    }
  };

  // Synthesis Action
  const handleSynthesizeTurn = async (turn) => {
    if (!activeConversationId || isSynthesizing) return;
    setIsSynthesizing(true);
    try {
      const synthesis = await api.synthesize({
        originalPrompt: turn.userPrompt,
        refinedPrompt: turn.refinedPrompt,
        responses: turn.responses,
        criticEvaluation: turn.criticEvaluation
      });

      await api.saveSynthesis(activeConversationId, turn.turnId, synthesis);
      await loadConversation(activeConversationId);
    } catch (err) {
      alert('Synthesis error: ' + err.message);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="workspace-container">
      {/* 1. LEFT SIDEBAR */}
      <aside className="workspace-sidebar glass-panel">
        <div className="sidebar-top">
          <button className="btn btn-primary btn-sm w-full" onClick={handleNewChat}>
            <Plus size={16} />
            <span>New Hive Mind Chat</span>
          </button>

          {/* Search */}
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input 
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="conversations-list">
          <div className="sidebar-section-title">Past Sessions</div>
          {filteredConversations.length === 0 ? (
            <div className="empty-history-text">No matching sessions found</div>
          ) : (
            filteredConversations.map(c => (
              <div 
                key={c.id} 
                className={`conv-item ${c.id === activeConversationId ? 'active' : ''}`}
                onClick={() => loadConversation(c.id)}
              >
                <div className="conv-item-left">
                  <span className="conv-title">{c.title}</span>
                  <span className="conv-turns-badge">{c.turnCount || 0} turn(s)</span>
                </div>
                <button 
                  className="btn-icon delete-conv-btn"
                  onClick={(e) => handleDeleteConversation(e, c.id)}
                  title="Delete Session"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="sidebar-footer">
          <button 
            className={`btn btn-secondary btn-sm w-full ${showBranchTree ? 'active-tree-btn' : ''}`}
            onClick={() => setShowBranchTree(!showBranchTree)}
          >
            <GitBranch size={15} className="text-emerald" />
            <span>{showBranchTree ? 'Hide Branch Tree' : 'View Memory Branches'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CHAT AREA */}
      <main className="workspace-main">
        {/* Main Header / Banner */}
        <div className="main-chat-header glass-panel">
          <div className="header-left">
            <h2 className="current-chat-title">{activeConversation?.title || 'New Hive Mind Chat'}</h2>
            <div className="mode-toggle-group">
              <span className="mode-label">Mode:</span>
              <button 
                className={`mode-chip ${activeMode === 'auto' ? 'active' : ''}`}
                onClick={() => setActiveMode('auto')}
                title="Auto analyzes prompt and picks optimal model"
              >
                Auto Recommend
              </button>
              <button 
                className={`mode-chip ${activeMode === 'single' ? 'active' : ''}`}
                onClick={() => { setActiveMode('single'); if (selectedModelIds.length > 1) setSelectedModelIds([selectedModelIds[0]]); }}
                title="Explicit single model execution"
              >
                Single Model
              </button>
              <button 
                className={`mode-chip ${activeMode === 'compare' ? 'active' : ''}`}
                onClick={() => setActiveMode('compare')}
                title="Parallel multi-model comparison with Critic AI"
              >
                Multi-Model Arena
              </button>
            </div>
          </div>

          <div className="header-right">
            <button 
              className={`btn btn-secondary btn-sm ${showAnalysisPanel ? 'active-panel-btn' : ''}`}
              onClick={() => setShowAnalysisPanel(!showAnalysisPanel)}
            >
              <BrainCircuit size={15} className="text-cyan" />
              <span>{showAnalysisPanel ? 'Hide Intelligence Panel' : 'Show Intelligence Panel'}</span>
            </button>
          </div>
        </div>

        {/* Workflow Stage Tracker */}
        <WorkflowPipeline 
          currentStage={currentPipelineStage} 
          onStageClick={(stage) => {
            if (['analyze', 'refine', 'breakdown', 'recommend'].includes(stage)) {
              setShowAnalysisPanel(true);
            }
          }}
        />

        {/* Memory Branch Viewer (If Toggled) */}
        {showBranchTree && (
          <BranchViewer 
            conversation={activeConversation}
            onSelectBranch={handleSelectBranch}
          />
        )}

        {/* Messages Scroll Area */}
        <div className="chat-messages-container">
          {(!activeConversation?.turns || activeConversation.turns.length === 0) ? (
            <div className="chat-welcome-box glass-panel">
              <div className="welcome-avatar">🧠</div>
              <h3>Welcome to AI Hive Mind</h3>
              <p>
                Enter a question or coding prompt below. The platform will analyze its intent, refine the specifications, 
                dispatch it across your selected AI models concurrently, and provide a comprehensive <strong>Critic AI evaluation</strong>.
              </p>
              <div className="quick-benchmark-row">
                <span className="quick-label">Try primary benchmark:</span>
                <button 
                  className="quick-btn"
                  onClick={() => {
                    const p = "Write a C program to check whether a number is prime and explain the logic.";
                    setInputPrompt(p);
                    runPreflight(p);
                  }}
                >
                  ⚡ "Write a C program to check whether a number is prime..."
                </button>
              </div>
            </div>
          ) : (
            activeConversation.turns.map((turn, index) => (
              <div key={turn.turnId || index} className="conversation-turn-block">
                {/* User Message Card */}
                <div className="user-message-card glass-panel">
                  <div className="msg-header">
                    <span className="msg-author">You</span>
                    <span className="msg-time">{new Date(turn.timestamp || Date.now()).toLocaleTimeString()}</span>
                  </div>
                  <div className="msg-text">{turn.userPrompt}</div>

                  {turn.refinedPrompt && turn.refinedPrompt !== turn.userPrompt && (
                    <div className="refined-tag-box">
                      <Sparkles size={12} className="text-cyan" />
                      <span>Executed via Refined Specifications</span>
                    </div>
                  )}
                </div>

                {/* Multi-Model Comparison Arena & Critic AI */}
                <ComparisonView 
                  turnData={turn}
                  onSelectBranch={(modelId) => handleSelectBranch(turn.turnId, modelId)}
                  onSynthesize={() => handleSynthesizeTurn(turn)}
                  isSynthesizing={isSynthesizing}
                  activeSelectedModelId={turn.selectedModelId}
                />
              </div>
            ))
          )}

          {isGenerating && (
            <div className="generating-indicator glass-panel">
              <Loader2 size={20} className="animate-spin text-cyan" />
              <div>
                <strong>Generating Parallel Model Responses & Running Critic AI...</strong>
                <p>Calling {selectedModelIds.join(', ')} simultaneously</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. BOTTOM COMPOSER AREA */}
        <div className="composer-container glass-panel">
          {/* Model Selection Chips Bar */}
          <div className="models-select-bar">
            <span className="select-bar-label">Active Models:</span>
            <div className="models-chips-scroll">
              {models.map(m => {
                const isSelected = selectedModelIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    className={`model-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleModel(m.id)}
                    title={`${m.name} (${m.provider}) - ${m.description}`}
                  >
                    <span className="status-dot active"></span>
                    <span className="pill-avatar">{m.avatar}</span>
                    <span className="pill-name">{m.name}</span>
                    {isSelected ? <CheckSquare size={13} className="text-cyan" /> : <Square size={13} className="text-dim" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attached Document Preview */}
          {attachedDoc && (
            <div className="attached-doc-chip">
              <FileText size={14} className="text-cyan" />
              <span>{attachedDoc.filename} ({attachedDoc.charCount} chars)</span>
              <button className="btn-icon" onClick={() => setAttachedDoc(null)}>
                <X size={13} />
              </button>
            </div>
          )}

          {/* Main Input Box */}
          <div className="composer-input-row">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".txt,.pdf,.docx,.md,.json"
              onChange={handleFileUpload} 
            />
            <button 
              className="btn-icon attach-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              title="Attach Document (PDF, DOCX, TXT)"
            >
              {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Paperclip size={18} />}
            </button>

            <textarea
              className="composer-textarea"
              placeholder="Enter your prompt... (e.g. 'Write a C program to check whether a number is prime and explain the logic.')"
              rows={2}
              value={inputPrompt}
              onChange={(e) => {
                setInputPrompt(e.target.value);
                if (e.target.value.length > 5 && e.target.value.endsWith(' ')) {
                  runPreflight(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendPrompt();
                }
              }}
            />

            <button 
              className="btn btn-secondary btn-icon preflight-btn"
              onClick={() => runPreflight(inputPrompt)}
              disabled={isPreflightLoading || !inputPrompt.trim()}
              title="Analyze & Refine Prompt"
            >
              <Sparkles size={17} className={isPreflightLoading ? 'animate-spin text-cyan' : 'text-cyan'} />
            </button>

            <button 
              className="btn btn-primary send-btn"
              onClick={handleSendPrompt}
              disabled={isGenerating || !inputPrompt.trim()}
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              <span>Send</span>
            </button>
          </div>
        </div>
      </main>

      {/* 4. RIGHT EXPANDABLE PROMPT INTELLIGENCE PANEL */}
      {showAnalysisPanel && (
        <PromptAnalysisPanel
          analysis={preflightData?.analysis}
          refinement={preflightData?.refinement}
          recommendations={preflightData?.recommendations}
          onUseRefined={(refined) => {
            if (refined) {
              setInputPrompt(refined);
              runPreflight(refined);
            }
          }}
          onUseOriginal={(orig) => {
            if (orig) setInputPrompt(orig);
          }}
          onSelectRecommendedModels={(ids) => {
            setSelectedModelIds(ids);
          }}
          onClose={() => setShowAnalysisPanel(false)}
        />
      )}

      <style>{`
        .workspace-container {
          display: flex;
          height: calc(100vh - 65px);
          overflow: hidden;
          position: relative;
        }
        .workspace-sidebar {
          width: 280px;
          border-right: 1px solid var(--border-subtle);
          background: rgba(10, 14, 22, 0.95);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-radius: 0;
        }
        .sidebar-top {
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .search-icon {
          color: var(--text-muted);
        }
        .search-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 0.8rem;
          outline: none;
          width: 100%;
        }
        .conversations-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .sidebar-section-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.5rem;
        }
        .empty-history-text {
          font-size: 0.75rem;
          color: var(--text-dim);
          padding: 1rem 0.5rem;
          text-align: center;
        }
        .conv-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .conv-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .conv-item.active {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .conv-item-left {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          overflow: hidden;
        }
        .conv-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 190px;
        }
        .conv-turns-badge {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
        .delete-conv-btn {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .conv-item:hover .delete-conv-btn {
          opacity: 1;
        }
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-subtle);
        }
        .active-tree-btn {
          background: rgba(16, 185, 129, 0.15) !important;
          border-color: rgba(16, 185, 129, 0.4) !important;
        }
        .workspace-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 1rem 1.5rem;
          gap: 0.85rem;
        }
        .main-chat-header {
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-md);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .current-chat-title {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .mode-toggle-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .mode-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .mode-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mode-chip:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .mode-chip.active {
          background: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.4);
          color: #67e8f9;
        }
        .active-panel-btn {
          background: rgba(6, 182, 212, 0.15) !important;
          border-color: rgba(6, 182, 212, 0.4) !important;
        }
        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-right: 0.5rem;
        }
        .chat-welcome-box {
          margin: 3rem auto;
          max-width: 650px;
          text-align: center;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .welcome-avatar {
          font-size: 3rem;
        }
        .chat-welcome-box h3 {
          font-size: 1.5rem;
        }
        .chat-welcome-box p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .quick-benchmark-row {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .quick-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .quick-btn {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.35);
          color: #c7d2fe;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.825rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-btn:hover {
          background: rgba(99, 102, 241, 0.25);
          transform: translateY(-1px);
        }
        .conversation-turn-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .user-message-card {
          padding: 1.1rem 1.25rem;
          border-left: 3px solid var(--accent-primary);
        }
        .msg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }
        .msg-author {
          font-weight: 700;
          color: #a5b4fc;
        }
        .msg-text {
          font-size: 0.95rem;
          color: #fff;
          line-height: 1.5;
        }
        .refined-tag-box {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.6rem;
          font-size: 0.72rem;
          color: #67e8f9;
          background: rgba(6, 182, 212, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .generating-indicator {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-color: rgba(6, 182, 212, 0.3);
          background: rgba(6, 182, 212, 0.05);
        }
        .generating-indicator strong {
          color: #fff;
          font-size: 0.9rem;
        }
        .generating-indicator p {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
        .composer-container {
          padding: 0.85rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }
        .models-select-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .select-bar-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .models-chips-scroll {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .model-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .model-pill:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
        .model-pill.selected {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.4);
          color: #fff;
        }
        .attached-doc-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: #67e8f9;
          width: fit-content;
        }
        .composer-input-row {
          display: flex;
          align-items: flex-end;
          gap: 0.6rem;
        }
        .composer-textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          line-height: 1.5;
          outline: none;
          resize: none;
          max-height: 120px;
        }
        .attach-btn, .preflight-btn {
          padding: 0.5rem;
          margin-bottom: 0.2rem;
        }
        .send-btn {
          padding: 0.6rem 1.25rem;
          margin-bottom: 0.2rem;
        }
      `}</style>
    </div>
  );
}
