import { CalculatorConfig } from '../types';
import { DYNAMIC_CALCULATORS } from './dynamic_calculators';
import { PHASE2_CALCULATORS } from './phase2_calculators';

export const CALCULATORS: CalculatorConfig[] = [
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    shortDescription: 'Calculate your Body Mass Index (BMI) to determine if you are at a healthy weight relative to your height.',
    metaDescription: 'Free online BMI Calculator. Instantly calculate your Body Mass Index (BMI) and find your weight category according to the World Health Organization (WHO).',
    category: 'weight-management',
    formula: {
      name: 'Metric & Imperial BMI Formulas',
      description: 'Body Mass Index is calculated as weight divided by height squared. For metric systems, use kilograms and meters. For imperial systems, multiply weight in pounds by 703 and divide by height in inches squared.'
    },
    examples: [
      {
        scenario: 'Average Adult Male (Metric)',
        inputs: 'Weight: 80 kg, Height: 180 cm',
        result: 'BMI = 24.7 (Normal Weight)'
      },
      {
        scenario: 'Overweight Adult Female (Imperial)',
        inputs: 'Weight: 170 lbs, Height: 5 ft 4 in (64 in)',
        result: 'BMI = 29.2 (Overweight)'
      }
    ],
    faqs: [
      {
        id: 'bmi-q1',
        question: 'What is a healthy BMI range?',
        answer: 'For most adults, a healthy BMI is between 18.5 and 24.9. A BMI below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or above is obese.'
      },
      {
        id: 'bmi-q2',
        question: 'Are there limitations to BMI?',
        answer: 'Yes. BMI does not directly measure body fat or distinguish between fat and lean muscle mass. Therefore, muscular athletes may have a high "overweight" or "obese" BMI despite having low body fat. It also does not account for age, gender, or bone structure.'
      },
      {
        id: 'bmi-q3',
        question: 'What health risks are associated with a high BMI?',
        answer: 'A high BMI is associated with an increased risk of chronic diseases such as type 2 diabetes, high blood pressure, cardiovascular disease, stroke, sleep apnea, and certain types of cancer.'
      }
    ],
    relatedSlugs: ['calorie-calculator', 'ideal-weight-calculator', 'body-fat-calculator'],
    relatedGuideSlugs: ['what-is-bmi', 'weight-loss-fundamentals']
  },
  {
    slug: 'bmr-calculator',
    title: 'BMR Calculator',
    shortDescription: 'Calculate your Basal Metabolic Rate (BMR) to understand how many calories your body burns at complete rest.',
    metaDescription: 'Determine your Basal Metabolic Rate (BMR) using the scientifically accurate Mifflin-St Jeor formula. Ideal for weight management and meal planning.',
    category: 'fitness-performance',
    formula: {
      name: 'Mifflin-St Jeor Equation',
      description: 'The Mifflin-St Jeor equation is the current gold standard for predicting resting energy expenditure. \n\n• Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5\n\n• Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161'
    },
    examples: [
      {
        scenario: '30-year-old Male',
        inputs: 'Weight: 80 kg, Height: 180 cm, Age: 30',
        result: 'BMR = 1,780 kcal/day'
      },
      {
        scenario: '25-year-old Female',
        inputs: 'Weight: 60 kg, Height: 165 cm, Age: 25',
        result: 'BMR = 1,356 kcal/day'
      }
    ],
    faqs: [
      {
        id: 'bmr-q1',
        question: 'What is Basal Metabolic Rate (BMR)?',
        answer: 'BMR is the minimum number of calories your body needs to survive and perform basic, life-sustaining functions (such as breathing, circulation, cell production, and nutrient processing) while in a resting state.'
      },
      {
        id: 'bmr-q2',
        question: 'How do I use my BMR to lose weight?',
        answer: 'To lose weight, you must consume fewer calories than your Total Daily Energy Expenditure (TDEE). Since TDEE is your BMR multiplied by your physical activity level, knowing your BMR is the starting point. You should never consume fewer calories than your BMR without medical supervision.'
      },
      {
        id: 'bmr-q3',
        question: 'Does aging affect my BMR?',
        answer: 'Yes, BMR generally decreases as you age. This is primarily due to a natural loss of lean muscle mass (sarcopenia) and a gradual increase in fat tissue proportion, which is less metabolically active.'
      }
    ],
    relatedSlugs: ['calorie-calculator', 'macro-calculator', 'lean-body-mass-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'weight-loss-fundamentals']
  },
  {
    slug: 'calorie-calculator',
    title: 'Calorie Calculator',
    shortDescription: 'Estimate your Total Daily Energy Expenditure (TDEE) and find how many daily calories you need to lose, maintain, or gain weight.',
    metaDescription: 'Free scientific daily calorie calculator. Calculate your Total Daily Energy Expenditure (TDEE) based on your activity level and personalized health goals.',
    category: 'weight-management',
    formula: {
      name: 'BMR × Physical Activity Level (PAL)',
      description: 'TDEE is calculated by first finding your BMR (using Mifflin-St Jeor) and multiplying it by an Activity Multiplier: \n• Sedentary (little to no exercise): 1.2\n• Light (exercise 1-3 times/week): 1.375\n• Moderate (exercise 4-5 times/week): 1.55\n• Active (intense exercise 6-7 times/week): 1.725\n• Athlete (heavy physical job/double daily training): 1.9'
    },
    examples: [
      {
        scenario: 'Moderately Active Male (TDEE)',
        inputs: 'BMR: 1,780 kcal, Activity: Moderate (1.55)',
        result: 'Daily Calorie Needs = 2,759 kcal/day to maintain weight'
      },
      {
        scenario: 'Sedentary Female (Weight Loss)',
        inputs: 'BMR: 1,356 kcal, Activity: Sedentary (1.2), Goal: Loss (500 kcal deficit)',
        result: 'Target Intake = 1,127 kcal/day'
      }
    ],
    faqs: [
      {
        id: 'cal-q1',
        question: 'How big should my calorie deficit be for weight loss?',
        answer: 'A safe and sustainable calorie deficit is usually between 300 and 500 calories per day, which leads to a healthy weight loss of about 0.5 to 1 pound (0.2 to 0.5 kg) per week. Avoid extreme deficits below 1,200 calories (women) or 1,500 calories (men) unless recommended by a doctor.'
      },
      {
        id: 'cal-q2',
        question: 'How often should I re-calculate my daily calorie needs?',
        answer: 'You should re-calculate your calorie needs every time you lose or gain about 5 to 10 pounds (2 to 5 kg). As your body mass changes, your BMR and energy requirements also decrease or increase.'
      }
    ],
    relatedSlugs: ['bmr-calculator', 'macro-calculator', 'protein-calculator'],
    relatedGuideSlugs: ['how-many-calories-should-i-eat', 'weight-loss-fundamentals']
  },
  {
    slug: 'protein-calculator',
    title: 'Protein Intake Calculator',
    shortDescription: 'Calculate your daily protein requirements based on your body weight, activity levels, and fitness goals.',
    metaDescription: 'Find your custom optimal daily protein requirements. Calculate specific grams of protein needed for muscle gain, fat loss, or general weight maintenance.',
    category: 'nutrition',
    formula: {
      name: 'Weight × Goal-based Multipliers',
      description: 'Daily protein needs are calculated based on your lean mass and overall weight: \n• Weight Loss: 1.8 to 2.2 grams per kg of body weight (to preserve muscle while in a calorie deficit)\n• Maintenance: 1.4 to 1.8 grams per kg of body weight (for normal physical recovery)\n• Muscle Gain: 2.0 to 2.5 grams per kg of body weight (to maximize muscle protein synthesis)'
    },
    examples: [
      {
        scenario: 'Gym-goer building muscle',
        inputs: 'Weight: 80 kg (176 lbs), Goal: Muscle Gain',
        result: 'Protein Intake = 160g – 200g of protein daily'
      },
      {
        scenario: 'Sedentary adult maintaining health',
        inputs: 'Weight: 60 kg (132 lbs), Goal: Maintenance',
        result: 'Protein Intake = 84g – 108g of protein daily'
      }
    ],
    faqs: [
      {
        id: 'prot-q1',
        question: 'Why is protein important for weight loss?',
        answer: 'Protein has a high thermic effect of food (TEF), meaning your body burns more calories digesting it than carbs or fats. It is also the most satiating macronutrient, which helps control hunger during a calorie deficit, and is critical for protecting muscle tissue.'
      },
      {
        id: 'prot-q2',
        question: 'Can you eat too much protein?',
        answer: 'For healthy individuals, a high-protein diet is generally safe and does not damage kidney function. However, eating protein in massive excess may crowd out other essential macronutrients (carbs and fats) and fiber.'
      }
    ],
    relatedSlugs: ['macro-calculator', 'calorie-calculator', 'water-calculator'],
    relatedGuideSlugs: ['protein-intake-guide', 'how-many-calories-should-i-eat']
  },
  {
    slug: 'water-calculator',
    title: 'Water Intake Calculator',
    shortDescription: 'Find your customized daily water consumption needs based on your body weight and exercise habits.',
    metaDescription: 'Hydration calculator. Learn how much water you should drink daily based on your weight and physical exercise intensity.',
    category: 'nutrition',
    formula: {
      name: 'Weight-Based Baseline + Exercise Compensation',
      description: 'Baseline: 35 ml of water per kilogram of body weight. \n\nExercise adjustment: Add 350 ml of water for every 30 minutes of physical exercise to compensate for sweat loss.'
    },
    examples: [
      {
        scenario: 'Active Gym Enthusiast',
        inputs: 'Weight: 85 kg, Exercise: 60 minutes/day',
        result: 'Water Intake = 3.68 Liters (approx. 15.5 cups) per day'
      },
      {
        scenario: 'Sedentary Office Worker',
        inputs: 'Weight: 60 kg, Exercise: 0 minutes/day',
        result: 'Water Intake = 2.10 Liters (approx. 9 cups) per day'
      }
    ],
    faqs: [
      {
        id: 'water-q1',
        question: 'Do other beverages count towards my water intake?',
        answer: 'Yes! Herbal teas, milk, unsweetened juices, and even caffeinated drinks like coffee contribute to your hydration. Food with high water content (like fruits and vegetables) also supplies about 20% of your daily water.'
      },
      {
        id: 'water-q2',
        question: 'What are the signs of dehydration?',
        answer: 'Common symptoms include dark yellow urine, dry mouth, headache, fatigue, dizziness, and decreased skin elasticity.'
      }
    ],
    relatedSlugs: ['protein-calculator', 'macro-calculator', 'walking-calories-calculator'],
    relatedGuideSlugs: ['weight-loss-fundamentals', 'protein-intake-guide']
  },
  {
    slug: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    shortDescription: 'Estimate your body fat percentage using the US Navy Method based on simple body tape measurements.',
    metaDescription: 'Free online US Navy Method Body Fat Calculator. Calculate your body fat percentage, fat mass, and lean body weight using simple circumferences.',
    category: 'fitness-performance',
    formula: {
      name: 'US Navy Circumference Equation',
      description: 'Calculates body fat percentage using key circumference measurements in inches:\n• Men: BF% = 86.010 × log10(Waist - Neck) - 70.041 × log10(Height) + 36.76\n• Women: BF% = 163.205 × log10(Waist + Hip - Neck) - 97.684 × log10(Height) - 78.387'
    },
    examples: [
      {
        scenario: 'Adult Male Athlete',
        inputs: 'Height: 70 in (177.8 cm), Neck: 15 in, Waist: 32 in',
        result: 'Body Fat = 12.8% (Athletic Range)'
      },
      {
        scenario: 'Adult Female Builder',
        inputs: 'Height: 65 in (165.1 cm), Neck: 13.5 in, Waist: 28 in, Hip: 36 in',
        result: 'Body Fat = 22.1% (Fitness Range)'
      }
    ],
    faqs: [
      {
        id: 'bf-q1',
        question: 'What is a healthy body fat percentage?',
        answer: 'Essential fat is 2-5% for men and 10-13% for women. Athletic ranges are typically 6-13% (men) and 14-20% (women). General fitness is 14-17% (men) and 21-24% (women). Over 25% for men and 32% for women is considered obese.'
      },
      {
        id: 'bf-q2',
        question: 'How accurate is the US Navy body fat formula?',
        answer: 'When measured correctly, the US Navy formula is surprisingly accurate, usually within 3-4% of DEXA scans, which are the clinical gold standard. Ensure the tape measurement is snug but not compressing the skin.'
      }
    ],
    relatedSlugs: ['lean-body-mass-calculator', 'bmi-calculator', 'ideal-weight-calculator'],
    relatedGuideSlugs: ['understanding-body-fat-percentage', 'what-is-bmi']
  },
  {
    slug: 'lean-body-mass-calculator',
    title: 'Lean Body Mass Calculator',
    shortDescription: 'Calculate your Lean Body Mass (LBM) to find out how much of your body weight consists of muscles, bones, and organs.',
    metaDescription: 'Determine your Lean Body Mass (LBM) using the Boer formula. Great for adjusting your nutrition, tracking muscle gain, and calculating dietary macros.',
    category: 'fitness-performance',
    formula: {
      name: 'Boer Formula',
      description: 'The Boer formula estimates the weight of your fat-free body components (muscle, bone, organs, fluids):\n• Men: LBM = 0.407 × Weight (kg) + 0.267 × Height (cm) - 19.2\n• Women: LBM = 0.252 × Weight (kg) + 0.473 × Height (cm) - 48.3'
    },
    examples: [
      {
        scenario: 'Muscular Adult Male',
        inputs: 'Weight: 85 kg, Height: 185 cm',
        result: 'Lean Body Mass = 64.8 kg (76.2% of body weight)'
      },
      {
        scenario: 'Active Adult Female',
        inputs: 'Weight: 60 kg, Height: 168 cm',
        result: 'Lean Body Mass = 46.3 kg (77.2% of body weight)'
      }
    ],
    faqs: [
      {
        id: 'lbm-q1',
        question: 'Why is Lean Body Mass important?',
        answer: 'Lean mass contains your muscle, which is metabolically active tissue. Knowing your LBM helps you accurately customize your daily protein targets and design precise hypertrophy training and fat loss regimens.'
      },
      {
        id: 'lbm-q2',
        question: 'What is the difference between Lean Body Mass and Skeletal Muscle Mass?',
        answer: 'Lean Body Mass includes everything in your body that is not fat (bones, vital organs, blood, connective tissue, water, and skeletal muscle). Skeletal muscle is just one component of LBM, though it is the easiest one to change through strength training.'
      }
    ],
    relatedSlugs: ['body-fat-calculator', 'bmr-calculator', 'ideal-weight-calculator'],
    relatedGuideSlugs: ['understanding-body-fat-percentage', 'protein-intake-guide']
  },
  {
    slug: 'ideal-weight-calculator',
    title: 'Ideal Body Weight Calculator',
    shortDescription: 'Find your medically recommended target weight range using the standard Hamwi Formula.',
    metaDescription: 'Free Ideal Body Weight (IBW) calculator. Discover your optimal healthy body weight range based on gender, height, and age guidelines.',
    category: 'weight-management',
    formula: {
      name: 'Hamwi Formula',
      description: 'The Hamwi formula has been used by clinical nutritionists since 1964:\n• Men: 48.0 kg + 2.7 kg for every inch over 5 feet (60 inches) tall.\n• Women: 45.5 kg + 2.2 kg for every inch over 5 feet (60 inches) tall.'
    },
    examples: [
      {
        scenario: 'Male (6 ft 0 in / 72 in)',
        inputs: 'Height: 182.9 cm (12 inches over 5 ft)',
        result: 'Ideal Weight = 80.4 kg (177.3 lbs) ± 10% tolerance'
      },
      {
        scenario: 'Female (5 ft 4 in / 64 in)',
        inputs: 'Height: 162.6 cm (4 inches over 5 ft)',
        result: 'Ideal Weight = 54.3 kg (119.7 lbs) ± 10% tolerance'
      }
    ],
    faqs: [
      {
        id: 'ibw-q1',
        question: 'What does "plus or minus 10%" mean for ideal weight?',
        answer: 'The Hamwi formula provides a single number baseline, but human bodies vary. A standard ±10% range is applied to accommodate differences in frame size (small, medium, or large bones) and muscle development.'
      },
      {
        id: 'ibw-q2',
        question: 'Is the Ideal Body Weight realistic for everyone?',
        answer: 'No. Clinical formulas like Hamwi are best used as starting guidelines. Body fat percentage, muscle mass, skeletal frame, and overall distribution are far better indicators of longevity and athletic performance.'
      }
    ],
    relatedSlugs: ['bmi-calculator', 'calorie-calculator', 'body-fat-calculator'],
    relatedGuideSlugs: ['what-is-bmi', 'weight-loss-fundamentals']
  },
  {
    slug: 'macro-calculator',
    title: 'Macronutrient Calculator',
    shortDescription: 'Divide your total daily calories into the optimal proportions of Protein, Carbohydrates, and Fats to fit your body goal.',
    metaDescription: 'Calculate your custom daily macronutrient targets (carbs, proteins, fats) based on your target daily calories and physical training goals.',
    category: 'nutrition',
    formula: {
      name: 'Calorie Division Ratios',
      description: 'First, determine your target daily calories. Then apply ratio guidelines based on your physical goal:\n• Weight Loss: 40% Protein (4 kcal/g), 30% Carbs (4 kcal/g), 30% Fat (9 kcal/g)\n• Maintenance: 30% Protein (4 kcal/g), 40% Carbs (4 kcal/g), 30% Fat (9 kcal/g)\n• Muscle Gain: 30% Protein (4 kcal/g), 50% Carbs (4 kcal/g), 20% Fat (9 kcal/g)'
    },
    examples: [
      {
        scenario: 'Muscle Gain (2,500 kcal Diet)',
        inputs: 'Calories: 2500, Goal: Muscle Gain',
        result: 'Protein: 188g (750 kcal), Carbs: 313g (1250 kcal), Fat: 56g (500 kcal)'
      },
      {
        scenario: 'Fat Loss (1,800 kcal Diet)',
        inputs: 'Calories: 1800, Goal: Fat Loss',
        result: 'Protein: 180g (720 kcal), Carbs: 135g (540 kcal), Fat: 60g (540 kcal)'
      }
    ],
    faqs: [
      {
        id: 'mac-q1',
        question: 'How many calories are in a gram of each macro?',
        answer: 'Protein and Carbohydrates contain 4 calories per gram. Fats contain 9 calories per gram. (Alcohol contains 7 calories per gram, though it is not an essential macro).'
      },
      {
        id: 'mac-q2',
        question: 'Is a low-carb macro ratio better for fat loss?',
        answer: 'A low-carb diet is not strictly superior for fat loss; weight loss depends on a consistent calorie deficit. However, low-carb setups often help control appetite, while higher-carb setups optimize high-intensity gym training performance.'
      }
    ],
    relatedSlugs: ['protein-calculator', 'calorie-calculator', 'bmr-calculator'],
    relatedGuideSlugs: ['protein-intake-guide', 'how-many-calories-should-i-eat']
  },
  {
    slug: 'walking-calories-calculator',
    title: 'Walking Calories Calculator',
    shortDescription: 'Calculate the total number of calories burned while walking based on your body weight, walking distance, and speed.',
    metaDescription: 'Estimate calories burned walking. Enter your weight, walking distance, and speed to calculate energy expenditure and track your progress.',
    category: 'fitness-performance',
    formula: {
      name: 'MET-based Energy Expenditure',
      description: 'Calculated using METs (Metabolic Equivalent of Task) based on walking speed:\n• Slow (< 2.5 mph): 2.0 METs\n• Normal (2.5 – 3.0 mph): 3.0 METs\n• Brisk (3.0 – 3.5 mph): 3.5 METs\n• Fast (3.5 – 4.0 mph): 4.0 METs\n• Race-walking (> 4.0 mph): 4.5 METs\n\nFormula: Calories Burned = (MET × 3.5 × Weight in kg / 200) × Duration in minutes'
    },
    examples: [
      {
        scenario: 'Brisk Walk in the Park',
        inputs: 'Weight: 75 kg, Distance: 3 miles, Speed: 3.0 mph',
        result: 'Duration: 60 min, MET: 3.0, Calories Burned = 236 kcal'
      },
      {
        scenario: 'Fast Walk to Work',
        inputs: 'Weight: 60 kg, Distance: 2 km, Speed: 5.0 km/h (3.1 mph)',
        result: 'Duration: 24 min, MET: 3.5, Calories Burned = 105 kcal'
      }
    ],
    faqs: [
      {
        id: 'walk-q1',
        question: 'Does walking speed matter for calories burned?',
        answer: 'Yes! Walking faster increase your heart rate and raises your metabolic equivalent (MET) value, resulting in more calories burned per minute of exercise. However, covering the same distance at a slower speed takes longer, meaning the total calorie burn of the trip remains relatively close.'
      },
      {
        id: 'walk-q2',
        question: 'How many daily steps are ideal for weight management?',
        answer: 'While the 10,000 steps baseline is a popular fitness goal, research shows health benefits and active weight maintenance gains are highly significant beginning around 7,500 steps per day.'
      }
    ],
    relatedSlugs: ['calorie-calculator', 'water-calculator', 'lean-body-mass-calculator'],
    relatedGuideSlugs: ['weight-loss-fundamentals', 'how-many-calories-should-i-eat']
  },
  ...DYNAMIC_CALCULATORS,
  ...PHASE2_CALCULATORS
];
