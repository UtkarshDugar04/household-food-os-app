import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';
import { ChevronLeft } from 'lucide-react';

export default function DietarySetup() {
  const navigate = useNavigate();
  const [dietType, setDietType] = useState<string>('Non-Veg');

  const types = ['Vegetarian', 'Eggetarian', 'Non-Veg', 'Vegan', 'Jain'];
  const restrictions = ['Diabetes', 'Pregnancy', 'Heart Health', 'Kidney Health', 'Gluten Free', 'Lactose Free'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-bg-sunken text-text-secondary">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-1.5 bg-bg-sunken rounded-xl overflow-hidden">
          <div className="h-full bg-brand w-2/4 rounded-xl"></div>
        </div>
        <span className="text-xs font-bold text-text-tertiary">2 OF 4</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary leading-tight mb-2">
          Dietary Profile
        </h1>
        <p className="text-base text-text-secondary">
          Create nutrition constraints for your household.
        </p>
      </div>

      <div className="space-y-8 flex-1">
        {/* Dietary Type */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
            Dietary Type
          </label>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button 
                key={type} 
                onClick={() => setDietType(type)}
                className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                  dietType === type
                    ? 'bg-brand text-white shadow-sm'
                    : 'bg-bg-elevated text-text-secondary border border-border-subtle hover:border-brand-muted'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Restrictions */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
            Health Restrictions
          </label>
          <div className="flex flex-wrap gap-2">
            {restrictions.map((restriction) => (
              <button 
                key={restriction} 
                className="px-4 py-2 rounded-xl font-semibold bg-bg-elevated text-text-secondary border border-border-subtle hover:bg-bg-sunken transition-colors"
              >
                {restriction}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 pb-8 pt-4 bg-bg-base sticky bottom-0 border-t border-border-subtle/50">
        <Button size="lg" fullWidth onClick={() => navigate('/onboarding/goals')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
