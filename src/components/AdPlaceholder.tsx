import { useState } from 'react';
import { Sparkles, Eye, EyeOff, ShieldAlert } from 'lucide-react';

interface AdPlaceholderProps {
  type: 'top-banner' | 'in-content' | 'sidebar' | 'footer-anchor';
  className?: string;
}

export default function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
  const [showMockAd, setShowMockAd] = useState(true);

  // Configure standard AdSense sizes
  const config = {
    'top-banner': {
      label: 'Leaderboard Banner',
      dims: '728 × 90 px (Mobile: 320 × 50 px)',
      placement: 'Above the Fold / Header Area',
      policyNote: 'Complies with AdSense policy by ensuring main text remains visible above the fold on mobile.',
      bg: 'bg-gradient-to-r from-gray-50 to-emerald-50/20 border-emerald-100 dark:border-emerald-900/30'
    },
    'in-content': {
      label: 'In-Article Medium Rectangle',
      dims: '300 × 250 px / 336 × 280 px',
      placement: 'Between Formula and FAQ Sections',
      policyNote: 'Provides high CTR while clearly separated from text to avoid accidental clicks.',
      bg: 'bg-gradient-to-br from-gray-50 to-blue-50/20 border-blue-100 dark:border-blue-900/30'
    },
    'sidebar': {
      label: 'Sidebar Half-Page Skyscraper',
      dims: '300 × 600 px',
      placement: 'Sticky Right Sidebar',
      policyNote: 'Perfect for desktop viewports. Stays fixed alongside calculators without overlapping interactive tools.',
      bg: 'bg-gradient-to-b from-gray-50 to-purple-50/20 border-purple-100 dark:border-purple-900/30'
    },
    'footer-anchor': {
      label: 'Footer Anchor Banner',
      dims: '970 × 90 px / Responsive Anchor',
      placement: 'Bottom Screen Overlaid or Inline Footer Banner',
      policyNote: 'AdSense compliant smart-sizing unit. Safe distance from interactive CTA buttons.',
      bg: 'bg-gradient-to-r from-gray-50 to-indigo-50/20 border-indigo-100 dark:border-indigo-900/30'
    }
  }[type];

  return (
    <div className={`my-6 ${className}`} id={`ad-wrapper-${type}`}>
      <div className="flex items-center justify-between px-3 py-1 bg-slate-50 dark:bg-gray-900 rounded-t-lg border-t border-x border-slate-200 dark:border-gray-850 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-emerald-500/80 animate-pulse" />
          <span>Sponsored</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-[9px] hidden sm:inline">{config.dims}</span>
          <button
            onClick={() => setShowMockAd(!showMockAd)}
            className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1 py-0.5 px-1.5 rounded bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 cursor-pointer"
            title="Toggle simulated banner rendering to inspect user view"
            id={`toggle-ad-${type}`}
          >
            {showMockAd ? <EyeOff className="h-2.5 w-2.5" /> : <Eye className="h-2.5 w-2.5" />}
            <span className="text-[9px]">{showMockAd ? 'Hide Ad' : 'Simulate'}</span>
          </button>
        </div>
      </div>

      {showMockAd ? (
        <div className={`p-4 border-b border-x border-slate-200 dark:border-gray-800 rounded-b-lg ${config.bg} shadow-xs min-h-[90px] flex flex-col justify-center`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-block px-1.5 py-0.5 bg-slate-200 dark:bg-gray-800 text-slate-500 dark:text-gray-400 text-[9px] font-extrabold uppercase rounded tracking-wide">
                  Sponsored
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-gray-300">
                  FitMetricsHub Premium Coaching
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg leading-snug">
                Accelerate your progress with certified metabolic nutrition coaching. Get structured custom meal templates aligned with our calculator outputs.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {type === 'sidebar' ? '300 × 600' : type === 'in-content' ? '300 × 250' : '728 × 90'}
              </span>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap">
                Start Today
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 border-b border-x border-dashed border-slate-200 dark:border-gray-800/40 rounded-b-lg text-center bg-slate-50/50 text-xs text-slate-400 italic">
          Ad space active ({config.label} - {config.dims}). Simulated banner hidden.
        </div>
      )}
    </div>
  );
}
