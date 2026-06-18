import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Zap, Target, Leaf } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function PurchaseRecommendations() {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      name: 'Organic Milk 1L',
      reason: 'Replacing expiring milk. Usually lasts 5 days in your fridge.',
      impact: 'Avoids breakfast gap',
      price: '₹85',
      emoji: '🥛',
      color: 'text-brand-sky-600',
      bg: 'bg-brand-sky-50',
    },
    {
      id: 2,
      name: 'Brown Eggs 6-pack',
      reason: 'Required for 3 planned recipes this week.',
      impact: 'Hits protein goals',
      price: '₹65',
      emoji: '🥚',
      color: 'text-warning',
      bg: 'bg-warning-bg',
    },
    {
      id: 3,
      name: 'Spinach Bunch',
      reason: 'Low stock. You consume this fast.',
      impact: 'Fiber boost',
      price: '₹30',
      emoji: '🥬',
      color: 'text-success',
      bg: 'bg-success-bg',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Suggested Buys" subtitle="AI predicts you need these" backRoute="/shopping/restock" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6 flex-1">
        
        <div className="bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-4 flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-brand-plum-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-brand-plum-600" />
          </div>
          <p className="text-sm font-bold text-brand-plum-800 leading-snug">
            Based on your eating habits, I've compiled a quick top-up list before the weekend.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {recommendations.map(rec => (
            <div key={rec.id} className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 hover:border-border-strong transition-all">
              <div className="flex gap-3 mb-2 items-start">
                <span className="text-3xl">{rec.emoji}</span>
                <div className="flex-1">
                  <p className="font-extrabold text-text-primary text-base">{rec.name}</p>
                  <p className="text-sm font-bold text-text-primary mt-1">{rec.price}</p>
                </div>
                <Button size="sm">Add</Button>
              </div>
              <div className="bg-bg-sunken rounded-xl p-3 mt-3 space-y-2">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="font-bold text-text-primary">Why: </span>{rec.reason}
                </p>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${rec.color} flex items-center gap-1`}>
                  {rec.color.includes('sky') ? <Target className="w-3 h-3" /> : rec.color.includes('success') ? <Leaf className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                  {rec.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button size="lg" fullWidth icon={<ShoppingBag className="w-5 h-5" />} onClick={() => navigate('/shopping/list')}>
            Review Full List
          </Button>
        </div>
      </div>
    </div>
  );
}
