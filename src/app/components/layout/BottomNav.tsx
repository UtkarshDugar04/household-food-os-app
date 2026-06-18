import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Package, Calendar, Users } from 'lucide-react';

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/pantry', icon: Package, label: 'Pantry' },
  { to: '/planner', icon: Calendar, label: 'Planner' },
  { to: '/community', icon: Users, label: 'Community' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-nav-bg border-t border-nav-border pb-[env(safe-area-inset-bottom)] z-50 nav-blur shadow-[0_-4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center w-full px-6 pt-2 pb-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center p-2 transition-all duration-normal relative"
            >
              <div className={`flex flex-col items-center gap-1.5 transition-all duration-normal ${isActive ? 'scale-105' : 'scale-100 opacity-60 hover:opacity-80'}`}>
                <item.icon
                  className={`w-5 h-5 relative z-10 transition-colors duration-normal ${
                    isActive ? 'text-text-primary' : 'text-text-primary'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] leading-none font-bold relative z-10 transition-colors duration-normal ${
                  isActive ? 'text-text-primary' : 'text-text-primary'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-2 w-1 h-1 rounded-full bg-text-primary" />
                )}
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
