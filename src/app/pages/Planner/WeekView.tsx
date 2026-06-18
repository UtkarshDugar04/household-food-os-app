import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Utensils } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import { weeklyMealPlan } from '../../data/mockData';

export default function WeekView() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);

  const selectedPlan = weeklyMealPlan[selectedDay];
  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;
  const mealLabels = { breakfast: '🌅 Breakfast', lunch: '☀️ Lunch', dinner: '🌙 Dinner' };

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader title="Week View" subtitle="Jun 16 – Jun 22" backRoute="/planner" />

      {/* Day Selector */}
      <div className="px-5 mb-5">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {weeklyMealPlan.map((day, i) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-2xl transition-all ${
                selectedDay === i ? 'bg-brand text-white shadow-sm' : 'bg-bg-elevated border border-border-subtle text-text-secondary hover:border-border-strong'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedDay === i ? 'text-white/70' : 'text-text-tertiary'}`}>{day.day}</span>
              <span className="text-base font-extrabold">{day.dateNum}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meals for selected day */}
      <div className="px-5 pb-6 flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-base font-extrabold text-text-primary">{selectedPlan.day}, {selectedPlan.date}</h2>
          <div className="flex items-center gap-2 text-xs text-text-tertiary font-semibold">
            <span>{selectedPlan.totalCalories} kcal</span>
            <span>·</span>
            <span>{selectedPlan.totalProtein}g protein</span>
          </div>
        </div>

        {mealTypes.map(mealType => {
          const meal = selectedPlan.meals[mealType];
          return (
            <button
              key={mealType}
              onClick={() => navigate('/recipe')}
              className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all text-left"
            >
              <div className="flex items-center gap-4 px-4 py-4">
                <span className="text-3xl">{meal.emoji}</span>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-0.5">{mealLabels[mealType]}</p>
                  <p className="font-extrabold text-text-primary">{meal.name}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">{meal.calories} kcal · {meal.protein}g protein</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="text-brand hover:bg-brand-light rounded-lg p-1.5 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </button>
          );
        })}

        {/* Add meal button */}
        <button
          onClick={() => navigate('/planner/edit')}
          className="flex items-center justify-center gap-2 bg-bg-sunken border border-dashed border-border-strong rounded-2xl py-3.5 text-sm font-bold text-text-tertiary hover:border-brand hover:text-brand hover:bg-brand-light transition-all"
        >
          <Plus className="w-4 h-4" />
          Add a Snack or Meal
        </button>

        {/* Nutrition summary */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3.5 flex justify-around">
          {[
            { label: 'Calories', val: selectedPlan.totalCalories, unit: 'kcal', color: 'text-brand' },
            { label: 'Protein', val: selectedPlan.totalProtein, unit: 'g', color: 'text-brand-sky-600' },
            { label: 'Meals', val: 3, unit: '', color: 'text-success' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className={`text-lg font-extrabold ${stat.color}`}>{stat.val}{stat.unit}</p>
              <p className="text-[10px] font-semibold text-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
