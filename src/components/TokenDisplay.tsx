import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface Token {
  text: string;
  type: 'common' | 'special' | 'number' | 'punctuation' | 'default';
  id: number;
}

interface TokenDisplayProps {
  tokens: Token[];
}

export function TokenDisplay({ tokens }: TokenDisplayProps) {
  const getTokenClassName = (type: Token['type']) => {
    const baseClass = 'token-chip';
    switch (type) {
      case 'common':
        return `${baseClass} token-common`;
      case 'special':
        return `${baseClass} token-special`;
      case 'number':
        return `${baseClass} token-number`;
      case 'punctuation':
        return `${baseClass} token-punctuation`;
      default:
        return `${baseClass} token-default`;
    }
  };

  if (tokens.length === 0) {
    return (
      <Card className="glass-card">
        <CardContent className="py-16 text-center text-muted-foreground">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter some text above to see the tokenization magic!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Tokenized Output
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 leading-relaxed">
          {tokens.map((token, index) => (
            <span
              key={index}
              className={getTokenClassName(token.type)}
              title={`Token ${token.id}: ${token.type}`}
            >
              {token.text}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}