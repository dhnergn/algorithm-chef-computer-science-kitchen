import React from 'react';
import { ChefState, KitchenItem, KitchenLevel } from '../types/game';
import { LanguageCode } from '../types/i18n';
import { TRANSLATIONS } from '../data/translations';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Gauge,
  Layers,
  Sparkles,
  Zap,
  Info,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface VisualDebuggerProps {
  level: KitchenLevel;
  chef: ChefState;
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  isComplete?: boolean;
  isError?: boolean;
  errorMessage?: string;
  playbackSpeed: number;
  trayStack: KitchenItem[];
  orderQueue: KitchenItem[];
  variables: Record<string, any>;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onChangeSpeed: (speed: number) => void;
  language?: LanguageCode;
}

export const VisualDebugger: React.FC<VisualDebuggerProps> = ({
  level,
  chef,
  currentStep,
  totalSteps,
  isPlaying,
  isComplete,
  isError,
  errorMessage,
  playbackSpeed,
  trayStack,
  orderQueue,
  variables,
  onPlay,
  onPause,
  onStepForward,
  onReset,
  onChangeSpeed,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Determine star rating based on currentStep
  const getEstimatedStars = () => {
    if (totalSteps === 0) return 0;
    if (totalSteps <= level.threeStarMaxSteps) return 3;
    if (totalSteps <= level.twoStarMaxSteps) return 2;
    return 1;
  };

  const estimatedStars = getEstimatedStars();

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-xs p-3">
      {/* Top Header: Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100">
        {/* Playback action buttons */}
        <div className="flex items-center gap-1.5">
          {isPlaying ? (
            <button
              onClick={onPause}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>{t.actions.pause}</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white ml-0.5" />
              <span>{t.actions.cook}</span>
            </button>
          )}

          <button
            onClick={onStepForward}
            disabled={isPlaying}
            className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 font-semibold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
            title="Step Forward 1 Instruction"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>{t.actions.step}</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 shadow-xs cursor-pointer"
            title={t.actions.reset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          {[0.5, 1, 2, 4].map((spd) => (
            <button
              key={spd}
              onClick={() => onChangeSpeed(spd)}
              className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                playbackSpeed === spd
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Real-time State & Efficiency Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Panel 1: Efficiency & Big-O Meter */}
        <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              {t.debugger.efficiencyMeter}
            </span>
            {level.bigOIntuition && (
              <span className="font-mono text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded border border-amber-300">
                {level.bigOIntuition.complexity}
              </span>
            )}
          </div>

          {/* Step Count Progress Bar */}
          <div className="mt-1">
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-stone-600">
                {t.debugger.executed}: <strong className="text-stone-900">{currentStep}</strong> / {level.optimalSteps} {t.debugger.optimal}
              </span>
              <span className="flex items-center gap-0.5 text-amber-500">
                {'★'.repeat(estimatedStars || 1)}
                {'☆'.repeat(3 - (estimatedStars || 1))}
              </span>
            </div>

            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ${
                  currentStep <= level.optimalSteps
                    ? 'bg-emerald-500'
                    : currentStep <= level.twoStarMaxSteps
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{
                  width: `${Math.min(100, (currentStep / (level.twoStarMaxSteps + 4)) * 100)}%`
                }}
              />
            </div>
          </div>

          {level.bigOIntuition && (
            <p className="text-[10px] text-stone-500 mt-2 leading-tight">
              <strong>{t.debugger.csConcept}:</strong> {level.bigOIntuition.whyOptimal}
            </p>
          )}
        </div>

        {/* Panel 2: Live Memory & Variables */}
        <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              {t.debugger.liveMemory}
            </span>
            <span className="text-[10px] font-mono text-stone-600 font-semibold">{t.debugger.scopeLocal}</span>
          </div>

          <div className="space-y-1 my-1 overflow-y-auto max-h-[52px]">
            {Object.keys(variables).length === 0 ? (
              <span className="text-[11px] text-stone-400 italic">{t.debugger.noVariables}</span>
            ) : (
              Object.entries(variables).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-stone-200"
                >
                  <span className="text-stone-600">{k}:</span>
                  <span className="font-bold text-indigo-600">{String(v)}</span>
                </div>
              ))
            )}
          </div>

          <div className="text-[10px] text-stone-500 truncate">
            {t.debugger.chefCoordinates}: ({chef.x}, {chef.y}) · Dir: {chef.direction}
          </div>
        </div>

        {/* Panel 3: Data Structures (Stack / Queue Monitor) */}
        <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              {t.debugger.dataStructures}
            </span>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-bold">
              {trayStack.length > 0 ? 'LIFO Stack' : orderQueue.length > 0 ? 'FIFO Queue' : 'Buffer'}
            </span>
          </div>

          {/* Stack or Queue visualization */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {trayStack.length > 0 ? (
              trayStack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-900 rounded font-mono border border-amber-300 shadow-2xs whitespace-nowrap"
                  title={`Stack Layer #${idx + 1}: ${item.label}`}
                >
                  {item.icon} #{idx + 1}
                </span>
              ))
            ) : orderQueue.length > 0 ? (
              orderQueue.map((item, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-900 rounded font-mono border border-blue-300 shadow-2xs whitespace-nowrap"
                  title={`FIFO Queue Slot #${idx + 1}: ${item.label}`}
                >
                  {item.icon} #{idx + 1}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-stone-400 italic">{t.debugger.noDataStructures}</span>
            )}
          </div>

          <div className="text-[10px] text-stone-500">
            {trayStack.length > 0
              ? `${t.debugger.topOfStack}: ${trayStack[trayStack.length - 1]?.label || t.debugger.empty}`
              : orderQueue.length > 0
              ? `${t.debugger.headOfQueue}: ${orderQueue[0]?.label || t.debugger.empty}`
              : 'Direct counter storage'}
          </div>
        </div>
      </div>

      {/* Outcome / Error Banner */}
      {isComplete && (
        <div className="mt-2 p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{t.debugger.dishSuccess}</span>
          </div>
          <span className="font-mono font-bold text-emerald-700">Finished in {totalSteps} steps</span>
        </div>
      )}

      {isError && errorMessage && (
        <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">{t.debugger.errorEncountered}:</p>
            <p className="text-[11px] text-rose-700 mt-0.5 leading-snug">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
