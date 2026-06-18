import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Info, Plus, Check } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function ConflictResolution() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Dietary Conflict" subtitle="Household Profile" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-brand-plum-50 border-4 border-brand-plum-200 flex items-center justify-center mb-6">
          <Users className="w-10 h-10 text-brand-plum-600" />
        </div>
        
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight mb-2">Mixed Dietary Needs</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-[280px]">
          You are <span className="font-bold text-text-primary">Non-Veg</span> and Priya is <span className="font-bold text-text-primary">Vegetarian</span>. How should AI generate your meal plan?
        </p>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={() => navigate('/planner/generate')} className="bg-bg-elevated text-text-primary border border-border-subtle hover:border-brand-muted text-left flex justify-between items-center group">
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm">Strictly Vegetarian</span>
              <span className="text-xs text-text-secondary font-normal">Cook 1 meal for both</span>
            </div>
            <Check className="w-5 h-5 text-transparent group-hover:text-brand transition-colors" />
          </Button>
          
          <Button fullWidth onClick={() => navigate('/planner/generate')} className="bg-bg-elevated text-text-primary border border-border-subtle hover:border-brand-muted text-left flex justify-between items-center group">
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm">Split Meals</span>
              <span className="text-xs text-text-secondary font-normal">Generate 2 separate recipes per meal</span>
            </div>
            <Check className="w-5 h-5 text-transparent group-hover:text-brand transition-colors" />
          </Button>

          <Button fullWidth onClick={() => navigate('/planner/generate')} className="bg-bg-elevated text-text-primary border border-border-subtle hover:border-brand-muted text-left flex justify-between items-center group">
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm">Base + Protein Add-on</span>
              <span className="text-xs text-text-secondary font-normal">Vegetarian base with optional meat side</span>
            </div>
            <Check className="w-5 h-5 text-transparent group-hover:text-brand transition-colors" />
          </Button>
        </div>
      </div>
    </div>
  );
}
