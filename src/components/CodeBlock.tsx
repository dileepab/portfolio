import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Simple syntax highlighting
const highlightCode = (code: string, language: string): string => {
  let highlighted = code;
  
  // Escape HTML
  highlighted = highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'export', 'import', 'from', 'async', 'await', 'new', 'this', 'extends', 'implements', 'public', 'private', 'protected', 'static', 'readonly', 'typeof', 'keyof', 'in', 'of', 'true', 'false', 'null', 'undefined', 'try', 'catch', 'throw', 'finally', 'default', 'switch', 'case', 'break', 'continue', 'do', 'instanceof', 'void', 'never', 'any', 'unknown', 'as', 'is', 'infer', 'enum', 'namespace', 'module', 'declare', 'abstract', 'override'];
  
  // Types
  const types = ['string', 'number', 'boolean', 'object', 'Array', 'Promise', 'Map', 'Set', 'Record', 'Partial', 'Required', 'Pick', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'Parameters', 'InstanceType', 'React', 'FC', 'Component', 'useState', 'useEffect', 'useCallback', 'useMemo', 'useRef', 'useContext'];
  
  // Highlight strings
  highlighted = highlighted.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="text-emerald-400">$&</span>');
  
  // Highlight comments
  highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="text-slate-500 italic">$1</span>');
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-slate-500 italic">$1</span>');
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>');
  });
  
  // Highlight types
  types.forEach(type => {
    const regex = new RegExp(`\\b(${type})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-cyan-400">$1</span>');
  });
  
  // Highlight numbers
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>');
  
  // Highlight function calls
  highlighted = highlighted.replace(/(\w+)(?=\()/g, '<span class="text-yellow-300">$1</span>');
  
  return highlighted;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = highlightCode(code, language);

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
        <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code 
            className="font-mono text-slate-300"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
