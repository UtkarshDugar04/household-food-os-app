import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import { Brain, Sparkles, TrendingUp, Leaf, ChevronRight } from 'lucide-react';

const features = [
  { emoji: '📦', title: 'Know What You Have', desc: 'AI scans your pantry and maintains a living inventory automatically.' },
  { emoji: '🍳', title: 'Know What To Cook', desc: 'Get personalized recipe suggestions based on expiry dates and nutrition goals.' },
  { emoji: '🛒', title: 'Know What To Buy', desc: 'AI generates smart shopping lists so you never over-buy or waste.' },
  { emoji: '🤝', title: 'Share with Neighbors', desc: 'Connect surplus food with people who need it nearby.' },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [featureIdx, setFeatureIdx] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
        {/* Logo */}
        <div className="w-24 h-24 bg-gradient-to-br from-brand-zest-400 to-brand-coral-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl rotate-3" style={{ animation: 'float 4s ease-in-out infinite' }}>
          <Brain className="w-12 h-12 text-white" />
        </div>

        <div className="mb-2 px-3 py-1 bg-brand-light border border-brand/20 rounded-xl inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          <span className="text-xs font-bold text-brand uppercase tracking-widest">AI-Powered Food OS</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary leading-tight mt-4 mb-4">
          Your Household's<br />
          <span className="text-gradient-brand">Food Copilot</span>
        </h1>

        <p className="text-base text-text-secondary leading-relaxed max-w-xs">
          Track food, prevent waste, plan meals and hit nutrition goals — automatically.
        </p>
      </div>

      {/* Feature Carousel */}
      <div className="px-6 mb-6">
        <div className="bg-bg-elevated border border-border-subtle rounded-3xl p-5 shadow-sm">
          <div className="flex gap-4 items-start">
            <span className="text-3xl">{features[featureIdx].emoji}</span>
            <div className="flex-1">
              <p className="font-extrabold text-text-primary mb-1">{features[featureIdx].title}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{features[featureIdx].desc}</p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-4 justify-center">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeatureIdx(i)}
                className={`h-1.5 rounded-xl transition-all duration-normal ${i === featureIdx ? 'w-6 bg-brand' : 'w-1.5 bg-border-strong'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-success-bg border border-success/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-success">₹1,850</p>
              <p className="text-[10px] text-text-tertiary font-semibold uppercase tracking-wide">Avg Monthly Savings</p>
            </div>
          </div>
          <div className="bg-brand-light border border-brand/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-brand">5 kg</p>
              <p className="text-[10px] text-text-tertiary font-semibold uppercase tracking-wide">Waste Prevented</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-6 pb-12 flex flex-col gap-3">
        <Button size="lg" fullWidth icon={<ChevronRight className="w-5 h-5" />} onClick={() => navigate('/onboarding/household')}>
          Get Started — 3 min setup
        </Button>
        <Button variant="ghost" size="md" fullWidth onClick={() => navigate('/home')}>
          Skip to Demo →
        </Button>
      </div>
    </div>
  );
}
