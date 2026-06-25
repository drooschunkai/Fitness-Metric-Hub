import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, AlertTriangle, ShieldCheck, Dumbbell } from 'lucide-react';

export default function LeanBodyMassCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('28');

  // Metric Inputs
  const [weightKg, setWeightKg] = useState<string>('78');
  const [heightCm, setHeightCm] = useState<string>('178');

  // US Inputs
  const [weightLbs, setWeightLbs] = useState<string>('172');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('10');

  const [result, setResult] = useState<{
    boerLbm: number;
    boerPercent: number;
    jamesLbm: number;
    jamesPercent: number;
    humeLbm: number;
    humePercent: number;
    fatMass: number;
    fatPercent: number;
  } | null>(null);

  const calculateLbm = () => {
    let wtKg = 0;
    let htCm = 0;

    if (unit === 'metric') {
      wtKg = parseFloat(weightKg) || 0;
      htCm = parseFloat(heightCm) || 0;
    } else {
      wtKg = (parseFloat(weightLbs) || 0) * 0.45359237;
      htCm = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
    }

    if (wtKg <= 0 || htCm <= 0) return;

    // 1. Boer Formula (1984)
    let boer = 0;
    if (gender === 'male') {
      boer = 0.407 * wtKg + 0.267 * htCm - 19.2;
    } else {
      boer = 0.252 * wtKg + 0.473 * htCm - 48.3;
    }

    // 2. James Formula (1976)
    let james = 0;
    if (gender === 'male') {
      james = 1.1 * wtKg - 128 * Math.pow(wtKg / htCm, 2);
    } else {
      james = 1.07 * wtKg - 148 * Math.pow(wtKg / htCm, 2);
    }

    // 3. Hume Formula (1966)
    let hume = 0;
    if (gender === 'male') {
      hume = 0.32810 * wtKg + 0.33929 * htCm - 29.5336;
    } else {
      hume = 0.29569 * wtKg + 0.41813 * htCm - 43.2933;
    }

    // Convert values if US units is selected
    const multiplier = unit === 'us' ? 2.20462 : 1;

    // Boer LBM
    const finalBoer = Math.min(Math.max(boer, 10), wtKg) * multiplier;
    const boerPct = (Math.min(Math.max(boer, 10), wtKg) / wtKg) * 100;

    // James LBM
    const finalJames = Math.min(Math.max(james, 10), wtKg) * multiplier;
    const jamesPct = (Math.min(Math.max(james, 10), wtKg) / wtKg) * 100;

    // Hume LBM
    const finalHume = Math.min(Math.max(hume, 10), wtKg) * multiplier;
    const humePct = (Math.min(Math.max(hume, 10), wtKg) / wtKg) * 100;

    // Calculate Fat Mass based on Boer
    const finalFatMass = (wtKg * multiplier) - finalBoer;
    const fatPct = 100 - boerPct;

    setResult({
      boerLbm: parseFloat(finalBoer.toFixed(1)),
      boerPercent: parseFloat(boerPct.toFixed(1)),
      jamesLbm: parseFloat(finalJames.toFixed(1)),
      jamesPercent: parseFloat(jamesPct.toFixed(1)),
      humeLbm: parseFloat(finalHume.toFixed(1)),
      humePercent: parseFloat(humePct.toFixed(1)),
      fatMass: parseFloat(finalFatMass.toFixed(1)),
      fatPercent: parseFloat(fatPct.toFixed(1))
    });
  };

  const handleClear = () => {
    setAge('28');
    setGender('male');
    setWeightKg('78');
    setHeightCm('178');
    setWeightLbs('172');
    setHeightFt('5');
    setHeightIn('10');
    setResult(null);
  };

  useEffect(() => {
    calculateLbm();
  }, [unit, gender]);

  return (
    <div className="space-y-8" id="detailed-lbm-calculator-page">
      
      {/* Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Determine lean mass metrics via Boer, James, and Hume algorithms</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Active Tissue Indexing
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Inputs (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Unit Toggle */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="lbm-tab-metric"
            >
              Metric (cm/kg)
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="lbm-tab-us"
            >
              US (ft/in/lbs)
            </button>
          </div>

          {/* Gender and Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Age
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800"
                id="lbm-input-age"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Gender
              </label>
              <div className="flex items-center gap-4 py-1.5">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="lbm-gender"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="accent-emerald-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="lbm-gender"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="accent-emerald-600"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Metric Height and Weight */}
          {unit === 'metric' ? (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in-30 duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                  id="lbm-height-metric"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                  id="lbm-weight-metric"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in-30 duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Height
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">in</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateLbm}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              id="lbm-btn-calculate"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate LBM</span>
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
              <span>Composition Results</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Fat vs Lean Weights</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* LBM Highlight (Boer) */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Lean Body Mass (Boer Method)
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block" id="lbm-result-val">
                    {result.boerLbm} <span className="text-sm text-slate-500 font-sans">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    Your body consists of <strong>{result.boerPercent}%</strong> lean skeletal tissue.
                  </span>
                </div>
                <div className="p-2.5 bg-emerald-500 text-white rounded-lg">
                  <Dumbbell className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* Composition horizontal split bar */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Visual Lean Mass Ratio</span>
                <div className="h-5 w-full bg-slate-100 dark:bg-gray-900 rounded-lg overflow-hidden flex font-mono text-[10px] font-bold text-white text-center">
                  <div
                    className="bg-emerald-500 flex items-center justify-center transition-all duration-500"
                    style={{ width: `${result.boerPercent}%` }}
                    title="Lean Body Mass"
                  >
                    {result.boerPercent}% Lean
                  </div>
                  <div
                    className="bg-amber-400 flex items-center justify-center transition-all duration-500 text-slate-850"
                    style={{ width: `${result.fatPercent}%` }}
                    title="Estimated Fat Mass"
                  >
                    {result.fatPercent}% Fat
                  </div>
                </div>
              </div>

              {/* Advanced formula comparison list */}
              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-gray-800 pt-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-2">
                  Scientific Algorithm Comparisons
                </span>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900">
                  <span className="text-slate-500">Boer Formula (1984):</span>
                  <span className="font-bold text-slate-850 dark:text-slate-200 font-mono">
                    {result.boerLbm} {unit === 'metric' ? 'kg' : 'lbs'} ({result.boerPercent}%)
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900">
                  <span className="text-slate-500">James Formula (1976):</span>
                  <span className="font-bold text-slate-850 dark:text-slate-200 font-mono">
                    {result.jamesLbm} {unit === 'metric' ? 'kg' : 'lbs'} ({result.jamesPercent}%)
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Hume Formula (1966):</span>
                  <span className="font-bold text-slate-850 dark:text-slate-200 font-mono">
                    {result.humeLbm} {unit === 'metric' ? 'kg' : 'lbs'} ({result.humePercent}%)
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-[280px] flex flex-col justify-center items-center text-center text-slate-400">
              <Dumbbell className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Composition Math Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your age, height, and weight to calculate clean lean tissue mass ratios and see comparative scientific outputs.</p>
            </div>
          )}
        </div>

      </div>

      {/* Literary discussion */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            What is Lean Body Mass (LBM)?
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Lean Body Mass (LBM) constitutes the total weight of your body excluding all lipid fat tissues. Specifically, LBM is composed of skeletal muscle fibers, vital organs (heart, brain, kidneys, liver), bone minerals, water content, connective tissues, and blood fluids.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            While LBM is often used to estimate metabolic requirements, it is vital to remember that LBM is not identical to <strong>Muscle Mass</strong>. Muscle mass represents only a fraction of your overall LBM, meaning that increases in bone density, cellular hydration, or organ size can also increase your LBM without necessarily building skeletal muscle tissue.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Boer vs. James vs. Hume Formulas
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            These three historical algorithms predict lean tissue mass using statistical height and weight cohorts. While the <strong>Hume Formula</strong> is highly robust, the <strong>James Formula</strong> is known to slightly over-penalize extreme obesity, and the <strong>Boer Formula</strong> remains the most frequently referenced tool in clinical pharmacology to adjust safe medicine dosing for active body tissues.
          </p>
        </section>
      </div>

    </div>
  );
}
