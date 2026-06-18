import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageX, ShoppingCart, Search } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function MissingIngredients() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Pantry Check" subtitle="Lemon Herb Chicken" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-error-bg border-4 border-error/20 flex items-center justify-center mb-6">
          <PackageX className="w-10 h-10 text-error" />
        </div>
        
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight mb-2">Missing Ingredients</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-[280px]">
          You don't have enough <span className="font-bold text-text-primary">Chicken Breast</span>. You need 500g, but only have 200g.
        </p>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={() => navigate('/shopping/list')} icon={<ShoppingCart className="w-5 h-5" />}>
            Add to Shopping List
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/planner/edit')} icon={<Search className="w-5 h-5" />}>
            Find alternative recipes
          </Button>
        </div>
      </div>
    </div>
  );
}
