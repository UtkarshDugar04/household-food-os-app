import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, TrendingDown, Flame, Droplet, Zap, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import ProgressBar from '../../components/core/ProgressBar';
import Card from '../../components/core/Card';
import { nutritionGoals, weeklyMealPlan } from '../../data/mockData';

export default function DailyInsights() {
  const navigate = useNavigate();
  const { protein, calories, fiber, water, weeklyStats } = nutritionGoals;

  const maxCalories = Math.max(...weeklyStats.map(d => d.calories));
  const maxProtein = Math.max(...weeklyStats.map(d => d.protein));

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader title="Nutrition Insights" subtitle="Daily & Weekly Analysis" backRoute="/home" />

      <div className="px-5 pb-6 flex flex-col gap-5">
        {/* Today's Goals */}
        <Card padding="md">
          <h2 className="text-sm font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-brand" />
            Today's Goals
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Protein', current: protein.current, goal: protein.goal, unit: 'g', color: 'brand' as const, icon: '💪' },
              { label: 'Calories', current: calories.current, goal: calories.goal, unit: 'kcal', color: 'success' as const, icon: '🔥' },
              { label: 'Fiber', current: fiber.current, goal: fiber.goal, unit: 'g', color: 'sage' as const, icon: '🥦' },
              { label: 'Water', current: water.current, goal: water.goal, unit: 'glasses', color: 'sky' as const, icon: '💧' },
            ].map(goal => (
              <div key={goal.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                    <span>{goal.icon}</span> {goal.label}
                  </span>
                  <span className="text-sm font-extrabold text-text-primary">
                    {goal.current}<span className="text-text-tertiary font-semibold">/{goal.goal} {goal.unit}</span>
                  </span>
                </div>
                <ProgressBar value={goal.current} max={goal.goal} color={goal.color} size="md" animated />
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Protein Chart */}
        <Card padding="md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-extrabold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand" />
              Weekly Protein
            </h2>
            <span className="text-xs font-bold text-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {protein.trend}
            </span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {weeklyStats.map((day, i) => {
              const height = Math.round((day.protein / maxProtein) * 100);
              const isToday = i === 1; // Tuesday
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end h-20">
                    <div
                      className={`w-full rounded-lg transition-all ${isToday ? 'bg-brand' : 'bg-brand-light'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className={`text-[9px] font-bold ${isToday ? 'text-brand' : 'text-text-tertiary'}`}>{day.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-text-tertiary mt-2">
            <span>0g</span>
            <span>{maxProtein}g</span>
          </div>
        </Card>

        {/* Weekly Calories Chart */}
        <Card padding="md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-extrabold text-text-primary flex items-center gap-2">
              <Flame className="w-4 h-4 text-brand-coral-500" />
              Weekly Calories
            </h2>
            <span className="text-xs font-bold text-success flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> {calories.trend}
            </span>
          </div>
          <div className="flex items-end gap-2 h-20">
            {weeklyStats.map((day, i) => {
              const height = Math.round((day.calories / maxCalories) * 100);
              const isToday = i === 1;
              const isOver = day.calories > calories.goal;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end h-16">
                    <div
                      className={`w-full rounded-lg ${isToday ? (isOver ? 'bg-warning' : 'bg-brand-sage-500') : 'bg-brand-sage-100'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className={`text-[9px] font-bold ${isToday ? 'text-brand-sage-600' : 'text-text-tertiary'}`}>{day.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Insights */}
        <div className="flex flex-col gap-2.5">
          <h2 className="text-sm font-extrabold text-text-primary">Key Insights</h2>
          {[
            { emoji: '💪', insight: 'Protein is 27% below daily goal. Add Lemon Herb Chicken for dinner.', action: 'See Recipe', route: '/home/recommendation' },
            { emoji: '✅', insight: 'Calorie intake is well within target. Great balance this week.', action: null, route: null },
            { emoji: '🥦', insight: 'Fiber 7g below goal. Add a side salad or fruit snack.', action: 'Add Snack', route: '/shopping/list' },
          ].map((ins, i) => (
            <div key={i} className="flex items-start gap-3 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3.5">
              <span className="text-xl mt-0.5">{ins.emoji}</span>
              <p className="flex-1 text-sm text-text-secondary leading-relaxed">{ins.insight}</p>
              {ins.action && (
                <button onClick={() => navigate(ins.route!)} className="text-xs font-bold text-brand flex-shrink-0 hover:underline">
                  {ins.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
