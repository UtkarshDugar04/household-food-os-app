import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Info, TrendingDown, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function CartComparison() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('zepto');

  const platforms = [
    {
      id: 'zepto',
      name: 'Zepto',
      logo: 'Z',
      color: 'bg-purple-600',
      total: 1240,
      availability: '14/14 items',
      delivery: '10 mins',
      savings: 186,
      best: true,
    },
    {
      id: 'blinkit',
      name: 'Blinkit',
      logo: 'B',
      color: 'bg-yellow-400',
      total: 1310,
      availability: '14/14 items',
      delivery: '12 mins',
      savings: 116,
      best: false,
    },
    {
      id: 'bigbasket',
      name: 'BigBasket',
      logo: 'bb',
      color: 'bg-green-600',
      total: 1426,
      availability: '13/14 items',
      delivery: 'Tomorrow 7AM',
      savings: 0,
      best: false,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Compare & Buy" subtitle="14 items on your list" backRoute="/shopping/restock" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-5 flex-1">
        
        <div className="bg-success-bg border border-success/20 rounded-2xl p-4 flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-success text-sm mb-0.5">₹186 Potential Savings</p>
            <p className="text-xs text-text-secondary">Zepto has the best combined price today for your list.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`flex flex-col gap-3 rounded-2xl p-4 text-left transition-all border ${
                selected === p.id
                  ? 'bg-brand-50 border-brand/30 shadow-sm ring-1 ring-brand/20'
                  : 'bg-bg-elevated border-border-subtle hover:border-border-strong'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.color} shadow-sm`}>
                    <span className="text-lg font-extrabold text-white">{p.logo}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-text-primary text-base">{p.name}</p>
                      {p.best && <span className="px-2 py-0.5 bg-success text-white rounded-pill text-[10px] font-bold">Best Value</span>}
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">{p.delivery} · {p.availability}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selected === p.id ? 'border-brand bg-brand text-white' : 'border-border-strong text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
              
              <div className="flex justify-between items-end pt-3 border-t border-border-subtle/50">
                <div>
                  <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-1">Total Cart Value</p>
                  <p className="text-xl font-extrabold text-text-primary">₹{p.total}</p>
                </div>
                {p.savings > 0 && (
                  <p className="text-xs font-bold text-success">Save ₹{p.savings}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button size="lg" fullWidth icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/shopping/complete')}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
