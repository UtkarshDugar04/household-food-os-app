import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, AlertTriangle, CheckCircle2, Camera, FileText, 
  Package, ChevronRight, Sparkles, TrendingUp, Filter, Mic, ChevronDown, ChevronUp
} from 'lucide-react';
import Card from '../../components/core/Card';
import Button from '../../components/core/Button';
import Badge from '../../components/core/Badge';
import AICard from '../../components/core/AICard';
import { pantryItems, getCategoryCount } from '../../data/mockData';

const categoryMeta: Record<string, { emoji: string; color: string; bg: string }> = {
  Vegetables: { emoji: '🥦', color: 'text-text-primary', bg: 'bg-brand-sage-50/50' },
  Protein: { emoji: '🍗', color: 'text-text-primary', bg: 'bg-brand-coral-50/50' },
  Dairy: { emoji: '🥛', color: 'text-text-primary', bg: 'bg-brand-sky-50/50' },
  Staples: { emoji: '🌾', color: 'text-text-primary', bg: 'bg-brand-zest-50/50' },
  Condiments: { emoji: '🫙', color: 'text-text-primary', bg: 'bg-brand-plum-50/50' },
  Beverages: { emoji: '☕', color: 'text-text-primary', bg: 'bg-info-bg/50' },
  Snacks: { emoji: '🥜', color: 'text-text-primary', bg: 'bg-warning-bg/50' },
};

const expiringCount = pantryItems.filter(i => i.expiryDays <= 3 && i.expiryDays >= 0).length;
const categoryCounts = getCategoryCount();

