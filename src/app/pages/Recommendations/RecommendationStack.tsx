import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, ChevronLeft, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import AICard from '../../components/core/AICard';
import { recipes } from '../../data/mockData';

export default function RecommendationStack() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const currentRecipe = recipes[currentIdx];

  const handleReject = () => {
    setDismissed(prev => new Set([...prev, currentIdx]));
    if (currentIdx < recipes.length - 1) setCurrentIdx(i => i + 1);
  };

  const handleAccept = () => {
    navigate('/recipe', { state: { recipe: currentRecipe } });
  };

  if (!currentRecipe) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-bg-base px-6 text-center">
        <span className="text-5xl mb-4">✅</span>
        <h2 className="text-xl font-extrabold text-text-primary mb-2">You've seen all suggestions!</h2>
        <p className="text-text-secondary text-sm mb-6">AI will generate new ones based on your preferences.</p>
        <Button onClick={() => navigate('/recommendations/generate')}>Generate More</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-bg-sunken flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-text-primary">Meal Ideas</h1>
          <p className="text-xs text-text-tertiary">{currentIdx + 1} of {recipes.length}</p>
        </div>
        <Badge variant="brand">{currentRecipe.matchScore}% Match</Badge>
      </div>

      {/* Recipe Card Stack */}
      <div className="mx-5 mb-5 relative">
        {/* Shadow cards behind */}
        {[2, 1].map(offset => (
          <div
            key={offset}
            className="absolute inset-0 bg-bg-elevated border border-border-subtle rounded-3xl"
            style={{ transform: `translateY(${offset * 6}px) scale(${1 - offset * 0.02})`, zIndex: 10 - offset }}
          />
        ))}
        
        {/* Main card */}
        <div className="bg-bg-elevated border border-border-subtle rounded-3xl overflow-hidden shadow-lg relative z-20">
          <div className={`h-52 bg-gradient-to-br ${currentRecipe.bgGradient} flex items-center justify-center relative`}>
            <span className="text-8xl" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))' }}>
              {currentRecipe.emoji}
            </span>
            <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap">
              {currentRecipe.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-black/25 backdrop-blur-sm text-white rounded-pill text-[10px] font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-xl font-extrabold text-text-primary mb-1">{currentRecipe.name}</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{currentRecipe.description}</p>
            
            {/* Stats row */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <p className="font-extrabold text-text-primary text-base">{currentRecipe.prepTime + currentRecipe.cookTime}m</p>
                <p className="text-[10px] text-text-tertiary">Time</p>
              </div>
              <div className="text-center">
                <p className="font-extrabold text-text-primary text-base">{currentRecipe.nutrition.protein}g</p>
                <p className="text-[10px] text-text-tertiary">Protein</p>
              </div>
              <div className="text-center">
                <p className="font-extrabold text-text-primary text-base">{currentRecipe.nutrition.calories}</p>
                <p className="text-[10px] text-text-tertiary">Calories</p>
              </div>
              <div className="text-center">
                <p className="font-extrabold text-success text-base">{currentRecipe.pantryMatch}%</p>
                <p className="text-[10px] text-text-tertiary">In pantry</p>
              </div>
            </div>

            <AICard compact>
              {currentRecipe.aiReason}
            </AICard>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 flex gap-4 justify-center mb-4">
        <button
          onClick={handleReject}
          className="w-16 h-16 rounded-full bg-error-bg border-2 border-error/30 flex items-center justify-center hover:bg-error/20 hover:scale-110 active:scale-90 transition-all shadow-md"
        >
          <X className="w-7 h-7 text-error" />
        </button>
        <button
          onClick={handleAccept}
          className="w-16 h-16 rounded-full bg-success-bg border-2 border-success/30 flex items-center justify-center hover:bg-success/20 hover:scale-110 active:scale-90 transition-all shadow-md"
        >
          <Check className="w-7 h-7 text-success" />
        </button>
      </div>
      <p className="text-center text-xs text-text-tertiary font-semibold mb-4">Swipe ✕ to skip · ✓ to view recipe</p>

      <Button variant="outline" className="mx-5 mb-6" fullWidth onClick={() => navigate('/recommendations/generate')}>
        Regenerate with Filters
      </Button>
    </div>
  );
}
