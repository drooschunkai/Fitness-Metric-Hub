import { CalculatorConfig } from '../types';

export const DYNAMIC_CALCULATORS: CalculatorConfig[] = [
  // ========================================================
  // NUTRITION CALCULATORS
  // ========================================================
  {
    slug: 'carb-calculator',
    title: 'Carbohydrate Calculator',
    shortDescription: 'Calculate your recommended daily carbohydrate intake based on your body weight, fitness goals, and training intensity.',
    metaDescription: 'Optimize your performance and body composition. Calculate your daily carbohydrate requirements using clinical nutrient ratios.',
    category: 'nutrition',
    isDynamic: true,
    formula: {
      name: 'Clinical Macronutrient Guidelines',
      description: 'Carbohydrate guidelines are based on body mass and training intensity. \n• Light/Sustained: 3.0g to 4.5g per kg\n• Moderate: 4.5g to 6.0g per kg\n• Intense/Endurance: 6.0g to 8.0g per kg\n\nDaily Carbs (g) = Weight (kg) × Goal Target Factor × Activity Intensity Factor.'
    },
    examples: [
      { scenario: 'Active Male (Weight Loss)', inputs: 'Weight: 80 kg, Goal: Loss, Activity: Moderate', result: 'Daily Carbs = 240g' },
      { scenario: 'Endurance Athlete (Bulking)', inputs: 'Weight: 70 kg, Goal: Gain, Activity: Active', result: 'Daily Carbs = 490g' }
    ],
    faqs: [
      { id: 'carb-q1', question: 'Should I avoid carbs to lose weight?', answer: 'No. Carbohydrates are the primary fuel source for high-intensity exercise and support muscle preservation. Modulating, not eliminating, carbohydrates is the key to sustainable weight loss.' }
    ],
    relatedSlugs: ['calorie-calculator', 'macro-calculator', 'protein-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'protein-for-weight-loss'],
    inputs: [
      { name: 'weight', label: 'Body Weight', type: 'number', defaultValue: 75, unitType: 'weight', min: 30, max: 200 },
      {
        name: 'goal',
        label: 'Fitness Goal',
        type: 'select',
        defaultValue: 'maintenance',
        options: [
          { label: 'Fat Loss (Moderate Carb)', value: 'loss' },
          { label: 'Weight Maintenance', value: 'maintenance' },
          { label: 'Muscle Gain (High Carb)', value: 'gain' }
        ]
      },
      {
        name: 'activity',
        label: 'Exercise Intensity',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Light (Walking/Yoga)', value: 'light' },
          { label: 'Moderate (Gym 3-4x/week)', value: 'moderate' },
          { label: 'High (Heavy training 5x/week)', value: 'high' }
        ]
      }
    ],
    outputs: [
      { label: 'Daily Carb Target', valueKey: 'dailyCarbs', unit: 'g/day', color: 'text-emerald-500' },
      { label: 'Carb Calories', valueKey: 'carbCalories', unit: 'kcal/day', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const weightKg = unit === 'metric' ? Number(inputs.weight) : Number(inputs.weight) * 0.453592;
      let factor = 4.5; // maintenance
      if (inputs.goal === 'loss') factor = 3.2;
      if (inputs.goal === 'gain') factor = 6.0;

      let intensityMult = 1.0;
      if (inputs.activity === 'light') intensityMult = 0.85;
      if (inputs.activity === 'high') intensityMult = 1.25;

      const dailyCarbs = Math.round(weightKg * factor * intensityMult);
      const carbCalories = dailyCarbs * 4;

      return { dailyCarbs, carbCalories };
    },
    resultExplanation: (inputs, results) => {
      return `To support your fitness goals, we recommend consuming **${results.dailyCarbs} grams** of carbohydrates per day. This equates to **${results.carbCalories} kcal** of energy. Focus on complex carbs like oats, brown rice, sweet potatoes, and quinoa to maintain stable blood sugar levels.`;
    }
  },
  {
    slug: 'fat-intake-calculator',
    title: 'Fat Intake Calculator',
    shortDescription: 'Calculate your recommended healthy fat intake based on your daily calories and target dietary structure.',
    metaDescription: 'Optimize cellular health and hormone production. Calculate your recommended dietary fat targets in grams and calories.',
    category: 'nutrition',
    isDynamic: true,
    formula: {
      name: 'Dietary Fat Energy Ratios',
      description: 'Fat provides 9 calories per gram. Clinical baselines recommend that 20% to 35% of total daily calories should come from dietary fat for optimal hormone synthesis.\n\nFat Grams = (Daily Calories × Target Fat %) ÷ 9.'
    },
    examples: [
      { scenario: 'Moderate Fat Diet (2000 kcal)', inputs: 'Calories: 2000 kcal, Ratio: Moderate (25%)', result: 'Daily Fat = 56g' },
      { scenario: 'Keto Diet (2500 kcal)', inputs: 'Calories: 2500 kcal, Ratio: Keto (70%)', result: 'Daily Fat = 194g' }
    ],
    faqs: [
      { id: 'fat-q1', question: 'What fats are healthier?', answer: 'Prioritize monounsaturated and polyunsaturated fats from avocados, extra virgin olive oil, nuts, seeds, and wild-caught fatty fish. Minimize trans fats and refined seed oils.' }
    ],
    relatedSlugs: ['calorie-calculator', 'macro-calculator', 'protein-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'best-protein-sources'],
    inputs: [
      { name: 'calories', label: 'Daily Calorie Intake', type: 'number', defaultValue: 2000, min: 1000, max: 6000, step: 50 },
      {
        name: 'ratio',
        label: 'Dietary Fat Ratio',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Low Fat (20% of calories)', value: 'low' },
          { label: 'Moderate Balanced (30% of calories)', value: 'moderate' },
          { label: 'High Fat / Ketogenic (70% of calories)', value: 'keto' }
        ]
      }
    ],
    outputs: [
      { label: 'Daily Fat Target', valueKey: 'fatGrams', unit: 'g/day', color: 'text-emerald-500' },
      { label: 'Fat Calories', valueKey: 'fatCalories', unit: 'kcal/day', color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const kcal = Number(inputs.calories);
      let pct = 0.30;
      if (inputs.ratio === 'low') pct = 0.20;
      if (inputs.ratio === 'keto') pct = 0.70;

      const fatCalories = Math.round(kcal * pct);
      const fatGrams = Math.round(fatCalories / 9);

      return { fatGrams, fatCalories };
    },
    resultExplanation: (inputs, results) => {
      return `For a daily intake of **${inputs.calories} kcal**, your healthy fat goal is **${results.fatGrams} grams** (${results.fatCalories} kcal). Dietary fat is crucial for vitamin absorption and vital hormone synthesis.`;
    }
  },
  {
    slug: 'fiber-intake-calculator',
    title: 'Fiber Intake Calculator',
    shortDescription: 'Determine your recommended daily fiber intake based on age-specific clinical health recommendations.',
    metaDescription: 'Calculate your optimal dietary fiber requirements to support gastrointestinal wellness and metabolic health.',
    category: 'nutrition',
    isDynamic: true,
    formula: {
      name: 'Institute of Medicine Standards',
      description: 'Daily dietary fiber is calculated based on age and gender thresholds. Men require more fiber due to larger average metabolic and gastrointestinal stature.\n\n• Men <= 50: 38g, > 50: 30g\n• Women <= 50: 25g, > 50: 21g.'
    },
    examples: [
      { scenario: '32-year-old Male', inputs: 'Age: 32, Gender: Male', result: 'Fiber Target = 38g/day' },
      { scenario: '55-year-old Female', inputs: 'Age: 55, Gender: Female', result: 'Fiber Target = 21g/day' }
    ],
    faqs: [
      { id: 'fib-q1', question: 'What is the difference between soluble and insoluble fiber?', answer: 'Soluble fiber absorbs water and helps lower blood glucose and cholesterol. Insoluble fiber adds bulk to stool, supporting colon health.' }
    ],
    relatedSlugs: ['carb-calculator', 'macro-calculator', 'sugar-intake-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'best-protein-sources'],
    inputs: [
      { name: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 2, max: 100 },
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
      { label: 'Daily Fiber Target', valueKey: 'fiberTarget', unit: 'g/day', color: 'text-emerald-500' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const isMale = inputs.gender === 'male';
      let fiberTarget = 25;

      if (isMale) {
        fiberTarget = age <= 50 ? 38 : 30;
      } else {
        fiberTarget = age <= 50 ? 25 : 21;
      }

      return { fiberTarget };
    },
    resultExplanation: (inputs, results) => {
      return `To optimize your digestive and cardiovascular health, target **${results.fiberTarget} grams** of dietary fiber per day. Incorporate legumes, whole grains, avocados, berries, and leafy vegetables.`;
    }
  },
  {
    slug: 'sugar-intake-calculator',
    title: 'Sugar Intake Calculator',
    shortDescription: 'Calculate your recommended added sugar limits to protect metabolic health and avoid systemic inflammation.',
    metaDescription: 'Free online Added Sugar Calculator. Learn your daily sugar limits according to the American Heart Association (AHA).',
    category: 'nutrition',
    isDynamic: true,
    formula: {
      name: 'American Heart Association & WHO Guidelines',
      description: 'The AHA recommends added sugars make up less than 10% (ideally 5%) of total daily energy intake. \n\nAdded Sugar (g) Limit = (Total Calories × 0.10) ÷ 4.'
    },
    examples: [
      { scenario: 'Standard Male Limit (AHA)', inputs: 'Gender: Male, Calories: 2000 kcal', result: 'Added Sugar limit = 36g' },
      { scenario: 'Standard Female Limit (AHA)', inputs: 'Gender: Female, Calories: 1800 kcal', result: 'Added Sugar limit = 25g' }
    ],
    faqs: [
      { id: 'sug-q1', question: 'Does this apply to fruit?', answer: 'No. This limit refers exclusively to refined or added sugars (sucrose, high-fructose corn syrup). Natural sugars in whole fruits are bound in a fiber matrix, which slows digestion.' }
    ],
    relatedSlugs: ['carb-calculator', 'calorie-calculator', 'fiber-intake-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'weight-loss-fundamentals'],
    inputs: [
      { name: 'calories', label: 'Daily Caloric Baseline', type: 'number', defaultValue: 2000, min: 1200, max: 5000, step: 100 },
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
      { label: 'AHA Strict Added Sugar Limit', valueKey: 'sugarGrams', unit: 'g/day', color: 'text-red-500' },
      { label: 'Max Added Sugar Calories', valueKey: 'sugarKcal', unit: 'kcal/day', color: 'text-amber-500' }
    ],
    calculate: (inputs) => {
      const kcal = Number(inputs.calories);
      const isMale = inputs.gender === 'male';

      // Strict AHA standard is 150 kcal for men, 100 kcal for women
      const strictKcal = isMale ? 150 : 100;
      const sugarKcal = Math.min(Math.round(kcal * 0.10), strictKcal);
      const sugarGrams = Math.round(sugarKcal / 4);

      return { sugarGrams, sugarKcal };
    },
    resultExplanation: (inputs, results) => {
      return `Your daily added sugar intake should not exceed **${results.sugarGrams} grams** (about **${results.sugarKcal} kcal**). Limiting added sugar is crucial to safeguard against insulin resistance and visceral fat deposition.`;
    }
  },
  {
    slug: 'meal-calories-calculator',
    title: 'Meal Calories Calculator',
    shortDescription: 'Estimate total calories in a meal by calculating the energy values of its core macronutrient building blocks.',
    metaDescription: 'Free online Macronutrient Meal Calculator. Input grams of protein, carbs, fats, and alcohol to get highly accurate meal energy.',
    category: 'nutrition',
    isDynamic: true,
    formula: {
      name: 'Atwater General Energy System',
      description: 'The energy density of macronutrients per gram is:\n• Protein: 4 kcal\n• Carbohydrates: 4 kcal\n• Dietary Fats: 9 kcal\n• Alcohol: 7 kcal\n\nMeal Calories = (Protein × 4) + (Carbohydrates × 4) + (Fats × 9) + (Alcohol × 7).'
    },
    examples: [
      { scenario: 'Standard Lunch', inputs: 'Protein: 30g, Carbs: 45g, Fat: 12g', result: 'Meal Calories = 408 kcal' },
      { scenario: 'Dinner with Glass of Wine', inputs: 'Protein: 40g, Carbs: 30g, Fat: 15g, Alcohol: 14g', result: 'Meal Calories = 513 kcal' }
    ],
    faqs: [
      { id: 'meal-q1', question: 'How do fiber grams affect meal calories?', answer: 'In some regions, soluble fiber is labeled as 2 kcal/g, while insoluble fiber is 0 kcal/g. Subtracting fiber from total carbohydrates yields "net carbs," which can lower estimated calories slightly.' }
    ],
    relatedSlugs: ['macro-calculator', 'protein-calculator', 'carb-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'protein-timing-guide'],
    inputs: [
      { name: 'protein', label: 'Protein (grams)', type: 'number', defaultValue: 30, min: 0, max: 200 },
      { name: 'carbs', label: 'Carbohydrates (grams)', type: 'number', defaultValue: 40, min: 0, max: 300 },
      { name: 'fat', label: 'Dietary Fat (grams)', type: 'number', defaultValue: 15, min: 0, max: 150 },
      { name: 'alcohol', label: 'Alcohol (grams)', type: 'number', defaultValue: 0, min: 0, max: 100 }
    ],
    outputs: [
      { label: 'Total Meal Energy', valueKey: 'totalCalories', unit: 'kcal', color: 'text-emerald-500' },
      { label: 'Protein Share', valueKey: 'proteinPct', unit: '% kcal', color: 'text-blue-500' },
      { label: 'Fat Share', valueKey: 'fatPct', unit: '% kcal', color: 'text-amber-500' }
    ],
    calculate: (inputs) => {
      const p = Number(inputs.protein);
      const c = Number(inputs.carbs);
      const f = Number(inputs.fat);
      const a = Number(inputs.alcohol);

      const pKcal = p * 4;
      const cKcal = c * 4;
      const fKcal = f * 9;
      const aKcal = a * 7;

      const totalCalories = pKcal + cKcal + fKcal + aKcal;
      const proteinPct = totalCalories > 0 ? Math.round((pKcal / totalCalories) * 100) : 0;
      const fatPct = totalCalories > 0 ? Math.round((fKcal / totalCalories) * 100) : 0;

      return { totalCalories, proteinPct, fatPct };
    },
    resultExplanation: (inputs, results) => {
      return `This meal contains approximately **${results.totalCalories} calories**. Of these, **${results.proteinPct}%** comes from muscle-repairing protein and **${results.fatPct}%** comes from dietary fats.`;
    }
  },

  // ========================================================
  // WEIGHT MANAGEMENT CALCULATORS
  // ========================================================
  {
    slug: 'tdee-calculator',
    title: 'TDEE Calculator',
    shortDescription: 'Calculate your Total Daily Energy Expenditure (TDEE) to understand exactly how many calories you burn each day.',
    metaDescription: 'Free scientific TDEE Calculator. Find your daily energy threshold based on metabolic benchmarks and active training parameters.',
    category: 'weight-management',
    isDynamic: true,
    formula: {
      name: 'Mifflin-St Jeor × Activity Multiplier',
      description: 'TDEE is computed by finding Basal Metabolic Rate (BMR) and multiplying by your physical activity level.\n\n• Sedentary (office job): 1.2\n• Light Active (1-2 workouts/wk): 1.375\n• Moderate Active (3-5 workouts/wk): 1.55\n• Heavy Active (6-7 intense workouts/wk): 1.725'
    },
    examples: [
      { scenario: 'Sedentary Male (180cm, 80kg)', inputs: 'Age: 30, Sedentary, Height: 180, Weight: 80', result: 'TDEE = 2,136 kcal/day' },
      { scenario: 'Active Female (165cm, 60kg)', inputs: 'Age: 25, Active, Height: 165, Weight: 60', result: 'TDEE = 2,339 kcal/day' }
    ],
    faqs: [
      { id: 'tdee-q1', question: 'How accurate is TDEE calculation?', answer: 'Mathematical TDEE estimations are highly reliable starting points (within 10% accuracy for most people). For absolute precision, track your daily calories and scale weight for 2-3 weeks to find your custom metabolic rate.' }
    ],
    relatedSlugs: ['bmr-calculator', 'calorie-calculator', 'maintenance-calories-calculator'],
    relatedGuideSlugs: ['what-is-tdee', 'how-many-calories-should-i-eat'],
    inputs: [
      { name: 'age', label: 'Age (years)', type: 'number', defaultValue: 30, min: 15, max: 90 },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { name: 'weight', label: 'Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 180 },
      { name: 'height', label: 'Height', type: 'number', defaultValue: 175, unitType: 'height', min: 120, max: 220 },
      {
        name: 'activity',
        label: 'Physical Activity Level',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Sedentary (No exercise / Desk job)', value: 'sedentary' },
          { label: 'Lightly Active (Light exercise 1-2x/wk)', value: 'light' },
          { label: 'Moderately Active (Moderate exercise 3-5x/wk)', value: 'moderate' },
          { label: 'Very Active (Intense training 6-7x/wk)', value: 'active' },
          { label: 'Athlete (Double daily training)', value: 'athlete' }
        ]
      }
    ],
    outputs: [
      { label: 'Your Daily TDEE', valueKey: 'tdee', unit: 'kcal/day', color: 'text-emerald-500' },
      { label: 'Resting BMR', valueKey: 'bmr', unit: 'kcal/day', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const weightKg = unit === 'metric' ? Number(inputs.weight) : Number(inputs.weight) * 0.453592;
      const heightCm = unit === 'metric' ? Number(inputs.height) : Number(inputs.height) * 2.54;
      const age = Number(inputs.age);

      // BMR (Mifflin-St Jeor)
      let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
      if (inputs.gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      let multiplier = 1.2;
      if (inputs.activity === 'light') multiplier = 1.375;
      if (inputs.activity === 'moderate') multiplier = 1.55;
      if (inputs.activity === 'active') multiplier = 1.725;
      if (inputs.activity === 'athlete') multiplier = 1.9;

      const tdee = Math.round(bmr * multiplier);

      return { tdee, bmr: Math.round(bmr) };
    },
    resultExplanation: (inputs, results) => {
      return `Based on your profile, your maintenance threshold (TDEE) is **${results.tdee} calories** per day. This means your body burns ${results.tdee} calories daily through all life functions and active motion. To maintain your weight, consume exactly this target.`;
    }
  },
  {
    slug: 'calorie-deficit-calculator',
    title: 'Calorie Deficit Calculator',
    shortDescription: 'Calculate the custom daily caloric target required to hit your target weight loss within a safe time frame.',
    metaDescription: 'Free online Calorie Deficit Calculator. Enter your target weight goals and timelines to compute your perfect daily deficit.',
    category: 'weight-management',
    isDynamic: true,
    formula: {
      name: 'Energy Balance Equations',
      description: 'Losing 1 kilogram of body fat requires burning a cumulative deficit of approximately 7,700 kcal (or 3,500 kcal per pound of fat).\n\nDaily Calorie Deficit = (Weight to Lose × Fat Energy Value) ÷ Target Days.'
    },
    examples: [
      { scenario: 'Losing 5 kg in 10 Weeks (TDEE 2200)', inputs: 'TDEE: 2200, Goal: Lose 5kg, Weeks: 10', result: 'Calorie Target = 1,650 kcal/day' },
      { scenario: 'Losing 10 lbs in 8 Weeks (TDEE 2500)', inputs: 'TDEE: 2500, Goal: Lose 10lbs, Weeks: 8', result: 'Calorie Target = 1,875 kcal/day' }
    ],
    faqs: [
      { id: 'def-q2', question: 'How much of a calorie deficit is safe?', answer: 'A daily deficit of 300 to 500 calories is generally safe, sustainable, and preserves active muscle mass.' }
    ],
    relatedSlugs: ['calorie-calculator', 'tdee-calculator', 'weight-loss-calculator'],
    relatedGuideSlugs: ['calorie-deficit-explained', 'how-many-calories-should-i-eat'],
    inputs: [
      { name: 'currentWeight', label: 'Current Weight', type: 'number', defaultValue: 85, unitType: 'weight', min: 40, max: 200 },
      { name: 'goalWeight', label: 'Goal Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 35, max: 190 },
      { name: 'timeline', label: 'Timeline (weeks)', type: 'slider', defaultValue: 8, min: 4, max: 24, step: 1 },
      { name: 'tdee', label: 'Your Estimated TDEE', type: 'number', defaultValue: 2300, min: 1200, max: 5000, step: 50 }
    ],
    outputs: [
      { label: 'Recommended Calorie Intake', valueKey: 'targetCalories', unit: 'kcal/day', color: 'text-emerald-500' },
      { label: 'Daily Deficit Required', valueKey: 'dailyDeficit', unit: 'kcal/day', color: 'text-blue-500' },
      { label: 'Est. Weekly Weight Loss', valueKey: 'weeklyLoss', unit: 'kg/week', color: 'text-indigo-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const cW = Number(inputs.currentWeight);
      const gW = Number(inputs.goalWeight);
      const weeks = Number(inputs.timeline);
      const tdee = Number(inputs.tdee);

      const toLose = Math.max(cW - gW, 0);
      const totalKcalDeficit = toLose * (isMetric ? 7700 : 3500);
      const totalDays = weeks * 7;
      const dailyDeficit = Math.round(totalKcalDeficit / totalDays);

      const targetCalories = Math.max(tdee - dailyDeficit, 1200);
      const weeklyLoss = (toLose / weeks).toFixed(2);

      return {
        targetCalories,
        dailyDeficit: Math.max(tdee - targetCalories, 0),
        weeklyLoss: `${weeklyLoss} ${isMetric ? 'kg' : 'lbs'}`
      };
    },
    resultExplanation: (inputs, results, unit) => {
      return `To achieve your goal of dropping **${Math.max(inputs.currentWeight - inputs.goalWeight, 0)} ${unit === 'metric' ? 'kg' : 'lbs'}** in **${inputs.timeline} weeks**, consume **${results.targetCalories} kcal** daily. This requires a daily deficit of **${results.dailyDeficit} calories** from your baseline TDEE.`;
    }
  },
  {
    slug: 'maintenance-calories-calculator',
    title: 'Maintenance Calories Calculator',
    shortDescription: 'Find the precise daily calories you need to consume to maintain your current body weight and support biological homeostasis.',
    metaDescription: 'Calculate the daily energy target to support active weight stability and prevent muscle catabolism.',
    category: 'weight-management',
    isDynamic: true,
    formula: {
      name: 'Clinical Energy Homeostasis',
      description: 'Your maintenance calorie limit is identical to your TDEE (Total Daily Energy Expenditure), calculated using the Mifflin-St Jeor formula multiplied by physical movement factors.'
    },
    examples: [
      { scenario: 'Standard Maintenance Target', inputs: 'TDEE: 2400 kcal', result: 'Daily Target = 2,400 kcal' }
    ],
    faqs: [
      { id: 'maint-q1', question: 'How does muscle mass impact maintenance?', answer: 'Muscle is metabolically active. Having higher muscle mass increases your resting BMR, which raises your overall maintenance calorie target.' }
    ],
    relatedSlugs: ['tdee-calculator', 'calorie-calculator', 'macro-calculator'],
    relatedGuideSlugs: ['what-is-tdee', 'how-many-calories-should-i-eat'],
    inputs: [
      { name: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 15, max: 90 },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { name: 'weight', label: 'Weight', type: 'number', defaultValue: 75, unitType: 'weight', min: 40, max: 180 },
      { name: 'height', label: 'Height', type: 'number', defaultValue: 170, unitType: 'height', min: 120, max: 220 },
      {
        name: 'activity',
        label: 'Activity level',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { label: 'Sedentary (No exercise)', value: 'sedentary' },
          { label: 'Lightly Active (1-2x/wk)', value: 'light' },
          { label: 'Moderately Active (3-5x/wk)', value: 'moderate' },
          { label: 'Very Active (6-7x/wk)', value: 'active' }
        ]
      }
    ],
    outputs: [
      { label: 'Weight Maintenance Intake', valueKey: 'maintCalories', unit: 'kcal/day', color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const weightKg = unit === 'metric' ? Number(inputs.weight) : Number(inputs.weight) * 0.453592;
      const heightCm = unit === 'metric' ? Number(inputs.height) : Number(inputs.height) * 2.54;
      const age = Number(inputs.age);

      let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
      if (inputs.gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      let multiplier = 1.2;
      if (inputs.activity === 'light') multiplier = 1.375;
      if (inputs.activity === 'moderate') multiplier = 1.55;
      if (inputs.activity === 'active') multiplier = 1.725;

      const maintCalories = Math.round(bmr * multiplier);

      return { maintCalories };
    },
    resultExplanation: (inputs, results) => {
      return `To maintain your current weight of **${inputs.weight}** and support your metabolism, consume **${results.maintCalories} kcal** daily.`;
    }
  },
  {
    slug: 'weight-loss-calculator',
    title: 'Weight Loss Calculator',
    shortDescription: 'Estimate the timeline to reach your target weight based on custom rates of weekly fat reduction.',
    metaDescription: 'Free online Weight Loss Timeline Calculator. Estimate the exact completion date to hit your target weight safely.',
    category: 'weight-management',
    isDynamic: true,
    formula: {
      name: 'Caloric Deficit Accumulation',
      description: 'Losing fat is a function of consistent energy restriction over time. \n\nTotal Weeks = (Current Weight - Goal Weight) ÷ Weekly Loss Rate.'
    },
    examples: [
      { scenario: 'Losing 8 kg at 0.5 kg/week', inputs: 'Weight: 85 to 77 kg, Rate: 0.5 kg', result: 'Duration = 16 weeks' }
    ],
    faqs: [
      { id: 'loss-q2', question: 'What is a safe rate of weight loss?', answer: 'Losing 0.5% to 1.0% of your total body weight per week is a safe and clinically recommended target to preserve lean muscle tissue.' }
    ],
    relatedSlugs: ['calorie-deficit-calculator', 'goal-weight-timeline-calculator', 'tdee-calculator'],
    relatedGuideSlugs: ['weight-loss-fundamentals', 'how-to-reduce-body-fat'],
    inputs: [
      { name: 'currentWeight', label: 'Current Weight', type: 'number', defaultValue: 90, unitType: 'weight', min: 40, max: 200 },
      { name: 'goalWeight', label: 'Goal Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 35, max: 190 },
      {
        name: 'weeklyRate',
        label: 'Target Weekly Loss',
        type: 'select',
        defaultValue: '0.5',
        options: [
          { label: 'Slow & Steady (0.25 kg / 0.5 lbs per week)', value: '0.25' },
          { label: 'Moderate (0.5 kg / 1.0 lb per week)', value: '0.5' },
          { label: 'Aggressive (0.75 kg / 1.5 lbs per week)', value: '0.75' },
          { label: 'Very Aggressive (1.0 kg / 2.0 lbs per week)', value: '1.0' }
        ]
      }
    ],
    outputs: [
      { label: 'Weeks Required', valueKey: 'weeksRequired', unit: 'weeks', color: 'text-emerald-500' },
      { label: 'Total Weight to Lose', valueKey: 'totalToLose', unit: 'kg', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const isMetric = unit === 'metric';
      const cW = Number(inputs.currentWeight);
      const gW = Number(inputs.goalWeight);
      const rate = Number(inputs.weeklyRate);

      const totalToLose = Math.max(cW - gW, 0);
      const conversionFactor = isMetric ? 1 : 2; // Adjust imperial rate labeling scale
      const weeksRequired = Math.ceil(totalToLose / (rate * (isMetric ? 1 : 2)));

      return {
        weeksRequired,
        totalToLose: `${totalToLose.toFixed(1)} ${isMetric ? 'kg' : 'lbs'}`
      };
    },
    resultExplanation: (inputs, results) => {
      return `To drop **${results.totalToLose}**, you will need approximately **${results.weeksRequired} weeks** of consistent adherence at your selected rate of loss.`;
    }
  },
  {
    slug: 'goal-weight-timeline-calculator',
    title: 'Goal Weight Timeline Calculator',
    shortDescription: 'Compute the precise number of days and weeks required to reach your ideal target body mass safely.',
    metaDescription: 'Calculate your exact goal weight timeline using mathematical energy balancing and target fat loss trends.',
    category: 'weight-management',
    isDynamic: true,
    formula: {
      name: 'Goal Weight Timeline Formula',
      description: 'Timeline is calculated by dividing the total weight target by the daily and weekly rate of metabolic fat oxidation.'
    },
    examples: [
      { scenario: 'Standard Weight Timeline', inputs: 'Losing 10 lbs at 1 lb/week', result: 'Timeline = 10 weeks (70 days)' }
    ],
    faqs: [
      { id: 'time-q2', question: 'How can I stay on track during this timeline?', answer: 'Focus on dietary consistency, sleep hygiene, and tracking weekly averages rather than daily fluctuations, which are often skewed by water weight.' }
    ],
    relatedSlugs: ['weight-loss-calculator', 'calorie-deficit-calculator', 'bmi-calculator'],
    relatedGuideSlugs: ['weight-loss-fundamentals', 'how-to-reduce-body-fat'],
    inputs: [
      { name: 'currentWeight', label: 'Current Weight', type: 'number', defaultValue: 85, unitType: 'weight', min: 40, max: 200 },
      { name: 'goalWeight', label: 'Goal Weight', type: 'number', defaultValue: 78, unitType: 'weight', min: 35, max: 190 },
      { name: 'rate', label: 'Weekly Target Loss Rate', type: 'slider', defaultValue: 0.5, min: 0.2, max: 1.5, step: 0.1 }
    ],
    outputs: [
      { label: 'Weeks Required', valueKey: 'weeks', unit: 'weeks', color: 'text-emerald-500' },
      { label: 'Total Days Required', valueKey: 'days', unit: 'days', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const cW = Number(inputs.currentWeight);
      const gW = Number(inputs.goalWeight);
      const rate = Number(inputs.rate);

      const toLose = Math.max(cW - gW, 0);
      const weeks = Math.ceil(toLose / rate);
      const days = weeks * 7;

      return { weeks, days };
    },
    resultExplanation: (inputs, results, unit) => {
      return `Dropping **${Math.max(inputs.currentWeight - inputs.goalWeight, 0)} ${unit === 'metric' ? 'kg' : 'lbs'}** will take **${results.weeks} weeks** (approximately **${results.days} days**).`;
    }
  },

  // ========================================================
  // FITNESS PERFORMANCE CALCULATORS
  // ========================================================
  {
    slug: 'running-pace-calculator',
    title: 'Running Pace Calculator',
    shortDescription: 'Calculate your required target running pace per mile or kilometer to conquer your target race times.',
    metaDescription: 'Free online Running Pace Calculator. Enter your distance and time goals to instantly calculate your split paces.',
    category: 'fitness-performance',
    isDynamic: true,
    formula: {
      name: 'Standard Velocity Equations',
      description: 'Pace is calculated as time divided by distance.\n\nSplit Pace = Total Time (minutes) ÷ Race Distance.'
    },
    examples: [
      { scenario: '5K in 25 Minutes', inputs: 'Distance: 5k, Time: 0 hrs 25 mins 0 secs', result: 'Pace = 5:00 min/km' },
      { scenario: 'Marathon in 4 Hours', inputs: 'Distance: Marathon, Time: 4 hrs 0 mins 0 secs', result: 'Pace = 5:41 min/km (9:09 min/mile)' }
    ],
    faqs: [
      { id: 'pace-q1', question: 'What is a good 5K pace for beginners?', answer: 'For beginners, a 5K running pace between 6:00 and 7:30 minutes per kilometer (9:30 to 12:00 per mile) is a fantastic baseline.' }
    ],
    relatedSlugs: ['calories-burned-calculator', 'heart-rate-zone-calculator', 'vo2-max-calculator'],
    relatedGuideSlugs: ['what-is-tdee', 'how-many-calories-should-i-eat'],
    inputs: [
      {
        name: 'distancePreset',
        label: 'Target Distance',
        type: 'select',
        defaultValue: '5',
        options: [
          { label: '5 Kilometers (5K)', value: '5' },
          { label: '10 Kilometers (10K)', value: '10' },
          { label: 'Half Marathon (21.1 km)', value: '21.097' },
          { label: 'Full Marathon (42.2 km)', value: '42.195' }
        ]
      },
      { name: 'hours', label: 'Time: Hours', type: 'number', defaultValue: 0, min: 0, max: 24 },
      { name: 'minutes', label: 'Time: Minutes', type: 'number', defaultValue: 25, min: 0, max: 59 },
      { name: 'seconds', label: 'Time: Seconds', type: 'number', defaultValue: 0, min: 0, max: 59 }
    ],
    outputs: [
      { label: 'Target Pace Required', valueKey: 'paceStr', isCustomText: true, color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const dist = Number(inputs.distancePreset);
      const h = Number(inputs.hours);
      const m = Number(inputs.minutes);
      const s = Number(inputs.seconds);

      const totalSecs = (h * 3600) + (m * 60) + s;
      if (totalSecs === 0) return { paceStr: '0:00 split' };

      const paceSecs = totalSecs / dist;
      const pMins = Math.floor(paceSecs / 60);
      const pSecs = Math.round(paceSecs % 60);

      const formattedSecs = pSecs < 10 ? `0${pSecs}` : `${pSecs}`;
      const unitLabel = unit === 'metric' ? 'min/km' : 'min/mile';

      return {
        paceStr: `${pMins}:${formattedSecs} ${unitLabel}`
      };
    },
    resultExplanation: (inputs, results) => {
      return `To achieve your target race time, you must maintain a consistent running pace of **${results.paceStr}**.`;
    }
  },
  {
    slug: 'vo2-max-calculator',
    title: 'VO2 Max Calculator',
    shortDescription: 'Estimate your cardiovascular aerobic capacity using the scientifically-validated Cooper 12-Minute Run Fitness Test.',
    metaDescription: 'Free online VO2 Max Cooper Test Calculator. Estimate your maximum oxygen uptake using running distance markers.',
    category: 'fitness-performance',
    isDynamic: true,
    formula: {
      name: 'Cooper Aerobic Regression Formula',
      description: 'The Cooper test formula estimates cardiorespiratory fitness based on distance run over 12 minutes.\n\nVO2 Max (ml/kg/min) = (Distance in meters - 504.9) ÷ 44.73.'
    },
    examples: [
      { scenario: 'Running 2600 meters in 12 mins', inputs: 'Distance: 2600m', result: 'VO2 Max = 46.8 ml/kg/min' }
    ],
    faqs: [
      { id: 'vo2-q1', question: 'What does VO2 Max represent?', answer: 'VO2 Max represents the maximum volume of oxygen (in milliliters) your body can transport and utilize per kilogram of body weight per minute during peak physical exertion. It is the gold standard of aerobic fitness.' }
    ],
    relatedSlugs: ['running-pace-calculator', 'heart-rate-zone-calculator', 'calories-burned-calculator'],
    relatedGuideSlugs: ['what-is-bmr', 'what-is-tdee'],
    inputs: [
      { name: 'distance', label: '12-Min Distance (meters)', type: 'number', defaultValue: 2400, min: 1000, max: 5000, step: 50 }
    ],
    outputs: [
      { label: 'Estimated VO2 Max', valueKey: 'vo2Max', unit: 'ml/kg/min', color: 'text-emerald-500' },
      { label: 'Aerobic Rating', valueKey: 'rating', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const d = Number(inputs.distance);
      const vo2Max = Number(((d - 504.9) / 44.73).toFixed(1));

      let rating = 'Average';
      if (vo2Max > 52) rating = 'Excellent (Athletic Elite)';
      else if (vo2Max > 45) rating = 'Good (Highly Fit)';
      else if (vo2Max < 35) rating = 'Poor (Sedentary Baseline)';

      return { vo2Max, rating };
    },
    resultExplanation: (inputs, results) => {
      return `Your estimated VO2 Max is **${results.vo2Max} ml/kg/min**, placing you in the **${results.rating}** fitness tier. Enhance your score through consistent high-intensity interval training (HIIT) and zone 2 aerobic base cardio.`;
    }
  },
  {
    slug: 'heart-rate-zone-calculator',
    title: 'Heart Rate Zone Calculator',
    shortDescription: 'Calculate your custom cardiac training zones (Zones 1-5) using the highly precise Tanaka and Karvonen formulas.',
    metaDescription: 'Free online aerobic Heart Rate Zone Calculator. Find your fat-burn, threshold, and recovery HR parameters.',
    category: 'fitness-performance',
    isDynamic: true,
    formula: {
      name: 'Tanaka & Karvonen Formulations',
      description: 'Cardiac training zones are calculated using HR Reserve (HRR):\n• Max HR = 206.9 - (0.67 × Age)\n• HR Reserve = Max HR - Resting HR\n• Zone HR = (HRR × Zone %) + Resting HR.'
    },
    examples: [
      { scenario: '30-year-old (Resting HR 60)', inputs: 'Age: 30, Resting HR: 60 bpm', result: 'Zone 2 = 136 - 150 bpm' }
    ],
    faqs: [
      { id: 'hr-q1', question: 'What is the "Fat Burning" zone?', answer: 'Zone 2 (60% to 70% of max HR) utilizes fats as the primary fuel source. However, higher zones burn more total calories overall.' }
    ],
    relatedSlugs: ['vo2-max-calculator', 'running-pace-calculator', 'calories-burned-calculator'],
    relatedGuideSlugs: ['what-is-bmr', 'what-is-tdee'],
    inputs: [
      { name: 'age', label: 'Age (years)', type: 'number', defaultValue: 30, min: 10, max: 99 },
      { name: 'restingHr', label: 'Resting Heart Rate (bpm)', type: 'number', defaultValue: 65, min: 35, max: 120 }
    ],
    outputs: [
      { label: 'Zone 2 Aerobic (Endurance)', valueKey: 'z2Range', isCustomText: true, color: 'text-emerald-500' },
      { label: 'Zone 4 Threshold (Speed)', valueKey: 'z4Range', isCustomText: true, color: 'text-orange-500' },
      { label: 'Calculated Max HR', valueKey: 'maxHr', unit: 'bpm', color: 'text-red-500' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const resting = Number(inputs.restingHr);

      const maxHr = Math.round(206.9 - (0.67 * age));
      const hrr = maxHr - resting;

      const getHr = (pct: number) => Math.round((hrr * pct) + resting);

      return {
        maxHr,
        z2Range: `${getHr(0.60)} - ${getHr(0.70)} bpm`,
        z4Range: `${getHr(0.80)} - ${getHr(0.90)} bpm`
      };
    },
    resultExplanation: (inputs, results) => {
      return `To build aerobic endurance, target a heart rate of **${results.z2Range}** (Zone 2). Your maximum estimated heart rate is **${results.maxHr} bpm**.`;
    }
  },
  {
    slug: 'one-rep-max-calculator',
    title: 'One Rep Max Calculator',
    shortDescription: 'Estimate your absolute muscular strength baseline (1RM) using lift weight and standard repetition outputs.',
    metaDescription: 'Free online 1RM strength calculator. Instantly predict your one rep max for bench, squat, and deadlift lifts.',
    category: 'fitness-performance',
    isDynamic: true,
    formula: {
      name: 'Epley & Brzycki Formulas',
      description: 'Muscular strength estimations are calculated based on lift weight and repetitions completed.\n\nEstimated 1RM = Weight × (1 + [Reps ÷ 30]).'
    },
    examples: [
      { scenario: 'Bench Press (80kg for 5 reps)', inputs: 'Weight: 80 kg, Reps: 5', result: 'Est. 1RM = 93 kg' }
    ],
    faqs: [
      { id: '1rm-q1', question: 'How safe are 1RM calculators?', answer: 'Using mathematical estimations is far safer than physically testing an absolute maximum lift, particularly for beginners.' }
    ],
    relatedSlugs: ['protein-calculator', 'muscle-gain-calculator', 'calories-burned-calculator'],
    relatedGuideSlugs: ['protein-for-muscle-gain', 'best-protein-sources'],
    inputs: [
      { name: 'weight', label: 'Weight Lifted', type: 'number', defaultValue: 100, unitType: 'weight', min: 10, max: 500 },
      { name: 'reps', label: 'Reps Completed', type: 'slider', defaultValue: 5, min: 1, max: 12, step: 1 }
    ],
    outputs: [
      { label: 'Estimated One Rep Max', valueKey: 'oneRepMax', unit: 'lbs/kg', color: 'text-emerald-500' },
      { label: '80% Power Target', valueKey: 'eightyPct', unit: 'lbs/kg', color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight);
      const r = Number(inputs.reps);

      const oneRepMax = Math.round(w * (1 + r / 30));
      const eightyPct = Math.round(oneRepMax * 0.80);

      return { oneRepMax, eightyPct };
    },
    resultExplanation: (inputs, results, unit) => {
      const u = unit === 'metric' ? 'kg' : 'lbs';
      return `Your estimated 1RM is **${results.oneRepMax} ${u}**. To build strength, we recommend working with a target of **${results.eightyPct} ${u}** for 5 reps.`;
    }
  },
  {
    slug: 'calories-burned-calculator',
    title: 'Calories Burned Calculator',
    shortDescription: 'Calculate estimated calories burned during sports, running, walking, and other physical training exercises.',
    metaDescription: 'Calculate calories burned. Enter your weight, activity duration, and select your workout sport to estimate energy expenditures.',
    category: 'fitness-performance',
    isDynamic: true,
    formula: {
      name: 'Metabolic Equivalent (MET) Formula',
      description: 'MET represents metabolic intensity. A MET of 1 is calorie expenditure at quiet rest.\n\nCalories Burned = Duration (minutes) × ([MET × 3.5 × Weight in kg] ÷ 200).'
    },
    examples: [
      { scenario: 'Running (MET 9.8) for 45 mins', inputs: 'Weight: 80 kg, Activity: Running, Duration: 45', result: 'Calories Burned = 617 kcal' }
    ],
    faqs: [
      { id: 'burn-q1', question: 'Does muscle burn more calories than fat?', answer: 'Yes. Muscle mass is highly active tissue, elevating your baseline BMR and overall calorie expenditure during movement.' }
    ],
    relatedSlugs: ['walking-calories-calculator', 'tdee-calculator', 'running-pace-calculator'],
    relatedGuideSlugs: ['what-is-tdee', 'how-many-calories-should-i-eat'],
    inputs: [
      { name: 'weight', label: 'Weight', type: 'number', defaultValue: 75, unitType: 'weight', min: 30, max: 200 },
      { name: 'duration', label: 'Workout Duration (mins)', type: 'number', defaultValue: 45, min: 5, max: 300 },
      {
        name: 'activity',
        label: 'Select Activity Type',
        type: 'select',
        defaultValue: 'running',
        options: [
          { label: 'Running (Pace 6:00/km)', value: 'running' },
          { label: 'Cycling (Moderate speed)', value: 'cycling' },
          { label: 'Swimming (Vigorous laps)', value: 'swimming' },
          { label: 'Resistance Weight Lifting', value: 'lifting' },
          { label: 'Brisk Walking (5.5 km/h)', value: 'walking' }
        ]
      }
    ],
    outputs: [
      { label: 'Est. Calories Burned', valueKey: 'caloriesBurned', unit: 'kcal', color: 'text-emerald-500' }
    ],
    calculate: (inputs, unit) => {
      const wKg = unit === 'metric' ? Number(inputs.weight) : Number(inputs.weight) * 0.453592;
      const mins = Number(inputs.duration);
      const act = inputs.activity;

      let met = 3.5; // default walking
      if (act === 'running') met = 9.8;
      if (act === 'cycling') met = 7.5;
      if (act === 'swimming') met = 8.0;
      if (act === 'lifting') met = 5.0;

      const caloriesBurned = Math.round(mins * ((met * 3.5 * wKg) / 200));

      return { caloriesBurned };
    },
    resultExplanation: (inputs, results) => {
      return `You burned approximately **${results.caloriesBurned} calories** during this **${inputs.duration}-minute** session of ${inputs.activity}.`;
    }
  },

  // ========================================================
  // BODY COMPOSITION CALCULATORS
  // ========================================================
  {
    slug: 'ffmi-calculator',
    title: 'FFMI Calculator (Fat-Free Mass Index)',
    shortDescription: 'Evaluate your lean muscular index and natural genetic ceiling potential using Fat-Free Mass parameters.',
    metaDescription: 'Free scientific FFMI Calculator. Learn your fat-free mass index and compare your results to standard genetic muscular boundaries.',
    category: 'body-composition',
    isDynamic: true,
    formula: {
      name: 'Fat-Free Mass Index (FFMI) Formula',
      description: 'FFMI calculates lean tissue mass in relation to overall height, adjusting for tall frames.\n\n• Fat-Free Mass = Weight × (1 - Body Fat%)\n• FFMI = Fat-Free Mass (kg) ÷ Height (m)²\n• Adjusted FFMI = FFMI + 6.1 × (1.8 - Height in meters).'
    },
    examples: [
      { scenario: 'Lean Lifter (Adjusted FFMI 21.5)', inputs: 'Height: 180cm, Weight: 80kg, Fat: 12%', result: 'FFMI = 21.7 (Above Average)' }
    ],
    faqs: [
      { id: 'ffmi-q1', question: 'What is a typical natural FFMI limit?', answer: 'For natural male athletes, an FFMI of 25 is widely recognized as the upper physiological boundary of muscle growth without exogenous enhancements.' }
    ],
    relatedSlugs: ['lean-body-mass-calculator', 'body-fat-calculator', 'muscle-gain-calculator'],
    relatedGuideSlugs: ['lean-body-mass-explained', 'protein-for-muscle-gain'],
    inputs: [
      { name: 'weight', label: 'Weight', type: 'number', defaultValue: 80, unitType: 'weight', min: 40, max: 200 },
      { name: 'height', label: 'Height', type: 'number', defaultValue: 180, unitType: 'height', min: 120, max: 220 },
      { name: 'bodyFat', label: 'Body Fat Percentage (%)', type: 'slider', defaultValue: 15, min: 4, max: 45, step: 0.5 }
    ],
    outputs: [
      { label: 'Your Raw FFMI', valueKey: 'ffmi', color: 'text-emerald-500' },
      { label: 'Height-Adjusted FFMI', valueKey: 'adjustedFfmi', color: 'text-blue-500' },
      { label: 'Muscular Classification', valueKey: 'classification', isCustomText: true, color: 'text-indigo-500' }
    ],
    calculate: (inputs, unit) => {
      const weightRaw = Number(inputs.weight);
      const heightRaw = Number(inputs.height);
      const fatPct = Number(inputs.bodyFat);

      if (!weightRaw || !heightRaw || isNaN(weightRaw) || isNaN(heightRaw)) {
        return {
          ffmi: '0.0',
          adjustedFfmi: '0.0',
          classification: 'Pending Inputs'
        };
      }

      const weightKg = unit === 'metric' ? weightRaw : weightRaw * 0.45359237;
      const heightM = unit === 'metric' ? heightRaw / 100 : (heightRaw * 2.54) / 100;

      if (heightM <= 0) {
        return {
          ffmi: '0.0',
          adjustedFfmi: '0.0',
          classification: 'Pending Inputs'
        };
      }

      const lbm = weightKg * (1 - fatPct / 100);
      const ffmi = lbm / (heightM * heightM);
      const adjustedFfmi = ffmi + 6.1 * (1.8 - heightM);

      let classification = 'Average';
      if (adjustedFfmi > 25) classification = 'Superior (Typically Assisted)';
      else if (adjustedFfmi >= 23) classification = 'Exceptional / Elite (Natural Limit)';
      else if (adjustedFfmi >= 21) classification = 'Well-Developed Athletic Build';
      else if (adjustedFfmi >= 18) classification = 'Average / Healthy';
      else if (adjustedFfmi < 16) classification = 'Low Muscle Mass';
      else classification = 'Slightly Muscled / Underdeveloped';

      return {
        ffmi: isNaN(ffmi) || !isFinite(ffmi) ? '0.0' : ffmi.toFixed(1),
        adjustedFfmi: isNaN(adjustedFfmi) || !isFinite(adjustedFfmi) ? '0.0' : adjustedFfmi.toFixed(1),
        classification
      };
    },
    resultExplanation: (inputs, results) => {
      return `Your adjusted FFMI is **${results.adjustedFfmi}**, indicating a **${results.classification}** tier of muscular development.`;
    }
  },
  {
    slug: 'waist-to-height-ratio-calculator',
    title: 'Waist-to-Height Ratio Calculator',
    shortDescription: 'Calculate your Waist-to-Height Ratio (WHtR) to analyze central adiposity and cardiovascular health markers.',
    metaDescription: 'Free online Waist-to-Height Ratio (WHtR) Calculator. Identify health risks associated with abdominal fat accumulation.',
    category: 'body-composition',
    isDynamic: true,
    formula: {
      name: 'WHtR Standard Health Ratio',
      description: 'Waist-to-Height Ratio is calculated by dividing waist circumference by total height. Maintaining a ratio below 0.50 is clinically proven to protect cardiovascular systems.\n\nRatio = Waist Circumference ÷ Height.'
    },
    examples: [
      { scenario: 'Healthy Profile', inputs: 'Height: 180cm, Waist: 82cm', result: 'Ratio = 0.46 (Healthy)' }
    ],
    faqs: [
      { id: 'whtr-q1', question: 'Why is waist-to-height ratio superior to BMI?', answer: 'WHtR directly targets central abdominal fat, which is the most metabolically hazardous storage region, whereas BMI can mistake overall bone/muscle mass for obesity.' }
    ],
    relatedSlugs: ['waist-to-hip-ratio-calculator', 'bmi-calculator', 'body-fat-calculator'],
    relatedGuideSlugs: ['body-fat-vs-bmi', 'healthy-body-fat-ranges'],
    inputs: [
      { name: 'height', label: 'Height', type: 'number', defaultValue: 175, unitType: 'height', min: 100, max: 220 },
      { name: 'waist', label: 'Waist Circumference', type: 'number', defaultValue: 80, unitType: 'height', min: 40, max: 180 }
    ],
    outputs: [
      { label: 'Your WHtR Ratio', valueKey: 'ratio', color: 'text-emerald-500' },
      { label: 'Health Risk Level', valueKey: 'risk', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const h = Number(inputs.height);
      const w = Number(inputs.waist);
      const ratio = Number((w / h).toFixed(2));

      let risk = 'Normal (Healthy)';
      if (ratio > 0.55) risk = 'High Risk (Increased Metabolic Hazard)';
      else if (ratio > 0.50) risk = 'Moderate Risk (Slightly Overweight)';

      return { ratio, risk };
    },
    resultExplanation: (inputs, results) => {
      return `Your Waist-to-Height ratio is **${results.ratio}**, categorized as **${results.risk}**. Keeping this index below 0.50 supports overall arterial longevity.`;
    }
  },
  {
    slug: 'waist-to-hip-ratio-calculator',
    title: 'Waist-to-Hip Ratio Calculator',
    shortDescription: 'Evaluate body fat distributions and clinical metabolic risk scores based on waist-to-hip ratios.',
    metaDescription: 'Free online Waist-to-Hip Ratio (WHR) Calculator. Determine gynoid vs. android fat distribution patterns.',
    category: 'body-composition',
    isDynamic: true,
    formula: {
      name: 'WHR Metabolic Assessment',
      description: 'Calculated by dividing waist circumference by hip circumference.\n\nRatio = Waist Circumference ÷ Hip Circumference.'
    },
    examples: [
      { scenario: 'Low Risk Male', inputs: 'Waist: 85cm, Hips: 98cm', result: 'Ratio = 0.87 (Low Risk)' }
    ],
    faqs: [
      { id: 'whr-q1', question: 'What is the android fat distribution?', answer: 'Android (apple-shaped) distribution accumulates visceral fat around the abdomen, carrying significantly higher cardiovascular risk than gynoid (pear-shaped) fat on hips and thighs.' }
    ],
    relatedSlugs: ['waist-to-height-ratio-calculator', 'bmi-calculator', 'body-fat-calculator'],
    relatedGuideSlugs: ['bmi-for-men', 'bmi-for-women'],
    inputs: [
      { name: 'waist', label: 'Waist Circumference', type: 'number', defaultValue: 82, unitType: 'height', min: 40, max: 180 },
      { name: 'hips', label: 'Hip Circumference', type: 'number', defaultValue: 95, unitType: 'height', min: 40, max: 180 },
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
      { label: 'Your WHR Ratio', valueKey: 'ratio', color: 'text-emerald-500' },
      { label: 'Risk Profile', valueKey: 'risk', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.waist);
      const h = Number(inputs.hips);
      const isMale = inputs.gender === 'male';

      const ratio = Number((w / h).toFixed(2));
      let risk = 'Low Risk';

      if (isMale) {
        if (ratio > 0.95) risk = 'High Risk (Android/Apple profile)';
        else if (ratio >= 0.90) risk = 'Moderate Risk';
      } else {
        if (ratio > 0.85) risk = 'High Risk (Android/Apple profile)';
        else if (ratio >= 0.80) risk = 'Moderate Risk';
      }

      return { ratio, risk };
    },
    resultExplanation: (inputs, results) => {
      return `Your Waist-to-Hip ratio is **${results.ratio}**, which indicates a **${results.risk}** distribution profile.`;
    }
  },
  {
    slug: 'muscle-gain-calculator',
    title: 'Muscle Gain Rate Calculator',
    shortDescription: 'Calculate healthy monthly target muscle gain goals according to your biological gender and lifting experience.',
    metaDescription: 'Optimize your hypertrophic bulking cycles. Calculate realistic muscle gain limits per month.',
    category: 'body-composition',
    isDynamic: true,
    formula: {
      name: 'Physiological Hypertrophy Ratios',
      description: 'Hypertrophic muscle synthesis rates decline heavily over time. \n• Beginner: 1.0% to 1.5% body weight/month\n• Intermediate: 0.5% to 1.0% body weight/month\n• Advanced: 0.25% to 0.5% body weight/month.'
    },
    examples: [
      { scenario: 'Beginner Male (80kg)', inputs: 'Weight: 80 kg, Experience: Beginner', result: 'Monthly Target = 1.0 kg/month' }
    ],
    faqs: [
      { id: 'mus-q1', question: 'Why does muscle gain slow down?', answer: 'As you approach your genetic muscular ceiling, muscle protein synthesis yields diminishing returns. Progressive overload becomes essential for any continued cellular adaptations.' }
    ],
    relatedSlugs: ['ffmi-calculator', 'macro-calculator', 'one-rep-max-calculator'],
    relatedGuideSlugs: ['protein-for-muscle-gain', 'calorie-surplus-explained'],
    inputs: [
      { name: 'weight', label: 'Body Weight', type: 'number', defaultValue: 75, unitType: 'weight', min: 30, max: 200 },
      {
        name: 'experience',
        label: 'Lifting Experience',
        type: 'select',
        defaultValue: 'beginner',
        options: [
          { label: 'Beginner (Under 1 year of consistent lifting)', value: 'beginner' },
          { label: 'Intermediate (1 to 3 years)', value: 'intermediate' },
          { label: 'Advanced (Over 3 years of lifting)', value: 'advanced' }
        ]
      }
    ],
    outputs: [
      { label: 'Target Muscle Gain', valueKey: 'targetGain', unit: 'lbs/kg per month', color: 'text-emerald-500' },
      { label: 'Monthly Weight Growth Cap', valueKey: 'weightCap', unit: 'lbs/kg per month', color: 'text-blue-500' }
    ],
    calculate: (inputs, unit) => {
      const w = Number(inputs.weight);
      const isMetric = unit === 'metric';

      let factor = 0.0125; // beginner (1.25%)
      if (inputs.experience === 'intermediate') factor = 0.0075; // 0.75%
      if (inputs.experience === 'advanced') factor = 0.00355; // 0.35%

      const targetGain = Number((w * factor).toFixed(2));
      const weightCap = Number((targetGain * 1.5).toFixed(2));

      return {
        targetGain: `${targetGain} ${isMetric ? 'kg' : 'lbs'}`,
        weightCap: `${weightCap} ${isMetric ? 'kg' : 'lbs'}`
      };
    },
    resultExplanation: (inputs, results) => {
      return `To maximize muscle building while preventing unwanted fat storage, aim for a clean bulk target of **${results.targetGain}** per month.`;
    }
  },
  {
    slug: 'metabolic-age-calculator',
    title: 'Metabolic Age Calculator',
    shortDescription: 'Compare your biological resting metabolic speed with standard statistical averages for your age brackets.',
    metaDescription: 'Free online Metabolic Age Calculator. Compare your resting metabolic rate and body composition parameters to biological norms.',
    category: 'body-composition',
    isDynamic: true,
    formula: {
      name: 'Basal Metabolic Fitness Modeling',
      description: 'Calculates active BMR against average populations. Metabolic age is adjusted downward by active cellular muscle tissue and upward by excess body fat ratios.'
    },
    examples: [
      { scenario: 'Highly Active Athlete (Age 40)', inputs: 'Age: 40, Fat: 10%, Active', result: 'Metabolic Age = 28 years' }
    ],
    faqs: [
      { id: 'meta-q1', question: 'How can I lower my metabolic age?', answer: 'Perform heavy progressive resistance training to build active skeletal muscle mass, keep your body fat percentage in the fitness zone, and stay physically active daily.' }
    ],
    relatedSlugs: ['body-fat-calculator', 'bmr-calculator', 'ffmi-calculator'],
    relatedGuideSlugs: ['lean-body-mass-explained', 'healthy-body-fat-ranges'],
    inputs: [
      { name: 'age', label: 'Age (years)', type: 'number', defaultValue: 35, min: 18, max: 90 },
      { name: 'bodyFat', label: 'Body Fat %', type: 'slider', defaultValue: 18, min: 4, max: 45, step: 0.5 },
      {
        name: 'activity',
        label: 'Exercise Consistency',
        type: 'select',
        defaultValue: 'active',
        options: [
          { label: 'Sedentary', value: 'sedentary' },
          { label: 'Active (Daily walking / Gym 2-3x)', value: 'active' },
          { label: 'Highly Active (Consistent athlete)', value: 'high' }
        ]
      }
    ],
    outputs: [
      { label: 'Estimated Metabolic Age', valueKey: 'metabolicAge', unit: 'years', color: 'text-emerald-500' },
      { label: 'Age Offset', valueKey: 'offset', isCustomText: true, color: 'text-blue-500' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const fat = Number(inputs.bodyFat);
      const act = inputs.activity;

      // Simple baseline calculations
      const optimalFat = 15; // standard target
      let metabolicAge = age;

      if (fat > optimalFat) {
        metabolicAge += Math.round((fat - optimalFat) * 0.4);
      } else {
        metabolicAge -= Math.round((optimalFat - fat) * 0.2);
      }

      if (act === 'active') metabolicAge -= 2;
      if (act === 'high') metabolicAge -= 4;

      metabolicAge = Math.min(Math.max(metabolicAge, age - 15), age + 15);
      const diff = metabolicAge - age;
      const offset = diff === 0 ? 'Optimal (Matches actual age)' : diff < 0 ? `${Math.abs(diff)} years YOUNGER than chronological age` : `${diff} years OLDER than chronological age`;

      return {
        metabolicAge,
        offset
      };
    },
    resultExplanation: (inputs, results) => {
      return `Your estimated metabolic age is **${results.metabolicAge} years**, which is **${results.offset}**.`;
    }
  }
];
