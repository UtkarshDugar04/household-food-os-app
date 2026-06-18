import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Utensils, ChevronRight, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import Button from '../../components/core/Button';
import AICard from '../../components/core/AICard';
import { pantryItems, recipes } from '../../data/mockData';

const grouped = {
  critical: pantryItems.filter(i => i.expiryDays <= 1 && i.expiryDays >= 0),
  soon: pantryItems.filter(i => i.expiryDays >= 2 && i.expiryDays <= 3),
  thisWeek: pantryItems.filter(i => i.expiryDays >= 4 && i.expiryDays <= 7),
};

export default function ExpiryCenter() {
  const navigate = useNavigate();

  const Section = ({ title, items, variant }: { title: string; items: typeof pantryItems; variant: 'critical' | 'expiring' | 'warning' }) => (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className={`w-4 h-4 ${variant === 'critical' ? 'text-error' : variant === 'expiring' ? 'text-warning' : 'text-info'}`} />
        <p className="text-sm font-extrabold text-text-primary">{title}</p>
        <Badge variant={variant} size="xs">{items.length}</Badge>
      </div>
      <div className="flex flex-col gap-2">
        {items.map(item => {
          const recipesFor = recipes.filter(r => r.ingredients.some(ing => ing.pantryItem === item.id));
          return (
            <div key={item.id} className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-text-primary text-sm">{item.name}</p>
                  <p className="text-xs text-text-tertiary">{item.quantity} {item.unit}</p>
                </div>
                <Badge variant={variant} size="xs">
                  {item.expiryDays === 0 ? 'Today' : item.expiryDays === 1 ? 'Tomorrow' : `${item.expiryDays} days`}
                </Badge>
              </div>
              {recipesFor.length > 0 && (
                <div className="border-t border-border-subtle px-4 py-2.5 bg-bg-sunken flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-brand" />
                  <button
                    onClick={() => navigate('/recipe', { state: { recipe: recipesFor[0] } })}
                    className="text-xs text-brand font-bold hover:underline"
                  >
                    Use in {recipesFor[0].name} →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader
        title="Expiry Center"
        subtitle={`${grouped.critical.length + grouped.soon.length + grouped.thisWeek.length} items need attention`}
        backRoute="/home"
      />

      <div className="px-5 pb-6">
        <AICard title="AI Waste Prevention" className="mb-5">
          Acting on these {grouped.critical.length + grouped.soon.length} urgent items tonight can prevent{' '}
          <strong className="text-brand-plum-800">~650g of food waste</strong> and save approximately{' '}
          <strong className="text-brand-plum-800">₹210</strong>.
        </AICard>

        {grouped.critical.length > 0 && <Section title="Expires Today or Tomorrow" items={grouped.critical} variant="critical" />}
        {grouped.soon.length > 0 && <Section title="Expires in 2-3 Days" items={grouped.soon} variant="expiring" />}
        {grouped.thisWeek.length > 0 && <Section title="Expires This Week" items={grouped.thisWeek} variant="warning" />}

        <Button fullWidth size="lg" onClick={() => navigate('/recommendations/generate')}>
          Generate Waste-Prevention Meal Plan
        </Button>
      </div>
    </div>
  );
}
