import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Search, Save } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function UnknownIngredient() {
  const navigate = useNavigate();
  const [val, setVal] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Unknown Item" subtitle="AI couldn't identify this" backRoute="/home" />

      <div className="flex-1 flex flex-col px-6 pt-6">
        <div className="w-full h-48 bg-bg-sunken border-2 border-border-strong rounded-3xl flex items-center justify-center mb-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <HelpCircle className="w-12 h-12 text-text-tertiary relative z-10" />
        </div>
        
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight mb-2">Help AI Learn</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          The camera couldn't recognize this package. What is it?
        </p>

        <div className="w-full space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2">
              Item Name
            </label>
            <div className="flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 focus-within:border-brand-muted transition-colors">
              <Search className="w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="e.g., Homemade Pickles"
                className="flex-1 bg-transparent border-none text-sm font-semibold text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
            </div>
          </div>
          
          <Button fullWidth onClick={() => navigate(-1)} icon={<Save className="w-5 h-5" />} disabled={!val.trim()}>
            Save to Pantry
          </Button>
        </div>
      </div>
    </div>
  );
}
