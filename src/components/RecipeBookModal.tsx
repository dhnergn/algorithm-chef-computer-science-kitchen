import React from 'react';
import { Achievement, CareerRank } from '../types/game';
import { CuisineCode, LanguageCode } from '../types/i18n';
import { CUISINES } from '../data/cuisines';
import { TRANSLATIONS } from '../data/translations';
import { X, Award, Sparkles, CheckCircle2, Lock, Utensils } from 'lucide-react';

interface RecipeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  currentRank: CareerRank;
  totalStars: number;
  cuisine?: CuisineCode;
  language?: LanguageCode;
}

const RANK_DETAILS: Record<
  CareerRank,
  { title: string; badge: string; description: string; nextAtStars: number }
> = {
  trainee: {
    title: 'Kitchen Trainee',
    badge: '🌱',
    description: 'Master of basic sequencing and kitchen safety rules.',
    nextAtStars: 6
  },
  line_cook: {
    title: 'Line Cook',
    badge: '🍳',
    description: 'Expert in loop iteration, conditionals, and rapid debugging.',
    nextAtStars: 15
  },
  sous_chef: {
    title: 'Sous Chef',
    badge: '👨‍🍳',
    description: 'Architect of reusable functions and Big-O efficiency.',
    nextAtStars: 24
  },
  head_chef: {
    title: 'Head Chef',
    badge: '⭐',
    description: 'Master of Stacks, Queues, and real-time kitchen pipelines.',
    nextAtStars: 32
  },
  master_chef: {
    title: 'Master Algorithm Chef',
    badge: '👑',
    description: 'Grandmaster of Sorting, Searching, and Computational Thinking.',
    nextAtStars: 36
  }
};

export const RecipeBookModal: React.FC<RecipeBookModalProps> = ({
  isOpen,
  onClose,
  achievements,
  currentRank,
  totalStars,
  cuisine = 'classic',
  language = 'en'
}) => {
  if (!isOpen) return null;

  const currentRankInfo = RANK_DETAILS[currentRank];
  const activeCuisine = CUISINES[cuisine] || CUISINES.classic;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-tight">
                Recipe Book & Career Achievements
              </h2>
              <p className="text-xs text-stone-500">
                Badges and algorithmic milestones earned across your cooking career
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

        {/* Career Rank Banner */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">{currentRankInfo.badge}</span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Current Career Rank
              </span>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">
                {currentRankInfo.title}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">{currentRankInfo.description}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-stone-500">Stars Earned</span>
            <div className="text-lg font-bold font-mono text-amber-600 flex items-center gap-1 justify-end">
              <span>★</span>
              <span>{totalStars}</span>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 p-5 overflow-y-auto">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
            Algorithmic Badges
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  item.unlocked
                    ? 'bg-amber-50/50 border-amber-200 shadow-2xs'
                    : 'bg-stone-50 border-stone-200 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    item.unlocked ? 'bg-white shadow-xs' : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {item.unlocked ? item.badge : <Lock className="w-4 h-4 text-stone-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-bold text-stone-900 truncate">{item.title}</h5>
                    <span className="text-[10px] font-medium text-stone-500">{item.category}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                  {item.unlocked && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 mt-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unlocked!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Active Cuisine Specialties */}
          <div className="mt-5 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>{activeCuisine.name} ({activeCuisine.flag}) Signature Recipes</span>
              </h4>
              <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Mentor: {activeCuisine.chefName}
              </span>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              {activeCuisine.tagline}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {activeCuisine.specialtyDishes.map((dish, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-center gap-2"
                >
                  <span className="text-xl shrink-0">
                    {activeCuisine.dishIcons[i % activeCuisine.dishIcons.length] || '🍽️'}
                  </span>
                  <span className="text-xs font-semibold text-stone-800 truncate">
                    {dish}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">Collect all 7 badges to attain Master Algorithm Chef rank!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
