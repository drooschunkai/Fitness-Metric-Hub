import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, Droplets, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function WaterCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [weight, setWeight] = useState<string>('70');
  const [weightLbs, setWeightLbs] = useState<string>('150');
  const [exercise, setExercise] = useState<string>('45'); // minutes of exercise
  const [climate, setClimate] = useState<string>('temperate'); // cold, temperate, hot
  const [stage, setStage] = useState<string>('standard'); // standard, pregnant, lactating

  const [result, setResult] = useState<{
    liters: number;
    ounces: number;
    cups: number;
    fluidFromWater: number; // 80%
    fluidFromFood: number; // 20%
    hourlySchedule: { time: string; amount: string; context: string }[];
  } | null>(null);

  const calculateWater = () => {
    let wtKg = 0;
    if (unit === 'metric') {
      wtKg = parseFloat(weight) || 0;
    } else {
      wtKg = (parseFloat(weightLbs) || 0) * 0.45359237;
    }

    if (wtKg <= 0) return;

    // 1. Baseline: 35 ml per kg of body weight
    let mlTotal = wtKg * 35;

    // 2. Exercise adjustment: Add ~350ml (12 oz) for every 30 minutes of heavy sweating
    const workoutMin = parseFloat(exercise) || 0;
    mlTotal += (workoutMin / 30) * 350;

    // 3. Climate adjustment
    if (climate === 'cold') {
      mlTotal -= 200; // slightly less hydration lost
    } else if (climate === 'hot') {
      mlTotal += 500; // heavy sweating baseline
    } else if (climate === 'humid') {
      mlTotal += 350; // sweating efficiency reduced
    }

    // 4. Pregnancy/Lactation clinical stage addition
    if (stage === 'pregnant') {
      mlTotal += 300; // clinical CDC recommendation
    } else if (stage === 'lactating') {
      mlTotal += 700; // breastfeeding water replenishing recommendation
    }

    // Convert values
    const litersVal = mlTotal / 1000;
    const ozVal = mlTotal * 0.033814;
    const cupsVal = mlTotal / 240; // standard 240ml cup

    // Hourly distribution schedules
    const hourlySchedule = [
      { time: 'Upon Waking up', amount: '350 ml (12 oz)', context: 'Rehydrate from overnight fasting metabolic processes' },
      { time: 'Mid-Morning', amount: '500 ml (17 oz)', context: 'Support active focus, brain tissue hydration, and metabolism' },
      { time: 'Pre-Workout (30m before)', amount: '300 ml (10 oz)', context: 'Prime skeletal muscles for optimal work endurance' },
      { time: 'During Workout (per 20m)', amount: '200 ml (7 oz)', context: 'Replenish active sweat loss dynamically' },
      { time: 'Post-Workout (within 30m)', amount: '400 ml (14 oz)', context: 'Restore cell hydration and metabolic waste clearance' },
      { time: 'Mid-Afternoon', amount: '500 ml (17 oz)', context: 'Fight daytime lethargy and digestive stagnation' },
      { time: 'With Evening Meal', amount: '350 ml (12 oz)', context: 'Support digestion and nutrient dissolution' },
      { time: '1-2h Before Bed', amount: '250 ml (8 oz)', context: 'Light baseline hydration without disrupting sleep cycles' },
    ];

    setResult({
      liters: parseFloat(litersVal.toFixed(2)),
      ounces: parseFloat(ozVal.toFixed(1)),
      cups: parseFloat(cupsVal.toFixed(1)),
      fluidFromWater: parseFloat((litersVal * 0.8).toFixed(2)),
      fluidFromFood: parseFloat((litersVal * 0.2).toFixed(2)),
      hourlySchedule
    });
  };

  const handleClear = () => {
    setWeight('70');
    setWeightLbs('150');
    setExercise('45');
    setClimate('temperate');
    setStage('standard');
    setResult(null);
  };

  useEffect(() => {
    calculateWater();
  }, [unit, weight, weightLbs, exercise, climate, stage]);

  return (
    <div className="space-y-8" id="detailed-water-calculator-page">
      
      {/* Header banner */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Formulate your fluid targets based on clinical parameters</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Hydration Math
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Inputs (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Unit selection */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="water-tab-metric"
            >
              Metric (kg)
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="water-tab-us"
            >
              US (lbs)
            </button>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Weight
            </label>
            {unit === 'metric' ? (
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                  id="water-weight-metric"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">kg</span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min="40"
                  max="600"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                  id="water-weight-us"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">lbs</span>
              </div>
            )}
          </div>

          {/* Exercise Duration */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Active Exercise Duration
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="360"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full pr-16 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                id="water-input-exercise"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">mins / day</span>
            </div>
          </div>

          {/* Climate Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Climate / Environment
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: '❄️ Cold', value: 'cold' },
                { label: '🍃 Temperate', value: 'temperate' },
                { label: '☀️ Hot & Sweaty', value: 'hot' },
                { label: '🌫️ Humid / Sticky', value: 'humid' }
              ].map((clim) => (
                <button
                  key={clim.value}
                  onClick={() => setClimate(clim.value)}
                  className={`p-2.5 text-left border rounded-lg cursor-pointer transition-all ${
                    climate === clim.value
                      ? 'border-emerald-500 bg-emerald-50/40 text-emerald-850 dark:text-emerald-400 font-bold'
                      : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-500 hover:border-slate-300'
                  }`}
                  id={`water-climate-${clim.value}`}
                >
                  {clim.label}
                </button>
              ))}
            </div>
          </div>

          {/* Biological / Pregnancy Life Stage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Clinical Life Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="standard">Standard Baseline Condition</option>
              <option value="pregnant">Currently Pregnant (+300 ml)</option>
              <option value="lactating">Currently Breastfeeding / Lactating (+700 ml)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateWater}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Water</span>
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
              <span>Target Fluid Intake</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Daily Volume</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Water target Liters */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between animate-pulse">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Daily Hydration Goal
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block" id="water-result-val">
                    {result.liters} <span className="text-xs text-slate-500 font-sans">Liters / day</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    ({result.ounces} fluid Ounces OR {result.cups} standard Cups daily)
                  </span>
                </div>
                <div className="p-2.5 bg-blue-500 text-white rounded-lg">
                  <Droplets className="h-5 w-5 animate-bounce" />
                </div>
              </div>

              {/* Water hydration composition */}
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-slate-100 dark:border-gray-800 pt-4">
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">From Fluids (80% ratio)</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.fluidFromWater} Liters</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block leading-tight">Water, herbal teas, or healthy beverages</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">From Whole Foods (20% ratio)</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.fluidFromFood} Liters</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block leading-tight">Hydrating fruits, vegetables, and broths</span>
                </div>
              </div>

              {/* Hourly Schedule table */}
              <div className="border-t border-slate-100 dark:border-gray-800 pt-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-3 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-blue-500" />
                  <span>Optimal Hourly Water Intake Schedule</span>
                </span>

                <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                  {result.hourlySchedule.map((sch, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-gray-900/40 border border-slate-100 dark:border-gray-900 text-xs"
                    >
                      <div className="max-w-[65%]">
                        <span className="font-bold text-slate-700 dark:text-slate-350 block leading-tight">{sch.time}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5 leading-snug">{sch.context}</span>
                      </div>
                      <span className="font-extrabold text-blue-600 dark:text-blue-450 font-mono text-[11px] shrink-0">{sch.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-[280px] flex flex-col justify-center items-center text-center text-slate-400">
              <Droplets className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Hydration Calculator Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your current body weight, workout minutes, and climate to establish an optimized water budget and timing plan.</p>
            </div>
          )}
        </div>

      </div>

      {/* Advanced Scientific Literature */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            The Biology of Hydration & Intracellular Fluid Balance
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Water constitutes approximately 60% of an adult's total body weight and is the fundamental solvent for all chemical processes in human cell biology. Proper water volume ensures healthy cardiac stroke volume, joint lubrication, metabolic temperature stabilization, and biochemical nutrient delivery.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            When you dehydrate by as little as 2% of body mass, aerobic athletic performance declines dramatically, cognitive processing is delayed, headaches arise, and salivary metabolic rates decline.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-950 space-y-2">
            <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Dehydration Warning Indicators</span>
            </h4>
            <ul className="list-disc pl-4 text-[11px] text-black dark:text-white space-y-1 leading-relaxed text-justify">
              <li>Dark, concentrated yellow urine (ideally should be pale straw color)</li>
              <li>Dry, sticky oral mucosa and parched throat conditions</li>
              <li>Premature muscular cramping during athletic strain</li>
              <li>Unexplained sluggishness, headaches, or focus fatigue</li>
            </ul>
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-950 space-y-2">
            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Can You Over-Hydrate? (Hyponatremia)</span>
            </h4>
            <p className="text-[11px] text-black dark:text-white leading-relaxed text-justify">
              Yes. Drinking extreme volumes of pure water without matching salt intake can cause <strong>hyponatremia</strong>. This happens when blood sodium is diluted too much, which can cause cells to swell dangerously. Always match heavy sweating with appropriate sodium electrolytes!
            </p>
          </div>
        </section>
      </div>

    </div>
  );
}
