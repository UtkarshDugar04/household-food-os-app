import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import ProgressBar from '../../components/core/ProgressBar';
import { weeklyMealPlan, nutritionGoals } from '../../data/mockData';

export default function DayDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const day = location.state?.day || weeklyMealPlan[1]; // default to Tuesday

  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;
  const labels = { breakfast: '🌅 Breakfast', lunch: '☀️ Lunch', dinner: '🌙 Dinner' };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title={`${day.day}, ${day.dateNum}`} subtitle={`${day.totalCalories} kcal · ${day.totalProtein}g protein`} backRoute="/planner" />

      <div className="px-5 pb-8 flex flex-col gap-6 pt-2">
        {/* Day Nutrition Progress */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">Day Goal Progress</p>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-text-secondary">Protein</span>
                <span className="text-brand">{day.totalProtein}g / {nutritionGoals.protein.goal}g</span>
              </div>
              <ProgressBar value={day.totalProtein} max={nutritionGoals.protein.goal} color="brand" size="sm" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-text-secondary">Calories</span>
                <span className="text-brand-sage-600">{day.totalCalories} / {nutritionGoals.calories.goal}</span>
              </div>
              <ProgressBar value={day.totalCalories} max={nutritionGoals.calories.goal} color="sage" size="sm" />
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="flex flex-col gap-4">
          {mealTypes.map(type => {
            const meal = day.meals[type];
            return (
              <div key={type}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{labels[type]}</p>
                  <button onClick={() => navigate('/planner/edit')} className="text-[10px] font-bold text-brand hover:underline">
                    Change
                  </button>
                </div>
                {meal ? (
                  <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 flex gap-3.5 items-start">
                    <span className="text-3xl">{meal.emoji}</span>
                    <div className="flex-1">
                      <p className="font-extrabold text-text-primary text-sm mb-1">{meal.name}</p>
                      <p className="text-xs text-text-secondary">{meal.calories} kcal · {meal.protein}g protein</p>
                      <button onClick={() => navigate('/recipe')} className="mt-2 text-xs font-bold text-brand flex items-center gap-1 hover:underline">
                        View Recipe <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => navigate('/planner/edit')} className="w-full flex items-center justify-center gap-2 py-4 bg-bg-sunken border border-dashed border-border-strong rounded-2xl text-text-tertiary hover:border-brand hover:text-brand hover:bg-brand-light transition-all">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-bold">Add {labels[type].split(' ')[1]}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Button variant="outline" fullWidth icon={<RefreshCw className="w-4 h-4" />} onClick={() => navigate('/planner/generate')}>
            AI Regenerate Day
          </Button>
        </div>
      </div>
    </div>
  );
}
