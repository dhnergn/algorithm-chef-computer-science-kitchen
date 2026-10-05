import React from 'react';
import { InstructionBlock } from '../types/game';
import { LanguageCode } from '../types/i18n';
import { TRANSLATIONS } from '../data/translations';
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Repeat,
  HelpCircle,
  Code2,
  Play,
  RotateCcw,
  PlusCircle,
  AlertCircle
} from 'lucide-react';

interface TimelineEditorProps {
  blocks: InstructionBlock[];
  activeInstructionId: string | null;
  errorInstructionId: string | null;
  errorMessage?: string;
  onUpdateBlocks: (blocks: InstructionBlock[]) => void;
  onClear: () => void;
  language?: LanguageCode;
}

export const TimelineEditor: React.FC<TimelineEditorProps> = ({
  blocks,
  activeInstructionId,
  errorInstructionId,
  errorMessage,
  onUpdateBlocks,
  onClear,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  // Move block up or down
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onUpdateBlocks(updated);
  };

  // Remove block
  const removeBlock = (index: number) => {
    const updated = blocks.filter((_, i) => i !== index);
    onUpdateBlocks(updated);
  };

  // Update repeat count
  const updateRepeatCount = (index: number, count: number) => {
    const updated = [...blocks];
    updated[index] = {
      ...updated[index],
      params: { ...updated[index].params, count: Math.max(1, Math.min(10, count)) }
    };
    onUpdateBlocks(updated);
  };

  // Update condition
  const updateCondition = (index: number, condition: string) => {
    const updated = [...blocks];
    updated[index] = {
      ...updated[index],
      params: { ...updated[index].params, condition }
    };
    onUpdateBlocks(updated);
  };

  // Add child block into loop/condition
  const addChildToBlock = (parentIndex: number, childType: 'chop' | 'cook' | 'move_right' | 'grab' | 'place') => {
    const updated = [...blocks];
    const parent = updated[parentIndex];
    const childBlock: InstructionBlock = {
      id: `child_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type: childType,
      category: childType === 'chop' || childType === 'cook' || childType === 'grab' || childType === 'place' ? 'action' : 'movement',
      label: childType === 'chop' ? 'Chop Veggie' : childType === 'cook' ? 'Sizzle Heat' : childType === 'move_right' ? 'Move Right' : childType === 'grab' ? 'Grab' : 'Place',
      description: 'Nested step',
      iconName: childType
    };

    parent.children = [...(parent.children || []), childBlock];
    onUpdateBlocks(updated);
  };

  const removeChildFromBlock = (parentIndex: number, childIndex: number) => {
    const updated = [...blocks];
    const parent = updated[parentIndex];
    if (parent.children) {
      parent.children = parent.children.filter((_, i) => i !== childIndex);
      onUpdateBlocks(updated);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-stone-200/80 shadow-xs p-3 overflow-hidden">
      {/* Timeline Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <span>{t.timeline.title}</span>
            <span className="text-[11px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded-full">
              {blocks.length} {t.timeline.stepCount}
            </span>
          </h3>
          <p className="text-[11px] text-stone-500">
            {t.timeline.hint}
          </p>
        </div>

        {blocks.length > 0 && (
          <button
            onClick={onClear}
            className="text-[11px] font-medium text-stone-500 hover:text-rose-600 transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-rose-50 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.actions.clear}</span>
          </button>
        )}
      </div>

      {/* Timeline Instructions Container */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {blocks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-stone-200 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <p className="text-xs font-semibold text-stone-700">{t.timeline.title}</p>
            <p className="text-[11px] text-stone-500 max-w-[200px] mt-1">
              {t.timeline.emptyPlaceholder}
            </p>
          </div>
        ) : (
          blocks.map((block, idx) => {
            const isActive = activeInstructionId === block.id;
            const isError = errorInstructionId === block.id;
            const isLoop = block.type === 'repeat_times';
            const isCondition = block.type === 'if_condition' || block.type === 'if_else_condition';

            return (
              <div
                key={block.id}
                className={`relative rounded-xl border transition-all duration-150 p-2.5 ${
                  isError
                    ? 'border-rose-500 bg-rose-50/90 shadow-md ring-2 ring-rose-400'
                    : isActive
                    ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-300'
                    : 'border-stone-200 bg-stone-50/80 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                {/* Pointer Badge for active execution */}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center text-[9px] shadow animate-pulse">
                    ▶
                  </div>
                )}

                {/* Top Row: Index, Block Label, Controls */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] font-mono font-bold text-stone-600 bg-white px-1.5 py-0.5 rounded border border-stone-200 shadow-xs">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-stone-800 truncate">
                      {block.label}
                    </span>
                  </div>

                  {/* Reordering & Delete Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveBlock(idx, 'up')}
                      className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 rounded hover:bg-white cursor-pointer"
                      title="Move up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === blocks.length - 1}
                      onClick={() => moveBlock(idx, 'down')}
                      className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 rounded hover:bg-white cursor-pointer"
                      title="Move down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeBlock(idx)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded hover:bg-white cursor-pointer"
                      title="Remove block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Config parameters for Loop */}
                {isLoop && (
                  <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-orange-700">
                      <Repeat className="w-3.5 h-3.5" />
                      <span>Repeat:</span>
                      <select
                        value={block.params?.count || 3}
                        onChange={(e) => updateRepeatCount(idx, parseInt(e.target.value))}
                        className="bg-white border border-orange-200 rounded px-1.5 py-0.5 text-xs font-bold text-orange-800 cursor-pointer shadow-xs"
                      >
                        {[2, 3, 4, 5, 6, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} times
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quick add child action */}
                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-stone-600">Add inner:</span>
                      <button
                        onClick={() => addChildToBlock(idx, 'chop')}
                        className="px-1.5 py-0.5 rounded bg-white border border-stone-200 hover:border-teal-400 text-stone-700 text-[10px] font-bold cursor-pointer"
                      >
                        + Chop
                      </button>
                      <button
                        onClick={() => addChildToBlock(idx, 'cook')}
                        className="px-1.5 py-0.5 rounded bg-white border border-stone-200 hover:border-amber-400 text-stone-700 text-[10px] font-bold cursor-pointer"
                      >
                        + Sizzle
                      </button>
                    </div>
                  </div>
                )}

                {/* Config parameters for Conditionals */}
                {isCondition && (
                  <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-purple-700">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>When:</span>
                      <select
                        value={block.params?.condition || 'pan_is_hot'}
                        onChange={(e) => updateCondition(idx, e.target.value)}
                        className="bg-white border border-purple-200 rounded px-1.5 py-0.5 text-xs font-bold text-purple-800 cursor-pointer shadow-xs"
                      >
                        <option value="pan_is_hot">Pan Is Hot</option>
                        <option value="holds_item">Holds Item</option>
                        <option value="needs_chopping">Needs Chopping</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-stone-600">Then:</span>
                      <button
                        onClick={() => addChildToBlock(idx, 'cook')}
                        className="px-1.5 py-0.5 rounded bg-white border border-stone-200 hover:border-purple-400 text-stone-700 text-[10px] font-bold cursor-pointer"
                      >
                        + Cook
                      </button>
                      <button
                        onClick={() => addChildToBlock(idx, 'grab')}
                        className="px-1.5 py-0.5 rounded bg-white border border-stone-200 hover:border-emerald-400 text-stone-700 text-[10px] font-bold cursor-pointer"
                      >
                        + Grab
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested Child Blocks Display */}
                {block.children && block.children.length > 0 && (
                  <div className="mt-2 pl-3 ml-2 border-l-2 border-orange-400 space-y-1.5">
                    {block.children.map((child, cIdx) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between bg-white rounded-lg p-1.5 border border-stone-200 text-xs shadow-xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-stone-600 font-medium">↳</span>
                          <span className="font-semibold text-stone-700">{child.label}</span>
                        </div>
                        <button
                          onClick={() => removeChildFromBlock(idx, cIdx)}
                          className="text-stone-400 hover:text-rose-500 p-0.5 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error Banner when debugger catches a failure */}
                {isError && errorMessage && (
                  <div className="mt-2 p-2 rounded-lg bg-rose-100 border border-rose-300 text-rose-800 text-[11px] flex items-start gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Execution Paused Here:</span> {errorMessage}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
