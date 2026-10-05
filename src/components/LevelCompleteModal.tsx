import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { KitchenLevel } from '../types/game';
import { Award, ArrowRight, RotateCcw, MessageSquareQuote, Code, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { CuisineCode, LanguageCode } from '../types/i18n';
import { CUISINES } from '../data/cuisines';
import { TRANSLATIONS } from '../data/translations';

interface LevelCompleteModalProps {
  isOpen: boolean;
  level: KitchenLevel;
  stepsTaken: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onOpenExplain: () => void;
  onOpenCodeView: () => void;
  language?: LanguageCode;
  cuisine?: CuisineCode;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  isOpen,
  level,
  stepsTaken,
  onNextLevel,
  onReplay,
  onOpenExplain,
  onOpenCodeView,
  language = 'en',
  cuisine = 'classic'
}) => {
  const activeCuisine = CUISINES[cuisine] || CUISINES.classic;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const levelTrans = t.levels[level.id];
  const title = levelTrans ? levelTrans.title : level.title;
  const csConcept = levelTrans ? levelTrans.csConcept : level.csConcept;

  useEffect(() => {
    if (isOpen) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Star calculation
  const getStars = () => {
    if (stepsTaken <= level.threeStarMaxSteps) return 3;
    if (stepsTaken <= level.twoStarMaxSteps) return 2;
    return 1;
  };

  const stars = getStars();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 w-full max-w-md p-6 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl" />

        {/* Mascot / Plate Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl shadow-xs mb-3">
          {activeCuisine.flag || '🍽️'}
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-1">
          {activeCuisine.chefName} · {t.debugger.dishSuccess}
        </span>

        <h3 className="text-xl font-bold text-stone-900 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          {csConcept}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 text-3xl my-4 text-amber-400">
          <span className="filter drop-shadow-xs transition-transform transform scale-110">
            {stars >= 1 ? '★' : '☆'}
          </span>
          <span className="filter drop-shadow-xs transition-transform transform scale-125">
            {stars >= 2 ? '★' : '☆'}
          </span>
          <span className="filter drop-shadow-xs transition-transform transform scale-110">
            {stars >= 3 ? '★' : '☆'}
          </span>
        </div>

        {/* Efficiency summary card */}
        <div className="w-full bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 mb-5 text-left text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-stone-500 font-medium">{t.debugger.executed}:</span>
            <span className="font-mono font-bold text-stone-900">
              {stepsTaken} ({t.debugger.optimal}: {level.optimalSteps})
            </span>
          </div>

          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${stars === 3 ? 'bg-emerald-500' : stars === 2 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${Math.min(100, (level.optimalSteps / Math.max(1, stepsTaken)) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-stone-600 leading-snug">
            {stars === 3
              ? '🌟 Master Algorithm Grade! Optimal step count achieved.'
              : stars === 2
              ? '✨ Great job! Try restructuring loops to reach 3 stars.'
              : '👍 Recipe prepared! Review your algorithm to optimize efficiency.'}
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="w-full space-y-2">
          <button
            onClick={onNextLevel}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow cursor-pointer transition-transform active:scale-95"
          >
            <span>{t.actions.nextLevel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={onReplay}
              className="py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.actions.replay}</span>
            </button>
            <button
              onClick={onOpenCodeView}
              className="py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{t.nav.codeBridge}</span>
            </button>
            <button
              onClick={onOpenExplain}
              className="py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>{t.actions.explainSolution}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
