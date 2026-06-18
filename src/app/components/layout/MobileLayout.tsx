import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { BotMessageSquare } from 'lucide-react';

const hideNavRoutes = ['/onboarding', '/ai-chat', '/recipe/cook', '/conflict', '/unknown'];
const hideAIRoutes = ['/onboarding', '/ai-chat'];

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const showNav = !hideNavRoutes.some(route => location.pathname.startsWith(route));
  const showAI = !hideAIRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex justify-center w-full min-h-screen bg-bg-sunken overflow-hidden">
      <div className="w-full max-w-md h-screen flex flex-col relative bg-bg-base shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto scrollbar-hide ${showNav ? 'pb-[80px]' : ''}`}>
          <div key={location.key} className="page-enter">
            <Outlet />
          </div>
        </div>

        {/* AI Assistant FAB */}
        {showAI && (
          <button
            onClick={() => navigate('/ai-chat')}
            className="absolute bottom-[88px] right-4 w-14 h-14 bg-brand text-white rounded-full flex items-center justify-center z-40 shadow-[0_4px_20px_rgba(240,123,12,0.45)] hover:bg-brand-hover hover:shadow-[0_6px_28px_rgba(240,123,12,0.55)] hover:-translate-y-1 active:scale-95 transition-all duration-normal ease-spring"
          >
            <BotMessageSquare className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Navigation */}
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

