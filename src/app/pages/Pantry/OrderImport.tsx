import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, ChevronRight, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function OrderImport() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState<string | null>(null);

  const platforms = [
    { id: 'blinkit', name: 'Blinkit', color: 'bg-yellow-400', logo: 'B' },
    { id: 'zepto', name: 'Zepto', color: 'bg-purple-600', logo: 'Z' },
    { id: 'swiggy', name: 'Swiggy Instamart', color: 'bg-orange-500', logo: 'S' },
    { id: 'bigbasket', name: 'BigBasket', color: 'bg-green-600', logo: 'bb' },
    { id: 'amazon', name: 'Amazon Fresh', color: 'bg-blue-500', logo: 'A' },
  ];

  const handleConnect = (id: string) => {
    setConnecting(id);
    setTimeout(() => {
      navigate('/pantry/review', { state: { isImport: true } });
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Connect Accounts" subtitle="Auto-import your grocery orders" backRoute="/pantry" />

      <div className="px-5 pb-8 flex flex-col gap-6 pt-2">
        <div className="bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-4 flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-brand-plum-100 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-plum-600 text-sm font-bold">💡</span>
          </div>
          <div>
            <p className="text-sm font-bold text-brand-plum-800 mb-1">How it works</p>
            <p className="text-xs text-brand-plum-700 leading-relaxed">
              Connect your grocery apps. We securely scan your digital receipts to automatically keep your pantry inventory up to date, without any manual entry.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">Supported Platforms</p>
          {platforms.map(platform => (
            <div key={platform.id} className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platform.color} shadow-sm`}>
                <span className="text-xl font-extrabold text-white">{platform.logo}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-text-primary text-base">{platform.name}</p>
                <p className="text-xs text-text-tertiary">Not connected</p>
              </div>
              <Button
                size="sm"
                variant={connecting === platform.id ? 'outline' : 'primary'}
                onClick={() => handleConnect(platform.id)}
                disabled={connecting !== null}
              >
                {connecting === platform.id ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
