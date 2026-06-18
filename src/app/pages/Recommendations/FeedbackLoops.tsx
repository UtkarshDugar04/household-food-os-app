import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageCircle, ThumbsUp, Leaf, Target, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import AICard from '../../components/core/AICard';
import { recipes } from '../../data/mockData';

const recipe = recipes[0];

export default function FeedbackLoops() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [portion, setPortion] = useState<'perfect' | 'too-much' | 'too-little' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/home'), 2500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-bg-base px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center mb-5">
          <ThumbsUp className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary mb-2">Feedback Saved! 🎉</h2>
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
          AI is learning your preferences to make better recommendations next time.
        </p>
        <div className="bg-success-bg border border-success/20 rounded-2xl px-5 py-3 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-success" />
          <p className="text-sm text-success font-bold">You prevented 200g of food waste today! 🌱</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader title="How was it?" subtitle={recipe.name} backRoute="/home" />

      <div className="px-5 pb-8 flex flex-col gap-6">
        {/* Rating */}
        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-5 text-center">
          <p className="font-extrabold text-text-primary mb-4">Rate the recipe</p>
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-125 active:scale-90"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'text-warning fill-warning'
                      : 'text-border-strong'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm font-bold text-text-secondary">
              {['', 'Not great', 'It was okay', 'Pretty good!', 'Loved it!', 'Perfect! 🔥'][rating]}
            </p>
          )}
        </div>

        {/* Portion */}
        <div>
          <p className="font-extrabold text-text-primary mb-3">Portion size?</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'too-little', label: 'Too Little', emoji: '😕' },
              { id: 'perfect', label: 'Perfect', emoji: '😋' },
              { id: 'too-much', label: 'Too Much', emoji: '🤤' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setPortion(opt.id as typeof portion)}
                className={`py-4 rounded-2xl border transition-all active:scale-95 flex flex-col items-center gap-1 ${
                  portion === opt.id
                    ? 'bg-brand border-brand/30 shadow-sm'
                    : 'bg-bg-elevated border-border-subtle hover:border-border-strong'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className={`text-xs font-bold ${portion === opt.id ? 'text-white' : 'text-text-secondary'}`}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients used */}
        <div>
          <p className="font-extrabold text-text-primary mb-3">Ingredients used?</p>
          <div className="flex flex-col gap-2">
            {recipe.ingredients.filter(i => i.available).map((ing, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-success-bg border border-success/15 rounded-xl px-4 py-2.5">
                <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                  <span className="text-white text-[10px] font-extrabold">✓</span>
                </div>
                <span className="text-sm font-semibold text-text-primary">{ing.name}</span>
                <span className="text-xs text-text-tertiary ml-auto">{ing.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <AICard title="Impact Summary">
          By cooking this recipe, you've prevented <strong className="text-brand-plum-800">200g of food waste</strong> and 
          contributed <strong className="text-brand-plum-800">42g protein</strong> to today's goal.
          Your weekly waste prevention streak is at <strong className="text-brand-plum-800">7 days!</strong>
        </AICard>

        <Button
          size="lg"
          fullWidth
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
}
