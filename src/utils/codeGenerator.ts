import { InstructionBlock, CustomFunction } from '../types/game';

export type CodeLanguage = 'python' | 'javascript' | 'pseudocode';

export function generateCode(
  blocks: InstructionBlock[],
  language: CodeLanguage,
  customFunctions: CustomFunction[] = []
): string {
  const lines: string[] = [];

  // Language Header
  if (language === 'python') {
    lines.push('# Algorithm Chef Kitchen Automation Script');
    lines.push('from kitchen import chef, pantry, stove, tray, queue\n');
  } else if (language === 'javascript') {
    lines.push('// Algorithm Chef Kitchen Automation Script');
    lines.push("import { chef, pantry, stove, tray, queue } from 'algorithm-chef';\n");
  } else {
    lines.push('ALGORITHM KitchenProcedure');
    lines.push('BEGIN');
  }

  // Generate Custom Functions first if any exist
  if (customFunctions.length > 0) {
    customFunctions.forEach((fn) => {
      if (language === 'python') {
        lines.push(`def ${fn.name}():`);
        lines.push(`    """${fn.description}"""`);
        if (fn.blocks.length === 0) {
          lines.push('    pass');
        } else {
          fn.blocks.forEach((b) => {
            lines.push(`    ${blockToCode(b, language, 1)}`);
          });
        }
        lines.push('');
      } else if (language === 'javascript') {
        lines.push(`function ${fn.name}() {`);
        if (fn.blocks.length === 0) {
          lines.push('  // empty subroutine');
        } else {
          fn.blocks.forEach((b) => {
            lines.push(`  ${blockToCode(b, language, 1)}`);
          });
        }
        lines.push('}\n');
      } else {
        lines.push(`PROCEDURE ${fn.name}()`);
        fn.blocks.forEach((b) => {
          lines.push(`  ${blockToCode(b, language, 1)}`);
        });
        lines.push('END PROCEDURE\n');
      }
    });
  }

  // Main execution block
  if (language === 'python') {
    lines.push('def cook_recipe():');
    if (blocks.length === 0) {
      lines.push('    pass  # Drag instruction blocks here to begin!');
    } else {
      blocks.forEach((b) => {
        lines.push(blockToCode(b, language, 1));
      });
    }
    lines.push('\nif __name__ == "__main__":');
    lines.push('    cook_recipe()');
  } else if (language === 'javascript') {
    lines.push('function cookRecipe() {');
    if (blocks.length === 0) {
      lines.push('  // Drag instruction blocks here to begin!');
    } else {
      blocks.forEach((b) => {
        lines.push(blockToCode(b, language, 1));
      });
    }
    lines.push('}\n');
    lines.push('cookRecipe();');
  } else {
    if (blocks.length === 0) {
      lines.push('  // Awaiting instruction blocks...');
    } else {
      blocks.forEach((b) => {
        lines.push(blockToCode(b, language, 1));
      });
    }
    lines.push('END');
  }

  return lines.join('\n');
}

