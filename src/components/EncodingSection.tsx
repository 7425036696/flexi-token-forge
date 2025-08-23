import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

export function EncodingSection({ encodedTokens, tokenIds, linewiseTokenIds }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(linewiseTokenIds));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (encodedTokens.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-pink-500/5"></div>
        <div className="relative py-20 text-center text-slate-400">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 mb-6">
            <Code className="h-8 w-8 text-indigo-400" />
          </div>
          <p className="text-lg font-medium">Enter text to see the encoded representation!</p>
          <p className="text-sm mt-2 opacity-70">View how your tokens are converted to numerical IDs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-pink-500/5"></div>
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20">
              <Code className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Encoded Tokens</h3>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-300 hover:from-indigo-500/30 hover:to-pink-500/30 transition-all duration-200"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Linewise IDs'}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 mb-6">
          <div className="text-sm font-semibold mb-3 text-indigo-300">
            Linewise Token IDs:
          </div>
          <div className="font-mono text-sm break-all text-slate-300 bg-black/30 p-3 rounded-lg">
            {JSON.stringify(linewiseTokenIds)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 mb-6">
          <div className="text-sm font-semibold mb-3 text-indigo-300">
            Single-line Token IDs:
          </div>
          <div className="font-mono text-sm break-all text-slate-300 bg-black/30 p-3 rounded-lg">
            [{tokenIds.join(', ')}]
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold mb-4 text-white">Token Mappings:</div>
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {encodedTokens.map((token, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-slate-600/30 hover:from-slate-800/50 hover:to-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/30 font-mono text-indigo-300 font-semibold">
                    {token.id}
                  </div>
                  <span className="text-slate-400">→</span>
                  <span className="font-semibold text-white truncate max-w-xs" title={token.originalText}>
                    {token.originalText}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  token.type === 'special' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  token.type === 'common' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  token.type === 'number' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  token.type === 'punctuation' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                  token.type === 'whitespace' ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' :
                  'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                }`}>
                  {token.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-600/50 mt-6">
          <div className="text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg">
            <strong className="text-indigo-400">💡 Tip:</strong> Linewise encoding splits input by lines. Copy the array above to use in the decoder!
          </div>
        </div>
      </div>
    </div>
  );
}