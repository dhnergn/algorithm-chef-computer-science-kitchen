import React, { useState } from 'react';
import { KitchenLevel } from '../types/game';
import { X, MessageSquareQuote, Check, Copy, Sparkles, BookOpen } from 'lucide-react';

interface ExplainSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: KitchenLevel;
  initialText?: string;
  onSaveExplanation: (text: string) => void;
}

export const ExplainSolutionModal: React.FC<ExplainSolutionModalProps> = ({
  isOpen,
  onClose,
  level,
  initialText = '',
  onSaveExplanation
}) => {
  const [text, setText] = useState(initialText);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveExplanation(text);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-700">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-tight">
                Explain Your Algorithm
              </h2>
              <p className="text-xs text-stone-500">
                Articulate your computational thinking in prose for classroom rubric grading
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Prompt */}
        <div className="p-5 space-y-3">
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs">
            <span className="font-bold text-amber-900 block mb-1">
              Discussion Prompt for Level {level.code} ({level.title}):
            </span>
            <p className="text-amber-800 leading-relaxed">
              Describe the strategy you used. Why did you arrange the instructions in this order? How did your choice of loops, conditionals, or functions optimize execution time and prevent errors?
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: I organized my algorithm so the chef grabs the tool before reaching the cutting board. Then, instead of 4 separate chop instructions, I nested a single chop block inside a 'Repeat 4 Times' loop to keep the code concise and avoid off-by-one errors..."
            rows={6}
            className="w-full p-3 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 font-sans leading-relaxed text-stone-800"
          />

          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>Word count: {text.trim() ? text.trim().split(/\s+/).length : 0} words</span>
            <span>Rubric Standard: AP CSP Computational Artifact</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-200/50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved to Portfolio!</span>
              </>
            ) : (
              <span>Save Reflection</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
