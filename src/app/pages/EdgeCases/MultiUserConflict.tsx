import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Info, Plus } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function MultiUserConflict() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Sync Issue" subtitle="Household Conflict" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-warning-bg border-4 border-warning/20 flex items-center justify-center mb-6">
          <Users className="w-10 h-10 text-warning" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-3">Double Addition</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-[280px]">
          Rahul just added <span className="font-bold text-text-primary">Amul Milk (1L)</span> 5 minutes ago. Are you adding a second packet or was this a duplicate scan?
        </p>

        <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 w-full mb-8 text-left">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">Current Inventory</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥛</span>
              <span className="font-bold text-text-primary">Amul Milk</span>
            </div>
            <span className="text-sm font-extrabold text-text-secondary">1L</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={() => navigate(-1)} icon={<Plus className="w-5 h-5" />}>
            Yes, add another (+1L)
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
            Duplicate, cancel mine
          </Button>
        </div>
      </div>
    </div>
  );
}
