import React, { useState } from 'react';
import { CustomFunction, InstructionBlock } from '../types/game';
import { X, Plus, Trash2, Code2, Scissors, Flame, ArrowRight, FolderDown } from 'lucide-react';

interface FunctionBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customFunctions: CustomFunction[];
  onSaveFunctions: (functions: CustomFunction[]) => void;
}

export const FunctionBuilderModal: React.FC<FunctionBuilderModalProps> = ({
  isOpen,
  onClose,
  customFunctions,
  onSaveFunctions
}) => {
  const [functions, setFunctions] = useState<CustomFunction[]>(customFunctions);
  const [selectedFnIndex, setSelectedFnIndex] = useState<number>(0);
  const [newFnName, setNewFnName] = useState('');

  if (!isOpen) return null;

  const currentFn = functions[selectedFnIndex];

  const handleCreateFunction = () => {
    if (!newFnName.trim()) return;
    const cleanName = newFnName.trim().replace(/\s+/g, '_');
    const newFn: CustomFunction = {
      id: `fn_${Date.now()}`,
      name: cleanName,
      description: 'Custom kitchen subroutine',
      blocks: [
        {
          id: `fnb_${Date.now()}_1`,
          type: 'chop',
          category: 'action',
          label: 'Chop Veggie',
          description: 'Cut at cutting board',
          iconName: 'Scissors'
        },
        {
          id: `fnb_${Date.now()}_2`,
          type: 'cook',
          category: 'action',
          label: 'Sizzle Heat',
          description: 'Cook on stove',
          iconName: 'Flame'
        }
      ]
    };
    const updated = [...functions, newFn];
    setFunctions(updated);
    setSelectedFnIndex(updated.length - 1);
    setNewFnName('');
    onSaveFunctions(updated);
  };

  const handleDeleteFunction = (idx: number) => {
    const updated = functions.filter((_, i) => i !== idx);
    setFunctions(updated);
    setSelectedFnIndex(Math.max(0, idx - 1));
    onSaveFunctions(updated);
  };

  const handleAddBlockToFunction = (type: 'chop' | 'cook' | 'move_right' | 'place') => {
    if (!currentFn) return;
    const newBlock: InstructionBlock = {
      id: `fnb_${Date.now()}`,
      type,
      category: type === 'chop' || type === 'cook' || type === 'place' ? 'action' : 'movement',
      label: type === 'chop' ? 'Chop' : type === 'cook' ? 'Sizzle' : type === 'move_right' ? 'Move Right' : 'Place',
      description: 'Function step',
      iconName: type
    };
    const updated = [...functions];
    updated[selectedFnIndex] = {
      ...currentFn,
      blocks: [...currentFn.blocks, newBlock]
    };
    setFunctions(updated);
    onSaveFunctions(updated);
  };

  const handleRemoveBlock = (blockIdx: number) => {
    if (!currentFn) return;
    const updated = [...functions];
    updated[selectedFnIndex] = {
      ...currentFn,
      blocks: currentFn.blocks.filter((_, i) => i !== blockIdx)
    };
    setFunctions(updated);
    onSaveFunctions(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900 leading-tight">
                Function Builder & Subroutines
              </h2>
              <p className="text-[11px] text-stone-500">
                Encapsulate multi-step cooking procedures into reusable blocks (DRY Principle)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Function list sidebar */}
          <div className="w-full md:w-56 border-r border-stone-200 bg-stone-50/50 p-3 flex flex-col">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
              Declared Functions
            </h4>

            <div className="flex-1 space-y-1 overflow-y-auto mb-3">
              {functions.map((fn, idx) => (
                <button
                  key={fn.id}
                  onClick={() => setSelectedFnIndex(idx)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    selectedFnIndex === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  <span className="truncate">{fn.name}()</span>
                  <span className="text-[10px] opacity-75">{fn.blocks.length} steps</span>
                </button>
              ))}
            </div>

            {/* Create new function input */}
            <div className="pt-2 border-t border-stone-200 space-y-1.5">
              <input
                type="text"
                placeholder="e.g. diceAndSaute"
                value={newFnName}
                onChange={(e) => setNewFnName(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              />
              <button
                onClick={handleCreateFunction}
                className="w-full py-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Function</span>
              </button>
            </div>
          </div>

          {/* Function editor body */}
          <div className="flex-1 p-4 flex flex-col overflow-y-auto">
            {currentFn ? (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 font-mono">
                      def {currentFn.name}():
                    </h3>
                    <p className="text-xs text-stone-500">
                      Sequence will be executed whenever you use <code className="text-indigo-600 font-mono font-bold">Call {currentFn.name}()</code>
                    </p>
                  </div>

                  {functions.length > 1 && (
                    <button
                      onClick={() => handleDeleteFunction(selectedFnIndex)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                      title="Delete function"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Subroutine Blocks */}
                <div className="flex-1 space-y-2 mb-4">
                  {currentFn.blocks.map((block, bIdx) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-stone-600 font-bold">#{bIdx + 1}</span>
                        <span className="font-semibold text-stone-800">{block.label}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveBlock(bIdx)}
                        className="text-stone-400 hover:text-rose-500 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add actions to function */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-600 block mb-1.5">
                    Append Subroutine Actions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAddBlockToFunction('chop')}
                      className="px-2.5 py-1 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                    >
                      + Chop
                    </button>
                    <button
                      onClick={() => handleAddBlockToFunction('cook')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                    >
                      + Sizzle
                    </button>
                    <button
                      onClick={() => handleAddBlockToFunction('move_right')}
                      className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                    >
                      + Move Right
                    </button>
                    <button
                      onClick={() => handleAddBlockToFunction('place')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                    >
                      + Place
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-stone-400">
                Select or create a function
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Functions promote modularity and testability.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
