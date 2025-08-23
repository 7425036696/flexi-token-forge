import React from 'react';
import { Type, Hash, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function InputSection({ text, setText, tokens }) {
  return (
    <Card className="encoding-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5 text-emerald-400" />
          Input Text
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here to tokenize..."
          className="w-full h-48 font-mono text-base"
        />

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <Hash className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">{text.length} chars</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <span className="text-sm font-semibold text-blue-300">
              {text.split(/\s+/).filter(w => w.length > 0).length} words
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Code className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">{tokens.length} tokens</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
