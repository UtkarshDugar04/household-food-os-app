import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Badge from '../../components/core/Badge';
import PageHeader from '../../components/core/PageHeader';
import { pantryItems } from '../../data/mockData';

const tabs = ['All', 'Expiring', 'Critical', 'By Location'];

export default function InventoryList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = pantryItems
    .filter(item => {
      if (search) return item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
      if (activeTab === 'Expiring') return item.expiryDays <= 5 && item.expiryDays >= 0;
      if (activeTab === 'Critical') return item.expiryDays <= 1 && item.expiryDays >= 0;
      return true;
    })
    .sort((a, b) => a.expiryDays - b.expiryDays);

  const getExpiryVariant = (days: number) => {
    if (days <= 1) return 'critical';
    if (days <= 3) return 'expiring';
    if (days <= 7) return 'warning';
    return 'neutral';
  };

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader title="Inventory" subtitle={`${pantryItems.length} items tracked`} backRoute="/pantry" />
      
      <div className="px-5 mb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-bg-sunken border border-border-subtle rounded-2xl py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-muted transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-bg-sunken text-text-secondary hover:bg-bg-elevated'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Item List */}
      <div className="px-5 flex flex-col gap-2 pb-6">
        {filtered.map(item => (
          <button
            key={item.id}
            onClick={() => navigate('/pantry/item', { state: { item } })}
            className="flex items-center gap-3.5 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 hover:border-border-strong hover:shadow-sm active:scale-[0.99] transition-all text-left"
          >
            <span className="text-2xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-text-primary text-sm truncate">{item.name}</p>
              </div>
              <p className="text-xs text-text-tertiary font-medium">{item.quantity} {item.unit} · {item.category}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={getExpiryVariant(item.expiryDays)} size="xs">
                {item.expiryDays === 0 ? 'Today!' : item.expiryDays === 1 ? 'Tomorrow' : item.expiryDays <= 7 ? `${item.expiryDays}d` : item.expiryDate}
              </Badge>
              <span className="text-[10px] text-text-tertiary capitalize">{item.location}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold text-text-primary">No items found</p>
            <p className="text-sm text-text-secondary mt-1">Try a different search</p>
          </div>
        )}
      </div>
    </div>
  );
}
