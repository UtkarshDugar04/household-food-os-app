import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, DollarSign, Cloud, Users, TrendingUp, Award } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Card from '../../components/core/Card';
import { impactStats } from '../../data/mockData';

export default function ImpactDashboard() {
  const navigate = useNavigate();

  const stats = [
    { icon: Leaf, label: 'Food Waste Prevented', value: `${impactStats.wastePreventedKg} kg`, sub: 'Since joining', color: 'text-success', bg: 'bg-success-bg', border: 'border-success/20' },
    { icon: DollarSign, label: 'Money Saved', value: `₹${impactStats.moneySavedRupees.toLocaleString()}`, sub: 'This year', color: 'text-brand', bg: 'bg-brand-light', border: 'border-brand/20' },
    { icon: Cloud, label: 'CO₂ Offset', value: `${impactStats.co2OffsetKg} kg`, sub: 'Carbon equivalent', color: 'text-brand-sky-600', bg: 'bg-brand-sky-50', border: 'border-brand-sky-200' },
    { icon: Users, label: 'Community Helped', value: `${impactStats.communityHelped} people`, sub: 'Via food sharing', color: 'text-brand-plum-600', bg: 'bg-brand-plum-50', border: 'border-brand-plum-200' },
  ];

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader title="Your Impact" subtitle="Environmental & Financial" backRoute="/home" />

      <div className="px-5 pb-6 flex flex-col gap-5">
        {/* Hero Impact Banner */}
        <div className="bg-gradient-to-br from-brand-sage-500 to-brand-sage-700 rounded-3xl p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-brand-sage-200" />
            <span className="text-xs font-bold text-brand-sage-200 uppercase tracking-widest">Impact Score</span>
          </div>
          <p className="text-5xl font-extrabold mb-1">A+</p>
          <p className="text-brand-sage-200 text-sm leading-relaxed">
            You're in the <strong className="text-white">top 12%</strong> of households for food waste reduction in your neighborhood.
          </p>
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-2xl font-extrabold">{impactStats.mealsCooked}</p>
              <p className="text-xs text-brand-sage-200">Meals Cooked</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{impactStats.communityHelped}</p>
              <p className="text-xs text-brand-sage-200">People Helped</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">6</p>
              <p className="text-xs text-brand-sage-200">Months Active</p>
            </div>
          </div>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-4`}>
              <div className={`w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center mb-2`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs font-bold text-text-primary mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-text-tertiary">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Monthly Savings Chart */}
        <Card padding="md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-extrabold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Monthly Savings
            </h2>
            <span className="text-xs font-bold text-success">+18% this month</span>
          </div>
          <div className="flex items-end gap-2 h-28">
            {impactStats.monthlyTrend.map((month, i) => {
              const maxSaved = Math.max(...impactStats.monthlyTrend.map(m => m.saved));
              const height = Math.round((month.saved / maxSaved) * 100);
              const isLatest = i === impactStats.monthlyTrend.length - 1;
              return (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-[9px] font-bold text-text-tertiary">₹{(month.saved/1000).toFixed(1)}k</p>
                  <div className="w-full flex flex-col justify-end h-20">
                    <div
                      className={`w-full rounded-t-lg ${isLatest ? 'bg-success' : 'bg-success-bg'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className={`text-[9px] font-bold ${isLatest ? 'text-success' : 'text-text-tertiary'}`}>{month.month}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Community Impact CTA */}
        <div className="bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-4">
          <p className="text-sm font-extrabold text-brand-plum-700 mb-1">🌍 Growing Community Impact</p>
          <p className="text-xs text-brand-plum-600 leading-relaxed mb-3">
            You've rescued food for {impactStats.communityHelped} neighbors through the community exchange. That's the equivalent of {Math.round(impactStats.communityHelped * 3)} meals prevented from landfill.
          </p>
          <button onClick={() => navigate('/community')} className="text-xs font-bold text-brand-plum-700 hover:underline">
            View Community Activity →
          </button>
        </div>
      </div>
    </div>
  );
}
