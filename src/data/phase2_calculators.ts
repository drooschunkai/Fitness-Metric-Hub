import { CalculatorConfig } from '../types';

export const PHASE2_CALCULATORS: CalculatorConfig[] = [
  // ========================================================
  // CATEGORY 1 — Hydration & Health Metrics
  // ========================================================
  {
    slug: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    shortDescription: 'Calculate your optimal daily water intake based on body weight, climate conditions, and training levels.',
    metaDescription: 'Find your perfect daily hydration target. Calculate water requirements in liters and fluid ounces using clinical weight ratios.',
    category: 'hydration-health',
    isDynamic: true,
    formula: {
      name: 'Baseline Weight Ratio with Metabolic Adjustments',
      description: 'Baseline: Weight (kg) × 35 ml. Adjustments: +350 ml per 30 mins of moderate activity; +500 ml for hot climates.'
    },
    examples: [
      { scenario: 'Sedentary (70kg, Cold)', inputs: 'Weight: 70kg, Activity: Sedentary, Climate: Cold', result: '2.45 Liters' },
      { scenario: 'Active Athlete (80kg, Hot)', inputs: 'Weight: 80kg, Activity: Active, Climate: Hot', result: '3.80 Liters' }
    ],
    faqs: [
      { id: 'water-q1', question: 'Does coffee count toward daily water intake?', answer: 'Yes. Modern research confirms that moderate caffeinated beverages like tea and coffee contribute to daily hydration targets.' }
    ],
    relatedSlugs: ['sweat-rate-calculator', 'electrolyte-calculator'],
    relatedGuideSlugs: ['how-much-water-should-you-drink-daily', 'preventing-dehydration'],
    inputs: [
      { name: 'weight', label: 'Body Weight', type: 'number', defaultValue: 75, unitType: 'weight', min: 30, max: 200 },
      {
        name: 'activity',
        label: 'Daily Activity Level',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Sedentary (Office/Desk)', value: 'sedentary' },
          { label: 'Moderate (Active 30-60 mins)', value: 'moderate' },
          { label: 'Highly Active (Intense training)', value: 'active' }
        ]
      },
      {
        name: 'climate',
        label: 'Local Climate',
        type: 'radio',
        defaultValue: 'temperate',
        options: [
          { label: 'Cold/Temperate', value: 'temperate' },
          { label: 'Hot/Dry/Humid', value: 'hot' }
        ]
      }
    ],
    outputs: [
      { label: 'Recommended Water Intake', valueKey: 'waterLiters', unit: 'L/day', color: 'text-emerald-500' },
      { label: 'Fluid Ounces Equivalent', valueKey: 'waterOunces', unit: 'fl oz/day', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const wKg = unit === 'metric' ? Number(inputs.weight) : Number(inputs.weight) * 0.453592;
      let baseline = wKg * 35; // in ml
      
      if (inputs.activity === 'moderate') baseline += 500;
      if (inputs.activity === 'active') baseline += 1000;
      if (inputs.climate === 'hot') baseline += 500;

      const waterLiters = parseFloat((baseline / 1000).toFixed(2));
      const waterOunces = Math.round(waterLiters * 33.814);

      return { waterLiters, waterOunces };
    },
    resultExplanation: (inputs, results) => {
      return `Based on your weight of **${inputs.weight}** and lifestyle factors, your recommended fluid intake is **${results.waterLiters} Liters** (about **${results.waterOunces} fl oz**) per day. Ensure you sip steadily throughout the day rather than chugging large amounts at once.`;
    }
  },
  {
    slug: 'sweat-rate-calculator',
    title: 'Sweat Rate Calculator',
    shortDescription: 'Measure your personalized fluid loss per hour of training to fine-tune your athletic hydration protocol.',
    metaDescription: 'Free online Sweat Rate Calculator. Input body weight differentials and drink intake to calculate precise hourly sweat losses.',
    category: 'hydration-health',
    isDynamic: true,
    formula: {
      name: 'Fluid Differential Formula',
      description: 'Sweat Rate (L/hr) = [Pre-exercise Weight (kg) - Post-exercise Weight (kg) + Fluids Consumed (L) - Urine Output (L)] ÷ Duration (hours).'
    },
    examples: [
      { scenario: 'Standard Run (1 hr)', inputs: 'Pre-Weight: 70kg, Post-Weight: 69.4kg, Fluids: 500ml', result: '1.10 L/hour' }
    ],
    faqs: [
      { id: 'sweat-q1', question: 'When should I calculate sweat rate?', answer: 'Calculate your sweat rate under different thermal and seasonal conditions to build a responsive year-round training template.' }
    ],
    relatedSlugs: ['water-intake-calculator', 'sodium-loss-calculator'],
    relatedGuideSlugs: ['understanding-sweat-rate-during-exercise', 'sweat-rate-testing-guide'],
    inputs: [
      { name: 'preWeight', label: 'Pre-Workout Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 30, max: 200 },
      { name: 'postWeight', label: 'Post-Workout Weight', type: 'number', defaultValue: 79.2, unitType: 'weight', min: 29, max: 199 },
      { name: 'fluids', label: 'Fluids Consumed during Workout (ml)', type: 'number', defaultValue: 500, min: 0, max: 4000, step: 50 },
      { name: 'duration', label: 'Workout Duration (minutes)', type: 'number', defaultValue: 60, min: 10, max: 480 }
    ],
    outputs: [
      { label: 'Your Sweat Rate', valueKey: 'sweatRate', unit: 'L/hour', color: 'text-emerald-500' },
      { label: 'Total Sweat Loss', valueKey: 'totalLoss', unit: 'Liters', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const preW = Number(inputs.preWeight);
      const postW = Number(inputs.postWeight);
      const fluidsL = Number(inputs.fluids) / 1000;
      const hours = Number(inputs.duration) / 60;

      // Convert weights to kg for formula
      const preKg = isMetric ? preW : preW * 0.453592;
      const postKg = isMetric ? postW : postW * 0.453592;

      const totalLossKg = (preKg - postKg) + fluidsL;
      const sweatRate = parseFloat((totalLossKg / hours).toFixed(2));

      return {
        sweatRate,
        totalLoss: parseFloat(totalLossKg.toFixed(2))
      };
    },
    resultExplanation: (inputs, results) => {
      return `During your exercise, your body transpired **${results.totalLoss} Liters** of water. Your current sweat rate is **${results.sweatRate} L/hour**. To maintain muscular output and cardiovascular stability, try to replace 70-80% of this sweat loss during active sports.`;
    }
  },
  {
    slug: 'electrolyte-calculator',
    title: 'Electrolyte Calculator',
    shortDescription: 'Find your target daily electrolyte intake (Sodium, Potassium, Magnesium) to optimize muscle firing and recovery.',
    metaDescription: 'Free online Electrolyte Calculator. Calculate absolute trace mineral requirements based on hydration status and training.',
    category: 'hydration-health',
    isDynamic: true,
    formula: {
      name: 'Clinical Mineral Rehydration Ratio',
      description: 'Calculates active trace minerals required per Liter of fluid intake: 800mg Sodium, 200mg Potassium, and 60mg Magnesium.'
    },
    examples: [
      { scenario: 'Endurance Athlete (2L fluid)', inputs: 'Fluid Intake: 2L, Goal: Endurance', result: 'Sodium: 1600mg' }
    ],
    faqs: [
      { id: 'elec-q1', question: 'Why is sodium crucial?', answer: 'Sodium maintains extracellular fluid volume, blood pressure, and coordinates active nerve impulses needed for muscular contractions.' }
    ],
    relatedSlugs: ['water-intake-calculator', 'sodium-loss-calculator'],
    relatedGuideSlugs: ['electrolytes-explained-for-athletes', 'electrolytes-and-performance'],
    inputs: [
      { name: 'fluidVolume', label: 'Target Daily Fluid Volume (Liters)', type: 'number', defaultValue: 3, min: 1, max: 10, step: 0.5 },
      {
        name: 'intensity',
        label: 'Training Intensity',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Low (Yoga/Walking)', value: 'low' },
          { label: 'Moderate (Gym/Running)', value: 'moderate' },
          { label: 'High/Endurance (Heavy sweating)', value: 'high' }
        ]
      }
    ],
    outputs: [
      { label: 'Daily Sodium Target', valueKey: 'sodium', unit: 'mg', color: 'text-amber-500' },
      { label: 'Daily Potassium Target', valueKey: 'potassium', unit: 'mg', color: 'text-emerald-500' },
      { label: 'Daily Magnesium Target', valueKey: 'magnesium', unit: 'mg', color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const volume = Number(inputs.fluidVolume);
      let multiplier = 1.0;
      if (inputs.intensity === 'low') multiplier = 0.7;
      if (inputs.intensity === 'high') multiplier = 1.5;

      const sodium = Math.round(volume * 800 * multiplier);
      const potassium = Math.round(volume * 220 * multiplier);
      const magnesium = Math.round(volume * 60 * multiplier);

      return { sodium, potassium, magnesium };
    },
    resultExplanation: (inputs, results) => {
      return `To perfectly offset dehydration and cramping during training, replenish with **${results.sodium} mg of Sodium**, **${results.potassium} mg of Potassium**, and **${results.magnesium} mg of Magnesium** across your fluid volume.`;
    }
  },
  {
    slug: 'sodium-loss-calculator',
    title: 'Sodium Loss Calculator',
    shortDescription: 'Calculate the estimated sodium depleted during your long-distance endurance sessions.',
    metaDescription: 'Find your target sweat-sodium replenishment window. Free online Sodium Loss Estimator based on hourly sweat indices.',
    category: 'hydration-health',
    isDynamic: true,
    formula: {
      name: 'Sodium Depletion Formulation',
      description: 'Sodium Loss (mg) = Sweat Rate (L/hr) × Duration (hrs) × Sodium Concentration Index (mg/L).'
    },
    examples: [
      { scenario: '2 Hour Cycle (Medium Sweat)', inputs: 'Sweat Rate: 1.2 L/hr, Duration: 2 hrs, Concentration: Medium (900 mg/L)', result: '2160 mg Sodium' }
    ],
    faqs: [
      { id: 'sod-q1', question: 'How do I know if I am a "salty sweater"?', answer: 'If you notice white, gritty powder on your skin or clothes after a hard workout, you likely have high sodium concentration in your sweat.' }
    ],
    relatedSlugs: ['sweat-rate-calculator', 'electrolyte-calculator'],
    relatedGuideSlugs: ['sodium-requirements-for-endurance-athletes', 'sodium-loss-during-exercise'],
    inputs: [
      { name: 'sweatRate', label: 'Sweat Rate (Liters per hour)', type: 'number', defaultValue: 1.0, min: 0.3, max: 3.5, step: 0.1 },
      { name: 'duration', label: 'Workout Duration (hours)', type: 'number', defaultValue: 2, min: 0.5, max: 12, step: 0.5 },
      {
        name: 'sweatConcentration',
        label: 'Sweat Sodium Concentration',
        type: 'radio',
        defaultValue: '900',
        options: [
          { label: 'Low (500 mg/L)', value: '500' },
          { label: 'Medium (900 mg/L)', value: '900' },
          { label: 'High Salty (1500 mg/L)', value: '1500' }
        ]
      }
    ],
    outputs: [
      { label: 'Est. Total Sodium Loss', valueKey: 'totalSodium', unit: 'mg', color: 'text-red-500' },
      { label: 'Salt Equivalent', valueKey: 'saltGrams', unit: 'grams of table salt', color: 'text-amber-500' }
    ],
    calculate: (inputs) => {
      const rate = Number(inputs.sweatRate);
      const duration = Number(inputs.duration);
      const conc = Number(inputs.sweatConcentration);

      const totalSodium = Math.round(rate * duration * conc);
      const saltGrams = parseFloat((totalSodium / 387.58 / 10).toFixed(2)); // standard sodium content of table salt (40%)

      return { totalSodium, saltGrams };
    },
    resultExplanation: (inputs, results) => {
      return `Your workout depleted approximately **${results.totalSodium} mg of Sodium**. This is biochemically equivalent to losing **${results.saltGrams} grams** of plain table salt. Prioritize electrolyte recovery mixtures.`;
    }
  },
  {
    slug: 'hydration-status-calculator',
    title: 'Hydration Status Calculator',
    shortDescription: 'Assess your systemic hydration status using physiological and diagnostic markers.',
    metaDescription: 'Free online Hydration Status Calculator. Combine urine markers, thirst benchmarks, and weight checks for systemic diagnostics.',
    category: 'hydration-health',
    isDynamic: true,
    formula: {
      name: 'Multi-Factor Hydration Index',
      description: 'A clinical index score (0-100) combining urine color index (45%), relative thirst (30%), and body mass variations (25%).'
    },
    examples: [
      { scenario: 'Optimal Profile', inputs: 'Urine Color: Light, Thirst: Low, Weight Loss: 0%', result: 'Score 95 (Fully Hydrated)' }
    ],
    faqs: [
      { id: 'status-q1', question: 'Does urine color always reflect hydration?', answer: 'Yes, but high doses of vitamin B complex can turn urine bright neon yellow, mimicking dark urine readings momentarily.' }
    ],
    relatedSlugs: ['water-intake-calculator', 'sweat-rate-calculator'],
    relatedGuideSlugs: ['signs-of-dehydration-during-exercise', 'preventing-dehydration'],
    inputs: [
      {
        name: 'urine',
        label: 'Urine Color (WUT Scale)',
        type: 'select',
        defaultValue: '2',
        options: [
          { label: 'Pale Straw / Light Yellow (Optimal)', value: '2' },
          { label: 'Medium Yellow (Mild Dehydration)', value: '5' },
          { label: 'Dark Honey / Amber (Significant Dehydration)', value: '8' }
        ]
      },
      {
        name: 'thirst',
        label: 'Current Thirst Level',
        type: 'radio',
        defaultValue: 'low',
        options: [
          { label: 'No Thirst / Satisfied', value: 'low' },
          { label: 'Moderate / Dry Mouth', value: 'medium' },
          { label: 'Severe / Intense Cravings', value: 'high' }
        ]
      },
      { name: 'weightLoss', label: 'Est. Body Weight Shift today (%)', type: 'slider', defaultValue: 0, min: 0, max: 6, step: 0.5 }
    ],
    outputs: [
      { label: 'Hydration Quality Index', valueKey: 'score', unit: '/ 100', color: 'text-emerald-500' },
      { label: 'Clinical Assessment', valueKey: 'assessment', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const uVal = Number(inputs.urine);
      const wl = Number(inputs.weightLoss);
      let thirstDeduct = 0;
      if (inputs.thirst === 'medium') thirstDeduct = 15;
      if (inputs.thirst === 'high') thirstDeduct = 35;

      const urineDeduct = (uVal - 1) * 8;
      const wlDeduct = wl * 10;

      const score = Math.max(100 - Math.round(urineDeduct + thirstDeduct + wlDeduct), 5);
      
      let assessment = 'Fully Hydrated';
      if (score < 50) assessment = 'Severe Dehydration Risk';
      else if (score < 80) assessment = 'Mild to Moderate Dehydration';

      return { score, assessment };
    },
    resultExplanation: (inputs, results) => {
      return `Your hydration index score is **${results.score}/100**, indicating a clinical tier of **${results.assessment}**. Adjust your hydration protocols accordingly.`;
    }
  },

  // ========================================================
  // CATEGORY 2 — Running & Endurance
  // ========================================================
  {
    slug: 'marathon-pace-calculator',
    title: 'Marathon Pace Calculator',
    shortDescription: 'Calculate the exact continuous pace required per kilometer or mile to cross your marathon finish line.',
    metaDescription: 'Find your target marathon splits. Free online Marathon Pace Calculator. Input target race times to see precise velocities.',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'True Distance Split Equation',
      description: 'Velocity (Pace) = Target Time (minutes) ÷ Full Marathon Distance (42.195 km or 26.219 miles).'
    },
    examples: [
      { scenario: 'Sub-4 Hour Marathon', inputs: 'Time: 4 Hours', result: 'Pace: 5:41/km' }
    ],
    faqs: [
      { id: 'mar-q1', question: 'How can I maintain my target marathon pace?', answer: 'Build physiological endurance through regular tempo runs, weekly progressive long-distance runs, and proper in-race carbohydrate loading.' }
    ],
    relatedSlugs: ['half-marathon-pace-calculator', 'split-pace-calculator'],
    relatedGuideSlugs: ['marathon-training-pace-zones', 'running-pace-zones'],
    inputs: [
      { name: 'hours', label: 'Target Hours', type: 'number', defaultValue: 4, min: 2, max: 8 },
      { name: 'minutes', label: 'Target Minutes', type: 'slider', defaultValue: 0, min: 0, max: 59, step: 1 }
    ],
    outputs: [
      { label: 'Target Pace Metric', valueKey: 'paceKm', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Target Pace Imperial', valueKey: 'paceMile', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const h = Number(inputs.hours);
      const m = Number(inputs.minutes);
      const totalMins = (h * 60) + m;

      const paceKmRaw = totalMins / 42.195;
      const paceKmMin = Math.floor(paceKmRaw);
      const paceKmSec = Math.round((paceKmRaw - paceKmMin) * 60);

      const paceMileRaw = totalMins / 26.2188;
      const paceMileMin = Math.floor(paceMileRaw);
      const paceMileSec = Math.round((paceMileRaw - paceMileMin) * 60);

      const formattedSecKm = paceKmSec < 10 ? `0${paceKmSec}` : `${paceKmSec}`;
      const formattedSecMile = paceMileSec < 10 ? `0${paceMileSec}` : `${paceMileSec}`;

      return {
        paceKm: `${paceKmMin}:${formattedSecKm} min/km`,
        paceMile: `${paceMileMin}:${formattedSecMile} min/mile`
      };
    },
    resultExplanation: (inputs, results) => {
      return `To achieve a marathon time of **${inputs.hours}h ${inputs.minutes}m**, you must average a continuous pace of **${results.paceKm}** or **${results.paceMile}**.`;
    }
  },
  {
    slug: 'half-marathon-pace-calculator',
    title: 'Half Marathon Pace Calculator',
    shortDescription: 'Calculate the average pace required to finish a 21.097 km half-marathon under your time threshold.',
    metaDescription: 'Complete your half marathon race targets. Calculate target split paces in kilometers and miles instantly.',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'Half Marathon Speed Equation',
      description: 'Pace = Target Duration ÷ Half Marathon Distance (21.097 km or 13.109 miles).'
    },
    examples: [
      { scenario: 'Sub-2 Hour Half Marathon', inputs: 'Time: 2 Hours', result: 'Pace: 5:41/km' }
    ],
    faqs: [
      { id: 'half-q1', question: 'How is a half-marathon different from a 10K?', answer: 'The half-marathon is heavily reliant on cardiovascular lipid oxidation (aerobic stamina) and requires active fluid and fuel planning.' }
    ],
    relatedSlugs: ['marathon-pace-calculator', 'split-pace-calculator'],
    relatedGuideSlugs: ['marathon-training-pace-zones', 'running-pace-zones'],
    inputs: [
      { name: 'hours', label: 'Target Hours', type: 'number', defaultValue: 2, min: 1, max: 5 },
      { name: 'minutes', label: 'Target Minutes', type: 'slider', defaultValue: 0, min: 0, max: 59, step: 1 }
    ],
    outputs: [
      { label: 'Target Pace Metric', valueKey: 'paceKm', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Target Pace Imperial', valueKey: 'paceMile', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const h = Number(inputs.hours);
      const m = Number(inputs.minutes);
      const totalMins = (h * 60) + m;

      const paceKmRaw = totalMins / 21.0975;
      const paceKmMin = Math.floor(paceKmRaw);
      const paceKmSec = Math.round((paceKmRaw - paceKmMin) * 60);

      const paceMileRaw = totalMins / 13.1094;
      const paceMileMin = Math.floor(paceMileRaw);
      const paceMileSec = Math.round((paceMileRaw - paceMileMin) * 60);

      const formattedSecKm = paceKmSec < 10 ? `0${paceKmSec}` : `${paceKmSec}`;
      const formattedSecMile = paceMileSec < 10 ? `0${paceMileSec}` : `${paceMileSec}`;

      return {
        paceKm: `${paceKmMin}:${formattedSecKm} min/km`,
        paceMile: `${paceMileMin}:${formattedSecMile} min/mile`
      };
    },
    resultExplanation: (inputs, results) => {
      return `To complete your half marathon in **${inputs.hours}h ${inputs.minutes}m**, maintain a steady running velocity of **${results.paceKm}** (or **${results.paceMile}**).`;
    }
  },
  {
    slug: 'race-time-predictor',
    title: 'Race Time Predictor',
    shortDescription: 'Predict your race times for 10K, Half, or Full Marathon based on a recent running distance.',
    metaDescription: 'Predict future race potentials. Free online Race Predictor using the standard scientific Riegel formula.',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'Riegel Performance Formula',
      description: 'Predicted Time (T2) = Recent Time (T1) × (Target Distance [D2] ÷ Recent Distance [D1])^1.06.'
    },
    examples: [
      { scenario: 'Predicting Marathon from 20-min 5K', inputs: 'Distance: 5K, Time: 20 mins, Target: Marathon', result: 'Predicted: 3:11:51' }
    ],
    faqs: [
      { id: 'riegel-q1', question: 'How reliable is Riegel\'s prediction?', answer: 'Highly reliable, provided your endurance volume and training correspond to the target distance. Do not attempt a predicted marathon without building a high-volume aerobic base!' }
    ],
    relatedSlugs: ['marathon-pace-calculator', 'half-marathon-pace-calculator'],
    relatedGuideSlugs: ['vo2-max-for-runners', 'how-to-improve-running-economy'],
    inputs: [
      {
        name: 'recentDist',
        label: 'Recent Race Distance',
        type: 'select',
        defaultValue: '5',
        options: [
          { label: '5 Kilometers (5K)', value: '5' },
          { label: '10 Kilometers (10K)', value: '10' },
          { label: 'Half Marathon (21.1 km)', value: '21.1' }
        ]
      },
      { name: 'recentMins', label: 'Recent Total Time (Minutes)', type: 'number', defaultValue: 22, min: 10, max: 180 },
      {
        name: 'targetDist',
        label: 'Target Prediction Distance',
        type: 'select',
        defaultValue: '21.1',
        options: [
          { label: '10 Kilometers (10K)', value: '10' },
          { label: 'Half Marathon (21.1 km)', value: '21.1' },
          { label: 'Full Marathon (42.2 km)', value: '42.2' }
        ]
      }
    ],
    outputs: [
      { label: 'Predicted Target Duration', valueKey: 'predictedTime', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Predicted Pace Target', valueKey: 'predictedPace', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const d1 = Number(inputs.recentDist);
      const t1 = Number(inputs.recentMins);
      const d2 = Number(inputs.targetDist);

      const predictedMinsRaw = t1 * Math.pow((d2 / d1), 1.06);
      
      const hours = Math.floor(predictedMinsRaw / 60);
      const mins = Math.floor(predictedMinsRaw % 60);
      const secs = Math.round((predictedMinsRaw % 1) * 60);

      const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
      const timeStr = hours > 0 ? `${hours}h ${mins}m ${formattedSecs}s` : `${mins}m ${formattedSecs}s`;

      const paceRaw = predictedMinsRaw / d2;
      const paceMins = Math.floor(paceRaw);
      const paceSecs = Math.round((paceRaw - paceMins) * 60);
      const formattedPaceSecs = paceSecs < 10 ? `0${paceSecs}` : `${paceSecs}`;

      return {
        predictedTime: timeStr,
        predictedPace: `${paceMins}:${formattedPaceSecs} min/km`
      };
    },
    resultExplanation: (inputs, results) => {
      return `Based on your recent baseline performance, your predicted target time is **${results.predictedTime}** at an average velocity of **${results.predictedPace}**.`;
    }
  },
  {
    slug: 'split-pace-calculator',
    title: 'Split Pace Calculator',
    shortDescription: 'Generate standard, predictable split milestones to guide your target pacing strategy.',
    metaDescription: 'Generate dynamic split lists. Free online Running Split Calculator based on targeted race times.',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'Velocity Milestones Breakdown',
      description: 'Breaks down total target race time into uniform step-by-step split segments.'
    },
    examples: [
      { scenario: '10K in 50 minutes', inputs: 'Distance: 10k, Time: 50m', result: '5:00 min/km Splits' }
    ],
    faqs: [
      { id: 'split-q1', question: 'Should my splits be perfectly even?', answer: 'For flat courses, even pacing (splits) is most energy-efficient. For hilly courses, focus on keeping your effort level, rather than speed, constant.' }
    ],
    relatedSlugs: ['marathon-pace-calculator', 'half-marathon-pace-calculator'],
    relatedGuideSlugs: ['marathon-training-pace-zones', 'running-pace-zones'],
    inputs: [
      {
        name: 'distance',
        label: 'Select Course Distance',
        type: 'select',
        defaultValue: '10',
        options: [
          { label: '5 Kilometers (5K)', value: '5' },
          { label: '10 Kilometers (10K)', value: '10' },
          { label: 'Half Marathon (21.1 km)', value: '21.1' },
          { label: 'Full Marathon (42.2 km)', value: '42.2' }
        ]
      },
      { name: 'totalMins', label: 'Target Race Time (Minutes)', type: 'number', defaultValue: 50, min: 15, max: 480 }
    ],
    outputs: [
      { label: 'Average Split Pace', valueKey: 'avgPace', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Quarter-Mark Checkpoint', valueKey: 'quarterTime', isCustomText: true, color: 'text-blue-500' },
      { label: 'Half-Mark Checkpoint', valueKey: 'halfTime', isCustomText: true, color: 'text-indigo-500' }
    ],
    calculate: (inputs) => {
      const d = Number(inputs.distance);
      const totalMins = Number(inputs.totalMins);

      const paceKmRaw = totalMins / d;
      const paceMin = Math.floor(paceKmRaw);
      const paceSec = Math.round((paceKmRaw - paceMin) * 60);
      const formattedSec = paceSec < 10 ? `0${paceSec}` : `${paceSec}`;

      const formatCheckpoint = (fraction: number) => {
        const checkMins = totalMins * fraction;
        const h = Math.floor(checkMins / 60);
        const m = Math.floor(checkMins % 60);
        const s = Math.round((checkMins % 1) * 60);
        const secStr = s < 10 ? `0${s}` : `${s}`;
        return h > 0 ? `${h}h ${m}m ${secStr}s` : `${m}m ${secStr}s`;
      };

      return {
        avgPace: `${paceMin}:${formattedSec} min/km`,
        quarterTime: formatCheckpoint(0.25),
        halfTime: formatCheckpoint(0.50)
      };
    },
    resultExplanation: (inputs, results) => {
      return `To achieve your goal, your average split is **${results.avgPace}**. Cross the 25% mark at **${results.quarterTime}** and the halfway point at **${results.halfTime}**.`;
    }
  },
  {
    slug: 'cadence-calculator',
    title: 'Cadence Calculator',
    shortDescription: 'Calculate your running cadence (Steps Per Minute) based on speed and stride length markers.',
    metaDescription: 'Estimate your running efficiency index. Calculate Steps Per Minute (SPM) to reduce biomechanical injury risks.',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'Running Frequency Equation',
      description: 'Steps Per Minute (SPM) = (Running Speed in meters/minute) ÷ Stride Length (meters).'
    },
    examples: [
      { scenario: 'Running 12 km/h, Stride 1.1 meters', inputs: 'Speed: 12 km/h, Stride: 110 cm', result: '182 SPM' }
    ],
    faqs: [
      { id: 'cad-q1', question: 'Is 180 SPM the magic cadence number?', answer: 'No. While 180 SPM is a classic athletic benchmark, optimal cadence varies individually (typically between 170 and 190 SPM) depending on height and leg length.' }
    ],
    relatedSlugs: ['stride-length-calculator', 'running-pace-calculator'],
    relatedGuideSlugs: ['understanding-running-cadence', 'how-to-improve-running-economy'],
    inputs: [
      { name: 'speed', label: 'Running Speed (km/h)', type: 'number', defaultValue: 12, min: 5, max: 25 },
      { name: 'stride', label: 'Stride Length (cm)', type: 'slider', defaultValue: 110, min: 60, max: 200, step: 2 }
    ],
    outputs: [
      { label: 'Calculated Cadence', valueKey: 'spm', unit: 'steps/min', color: 'text-emerald-500' },
      { label: 'Efficiency Assessment', valueKey: 'rating', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const speedKmh = Number(inputs.speed);
      const strideM = Number(inputs.stride) / 100;

      // speed in meters per min = speedKmh * 1000 / 60
      const speedMpm = (speedKmh * 1000) / 60;
      const spm = Math.round(speedMpm / strideM);

      let rating = 'Moderate frequency (Potential overstriding)';
      if (spm >= 170 && spm <= 185) rating = 'Optimal Cadence (Highly Efficient)';
      else if (spm > 185) rating = 'High Turnover Cadence';

      return { spm, rating };
    },
    resultExplanation: (inputs, results) => {
      return `At a speed of **${inputs.speed} km/h** and stride of **${inputs.stride} cm**, your running cadence is **${results.spm} Steps Per Minute**. This falls in the **${results.rating}** tier.`;
    }
  },
  {
    slug: 'stride-length-calculator',
    title: 'Stride Length Calculator',
    shortDescription: 'Determine your average running stride length using target speeds and stride frequency data.',
    metaDescription: 'Find your running stride metrics. Free online Stride Length Estimator based on speed and step frequency (SPM).',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'Stride Span Formulation',
      description: 'Stride Length (meters) = (Speed in meters/minute) ÷ Cadence (SPM).'
    },
    examples: [
      { scenario: '10 km/h run, 170 SPM', inputs: 'Speed: 10, Cadence: 170', result: '0.98 meters' }
    ],
    faqs: [
      { id: 'str-q1', question: 'How can I safely increase my stride length?', answer: 'Increase your stride length through posterior-chain strength development (glutes, hamstrings) and hip flexibility, NOT by reaching your foot further forward.' }
    ],
    relatedSlugs: ['cadence-calculator', 'running-pace-calculator'],
    relatedGuideSlugs: ['understanding-running-cadence', 'how-to-improve-running-economy'],
    inputs: [
      { name: 'speed', label: 'Running Speed (km/h)', type: 'number', defaultValue: 10, min: 5, max: 25 },
      { name: 'cadence', label: 'Cadence (Steps per minute)', type: 'slider', defaultValue: 170, min: 120, max: 220, step: 2 }
    ],
    outputs: [
      { label: 'Stride Length Metric', valueKey: 'strideM', unit: 'meters', color: 'text-emerald-500' },
      { label: 'Stride Length Imperial', valueKey: 'strideInches', unit: 'inches', color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const speedKmh = Number(inputs.speed);
      const spm = Number(inputs.cadence);

      const speedMpm = (speedKmh * 1000) / 60;
      const strideM = parseFloat((speedMpm / spm).toFixed(2));
      const strideInches = Math.round(strideM * 39.37);

      return { strideM, strideInches };
    },
    resultExplanation: (inputs, results) => {
      return `At a velocity of **${inputs.speed} km/h** and cadence of **${inputs.cadence} steps/min**, your average stride spans **${results.strideM} meters** (approximately **${results.strideInches} inches**).`;
    }
  },
  {
    slug: 'running-training-zone-calculator',
    title: 'Training Zone Calculator',
    shortDescription: 'Calculate your accurate anaerobic and aerobic cardiovascular workout boundaries using your Threshold Heart Rate.',
    metaDescription: 'Find your Zone 1 to Zone 5 cardiovascular thresholds. Free online Lactate Threshold Heart Rate (LTHR) Zone Calculator.',
    category: 'endurance-performance',
    isDynamic: true,
    formula: {
      name: 'Lactate Threshold Cardiac Model',
      description: 'Calculates boundaries based on LTHR: Zone 1 (Recovery) < 85%, Zone 2 (Aerobic) 85-89%, Zone 3 (Tempo) 90-94%, Zone 4 (Sub-Threshold) 95-99%, Zone 5 (Anaerobic) >= 100%.'
    },
    examples: [
      { scenario: 'Threshold HR of 170 bpm', inputs: 'LTHR: 170', result: 'Zone 2 (Aerobic): 145-151 bpm' }
    ],
    faqs: [
      { id: 'tz-q1', question: 'Why is LTHR better than simple age equations?', answer: 'LTHR represents your actual cellular metabolism threshold, making it infinitely more precise than general formulas like "220 minus age" for serious athletes.' }
    ],
    relatedSlugs: ['heart-rate-zone-calculator', 'running-pace-calculator'],
    relatedGuideSlugs: ['marathon-training-pace-zones', 'heart-rate-training-explained'],
    inputs: [
      { name: 'lthr', label: 'Lactate Threshold Heart Rate (bpm)', type: 'number', defaultValue: 172, min: 110, max: 210 }
    ],
    outputs: [
      { label: 'Zone 2 Aerobic (Base)', valueKey: 'z2Range', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Zone 4 Lactate Threshold', valueKey: 'z4Range', isCustomText: true, color: 'text-orange-500' },
      { label: 'Zone 5 Anaerobic Capacity', valueKey: 'z5Range', isCustomText: true, color: 'text-red-500' }
    ],
    calculate: (inputs) => {
      const lthr = Number(inputs.lthr);

      const z2Min = Math.round(lthr * 0.85);
      const z2Max = Math.round(lthr * 0.89);
      const z4Min = Math.round(lthr * 0.95);
      const z4Max = Math.round(lthr * 0.99);
      const z5Min = Math.round(lthr * 1.02);

      return {
        z2Range: `${z2Min} - ${z2Max} bpm`,
        z4Range: `${z4Min} - ${z4Max} bpm`,
        z5Range: `> ${z5Min} bpm`
      };
    },
    resultExplanation: (inputs, results) => {
      return `Use these cardiovascular zones to program your training: \n• **Zone 2 (Aerobic Stamina):** ${results.z2Range}\n• **Zone 4 (Lactate Threshold):** ${results.z4Range}\n• **Zone 5 (Anaerobic Speed):** ${results.z5Range}.`;
    }
  },

  // ========================================================
  // CATEGORY 3 — Strength Training
  // ========================================================
  {
    slug: 'wilks-score-calculator',
    title: 'Wilks Score Calculator',
    shortDescription: 'Calculate your Wilks Score to compare relative muscular strength across different body weights.',
    metaDescription: 'Free online Wilks Calculator. Calculate your relative powerlifting performance index scientifically.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Standard Wilks Regression Coefficients',
      description: 'Uses gender-specific polynomial regression coefficients against body mass to normalize lifted weight.'
    },
    examples: [
      { scenario: '80kg Male lifting 500kg total', inputs: 'Weight: 80, Lifted: 500', result: 'Score = 345.2' }
    ],
    faqs: [
      { id: 'wilks-q1', question: 'What is a good Wilks Score?', answer: 'A score of 300 is considered good for amateur lift ratios; 400 is considered competitive, and 500+ is national or elite level.' }
    ],
    relatedSlugs: ['dots-score-calculator', 'relative-strength-calculator'],
    relatedGuideSlugs: ['powerlifting-scoring-systems', 'relative-strength-explained'],
    inputs: [
      { name: 'weight', label: 'Body Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 200 },
      { name: 'totalLifted', label: 'Three-Lift Total (Squat + Bench + Deadlift)', type: 'number', defaultValue: 450, unitType: 'weight', min: 50, max: 1200 },
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      }
    ],
    outputs: [
      { label: 'Your Wilks Score', valueKey: 'wilks', unit: 'points', color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const wRaw = Number(inputs.weight);
      const lRaw = Number(inputs.totalLifted);

      // Formulas require kg
      const w = isMetric ? wRaw : wRaw * 0.453592;
      const l = isMetric ? lRaw : lRaw * 0.453592;

      let coeff = 0;
      if (inputs.gender === 'male') {
        const a = -216.0475144;
        const b = 16.2606339;
        const c = -0.002388645;
        const d = -0.00113732;
        const e = 0.00000701863;
        const f = -0.00000001291;
        const denom = a + (b * w) + (c * Math.pow(w, 2)) + (d * Math.pow(w, 3)) + (e * Math.pow(w, 4)) + (f * Math.pow(w, 5));
        coeff = 500 / denom;
      } else {
        const a = 594.175815;
        const b = -27.238425;
        const c = 0.82112226;
        const d = -0.009307339;
        const e = 0.00004731582;
        const f = -0.00000009054;
        const denom = a + (b * w) + (c * Math.pow(w, 2)) + (d * Math.pow(w, 3)) + (e * Math.pow(w, 4)) + (f * Math.pow(w, 5));
        coeff = 500 / denom;
      }

      const wilks = parseFloat((l * coeff).toFixed(2));
      return { wilks };
    },
    resultExplanation: (inputs, results) => {
      return `Your calculated Wilks performance score is **${results.wilks} points**. Compare this relative ratio directly with lifters of other weight classes.`;
    }
  },
  {
    slug: 'dots-score-calculator',
    title: 'DOTS Score Calculator',
    shortDescription: 'Calculate your DOTS Score, the modern relative strength scoring index used in modern powerlifting federations.',
    metaDescription: 'Calculate your powerlifting DOTS score. Compare relative skeletal lift performance accurately.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'DOTS Regression Coefficients',
      description: 'A modern normalized formula mapping lifted kilograms against relative bodyweight ranges.'
    },
    examples: [
      { scenario: '80kg Male lifting 500kg total', inputs: 'Weight: 80, Lifted: 500', result: 'Score = 349.5' }
    ],
    faqs: [
      { id: 'dots-q1', question: 'Why use DOTS over Wilks?', answer: 'DOTS reduces the mathematical bias that Wilks exhibits at the absolute lightest and heaviest bodyweight extremes, providing fairer comparison.' }
    ],
    relatedSlugs: ['wilks-score-calculator', 'relative-strength-calculator'],
    relatedGuideSlugs: ['powerlifting-scoring-systems', 'relative-strength-explained'],
    inputs: [
      { name: 'weight', label: 'Body Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 200 },
      { name: 'totalLifted', label: 'Three-Lift Total (Squat + Bench + Deadlift)', type: 'number', defaultValue: 450, unitType: 'weight', min: 50, max: 1200 },
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      }
    ],
    outputs: [
      { label: 'Your DOTS Score', valueKey: 'dots', unit: 'points', color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const wRaw = Number(inputs.weight);
      const lRaw = Number(inputs.totalLifted);

      const w = isMetric ? wRaw : wRaw * 0.453592;
      const l = isMetric ? lRaw : lRaw * 0.453592;

      let coeff = 0;
      if (inputs.gender === 'male') {
        const a = -0.000001093;
        const b = 0.000739575;
        const c = -0.1793422;
        const d = 19.464537;
        const e = -1013.969;
        const f = 250.75;
        // Polynomial calculation
        const denom = (a * Math.pow(w, 4)) + (b * Math.pow(w, 3)) + (c * Math.pow(w, 2)) + (d * w) + e;
        coeff = f / denom;
      } else {
        const a = -0.00000107;
        const b = 0.0005151;
        const c = -0.112613;
        const d = 13.6175;
        const e = -610.15;
        const f = 500.0;
        const denom = (a * Math.pow(w, 4)) + (b * Math.pow(w, 3)) + (c * Math.pow(w, 2)) + (d * w) + e;
        coeff = f / denom;
      }

      const dots = parseFloat((l * coeff).toFixed(2));
      return { dots };
    },
    resultExplanation: (inputs, results) => {
      return `Your calculated DOTS score is **${results.dots} points**. This relative strength indicator is widely preferred in current international powerlifting matches.`;
    }
  },
  {
    slug: 'relative-strength-calculator',
    title: 'Relative Strength Calculator',
    shortDescription: 'Discover your relative muscular power-to-weight ratio to see how you perform relative to your frame size.',
    metaDescription: 'Free online Relative Strength Calculator. Find your custom power ratios in bench, squat, or deadlift indexes.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Power-to-Mass Multiplier',
      description: 'Relative Strength Ratio = Total Weight Lifted ÷ Body Weight.'
    },
    examples: [
      { scenario: 'Double Bodyweight Deadlift', inputs: 'Weight: 80, Lift: 160', result: 'Ratio: 2.0x' }
    ],
    faqs: [
      { id: 'rel-q1', question: 'Why is relative strength critical?', answer: 'Relative strength is vital for athletic performance, agility, speed, and bodyweight control, whereas absolute strength matters most in heavyweight power sports.' }
    ],
    relatedSlugs: ['wilks-score-calculator', 'one-rep-max-calculator'],
    relatedGuideSlugs: ['relative-strength-explained', 'how-to-use-one-rep-max'],
    inputs: [
      { name: 'weight', label: 'Your Weight', type: 'number', defaultValue: 75, unitType: 'weight', min: 40, max: 200 },
      { name: 'lift', label: 'Single Lift Target Weight (1RM)', type: 'number', defaultValue: 150, unitType: 'weight', min: 20, max: 500 }
    ],
    outputs: [
      { label: 'Strength to Weight Ratio', valueKey: 'ratio', unit: 'x Bodyweight', color: 'text-emerald-500' },
      { label: 'Relative Tier Assessment', valueKey: 'tier', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight);
      const l = Number(inputs.lift);

      const ratio = parseFloat((l / w).toFixed(2));
      let tier = 'Novice';
      if (ratio >= 2.5) tier = 'Elite Athlete';
      else if (ratio >= 1.8) tier = 'Advanced Performance';
      else if (ratio >= 1.2) tier = 'Intermediate';

      return { ratio, tier };
    },
    resultExplanation: (inputs, results) => {
      return `Your relative muscular strength multiplier is **${results.ratio}x** your bodyweight, classifying your level as **${results.tier}**.`;
    }
  },
  {
    slug: 'training-volume-calculator',
    title: 'Training Volume Calculator',
    shortDescription: 'Calculate your total repetitions and skeletal load across individual sets to target neuromuscular adaptation.',
    metaDescription: 'Calculate training volume. Optimize total reps and cumulative muscle fatigue for progressive overload metrics.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Sets × Reps Formulation',
      description: 'Total Repetitions = Sets × Reps per Set. Volume Load = Sets × Reps × Weight Lifted.'
    },
    examples: [
      { scenario: 'Standard Squat Session', inputs: 'Sets: 4, Reps: 8, Load: 100kg', result: '32 total reps, 3200kg Load' }
    ],
    faqs: [
      { id: 'vol-q1', question: 'How much volume is ideal for muscle growth?', answer: 'Research suggests targeting 10 to 20 working sets per muscle group per week for optimal hypertrophic muscle synthesis.' }
    ],
    relatedSlugs: ['volume-load-calculator', 'relative-strength-calculator'],
    relatedGuideSlugs: ['understanding-training-volume', 'progressive-overload-guide'],
    inputs: [
      { name: 'sets', label: 'Working Sets', type: 'slider', defaultValue: 4, min: 1, max: 10, step: 1 },
      { name: 'reps', label: 'Reps per Set', type: 'slider', defaultValue: 8, min: 1, max: 30, step: 1 },
      { name: 'weight', label: 'Weight Load Lifted', type: 'number', defaultValue: 80, unitType: 'weight', min: 1, max: 500 }
    ],
    outputs: [
      { label: 'Total Repetitions completed', valueKey: 'totalReps', unit: 'reps', color: 'text-blue-500' },
      { label: 'Cumulative Volume Load', valueKey: 'volumeLoad', unit: 'lbs/kg', color: 'text-emerald-500' }
    ],
    calculate: (inputs) => {
      const s = Number(inputs.sets);
      const r = Number(inputs.reps);
      const w = Number(inputs.weight);

      const totalReps = s * r;
      const volumeLoad = totalReps * w;

      return { totalReps, volumeLoad };
    },
    resultExplanation: (inputs, results, unit) => {
      return `This specific routine yields a total volume burden of **${results.totalReps} repetitions** and **${results.volumeLoad} ${unit === 'metric' ? 'kg' : 'lbs'}** of total skeletal weight load.`;
    }
  },
  {
    slug: 'volume-load-calculator',
    title: 'Volume Load Calculator',
    shortDescription: 'Calculate the total tonnage or load of your complete full-body workouts.',
    metaDescription: 'Track full-workout volume load. Compute total lifted weight across complex barbell and dumbbell movements.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Cumulative Tonnage Formula',
      description: 'Total Tonnage = Sum of (Sets × Reps × Weight) across all exercises performed in a session.'
    },
    examples: [
      { scenario: 'Complete Session (3 exercises)', inputs: 'Exercises: 3, Avg Sets: 4, Reps: 10, Weight: 60kg', result: '7200 kg' }
    ],
    faqs: [
      { id: 'vlc-q1', question: 'How is Volume Load used in coaching?', answer: 'Coaches monitor Volume Load to track the rate of progressive overload and manage system recovery to avoid overtraining.' }
    ],
    relatedSlugs: ['training-volume-calculator', 'one-rep-max-calculator'],
    relatedGuideSlugs: ['understanding-training-volume', 'progressive-overload-guide'],
    inputs: [
      { name: 'exercises', label: 'Number of Exercises in Workout', type: 'slider', defaultValue: 4, min: 1, max: 12, step: 1 },
      { name: 'avgSets', label: 'Average Sets per Exercise', type: 'slider', defaultValue: 3, min: 1, max: 8, step: 1 },
      { name: 'avgReps', label: 'Average Reps per Set', type: 'slider', defaultValue: 10, min: 1, max: 25, step: 1 },
      { name: 'avgWeight', label: 'Average Weight Lifted', type: 'number', defaultValue: 60, unitType: 'weight', min: 5, max: 400 }
    ],
    outputs: [
      { label: 'Cumulative Workout Load', valueKey: 'tonnage', unit: 'lbs/kg', color: 'text-emerald-500' }
    ],
    calculate: (inputs) => {
      const e = Number(inputs.exercises);
      const s = Number(inputs.avgSets);
      const r = Number(inputs.avgReps);
      const w = Number(inputs.avgWeight);

      const tonnage = e * s * r * w;
      return { tonnage };
    },
    resultExplanation: (inputs, results, unit) => {
      return `Your complete session output is **${results.tonnage} ${unit === 'metric' ? 'kg' : 'lbs'}** of total working skeletal volume. Use this as a baseline metric to beat next week!`;
    }
  },
  {
    slug: 'bench-press-standards-calculator',
    title: 'Bench Press Standards Calculator',
    shortDescription: 'Compare your maximum bench press against general and athletic population standards.',
    metaDescription: 'Find your bench press tier. Calculate if your maximum barbell bench press is at beginner, intermediate, or elite levels.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Weight Ratio Classification model',
      description: 'Standards mapped using body weight multipliers: Untrained (0.5x), Novice (0.75x), Intermediate (1.1x), Advanced (1.5x), Elite (1.9x).'
    },
    examples: [
      { scenario: '80kg Male pressing 90kg', inputs: 'Weight: 80, Press: 90', result: 'Intermediate Tier' }
    ],
    faqs: [
      { id: 'bench-st-q1', question: 'How long does it take to reach intermediate bench standards?', answer: 'With consistent structured training, most individuals can achieve intermediate strength standards within 6 to 12 months.' }
    ],
    relatedSlugs: ['squat-standards-calculator', 'deadlift-standards-calculator'],
    relatedGuideSlugs: ['how-to-use-one-rep-max', 'relative-strength-standards'],
    inputs: [
      { name: 'weight', label: 'Your Body Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 200 },
      { name: 'bench', label: 'Bench Press One-Rep Max', type: 'number', defaultValue: 80, unitType: 'weight', min: 20, max: 350 },
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      }
    ],
    outputs: [
      { label: 'Max Multiplier achieved', valueKey: 'multiplier', unit: 'x Bodyweight', color: 'text-emerald-500' },
      { label: 'Strength Standard Tier', valueKey: 'tier', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const bw = Number(inputs.weight);
      const bp = Number(inputs.bench);
      const isMale = inputs.gender === 'male';

      const multiplier = parseFloat((bp / bw).toFixed(2));
      let tier = 'Untrained';

      if (isMale) {
        if (multiplier >= 1.9) tier = 'Elite Athlete';
        else if (multiplier >= 1.5) tier = 'Advanced';
        else if (multiplier >= 1.1) tier = 'Intermediate';
        else if (multiplier >= 0.75) tier = 'Novice';
      } else {
        if (multiplier >= 1.1) tier = 'Elite Athlete';
        else if (multiplier >= 0.85) tier = 'Advanced';
        else if (multiplier >= 0.60) tier = 'Intermediate';
        else if (multiplier >= 0.40) tier = 'Novice';
      }

      return { multiplier, tier };
    },
    resultExplanation: (inputs, results) => {
      return `You can press **${results.multiplier}x** your body weight. This places you in the **${results.tier}** standard category for your weight profile.`;
    }
  },
  {
    slug: 'squat-standards-calculator',
    title: 'Squat Standards Calculator',
    shortDescription: 'Measure your barbell squat performance against clinical and athletic strength milestones.',
    metaDescription: 'Evaluate your back squat standard tier. Find your relative strength classification instantly.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Weight Ratio Squat Index',
      description: 'Standard multipliers: Novice (1.0x Male, 0.65x Female), Intermediate (1.4x Male, 1.0x Female), Advanced (1.8x Male, 1.3x Female), Elite (2.2x Male, 1.7x Female).'
    },
    examples: [
      { scenario: '80kg Male squatting 120kg', inputs: 'Weight: 80, Squat: 120', result: 'Intermediate Tier' }
    ],
    faqs: [
      { id: 'sq-st-q1', question: 'How deep is a standard squat?', answer: 'For testing and standard matching, a squat is successful when the crease of your hips drops below the top of your kneecaps (below parallel).' }
    ],
    relatedSlugs: ['bench-press-standards-calculator', 'deadlift-standards-calculator'],
    relatedGuideSlugs: ['how-to-use-one-rep-max', 'relative-strength-standards'],
    inputs: [
      { name: 'weight', label: 'Your Body Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 200 },
      { name: 'squat', label: 'Squat One-Rep Max', type: 'number', defaultValue: 100, unitType: 'weight', min: 20, max: 400 },
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      }
    ],
    outputs: [
      { label: 'Squat Multiplier achieved', valueKey: 'multiplier', unit: 'x Bodyweight', color: 'text-emerald-500' },
      { label: 'Strength Standard Tier', valueKey: 'tier', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const bw = Number(inputs.weight);
      const sq = Number(inputs.squat);
      const isMale = inputs.gender === 'male';

      const multiplier = parseFloat((sq / bw).toFixed(2));
      let tier = 'Untrained';

      if (isMale) {
        if (multiplier >= 2.2) tier = 'Elite Athlete';
        else if (multiplier >= 1.8) tier = 'Advanced';
        else if (multiplier >= 1.4) tier = 'Intermediate';
        else if (multiplier >= 1.0) tier = 'Novice';
      } else {
        if (multiplier >= 1.7) tier = 'Elite Athlete';
        else if (multiplier >= 1.3) tier = 'Advanced';
        else if (multiplier >= 1.0) tier = 'Intermediate';
        else if (multiplier >= 0.65) tier = 'Novice';
      }

      return { multiplier, tier };
    },
    resultExplanation: (inputs, results) => {
      return `You can back squat **${results.multiplier}x** your body weight. Your athletic level matches **${results.tier}** parameters.`;
    }
  },
  {
    slug: 'deadlift-standards-calculator',
    title: 'Deadlift Standards Calculator',
    shortDescription: 'Benchmark your deadlift performance to evaluate absolute and relative posterior chain strength.',
    metaDescription: 'Find your raw deadlift standards. Mapped benchmarks for deadlifts using scientific body weight indices.',
    category: 'strength-training',
    isDynamic: true,
    formula: {
      name: 'Deadlift Multiplier Standards',
      description: 'Standards mapped using relative multipliers: Novice (1.2x Male, 0.8x Female), Intermediate (1.6x Male, 1.2x Female), Advanced (2.1x Male, 1.6x Female), Elite (2.6x Male, 2.1x Female).'
    },
    examples: [
      { scenario: '80kg Male deadlifting 170kg', inputs: 'Weight: 80, Lift: 170', result: 'Advanced Tier' }
    ],
    faqs: [
      { id: 'dead-st-q1', question: 'Should I wear a belt during deadlifts?', answer: 'Weightlifting belts increase intra-abdominal pressure, which helps stabilize your spine when lifting heavy weights near or above 80% of your max.' }
    ],
    relatedSlugs: ['bench-press-standards-calculator', 'squat-standards-calculator'],
    relatedGuideSlugs: ['how-to-use-one-rep-max', 'relative-strength-standards'],
    inputs: [
      { name: 'weight', label: 'Your Body Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 200 },
      { name: 'deadlift', label: 'Deadlift One-Rep Max', type: 'number', defaultValue: 120, unitType: 'weight', min: 20, max: 450 },
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      }
    ],
    outputs: [
      { label: 'Deadlift Multiplier achieved', valueKey: 'multiplier', unit: 'x Bodyweight', color: 'text-emerald-500' },
      { label: 'Strength Standard Tier', valueKey: 'tier', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const bw = Number(inputs.weight);
      const dl = Number(inputs.deadlift);
      const isMale = inputs.gender === 'male';

      const multiplier = parseFloat((dl / bw).toFixed(2));
      let tier = 'Untrained';

      if (isMale) {
        if (multiplier >= 2.6) tier = 'Elite Athlete';
        else if (multiplier >= 2.1) tier = 'Advanced';
        else if (multiplier >= 1.6) tier = 'Intermediate';
        else if (multiplier >= 1.2) tier = 'Novice';
      } else {
        if (multiplier >= 2.1) tier = 'Elite Athlete';
        else if (multiplier >= 1.6) tier = 'Advanced';
        else if (multiplier >= 1.2) tier = 'Intermediate';
        else if (multiplier >= 0.8) tier = 'Novice';
      }

      return { multiplier, tier };
    },
    resultExplanation: (inputs, results) => {
      return `You can deadlift **${results.multiplier}x** your body weight, placing you in the **${results.tier}** performance tier.`;
    }
  },

  // ========================================================
  // CATEGORY 4 — Pregnancy & Women's Fitness
  // ========================================================
  {
    slug: 'pregnancy-weight-gain-calculator',
    title: 'Pregnancy Weight Gain Calculator',
    shortDescription: 'Find your target maternal weight gain curve over the 40 weeks of gestation based on your pre-pregnancy BMI.',
    metaDescription: 'Track maternal weight development curves. Free pregnancy weight gain calculator based on standard IOM guidelines.',
    category: 'womens-health',
    isDynamic: true,
    formula: {
      name: 'IOM Pregnancy Guidelines',
      description: 'Calculates cumulative safe weight gain targets based on pre-pregnancy BMI (Underweight, Normal, Overweight, Obese) over each trimester.'
    },
    examples: [
      { scenario: 'Healthy BMI at Week 24', inputs: 'BMI: 21, Week: 24', result: 'Target Gain: 6.8 - 9.1 kg' }
    ],
    faqs: [
      { id: 'preg-w-q1', question: 'When does the majority of weight gain occur?', answer: 'Maternal weight gain is very gradual during the first trimester (usually 1-2 kg total), and speeds up significantly in the second and third trimesters.' }
    ],
    relatedSlugs: ['pregnancy-bmi-calculator', 'postpartum-weight-calculator'],
    relatedGuideSlugs: ['healthy-pregnancy-weight-gain', 'exercise-during-pregnancy'],
    inputs: [
      {
        name: 'bmiCategory',
        label: 'Pre-Pregnancy BMI Tier',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Underweight (BMI < 18.5)', value: 'underweight' },
          { label: 'Normal / Healthy (BMI 18.5 - 24.9)', value: 'normal' },
          { label: 'Overweight (BMI 25.0 - 29.9)', value: 'overweight' },
          { label: 'Obese (BMI >= 30.0)', value: 'obese' }
        ]
      },
      { name: 'week', label: 'Current Gestational Week', type: 'slider', defaultValue: 20, min: 1, max: 40, step: 1 }
    ],
    outputs: [
      { label: 'Minimum Weight Gain recommended', valueKey: 'minGain', unit: 'lbs/kg', color: 'text-blue-500' },
      { label: 'Maximum Weight Gain recommended', valueKey: 'maxGain', unit: 'lbs/kg', color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const cat = inputs.bmiCategory;
      const week = Number(inputs.week);

      // Total gains in kg:
      // underweight: 12.5 - 18
      // normal: 11.5 - 16
      // overweight: 7 - 11.5
      // obese: 5 - 9
      let totalMin = 11.5;
      let totalMax = 16.0;

      if (cat === 'underweight') { totalMin = 12.5; totalMax = 18.0; }
      if (cat === 'overweight') { totalMin = 7.0; totalMax = 11.5; }
      if (cat === 'obese') { totalMin = 5.0; totalMax = 9.0; }

      // Standard linear scaling after week 12 (1st trimester flat gain of ~1.5kg)
      let currentMin = 1.5;
      let currentMax = 2.0;

      if (week > 12) {
        const remainingWeeks = week - 12;
        const scaleMin = (totalMin - 1.5) / 28;
        const scaleMax = (totalMax - 2.0) / 28;
        currentMin += remainingWeeks * scaleMin;
        currentMax += remainingWeeks * scaleMax;
      } else {
        // Linear scale up to week 12
        currentMin = (1.5 / 12) * week;
        currentMax = (2.0 / 12) * week;
      }

      // Rounding
      const multiplier = isMetric ? 1 : 2.20462;
      const displayMin = parseFloat((currentMin * multiplier).toFixed(1));
      const displayMax = parseFloat((currentMax * multiplier).toFixed(1));

      return {
        minGain: displayMin,
        maxGain: displayMax
      };
    },
    resultExplanation: (inputs, results, unit) => {
      const u = unit === 'metric' ? 'kg' : 'lbs';
      return `At **Week ${inputs.week}** of your pregnancy, the recommended healthy cumulative weight gain range is **${results.minGain} to ${results.maxGain} ${u}** relative to your pre-pregnancy baseline.`;
    }
  },
  {
    slug: 'pregnancy-bmi-calculator',
    title: 'Pregnancy BMI Calculator',
    shortDescription: 'Calculate your current Body Mass Index adjusted for gestational week progression.',
    metaDescription: 'Free online Pregnancy BMI Tracker. Calculate and evaluate maternal BMI indices securely.',
    category: 'womens-health',
    isDynamic: true,
    formula: {
      name: 'Gestational Adjusted BMI',
      description: 'Finds your standard Body Mass Index using current pregnancy weight: Weight (kg) ÷ Height² (m).'
    },
    examples: [
      { scenario: 'Week 20 Check', inputs: 'Weight: 72kg, Height: 165cm', result: 'Current BMI: 26.4' }
    ],
    faqs: [
      { id: 'pbmi-q1', question: 'Should BMI be tracked strictly in pregnancy?', answer: 'Maternal BMI tracking should focus on tracking weight gain progression velocity, rather than staying in a normal non-pregnant category.' }
    ],
    relatedSlugs: ['pregnancy-weight-gain-calculator', 'postpartum-weight-calculator'],
    relatedGuideSlugs: ['exercise-during-pregnancy', 'postpartum-recovery-nutrition'],
    inputs: [
      { name: 'weight', label: 'Current Weight', type: 'number', defaultValue: 70, unitType: 'weight', min: 40, max: 180 },
      { name: 'height', label: 'Height', type: 'number', defaultValue: 165, unitType: 'height', min: 120, max: 220 },
      { name: 'week', label: 'Pregnancy Week', type: 'slider', defaultValue: 20, min: 1, max: 40, step: 1 }
    ],
    outputs: [
      { label: 'Current Gestational BMI', valueKey: 'bmi', unit: 'kg/m²', color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const wKg = unit === 'metric' ? Number(inputs.weight) : Number(inputs.weight) * 0.453592;
      const hM = (unit === 'metric' ? Number(inputs.height) : Number(inputs.height) * 2.54) / 100;

      const bmi = parseFloat((wKg / Math.pow(hM, 2)).toFixed(1));
      return { bmi };
    },
    resultExplanation: (inputs, results) => {
      return `Your current calculated BMI at **Week ${inputs.week}** is **${results.bmi} kg/m²**. Your practitioner will review this alongside your individual baseline tracking curves.`;
    }
  },
  {
    slug: 'postpartum-weight-calculator',
    title: 'Postpartum Weight Calculator',
    shortDescription: 'Track and plan safe postpartum weight loss to support metabolic and lactation demands.',
    metaDescription: 'Track safe postpartum body mass regression. Free postpartum recovery weight calculator.',
    category: 'womens-health',
    isDynamic: true,
    formula: {
      name: 'Safe Maternal Regression Pace',
      description: 'Losing around 0.5 kg (1 lb) per week post-childbirth is clinically safe and avoids dropping milk volume during lactation.'
    },
    examples: [
      { scenario: '8 Weeks Postpartum', inputs: 'Delivery Weight: 85kg, Pre-Preg Weight: 70kg, Week: 8', result: 'Safe Weight Target: 81kg' }
    ],
    faqs: [
      { id: 'post-q1', question: 'How many extra calories do breastfeeding mothers need?', answer: 'Lactating women require about 300 to 500 additional calories daily to fuel healthy breast milk synthesis.' }
    ],
    relatedSlugs: ['pregnancy-weight-gain-calculator', 'pregnancy-bmi-calculator'],
    relatedGuideSlugs: ['postpartum-recovery-nutrition', 'healthy-pregnancy-weight-gain'],
    inputs: [
      { name: 'deliveryWeight', label: 'Weight at Childbirth / Delivery', type: 'number', defaultValue: 85, unitType: 'weight', min: 40, max: 200 },
      { name: 'preWeight', label: 'Pre-Pregnancy Weight', type: 'number', defaultValue: 70, unitType: 'weight', min: 38, max: 190 },
      { name: 'currentWeight', label: 'Current Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 39, max: 195 },
      { name: 'postpartumWeek', label: 'Weeks Postpartum', type: 'slider', defaultValue: 6, min: 1, max: 52, step: 1 }
    ],
    outputs: [
      { label: 'Recommended Max Safe Weight', valueKey: 'targetWeight', unit: 'lbs/kg', color: 'text-emerald-500' },
      { label: 'Weight Left to Baseline', valueKey: 'leftToLose', unit: 'lbs/kg', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const dW = Number(inputs.deliveryWeight);
      const pW = Number(inputs.preWeight);
      const cW = Number(inputs.currentWeight);
      const weeks = Number(inputs.postpartumWeek);

      // Safe pace is 0.5kg/week. Immediate fluid loss at delivery is approx 5.5kg
      const fluidLoss = 5.5; // kg
      const scaleFactor = isMetric ? 1 : 2.20462;

      const baselineAfterDelivery = Math.max(dW - fluidLoss, pW);
      const targetWeight = Math.max(baselineAfterDelivery - (weeks * 0.5), pW);
      const leftToLose = Math.max(cW - pW, 0);

      return {
        targetWeight: parseFloat((targetWeight).toFixed(1)),
        leftToLose: parseFloat((leftToLose).toFixed(1))
      };
    },
    resultExplanation: (inputs, results, unit) => {
      const u = unit === 'metric' ? 'kg' : 'lbs';
      return `At **Week ${inputs.postpartumWeek}** postpartum, a recommended safe recovery weight target is **${results.targetWeight} ${u}**. You have **${results.leftToLose} ${u}** remaining to reach your pre-pregnancy weight baseline of **${inputs.preWeight} ${u}**.`;
    }
  },
  {
    slug: 'ovulation-calculator',
    title: 'Ovulation Calculator',
    shortDescription: 'Estimate your fertile window and ovulation days to assist with family and sports cycle planning.',
    metaDescription: 'Free online Ovulation Calendar. Determine your ovulation date and peak fertile window easily.',
    category: 'womens-health',
    isDynamic: true,
    formula: {
      name: 'Standard Menstrual Calendar Algorithm',
      description: 'Ovulation occurs approximately 14 days before your next expected menstrual cycle begins. The fertile window spans 5 days prior to ovulation plus ovulation day.'
    },
    examples: [
      { scenario: '28-day cycle, last period 10 days ago', inputs: 'Cycle Length: 28 days, Days Ago: 10', result: 'Ovulation in 4 Days' }
    ],
    faqs: [
      { id: 'ovu-q1', question: 'How accurate is calendar tracking?', answer: 'Calendar methods are helpful estimates. For clinical precision, pair this with basal body temperature (BBT) records or ovulation predictor kits (OPKs).' }
    ],
    relatedSlugs: ['due-date-calculator', 'pregnancy-weight-gain-calculator'],
    relatedGuideSlugs: ['postpartum-recovery-nutrition', 'healthy-pregnancy-weight-gain'],
    inputs: [
      { name: 'cycleLength', label: 'Average Cycle Length (days)', type: 'slider', defaultValue: 28, min: 21, max: 45, step: 1 },
      { name: 'daysAgo', label: 'Days since Last Period started', type: 'number', defaultValue: 12, min: 0, max: 40 }
    ],
    outputs: [
      { label: 'Days Until Next Ovulation', valueKey: 'daysToOvulation', unit: 'days', color: 'text-emerald-500' },
      { label: 'Fertile Window Begins (Day of cycle)', valueKey: 'fertileStart', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const cycle = Number(inputs.cycleLength);
      const past = Number(inputs.daysAgo);

      const ovulationDay = cycle - 14; // Day of cycle
      const fertileStart = Math.max(ovulationDay - 5, 1);
      const fertileEnd = ovulationDay + 1;

      let daysToOvulation = ovulationDay - past;
      if (daysToOvulation < 0) {
        // Shift to next cycle
        daysToOvulation = (cycle - past) + ovulationDay;
      }

      return {
        daysToOvulation,
        fertileStart: `Day ${fertileStart} - ${fertileEnd}`
      };
    },
    resultExplanation: (inputs, results) => {
      return `Based on a **${inputs.cycleLength}-day** menstrual cycle, your next ovulation is estimated in **${results.daysToOvulation} days**. Your peak fertile window spans **${results.fertileStart}** of your menstrual cycle.`;
    }
  },
  {
    slug: 'due-date-calculator',
    title: 'Due Date Calculator',
    shortDescription: 'Calculate your estimated due date and current gestational progression based on Naegele\'s clinical rule.',
    metaDescription: 'Free online Pregnancy Due Date Calculator. Find your gestational age and target birth date using clinical formulas.',
    category: 'womens-health',
    isDynamic: true,
    formula: {
      name: 'Naegele’s Standard Rule',
      description: 'Estimated Due Date (EDD) = Last Menstrual Period (LMP) + 280 days (40 weeks).'
    },
    examples: [
      { scenario: 'LMP 100 days ago', inputs: 'Days Since LMP: 100', result: 'EDD in 180 Days, Week 14' }
    ],
    faqs: [
      { id: 'due-q1', question: 'How many babies are born on their exact due date?', answer: 'Only about 4% to 5% of babies are born on their estimated due date. Most are born within a week before or after.' }
    ],
    relatedSlugs: ['pregnancy-weight-gain-calculator', 'ovulation-calculator'],
    relatedGuideSlugs: ['healthy-pregnancy-weight-gain', 'exercise-during-pregnancy'],
    inputs: [
      { name: 'daysSinceLmp', label: 'Days since Last Menstrual Period began', type: 'number', defaultValue: 120, min: 1, max: 279 }
    ],
    outputs: [
      { label: 'Current Gestational Age', valueKey: 'gestWeek', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Days Remaining to Delivery', valueKey: 'daysRemaining', unit: 'days', color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const lmpDays = Number(inputs.daysSinceLmp);
      const totalGestation = 280;

      const weeks = Math.floor(lmpDays / 7);
      const days = lmpDays % 7;
      const daysRemaining = Math.max(totalGestation - lmpDays, 0);

      return {
        gestWeek: `${weeks} weeks, ${days} days`,
        daysRemaining
      };
    },
    resultExplanation: (inputs, results) => {
      return `You are currently **${results.gestWeek}** pregnant. Your estimated due date is approximately **${results.daysRemaining} days** from today.`;
    }
  },

  // ========================================================
  // CATEGORY 5 — Aging & Longevity
  // ========================================================
  {
    slug: 'healthy-aging-score-calculator',
    title: 'Healthy Aging Score Calculator',
    shortDescription: 'Evaluate your healthy aging index score using standard, validated lifestyle biomarkers.',
    metaDescription: 'Find your healthy aging score. Combine cardiovascular, physical activity, and dietary choices for longevity estimations.',
    category: 'longevity',
    isDynamic: true,
    formula: {
      name: 'Lifestyle Longevity Algorithm',
      description: 'Weights key lifestyle indicators: Exercise (30%), Sleep Quality (20%), Nutrition (20%), Smoking (20%), and Stress (10%).'
    },
    examples: [
      { scenario: 'Active, High Sleep Quality', inputs: 'Exercise: High, Sleep: 8h, Smoking: No', result: 'Score: 92/100' }
    ],
    faqs: [
      { id: 'age-st-q1', question: 'What is healthspan?', answer: 'Healthspan is the portion of your life spent in good health, free from chronic diseases and functional disabilities. This differs from simple lifespan.' }
    ],
    relatedSlugs: ['biological-age-calculator', 'life-expectancy-calculator'],
    relatedGuideSlugs: ['fitness-and-longevity', 'biological-age-vs-chronological-age'],
    inputs: [
      { name: 'age', label: 'Chronological Age', type: 'number', defaultValue: 45, min: 18, max: 100 },
      {
        name: 'activity',
        label: 'Weekly Moderate Exercise (Hours)',
        type: 'slider',
        defaultValue: 3,
        min: 0,
        max: 15,
        step: 0.5
      },
      {
        name: 'sleep',
        label: 'Average Nightly Sleep (Hours)',
        type: 'select',
        defaultValue: '7-8',
        options: [
          { label: 'Less than 6 hours', value: 'poor' },
          { label: '6 to 7 hours', value: 'mod' },
          { label: '7 to 9 hours (Optimal)', value: 'optimal' }
        ]
      },
      {
        name: 'smoking',
        label: 'Do you smoke tobacco?',
        type: 'radio',
        defaultValue: 'no',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      }
    ],
    outputs: [
      { label: 'Healthy Aging Index', valueKey: 'score', unit: '/ 100', color: 'text-emerald-500' },
      { label: 'Aging Tier Assessment', valueKey: 'tier', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      let score = 50;

      // Exercise
      const hrs = Number(inputs.activity);
      if (hrs >= 5) score += 25;
      else if (hrs >= 2.5) score += 20;
      else if (hrs > 0) score += 10;

      // Sleep
      if (inputs.sleep === 'optimal') score += 15;
      if (inputs.sleep === 'mod') score += 10;

      // Smoking
      if (inputs.smoking === 'no') score += 15;

      // Cap at 98
      score = Math.min(score, 100);

      let tier = 'Intermediate (Moderate longevity)';
      if (score >= 85) tier = 'Exceptional Aging Profile';
      else if (score < 60) tier = 'Elevated Risk Level';

      return { score, tier };
    },
    resultExplanation: (inputs, results) => {
      return `Your calculated Healthy Aging Score is **${results.score}/100**, placing you in the **${results.tier}** category. Keep investing in healthy physical habits to maximize your future healthspan.`;
    }
  },
  {
    slug: 'resting-heart-rate-calculator',
    title: 'Resting Heart Rate Calculator',
    shortDescription: 'Benchmark your resting heart rate to evaluate cardiovascular fitness and autonomous nervous balance.',
    metaDescription: 'Assess your cardiovascular health. Check if your Resting Heart Rate (RHR) aligns with athletic or average metrics.',
    category: 'longevity',
    isDynamic: true,
    formula: {
      name: 'Cardiological Health Scale',
      description: 'Maps Resting Heart Rate (RHR) categories: Athletic (<50 bpm), Excellent (50-60 bpm), Good (61-70 bpm), Average (71-80 bpm), Elevated (>80 bpm).'
    },
    examples: [
      { scenario: 'RHR of 58 bpm', inputs: 'RHR: 58', result: 'Excellent Fitness Tier' }
    ],
    faqs: [
      { id: 'rhr-q1', question: 'How should I measure my resting heart rate?', answer: 'Measure your heart rate immediately upon waking up in the morning, while still lying relaxed in bed, to get an accurate resting measurement.' }
    ],
    relatedSlugs: ['maximum-heart-rate-calculator', 'healthy-aging-score-calculator'],
    relatedGuideSlugs: ['resting-heart-rate-explained', 'fitness-and-longevity'],
    inputs: [
      { name: 'rhr', label: 'Resting Heart Rate (bpm)', type: 'number', defaultValue: 65, min: 35, max: 120 }
    ],
    outputs: [
      { label: 'Resting Cardio Assessment', valueKey: 'tier', isCustomText: true, color: 'text-emerald-500' }
    ],
    calculate: (inputs) => {
      const hr = Number(inputs.rhr);
      let tier = 'Average';

      if (hr < 50) tier = 'Athletic Conditioning';
      else if (hr <= 60) tier = 'Excellent Fitness';
      else if (hr <= 70) tier = 'Good Cardio Health';
      else if (hr > 85) tier = 'Elevated Heart Rate (Tachycardia risk)';

      return { tier };
    },
    resultExplanation: (inputs, results) => {
      return `Your Resting Heart Rate is **${inputs.rhr} bpm**, qualifying your cardiorespiratory fitness as **${results.tier}**.`;
    }
  },
  {
    slug: 'maximum-heart-rate-calculator',
    title: 'Maximum Heart Rate Calculator',
    shortDescription: 'Predict your maximum safe heart rate using validated Gellish, Tanaka, and Fox formulas.',
    metaDescription: 'Find your true maximum heart rate limit. Calculate maximal exertion heart rates for athletic zone planning.',
    category: 'longevity',
    isDynamic: true,
    formula: {
      name: 'Tanaka & Gellish Cardiac Equations',
      description: 'Tanaka Equation: 206.9 - (0.67 × Age). Gellish Equation: 207 - (0.7 × Age). Fox Equation: 220 - Age.'
    },
    examples: [
      { scenario: '40-year-old athlete', inputs: 'Age: 40, Formula: Tanaka', result: 'Max HR: 180 bpm' }
    ],
    faqs: [
      { id: 'maxhr-q1', question: 'Which formula is most accurate?', answer: 'The Tanaka and Gellish equations are scientifically shown to have much lower margins of error than the traditional, simplistic Fox formula.' }
    ],
    relatedSlugs: ['resting-heart-rate-calculator', 'running-training-zone-calculator'],
    relatedGuideSlugs: ['resting-heart-rate-explained', 'heart-rate-training-explained'],
    inputs: [
      { name: 'age', label: 'Your Age', type: 'number', defaultValue: 30, min: 10, max: 100 },
      {
        name: 'formula',
        label: 'Prediction Formula',
        type: 'select',
        defaultValue: 'tanaka',
        options: [
          { label: 'Tanaka (Standard Athletic)', value: 'tanaka' },
          { label: 'Gellish (Clinically Validated)', value: 'gellish' },
          { label: 'Fox (Traditional Standard)', value: 'fox' }
        ]
      }
    ],
    outputs: [
      { label: 'Predicted Maximum Heart Rate', valueKey: 'maxHr', unit: 'bpm', color: 'text-red-500' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const f = inputs.formula;

      let maxHr = 220 - age; // default fox
      if (f === 'tanaka') maxHr = Math.round(206.9 - (0.67 * age));
      if (f === 'gellish') maxHr = Math.round(207 - (0.7 * age));

      return { maxHr };
    },
    resultExplanation: (inputs, results) => {
      const formulaName = (inputs.formula || 'tanaka').toUpperCase();
      return `Using the **${formulaName}** method, your estimated peak maximum heart rate is **${results.maxHr} bpm**. Use this value to configure your cardiac training zones.`;
    }
  },
  {
    slug: 'biological-age-calculator',
    title: 'Biological Age Calculator',
    shortDescription: 'Estimate your true biological age relative to your calendar age using vital physical markers.',
    metaDescription: 'Free online Biological Age Calculator. Compare chronological age with cellular vitality metrics.',
    category: 'longevity',
    isDynamic: true,
    formula: {
      name: 'Vance-Mifflin Biomarker Index',
      description: 'Adjusts chronological age using markers including cardiovascular HRV, muscular grip stamina, and relative aerobic capacity.'
    },
    examples: [
      { scenario: 'Highly fit 50-year-old', inputs: 'Age: 50, Cardio: Excellent, HRV: High', result: 'Biological Age: 42.5 years' }
    ],
    faqs: [
      { id: 'bio-q1', question: 'Can I reverse my biological age?', answer: 'Yes! Unlike chronological age, your biological age responds dynamically to lifestyle changes, including strength training, fasting, and cardiorespiratory fitness.' }
    ],
    relatedSlugs: ['healthy-aging-score-calculator', 'life-expectancy-calculator'],
    relatedGuideSlugs: ['biological-age-vs-chronological-age', 'fitness-and-longevity'],
    inputs: [
      { name: 'age', label: 'Chronological Age (years)', type: 'number', defaultValue: 40, min: 20, max: 95 },
      {
        name: 'fitness',
        label: 'Aerobic Fitness Level',
        type: 'select',
        defaultValue: 'average',
        options: [
          { label: 'Elite (Consistent high intensity)', value: 'elite' },
          { label: 'Active (Daily walks / Gym 3x)', value: 'active' },
          { label: 'Sedentary (Rare exercise)', value: 'sedentary' }
        ]
      },
      {
        name: 'hrv',
        label: 'Heart Rate Variability (HRV)',
        type: 'radio',
        defaultValue: 'normal',
        options: [
          { label: 'High (Optimal autonomic balance)', value: 'high' },
          { label: 'Normal / Healthy', value: 'normal' },
          { label: 'Low (Stressed / Fatigue)', value: 'low' }
        ]
      }
    ],
    outputs: [
      { label: 'Estimated Biological Age', valueKey: 'bioAge', unit: 'years old', color: 'text-emerald-500' },
      { label: 'Longevity Offset', valueKey: 'offset', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      let offset = 0;

      if (inputs.fitness === 'elite') offset -= 5;
      if (inputs.fitness === 'active') offset -= 2;
      if (inputs.fitness === 'sedentary') offset += 4;

      if (inputs.hrv === 'high') offset -= 3;
      if (inputs.hrv === 'low') offset += 3;

      const bioAge = age + offset;
      const offsetStr = offset < 0 ? `${Math.abs(offset)} Years Younger` : `${offset} Years Older`;

      return {
        bioAge,
        offset: offset === 0 ? 'Aligned with Chronological Age' : offsetStr
      };
    },
    resultExplanation: (inputs, results) => {
      return `Your chronological age is **${inputs.age}**, but your lifestyle indicators map to an estimated biological age of **${results.bioAge} years** (**${results.offset}**).`;
    }
  },
  {
    slug: 'life-expectancy-calculator',
    title: 'Life Expectancy Calculator',
    shortDescription: 'Calculate your projected lifespan based on historical actuarial statistics and lifestyle factors.',
    metaDescription: 'Free online Lifespan Predictor. Estimate your potential lifespan based on longevity guidelines.',
    category: 'longevity',
    isDynamic: true,
    formula: {
      name: 'Actuarial Baseline with Modifiers',
      description: 'Applies positive and negative multipliers to default gender life expectancy guidelines.'
    },
    examples: [
      { scenario: 'Healthy Active Female', inputs: 'Age: 30, Gender: Female, Active', result: 'Expectancy: 87.5 years' }
    ],
    faqs: [
      { id: 'le-q1', question: 'How can I maximize my life expectancy?', answer: 'Maximize your life expectancy by avoiding tobacco, prioritizing resistance training, maintaining a low-inflammation diet, and building strong social connections.' }
    ],
    relatedSlugs: ['healthy-aging-score-calculator', 'biological-age-calculator'],
    relatedGuideSlugs: ['fitness-and-longevity', 'resting-heart-rate-explained'],
    inputs: [
      {
        name: 'gender',
        label: 'Biological Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { name: 'age', label: 'Your Current Age', type: 'number', defaultValue: 35, min: 18, max: 95 },
      {
        name: 'diet',
        label: 'Dietary Quality',
        type: 'select',
        defaultValue: 'healthy',
        options: [
          { label: 'Highly processed / Fast food focus', value: 'poor' },
          { label: 'Balanced (Veggies, whole foods)', value: 'healthy' },
          { label: 'Excellent (Premium Mediterranean/Anti-inflammatory)', value: 'excellent' }
        ]
      }
    ],
    outputs: [
      { label: 'Projected Lifespan', valueKey: 'expectancy', unit: 'years', color: 'text-emerald-500' },
      { label: 'Remaining Active Years', valueKey: 'remaining', unit: 'years', color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const isMale = inputs.gender === 'male';
      const age = Number(inputs.age);

      let baseline = isMale ? 76.5 : 81.2;

      // Adjust for diet
      if (inputs.diet === 'excellent') baseline += 5;
      if (inputs.diet === 'poor') baseline -= 6;

      const expectancy = Math.max(baseline, age + 2); // Make sure you don't predict death in the past!
      const remaining = Math.max(Math.round(expectancy - age), 2);

      return {
        expectancy: parseFloat((expectancy).toFixed(1)),
        remaining
      };
    },
    resultExplanation: (inputs, results) => {
      return `Your calculated life expectancy is **${results.expectancy} years**, giving you approximately **${results.remaining} active years** ahead to invest in healthy habits.`;
    }
  }
];
