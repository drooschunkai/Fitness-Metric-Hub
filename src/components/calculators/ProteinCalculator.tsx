import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, AlertTriangle, ShieldCheck, Dumbbell } from 'lucide-react';

export default function ProteinCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [weight, setWeight] = useState<string>('75');
  const [weightLbs, setWeightLbs] = useState<string>('165');
  const [goal, setGoal] = useState<'loss' | 'maintenance' | 'gain'>('gain');
  const [activity, setActivity] = useState<string>('active'); // sedentary, active, athlete

  const [result, setResult] = useState<{
    targetGramsMin: number;
    targetGramsMax: number;
    targetCaloriesMin: number;
    targetCaloriesMax: number;
    rdaStandard: number;
    enduranceStandard: number;
    hypertrophyStandard: number;
    leanMassBased: number | null;
  } | null>(null);

  const calculateProtein = () => {
    let wtKg = 0;
    if (unit === 'metric') {
      wtKg = parseFloat(weight) || 0;
    } else {
      wtKg = (parseFloat(weightLbs) || 0) * 0.45359237;
    }

    if (wtKg <= 0) return;

    // Multipliers based on activity & goal
    // Sedentary WHO baseline is 0.8g/kg.
    // Highly active / building goes up to 2.2 - 2.5 g/kg.
    let baseMin = 1.4;
    let baseMax = 1.8;

    if (goal === 'loss') {
      // In a deficit, higher protein protects muscle (1.8 - 2.3 g/kg)
      baseMin = 1.8;
      baseMax = 2.3;
    } else if (goal === 'gain') {
      // Bulking requires 2.0 - 2.5 g/kg for muscle building synthesis
      baseMin = 2.0;
      baseMax = 2.5;
    } else {
      // Maintenance
      if (activity === 'sedentary') {
        baseMin = 1.2;
        baseMax = 1.5;
      } else {
        baseMin = 1.5;
        baseMax = 2.0;
      }
    }

    const minGrams = wtKg * baseMin;
    const maxGrams = wtKg * baseMax;

    // Standards Comparison
    const rda = wtKg * 0.8;
    const endurance = wtKg * 1.4;
    const hypertrophy = wtKg * 2.2;

    setResult({
      targetGramsMin: Math.round(minGrams),
      targetGramsMax: Math.round(maxGrams),
      targetCaloriesMin: Math.round(minGrams * 4),
      targetCaloriesMax: Math.round(maxGrams * 4),
      rdaStandard: Math.round(rda),
      enduranceStandard: Math.round(endurance),
      hypertrophyStandard: Math.round(hypertrophy),
      leanMassBased: null
    });
  };

  const handleClear = () => {
    setWeight('75');
    setWeightLbs('165');
    setGoal('gain');
    setActivity('active');
    setResult(null);
  };

  useEffect(() => {
    calculateProtein();
  }, [unit, weight, weightLbs, goal, activity]);

  // Protein Sources Guide
  const proteinSources = [
    { name: 'Chicken Breast (Cooked)', portion: '100 g', protein: '31 g', fat: '3.6 g', calories: '165 kcal' },
    { name: 'Salmon Fillet (Cooked)', portion: '100 g', protein: '25 g', fat: '12 g', calories: '206 kcal' },
    { name: 'Lean Beef (90% Lean)', portion: '100 g', protein: '26 g', fat: '10 g', calories: '200 kcal' },
    { name: 'Whey Protein Powder', portion: '1 scoop (30g)', protein: '24 g', fat: '1.5 g', calories: '120 kcal' },
    { name: 'Liquid Egg Whites', portion: '100 g', protein: '11 g', fat: '0.2 g', calories: '52 kcal' },
    { name: 'Greek Yogurt (Unsweetened)', portion: '200 g', protein: '20 g', fat: '0.4 g', calories: '118 kcal' },
    { name: 'Canned Tuna (In Water)', portion: '1 can (120g)', protein: '28 g', fat: '1 g', calories: '128 kcal' },
    { name: 'Lentils (Cooked)', portion: '1 cup (198g)', protein: '18 g', fat: '0.8 g', calories: '230 kcal' },
    { name: 'Tofu (Firm)', portion: '100 g', protein: '8 g', fat: '4.8 g', calories: '76 kcal' },
  ];

  return (
    <div className="space-y-8" id="detailed-protein-calculator-page">
      
      {/* Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Determine your optimal protein intake based on weight and goal</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Muscle Protein Synthesis
        </span>
      </div>

      {/* Main calculation pane */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Form (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Unit Toggle */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="protein-tab-metric"
            >
              Metric (kg)
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="protein-tab-us"
            >
              US (lbs)
            </button>
          </div>

          {/* Weight Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Your Current Weight
            </label>
            {unit === 'metric' ? (
              <div className="relative">
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  id="protein-weight-metric"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">kg</span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min="60"
                  max="600"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  id="protein-weight-us"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">lbs</span>
              </div>
            )}
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Primary Goal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['loss', 'maintenance', 'gain'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`p-2 border text-xs font-bold rounded-lg cursor-pointer text-center transition-all ${
                    goal === g
                      ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-500 hover:border-slate-300'
                  }`}
                  id={`protein-goal-${g}`}
                >
                  {g === 'loss' ? 'Fat Loss' : g === 'maintenance' ? 'Maintenance' : 'Muscle Gain'}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Level Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Weekly Activity Standard
            </label>
            <div className="flex gap-2">
              {[
                { label: 'Sedentary', value: 'sedentary' },
                { label: 'Active Gym', value: 'active' },
                { label: 'Competitive Athlete', value: 'athlete' }
              ].map((actItem) => (
                <button
                  key={actItem.value}
                  onClick={() => setActivity(actItem.value)}
                  className={`flex-1 p-2 text-center border text-[11px] font-bold rounded-lg cursor-pointer transition-all ${
                    activity === actItem.value
                      ? 'border-emerald-500 bg-emerald-50/40 text-emerald-850 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-400 hover:border-slate-300'
                  }`}
                  id={`protein-activity-${actItem.value}`}
                >
                  {actItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateProtein}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Protein</span>
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

        {/* Right Output (7 cols) */}
        <div className="md:col-span-6 lg:col-span-7 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl p-5 shadow-inner space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Recommended Protein Range</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Daily Targets</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Protein Target Grams */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Daily Protein Target Range
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block" id="protein-result-val">
                    {result.targetGramsMin}g – {result.targetGramsMax}g
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    ({result.targetCaloriesMin} – {result.targetCaloriesMax} calories daily)
                  </span>
                </div>
                <div className="p-2.5 bg-emerald-500 text-white rounded-lg">
                  <Dumbbell className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* Comparative standards table */}
              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-gray-800 pt-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-2">
                  Clinical Standards Comparison
                </span>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900">
                  <span className="text-slate-500">WHO Sedentary RDA baseline (0.8g/kg):</span>
                  <span className="font-bold text-slate-700 dark:text-slate-350 font-mono">{result.rdaStandard} g / day</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900">
                  <span className="text-slate-500">Endurance Athlete Standard (1.4g/kg):</span>
                  <span className="font-bold text-slate-700 dark:text-slate-350 font-mono">{result.enduranceStandard} g / day</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Hypertrophy / Powerlifting Standard (2.2g/kg):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-450 font-mono">{result.hypertrophyStandard} g / day</span>
                </div>
              </div>

              {/* Standard Advisory message */}
              <div className="p-3 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-lg text-[10px] text-amber-700 dark:text-amber-500 flex gap-1.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                <p className="leading-snug">
                  <strong>Kidney Health notice:</strong> Higher protein targets are completely safe for healthy active individuals. However, if you have a pre-existing medical kidney condition or clinical impairment, always prioritize consulting a certified physician before starting high-protein loads.
                </p>
              </div>

            </div>
          ) : (
            <div className="h-[220px] flex flex-col justify-center items-center text-center text-slate-400">
              <Dumbbell className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Protein Targets Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your current weight and physical targets to see customized protein needs and clinical standards.</p>
            </div>
          )}
        </div>

      </div>

      {/* Protein Source Food Cheat Sheet */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>High-Protein Food Source Cheat Sheet</span>
        </h3>
        <p className="text-xs text-black dark:text-white leading-relaxed">
          Struggling to reach your daily targets? Below is an accurate clinical breakdown of high-yield protein sources to help you plan your diet:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {proteinSources.map((food, idx) => (
            <div key={idx} className="p-3 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs flex justify-between items-center shadow-xs">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block leading-tight">{food.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Serving Portion: {food.portion}</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{food.protein} Protein</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">{food.calories} | {food.fat} Fat</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed educational article */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            Why Protein is the Cornerstone of Physical Fitness
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Protein is composed of 20 distinct organic compounds known as amino acids. Nine of these are labeled "essential amino acids" (EAAs), meaning your biological systems cannot synthesize them, and they must be acquired through food.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            During weight loss (a caloric deficit), consuming sufficient protein is paramount. When energy is restricted, the body looks for tissue to convert into glucose. High protein intake, paired with strength training, signals the body to protect skeletal muscle tissue, ensuring that weight lost comes predominantly from adipose fat tissue.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Thermic Effect of Food (TEF) Explained
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Did you know digestion burns calories? This is known as the Thermic Effect of Food (TEF). Carbohydrates have a TEF of 5-15%, and fats burn 0-5%. Protein has a massive TEF of 20-30%, meaning that for every 100 calories of protein you consume, up to 30 calories are burned strictly to digest and process it. This metabolic cost makes high-protein diets highly effective for natural fat-loss and satiety control.
          </p>
        </section>
      </div>

    </div>
  );
}
