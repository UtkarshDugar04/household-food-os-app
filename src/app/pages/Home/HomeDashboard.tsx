import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, HeartPulse, Target, TrendingDown, Clock, Leaf, 
  DollarSign, ChevronRight, Play, AlertTriangle, ShoppingBag,
  Sparkles, Zap, Users
} from 'lucide-react';
import Card from '../../components/core/Card';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import { householdSnapshot, pantryItems, recipes, notifications } from '../../data/mockData';

const expiringItems = pantryItems.filter(i => i.expiryDays <= 2 && i.expiryDays >= 0);
const criticalItems = pantryItems.filter(i => i.expiryDays <= 1 && i.expiryDays >= 0);
const todayRecipe = recipes[0];
const altRecipes = recipes.slice(1, 4);
const unreadCount = notifications.filter(n => !n.read).length;

export default function HomeDashboard() {
  const navigate = useNavigate();
  const [cookLoading, setCookLoading] = useState(false);

  const handleCook = () => {
    setCookLoading(true);
    setTimeout(() => navigate('/recipe'), 600);
  };

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      {/* ---- HEADER ---- */}
      <div className="px-5 pt-6 pb-4 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-1">Wednesday, Jun 18</p>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight leading-tight">
            Good afternoon,<br />Utkarsh.
          </h1>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => navigate('/notifications')}
            className="relative w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:text-brand hover:bg-brand-light transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-bg-base animate-pulse" />
            )}
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="font-extrabold text-text-primary text-sm">UD</span>
          </button>
        </div>
      </div>

      {/* ---- DAILY BRIEFING (Humanized Insights) ---- */}
      <div className="px-5 mb-8 mt-2">
        <button
          onClick={() => navigate('/home/insights')}
          className="w-full text-left illustration-container rounded-[24px] p-5 flex flex-col gap-4 hover:-translate-y-0.5 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/60 shadow-sm flex items-center justify-center flex-shrink-0 border border-border-subtle z-10">
              <span className="text-2xl food-glow">🥗</span>
            </div>
            <div className="flex-1 z-10">
              <p className="text-sm font-bold text-text-primary leading-snug">
                Your household is looking healthy today.
              </p>
              <p className="text-xs text-text-secondary mt-1">
                You're just <strong className="text-text-primary">{householdSnapshot.proteinGoal - householdSnapshot.proteinToday}g</strong> away from your daily protein goal.
              </p>
            </div>
          </div>
          <div className="relative h-1.5 w-full bg-black/5 rounded-md overflow-hidden z-10">
             <div className="absolute top-0 left-0 h-full bg-brand rounded-md transition-all duration-1000" style={{ width: `${(householdSnapshot.proteinToday / householdSnapshot.proteinGoal) * 100}%` }} />
          </div>
          <div className="absolute right-0 bottom-0 opacity-[0.03] text-9xl translate-x-1/4 translate-y-1/4 pointer-events-none">🥗</div>
        </button>
      </div>

      {/* ---- EXPIRY ALERT BANNER (if critical items) ---- */}
      {criticalItems.length > 0 && (
        <div className="mx-5 mb-5">
          <button
            onClick={() => navigate('/home/expiry-center')}
            className="w-full bg-error-bg border border-error/20 rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-error/10 transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-error" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-error">
                {criticalItems.length} item{criticalItems.length > 1 ? 's' : ''} expire{criticalItems.length === 1 ? 's' : ''} tomorrow
              </p>
              <p className="text-xs text-error/70 font-medium">
                {criticalItems.map(i => i.name).join(' · ')}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-error/60 flex-shrink-0" />
          </button>
        </div>
      )}

      {/* ---- TONIGHT'S RECOMMENDATION ---- */}
      <div className="px-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-extrabold text-text-primary">Tonight's Recommendation</h2>
          <button
            onClick={() => navigate('/recommendations/stack')}
            className="text-xs font-bold text-brand flex items-center gap-0.5 hover:underline"
          >
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <Card
          interactive
          padding="none"
          onClick={() => navigate('/home/recommendation')}
          className="overflow-hidden border-border-subtle shadow-sm rounded-[24px]"
        >
          {/* Hero area */}
          <div className="h-44 illustration-container relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 to-transparent z-0" />
            <span className="text-8xl z-10 food-glow transition-transform hover:scale-105 duration-500">
              {todayRecipe.emoji}
            </span>
            {/* Match score badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="neutral" size="sm" className="bg-white/80 backdrop-blur-md shadow-sm border border-white/40 text-text-primary">
                <Sparkles className="w-3 h-3 text-brand" />
                {todayRecipe.matchScore}% Match
              </Badge>
            </div>
            {/* Tags */}
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap z-10">
              {todayRecipe.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/80 backdrop-blur-md border border-white/40 text-text-primary rounded-full text-[10px] font-bold shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-extrabold text-text-primary mb-0.5">{todayRecipe.name}</h3>
            <p className="text-sm text-text-secondary mb-3">{todayRecipe.description}</p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                <span className="font-semibold">{todayRecipe.prepTime + todayRecipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Target className="w-4 h-4 text-brand-sky-400 flex-shrink-0" />
                <span className="font-semibold">{todayRecipe.nutrition.protein}g Protein</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Leaf className="w-4 h-4 text-success flex-shrink-0" />
                <span className="font-semibold">Prevents {todayRecipe.wastePreventionGrams}g waste</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <DollarSign className="w-4 h-4 text-success flex-shrink-0" />
                <span className="font-semibold">Saves ₹{todayRecipe.savingsRupees}</span>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="flex items-start gap-2 bg-bg-sunken rounded-lg px-3 py-2.5 mb-5 border border-border-subtle">
              <Sparkles className="w-3.5 h-3.5 text-text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-text-secondary font-medium leading-relaxed">{todayRecipe.aiReason}</p>
            </div>

            <Button
              fullWidth
              size="lg"
              icon={<Play className="w-4 h-4" />}
              onClick={(e) => { e.stopPropagation(); handleCook(); }}
              className={cookLoading ? 'opacity-75' : ''}
            >
              {cookLoading ? 'Loading...' : 'Cook This Now'}
            </Button>
          </div>
        </Card>
      </div>

      {/* ---- ALTERNATIVES ---- */}
      <div className="px-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-extrabold text-text-primary">Alternatives</h2>
          <button
            onClick={() => navigate('/recommendations/stack')}
            className="text-xs font-bold text-brand flex items-center gap-0.5 hover:underline"
          >
            More <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 snap-x">
          {altRecipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => navigate('/recipe')}
              className="min-w-[155px] snap-center flex-shrink-0 bg-bg-elevated border border-border-subtle rounded-xl overflow-hidden hover:shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all text-left"
            >
              <div className={`h-20 bg-bg-sunken border-b border-border-subtle flex items-center justify-center`}>
                <span className="text-4xl drop-shadow-sm">{recipe.emoji}</span>
              </div>
              <div className="p-3">
                <p className="font-bold text-text-primary text-sm truncate">{recipe.name}</p>
                <p className="text-[10px] text-text-tertiary mt-1">{recipe.prepTime + recipe.cookTime} min · {recipe.nutrition.protein}g prot</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ---- QUICK ACTIONS ---- */}
      <div className="px-5 mb-6">
        <h2 className="text-base font-extrabold text-text-primary mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/home/expiry-center')}
            className="flex items-center gap-3 p-4 bg-bg-elevated border border-border-subtle rounded-2xl hover:shadow-sm active:scale-95 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-border-subtle">
              <span className="text-lg">⚠️</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">{expiringItems.length} Expiring</p>
              <p className="text-[10px] text-text-tertiary">This week</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/shopping/list')}
            className="flex items-center gap-3 p-4 bg-bg-elevated border border-border-subtle rounded-2xl hover:shadow-sm active:scale-95 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-border-subtle">
              <span className="text-lg">🛒</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">14 Items</p>
              <p className="text-[10px] text-text-tertiary">Shopping list</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/planner')}
            className="flex items-center gap-3 p-4 bg-bg-elevated border border-border-subtle rounded-2xl hover:shadow-sm active:scale-95 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-border-subtle">
              <span className="text-lg">📅</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">7 Days</p>
              <p className="text-[10px] text-text-tertiary">Meals planned</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/community')}
            className="flex items-center gap-3 p-4 bg-bg-elevated border border-border-subtle rounded-2xl hover:shadow-sm active:scale-95 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-border-subtle">
              <span className="text-lg">🏘️</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">8 Nearby</p>
              <p className="text-[10px] text-text-tertiary">Food listings</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
