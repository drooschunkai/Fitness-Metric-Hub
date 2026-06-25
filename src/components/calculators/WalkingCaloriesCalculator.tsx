import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, TrendingUp, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function WalkingCaloriesCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [weightKg, setWeightKg] = useState<string>('75');
  const [weightLbs, setWeightLbs] = useState<string>('165');
  const [distance, setDistance] = useState<string>('3'); // miles or km
  const [speed, setSpeed] = useState<string>('3.2'); // mph or km/h
  const [incline, setIncline] = useState<string>('0'); // uphill grade percent (0 - 15)

  const [result, setResult] = useState<{
    calories: number;
    durationMin: number;
    intensityMets: number;
    stepsCount: number;
    equivalentFood: { name: string; calories: number; icon: string }[];
  } | null>(null);

  const calculateWalking = () => {
    let wtKg = 0;
    let speedMph = 0;
    let distMiles = 0;

    if (unit === 'metric') {
      wtKg = parseFloat(weightKg) || 0;
      speedMph = (parseFloat(speed) || 0) * 0.621371;
      distMiles = (parseFloat(distance) || 0) * 0.621371;
    } else {
      wtKg = (parseFloat(weightLbs) || 0) * 0.45359237;
      speedMph = parseFloat(speed) || 0;
      distMiles = parseFloat(distance) || 0;
    }

    const gradePercent = parseFloat(incline) || 0;

    if (wtKg <= 0 || speedMph <= 0 || distMiles <= 0) return;

    // 1. Calculate duration in minutes (distance / speed * 60)
    const durationMin = (distMiles / speedMph) * 60;

    // 2. ACSM (American College of Sports Medicine) Walking Equation:
    // VO2 (ml/kg/min) = (0.1 * speed_m_min) + (1.8 * speed_m_min * grade_fraction) + 3.5
    // Speed in meters per minute (1 mph = 26.8224 m/min)
    const speedM_Min = speedMph * 26.8224;
    const gradeFraction = gradePercent / 100;

    const vo2 = (0.1 * speedM_Min) + (1.8 * speedM_Min * gradeFraction) + 3.5;

    // Convert VO2 (ml/kg/min) to METs (1 MET = 3.5 ml/kg/min)
    const mets = vo2 / 3.5;

    // 3. Calculate Calories burned:
    // kcal = (MET * 3.5 * weight_kg / 200) * minutes
    const caloriesBurned = (mets * 3.5 * wtKg / 200) * durationMin;
    const finalCalories = Math.max(Math.round(caloriesBurned), 0);

    // 4. Steps approximation: 1 mile of standard walking is ~2,000 steps.
    const stepsCount = Math.round(distMiles * 2000);

    // Food equivalents
    const foodItems = [
      { name: 'Slice of Cheese Pizza', calories: 280, icon: '🍕' },
      { name: 'Glazed Chocolate Cookie', calories: 150, icon: '🍪' },
      { name: 'Can of Coca-Cola', calories: 140, icon: '🥤' },
      { name: 'Standard Snickers Bar', calories: 250, icon: '🍫' }
    ].filter(f => f.calories <= finalCalories || f.calories === 150).slice(0, 3);

    setResult({
      calories: finalCalories,
      durationMin: Math.round(durationMin),
      intensityMets: parseFloat(mets.toFixed(1)),
      stepsCount,
      equivalentFood: foodItems
    });
  };

  const handleClear = () => {
    setWeightKg('75');
    setWeightLbs('165');
    setDistance('3');
    setSpeed('3.2');
    setIncline('0');
    setResult(null);
  };

  useEffect(() => {
    calculateWalking();
  }, [unit, weightKg, weightLbs, distance, speed, incline]);

  return (
    <div className="space-y-8" id="detailed-walking-calculator-page">
      
      {/* Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Estimate energy expenditure using clinical ACSM walking guidelines</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          ACSM Standard
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
              id="walk-tab-metric"
            >
              Metric (km / kg)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'imperial' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="walk-tab-imperial"
            >
              Imperial (miles / lbs)
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
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                  id="walk-weight-metric"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">kg</span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min="45"
                  max="600"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                  id="walk-weight-imperial"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">lbs</span>
              </div>
            )}
          </div>

          {/* Distance and Speed Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Distance ({unit === 'metric' ? 'km' : 'miles'})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="100"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white text-slate-850"
                id="walk-distance-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Speed ({unit === 'metric' ? 'km/h' : 'mph'})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="15"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white text-slate-850"
                id="walk-speed-input"
              />
            </div>
          </div>

          {/* ADVANCED FEATURE: Incline / Grade percentage selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Treadmill Incline / Road Grade (%)
            </label>
            <div className="relative">
              <select
                value={incline}
                onChange={(e) => setIncline(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-gray-800 rounded-lg bg-white text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                id="walk-incline-select"
              >
                <option value="0">Flat Roadway (0% Incline)</option>
                <option value="1">Mild Hill (1% Grade)</option>
                <option value="3">Slight Incline (3% Grade)</option>
                <option value="5">Moderate Hill (5% Grade)</option>
                <option value="8">Steep Incline (8% Grade)</option>
                <option value="12">Advanced Climb (12% Grade)</option>
                <option value="15">Extreme Mountain (15% Grade)</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateWalking}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Burn</span>
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
              <span>Estimated Energy Expenditure</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Calorie Burn</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Calories Burned Highlighting box */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Calculated Energy Burned
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block" id="walk-result-val">
                    {result.calories} <span className="text-xs text-slate-500 font-sans">kcal burned</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    Completed over an estimated <strong>{result.durationMin} minutes</strong> of active walking.
                  </span>
                </div>
                <div className="p-2.5 bg-indigo-500 text-white rounded-lg">
                  <TrendingUp className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* Steps and METs metrics */}
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-slate-100 dark:border-gray-800 pt-4">
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">Estimated Steps Count</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.stepsCount.toLocaleString()} steps</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block leading-tight">Assuming average 2.5-foot walking stride length</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">Calculated Intensity (METs)</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.intensityMets} METs</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block leading-tight">Metabolic Equivalent factor of this exercise pace</span>
                </div>
              </div>

              {/* Equivalent food items burned */}
              {result.equivalentFood.length > 0 && (
                <div className="border-t border-slate-100 dark:border-gray-800 pt-4">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-2.5">
                    Equivalent Food Calories Burned Off
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {result.equivalentFood.map((food, idx) => (
                      <div key={idx} className="p-2.5 border border-slate-150 rounded-xl bg-slate-50/50 text-center text-xs shadow-xs">
                        <span className="text-2xl block">{food.icon}</span>
                        <span className="font-extrabold text-slate-700 block mt-1 leading-tight text-[10px]">{food.name}</span>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5 block font-bold">{food.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="h-[280px] flex flex-col justify-center items-center text-center text-slate-400">
              <TrendingUp className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Walking Energy Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your current weight, speed, distance, and incline grade to generate metabolic burn statistics and steps conversions instantly.</p>
            </div>
          )}
        </div>

      </div>

      {/* Literary discussion */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            The Science of Walking: How Incline Walking is a Fat-Loss Cheat Code
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Walking is one of the most therapeutically effective forms of low-intensity steady-state (LISS) cardio. It burns calories predominantly from fat lipids, places minimal shear stress on knee and ankle joints, and does not cause massive cortisol (stress hormone) spikes that trigger intense hunger.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            By simply raising a treadmill's incline, you radically increase the energy expenditure. For example, walking at 3 mph on a 12% incline burns more than <strong>double</strong> the calories of walking flat at the exact same speed, while shifting load to the hamstrings, glutes, and calves, effectively serving as a muscular endurance workout!
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            ACSM Clinical Walking Equations Explained
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            The <strong>American College of Sports Medicine (ACSM)</strong> developed specific metabolic oxygen consumption equations for walking at speeds between 1.9 mph and 4.0 mph. It breaks work into horizontal costs (0.1 ml/kg/min per m/min speed) and vertical costs (1.8 ml/kg/min per m/min times grade fraction), plus a rest baseline of 3.5 ml/kg/min (1 MET). By multiplying this total oxygen cost by active bodyweight and time, we obtain a highly accurate calorie prediction!
          </p>
        </section>
      </div>

    </div>
  );
}