export default function PantryOverview() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const addOptions = [
    { icon: Camera, label: 'Photo Scan', sub: 'Take a photo of items', route: '/pantry/photo', color: 'text-brand', bg: 'bg-brand-sage-50' },
    { icon: FileText, label: 'Receipt Scan', sub: 'Scan grocery receipt', route: '/pantry/receipt', color: 'text-success', bg: 'bg-success-bg' },
    { icon: Package, label: 'Import Order', sub: 'BigBasket, Zepto etc.', route: '/pantry/import', color: 'text-info', bg: 'bg-info-bg' },
    { icon: Mic, label: 'Voice Add', sub: 'Just say what you bought', route: '/pantry/voice', color: 'text-brand-plum-600', bg: 'bg-brand-plum-50' },
    { icon: Plus, label: 'Manual Entry', sub: 'Enter item details', route: '/pantry/add', color: 'text-text-secondary', bg: 'bg-bg-elevated' },
  ];

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      {/* ---- HEADER ---- */}
      <div className="px-5 pt-6 pb-4 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-0.5">Your</p>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Pantry</h1>
          <p className="text-sm text-text-secondary mt-0.5">{pantryItems.length} items · Household Memory</p>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => navigate('/pantry/list')}
            className="w-10 h-10 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-all"
          >
            <Filter className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* ---- PANTRY ENTRY HERO ---- */}
      <div className="px-5 mb-4">
        <button 
          onClick={() => setIsBottomSheetOpen(true)}
          className="w-full p-5 flex items-center justify-between text-left illustration-container rounded-[24px] bg-brand-sage-50/40 border border-border-subtle shadow-sm hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 ease-in-out focus:outline-none overflow-hidden relative"
        >
          <div className="flex items-center gap-4 z-10">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-border-subtle relative">
              <span className="text-2xl food-glow">🛒</span>
            </div>
            <div>
              <p className="text-lg font-extrabold text-text-primary leading-tight mb-0.5">Add Ingredients</p>
              <p className="text-xs font-medium text-text-secondary">Keep your pantry up to date</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-text-tertiary z-10 shadow-sm border border-border-subtle">
            <Plus className="w-5 h-5 text-brand" />
          </div>
          <div className="absolute right-0 top-0 opacity-[0.03] text-8xl translate-x-1/4 -translate-y-1/4 pointer-events-none">🥬</div>
        </button>
      </div>

      {/* ---- SEARCH ---- */}
      <div className="px-5 mb-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-tertiary pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search your pantry..."
            className="w-full bg-bg-sunken border border-border-subtle rounded-2xl py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-muted focus:ring-2 focus:ring-brand/10 transition-all font-medium shadow-sm"
          />
        </div>
      </div>

      {/* ---- PANTRY STATUS HERO ---- */}
      <div className="px-5 mb-8 mt-2">
        <button
          onClick={() => navigate('/pantry/list')}
          className="w-full text-left illustration-container rounded-[24px] p-5 flex flex-col hover:-translate-y-0.5 active:scale-[0.98] transition-transform relative"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-white/60 shadow-sm flex items-center justify-center flex-shrink-0 border border-border-subtle z-10">
              <span className="text-2xl food-glow">🍯</span>
            </div>
            <div className="flex-1 z-10">
              <p className="text-sm font-bold text-text-primary leading-snug">
                Your pantry is well-stocked and humming.
              </p>
              <p className="text-xs text-text-secondary mt-1">
                <strong className="text-text-primary">{pantryItems.length} items</strong> tracked · Scanned 2h ago
              </p>
            </div>
          </div>
          
          {expiringCount > 0 && (
            <div 
              className="bg-warning/10 border border-warning/20 rounded-xl px-4 py-3 flex items-center justify-between z-10 group/expiry"
              onClick={(e) => { e.stopPropagation(); navigate('/pantry/expiry'); }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl food-glow">🍌</span>
                <p className="text-xs font-bold text-warning" style={{ filter: 'brightness(0.7)' }}>Let's use {expiringCount} items soon.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-warning" style={{ filter: 'brightness(0.7)' }} />
            </div>
          )}
          <div className="absolute right-0 top-0 opacity-[0.03] text-9xl translate-x-1/4 -translate-y-1/4 pointer-events-none">🍯</div>
        </button>
      </div>

      {/* ---- CATEGORIES ---- */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-extrabold text-text-primary">Categories</h2>
          <button
            onClick={() => navigate('/pantry/list')}
            className="text-xs font-bold text-brand flex items-center gap-0.5 hover:underline"
          >
            All items <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {Object.entries(categoryMeta).map(([cat, meta]) => (
            <button
              key={cat}
              onClick={() => navigate('/pantry/category', { state: { category: cat } })}
              className={`${meta.bg} border border-border-subtle rounded-2xl p-4 flex items-center gap-3 hover:shadow-sm active:scale-[0.98] transition-all text-left`}
            >
              <span className="text-3xl drop-shadow-sm">{meta.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm ${meta.color}`}>{cat}</p>
                <p className="text-xs text-text-tertiary font-medium mt-0.5">{categoryCounts[cat] || 0} items</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-tertiary/50" />
            </button>
          ))}
        </div>
      </div>

      {/* ---- QUICK EXPIRY PREVIEW ---- */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-extrabold text-text-primary">Expiring Soon</h2>
          <button
            onClick={() => navigate('/pantry/expiry')}
            className="text-xs font-bold text-brand flex items-center gap-0.5 hover:underline"
          >
            See timeline <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {pantryItems
            .filter(i => i.expiryDays <= 5 && i.expiryDays >= 0)
            .slice(0, 4)
            .map(item => (
              <button
                key={item.id}
                onClick={() => navigate('/pantry/item', { state: { item } })}
                className="flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-xl px-3.5 py-2.5 hover:border-border-strong hover:shadow-sm active:scale-[0.99] transition-all text-left"
              >
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-sm">{item.name}</p>
                  <p className="text-xs text-text-tertiary">{item.quantity} {item.unit}</p>
                </div>
                <Badge
                  variant={item.expiryDays <= 1 ? 'critical' : item.expiryDays <= 3 ? 'expiring' : 'neutral'}
                  size="xs"
                >
                  {item.expiryDays === 0 ? 'Today' : item.expiryDays === 1 ? 'Tomorrow' : `${item.expiryDays}d`}
                </Badge>
              </button>
            ))}
        </div>
      </div>
      {/* ---- ADD INGREDIENTS BOTTOM SHEET ---- */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-text-primary/40 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsBottomSheetOpen(false)}
          ></div>
          
          {/* Sheet */}
          <div className="relative bg-bg-base w-full rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pt-3 pb-12 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-border-strong rounded-full opacity-50"></div>
            </div>
            <div className="px-5">
              <h2 className="text-xl font-extrabold text-text-primary mb-1 tracking-tight">Add Ingredients</h2>
              <p className="text-sm text-text-secondary mb-5">Choose how you'd like to update your pantry.</p>
              
              <div className="flex flex-col gap-3">
                {addOptions.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => { setIsBottomSheetOpen(false); navigate(opt.route); }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-bg-sunken border border-border-subtle hover:border-border-strong hover:bg-bg-elevated active:scale-[0.98] transition-all text-left group"
                  >
                    <div className={`w-12 h-12 rounded-full ${opt.bg} flex items-center justify-center flex-shrink-0 shadow-sm border border-border-subtle group-hover:scale-105 transition-transform`}>
                      <opt.icon className={`w-5 h-5 ${opt.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-text-primary leading-tight mb-0.5">{opt.label}</p>
                      <p className="text-xs font-medium text-text-tertiary truncate">{opt.sub}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary/40 group-hover:text-text-tertiary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
