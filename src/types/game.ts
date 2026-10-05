/**
 * Algorithm Chef - Type Definitions
 */

export type AgeBand = 'primary' | 'elementary' | 'middle' | 'high';

export type CareerRank =
  | 'trainee'       // Primary: Kitchen Trainee
  | 'line_cook'     // Elementary: Line Cook
  | 'sous_chef'     // Middle: Sous Chef
  | 'head_chef'     // High School: Head Chef
  | 'master_chef';   // Advanced: Master Algorithm Chef

export type BlockCategory =
  | 'movement'
  | 'action'
  | 'control'
  | 'logic'
  | 'function'
  | 'data_structure';

export type Direction = 'up' | 'down' | 'left' | 'right';

export type BlockType =
  // Movement
  | 'move_up'
  | 'move_down'
  | 'move_left'
  | 'move_right'
  | 'turn'
  // Kitchen Actions
  | 'grab'
  | 'place'
  | 'chop'
  | 'cook'
  | 'mix'
  | 'serve'
  | 'wait'
  // Control flow / loops
  | 'repeat_times'
  | 'while_condition'
  // Logic & Conditionals
  | 'if_condition'
  | 'if_else_condition'
  // Functions
  | 'call_function'
  // Data Structures (Middle/High)
  | 'stack_push'
  | 'stack_pop'
  | 'queue_enqueue'
  | 'queue_dequeue'
  | 'swap_items'
  | 'set_variable';

export interface InstructionBlock {
  id: string;
  type: BlockType;
  category: BlockCategory;
  label: string;
  description: string;
  iconName: string;
  params?: {
    count?: number;             // For repeat_times
    condition?: string;         // Condition key
    functionName?: string;      // For function calls
    varName?: string;           // Variable name
    varValue?: string | number; // Variable value
    station?: string;
  };
  children?: InstructionBlock[];      // Nested loop or if-branch blocks
  elseChildren?: InstructionBlock[];  // Else-branch blocks
}

export interface CustomFunction {
  id: string;
  name: string;
  description: string;
  blocks: InstructionBlock[];
}

export type ItemType =
  | 'bread'
  | 'toast'
  | 'butter'
  | 'buttered_bread'
  | 'peanut_butter'
  | 'jelly'
  | 'sandwich'
  | 'raw_carrot'
  | 'chopped_carrot'
  | 'raw_potato'
  | 'chopped_potato'
  | 'raw_patty'
  | 'cooked_patty'
  | 'cheese'
  | 'lettuce'
  | 'burger'
  | 'uncooked_soup'
  | 'cooked_soup'
  | 'knife'
  | 'spatula'
  | 'empty_plate'
  | 'order_ticket'
  | 'spice_jar';

export interface KitchenItem {
  id: string;
  type: ItemType;
  label: string;
  icon: string;
  state?: 'raw' | 'chopped' | 'cooked' | 'burnt' | 'finished';
  size?: number; // For sorting challenges (e.g. 1 to 5)
  weight?: number;
}

export type StationType =
  | 'counter'
  | 'cutting_board'
  | 'stove'
  | 'pantry'
  | 'assembly_station'
  | 'customer_window'
  | 'stack_tray'     // LIFO Stack visualizer
  | 'order_queue'    // FIFO Queue visualizer
  | 'trash'
  | 'wall';

export interface GridCell {
  x: number;
  y: number;
  type: StationType;
  label: string;
  icon?: string;
  item?: KitchenItem | null;
  stack?: KitchenItem[];   // If stack_tray station
  queue?: KitchenItem[];   // If order_queue station
  panHeat?: boolean;
  isChoppingActive?: boolean;
}

export interface ChefState {
  x: number;
  y: number;
  direction: Direction;
  heldItem: KitchenItem | null;
  heldTool: 'knife' | 'spatula' | null;
  statusText: string;
  isActionActive: boolean;
  actionType?: 'chop' | 'cook' | 'grab' | 'place' | 'error';
}

export interface KitchenLevel {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  ageBand: AgeBand;
  rank: CareerRank;
  csConcept: string;
  csDescription: string;
  story: string;
  taskGoal: string;
  gridWidth: number;
  gridHeight: number;
  chefStart: { x: number; y: number; direction: Direction };
  stations: GridCell[];
  availableBlocks: BlockType[];
  starterBlocks?: InstructionBlock[];
  customFunctions?: CustomFunction[];
  optimalSteps: number;
  threeStarMaxSteps: number;
  twoStarMaxSteps: number;
  hints: string[];
  bigOIntuition?: {
    complexity: string;
    explanation: string;
    whyOptimal: string;
  };
  targetPlateValidation: (
    finalState: {
      grid: GridCell[];
      chef: ChefState;
      deliveredOrders: KitchenItem[];
      variables: Record<string, any>;
    }
  ) => { success: boolean; message: string };
}

export interface ExecutionFrame {
  stepIndex: number;
  currentInstructionId: string | null;
  chef: ChefState;
  grid: GridCell[];
  variables: Record<string, any>;
  trayStack: KitchenItem[];
  orderQueue: KitchenItem[];
  logMessage: string;
  soundCue?: 'step' | 'grab' | 'place' | 'chop' | 'cook' | 'success' | 'error';
  isComplete?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export interface LevelProgress {
  levelId: string;
  completed: boolean;
  stars: number;
  bestSteps: number;
  studentExplanation?: string;
  unlockedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  badge: string;
  description: string;
  category: 'CS Concepts' | 'Efficiency' | 'Career' | 'Debugging';
  unlocked: boolean;
  progressText?: string;
}
