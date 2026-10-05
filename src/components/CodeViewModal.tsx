import React, { useState } from 'react';
import { InstructionBlock, CustomFunction } from '../types/game';
import { generateCode, CodeLanguage } from '../utils/codeGenerator';
import { X, Copy, Check, Code, FileCode2, Terminal } from 'lucide-react';

interface CodeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: InstructionBlock[];
  customFunctions?: CustomFunction[];
}

export const CodeViewModal: React.FC<CodeViewModalProps> = ({
  isOpen,
  onClose,
  blocks,
  customFunctions = []
}) => {
  const [selectedLang, setSelectedLang] = useState<CodeLanguage>('python');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedCode = generateCode(blocks, selectedLang, customFunctions);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                Block-to-Syntax Code Bridge
              </h2>
              <p className="text-[11px] text-stone-400">
                Live translation of your visual block sequence into production code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-stone-950/30 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-stone-800/80 rounded-xl">
            <button
              onClick={() => setSelectedLang('python')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedLang === 'python'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Python 3
            </button>
            <button
              onClick={() => setSelectedLang('javascript')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedLang === 'javascript'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              JavaScript / Node
            </button>
            <button
              onClick={() => setSelectedLang('pseudocode')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedLang === 'pseudocode'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              AP Pseudocode
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Output Viewer */}
        <div className="flex-1 p-5 overflow-y-auto bg-stone-950 font-mono text-xs text-stone-200 leading-relaxed select-text">
          <pre className="whitespace-pre">{generatedCode}</pre>
        </div>

        {/* Pedagogical Note Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950/80 text-[11px] text-stone-400 flex items-center justify-between">
          <span>
            💡 Notice how loops map to <code className="text-amber-400">for ... in range()</code> and conditionals map to <code className="text-amber-400">if: ... else:</code>!
          </span>
          <span className="text-stone-500">CS Standard: CSTA 2-AP-12</span>
        </div>
      </div>
    </div>
  );
};
