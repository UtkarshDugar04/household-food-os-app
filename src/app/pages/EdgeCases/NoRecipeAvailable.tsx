import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX, SlidersHorizontal, Plus } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function NoRecipeAvailable() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="No Matches" subtitle="Meal Generator" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-bg-sunken flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-text-tertiary" />
        </div>
        
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight mb-2">No recipes found</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-[280px]">
          We couldn't find a <span className="font-bold">Vegan</span> recipe that uses <span className="font-bold">Eggs</span>. (Eggs are not Vegan).
        </p>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={() => navigate('/recommendations/generator')} icon={<SlidersHorizontal className="w-5 h-5" />}>
            Adjust Filters
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/pantry/manual')} icon={<Plus className="w-5 h-5" />}>
            Add missing ingredients
          </Button>
        </div>
      </div>
    </div>
  );
}
