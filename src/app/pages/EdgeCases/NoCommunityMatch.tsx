import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX, Bell, Map } from 'lucide-react';
import PageHeader from '../../components/core/PageHeader';
import Button from '../../components/core/Button';

export default function NoCommunityMatch() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHeader title="Community Match" subtitle="Sourdough Starter" backRoute="/home" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-bg-sunken flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-text-tertiary" />
        </div>
        
        <h2 className="text-xl font-extrabold text-text-primary tracking-tight mb-2">No matches nearby</h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-[280px]">
          No one within 2km is currently offering <span className="font-bold">Sourdough Starter</span>.
        </p>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={() => navigate('/community')} icon={<Bell className="w-5 h-5" />}>
            Notify me when available
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/community/map')} icon={<Map className="w-5 h-5" />}>
            Expand search radius to 5km
          </Button>
        </div>
      </div>
    </div>
  );
}
