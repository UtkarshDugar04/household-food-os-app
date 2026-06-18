import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronLeft, Plus, Sparkles, X } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import { recipes } from '../../data/mockData';

export default function EditMeal() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = recipes.filter(r => search === '' || r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-bg-base border-b border-border-subtle sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-bg-sunken transition-colors">
          <ChevronLeft className="w-6 h-6 text-text-primary" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-text-primary">Swap Meal</h1>
          <p className="text-xs text-text-tertiary">Tuesday Dinner</p>
        </div>
      </div>

      <div className="px-5 pb-6">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full bg-bg-sunken border border-border-subtle rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-muted transition-colors"
          />
        </div>

        <div className="mb-6">
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand" /> Smart Alternatives
          </p>
          <div className="flex flex-col gap-3">
            {filtered.slice(0, 3).map(recipe => (
              <button
                key={recipe.id}
                onClick={() => navigate('/planner/day')}
                className="flex items-center gap-3.5 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 hover:border-brand-muted hover:shadow-sm active:scale-[0.99] transition-all text-left relative overflow-hidden"
              >
                {'matchScore' in recipe && (recipe as any).matchScore > 90 && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-brand rounded-bl-2xl flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-3xl">{recipe.emoji}</span>
                <div className="flex-1 min-w-0 pr-6">
                  <p className="font-bold text-text-primary text-sm truncate">{recipe.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{recipe.nutrition.calories} kcal · {recipe.nutrition.protein}g protein</p>
                </div>
                <Plus className="w-5 h-5 text-text-tertiary" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Saved Recipes</p>
          <div className="flex flex-col gap-3">
            {filtered.slice(3).map(recipe => (
              <button
                key={recipe.id}
                onClick={() => navigate('/planner/day')}
                className="flex items-center gap-3.5 bg-bg-base border border-border-subtle rounded-2xl px-4 py-3 hover:border-border-strong active:scale-[0.99] transition-all text-left"
              >
                <span className="text-2xl">{recipe.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-sm truncate">{recipe.name}</p>
                </div>
                <Plus className="w-5 h-5 text-text-tertiary" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
