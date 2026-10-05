import React from 'react';
import { X, BookCheck, Sparkles, Target, Layers, Cpu, Award } from 'lucide-react';

interface GameDesignDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameDesignDocModal: React.FC<GameDesignDocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-tight">
                Algorithm Chef: Complete Game Design Document (GDD)
              </h2>
              <p className="text-xs text-stone-500">
                Pedagogical architecture, core gameplay loops, and age-band progression framework
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

        {/* GDD Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-stone-800 text-xs leading-relaxed">
          {/* Executive Overview */}
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-amber-700">
              1. Executive Overview & Mission
            </h3>
            <p>
              <strong>Algorithm Chef</strong> is a cross-platform educational puzzle and simulation game engineered to teach foundational and advanced computer science (CS) concepts to K-12 students (Ages 5–18). By leveraging the universal, physical metaphor of commercial cooking, the game bridges abstract computational thinking into tangible, joyful kitchen operations without introducing false metaphors that students would have to "unlearn" later.
            </p>
          </section>

          {/* Core Design Principle */}
          <section className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Core Invariant Design Principle
            </h4>
            <p className="text-amber-800">
              Every kitchen mechanic maps 1:1 to a real computational concept:
              <br />• <strong>Order of Operations:</strong> Picking knife before chopping = Precondition satisfaction.
              <br />• <strong>Repeat Loops:</strong> Dicing 4 carrot cubes = Deterministic for-loop iteration.
              <br />• <strong>Stove Temperatures:</strong> Checking burner state = Boolean conditionals (If/Else).
              <br />• <strong>Prep Station Procedures:</strong> Custom functions = Subroutine abstraction (DRY principle).
              <br />• <strong>Order Ticket Rails:</strong> Arrival queue = First-In, First-Out (FIFO) queue data structure.
              <br />• <strong>Plate / Layer Trays:</strong> Skyscraper burger stack = Last-In, First-Out (LIFO) stack data structure.
              <br />• <strong>Ingredient Sizing:</strong> Arranging pumpkins by size = Pairwise comparison & swap (Bubble/Selection Sort).
            </p>
          </section>

          {/* Age-Band Progression Map */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-amber-700">
              2. Age-Band Pedagogical Progression Map
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-sky-800 text-[11px] block">Primary (Ages 5–7) · Kitchen Trainee</span>
                <p className="text-stone-600 mt-1">
                  <strong>Concepts:</strong> Linear sequencing, cause and effect, precondition validation.
                  <br /><strong>UI Mode:</strong> High icon visibility, 4x3 small kitchen floor, single top-down linear scripts.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-emerald-800 text-[11px] block">Elementary (Ages 8–10) · Line Cook</span>
                <p className="text-stone-600 mt-1">
                  <strong>Concepts:</strong> Repeat loops, Boolean branching (if/else), execution tracing, off-by-one error debugging.
                  <br /><strong>UI Mode:</strong> Nested blocks, parameter selectors, and step-through debugger.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-purple-800 text-[11px] block">Middle School (Ages 11–13) · Sous Chef</span>
                <p className="text-stone-600 mt-1">
                  <strong>Concepts:</strong> Local/global variables, reusable functions, Big-O intuition ($O(N)$ vs $O(N^2)$).
                  <br /><strong>UI Mode:</strong> Function Builder dialog, live efficiency meter, Big-O complexity feedback.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-amber-800 text-[11px] block">High School (Ages 14–18) · Head & Master Chef</span>
                <p className="text-stone-600 mt-1">
                  <strong>Concepts:</strong> Stacks & Queues, Sorting & Binary Search, Block-to-Text syntax bridge.
                  <br /><strong>UI Mode:</strong> Side-by-side live Python, JavaScript, and Pseudocode translation view.
                </p>
              </div>
            </div>
          </section>

          {/* Feedback & Debugger Loop */}
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-amber-700">
              3. Visual Debugger & Non-Punitive Feedback Loop
            </h3>
            <p>
              Mistakes in Algorithm Chef are never punished. When an error occurs (such as chopping without holding a knife or walking into a boundary), the simulation pauses at that exact instruction block, highlights it with an amber/red outline, and displays a friendly explanation from mentor Head Chef Ada. Students can fix the block in-place and re-cook without losing their work.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">Document Version 1.0 · AI Studio Build</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
