import React from 'react';
import { BarChart3, Hash, Star, Calculator, Dot, FileText } from 'lucide-react';

export function TokenStats({ tokens }) {
  const stats = tokens.reduce((acc, token) => {
    acc[token.type] = (acc[token.type] || 0) + 1;
    acc.total++;
    return acc;
  }, {
    common: 0,
    special: 0,
    number: 0,
    punctuation: 0,
    whitespace: 0,
    default: 0,
    total: 0
  });

  const lineCount = tokens.filter(t => t.type === 'whitespace' && t.text.includes('\n')).length + 1;

  const getIcon = (type) => {
    switch (type) {
      case 'common':
        return <Hash className="h-5 w-5" />;
      case 'special':
        return <Star className="h-5 w-5" />;
      case 'number':
        return <Calculator className="h-5 w-5" />;
      case 'punctuation':
        return <Dot className="h-5 w-5" />;
      case 'whitespace':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTokenTypeLabel = (type) => {
    switch (type) {
      case 'common':
        return 'Common Words';
      case 'special':
        return 'Special Tokens';
      case 'number':
        return 'Numbers';
      case 'punctuation':
        return 'Punctuation';
      case 'whitespace':
        return 'Whitespace';
      default:
        return 'Other';
    }
  };

  const getColorClasses = (type) => {
    switch (type) {
      case 'common':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300';
      case 'special':
        return 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300';
      case 'number':
        return 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300';
      case 'punctuation':
        return 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300';
      case 'whitespace':
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300';
      default:
        return 'from-slate-500/20 to-slate-600/20 border-slate-500/30 text-slate-300';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5"></div>
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Token Statistics</h3>
        </div>

        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 mb-6">
          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            {stats.total}
          </div>
          <div className="text-sm text-slate-400">Total Tokens</div>
          <div className="text-sm text-slate-400 mt-2">{lineCount} Lines</div>
        </div>

        <div className="space-y-3">
          {Object.entries(stats)
            .filter(([key]) => key !== 'total' && stats[key] > 0)
            .map(([type, count]) => (
              <div key={type} className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${getColorClasses(type)} border transition-all duration-200 hover:scale-[1.02]`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(type)}`}>
                    {getIcon(type)}
                  </div>
                  <span className="font-semibold text-white">
                    {getTokenTypeLabel(type)}
                  </span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-black/30 font-mono text-sm font-bold">
                  {count}
                </div>
              </div>
            ))}
        </div>

        {stats.total > 0 && (
          <div className="pt-6 border-t border-slate-600/50 mt-6">
            <div className="text-xs text-slate-400 text-center bg-slate-800/30 p-3 rounded-lg">
              🚀 Token distribution visualization coming soon!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}