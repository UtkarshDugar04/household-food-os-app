import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';
import { ChevronLeft, CheckCircle2, Edit2, Trash2 } from 'lucide-react';

export default function InventoryConfirmation() {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { id: 1, name: 'Organic Milk', quantity: '1 Gal', category: 'Dairy' },
    { id: 2, name: 'Eggs', quantity: '1 Dozen', category: 'Dairy' },
    { id: 3, name: 'Whole Wheat Bread', quantity: '1 Loaf', category: 'Bakery' },
    { id: 4, name: 'Apples', quantity: '5 lbs', category: 'Produce' },
    { id: 5, name: 'Chicken Breast', quantity: '2 lbs', category: 'Meat' },
  ]);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

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
        <span className="text-xs font-bold text-text-tertiary">6 OF 6</span>
      </div>

      <div className="mb-6 text-center">
        <div className="w-20 h-20 bg-success-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary leading-tight mb-2">
          Scan Complete!
        </h1>
        <p className="text-base text-text-secondary">
          We found {items.length} items in your latest scan. Please review and confirm.
        </p>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4">
        {items.map(item => (
          <Card key={item.id} padding="md" className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-text-primary">{item.name}</h3>
              <p className="text-xs text-text-tertiary">{item.quantity} • {item.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-text-secondary hover:text-brand hover:bg-brand-50 rounded-full transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => removeItem(item.id)} className="p-2 text-text-secondary hover:text-error hover:bg-error-bg rounded-full transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
        
        <button className="w-full py-4 text-brand font-bold text-sm hover:bg-brand-50 rounded-xl transition-colors border border-dashed border-brand">
          + Add Missing Item
        </button>
      </div>

      {/* CTA Section */}
      <div className="mt-4 pb-8 pt-4 bg-bg-base sticky bottom-0 border-t border-border-subtle/50">
        <Button size="lg" fullWidth onClick={() => navigate('/home')}>
          Confirm & Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