function blockToCode(block: InstructionBlock, lang: CodeLanguage, indentLevel: number): string {
  const indent = '  '.repeat(indentLevel);
  const nextIndent = '  '.repeat(indentLevel + 1);

  switch (block.type) {
    case 'move_up':
      return lang === 'python'
        ? `${indent}chef.move_up()`
        : lang === 'javascript'
        ? `${indent}chef.moveUp();`
        : `${indent}MOVE_UP()`;

    case 'move_down':
      return lang === 'python'
        ? `${indent}chef.move_down()`
        : lang === 'javascript'
        ? `${indent}chef.moveDown();`
        : `${indent}MOVE_DOWN()`;

    case 'move_left':
      return lang === 'python'
        ? `${indent}chef.move_left()`
        : lang === 'javascript'
        ? `${indent}chef.moveLeft();`
        : `${indent}MOVE_LEFT()`;

    case 'move_right':
      return lang === 'python'
        ? `${indent}chef.move_right()`
        : lang === 'javascript'
        ? `${indent}chef.moveRight();`
        : `${indent}MOVE_RIGHT()`;

    case 'grab':
      return lang === 'python'
        ? `${indent}chef.grab_item()`
        : lang === 'javascript'
        ? `${indent}chef.grab();`
        : `${indent}PICK_UP_ITEM()`;

    case 'place':
      return lang === 'python'
        ? `${indent}chef.place_item()`
        : lang === 'javascript'
        ? `${indent}chef.place();`
        : `${indent}PLACE_ITEM()`;

    case 'chop':
      return lang === 'python'
        ? `${indent}chef.chop()`
        : lang === 'javascript'
        ? `${indent}chef.chop();`
        : `${indent}CHOP_STATION()`;

    case 'cook':
      return lang === 'python'
        ? `${indent}stove.cook()`
        : lang === 'javascript'
        ? `${indent}stove.cook();`
        : `${indent}APPLY_HEAT()`;

    case 'repeat_times': {
      const times = block.params?.count || 3;
      const childCode = (block.children || [])
        .map((c) => blockToCode(c, lang, indentLevel + 1))
        .join('\n');
      const inner = childCode || (lang === 'python' ? `${nextIndent}pass` : `${nextIndent}// repeat body`);

      if (lang === 'python') {
        return `${indent}for step in range(${times}):\n${inner}`;
      } else if (lang === 'javascript') {
        return `${indent}for (let i = 0; i < ${times}; i++) {\n${inner}\n${indent}}`;
      } else {
        return `${indent}REPEAT ${times} TIMES\n${inner}\n${indent}END REPEAT`;
      }
    }

    case 'if_condition': {
      const condition = block.params?.condition || 'pan_is_hot';
      const condExpr =
        condition === 'pan_is_hot'
          ? lang === 'python'
            ? 'stove.is_hot()'
            : lang === 'javascript'
            ? 'stove.isHot()'
            : 'STOVE_IS_HOT'
          : condition === 'holds_item'
          ? lang === 'python'
            ? 'chef.holds_item()'
            : lang === 'javascript'
            ? 'chef.hasItem()'
            : 'CHEF_HOLDS_ITEM'
          : 'item.needs_chopping()';

      const childCode = (block.children || [])
        .map((c) => blockToCode(c, lang, indentLevel + 1))
        .join('\n');
      const inner = childCode || (lang === 'python' ? `${nextIndent}pass` : `${nextIndent}// action`);

      if (lang === 'python') {
        return `${indent}if ${condExpr}:\n${inner}`;
      } else if (lang === 'javascript') {
        return `${indent}if (${condExpr}) {\n${inner}\n${indent}}`;
      } else {
        return `${indent}IF ${condExpr} THEN\n${inner}\n${indent}END IF`;
      }
    }

    case 'if_else_condition': {
      const condExpr = lang === 'python' ? 'stove.is_hot()' : lang === 'javascript' ? 'stove.isHot()' : 'STOVE_IS_HOT';
      const ifCode = (block.children || [])
        .map((c) => blockToCode(c, lang, indentLevel + 1))
        .join('\n') || (lang === 'python' ? `${nextIndent}pass` : `${nextIndent}// if branch`);
      const elseCode = (block.elseChildren || [])
        .map((c) => blockToCode(c, lang, indentLevel + 1))
        .join('\n') || (lang === 'python' ? `${nextIndent}pass` : `${nextIndent}// else branch`);

      if (lang === 'python') {
        return `${indent}if ${condExpr}:\n${ifCode}\n${indent}else:\n${elseCode}`;
      } else if (lang === 'javascript') {
        return `${indent}if (${condExpr}) {\n${ifCode}\n${indent}} else {\n${elseCode}\n${indent}}`;
      } else {
        return `${indent}IF ${condExpr} THEN\n${ifCode}\n${indent}ELSE\n${elseCode}\n${indent}END IF`;
      }
    }

    case 'call_function': {
      const fnName = block.params?.functionName || 'SauteStation';
      return lang === 'python'
        ? `${indent}${fnName}()`
        : lang === 'javascript'
        ? `${indent}${fnName}();`
        : `${indent}CALL ${fnName}()`;
    }

    case 'stack_push':
      return lang === 'python'
        ? `${indent}tray_stack.push(chef.release_item())`
        : lang === 'javascript'
        ? `${indent}trayStack.push(chef.releaseItem());`
        : `${indent}PUSH(tray_stack, chef.held_item)`;

    case 'stack_pop':
      return lang === 'python'
        ? `${indent}chef.held_item = tray_stack.pop()`
        : lang === 'javascript'
        ? `${indent}chef.heldItem = trayStack.pop();`
        : `${indent}POP(tray_stack) -> chef.held_item`;

    case 'queue_enqueue':
      return lang === 'python'
        ? `${indent}order_queue.enqueue(new_ticket)`
        : lang === 'javascript'
        ? `${indent}orderQueue.enqueue(newTicket);`
        : `${indent}ENQUEUE(order_queue, ticket)`;

    case 'queue_dequeue':
      return lang === 'python'
        ? `${indent}current_ticket = order_queue.dequeue()`
        : lang === 'javascript'
        ? `${indent}const currentTicket = orderQueue.dequeue();`
        : `${indent}DEQUEUE(order_queue) -> current_ticket`;

    case 'swap_items':
      return lang === 'python'
        ? `${indent}# Pairwise swap adjacent items\n${indent}counter[i], counter[i+1] = counter[i+1], counter[i]`
        : lang === 'javascript'
        ? `${indent}[counter[i], counter[i+1]] = [counter[i+1], counter[i]];`
        : `${indent}SWAP(counter[i], counter[i+1])`;

    case 'set_variable': {
      const vName = block.params?.varName || 'chops';
      const vVal = block.params?.varValue ?? '0';
      return lang === 'python'
        ? `${indent}${vName} = ${vVal}`
        : lang === 'javascript'
        ? `${indent}let ${vName} = ${vVal};`
        : `${indent}SET ${vName} <- ${vVal}`;
    }

    default:
      return `${indent}// ${block.label}`;
  }
}
