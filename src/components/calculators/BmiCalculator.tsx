import React, { useState } from 'react';
import { Sparkles, Calculator, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BmiCalculator() {
  const [activeTab, setActiveTab] = useState<'us' | 'metric' | 'other'>('us');
  const [age, setAge] = useState<string>('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // US inputs
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('10');
  const [weightLbs, setWeightLbs] = useState<string>('160');

  // Metric inputs
  const [heightCm, setHeightCm] = useState<string>('178');
  const [weightKg, setWeightKg] = useState<string>('72');

  // Other units (UK Stones)
  const [weightSt, setWeightSt] = useState<string>('11');
  const [weightStLbs, setWeightStLbs] = useState<string>('6');
  const [heightOtherCm, setHeightOtherCm] = useState<string>('178');

  // Result state
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    catColor: string;
    catBg: string;
    healthyRange: string;
    healthyWeightText: string;
    bmiPrime: number;
    ponderalIndex: number;
    interpretation: string;
  } | null>(null);

  const calculateBmi = () => {
    let wKg = 0;
    let hM = 0;
    const ageNum = parseInt(age) || 25;

    if (activeTab === 'us') {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const lbs = parseFloat(weightLbs) || 0;
      
      const totalInches = ft * 12 + inch;
      hM = (totalInches * 2.54) / 100;
      wKg = lbs * 0.45359237;
    } else if (activeTab === 'metric') {
      const cm = parseFloat(heightCm) || 0;
      const kg = parseFloat(weightKg) || 0;
      
      hM = cm / 100;
      wKg = kg;
    } else {
      const stones = parseFloat(weightSt) || 0;
      const stLbs = parseFloat(weightStLbs) || 0;
      const cm = parseFloat(heightOtherCm) || 0;

      const totalLbs = stones * 14 + stLbs;
      wKg = totalLbs * 0.45359237;
      hM = cm / 100;
    }

    if (wKg <= 0 || hM <= 0) {
      alert('Please enter valid positive numbers for height and weight.');
      return;
    }

    const bmi = wKg / (hM * hM);
    const bmiFixed = parseFloat(bmi.toFixed(1));

    // Determine category
    let category = 'Normal';
    let catColor = 'text-emerald-600 dark:text-emerald-400';
    let catBg = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40';

    if (bmiFixed < 16) {
      category = 'Severe Thinness';
      catColor = 'text-red-600 dark:text-red-400';
      catBg = 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/40';
    } else if (bmiFixed < 17) {
      category = 'Moderate Thinness';
      catColor = 'text-amber-600 dark:text-amber-400';
      catBg = 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40';
    } else if (bmiFixed < 18.5) {
      category = 'Mild Thinness';
      catColor = 'text-yellow-600 dark:text-yellow-450';
      catBg = 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900/40';
    } else if (bmiFixed < 25) {
      category = 'Normal';
      catColor = 'text-emerald-600 dark:text-emerald-400';
      catBg = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40';
    } else if (bmiFixed < 30) {
      category = 'Overweight';
      catColor = 'text-amber-600 dark:text-amber-400';
      catBg = 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40';
    } else if (bmiFixed < 35) {
      category = 'Obese Class I (Moderate)';
      catColor = 'text-orange-600 dark:text-orange-400';
      catBg = 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/40';
    } else if (bmiFixed < 40) {
      category = 'Obese Class II (Severe)';
      catColor = 'text-red-500 dark:text-red-450';
      catBg = 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/40';
    } else {
      category = 'Obese Class III (Very Severe)';
      catColor = 'text-red-700 dark:text-red-400';
      catBg = 'bg-red-100 dark:bg-red-950/50 border-red-300 dark:border-red-900/60';
    }

    // Healthy weight range calculations
    const minHealthyKg = 18.5 * hM * hM;
    const maxHealthyKg = 25 * hM * hM;

    let healthyRange = '';
    let healthyWeightText = '';

    if (activeTab === 'us') {
      const minLbs = Math.round(minHealthyKg * 2.20462);
      const maxLbs = Math.round(maxHealthyKg * 2.20462);
      healthyRange = '18.5 kg/m² - 25 kg/m²';
      healthyWeightText = `${minLbs} lbs - ${maxLbs} lbs`;
    } else {
      healthyRange = '18.5 kg/m² - 25 kg/m²';
      healthyWeightText = `${minHealthyKg.toFixed(1)} kg - ${maxHealthyKg.toFixed(1)} kg`;
    }

    const bmiPrime = bmiFixed / 25;
    const ponderalIndex = wKg / Math.pow(hM, 3);

    let interpretation = '';
    if (bmiFixed < 18.5) {
      const kgToGain = minHealthyKg - wKg;
      let diffText = '';
      if (activeTab === 'us') {
        const lbsToGain = kgToGain * 2.20462;
        diffText = `${Math.ceil(lbsToGain)} lbs`;
      } else if (activeTab === 'other') {
        const lbsToGain = kgToGain * 2.20462;
        const stones = Math.floor(lbsToGain / 14);
        const lbs = Math.ceil(lbsToGain % 14);
        diffText = stones > 0 ? `${stones} st ${lbs} lbs` : `${lbs} lbs`;
      } else {
        diffText = `${kgToGain.toFixed(1)} kg`;
      }
      interpretation = `Your BMI of ${bmiFixed} falls within the ${category} weight range. Gain ${diffText} to reach a healthy BMI of 18.5 kg/m².`;
    } else if (bmiFixed >= 25) {
      const kgToLose = wKg - maxHealthyKg;
      let diffText = '';
      if (activeTab === 'us') {
        const lbsToLose = kgToLose * 2.20462;
        diffText = `${Math.ceil(lbsToLose)} lbs`;
      } else if (activeTab === 'other') {
        const lbsToLose = kgToLose * 2.20462;
        const stones = Math.floor(lbsToLose / 14);
        const lbs = Math.ceil(lbsToLose % 14);
        diffText = stones > 0 ? `${stones} st ${lbs} lbs` : `${lbs} lbs`;
      } else {
        diffText = `${kgToLose.toFixed(1)} kg`;
      }
      interpretation = `Your BMI of ${bmiFixed} falls within the ${category} weight range. Lose ${diffText} to reach a healthy BMI of 25.0 kg/m².`;
    } else {
      interpretation = `Your BMI of ${bmiFixed} falls within the Normal weight range. You are currently at a healthy weight. Keep up the excellent work!`;
    }

    setResult({
      bmi: bmiFixed,
      category,
      catColor,
      catBg,
      healthyRange,
      healthyWeightText,
      bmiPrime: parseFloat(bmiPrime.toFixed(2)),
      ponderalIndex: parseFloat(ponderalIndex.toFixed(1)),
      interpretation
    });
  };

  const handleClear = () => {
    setAge('25');
    setGender('male');
    setHeightFt('5');
    setHeightIn('10');
    weightLbs === '160' ? setWeightLbs('150') : setWeightLbs('160'); // force reset
    setHeightCm('178');
    setWeightKg('72');
    setWeightSt('11');
    setWeightStLbs('6');
    setHeightOtherCm('178');
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

  // Needle angle based on BMI (clamped from 10 to 40)
  const getNeedleAngle = (bmiVal: number) => {
    const minBmi = 10;
    const maxBmi = 40;
    const percentage = Math.min(Math.max((bmiVal - minBmi) / (maxBmi - minBmi), 0), 1);
    return percentage * 180; // 0 deg is left, 180 deg is right
  };

  // Run calculation initially
  React.useEffect(() => {
    calculateBmi();
  }, [activeTab]);

  const needleAngle = result ? getNeedleAngle(result.bmi) : 90;
  const needleX = 100 + 60 * Math.cos((needleAngle - 180) * Math.PI / 180);
  const needleY = 90 + 60 * Math.sin((needleAngle - 180) * Math.PI / 180);

  return (
    <div className="space-y-8" id="detailed-bmi-calculator-page">
      
      {/* 1. Interactive Form Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Modify the values and click the Calculate button to use</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Clinical Standard
        </span>
      </div>

      {/* 2. Side-By-Side Input & Result Pane */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Form: Inputs (7 cols on desktop) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Sub Unit tabs */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="bmi-tab-us"
            >
              US Units
            </button>
            <button
              onClick={() => setActiveTab('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="bmi-tab-metric"
            >
              Metric Units
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${activeTab === 'other' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="bmi-tab-other"
            >
              Other Units
            </button>
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Age
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="2"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  id="bmi-input-age"
                />
                <span className="text-[10px] text-slate-400 font-bold shrink-0">ages: 2 - 120</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Gender
              </label>
              <div className="flex items-center gap-4 py-1.5">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="accent-emerald-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="accent-emerald-600"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tab Specific Inputs */}
          {activeTab === 'us' && (
            <div className="space-y-4 pt-1 animate-in fade-in-30 duration-200">
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
                      id="bmi-us-ft"
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
                      id="bmi-us-in"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">inches</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Weight
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full pr-14 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                    id="bmi-us-weight"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">pounds</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metric' && (
            <div className="space-y-4 pt-1 animate-in fade-in-30 duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="250"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                    id="bmi-metric-height"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">cm</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Weight
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                    id="bmi-metric-weight"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">kg</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'other' && (
            <div className="space-y-4 pt-1 animate-in fade-in-30 duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="250"
                    value={heightOtherCm}
                    onChange={(e) => setHeightOtherCm(e.target.value)}
                    className="w-full pr-12 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                    id="bmi-other-height"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">cm</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                  Weight (UK Stones)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={weightSt}
                      onChange={(e) => setWeightSt(e.target.value)}
                      className="w-full pr-14 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                      id="bmi-other-stones"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">stones</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="13"
                      value={weightStLbs}
                      onChange={(e) => setWeightStLbs(e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                      id="bmi-other-lbs"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">lbs</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={calculateBmi}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              id="bmi-btn-calculate"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              id="bmi-btn-clear"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Right Result: Display (6 cols on desktop) */}
        <div className="md:col-span-6 lg:col-span-7 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl p-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3 mb-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Result</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Secure Calculations</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* BMI Headline */}
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold block uppercase tracking-wider">Calculated Score</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-extrabold text-slate-800 dark:text-white font-mono">
                    BMI = {result.bmi} kg/m²
                  </span>
                  <span className={`text-sm font-extrabold px-2 py-0.5 rounded-full ${result.catBg} ${result.catColor} border`}>
                    ({result.category})
                  </span>
                </div>
              </div>

              {/* Semicircle Gauge Visualizer */}
              <div className="flex flex-col items-center justify-center relative pt-2">
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
                  {/* Underweight (BMI 10 - 18.5) -> arc 51 to 0 (Left side) */}
                  <path
                    d={describeArcPath(100, 90, 75, 51, 0)}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Normal (BMI 18.5 - 25) -> arc 90 to 51 (Left-Center) */}
                  <path
                    d={describeArcPath(100, 90, 75, 90, 51)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Overweight (BMI 25 - 30) -> arc 120 to 90 (Right-Center) */}
                  <path
                    d={describeArcPath(100, 90, 75, 120, 90)}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />
                  {/* Obese (BMI 30 - 40) -> arc 180 to 120 (Right side) */}
                  <path
                    d={describeArcPath(100, 90, 75, 180, 120)}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="12"
                    strokeLinecap="butt"
                  />

                  {/* Meter labels styled elegantly with high-end typography */}
                  <text x="12" y="105" fill="#94a3b8" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Underweight</text>
                  <text x="58" y="42" fill="#10b981" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Normal</text>
                  <text x="142" y="42" fill="#eab308" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Overweight</text>
                  <text x="188" y="105" fill="#ef4444" fontSize="7.5" fontWeight="bold" textAnchor="middle" className="uppercase tracking-wider font-sans">Obese</text>

                  {/* Anchor and Needle pointer (Double-Ring Instrument style) */}
                  <line
                    x1="100"
                    y1="90"
                    x2={needleX}
                    y2={needleY}
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out dark:stroke-white"
                  />
                  
                  {/* Hub overlay */}
                  <circle cx="100" cy="90" r="7" fill="#0f172a" className="dark:fill-white" />
                  <circle cx="100" cy="90" r="2.5" fill="#ffffff" className="dark:fill-gray-950" />

                  {/* Center Score readout safely positioned below the hub to prevent overlapping with needle */}
                  <text x="100" y="108" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle" className="dark:fill-white font-mono">
                     {result.bmi}
                  </text>
                </svg>
              </div>

              {/* Result Interpretation */}
              <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/10 dark:border-emerald-500/20 rounded-xl space-y-1.5" id="bmi-result-interpretation">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
                  Result Interpretation
                </span>
                <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                  {result.interpretation}
                </p>
              </div>

              {/* Advanced Diagnostic Table details */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-gray-800 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900/40">
                  <span className="text-slate-500 font-medium">Healthy BMI Range:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{result.healthyRange}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900/40">
                  <span className="text-slate-500 font-medium">Healthy Weight for Height:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{result.healthyWeightText}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-gray-900/40">
                  <span className="text-slate-500 font-medium">BMI Prime:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{result.bmiPrime}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500 font-medium">Ponderal Index:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{result.ponderalIndex} kg/m³</span>
                </div>
              </div>

              {/* Standard Health Advisory disclaimer */}
              <div className="flex gap-2 p-3 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-lg text-[10px] text-amber-700 dark:text-amber-500">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                <p className="leading-normal">
                  <strong>Clinical Notice:</strong> BMI is a standard population screening metric. It does not measure body fat percentage directly and does not distinguish muscle mass from skeletal density. Highly trained athletes may score in the overweight tier despite healthy low body fat.
                </p>
              </div>

            </div>
          ) : (
            <div className="h-[280px] flex flex-col justify-center items-center text-center text-slate-400">
              <Calculator className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Ready to estimate your BMI</p>
              <p className="text-[10px] max-w-xs mt-1">Enter your details and click "Calculate" above to generate a full visual diagnostic report.</p>
            </div>
          )}
        </div>

      </div>

      {/* 3. Elaborate Scientific Literature (Literature review on BMI matching image) */}
      <div className="space-y-8 pt-6">
        
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            BMI Introduction
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Body Mass Index (BMI) is a standardized measurement of a person's leanness or corpulence based on their height and weight, designed to quantify active tissue mass. It is internationally utilized by health practitioners and scientific agencies as a foundational indicator of whether an individual possesses an appropriate body weight for their height.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Specifically, the value obtained from calculating BMI serves to place individuals into eight distinct weight ranges: Underweight (comprising severe, moderate, and mild thinness subclasses), Normal Weight, Overweight, and Obese (comprising Class I, II, and III subclasses). These weight tiers directly correspond to metabolic risk factors and cardiovascular health standards formulated by the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC).
          </p>
        </section>

        {/* Classification table */}
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            BMI Table for Adults
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            This is the World Health Organization's (WHO) internationally recognized body classification system based on BMI scores for adults aged 20 years or older.
          </p>
          <div className="overflow-hidden border border-slate-200 dark:border-gray-800 rounded-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800">
                  <th className="p-3 font-bold text-slate-700 dark:text-gray-300">Classification</th>
                  <th className="p-3 font-bold text-slate-700 dark:text-gray-300">BMI Range (kg/m²)</th>
                  <th className="p-3 font-bold text-slate-700 dark:text-gray-300">BMI Prime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-gray-800">
                <tr>
                  <td className="p-3 font-medium text-blue-600">Severe Thinness</td>
                  <td className="p-3 font-mono font-semibold">&lt; 16.0</td>
                  <td className="p-3 font-mono font-semibold">&lt; 0.64</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-blue-500">Moderate Thinness</td>
                  <td className="p-3 font-mono font-semibold">16.0 - 17.0</td>
                  <td className="p-3 font-mono font-semibold">0.64 - 0.68</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-blue-400">Mild Thinness</td>
                  <td className="p-3 font-mono font-semibold">17.0 - 18.5</td>
                  <td className="p-3 font-mono font-semibold">0.68 - 0.74</td>
                </tr>
                <tr className="bg-emerald-50/30 dark:bg-emerald-950/5">
                  <td className="p-3 font-bold text-emerald-600">Normal Weight</td>
                  <td className="p-3 font-mono font-bold text-slate-800 dark:text-white">18.5 - 25.0</td>
                  <td className="p-3 font-mono font-bold text-slate-800 dark:text-white">0.74 - 1.0</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-amber-600">Overweight</td>
                  <td className="p-3 font-mono font-semibold">25.0 - 30.0</td>
                  <td className="p-3 font-mono font-semibold">1.0 - 1.2</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-orange-600">Obese Class I (Moderate)</td>
                  <td className="p-3 font-mono font-semibold">30.0 - 35.0</td>
                  <td className="p-3 font-mono font-semibold">1.2 - 1.4</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-red-500">Obese Class II (Severe)</td>
                  <td className="p-3 font-mono font-semibold">35.0 - 40.0</td>
                  <td className="p-3 font-mono font-semibold">1.4 - 1.6</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-red-700">Obese Class III (Very Severe)</td>
                  <td className="p-3 font-mono font-semibold">&gt; 40.0</td>
                  <td className="p-3 font-mono font-semibold">&gt; 1.6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Health risks section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3 bg-white dark:bg-gray-950">
            <h3 className="text-sm font-bold text-red-600 flex items-center gap-2 uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              <span>Risks of Overweight & Obesity</span>
            </h3>
            <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
              Excess body fat increases the risk of numerous acute and chronic health conditions. According to the CDC, these risks include:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-black dark:text-white">
              <li>High blood pressure and hypertension</li>
              <li>Type 2 diabetes mellitus</li>
              <li>Coronary heart disease and myocardial infarction</li>
              <li>Stroke and cardiovascular events</li>
              <li>Gallbladder disease and sleep apnea</li>
              <li>Osteoarthritis and articular cartilage breakdown</li>
              <li>Reduced overall quality of life and clinical mobility impairments</li>
            </ul>
          </div>

          <div className="border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3 bg-white dark:bg-gray-950">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2 uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              <span>Risks of Being Underweight</span>
            </h3>
            <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
              Being underweight is associated with physiological deficits and endocrine disruptions, presenting its own set of critical health risks:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-black dark:text-white">
              <li>Malnutrition, vitamin deficiencies, and severe anemia</li>
              <li>Osteoporosis and premature bone density loss (osteopenia)</li>
              <li>Decreased immune response and elevated susceptibility to infectious illnesses</li>
              <li>Growth and physical developmental delays in children and teenagers</li>
              <li>Endocrine imbalances and reproductive issues (such as amenorrhea in females)</li>
              <li>Post-surgical complications and slower clinical wound healing rates</li>
            </ul>
          </div>
        </section>

        {/* Scientific formulas */}
        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
            <span>Mathematical Formula Foundations</span>
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Below are the exact equations utilized globally to compute body composition and relative index scores:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-white dark:bg-gray-950 p-3 rounded-lg border border-slate-150 dark:border-gray-800 text-center">
              <span className="block font-bold text-slate-800 dark:text-slate-300 mb-1">Standard BMI Formula</span>
              <div className="text-[11px] text-black dark:text-white">
                BMI = weight (kg) / [height (m)]²
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 p-3 rounded-lg border border-slate-150 dark:border-gray-800 text-center">
              <span className="block font-bold text-slate-800 dark:text-slate-300 mb-1">US Imperial Formula</span>
              <div className="text-[11px] text-black dark:text-white">
                BMI = 703 × weight (lbs) / [height (in)]²
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 p-3 rounded-lg border border-slate-150 dark:border-gray-800 text-center">
              <span className="block font-bold text-slate-800 dark:text-slate-300 mb-1">Ponderal Index (PI)</span>
              <div className="text-[11px] text-black dark:text-white">
                PI = weight (kg) / [height (m)]³
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
