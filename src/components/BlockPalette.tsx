import React from 'react';
import { BlockType, InstructionBlock, AgeBand } from '../types/game';
import { LanguageCode } from '../types/i18n';
import { TRANSLATIONS } from '../data/translations';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Hand,
  FolderDown,
  Scissors,
  Flame,
  Clock,
  Repeat,
  HelpCircle,
  Code2,
  Layers,
  ArrowDownUp,
  Plus
} from 'lucide-react';

interface BlockPaletteProps {
  availableBlockTypes: BlockType[];
  ageBand: AgeBand;
  onAddBlock: (block: InstructionBlock) => void;
  language?: LanguageCode;
}

// Master dictionary of block prototypes
const BLOCK_DEFINITIONS: Record<
  BlockType,
  {
    type: BlockType;
    label: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
    defaultParams?: any;
    category: 'movement' | 'action' | 'control' | 'logic' | 'function' | 'data_structure';
  }
> = {
  move_up: {
    type: 'move_up',
    label: 'Move Up',
    description: 'Walk 1 step north',
    icon: <ArrowUp className="w-4 h-4" />,
    colorClass: 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
    category: 'movement'
  },
  move_down: {
    type: 'move_down',
    label: 'Move Down',
    description: 'Walk 1 step south',
    icon: <ArrowDown className="w-4 h-4" />,
    colorClass: 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
    category: 'movement'
  },
  move_left: {
    type: 'move_left',
    label: 'Move Left',
    description: 'Walk 1 step west',
    icon: <ArrowLeft className="w-4 h-4" />,
    colorClass: 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
    category: 'movement'
  },
  move_right: {
    type: 'move_right',
    label: 'Move Right',
    description: 'Walk 1 step east',
    icon: <ArrowRight className="w-4 h-4" />,
    colorClass: 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
    category: 'movement'
  },
  turn: {
    type: 'turn',
    label: 'Turn Facing',
    description: 'Turn chef to face direction',
    icon: <ArrowDownUp className="w-4 h-4" />,
    colorClass: 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
    category: 'movement'
  },
  grab: {
    type: 'grab',
    label: 'Grab / Pick Up',
    description: 'Pick up ingredient from station',
    icon: <Hand className="w-4 h-4" />,
    colorClass: 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600',
    category: 'action'
  },
  place: {
    type: 'place',
    label: 'Place / Plate',
    description: 'Put held item down onto station',
    icon: <FolderDown className="w-4 h-4" />,
    colorClass: 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600',
    category: 'action'
  },
  chop: {
    type: 'chop',
    label: 'Chop / Dice',
    description: 'Cut item on cutting board',
    icon: <Scissors className="w-4 h-4" />,
    colorClass: 'bg-teal-500 hover:bg-teal-600 text-white border-teal-600',
    category: 'action'
  },
  cook: {
    type: 'cook',
    label: 'Cook / Sizzle',
    description: 'Apply heat at stove station',
    icon: <Flame className="w-4 h-4" />,
    colorClass: 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600',
    category: 'action'
  },
  mix: {
    type: 'mix',
    label: 'Mix Ingredients',
    description: 'Blend or combine station items',
    icon: <RotateCcw className="w-4 h-4" />,
    colorClass: 'bg-teal-600 hover:bg-teal-700 text-white border-teal-700',
    category: 'action'
  },
  serve: {
    type: 'serve',
    label: 'Serve to Order',
    description: 'Deliver to customer window',
    icon: <CheckCircle className="w-4 h-4" />,
    colorClass: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700',
    category: 'action'
  },
  wait: {
    type: 'wait',
    label: 'Wait 1 Second',
    description: 'Pause for pan to heat',
    icon: <Clock className="w-4 h-4" />,
    colorClass: 'bg-stone-500 hover:bg-stone-600 text-white border-stone-600',
    category: 'action'
  },
  repeat_times: {
    type: 'repeat_times',
    label: 'Repeat Times',
    description: 'For-loop: runs child blocks N times',
    icon: <Repeat className="w-4 h-4" />,
    colorClass: 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600',
    defaultParams: { count: 3 },
    category: 'control'
  },
  while_condition: {
    type: 'while_condition',
    label: 'While Condition',
    description: 'Loops until condition is false',
    icon: <Repeat className="w-4 h-4" />,
    colorClass: 'bg-orange-600 hover:bg-orange-700 text-white border-orange-700',
    defaultParams: { condition: 'pan_is_hot' },
    category: 'control'
  },
  if_condition: {
    type: 'if_condition',
    label: 'If Condition',
    description: 'Branching logic based on kitchen state',
    icon: <HelpCircle className="w-4 h-4" />,
    colorClass: 'bg-purple-500 hover:bg-purple-600 text-white border-purple-600',
    defaultParams: { condition: 'pan_is_hot' },
    category: 'logic'
  },
  if_else_condition: {
    type: 'if_else_condition',
    label: 'If / Else',
    description: 'Execute if true, otherwise execute else',
    icon: <HelpCircle className="w-4 h-4" />,
    colorClass: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-700',
    defaultParams: { condition: 'pan_is_hot' },
    category: 'logic'
  },
  call_function: {
    type: 'call_function',
    label: 'Call Function()',
    description: 'Execute reusable subroutine',
    icon: <Code2 className="w-4 h-4" />,
    colorClass: 'bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-600',
    defaultParams: { functionName: 'SauteStation' },
    category: 'function'
  },
  stack_push: {
    type: 'stack_push',
    label: 'Stack: Push Item',
    description: 'Push held item onto top of LIFO stack',
    icon: <Layers className="w-4 h-4" />,
    colorClass: 'bg-slate-700 hover:bg-slate-800 text-white border-slate-900',
    category: 'data_structure'
  },
  stack_pop: {
    type: 'stack_pop',
    label: 'Stack: Pop Item',
    description: 'Pop top item off LIFO stack tray',
    icon: <Layers className="w-4 h-4" />,
    colorClass: 'bg-slate-700 hover:bg-slate-800 text-white border-slate-900',
    category: 'data_structure'
  },
  queue_enqueue: {
    type: 'queue_enqueue',
    label: 'Queue: Enqueue',
    description: 'Add new ticket to back of FIFO line',
    icon: <Layers className="w-4 h-4" />,
    colorClass: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-800',
    category: 'data_structure'
  },
  queue_dequeue: {
    type: 'queue_dequeue',
    label: 'Queue: Dequeue',
    description: 'Serve first customer ticket in FIFO line',
    icon: <Layers className="w-4 h-4" />,
    colorClass: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-800',
    category: 'data_structure'
  },
  swap_items: {
    type: 'swap_items',
    label: 'Swap Adjacent',
    description: 'Swap items between spot A and B (Bubble Sort)',
    icon: <ArrowDownUp className="w-4 h-4" />,
    colorClass: 'bg-rose-500 hover:bg-rose-600 text-white border-rose-700',
    category: 'action'
  },
  set_variable: {
    type: 'set_variable',
    label: 'Set Variable',
    description: 'Store or increment value',
    icon: <Code2 className="w-4 h-4" />,
    colorClass: 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-800',
    defaultParams: { varName: 'bentoCount', varValue: 1 },
    category: 'control'
  }
};

