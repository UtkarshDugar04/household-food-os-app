import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, PieChart, Sparkles, ShoppingBag } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Card from '../../components/core/Card';

export default function HouseholdInsights() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Insights" subtitle="Household Data & Trends" backRoute="/profile" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        
        <div className="bg-success-bg border border-success/20 rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-success uppercase tracking-widest">Waste Reduced</p>
              <p className="text-2xl font-extrabold text-success">-42%</p>
            </div>
          </div>
          <p className="font-extrabold text-text-primary text-base mb-1">Great job this month!</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            By following the AI planner, your household threw away 42% less food compared to last month.
          </p>
        </div>

        <div>
          <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-brand" /> Category Breakdown
          </h2>
          <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4">
            <div className="flex h-4 rounded-md overflow-hidden mb-4">
              <div className="w-2/5 bg-brand-sage-500"></div>
              <div className="w-1/4 bg-brand-sky-500"></div>
              <div className="w-1/5 bg-brand-coral-500"></div>
              <div className="flex-1 bg-brand-plum-500"></div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-sage-500"></div>
                <span className="text-xs font-bold text-text-secondary">Produce (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-sky-500"></div>
                <span className="text-xs font-bold text-text-secondary">Dairy (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-coral-500"></div>
                <span className="text-xs font-bold text-text-secondary">Meat (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-plum-500"></div>
                <span className="text-xs font-bold text-text-secondary">Pantry (15%)</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-warning" /> Grocery Spending
          </h2>
          <Card padding="lg">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">This Month</p>
                <p className="text-3xl font-extrabold text-text-primary">₹8,450</p>
              </div>
              <div className="bg-success-bg text-success px-2 py-1 rounded-md text-xs font-bold">
                -12% vs last
              </div>
            </div>
            <div className="h-32 flex items-end justify-between gap-2 border-b border-border-subtle pb-2">
              {[60, 40, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="w-full bg-brand-light rounded-t-md relative group cursor-pointer hover:bg-brand transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Week {i+1}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-text-tertiary uppercase">
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
              <span>W5</span>
              <span>W6</span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
