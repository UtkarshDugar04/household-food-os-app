import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Plus, Minus, FileText, Camera, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';

export default function InventoryHistory() {
  const navigate = useNavigate();

  const historyEvents = [
    { id: 1, type: 'add', source: 'Swiggy Instamart', items: 12, time: '2 hours ago', icon: RefreshCw, color: 'text-brand-sky-500', bg: 'bg-brand-sky-50' },
    { id: 2, type: 'remove', source: 'Cooked Recipe', details: 'Used in Lemon Herb Chicken', items: 3, time: 'Yesterday, 8:30 PM', icon: Minus, color: 'text-text-secondary', bg: 'bg-bg-sunken' },
    { id: 3, type: 'add', source: 'Receipt Scan', items: 24, time: 'Jun 15, 10:15 AM', icon: FileText, color: 'text-brand', bg: 'bg-brand-50' },
    { id: 4, type: 'remove', source: 'Manual Expiry', details: 'Marked 2 items as expired', items: 2, time: 'Jun 12, 9:00 AM', icon: Minus, color: 'text-error', bg: 'bg-error-bg' },
    { id: 5, type: 'add', source: 'Photo Scan', items: 8, time: 'Jun 10, 6:45 PM', icon: Camera, color: 'text-brand-sage-500', bg: 'bg-brand-sage-50' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="History" subtitle="Inventory activity log" backRoute="/pantry" />

      <div className="px-5 pb-8 pt-4">
        <div className="relative border-l-2 border-border-subtle ml-6 space-y-8 pb-4">
          {historyEvents.map((event) => (
            <div key={event.id} className="relative pl-6">
              {/* Timeline dot */}
              <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-bg-base flex items-center justify-center ${event.bg}`}>
                <event.icon className={`w-3.5 h-3.5 ${event.color}`} />
              </div>

              {/* Event card */}
              <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-4 hover:border-border-strong transition-colors cursor-pointer active:scale-[0.99]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-text-primary text-sm">{event.source}</p>
                    <Badge variant={event.type === 'add' ? 'success' : 'neutral'} size="xs">
                      {event.type === 'add' ? '+' : '-'}{event.items} items
                    </Badge>
                  </div>
                </div>
                {event.details && <p className="text-xs text-text-secondary mb-2">{event.details}</p>}
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-tertiary uppercase tracking-widest mt-1">
                  <Clock className="w-3 h-3" /> {event.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
