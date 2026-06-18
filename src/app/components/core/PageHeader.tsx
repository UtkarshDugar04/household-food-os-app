import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backRoute?: string;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export default function PageHeader({ title, subtitle, backRoute, rightElement, transparent = false }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center gap-3 px-5 pt-5 pb-3 ${transparent ? '' : 'bg-bg-base'}`}>
      {backRoute !== undefined && (
        <button
          onClick={() => backRoute ? navigate(backRoute) : navigate(-1)}
          className="w-9 h-9 rounded-full bg-bg-sunken flex items-center justify-center text-text-secondary hover:bg-bg-elevated hover:text-text-primary active:scale-90 transition-all duration-fast ease-spring flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-extrabold text-text-primary tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-text-tertiary mt-0.5 font-medium">{subtitle}</p>}
      </div>
      {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
    </div>
  );
}
