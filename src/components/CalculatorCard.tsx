import { Calculator, Scale, Apple, Dumbbell, ArrowRight } from 'lucide-react';
import { CalculatorConfig } from '../types';

interface CalculatorCardProps {
  key?: string | number;
  config: CalculatorConfig;
  onNavigate: (path: string) => void;
}

export default function CalculatorCard({ config, onNavigate }: CalculatorCardProps) {
  // Map categories to dynamic styles and icons
  const catDetails = {
    'weight-management': {
      bg: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400',
      border: 'hover:border-amber-200 dark:hover:border-amber-900/40',
      label: 'Weight Management',
      icon: Scale
    },
    'nutrition': {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400',
      border: 'hover:border-emerald-200 dark:hover:border-emerald-900/40',
      label: 'Nutrition & Macros',
      icon: Apple
    },
    'fitness-performance': {
      bg: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400',
      border: 'hover:border-blue-200 dark:hover:border-blue-900/40',
      label: 'Fitness Performance',
      icon: Dumbbell
    }
  }[config.category] || {
    bg: 'bg-gray-50 text-gray-700',
    border: 'hover:border-gray-200',
    label: 'Health Metric',
    icon: Calculator
  };

  const IconComponent = catDetails.icon;

  return (
    <button
      onClick={() => onNavigate(`/calculators/${config.slug}`)}
      className={`group w-full text-left bg-white dark:bg-gray-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${catDetails.border}`}
      id={`calculator-card-${config.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`p-3 rounded-xl shrink-0 ${catDetails.bg}`}>
          <IconComponent className="h-6 w-6" />
        </div>
        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-gray-900 text-slate-500 dark:text-gray-400 rounded-md">
          {catDetails.label}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {config.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {config.shortDescription}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-gray-900 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <span>Open Calculator</span>
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
      </div>
    </button>
  );
}
