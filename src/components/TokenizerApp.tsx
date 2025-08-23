import React, { useState, useEffect } from 'react';
import { Moon, Sun, Zap } from 'lucide-react';
import { TokenDisplay } from './TokenDisplay';
import { TokenStats } from './TokenStats';
import { EncodingSection } from './EncodingSection';
import { DecodingSection } from './DecodingSection';
import { InputSection } from './InputSection';
import { TabNavigation } from './TabNavigation';
import { tokenize, encode, encodeLinewise, getEncodedTokens } from '@/lib/tokenizer';

export default function TokenizerApp() {
  const [text, setText] = useState('world the is\nand to of\na in that\nhave i it\nfor not on\nwith he as\nyou do at\nthis but his\nby from they');
  const [isDark, setIsDark] = useState(true);
  const [tokens, setTokens] = useState([]);
  const [encodedTokens, setEncodedTokens] = useState([]);
  const [tokenIds, setTokenIds] = useState([]);
  const [linewiseTokenIds, setLinewiseTokenIds] = useState([]);
  const [activeTab, setActiveTab] = useState<'tokens' | 'encoding' | 'decoding'>('tokens');

  useEffect(() => {
    const tokenizedResult = tokenize(text);
    const encodedResult = getEncodedTokens(text);
    const ids = encode(text);
    const linewiseIds = encodeLinewise(text);

    setTokens(tokenizedResult);
    setEncodedTokens(encodedResult);
    setTokenIds(ids);
    setLinewiseTokenIds(linewiseIds);
  }, [text]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tokens':
        return <TokenDisplay tokens={tokens} linewiseTokenIds={linewiseTokenIds} />;
      case 'encoding':
        return <EncodingSection encodedTokens={encodedTokens} tokenIds={tokenIds} linewiseTokenIds={linewiseTokenIds} />;
      case 'decoding':
        return <DecodingSection />;
      default:
        return <TokenDisplay tokens={tokens} linewiseTokenIds={linewiseTokenIds} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <Zap className="h-10 w-10 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    TokenMaster
                  </h1>
                  <p className="text-slate-400 text-xl">
                    Advanced Text Tokenization Engine
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InputSection text={text} setText={setText} tokens={tokens} />
            <TokenStats tokens={tokens} />
          </div>

          <div className="w-full">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}