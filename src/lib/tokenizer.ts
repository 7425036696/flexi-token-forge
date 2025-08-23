interface Token {
  text: string;
  type: 'common' | 'special' | 'number' | 'punctuation' | 'default';
  id: number;
}

// Define special tokens for common words
const SPECIAL_TOKENS = new Set([
  'hello', 'world', 'the', 'is', 'and', 'to', 'of', 'a', 'in', 'that', 'have',
  'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
  'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an',
  'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
  'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make',
  'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
  'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
  'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
  'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give',
  'day', 'most', 'us'
]);

// Define common words that should be highlighted differently
const COMMON_WORDS = new Set([
  'very', 'much', 'still', 'should', 'through', 'before', 'here', 'too',
  'any', 'each', 'those', 'same', 'both', 'every', 'few', 'many', 'such',
  'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high',
  'different', 'small', 'large', 'next', 'early', 'young', 'important',
  'few', 'public', 'bad', 'same', 'able'
]);

export function tokenize(text: string): Token[] {
  if (!text.trim()) return [];

  // Simple tokenization by splitting on whitespace and punctuation
  const tokens: Token[] = [];
  let tokenId = 0;
  
  // Split text while preserving punctuation
  const regex = /(\s+|[^\w\s]|\w+)/g;
  const matches = text.match(regex) || [];
  
  for (const match of matches) {
    // Skip whitespace tokens for display
    if (/^\s+$/.test(match)) continue;
    
    const cleanToken = match.toLowerCase();
    let tokenType: Token['type'] = 'default';
    
    // Determine token type
    if (/^[^\w\s]$/.test(match)) {
      tokenType = 'punctuation';
    } else if (/^\d+(\.\d+)?$/.test(match)) {
      tokenType = 'number';
    } else if (SPECIAL_TOKENS.has(cleanToken)) {
      tokenType = 'special';
    } else if (COMMON_WORDS.has(cleanToken)) {
      tokenType = 'common';
    }
    
    tokens.push({
      text: match,
      type: tokenType,
      id: tokenId++
    });
  }
  
  return tokens;
}