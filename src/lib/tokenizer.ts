// lib/tokenizer.ts
export interface Token {
  text: string;
  type: 'common' | 'special' | 'number' | 'punctuation' | 'whitespace' | 'default';
  id: number;
  tokenId?: number;
}

export interface EncodedToken {
  id: number;
  originalText: string;
  type: Token['type'];
}

const SPECIAL_TOKENS = new Set([
  'hello','world','the','is','and','to','of','a','in','that','have','i','it',
  'for','not','on','with','he','as','you','do','at','this','but','his','by',
  'from','they','we','say','her','she','or','an','will','my','one','all',
  'would','there','their','what','so','up','out','if','about','who','get',
  'which','go','me','when','make','can','like','time','no','just','him',
  'know','take','people','into','year','your','good','some','could','them',
  'see','other','than','then','now','look','only','come','its','over',
  'think','also','back','after','use','two','how','our','work','first',
  'well','way','even','new','want','because','any','these','give','day',
  'most','us'
]);

const COMMON_WORDS = new Set([
  'very','much','still','should','through','before','here','too','any','each',
  'those','same','both','every','few','many','such','long','great','little',
  'own','other','old','right','big','high','different','small','large',
  'next','early','young','important','few','public','bad','same','able'
]);

const VOCABULARY = new Map<string, number>();
const REVERSE_VOCAB = new Map<number, string>();
let nextId = 0;

function initVocab() {
  for (const token of [...SPECIAL_TOKENS, ...COMMON_WORDS]) {
    if (!VOCABULARY.has(token)) {
      VOCABULARY.set(token, nextId);
      REVERSE_VOCAB.set(nextId, token);
      nextId++;
    }
  }
}
initVocab();

function getOrAddTokenId(text: string): number {
  const clean = text.toLowerCase();
  if (VOCABULARY.has(clean)) {
    return VOCABULARY.get(clean)!;
  }
  const id = nextId++;
  VOCABULARY.set(clean, id);
  REVERSE_VOCAB.set(id, clean);
  return id;
}

export function tokenize(text: string): Token[] {
  if (!text.trim()) return [];

  const tokens: Token[] = [];
  let tokenId = 0;

  const regex = /(\s+|[^\w\s]|\w+)/g;
  const matches = text.match(regex) || [];

  for (const match of matches) {
    let type: Token['type'] = 'default';
    if (/^\s+$/.test(match)) type = 'whitespace';
    else if (/^[^\w\s]$/.test(match)) type = 'punctuation';
    else if (/^\d+(\.\d+)?(?!\.)$/.test(match)) type = 'number';
    else if (SPECIAL_TOKENS.has(match.toLowerCase())) type = 'special';
    else if (COMMON_WORDS.has(match.toLowerCase())) type = 'common';

    tokens.push({
      text: match,
      type,
      id: tokenId++,
      tokenId: type !== 'whitespace' ? getOrAddTokenId(match) : undefined,
    });
  }

  return tokens;
}

export function encode(text: string): number[] {
  return tokenize(text)
    .filter(t => t.type !== 'whitespace')
    .map(t => t.tokenId!);
}

export function encodeLinewise(text: string): number[][] {
  const lines = text.split('\n').filter(line => line.trim());
  return lines.map(line => tokenize(line)
    .filter(t => t.type !== 'whitespace')
    .map(t => t.tokenId!));
}

export function decodeFromIds(tokenIds: number[]): string {
  return tokenIds.map(id => REVERSE_VOCAB.get(id) || `<UNK_${id}>`).join(" ");
}

export function decode(encodedTokens: EncodedToken[]): string {
  return encodedTokens.map(e => e.originalText).join("");
}

export function getEncodedTokens(text: string): EncodedToken[] {
  return tokenize(text).map(t => ({
    id: t.tokenId ?? -1,
    originalText: t.text,
    type: t.type,
  }));
}