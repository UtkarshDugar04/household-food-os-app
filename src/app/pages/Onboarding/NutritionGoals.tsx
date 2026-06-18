import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';
import { ChevronLeft } from 'lucide-react';

export default function NutritionGoals() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<string>('Maintain');
  const [protein, setProtein] = useState<number>(100);

  const goals = ['Lose Weight', 'Gain Muscle', 'Maintain', 'Family Nutrition'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-bg-sunken text-text-secondary">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-1.5 bg-bg-sunken rounded-xl overflow-hidden">
          <div className="h-full bg-brand w-3/4 rounded-xl"></div>
        </div>
        <span className="text-xs font-bold text-text-tertiary">3 OF 6</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary leading-tight mb-2">
          Nutrition Goals
        </h1>
        <p className="text-base text-text-secondary">
          Define optimization targets for recommendations.
        </p>
      </div>

      <div className="space-y-8 flex-1">
        {/* Goal Type */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
            Goal Type
          </label>
          <div className="flex flex-col gap-3">
            {goals.map((g) => (
              <Card 
                key={g} 
                interactive 
                padding="md"
                onClick={() => setGoal(g)}
                className={`flex items-center justify-between transition-colors ${
                  goal === g 
                    ? 'border-brand bg-brand-50 dark:bg-brand-900/20 shadow-sm' 
                    : 'border-border-subtle bg-bg-elevated'
                }`}
              >
                <span className={`text-base font-bold ${goal === g ? 'text-brand' : 'text-text-primary'}`}>
                  {g}
                </span>
                {goal === g && (
                  <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Protein Target */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-text-primary uppercase tracking-wide">
              Daily Protein Target
            </label>
            <span className="text-brand font-extrabold">{protein}g</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="200" 
            value={protein}
            onChange={(e) => setProtein(parseInt(e.target.value))}
            className="w-full h-2 bg-bg-sunken rounded-lg appearance-none cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-text-tertiary mt-2 font-semibold">
            <span>50g</span>
            <span>200g</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 pb-8 pt-4 bg-bg-base sticky bottom-0 border-t border-border-subtle/50">
        <Button size="lg" fullWidth onClick={() => navigate('/onboarding/sources')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
