import React from 'react';
import { CuisineCode, LanguageCode } from '../types/i18n';
import { CUISINES, LANGUAGES } from '../data/cuisines';
import { TRANSLATIONS } from '../data/translations';
import { X, Check, Globe, Utensils, Sparkles, ChefHat } from 'lucide-react';
import { sound } from '../utils/audio';

interface CuisineSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCuisine: CuisineCode;
  selectedLanguage: LanguageCode;
  onSelectCuisine: (c: CuisineCode) => void;
  onSelectLanguage: (l: LanguageCode) => void;
}

export const CuisineSelectorModal: React.FC<CuisineSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCuisine,
  selectedLanguage,
  onSelectCuisine,
  onSelectLanguage
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  const handleCuisinePick = (code: CuisineCode) => {
    sound.playClick();
    onSelectCuisine(code);
  };

  const handleLanguagePick = (lang: LanguageCode) => {
    sound.playClick();
    onSelectLanguage(lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-stone-900 tracking-tight">
                {t.nav.cuisineTheme} & {t.nav.selectLanguage}
              </h2>
              <p className="text-xs text-stone-500">
                Choose your culinary region and preferred language for Algorithm Chef
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Language Options */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
              <Globe className="w-4 h-4 text-sky-600" />
              <span>Available Languages (国际语言 / Idiomas / Diller / भाषाएँ / Langues)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguagePick(lang.code)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300/40 shadow-xs'
                        : 'bg-stone-50/70 border-stone-200/80 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl leading-none">{lang.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-stone-900 leading-tight">
                          {lang.nativeName}
                        </div>
                        <div className="text-[11px] text-stone-500 leading-tight">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: World Cuisine & Kitchen Styles */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>World Cuisine Kitchen Themes (5 Global Cultures + Classic)</span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                Changes Chef Mentor, Kitchen Stations & Rush Hour Orders
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(Object.keys(CUISINES) as CuisineCode[]).map((cKey) => {
                const c = CUISINES[cKey];
                const isSelected = selectedCuisine === cKey;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleCuisinePick(c.id)}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-400/40 shadow-sm'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl filter drop-shadow-xs">{c.flag}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-extrabold text-stone-900 leading-tight">
                              {c.name}
                            </h3>
                            {isSelected && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-amber-700">
                            {c.chefName} · {c.nativeName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-base">
                        {c.dishIcons.slice(0, 4).map((icon, idx) => (
                          <span key={idx}>{icon}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-2.5">
                      {c.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                      {c.specialtyDishes.slice(0, 3).map((dish, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Selected: <strong className="text-stone-800">{CUISINES[selectedCuisine].name}</strong> ·{' '}
            <strong className="text-stone-800">{LANGUAGES.find(l => l.code === selectedLanguage)?.name}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
          >
            Apply & Return to Kitchen
          </button>
        </div>
      </div>
    </div>
  );
};
