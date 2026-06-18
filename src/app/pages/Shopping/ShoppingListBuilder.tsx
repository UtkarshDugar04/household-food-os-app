import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, AlertTriangle, TrendingUp, ChevronRight, Zap, Check } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import Button from '../../components/core/Button';
import AICard from '../../components/core/AICard';
import { shoppingList } from '../../data/mockData';

export default function ShoppingListBuilder() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };

  const categories = [...new Set(shoppingList.map(i => i.category))];
  const totalEstimate = shoppingList.reduce((sum, i) => sum + i.estimatedPrice, 0);
  const checkedTotal = shoppingList.filter(i => checked.has(i.id)).reduce((sum, i) => sum + i.estimatedPrice, 0);

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader
        title="Shopping List"
        subtitle={`${shoppingList.length} items · est. ₹${totalEstimate}`}
        backRoute="/shopping/restock"
        rightElement={
          <button onClick={() => navigate('/shopping/compare')} className="text-xs font-bold text-brand hover:underline">
            Compare Stores
          </button>
        }
      />

      <div className="px-5 pb-6 flex flex-col gap-5">
        {/* Progress */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-bold text-text-secondary">{checked.size} of {shoppingList.length} checked</span>
              <span className="text-xs font-bold text-brand">₹{checkedTotal} / ₹{totalEstimate}</span>
            </div>
            <div className="w-full h-2 bg-bg-sunken rounded-md overflow-hidden">
              <div className="h-full bg-brand rounded-md transition-all duration-slow" style={{ width: `${(checked.size / shoppingList.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <AICard title="Smart Shopping">
          Zepto has the best price for 9 of your 14 items today. 
          Total estimated savings vs BigBasket: <strong className="text-brand-plum-800">₹186</strong>.
        </AICard>

        {/* List by category */}
        {categories.map(cat => {
          const items = shoppingList.filter(i => i.category === cat);
          return (
            <div key={cat} className="page-enter" style={{ animationDelay: `${categories.indexOf(cat) * 60}ms` }}>
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2.5">{cat}</p>
              <div className="flex flex-col gap-2">
                {items.map(item => {
                  const isChecked = checked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 border transition-all active:scale-[0.99] text-left ${
                        isChecked
                          ? 'bg-success-bg border-success/20 opacity-60'
                          : 'bg-bg-elevated border-border-subtle hover:border-border-strong hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isChecked ? 'bg-success border-success' : 'border-border-strong'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-lg">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm ${isChecked ? 'line-through text-text-tertiary' : 'text-text-primary'}`}>{item.name}</p>
                        <p className="text-xs text-text-tertiary">{item.quantity}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <span className="text-sm font-extrabold text-text-primary">₹{item.estimatedPrice}</span>
                        <Badge
                          variant={item.urgency === 'high' ? 'critical' : item.urgency === 'medium' ? 'expiring' : 'neutral'}
                          size="xs"
                        >
                          {item.urgency}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Button size="lg" fullWidth icon={<ShoppingCart className="w-5 h-5" />} onClick={() => navigate('/shopping/complete')}>
          Mark Shopping Done
        </Button>
      </div>
    </div>
  );
}
