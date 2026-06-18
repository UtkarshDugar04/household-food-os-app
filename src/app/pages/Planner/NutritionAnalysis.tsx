import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import ProgressBar from '../../components/core/ProgressBar';
import AICard from '../../components/core/AICard';

export default function NutritionAnalysis() {
  const navigate = useNavigate();

  const macros = [
    { label: 'Protein', current: 112, goal: 120, unit: 'g', color: 'brand' as const, status: 'On Track' },
    { label: 'Calories', current: 2150, goal: 2400, unit: 'kcal', color: 'sage' as const, status: 'Under' },
    { label: 'Carbs', current: 280, goal: 300, unit: 'g', color: 'sky' as const, status: 'On Track' },
    { label: 'Fat', current: 65, goal: 80, unit: 'g', color: 'warning' as const, status: 'Optimal' },
  ];

  const micros = [
    { label: 'Fiber', val: '22g', goal: '25g', ok: false },
    { label: 'Iron', val: '14mg', goal: '18mg', ok: false },
    { label: 'Vitamin C', val: '95mg', goal: '75mg', ok: true },
    { label: 'Calcium', val: '1200mg', goal: '1000mg', ok: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Nutrition Analysis" subtitle="Weekly Plan Averages" backRoute="/planner" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        {/* Macro Score */}
        <div className="flex items-center gap-4 bg-bg-elevated border border-border-subtle rounded-3xl p-5 shadow-sm">
          <div className="w-20 h-20 rounded-full border-8 border-brand flex items-center justify-center flex-shrink-0 relative">
            <span className="text-xl font-extrabold text-brand">94</span>
            <span className="absolute -bottom-2 -right-2 bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded-pill border-2 border-bg-elevated">
              A+
            </span>
          </div>
          <div>
            <p className="font-extrabold text-text-primary text-lg leading-tight mb-1">Excellent Balance</p>
            <p className="text-sm text-text-secondary leading-relaxed">Your planned week hits 94% of your household nutrition targets.</p>
          </div>
        </div>

        {/* AI Insight */}
        <AICard title="Dietitian Insights">
          You are slightly low on <strong className="text-brand-plum-800">Fiber (22g/25g)</strong> and <strong className="text-brand-plum-800">Iron</strong>. 
          I recommend adding <strong className="text-brand-plum-800">Spinach</strong> (which you have in your pantry) to your morning smoothies.
        </AICard>

        {/* Macros */}
        <div>
          <h2 className="text-base font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-brand" /> Macronutrients
          </h2>
          <div className="flex flex-col gap-4">
            {macros.map(m => (
              <div key={m.label}>
                <div className="flex justify-between items-end mb-1.5">
                  <div>
                    <span className="text-sm font-bold text-text-primary mr-2">{m.label}</span>
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{m.status}</span>
                  </div>
                  <span className="text-sm font-extrabold text-text-primary">
                    {m.current}<span className="text-text-tertiary">/{m.goal}{m.unit}</span>
                  </span>
                </div>
                <ProgressBar value={m.current} max={m.goal} color={m.color} size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* Micros */}
        <div>
          <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning" /> Micronutrients
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {micros.map(m => (
              <div key={m.label} className={`border rounded-2xl p-3 ${m.ok ? 'bg-success-bg/30 border-success/20' : 'bg-warning-bg/30 border-warning/20'}`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-bold text-text-secondary">{m.label}</p>
                  {m.ok ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <AlertTriangle className="w-3.5 h-3.5 text-warning" />}
                </div>
                <p className="text-sm font-extrabold text-text-primary">{m.val} <span className="text-[10px] text-text-tertiary font-medium">/ {m.goal}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
