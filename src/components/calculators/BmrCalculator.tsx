import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, Flame, ShieldAlert, CheckCircle2, TrendingUp } from 'lucide-react';

export default function BmrCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('30');
  
  // Metric Inputs
  const [weightKg, setWeightKg] = useState<string>('75');
  const [heightCm, setHeightCm] = useState<string>('175');

  // US Inputs
  const [weightLbs, setWeightLbs] = useState<string>('165');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  // Advanced Inputs
  const [bodyFat, setBodyFat] = useState<string>(''); // Optional body fat for Katch-McArdle

  const [result, setResult] = useState<{
    mifflin: number;
    harrisOriginal: number;
    harrisRevised: number;
    katchMcArdle: number | null;
    tdeeBreakdown: { label: string; multiplier: number; calories: number }[];
  } | null>(null);

  const calculateBmr = () => {
    const ageNum = parseFloat(age) || 30;
    let weight = 0;
    let height = 0;

    if (unit === 'metric') {
      weight = parseFloat(weightKg) || 0;
      height = parseFloat(heightCm) || 0;
    } else {
      const lbs = parseFloat(weightLbs) || 0;
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      
      weight = lbs * 0.45359237;
      height = (ft * 12 + inch) * 2.54;
    }

    if (weight <= 0 || height <= 0 || ageNum <= 0) {
      return;
    }

    // 1. Mifflin-St Jeor
    let bmrMifflin = 0;
    if (gender === 'male') {
      bmrMifflin = 10 * weight + 6.25 * height - 5 * ageNum + 5;
    } else {
      bmrMifflin = 10 * weight + 6.25 * height - 5 * ageNum - 161;
    }

    // 2. Harris-Benedict (Original 1918)
    let bmrHarrisOrig = 0;
    if (gender === 'male') {
      bmrHarrisOrig = 66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * ageNum;
    } else {
      bmrHarrisOrig = 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * ageNum;
    }

    // 3. Harris-Benedict (Revised 1984 by Roza and Shizgal)
    let bmrHarrisRev = 0;
    if (gender === 'male') {
      bmrHarrisRev = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * ageNum;
    } else {
      bmrHarrisRev = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * ageNum;
    }

    // 4. Katch-McArdle (Optional - depends on lean mass)
    let bmrKatch: number | null = null;
    const bfPercent = parseFloat(bodyFat);
    if (!isNaN(bfPercent) && bfPercent > 0 && bfPercent < 100) {
      const leanMassKg = weight * (1 - bfPercent / 100);
      bmrKatch = 370 + 21.6 * leanMassKg;
    }

    // Choose base BMR (Mifflin) to compute TDEE multipliers
    const baseBmr = bmrMifflin;
    const activities = [
      { label: 'Basal Metabolic Rate (BMR)', multiplier: 1.0 },
      { label: 'Sedentary (Little/no exercise, desk job)', multiplier: 1.2 },
      { label: 'Light Exercise (Workout 1-3 days/week)', multiplier: 1.375 },
      { label: 'Moderate Exercise (Workout 3-5 days/week)', multiplier: 1.55 },
      { label: 'Heavy Exercise (Workout 6-7 days/week)', multiplier: 1.725 },
      { label: 'Athlete / Physical Job (Heavy labor/2x daily)', multiplier: 1.9 },
    ];

    const tdeeBreakdown = activities.map(act => ({
      label: act.label,
      multiplier: act.multiplier,
      calories: Math.round(baseBmr * act.multiplier)
    }));

    setResult({
      mifflin: Math.round(bmrMifflin),
      harrisOriginal: Math.round(bmrHarrisOrig),
      harrisRevised: Math.round(bmrHarrisRev),
      katchMcArdle: bmrKatch ? Math.round(bmrKatch) : null,
      tdeeBreakdown
    });
  };

  const handleClear = () => {
    setAge('30');
    setGender('male');
    setWeightKg('75');
    setHeightCm('175');
    setWeightLbs('165');
    setHeightFt('5');
    setHeightIn('9');
    setBodyFat('');
    setResult(null);
  };

  useEffect(() => {
    calculateBmr();
  }, [unit, gender]);

  return (
    <div className="space-y-8" id="detailed-bmr-calculator-page">
      
      {/* Upper header note */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Calculate your rest metabolic rate using multiple scientific formulas</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Precise Metabolic Math
        </span>
      </div>

      {/* Main Form + Display Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Inputs Column */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Unit selection */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="bmr-tab-metric"
            >
              Metric Units
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="bmr-tab-us"
            >
              US Units
            </button>
          </div>

          {/* Gender and Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Age (Years)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                id="bmr-age-input"
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
                    name="bmr-gender"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="accent-emerald-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="bmr-gender"
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
          {unit === 'metric' && (
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  id="bmr-metric-height"
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  id="bmr-metric-weight"
                />
              </div>
            </div>
          )}

          {/* US Height and Weight */}
          {unit === 'us' && (
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
                      className="w-full pr-10 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">feet</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">inches</span>
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Optional body fat for advanced calculations */}
          <div className="pt-2 border-t border-dashed border-slate-200 dark:border-gray-800">
            <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase mb-1">
              Body Fat Percentage (Optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="90"
                value={bodyFat}
                placeholder="e.g. 15"
                onChange={(e) => setBodyFat(e.target.value)}
                className="w-1/2 px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 leading-normal max-w-[50%]">
                Enter your body fat ratio to compute the lean-mass driven <strong>Katch-McArdle Formula</strong>.
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={calculateBmr}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              id="bmr-btn-calculate"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate BMR</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              id="bmr-btn-clear"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-6 lg:col-span-7 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl p-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3 mb-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Results & Comparison</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">BMR Comparisons</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Mifflin BMR readout */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Mifflin-St Jeor (Primary)
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block">
                    {result.mifflin} <span className="text-xs text-slate-500">kcal/day</span>
                  </span>
                </div>
                <div className="p-2.5 bg-emerald-500 text-white rounded-lg">
                  <Flame className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* Formula Comparisons list */}
              <div className="space-y-2 text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-2">Alternative Equations</span>
                
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-gray-900">
                  <span className="text-slate-500">Revised Harris-Benedict (1984):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{result.harrisRevised} kcal</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-gray-900">
                  <span className="text-slate-500">Original Harris-Benedict (1918):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{result.harrisOriginal} kcal</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500 flex items-center gap-1">
                    <span>Katch-McArdle (Lean mass driven):</span>
                    {!result.katchMcArdle && <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.2 rounded font-sans">locked</span>}
                  </span>
                  <span className="font-bold text-slate-850 dark:text-slate-100 font-mono">
                    {result.katchMcArdle ? `${result.katchMcArdle} kcal` : 'Add Body Fat'}
                  </span>
                </div>
              </div>

              {/* TDEE Activity Multipliers breakdown */}
              <div className="border-t border-slate-100 dark:border-gray-800 pt-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-3 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Total Daily Energy Expenditure (TDEE) Breakdown</span>
                </span>
                
                <div className="space-y-2">
                  {result.tdeeBreakdown.slice(1).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-gray-900/40 border border-slate-100 dark:border-gray-900 text-xs"
                    >
                      <div className="max-w-[70%]">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block leading-tight">{item.label}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Multiplier factor: x{item.multiplier}</span>
                      </div>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{item.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-[320px] flex flex-col justify-center items-center text-center text-slate-400">
              <Flame className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Metabolic Baseline Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your age, height, and weight to generate and compare rest calorie expectations automatically.</p>
            </div>
          )}
        </div>

      </div>

      {/* Educational Article content */}
      <div className="space-y-6 pt-4">
        <section className="space-y-3 text-justify">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            What is Basal Metabolic Rate (BMR)?
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Your Basal Metabolic Rate (BMR) represents the absolute minimum amount of energy (expressed in kilocalories per day) that your body requires to preserve life-sustaining functions while at complete physiological rest, in a temperate climate, and in a post-absorptive state (12 hours of fasting). These mandatory operations include cardiovascular circulation, neurological processes, respiratory contraction, metabolic waste filtration, and cellular division.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            While BMR represents your metabolic rate under highly specific rest constraints, resting energy expenditure (REE) is often used interchangeably in clinical contexts. Approximately 60% to 75% of your Total Daily Energy Expenditure (TDEE) is governed strictly by your rest baseline, making your BMR the foundational element in calculating accurate caloric targets for weight loss, maintenance, or muscle development.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Clinical Formulas Discussed
          </h3>
          <div className="space-y-3.5 text-xs text-black dark:text-white leading-relaxed text-justify">
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">1. Mifflin-St Jeor Equation (1990)</strong>
              Considered the gold standard by dietitians and clinical institutions, Mifflin-St Jeor is highly precise for modern populations. It calculates resting metabolic cost based on weight, height, age, and biological gender.
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">2. Harris-Benedict (Original 1918 & Revised 1984)</strong>
              The Harris-Benedict model is one of the oldest predictive tools. While the 1918 original had minor demographic skewing, the Roza and Shizgal revision in 1984 corrected these parameters, aligning its accuracy closely to modern standards.
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">3. Katch-McArdle Formula</strong>
              Unlike height/weight models, Katch-McArdle predicts BMR entirely based on Lean Body Mass. Since adipose tissue is far less metabolically active than muscle tissue, individuals with low body fat or extreme muscularity find this formula significantly more accurate.
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
