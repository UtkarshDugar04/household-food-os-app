import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronRight, TrendingUp, Award, Users, Bell, Moon, ShoppingBag, Utensils } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Card from '../../components/core/Card';
import { userProfile, impactStats } from '../../data/mockData';

const memberColors = ['bg-brand-zest-400', 'bg-brand-sage-400', 'bg-brand-sky-400'];

export default function ProfileDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Users, label: 'Household Profile', sub: '3 members', route: '/profile/household', color: 'text-text-primary' },
    { icon: Utensils, label: 'Dietary Preferences', sub: 'Flexitarian, No pork', route: '/profile/dietary', color: 'text-text-primary' },
    { icon: TrendingUp, label: 'Nutrition Goals', sub: '120g protein/day', route: '/profile/goals', color: 'text-text-primary' },
    { icon: ShoppingBag, label: 'Shopping Preferences', sub: 'BigBasket, Zepto', route: '/profile/shopping', color: 'text-text-primary' },
    { icon: Bell, label: 'Notifications', sub: '4 unread', route: '/notifications', color: 'text-text-primary' },
    { icon: Moon, label: 'Settings', sub: 'Theme, data, privacy', route: '/profile/settings', color: 'text-text-primary' },
  ];

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex justify-between items-start page-enter stagger-1">
        <div>
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-0.5">Your</p>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Profile</h1>
        </div>
        <button onClick={() => navigate('/profile/settings')} className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-all">
          <Settings className="w-4.5 h-4.5" />
        </button>
      </div>

      <div className="px-5 pb-6 flex flex-col gap-5">
        {/* Household Card */}
        <div className="illustration-container rounded-[24px] p-6 relative overflow-hidden page-enter stagger-2">
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/60 shadow-sm flex items-center justify-center mb-4 border border-border-subtle">
              <span className="text-4xl food-glow">🏡</span>
            </div>
            <h2 className="font-extrabold text-text-primary text-xl leading-tight">{userProfile.name} Family</h2>
            <p className="text-xs text-text-secondary font-medium mt-1">Based in {userProfile.location}</p>
            
            <div className="flex items-center justify-center mt-5">
              {userProfile.members.map((m, i) => (
                <div
                  key={m.name}
                  className={`w-10 h-10 rounded-full ${memberColors[i]} flex items-center justify-center text-xs font-extrabold text-white border-2 border-white shadow-sm`}
                  style={{ marginLeft: i > 0 ? -12 : 0 }}
                >
                  {m.initials}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-0 bottom-0 opacity-[0.02] text-9xl -translate-x-1/4 translate-y-1/4 pointer-events-none">🏠</div>
        </div>

        {/* Impact Summary */}
        <div className="grid grid-cols-3 gap-2.5 page-enter stagger-3">
          {[
            { label: 'Waste Prevented', value: `${impactStats.wastePreventedKg}kg`, emoji: '🌱' },
            { label: 'Money Saved', value: `₹${(impactStats.moneySavedRupees/1000).toFixed(1)}k`, emoji: '💰' },
            { label: 'Impact Score', value: 'A+', emoji: '🏆' },
          ].map(stat => (
            <div key={stat.label} className="bg-bg-elevated border border-border-subtle rounded-2xl p-3 text-center">
              <span className="text-xl">{stat.emoji}</span>
              <p className="text-base font-extrabold text-text-primary mt-1">{stat.value}</p>
              <p className="text-[9px] font-semibold text-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Dietary Tags */}
        <div className="page-enter stagger-4">
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2.5">Dietary Preferences</p>
          <div className="flex flex-wrap gap-2">
            {[...userProfile.dietaryPreferences, ...userProfile.cuisinePreferences].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-brand-sage-50 border border-brand-sage-200 text-brand-sage-700 rounded-pill text-xs font-bold">
                {tag}
              </span>
            ))}
            {userProfile.allergens.map(a => (
              <span key={a} className="px-3 py-1.5 bg-error-bg border border-error/20 text-error rounded-pill text-xs font-bold">
                ⚠️ {a} Allergy
              </span>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="flex items-center gap-3.5 bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3.5 hover:border-border-strong hover:shadow-sm active:scale-[0.99] transition-all text-left page-enter card-interactive"
              style={{ animationDelay: `${(idx * 30) + 200}ms` }}
            >
              <div className="w-9 h-9 rounded-lg bg-bg-sunken flex items-center justify-center flex-shrink-0 border border-border-subtle">
                <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-text-primary text-sm">{item.label}</p>
                <p className="text-xs text-text-tertiary">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-tertiary" />
            </button>
          ))}
        </div>

        {/* Insights link */}
        <button
          onClick={() => navigate('/profile/insights')}
          className="flex items-center justify-center gap-2 py-3 bg-bg-sunken border border-border-subtle rounded-xl text-sm font-bold text-text-primary hover:bg-bg-elevated hover:shadow-sm transition-all"
        >
          <Award className="w-4 h-4 text-text-secondary" />
          View Household Insights
        </button>
      </div>
    </div>
  );
}
