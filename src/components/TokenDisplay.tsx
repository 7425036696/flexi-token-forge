import React from 'react';
import { Sparkles } from 'lucide-react';

export function TokenDisplay({ tokens, linewiseTokenIds }) {
  const getTokenClassName = (type) => {
    const baseClass = 'inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer';
    switch (type) {
      case 'common':
        return `${baseClass} bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30`;
      case 'special':
        return `${baseClass} bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30`;
      case 'number':
        return `${baseClass} bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30`;
      case 'punctuation':
        return `${baseClass} bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30`;
      case 'whitespace':
        return `${baseClass} bg-gray-500/20 text-gray-300 border border-gray-500/30 hover:bg-gray-500/30`;
      default:
        return `${baseClass} bg-slate-500/20 text-slate-300 border border-slate-500/30 hover:bg-slate-500/30`;
    }
  };

  if (tokens.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="relative py-20 text-center text-slate-400">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
            <Sparkles className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-lg font-medium">Enter some text above to see the tokenization magic!</p>
          <p className="text-sm mt-2 opacity-70">Watch as your text transforms into beautiful tokens</p>
        </div>
      </div>
    );
  }

  // Group tokens by line based on linewiseTokenIds
  const lines = [];
  let currentLine = [];
  let lineIndex = 0;
  let tokenIndex = 0;

  while (tokenIndex < tokens.length) {
    if (tokens[tokenIndex].type === 'whitespace' && tokens[tokenIndex].text.includes('\n')) {
      lines.push(currentLine);
      currentLine = [];
      lineIndex++;
    } else {
      currentLine.push(tokens[tokenIndex]);
    }
    tokenIndex++;
  }
  if (currentLine.length > 0) lines.push(currentLine);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Sparkles className="h-5 w-5 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Tokenized Output</h3>
        </div>
        <div className="space-y-4">
          {lines.map((lineTokens, index) => (
            <div key={index} className="flex flex-wrap gap-3 leading-relaxed">
              {lineTokens.map((token, idx) => (
                <span
                  key={idx}
                  className={getTokenClassName(token.type)}
                  title={`Token ${token.id}${token.tokenId !== undefined ? `: ${token.type} (ID: ${token.tokenId})` : `: ${token.type}`}`}
                >
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}