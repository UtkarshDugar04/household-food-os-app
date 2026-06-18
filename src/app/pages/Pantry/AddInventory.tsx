import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Tag, Calendar, MapPin, Save, AlignLeft } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function AddInventory() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Produce',
    quantity: '1',
    unit: 'Pieces',
    expiryDate: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    location: 'Fridge',
    notes: ''
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      navigate('/pantry');
    }, 1200);
  };

  const categories = ['Produce', 'Dairy', 'Protein', 'Pantry', 'Frozen', 'Snacks', 'Beverages'];
  const locations = ['Fridge', 'Freezer', 'Pantry Shelf', 'Countertop'];
  const units = ['Pieces', 'kg', 'g', 'Liters', 'ml', 'Pack', 'Bunch'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Add Manual Item" subtitle="Inventory Entry" backRoute="/pantry" />

      <div className="px-5 pt-4 flex-1 flex flex-col gap-6 overflow-y-auto pb-24">
        
        {/* Name Input */}
        <div>
          <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2">Item Name</label>
          <input 
            type="text" 
            placeholder="e.g. Fresh Tomatoes" 
            className="w-full bg-bg-sunken border border-border-subtle rounded-2xl p-4 font-bold text-text-primary text-base placeholder:text-text-tertiary focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all shadow-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Category</label>
            <select 
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-3 font-medium text-text-primary outline-none focus:border-brand transition-all shadow-sm appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Storage</label>
            <select 
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-3 font-medium text-text-primary outline-none focus:border-brand transition-all shadow-sm appearance-none"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            >
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5">Quantity</label>
            <input 
              type="number" 
              placeholder="0" 
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-3 font-bold text-text-primary outline-none focus:border-brand transition-all shadow-sm"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5">Unit</label>
            <select 
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-3 font-medium text-text-primary outline-none focus:border-brand transition-all shadow-sm appearance-none"
              value={formData.unit}
              onChange={(e) => setFormData({...formData, unit: e.target.value})}
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Expiry Date</label>
            <input 
              type="date" 
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-3 font-medium text-text-primary outline-none focus:border-brand transition-all shadow-sm"
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Purchased</label>
            <input 
              type="date" 
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-3 font-medium text-text-primary outline-none focus:border-brand transition-all shadow-sm"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-extrabold text-text-tertiary uppercase tracking-widest mb-2 flex items-center gap-1.5"><AlignLeft className="w-3.5 h-3.5" /> Notes (Optional)</label>
          <textarea 
            placeholder="e.g. Keep away from apples" 
            className="w-full bg-bg-sunken border border-border-subtle rounded-xl p-4 font-medium text-text-primary placeholder:text-text-tertiary focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all shadow-sm resize-none h-24"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>
      </div>

      <div className="p-5 bg-bg-base border-t border-border-subtle fixed bottom-0 inset-x-0 z-10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Button size="lg" fullWidth icon={<Save className="w-5 h-5" />} onClick={handleSave} disabled={saving || !formData.name}>
          {saving ? 'Saving...' : 'Save Item'}
        </Button>
      </div>
    </div>
  );
}
