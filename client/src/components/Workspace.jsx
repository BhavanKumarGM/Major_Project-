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
  Square,
  Compass
} from 'lucide-react';
import { api } from '../services/api.js';
import WorkflowPipeline from './WorkflowPipeline.jsx';
import PromptAnalysisPanel from './PromptAnalysisPanel.jsx';
import ComparisonView from './ComparisonView.jsx';
import BranchViewer from './BranchViewer.jsx';
import { DecisionRunPanel, DecisionTurnPanel } from './DecisionPanel.jsx';
import TurnModelReasons, { shortModelReason } from './ModelReasons.jsx';

const JUDGE_PREF_KEY = 'hiveJudgeEnabled';

function readJudgePref() {
  try { return localStorage.getItem(JUDGE_PREF_KEY) === 'true'; } catch { return false; }
}

export default function Workspace({ 
  models = [],
  modelAvailability = {},
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

  // Execution Mode: 'single' (Decision Model picks one AI) | 'compare' (Multi AI arena)
  const [activeMode, setActiveMode] = useState('compare');
  const [selectedModelIds, setSelectedModelIds] = useState(['gemini-2-5-flash', 'llama-3-3-70b']);
  // Single AI: null = Decision Model chooses; a model id = manual override
  const [singleModelOverride, setSingleModelOverride] = useState(null);
  // Single AI run in progress or blocked: { stage, prompt, decision, error }
  const [singleRun, setSingleRun] = useState(null);
  // Optional LLM judge: an extra billable provider call, off unless the user turns it on
  const [judgeEnabled, setJudgeEnabled] = useState(readJudgePref);
  // A refined prompt the user accepted: sent as-is instead of being refined again
  const [adoptedRefinedPrompt, setAdoptedRefinedPrompt] = useState(null);
  const [isImprovingWithAI, setIsImprovingWithAI] = useState(false);
  // Explains an automatic model switch made after a refined prompt was accepted
  const [modelSwitchNotice, setModelSwitchNotice] = useState(null);

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
  // Turn being re-graded with the LLM judge, and the last error from doing so
  const [judgeCheck, setJudgeCheck] = useState({ turnId: null, error: null });

  const messagesEndRef = useRef(null);

  // After a reply arrives, show the start of the new message (question, why these models, then the answers)
  // rather than the bottom of a long answer
  const scrollToLatestTurn = () => {
    const turns = document.querySelectorAll('.chat-messages-container .conversation-turn-block');
    const latest = turns[turns.length - 1];
    if (latest) latest.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
        setSingleModelOverride(initialModelIds[0]);
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

    } catch (err) {
      console.error('Preflight analysis error:', err);
    } finally {
      setIsPreflightLoading(false);
    }
  };

  const handleToggleJudge = () => {
    const next = !judgeEnabled;
    setJudgeEnabled(next);
    try { localStorage.setItem(JUDGE_PREF_KEY, String(next)); } catch { /* storage unavailable */ }
  };

  // Toggle model selection
  // Inputs for explaining why a model fits: recommendations for the analysed prompt (if any) and key status
  const reasonContext = {
    recommendations: preflightData?.recommendations?.models || [],
    category: preflightData?.analysis?.primaryCategory || null,
    availability: modelAvailability,
    selectedIds: activeMode === 'single' ? (singleModelOverride ? [singleModelOverride] : []) : selectedModelIds
  };

  const handleToggleModel = (modelId) => {
    if (activeMode === 'single') {
      setSingleModelOverride(singleModelOverride === modelId ? null : modelId);
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

  // SINGLE AI MODE: preflight → Decision Model → one generation + Critic + save (server)
  const isAdopted = (text) => !!adoptedRefinedPrompt && text === adoptedRefinedPrompt.trim();

  // Opt-in AI rewrite of the current prompt (one billable call on the server)
  const handleImproveWithAI = async () => {
    const text = inputPrompt.trim();
    if (!text || isImprovingWithAI) return;
    setIsImprovingWithAI(true);
    try {
      const data = await api.refinePromptAI({ prompt: text });
      setPreflightData(prev => ({ ...(prev || {}), analysis: data.analysis, refinement: data.refinement }));
      setShowAnalysisPanel(true);
    } catch (err) {
      alert('AI refinement error: ' + err.message);
    } finally {
      setIsImprovingWithAI(false);
    }
  };

  // After a refined prompt is accepted, re-rank models on that text and switch to the best available ones
  const applyBestModelsFor = async (text) => {
    try {
      const pf = await api.preflightPrompt(text, { skipRefinement: true });
      setPreflightData(pf);

      if (activeMode === 'single') {
        setSingleModelOverride(null);
        const { decision } = await api.decideModel({ prompt: text });
        setModelSwitchNotice(decision.status === 'selected'
          ? `For the refined prompt the Decision Model will use ${decision.selectedModelName}. ${decision.reason}`
          : decision.reason);
        return;
      }

      const best = (pf.recommendations?.models || []).filter(m => m.isAvailable).slice(0, 2);
      if (best.length === 0) {
        setModelSwitchNotice('No configured model has API credentials, so the model selection was not changed.');
        return;
      }
      setSelectedModelIds(best.map(m => m.id));
      setModelSwitchNotice(`For the refined prompt (${pf.analysis?.primaryCategory || 'General'}) switched to the best available model${best.length > 1 ? 's' : ''}: ` +
        best.map(m => `${m.name} (${m.recommendationScore}${m.observedPerformance?.applied ? `, avg Critic ${m.observedPerformance.avgScore} over ${m.observedPerformance.count} answers` : ''})`).join(' and ') + '.');
    } catch (err) {
      console.error('Model re-ranking failed:', err);
    }
  };

  const runSingleAI = async (promptToSend, { modelId = singleModelOverride, allowSimulation = false } = {}) => {
    if (!promptToSend || isGenerating) return;
    setIsGenerating(true);
    const docText = attachedDoc ? attachedDoc.fullText : null;
    const skipRefinement = isAdopted(promptToSend);

    try {
      setSingleRun({ stage: 'analyze', prompt: promptToSend });
      setCurrentPipelineStage('analyze');
      if (!skipRefinement && (!preflightData || preflightData.refinement?.originalPrompt !== promptToSend)) {
        setPreflightData(await api.preflightPrompt(promptToSend));
      }

      setSingleRun({ stage: 'select', prompt: promptToSend });
      setCurrentPipelineStage('select_model');
      const preview = await api.decideModel({ prompt: promptToSend, modelId, options: { allowSimulation } });
      if (preview.decision.status !== 'selected') {
        setSingleRun({ stage: 'blocked', prompt: promptToSend, modelId, decision: preview.decision });
        return;
      }

      setSingleRun({ stage: 'execute', prompt: promptToSend, decision: preview.decision });
      setCurrentPipelineStage('generate');
      const result = await api.decisionExecute({
        prompt: promptToSend,
        conversationId: activeConversationId,
        modelId,
        documentContext: docText,
        options: { enableLLMJudge: judgeEnabled, allowSimulation, skipRefinement }
      });

      if (!result.conversation) {
        // Availability changed between preview and execution
        setSingleRun({ stage: 'blocked', prompt: promptToSend, modelId, decision: result.decision });
        return;
      }

      setSingleRun(null);
      await loadConversation(result.conversation.id);
      await loadConversations();
      setInputPrompt('');
      setAttachedDoc(null);
      setCurrentPipelineStage(result.success ? 'critic' : 'generate');
      setTimeout(scrollToLatestTurn, 100);
    } catch (err) {
      setSingleRun({ stage: 'error', prompt: promptToSend, error: err.message });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetrySingle = (turn) => {
    runSingleAI(turn.userPrompt, { modelId: turn.decision?.selectionMethod === 'manual' ? turn.decision.selectedModelId : null });
  };

  const handleRunWithModel = (turn, modelId) => {
    setSingleModelOverride(modelId);
    runSingleAI(turn.userPrompt, { modelId });
  };

  const handleSwitchToMulti = (prompt) => {
    setActiveMode('compare');
    setSingleRun(null);
    if (prompt) setInputPrompt(prompt);
  };

  // MAIN SUBMIT ACTION: Full Loop Execution
  const handleSendPrompt = async () => {
    const promptToSend = inputPrompt.trim();
    if (!promptToSend || isGenerating) return;
    if (activeMode === 'single') return runSingleAI(promptToSend);

    setIsGenerating(true);
    setCurrentPipelineStage('generate');

    try {
      // 1. Ensure Preflight is completed
      // Re-run when the analysis belongs to older text (preflight runs while typing)
      let pf = preflightData;
      if (!pf || (!isAdopted(promptToSend) && pf.refinement?.originalPrompt !== promptToSend)) {
        pf = await api.preflightPrompt(promptToSend);
        setPreflightData(pf);
      }

      const refinedToSend = isAdopted(promptToSend) ? promptToSend : (pf.refinement?.refinedPrompt || promptToSend);

      // 2. Ensure Conversation Exists
      let convId = activeConversationId;
      if (!convId) {
        const newConv = await api.createConversation(promptToSend.substring(0, 35));
        convId = newConv.id;
        setActiveConversationId(convId);
      }

      // 3. Parallel Multi-Model Generation
      const targetModelIds = selectedModelIds.length > 0 ? selectedModelIds : ['gemini-2-5-flash', 'llama-3-3-70b'];
      const genResult = await api.generateResponses({
        prompt: refinedToSend,
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
          refinedPrompt: refinedToSend,
          responses: genResult.responses,
          weights: criticWeights,
          analysis: pf.analysis,
          documentContext: attachedDoc ? attachedDoc.fullText : '',
          options: { enableLLMJudge: judgeEnabled }
        });
      }

      // 5. Default Winning Selection
      const defaultSelectedId = criticResult?.winner?.modelId || genResult.responses[0]?.modelId;

      // 6. Save Turn to Backend Shared Memory
      const saveRes = await api.saveTurn(convId, {
        userPrompt: promptToSend,
        refinedPrompt: refinedToSend,
        analysis: pf.analysis,
        breakdown: pf.refinement?.breakdown,
        recommendations: pf.recommendations,
        responses: genResult.responses,
        criticEvaluation: criticResult,
        selectedModelId: defaultSelectedId,
        executionMode: 'multi'
      });

      // 7. Refresh Conversation
      await loadConversation(convId);
      await loadConversations();

      // Reset prompt composer
      setInputPrompt('');
      setAttachedDoc(null);
      setCurrentPipelineStage('branch');

      setTimeout(scrollToLatestTurn, 100);

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

  // Re-grade a saved turn with the LLM judge (user-triggered; one billable call per answer)
  const handleCheckWithJudge = async (turnId) => {
    if (!activeConversationId || judgeCheck.turnId) return;
    setJudgeCheck({ turnId, error: null });
    try {
      await api.reevaluateTurn(activeConversationId, turnId, { enableLLMJudge: true });
      await loadConversation(activeConversationId);
      setJudgeCheck({ turnId: null, error: null });
    } catch (err) {
      setJudgeCheck({ turnId: null, error: { turnId, message: err.message } });
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
              <span className="mode-label" id="exec-mode-label">Execution:</span>
              <div role="radiogroup" aria-labelledby="exec-mode-label" className="mode-toggle-group">
                <button
                  role="radio"
                  aria-checked={activeMode === 'single'}
                  className={`mode-chip ${activeMode === 'single' ? 'active' : ''}`}
                  onClick={() => setActiveMode('single')}
                  title="The Decision Model picks one AI, runs it and evaluates the answer"
                >
                  Single AI
                </button>
                <button
                  role="radio"
                  aria-checked={activeMode === 'compare'}
                  className={`mode-chip ${activeMode === 'compare' ? 'active' : ''}`}
                  onClick={() => { setActiveMode('compare'); setSingleRun(null); }}
                  title="Parallel multi-model comparison with Critic AI"
                >
                  Multi AI
                </button>
              </div>
              <label className="judge-toggle" title="Grades each answer with an extra LLM call, which can catch factual errors the rule checks miss. Uses Gemini 2.5 Flash, or the next model with an API key. Billable: one call per answer.">
                <input type="checkbox" checked={judgeEnabled} onChange={handleToggleJudge} />
                <span>LLM judge</span>
              </label>
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

                {/* Why the model(s) that answered this message were used */}
                <TurnModelReasons turn={turn} models={models} />

                {turn.executionMode === 'single' && (
                  <DecisionTurnPanel
                    turn={turn}
                    disabled={isGenerating}
                    onRetry={handleRetrySingle}
                    onRunWithModel={handleRunWithModel}
                    onSwitchToMulti={(t) => handleSwitchToMulti(t.userPrompt)}
                  />
                )}

                {/* Multi-Model Comparison Arena & Critic AI */}
                <ComparisonView  
                  turnData={turn}
                  onSelectBranch={(modelId) => handleSelectBranch(turn.turnId, modelId)}
                  onSynthesize={() => handleSynthesizeTurn(turn)}
                  isSynthesizing={isSynthesizing}
                  activeSelectedModelId={turn.selectedModelId}
                  onCheckWithJudge={() => handleCheckWithJudge(turn.turnId)}
                  isCheckingWithJudge={judgeCheck.turnId === turn.turnId}
                  judgeCheckError={judgeCheck.error?.turnId === turn.turnId ? judgeCheck.error.message : null}
                />
              </div>
            ))
          )}

          {activeMode === 'single' && singleRun && (
            <DecisionRunPanel
              run={singleRun}
              onRunSimulation={() => runSingleAI(singleRun.prompt, { modelId: singleRun.modelId ?? singleModelOverride, allowSimulation: true })}
              onOpenSettings={onOpenSettings}
              onSwitchToMulti={() => handleSwitchToMulti(singleRun.prompt)}
              onDismiss={() => setSingleRun(null)}
            />
          )}

          {isGenerating && activeMode !== 'single' && (
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
          {modelSwitchNotice && (
            <div className="model-switch-notice" role="status">
              <Compass size={14} className="text-cyan" aria-hidden="true" />
              <span>{modelSwitchNotice}</span>
              <button className="btn-icon" onClick={() => setModelSwitchNotice(null)} aria-label="Dismiss notice">
                <X size={13} />
              </button>
            </div>
          )}

          {/* Model Selection Chips Bar */}
          <div className="models-select-bar">
            <span className="select-bar-label">{activeMode === 'single' ? 'AI Model:' : 'Active Models:'}</span>
            <div className="models-chips-scroll">
              {activeMode === 'single' && (
                <button
                  className={`model-pill ${singleModelOverride === null ? 'selected' : ''}`}
                  onClick={() => setSingleModelOverride(null)}
                  title="Let the Decision Model choose the most suitable configured model"
                  aria-pressed={singleModelOverride === null}
                >
                  <Compass size={13} className="text-cyan" />
                  <span className="pill-name">Auto (Decision Model)</span>
                </button>
              )}
              {models.map(m => {
                const isSelected = activeMode === 'single' ? singleModelOverride === m.id : selectedModelIds.includes(m.id);
                const canAnswer = modelAvailability[m.id] !== false;
                return (
                  <button
                    key={m.id}
                    className={`model-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleModel(m.id)}
                    title={shortModelReason(m, reasonContext)}
                    aria-pressed={isSelected}
                  >
                    <span className={`status-dot ${canAnswer ? 'active' : 'idle'}`} aria-label={canAnswer ? 'Can answer' : 'No API key'}></span>
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
              // Already refined: keep the analysis and send this text without refining it again
              setInputPrompt(refined);
              setAdoptedRefinedPrompt(refined);
              applyBestModelsFor(refined);
            }
          }}
          onImproveWithAI={handleImproveWithAI}
          isImprovingWithAI={isImprovingWithAI}
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
        .model-switch-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.25);
          border-radius: var(--radius-sm);
          padding: 0.45rem 0.65rem;
          margin-bottom: 0.55rem;
        }
        .model-switch-notice span { flex: 1; line-height: 1.4; }
        .judge-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-left: 0.6rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .judge-toggle input { accent-color: var(--accent-primary); }
        .workspace-container {
          display: flex;
          height: calc(100vh - 65px);
          overflow: hidden;
          position: relative;
        }
        .workspace-sidebar {
          width: 280px;
          border-right: 1px solid var(--border-subtle);
          background: rgba(var(--surface-rgb, 10, 14, 22), 0.95);
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
          background: rgba(var(--shade-rgb, 0, 0, 0), 0.3);
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
          color: var(--text-strong, #fff);
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
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.05);
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
          color: var(--text-strong, #fff);
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
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.05);
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
          color: var(--text-strong, #fff);
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.1);
        }
        .mode-chip.active {
          background: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.4);
          color: var(--tint-cyan, #67e8f9);
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
          color: var(--tint-indigo, #c7d2fe);
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
          color: var(--tint-indigo, #a5b4fc);
        }
        .msg-text {
          font-size: 0.95rem;
          color: var(--text-strong, #fff);
          line-height: 1.5;
        }
        .refined-tag-box {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.6rem;
          font-size: 0.72rem;
          color: var(--tint-cyan, #67e8f9);
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
          color: var(--text-strong, #fff);
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
          min-width: 0;
        }
        .select-bar-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .models-chips-scroll {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          flex: 1;
          min-width: 0;
          padding-bottom: 0.2rem;
          scrollbar-width: thin;
        }
        .model-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.04);
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
          color: var(--text-strong, #fff);
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.08);
        }
        .model-pill.selected {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.4);
          color: var(--text-strong, #fff);
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
          color: var(--tint-cyan, #67e8f9);
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
          color: var(--text-strong, #fff);
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
