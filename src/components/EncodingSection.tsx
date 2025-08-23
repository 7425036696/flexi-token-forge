import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EncodedToken {
  id: number;
  originalText: string;
  type: 'common' | 'special' | 'number' | 'punctuation' | 'default';
}

interface EncodingSectionProps {
  encodedTokens: EncodedToken[];
  tokenIds: number[];
}

export function EncodingSection({ encodedTokens, tokenIds }: EncodingSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(tokenIds));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (encodedTokens.length === 0) {
    return (
      <Card className="encoding-card">
        <CardContent className="py-16 text-center text-muted-foreground">
          <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter text to see the encoded representation!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="encoding-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-token-encoding" />
            Encoded Tokens
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy IDs'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token ID Array */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <div className="text-sm font-medium mb-2 text-token-encoding">
            Token IDs Array:
          </div>
          <div className="font-mono text-sm break-all text-muted-foreground">
            [{tokenIds.join(', ')}]
          </div>
        </div>

        {/* Individual Encoded Tokens */}
        <div className="space-y-2">
          <div className="text-sm font-medium mb-3">Token Mappings:</div>
          <div className="grid gap-2">
            {encodedTokens.map((token, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-token-encoding/20"
              >
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="secondary" 
                    className="font-mono text-token-encoding border-token-encoding/30"
                  >
                    {token.id}
                  </Badge>
                  <span className="text-sm">→</span>
                  <span className="font-medium">{token.originalText}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    token.type === 'special' ? 'border-token-special/50 text-token-special' :
                    token.type === 'common' ? 'border-token-common/50 text-token-common' :
                    token.type === 'number' ? 'border-token-number/50 text-token-number' :
                    token.type === 'punctuation' ? 'border-token-punctuation/50 text-token-punctuation' :
                    'border-token-default/50 text-token-default'
                  }`}
                >
                  {token.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}