import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, Clock, Target, Users, ChevronLeft, Sparkles, Bookmark, Share2, Star } from 'lucide-react';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import AICard from '../../components/core/AICard';
import ProgressBar from '../../components/core/ProgressBar';
import { recipes } from '../../data/mockData';

export default function RecipeDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state?.recipe || recipes[0];
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      {/* Hero */}
      <div className={`h-56 bg-gradient-to-br ${recipe.bgGradient} relative`}>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-12 right-4 w-9 h-9 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-90 transition-all duration-fast ease-spring"
        >
          <Bookmark key={String(saved)} className={`w-5 h-5 ${saved ? 'text-white fill-white success-pop' : 'text-white'}`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl scale-in" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' }}>
            {recipe.emoji}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge variant="brand" size="sm">
            <Sparkles className="w-3 h-3" />{recipe.matchScore}% Match
          </Badge>
          <Badge variant={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Medium' ? 'warning' : 'critical'}>
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="text-white font-bold text-sm">4.8</span>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5 pb-8">
        {/* Title & Meta */}
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary mb-1">{recipe.name}</h1>
          <p className="text-sm text-text-secondary leading-relaxed">{recipe.description}</p>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Clock, val: `${recipe.prepTime + recipe.cookTime}m`, label: 'Total' },
            { icon: Target, val: `${recipe.nutrition.protein}g`, label: 'Protein' },
            { icon: Users, val: `${recipe.servings}`, label: 'Servings' },
            { icon: Star, val: '4.8', label: 'Rating' },
          ].map((s, i) => (
            <div key={i} className="bg-bg-elevated border border-border-subtle rounded-2xl p-2.5 text-center">
              <s.icon className="w-4 h-4 text-text-tertiary mx-auto mb-1" />
              <p className="text-sm font-extrabold text-text-primary">{s.val}</p>
              <p className="text-[10px] text-text-tertiary">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Nutrition Breakdown */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">Nutrition Per Serving</p>
          <div className="space-y-3">
            {[
              { label: 'Protein', val: recipe.nutrition.protein, max: 50, unit: 'g', color: 'brand' as const },
              { label: 'Calories', val: recipe.nutrition.calories, max: 600, unit: 'kcal', color: 'sage' as const },
              { label: 'Carbs', val: recipe.nutrition.carbs, max: 100, unit: 'g', color: 'sky' as const },
              { label: 'Fat', val: recipe.nutrition.fat, max: 50, unit: 'g', color: 'warning' as const },
            ].map(n => (
              <div key={n.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-text-secondary">{n.label}</span>
                  <span className="text-xs font-bold text-text-primary">{n.val}{n.unit}</span>
                </div>
                <ProgressBar value={n.val} max={n.max} color={n.color} size="xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="font-extrabold text-text-primary mb-3">
            Ingredients
            <span className="ml-2 text-xs font-bold text-success">
              {recipe.ingredients.filter((i: any) => i.available).length}/{recipe.ingredients.length} in pantry
            </span>
          </h3>
          <div className="flex flex-col gap-2">
            {recipe.ingredients.map((ing: any, i: number) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border page-enter ${
                ing.available ? 'bg-success-bg border-success/15' : 'bg-error-bg border-error/15'
              }`} style={{ animationDelay: `${i * 35}ms` }}>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ing.available ? 'bg-success' : 'bg-error'}`} />
                <span className="flex-1 text-sm font-semibold text-text-primary">{ing.name}</span>
                <span className="text-xs text-text-tertiary">{ing.quantity}</span>
                {!ing.available && (
                  <button onClick={() => navigate('/shopping/list')} className="text-[10px] font-bold text-error hover:underline">
                    Buy
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Preview */}
        <div>
          <h3 className="font-extrabold text-text-primary mb-3">
            Steps ({recipe.steps.length})
          </h3>
          <div className="flex flex-col gap-2">
            {recipe.steps.slice(0, 3).map((step: any) => (
              <div key={step.step} className="flex gap-3 bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3">
                <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.step}
                </span>
                <p className="text-sm text-text-primary font-medium leading-relaxed flex-1">{step.instruction}</p>
                {step.duration && (
                  <span className="text-[10px] text-text-tertiary font-semibold whitespace-nowrap mt-0.5">{step.duration}m</span>
                )}
              </div>
            ))}
            {recipe.steps.length > 3 && (
              <button onClick={() => navigate('/recipe/cook')} className="text-xs font-bold text-brand text-center py-2 hover:underline">
                +{recipe.steps.length - 3} more steps — Start Cooking to see all
              </button>
            )}
          </div>
        </div>

        {/* AI Reason */}
        <AICard title="Why This Recipe?">
          {recipe.aiReason}
        </AICard>

        {/* CTAs */}
        <Button size="lg" fullWidth icon={<Play className="w-5 h-5" />} onClick={() => navigate('/recipe/cook')}>
          Start Step-by-Step Cooking
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate('/recipe/feedback')}>
          Already Made It? Give Feedback
        </Button>
      </div>
    </div>
  );
}
