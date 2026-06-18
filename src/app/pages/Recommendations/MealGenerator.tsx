import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, Flame, Target, Utensils } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function MealGenerator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    time: 'Under 30 mins',
    goal: 'High Protein',
    type: 'Dinner',
  });

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/recommendations/stack');
    }, 2500);
  };

  const options = {
    time: ['Under 15 mins', 'Under 30 mins', 'Under 1 hour', 'Any Time'],
    goal: ['High Protein', 'Low Calorie', 'Use Expiring Items', 'Comfort Food'],
    type: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-base px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-zest-400 to-brand-coral-500 flex items-center justify-center mb-6 shadow-xl animate-pulse relative">
          <div className="absolute inset-0 border-4 border-brand-coral-200 rounded-full border-t-transparent animate-spin" />
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-2">Generating Meals...</h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-[280px]">
          Analyzing 58 pantry items, checking expiry dates, and matching your 120g protein goal.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Meal Generator" subtitle="AI Recipe Discovery" backRoute="/home" />

      <div className="px-5 pb-8 pt-4 flex-1 flex flex-col">
        <div className="bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-4 flex gap-3 items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-brand-plum-100 flex items-center justify-center flex-shrink-0">
            <Utensils className="w-4 h-4 text-brand-plum-600" />
          </div>
          <p className="text-sm font-bold text-brand-plum-800 leading-snug">
            AI will prioritize recipes that use your 3 items expiring soon.
          </p>
        </div>

        <div className="flex flex-col gap-6 flex-1">
          {/* Meal Type */}
          <div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Meal Type</p>
            <div className="flex flex-wrap gap-2">
              {options.type.map(opt => (
                <button
                  key={opt}
                  onClick={() => setPreferences({ ...preferences, type: opt })}
                  className={`px-4 py-2.5 rounded-pill font-bold transition-all text-sm ${
                    preferences.type === opt
                      ? 'bg-brand text-white shadow-sm'
                      : 'bg-bg-elevated text-text-secondary border border-border-subtle hover:border-border-strong'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1">
              <Target className="w-3 h-3" /> Optimization Goal
            </p>
            <div className="grid grid-cols-2 gap-2">
              {options.goal.map(opt => (
                <button
                  key={opt}
                  onClick={() => setPreferences({ ...preferences, goal: opt })}
                  className={`px-3 py-3 rounded-xl font-semibold transition-all text-sm text-center border ${
                    preferences.goal === opt
                      ? 'bg-brand-sky-50 border-brand-sky-300 text-brand-sky-700'
                      : 'bg-bg-elevated border-border-subtle text-text-secondary hover:border-border-strong'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Cooking Time</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {options.time.map(opt => (
                <button
                  key={opt}
                  onClick={() => setPreferences({ ...preferences, time: opt })}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${
                    preferences.time === opt
                      ? 'bg-text-primary text-bg-base'
                      : 'bg-bg-elevated text-text-secondary border border-border-subtle hover:border-border-strong'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button size="lg" fullWidth icon={<Sparkles className="w-5 h-5" />} onClick={handleGenerate}>
            Generate Recipes
          </Button>
        </div>
      </div>
    </div>
  );
}
