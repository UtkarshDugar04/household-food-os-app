import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';
import { User, Users, Home, Building, ChevronLeft, Plus, Minus } from 'lucide-react';

export default function HouseholdSetup() {
  const navigate = useNavigate();
  const [householdType, setHouseholdType] = useState<string>('Family');
  const [size, setSize] = useState<number>(4);

  const types = [
    { id: 'Individual', icon: User },
    { id: 'Couple', icon: Users },
    { id: 'Family', icon: Home },
    { id: 'Shared Flat', icon: Building },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-bg-sunken text-text-secondary">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-1.5 bg-bg-sunken rounded-xl overflow-hidden">
          <div className="h-full bg-brand w-1/4 rounded-xl"></div>
        </div>
        <span className="text-xs font-bold text-text-tertiary">1 OF 4</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary leading-tight mb-2">
          Household Setup
        </h1>
        <p className="text-base text-text-secondary">
          Let's tailor the experience to your home.
        </p>
      </div>

      <div className="space-y-8 flex-1">
        {/* Household Type */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
            Household Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {types.map((type) => (
              <Card 
                key={type.id} 
                interactive 
                padding="sm"
                onClick={() => setHouseholdType(type.id)}
                className={`flex flex-col items-center justify-center p-4 gap-2 transition-colors ${
                  householdType === type.id 
                    ? 'border-brand bg-brand-50 dark:bg-brand-900/20 shadow-none' 
                    : 'border-border-subtle bg-bg-elevated'
                }`}
              >
                <type.icon className={`w-6 h-6 ${householdType === type.id ? 'text-brand' : 'text-text-tertiary'}`} />
                <span className={`text-sm font-semibold ${householdType === type.id ? 'text-brand' : 'text-text-secondary'}`}>
                  {type.id}
                </span>
              </Card>
            ))}
          </div>
        </div>

        {/* Household Size */}
        <div>
          <label className="block text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
            How many people?
          </label>
          <div className="flex items-center justify-between bg-bg-sunken p-2 rounded-2xl border border-border-subtle">
            <button 
              onClick={() => setSize(Math.max(1, size - 1))}
              className="w-12 h-12 bg-bg-elevated rounded-xl shadow-sm flex items-center justify-center text-text-secondary hover:text-text-primary active:scale-95 transition-transform"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="text-3xl font-extrabold text-text-primary w-16 text-center">
              {size}
            </div>
            <button 
              onClick={() => setSize(Math.min(10, size + 1))}
              className="w-12 h-12 bg-bg-elevated rounded-xl shadow-sm flex items-center justify-center text-text-secondary hover:text-text-primary active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 pb-8 pt-4 bg-bg-base sticky bottom-0 border-t border-border-subtle/50">
        <Button size="lg" fullWidth onClick={() => navigate('/onboarding/dietary')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
