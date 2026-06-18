import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Shield, Database, Bell, LogOut, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function Settings() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'App Preferences',
      items: [
        { icon: Moon, label: 'Appearance', value: 'Dark Mode' },
        { icon: Bell, label: 'Push Notifications', value: 'Enabled' },
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        { icon: Database, label: 'Export Data', value: '' },
        { icon: Shield, label: 'Privacy Policy', value: '' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Settings" subtitle="App & Account" backRoute="/profile" />

      <div className="px-5 pb-8 pt-4 flex flex-col gap-6">
        {sections.map(section => (
          <div key={section.title}>
            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-3 pl-1">{section.title}</p>
            <div className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between p-4 bg-transparent hover:bg-bg-sunken transition-colors ${
                    i !== section.items.length - 1 ? 'border-b border-border-subtle' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-text-secondary" />
                    <span className="font-bold text-text-primary text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs text-text-tertiary font-semibold">{item.value}</span>}
                    <ChevronRight className="w-4 h-4 text-text-tertiary" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4">
          <Button variant="danger" fullWidth icon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
          <p className="text-center text-[10px] text-text-tertiary mt-4">Household Food OS v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
