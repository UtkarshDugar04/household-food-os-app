import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, Trash2, Heart, Share2 } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function ExpiredItemConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Pantry Action" subtitle="Item Expired" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-error-bg border-4 border-error/20 flex items-center justify-center mb-6">
          <AlertOctagon className="w-10 h-10 text-error" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-2">Did you throw this away?</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-[280px]">
          According to our records, the <span className="font-bold text-text-primary">Whole Milk (1L)</span> expired 2 days ago.
        </p>

        <div className="w-full space-y-3">
          <Button variant="danger" fullWidth onClick={() => navigate('/pantry')} icon={<Trash2 className="w-5 h-5" />}>
            Yes, I tossed it
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/pantry')}>
            No, it's still good
          </Button>
        </div>

        <div className="mt-8 bg-brand-plum-50 border border-brand-plum-200 rounded-2xl p-5 w-full text-left">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-brand-plum-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-brand-plum-900 text-sm mb-1">Prevent Future Waste</p>
              <p className="text-xs text-brand-plum-800 leading-relaxed mb-3">
                Next time, if you can't finish an item before expiry, share it with a neighbor!
              </p>
              <Button size="sm" variant="outline" className="bg-white border-brand-plum-200 text-brand-plum-700 w-full" onClick={() => navigate('/community/create')} icon={<Share2 className="w-4 h-4" />}>
                Learn about Sharing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
