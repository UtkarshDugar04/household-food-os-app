import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';
import { ChevronLeft, Camera, Image, Receipt } from 'lucide-react';

export default function InitialScan() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-bg-sunken text-text-secondary">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-1.5 bg-bg-sunken rounded-xl overflow-hidden">
          <div className="h-full bg-brand w-full rounded-xl"></div>
        </div>
        <span className="text-xs font-bold text-text-tertiary">5 OF 6</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary leading-tight mb-2">
          Initial Kitchen Scan
        </h1>
        <p className="text-base text-text-secondary">
          Create your first inventory. How does the app know what you have? Let's find out.
        </p>
      </div>

      <div className="space-y-4 flex-1">
        <Card interactive padding="lg" className="flex flex-col items-center justify-center text-center border-dashed border-2 border-brand bg-brand-50 dark:bg-brand-900/10">
          <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-brand" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-1">Fridge Photo</h3>
          <p className="text-sm text-text-tertiary">Take a quick picture of your open fridge</p>
        </Card>

        <Card interactive padding="md" className="flex items-center gap-4 hover:border-brand transition-colors">
          <div className="w-12 h-12 rounded-xl bg-bg-sunken flex items-center justify-center">
            <Image className="w-6 h-6 text-text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-text-primary">Pantry Photo</h3>
            <p className="text-xs text-text-tertiary">Snap your dry goods</p>
          </div>
        </Card>

        <Card interactive padding="md" className="flex items-center gap-4 hover:border-brand transition-colors">
          <div className="w-12 h-12 rounded-xl bg-bg-sunken flex items-center justify-center">
            <Receipt className="w-6 h-6 text-text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-text-primary">Receipt Upload</h3>
            <p className="text-xs text-text-tertiary">Scan your latest grocery receipt</p>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="mt-8 pb-8 pt-4 bg-bg-base sticky bottom-0 border-t border-border-subtle/50">
        <Button size="lg" fullWidth onClick={() => navigate('/onboarding/confirmation')}>
          Complete Setup
        </Button>
      </div>
    </div>
  );
}
