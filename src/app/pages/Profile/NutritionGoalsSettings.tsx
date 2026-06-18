import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Zap, TrendingUp, Info } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function NutritionGoalsSettings() {
  const navigate = useNavigate();
  const [protein, setProtein] = useState(120);
  const [calories, setCalories] = useState(2400);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Nutrition Goals" subtitle="Daily Targets" backRoute="/profile" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        <div className="bg-brand-sky-50 border border-brand-sky-200 rounded-2xl p-4 flex gap-3 items-start mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-sky-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-brand-sky-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-sky-800 mb-1">AI Guided Targets</p>
            <p className="text-xs text-brand-sky-700 leading-relaxed">
              Based on your household size of 2 and fitness preferences, we recommend 120g protein.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Daily Protein Goal
          </label>
          <div className="flex items-center gap-4 bg-bg-elevated border border-border-subtle rounded-2xl p-4">
            <input
              type="range"
              min="40"
              max="200"
              step="5"
              value={protein}
              onChange={(e) => setProtein(Number(e.target.value))}
              className="flex-1 accent-brand"
            />
            <span className="text-xl font-extrabold text-brand w-16 text-right">{protein}g</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> Daily Calories Limit
          </label>
          <div className="flex items-center gap-4 bg-bg-elevated border border-border-subtle rounded-2xl p-4">
            <input
              type="range"
              min="1500"
              max="4000"
              step="50"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="flex-1 accent-brand-sage-500"
            />
            <span className="text-xl font-extrabold text-brand-sage-600 w-20 text-right">{calories} kcal</span>
          </div>
        </div>

        <Button size="lg" fullWidth onClick={() => navigate(-1)}>
          Save Goals
        </Button>
      </div>
    </div>
  );
}
