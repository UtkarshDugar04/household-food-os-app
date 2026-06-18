import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertTriangle, CalendarDays, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Card from '../../components/core/Card';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import { pantryItems, recipes } from '../../data/mockData';

export default function ExpiryTimeline() {
  const navigate = useNavigate();

  // Sort and group by expiry days
  const items = [...pantryItems].sort((a, b) => a.expiryDays - b.expiryDays).filter(i => i.expiryDays >= 0 && i.expiryDays <= 14);

  const critical = items.filter(i => i.expiryDays <= 1);
  const thisWeek = items.filter(i => i.expiryDays >= 2 && i.expiryDays <= 7);
  const nextWeek = items.filter(i => i.expiryDays >= 8 && i.expiryDays <= 14);

  const renderSection = (title: string, data: typeof pantryItems, icon: React.ElementType, variant: 'critical' | 'warning' | 'neutral') => {
    if (data.length === 0) return null;
    
    return (
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-full border-2 border-bg-base flex items-center justify-center ${
            variant === 'critical' ? 'bg-error-bg text-error' : variant === 'warning' ? 'bg-warning-bg text-warning' : 'bg-bg-sunken text-text-secondary'
          }`}>
            {React.createElement(icon, { className: 'w-4 h-4' })}
          </div>
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <Badge variant={variant} size="xs">{data.length}</Badge>
        </div>
        
        <div className="pl-11 space-y-3">
          {data.map((item) => {
            const recipesUsingItem = recipes.filter(r => r.ingredients.some(ing => ing.pantryItem === item.id));
            return (
              <Card key={item.id} padding="md" className={variant === 'critical' ? 'border-error/30 bg-error-bg/30' : ''}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">{item.name}</h3>
                      <p className={`text-xs font-medium ${variant === 'critical' ? 'text-error' : variant === 'warning' ? 'text-warning' : 'text-text-secondary'}`}>
                        {item.expiryDays === 0 ? 'Expires Today' : item.expiryDays === 1 ? 'Expires Tomorrow' : `Expires in ${item.expiryDays} days`}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-text-secondary">{item.quantity} {item.unit}</span>
                </div>
                {recipesUsingItem.length > 0 && variant === 'critical' && (
                  <Button size="sm" fullWidth className="bg-white dark:bg-bg-elevated text-text-primary border border-border-subtle hover:bg-bg-sunken flex justify-between items-center" onClick={() => navigate('/recipe', { state: { recipe: recipesUsingItem[0] } })}>
                    See Recipes using {item.name} <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Expiry Timeline" subtitle="Keep track of freshness" backRoute="/pantry" />

      <div className="px-6 pb-20 relative pt-4">
        {/* Timeline Line */}
        <div className="absolute left-10 top-8 bottom-0 w-0.5 bg-border-subtle z-0"></div>

        {renderSection('Action Required (1-2 Days)', critical, AlertTriangle, 'critical')}
        {renderSection('Later this week (3-7 Days)', thisWeek, CalendarDays, 'warning')}
        {renderSection('Next week (8-14 Days)', nextWeek, CalendarDays, 'neutral')}
        
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-bold text-text-primary">Nothing expiring soon!</p>
            <p className="text-sm text-text-secondary mt-1">Your pantry is looking healthy.</p>
          </div>
        )}
      </div>
    </div>
  );
}
