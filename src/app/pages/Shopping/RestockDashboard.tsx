import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, TrendingUp, ChevronRight, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import Button from '../../components/core/Button';
import AICard from '../../components/core/AICard';
import { shoppingList } from '../../data/mockData';

const highUrgency = shoppingList.filter(i => i.urgency === 'high');
const medUrgency = shoppingList.filter(i => i.urgency === 'medium');
const lowUrgency = shoppingList.filter(i => i.urgency === 'low');

export default function RestockDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <div className="px-5 pt-6 pb-4">
        <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-0.5">Smart</p>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Shopping</h1>
        <p className="text-sm text-text-secondary mt-0.5">AI-Predicted Needs</p>
      </div>

      <div className="px-5 pb-6 flex flex-col gap-5">
        {/* Restock Score */}
        <div className="bg-gradient-to-br from-brand-sky-50 to-brand-sky-100 border border-brand-sky-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-sky-500 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-sky-500 uppercase tracking-widest">Restock Health</p>
              <p className="text-3xl font-extrabold text-brand-sky-700">74%</p>
            </div>
          </div>
          <p className="text-sm text-brand-sky-600">
            3 items running low for this week's meal plan. 
            Restocking now prevents 2 recipe gaps.
          </p>
          <div className="w-full h-2 bg-brand-sky-200 rounded-md mt-3 overflow-hidden">
            <div className="h-full bg-brand-sky-500 rounded-md" style={{ width: '74%' }} />
          </div>
        </div>

        {/* AI Insight */}
        <AICard title="Shopping Intelligence">
          Based on your planned meals and current inventory, I predict you'll run out of{' '}
          <strong className="text-brand-plum-800">Milk in 3 days</strong> and{' '}
          <strong className="text-brand-plum-800">Olive Oil in 2 days</strong>.
          Total weekly grocery estimate: <strong className="text-brand-plum-800">₹1,240</strong>.
        </AICard>

        {/* Urgency tiers */}
        {[
          { label: 'Buy Today', items: highUrgency, variant: 'critical' as const, color: 'text-error', bg: 'bg-error-bg border-error/20' },
          { label: 'Buy This Week', items: medUrgency, variant: 'expiring' as const, color: 'text-warning', bg: 'bg-warning-bg border-warning/20' },
          { label: 'Stock Up Soon', items: lowUrgency, variant: 'neutral' as const, color: 'text-text-secondary', bg: 'bg-bg-sunken border-border-subtle' },
        ].map(tier => (
          <div key={tier.label}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`w-4 h-4 ${tier.color}`} />
              <p className="text-sm font-extrabold text-text-primary">{tier.label}</p>
              <Badge variant={tier.variant} size="xs">{tier.items.length}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              {tier.items.map(item => (
                <div key={item.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${tier.bg}`}>
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-text-primary text-sm">{item.name}</p>
                    <p className="text-xs text-text-tertiary">{item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-text-primary">₹{item.estimatedPrice}</p>
                    <p className="text-[10px] text-text-tertiary">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTAs */}
        <Button size="lg" fullWidth icon={<ShoppingBag className="w-5 h-5" />} onClick={() => navigate('/shopping/list')}>
          View Full Shopping List (14 items)
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate('/shopping/compare')}>
          Compare Store Prices
        </Button>
      </div>
    </div>
  );
}
