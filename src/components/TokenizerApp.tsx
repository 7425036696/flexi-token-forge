import React, { useState, useEffect } from 'react';
import { Moon, Sun, Zap, Hash, Type, Code, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenDisplay } from './TokenDisplay';
import { TokenStats } from './TokenStats';
import { EncodingSection } from './EncodingSection';
import { DecodingSection } from './DecodingSection';
import { tokenize, encode, getEncodedTokens } from '@/lib/tokenizer';

export function TokenizerApp() {
  const [text, setText] = useState('Hello world! This is a sample text with numbers like 123 and special characters.');
  const [isDark, setIsDark] = useState(true);
  const [tokens, setTokens] = useState<any[]>([]);
  const [encodedTokens, setEncodedTokens] = useState<any[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

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
    const encodedResult = getEncodedTokens(text);
    const ids = encode(text);
    
    setTokens(tokenizedResult);
    setEncodedTokens(encodedResult);
    setTokenIds(ids);
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
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  {tokens.length} tokens
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <TokenStats tokens={tokens} />
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Tokenization
            </TabsTrigger>
            <TabsTrigger value="encoding" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Encoding
            </TabsTrigger>
            <TabsTrigger value="decoding" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Decoding
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tokens" className="mt-6">
            <TokenDisplay tokens={tokens} />
          </TabsContent>
          
          <TabsContent value="encoding" className="mt-6">
            <EncodingSection encodedTokens={encodedTokens} tokenIds={tokenIds} />
          </TabsContent>
          
          <TabsContent value="decoding" className="mt-6">
            <DecodingSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}