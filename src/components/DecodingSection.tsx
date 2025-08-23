import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileCode, ArrowRight, RotateCcw } from 'lucide-react';
import { decode } from '@/lib/tokenizer';

export function DecodingSection() {
  const [tokenIds, setTokenIds] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      setError('');
      
      // Parse the input as JSON array or comma-separated values
      let ids: number[];
      
      const trimmed = tokenIds.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        // JSON array format
        ids = JSON.parse(trimmed);
      } else {
        // Comma-separated format
        ids = trimmed.split(',').map(id => parseInt(id.trim()));
      }
      
      // Validate that all values are numbers
      if (ids.some(id => isNaN(id))) {
        setError('Please enter valid token IDs (numbers only)');
        return;
      }
      
      const decoded = decode(ids);
      setDecodedText(decoded);
      
    } catch (err) {
      setError('Invalid format. Use [1,2,3] or 1,2,3');
      setDecodedText('');
    }
  };

  const handleClear = () => {
    setTokenIds('');
    setDecodedText('');
    setError('');
  };

  const exampleIds = '[142, 256, 89, 445, 12, 678]';

  return (
    <Card className="encoding-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5 text-token-encoding" />
          Token Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Token IDs (JSON array or comma-separated):
          </label>
          <Textarea
            value={tokenIds}
            onChange={(e) => setTokenIds(e.target.value)}
            placeholder={`Example: ${exampleIds}`}
            className="font-mono text-sm"
            rows={3}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleDecode}
            disabled={!tokenIds.trim()}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Decode
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>

        {decodedText && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Decoded Text:</label>
            <div className="p-4 rounded-lg bg-muted/50 border min-h-[100px]">
              <p className="text-sm leading-relaxed">
                {decodedText}
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            <strong>Tip:</strong> Copy token IDs from the encoding section above, or enter your own array like {exampleIds}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}