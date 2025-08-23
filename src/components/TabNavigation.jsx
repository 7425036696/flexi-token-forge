import React from 'react';
import { Type, Code, FileCode } from 'lucide-react';

export function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'tokens',
      label: 'Tokenization',
      icon: Type,
      description: 'View tokenized text',
      gradient: 'from-blue-500/20 to-purple-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-300'
    },
    {
      id: 'encoding',
      label: 'Encoding',
      icon: Code,
      description: 'See token IDs',
      gradient: 'from-indigo-500/20 to-pink-500/20',
      border: 'border-indigo-500/30',
      text: 'text-indigo-300'
    },
    {
      id: 'decoding',
      label: 'Decoding',
      icon: FileCode,
      description: 'Decode token IDs',
      gradient: 'from-rose-500/20 to-amber-500/20',
      border: 'border-rose-500/30',
      text: 'text-rose-300'
    }
  ];

  const getTabClasses = (tab) => {
    const isActive = activeTab === tab.id;
    const baseClasses = "group flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden cursor-pointer";
    
    if (isActive) {
      return `${baseClasses} bg-gradient-to-r ${tab.gradient} border ${tab.border} ${tab.text} shadow-lg transform scale-[1.02]`;
    }
    
    return `${baseClasses} text-slate-400 hover:text-slate-300 hover:bg-slate-700/30 border border-transparent hover:border-slate-600/30 hover:scale-[1.01]`;
  };

  const getIconClasses = (tab) => {
    const isActive = activeTab === tab.id;
    return `h-5 w-5 sm:h-4 sm:w-4 transition-all duration-300 ${
      isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-105'
    }`;
  };

  return (
    <div className="mb-8">
      {/* Tab Navigation */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 backdrop-blur-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getTabClasses(tab)}
                title={tab.description}
              >
                {/* Active tab background glow */}
                {activeTab === tab.id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 animate-pulse"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-50"></div>
                  </>
                )}
                
                {/* Tab content */}
                <div className="relative flex flex-col sm:flex-row items-center gap-2">
                  <Icon className={getIconClasses(tab)} />
                  <span className="text-sm sm:text-base font-medium">
                    {tab.label}
                  </span>
                  
                  {/* Mobile indicator dot */}
                  <div className="sm:hidden">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeTab === tab.id 
                        ? `bg-gradient-to-r ${tab.gradient.replace('/20', '/60')}` 
                        : 'bg-slate-600'
                    }`} />
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>

        {/* Desktop tab indicator bar */}
        <div className="hidden sm:flex justify-center mt-4">
          <div className="flex gap-2">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`h-1 rounded-full transition-all duration-500 ease-out ${
                  activeTab === tab.id 
                    ? `w-8 bg-gradient-to-r ${tab.gradient.replace('/20', '/60')} shadow-sm` 
                    : 'w-2 bg-slate-600/50 hover:bg-slate-500/50'
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Current tab description */}
      <div className="text-center mt-4">
        <p className="text-sm text-slate-400">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
}