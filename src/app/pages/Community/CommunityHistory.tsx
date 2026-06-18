import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowUpRight, ArrowDownLeft, ChevronLeft } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';

export default function CommunityHistory() {
  const navigate = useNavigate();

  const history = [
    { id: 1, type: 'given', item: 'Fresh Tomatoes', user: 'Priya K.', date: 'Today, 2:30 PM', emoji: '🍅' },
    { id: 2, type: 'received', item: 'Sourdough Starter', user: 'Rahul A.', date: 'Yesterday', emoji: '🍞' },
    { id: 3, type: 'given', item: 'Extra Apples', user: 'Amit S.', date: 'Jun 14', emoji: '🍎' },
    { id: 4, type: 'given', item: 'Unopened Milk', user: 'Neha M.', date: 'Jun 10', emoji: '🥛' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Exchange History" subtitle="Your Community Impact" backRoute="/community" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        {/* Total Impact */}
        <div className="bg-gradient-to-br from-brand-plum-500 to-brand-plum-700 rounded-3xl p-5 text-white flex items-center justify-between shadow-md">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Heart className="w-4 h-4 text-brand-plum-200 fill-current" />
              <p className="text-xs font-bold text-brand-plum-200 uppercase tracking-widest">Total Shared</p>
            </div>
            <p className="text-4xl font-extrabold mb-1">14 <span className="text-xl font-bold text-brand-plum-200">items</span></p>
            <p className="text-sm text-brand-plum-100">~6.5 kg of food rescued</p>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {history.map(exchange => (
            <div key={exchange.id} className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 flex gap-4 items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                exchange.type === 'given' ? 'bg-success-bg border border-success/20' : 'bg-info-bg border border-info/20'
              }`}>
                <span className="text-2xl">{exchange.emoji}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-extrabold text-text-primary text-sm">{exchange.item}</p>
                  <Badge variant={exchange.type === 'given' ? 'success' : 'info'} size="xs">
                    {exchange.type === 'given' ? 'Gave' : 'Received'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  {exchange.type === 'given' ? <ArrowUpRight className="w-3.5 h-3.5 text-success" /> : <ArrowDownLeft className="w-3.5 h-3.5 text-info" />}
                  <span className="font-semibold">{exchange.user}</span>
                  <span className="text-text-tertiary">· {exchange.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
