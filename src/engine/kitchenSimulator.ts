import {
  KitchenLevel,
  InstructionBlock,
  CustomFunction,
  ExecutionFrame,
  ChefState,
  GridCell,
  KitchenItem
} from '../types/game';

const MAX_EXECUTION_FRAMES = 120; // Safe loop cap to prevent infinite loops

export function simulateLevelExecution(
  level: KitchenLevel,
  blocks: InstructionBlock[],
  customFunctions: CustomFunction[] = []
): ExecutionFrame[] {
  const frames: ExecutionFrame[] = [];

  // Deep clone initial grid and chef
  let grid: GridCell[] = JSON.parse(JSON.stringify(level.stations));
  let chef: ChefState = {
    x: level.chefStart.x,
    y: level.chefStart.y,
    direction: level.chefStart.direction,
    heldItem: null,
    heldTool: null,
    statusText: 'Ready at kitchen prep station',
    isActionActive: false
  };

  let variables: Record<string, any> = {
    chopsDone: 0,
    seasoningCount: 0,
    ordersServed: 0,
    functionsCalled: 0
  };

  // Collect any initial stack or queue
  const initialStackStation = grid.find((c) => c.type === 'stack_tray');
  let trayStack: KitchenItem[] = initialStackStation?.stack
    ? JSON.parse(JSON.stringify(initialStackStation.stack))
    : [];

  const initialQueueStation = grid.find((c) => c.type === 'order_queue');
  let orderQueue: KitchenItem[] = initialQueueStation?.queue
    ? JSON.parse(JSON.stringify(initialQueueStation.queue))
    : [];

  // Frame 0: Initial state
  frames.push({
    stepIndex: 0,
    currentInstructionId: null,
    chef: { ...chef },
    grid: JSON.parse(JSON.stringify(grid)),
    variables: { ...variables },
    trayStack: [...trayStack],
    orderQueue: [...orderQueue],
    logMessage: 'Program started: Kitchen stations primed.',
    soundCue: 'step'
  });

  let hasError = false;
  let errorMessage = '';
  let errorBlockId: string | null = null;
  let totalStepsCount = 0;

  // Flatten / execute instruction tree
  function executeBlock(block: InstructionBlock): boolean {
    if (hasError || totalStepsCount >= MAX_EXECUTION_FRAMES) return false;

    totalStepsCount++;
    if (totalStepsCount >= MAX_EXECUTION_FRAMES) {
      hasError = true;
      errorMessage = 'Infinite loop detected! Execution exceeded 120 steps. Check your loop bounds!';
      errorBlockId = block.id;
      return false;
    }

    const currentCell = grid.find((c) => c.x === chef.x && c.y === chef.y);

    switch (block.type) {
      case 'move_up': {
        const nextY = chef.y - 1;
        if (nextY < 0) {
          hasError = true;
          errorMessage = 'Collision! Chef bumped into the top kitchen wall. Check your coordinate boundaries!';
          errorBlockId = block.id;
          return false;
        }
        chef.y = nextY;
        chef.direction = 'up';
        chef.statusText = `Moved up to (${chef.x}, ${chef.y})`;
        recordFrame(block.id, 'step', chef.statusText);
        break;
      }

      case 'move_down': {
        const nextY = chef.y + 1;
        if (nextY >= level.gridHeight) {
          hasError = true;
          errorMessage = 'Collision! Chef bumped into the bottom kitchen boundary!';
          errorBlockId = block.id;
          return false;
        }
        chef.y = nextY;
        chef.direction = 'down';
        chef.statusText = `Moved down to (${chef.x}, ${chef.y})`;
        recordFrame(block.id, 'step', chef.statusText);
        break;
      }

      case 'move_left': {
        const nextX = chef.x - 1;
        if (nextX < 0) {
          hasError = true;
          errorMessage = 'Collision! Chef hit the left counter wall!';
          errorBlockId = block.id;
          return false;
        }
        chef.x = nextX;
        chef.direction = 'left';
        chef.statusText = `Moved left to (${chef.x}, ${chef.y})`;
        recordFrame(block.id, 'step', chef.statusText);
        break;
      }

      case 'move_right': {
        const nextX = chef.x + 1;
        if (nextX >= level.gridWidth) {
          hasError = true;
          errorMessage = 'Collision! Chef reached the right wall boundary!';
          errorBlockId = block.id;
          return false;
        }
        chef.x = nextX;
        chef.direction = 'right';
        chef.statusText = `Moved right to (${chef.x}, ${chef.y})`;
        recordFrame(block.id, 'step', chef.statusText);
        break;
      }

      case 'grab': {
        if (!currentCell || !currentCell.item) {
          hasError = true;
          errorMessage = `Empty station error! The chef tried to grab at (${chef.x}, ${chef.y}), but there is no item here. Check your station coordinates!`;
          errorBlockId = block.id;
          return false;
        }

        if (chef.heldItem) {
          hasError = true;
          errorMessage = `Hands full! Chef is already holding ${chef.heldItem.label}. You must place or use it before grabbing another item!`;
          errorBlockId = block.id;
          return false;
        }

        const pickedItem = currentCell.item;
        if (pickedItem.type === 'knife') {
          chef.heldTool = 'knife';
        }

        chef.heldItem = { ...pickedItem };
        currentCell.item = null;
        chef.isActionActive = true;
        chef.actionType = 'grab';
        chef.statusText = `Grabbed ${chef.heldItem.label}`;
        recordFrame(block.id, 'grab', chef.statusText);
        chef.isActionActive = false;
        break;
      }

      case 'place': {
        if (!chef.heldItem) {
          hasError = true;
          errorMessage = 'Empty hands! Tried to place an item, but the Chef is not holding anything!';
          errorBlockId = block.id;
          return false;
        }

        if (!currentCell) {
          // If no specific station, place onto floor counter
          grid.push({
            x: chef.x,
            y: chef.y,
            type: 'counter',
            label: 'Countertop',
            item: { ...chef.heldItem }
          });
        } else {
          // Special transformation based on station
          if (currentCell.type === 'assembly_station') {
            currentCell.item = { ...chef.heldItem, state: 'finished' };
          } else if (currentCell.type === 'stove') {
            currentCell.item = { ...chef.heldItem, state: 'cooked' };
          } else {
            currentCell.item = { ...chef.heldItem };
          }
        }

        const placedName = chef.heldItem.label;
        chef.heldItem = null;
        chef.isActionActive = true;
        chef.actionType = 'place';
        chef.statusText = `Placed ${placedName} at station`;
        recordFrame(block.id, 'place', chef.statusText);
        chef.isActionActive = false;
        break;
      }

      case 'chop': {
        // Chopping requires being at a cutting board or having knife
        const board = grid.find((c) => c.x === chef.x && c.y === chef.y);
        if (!board || (board.type !== 'cutting_board' && board.type !== 'pantry' && board.type !== 'counter')) {
          hasError = true;
          errorMessage = 'Safety violation: The chef cannot chop here! You must be at a cutting board.';
          errorBlockId = block.id;
          return false;
        }

        variables.chopsDone = (variables.chopsDone || 0) + 1;
        chef.isActionActive = true;
        chef.actionType = 'chop';
        if (board.item) {
          board.item.state = 'chopped';
          if (board.item.type === 'raw_carrot') board.item.type = 'chopped_carrot';
          if (board.item.type === 'raw_potato') board.item.type = 'chopped_potato';
        }
        chef.statusText = `Chopped ingredient (Chop count: ${variables.chopsDone})`;
        recordFrame(block.id, 'chop', chef.statusText);
        chef.isActionActive = false;
        break;
      }

      case 'cook': {
        // Cooking at stove or seasoning
        const station = grid.find((c) => c.x === chef.x && c.y === chef.y);
        if (!station) {
          hasError = true;
          errorMessage = 'The chef tried to cook in mid-air! Move to a stove or active station first.';
          errorBlockId = block.id;
          return false;
        }

        if (station.item) {
          station.item.state = 'cooked';
          if (station.item.type === 'raw_patty') station.item.type = 'cooked_patty';
          if (station.item.type === 'bread') station.item.type = 'toast';
          if (station.item.type === 'raw_carrot') station.item.type = 'cooked_soup';
        }
        if (station.type === 'counter' && station.item?.type === 'spice_jar') {
          variables.seasoningCount = (variables.seasoningCount || 0) + 1;
        }

        chef.isActionActive = true;
        chef.actionType = 'cook';
        chef.statusText = `Sizzling! Cooking action executed at ${station.label}`;
        recordFrame(block.id, 'cook', chef.statusText);
        chef.isActionActive = false;
        break;
      }

      case 'repeat_times': {
        const loopCount = block.params?.count || 3;
        for (let iter = 0; iter < loopCount; iter++) {
          if (hasError) break;
          const children = block.children || [];
          for (const child of children) {
            executeBlock(child);
            if (hasError) break;
          }
        }
        break;
      }

      case 'if_condition': {
        const cond = block.params?.condition || 'pan_is_hot';
        const isTrue = evaluateCondition(cond, chef, currentCell);
        if (isTrue) {
          const children = block.children || [];
          for (const child of children) {
            executeBlock(child);
            if (hasError) break;
          }
        }
        break;
      }

      case 'if_else_condition': {
        const cond = block.params?.condition || 'pan_is_hot';
        const isTrue = evaluateCondition(cond, chef, currentCell);
        const children = isTrue ? block.children || [] : block.elseChildren || [];
        for (const child of children) {
          executeBlock(child);
          if (hasError) break;
        }
        break;
      }

      case 'call_function': {
        const fnName = block.params?.functionName || 'SauteStation';
        const targetFn = customFunctions.find((f) => f.name === fnName);
        variables.functionsCalled = (variables.functionsCalled || 0) + 1;
        if (targetFn && targetFn.blocks.length > 0) {
          for (const subBlock of targetFn.blocks) {
            executeBlock(subBlock);
            if (hasError) break;
          }
        } else {
          // Built-in SauteStation fallback logic
          variables.sauteCompleted = true;
          chef.statusText = `Executed function ${fnName}()`;
          recordFrame(block.id, 'cook', chef.statusText);
        }
        break;
      }

      case 'stack_push': {
        if (!chef.heldItem) {
          hasError = true;
          errorMessage = 'Stack Error: Cannot PUSH when Chef holds no item! Grab an ingredient first.';
          errorBlockId = block.id;
          return false;
        }
        trayStack.push({ ...chef.heldItem });
        const pushedItem = chef.heldItem.label;
        chef.heldItem = null;
        variables.pushedToStack = true;
        chef.statusText = `Pushed [${pushedItem}] onto LIFO Stack Tray (Depth: ${trayStack.length})`;
        recordFrame(block.id, 'place', chef.statusText);
        break;
      }

      case 'stack_pop': {
        if (trayStack.length === 0) {
          hasError = true;
          errorMessage = 'Stack Underflow! Tried to POP from an empty stack tray. Order must have items!';
          errorBlockId = block.id;
          return false;
        }
        const popped = trayStack.pop()!;
        chef.heldItem = popped;
        variables.stackMastered = true;
        chef.statusText = `Popped [${popped.label}] off top of LIFO Stack`;
        recordFrame(block.id, 'grab', chef.statusText);
        break;
      }

      case 'queue_dequeue': {
        if (orderQueue.length === 0) {
          hasError = true;
          errorMessage = 'Queue Underflow! No more customer tickets in FIFO line.';
          errorBlockId = block.id;
          return false;
        }
        const ticket = orderQueue.shift()!;
        chef.heldItem = ticket;
        variables.ordersServed = (variables.ordersServed || 0) + 1;
        chef.statusText = `Dequeued [${ticket.label}] in strict FIFO arrival order!`;
        recordFrame(block.id, 'grab', chef.statusText);
        break;
      }

      case 'swap_items': {
        // Find cell at chef and cell at x+1
        const cellA = grid.find((c) => c.x === chef.x && c.y === chef.y);
        const cellB = grid.find((c) => c.x === chef.x + 1 && c.y === chef.y);

        if (cellA && cellB) {
          const temp = cellA.item;
          cellA.item = cellB.item;
          cellB.item = temp;
          chef.statusText = `Swapped items between Spot (${cellA.x},${cellA.y}) and Spot (${cellB.x},${cellB.y})`;
          recordFrame(block.id, 'grab', chef.statusText);
        }
        break;
      }

      case 'set_variable': {
        const vName = block.params?.varName || 'chops';
        const vVal = block.params?.varValue || 1;
        variables[vName] = vVal;
        chef.statusText = `Variable [${vName}] set to ${vVal}`;
        recordFrame(block.id, 'step', chef.statusText);
        break;
      }

      default:
        break;
    }

    return true;
  }

  function evaluateCondition(cond: string, chef: ChefState, cell?: GridCell): boolean {
    if (cond === 'pan_is_hot') {
      return cell?.panHeat !== false;
    }
    if (cond === 'holds_item') {
      return chef.heldItem !== null;
    }
    if (cond === 'needs_chopping') {
      return cell?.item?.state === 'raw';
    }
    return true;
  }

  function recordFrame(instructionId: string | null, soundCue: any, log: string) {
    frames.push({
      stepIndex: frames.length,
      currentInstructionId: instructionId,
      chef: { ...chef },
      grid: JSON.parse(JSON.stringify(grid)),
      variables: { ...variables },
      trayStack: [...trayStack],
      orderQueue: [...orderQueue],
      logMessage: log,
      soundCue
    });
  }

  // Run all top-level blocks
  for (const block of blocks) {
    executeBlock(block);
    if (hasError) break;
  }

  // Final validation check against level targetPlateValidation
  if (!hasError) {
    const deliveredOrders: KitchenItem[] = [];
    const validation = level.targetPlateValidation({
      grid,
      chef,
      deliveredOrders,
      variables
    });

    if (validation.success) {
      frames.push({
        stepIndex: frames.length,
        currentInstructionId: null,
        chef: { ...chef },
        grid: JSON.parse(JSON.stringify(grid)),
        variables: { ...variables },
        trayStack: [...trayStack],
        orderQueue: [...orderQueue],
        logMessage: `Success! ${validation.message}`,
        soundCue: 'success',
        isComplete: true
      });
    } else {
      frames.push({
        stepIndex: frames.length,
        currentInstructionId: null,
        chef: { ...chef },
        grid: JSON.parse(JSON.stringify(grid)),
        variables: { ...variables },
        trayStack: [...trayStack],
        orderQueue: [...orderQueue],
        logMessage: validation.message,
        soundCue: 'error',
        isError: true,
        errorMessage: validation.message
      });
    }
  } else {
    // Record error frame with highlighted block id
    frames.push({
      stepIndex: frames.length,
      currentInstructionId: errorBlockId,
      chef: { ...chef },
      grid: JSON.parse(JSON.stringify(grid)),
      variables: { ...variables },
      trayStack: [...trayStack],
      orderQueue: [...orderQueue],
      logMessage: `Error at instruction: ${errorMessage}`,
      soundCue: 'error',
      isError: true,
      errorMessage
    });
  }

  return frames;
}
