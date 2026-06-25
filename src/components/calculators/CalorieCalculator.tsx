import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Sparkles, Flame, HelpCircle, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';

export default function CalorieCalculator() {
  const [unit, setUnit] = useState<'metric' | 'us'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('28');
  
  // Metric Inputs
  const [weightKg, setWeightKg] = useState<string>('72');
  const [heightCm, setHeightCm] = useState<string>('176');

  // US Inputs
  const [weightLbs, setWeightLbs] = useState<string>('158');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  const [activity, setActivity] = useState<string>('1.55'); // default moderate
  const [goal, setGoal] = useState<'maintain' | 'mild_loss' | 'loss' | 'extreme_loss' | 'mild_gain' | 'gain'>('loss');

  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    targetIntake: number;
    goalDescription: string;
    weeklyChangeText: string;
    macroProportions: { carbs: number; protein: number; fat: number };
    zigzagPlans: {
      type: string;
      description: string;
      schedule: { day: string; calories: number; type: string }[];
    }[];
  } | null>(null);

  const calculateCalories = () => {
    const ageNum = parseFloat(age) || 28;
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

    // Mifflin-St Jeor BMR
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * ageNum + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * ageNum - 161;
    }

    const activityMultiplier = parseFloat(activity) || 1.55;
    const tdee = bmr * activityMultiplier;

    // Adjust target calories based on goal
    let targetIntake = tdee;
    let goalDescription = 'Maintain your current weight';
    let weeklyChangeText = '0.0 lbs/week (0.0 kg/week)';

    if (goal === 'mild_loss') {
      targetIntake = tdee - 250;
      goalDescription = 'Mild weight loss for stable adaptation';
      weeklyChangeText = '-0.5 lbs/week (-0.23 kg/week)';
    } else if (goal === 'loss') {
      targetIntake = tdee - 500;
      goalDescription = 'Optimal weight loss for fat reduction';
      weeklyChangeText = '-1.0 lbs/week (-0.45 kg/week)';
    } else if (goal === 'extreme_loss') {
      targetIntake = tdee - 900;
      goalDescription = 'Accelerated weight loss (high restriction)';
      weeklyChangeText = '-1.8 lbs/week (-0.8 kg/week)';
    } else if (goal === 'mild_gain') {
      targetIntake = tdee + 250;
      goalDescription = 'Mild muscle gain (lean bulk)';
      weeklyChangeText = '+0.5 lbs/week (+0.23 kg/week)';
    } else if (goal === 'gain') {
      targetIntake = tdee + 500;
      goalDescription = 'Accelerated mass gain (standard bulk)';
      weeklyChangeText = '+1.0 lbs/week (+0.45 kg/week)';
    }

    // Protect from starving target threshold
    const minimumSafeIntake = gender === 'male' ? 1500 : 1200;
    if (targetIntake < minimumSafeIntake) {
      targetIntake = minimumSafeIntake;
    }

    const finalTarget = Math.round(targetIntake);

    // Compute basic balanced macro division (30% P, 40% C, 30% F)
    const pCalories = finalTarget * 0.3;
    const cCalories = finalTarget * 0.4;
    const fCalories = finalTarget * 0.3;

    const macroProportions = {
      protein: Math.round(pCalories / 4),
      carbs: Math.round(cCalories / 4),
      fat: Math.round(fCalories / 9)
    };

    // Zig-Zag Calorie Schedules (Refeed cycling patterns)
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // 1. Training vs Rest Day Cycling (3 high days, 4 low days)
    const trainingSchedule = weekDays.map((day, idx) => {
      // Mon, Wed, Sat are high days (+200 from target), others low (-150 from target)
      const isHigh = idx === 0 || idx === 2 || idx === 5;
      return {
        day,
        calories: isHigh ? Math.round(finalTarget + 200) : Math.round(finalTarget - 150),
        type: isHigh ? 'High (Workout)' : 'Low (Rest)'
      };
    });

    // 2. Weekend Refeed Cycling (5 low days, 2 high weekend days)
    const weekendSchedule = weekDays.map((day, idx) => {
      const isWeekend = idx === 5 || idx === 6; // Sat, Sun
      return {
        day,
        calories: isWeekend ? Math.round(finalTarget + 350) : Math.round(finalTarget - 140),
        type: isWeekend ? 'Refeed (High)' : 'Standard (Low)'
      };
    });

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetIntake: finalTarget,
      goalDescription,
      weeklyChangeText,
      macroProportions,
      zigzagPlans: [
        {
          type: 'Training Day Cycling',
          description: 'Eat more on active lifting days to support muscle energy and recovery, and less on rest days.',
          schedule: trainingSchedule
        },
        {
          type: 'Weekend Refeed Cycle',
          description: 'A 5-day low-calorie deficit during weekdays, followed by 2 higher calorie days for structural metabolic boosts.',
          schedule: weekendSchedule
        }
      ]
    });
  };

  const handleClear = () => {
    setAge('28');
    setGender('male');
    setWeightKg('72');
    setHeightCm('176');
    setWeightLbs('158');
    setHeightFt('5');
    setHeightIn('9');
    setActivity('1.55');
    setGoal('loss');
    setResult(null);
  };

  useEffect(() => {
    calculateCalories();
  }, [unit, gender, activity, goal]);

  const activitiesList = [
    { label: 'Sedentary', desc: 'Desk job, little to no workout', multiplier: '1.2' },
    { label: 'Lightly Active', desc: 'Light workouts 1-3 times/week', multiplier: '1.375' },
    { label: 'Moderately Active', desc: 'Intense exercise 3-5 times/week', multiplier: '1.55' },
    { label: 'Very Active', desc: 'Heavy sports/lifting 6-7 times/week', multiplier: '1.725' },
    { label: 'Extreme Athlete', desc: 'Heavy manual job or 2x daily workouts', multiplier: '1.9' }
  ];

  const goalsList = [
    { label: 'Maintain Weight', value: 'maintain', desc: 'Keep present mass stable' },
    { label: 'Mild Weight Loss', value: 'mild_loss', desc: 'Lose ~0.5 lbs/week' },
    { label: 'Optimal Fat Loss', value: 'loss', desc: 'Lose ~1.0 lbs/week (Recommended)' },
    { label: 'Accelerated Loss', value: 'extreme_loss', desc: 'Lose ~1.8 lbs/week' },
    { label: 'Lean Bulk (Muscle)', value: 'mild_gain', desc: 'Gain ~0.5 lbs/week' },
    { label: 'Standard Bulk', value: 'gain', desc: 'Gain ~1.0 lbs/week' }
  ];

  return (
    <div className="space-y-8" id="detailed-calorie-calculator-page">
      
      {/* Header banner */}
      <div className="bg-slate-700 text-white rounded-t-xl px-4 py-3 flex items-center justify-between text-xs font-bold shadow-xs">
        <span className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-400" />
          <span>Formulate your daily macronutrients and target intake bounds</span>
        </span>
        <span className="bg-slate-800 text-[10px] uppercase text-slate-300 px-2 py-0.5 rounded">
          Dynamic Deficit Planner
        </span>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 dark:bg-gray-900/10 p-5 border-x border-b border-slate-200 dark:border-gray-800 rounded-b-xl shadow-xs">
        
        {/* Left Inputs Pane (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          
          {/* Unit Toggle */}
          <div className="flex border-b border-slate-200 dark:border-gray-800 mb-4 text-xs font-bold">
            <button
              onClick={() => setUnit('metric')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'metric' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="calorie-tab-metric"
            >
              Metric Units
            </button>
            <button
              onClick={() => setUnit('us')}
              className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${unit === 'us' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400'}`}
              id="calorie-tab-us"
            >
              US Units
            </button>
          </div>

          {/* Age & Gender Row */}
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
                className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                id="calorie-input-age"
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
                    name="cal-gender"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="accent-emerald-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="cal-gender"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="accent-emerald-600"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Height and Weight */}
          {unit === 'metric' ? (
            <div className="grid grid-cols-2 gap-4">
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
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
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">ft</span>
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Activity Level dropdown style */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Physical Activity Multiplier
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 text-slate-800 dark:text-white font-semibold text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              {activitiesList.map((act) => (
                <option key={act.multiplier} value={act.multiplier}>
                  {act.label} (x{act.multiplier}) — {act.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 uppercase mb-1.5">
              Weekly Target Goal
            </label>
            <div className="grid grid-cols-2 gap-2">
              {goalsList.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value as any)}
                  className={`p-2.5 text-left border rounded-lg transition-all cursor-pointer ${
                    goal === g.value
                      ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-bold'
                      : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-slate-600 dark:text-gray-300 hover:border-slate-300'
                  }`}
                  id={`goal-btn-${g.value}`}
                >
                  <div className="text-[11px] leading-tight font-extrabold">{g.label}</div>
                  <div className="text-[9px] text-slate-400 leading-none mt-0.5 font-medium">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <div className="pt-2 flex gap-4">
            <button
              onClick={calculateCalories}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              id="calorie-btn-calculate"
            >
              <Calculator className="h-4 w-4" />
              <span>Update Targets</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 font-bold text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Right Output Pane (7 cols) */}
        <div className="md:col-span-6 lg:col-span-7 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl p-5 shadow-inner space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Target Energy Breakdown</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Calorie Goals</span>
          </div>

          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Daily Calorie Goal */}
              <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    Daily Calories Target
                  </span>
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-white font-mono mt-1 block">
                    {result.targetIntake} <span className="text-xs text-slate-500">kcal/day</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5 italic">
                    {result.goalDescription} ({result.weeklyChangeText})
                  </span>
                </div>
                <div className="p-2.5 bg-emerald-500 text-white rounded-lg">
                  <Flame className="h-5 w-5 animate-pulse" />
                </div>
              </div>

              {/* TDEE and BMR readouts */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">Resting Energy (BMR)</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.bmr} kcal</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-100 dark:border-gray-900">
                  <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">Maintenance (TDEE)</span>
                  <span className="text-lg font-extrabold text-slate-800 dark:text-white font-mono mt-0.5 block">{result.tdee} kcal</span>
                </div>
              </div>

              {/* Balanced Macros Division */}
              <div className="border-t border-slate-100 dark:border-gray-800 pt-4 space-y-2 text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-2">
                  Sample Macro Blueprint (30/40/30 division)
                </span>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 border border-blue-100 dark:border-blue-900/30 rounded-xl bg-blue-50/10 text-blue-900 dark:text-blue-400 font-mono">
                    <span className="text-[9px] font-bold block uppercase tracking-wide">Protein</span>
                    <span className="font-extrabold block text-sm mt-0.5">{result.macroProportions.protein}g</span>
                  </div>
                  <div className="p-2 border border-amber-100 dark:border-amber-900/30 rounded-xl bg-amber-50/10 text-amber-900 dark:text-amber-400 font-mono">
                    <span className="text-[9px] font-bold block uppercase tracking-wide">Carbs</span>
                    <span className="font-extrabold block text-sm mt-0.5">{result.macroProportions.carbs}g</span>
                  </div>
                  <div className="p-2 border border-red-100 dark:border-red-900/30 rounded-xl bg-red-50/10 text-red-900 dark:text-red-400 font-mono">
                    <span className="text-[9px] font-bold block uppercase tracking-wide">Fats</span>
                    <span className="font-extrabold block text-sm mt-0.5">{result.macroProportions.fat}g</span>
                  </div>
                </div>
              </div>

              {/* PREMIUM FEATURE: Zig-Zag Cycling Schedules */}
              <div className="border-t border-slate-100 dark:border-gray-800 pt-4 space-y-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span>Zig-Zag Calorie Cycling Calendars (Advanced Refeeding)</span>
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.zigzagPlans.map((plan, index) => (
                    <div key={index} className="border border-slate-200 dark:border-gray-800 rounded-xl p-3 bg-slate-50/30 dark:bg-gray-900/20 text-xs">
                      <span className="font-extrabold text-slate-800 dark:text-white uppercase text-[10px] block border-b border-slate-100 dark:border-gray-900 pb-1 mb-1">{plan.type}</span>
                      <p className="text-[9px] text-slate-400 mb-2 leading-snug">{plan.description}</p>
                      
                      <div className="space-y-1 font-mono">
                        {plan.schedule.map((sch, dayIdx) => (
                          <div key={dayIdx} className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-slate-600 dark:text-slate-350">{sch.day.slice(0, 3)}</span>
                            <div className="flex gap-2">
                              <span className={`text-[8px] font-extrabold px-1 rounded uppercase ${sch.type.includes('High') || sch.type.includes('Refeed') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{sch.type.split(' ')[0]}</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{sch.calories} kcal</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-[360px] flex flex-col justify-center items-center text-center text-slate-400">
              <Flame className="h-10 w-10 text-slate-300 animate-bounce mb-2" />
              <p className="text-xs font-semibold">TDEE Intake Ready</p>
              <p className="text-[10px] max-w-xs mt-1">Provide your age, height, and activity level to see custom calorie limits, nutritional macro dividers, and Zig-Zag schedules.</p>
            </div>
          )}
        </div>

      </div>

      {/* Educational section */}
      <div className="space-y-6 pt-4 text-justify">
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            Understanding Total Daily Energy Expenditure (TDEE)
          </h2>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Your Total Daily Energy Expenditure (TDEE) represents the cumulative amount of calories you expend over a 24-hour cycle. It is composed of four primary physiological contributors:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-black dark:text-white leading-relaxed text-justify">
            <li><strong>Basal Metabolic Rate (BMR):</strong> Your baseline rest energy cost, which claims about 60-75% of your total daily expenditure.</li>
            <li><strong>Thermic Effect of Activity (TEA):</strong> Energy spent during formal sports, cardio sessions, or resistance training.</li>
            <li><strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Calorie burn from trivial daily activity like pacing, cleaning, walking to work, or fidgeting.</li>
            <li><strong>Thermic Effect of Food (TEF):</strong> The physiological energy cost required to digest, process, and absorb macronutrients (highest in proteins, requiring 20-30% of its own caloric energy to digest).</li>
          </ul>
        </section>

        <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Safe Deficits vs. Extreme Crash Diets
          </h3>
          <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
            Establishing a caloric deficit is mandatory for fat loss. However, massive deficits exceeding 1,000 calories can result in severe metabolic adaptation (metabolic slowing), bone density decline, hair thinning, and the catabolism of vital lean skeletal muscle tissue. A controlled, moderate deficit of 300 to 500 calories below your TDEE ensures sustainable fat reduction while preserving lean tissue and athletic performance.
          </p>
        </section>
      </div>

    </div>
  );
}
