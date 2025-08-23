import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Hash, Star, Calculator, Dot, FileText } from 'lucide-react';

interface Token {
  text: string;
  type: 'common' | 'special' | 'number' | 'punctuation' | 'default';
  id: number;
}

interface TokenStatsProps {
  tokens: Token[];
}

export function TokenStats({ tokens }: TokenStatsProps) {
  const stats = tokens.reduce((acc, token) => {
    acc[token.type] = (acc[token.type] || 0) + 1;
    acc.total++;
    return acc;
  }, {
    common: 0,
    special: 0,
    number: 0,
    punctuation: 0,
    default: 0,
    total: 0
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'common':
        return <Hash className="h-4 w-4" />;
      case 'special':
        return <Star className="h-4 w-4" />;
      case 'number':
        return <Calculator className="h-4 w-4" />;
      case 'punctuation':
        return <Dot className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTokenTypeLabel = (type: string) => {
    switch (type) {
      case 'common':
        return 'Common Words';
      case 'special':
        return 'Special Tokens';
      case 'number':
        return 'Numbers';
      case 'punctuation':
        return 'Punctuation';
      default:
        return 'Other';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Token Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-3xl font-bold text-primary mb-1">
            {stats.total}
          </div>
          <div className="text-sm text-muted-foreground">Total Tokens</div>
        </div>

        <div className="space-y-3">
          {Object.entries(stats)
            .filter(([key]) => key !== 'total' && stats[key as keyof typeof stats] > 0)
            .map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    type === 'common' ? 'bg-token-common/20 text-token-common' :
                    type === 'special' ? 'bg-token-special/20 text-token-special' :
                    type === 'number' ? 'bg-token-number/20 text-token-number' :
                    type === 'punctuation' ? 'bg-token-punctuation/20 text-token-punctuation' :
                    'bg-token-default/20 text-token-default'
                  }`}>
                    {getIcon(type)}
                  </div>
                  <span className="font-medium">
                    {getTokenTypeLabel(type)}
                  </span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {count}
                </Badge>
              </div>
            ))}
        </div>

        {stats.total > 0 && (
          <div className="pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground text-center">
              Token distribution visualization coming soon!
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}