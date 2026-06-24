import { useState } from 'react';
import { Scale, Zap, Info, ShieldAlert, Check } from 'lucide-react';

/* ==========================================================
   1. BMI CALCULATOR COMPONENT
   ========================================================== */
export function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  // Calculations
  let bmi = 0;
  if (unit === 'metric') {
    if (heightCm > 0) {
      bmi = weight / Math.pow(heightCm / 100, 2);
    }
  } else {
    const totalInches = (heightFt * 12) + heightIn;
    if (totalInches > 0) {
      bmi = (weightLbs * 703) / Math.pow(totalInches, 2);
    }
  }

  const bmiFixed = parseFloat(bmi.toFixed(1));

  const getBmiCategory = (val: number) => {
    if (val <= 0) return { label: 'Invalid', color: 'text-gray-400', bg: 'bg-gray-100', progress: 0 };
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100', progress: 15 };
    if (val < 25) return { label: 'Normal Weight', color: 'text-emerald-600', bg: 'bg-emerald-100', progress: 45 };
    if (val < 30) return { label: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-100', progress: 70 };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-100', progress: 90 };
  };

  const cat = getBmiCategory(bmiFixed);

  return (
    <div className="space-y-6" id="bmi-calculator-tool">
      {/* Unit Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
        <button
          onClick={() => setUnit('metric')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            unit === 'metric' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
          }`}
          id="bmi-unit-metric"
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            unit === 'imperial' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
          }`}
          id="bmi-unit-imperial"
        >
          Imperial (lbs/ft-in)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input sliders */}
        <div className="space-y-4">
          {unit === 'metric' ? (
            <>
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span>Weight</span>
                  <span className="text-emerald-600 font-bold">{weight} kg</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  id="bmi-metric-weight"
                />
              </div>
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span>Height</span>
                  <span className="text-emerald-600 font-bold">{heightCm} cm</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="230"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  id="bmi-metric-height"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span>Weight</span>
                  <span className="text-emerald-600 font-bold">{weightLbs} lbs</span>
                </label>
                <input
                  type="range"
                  min="70"
                  max="400"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  id="bmi-imperial-weight"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Height (Feet)</label>
                  <input
                    type="number"
                    min="3"
                    max="8"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
                    id="bmi-imperial-height-ft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Height (Inches)</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
                    id="bmi-imperial-height-in"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Display Results */}
        <div className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Calculated Body Mass Index</span>
          <span className="text-5xl font-extrabold text-gray-950 dark:text-white mt-2" id="bmi-result-val">
            {bmiFixed > 0 ? bmiFixed : '--'}
          </span>

          <span className={`inline-block mt-3 px-3 py-1.5 rounded-full text-xs font-bold ${cat.bg} ${cat.color}`}>
            {cat.label}
          </span>

          {/* Graphical slider track */}
          <div className="w-full mt-6">
            <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-1">
              <span>18.5</span>
              <span>25.0</span>
              <span>30.0</span>
            </div>
            <div className="relative h-2.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              {/* Scale bands colors */}
              <div className="absolute top-0 bottom-0 left-0 w-[18.5%] bg-blue-300" />
              <div className="absolute top-0 bottom-0 left-[18.5%] w-[31.5%] bg-emerald-400" />
              <div className="absolute top-0 bottom-0 left-[50%] w-[25%] bg-amber-400" />
              <div className="absolute top-0 bottom-0 left-[75%] w-[25%] bg-red-400" />

              {/* Slider thumb positioner */}
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-slate-950 border border-white transition-all duration-300"
                style={{ left: `${Math.min(Math.max(cat.progress, 2), 97)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   2. BMR CALCULATOR COMPONENT
   ========================================================== */
export function BmrCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  // Mifflin-St Jeor
  let bmr = 0;
  const wtKg = unit === 'metric' ? weight : weightLbs * 0.45359237;
  const htCm = unit === 'metric' ? height : ((heightFt * 12) + heightIn) * 2.54;

  if (wtKg > 0 && htCm > 0 && age > 0) {
    if (gender === 'male') {
      bmr = (10 * wtKg) + (6.25 * htCm) - (5 * age) + 5;
    } else {
      bmr = (10 * wtKg) + (6.25 * htCm) - (5 * age) - 161;
    }
  }

  const bmrVal = Math.round(bmr);

  return (
    <div className="space-y-6" id="bmr-calculator-tool">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Unit Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'metric' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
            }`}
            id="bmr-unit-metric"
          >
            Metric
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'imperial' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'
            }`}
            id="bmr-unit-imperial"
          >
            Imperial
          </button>
        </div>

        {/* Gender Choice */}
        <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
          <button
            onClick={() => setGender('male')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              gender === 'male' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500'
            }`}
            id="bmr-gender-male"
          >
            Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              gender === 'female' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500'
            }`}
            id="bmr-gender-female"
          >
            Female
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Age</span>
              <span className="text-emerald-600 font-bold">{age} years</span>
            </label>
            <input
              type="range"
              min="15"
              max="90"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="bmr-age-slider"
            />
          </div>

          {unit === 'metric' ? (
            <>
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span>Weight</span>
                  <span className="text-emerald-600 font-bold">{weight} kg</span>
                </label>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  id="bmr-weight-metric"
                />
              </div>
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span>Height</span>
                  <span className="text-emerald-600 font-bold">{height} cm</span>
                </label>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  id="bmr-height-metric"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <span>Weight</span>
                  <span className="text-emerald-600 font-bold">{weightLbs} lbs</span>
                </label>
                <input
                  type="range"
                  min="80"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  id="bmr-weight-imperial"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Height (Ft)</label>
                  <input
                    type="number"
                    min="4"
                    max="7"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
                    id="bmr-height-imperial-ft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Height (In)</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
                    id="bmr-height-imperial-in"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border border-gray-100 dark:border-gray-800 bg-emerald-50/10 dark:bg-emerald-950/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <span className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Calculated Basal Metabolic Rate</span>
          <span className="text-5xl font-extrabold text-gray-950 dark:text-white mt-2" id="bmr-result-val">
            {bmrVal > 0 ? bmrVal : '--'} <span className="text-xl font-medium text-gray-400">kcal/day</span>
          </span>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed max-w-xs">
            This represents your daily energy cost strictly to preserve visceral systems at complete rest without taking into account physical motion.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   3. CALORIE CALCULATOR COMPONENT
   ========================================================== */
export function CalorieCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [activity, setActivity] = useState<number>(1.55); // Moderate default

  const wtKg = unit === 'metric' ? weight : weightLbs * 0.45359237;
  const htCm = unit === 'metric' ? height : ((heightFt * 12) + heightIn) * 2.54;

  let bmr = 0;
  if (wtKg > 0 && htCm > 0 && age > 0) {
    if (gender === 'male') {
      bmr = (10 * wtKg) + (6.25 * htCm) - (5 * age) + 5;
    } else {
      bmr = (10 * wtKg) + (6.25 * htCm) - (5 * age) - 161;
    }
  }

  const tdee = Math.round(bmr * activity);

  const activities = [
    { label: 'Sedentary', desc: 'Little or no exercise, desk job', multiplier: 1.2 },
    { label: 'Lightly Active', desc: 'Light exercise 1-3 times/week', multiplier: 1.375 },
    { label: 'Moderately Active', desc: 'Moderate workouts 3-5 times/week', multiplier: 1.55 },
    { label: 'Very Active', desc: 'Hard physical training 6-7 times/week', multiplier: 1.725 },
    { label: 'Athlete / Physical Labor', desc: 'Double daily workouts or heavy manual job', multiplier: 1.9 }
  ];

  return (
    <div className="space-y-6" id="calorie-calculator-tool">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bio Profiles</span>
            <div className="flex gap-2 text-xs">
              <button onClick={() => setGender('male')} className={`px-2 py-1 rounded cursor-pointer ${gender === 'male' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>M</button>
              <button onClick={() => setGender('female')} className={`px-2 py-1 rounded cursor-pointer ${gender === 'female' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>F</button>
              <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')} className="px-2 py-1 bg-gray-200 text-gray-700 rounded cursor-pointer">{unit === 'metric' ? 'Metric' : 'Imp'}</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Age (Years)</label>
              <input type="number" min="15" max="99" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900" />
            </div>
            {unit === 'metric' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Weight (Kg)</label>
                  <input type="number" min="30" max="200" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Height (Cm)</label>
                  <input type="number" min="100" max="240" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900" />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Weight (lbs)</label>
                  <input type="number" min="60" max="450" value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900" />
                </div>
              </>
            )}
          </div>

          {unit === 'imperial' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Height (Feet)</label>
                <input type="number" min="3" max="8" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Height (Inches)</label>
                <input type="number" min="0" max="11" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Activity Level</label>
            <div className="space-y-1.5">
              {activities.map((act) => (
                <button
                  key={act.multiplier}
                  onClick={() => setActivity(act.multiplier)}
                  className={`w-full flex justify-between items-center p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    activity === act.multiplier
                      ? 'border-emerald-500 bg-emerald-50/20 text-emerald-950 dark:text-emerald-400 font-semibold'
                      : 'border-gray-100 hover:border-gray-200 dark:border-gray-800'
                  }`}
                  id={`calorie-activity-${act.multiplier}`}
                >
                  <div>
                    <div className="text-xs font-bold">{act.label}</div>
                    <div className="text-[10px] text-gray-500 leading-none">{act.desc}</div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">x{act.multiplier}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Goal calorie values */}
        <div className="space-y-4">
          <div className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-6 text-center">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Maintenance Energy (TDEE)</span>
            <div className="text-4xl font-extrabold text-gray-950 dark:text-white mt-1">
              {tdee > 0 ? tdee : '--'} <span className="text-base font-medium text-gray-400">kcal/day</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-3.5 border border-emerald-100 bg-emerald-50/10 dark:border-emerald-900/20 dark:bg-emerald-950/5 rounded-xl">
              <div>
                <span className="block text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">Gradual Weight Loss (-500 kcal)</span>
                <span className="text-[10px] text-gray-400">Target to lose ~1 lb (0.5 kg) a week</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {tdee > 500 ? tdee - 500 : '--'} <span className="text-xs text-gray-400">kcal</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-3.5 border border-blue-100 bg-blue-50/10 dark:border-blue-900/20 dark:bg-blue-950/5 rounded-xl">
              <div>
                <span className="block text-xs font-extrabold text-blue-800 dark:text-blue-400 uppercase tracking-wide">Lean Muscle Gain (+300 kcal)</span>
                <span className="text-[10px] text-gray-400">Support muscular hypertrophy</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {tdee > 0 ? tdee + 300 : '--'} <span className="text-xs text-gray-400">kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   4. PROTEIN INTAKE CALCULATOR COMPONENT
   ========================================================== */
export function ProteinCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(75);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [goal, setGoal] = useState<'loss' | 'maintenance' | 'gain'>('gain');

  const wtKg = unit === 'metric' ? weight : weightLbs * 0.45359237;

  // Limits based on clinical data
  let minP = 0;
  let maxP = 0;

  if (wtKg > 0) {
    if (goal === 'loss') {
      minP = wtKg * 1.8;
      maxP = wtKg * 2.2;
    } else if (goal === 'maintenance') {
      minP = wtKg * 1.4;
      maxP = wtKg * 1.8;
    } else {
      minP = wtKg * 2.0;
      maxP = wtKg * 2.5;
    }
  }

  return (
    <div className="space-y-6" id="protein-calculator-tool">
      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
        <button onClick={() => setUnit('metric')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${unit === 'metric' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-500'}`}>Metric (Kg)</button>
        <button onClick={() => setUnit('imperial')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${unit === 'imperial' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-500'}`}>Imperial (Lbs)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Your Body Weight</span>
              <span className="text-emerald-600 font-bold">{unit === 'metric' ? `${weight} kg` : `${weightLbs} lbs`}</span>
            </label>
            <input
              type="range"
              min={unit === 'metric' ? '40' : '90'}
              max={unit === 'metric' ? '140' : '310'}
              value={unit === 'metric' ? weight : weightLbs}
              onChange={(e) => unit === 'metric' ? setWeight(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="protein-weight-slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Primary Fitness Goal</label>
            <div className="grid grid-cols-3 gap-2">
              {(['loss', 'maintenance', 'gain'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-3 py-2 text-xs font-bold border rounded-xl cursor-pointer transition-all ${
                    goal === g ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  id={`protein-goal-${g}`}
                >
                  {g === 'loss' ? 'Weight Loss' : g === 'maintenance' ? 'Maintenance' : 'Muscle Gain'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-emerald-100 bg-emerald-50/10 rounded-2xl p-6 text-center flex flex-col justify-center items-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Optimal Daily Protein Intake</span>
          <div className="text-4xl font-extrabold text-gray-950 dark:text-white mt-2" id="protein-result-val">
            {Math.round(minP)}g – {Math.round(maxP)}g
          </div>
          <span className="text-xs text-gray-400 font-semibold block mt-1">per day</span>

          <p className="text-xs text-gray-500 mt-4 max-w-xs">
            A high-protein setup preserves lean mass during fat loss and feeds muscle hypertrophy when lifting weights.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   5. WATER INTAKE CALCULATOR COMPONENT
   ========================================================== */
export function WaterCalculator() {
  const [weight, setWeight] = useState<number>(75);
  const [exerciseMin, setExerciseMin] = useState<number>(45);

  // Baseline: 35 ml / kg. Exercise: +350ml per 30 min.
  const baselineMl = weight * 35;
  const activeCompensationMl = (exerciseMin / 30) * 350;
  const totalMl = baselineMl + activeCompensationMl;

  const totalLiters = (totalMl / 1000).toFixed(2);
  const totalOunces = (totalMl * 0.033814).toFixed(0);
  const totalCups = (totalMl / 240).toFixed(1); // standard cup is 240ml

  return (
    <div className="space-y-6" id="water-calculator-tool">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Your Body Weight</span>
              <span className="text-emerald-600 font-bold">{weight} kg</span>
            </label>
            <input
              type="range"
              min="40"
              max="140"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="water-weight-slider"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Daily Exercise / Sweat Duration</span>
              <span className="text-emerald-600 font-bold">{exerciseMin} mins</span>
            </label>
            <input
              type="range"
              min="0"
              max="180"
              step="15"
              value={exerciseMin}
              onChange={(e) => setExerciseMin(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="water-exercise-slider"
            />
          </div>
        </div>

        <div className="border border-blue-100 bg-blue-50/10 dark:border-blue-900/10 dark:bg-blue-950/5 rounded-2xl p-6 text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Recommended Daily Fluid Intake</span>
          <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-2" id="water-result-val">
            {totalLiters} <span className="text-xl font-medium text-gray-400">Liters</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">US Fluid Ounces</span>
              <span className="block text-lg font-bold text-gray-800 dark:text-gray-200 mt-0.5">{totalOunces} oz</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Standard Glasses</span>
              <span className="block text-lg font-bold text-gray-800 dark:text-gray-200 mt-0.5">~{totalCups} cups</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   6. BODY FAT CALCULATOR (US NAVY METHOD)
   ========================================================== */
export function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [waistCm, setWaistCm] = useState<number>(85);
  const [hipCm, setHipCm] = useState<number>(95); // females only

  // Navy formulas use log10 with inches
  const heightIn = heightCm / 2.54;
  const neckIn = neckCm / 2.54;
  const waistIn = waistCm / 2.54;
  const hipIn = hipCm / 2.54;

  let bodyFat = 0;
  if (gender === 'male') {
    if (waistIn - neckIn > 0 && heightIn > 0) {
      bodyFat = 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    }
  } else {
    if (waistIn + hipIn - neckIn > 0 && heightIn > 0) {
      bodyFat = 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
    }
  }

  const bfVal = bodyFat > 0 && bodyFat < 100 ? parseFloat(bodyFat.toFixed(1)) : 0;

  return (
    <div className="space-y-6" id="bodyfat-calculator-tool">
      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
        <button onClick={() => setGender('male')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'male' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}>Male</button>
        <button onClick={() => setGender('female')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'female' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}>Female</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Height</span>
              <span className="text-emerald-600 font-semibold">{heightCm} cm</span>
            </label>
            <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-emerald-500" />
          </div>

          <div>
            <label className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Neck Circumference</span>
              <span className="text-emerald-600 font-semibold">{neckCm} cm</span>
            </label>
            <input type="range" min="25" max="55" value={neckCm} onChange={(e) => setNeckCm(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-emerald-500" />
          </div>

          <div>
            <label className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Waist Circumference</span>
              <span className="text-emerald-600 font-semibold">{waistCm} cm</span>
            </label>
            <input type="range" min="50" max="140" value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-emerald-500" />
          </div>

          {gender === 'female' && (
            <div>
              <label className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                <span>Hip Circumference</span>
                <span className="text-emerald-600 font-semibold">{hipCm} cm</span>
              </label>
              <input type="range" min="60" max="150" value={hipCm} onChange={(e) => setHipCm(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-emerald-500" />
            </div>
          )}
        </div>

        <div className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-6 text-center flex flex-col justify-center items-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Body Fat Percentage</span>
          <div className="text-5xl font-extrabold text-gray-950 dark:text-white mt-2" id="bodyfat-result-val">
            {bfVal > 0 ? `${bfVal}%` : '--'}
          </div>
          <p className="text-xs text-gray-500 mt-4 max-w-xs leading-relaxed">
            Calculated via the US Navy Circumference System, which estimates body density using statistical regression metrics.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   7. LEAN BODY MASS CALCULATOR
   ========================================================== */
export function LeanBodyMassCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Boer formula
  let lbm = 0;
  if (gender === 'male') {
    lbm = (0.407 * weight) + (0.267 * heightCm) - 19.2;
  } else {
    lbm = (0.252 * weight) + (0.473 * heightCm) - 48.3;
  }

  const lbmVal = lbm > 0 ? parseFloat(lbm.toFixed(1)) : 0;
  const fatVal = weight - lbmVal > 0 ? parseFloat((weight - lbmVal).toFixed(1)) : 0;
  const fatPercent = weight > 0 ? Math.round((fatVal / weight) * 100) : 0;

  return (
    <div className="space-y-6" id="lbm-calculator-tool">
      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
        <button onClick={() => setGender('male')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'male' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}>Male</button>
        <button onClick={() => setGender('female')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'female' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}>Female</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Total Weight</span>
              <span className="text-emerald-600 font-semibold">{weight} kg</span>
            </label>
            <input type="range" min="40" max="150" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-emerald-500" />
          </div>

          <div>
            <label className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Height</span>
              <span className="text-emerald-600 font-semibold">{heightCm} cm</span>
            </label>
            <input type="range" min="120" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-emerald-500" />
          </div>
        </div>

        <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="text-center mb-4">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated Lean Mass</span>
            <span className="block text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5" id="lbm-result-val">
              {lbmVal > 0 ? `${lbmVal} kg` : '--'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-center text-xs">
            <div>
              <span className="text-gray-400 block font-bold">Body Fat Weight</span>
              <span className="text-gray-900 dark:text-gray-200 font-bold block mt-1">{fatVal} kg</span>
            </div>
            <div>
              <span className="text-gray-400 block font-bold">Fat Proportion</span>
              <span className="text-gray-900 dark:text-gray-200 font-bold block mt-1">~{fatPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   8. IDEAL BODY WEIGHT CALCULATOR
   ========================================================== */
export function IdealWeightCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(172); // 5ft 8in avg

  // Hamwi Formula
  // Height in inches over 5 feet (60 inches)
  const heightInches = heightCm / 2.54;
  const inchesOver5Ft = Math.max(0, heightInches - 60);

  let idealKg = 0;
  if (gender === 'male') {
    idealKg = 48.0 + (2.7 * inchesOver5Ft);
  } else {
    idealKg = 45.5 + (2.2 * inchesOver5Ft);
  }

  const idealWeightFixed = idealKg > 0 ? Math.round(idealKg) : 0;
  const idealWeightLbs = Math.round(idealWeightFixed * 2.20462);

  // Healthy range represents +/- 10%
  const minRangeKg = Math.round(idealWeightFixed * 0.9);
  const maxRangeKg = Math.round(idealWeightFixed * 1.1);

  return (
    <div className="space-y-6" id="ideal-weight-calculator-tool">
      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
        <button onClick={() => setGender('male')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'male' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}>Male</button>
        <button onClick={() => setGender('female')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${gender === 'female' ? 'bg-emerald-600 text-white' : 'text-gray-500'}`}>Female</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Your Height</span>
              <span className="text-emerald-600 font-bold">
                {heightCm} cm ({Math.floor(heightInches / 12)} ft {Math.round(heightInches % 12)} in)
              </span>
            </label>
            <input
              type="range"
              min="140"
              max="215"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="ideal-height-slider"
            />
          </div>
          <p className="text-xs text-gray-400 italic">
            *Hamwi equation assumes a baseline healthy bone stature for heights beginning at 5 feet (152.4 cm).
          </p>
        </div>

        <div className="border border-emerald-100 bg-emerald-50/10 rounded-2xl p-6 text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Ideal Body Weight</span>
          <div className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2" id="ideal-weight-result-val">
            {idealWeightFixed} <span className="text-2xl font-medium text-gray-400">kg</span>
          </div>
          <span className="text-sm text-gray-500 font-semibold block mt-1">({idealWeightLbs} lbs)</span>

          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs">
            <span className="text-gray-400 block font-bold">Recommended Healthy Range (+/-10%)</span>
            <span className="text-gray-900 dark:text-gray-200 font-bold block mt-1">{minRangeKg} kg – {maxRangeKg} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   9. MACRONUTRIENT RATIOS CALCULATOR
   ========================================================== */
export function MacroCalculator() {
  const [calories, setCalories] = useState<number>(2000);
  const [goal, setGoal] = useState<'loss' | 'maintenance' | 'gain'>('maintenance');

  // Ratios
  // Loss: 40% P, 30% C, 30% F
  // Maintain: 30% P, 40% C, 30% F
  // Gain: 30% P, 50% C, 20% F
  const ratios = {
    loss: { p: 0.40, c: 0.30, f: 0.30 },
    maintenance: { p: 0.30, c: 0.40, f: 0.30 },
    gain: { p: 0.30, c: 0.50, f: 0.20 }
  }[goal];

  const pKcal = calories * ratios.p;
  const cKcal = calories * ratios.c;
  const fKcal = calories * ratios.f;

  const pG = Math.round(pKcal / 4);
  const cG = Math.round(cKcal / 4);
  const fG = Math.round(fKcal / 9);

  return (
    <div className="space-y-6" id="macro-calculator-tool">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Target Daily Calories</span>
              <span className="text-emerald-600 font-bold">{calories} kcal</span>
            </label>
            <input
              type="range"
              min="1200"
              max="4500"
              step="50"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="macro-calories-slider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nutrition Setup Goal</label>
            <div className="grid grid-cols-3 gap-2">
              {(['loss', 'maintenance', 'gain'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-3 py-2 text-xs font-bold border rounded-xl cursor-pointer transition-all ${
                    goal === g ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  id={`macro-goal-${g}`}
                >
                  {g === 'loss' ? 'Fat Loss' : g === 'maintenance' ? 'Balance' : 'Hypertrophy'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Outputs grid */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center p-3.5 bg-red-50/25 border border-red-100 rounded-xl" id="macro-protein-output">
            <div>
              <span className="block text-xs font-extrabold text-red-700 uppercase tracking-wide">Protein (4 kcal/g)</span>
              <span className="text-[10px] text-gray-400">{Math.round(ratios.p * 100)}% of diet</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-gray-900 dark:text-white block">{pG} grams</span>
              <span className="text-[10px] text-gray-400">{Math.round(pKcal)} kcal</span>
            </div>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-blue-50/25 border border-blue-100 rounded-xl" id="macro-carbs-output">
            <div>
              <span className="block text-xs font-extrabold text-blue-700 uppercase tracking-wide">Carbohydrates (4 kcal/g)</span>
              <span className="text-[10px] text-gray-400">{Math.round(ratios.c * 100)}% of diet</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-gray-900 dark:text-white block">{cG} grams</span>
              <span className="text-[10px] text-gray-400">{Math.round(cKcal)} kcal</span>
            </div>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-amber-50/25 border border-amber-100 rounded-xl" id="macro-fat-output">
            <div>
              <span className="block text-xs font-extrabold text-amber-700 uppercase tracking-wide">Dietary Fats (9 kcal/g)</span>
              <span className="text-[10px] text-gray-400">{Math.round(ratios.f * 100)}% of diet</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-gray-900 dark:text-white block">{fG} grams</span>
              <span className="text-[10px] text-gray-400">{Math.round(fKcal)} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   10. WALKING CALORIES BURNED CALCULATOR
   ========================================================== */
export function WalkingCaloriesCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [distance, setDistance] = useState<number>(3); // miles or km
  const [speed, setSpeed] = useState<number>(3.0); // mph or km/h

  // Standardize inputs to Metric for formulas
  const actualWeightKg = unit === 'metric' ? weightKg : weightLbs * 0.453592;
  const actualSpeedMph = unit === 'imperial' ? speed : speed * 0.621371;
  const actualDistanceMiles = unit === 'imperial' ? distance : distance * 0.621371;

  // Calculate duration in minutes (distance / speed * 60)
  const durationMin = speed > 0 ? (distance / speed) * 60 : 0;

  // Determine MET (Metabolic Equivalent of Task) based on speed in mph
  let met = 2.0;
  if (actualSpeedMph >= 4.0) {
    met = 4.5;
  } else if (actualSpeedMph >= 3.5) {
    met = 4.0;
  } else if (actualSpeedMph >= 3.0) {
    met = 3.5;
  } else if (actualSpeedMph >= 2.5) {
    met = 3.0;
  } else {
    met = 2.0;
  }

  // Formula: Cal = (MET * 3.5 * weight_kg / 200) * duration
  const caloriesBurned = (met * 3.5 * actualWeightKg / 200) * durationMin;
  const caloriesVal = caloriesBurned > 0 ? Math.round(caloriesBurned) : 0;

  return (
    <div className="space-y-6" id="walking-calculator-tool">
      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit">
        <button onClick={() => setUnit('metric')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${unit === 'metric' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'}`}>Metric (km, kg)</button>
        <button onClick={() => setUnit('imperial')} className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${unit === 'imperial' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs' : 'text-gray-500'}`}>Imperial (miles, lbs)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span>Your Body Weight</span>
              <span className="text-emerald-600 font-bold">{unit === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}</span>
            </label>
            <input
              type="range"
              min={unit === 'metric' ? '40' : '90'}
              max={unit === 'metric' ? '140' : '300'}
              value={unit === 'metric' ? weightKg : weightLbs}
              onChange={(e) => unit === 'metric' ? setWeightKg(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              id="walking-weight-slider"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Distance ({unit === 'metric' ? 'Kilometers' : 'Miles'})
              </label>
              <input
                type="number"
                min="0.5"
                max="50"
                step="0.5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
                id="walking-distance-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">
                Speed ({unit === 'metric' ? 'km/h' : 'mph'})
              </label>
              <input
                type="number"
                min="1.0"
                max="12.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white"
                id="walking-speed-input"
              />
            </div>
          </div>
        </div>

        <div className="border border-indigo-100 bg-indigo-50/10 rounded-2xl p-6 text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Energy Burned</span>
          <div className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2" id="walking-result-val">
            {caloriesVal} <span className="text-2xl font-medium text-gray-400">kcal</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs">
            <div>
              <span className="text-gray-400 block font-bold">Estimated Duration</span>
              <span className="text-gray-900 dark:text-gray-200 font-bold block mt-1">{Math.round(durationMin)} minutes</span>
            </div>
            <div>
              <span className="text-gray-400 block font-bold">Calculated Intensity</span>
              <span className="text-gray-900 dark:text-gray-200 font-bold block mt-1">{met.toFixed(1)} METs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
