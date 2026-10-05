import React from 'react';
import { ChefState, GridCell, Direction } from '../types/game';
import { ChefHat, Flame, Sparkles, Utensils, AlertTriangle } from 'lucide-react';
import { CuisineCode, LanguageCode } from '../types/i18n';
import { CUISINES } from '../data/cuisines';
import { TRANSLATIONS } from '../data/translations';

interface KitchenGridProps {
  width: number;
  height: number;
  chef: ChefState;
  stations: GridCell[];
  isError?: boolean;
  cuisine?: CuisineCode;
  language?: LanguageCode;
}

export const KitchenGrid: React.FC<KitchenGridProps> = ({
  width,
  height,
  chef,
  stations,
  isError,
  cuisine = 'classic',
  language = 'en'
}) => {
  const activeCuisine = CUISINES[cuisine] || CUISINES.classic;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Map direction to rotation or visual cues
  const getChefRotation = (dir: Direction) => {
    switch (dir) {
      case 'up':
        return '-rotate-90';
      case 'down':
        return 'rotate-90';
      case 'left':
        return 'scale-x-[-1]';
      case 'right':
        return 'scale-x-100';
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-amber-50/60 p-4 border border-amber-200/70 shadow-inner flex flex-col items-center justify-center">
      {/* Kitchen Floor Pattern */}
      <div
        className="grid gap-2 p-2 bg-gradient-to-b from-stone-100 to-stone-200 rounded-xl border border-stone-300 shadow-md relative overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${width}, minmax(68px, 1fr))`,
          gridTemplateRows: `repeat(${height}, minmax(68px, 1fr))`
        }}
      >
        {/* Subtle Kitchen Tile Grid Floor */}
        {Array.from({ length: height }).map((_, r) =>
          Array.from({ length: width }).map((_, c) => {
            const isEven = (r + c) % 2 === 0;
            const station = stations.find((s) => s.x === c && s.y === r);
            const isChefHere = chef.x === c && chef.y === r;

            return (
              <div
                key={`${r}-${c}`}
                className={`relative min-h-[72px] min-w-[72px] rounded-lg transition-all duration-200 flex flex-col items-center justify-between p-1.5 ${
                  isEven ? 'bg-amber-100/40' : 'bg-amber-50/70'
                } border ${isChefHere ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-stone-200/80'} shadow-xs`}
              >
                {/* Station coordinates badge */}
                <span className="text-[10px] font-mono text-stone-600 self-start select-none font-medium">
                  {c},{r}
                </span>

                {/* Station Surface & Item Display */}
                {station ? (
                  <div className="flex flex-col items-center justify-center w-full my-auto text-center">
                    {/* Station Icon & Type */}
                    <div className="text-xl filter drop-shadow-xs transition-transform transform hover:scale-105">
                      {station.item ? (
                        <div className="relative">
                          <span className="text-2xl">{station.item.icon}</span>
                          {station.item.state === 'cooked' && (
                            <span className="absolute -top-1 -right-2 text-xs animate-bounce">
                              🔥
                            </span>
                          )}
                          {station.item.state === 'chopped' && (
                            <span className="absolute -bottom-1 -right-2 text-xs">
                              ✨
                            </span>
                          )}
                          {station.item.size !== undefined && (
                            <span className="absolute -bottom-2 -left-1 text-[9px] font-bold bg-white text-stone-700 px-1 rounded shadow-xs border border-stone-300">
                              #{station.item.size}
                            </span>
                          )}
                        </div>
                      ) : station.icon ? (
                        <span className="opacity-90">{station.icon}</span>
                      ) : (
                        <Utensils className="w-5 h-5 text-stone-400" />
                      )}
                    </div>

                    <span className="text-[10px] font-semibold text-stone-700 truncate max-w-[64px] mt-0.5 leading-tight">
                      {station.item ? station.item.label : station.label}
                    </span>

                    {/* Stack or Queue Count if present */}
                    {station.stack && station.stack.length > 0 && (
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1 rounded mt-0.5 border border-amber-300">
                        LIFO: {station.stack.length}
                      </span>
                    )}
                    {station.queue && station.queue.length > 0 && (
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1 rounded mt-0.5 border border-blue-300">
                        FIFO: {station.queue.length}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-300 my-auto" />
                )}

                {/* Chef Character Representation */}
                {isChefHere && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div
                      className={`relative flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg border-2 border-white transition-transform duration-200 ${getChefRotation(
                        chef.direction
                      )}`}
                    >
                      <ChefHat className="w-6 h-6 drop-shadow" />

                      {/* Regional Cuisine Flag Badge */}
                      <span className="absolute -bottom-1 -left-1 text-[11px] bg-white rounded-full p-0.5 shadow-xs border border-stone-200">
                        {activeCuisine.flag}
                      </span>

                      {/* Direction Pointer Nose */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow" />

                      {/* Held item bubble */}
                      {chef.heldItem && (
                        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white text-stone-900 border border-amber-300 shadow-md flex items-center justify-center text-xs animate-pulse">
                          {chef.heldItem.icon}
                        </div>
                      )}

                      {/* Action effects */}
                      {chef.isActionActive && (
                        <div className="absolute -bottom-2 text-xs animate-ping">
                          {chef.actionType === 'chop' ? '🔪' : '🍳'}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Chef Status Footer Ribbon */}
      <div className="mt-3 w-full flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur rounded-xl border border-stone-200 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isError ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
          <span className="font-semibold text-stone-800">{activeCuisine.chefName}:</span>
          <span className="text-stone-600 font-medium">{chef.statusText}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500">
          <span>{t.debugger.hands}:</span>
          {chef.heldItem ? (
            <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
              <span>{chef.heldItem.icon}</span>
              <span>{chef.heldItem.label}</span>
            </span>
          ) : (
            <span className="text-stone-400 italic">{t.debugger.empty}</span>
          )}
        </div>
      </div>
    </div>
  );
};
