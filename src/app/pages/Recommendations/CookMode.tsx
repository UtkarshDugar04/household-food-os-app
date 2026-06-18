import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Clock, CheckCircle, Volume2 } from 'lucide-react';
import Button from '../../components/core/Button';
import { recipes } from '../../data/mockData';

const recipe = recipes[0];

export default function CookMode() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = recipe.steps[currentStep];
  const isLastStep = currentStep === recipe.steps.length - 1;
  const progress = ((currentStep + 1) / recipe.steps.length) * 100;

  const markComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (!isLastStep) {
      setCurrentStep(s => s + 1);
    } else {
      navigate('/recipe/feedback');
    }
  };

  const startTimer = () => {
    if (step.duration) {
      setTimeLeft(step.duration * 60);
      setTimerRunning(true);
    }
  };

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { setTimerRunning(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-screen bg-bg-base">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 bg-bg-elevated border-b border-border-subtle">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full hover:bg-bg-sunken flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-text-tertiary font-bold uppercase tracking-widest">{recipe.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-bg-sunken rounded-md overflow-hidden">
              <div className="h-full bg-brand rounded-md transition-all duration-slow" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-bold text-text-tertiary whitespace-nowrap">
              {currentStep + 1}/{recipe.steps.length}
            </span>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full hover:bg-bg-sunken flex items-center justify-center">
          <Volume2 className="w-4.5 h-4.5 text-text-secondary" />
        </button>
      </div>

      {/* Step Numbers */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
        {recipe.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
              completedSteps.has(i)
                ? 'bg-success text-white'
                : i === currentStep
                ? 'bg-brand text-white shadow-sm scale-110'
                : 'bg-bg-sunken text-text-tertiary'
            }`}
          >
            {completedSteps.has(i) ? <Check className="w-4 h-4" /> : i + 1}
          </button>
        ))}
      </div>

      {/* Current Step */}
      <div className="flex-1 px-5 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-light mx-auto flex items-center justify-center mb-6 shadow-sm">
            <span className="text-3xl font-extrabold text-brand">{currentStep + 1}</span>
          </div>
          <p className="text-xl font-bold text-text-primary leading-relaxed max-w-[300px] mx-auto">
            {step.instruction}
          </p>
        </div>

        {/* Timer */}
        {step.duration && (
          <div className="flex flex-col items-center gap-3 mb-6">
            {timerRunning || timeLeft > 0 ? (
              <div className="bg-brand text-white rounded-2xl px-8 py-4 text-center">
                <p className="text-4xl font-extrabold">{formatTime(timeLeft)}</p>
                <p className="text-xs text-white/70 mt-1">remaining</p>
              </div>
            ) : (
              <button
                onClick={startTimer}
                className="flex items-center gap-2 bg-bg-elevated border border-border-strong rounded-2xl px-6 py-3 hover:border-brand hover:bg-brand-light transition-all"
              >
                <Clock className="w-4 h-4 text-brand" />
                <span className="font-bold text-text-primary">Set {step.duration} min timer</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-5 pb-10 flex flex-col gap-3">
        <Button
          size="lg"
          fullWidth
          icon={isLastStep ? <CheckCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          onClick={markComplete}
        >
          {isLastStep ? "I'm Done! Rate Recipe" : `Done — Next: Step ${currentStep + 2}`}
        </Button>
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="flex-1">
              ← Previous
            </Button>
          )}
          {!isLastStep && (
            <Button variant="ghost" onClick={() => setCurrentStep(s => s + 1)} className="flex-1">
              Skip Step →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