function RotateCcw(props: any) {
  return <ArrowDownUp {...props} />;
}
function CheckCircle(props: any) {
  return <Hand {...props} />;
}

export const BlockPalette: React.FC<BlockPaletteProps> = ({
  availableBlockTypes,
  ageBand,
  onAddBlock,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleSelect = (bType: BlockType) => {
    const def = BLOCK_DEFINITIONS[bType];
    if (!def) return;

    const blockTrans = t.blocks[bType] || { label: def.label, desc: def.description };

    const newBlock: InstructionBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type: bType,
      category: def.category,
      label: blockTrans.label,
      description: blockTrans.desc,
      iconName: bType,
      params: def.defaultParams ? { ...def.defaultParams } : {},
      children: def.type === 'repeat_times' || def.type === 'if_condition' || def.type === 'if_else_condition' ? [] : undefined,
      elseChildren: def.type === 'if_else_condition' ? [] : undefined
    };

    onAddBlock(newBlock);
  };

  // Group blocks by category
  const activeDefs = availableBlockTypes
    .map((type) => BLOCK_DEFINITIONS[type])
    .filter(Boolean);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-stone-200/80 shadow-xs p-3 overflow-hidden">
      {/* Drawer Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            {t.toolbox.title}
          </h3>
          <p className="text-[11px] text-stone-500">
            {t.toolbox.hint}
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 uppercase">
          {t.ageBands[ageBand] || ageBand}
        </span>
      </div>

      {/* Blocks List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {activeDefs.map((def) => {
          const trans = t.blocks[def.type] || { label: def.label, desc: def.description };
          return (
            <button
              key={def.type}
              onClick={() => handleSelect(def.type)}
              className={`w-full text-left p-2 rounded-xl transition-all duration-150 flex items-center justify-between border ${def.colorClass} shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:translate-y-0`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="p-1 rounded-lg bg-black/15 shrink-0">
                  {def.icon}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold leading-tight truncate">
                    {trans.label}
                  </div>
                  <div className="text-[10px] opacity-85 leading-tight truncate">
                    {trans.desc}
                  </div>
                </div>
              </div>

              <div className="p-1 rounded bg-black/10 text-white shrink-0 ml-1">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
