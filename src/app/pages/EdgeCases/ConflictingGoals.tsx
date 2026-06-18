import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, AlertTriangle, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function ConflictingGoals() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Goal Conflict" subtitle="AI Planner" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-warning-bg border-4 border-warning/20 flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-warning" />
        </div>
        
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight mb-2">Conflicting Optimization</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-[280px]">
          You asked the AI to hit <span className="font-bold text-text-primary">150g Protein</span> but also <span className="font-bold text-text-primary">Zero Grocery Spend</span>. Your pantry only has enough protein for 80g/day.
        </p>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={() => navigate('/planner/generate')} className="bg-brand text-white text-left flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <span className="font-bold">Prioritize Protein</span>
              <span className="text-xs text-white/80 font-normal">(Allow buying groceries)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </Button>
          
          <Button fullWidth onClick={() => navigate('/planner/generate')} className="bg-brand text-white text-left flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <span className="font-bold">Prioritize Budget</span>
              <span className="text-xs text-white/80 font-normal">(Lower protein goal)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </Button>
        </div>
      </div>
    </div>
  );
}
