import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, AlertTriangle, Plus } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import { userProfile } from '../../data/mockData';

export default function DietaryProfile() {
  const navigate = useNavigate();
  const [diet, setDiet] = useState('Flexitarian');

  const dietTypes = ['Vegetarian', 'Vegan', 'Flexitarian', 'Pescatarian', 'Keto', 'Paleo'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Dietary Preferences" subtitle="Applies to all meal recommendations" backRoute="/profile" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        <div>
          <h2 className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Core Diet Type</h2>
          <div className="flex flex-wrap gap-2">
            {dietTypes.map(d => (
              <button
                key={d}
                onClick={() => setDiet(d)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all border active:scale-95 ${
                  diet === d
                    ? 'bg-brand border-brand text-white shadow-[0_4px_12px_rgba(240,123,12,0.3)]'
                    : 'bg-bg-elevated text-text-secondary border-border-subtle hover:border-border-strong'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Allergies & Avoidances
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {userProfile.allergens.map(a => (
              <span key={a} className="px-3 py-1.5 bg-error-bg text-error rounded-pill text-xs font-bold border border-error/20 flex items-center gap-1.5">
                {a}
              </span>
            ))}
            <span className="px-3 py-1.5 bg-bg-elevated text-text-secondary rounded-pill text-xs font-bold border border-border-subtle flex items-center gap-1.5">
              Pork
            </span>
          </div>
          <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>Add Restriction</Button>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5" /> Favorite Cuisines
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {userProfile.cuisinePreferences.map(c => (
              <span key={c} className="px-3 py-1.5 bg-brand-sage-50 text-brand-sage-700 rounded-pill text-xs font-bold border border-brand-sage-200">
                {c}
              </span>
            ))}
          </div>
          <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>Add Cuisine</Button>
        </div>
      </div>
    </div>
  );
}
