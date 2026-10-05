import { KitchenLevel, InstructionBlock } from '../types/game';

export const CURRICULUM_LEVELS: KitchenLevel[] = [
  // ==========================================
  // PRIMARY (AGES 5–7): Kitchen Trainee
  // Focus: Sequencing, Cause & Effect, Ordered Steps
  // ==========================================
  {
    id: 'p1_toast',
    code: 'P-101',
    title: 'Warm Buttered Toast',
    subtitle: 'Sequencing & Ordered Steps',
    ageBand: 'primary',
    rank: 'trainee',
    csConcept: 'Linear Algorithm Sequencing',
    csDescription: 'Computers follow instructions one line at a time, from top to bottom. If you put steps in the wrong order, the recipe fails!',
    story: 'Welcome to the kitchen, Apprentice! Your first customer wants golden toast with fresh butter. Walk to the toaster, grab the toast, butter it, and plate it!',
    taskGoal: 'Grab the bread, place it on the cutting board, spread butter, and serve to the plate!',
    gridWidth: 4,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 0,
        y: 0,
        type: 'pantry',
        label: 'Bread Box',
        icon: '🍞',
        item: { id: 'item_bread', type: 'bread', label: 'Fresh Bread', icon: '🍞', state: 'raw' }
      },
      {
        x: 2,
        y: 0,
        type: 'cutting_board',
        label: 'Prep Board',
        icon: '🧈',
        item: { id: 'item_butter', type: 'butter', label: 'Sweet Butter', icon: '🧈' }
      },
      {
        x: 3,
        y: 1,
        type: 'assembly_station',
        label: 'Serving Plate',
        icon: '🍽️',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'place', 'cook'],
    optimalSteps: 7,
    threeStarMaxSteps: 8,
    twoStarMaxSteps: 11,
    starterBlocks: [
      {
        id: 'start_1',
        type: 'move_up',
        category: 'movement',
        label: 'Move Up',
        description: 'Take 1 step north',
        iconName: 'ArrowUp'
      },
      {
        id: 'start_2',
        type: 'grab',
        category: 'action',
        label: 'Grab Item',
        description: 'Pick up bread from box',
        iconName: 'Hand'
      }
    ],
    hints: [
      'Chef Ada: "First grab the bread from (0,0), then walk to the prep board at (2,0)!"',
      'Chef Ada: "Remember to place the bread on the board and tap Cook/Prepare to butter it before plating!"'
    ],
    bigOIntuition: {
      complexity: 'O(1)',
      explanation: 'A fixed sequence of direct manual movements.',
      whyOptimal: 'Direct straight-line path takes the minimal step count.'
    },
    targetPlateValidation: ({ grid }) => {
      const plate = grid.find((c) => c.type === 'assembly_station');
      if (plate?.item && (plate.item.type === 'buttered_bread' || plate.item.type === 'toast' || plate.item.type === 'bread')) {
        return { success: true, message: 'Delicious golden toast prepared and served!' };
      }
      return { success: false, message: 'Serving plate is empty. The bread was not delivered to the plate!' };
    }
  },

  {
    id: 'p2_fruit_salad',
    code: 'P-102',
    title: 'Crispy Apple Salad',
    subtitle: 'Cause & Effect with Tools',
    ageBand: 'primary',
    rank: 'trainee',
    csConcept: 'Preconditions & Tool Dependencies',
    csDescription: 'An action cannot succeed unless its preconditions are met (e.g., you cannot chop fruit without holding the knife first!).',
    story: 'Chef Ada needs diced crisp apples. But watch out: you cannot chop bare-handed!',
    taskGoal: 'Pick up the chef knife, move to the cutting board with the apple, chop it, and place it on the plate.',
    gridWidth: 4,
    gridHeight: 3,
    chefStart: { x: 1, y: 1, direction: 'right' },
    stations: [
      {
        x: 0,
        y: 0,
        type: 'pantry',
        label: 'Knife Block',
        icon: '🔪',
        item: { id: 'knife_1', type: 'knife', label: 'Chef Knife', icon: '🔪' }
      },
      {
        x: 2,
        y: 0,
        type: 'cutting_board',
        label: 'Fruit Board',
        icon: '🍎',
        item: { id: 'apple_1', type: 'raw_carrot', label: 'Crisp Apple', icon: '🍎', state: 'raw' }
      },
      {
        x: 3,
        y: 2,
        type: 'assembly_station',
        label: 'Salad Bowl',
        icon: '🥗',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'chop', 'place'],
    optimalSteps: 9,
    threeStarMaxSteps: 10,
    twoStarMaxSteps: 13,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Grab the knife first at (0,0), or you will get an error when you try to chop!"',
      'Chef Ada: "Move to the cutting board at (2,0) and use the Chop block."'
    ],
    bigOIntuition: {
      complexity: 'O(1)',
      explanation: 'Sequential tool fetching and operation.',
      whyOptimal: 'Zero detour movements.'
    },
    targetPlateValidation: ({ grid }) => {
      const bowl = grid.find((c) => c.type === 'assembly_station');
      if (bowl?.item && (bowl.item.type === 'chopped_carrot' || bowl.item.state === 'chopped')) {
        return { success: true, message: 'Crisp chopped salad is in the bowl! Perfect preparation.' };
      }
      return { success: false, message: 'The bowl still needs the chopped fruit!' };
    }
  },

  {
    id: 'p3_sandwich',
    code: 'P-103',
    title: 'The Triple Layer PB&J',
    subtitle: 'Multi-Step Assembly Logic',
    ageBand: 'primary',
    rank: 'trainee',
    csConcept: 'Decomposition & Ordered Sequence',
    csDescription: 'Complex recipes are solved by breaking them down into small, ordered atomic actions.',
    story: 'Make a full gourmet PB&J! Pick up bottom bread, add the spread, and place on the serving counter.',
    taskGoal: 'Grab bread from pantry, place on board, grab peanut butter, combine, and deliver to serving plate.',
    gridWidth: 4,
    gridHeight: 3,
    chefStart: { x: 0, y: 2, direction: 'up' },
    stations: [
      {
        x: 0,
        y: 0,
        type: 'pantry',
        label: 'Bakery Bread',
        icon: '🍞',
        item: { id: 'pbj_bread', type: 'bread', label: 'Bakery Bread', icon: '🍞' }
      },
      {
        x: 2,
        y: 0,
        type: 'cutting_board',
        label: 'PB Jar Station',
        icon: '🥜',
        item: { id: 'item_pb', type: 'peanut_butter', label: 'Peanut Butter', icon: '🥜' }
      },
      {
        x: 3,
        y: 0,
        type: 'assembly_station',
        label: 'Order Window',
        icon: '🥪',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'place', 'cook'],
    optimalSteps: 10,
    threeStarMaxSteps: 11,
    twoStarMaxSteps: 15,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Grab bread, move right to PB station, prepare it, then take to Order Window!"'
    ],
    bigOIntuition: {
      complexity: 'O(1)',
      explanation: 'Constant-time linear procedure.',
      whyOptimal: 'Moving along the top counter row minimizes turning.'
    },
    targetPlateValidation: ({ grid }) => {
      const window = grid.find((c) => c.type === 'assembly_station');
      if (window?.item) {
        return { success: true, message: 'Triple layer sandwich completed and served!' };
      }
      return { success: false, message: 'The sandwich has not reached the Order Window yet.' };
    }
  },

  // ==========================================
  // ELEMENTARY (AGES 8–10): Line Cook
  // Focus: Loops (Repeat), Conditionals (If/Else), Debugging
  // ==========================================
  {
    id: 'e1_carrot_soup',
    code: 'E-201',
    title: 'Carrot Soup Dicing',
    subtitle: 'Loops (Repeat X Times)',
    ageBand: 'elementary',
    rank: 'line_cook',
    csConcept: 'For-Loops & Iterative Execution',
    csDescription: 'Instead of typing "Chop, Chop, Chop, Chop", programmers wrap actions in a loop: "Repeat 4 times { Chop }". Fewer blocks, zero repetition!',
    story: 'The soup recipe demands 4 precise chops on the giant heirloom carrot. You have limited code blocks—use a loop!',
    taskGoal: 'Grab the chef knife, walk to the carrot station, and use a "Repeat 4 Times" loop to chop the carrot into 4 soup cubes!',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'pantry',
        label: 'Knife Stand',
        icon: '🔪',
        item: { id: 'knife_e1', type: 'knife', label: 'Chef Knife', icon: '🔪' }
      },
      {
        x: 3,
        y: 0,
        type: 'cutting_board',
        label: 'Soup Carrot',
        icon: '🥕',
        item: { id: 'carrot_e1', type: 'raw_carrot', label: 'Giant Carrot', icon: '🥕', state: 'raw' }
      },
      {
        x: 4,
        y: 2,
        type: 'stove',
        label: 'Soup Pot',
        icon: '🍲',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'chop', 'place', 'repeat_times'],
    optimalSteps: 9,
    threeStarMaxSteps: 10,
    twoStarMaxSteps: 14,
    starterBlocks: [
      {
        id: 'e1_m1',
        type: 'move_up',
        category: 'movement',
        label: 'Move Up',
        description: 'Move to knife row',
        iconName: 'ArrowUp'
      },
      {
        id: 'e1_m2',
        type: 'move_right',
        category: 'movement',
        label: 'Move Right',
        description: 'Reach knife stand',
        iconName: 'ArrowRight'
      },
      {
        id: 'e1_g1',
        type: 'grab',
        category: 'action',
        label: 'Grab Knife',
        description: 'Take chef knife',
        iconName: 'Hand'
      }
    ],
    hints: [
      'Chef Ada: "Nest the Chop block INSIDE the Repeat 4 Times loop!"',
      'Chef Ada: "After chopping 4 times, grab the diced carrot and drop it in the soup pot at (4,2)."'
    ],
    bigOIntuition: {
      complexity: 'O(k)',
      explanation: 'Where k is the repeat count. Loop compresses code length drastically.',
      whyOptimal: 'Expressing repeated chops in a loop saves code space and cognitive load.'
    },
    targetPlateValidation: ({ grid, variables }) => {
      const pot = grid.find((c) => c.type === 'stove');
      const chops = variables.chopsDone || 0;
      if (chops >= 4 || (pot?.item && pot.item.type === 'cooked_soup')) {
        return { success: true, message: 'Masterful soup prep! 4 chops completed and simmered.' };
      }
      return { success: false, message: `Carrot needs 4 chops (current: ${chops}). Did you repeat enough times?` };
    }
  },

  {
    id: 'e2_pancake_turner',
    code: 'E-202',
    title: 'The Golden Pancake',
    subtitle: 'Simple Conditionals (If/Else)',
    ageBand: 'elementary',
    rank: 'line_cook',
    csConcept: 'Boolean Logic & Branching',
    csDescription: 'Conditionals let your code make decisions: IF the pan temperature is hot, cook immediately; ELSE, wait for the flame to heat.',
    story: 'Pancake batter will burn if cooked too early! Inspect the pan: If it is heated, flip; else, turn on the flame first.',
    taskGoal: 'Use an IF/ELSE condition block to ensure the pan is hot before flipping and plating the pancake.',
    gridWidth: 4,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'stove',
        label: 'Cast Iron Skillet',
        icon: '🍳',
        panHeat: true,
        item: { id: 'pancake_raw', type: 'raw_patty', label: 'Fluffy Batter', icon: '🥞', state: 'raw' }
      },
      {
        x: 3,
        y: 1,
        type: 'assembly_station',
        label: 'Breakfast Plate',
        icon: '🍽️',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'cook', 'place', 'if_condition', 'if_else_condition'],
    optimalSteps: 7,
    threeStarMaxSteps: 8,
    twoStarMaxSteps: 12,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Walk up to the skillet at (1,0). Put the Cook action inside the If [pan_is_hot] block!"',
      'Chef Ada: "Once cooked golden, grab the pancake and place it on the breakfast plate."'
    ],
    bigOIntuition: {
      complexity: 'O(1)',
      explanation: 'Conditional check executes in constant time.',
      whyOptimal: 'Branching avoids burnt food errors without polling delays.'
    },
    targetPlateValidation: ({ grid }) => {
      const plate = grid.find((c) => c.type === 'assembly_station');
      if (plate?.item && (plate.item.state === 'cooked' || plate.item.type === 'cooked_patty' || plate.item.type === 'burger')) {
        return { success: true, message: 'Golden brown pancake served hot and fluffy!' };
      }
      return { success: false, message: 'The pancake must be cooked and placed on the breakfast plate.' };
    }
  },

  {
    id: 'e3_burger_debug',
    code: 'E-203',
    title: 'The Great Burger Debug',
    subtitle: 'Debugging & Off-by-One Errors',
    ageBand: 'elementary',
    rank: 'line_cook',
    csConcept: 'Code Debugging & Trace Execution',
    csDescription: 'Programmers spend more time debugging than writing fresh code! Step through the broken recipe to spot where the chef trips.',
    story: 'A hurried line cook left behind a buggy recipe for the Deluxe Cheeseburger. The chef is walking into counters and grabbing out of turn! Fix the program.',
    taskGoal: 'Run the debugger, identify the broken instructions (wrong turn & wrong station), fix them, and serve the burger.',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'pantry',
        label: 'Brioche Bun',
        icon: '🍔',
        item: { id: 'bun_item', type: 'bread', label: 'Brioche Bun', icon: '🍞' }
      },
      {
        x: 3,
        y: 0,
        type: 'stove',
        label: 'Grill Patty',
        icon: '🥩',
        item: { id: 'patty_item', type: 'cooked_patty', label: 'Sizzled Patty', icon: '🥩', state: 'cooked' }
      },
      {
        x: 4,
        y: 2,
        type: 'assembly_station',
        label: 'Burger Basket',
        icon: '🧺',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'place', 'cook'],
    optimalSteps: 9,
    threeStarMaxSteps: 10,
    twoStarMaxSteps: 14,
    // Intentionally contains a bug (walks DOWN into wall instead of UP to bun)
    starterBlocks: [
      {
        id: 'bug_1',
        type: 'move_right',
        category: 'movement',
        label: 'Move Right',
        description: 'Move to x=1',
        iconName: 'ArrowRight'
      },
      {
        id: 'bug_2',
        type: 'move_down', // BUG! Should be move_up!
        category: 'movement',
        label: 'Move Down (BUG)',
        description: 'Oops! Bun is UP!',
        iconName: 'ArrowDown'
      },
      {
        id: 'bug_3',
        type: 'grab',
        category: 'action',
        label: 'Grab Bun',
        description: 'Pick up bun',
        iconName: 'Hand'
      }
    ],
    hints: [
      'Chef Ada: "Click Cook to test the program. Notice the Chef moves DOWN at step 2, but the bun is at (1,0) UP!"',
      'Chef Ada: "Swap Move Down with Move Up, then continue the path to the Grill Patty at (3,0)!"'
    ],
    bigOIntuition: {
      complexity: 'O(1)',
      explanation: 'Linear sequence with clean invariant checking.',
      whyOptimal: 'Catching logic bugs early prevents runtime crashes.'
    },
    targetPlateValidation: ({ grid }) => {
      const basket = grid.find((c) => c.type === 'assembly_station');
      if (basket?.item) {
        return { success: true, message: 'Deluxe Cheeseburger assembled and debugged cleanly!' };
      }
      return { success: false, message: 'The burger basket is still empty. Keep debugging!' };
    }
  },

  // ==========================================
  // MIDDLE SCHOOL (AGES 11–13): Sous Chef
  // Focus: Variables, Functions, Nested Loops, Efficiency & Big-O
  // ==========================================
  {
    id: 'm1_bento_box',
    code: 'M-301',
    title: 'The Optimized Bento Box',
    subtitle: 'Variables & Step Count Optimization',
    ageBand: 'middle',
    rank: 'sous_chef',
    csConcept: 'Algorithmic Efficiency & Loop Bounds',
    csDescription: 'Efficiency is the hallmark of great software. Solving a problem in 15 steps is fine; solving it in 8 steps scales to millions of users!',
    story: 'Assemble 3 sushi rolls into the Bento Box. Using individual blocks takes 24 steps! Can you use a loop counter variable to hit the 3-star benchmark?',
    taskGoal: 'Collect 3 sushi rolls using a loop with variable tracking, placing them into the bento tray in minimal steps.',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'pantry',
        label: 'Sushi Rolls',
        icon: '🍱',
        item: { id: 'sushi_pantry', type: 'cheese', label: 'Sushi Roll', icon: '🍣' }
      },
      {
        x: 3,
        y: 0,
        type: 'assembly_station',
        label: 'Bento Tray',
        icon: '🍱',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'place', 'repeat_times', 'set_variable', 'if_condition'],
    optimalSteps: 12,
    threeStarMaxSteps: 14,
    twoStarMaxSteps: 20,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Walk up to (1,0), repeat [Grab, Move Right x 2, Place, Move Left x 2] 3 times!"',
      'Chef Ada: "Notice how returning to the source inside the loop makes each iteration identical."'
    ],
    bigOIntuition: {
      complexity: 'O(N)',
      explanation: 'Where N = 3 items. Total operations scale linearly with order count.',
      whyOptimal: 'Minimizes redundant turns between pantry and bento tray.'
    },
    targetPlateValidation: ({ variables, grid }) => {
      const bento = grid.find((c) => c.type === 'assembly_station');
      if (bento?.item || (variables.bentoCount && variables.bentoCount >= 3)) {
        return { success: true, message: 'Bento box filled with optimal efficiency! Sous Chef grade achieved.' };
      }
      return { success: false, message: 'The bento box needs 3 sushi items delivered!' };
    }
  },

  {
    id: 'm2_saute_function',
    code: 'M-302',
    title: 'Reusable Sauté Function',
    subtitle: 'Functions & Modular Abstraction',
    ageBand: 'middle',
    rank: 'sous_chef',
    csConcept: 'Procedural Abstraction & DRY Principle',
    csDescription: 'DRY means "Don\'t Repeat Yourself". When you have a complex sub-routine (like Season, Stir, Pan-Fry), bundle it into a reusable Function and call it by name!',
    story: 'We have 2 distinct vegetable stations that need the exact same 3-step sauté routine. Define a function "SauteStation()" once, then call it at both locations!',
    taskGoal: 'Define the SauteStation function in the Function Builder, then call it at station A and station B.',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'cutting_board',
        label: 'Veggie Station A',
        icon: '🥦',
        item: { id: 'veg_a', type: 'raw_potato', label: 'Broccoli', icon: '🥦' }
      },
      {
        x: 3,
        y: 0,
        type: 'cutting_board',
        label: 'Veggie Station B',
        icon: '🫑',
        item: { id: 'veg_b', type: 'raw_carrot', label: 'Bell Pepper', icon: '🫑' }
      },
      {
        x: 4,
        y: 2,
        type: 'assembly_station',
        label: 'Sauté Platter',
        icon: '🍽️',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'chop', 'cook', 'place', 'call_function'],
    customFunctions: [
      {
        id: 'fn_saute',
        name: 'SauteStation',
        description: 'Chop and cook at current station',
        blocks: [
          {
            id: 'fn_b1',
            type: 'chop',
            category: 'action',
            label: 'Chop Veggie',
            description: 'Cut on board',
            iconName: 'Scissors'
          },
          {
            id: 'fn_b2',
            type: 'cook',
            category: 'action',
            label: 'Sizzle Heat',
            description: 'Apply pan heat',
            iconName: 'Flame'
          }
        ]
      }
    ],
    optimalSteps: 11,
    threeStarMaxSteps: 12,
    twoStarMaxSteps: 17,
    starterBlocks: [
      {
        id: 'call_1',
        type: 'call_function',
        category: 'function',
        label: 'Call SauteStation()',
        description: 'Execute custom saute sequence',
        iconName: 'Code2',
        params: { functionName: 'SauteStation' }
      }
    ],
    hints: [
      'Chef Ada: "Move to station A, call SauteStation(), walk to station B, and call SauteStation() again!"',
      'Chef Ada: "Functions eliminate code duplication and make your algorithms clean and readable."'
    ],
    bigOIntuition: {
      complexity: 'O(1) code overhead',
      explanation: 'Calls encapsulated subroutine in O(k) steps without code bloat.',
      whyOptimal: 'DRY code reduces maintenance costs and test surface.'
    },
    targetPlateValidation: ({ variables, grid }) => {
      const platter = grid.find((c) => c.type === 'assembly_station');
      if (variables.sauteCompleted || platter?.item || variables.functionsCalled >= 2) {
        return { success: true, message: 'Both stations sautéed flawlessly using reusable functions!' };
      }
      return { success: false, message: 'Call SauteStation() at both veggie stations before finishing!' };
    }
  },

  {
    id: 'm3_big_o_soup',
    code: 'M-303',
    title: 'The Big-O Kitchen Sweep',
    subtitle: 'Big-O Intuition (O(N) vs O(N²))',
    ageBand: 'middle',
    rank: 'sous_chef',
    csConcept: 'Time Complexity & Algorithmic Scaling',
    csDescription: 'A naive chef walks back to the pantry after every single potato slice: that is O(N²) quadratic waste! A smart chef batches them in a single sweep: O(N) linear time.',
    story: 'The dinner crowd is starving! 4 spice jars need seasoning. Will you take the slow O(N²) back-and-forth path, or the single O(N) sweep?',
    taskGoal: 'Sweep across all 4 seasoning jars in a single pass without backtracking.',
    gridWidth: 6,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      { x: 1, y: 0, type: 'counter', label: 'Pepper', icon: '🧂', item: { id: 'sp_1', type: 'spice_jar', label: 'Pepper', icon: '🧂' } },
      { x: 2, y: 0, type: 'counter', label: 'Garlic', icon: '🧄', item: { id: 'sp_2', type: 'spice_jar', label: 'Garlic', icon: '🧄' } },
      { x: 3, y: 0, type: 'counter', label: 'Paprika', icon: '🌶️', item: { id: 'sp_3', type: 'spice_jar', label: 'Paprika', icon: '🌶️' } },
      { x: 4, y: 0, type: 'counter', label: 'Oregano', icon: '🌿', item: { id: 'sp_4', type: 'spice_jar', label: 'Oregano', icon: '🌿' } },
      { x: 5, y: 1, type: 'assembly_station', label: 'Master Pot', icon: '🍲', item: null }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'cook', 'repeat_times'],
    optimalSteps: 8,
    threeStarMaxSteps: 9,
    twoStarMaxSteps: 15,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Walk up to row 0, then move right across all 4 stations while seasoning!"',
      'Chef Ada: "Avoid walking back to start between each jar; a linear sweep is O(N) optimal!"'
    ],
    bigOIntuition: {
      complexity: 'O(N)',
      explanation: 'Linear time: visits each spice station exactly once, taking N steps instead of N*N.',
      whyOptimal: 'Quadratic backtracking wastes chef stamina and precious service seconds.'
    },
    targetPlateValidation: ({ variables, grid }) => {
      const pot = grid.find((c) => c.type === 'assembly_station');
      if (pot?.item || variables.seasoningCount >= 4) {
        return { success: true, message: 'Superb linear sweep! You demonstrated true O(N) algorithmic intuition.' };
      }
      return { success: false, message: 'Make sure all 4 spice stations are seasoned!' };
    }
  },

  // ==========================================
  // HIGH SCHOOL (AGES 14–18): Head Chef & Master Algorithm Chef
  // Focus: Data Structures (Stacks & Queues), Sorting Algorithms,
  // Binary Search, Block-to-Text Translation
  // ==========================================
  {
    id: 'h1_fifo_queue',
    code: 'H-401',
    title: 'FIFO Customer Order Queue',
    subtitle: 'Queue Data Structure (First-In, First-Out)',
    ageBand: 'high',
    rank: 'head_chef',
    csConcept: 'Queues (FIFO: First-In, First-Out)',
    csDescription: 'In a restaurant ticket line, the first customer to order is the first customer served. That is the fundamental FIFO Queue data structure (enqueue & dequeue)!',
    story: 'Tickets are printing at the order station! Dequeue Ticket #1 (Pasta), cook it, serve it; then dequeue Ticket #2 (Pizza) in strict FIFO order.',
    taskGoal: 'Use Dequeue to take orders in arrival order, cook each at the stove, and deliver to the pass window.',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'order_queue',
        label: 'Order Ticket Queue (FIFO)',
        icon: '🎟️',
        queue: [
          { id: 't1', type: 'order_ticket', label: 'Order #101: Pasta', icon: '🍝' },
          { id: 't2', type: 'order_ticket', label: 'Order #102: Pizza', icon: '🍕' }
        ]
      },
      {
        x: 3,
        y: 0,
        type: 'stove',
        label: 'Range Stove',
        icon: '🍳',
        item: null
      },
      {
        x: 4,
        y: 2,
        type: 'customer_window',
        label: 'Pass Window',
        icon: '🛎️',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'queue_dequeue', 'cook', 'place', 'repeat_times', 'while_condition'],
    optimalSteps: 12,
    threeStarMaxSteps: 14,
    twoStarMaxSteps: 20,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Move to (1,0) and use Dequeue. Notice how the first ticket in line pops into your hands!"',
      'Chef Ada: "Take it to the stove, cook it, then deliver to Pass Window (4,2). Then repeat for the next order!"'
    ],
    bigOIntuition: {
      complexity: 'O(1) per Dequeue',
      explanation: 'Queue enqueue and dequeue operations run in constant time O(1).',
      whyOptimal: 'Guarantees fair order turnaround and zero starvation of old tickets.'
    },
    targetPlateValidation: ({ variables, grid }) => {
      const queueStation = grid.find((c) => c.type === 'order_queue');
      const passWindow = grid.find((c) => c.type === 'customer_window');
      if ((queueStation?.queue && queueStation.queue.length === 0) || variables.ordersServed >= 2 || passWindow?.item) {
        return { success: true, message: 'All tickets processed in flawless FIFO order! Queue data structure mastered.' };
      }
      return { success: false, message: 'Process both orders in the queue using Dequeue!' };
    }
  },

  {
    id: 'h2_lifo_stack',
    code: 'H-402',
    title: 'LIFO Skyscraper Burger Stack',
    subtitle: 'Stack Data Structure (Last-In, First-Out)',
    ageBand: 'high',
    rank: 'head_chef',
    csConcept: 'Stacks (LIFO: Last-In, First-Out)',
    csDescription: 'Like a stack of dinner plates or burger layers: the LAST item you push onto the stack is the FIRST item you pop off! Stacks power undo buttons and function call stacks.',
    story: 'Assemble the Gourmet Stack: Push Bun, Push Patty, Push Cheese onto the prep tray, then Pop in reverse order to inspect the layer!',
    taskGoal: 'Push 3 layers onto the Stack Tray using stack_push, then Pop the top cheese slice to inspect it.',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'pantry',
        label: 'Pantry Shelves',
        icon: '🧀',
        item: { id: 'cheese_stack', type: 'cheese', label: 'Cheddar', icon: '🧀' }
      },
      {
        x: 3,
        y: 0,
        type: 'stack_tray',
        label: 'Stack Tray (LIFO)',
        icon: '🥞',
        stack: [
          { id: 'st_1', type: 'bread', label: 'Bottom Bun', icon: '🍞' },
          { id: 'st_2', type: 'cooked_patty', label: 'Beef Patty', icon: '🥩' }
        ]
      },
      {
        x: 4,
        y: 2,
        type: 'assembly_station',
        label: 'Gourmet Table',
        icon: '🍽️',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'stack_push', 'stack_pop', 'place'],
    optimalSteps: 9,
    threeStarMaxSteps: 10,
    twoStarMaxSteps: 16,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Grab cheese from (1,0), walk to Stack Tray at (3,0), and execute Stack Push!"',
      'Chef Ada: "Observe how Stack Pop retrieves the most recent item added (LIFO behavior)."'
    ],
    bigOIntuition: {
      complexity: 'O(1) Push/Pop',
      explanation: 'Stack operations occur strictly at the top of the stack in constant time.',
      whyOptimal: 'Zero traversal overhead; instant access to the most recent layer.'
    },
    targetPlateValidation: ({ variables, grid }) => {
      const stackStation = grid.find((c) => c.type === 'stack_tray');
      if (variables.pushedToStack || (stackStation?.stack && stackStation.stack.length >= 3) || variables.stackMastered) {
        return { success: true, message: 'Stack LIFO logic verified! Cheddar placed cleanly on top.' };
      }
      return { success: false, message: 'Push the cheese onto the Stack Tray at (3,0)!' };
    }
  },

  {
    id: 'h3_ingredient_sort',
    code: 'H-403',
    title: 'The Size-Sorting Line',
    subtitle: 'Algorithm Design: Sorting & Swap',
    ageBand: 'high',
    rank: 'master_chef',
    csConcept: 'Sorting Algorithms (Bubble / Selection Sort)',
    csDescription: 'Chefs need ingredients arranged from smallest to largest size so they cook evenly. Algorithms compare adjacent pairs and swap them when out of order.',
    story: 'Three pumpkins are placed randomly on the prep table: [Size 4, Size 1, Size 2]. Use comparison and Swap blocks to sort them in ascending order [1, 2, 4]!',
    taskGoal: 'Inspect adjacent counters and use the Swap block until pumpkins are sorted from smallest to largest.',
    gridWidth: 5,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      {
        x: 1,
        y: 0,
        type: 'counter',
        label: 'Spot 1 (Size 4)',
        icon: '🎃',
        item: { id: 'p_4', type: 'raw_carrot', label: 'Pumpkin (Size 4)', icon: '🎃', size: 4 }
      },
      {
        x: 2,
        y: 0,
        type: 'counter',
        label: 'Spot 2 (Size 1)',
        icon: '🎃',
        item: { id: 'p_1', type: 'raw_carrot', label: 'Pumpkin (Size 1)', icon: '🎃', size: 1 }
      },
      {
        x: 3,
        y: 0,
        type: 'counter',
        label: 'Spot 3 (Size 2)',
        icon: '🎃',
        item: { id: 'p_2', type: 'raw_carrot', label: 'Pumpkin (Size 2)', icon: '🎃', size: 2 }
      },
      {
        x: 4,
        y: 2,
        type: 'assembly_station',
        label: 'Inspection Pad',
        icon: '⚖️',
        item: null
      }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'swap_items', 'if_condition', 'repeat_times'],
    optimalSteps: 8,
    threeStarMaxSteps: 9,
    twoStarMaxSteps: 15,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Stand between Spot 1 and Spot 2. Notice 4 > 1, so execute Swap Items!"',
      'Chef Ada: "Then move right and check Spot 2 and Spot 3. If out of order, swap again!"'
    ],
    bigOIntuition: {
      complexity: 'O(N²) Bubble Sort vs O(N log N) Merge Sort',
      explanation: 'Adjacent pairwise swapping compares N elements across passes, yielding quadratic time for large arrays.',
      whyOptimal: 'For 3 elements, bubble swap uses minimal memory space O(1) in-place.'
    },
    targetPlateValidation: ({ grid }) => {
      const s1 = grid.find((c) => c.x === 1 && c.y === 0)?.item?.size;
      const s2 = grid.find((c) => c.x === 2 && c.y === 0)?.item?.size;
      const s3 = grid.find((c) => c.x === 3 && c.y === 0)?.item?.size;

      if (s1 !== undefined && s2 !== undefined && s3 !== undefined && s1 <= s2 && s2 <= s3) {
        return { success: true, message: 'Pumpkins sorted in perfect ascending order [1, 2, 4]!' };
      }
      return { success: false, message: `Current order is [${s1}, ${s2}, ${s3}]. Goal is [1, 2, 4]!` };
    }
  },

  {
    id: 'h4_binary_search',
    code: 'H-404',
    title: 'The Spice Rack Binary Search',
    subtitle: 'Algorithm Design: Binary Search (O(log N))',
    ageBand: 'high',
    rank: 'master_chef',
    csConcept: 'Binary Search & Divide-and-Conquer',
    csDescription: 'When searching a sorted spice rack of 7 jars for "Nutmeg", a linear scan checks up to 7 jars O(N). Binary search checks the middle jar first, eliminating half the rack every step: O(log N)!',
    story: 'The master sauce needs Nutmeg (Alphabetical rank #5). Don\'t check jars 1, 2, 3 one by one! Jump straight to the middle jar #4, realize #5 is higher, and jump right.',
    taskGoal: 'Check the middle jar at (3,0), verify it is smaller than target, then jump directly to the target spice jar.',
    gridWidth: 7,
    gridHeight: 3,
    chefStart: { x: 0, y: 1, direction: 'right' },
    stations: [
      { x: 1, y: 0, type: 'counter', label: '1: Allspice', icon: '🫙', item: { id: 'sp1', type: 'spice_jar', label: 'Allspice', icon: '🫙', size: 1 } },
      { x: 2, y: 0, type: 'counter', label: '2: Cardamom', icon: '🫙', item: { id: 'sp2', type: 'spice_jar', label: 'Cardamom', icon: '🫙', size: 2 } },
      { x: 3, y: 0, type: 'counter', label: '3: Cinnamon', icon: '🫙', item: { id: 'sp3', type: 'spice_jar', label: 'Cinnamon', icon: '🫙', size: 3 } },
      { x: 4, y: 0, type: 'counter', label: '4: Ginger [MID]', icon: '🫙', item: { id: 'sp4', type: 'spice_jar', label: 'Ginger', icon: '🫙', size: 4 } },
      { x: 5, y: 0, type: 'counter', label: '5: Nutmeg [TARGET]', icon: '✨', item: { id: 'sp5', type: 'spice_jar', label: 'Nutmeg', icon: '✨', size: 5 } },
      { x: 6, y: 1, type: 'assembly_station', label: 'Sauce Pan', icon: '🥘', item: null }
    ],
    availableBlocks: ['move_up', 'move_down', 'move_left', 'move_right', 'grab', 'place', 'if_condition'],
    optimalSteps: 9,
    threeStarMaxSteps: 10,
    twoStarMaxSteps: 16,
    starterBlocks: [],
    hints: [
      'Chef Ada: "Move directly to the middle jar at (4,0) to inspect. Nutmeg is higher rank #5!"',
      'Chef Ada: "Eliminate jars 1-4 immediately and step right to (5,0) to grab Nutmeg."'
    ],
    bigOIntuition: {
      complexity: 'O(log N)',
      explanation: 'Binary search halves search space on every inspection: log2(8) = 3 steps instead of 8.',
      whyOptimal: 'In huge enterprise spice warehouses with 1,000,000 spices, binary search takes only 20 checks!'
    },
    targetPlateValidation: ({ grid }) => {
      const saucePan = grid.find((c) => c.type === 'assembly_station');
      if (saucePan?.item && (saucePan.item.size === 5 || saucePan.item.label.includes('Nutmeg'))) {
        return { success: true, message: 'Nutmeg located via logarithmic binary search!' };
      }
      return { success: false, message: 'Nutmeg (#5) must be brought to the Sauce Pan!' };
    }
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'first_dish',
    title: 'First Order Up!',
    badge: '🍳',
    description: 'Complete your first kitchen algorithm challenge.',
    category: 'Career' as const,
    unlocked: false
  },
  {
    id: 'loop_master',
    title: 'Loop Master',
    badge: '🔁',
    description: 'Solve a level using a Repeat / Loop instruction block.',
    category: 'CS Concepts' as const,
    unlocked: false
  },
  {
    id: 'debug_detective',
    title: 'Debug Detective',
    badge: '🔍',
    description: 'Use the Visual Debugger to fix an execution error in-place.',
    category: 'Debugging' as const,
    unlocked: false
  },
  {
    id: 'function_wizard',
    title: 'Function Wizard',
    badge: '📦',
    description: 'Author and call a custom reusable function.',
    category: 'CS Concepts' as const,
    unlocked: false
  },
  {
    id: 'big_o_optimizer',
    title: 'Big-O Optimizer',
    badge: '⚡',
    description: 'Earn a 3-star rating by achieving the optimal step benchmark.',
    category: 'Efficiency' as const,
    unlocked: false
  },
  {
    id: 'data_structure_guru',
    title: 'Stack & Queue Guru',
    badge: '📚',
    description: 'Successfully manipulate FIFO queues or LIFO stacks in high school levels.',
    category: 'CS Concepts' as const,
    unlocked: false
  },
  {
    id: 'code_translator',
    title: 'Polyglot Chef',
    badge: '💻',
    description: 'View your recipe block sequence in Python, JavaScript, and Pseudocode.',
    category: 'Career' as const,
    unlocked: false
  }
];
