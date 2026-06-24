import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center text-sm font-medium text-slate-500">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer animate-fade-in"
        id="breadcrumb-home"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="mx-2 h-3.5 w-3.5 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="text-slate-850 font-bold max-w-[200px] truncate" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.path!)}
                className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer max-w-[200px] truncate"
                id={`breadcrumb-item-${index}`}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
