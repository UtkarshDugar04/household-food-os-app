import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Edit2, Trash2, Zap, Save, AlertTriangle, Plus } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';
import Card from '../../components/core/Card';

export default function InventoryReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const isImport = location.state?.isImport || false;

  const [items, setItems] = useState([
    { id: 1, name: 'Amul Milk', category: 'Dairy', quantity: '2', unit: 'Liters', confidence: 'High' },
    { id: 2, name: 'Britannia Bread', category: 'Bakery', quantity: '1', unit: 'Pack', confidence: 'High' },
    { id: 3, name: 'Eggs', category: 'Dairy', quantity: '12', unit: 'Pieces', confidence: 'High' },
    { id: 4, name: 'Tomatoes', category: 'Produce', quantity: '1', unit: 'kg', confidence: 'Medium' },
    { id: 5, name: 'Chicken Breast', category: 'Protein', quantity: '500', unit: 'g', confidence: 'High' },
  ]);

  const [missingItems, setMissingItems] = useState(
    isImport ? [
      { id: 101, name: 'Onions', category: 'Produce', quantity: '1', unit: 'kg' },
      { id: 102, name: 'Garlic', category: 'Produce', quantity: '250', unit: 'g' },
      { id: 103, name: 'Spinach', category: 'Produce', quantity: '1', unit: 'Bunch' },
    ] : []
  );

  const [saving, setSaving] = useState(false);

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const addMissingItem = (id: number) => {
    const item = missingItems.find(i => i.id === id);
    if (item) {
      setItems([...items, { ...item, confidence: 'High' }]);
      setMissingItems(missingItems.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      navigate('/pantry');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader
        title="Review Items"
        subtitle={`${items.length} items detected`}
        backRoute="/pantry"
        rightElement={<Button variant="ghost" size="sm" onClick={() => navigate('/pantry/add')}>Add Manual</Button>}
      />

      <div className="px-5 pb-8 flex flex-col gap-4 pt-2 flex-1">
        <div className="bg-brand-sky-50 border border-brand-sky-200 rounded-2xl p-4 flex gap-3 items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-sky-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-brand-sky-600" />
          </div>
          <p className="text-sm font-bold text-brand-sky-800">
            AI has automatically categorized items and predicted expiry dates.
          </p>
        </div>

        {missingItems.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <h2 className="text-sm font-extrabold text-text-primary">Detected Missing from History</h2>
            </div>
            <div className="flex flex-col gap-2">
              {missingItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-warning-bg/30 border border-warning/20 rounded-xl px-4 py-3">
                  <div>
                    <p className="font-bold text-text-primary text-sm">{item.name}</p>
                    <p className="text-xs text-text-secondary">{item.quantity} {item.unit}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => addMissingItem(item.id)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold text-text-primary">Detected Items</h2>
          {items.map(item => (
            <Card key={item.id} padding="md" className={item.confidence === 'Low' ? 'border-warning/50 bg-warning-bg/30' : ''}>
              <div className="flex gap-3 items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-extrabold text-text-primary text-base truncate">{item.name}</p>
                    {item.confidence === 'Low' && (
                      <span className="px-2 py-0.5 bg-warning-bg text-warning rounded-pill text-[10px] font-bold flex-shrink-0">Needs verification</span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary truncate">{item.quantity} {item.unit} · {item.category}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="w-8 h-8 rounded-full bg-bg-sunken flex items-center justify-center text-text-tertiary hover:bg-bg-elevated transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-error-bg flex items-center justify-center text-error hover:bg-error/20 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-5 bg-bg-base border-t border-border-subtle sticky bottom-0 z-10 pb-safe">
        <Button size="lg" fullWidth icon={<Save className="w-5 h-5" />} onClick={handleSave} disabled={saving}>
          {saving ? 'Adding to Pantry...' : `Save ${items.length} Items to Pantry`}
        </Button>
      </div>
    </div>
  );
}
