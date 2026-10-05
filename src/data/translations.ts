import { LanguageCode } from '../types/i18n';
import { BlockType } from '../types/game';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  nav: {
    recipeBook: string;
    rushHour: string;
    teacherPortal: string;
    gdd: string;
    codeBridge: string;
    cuisineTheme: string;
    selectLanguage: string;
  };
  actions: {
    cook: string;
    pause: string;
    step: string;
    reset: string;
    clear: string;
    export: string;
    copy: string;
    copied: string;
    nextLevel: string;
    replay: string;
    explainSolution: string;
    functionBuilder: string;
    soundOn: string;
    soundOff: string;
  };
  ranks: {
    trainee: string;
    line_cook: string;
    sous_chef: string;
    head_chef: string;
    master_chef: string;
  };
  ageBands: {
    primary: string;
    elementary: string;
    middle: string;
    high: string;
  };
  debugger: {
    efficiencyMeter: string;
    liveMemory: string;
    dataStructures: string;
    executed: string;
    optimal: string;
    scopeLocal: string;
    noVariables: string;
    noDataStructures: string;
    topOfStack: string;
    headOfQueue: string;
    hands: string;
    empty: string;
    dishSuccess: string;
    errorEncountered: string;
    chefCoordinates: string;
    csConcept: string;
  };
  blocks: Record<BlockType, { label: string; desc: string }>;
  blockCategories: {
    movement: string;
    action: string;
    control: string;
    logic: string;
    function: string;
    data_structure: string;
  };
  toolbox: {
    title: string;
    hint: string;
  };
  timeline: {
    title: string;
    hint: string;
    emptyPlaceholder: string;
    stepCount: string;
  };
  mentor: {
    says: string;
  };
  levels: Record<
    string,
    {
      title: string;
      subtitle: string;
      csConcept: string;
      csDescription: string;
      story: string;
      taskGoal: string;
      hint: string;
    }
  >;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    appName: 'Algorithm Chef',
    appSubtitle: 'Computer Science Educational Kitchen',
    nav: {
      recipeBook: 'Recipe Book',
      rushHour: 'Rush Hour',
      teacherPortal: 'Teacher Portal',
      gdd: 'GDD & Standards',
      codeBridge: 'Code Bridge',
      cuisineTheme: 'Cuisine Theme',
      selectLanguage: 'Language'
    },
    actions: {
      cook: 'Cook Recipe',
      pause: 'Pause',
      step: 'Step',
      reset: 'Reset',
      clear: 'Clear All',
      export: 'Export JSON',
      copy: 'Copy Code',
      copied: 'Copied!',
      nextLevel: 'Next Recipe Level',
      replay: 'Try Again',
      explainSolution: 'Explain Solution',
      functionBuilder: 'Function Builder',
      soundOn: 'Enable Audio',
      soundOff: 'Mute Audio'
    },
    ranks: {
      trainee: 'Kitchen Trainee',
      line_cook: 'Line Cook',
      sous_chef: 'Sous Chef',
      head_chef: 'Head Chef',
      master_chef: 'Master Algorithm Chef'
    },
    ageBands: {
      primary: 'Primary (5-7)',
      elementary: 'Elem (8-10)',
      middle: 'Middle (11-13)',
      high: 'High (14-18)'
    },
    debugger: {
      efficiencyMeter: 'Efficiency Meter',
      liveMemory: 'Live Memory (Variables)',
      dataStructures: 'Data Structures',
      executed: 'Executed',
      optimal: 'optimal',
      scopeLocal: 'Scope: Local',
      noVariables: 'No variables declared',
      noDataStructures: 'No stack or queue active',
      topOfStack: 'Top of Stack',
      headOfQueue: 'Head of Line',
      hands: 'Hands',
      empty: 'Empty',
      dishSuccess: 'Dish Prepared Successfully! Check efficiency grade.',
      errorEncountered: 'Execution Error Encountered',
      chefCoordinates: 'Chef coordinates',
      csConcept: 'CS Concept'
    },
    blocks: {
      move_up: { label: 'Move Up', desc: 'Walk 1 step north' },
      move_down: { label: 'Move Down', desc: 'Walk 1 step south' },
      move_left: { label: 'Move Left', desc: 'Walk 1 step west' },
      move_right: { label: 'Move Right', desc: 'Walk 1 step east' },
      turn: { label: 'Turn Facing', desc: 'Turn chef to face direction' },
      grab: { label: 'Grab / Pick Up', desc: 'Pick up ingredient from station' },
      place: { label: 'Place / Plate', desc: 'Put held item down onto station' },
      chop: { label: 'Chop / Dice', desc: 'Cut item on cutting board' },
      cook: { label: 'Cook / Sizzle', desc: 'Apply heat at stove station' },
      mix: { label: 'Mix Ingredients', desc: 'Blend or combine station items' },
      serve: { label: 'Serve to Order', desc: 'Deliver to customer window' },
      wait: { label: 'Wait 1 Second', desc: 'Pause for pan to heat' },
      repeat_times: { label: 'Repeat Times', desc: 'For-loop: runs child blocks N times' },
      while_condition: { label: 'While Condition', desc: 'Loops until condition is false' },
      if_condition: { label: 'If Condition', desc: 'Branching logic based on kitchen state' },
      if_else_condition: { label: 'If / Else', desc: 'Execute if true, otherwise execute else' },
      call_function: { label: 'Call Function()', desc: 'Execute reusable subroutine' },
      stack_push: { label: 'Stack: Push Item', desc: 'Push held item onto top of LIFO stack' },
      stack_pop: { label: 'Stack: Pop Item', desc: 'Pop top item off LIFO stack tray' },
      queue_enqueue: { label: 'Queue: Enqueue', desc: 'Add new ticket to back of FIFO line' },
      queue_dequeue: { label: 'Queue: Dequeue', desc: 'Serve first customer ticket in FIFO line' },
      swap_items: { label: 'Swap Adjacent', desc: 'Swap items between spot A and B (Bubble Sort)' },
      set_variable: { label: 'Set Variable', desc: 'Store or increment value' }
    },
    blockCategories: {
      movement: 'Movement',
      action: 'Action',
      control: 'Control Flow',
      logic: 'Logic',
      function: 'Functions',
      data_structure: 'Data Structures'
    },
    toolbox: {
      title: 'Block Toolbox',
      hint: 'Tap or click any block to append to timeline'
    },
    timeline: {
      title: 'Algorithm Sequence',
      hint: 'Arrange ordered instructions to cook the dish',
      emptyPlaceholder: 'Drag or click blocks from the toolbox to build your recipe algorithm!',
      stepCount: 'instructions'
    },
    mentor: {
      says: 'Head Chef Mentor says:'
    },
    levels: {
      p1_toast: {
        title: 'Warm Buttered Toast',
        subtitle: 'Sequencing & Ordered Steps',
        csConcept: 'Linear Algorithm Sequencing',
        csDescription: 'Computers follow instructions one line at a time, from top to bottom. If you put steps in the wrong order, the recipe fails!',
        story: 'Welcome to the kitchen, Apprentice! Your first customer wants golden toast with fresh butter. Walk to the toaster, grab the toast, butter it, and plate it!',
        taskGoal: 'Grab the bread, place it on the cutting board, spread butter, and serve to the plate!',
        hint: 'First grab the bread from (0,0), then walk to the prep board at (2,0)!'
      },
      p2_fruit_salad: {
        title: 'Crispy Apple Salad',
        subtitle: 'Cause & Effect with Tools',
        csConcept: 'Preconditions & Tool Dependencies',
        csDescription: 'An action cannot succeed unless its preconditions are met (e.g., you cannot chop fruit without holding the knife first!).',
        story: 'Chef Ada needs diced crisp apples. But watch out: you cannot chop bare-handed!',
        taskGoal: 'Pick up the chef knife, move to the cutting board with the apple, chop it, and place it on the plate.',
        hint: 'Grab the knife first at (0,0), or you will get an error when you try to chop!'
      },
      p3_sandwich: {
        title: 'The Triple Layer PB&J',
        subtitle: 'Multi-Step Assembly Logic',
        csConcept: 'Decomposition & Ordered Sequence',
        csDescription: 'Complex recipes are solved by breaking them down into small, ordered atomic actions.',
        story: 'Make a full gourmet PB&J! Pick up bottom bread, add the spread, and place on the serving counter.',
        taskGoal: 'Grab bread from pantry, place on board, grab peanut butter, combine, and deliver to serving plate.',
        hint: 'Grab bread, move right to PB station, prepare it, then take to Order Window!'
      },
      e1_carrot_soup: {
        title: 'Carrot Soup Dicing',
        subtitle: 'Loops (Repeat X Times)',
        csConcept: 'For-Loops & Iterative Execution',
        csDescription: 'Instead of typing "Chop, Chop, Chop, Chop", programmers wrap actions in a loop: "Repeat 4 times { Chop }". Fewer blocks, zero repetition!',
        story: 'The soup recipe demands 4 precise chops on the giant heirloom carrot. You have limited code blocks—use a loop!',
        taskGoal: 'Grab the chef knife, walk to the carrot station, and use a "Repeat 4 Times" loop to chop the carrot into 4 soup cubes!',
        hint: 'Nest the Chop block INSIDE the Repeat 4 Times loop!'
      },
      e2_pancake_turner: {
        title: 'The Golden Pancake',
        subtitle: 'Simple Conditionals (If/Else)',
        csConcept: 'Boolean Logic & Branching',
        csDescription: 'Conditionals let your code make decisions: IF the pan temperature is hot, cook immediately; ELSE, wait for the flame to heat.',
        story: 'Pancake batter will burn if cooked too early! Inspect the pan: If it is heated, flip; else, turn on the flame first.',
        taskGoal: 'Use an IF/ELSE condition block to ensure the pan is hot before flipping and plating the pancake.',
        hint: 'Walk up to the skillet at (1,0). Put the Cook action inside the If [pan_is_hot] block!'
      },
      e3_burger_debug: {
        title: 'The Great Burger Debug',
        subtitle: 'Debugging & Off-by-One Errors',
        csConcept: 'Code Debugging & Trace Execution',
        csDescription: 'Programmers spend more time debugging than writing fresh code! Step through the broken recipe to spot where the chef trips.',
        story: 'A hurried line cook left behind a buggy recipe for the Deluxe Cheeseburger. The chef is walking into counters and grabbing out of turn! Fix the program.',
        taskGoal: 'Run the debugger, identify the broken instructions (wrong turn & wrong station), fix them, and serve the burger.',
        hint: 'Notice the Chef moves DOWN at step 2, but the bun is at (1,0) UP!'
      },
      m1_bento_box: {
        title: 'The Optimized Bento Box',
        subtitle: 'Variables & Step Count Optimization',
        csConcept: 'Algorithmic Efficiency & Loop Bounds',
        csDescription: 'Efficiency is the hallmark of great software. Solving a problem in 15 steps is fine; solving it in 8 steps scales to millions of users!',
        story: 'Assemble 3 sushi rolls into the Bento Box. Using individual blocks takes 24 steps! Can you use a loop counter variable to hit the 3-star benchmark?',
        taskGoal: 'Collect 3 sushi rolls using a loop with variable tracking, placing them into the bento tray in minimal steps.',
        hint: 'Walk up to (1,0), repeat [Grab, Move Right x 2, Place, Move Left x 2] 3 times!'
      },
      m2_saute_function: {
        title: 'Reusable Sauté Function',
        subtitle: 'Functions & Modular Abstraction',
        csConcept: 'Procedural Abstraction & DRY Principle',
        csDescription: 'DRY means "Don\'t Repeat Yourself". When you have a complex sub-routine, bundle it into a reusable Function and call it by name!',
        story: 'We have 2 distinct vegetable stations that need the exact same 3-step sauté routine. Define a function "SauteStation()" once, then call it at both locations!',
        taskGoal: 'Define the SauteStation function in the Function Builder, then call it at station A and station B.',
        hint: 'Move to station A, call SauteStation(), walk to station B, and call SauteStation() again!'
      },
      m3_big_o_soup: {
        title: 'The Big-O Kitchen Sweep',
        subtitle: 'Big-O Intuition (O(N) vs O(N²))',
        csConcept: 'Time Complexity & Algorithmic Scaling',
        csDescription: 'A naive chef walks back to the pantry after every single potato slice: that is O(N²) quadratic waste! A smart chef batches them in a single sweep: O(N) linear time.',
        story: 'The dinner crowd is starving! 4 spice jars need seasoning. Will you take the slow O(N²) back-and-forth path, or the single O(N) sweep?',
        taskGoal: 'Sweep across all 4 seasoning jars in a single pass without backtracking.',
        hint: 'Walk up to row 0, then move right across all 4 stations while seasoning!'
      },
      h1_fifo_queue: {
        title: 'FIFO Customer Order Queue',
        subtitle: 'Queue Data Structure (First-In, First-Out)',
        csConcept: 'Queues (FIFO: First-In, First-Out)',
        csDescription: 'In a restaurant ticket line, the first customer to order is the first customer served. That is the fundamental FIFO Queue data structure (enqueue & dequeue)!',
        story: 'Tickets are printing at the order station! Dequeue Ticket #1 (Pasta), cook it, serve it; then dequeue Ticket #2 (Pizza) in strict FIFO order.',
        taskGoal: 'Use Dequeue to take orders in arrival order, cook each at the stove, and deliver to the pass window.',
        hint: 'Move to (1,0) and use Dequeue. Notice how the first ticket in line pops into your hands!'
      },
      h2_lifo_stack: {
        title: 'LIFO Skyscraper Burger Stack',
        subtitle: 'Stack Data Structure (Last-In, First-Out)',
        csConcept: 'Stacks (LIFO: Last-In, First-Out)',
        csDescription: 'Like a stack of dinner plates or burger layers: the LAST item you push onto the stack is the FIRST item you pop off! Stacks power undo buttons and call stacks.',
        story: 'Assemble the Gourmet Stack: Push Bun, Push Patty, Push Cheese onto the prep tray, then Pop in reverse order to inspect the layer!',
        taskGoal: 'Push 3 layers onto the Stack Tray using stack_push, then Pop the top cheese slice to inspect it.',
        hint: 'Grab cheese from (1,0), walk to Stack Tray at (3,0), and execute Stack Push!'
      },
      h3_ingredient_sort: {
        title: 'The Size-Sorting Line',
        subtitle: 'Algorithm Design: Sorting & Swap',
        csConcept: 'Sorting Algorithms (Bubble / Selection Sort)',
        csDescription: 'Chefs need ingredients arranged from smallest to largest size so they cook evenly. Algorithms compare adjacent pairs and swap them when out of order.',
        story: 'Three pumpkins are placed randomly on the prep table: [Size 4, Size 1, Size 2]. Use comparison and Swap blocks to sort them in ascending order [1, 2, 4]!',
        taskGoal: 'Inspect adjacent counters and use the Swap block until pumpkins are sorted from smallest to largest.',
        hint: 'Stand between Spot 1 and Spot 2. Notice 4 > 1, so execute Swap Items!'
      },
      h4_binary_search: {
        title: 'The Spice Rack Binary Search',
        subtitle: 'Algorithm Design: Binary Search (O(log N))',
        csConcept: 'Binary Search & Divide-and-Conquer',
        csDescription: 'When searching a sorted spice rack of 7 jars for "Nutmeg", a linear scan checks up to 7 jars O(N). Binary search checks the middle jar first, eliminating half the rack every step: O(log N)!',
        story: 'The master sauce needs Nutmeg (Alphabetical rank #5). Don\'t check jars 1, 2, 3 one by one! Jump straight to the middle jar #4, realize #5 is higher, and jump right.',
        taskGoal: 'Check the middle jar at (3,0), verify it is smaller than target, then jump directly to the target spice jar.',
        hint: 'Move directly to the middle jar at (4,0) to inspect. Nutmeg is higher rank #5!'
      }
    }
  },

  // ==========================================
  // CHINESE (中文)
  // ==========================================
  zh: {
    appName: '算法主厨 (Algorithm Chef)',
    appSubtitle: '计算机科学烹饪思维教育课堂',
    nav: {
      recipeBook: '食谱秘籍 (成就)',
      rushHour: '高峰出餐 (Rush Hour)',
      teacherPortal: '教师教学台',
      gdd: '教学大纲与规范',
      codeBridge: '代码转换器',
      cuisineTheme: '菜系风味',
      selectLanguage: '语言 / Language'
    },
    actions: {
      cook: '执行算法 (烹饪)',
      pause: '暂停',
      step: '单步执行',
      reset: '重置',
      clear: '清空程序',
      export: '导出代码JSON',
      copy: '复制代码',
      copied: '已复制！',
      nextLevel: '下一关挑战',
      replay: '重新尝试',
      explainSolution: '解析我的解法',
      functionBuilder: '自定义函数构建',
      soundOn: '开启音效',
      soundOff: '静音'
    },
    ranks: {
      trainee: '厨房见习学徒 (Trainee)',
      line_cook: '灶台炒锅大厨 (Line Cook)',
      sous_chef: '副主厨 (Sous Chef)',
      head_chef: '行政总厨 (Head Chef)',
      master_chef: '特级算法大师 (Master Chef)'
    },
    ageBands: {
      primary: '启蒙幼小 (5-7岁)',
      elementary: '小学基础 (8-10岁)',
      middle: '初中进阶 (11-13岁)',
      high: '高中精通 (14-18岁)'
    },
    debugger: {
      efficiencyMeter: '算法效率计量器 (Big-O)',
      liveMemory: '实时变量内存 (Variables)',
      dataStructures: '数据结构监视器',
      executed: '已执行步数',
      optimal: '最佳基准',
      scopeLocal: '作用域：局部',
      noVariables: '暂无声明的变量',
      noDataStructures: '当前无活动的堆栈或队列',
      topOfStack: '栈顶元素 (Top)',
      headOfQueue: '队首订单 (Head)',
      hands: '手中所持',
      empty: '双手空空',
      dishSuccess: '美味出锅！烹饪算法验证成功。',
      errorEncountered: '算法运行时错误',
      chefCoordinates: '厨师当前坐标',
      csConcept: '计算机科学概念'
    },
    blocks: {
      move_up: { label: '向上移动', desc: '向北走1步' },
      move_down: { label: '向下移动', desc: '向南走1步' },
      move_left: { label: '向左移动', desc: '向西走1步' },
      move_right: { label: '向右移动', desc: '向东走1步' },
      turn: { label: '转变朝向', desc: '让大厨转向指定方向' },
      grab: { label: '拿起/抓取食材', desc: '从工作台拾取食材或工具' },
      place: { label: '放下/装盘', desc: '将手中物品放置到工作台' },
      chop: { label: '切碎/切块', desc: '在砧板上使用菜刀处理食材' },
      cook: { label: '加热/爆炒', desc: '在炉灶工作台加温烹饪' },
      mix: { label: '拌和调味', desc: '搅拌融合工作台上的配料' },
      serve: { label: '上菜出餐', desc: '运送到传菜出餐窗口' },
      wait: { label: '等待1秒', desc: '等待油温升高或锅热' },
      repeat_times: { label: '重复执行 N 次', desc: 'For循环：重复运行子指令' },
      while_condition: { label: 'While 循环条件', desc: '当条件成立时持续循环' },
      if_condition: { label: 'If 条件分支', desc: '根据厨房状态做逻辑判断' },
      if_else_condition: { label: 'If / Else 双分支', desc: '若满足则执行A，否则执行B' },
      call_function: { label: '调用函数 Function()', desc: '运行封装好的可复用模块' },
      stack_push: { label: '堆栈: 压入 (Push)', desc: '将物品压入后进先出(LIFO)托盘' },
      stack_pop: { label: '堆栈: 弹出 (Pop)', desc: '从栈顶取走最新压入的物品' },
      queue_enqueue: { label: '队列: 入队 (Enqueue)', desc: '将新单据加入排队尾部' },
      queue_dequeue: { label: '队列: 出队 (Dequeue)', desc: '按先到先得(FIFO)接待队首单' },
      swap_items: { label: '交换相邻物品', desc: '冒泡排序：交换两处物品' },
      set_variable: { label: '设置变量值', desc: '更新或递增计数器变量' }
    },
    blockCategories: {
      movement: '移动指令',
      action: '厨房动作',
      control: '控制流程 (循环)',
      logic: '逻辑条件分支',
      function: '函数模块',
      data_structure: '高级数据结构'
    },
    toolbox: {
      title: '指令积木工具箱',
      hint: '点击或拖拽积木以添加到算法时间线上'
    },
    timeline: {
      title: '算法程序序列',
      hint: '按逻辑排布烹饪步骤，驱动大厨行动',
      emptyPlaceholder: '从左侧工具箱点击指令积木，构建你的美味算法！',
      stepCount: '条指令'
    },
    mentor: {
      says: '指导老师李大厨提示：'
    },
    levels: {
      p1_toast: {
        title: '香脆黄油吐司',
        subtitle: '指令顺序与有序步骤',
        csConcept: '线性算法顺序 (Linear Sequencing)',
        csDescription: '计算机从上至下逐行执行代码。如果步骤颠倒，比如未切先炒，程序就会崩溃！',
        story: '欢迎来到中华与世界厨房！第一位客人需要一份抹有香浓黄油的吐司。走到储物台，取面包，涂抹黄油并装盘！',
        taskGoal: '在(0,0)取面包，放到(2,0)备菜台，涂黄油后送到(3,1)餐盘。',
        hint: '先在(0,0)拿起面包，再走到(2,0)的工作台！'
      },
      p2_fruit_salad: {
        title: '清脆苹果沙拉',
        subtitle: '因果关系与工具依赖',
        csConcept: '前置条件与工具依赖 (Preconditions)',
        csDescription: '一个动作若想成功，必须满足前置条件（比如：手无寸铁不能切苹果，必须先拿厨刀！）。',
        story: '大厨需要切丁的新鲜苹果。注意：空手切菜会报错！',
        taskGoal: '先去拿菜刀，再去苹果砧板切块，最后装入沙拉碗。',
        hint: '必须先在(0,0)拿起厨刀，否则执行切菜时会引发前置条件错误！'
      },
      p3_sandwich: {
        title: '三层美味三明治',
        subtitle: '多步骤分解思维',
        csConcept: '任务分解与有序构造 (Decomposition)',
        csDescription: '复杂的问题通常通过分解为细小、有序的原子操作来解决。',
        story: '制作完整的美味三明治！拿面包底，抹上酱料，送到出餐窗口。',
        taskGoal: '从储物柜取面包，放砧板，拿花生酱融合，送至传菜窗口。',
        hint: '拿面包后向右移动到酱料台，处理好后再送到窗口！'
      },
      e1_carrot_soup: {
        title: '胡萝卜浓汤切块',
        subtitle: '循环思维 (Repeat X Times)',
        csConcept: 'For 循环与迭代执行',
        csDescription: '不要重复写4次“切刀”，程序员使用循环结构：“重复4次 { 切碎 }”，省时又简洁！',
        story: '大胡萝卜需要精准切4刀才能下锅。代码块有限，请使用循环积木！',
        taskGoal: '拿起菜刀，走到胡萝卜台，用【重复4次】循环将其切成4份，放入汤锅。',
        hint: '把【切碎】积木嵌套在【重复4次】积木内部！'
      },
      e2_pancake_turner: {
        title: '金黄香煎薄饼',
        subtitle: '简单条件分支 (If/Else)',
        csConcept: '布尔逻辑与分支执行 (Boolean Branching)',
        csDescription: '条件语句让程序具有决策能力：如果平底锅已烧热，立刻翻面煎制；否则等待升温。',
        story: '面糊如果下冷锅会变黏！先检查平底锅温度：若已热则烹饪，否则先点火加热。',
        taskGoal: '使用 If 条件判断锅具状态，确保烤制金黄后装盘。',
        hint: '走到(1,0)的平底锅前，将烹饪动作放入 If [锅已热] 积木中！'
      },
      e3_burger_debug: {
        title: '汉堡王除错大作战',
        subtitle: '调试与逻辑纠错 (Debugging)',
        csConcept: '代码排错与单步追踪 (Code Tracing)',
        csDescription: '优秀的程序员花在除错上的时间往往多于写新代码！一步步单步执行，找出逻辑漏洞。',
        story: '匆忙的学徒写了一份有Bug的汉堡程序：大厨竟然撞向墙壁并抓空！请帮他修复程序。',
        taskGoal: '运行调试器，找到走错方向的积木（向下误走），替换为正确方向并完成出餐。',
        hint: '点击运行，观察大厨第2步向下走撞到了墙。实际汉堡面包在上方(1,0)！'
      },
      m1_bento_box: {
        title: '高效便当盒组装',
        subtitle: '变量控制与步数优化',
        csConcept: '算法效率与循环边界 (Algorithmic Efficiency)',
        csDescription: '写出能跑通的代码只是第一步；用最少步数解决问题才是工业级高并发算法的精髓！',
        story: '将3份寿司放入便当盒。平铺代码需要24步，利用带变量追踪的循环，达成三星挑战！',
        taskGoal: '使用循环与计数器，用最少移动步数完成3份寿司的装配。',
        hint: '走至(1,0)，循环执行 [抓取, 右移2步, 放置, 左移2步] 3次！'
      },
      m2_saute_function: {
        title: '可复用小炒函数',
        subtitle: '函数与模块化抽象 (Functions)',
        csConcept: '过程抽象与 DRY 原则 (Don\'t Repeat Yourself)',
        csDescription: '当两个工位都需要【切菜 + 翻炒】时，把它们封装成函数 SauteStation()，随处调用！',
        story: '蔬菜台A和蔬菜台B都需要相同的翻炒操作。在函数构建器中定义一次，在两个工位分别调用！',
        taskGoal: '在函数构建器中创建 SauteStation，并分别在工位A和工位B调用它。',
        hint: '走到工位A调用一次，再走到工位B调用一次，避免重复写切炒指令！'
      },
      m3_big_o_soup: {
        title: 'Big-O 时间复杂度横扫',
        subtitle: '大O时间复杂度直觉 (O(N) 对比 O(N²))',
        csConcept: '时间复杂度与算法扩展性 (Time Complexity)',
        csDescription: '笨厨师每次拿完香料都跑回起点：O(N²)浪费；聪明厨师一路向东单向巡检：O(N)线性时间！',
        story: '4个香料罐需要依次调味！你是选择折返跑浪费时间，还是一路向前优雅完成？',
        taskGoal: '从左到右单向横扫4个香料罐完成加料，绝不回头折返。',
        hint: '走到第0行后一直向右前进并加料，单趟遍历就是 O(N) 极速解！'
      },
      h1_fifo_queue: {
        title: '先进先出出餐队列',
        subtitle: '队列数据结构 (FIFO Queue)',
        csConcept: '队列 (First-In, First-Out: FIFO)',
        csDescription: '餐厅点餐单先来的客人先上菜！这就是计算机中最核心的队列结构：入队(Enqueue)与出队(Dequeue)。',
        story: '出票机吐出了两张餐单！先 Dequeue 炒面制作上菜，再 Dequeue 煎饺严格遵守FIFO顺序。',
        taskGoal: '使用出队积木按到达顺序取单，下锅烹饪后送至出餐口。',
        hint: '在(1,0)使用【出队 Dequeue】，第一张餐单就会弹入你的手中！'
      },
      h2_lifo_stack: {
        title: '摩天汉堡后进先出栈',
        subtitle: '堆栈数据结构 (LIFO Stack)',
        csConcept: '堆栈 (Last-In, First-Out: LIFO)',
        csDescription: '就像摞盘子或叠汉堡：最后压入栈顶的物品，必然最先被取出！撤销功能与调用栈的核心。',
        story: '组装豪华汉堡：依次压入底面包、肉饼、芝士；然后弹出顶层的芝士进行质检！',
        taskGoal: '使用 stack_push 压入三层食材，随后执行 stack_pop 取出顶部芝士。',
        hint: '抓取芝士走到(3,0)托盘，执行【堆栈压入 Push】即可！'
      },
      h3_ingredient_sort: {
        title: '食材尺寸排序流水线',
        subtitle: '排序算法与元素对换 (Bubble Sort)',
        csConcept: '排序算法 (冒泡/选择排序)',
        csDescription: '大厨必须把食材按尺寸从小到大排好才能受热均匀。算法比较相邻两项并在逆序时执行 Swap。',
        story: '备料桌上有3个大小混乱的南瓜[4, 1, 2]。利用比较与相邻对换积木，排成升序[1, 2, 4]！',
        taskGoal: '检查相邻食材，使用 Swap 积木对换，直到从小到大排列整齐。',
        hint: '站在位置1和2之间，4大于1，执行【对换相邻物品 Swap】！'
      },
      h4_binary_search: {
        title: '香料架折半二分查找',
        subtitle: '二分搜索算法 (O(log N))',
        csConcept: '二分搜索与分治思想 (Divide & Conquer)',
        csDescription: '在已排序的香料架找“肉豆蔻”，线性遍历需查7次。二分法先查中间，每步排除一半，只需3步！',
        story: '秘制酱汁需要编号为5的香料。不要从第1个挨个查！直接跳到中间第4号，发现目标在右侧，向右跃进！',
        taskGoal: '先检查中间位置(4,0)，验证小于目标后，直接定位到5号香料并取走。',
        hint: '直接走到中间第4号检查，发现肉豆蔻编号是5，直接向右一步即可！'
      }
    }
  },

  // ==========================================
  // SPANISH (ESPAÑOL)
  // ==========================================
  es: {
    appName: 'Chef de Algoritmos (Algorithm Chef)',
    appSubtitle: 'Cocina Educativa de Pensamiento Computacional',
    nav: {
      recipeBook: 'Libro de Recetas',
      rushHour: 'Hora Punta (Rush Hour)',
      teacherPortal: 'Portal del Profesor',
      gdd: 'Diseño y Estándares CSTA',
      codeBridge: 'Puente de Código',
      cuisineTheme: 'Tema Culinario',
      selectLanguage: 'Idioma / Language'
    },
    actions: {
      cook: '¡Cocinar Receta! (Ejecutar)',
      pause: 'Pausar',
      step: 'Paso a Paso',
      reset: 'Reiniciar',
      clear: 'Limpiar Todo',
      export: 'Exportar JSON',
      copy: 'Copiar Código',
      copied: '¡Copiado!',
      nextLevel: 'Siguiente Desafío',
      replay: 'Intentar de Nuevo',
      explainSolution: 'Explicar Mi Solución',
      functionBuilder: 'Constructor de Funciones',
      soundOn: 'Activar Sonido',
      soundOff: 'Silenciar'
    },
    ranks: {
      trainee: 'Aprendiz de Cocina',
      line_cook: 'Cocinero de Línea',
      sous_chef: 'Segundo Chef (Sous Chef)',
      head_chef: 'Chef Ejecutivo',
      master_chef: 'Maestro de Algoritmos'
    },
    ageBands: {
      primary: 'Infantil (5-7 años)',
      elementary: 'Primaria (8-10 años)',
      middle: 'Secundaria (11-13 años)',
      high: 'Bachillerato (14-18 años)'
    },
    debugger: {
      efficiencyMeter: 'Medidor de Eficiencia (Big-O)',
      liveMemory: 'Memoria en Vivo (Variables)',
      dataStructures: 'Estructuras de Datos',
      executed: 'Pasos ejecutados',
      optimal: 'óptimo',
      scopeLocal: 'Ámbito: Local',
      noVariables: 'Sin variables declaradas',
      noDataStructures: 'Sin pila ni cola activa',
      topOfStack: 'Cima de la Pila (Top)',
      headOfQueue: 'Frente de la Cola (Head)',
      hands: 'En manos',
      empty: 'Vacías',
      dishSuccess: '¡Plato preparado con éxito! Revisa la nota de eficiencia.',
      errorEncountered: 'Error de Ejecución Encontrado',
      chefCoordinates: 'Coordenadas del chef',
      csConcept: 'Concepto de Computación'
    },
    blocks: {
      move_up: { label: 'Mover Arriba', desc: 'Avanzar 1 paso al norte' },
      move_down: { label: 'Mover Abajo', desc: 'Avanzar 1 paso al sur' },
      move_left: { label: 'Mover Izquierda', desc: 'Avanzar 1 paso al oeste' },
      move_right: { label: 'Mover Derecha', desc: 'Avanzar 1 paso al este' },
      turn: { label: 'Girar Orientación', desc: 'Girar chef hacia dirección' },
      grab: { label: 'Agarrar / Recoger', desc: 'Tomar ingrediente de estación' },
      place: { label: 'Colocar / Emplatar', desc: 'Poner objeto en la estación' },
      chop: { label: 'Cortar / Picar', desc: 'Picar ingrediente en la tabla' },
      cook: { label: 'Cocinar / Saltear', desc: 'Aplicar calor en los fogones' },
      mix: { label: 'Mezclar Ingredientes', desc: 'Combinar elementos de estación' },
      serve: { label: 'Servir Pedido', desc: 'Entregar a la ventana de servicio' },
      wait: { label: 'Esperar 1 Segundo', desc: 'Pausar mientras la sartén calienta' },
      repeat_times: { label: 'Repetir N Veces', desc: 'Bucle For: ejecuta N veces' },
      while_condition: { label: 'Mientras Condición', desc: 'Bucle Mientras la condición sea cierta' },
      if_condition: { label: 'Si Condición (If)', desc: 'Lógica condicional según el estado' },
      if_else_condition: { label: 'Si / Si No (If/Else)', desc: 'Ejecutar según condición booleana' },
      call_function: { label: 'Llamar Función()', desc: 'Ejecutar subrutina reutilizable' },
      stack_push: { label: 'Pila: Apilar (Push)', desc: 'Añadir objeto a la cima de pila LIFO' },
      stack_pop: { label: 'Pila: Desapilar (Pop)', desc: 'Sacar el objeto superior de la pila' },
      queue_enqueue: { label: 'Cola: Encolar (Enqueue)', desc: 'Añadir comanda al final de la fila FIFO' },
      queue_dequeue: { label: 'Cola: Desencolar (Dequeue)', desc: 'Atender la primera comanda de la fila' },
      swap_items: { label: 'Intercambiar Adyacentes', desc: 'Ordenar por burbuja intercambiando' },
      set_variable: { label: 'Asignar Variable', desc: 'Guardar o incrementar valor' }
    },
    blockCategories: {
      movement: 'Movimiento',
      action: 'Acciones de Cocina',
      control: 'Flujo de Control (Bucles)',
      logic: 'Lógica Condicional',
      function: 'Funciones',
      data_structure: 'Estructuras de Datos'
    },
    toolbox: {
      title: 'Caja de Bloques',
      hint: 'Haz clic o arrastra bloques para añadirlos a la línea de tiempo'
    },
    timeline: {
      title: 'Secuencia del Algoritmo',
      hint: 'Organiza instrucciones ordenadas para cocinar la receta',
      emptyPlaceholder: '¡Añade bloques desde la izquierda para construir tu algoritmo culinario!',
      stepCount: 'instrucciones'
    },
    mentor: {
      says: 'Consejo de la Chef Mentora:'
    },
    levels: {
      p1_toast: {
        title: 'Tostada Caliente con Mantequilla',
        subtitle: 'Secuenciación y Pasos Ordenados',
        csConcept: 'Secuencia Algorítmica Lineal',
        csDescription: 'Los ordenadores ejecutan instrucciones línea por línea. ¡Si alteras el orden, la receta falla!',
        story: '¡Bienvenido a la cocina! Tu primer cliente pide pan tostado con mantequilla fresca.',
        taskGoal: 'Toma el pan de (0,0), llévalo a la tabla (2,0), úntale mantequilla y sírvelo en el plato (3,1).',
        hint: '¡Primero toma el pan en (0,0) y luego camina a la tabla de preparación en (2,0)!'
      },
      p2_fruit_salad: {
        title: 'Ensalada Crujiente de Manzana',
        subtitle: 'Causa y Efecto con Herramientas',
        csConcept: 'Precondiciones y Dependencias',
        csDescription: 'Una acción requiere cumplir sus precondiciones (¡no puedes picar fruta con las manos vacías!).',
        story: 'La chef necesita dados de manzana crujiente. ¡Cuidado: necesitas el cuchillo antes de cortar!',
        taskGoal: 'Recoge el cuchillo, acércate a la tabla con la manzana, córtala y ponla en el bol.',
        hint: '¡Coge el cuchillo en (0,0) primero, o la acción de picar causará un error!'
      },
      p3_sandwich: {
        title: 'Sándwich Gourmet de Tres Capas',
        subtitle: 'Descomposición en Pasos',
        csConcept: 'Descomposición Algorítmica',
        csDescription: 'Las tareas complejas se resuelven dividiéndolas en acciones atómicas ordenadas.',
        story: '¡Prepara un sándwich completo! Toma el pan, añade la crema y llévalo a la barra de salida.',
        taskGoal: 'Coge pan de la despensa, ponlo en la tabla, combina los ingredientes y entrégalo.',
        hint: '¡Coge pan, avanza a la estación de crema, prepáralo y llévalo a la ventana!'
      },
      e1_carrot_soup: {
        title: 'Picado para Sopa de Zanahorias',
        subtitle: 'Bucles (Repetir N Veces)',
        csConcept: 'Bucles For e Iteración',
        csDescription: 'En lugar de escribir "Cortar" 4 veces, usamos bucles: "Repetir 4 veces { Cortar }".',
        story: 'La receta exige 4 cortes precisos en la zanahoria. Tus bloques son limitados: ¡usa un bucle!',
        taskGoal: 'Toma el cuchillo, ve a la zanahoria y usa un bucle "Repetir 4 veces" para picarla.',
        hint: '¡Coloca el bloque Cortar DENTRO del bloque Repetir 4 veces!'
      },
      e2_pancake_turner: {
        title: 'La Tortita Dorada',
        subtitle: 'Condicionales Simples (Si / Si No)',
        csConcept: 'Lógica Booleana y Bifurcación',
        csDescription: 'Los condicionales permiten tomar decisiones: SI la sartén está caliente, cocina; SI NO, calienta primero.',
        story: '¡La masa se quemará o arruinará si la sartén no está lista! Comprueba el calor antes de cocinar.',
        taskGoal: 'Usa un bloque Si/Si No para asegurar la temperatura antes de servir la tortita.',
        hint: '¡Camina hacia la sartén en (1,0) y coloca la acción Cocinar dentro del Si [pan_is_hot]!'
      },
      e3_burger_debug: {
        title: 'Depuración de la Gran Hamburguesa',
        subtitle: 'Depuración y Errores Lógicos',
        csConcept: 'Depuración de Código (Debugging)',
        csDescription: '¡Los desarrolladores pasan mucho tiempo depurando! Sigue el rastro para ver dónde tropieza el chef.',
        story: 'Un ayudante apresurado dejó un programa con errores: el chef choca contra la pared y agarra en vacío.',
        taskGoal: 'Ejecuta el depurador, detecta el giro erróneo hacia abajo, corrígelo y sirve la hamburguesa.',
        hint: '¡Observa cómo el chef se mueve hacia abajo en el paso 2 cuando el pan está arriba en (1,0)!'
      },
      m1_bento_box: {
        title: 'Bento Box Optimizado',
        subtitle: 'Variables y Optimización de Pasos',
        csConcept: 'Eficiencia Algorítmica y Límites de Bucle',
        csDescription: 'Resolver un problema en 15 pasos está bien; resolverlo en 8 pasos escala para millones de usuarios.',
        story: 'Monta 3 piezas de sushi en la bandeja Bento usando una variable contadora para ganar 3 estrellas.',
        taskGoal: 'Recoge 3 piezas con un bucle eficiente minimizando los pasos totales.',
        hint: '¡Ve a (1,0) y repite 3 veces [Agarrar, Derecha x 2, Colocar, Izquierda x 2]!'
      },
      m2_saute_function: {
        title: 'Función Reutilizable de Salteado',
        subtitle: 'Funciones y Abstracción Modular',
        csConcept: 'Abstracción de Procedimientos (Principio DRY)',
        csDescription: 'DRY significa "No te repitas". Empaqueta [Picar + Cocinar] en una función SauteStation() reutilizable.',
        story: 'Dos estaciones de verduras requieren la misma rutina. ¡Define la función una vez y llámala en ambas!',
        taskGoal: 'Crea la función en el Constructor de Funciones y ejecútala en las estaciones A y B.',
        hint: '¡Ve a la estación A, llama a SauteStation(), ve a la B y vuelve a llamarla!'
      },
      m3_big_o_soup: {
        title: 'El Barrido Big-O de Especias',
        subtitle: 'Intuición de Complejidad Big-O (O(N) vs O(N²))',
        csConcept: 'Complejidad Temporal y Escalabilidad',
        csDescription: 'Volver al inicio tras cada especia es desperdicio O(N²). Un barrido en una sola pasada es tiempo lineal O(N).',
        story: '¡Hay 4 especias alineadas! No regreses al punto de inicio entre cada tarro: haz una pasada continua.',
        taskGoal: 'Pasa por las 4 estaciones de condimentos en una sola dirección sin retroceder.',
        hint: '¡Sube a la fila 0 y desplázate continuamente a la derecha sazonando cada tarro!'
      },
      h1_fifo_queue: {
        title: 'Cola de Pedidos FIFO de Clientes',
        subtitle: 'Estructura de Datos: Cola (Primero en Entrar, Primero en Salir)',
        csConcept: 'Colas FIFO (First-In, First-Out)',
        csDescription: 'El primer comensal en pedir es el primero en recibir su plato. Así funciona la cola FIFO (Enqueue / Dequeue).',
        story: '¡Llegan comandas impresas! Desencola la Comanda #1, cocínala y entrégala; luego atiende la #2.',
        taskGoal: 'Usa Desencolar para procesar los pedidos por riguroso orden de llegada.',
        hint: '¡Ponte en (1,0) y usa Desencolar: verás cómo la primera comanda pasa a tus manos!'
      },
      h2_lifo_stack: {
        title: 'Pila LIFO de Hamburguesa Rascacielos',
        subtitle: 'Estructura de Datos: Pila (Último en Entrar, Primero en Salir)',
        csConcept: 'Pilas LIFO (Last-In, First-Out)',
        csDescription: 'Como una pila de platos: el ÚLTIMO ingrediente colocado es el PRIMERO que se retira (Push y Pop).',
        story: 'Apila pan, carne y queso en la bandeja. Luego desapila el queso superior para inspeccionarlo.',
        taskGoal: 'Apila 3 capas con stack_push y desapila con stack_pop.',
        hint: '¡Coge el queso en (1,0), ve a la bandeja en (3,0) y ejecuta Apilar (Push)!'
      },
      h3_ingredient_sort: {
        title: 'Línea de Clasificación por Tamaño',
        subtitle: 'Diseño de Algoritmos: Ordenación y Swap',
        csConcept: 'Algoritmos de Ordenación (Burbuja / Selección)',
        csDescription: 'Los ingredientes se ordenan de menor a mayor comparando pares adyacentes e intercambiándolos.',
        story: 'Hay 3 calabazas desordenadas [Tamaño 4, Tamaño 1, Tamaño 2]. ¡Ordénalas en orden ascendente [1, 2, 4]!',
        taskGoal: 'Inspecciona las posiciones adyacentes e intercambia hasta que queden ordenadas.',
        hint: '¡Sitúate entre el Puesto 1 y 2. Como 4 > 1, ejecuta Intercambiar Adyacentes (Swap)!'
      },
      h4_binary_search: {
        title: 'Búsqueda Binaria en el Especiero',
        subtitle: 'Búsqueda Binaria (O(log N))',
        csConcept: 'Búsqueda Binaria y Divide y Vencerás',
        csDescription: 'En un especiero ordenado, la búsqueda binaria comprueba el elemento del medio y descarta la mitad en cada paso.',
        story: 'Buscamos Nuez Moscada (rango 5). Salta directo al medio (4), comprueba que 5 es mayor y ve a la derecha.',
        taskGoal: 'Comprueba el tarro central en (3,0) y salta directamente al tarro objetivo.',
        hint: '¡Examina el tarro del medio en (4,0) y avanza inmediatamente al objetivo en (5,0)!'
      }
    }
  },

  // ==========================================
  // TURKISH (TÜRKÇE)
  // ==========================================
  tr: {
    appName: 'Algoritma Şefi (Algorithm Chef)',
    appSubtitle: 'Bilgisayar Bilimleri & Algoritmik Düşünme Mutfağı',
    nav: {
      recipeBook: 'Tarif Defteri (Başarılar)',
      rushHour: 'Yoğun Saat (Rush Hour)',
      teacherPortal: 'Öğretmen Portalı',
      gdd: 'Tasarım Belgesi & Standartlar',
      codeBridge: 'Kod Köprüsü',
      cuisineTheme: 'Mutfak Kültürü',
      selectLanguage: 'Dil / Language'
    },
    actions: {
      cook: 'Yemeği Pişir! (Çalıştır)',
      pause: 'Duraklat',
      step: 'Adım Adım',
      reset: 'Sıfırla',
      clear: 'Temizle',
      export: 'JSON Dışa Aktar',
      copy: 'Kodu Kopyala',
      copied: 'Kopyalandı!',
      nextLevel: 'Sonraki Seviye',
      replay: 'Yeniden Dene',
      explainSolution: 'Çözümümü Açıkla',
      functionBuilder: 'Fonksiyon Oluşturucu',
      soundOn: 'Sesi Aç',
      soundOff: 'Sesi Kapat'
    },
    ranks: {
      trainee: 'Mutfak Çırağı (Trainee)',
      line_cook: 'Karafırın & Ocak Aşçısı (Line Cook)',
      sous_chef: 'Yardımcı Şef (Sous Chef)',
      head_chef: 'Baş Aşçı (Head Chef)',
      master_chef: 'Büyük Algoritma Ustası (Master Chef)'
    },
    ageBands: {
      primary: 'Okul Öncesi & İlkokul 1 (5-7 Yaş)',
      elementary: 'İlkokul (8-10 Yaş)',
      middle: 'Ortaokul (11-13 Yaş)',
      high: 'Lise (14-18 Yaş)'
    },
    debugger: {
      efficiencyMeter: 'Algoritma Verimlilik Ölçeri (Big-O)',
      liveMemory: 'Bellek & Değişkenler (Variables)',
      dataStructures: 'Veri Yapıları Paneli',
      executed: 'Çalıştırılan Adım',
      optimal: 'ideal',
      scopeLocal: 'Kapsam: Yerel',
      noVariables: 'Tanımlanmış değişken yok',
      noDataStructures: 'Aktif yığın veya kuyruk yok',
      topOfStack: 'Yığın Tepesi (Top)',
      headOfQueue: 'Kuyruk Başı (Head)',
      hands: 'Eldeki Malzeme',
      empty: 'Boş',
      dishSuccess: 'Yemek kusursuz pişti! Verimlilik puanını incele.',
      errorEncountered: 'Algoritma Çalışma Zamanı Hatası',
      chefCoordinates: 'Şef koordinatları',
      csConcept: 'Bilgisayar Bilimi Kavramı'
    },
    blocks: {
      move_up: { label: 'Yukarı Git', desc: 'Kuzeye 1 adım ilerle' },
      move_down: { label: 'Aşağı Git', desc: 'Güneye 1 adım ilerle' },
      move_left: { label: 'Sola Git', desc: 'Batıya 1 adım ilerle' },
      move_right: { label: 'Sağa Git', desc: 'Doğuya 1 adım ilerle' },
      turn: { label: 'Yönü Değiştir', desc: 'Şefin yüzünü belirtilen yöne çevir' },
      grab: { label: 'Malzemeyi Al', desc: 'Tezgâhtan malzeme ya da alet al' },
      place: { label: 'Bırak / Tabağa Koy', desc: 'Eldeki nesneyi istasyona bırak' },
      chop: { label: 'Doğra / Dilimle', desc: 'Kesme tahtasında bıçakla kes' },
      cook: { label: 'Pişir / Kızart', desc: 'Ocakta ısı uygulayarak pişir' },
      mix: { label: 'Karıştır / Harmanla', desc: 'İstasyondaki malzemeleri karıştır' },
      serve: { label: 'Siparişi Sun', desc: 'Müşteri servis penceresine teslim et' },
      wait: { label: '1 Saniye Bekle', desc: 'Tavanın ısınması için durakla' },
      repeat_times: { label: 'N Kez Tekrarla', desc: 'For Döngüsü: komutları N defa çalıştırır' },
      while_condition: { label: 'Şart Sürdükçe (While)', desc: 'Koşul doğru olduğu sürece döner' },
      if_condition: { label: 'Eğer (If Koşulu)', desc: 'Mutfak durumuna göre şartlı dallanma' },
      if_else_condition: { label: 'Eğer / Değilse (If/Else)', desc: 'Doğruysa birini, yanlışsa diğerini çalıştır' },
      call_function: { label: 'Fonksiyonu Çağır()', desc: 'Önceden tanımlı alt programı yürüt' },
      stack_push: { label: 'Yığın: Ekle (Push)', desc: 'Malzemeyi LIFO yığınının tepesine koy' },
      stack_pop: { label: 'Yığın: Çıkar (Pop)', desc: 'Yığının tepesindeki en son malzemeyi al' },
      queue_enqueue: { label: 'Kuyruk: Sıraya Al (Enqueue)', desc: 'Yeni siparişi FIFO sırasının sonuna ekle' },
      queue_dequeue: { label: 'Kuyruk: Sıradan Al (Dequeue)', desc: 'Sıradaki ilk müşteriyi karşıla' },
      swap_items: { label: 'Yan Yana Olanları Değiş', desc: 'Kabarcık sıralaması: iki konumu takas et' },
      set_variable: { label: 'Değişken Belirle', desc: 'Değişkene değer ata veya artır' }
    },
    blockCategories: {
      movement: 'Hareket Komutları',
      action: 'Mutfak Eylemleri',
      control: 'Akış Kontrolü (Döngüler)',
      logic: 'Mantıksal Koşullar',
      function: 'Fonksiyonlar',
      data_structure: 'Veri Yapıları'
    },
    toolbox: {
      title: 'Komut Blok Kutusu',
      hint: 'Zaman çizgisine eklemek için bloklara dokun veya tıkla'
    },
    timeline: {
      title: 'Algoritma Dizilimi',
      hint: 'Yemeği hazırlamak için sıralı adımları yerleştir',
      emptyPlaceholder: 'Algoritmanı oluşturmak için soldaki kutudan komut blokları ekle!',
      stepCount: 'komut'
    },
    mentor: {
      says: 'Usta Şef Mehmet Öğütlüyor:'
    },
    levels: {
      p1_toast: {
        title: 'Sıcak Tereyağlı Tost',
        subtitle: 'Sıralama ve Adım Adım İlerleme',
        csConcept: 'Doğrusal Algoritma Sıralaması',
        csDescription: 'Bilgisayarlar kodları yukarıdan aşağıya satır satır çalıştırır. Sırayı karıştırırsan tarif yanar!',
        story: 'Mutfağa hoş geldin çırak! İlk müşterimiz taze tereyağlı çıtır bir tost istiyor.',
        taskGoal: '(0,0) konumundan ekmeği al, (2,0) kesme tahtasına götür, tereyağı sür ve (3,1) tabağa koy!',
        hint: 'Önce (0,0) noktasındaki ekmeği al, sonra (2,0) hazırlık tahtasına yürü!'
      },
      p2_fruit_salad: {
        title: 'Çıtır Elma Salatası',
        subtitle: 'Neden-Sonuç ve Araç Bağımlılıkları',
        csConcept: 'Ön Koşullar ve Araç Bağımlılığı',
        csDescription: 'Bir eylemin başarılı olması için ön koşulunun sağlanması şarttır (elinde bıçak yoksa elmayı doğrayamazsın!).',
        story: 'Usta şef küp küp doğranmış elma istiyor. Dikkat: Çıplak elle doğrama yapamazsın!',
        taskGoal: 'Şef bıçağını al, elmanın bulunduğu kesme tahtasına git, doğra ve salata kasesine yerleştir.',
        hint: 'Önce (0,0) noktasındaki bıçağı almalısın, yoksa doğramaya çalıştığında hata alırsın!'
      },
      p3_sandwich: {
        title: 'Üç Katlı Gurme Sandviç',
        subtitle: 'Parçalara Ayırma Mantığı',
        csConcept: 'Problemi Parçalara Ayırma (Decomposition)',
        csDescription: 'Büyük ve karmaşık görevler, küçük ve sıralı atomik adımlara bölünerek çözülür.',
        story: 'Harika bir sandviç hazırla! Ekmeği al, harcı sür ve servis tezgâhına ulaştır.',
        taskGoal: 'Kilerden ekmeği al, tahtaya koy, fıstık ezmesini alıp birleştir ve tezgâha koy.',
        hint: 'Ekmeği aldıktan sonra sağa fıstık ezmesine yürü, hazırla ve servis penceresine götür!'
      },
      e1_carrot_soup: {
        title: 'Havuç Çorbası Doğrama',
        subtitle: 'Döngüler (N Kez Tekrarla)',
        csConcept: 'For Döngüleri ve Yinelemeli Kod',
        csDescription: '4 kez alt alta "Doğra" yazmak yerine döngü kullanırız: "4 kez tekrarla { Doğra }". Kod tasarrufu!',
        story: 'Çorba için dev havucu 4 eşit parçaya bölmelisin. Komut sınırın var, mutlaka döngü kullan!',
        taskGoal: 'Bıçağı al, havuca git ve "4 Kez Tekrarla" döngüsüyle havucu tencereye hazırla.',
        hint: 'Doğra bloğunu 4 Kez Tekrarla bloğunun İÇİNE yerleştir!'
      },
      e2_pancake_turner: {
        title: 'Altın Sarısı Pankek',
        subtitle: 'Basit Koşullar (Eğer / Değilse)',
        csConcept: 'Boole Mantığı ve Dallanma (Boolean Logic)',
        csDescription: 'Koşullar kodun karar vermesini sağlar: EĞER tava sıcaksa pişir; DEĞİLSE önce ocağı yak.',
        story: 'Tava ısınmadan dökülen hamur ziyan olur! Pişirmeden önce tavanın sıcaklığını kontrol et.',
        taskGoal: 'Eğer/Değilse bloğunu kullanarak tavanın sıcaklığından emin ol ve pankeki tabağa koy.',
        hint: '(1,0) tavasına git. Pişir eylemini Eğer [tava sıcak] bloğunun içine koy!'
      },
      e3_burger_debug: {
        title: 'Büyük Burger Hata Ayıklama',
        subtitle: 'Hata Ayıklama (Debugging)',
        csConcept: 'Kod İnceleme ve Hata Ayıklama',
        csDescription: 'Yazılımcılar yeni kod yazmaktan çok hata ayıklamaya vakit harcar! Hatalı adımı adım adım takip et.',
        story: 'Acemi çırak hatalı bir burger programı bıraktı: Şef duvara çarpıyor ve boşluğu tutuyor!',
        taskGoal: 'Hata ayıklayıcıyı çalıştır, yanlış olan aşağı yönlü komutu yukarıyla değiştir ve siparişi tamamla.',
        hint: '2. adımda şefin aşağı yürüdüğüne dikkat et; oysa ekmek yukarıda (1,0) konumunda!'
      },
      m1_bento_box: {
        title: 'En Az Adımlı Bento Kutusu',
        subtitle: 'Değişkenler ve Adım Optimizasyonu',
        csConcept: 'Algoritmik Verimlilik ve Döngü Sınırları',
        csDescription: 'Bir problemi 15 adımda çözmek iyidir; ama 8 adımda çözmek milyonlarca kullanıcıya ölçeklenir!',
        story: '3 suşiyi Bento kutusuna yerleştir. Bütün adımları tek tek yazarsan 24 adım sürer. Döngüyle 3 yıldız al!',
        taskGoal: 'Sayaç değişkeni ve döngü kullanarak 3 suşiyi minimum adımla kutuya doldur.',
        hint: '(1,0) noktasına git, 3 kez [Al, 2 Adım Sağa, Bırak, 2 Adım Sola] tekrarla!'
      },
      m2_saute_function: {
        title: 'Yeniden Kullanılabilir Sote Fonksiyonu',
        subtitle: 'Fonksiyonlar ve Modüler Yaklaşım',
        csConcept: 'Prosedürel Soyutlama ve DRY İlkesi',
        csDescription: 'DRY "Kendini Tekrar Etme" demektir. Aynı işlemi yapan komutları SauteStation() fonksiyonuna topla!',
        story: 'İki sebze tezgâhında da aynı [Doğra + Pişir] işlemi gerekiyor. Fonksiyonu bir kez yaz, iki yerde çağır!',
        taskGoal: 'Fonksiyon Oluşturucu\'da SauteStation fonksiyonunu yap, A ve B istasyonlarında çağır.',
        hint: 'A istasyonuna gidip SauteStation() çağır, sonra B\'ye gidip tekrar çağır!'
      },
      m3_big_o_soup: {
        title: 'Big-O Çorba Baharatı Taraması',
        subtitle: 'Big-O Karmaşıklık Sezgisi (O(N) ve O(N²))',
        csConcept: 'Zaman Karmaşıklığı ve Algoritma Ölçeği',
        csDescription: 'Her baharat için başa geri yürümek O(N²) karesel zaman kaybıdır! Tek seferde baştan sona yürümek O(N) lineer hızdır.',
        story: 'Müşteriler aç! Sıralı 4 baharatı eklemek için geri dönüp duracak mısın, yoksa tek geçişte mi bitireceksin?',
        taskGoal: 'Hiç geri adım atmadan 4 baharat kavanozunu tek seferde gezerek tencereye ekle.',
        hint: '0. satıra çık ve sağa doğru tek yönlü ilerleyerek tüm baharatları tatlandır!'
      },
      h1_fifo_queue: {
        title: 'İlk Giren İlk Çıkar (FIFO) Müşteri Sırası',
        subtitle: 'Kuyruk Veri Yapısı (Queue: FIFO)',
        csConcept: 'Kuyruklar (FIFO: First-In, First-Out)',
        csDescription: 'Restoranda ilk siparişi veren müşteri yemeğini ilk alır. Bilgisayarlardaki temel kuyruk (Enqueue/Dequeue) budur!',
        story: 'Yazıcıdan fişler çıkıyor! Sırayla 1. fişi (Makarna) al pişir, sonra 2. fişi (Pizza) al; sırayı bozma.',
        taskGoal: 'Geliş sırasına göre Dequeue (Kuyruktan Çıkar) kullanarak siparişleri hazırla ve tezgâha ver.',
        hint: '(1,0) konumunda Dequeue komutunu kullan; sıradaki ilk siparişin eline geldiğini göreceksin!'
      },
      h2_lifo_stack: {
        title: 'Gökdelen Burger Yığını (LIFO Stack)',
        subtitle: 'Yığın Veri Yapısı (Last-In, First-Out)',
        csConcept: 'Yığınlar (LIFO: Son Giren İlk Çıkar)',
        csDescription: 'Üst üste konan tabaklar gibidir: En SON koyduğun malzeme, aldığında eline gelen İLK malzemedir!',
        story: 'Görkemli burgeri oluştur: Ekmek, köfte ve peyniri yığına ekle (Push), sonra en üstteki peyniri teftiş için çıkar (Pop).',
        taskGoal: 'stack_push ile 3 katmanı yığına bas, ardından en üstteki peyniri stack_pop ile kontrol et.',
        hint: 'Peyniri al, (3,0) tepsisine git ve Yığına Ekle (Push) komutunu ver!'
      },
      h3_ingredient_sort: {
        title: 'Boyut Sıralama Hattı',
        subtitle: 'Algoritma Tasarımı: Sıralama ve Takas (Swap)',
        csConcept: 'Sıralama Algoritmaları (Bubble Sort)',
        csDescription: 'Malzemelerin eşit pişmesi için küçükten büyüğe dizilmesi gerekir. Yan yana iki öğe karşılaştırılır ve tersse yer değiştirilir.',
        story: 'Üç bal kabağı karışık dizilmiş: [Boyut 4, Boyut 1, Boyut 2]. Karşılaştırıp Swap yaparak [1, 2, 4] sırasına getir!',
        taskGoal: 'Yan yana duranları kontrol et ve küçükten büyüğe dizilene kadar Swap komutunu kullan.',
        hint: '1. ve 2. konumun arasında dur. 4 > 1 olduğu için Takas Et (Swap) komutunu çalıştır!'
      },
      h4_binary_search: {
        title: 'Baharatlıkta İkili Arama (Binary Search)',
        subtitle: 'İkili Arama Algoritması (O(log N))',
        csConcept: 'İkili Arama ve Böl-Yönet (Binary Search)',
        csDescription: 'Sıralı 7 baharat arasında "Muskat" ararken tek tek bakmak O(N)\'dir. Ortadaki kavanoza bakıp yarısını elemek ise O(log N)\'dir!',
        story: 'Özel sos için Muskat (Sıra No: 5) gerekiyor. 1, 2, 3 diye sayma! Direkt ortadaki 4\'e git, 5\'in sağda olduğunu anla ve sağa atla.',
        taskGoal: '(3,0) ortadaki kavanozu kontrol et, hedeften küçük olduğunu anla ve direkt hedefe yönel.',
        hint: 'Hemen ortadaki (4,0) kavanozuna git. Muskat 5 numara olduğu için doğrudan sağa adım at!'
      }
    }
  },

  // ==========================================
  // INDIAN (HINDI / हिन्दी)
  // ==========================================
  hi: {
    appName: 'एल्गोरिदम शेफ (Algorithm Chef)',
    appSubtitle: 'कंप्यूटर साइंस व एल्गोरिद्मिक सोच की रसोई',
    nav: {
      recipeBook: 'रेसिपी बुक (उपलब्धियां)',
      rushHour: 'रश ऑवर (Rush Hour)',
      teacherPortal: 'शिक्षक पोर्टल',
      gdd: 'पाठ्यक्रम व मानक',
      codeBridge: 'कोड ब्रिज',
      cuisineTheme: 'व्यंजन शैली',
      selectLanguage: 'भाषा / Language'
    },
    actions: {
      cook: 'रेसिपी पकाएं! (Run)',
      pause: 'रोकें',
      step: 'एक कदम (Step)',
      reset: 'रीसेट',
      clear: 'सब साफ करें',
      export: 'JSON निर्यात',
      copy: 'कोड कॉपी करें',
      copied: 'कॉपी हो गया!',
      nextLevel: 'अगला स्तर',
      replay: 'पुनः प्रयास करें',
      explainSolution: 'अपना समाधान समझाएं',
      functionBuilder: 'फ़ंक्शन बिल्डर',
      soundOn: 'ध्वनि चालू',
      soundOff: 'ध्वनि बंद'
    },
    ranks: {
      trainee: 'रसोई प्रशिक्षु (Trainee)',
      line_cook: 'लाइन कुक (Line Cook)',
      sous_chef: 'सह-शेफ (Sous Chef)',
      head_chef: 'मुख्य शेफ (Head Chef)',
      master_chef: 'मास्टर एल्गोरिदम शेफ (Master Chef)'
    },
    ageBands: {
      primary: 'प्राथमिक (5-7 वर्ष)',
      elementary: 'प्रारंभिक (8-10 वर्ष)',
      middle: 'माध्यमिक (11-13 वर्ष)',
      high: 'उच्च (14-18 वर्ष)'
    },
    debugger: {
      efficiencyMeter: 'दक्षता मीटर (Big-O)',
      liveMemory: 'लाइव मेमोरी (Variables)',
      dataStructures: 'डेटा संरचनाएं (Data Structures)',
      executed: 'चले गए कदम',
      optimal: 'इष्टतम',
      scopeLocal: 'स्कोप: स्थानीय',
      noVariables: 'कोई वेरिएबल घोषित नहीं',
      noDataStructures: 'कोई स्टैक या कतार सक्रिय नहीं',
      topOfStack: 'स्टैक का शीर्ष (Top)',
      headOfQueue: 'कतार का अगला (Head)',
      hands: 'हाथ में',
      empty: 'खाली',
      dishSuccess: 'स्वादिष्ट व्यंजन तैयार! अपनी दक्षता रेटिंग देखें।',
      errorEncountered: 'एल्गोरिदम निष्पादन त्रुटि',
      chefCoordinates: 'शेफ के निर्देशांक',
      csConcept: 'कंप्यूटर साइंस अवधारणा'
    },
    blocks: {
      move_up: { label: 'ऊपर जाएं', desc: 'उत्तर की ओर 1 कदम बढ़ें' },
      move_down: { label: 'नीचे जाएं', desc: 'दक्षिण की ओर 1 कदम बढ़ें' },
      move_left: { label: 'बाएं जाएं', desc: 'पश्चिम की ओर 1 कदम बढ़ें' },
      move_right: { label: 'दाएं जाएं', desc: 'पूर्व की ओर 1 कदम बढ़ें' },
      turn: { label: 'दिशा बदलें', desc: 'शेफ का मुख मोड़ें' },
      grab: { label: 'सामग्री उठाएं', desc: 'स्टेशन से सामग्री या औजार उठाएं' },
      place: { label: 'रखें / परोसें', desc: 'हाथ की वस्तु स्टेशन पर रखें' },
      chop: { label: 'काटें / टुकड़े करें', desc: 'कटिंग बोर्ड पर चाकू से काटें' },
      cook: { label: 'पकाएं / छौंकें', desc: 'चूल्हे पर आंच देकर पकाएं' },
      mix: { label: 'मसाला मिलाएं', desc: 'स्टेशन की सामग्री को आपस में मिलाएं' },
      serve: { label: 'ग्राहक को परोसें', desc: 'सर्विंग काउंटर पर पहुंचाएं' },
      wait: { label: '1 सेकंड प्रतीक्षा करें', desc: 'कड़ाही गर्म होने की प्रतीक्षा' },
      repeat_times: { label: 'N बार दोहराएं', desc: 'For-Loop: ब्लॉक को N बार चलाता है' },
      while_condition: { label: 'जब तक शर्त हो (While)', desc: 'शर्त सही रहने तक लूप चलेगा' },
      if_condition: { label: 'यदि (If शर्त)', desc: 'रसोई की स्थिति अनुसार निर्णय' },
      if_else_condition: { label: 'यदि / अन्यथा (If/Else)', desc: 'सत्य होने पर एक, असत्य पर दूसरा' },
      call_function: { label: 'फ़ंक्शन कॉल करें()', desc: 'पुन: प्रयोज्य उपनेमका चलाएं' },
      stack_push: { label: 'स्टैक: पुश करें (Push)', desc: 'LIFO स्टैक के ऊपर सामग्री रखें' },
      stack_pop: { label: 'स्टैक: पॉप करें (Pop)', desc: 'स्टैक के सबसे ऊपर से सामग्री निकालें' },
      queue_enqueue: { label: 'कतार: जोड़ें (Enqueue)', desc: 'FIFO लाइन के अंत में नया आर्डर जोड़ें' },
      queue_dequeue: { label: 'कतार: निकालें (Dequeue)', desc: 'लाइन में सबसे पहले ग्राहक को परोसें' },
      swap_items: { label: 'अदला-बदली करें (Swap)', desc: 'बबल सॉर्ट: पास की दो वस्तुएं बदलें' },
      set_variable: { label: 'वेरिएबल सेट करें', desc: 'मान सुरक्षित या संचित करें' }
    },
    blockCategories: {
      movement: 'गतिविधियां (Movement)',
      action: 'रसोई कार्य (Action)',
      control: 'लूप्स व प्रवाह (Control)',
      logic: 'तर्क व शर्तें (Logic)',
      function: 'फ़ंक्शन्स (Functions)',
      data_structure: 'डेटा संरचनाएं (Structures)'
    },
    toolbox: {
      title: 'निर्देश ब्लॉक टूलबॉक्स',
      hint: 'समयरेखा में जोड़ने के लिए ब्लॉक पर क्लिक करें'
    },
    timeline: {
      title: 'एल्गोरिदम अनुक्रम',
      hint: 'व्यंजन पकाने के लिए क्रमबद्ध निर्देश सजाएं',
      emptyPlaceholder: 'अपनी रेसिपी तैयार करने के लिए बाईं ओर से ब्लॉक जोड़ें!',
      stepCount: 'निर्देश'
    },
    mentor: {
      says: 'मेंटर शेफ प्रिया की सलाह:'
    },
    levels: {
      p1_toast: {
        title: 'मक्खन लगा गरमा-गरम टोस्ट',
        subtitle: 'क्रमबद्धता व चरणबद्ध निर्देश',
        csConcept: 'रैखिक एल्गोरिदम अनुक्रम (Linear Sequencing)',
        csDescription: 'कंप्यूटर ऊपर से नीचे तक एक-एक पंक्ति कोड चलाता है। यदि क्रम बिगड़ा, तो रेसिपी असफल!',
        story: 'रसोई में आपका स्वागत है! ग्राहक को मक्खन लगा टोस्ट चाहिए। ब्रेड लें, मक्खन लगाएं और प्लेट में परोसें!',
        taskGoal: '(0,0) से ब्रेड उठाएं, (2,0) बोर्ड पर रखें, मक्खन लगाएं और (3,1) प्लेट में परोसें।',
        hint: 'पहले (0,0) से ब्रेड लें, फिर (2,0) बोर्ड की ओर बढ़ें!'
      },
      p2_fruit_salad: {
        title: 'कुरकुरा सेब सलाद',
        subtitle: 'कारण और प्रभाव व औजार निर्भरता',
        csConcept: 'पूर्व-शर्तें व औजार निर्भरता (Preconditions)',
        csDescription: 'कोई भी कार्य तब तक पूरा नहीं हो सकता जब तक उसकी पूर्व-शर्त पूरी न हो (चाकू के बिना फल नहीं कट सकता!)।',
        story: 'शेफ को कटे हुए सेब चाहिए। ध्यान रहे: बिना चाकू के काटना त्रुटि देगा!',
        taskGoal: 'चाकू उठाएं, सेब वाले बोर्ड पर जाएं, उसे काटें और बाउल में रखें।',
        hint: 'पहले (0,0) से चाकू लें, अन्यथा काटने पर एरर आएगा!'
      },
      p3_sandwich: {
        title: 'तीन परतों वाला स्वादिष्ट सैंडविच',
        subtitle: 'समस्या को छोटे चरणों में तोड़ना',
        csConcept: 'कार्य विभाजन (Decomposition)',
        csDescription: 'जटिल कार्यों को छोटे, व्यवस्थित परमाणुक चरणों में बांटकर आसानी से हल किया जाता है।',
        story: 'शानदार सैंडविच बनाएं! निचली ब्रेड लें, स्प्रेड लगाएं और सर्विंग काउंटर पर पहुंचाएं।',
        taskGoal: 'पैंट्री से ब्रेड लें, बोर्ड पर रखें, पीनट बटर मिलाकर सर्विंग विंडो तक पहुंचाएं।',
        hint: 'ब्रेड लें, दाईं ओर स्प्रेड स्टेशन जाएं और तैयार करके खिड़की तक ले जाएं!'
      },
      e1_carrot_soup: {
        title: 'गाजर सूप कटाई',
        subtitle: 'लूप्स (N बार दोहराएं)',
        csConcept: 'For-लूप्स और पुनरावृत्ति',
        csDescription: 'बार-बार "काटें" लिखने के बजाय प्रोग्रामर लूप लगाते हैं: "4 बार दोहराएं { काटें }"। कम कोड, अधिक सरलता!',
        story: 'सूप के लिए गाजर के 4 सटीक टुकड़े चाहिए। आपके पास सीमित ब्लॉक हैं—लूप का प्रयोग करें!',
        taskGoal: 'चाकू उठाएं, गाजर के पास जाएं और "4 बार दोहराएं" लूप से गाजर को 4 टुकड़ों में काटें।',
        hint: 'Chop (काटें) ब्लॉक को Repeat 4 Times लूप के अंदर रखें!'
      },
      e2_pancake_turner: {
        title: 'सुनहरा स्वादिष्ट पैनकेक',
        subtitle: 'शर्तें (यदि / अन्यथा)',
        csConcept: 'बूलियन तर्क और शाखाएं (Boolean Branching)',
        csDescription: 'शर्तों से कोड निर्णय लेता है: यदि पैन गर्म है तो तुरंत पकाएं, अन्यथा पहले आंच चालू करें।',
        story: 'ठंडे पैन में घोल डालने से पैनकेक खराब हो जाएगा! पहले पैन का तापमान जांचें।',
        taskGoal: 'If शर्त ब्लॉक का उपयोग करके पैन की गर्मी जांचें और फिर पैनकेक परोसें।',
        hint: '(1,0) तवे पर जाएं और Cook क्रिया को If [pan_is_hot] ब्लॉक के अंदर रखें!'
      },
      e3_burger_debug: {
        title: 'बर्गर बग सुधार (Debugging)',
        subtitle: 'डीबगिंग और तार्किक त्रुटियां',
        csConcept: 'कोड डीबगिंग (Code Debugging)',
        csDescription: 'प्रोग्रामर नया कोड लिखने से ज्यादा समय गलतियां सुधारने में लगाते हैं! स्टेप-बाय-स्टेप चलाकर बग ढूंढें।',
        story: 'एक लापरवाह कुक ने गलत बर्गर प्रोग्राम छोड़ दिया: शेफ दीवार से टकरा रहा है! इसे ठीक करें।',
        taskGoal: 'डीबगर चलाएं, नीचे जाने वाले गलत ब्लॉक को पहचानें, उसे सही करें और बर्गर सर्व करें।',
        hint: 'ध्यान दें कि शेफ स्टेप 2 पर नीचे जाता है, जबकि बन ऊपर (1,0) पर है!'
      },
      m1_bento_box: {
        title: 'इष्टतम बेंटो बॉक्स',
        subtitle: 'वेरिएबल्स और कदमों का न्यूनीकरण',
        csConcept: 'एल्गोरिद्मिक दक्षता (Efficiency)',
        csDescription: 'किसी समस्या को 15 कदमों में हल करना ठीक है; लेकिन 8 कदमों में हल करना लाखों उपयोगकर्ताओं के लिए उपयुक्त है!',
        story: 'बेंटो बॉक्स में 3 रोल लगाएं। साधारण कोड से 24 कदम लगेंगे! लूप और वेरिएबल से 3 स्टार हासिल करें।',
        taskGoal: 'लूप और वेरिएबल ट्रैकिंग से कम से कम कदमों में 3 रोल ट्रे में रखें।',
        hint: '(1,0) पर जाएं, [उठाएं, 2 कदम दाएं, रखें, 2 कदम बाएं] को 3 बार दोहराएं!'
      },
      m2_saute_function: {
        title: 'पुन: प्रयोज्य सौते फ़ंक्शन',
        subtitle: 'फ़ंक्शन्स और मॉड्यूलर सोच',
        csConcept: 'प्रक्रियात्मक अमूर्तता (DRY Principle)',
        csDescription: 'DRY का अर्थ है "खुद को मत दोहराएं"। जब दो जगह एक ही काम करना हो, तो उसे फ़ंक्शन में बांधें!',
        story: 'सब्जी स्टेशन A और B दोनों पर एक ही प्रक्रिया चाहिए। SauteStation फ़ंक्शन बनाएं और दोनों जगह कॉल करें!',
        taskGoal: 'फ़ंक्शन बिल्डर में SauteStation बनाएं और उसे स्टेशन A और B पर कॉल करें।',
        hint: 'स्टेशन A पर जाकर SauteStation कॉल करें, फिर B पर जाकर दोबारा कॉल करें!'
      },
      m3_big_o_soup: {
        title: 'Big-O मसाला स्वीप',
        subtitle: 'Big-O जटिलता का बोध (O(N) बनाम O(N²))',
        csConcept: 'समय जटिलता और पैमाना (Time Complexity)',
        csDescription: 'हर मसाले के बाद शुरुआत में लौटना O(N²) बर्बादी है! एक ही सीधी यात्रा में सबको छूना O(N) रैखिक समय है।',
        story: '4 मसाले कड़ाही में डालने हैं! क्या आप बार-बार पीछे लौटेंगे, या एक ही बार में आगे बढ़ते हुए पूरा करेंगे?',
        taskGoal: 'बिना पीछे मुड़े एक ही बार में चारों मसालों को कड़ाही में मिलाएं।',
        hint: 'पंक्ति 0 पर जाएं और दाईं ओर लगातार आगे बढ़ते हुए मसाले मिलाते जाएं!'
      },
      h1_fifo_queue: {
        title: 'FIFO ग्राहक ऑर्डर कतार',
        subtitle: 'कतार डेटा संरचना (First-In, First-Out)',
        csConcept: 'कतारें (FIFO: First-In, First-Out)',
        csDescription: 'जो ग्राहक पहले आया, उसे पहले खाना मिलेगा। यह कंप्यूटर साइंस की बुनियादी FIFO कतार है!',
        story: 'टिकट मशीन से 2 आर्डर आए हैं! पहले आर्डर #1 (पास्ता) लें, पकाएं, परोसें; फिर आर्डर #2 लें।',
        taskGoal: 'Dequeue ब्लॉक से आगमन क्रम में ऑर्डर लें, पकाएं और पास विंडो पर दें।',
        hint: '(1,0) पर जाएं और Dequeue चलाएं; पहला ऑर्डर आपके हाथ में आ जाएगा!'
      },
      h2_lifo_stack: {
        title: 'LIFO बर्गर स्टैक',
        subtitle: 'स्टैक डेटा संरचना (Last-In, First-Out)',
        csConcept: 'स्टैक्स (LIFO: Last-In, First-Out)',
        csDescription: 'प्लेटों के ढेर की तरह: जो सामग्री सबसे अंत में रखी जाती है, वही सबसे पहले बाहर निकलती है!',
        story: 'बन, टिक्की, पनीर को ट्रे पर स्टैक करें; फिर जांच के लिए सबसे ऊपर का पनीर पॉप करें।',
        taskGoal: 'stack_push से 3 परतें लगाएं और stack_pop से ऊपरी पनीर निकालें।',
        hint: 'पनीर उठाएं, (3,0) ट्रे पर जाएं और Stack Push चलाएं!'
      },
      h3_ingredient_sort: {
        title: 'आकार अनुसार सॉर्टिंग लाइन',
        subtitle: 'सॉर्टिंग एल्गोरिदम व अदला-बदली (Swap)',
        csConcept: 'सॉर्टिंग एल्गोरिदम (Bubble Sort)',
        csDescription: 'समान रूप से पकाने के लिए सामग्री को छोटे से बड़े क्रम में लगाना जरूरी है। पास वाले जोड़ों की तुलना करें और Swap करें।',
        story: 'तीन कद्दू अव्यवस्थित हैं [आकार 4, 1, 2]। तुलना और Swap ब्लॉक से इन्हें बढ़ते क्रम [1, 2, 4] में सजाएं!',
        taskGoal: 'निकटवर्ती काउंटरों की जांच करें और Swap से उन्हें सही क्रम में लगाएं।',
        hint: 'स्थान 1 और 2 के बीच खड़े हों। 4 > 1 है, इसलिए Swap Items चलाएं!'
      },
      h4_binary_search: {
        title: 'मसाला रैक बाइनरी सर्च',
        subtitle: 'बाइनरी सर्च एल्गोरिदम (O(log N))',
        csConcept: 'बाइनरी सर्च व फूट डालो और राज करो (Divide & Conquer)',
        csDescription: 'क्रमबद्ध 7 जार में जायफल ढूंढने के लिए एक-एक करके 7 बार देखने के बजाय, बीच वाले जार को देखकर आधी जगह छांट दें: O(log N)!',
        story: 'खास सॉस के लिए जायफल (रैंक #5) चाहिए। 1, 2, 3 मत गिनें! सीधे बीच वाले 4 पर जाएं और दाईं ओर छलांग लगाएं।',
        taskGoal: 'बीच वाले जार (3,0) को जांचें और सीधे लक्ष्य जार तक पहुंचें।',
        hint: 'सीधे बीच वाले जार (4,0) पर जाएं। जायफल 5 नंबर पर है, इसलिए सीधे दाईं ओर बढ़ें!'
      }
    }
  },

  // ==========================================
  // FRENCH (FRANÇAIS)
  // ==========================================
  fr: {
    appName: 'Chef Algorithme (Algorithm Chef)',
    appSubtitle: 'Cuisine Éducative de Pensée Informatique',
    nav: {
      recipeBook: 'Livre de Recettes',
      rushHour: 'Coup de Feu (Rush Hour)',
      teacherPortal: 'Espace Enseignant',
      gdd: 'GDD & Référentiel',
      codeBridge: 'Passerelle de Code',
      cuisineTheme: 'Style Culinaires',
      selectLanguage: 'Langue / Language'
    },
    actions: {
      cook: 'Lancer la Recette ! (Exécuter)',
      pause: 'Pause',
      step: 'Pas à Pas',
      reset: 'Réinitialiser',
      clear: 'Tout Effacer',
      export: 'Exporter JSON',
      copy: 'Copier le Code',
      copied: 'Copié !',
      nextLevel: 'Niveau Suivant',
      replay: 'Réessayer',
      explainSolution: 'Expliquer ma Solution',
      functionBuilder: 'Créateur de Fonctions',
      soundOn: 'Activer le Son',
      soundOff: 'Couper le Son'
    },
    ranks: {
      trainee: 'Apprenti de Cuisine (Trainee)',
      line_cook: 'Commis de Ligne (Line Cook)',
      sous_chef: 'Sous-Chef de Cuisine',
      head_chef: 'Chef Exécutif',
      master_chef: 'Grand Maître Algorithmique'
    },
    ageBands: {
      primary: 'Primaire Débutant (5-7 ans)',
      elementary: 'Élémentaire (8-10 ans)',
      middle: 'Collège (11-13 ans)',
      high: 'Lycée (14-18 ans)'
    },
    debugger: {
      efficiencyMeter: 'Compteur d\'Efficacité (Big-O)',
      liveMemory: 'Mémoire Vive (Variables)',
      dataStructures: 'Structures de Données',
      executed: 'Pas exécutés',
      optimal: 'optimal',
      scopeLocal: 'Portée : Locale',
      noVariables: 'Aucune variable déclarée',
      noDataStructures: 'Aucune pile ni file active',
      topOfStack: 'Sommet de la Pile (Top)',
      headOfQueue: 'Tête de File (Head)',
      hands: 'En mains',
      empty: 'Vides',
      dishSuccess: 'Plat dressé avec succès ! Consultez la note d\'efficacité.',
      errorEncountered: 'Erreur d\'Exécution Rencontrée',
      chefCoordinates: 'Coordonnées du chef',
      csConcept: 'Concept Informatique'
    },
    blocks: {
      move_up: { label: 'Avancer Vers le Haut', desc: 'Faire 1 pas vers le nord' },
      move_down: { label: 'Avancer Vers le Bas', desc: 'Faire 1 pas vers le sud' },
      move_left: { label: 'Avancer Vers la Gauche', desc: 'Faire 1 pas vers l\'ouest' },
      move_right: { label: 'Avancer Vers la Droite', desc: 'Faire 1 pas vers l\'est' },
      turn: { label: 'Pivoter l\'Orientation', desc: 'Orienter le chef vers la direction' },
      grab: { label: 'Prendre / Saisir', desc: 'Prendre un ingrédient ou outil' },
      place: { label: 'Poser / Dresser', desc: 'Déposer l\'objet sur la station' },
      chop: { label: 'Couper / Émincer', desc: 'Couper au couteau sur la planche' },
      cook: { label: 'Cuire / Saisir', desc: 'Faire chauffer sur le piano de cuisson' },
      mix: { label: 'Mélanger / Émulsionner', desc: 'Mélanger les ingrédients du poste' },
      serve: { label: 'Envoyer la Commande', desc: 'Déposer au passe-plat de service' },
      wait: { label: 'Attendre 1 Seconde', desc: 'Patienter pendant que la poêle chauffe' },
      repeat_times: { label: 'Répéter N Fois', desc: 'Boucle For : exécute le bloc N fois' },
      while_condition: { label: 'Tant Que (While)', desc: 'Boucle tant que la condition est vraie' },
      if_condition: { label: 'Si Condition (If)', desc: 'Branchement logique selon l\'état' },
      if_else_condition: { label: 'Si / Sinon (If/Else)', desc: 'Exécuter selon condition booléenne' },
      call_function: { label: 'Appeler Fonction()', desc: 'Exécuter un sous-programme réutilisable' },
      stack_push: { label: 'Pile : Empiler (Push)', desc: 'Ajouter au sommet de la pile LIFO' },
      stack_pop: { label: 'Pile : Dépiler (Pop)', desc: 'Retirer l\'élément supérieur de la pile' },
      queue_enqueue: { label: 'File : Enfiler (Enqueue)', desc: 'Ajouter le bon en queue de file FIFO' },
      queue_dequeue: { label: 'File : Défiler (Dequeue)', desc: 'Traiter le premier bon arrivé en cuisine' },
      swap_items: { label: 'Permuter Adjacents', desc: 'Tri à bulles : échanger deux positions' },
      set_variable: { label: 'Affecter Variable', desc: 'Mémoriser ou incrémenter une valeur' }
    },
    blockCategories: {
      movement: 'Déplacement',
      action: 'Actions Culinaires',
      control: 'Flux de Contrôle (Boucles)',
      logic: 'Logique & Conditions',
      function: 'Fonctions',
      data_structure: 'Structures de Données'
    },
    toolbox: {
      title: 'Boîte à Blocs d\'Instructions',
      hint: 'Cliquez ou glissez les blocs pour les ajouter à la timeline'
    },
    timeline: {
      title: 'Séquence Algorithmique',
      hint: 'Ordonnez les étapes logiques pour cuisiner le plat',
      emptyPlaceholder: 'Ajoutez des blocs depuis la boîte à outils pour concevoir votre recette !',
      stepCount: 'instructions'
    },
    mentor: {
      says: 'Conseil du Chef Mentor Pierre :'
    },
    levels: {
      p1_toast: {
        title: 'Tartine Chaude et Beurrée',
        subtitle: 'Séquençage et Étapes Ordonnées',
        csConcept: 'Séquencement Algorithmique Linéaire',
        csDescription: 'L\'ordinateur lit les instructions de haut en bas, une par une. Si vous inversez l\'ordre, la recette rate !',
        story: 'Bienvenue en brigade ! Votre premier client attend une tartine dorée au bon beurre frais.',
        taskGoal: 'Prenez le pain en (0,0), posez-le sur la planche en (2,0), beurrez-le et servez en (3,1).',
        hint: 'Prenez d\'abord le pain en (0,0), puis marchez vers la planche en (2,0) !'
      },
      p2_fruit_salad: {
        title: 'Salade de Pommes Croquantes',
        subtitle: 'Cause à Effet & Dépendance d\'Outils',
        csConcept: 'Préconditions et Dépendances',
        csDescription: 'Une action ne peut réussir sans ses préconditions (on ne peut pas émincer un fruit les mains vides !).',
        story: 'Le chef a besoin de pommes coupées en dés. Attention : sans couteau, impossible de couper !',
        taskGoal: 'Prenez le couteau de chef, allez sur la planche, émincez la pomme et dressez dans le saladier.',
        hint: 'Prenez le couteau en (0,0) en premier, sinon l\'action émincer provoquera une erreur !'
      },
      p3_sandwich: {
        title: 'Le Sandwich Triple Étage Gourmet',
        subtitle: 'Décomposition en Sous-Tâches',
        csConcept: 'Décomposition Algorithmique',
        csDescription: 'Les recettes complexes se résolvent en les découpant en petites actions atomiques ordonnées.',
        story: 'Montez le sandwich parfait ! Prenez le pain, étalez la garniture et envoyez au passe.',
        taskGoal: 'Prenez le pain, posez-le sur la planche, garnissez et déposez au comptoir de service.',
        hint: 'Prenez le pain, allez vers la garniture, préparez-le et apportez-le au passe !'
      },
      e1_carrot_soup: {
        title: 'Mirepoix pour Soupe de Carottes',
        subtitle: 'Boucles (Répéter N Fois)',
        csConcept: 'Boucles For & Itération',
        csDescription: 'Au lieu d\'écrire 4 fois "Couper", le programmeur utilise une boucle : "Répéter 4 fois { Couper }".',
        story: 'La soupe exige 4 découpes précises sur la carotte. Vos blocs sont limités : utilisez une boucle !',
        taskGoal: 'Prenez le couteau, allez à la carotte et utilisez une boucle "Répéter 4 Fois" pour la découper.',
        hint: 'Placez le bloc Couper À L\'INTÉRIEUR du bloc Répéter 4 Fois !'
      },
      e2_pancake_turner: {
        title: 'La Crêpe Dorée',
        subtitle: 'Conditions Simples (Si / Sinon)',
        csConcept: 'Logique Booléenne et Branchements',
        csDescription: 'Les conditions permettent de décider : SI la poêle est chaude, on saisit ; SINON, on fait chauffer.',
        story: 'La pâte va coller si la poêle est froide ! Vérifiez la température avant de cuire.',
        taskGoal: 'Utilisez un bloc Si/Sinon pour contrôler la poêle avant de faire sauter et servir la crêpe.',
        hint: 'Allez en (1,0) à la poêle. Mettez Cuire dans le bloc Si [poele_chaude] !'
      },
      e3_burger_debug: {
        title: 'Le Grand Débogage du Burger',
        subtitle: 'Débogage et Erreurs Logiques',
        csConcept: 'Débogage et Traçage de Code (Debugging)',
        csDescription: 'Les développeurs passent plus de temps à déboguer qu\'à écrire ! Suivez pas à pas où le chef bute.',
        story: 'Un commis pressé a laissé un code avec des bugs : le chef fonce dans le mur et attrape dans le vide !',
        taskGoal: 'Lancez le débogueur, repérez l\'erreur de déplacement vers le bas, corrigez-la et envoyez le plat.',
        hint: 'Remarquez que le chef va vers le BAS à l\'étape 2, alors que le pain est en HAUT en (1,0) !'
      },
      m1_bento_box: {
        title: 'Bento Box Optimisé',
        subtitle: 'Variables et Optimisation de Pas',
        csConcept: 'Efficacité Algorithmique et Bornes de Boucle',
        csDescription: 'Résoudre en 15 pas est bien ; en 8 pas, cela scale pour des millions d\'utilisateurs simultanés !',
        story: 'Montez 3 sushis dans le bento. En lignes directes, cela prend 24 pas ! Utilisez une boucle économe.',
        taskGoal: 'Récoltez 3 sushis avec une boucle et variable de comptage en minimisant les pas.',
        hint: 'Montez en (1,0) et répétez 3 fois [Prendre, Droite x 2, Poser, Gauche x 2] !'
      },
      m2_saute_function: {
        title: 'Fonction Sauter Réutilisable',
        subtitle: 'Fonctions et Abstraction Modulaire',
        csConcept: 'Abstraction Procédurale (Principe DRY)',
        csDescription: 'DRY signifie "Don\'t Repeat Yourself". Encapsulez [Couper + Saisir] dans la fonction SauteStation() !',
        story: 'Deux postes de légumes ont besoin de la même routine. Définissez la fonction une fois et appelez-la deux fois !',
        taskGoal: 'Créez SauteStation dans le constructeur de fonctions et appelez-la aux postes A et B.',
        hint: 'Allez au poste A, appelez SauteStation(), puis allez au poste B et rappelez-la !'
      },
      m3_big_o_soup: {
        title: 'Le Balayage Big-O des Épices',
        subtitle: 'Intuition de Complexité Big-O (O(N) vs O(N²))',
        csConcept: 'Complexité Temporelle & Échelle d\'Algorithme',
        csDescription: 'Revenir au départ après chaque épice est une perte O(N²) quadratique ! Un seul balayage est O(N) linéaire.',
        story: 'Les convives s\'impatientent ! 4 épices doivent être assaisonnées. Ferez-vous l\'aller-retour ou le balayage net ?',
        taskGoal: 'Parcourez les 4 pots d\'épices d\'une seule traite sans faire de demi-tour.',
        hint: 'Montez sur la rangée 0 et progressez en continu vers la droite tout en assaisonnant !'
      },
      h1_fifo_queue: {
        title: 'File d\'Attente FIFO des Commandes',
        subtitle: 'Structure de Données : File (Premier Entré, Premier Sorti)',
        csConcept: 'Files FIFO (First-In, First-Out)',
        csDescription: 'Le premier client à commander est le premier servi. C\'est le principe de la file FIFO (Enqueue / Dequeue) !',
        story: 'Des bons sortent de l\'imprimante ! Défilez le Bon #1 (Pâtes), cuisez et envoyez ; puis traitez le #2.',
        taskGoal: 'Utilisez Dequeue pour traiter les commandes dans l\'ordre d\'arrivée strict.',
        hint: 'Placez-vous en (1,0) et utilisez Défiler (Dequeue) : le premier bon arrive dans vos mains !'
      },
      h2_lifo_stack: {
        title: 'Pile LIFO Gratte-Ciel du Burger',
        subtitle: 'Structure de Données : Pile (Dernier Entré, Premier Sorti)',
        csConcept: 'Piles LIFO (Last-In, First-Out)',
        csDescription: 'Comme une pile d\'assiettes : le DERNIER ingrédient posé est le PREMIER retiré (Push et Pop) !',
        story: 'Empilez pain, steak et fromage. Dépilez ensuite le fromage du dessus pour l\'examiner.',
        taskGoal: 'Empilez 3 couches avec stack_push, puis dépilez avec stack_pop.',
        hint: 'Prenez le fromage en (1,0), allez au plateau en (3,0) et faites Empiler (Push) !'
      },
      h3_ingredient_sort: {
        title: 'Ligne de Tri par Calibre',
        subtitle: 'Conception d\'Algorithmes : Tri et Permutation',
        csConcept: 'Algorithmes de Tri (Tri à Bulles)',
        csDescription: 'Pour une cuisson homogène, on trie du plus petit au plus grand en comparant et permutant les pairs.',
        story: 'Trois citrouilles sont désordonnées [Taille 4, 1, 2]. Utilisez la comparaison et Swap pour obtenir [1, 2, 4] !',
        taskGoal: 'Comparez les postes adjacents et permutez avec Swap jusqu\'à obtenir l\'ordre croissant.',
        hint: 'Placez-vous entre les postes 1 et 2. Comme 4 > 1, effectuez Permuter (Swap) !'
      },
      h4_binary_search: {
        title: 'Recherche Binaire dans les Épices',
        subtitle: 'Recherche Dichotomique (O(log N))',
        csConcept: 'Recherche Binaire et Diviser pour Régner',
        csDescription: 'Dans un meuble d\'épices trié, vérifier chaque pot prend O(N). La dichotomie teste le milieu et élimine la moitié : O(log N) !',
        story: 'La sauce requiert de la Muscade (rang 5). Ne testez pas 1, 2, 3 ! Sautez au milieu (4), déduisez que 5 est à droite et foncez.',
        taskGoal: 'Vérifiez le pot central en (3,0) et sautez directement au pot cible.',
        hint: 'Allez directement au milieu en (4,0) pour inspecter, puis avancez vers le pot 5 à droite !'
      }
    }
  }
};
