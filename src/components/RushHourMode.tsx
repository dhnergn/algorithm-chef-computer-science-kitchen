import React, { useState, useEffect } from 'react';
import { X, Flame, Clock, Trophy, Play, CheckCircle2, RotateCcw, AlertTriangle, Utensils } from 'lucide-react';
import { sound } from '../utils/audio';
import { CuisineCode, LanguageCode } from '../types/i18n';
import { CUISINES } from '../data/cuisines';
import { TRANSLATIONS } from '../data/translations';

interface RushHourProps {
  isOpen: boolean;
  onClose: () => void;
  cuisine?: CuisineCode;
  language?: LanguageCode;
}

interface OrderTicket {
  id: string;
  dish: string;
  icon: string;
  requiredSteps: string[];
  timeLeft: number;
  totalTime: number;
}

export const RushHourMode: React.FC<RushHourProps> = ({
  isOpen,
  onClose,
  cuisine = 'classic',
  language = 'en'
}) => {
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [ordersServed, setOrdersServed] = useState(0);
  const [orders, setOrders] = useState<OrderTicket[]>([]);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number>(0);
  const [simStep, setSimStep] = useState(0);

  const activeCuisine = CUISINES[cuisine] || CUISINES.classic;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Generate random order based on active cuisine
  const generateRandomOrder = (): OrderTicket => {
    const dishes = activeCuisine.rushHourDishes.length > 0
      ? activeCuisine.rushHourDishes
      : [
          { name: 'Toasted Bagel', icon: '🥯', steps: ['Grab Bread', 'Toast', 'Plate'] },
          { name: 'Vegetable Soup', icon: '🍲', steps: ['Chop Carrot', 'Boil Pot', 'Serve'] },
          { name: 'Caesar Salad', icon: '🥗', steps: ['Chop Lettuce', 'Drizzle Dressing', 'Toss'] },
          { name: 'Classic Burger', icon: '🍔', steps: ['Grill Patty', 'Stack Bun', 'Serve'] }
        ];
    const pick = dishes[Math.floor(Math.random() * dishes.length)];
    return {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 3)}`,
      dish: pick.name,
      icon: pick.icon,
      requiredSteps: pick.steps,
      timeLeft: 18,
      totalTime: 18
    };
  };

  const startRushHour = () => {
    setIsActive(true);
    setScore(0);
    setCombo(1);
    setOrdersServed(0);
    setSimStep(0);
    setSelectedTicketIndex(0);
    setOrders([generateRandomOrder(), generateRandomOrder(), generateRandomOrder()]);
    sound.playSuccess();
  };

  // Timer loop
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setOrders((prev) => {
        const next = prev.map((ord) => ({
          ...ord,
          timeLeft: Math.max(0, ord.timeLeft - 1)
        }));

        // Remove expired orders
        const remaining = next.filter((o) => o.timeLeft > 0);
        if (remaining.length < next.length) {
          sound.playError();
          setCombo(1);
        }

        // Keep 3 active orders
        while (remaining.length < 3) {
          remaining.push(generateRandomOrder());
        }

        return remaining;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const handleExecuteOrderStep = () => {
    if (orders.length === 0) return;
    const current = orders[selectedTicketIndex];
    if (!current) return;

    sound.playChop();

    if (simStep + 1 >= current.requiredSteps.length) {
      // Completed dish!
      sound.playSuccess();
      const points = 100 * combo;
      setScore((s) => s + points);
      setCombo((c) => Math.min(5, c + 1));
      setOrdersServed((n) => n + 1);
      setSimStep(0);

      // Remove served order and append new one
      setOrders((prev) => {
        const filtered = prev.filter((_, idx) => idx !== selectedTicketIndex);
        filtered.push(generateRandomOrder());
        return filtered;
      });
      setSelectedTicketIndex(0);
    } else {
      setSimStep((s) => s + 1);
    }
  };

  if (!isOpen) return null;

  const currentOrder = orders[selectedTicketIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white leading-tight">
                  {t.nav.rushHour} ({activeCuisine.flag} {activeCuisine.name})
                </h2>
              </div>
              <p className="text-xs text-stone-400">
                {activeCuisine.chefName} · {activeCuisine.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HUD Bar */}
        <div className="px-5 py-3 bg-stone-950/60 border-b border-stone-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-stone-500">Score:</span>{' '}
              <strong className="text-amber-400 text-sm">{score}</strong>
            </div>
            <div>
              <span className="text-stone-500">Multiplier:</span>{' '}
              <strong className="text-emerald-400 font-bold">{combo}x Combo</strong>
            </div>
            <div>
              <span className="text-stone-500">Served:</span>{' '}
              <strong className="text-white">{ordersServed}</strong>
            </div>
          </div>

          <button
            onClick={startRushHour}
            className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isActive ? 'Restart Rush' : 'Start Rush'}</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {!isActive ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">The Dinner Rush is Incoming!</h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto mt-1 mb-5">
                Orders arrive on the ticket line in a FIFO queue. Prioritize tickets before their patience timers run out!
              </p>
              <button
                onClick={startRushHour}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-stone-950 font-bold text-sm shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                Open Kitchen Doors!
              </button>
            </div>
          ) : (
            <div>
              {/* Ticket rail */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 font-mono">
                Order Ticket Queue (FIFO Buffer)
              </h4>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {orders.map((ord, idx) => {
                  const isSelected = idx === selectedTicketIndex;
                  const pct = (ord.timeLeft / ord.totalTime) * 100;

                  return (
                    <button
                      key={ord.id}
                      onClick={() => {
                        setSelectedTicketIndex(idx);
                        setSimStep(0);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-800 border-orange-500 shadow-md ring-1 ring-orange-500'
                          : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{ord.icon}</span>
                        <span className="text-[10px] font-mono text-stone-400">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">{ord.dish}</div>

                      {/* Timer bar */}
                      <div className="mt-2 w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pct > 50 ? 'bg-emerald-500' : pct > 20 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 mt-1 block">
                        {ord.timeLeft}s left
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Pipeline Execution */}
              {currentOrder && (
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentOrder.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Prepping: {currentOrder.dish}
                        </h4>
                        <p className="text-xs text-stone-400">
                          Step {simStep + 1} of {currentOrder.requiredSteps.length}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleExecuteOrderStep}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold text-xs shadow cursor-pointer transition-transform active:scale-95"
                    >
                      Execute Step ({currentOrder.requiredSteps[simStep]})
                    </button>
                  </div>

                  {/* Step indicators */}
                  <div className="flex items-center gap-2">
                    {currentOrder.requiredSteps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex-1 p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                          sIdx < simStep
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : sIdx === simStep
                            ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-bold'
                            : 'bg-stone-900 border-stone-800 text-stone-500'
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
          <span>Priority scheduling models CPU task management algorithms.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-white cursor-pointer"
          >
            Leave Rush Hour
          </button>
        </div>
      </div>
    </div>
  );
};
