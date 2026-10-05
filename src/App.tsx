/**
 * Algorithm Chef - Educational Computer Science Game
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  AgeBand,
  CareerRank,
  KitchenLevel,
  InstructionBlock,
  ExecutionFrame,
  CustomFunction,
  Achievement
} from './types/game';
import { CuisineCode, LanguageCode } from './types/i18n';
import { CUISINES, LANGUAGES } from './data/cuisines';
import { TRANSLATIONS } from './data/translations';
import { CURRICULUM_LEVELS, INITIAL_ACHIEVEMENTS } from './data/curriculum';
import { simulateLevelExecution } from './engine/kitchenSimulator';
import { KitchenGrid } from './components/KitchenGrid';
import { BlockPalette } from './components/BlockPalette';
import { TimelineEditor } from './components/TimelineEditor';
import { VisualDebugger } from './components/VisualDebugger';
import { CodeViewModal } from './components/CodeViewModal';
import { FunctionBuilderModal } from './components/FunctionBuilderModal';
import { RushHourMode } from './components/RushHourMode';
import { TeacherDashboard } from './components/TeacherDashboard';
import { RecipeBookModal } from './components/RecipeBookModal';
import { GameDesignDocModal } from './components/GameDesignDocModal';
import { ExplainSolutionModal } from './components/ExplainSolutionModal';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { CuisineSelectorModal } from './components/CuisineSelectorModal';
import { sound } from './utils/audio';
import {
  ChefHat,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Flame,
  Code2,
  HelpCircle,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Globe,
  Utensils
} from 'lucide-react';

export default function App() {
  // Current active age band & level
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('primary');
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);

  // Localization & Cuisine state
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineCode>('classic');
  const [isCuisineModalOpen, setIsCuisineModalOpen] = useState(false);

  // Translations & Active Cuisine resolution
  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;
  const activeCuisine = CUISINES[selectedCuisine] || CUISINES.classic;

  // Filter levels for the current age band
  const ageLevels = CURRICULUM_LEVELS.filter((l) => l.ageBand === selectedAgeBand);
  const currentLevel: KitchenLevel = ageLevels[currentLevelIndex] || CURRICULUM_LEVELS[0];

  // User program instruction blocks
  const [blocks, setBlocks] = useState<InstructionBlock[]>(
    currentLevel.starterBlocks ? JSON.parse(JSON.stringify(currentLevel.starterBlocks)) : []
  );

  // Custom Functions defined by user
  const [customFunctions, setCustomFunctions] = useState<CustomFunction[]>(
    currentLevel.customFunctions ? JSON.parse(JSON.stringify(currentLevel.customFunctions)) : []
  );

  // Simulation execution frames & playback state
  const [frames, setFrames] = useState<ExecutionFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isFunctionModalOpen, setIsFunctionModalOpen] = useState(false);
  const [isRushHourOpen, setIsRushHourOpen] = useState(false);
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState(false);
  const [isGddOpen, setIsGddOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [isLevelCompleteOpen, setIsLevelCompleteOpen] = useState(false);

  // Saved student explanations & star ratings
  const [levelStars, setLevelStars] = useState<Record<string, number>>({});
  const [levelExplanations, setLevelExplanations] = useState<Record<string, string>>({});
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load starter blocks when level changes
  useEffect(() => {
    setBlocks(
      currentLevel.starterBlocks ? JSON.parse(JSON.stringify(currentLevel.starterBlocks)) : []
    );
    if (currentLevel.customFunctions) {
      setCustomFunctions(JSON.parse(JSON.stringify(currentLevel.customFunctions)));
    }
    resetSimulation();
  }, [currentLevel.id]);

  // Sync sound settings
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Initial simulation preparation
  const resetSimulation = () => {
    setIsPlaying(false);
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    const initialSim = simulateLevelExecution(currentLevel, blocks, customFunctions);
    setFrames(initialSim);
    setCurrentFrameIdx(0);
  };

  // Run or resume simulation
  const handlePlay = () => {
    sound.playClick();
    const simFrames = simulateLevelExecution(currentLevel, blocks, customFunctions);
    setFrames(simFrames);

    // If starting from end, reset to 0
    let startIdx = currentFrameIdx;
    if (startIdx >= simFrames.length - 1) {
      startIdx = 0;
      setCurrentFrameIdx(0);
    }

    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
  };

  const handleStepForward = () => {
    if (frames.length === 0) {
      const sim = simulateLevelExecution(currentLevel, blocks, customFunctions);
      setFrames(sim);
    }
    if (currentFrameIdx < frames.length - 1) {
      const nextIdx = currentFrameIdx + 1;
      setCurrentFrameIdx(nextIdx);
      triggerFrameSound(frames[nextIdx]);
    }
  };

  const triggerFrameSound = (frame: ExecutionFrame) => {
    if (!frame) return;
    switch (frame.soundCue) {
      case 'step':
        sound.playStep();
        break;
      case 'grab':
        sound.playGrab();
        break;
      case 'place':
        sound.playPlace();
        break;
      case 'chop':
        sound.playChop();
        break;
      case 'cook':
        sound.playCook();
        break;
      case 'success':
        sound.playSuccess();
        break;
      case 'error':
        sound.playError();
        break;
    }
  };

  // Playback timer ticker
  useEffect(() => {
    if (!isPlaying) {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
      return;
    }

    const intervalMs = Math.max(120, 500 / playbackSpeed);

    playbackTimerRef.current = setInterval(() => {
      setCurrentFrameIdx((prev) => {
        const next = prev + 1;
        if (next >= frames.length) {
          setIsPlaying(false);
          const finalFrame = frames[frames.length - 1];
          if (finalFrame?.isComplete) {
            handleCompletion(frames.length - 1);
          }
          return prev;
        }
        triggerFrameSound(frames[next]);
        return next;
      });
    }, intervalMs);

    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [isPlaying, frames, playbackSpeed]);

  // Level Completion Handler
  const handleCompletion = (totalSteps: number) => {
    let earnedStars = 1;
    if (totalSteps <= currentLevel.threeStarMaxSteps) earnedStars = 3;
    else if (totalSteps <= currentLevel.twoStarMaxSteps) earnedStars = 2;

    setLevelStars((prev) => ({
      ...prev,
      [currentLevel.id]: Math.max(prev[currentLevel.id] || 0, earnedStars)
    }));

    // Unlock badges
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === 'first_dish') return { ...a, unlocked: true };
        if (a.id === 'big_o_optimizer' && earnedStars === 3) return { ...a, unlocked: true };
        if (a.id === 'loop_master' && blocks.some((b) => b.type === 'repeat_times')) return { ...a, unlocked: true };
        if (a.id === 'function_wizard' && blocks.some((b) => b.type === 'call_function')) return { ...a, unlocked: true };
        if (a.id === 'data_structure_guru' && (currentLevel.id.startsWith('h1') || currentLevel.id.startsWith('h2'))) return { ...a, unlocked: true };
        return a;
      })
    );

    setIsLevelCompleteOpen(true);
  };

  // Switch level
  const handleSelectLevel = (idx: number) => {
    setCurrentLevelIndex(idx);
    resetSimulation();
  };

  const handleNextLevel = () => {
    setIsLevelCompleteOpen(false);
    if (currentLevelIndex < ageLevels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      // Advance age band if available
      if (selectedAgeBand === 'primary') setSelectedAgeBand('elementary');
      else if (selectedAgeBand === 'elementary') setSelectedAgeBand('middle');
      else if (selectedAgeBand === 'middle') setSelectedAgeBand('high');
      setCurrentLevelIndex(0);
    }
  };

  // Add block from toolbox
  const handleAddBlock = (newBlock: InstructionBlock) => {
    sound.playClick();
    setBlocks((prev) => [...prev, newBlock]);
    resetSimulation();
  };

  // Update blocks from timeline
  const handleUpdateBlocks = (updated: InstructionBlock[]) => {
    setBlocks(updated);
    resetSimulation();
  };

  // Export recipe JSON
  const handleExportRecipe = () => {
    const data = JSON.stringify({
      level: currentLevel.code,
      title: currentLevel.title,
      blocks,
      customFunctions,
      explanation: levelExplanations[currentLevel.id] || ''
    }, null, 2);

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipe_${currentLevel.code}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate career rank
  const totalStarsCount = Object.values(levelStars).reduce((a, b) => a + b, 0);
  const currentRank: CareerRank =
    totalStarsCount >= 30
      ? 'master_chef'
      : totalStarsCount >= 20
      ? 'head_chef'
      : totalStarsCount >= 12
      ? 'sous_chef'
      : totalStarsCount >= 5
      ? 'line_cook'
      : 'trainee';

  const levelTrans = t.levels[currentLevel.id];
  const levelTitle = levelTrans ? levelTrans.title : currentLevel.title;
  const levelSubtitle = levelTrans ? levelTrans.subtitle : currentLevel.subtitle;
  const levelCsConcept = levelTrans ? levelTrans.csConcept : currentLevel.csConcept;
  const levelStory = levelTrans ? levelTrans.story : currentLevel.story;
  const levelHint = levelTrans ? levelTrans.hint : (currentLevel.hints[0] || 'Observe the kitchen layout and assemble instructions carefully!');

  const currentFrame = frames[currentFrameIdx] || {
    stepIndex: 0,
    currentInstructionId: null,
    chef: {
      x: currentLevel.chefStart.x,
      y: currentLevel.chefStart.y,
      direction: currentLevel.chefStart.direction,
      heldItem: null,
      heldTool: null,
      statusText: 'Kitchen ready',
      isActionActive: false
    },
    grid: currentLevel.stations,
    variables: {},
    trayStack: [],
    orderQueue: [],
    logMessage: 'Awaiting cook command.'
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans select-none antialiased">
      {/* ========================================================================= */}
      {/* 2. Top Bar Contract (Strict 3 Zones: Brand wordmark - Clean links - Action) */}
      {/* ========================================================================= */}
      <header className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-stone-200/90 shadow-2xs sticky top-0 z-30 gap-2">
        {/* Zone 1: Single Wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <ChefHat className="w-5 h-5" />
          </div>
          <a
            href="/"
            className="text-base font-extrabold tracking-tight text-stone-900 font-display"
          >
            {t.appName}
          </a>
        </div>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-stone-600">
          <button
            onClick={() => setIsRecipeBookOpen(true)}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.nav.recipeBook}</span>
          </button>
          <button
            onClick={() => setIsRushHourOpen(true)}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.nav.rushHour}</span>
          </button>
          <button
            onClick={() => setIsTeacherDashboardOpen(true)}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.nav.teacherPortal}</span>
          </button>
          <button
            onClick={() => setIsGddOpen(true)}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.nav.gdd}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls (with Chinese, Spanish, Turkish, Indian, French options) */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="flex items-center bg-stone-100 rounded-xl px-2 py-1 border border-stone-200 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-stone-500 mr-1 shrink-0" />
            <select
              value={selectedLanguage}
              onChange={(e) => {
                sound.playClick();
                setSelectedLanguage(e.target.value as LanguageCode);
              }}
              className="bg-transparent text-xs font-semibold text-stone-800 outline-none cursor-pointer pr-1"
              title="Select Language (English, Chinese, Spanish, Turkish, Indian, French)"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* World Cuisine Theme Selector Dropdown */}
          <div className="flex items-center bg-stone-100 rounded-xl px-2 py-1 border border-stone-200 shadow-2xs">
            <Utensils className="w-3.5 h-3.5 text-amber-600 mr-1 shrink-0" />
            <select
              value={selectedCuisine}
              onChange={(e) => {
                sound.playClick();
                setSelectedCuisine(e.target.value as CuisineCode);
              }}
              className="bg-transparent text-xs font-semibold text-stone-800 outline-none cursor-pointer pr-1"
              title="Select Cuisine Theme (Classic, Chinese, Spanish, Turkish, Indian, French)"
            >
              {(Object.keys(CUISINES) as CuisineCode[]).map((cKey) => {
                const c = CUISINES[cKey];
                return (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Cuisine & Language Details Modal Button */}
          <button
            onClick={() => setIsCuisineModalOpen(true)}
            className="p-1.5 rounded-lg text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 cursor-pointer text-xs font-bold flex items-center gap-1 shadow-2xs"
            title="Explore World Cuisine Themes & Languages"
          >
            <span>{activeCuisine.flag}</span>
            <span className="hidden xl:inline">{activeCuisine.chefName}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
            title={soundEnabled ? t.actions.soundOff : t.actions.soundOn}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Code View Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsCodeModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.nav.codeBridge}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isPlaying ? t.actions.pause : t.actions.cook}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-4">
        {/* ========================================================================= */}
        {/* Tier Selector & Level Header */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-4 md:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-amber-800 font-bold uppercase tracking-wide">
                {currentLevel.code}
              </span>
              <span aria-hidden="true">·</span>
              <span>{levelCsConcept}</span>
              <span aria-hidden="true">·</span>
              <span>{t.debugger.optimal}: {currentLevel.optimalSteps} steps</span>
              {levelStars[currentLevel.id] && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-500 font-bold">
                    {'★'.repeat(levelStars[currentLevel.id])}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-lg md:text-xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {levelTitle}
            </h1>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              {levelStory}
            </p>
          </div>

          {/* Age Band Segmented Control Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
            <div className="flex items-center p-1 bg-stone-100 rounded-xl">
              {(['primary', 'elementary', 'middle', 'high'] as AgeBand[]).map((band) => (
                <button
                  key={band}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAgeBand(band);
                    setCurrentLevelIndex(0);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                    selectedAgeBand === band
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.ageBands[band]}
                </button>
              ))}
            </div>

            {/* Level Stepper */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
              <button
                disabled={currentLevelIndex === 0}
                onClick={() => handleSelectLevel(currentLevelIndex - 1)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                title="Previous level"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 text-xs font-mono font-bold text-stone-700">
                {currentLevelIndex + 1} / {ageLevels.length}
              </span>

              <button
                disabled={currentLevelIndex === ageLevels.length - 1}
                onClick={() => handleSelectLevel(currentLevelIndex + 1)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                title="Next level"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mentor Chef Hint Ribbon */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="text-2xl filter drop-shadow-xs">{activeCuisine.flag}</span>
            <div>
              <span className="font-bold text-amber-900">{activeCuisine.chefName} {t.mentor.says}</span>{' '}
              <span className="text-amber-800">
                {levelHint}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {currentLevel.customFunctions && (
              <button
                onClick={() => setIsFunctionModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 cursor-pointer transition-colors"
              >
                {t.actions.functionBuilder}
              </button>
            )}
            <button
              onClick={() => setIsExplainModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-200 cursor-pointer transition-colors"
            >
              {t.actions.explainSolution}
            </button>
            <button
              onClick={handleExportRecipe}
              className="p-1 rounded-lg text-amber-800 hover:bg-amber-200 cursor-pointer"
              title={t.actions.export}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Core 3-Column Layout: Toolbox | Kitchen Stage + Debugger | Timeline Editor */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Column 1: Block Toolbox (3 cols) */}
          <div className="lg:col-span-3 h-[580px]">
            <BlockPalette
              availableBlockTypes={currentLevel.availableBlocks}
              ageBand={selectedAgeBand}
              onAddBlock={handleAddBlock}
              language={selectedLanguage}
            />
          </div>

          {/* Column 2: Kitchen Simulation Stage & Live State Deck (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <KitchenGrid
              width={currentLevel.gridWidth}
              height={currentLevel.gridHeight}
              chef={currentFrame.chef}
              stations={currentFrame.grid}
              isError={currentFrame.isError}
              cuisine={selectedCuisine}
              language={selectedLanguage}
            />

            <VisualDebugger
              level={currentLevel}
              chef={currentFrame.chef}
              currentStep={currentFrame.stepIndex}
              totalSteps={frames.length > 0 ? frames.length - 1 : 0}
              isPlaying={isPlaying}
              isComplete={currentFrame.isComplete}
              isError={currentFrame.isError}
              errorMessage={currentFrame.errorMessage}
              playbackSpeed={playbackSpeed}
              trayStack={currentFrame.trayStack}
              orderQueue={currentFrame.orderQueue}
              variables={currentFrame.variables}
              onPlay={handlePlay}
              onPause={handlePause}
              onStepForward={handleStepForward}
              onReset={resetSimulation}
              onChangeSpeed={(spd) => setPlaybackSpeed(spd)}
              language={selectedLanguage}
            />
          </div>

          {/* Column 3: Sequence Timeline Editor (4 cols) */}
          <div className="lg:col-span-4 h-[580px]">
            <TimelineEditor
              blocks={blocks}
              activeInstructionId={currentFrame.currentInstructionId}
              errorInstructionId={currentFrame.isError ? currentFrame.currentInstructionId : null}
              errorMessage={currentFrame.errorMessage}
              onUpdateBlocks={handleUpdateBlocks}
              onClear={() => {
                sound.playClick();
                setBlocks([]);
                resetSimulation();
              }}
              language={selectedLanguage}
            />
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* Footer (Quiet Copyright & Essential Actions) */}
      {/* ========================================================================= */}
      <footer className="mt-auto px-6 py-4 border-t border-stone-200/80 bg-white text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Algorithm Chef</span>
          <span aria-hidden="true">·</span>
          <span>Computer Science Educational Kitchen</span>
          <span aria-hidden="true">·</span>
          <span>CSTA & AP CSP Aligned</span>
        </div>

        <div className="flex items-center gap-4 text-stone-600 font-medium">
          <button
            onClick={() => setIsGddOpen(true)}
            className="hover:text-stone-900 cursor-pointer"
          >
            Game Design Document
          </button>
          <button
            onClick={() => setIsTeacherDashboardOpen(true)}
            className="hover:text-stone-900 cursor-pointer"
          >
            Teacher Portal
          </button>
          <button
            onClick={() => setIsRushHourOpen(true)}
            className="hover:text-stone-900 cursor-pointer text-orange-600 font-bold"
          >
            Rush Hour Mode
          </button>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* Interactive Modals */}
      {/* ========================================================================= */}
      <CodeViewModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        blocks={blocks}
        customFunctions={customFunctions}
      />

      <FunctionBuilderModal
        isOpen={isFunctionModalOpen}
        onClose={() => setIsFunctionModalOpen(false)}
        customFunctions={customFunctions}
        onSaveFunctions={(fns) => setCustomFunctions(fns)}
      />

      <RushHourMode
        isOpen={isRushHourOpen}
        onClose={() => setIsRushHourOpen(false)}
        cuisine={selectedCuisine}
        language={selectedLanguage}
      />

      <TeacherDashboard
        isOpen={isTeacherDashboardOpen}
        onClose={() => setIsTeacherDashboardOpen(false)}
      />

      <RecipeBookModal
        isOpen={isRecipeBookOpen}
        onClose={() => setIsRecipeBookOpen(false)}
        achievements={achievements}
        currentRank={currentRank}
        totalStars={totalStarsCount}
        cuisine={selectedCuisine}
        language={selectedLanguage}
      />

      <GameDesignDocModal
        isOpen={isGddOpen}
        onClose={() => setIsGddOpen(false)}
      />

      <ExplainSolutionModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        level={currentLevel}
        initialText={levelExplanations[currentLevel.id] || ''}
        onSaveExplanation={(txt) => {
          setLevelExplanations((prev) => ({ ...prev, [currentLevel.id]: txt }));
        }}
      />

      <LevelCompleteModal
        isOpen={isLevelCompleteOpen}
        level={currentLevel}
        stepsTaken={frames.length > 0 ? frames.length - 1 : 0}
        onNextLevel={handleNextLevel}
        onReplay={() => {
          setIsLevelCompleteOpen(false);
          resetSimulation();
        }}
        onOpenExplain={() => {
          setIsLevelCompleteOpen(false);
          setIsExplainModalOpen(true);
        }}
        onOpenCodeView={() => {
          setIsLevelCompleteOpen(false);
          setIsCodeModalOpen(true);
        }}
        language={selectedLanguage}
        cuisine={selectedCuisine}
      />

      <CuisineSelectorModal
        isOpen={isCuisineModalOpen}
        onClose={() => setIsCuisineModalOpen(false)}
        selectedCuisine={selectedCuisine}
        selectedLanguage={selectedLanguage}
        onSelectCuisine={(c) => {
          setSelectedCuisine(c);
          resetSimulation();
        }}
        onSelectLanguage={(l) => {
          setSelectedLanguage(l);
          resetSimulation();
        }}
      />
    </div>
  );
}
