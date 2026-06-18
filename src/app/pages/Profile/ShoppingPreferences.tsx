import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Zap } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';

export default function ShoppingPreferences() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState<Set<string>>(new Set(['zepto', 'bigbasket']));

  const platforms = [
    { id: 'blinkit', name: 'Blinkit', color: 'bg-yellow-400', logo: 'B' },
    { id: 'zepto', name: 'Zepto', color: 'bg-purple-600', logo: 'Z' },
    { id: 'swiggy', name: 'Swiggy Instamart', color: 'bg-orange-500', logo: 'S' },
    { id: 'bigbasket', name: 'BigBasket', color: 'bg-green-600', logo: 'bb' },
  ];

  const togglePlatform = (id: string) => {
    const next = new Set(connected);
    next.has(id) ? next.delete(id) : next.add(id);
    setConnected(next);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Shopping Accounts" subtitle="Auto-sync and compare" backRoute="/profile" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        <div className="bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-4 flex gap-3 items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-plum-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-brand-plum-600" />
          </div>
          <p className="text-xs text-brand-plum-800 leading-relaxed font-medium">
            Connect more platforms to get better price comparisons when generating shopping lists.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {platforms.map(platform => {
            const isConnected = connected.has(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center gap-4 rounded-2xl p-4 text-left transition-all border ${
                  isConnected ? 'bg-bg-elevated border-brand-muted shadow-sm ring-1 ring-brand/10' : 'bg-bg-sunken border-border-subtle hover:border-border-strong'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platform.color} shadow-sm`}>
                  <span className="text-xl font-extrabold text-white">{platform.logo}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-primary text-base">{platform.name}</p>
                  <p className={`text-xs mt-0.5 ${isConnected ? 'text-success font-bold' : 'text-text-tertiary'}`}>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
