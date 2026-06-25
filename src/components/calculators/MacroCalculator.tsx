import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, AlertTriangle, ShieldCheck, PieChart } from 'lucide-react';

export default function MacroCalculator() {
  const [calories, setCalories] = useState<string>('2000');
  const [splitType, setSplitType] = useState<'balanced' | 'low_carb' | 'high_protein' | 'keto' | 'custom'>('balanced');
  
  // Custom ratios
  const [customProtein, setCustomProtein] = useState<number>(30);
  const [customCarbs, setCustomCarbs] = useState<number>(40);
  const [customFat, setCustomFat] = useState<number>(30);

  const [result, setResult] = useState<{
    proteinGrams: number;
    proteinKcal: number;
    proteinPct: number;
    carbsGrams: number;
    carbsKcal: number;
    carbsPct: number;
    fatGrams: number;
    fatKcal: number;
    fatPct: number;
    totalPct: number;
  } | null>(null);

  const calculateMacros = () => {
    const totalCal = parseFloat(calories) || 2000;
    
    let pRatio = 0.3;
    let cRatio = 0.4;
    let fRatio = 0.3;

    if (splitType === 'low_carb') {
      pRatio = 0.35;
      cRatio = 0.20;
      fRatio = 0.45;
    } else if (splitType === 'high_protein') {
      pRatio = 0.40;
      cRatio = 0.35;
      fRatio = 0.25;
    } else if (splitType === 'keto') {
      pRatio = 0.25;
      cRatio = 0.05;
      fRatio = 0.70;
    } else if (splitType === 'custom') {
      const totalCustom = customProtein + customCarbs + customFat;
      pRatio = customProtein / 100;
      cRatio = customCarbs / 100;
      fRatio = customFat / 100;
    }

    const pKcal = totalCal * pRatio;
    const cKcal = totalCal * cRatio;
    const fKcal = totalCal * fRatio;

    setResult({
      proteinGrams: Math.round(pKcal / 4),
      proteinKcal: Math.round(pKcal),
      proteinPct: Math.round(pRatio * 100),
      carbsGrams: Math.round(cKcal / 4),
      carbsKcal: Math.round(cKcal),
      carbsPct: Math.round(cRatio * 100),
      fatGrams: Math.round(fKcal / 9),
      fatKcal: Math.round(fKcal),
      fatPct: Math.round(fRatio * 100),
      totalPct: Math.round((pRatio + cRatio + fRatio) * 100)
    });
  };

  const handleClear = () => {
    setCalories('2000');
    setSplitType('balanced');
    setCustomProtein(30);
    setCustomCarbs(40);
    setCustomFat(30);
    setResult(null);
  };

  useEffect(() => {
    calculateMacros();
  }, [calories, splitType, customProtein, customCarbs, customFat]);

  // Adjust custom sliders ensuring they don't break total boundary easily
  const handleCustomChange = (type: 'p' | 'c' | 'f', value: number) => {
    if (type === 'p') {
      setCustomProtein(value);
    } else if (type === 'c') {
      setCustomCarbs(value);
    } else {
      setCustomFat(value);
    }
  };

  const totalSlidersSum = customProtein + customCarbs + customFat;

  return (
    <div className="space-y-8" id="detailed-macro-calculator-page">
      
      {/* Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Divide daily target energy into specific protein, carb, and lipid limits</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Macro Ratios
        </span>
      </div>

      {/* Main calculation pane */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Inputs (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Calorie Goal Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Daily Target Calories
            </label>
            <div className="relative">
              <input
                type="number"
                min="500"
                max="10000"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full pr-14 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 font-semibold text-sm focus:ring-1 focus:ring-emerald-500"
                id="macro-input-calories"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">kcal</span>
            </div>
          </div>

          {/* Preset Splits Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Macronutrient Strategy Preset
            </label>
            <div className="space-y-2 text-xs">
              {[
                { label: '⚖️ Balanced Diet (40C / 30P / 30F)', value: 'balanced', desc: 'Standard clinical guideline for active metabolic health' },
                { label: '🥦 Low Carb / Athletic Refeed (20C / 35P / 45F)', value: 'low_carb', desc: 'Encourages lipid utilization while protecting active tissue' },
                { label: '💪 High Protein / Hypertrophy (35C / 40P / 25F)', value: 'high_protein', desc: 'Accelerates lean muscle synthesis and athletic recovery' },
                { label: '🥑 Ketogenic / Extreme Fat-Adapted (5C / 25P / 70F)', value: 'keto', desc: 'Limits carbohydrate triggers to launch nutritional ketosis' },
                { label: '🎛️ Custom Percentage Split', value: 'custom', desc: 'Manually configure carbs, protein, and fat sliders' }
              ].map((split) => (
                <button
                  key={split.value}
                  onClick={() => setSplitType(split.value as any)}
                  className={`w-full text-left p-2.5 border rounded-lg cursor-pointer transition-all ${
                    splitType === split.value
                      ? 'border-emerald-500 bg-emerald-50/40 text-emerald-850 dark:text-emerald-400 font-bold'
                      : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-500 hover:border-slate-300'
                  }`}
                  id={`macro-split-${split.value}`}
                >
                  <div className="font-extrabold">{split.label}</div>
                  <div className="text-[9px] text-slate-400 leading-none mt-0.5">{split.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Sliders for Custom split */}
          {splitType === 'custom' && (
            <div className="p-3 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl space-y-4 text-xs animate-in slide-in-from-top-3 duration-200">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="font-bold text-slate-700 dark:text-gray-300">Custom Ratios</span>
                <span className={`font-mono font-bold text-xs ${totalSlidersSum === 100 ? 'text-emerald-600' : 'text-red-500'}`}>
                  Sum: {totalSlidersSum}% / 100%
                </span>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-500 text-[10px] mb-1">
                  <span>Protein</span>
                  <span className="font-mono">{customProtein}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={customProtein}
                  onChange={(e) => handleCustomChange('p', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-500 text-[10px] mb-1">
                  <span>Carbohydrates</span>
                  <span className="font-mono">{customCarbs}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={customCarbs}
                  onChange={(e) => handleCustomChange('c', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-500 text-[10px] mb-1">
                  <span>Dietary Fats</span>
                  <span className="font-mono">{customFat}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={customFat}
                  onChange={(e) => handleCustomChange('f', Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {totalSlidersSum !== 100 && (
                <div className="p-2 bg-red-50 text-red-600 border border-red-100 rounded text-[10px] leading-tight font-medium flex gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                  <span>Ratios must sum to 100% to calculate. Adjust sliders accordingly.</span>
                </div>
              )}
            </div>
          )}

          {/* Reset buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateMacros}
              disabled={splitType === 'custom' && totalSlidersSum !== 100}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>Update Splits</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>

        </div>

        {/* Right Output Pane (7 cols) */}
        <div className="md:col-span-6 lg:col-span-7 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl p-5 shadow-inner space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Target Macronutrient Budgets</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Macro Ratios</span>
          </div>

          {result && (splitType !== 'custom' || totalSlidersSum === 100) ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Pie Chart / Visual breakdown blocks */}
              <div className="flex flex-col items-center justify-center pt-2">
                
                {/* Custom SVG Donut representation chart */}
                <svg viewBox="0 0 160 160" className="w-full max-w-[170px]">
                  {/* Circle segments base donut */}
                  {/* Total Circumference of radius 50 is 2 * pi * 50 = 314.15 */}
                  {/* Segment lengths proportional to percentages */}
                  {(() => {
                    const radius = 50;
                    const circ = 2 * Math.PI * radius;
                    
                    const pLen = (result.proteinPct / 100) * circ;
                    const cLen = (result.carbsPct / 100) * circ;
                    const fLen = (result.fatPct / 100) * circ;
                    
                    const pOffset = circ - pLen;
                    const cOffset = circ - pLen - cLen;
                    const fOffset = circ - pLen - cLen - fLen;

                    return (
                      <g transform="rotate(-90 80 80)">
                        {/* Background */}
                        <circle cx="80" cy="80" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="18" />
                        
                        {/* Carbs Arc (Blue) */}
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="18"
                          strokeDasharray={`${cLen} ${circ - cLen}`}
                          strokeDashoffset={0}
                        />
                        {/* Protein Arc (Emerald) */}
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="18"
                          strokeDasharray={`${pLen} ${circ - pLen}`}
                          strokeDashoffset={-cLen}
                        />
                        {/* Fat Arc (Amber) */}
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="18"
                          strokeDasharray={`${fLen} ${circ - fLen}`}
                          strokeDashoffset={-(cLen + pLen)}
                        />
                      </g>
                    );
                  })()}
                  
                  {/* Center Text readout */}
                  <text x="80" y="78" fill="#1e293b" fontSize="12" fontWeight="900" textAnchor="middle" className="dark:fill-slate-100 font-mono">
                    {calories}
                  </text>
                  <text x="80" y="93" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">
                    kcal / day
                  </text>
                </svg>

                {/* Horizontal legends */}
                <div className="flex gap-4 mt-4 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-blue-500">
                    <span className="h-2 w-2 bg-blue-500 rounded-full" />
                    <span>Carbs ({result.carbsPct}%)</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full" />
                    <span>Protein ({result.proteinPct}%)</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <span className="h-2 w-2 bg-amber-500 rounded-full" />
                    <span>Fats ({result.fatPct}%)</span>
                  </span>
                </div>

              </div>

              {/* Three distinct panels for the macros */}
              <div className="space-y-3 pt-2 text-xs">
                
                {/* Carbohydrates Card */}
                <div className="p-3.5 bg-blue-50/25 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wide">Carbohydrates (4 kcal/g)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{result.carbsPct}% of daily energy ratio</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-lg font-extrabold text-slate-800 dark:text-slate-200 block" id="macro-result-carbs">{result.carbsGrams} grams</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{result.carbsKcal} kcal</span>
                  </div>
                </div>

                {/* Protein Card */}
                <div className="p-3.5 bg-emerald-50/25 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Proteins (4 kcal/g)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{result.proteinPct}% of daily energy ratio</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-lg font-extrabold text-slate-800 dark:text-slate-200 block" id="macro-result-protein">{result.proteinGrams} grams</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{result.proteinKcal} kcal</span>
                  </div>
                </div>

                {/* Dietary Fats Card */}
                <div className="p-3.5 bg-amber-50/25 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wide">Dietary Fats (9 kcal/g)</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{result.fatPct}% of daily energy ratio</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-lg font-extrabold text-slate-800 dark:text-slate-200 block" id="macro-result-fats">{result.fatGrams} grams</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{result.fatKcal} kcal</span>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="h-[300px] flex flex-col justify-center items-center text-center text-slate-400">
              <PieChart className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Macronutrient Splits Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your target calorie budget and select a splitting strategy to generate exact gram goals and donut chart distributions instantly.</p>
            </div>
          )}
        </div>

      </div>

      {/* Literary discussion */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            What are Macronutrients (Macros)?
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Every calorie you consume belongs to one of three primary organic structures: Carbohydrates, Proteins, or Fats (liquids like alcohol also provide energy, though they are not metabolic macronutrients). These are called "macronutrients" because the human body needs them in large gram quantities to maintain metabolic activity.
          </p>
          <ul className="list-disc pl-4 text-xs text-black dark:text-white leading-relaxed text-justify space-y-1">
            <li><strong>Protein (4 calories per gram):</strong> The molecular building blocks of muscles, enzymes, hair, skin, and hormones. Consuming sufficient protein prevents catabolism during caloric restriction.</li>
            <li><strong>Carbohydrates (4 calories per gram):</strong> The body's preferred and most efficient source of anaerobic fuel. Carbs are converted into glycogen and stored in liver and skeletal muscle tissues to power intense muscular contractions.</li>
            <li><strong>Fats (9 calories per gram):</strong> Crucial for endocrine health, cell membrane stability, brain tissue composition, and the absorption of fat-soluble vitamins (A, D, E, K). Fats are highly energy-dense.</li>
          </ul>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Should you eat Low-Carb or High-Carb?
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            There is no single superior diet ratio for everyone. While endurance athletes thrive on a higher carb division to maximize glycogen reserves, individuals with insulin resistance or sedentary lifestyles frequently experience better fat reduction and blood-glucose stability on low-carb or ketogenic macro splits. Adjust your ratios to fit your training volume and metabolic tendencies!
          </p>
        </section>
      </div>

    </div>
  );
}
