import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Leaf, DollarSign, Target, ChevronRight, Play, Sparkles } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import Button from '../../components/core/Button';
import AICard from '../../components/core/AICard';
import { recipes } from '../../data/mockData';

const todayRecipe = recipes[0];

export default function TodayRecommendationDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader title="Tonight's Pick" subtitle="AI Recommendation" backRoute="/home" />

      {/* Hero */}
      <div className={`mx-5 rounded-3xl overflow-hidden bg-gradient-to-br ${todayRecipe.bgGradient} h-52 flex items-center justify-center relative mb-5`}>
        <span className="text-8xl" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}>
          {todayRecipe.emoji}
        </span>
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <Badge variant="brand"><Sparkles className="w-3 h-3" />{todayRecipe.matchScore}% Match</Badge>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap">
          {todayRecipe.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-black/30 backdrop-blur-sm text-white rounded-pill text-[10px] font-bold">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 flex flex-col gap-4 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary">{todayRecipe.name}</h1>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">{todayRecipe.description}</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Clock, label: `${todayRecipe.prepTime + todayRecipe.cookTime}m`, sub: 'Total Time', color: 'text-text-tertiary' },
            { icon: Target, label: `${todayRecipe.nutrition.protein}g`, sub: 'Protein', color: 'text-brand-sky-500' },
            { icon: Leaf, label: `${todayRecipe.wastePreventionGrams}g`, sub: 'Waste saved', color: 'text-success' },
            { icon: DollarSign, label: `₹${todayRecipe.savingsRupees}`, sub: 'Saved', color: 'text-success' },
          ].map((s, i) => (
            <div key={i} className="bg-bg-elevated border border-border-subtle rounded-2xl p-2.5 text-center">
              <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
              <p className="text-sm font-extrabold text-text-primary">{s.label}</p>
              <p className="text-[10px] text-text-tertiary font-medium">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Nutrition */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">Nutrition per Serving</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Calories', val: todayRecipe.nutrition.calories },
              { label: 'Protein', val: `${todayRecipe.nutrition.protein}g` },
              { label: 'Carbs', val: `${todayRecipe.nutrition.carbs}g` },
              { label: 'Fat', val: `${todayRecipe.nutrition.fat}g` },
            ].map(n => (
              <div key={n.label}>
                <p className="text-base font-extrabold text-text-primary">{n.val}</p>
                <p className="text-[10px] text-text-tertiary">{n.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="font-bold text-text-primary mb-3">Ingredients ({todayRecipe.servings} servings)</h3>
          <div className="flex flex-col gap-2">
            {todayRecipe.ingredients.map((ing, i) => (
              <div key={i} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border ${ing.available ? 'bg-success-bg border-success/20' : 'bg-error-bg border-error/20'}`}>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ing.available ? 'bg-success' : 'bg-error'}`} />
                <span className="flex-1 text-sm font-semibold text-text-primary">{ing.name}</span>
                <span className="text-xs text-text-tertiary font-medium">{ing.quantity}</span>
                {!ing.available && (
                  <span className="text-[10px] font-bold text-error">Need to buy</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Reason */}
        <AICard title="Why This Recipe?">
          {todayRecipe.aiReason}
        </AICard>

        {/* CTA */}
        <Button size="lg" fullWidth icon={<Play className="w-4 h-4" />} onClick={() => navigate('/recipe/cook')}>
          Start Cooking
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate('/recommendations/stack')}>
          See Other Options
        </Button>
      </div>
    </div>
  );
}
