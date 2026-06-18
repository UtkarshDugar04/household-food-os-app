import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageOpen, Camera, ShoppingBag, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function EmptyPantryState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Pantry" subtitle="0 items" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-bg-sunken flex items-center justify-center mb-6">
          <PackageOpen className="w-12 h-12 text-text-tertiary" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-2">Your pantry is empty</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-[280px]">
          Add items to your inventory so AI can start generating personalized meal plans and smart shopping lists.
        </p>

        <div className="w-full space-y-3">
          <button onClick={() => navigate('/pantry/scan')} className="w-full flex items-center p-4 bg-brand text-white rounded-2xl shadow-sm hover:bg-brand-hover transition-colors text-left group">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Scan Kitchen</p>
              <p className="text-xs text-white/80 mt-0.5">Fastest way to start</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
          </button>

          <button onClick={() => navigate('/pantry/import')} className="w-full flex items-center p-4 bg-bg-elevated border border-border-subtle rounded-2xl hover:border-brand-muted transition-colors text-left group">
            <div className="w-10 h-10 rounded-full bg-brand-plum-50 flex items-center justify-center mr-4">
              <ShoppingBag className="w-5 h-5 text-brand-plum-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-text-primary text-sm">Sync Grocery Apps</p>
              <p className="text-xs text-text-secondary mt-0.5">Import past orders automatically</p>
            </div>
            <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
