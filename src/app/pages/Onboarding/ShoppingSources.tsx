import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';
import { ChevronLeft, Store, Search, Check } from 'lucide-react';

export default function ShoppingSources() {
  const navigate = useNavigate();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const sources = [
    { id: 'whole-foods', name: 'Whole Foods Market', type: 'Supermarket' },
    { id: 'trader-joes', name: 'Trader Joe\'s', type: 'Supermarket' },
    { id: 'local-farmers', name: 'Local Farmers Market', type: 'Fresh Produce' },
    { id: 'costco', name: 'Costco Wholesale', type: 'Bulk' },
    { id: 'target', name: 'Target', type: 'Supermarket' },
  ];

  const toggleSource = (id: string) => {
    setSelectedSources(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-bg-sunken text-text-secondary">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-1.5 bg-bg-sunken rounded-xl overflow-hidden">
          <div className="h-full bg-brand w-[80%] rounded-xl"></div>
        </div>
        <span className="text-xs font-bold text-text-tertiary">4 OF 6</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary leading-tight mb-2">
          Where do you usually shop?
        </h1>
        <p className="text-base text-text-secondary">
          This helps us optimize your shopping lists and recommend products available near you.
        </p>
      </div>

      <div className="flex items-center gap-3 bg-bg-sunken border border-border-subtle rounded-xl px-4 py-3 mb-6 focus-within:border-brand-muted transition-colors">
        <Search className="h-5 w-5 text-text-tertiary" />
        <input 
          type="text"
          className="w-full bg-transparent text-text-primary placeholder-text-tertiary focus:outline-none"
          placeholder="Search stores..."
        />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4">
        {sources.map(source => {
          const isSelected = selectedSources.includes(source.id);
          return (
            <Card 
              key={source.id}
              interactive 
              padding="md" 
              className={`flex items-center gap-4 transition-colors ${isSelected ? 'border-brand bg-brand-50 dark:bg-brand-900/10' : 'hover:border-border-strong'}`}
              onClick={() => toggleSource(source.id)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-brand text-text-on-brand' : 'bg-bg-sunken text-text-secondary'}`}>
                <Store className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-text-primary">{source.name}</h3>
                <p className="text-xs text-text-tertiary">{source.type}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'border-brand bg-brand' : 'border-border-strong'}`}>
                {isSelected && <Check className="w-4 h-4 text-text-on-brand" />}
              </div>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="mt-4 pb-8 pt-4 bg-bg-base sticky bottom-0 border-t border-border-subtle/50">
        <Button size="lg" fullWidth onClick={() => navigate('/onboarding/scan')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
