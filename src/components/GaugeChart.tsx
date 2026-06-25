import React from 'react';

export interface GaugeRange {
  label: string;
  min: number;
  max: number;
  color: string; // Tailwind class, e.g. 'bg-emerald-500' or hex/rgb string
  textColor: string;
}

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  ranges?: GaugeRange[];
  unitLabel?: string;
  title?: string;
}

export default function GaugeChart({
  value,
  min,
  max,
  ranges,
  unitLabel = '',
  title = ''
}: GaugeChartProps) {
  // Ensure value is bounded
  const boundedValue = Math.min(Math.max(value, min), max);
  
  // Calculate percentage of value along the min-max spectrum
  const percentage = (boundedValue - min) / (max - min);
  
  // SVG gauge constants
  const size = 200;
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  
  // Semi-circle gauge (from -180 deg to 0 deg)
  const circum = Math.PI * radius; // Half circle circumference
  const strokeDashoffset = circum - percentage * circum;

  // Find which range the value falls into
  const activeRange = ranges?.find(r => value >= r.min && value <= r.max);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-gray-900/40 rounded-2xl border border-slate-100 dark:border-gray-800/60 max-w-sm mx-auto shadow-xs">
      {title && (
        <h4 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3">
          {title}
        </h4>
      )}

      <div className="relative" style={{ width: size, height: size / 1.4 }}>
        {/* SVG Gauge */}
        <svg className="w-full h-full transform -rotate-180" viewBox={`0 0 ${size} ${size}`}>
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            className="stroke-slate-200 dark:stroke-gray-850"
            strokeWidth={strokeWidth}
            strokeDasharray={circum}
            strokeLinecap="round"
          />

          {/* Color ranges segment overlays if provided */}
          {ranges && ranges.map((range, index) => {
            const rStartPct = Math.max((range.min - min) / (max - min), 0);
            const rEndPct = Math.min((range.max - min) / (max - min), 1);
            const rLengthPct = rEndPct - rStartPct;
            if (rLengthPct <= 0) return null;

            const offset = circum - (rStartPct * circum);
            const dash = rLengthPct * circum;

            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={range.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${circum * 2}`}
                strokeDashoffset={offset}
                className="transition-all duration-700 ease-out opacity-40 hover:opacity-100"
              />
            );
          })}

          {/* Current Value Active Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={activeRange ? activeRange.color : '#10b981'} // Default to emerald
            strokeWidth={strokeWidth}
            strokeDasharray={circum}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center reading details */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 text-center">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight animate-fade-in">
            {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          </span>
          {unitLabel && (
            <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">
              {unitLabel}
            </span>
          )}
        </div>
      </div>

      {/* Active Range Badge */}
      {activeRange && (
        <div className="mt-4 flex flex-col items-center">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{ 
              backgroundColor: `${activeRange.color}15`, 
              color: activeRange.textColor 
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" 
              style={{ backgroundColor: activeRange.textColor }}
            />
            {activeRange.label}
          </span>
        </div>
      )}
    </div>
  );
}
