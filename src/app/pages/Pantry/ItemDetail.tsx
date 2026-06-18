import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, MapPin, Tag, TrendingUp, ChevronRight, Utensils } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import Button from '../../components/core/Button';
import AICard from '../../components/core/AICard';
import Card from '../../components/core/Card';
import { pantryItems, recipes } from '../../data/mockData';

export default function ItemDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item || pantryItems[0];
  const [saved, setSaved] = useState(false);
  const recipesUsingItem = recipes.filter(r => r.ingredients.some(ing => ing.pantryItem === item.id));
  const getExpiryVariant = (days: number) => days <= 1 ? 'critical' : days <= 3 ? 'expiring' : days <= 7 ? 'warning' : 'fresh';

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader 
        title={item.name} 
        subtitle={`${item.category} · ${item.location}`} 
        backRoute="/pantry" 
        rightElement={
          <button onClick={() => setSaved(!saved)} className="w-9 h-9 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:bg-bg-elevated hover:text-brand transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={saved ? 'text-brand' : ''}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          </button>
        }
      />

      <div className="px-5 flex flex-col gap-4 pb-6">
        {/* Hero card */}
        <Card padding="md" className="flex items-center gap-4">
          <span className="text-5xl">{item.emoji}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-extrabold text-text-primary">{item.name}</h2>
            </div>
            <p className="text-sm text-text-secondary mb-2">{item.category}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getExpiryVariant(item.expiryDays)} dot>
                {item.expiryDays <= 1 ? 'Expires tomorrow!' : `Expires ${item.expiryDate}`}
              </Badge>
              <Badge variant={item.confidence === 'high' ? 'success' : item.confidence === 'medium' ? 'warning' : 'neutral'} size="xs">
                {item.confidence} confidence
              </Badge>
            </div>
          </div>
        </Card>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-3 text-center">
            <p className="text-xs text-text-tertiary font-semibold mb-1">Quantity</p>
            <p className="text-lg font-extrabold text-text-primary">{item.quantity}</p>
            <p className="text-xs text-text-tertiary">{item.unit}</p>
          </div>
          <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-3 text-center">
            <p className="text-xs text-text-tertiary font-semibold mb-1">Added</p>
            <p className="text-sm font-extrabold text-text-primary">{item.addedDate}</p>
          </div>
          <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-3 text-center">
            <MapPin className="w-4 h-4 text-text-tertiary mx-auto mb-1" />
            <p className="text-sm font-extrabold text-text-primary capitalize">{item.location}</p>
          </div>
        </div>

        {/* Nutrition per 100g */}
        {item.nutritionPer100g && (
          <Card padding="md">
            <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-text-tertiary" />
              Nutrition per 100g
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: 'Cal', value: item.nutritionPer100g.calories },
                { label: 'Protein', value: `${item.nutritionPer100g.protein}g` },
                { label: 'Carbs', value: `${item.nutritionPer100g.carbs}g` },
                { label: 'Fat', value: `${item.nutritionPer100g.fat}g` },
                { label: 'Fiber', value: `${item.nutritionPer100g.fiber}g` },
              ].map(n => (
                <div key={n.label} className="text-center">
                  <p className="text-sm font-extrabold text-text-primary">{n.value}</p>
                  <p className="text-[10px] text-text-tertiary font-semibold">{n.label}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* AI Insight */}
        {item.expiryDays <= 3 && (
          <AICard title="AI Recommendation">
            <strong className="text-brand-plum-800">{item.name}</strong> should be used{' '}
            {item.expiryDays <= 1 ? 'today or tomorrow' : `within ${item.expiryDays} days`} to prevent waste.
            {recipesUsingItem.length > 0 && ` It's in ${recipesUsingItem.length} recipe${recipesUsingItem.length > 1 ? 's' : ''} in your pantry.`}
          </AICard>
        )}

        {/* Recipes using this item */}
        {recipesUsingItem.length > 0 && (
          <div>
            <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-text-tertiary" />
              Recipes Using This
            </h3>
            <div className="flex flex-col gap-2">
              {recipesUsingItem.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => navigate('/recipe', { state: { recipe } })}
                  className="flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-2xl px-3.5 py-2.5 hover:shadow-sm active:scale-[0.99] transition-all text-left"
                >
                  <span className="text-xl">{recipe.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-text-primary text-sm">{recipe.name}</p>
                    <p className="text-xs text-text-tertiary">{recipe.prepTime + recipe.cookTime} min · {recipe.nutrition.protein}g protein</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-tertiary" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-2">
          <Button fullWidth onClick={() => navigate('/home/recommendation')}>Cook Recipe Now</Button>
          <Button variant="outline" fullWidth>Edit Item Details</Button>
          <Button variant="danger" fullWidth>Remove from Pantry</Button>
        </div>
      </div>
    </div>
  );
}
