import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ChevronRight, Filter } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import { pantryItems } from '../../data/mockData';

export default function CategoryView() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || 'Produce';

  const [search, setSearch] = useState('');
  
  const items = pantryItems.filter(i => i.category === category && (search === '' || i.name.toLowerCase().includes(search.toLowerCase())));

  const getExpiryVariant = (days: number) => {
    if (days <= 1) return 'critical';
    if (days <= 3) return 'expiring';
    if (days <= 7) return 'warning';
    return 'neutral';
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title={category} subtitle={`${items.length} items`} backRoute="/pantry" />

      <div className="px-5 pb-6 pt-2">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${category}...`}
              className="w-full bg-bg-sunken border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-muted transition-colors"
            />
          </div>
          <button className="w-11 h-11 rounded-2xl bg-bg-sunken border border-border-subtle flex items-center justify-center text-text-secondary hover:border-border-strong transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => navigate('/pantry/item', { state: { item } })}
              className="flex items-center gap-3.5 bg-bg-elevated border border-border-subtle rounded-2xl px-4 py-3 hover:border-border-strong hover:shadow-sm active:scale-[0.99] transition-all text-left"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-text-primary text-sm truncate">{item.name}</p>
                <p className="text-xs text-text-tertiary font-medium">{item.quantity} {item.unit}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={getExpiryVariant(item.expiryDays)} size="xs">
                  {item.expiryDays === 0 ? 'Today!' : item.expiryDays === 1 ? 'Tomorrow' : item.expiryDays <= 7 ? `${item.expiryDays}d` : item.expiryDate}
                </Badge>
              </div>
              <ChevronRight className="w-4 h-4 text-text-tertiary ml-1" />
            </button>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-bold text-text-primary">No items found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
