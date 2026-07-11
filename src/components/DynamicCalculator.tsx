import React, { useState, useEffect } from 'react';
import { CalculatorConfig } from '../types';
import { Scale, RefreshCw, AlertCircle } from 'lucide-react';
import GaugeChart, { GaugeRange } from './GaugeChart';
import { parseMarkdownToHtml } from '../utils/markdown';

interface DynamicCalculatorProps {
  config: CalculatorConfig;
  key?: string;
}

export default function DynamicCalculator({ config }: DynamicCalculatorProps) {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Compute initial inputState synchronously!
  const getInitialInputState = () => {
    if (!config.inputs) return {};
    const initial: Record<string, any> = {};
    config.inputs.forEach((input) => {
      let val = input.defaultValue;
      if (unit === 'imperial' && input.unitType) {
        if (input.unitType === 'weight') {
          val = Math.round(val * 2.20462);
        } else if (input.unitType === 'height') {
          val = Math.round(val * 0.393701);
        }
      }
      initial[input.name] = val;
    });
    return initial;
  };

  const [inputState, setInputState] = useState<Record<string, any>>(() => getInitialInputState());

  // Reset inputState when config or unit changes (subsequent updates)
  useEffect(() => {
    setInputState(getInitialInputState());
  }, [config.slug, unit]);

  // Derive results synchronously on every render (SSR & client-safe)
  const results = (() => {
    if (!config.calculate || Object.keys(inputState).length === 0) return {};
    try {
      return config.calculate(inputState, unit);
    } catch (e) {
      console.error('Error executing dynamic calculation:', e);
      return {};
    }
  })();

  if (!config.inputs || !config.calculate) {
    return (
      <div className="p-6 text-center text-gray-500 bg-red-50 dark:bg-red-950/20 border border-red-100 rounded-2xl">
        <AlertCircle className="mx-auto h-8 w-8 text-red-500 mb-2" />
        <p className="font-semibold text-red-900 dark:text-red-400">Calculator Configuration Incomplete</p>
        <p className="text-xs text-red-650 dark:text-red-300 mt-1">This calculator has no defined dynamic inputs or formula.</p>
      </div>
    );
  }

  const handleInputChange = (name: string, value: any) => {
    setInputState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUnitToggle = (selectedUnit: 'metric' | 'imperial') => {
    if (selectedUnit === unit) return;
    setUnit(selectedUnit);
  };

  // Determine standard bounds for slider inputs based on current unit
  const getInputBounds = (input: any) => {
    let min = input.min ?? 0;
    let max = input.max ?? 1000;
    let step = input.step ?? 1;

    if (unit === 'imperial' && input.unitType) {
      if (input.unitType === 'weight') {
        min = Math.round(min * 2.20462);
        max = Math.round(max * 2.20462);
        step = Math.round(step * 2.20462) || 1;
      } else if (input.unitType === 'height') {
        min = Math.round(min * 0.393701);
        max = Math.round(max * 0.393701);
        step = Math.round(step * 0.393701) || 1;
      }
    }

    return { min, max, step };
  };

  // Determine label suffix for inputs
  const getInputSuffix = (input: any) => {
    if (!input.unitType || input.unitType === 'none') return '';
    if (input.unitType === 'weight') return unit === 'metric' ? 'kg' : 'lbs';
    if (input.unitType === 'height') return unit === 'metric' ? 'cm' : 'inches';
    return '';
  };

  // Resolve main output score and define simple gauge ranges dynamically for visual beauty
  const mainOutput = config.outputs?.[0];
  const rawMainValue = results[mainOutput?.valueKey ?? ''] ?? 0;
  
  // Custom ranges for specific calculators to light up the GaugeChart beautifully
  const getCustomGaugeRanges = (): GaugeRange[] | undefined => {
    if (config.slug === 'waist-to-height-ratio-calculator') {
      return [
        { label: 'Extremely Slim', min: 0, max: 0.42, color: '#3b82f6', textColor: '#2563eb' },
        { label: 'Healthy/Normal', min: 0.42, max: 0.50, color: '#10b981', textColor: '#059669' },
        { label: 'Overweight Risk', min: 0.50, max: 0.55, color: '#f59e0b', textColor: '#d97706' },
        { label: 'Highly Elevated', min: 0.55, max: 1.0, color: '#ef4444', textColor: '#dc2626' }
      ];
    }
    if (config.slug === 'ffmi-calculator') {
      return [
        { label: 'Slightly Muscled', min: 0, max: 17.9, color: '#94a3b8', textColor: '#64748b' },
        { label: 'Average', min: 18.0, max: 20.9, color: '#3b82f6', textColor: '#2563eb' },
        { label: 'Athletic Build', min: 21.0, max: 22.9, color: '#10b981', textColor: '#059669' },
        { label: 'Exceptional (Elite)', min: 23.0, max: 25.0, color: '#fbbf24', textColor: '#d97706' },
        { label: 'Superior / Assisted', min: 25.1, max: 40.0, color: '#ef4444', textColor: '#dc2626' }
      ];
    }
    if (config.slug === 'waist-to-hip-ratio-calculator') {
      const isMale = inputState.gender === 'male';
      return [
        { label: 'Low Risk (Healthy)', min: 0, max: isMale ? 0.89 : 0.79, color: '#10b981', textColor: '#059669' },
        { label: 'Moderate Risk', min: isMale ? 0.90 : 0.80, max: isMale ? 0.95 : 0.85, color: '#f59e0b', textColor: '#d97706' },
        { label: 'High Risk (Visceral Fat)', min: isMale ? 0.96 : 0.86, max: 2.0, color: '#ef4444', textColor: '#dc2626' }
      ];
    }
    if (config.slug === 'heart-rate-zone-calculator') {
      return [
        { label: 'Aerobic Focus', min: 100, max: 140, color: '#10b981', textColor: '#059669' },
        { label: 'Threshold Focus', min: 141, max: 180, color: '#f59e0b', textColor: '#d97706' }
      ];
    }
    return undefined;
  };

  const isNumericValue = typeof rawMainValue === 'number' || (typeof rawMainValue === 'string' && !isNaN(parseFloat(rawMainValue)));
  const mainValue = isNumericValue ? (typeof rawMainValue === 'number' ? rawMainValue : parseFloat(rawMainValue)) : rawMainValue;

  return (
    <div className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-xl overflow-hidden" id={`calc-card-${config.slug}`}>
      {/* Unit system selector */}
      <div className="flex border-b border-gray-100 dark:border-gray-900/60 p-4 justify-between items-center bg-gray-50/50 dark:bg-gray-900/10">
        <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
          <Scale className="h-4 w-4 text-emerald-500" />
          Interactive Calculator System
        </span>
        
        {/* Toggle button */}
        <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-900 p-0.5">
          <button
            onClick={() => handleUnitToggle('metric')}
            className={`px-3.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              unit === 'metric'
                ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => handleUnitToggle('imperial')}
            className={`px-3.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              unit === 'imperial'
                ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Imperial
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-900">
        
        {/* Left column: Inputs form */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
          {config.inputs.map((input) => {
            const { min, max, step } = getInputBounds(input);
            const value = inputState[input.name] ?? input.defaultValue;
            const suffix = getInputSuffix(input);

            return (
              <div key={input.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {input.label}
                  </label>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center bg-emerald-500/5 px-2.5 py-0.5 rounded-md">
                    {value} {suffix}
                  </span>
                </div>

                {/* Slider / Slider range selection */}
                {(input.type === 'slider' || input.type === 'number') && (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={value}
                      onChange={(e) => handleInputChange(input.name, Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-100 dark:bg-gray-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      <span>{min} {suffix}</span>
                      <span>{max} {suffix}</span>
                    </div>
                  </div>
                )}

                {/* Number input fallback for raw forms */}
                {input.type === 'number' && (
                  <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => handleInputChange(input.name, Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs"
                  />
                )}

                {/* Select element */}
                {input.type === 'select' && input.options && (
                  <select
                    value={value}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs"
                  >
                    {input.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {/* Radio segmented fields */}
                {input.type === 'radio' && input.options && (
                  <div className="grid grid-cols-2 gap-2">
                    {input.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleInputChange(input.name, opt.value)}
                        className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                          value === opt.value
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-extrabold shadow-sm'
                            : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-900'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right column: Interactive results visual layout */}
        <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between bg-slate-50/20 dark:bg-gray-950/40">
          
          <div className="space-y-6">
            <h3 className="text-xs font-extrabold text-slate-500 dark:text-gray-400 uppercase tracking-widest text-center flex items-center justify-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-emerald-500 animate-spin-slow" />
              Real-time Calculated Outputs
            </h3>

            {/* Gauge visualization overlay */}
            {isNumericValue && typeof mainValue === 'number' ? (
              <GaugeChart
                value={mainValue}
                min={config.slug === 'ffmi-calculator' ? 12 : 0}
                max={config.slug === 'ffmi-calculator' ? 30 : Math.max(mainValue * 1.5, 10)}
                unitLabel={mainOutput?.unit ?? ''}
                title={mainOutput?.label ?? 'Metric'}
                ranges={getCustomGaugeRanges()}
              />
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-gray-900 text-center border border-slate-100 dark:border-gray-800">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight block">
                  {mainValue}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                  {mainOutput?.label}
                </span>
              </div>
            )}

            {/* Secondary/all outputs cards summary */}
            <div className="grid grid-cols-2 gap-2.5">
              {config.outputs?.slice(1).map((output) => {
                const outVal = results[output.valueKey] ?? '-';
                return (
                  <div 
                    key={output.valueKey}
                    className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800/80 text-center"
                  >
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block truncate uppercase tracking-wider mb-1">
                      {output.label}
                    </span>
                    <span className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
                      {outVal} {output.unit && !output.isCustomText ? output.unit : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinician's explanation card summary */}
          {config.resultExplanation && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              <div dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(config.resultExplanation(inputState, results, unit)) }} />
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
