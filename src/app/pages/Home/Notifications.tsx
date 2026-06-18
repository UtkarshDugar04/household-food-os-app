import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Badge from '../../components/core/Badge';
import { notifications } from '../../data/mockData';

const typeColors: Record<string, string> = {
  expiry: 'bg-warning-bg',
  nutrition: 'bg-brand-sky-50',
  shopping: 'bg-info-bg',
  community: 'bg-success-bg',
  ai: 'bg-brand-plum-50',
};

const typeIcons: Record<string, string> = {
  expiry: '⏰',
  nutrition: '💪',
  shopping: '🛒',
  community: '👥',
  ai: '✨',
};

export default function Notifications() {
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHeader
        title="Notifications"
        subtitle={`${unread.length} unread`}
        backRoute="/home"
        rightElement={
          <button className="text-xs font-bold text-brand">Mark all read</button>
        }
      />

      <div className="px-5 pb-6">
        {unread.length > 0 && (
          <div className="mb-5">
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">New</p>
            <div className="flex flex-col gap-2.5">
              {unread.map(n => (
                <button
                  key={n.id}
                  onClick={() => n.actionRoute && navigate(n.actionRoute)}
                  className={`w-full flex items-start gap-3 ${typeColors[n.type]} rounded-2xl p-4 border border-transparent hover:border-border-subtle active:scale-[0.99] transition-all text-left`}
                >
                  <span className="text-xl mt-0.5">{typeIcons[n.type]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="font-bold text-text-primary text-sm flex-1 leading-snug">{n.title}</p>
                      {n.urgent && <span className="w-2 h-2 rounded-full bg-error flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{n.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-text-tertiary font-medium">{n.time}</span>
                      {n.actionLabel && (
                        <span className="text-xs font-bold text-brand flex items-center gap-0.5">
                          {n.actionLabel} <ChevronRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {read.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3">Earlier</p>
            <div className="flex flex-col gap-2">
              {read.map(n => (
                <button
                  key={n.id}
                  onClick={() => n.actionRoute && navigate(n.actionRoute)}
                  className="w-full flex items-start gap-3 bg-bg-elevated border border-border-subtle rounded-2xl p-3.5 hover:border-border-strong active:scale-[0.99] transition-all text-left opacity-75"
                >
                  <span className="text-lg mt-0.5">{typeIcons[n.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-secondary text-sm leading-snug">{n.title}</p>
                    <p className="text-[10px] text-text-tertiary mt-0.5">{n.time}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
