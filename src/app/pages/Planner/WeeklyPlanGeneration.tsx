import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, CheckCircle2, ChevronRight, Target } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function WeeklyPlanGeneration() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      navigate('/planner/week');
    }, 3000);
  };

  const optimizationGoals = [
    { id: 'nutrition', title: 'Hit Nutrition Goals', desc: 'Prioritize 120g protein/day', color: 'text-brand-sky-600', bg: 'bg-brand-sky-50', border: 'border-brand-sky-200' },
    { id: 'waste', title: 'Zero Food Waste', desc: 'Use 8 expiring items first', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
    { id: 'budget', title: 'Budget Friendly', desc: 'Minimize new grocery purchases', color: 'text-brand', bg: 'bg-brand-light', border: 'border-brand/20' },
    { id: 'time', title: 'Quick Meals', desc: 'Recipes under 30 mins', color: 'text-warning', bg: 'bg-warning-bg', border: 'border-warning/30' },
  ];

  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set(['nutrition', 'waste']));

  const toggleGoal = (id: string) => {
    const next = new Set(selectedGoals);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedGoals(next);
  };

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-base px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-sky-400 to-brand-sky-600 flex items-center justify-center mb-8 shadow-xl relative">
          <div className="absolute inset-0 border-4 border-white/30 rounded-full border-t-white animate-spin" />
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-3">Building your week...</h2>
        <div className="space-y-3 w-full max-w-[280px]">
          <div className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
            <CheckCircle2 className="w-4 h-4 text-success" /> Securing 120g daily protein
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
            <CheckCircle2 className="w-4 h-4 text-success" /> Scheduling expiring spinach
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-text-tertiary opacity-70">
            <span className="w-4 h-4 rounded-full border-2 border-border-strong animate-pulse" /> Generating grocery list
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Plan Next Week" subtitle="AI will build a 7-day meal schedule" backRoute="/planner" />

      <div className="px-5 pb-8 pt-4 flex flex-col flex-1 gap-6">
        <div>
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> What's important this week?
          </p>
          <div className="grid grid-cols-1 gap-3">
            {optimizationGoals.map(goal => {
              const isSelected = selectedGoals.has(goal.id);
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-start gap-3.5 rounded-2xl p-4 text-left transition-all border ${
                    isSelected
                      ? `${goal.bg} ${goal.border} shadow-sm`
                      : 'bg-bg-elevated border-border-subtle hover:border-border-strong'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    isSelected ? `border-current bg-current ${goal.color}` : 'border-border-strong'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white -m-1" />}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>{goal.title}</p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-text-secondary' : 'text-text-tertiary'}`}>{goal.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="font-extrabold text-text-primary text-sm">Dietary Profile Linked</p>
            <ChevronRight className="w-4 h-4 text-text-tertiary" />
          </div>
          <div className="flex flex-wrap gap-2">
            {['Non-Veg', 'High Protein', 'No Pork', '2 Members'].map(tag => (
              <span key={tag} className="px-2 py-1 bg-bg-sunken rounded-md text-[10px] font-bold text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <Button size="lg" fullWidth icon={<Sparkles className="w-5 h-5" />} onClick={handleGenerate}>
            Auto-Generate Plan
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate('/planner/week')}>
            Build Manually
          </Button>
        </div>
      </div>
    </div>
  );
}
