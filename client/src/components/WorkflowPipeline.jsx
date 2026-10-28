import React from 'react';
import { 
  Sparkles, 
  Search, 
  Wand2, 
  ListTree, 
  Bot, 
  CheckSquare, 
  Zap, 
  Layers, 
  Scale, 
  GitBranch, 
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export default function WorkflowPipeline({ currentStage, onStageClick }) {
  const stages = [
    { id: 'prompt', label: 'Prompt', icon: Sparkles },
    { id: 'analyze', label: 'Analyze', icon: Search },
    { id: 'refine', label: 'Refine', icon: Wand2 },
    { id: 'breakdown', label: 'Breakdown', icon: ListTree },
    { id: 'recommend', label: 'Recommend', icon: Bot },
    { id: 'select_model', label: 'Select', icon: CheckSquare },
    { id: 'generate', label: 'Generate', icon: Zap },
    { id: 'compare', label: 'Compare', icon: Layers },
    { id: 'critic', label: 'Critic AI', icon: Scale },
    { id: 'branch', label: 'Active Branch', icon: GitBranch }
  ];

  // Stage order index for state calculation
  const stageOrder = stages.map(s => s.id);
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="pipeline-wrapper glass-panel">
      <div className="pipeline-inner">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          let status = 'waiting';
          if (idx < currentIndex) status = 'completed';
          else if (idx === currentIndex) status = 'active';

          return (
            <React.Fragment key={stage.id}>
              <div 
                className={`stage-item ${status}`}
                onClick={() => onStageClick && onStageClick(stage.id)}
                title={`Stage: ${stage.label} (${status})`}
              >
                <div className="stage-icon-wrap">
                  {status === 'active' ? (
                    <Loader2 size={14} className="animate-spin active-spinner" />
                  ) : status === 'completed' ? (
                    <CheckCircle2 size={14} className="completed-check" />
                  ) : (
                    <Icon size={14} />
                  )}
                </div>
                <span className="stage-label">{stage.label}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className={`stage-connector ${idx < currentIndex ? 'completed' : ''}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        .pipeline-wrapper {
          padding: 0.65rem 1.25rem;
          margin-bottom: 1rem;
          border-radius: var(--radius-md);
          overflow-x: auto;
        }
        .pipeline-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 800px;
          gap: 0.5rem;
        }
        .stage-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .stage-icon-wrap {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          transition: all 0.25s ease;
        }
        .stage-item.waiting {
          opacity: 0.45;
        }
        .stage-item.waiting .stage-icon-wrap {
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.06);
          color: var(--text-dim);
          border: 1px solid var(--border-subtle);
        }
        .stage-item.waiting .stage-label {
          color: var(--text-dim);
        }
        .stage-item.active {
          opacity: 1;
        }
        .stage-item.active .stage-icon-wrap {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 0 12px var(--accent-glow);
          transform: scale(1.1);
        }
        .stage-item.active .stage-label {
          color: var(--text-strong, #fff);
          font-weight: 700;
        }
        .stage-item.completed {
          opacity: 0.9;
        }
        .stage-item.completed .stage-icon-wrap {
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-emerald);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .stage-item.completed .stage-label {
          color: var(--text-secondary);
        }
        .stage-label {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .stage-connector {
          flex: 1;
          height: 2px;
          background: rgba(var(--overlay-rgb, 255, 255, 255), 0.08);
          min-width: 14px;
          transition: all 0.3s ease;
        }
        .stage-connector.completed {
          background: var(--accent-emerald);
        }
      `}</style>
    </div>
  );
}
