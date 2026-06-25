import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<string>('176');

  // US Inputs
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  const [result, setResult] = useState<{
    devine: number;
    robinson: number;
    miller: number;
    hamwi: number;
    bmiMin: number;
    bmiMax: number;
  } | null>(null);

  const calculateIdealWeight = () => {
    let htCm = 0;
    if (unit === 'metric') {
      htCm = parseFloat(heightCm) || 0;
    } else {
      htCm = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
    }

    if (htCm <= 0) return;

    // Height in inches
    const heightInches = htCm / 2.54;
    // Inches above 5 feet (60 inches)
    const inchesAbove5 = Math.max(heightInches - 60, -20); // allow negative for under 5ft, but clip at -20 for safety

    // 1. Devine (1974)
    let devineKg = 0;
    if (gender === 'male') {
      devineKg = 50.0 + 2.3 * inchesAbove5;
    } else {
      devineKg = 45.5 + 2.3 * inchesAbove5;
    }

    // 2. Robinson (1980)
    let robinsonKg = 0;
    if (gender === 'male') {
      robinsonKg = 52.0 + 1.9 * inchesAbove5;
    } else {
      robinsonKg = 49.0 + 1.7 * inchesAbove5;
    }

    // 3. Miller (1983)
    let millerKg = 0;
    if (gender === 'male') {
      millerKg = 56.2 + 1.41 * inchesAbove5;
    } else {
      millerKg = 53.1 + 1.36 * inchesAbove5;
    }

    // 4. Hamwi (1964)
    let hamwiKg = 0;
    if (gender === 'male') {
      hamwiKg = 48.0 + 2.7 * inchesAbove5;
    } else {
      hamwiKg = 45.5 + 2.2 * inchesAbove5;
    }

    // 5. Modern BMI Range (18.5 - 25)
    const hM = htCm / 100;
    const bmiMinKg = 18.5 * hM * hM;
    const bmiMaxKg = 25.0 * hM * hM;

    // Convert weights based on unit selection
    const multiplier = unit === 'us' ? 2.20462 : 1;

    setResult({
      devine: parseFloat((Math.max(devineKg, 30) * multiplier).toFixed(1)),
      robinson: parseFloat((Math.max(robinsonKg, 30) * multiplier).toFixed(1)),
      miller: parseFloat((Math.max(millerKg, 30) * multiplier).toFixed(1)),
      hamwi: parseFloat((Math.max(hamwiKg, 30) * multiplier).toFixed(1)),
      bmiMin: parseFloat((bmiMinKg * multiplier).toFixed(1)),
      bmiMax: parseFloat((bmiMaxKg * multiplier).toFixed(1))
    });
  };

  const handleClear = () => {
    setGender('male');
    setHeightCm('176');
    setHeightFt('5');
    setHeightIn('9');
    setResult(null);
  };

  useEffect(() => {
    calculateIdealWeight();
  }, [unit, gender]);

  return (
    <div className="space-y-8" id="detailed-idealweight-calculator-page">
      
      {/* Header bar */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Compare classic clinical Ideal Body Weight (IBW) parameters</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Clinical Metrics
        </span>
      </div>

      {/* Main calculation pane */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Inputs (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Unit Toggle */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="iw-tab-metric"
            >
              Metric (cm)
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="iw-tab-us"
            >
              US (feet/inches)
            </button>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Gender
            </label>
            <div className="flex items-center gap-4 py-1.5">
              <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="iw-gender"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="accent-emerald-600"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="iw-gender"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="accent-emerald-600"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Height Metric */}
          {unit === 'metric' ? (
            <div className="animate-in fade-in-30 duration-200">
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                min="100"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white"
                id="iw-height-metric"
              />
            </div>
          ) : (
            <div className="animate-in fade-in-30 duration-200">
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
                Height (Feet/Inches)
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
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateIdealWeight}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              id="iw-btn-calculate"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Ideal Weight</span>
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
              <span>Clinical Ideal Weights</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Formula Comparisons</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Devine formula highlight */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Ideal Body Weight (Devine standard)
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block" id="iw-result-val">
                    {result.devine} <span className="text-xs text-slate-500 font-sans">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    Devine is the official standard for clinical pharmacology dosage.
                  </span>
                </div>
                <div className="p-2.5 bg-emerald-500 text-white rounded-lg">
                  <Scale className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* Modern BMI Range Box */}
              <div className="p-3 bg-slate-50 dark:bg-gray-900/40 border border-slate-150 dark:border-gray-850 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400 block mb-1">
                  Modern Healthy BMI Weight Corridor (18.5 - 25.0)
                </span>
                <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono">
                  {result.bmiMin} – {result.bmiMax} {unit === 'metric' ? 'kg' : 'lbs'}
                </span>
                <p className="text-[9px] text-slate-400 leading-snug mt-1 text-justify">
                  Unlike rigid single-number formulas from the 1900s, this range represents a flexible, scientifically robust healthy weight bracket aligned with lower overall morbidity.
                </p>
              </div>

              {/* Other clinical formulas comparisons */}
              <div className="space-y-4 text-xs border-t border-slate-100 dark:border-gray-800 pt-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
                  Clinical Formula Comparisons
                </span>

                {(() => {
                  const allVals = [result.devine, result.robinson, result.miller, result.hamwi, result.bmiMin, result.bmiMax];
                  const minVal = Math.min(...allVals) - 8;
                  const maxVal = Math.max(...allVals) + 8;
                  const getPct = (v: number) => Math.min(Math.max(((v - minVal) / (maxVal - minVal)) * 100, 0), 100);

                  return (
                    <div className="space-y-3.5">
                      {[
                        { name: "Devine Standard (Clinical baseline)", val: result.devine, color: "#10b981" },
                        { name: "Hamwi Standard (Traditional target)", val: result.hamwi, color: "#6366f1" },
                        { name: "Robinson Standard (General target)", val: result.robinson, color: "#3b82f6" },
                        { name: "Miller Standard (Clinical target)", val: result.miller, color: "#f59e0b" },
                      ].map((f, idx) => {
                        const valuePct = getPct(f.val);
                        const bmiMinPct = getPct(result.bmiMin);
                        const bmiMaxPct = getPct(result.bmiMax);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold">
                              <span className="text-slate-800 dark:text-slate-200">{f.name}</span>
                              <span className="font-mono" style={{ color: f.color }}>{f.val} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                            </div>
                            <div className="h-4.5 w-full bg-slate-100 dark:bg-gray-900 rounded-full relative overflow-hidden border border-slate-200 dark:border-gray-800">
                              {/* Healthy BMI Corridor shaded in background */}
                              <div
                                className="absolute h-full bg-emerald-500/15 border-x border-emerald-500/35"
                                style={{ left: `${bmiMinPct}%`, right: `${100 - bmiMaxPct}%` }}
                              />
                              {/* Active Value Pin Indicator */}
                              <div
                                className="absolute top-0.5 bottom-0.5 w-3.5 rounded-full border border-white dark:border-gray-950 shadow-md transition-all duration-500"
                                style={{ left: `calc(${valuePct}% - 7px)`, backgroundColor: f.color }}
                                title={`Ideal: ${f.val}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase tracking-wider px-1">
                        <span>Min Scale: {minVal.toFixed(0)} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                        <span className="text-emerald-500">Green Zone = Healthy BMI Range</span>
                        <span>Max Scale: {maxVal.toFixed(0)} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          ) : (
            <div className="h-[280px] flex flex-col justify-center items-center text-center text-slate-400">
              <Scale className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">Ideal Body Weight Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your biological gender and height to calculate clinical ideal weight expectations automatically across multiple standards.</p>
            </div>
          )}
        </div>

      </div>

      {/* Literary discussion */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            What is "Ideal Body Weight" (IBW)?
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            The concept of Ideal Body Weight (IBW) was originally established in the mid-1905s by the Metropolitan Life Insurance Company to estimate mortality statistics based on height and frame sizing. Over time, these tables were refined into mathematical formulas to serve practical clinical roles.
          </p>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            In modern clinical medicine, IBW is not used as a strict aesthetic guideline. Instead, clinicians utilize these precise formulas to adjust pharmacology dosing (since adipose tissue does not absorb hydrophilic medications at the same rate as lean tissue), configure mechanical ventilators for respiratory therapy, and establish safe surgical parameters.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Review of the Four Clinical Formulas
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            The <strong>Hamwi Formula</strong> (1964) is the oldest and is frequently used as a quick mental guideline. The <strong>Devine Formula</strong> (1974) is the most widely adopted in clinical pharmacology. The <strong>Robinson Formula</strong> (1980) and <strong>Miller Formula</strong> (1983) were introduced as statistical corrections to Devine, utilizing slightly flatter slopes to better model modern patient populations.
          </p>
        </section>
      </div>

    </div>
  );
}
