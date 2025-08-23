import { useState, useEffect } from 'react';
import { Moon, Sun, Zap, Hash, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TokenDisplay } from './TokenDisplay';
import { TokenStats } from './TokenStats';
import { tokenize } from '@/lib/tokenizer';

export function TokenizerApp() {
  const [text, setText] = useState('Hello world! This is a sample text with numbers like 123 and special characters.');
  const [isDark, setIsDark] = useState(true);
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    const tokenizedResult = tokenize(text);
    setTokens(tokenizedResult);
  }, [text]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl glow-effect bg-gradient-primary">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  TokenMaster
                </h1>
                <p className="text-muted-foreground text-lg">
                  Advanced Text Tokenization Engine
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-12 w-12 rounded-xl"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                Input Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here to tokenize..."
                className="min-h-[200px] resize-none text-base"
              />
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {text.length} characters
                </Badge>
                <Badge variant="secondary">
                  {text.split(/\s+/).filter(w => w.length > 0).length} words
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <TokenStats tokens={tokens} />
        </div>

        {/* Token Display */}
        <TokenDisplay tokens={tokens} />
      </div>
    </div>
  );
}