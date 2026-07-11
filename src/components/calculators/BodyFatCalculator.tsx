import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, HelpCircle, AlertTriangle, ShieldCheck, Ruler } from 'lucide-react';

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('30');

  // Metric Inputs
  const [weightKg, setWeightKg] = useState<string>('80');
  const [heightCm, setHeightCm] = useState<string>('180');
  const [neckCm, setNeckCm] = useState<string>('38');
  const [waistCm, setWaistCm] = useState<string>('88');
  const [hipsCm, setHipsCm] = useState<string>('98'); // female only

  // US Inputs
  const [weightLbs, setWeightLbs] = useState<string>('175');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('11');
  const [neckIn, setNeckIn] = useState<string>('15');
  const [waistIn, setWaistIn] = useState<string>('34.5');
  const [hipsIn, setHipsIn] = useState<string>('38.5'); // female only

  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    catColor: string;
    fatMass: number;
    leanMass: number;
    idealBfRange: string;
  } | null>(null);

  const calculateBodyFat = () => {
    let wtKg = 0;
    let htCm = 0;
    let nCm = 0;
    let wCm = 0;
    let hCm = 0; // hips

    if (unit === 'metric') {
      wtKg = parseFloat(weightKg) || 0;
      htCm = parseFloat(heightCm) || 0;
      nCm = parseFloat(neckCm) || 0;
      wCm = parseFloat(waistCm) || 0;
      hCm = parseFloat(hipsCm) || 0;
    } else {
      wtKg = (parseFloat(weightLbs) || 0) * 0.45359237;
      htCm = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
      nCm = (parseFloat(neckIn) || 0) * 2.54;
      wCm = (parseFloat(waistIn) || 0) * 2.54;
      hCm = (parseFloat(hipsIn) || 0) * 2.54;
    }

    if (wtKg <= 0 || htCm <= 0 || nCm <= 0 || wCm <= 0 || (gender === 'female' && hCm <= 0)) {
      return;
    }

    let bf = 0;
    // US Navy Formulas
    if (gender === 'male') {
      // 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76 (using inches)
      // Converting cm to inches for the Navy Formula parameters
      const waist_in = wCm / 2.54;
      const neck_in = nCm / 2.54;
      const height_in = htCm / 2.54;

      if (waist_in - neck_in <= 0) return;
      bf = 86.010 * Math.log10(waist_in - neck_in) - 70.041 * Math.log10(height_in) + 36.76;
    } else {
      // 163.205 * log10(waist + hips - neck) - 97.684 * log10(height) - 78.387
      const waist_in = wCm / 2.54;
      const neck_in = nCm / 2.54;
      const height_in = htCm / 2.54;
      const hips_in = hCm / 2.54;

      if (waist_in + hips_in - neck_in <= 0) return;
      bf = 163.205 * Math.log10(waist_in + hips_in - neck_in) - 97.684 * Math.log10(height_in) - 78.387;
    }

    const bodyFatVal = Math.min(Math.max(parseFloat(bf.toFixed(1)), 2), 60);

    // Determine category based on American Council on Exercise (ACE) standards
    let category = 'Average';
    let catColor = 'bg-yellow-500';

    if (gender === 'male') {
      if (bodyFatVal < 6) {
        category = 'Essential Fat';
        catColor = 'bg-blue-400';
      } else if (bodyFatVal < 14) {
        category = 'Athletic';
        catColor = 'bg-emerald-500';
      } else if (bodyFatVal < 18) {
        category = 'Fitness';
        catColor = 'bg-emerald-400';
      } else if (bodyFatVal < 25) {
        category = 'Average';
        catColor = 'bg-yellow-500';
      } else {
        category = 'Obese';
        catColor = 'bg-red-500';
      }
    } else {
      // Female
      if (bodyFatVal < 14) {
        category = 'Essential Fat';
        catColor = 'bg-blue-400';
      } else if (bodyFatVal < 21) {
        category = 'Athletic';
        catColor = 'bg-emerald-500';
      } else if (bodyFatVal < 25) {
        category = 'Fitness';
        catColor = 'bg-emerald-400';
      } else if (bodyFatVal < 32) {
        category = 'Average';
        catColor = 'bg-yellow-500';
      } else {
        category = 'Obese';
        catColor = 'bg-red-500';
      }
    }

    const absFatMass = wtKg * (bodyFatVal / 100);
    const absLeanMass = wtKg - absFatMass;

    // Output weights based on unit selection
    const displayFatMass = unit === 'metric' ? absFatMass : absFatMass * 2.20462;
    const displayLeanMass = unit === 'metric' ? absLeanMass : absLeanMass * 2.20462;

    const idealBfRange = gender === 'male' ? '10% – 20%' : '18% – 28%';

    setResult({
      bodyFat: bodyFatVal,
      category,
      catColor,
      fatMass: parseFloat(displayFatMass.toFixed(1)),
      leanMass: parseFloat(displayLeanMass.toFixed(1)),
      idealBfRange
    });
  };

  const handleClear = () => {
    setAge('30');
    setGender('male');
    setWeightKg('80');
    setHeightCm('180');
    setNeckCm('38');
    setWaistCm('88');
    setHipsCm('98');
    setWeightLbs('175');
    setHeightFt('5');
    setHeightIn('11');
    setNeckIn('15');
    setWaistIn('34.5');
    setHipsIn('38.5');
    setResult(null);
  };

  // Helper for polar to cartesian SVG coordinates
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArcPath = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(' ');
  };

  const getBfAngle = (val: number) => {
    const minBf = 2;
    const maxBf = 40;
    const pct = Math.min(Math.max((val - minBf) / (maxBf - minBf), 0), 1);
    return pct * 180; // 0 degrees is left (Essential), 180 degrees is right (Obese)
  };

  // Gender-adaptive segment boundaries
  const angleEss = getBfAngle(gender === 'male' ? 6 : 14);
  const angleAth = getBfAngle(gender === 'male' ? 14 : 21);
  const angleFit = getBfAngle(gender === 'male' ? 18 : 25);
  const angleAvg = getBfAngle(gender === 'male' ? 25 : 32);

  const bfVal = result ? result.bodyFat : 15;
  const bfNeedleAngle = getBfAngle(bfVal);
  const bfNeedleX = 100 + 60 * Math.cos((bfNeedleAngle - 180) * Math.PI / 180);
  const bfNeedleY = 90 + 60 * Math.sin((bfNeedleAngle - 180) * Math.PI / 180);

  useEffect(() => {
    calculateBodyFat();
  }, [unit, gender]);

  return (
    <div className="space-y-8" id="detailed-bodyfat-calculator-page">
      
      {/* Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Estimate body fat percentage using the standardized US Navy Method</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          US Navy Standard
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
              id="bf-tab-metric"
            >
              Metric (cm/kg)
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="bf-tab-us"
            >
              US (inches/lbs)
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
                min="15"
                max="90"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                id="bf-input-age"
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
                    name="bf-gender"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="accent-emerald-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="bf-gender"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="accent-emerald-600"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Metric Sub-inputs */}
          {unit === 'metric' && (
            <div className="space-y-4 animate-in fade-in-30 duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800"
                    id="bf-height-metric"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800"
                    id="bf-weight-metric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Neck (cm)
                  </label>
                  <input
                    type="number"
                    value={neckCm}
                    onChange={(e) => setNeckCm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800"
                    id="bf-neck-metric"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Waist (cm)
                  </label>
                  <input
                    type="number"
                    value={waistCm}
                    onChange={(e) => setWaistCm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800"
                    id="bf-waist-metric"
                  />
                </div>
              </div>

              {gender === 'female' && (
                <div className="animate-in slide-in-from-top-3 duration-200">
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Hips (cm)
                  </label>
                  <input
                    type="number"
                    value={hipsCm}
                    onChange={(e) => setHipsCm(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800"
                    id="bf-hips-metric"
                  />
                </div>
              )}
            </div>
          )}

          {/* US Sub-inputs */}
          {unit === 'us' && (
            <div className="space-y-4 animate-in fade-in-30 duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Height (Ft/In)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="ft"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-1/2 px-2 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-850"
                    />
                    <input
                      type="number"
                      placeholder="in"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-1/2 px-2 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-850"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Neck (inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={neckIn}
                    onChange={(e) => setNeckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-850"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Waist (inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={waistIn}
                    onChange={(e) => setWaistIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-850"
                  />
                </div>
              </div>

              {gender === 'female' && (
                <div className="animate-in slide-in-from-top-3 duration-200">
                  <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                    Hips (inches)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={hipsIn}
                    onChange={(e) => setHipsIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-850"
                  />
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateBodyFat}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              id="bf-btn-calculate"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate BF%</span>
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
              <span>Calculated Body Composition</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Composition Metrics</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* BF% Highlight box */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Calculated Body Fat Percentage
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block" id="bf-result-val">
                    {result.bodyFat}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    Classification Category: <strong>{result.category}</strong>
                  </span>
                </div>
                <div className={`h-8 w-8 rounded-full ${result.catColor} border-2 border-white dark:border-gray-800 shrink-0`} />
              </div>

              {/* Composition weights breakdown */}
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-slate-100 dark:border-gray-800 pt-4">
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">Absolute Fat Mass</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.fatMass} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block leading-tight">Total metabolic storage tissue</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">Lean Body Mass (LBM)</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.leanMass} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block leading-tight">Muscle, bones, vital skeletal organs</span>
                </div>
              </div>

              {/* Dynamic Semicircle Gauge Visualizer */}
              <div className="flex flex-col items-center justify-center relative pt-4 border-t border-slate-100 dark:border-gray-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">ACSM/ACE Body Fat Gauge Spectrum (Ideal: {result.idealBfRange})</span>
                
                <svg viewBox="-20 0 240 115" className="w-full max-w-[300px]">
                  {/* Background Track to give a cohesive, premium dashboard look */}
                  <path
                    d={describeArcPath(100, 90, 75, 180, 0)}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                    strokeLinecap="butt"
                    className="dark:stroke-gray-900"
                  />

                  {/* Arc Segments: Outer arc of gauge representing different health zones mapped Left-to-Right */}
                  {/* Essential Fat (Blue) */}
                  <path
                    d={describeArcPath(100, 90, 75, angleEss, 0)}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Athletic (Emerald 500) */}
                  <path
                    d={describeArcPath(100, 90, 75, angleAth, angleEss)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Fitness (Emerald 400) */}
                  <path
                    d={describeArcPath(100, 90, 75, angleFit, angleAth)}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Average (Yellow 500) */}
                  <path
                    d={describeArcPath(100, 90, 75, angleAvg, angleFit)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Obese (Red 500) */}
                  <path
                    d={describeArcPath(100, 90, 75, 180, angleAvg)}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />

                  {/* Meter labels styled elegantly with high-end typography */}
                  <text x="12" y="105" fill="#94a3b8" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Essential</text>
                  <text x="54" y="42" fill="#10b981" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Athletic</text>
                  <text x="100" y="24" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Fitness</text>
                  <text x="146" y="42" fill="#fbbf24" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Average</text>
                  <text x="188" y="105" fill="#ef4444" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Obese</text>

                  {/* Anchor and Needle pointer (Double-Ring Instrument style) */}
                  <line
                    x1="100"
                    y1="90"
                    x2={bfNeedleX}
                    y2={bfNeedleY}
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out dark:stroke-white"
                  />
                  
                  {/* Hub overlay */}
                  <circle cx="100" cy="90" r="7" fill="#0f172a" className="dark:fill-white" />
                  <circle cx="100" cy="90" r="2.5" fill="#ffffff" className="dark:fill-gray-950" />

                  {/* Center Score readout safely positioned below the hub */}
                  <text x="100" y="108" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle" className="dark:fill-white font-mono">
                     {result.bodyFat}%
                  </text>
                </svg>
              </div>

            </div>
          ) : (
            <div className="h-[280px] flex flex-col justify-center items-center text-center text-slate-400">
              <Ruler className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Body Composition Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your waist, neck, height, and hip (for females) circumferences to see estimated body fat ratio, muscle weights, and categories.</p>
            </div>
          )}
        </div>

      </div>

      {/* Instructional Measurement guide */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Ruler className="h-4.5 w-4.5 text-emerald-500" />
          <span>How to Take Measurements for Navy Method Accuracy</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-black dark:text-white leading-relaxed text-justify">
          <div className="p-4 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl space-y-2">
            <strong className="text-slate-800 dark:text-slate-200 block border-b border-slate-100 dark:border-gray-900 pb-1.5">1. Neck Measurement</strong>
            Measure directly below the larynx (Adam's apple), wrapping the tape horizontal to the floor. Keep your shoulders relaxed and don't flare your neck.
          </div>
          <div className="p-4 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl space-y-2">
            <strong className="text-slate-800 dark:text-slate-200 block border-b border-slate-100 dark:border-gray-900 pb-1.5">2. Waist Measurement</strong>
            Measure horizontally around the abdomen, right at the navel (belly button) level for males, or at the narrowest natural waistline above the navel for females. Don't suck in!
          </div>
          <div className="p-4 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl space-y-2">
            <strong className="text-slate-800 dark:text-slate-200 block border-b border-slate-100 dark:border-gray-900 pb-1.5">3. Hips Measurement (Females)</strong>
            Wrap the tape measure horizontally around the widest part of the hips and gluteal cheeks. Make sure the tape is flat and level all the way around.
          </div>
        </div>
      </div>

    </div>
  );
}
