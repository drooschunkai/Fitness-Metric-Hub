import { GuideArticle } from '../types';

export const PHASE2_GUIDES: GuideArticle[] = [
  // ========================================================
  // WEIGHT MANAGEMENT CLUSTER
  // ========================================================
  {
    slug: 'what-is-tdee',
    title: 'What Is TDEE? Total Daily Energy Expenditure Explained',
    shortDescription: 'Understand what TDEE is, how your metabolism burns calories daily, and how to calculate it for your fitness goals.',
    metaDescription: 'Learn about Total Daily Energy Expenditure (TDEE). Discover the components of your metabolism (BMR, NEAT, TEF, EAT) and how to calculate them.',
    category: 'Weight Management',
    readTime: '6 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'definition', text: '1. Defining TDEE' },
      { id: 'components', text: '2. Four Pillars of Metabolism' },
      { id: 'calculation', text: '3. How to Calculate TDEE' }
    ],
    content: `
## 1. Defining TDEE
Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period. It represents your absolute metabolic maintenance threshold—meaning if you consume this exact number of calories, your weight will remain perfectly stable.

## 2. Four Pillars of Metabolism
Your daily calorie expenditure is not just a factor of how hard you sweat in the gym. It is composed of four distinct metabolic pathways:
* **Basal Metabolic Rate (BMR - 60-70%):** The energy your body requires to keep you alive (brain function, breathing, cellular repair) at absolute rest.
* **Non-Exercise Activity Thermogenesis (NEAT - 15-20%):** Energy burned during everyday, non-exercise movements like walking, fidgeting, carrying groceries, and typing.
* **Thermic Effect of Food (TEF - 10%):** Calories burned digesting and processing the food you eat. Protein has the highest thermic effect (burning up to 30% of its own calories in digestion).
* **Exercise Activity Thermogenesis (EAT - 5-10%):** Energy expended during active sports and structured training.

## 3. How to Calculate TDEE
TDEE is calculated by multiplying your BMR by an activity factor corresponding to your lifestyle. Standard calculators utilize the Mifflin-St Jeor equation to estimate BMR first, then apply an activity multiplier.
    `,
    faqs: [
      { id: 'tdee-faq1', question: 'How do I raise my BMR?', answer: 'The most effective way to raise your BMR is to build skeletal muscle mass, as muscle is highly active tissue that burns calories even at rest.' }
    ],
    relatedCalculators: ['tdee-calculator', 'calorie-calculator', 'bmr-calculator']
  },
  {
    slug: 'how-calorie-deficits-work',
    title: 'How Calorie Deficits Work for Fat Loss',
    shortDescription: 'Discover the science of thermodynamic energy balance and how to create a healthy, sustainable calorie deficit.',
    metaDescription: 'Uncover the metabolic pathways of fat burning. Learn how to establish and track a safe caloric deficit for long-term weight loss success.',
    category: 'Weight Management',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'thermodynamics', text: '1. Thermodynamics and Human Biology' },
      { id: 'creating-deficit', text: '2. Creating Your Deficit' }
    ],
    content: `
## 1. Thermodynamics and Human Biology
To burn adipose fat, you must operate in a state of negative energy balance—commonly known as a calorie deficit. Under the First Law of Thermodynamics, energy cannot be created or destroyed. When you consume fewer calories than your TDEE demands, your cells are forced to oxidize stored fat tissues to release energy and fulfill your metabolic needs.

## 2. Creating Your Deficit
A healthy calorie deficit generally ranges from 300 to 500 calories below your calculated maintenance baseline. This allows for safe, progressive fat loss while protecting thyroid function and preservation of skeletal muscle tissue.
    `,
    faqs: [
      { id: 'def-faq1', question: 'Will a deficit ruin my metabolism?', answer: 'Extremely aggressive deficits can cause adaptive thermogenesis (slowing down BMR), but moderate deficits (300-500 kcal) are safe and do not cause damage.' }
    ],
    relatedCalculators: ['calorie-deficit-calculator', 'weight-loss-calculator']
  },
  {
    slug: 'healthy-weight-loss-rates',
    title: 'Healthy Weight Loss Rates: What is Realistic?',
    shortDescription: 'Learn how fast you should aim to lose weight to preserve muscle, protect metabolism, and keep the weight off.',
    metaDescription: 'Find out the clinically recommended rate of healthy weight loss per week. Understand how rapid weight loss triggers muscle catabolism.',
    category: 'Weight Management',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'guidelines', text: '1. Clinical Guidelines' },
      { id: 'risks', text: '2. Risks of Rapid Loss' }
    ],
    content: `
## 1. Clinical Guidelines
Medical guidelines state that a safe and highly sustainable rate of fat loss is **0.5% to 1.0% of your total body weight per week**. For an 80 kg individual, this translates to roughly 0.4 kg to 0.8 kg per week.

## 2. Risks of Rapid Loss
Losing weight too quickly (above 1.5% body weight weekly) triggers a protective starvation response, resulting in:
* **Skeletal Muscle Catabolism:** Your body degrades metabolic muscle tissue for energy.
* **Hormonal Downregulation:** Severe drop in thyroid output and sex hormones.
* **Rebound Gain:** Intense psychological cravings that lead to binge eating.
    `,
    faqs: [
      { id: 'rate-faq1', question: 'Why did I lose 3kg in my first week?', answer: 'Rapid initial weight loss is primarily water depletion. When you restrict calories, your body uses up glycogen stores, which release water molecules.' }
    ],
    relatedCalculators: ['weight-loss-calculator', 'goal-weight-timeline-calculator']
  },
  {
    slug: 'maintenance-calories-explained',
    title: 'Maintenance Calories Explained: Stability and Health',
    shortDescription: 'Learn why establishing a clear maintenance calorie baseline is the foundation of long-term weight stability.',
    metaDescription: 'Discover why calorie maintenance prevents metabolic adaptation. Master the transition from diet phases to healthy stability.',
    category: 'Weight Management',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'what-is-maint', text: '1. The Concept of Energy Equilibrium' },
      { id: 'reverse-dieting', text: '2. Transitioning Back to Maintenance' }
    ],
    content: `
## 1. The Concept of Energy Equilibrium
Energy maintenance is the metabolic state where energy input (calories eaten) matches energy output (TDEE). Maintaining this balance is highly beneficial between diet phases to help reset hormonal signals and recover from caloric stress.

## 2. Transitioning Back to Maintenance
After a diet phase, slowly increase calories back to your new, updated maintenance levels over 1-2 weeks. This transition supports stable weight maintenance and prevents rapid fat regain.
    `,
    faqs: [
      { id: 'maint-faq1', question: 'How do I know my true maintenance?', answer: 'Calculators provide estimates, but track your daily calories and morning weight for 14 days. If your weight averages stay stable, that is your true maintenance.' }
    ],
    relatedCalculators: ['maintenance-calories-calculator', 'tdee-calculator']
  },
  {
    slug: 'why-weight-loss-plateaus-happen',
    title: 'Why Weight Loss Plateaus Happen and How to Break Them',
    shortDescription: 'Unpack the biological mechanisms behind weight loss stalls and how to overcome them safely.',
    metaDescription: 'Struggling with a weight loss plateau? Understand adaptive thermogenesis, water retention, and caloric tracking slips.',
    category: 'Weight Management',
    readTime: '6 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'reasons', text: '1. Why Plateaus Happen' },
      { id: 'strategies', text: '2. Science-Based Action Steps' }
    ],
    content: `
## 1. Why Plateaus Happen
A weight stall (no change in scale weight for 3-4 weeks) is a normal part of fat loss. Stalls are driven by:
* **Adaptive Thermogenesis:** As you lose mass, your body naturally burns fewer calories.
* **NEAT Downregulation:** You may unconsciously move less during the day due to low energy.
* **Caloric Creep:** Over time, measurement errors can sneak into your tracking.

## 2. Science-Based Action Steps
To break a plateau:
1. Re-calculate your TDEE based on your current weight.
2. Ensure you are weighing foods on a scale.
3. Intentionally maintain daily physical activity.
    `,
    faqs: [
      { id: 'plat-faq1', question: 'Should I cut calories even more?', answer: 'Not immediately. Try taking a 1-week diet break at maintenance calories to normalize metabolic hormones first.' }
    ],
    relatedCalculators: ['calorie-deficit-calculator', 'weight-loss-calculator']
  },

  // ========================================================
  // BODY COMPOSITION CLUSTER
  // ========================================================
  {
    slug: 'bmi-vs-body-fat-percentage',
    title: 'BMI vs. Body Fat Percentage: Which is Better?',
    shortDescription: 'Uncover the diagnostic differences between general BMI ranges and precise body fat tissue assessments.',
    metaDescription: 'Find out why Body Mass Index (BMI) and Body Fat Percentage offer different perspectives on metabolic health.',
    category: 'Body Composition',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'bmi-overview', text: '1. BMI as a Screening Tool' },
      { id: 'bf-overview', text: '2. The Role of Body Fat Percentage' }
    ],
    content: `
## 1. BMI as a Screening Tool
BMI is a quick population-level health metric. While useful for broad statistics, its main limitation is that it cannot differentiate between muscle tissue and fat mass.

## 2. The Role of Body Fat Percentage
Body Fat Percentage measures the exact portion of your total weight made up of fat. It is a highly precise indicator of metabolic fitness and overall health.
    `,
    faqs: [
      { id: 'comp-faq1', question: 'How is body fat measured?', answer: 'The most accurate methods are DXA scans and hydrostatic weighing, while skinfold calipers are a highly practical everyday tool.' }
    ],
    relatedCalculators: ['bmi-calculator', 'body-fat-calculator']
  },
  {
    slug: 'what-is-ffmi',
    title: 'What Is FFMI? The Fat-Free Mass Index Guide',
    shortDescription: 'Learn what Fat-Free Mass Index (FFMI) is, how to calculate it, and how to assess your muscular potential.',
    metaDescription: 'Everything you need to know about FFMI. Evaluate lean skeletal muscle development benchmarks for athletes.',
    category: 'Body Composition',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'def', text: '1. What is FFMI?' },
      { id: 'standards', text: '2. Standard FFMI Benchmarks' }
    ],
    content: `
## 1. What is FFMI?
The Fat-Free Mass Index (FFMI) is a metabolic metric that evaluates your muscular mass relative to your height, filtering out body fat percentage. It is highly valued in drug-free bodybuilding and strength sports to track pure skeletal muscle growth.

## 2. Standard FFMI Benchmarks
* **16-17:** Low muscle mass
* **18-20:** Average/Healthy
* **21-22:** Well-developed athletic build
* **23-25:** Exceptional/Elite level for drug-free lifters
    `,
    faqs: [
      { id: 'ffmi-faq1', question: 'Can women use FFMI?', answer: 'Yes. However, because women have lower baseline skeletal muscle mass, healthy female ranges are typically 3-4 points lower than male standards.' }
    ],
    relatedCalculators: ['ffmi-calculator', 'lean-body-mass-calculator']
  },
  {
    slug: 'healthy-waist-to-height-ratios',
    title: 'Healthy Waist-to-Height Ratios: visceral fat risks',
    shortDescription: 'Understand why your waist-to-height ratio is an excellent indicator of visceral fat and heart health.',
    metaDescription: 'Learn how to measure and analyze your waist-to-height ratio (WHtR). Discover why waist metrics beat simple weight scales.',
    category: 'Body Composition',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'ratio-science', text: '1. The Science of WHtR' },
      { id: 'how-measure', text: '2. How to Measure Correctly' }
    ],
    content: `
## 1. The Science of WHtR
Waist-to-Height Ratio (WHtR) is a highly reliable screening tool for cardiovascular risk. It evaluates fat accumulation in your midsection, which is closely linked to metabolic syndrome and coronary artery disease.

## 2. How to Measure Correctly
To find your WHtR:
1. Wrap a flexible tape measure around your midsection, halfway between your lowest rib and hip bone.
2. Divide this measurement by your total height.
3. Aim to keep your ratio **under 0.50**.
    `,
    faqs: [
      { id: 'whtr-faq1', question: 'What does a ratio over 0.5 mean?', answer: 'A ratio over 0.5 suggests higher levels of visceral abdominal fat. This is an indicator to focus on dietary improvements and metabolic conditioning.' }
    ],
    relatedCalculators: ['waist-to-height-ratio-calculator', 'waist-to-hip-ratio-calculator']
  },
  {
    slug: 'lean-body-mass-explained',
    title: 'Lean Body Mass Explained: Muscle vs. Fat',
    shortDescription: 'Learn what makes up your lean body mass and why preserving it is essential for a healthy metabolism.',
    metaDescription: 'Discover why lean body mass (LBM) is crucial for calorie expenditure and bone density. Learn how to protect LBM.',
    category: 'Body Composition',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'composition', text: '1. What is Lean Body Mass?' },
      { id: 'metabolic-role', text: '2. LBM and Your Metabolism' }
    ],
    content: `
## 1. What is Lean Body Mass?
Lean Body Mass (LBM) is everything in your body that is not fat tissue. It includes your muscles, bones, organs, connective tissues, and water content.

## 2. LBM and Your Metabolism
Your LBM is the primary driver of your resting metabolic rate (BMR). To protect your lean mass while losing fat, prioritize dietary protein and regular resistance training.
    `,
    faqs: [
      { id: 'lbm-faq1', question: 'Is LBM the same as muscle mass?', answer: 'No. Muscle mass is a major component of LBM, but LBM also includes your bones, organs, and body water.' }
    ],
    relatedCalculators: ['lean-body-mass-calculator', 'body-fat-calculator']
  },
  {
    slug: 'understanding-metabolic-age',
    title: 'Understanding Metabolic Age: How Young is Your Body?',
    shortDescription: 'Find out what metabolic age is, how it is calculated, and steps you can take to lower yours.',
    metaDescription: 'Learn about metabolic age. Compare your Basal Metabolic Rate with population averages and find out how to improve yours.',
    category: 'Body Composition',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'metabolic-age', text: '1. Defining Metabolic Age' },
      { id: 'how-to-lower', text: '2. Steps to Lower Metabolic Age' }
    ],
    content: `
## 1. Defining Metabolic Age
Your metabolic age compares your Basal Metabolic Rate (BMR) with the average BMR of individuals of your chronological age in the general population.

## 2. Steps to Lower Metabolic Age
If your metabolic age is higher than your chronological age, you can lower it by:
* Building lean muscle mass through resistance training.
* Raising cardiovascular fitness with Zone 2 and interval training.
* Supporting mitochondrial function with high-quality sleep and nutrient-dense foods.
    `,
    faqs: [
      { id: 'metage-faq1', question: 'Does a lower score mean better health?', answer: 'Yes. A lower metabolic age is generally associated with better metabolic health and higher cardiorespiratory fitness.' }
    ],
    relatedCalculators: ['biological-age-calculator', 'tdee-calculator']
  },

  // ========================================================
  // NUTRITION CLUSTER
  // ========================================================
  {
    slug: 'protein-requirements-by-goal',
    title: 'Protein Requirements by Goal: Hypertrophy and Fat Loss',
    shortDescription: 'Calculate exactly how much daily protein your muscles need to recover, grow, and burn fat.',
    metaDescription: 'Find your target protein range. Learn how to adjust your protein intake for fat loss, muscle growth, and longevity.',
    category: 'Nutrition',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'protein-science', text: '1. The Importance of Protein' },
      { id: 'goal-ratios', text: '2. Target Ratios by Goal' }
    ],
    content: `
## 1. The Importance of Protein
Dietary protein provides the building blocks (amino acids) your body needs for muscle repair, immune support, and metabolic function.

## 2. Target Ratios by Goal
Adjust your daily protein intake based on your primary focus:
* **Fat Loss:** 1.8 to 2.4g per kg of bodyweight. Higher protein intake supports muscle preservation during a calorie deficit and increases fullness.
* **Muscle Growth:** 1.6 to 2.2g per kg. This supports muscle repair and recovery after heavy resistance training.
* **Longevity & Health:** 1.2 to 1.6g per kg. Supports overall lean mass retention as you age.
    `,
    faqs: [
      { id: 'prot-faq1', question: 'Can eating too much protein damage kidneys?', answer: 'For healthy individuals with normal kidney function, scientific research has shown that high-protein diets are safe.' }
    ],
    relatedCalculators: ['protein-calculator', 'macro-calculator']
  },
  {
    slug: 'carb-intake-for-athletes',
    title: 'Carb Intake for Athletes: Fueling High-Performance',
    shortDescription: 'Learn how to calculate and cycle carbohydrates to maximize muscle glycogen and training output.',
    metaDescription: 'Discover the optimal carbohydrate intake for athletic performance. Master glycogen replenishment and workout fueling.',
    category: 'Nutrition',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'glycogen', text: '1. Carbohydrates as Premium Muscle Fuel' },
      { id: 'carb-targets', text: '2. Daily Intake Ratios' }
    ],
    content: `
## 1. Carbohydrates as Premium Muscle Fuel
Carbohydrates are stored in your muscles and liver as glycogen. This is your body\'s primary, high-efficiency energy source for high-intensity training and endurance performance.

## 2. Daily Intake Ratios
* **Moderate Training (1hr/day):** 4 to 6g of carbs per kg.
* **Heavy Endurance (2+ hr/day):** 6 to 10g of carbs per kg.
* **Low-Intensity/Rest Days:** 2 to 3g of carbs per kg.
    `,
    faqs: [
      { id: 'carb-faq1', question: 'What are the best carb sources?', answer: 'Focus on nutrient-dense complex carbohydrates like oats, brown rice, sweet potatoes, and fruits, as they provide steady, long-lasting energy.' }
    ],
    relatedCalculators: ['carb-calculator', 'macro-calculator']
  },
  {
    slug: 'fiber-recommendations-explained',
    title: 'Fiber Recommendations Explained: Colon and Cardio Health',
    shortDescription: 'Understand the biological importance of soluble and insoluble fiber and how to reach your daily targets.',
    metaDescription: 'Discover why dietary fiber is crucial for metabolic and cardiovascular wellness. Learn about soluble and insoluble fiber sources.',
    category: 'Nutrition',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'types', text: '1. Soluble vs. Insoluble Fiber' },
      { id: 'benefits', text: '2. Cardiovascular and Digestive Benefits' }
    ],
    content: `
## 1. Soluble vs. Insoluble Fiber
* **Soluble Fiber:** Dissolves in water to form a gel-like substance. It is found in oats, beans, and apples, and helps regulate blood sugar and lower cholesterol.
* **Insoluble Fiber:** Adds bulk to stool and supports healthy digestion. It is found in whole grains, nuts, and leafy green vegetables.

## 2. Cardiovascular and Digestive Benefits
Aim for **25 to 38 grams** of total dietary fiber per day to support metabolic health and long-term cardiovascular wellness.
    `,
    faqs: [
      { id: 'fib-faq1', question: 'Should I take fiber supplements?', answer: 'While supplements can help, getting fiber from whole foods is best because they also provide essential vitamins, minerals, and antioxidants.' }
    ],
    relatedCalculators: ['fiber-intake-calculator', 'sugar-intake-calculator']
  },
  {
    slug: 'added-sugar-guidelines',
    title: 'Added Sugar Guidelines: Protecting Metabolic Health',
    shortDescription: 'Learn how to identify added sugars, understand their impact on health, and stay within safe limits.',
    metaDescription: 'Discover the clinical guidelines for added sugar intake. Learn how reducing added sugars supports metabolic and vascular health.',
    category: 'Nutrition',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'sugar-impact', text: '1. Added Sugar and Your Metabolism' },
      { id: 'limits', text: '2. Recommended Daily Limits' }
    ],
    content: `
## 1. Added Sugar and Your Metabolism
Consuming high levels of added sugar can lead to rapid blood sugar spikes, insulin resistance, and increased visceral fat accumulation.

## 2. Recommended Daily Limits
The American Heart Association (AHA) recommends keeping added sugars under:
* **Men:** 36 grams (150 calories) per day.
* **Women:** 25 grams (100 calories) per day.
    `,
    faqs: [
      { id: 'sug-faq1', question: 'Does this apply to fruit?', answer: 'No. The sugars in whole fruit are accompanied by fiber, which slows down digestion and prevents blood sugar spikes.' }
    ],
    relatedCalculators: ['sugar-intake-calculator', 'carb-calculator']
  },
  {
    slug: 'macronutrients-explained',
    title: 'Macronutrients Explained: Protein, Fats, and Carbs',
    shortDescription: 'Master the fundamentals of nutrition. Learn how to balance proteins, fats, and carbohydrates for your health goals.',
    metaDescription: 'Complete guide to macronutrients. Discover the roles of protein, carbohydrates, and dietary fats in human health.',
    category: 'Nutrition',
    readTime: '6 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'macros', text: '1. The Three Primary Macronutrients' },
      { id: 'balancing', text: '2. Balancing Macros for Your Goals' }
    ],
    content: `
## 1. The Three Primary Macronutrients
* **Protein (4 kcal/g):** The primary building block for muscular and cellular repair.
* **Carbohydrates (4 kcal/g):** Your body\'s preferred, efficient energy source.
* **Dietary Fats (9 kcal/g):** Crucial for hormone synthesis, vitamin absorption, and brain function.

## 2. Balancing Macros for Your Goals
A balanced dietary structure generally falls within these ranges:
* **Protein:** 20% to 35% of total calories.
* **Carbohydrates:** 40% to 60% of total calories.
* **Dietary Fats:** 20% to 35% of total calories.
    `,
    faqs: [
      { id: 'mac-faq1', question: 'Do macro ratios matter more than total calories?', answer: 'Total calories determine weight change, while macronutrient ratios shape body composition (fat vs. muscle).' }
    ],
    relatedCalculators: ['macro-calculator', 'meal-calories-calculator']
  },

  // ========================================================
  // RUNNING CLUSTER
  // ========================================================
  {
    slug: 'running-pace-zones',
    title: 'Running Pace Zones: Training for Speed and Endurance',
    shortDescription: 'Learn how to use pace zones to build cardiorespiratory capacity, lactate clearance, and speed.',
    metaDescription: 'Discover the science of running pace zones. Master Zone 2 recovery, threshold runs, and VO2 Max intervals.',
    category: 'Performance',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'zones', text: '1. The Five Training Zones' },
      { id: 'application', text: '2. Designing Your Training Week' }
    ],
    content: `
## 1. The Five Training Zones
* **Zone 1 (Recovery):** Very light effort, perfect for active recovery and flushing out lactic acid.
* **Zone 2 (Aerobic Base):** Conversational pace. This zone build cardiovascular efficiency and fat adaptation.
* **Zone 3 (Tempo/Steady):** Moderate intensity, improving muscular glycogen storage.
* **Zone 4 (Lactate Threshold):** Challenging effort, train your body to clear metabolic waste at faster speeds.
* **Zone 5 (VO2 Max):** Peak intensity intervals, boosting maximum oxygen uptake.

## 2. Designing Your Training Week
To build balanced endurance, follow the **80/20 rule**: spend 80% of your weekly mileage in low-intensity zones (Zone 1-2) and 20% in high-intensity zones (Zone 4-5).
    `,
    faqs: [
      { id: 'pz-faq1', question: 'How can I find my Zone 2 pace?', answer: 'Your Zone 2 pace is a conversational effort where you can speak in full sentences without needing to pause for air.' }
    ],
    relatedCalculators: ['running-pace-calculator', 'running-training-zone-calculator']
  },
  {
    slug: 'vo2-max-explained',
    title: 'VO2 Max Explained: The Gold Standard of Aerobic Fitness',
    shortDescription: 'Discover what VO2 Max is, why it matters for health and performance, and how to improve yours.',
    metaDescription: 'Complete guide to VO2 Max. Understand the physiology of oxygen uptake and how to boost aerobic endurance.',
    category: 'Performance',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'physiology', text: '1. The Physiology of VO2 Max' },
      { id: 'improving', text: '2. Science-Based Training Protocols' }
    ],
    content: `
## 1. The Physiology of VO2 Max
VO2 Max measures the maximum volume of oxygen (in milliliters) your body can transport and utilize per kilogram of bodyweight per minute during peak physical exertion. It is an excellent indicator of aerobic capacity and long-term health.

## 2. Science-Based Training Protocols
To improve your VO2 Max, combine:
* **High-Volume Zone 2 Cardio:** Builds mitochondrial density and capillary networks.
* **HIIT and VO2 Max Intervals:** 4x4 minute intervals at 90-95% max heart rate, with 3 minutes of active recovery.
    `,
    faqs: [
      { id: 'vo2-faq1', question: 'How long does it take to increase VO2 Max?', answer: 'With structured training, you can see noticeable improvements in your cardiorespiratory capacity within 6 to 12 weeks.' }
    ],
    relatedCalculators: ['vo2-max-calculator', 'heart-rate-zone-calculator']
  },
  {
    slug: 'training-for-your-first-marathon',
    title: 'Training for Your First Marathon: A Complete Guide',
    shortDescription: 'Master the key elements of marathon preparation, including mileage progression, fueling, and hydration.',
    metaDescription: 'Planning your first marathon? Learn how to structure weekly mileage, pace your runs, and master race-day nutrition.',
    category: 'Performance',
    readTime: '6 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'mileage', text: '1. Structuring Your Mileage' },
      { id: 'nutrition', text: '2. Fueling and Hydration Science' }
    ],
    content: `
## 1. Structuring Your Mileage
Prepare for your first marathon with a structured 16-to-20 week program:
* Gradually increase your total weekly mileage by no more than 10% each week.
* Include one long-distance run per week to build muscular endurance.
* Incorporate rest days and active recovery to support muscle repair.

## 2. Fueling and Hydration Science
During long training runs, practice your fueling strategy: consume **30 to 60 grams** of fast-digesting carbohydrates per hour of exercise, and sip fluids regularly to maintain hydration.
    `,
    faqs: [
      { id: 'mar-faq1', question: 'How long should my longest training run be?', answer: 'For your first marathon, your longest training run should generally be around 32 kilometers (20 miles) to build physical and mental stamina.' }
    ],
    relatedCalculators: ['marathon-pace-calculator', 'race-time-predictor']
  },
  {
    slug: 'how-to-improve-running-economy',
    title: 'How to Improve Running Economy: Tips for Efficiency',
    shortDescription: 'Learn how strength training, proper posture, and stride mechanics can help you run faster with less effort.',
    metaDescription: 'Discover the factors that shape running economy. Master efficiency with strength training and optimal biomechanics.',
    category: 'Performance',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'mechanics', text: '1. Biomechanics and Posture' },
      { id: 'strength', text: '2. Strength Training for Runners' }
    ],
    content: `
## 1. Biomechanics and Posture
Running economy measures how efficiently your body uses oxygen at a given running speed. You can improve your efficiency by:
* Maintaining a tall, upright posture with a slight forward lean from the ankles.
* Landing with your foot directly under your center of mass to prevent braking forces.
* Keeping a relaxed upper body and a smooth, fluid arm swing.

## 2. Strength Training for Runners
Incorporate 2 sessions of heavy resistance training per week (focusing on squats, lunges, and calf raises) to strengthen your muscles and joints and improve running efficiency.
    `,
    faqs: [
      { id: 'econ-faq1', question: 'Does cadence affect running economy?', answer: 'Yes. Maintaining a higher cadence (170-185 SPM) helps reduce ground contact time and minimizes joint impact.' }
    ],
    relatedCalculators: ['cadence-calculator', 'stride-length-calculator']
  },
  {
    slug: 'heart-rate-training-explained',
    title: 'Heart Rate Training Explained: Target Cardio Zones',
    shortDescription: 'Learn how to use heart rate zones to structure your workouts and track cardiovascular progress.',
    metaDescription: 'Unlock the power of heart rate training. Learn how to calculate target heart rate zones and track your aerobic fitness.',
    category: 'Performance',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'max-hr', text: '1. Finding Your Max Heart Rate' },
      { id: 'using-zones', text: '2. Applying Zones to Your Workouts' }
    ],
    content: `
## 1. Finding Your Max Heart Rate
To start heart rate training, estimate your maximum heart rate (MHR) using a validated formula:
* **Tanaka Formula:** 206.9 - (0.67 × Age)
* **Traditional Formula:** 220 - Age

## 2. Applying Zones to Your Workouts
Structure your weekly training using target heart rate zones:
* **Zone 2 (60-70% MHR):** Aerobic endurance and recovery.
* **Zone 3 (70-80% MHR):** Aerobic capacity and tempo runs.
* **Zone 4 (80-90% MHR):** Anaerobic threshold and speed intervals.
    `,
    faqs: [
      { id: 'hr-faq1', question: 'Why does my heart rate spike on warm days?', answer: 'Your heart rate increases in warmer weather because your body has to work harder to pump blood to the skin to cool down.' }
    ],
    relatedCalculators: ['heart-rate-zone-calculator', 'maximum-heart-rate-calculator']
  },

  // ========================================================
  // STRENGTH TRAINING CLUSTER
  // ========================================================
  {
    slug: 'how-one-rep-max-is-calculated',
    title: 'How One Rep Max Is Calculated: The Science of Strength',
    shortDescription: 'Learn the mathematical formulas used to predict your one-rep max safely and accurately.',
    metaDescription: 'Discover the science of predicting 1RM. Learn about the Brzycki and Epley strength formulas and their practical uses.',
    category: 'Strength Training',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: '1rm-formulas', text: '1. The Brzycki and Epley Formulas' },
      { id: 'practical-use', text: '2. Practical Application in Training' }
    ],
    content: `
## 1. The Brzycki and Epley Formulas
Your One-Rep Max (1RM) is the maximum weight you can lift for a single repetition. Standard calculators use validated formulas to predict this value safely from sub-maximal efforts:
* **Epley Formula:** 1RM = Weight × (1 + [Reps ÷ 30])
* **Brzycki Formula:** 1RM = Weight ÷ (1.0278 - [0.0278 × Reps])

## 2. Practical Application in Training
Predicting your 1RM allows you to program working sets using specific percentages of your maximum strength (e.g., performing working sets at 80% of 1RM to build strength) without needing to test your absolute maximum.
    `,
    faqs: [
      { id: 'max-faq1', question: 'Are predicted 1RM values accurate?', answer: 'Yes, these formulas are highly accurate when based on reps under 8. Above 10 reps, accuracy begins to decrease.' }
    ],
    relatedCalculators: ['one-rep-max-calculator', 'bench-press-standards-calculator']
  },
  {
    slug: 'training-volume-explained',
    title: 'Training Volume Explained: Sets, Reps, and Muscle Growth',
    shortDescription: 'Understand how to structure and track training volume to maximize muscle growth and recovery.',
    metaDescription: 'Learn how to calculate and progress training volume. Master working sets, reps, and cumulative workload load.',
    category: 'Strength Training',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'what-is-vol', text: '1. Defining Training Volume' },
      { id: 'programming', text: '2. Programming for Hypertrophy' }
    ],
    content: `
## 1. Defining Training Volume
Training volume is the total amount of work performed over a given time. It can be tracked using:
* **Working Sets:** The total number of high-effort sets completed per muscle group per week.
* **Volume Load:** Sets × Reps × Weight Lifted. This tracks the cumulative load of your training.

## 2. Programming for Hypertrophy
To support muscle growth, aim for **10 to 20 working sets** per muscle group per week, and focus on progressive overload by gradually increasing weight or reps over time.
    `,
    faqs: [
      { id: 'vol-faq1', question: 'Should I prioritize sets or weight?', answer: 'Both are important. Focus on performing quality working sets first, then gradually increase weight to maintain challenge.' }
    ],
    relatedCalculators: ['training-volume-calculator', 'volume-load-calculator']
  },
  {
    slug: 'progressive-overload-guide',
    title: 'Progressive Overload Guide: How to build Muscle',
    shortDescription: 'Master the core principle of strength training. Learn how to progress your workouts to build strength and muscle.',
    metaDescription: 'The ultimate guide to progressive overload. Discover the different ways to challenge your muscles and avoid plateaus.',
    category: 'Strength Training',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'overload-principle', text: '1. The Principle of Overload' },
      { id: 'methods', text: '2. Practical Methods of Progression' }
    ],
    content: `
## 1. The Principle of Overload
Progressive overload involves gradually increasing the stress placed on your muscles during training. This constant challenge signals your body to adapt by building stronger, larger muscle tissue.

## 2. Practical Methods of Progression
You can apply progressive overload in several ways:
* **Increase Resistance:** Add weight to the barbell or select heavier dumbbells.
* **Increase Repetitions:** Complete more reps with a given weight load.
* **Increase Volume:** Perform more working sets during your training session.
* **Improve Technique:** Lift with greater control and range of motion.
    `,
    faqs: [
      { id: 'over-faq1', question: 'How often should I increase the weight?', answer: 'Aim to progress when you can successfully complete all target sets and reps with perfect form.' }
    ],
    relatedCalculators: ['volume-load-calculator', 'training-volume-calculator']
  },
  {
    slug: 'relative-strength-standards',
    title: 'Relative Strength Standards: Bench, Squat, Deadlift',
    shortDescription: 'Find out how your relative strength compares to athletic and powerlifting standards.',
    metaDescription: 'Compare your strength performance. Find your relative strength tier for the big three lifts based on your bodyweight.',
    category: 'Strength Training',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'the-standards', text: '1. Standard Weight Multipliers' },
      { id: 'improving', text: '2. Tips to Improve Relative Strength' }
    ],
    content: `
## 1. Standard Weight Multipliers
Relative strength is the amount of force you can exert relative to your bodyweight. Standard lift milestones include:
* **Squat:** Intermediate: 1.4x bodyweight. Advanced: 1.8x bodyweight.
* **Bench Press:** Intermediate: 1.1x bodyweight. Advanced: 1.5x bodyweight.
* **Deadlift:** Intermediate: 1.6x bodyweight. Advanced: 2.1x bodyweight.

## 2. Tips to Improve Relative Strength
Focus on building raw strength while keeping your body composition lean:
* Perform low-rep, high-intensity strength training (1-5 reps).
* Focus on compound multi-joint movements.
* Maintain a balanced diet to support recovery while staying lean.
    `,
    faqs: [
      { id: 'std-faq1', question: 'Why is relative strength important?', answer: 'Relative strength is a key indicator of athletic performance, power, and coordination for sports and daily activities.' }
    ],
    relatedCalculators: ['relative-strength-calculator', 'bench-press-standards-calculator']
  },
  {
    slug: 'powerlifting-scoring-systems',
    title: 'Powerlifting Scoring Systems: Wilks, DOTS, and GL',
    shortDescription: 'Compare powerlifting metrics. Learn how Wilks, DOTS, and GL scores are calculated and used.',
    metaDescription: 'Discover how powerlifting scoring systems work. Compare relative strength across weight classes with DOTS and Wilks.',
    category: 'Strength Training',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'wilks-vs-dots', text: '1. Comparing Wilks and DOTS' },
      { id: 'formula-science', text: '2. The Mathematics of Relative Lift' }
    ],
    content: `
## 1. Comparing Wilks and DOTS
Powerlifting scoring systems allow coaches to compare performances across different weight classes. While the **Wilks Score** has been the traditional standard, the **DOTS Score** is widely preferred in modern competitions as it reduces bias at extreme bodyweight ranges.

## 2. The Mathematics of Relative Lift
Both systems apply a polynomial multiplier to your total lifted weight based on your biological gender and exact bodyweight, providing a standardized score for relative strength.
    `,
    faqs: [
      { id: 'score-faq1', question: 'What is a competitive DOTS score?', answer: 'A DOTS score over 350 points is highly competitive, and scores above 450 points indicate national-level strength.' }
    ],
    relatedCalculators: ['dots-score-calculator', 'wilks-score-calculator']
  },

  // ========================================================
  // HYDRATION CLUSTER
  // ========================================================
  {
    slug: 'hydration-for-athletes',
    title: 'Hydration for Athletes: Peak Physical Performance',
    shortDescription: 'Learn how to design a personalized hydration protocol to prevent fatigue and support muscle function.',
    metaDescription: 'Complete athletic hydration guide. Learn how fluid loss impacts endurance, strength, and cardiac output.',
    category: 'Hydration',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'dehydration-impact', text: '1. How Dehydration Affects Performance' },
      { id: 'protocol', text: '2. Designing a Hydration Strategy' }
    ],
    content: `
## 1. How Dehydration Affects Performance
When you lose just **2% of your bodyweight** in fluids, your aerobic capacity and physical performance begin to decrease. Dehydration leads to:
* Reduced blood volume, forcing your heart to work harder.
* Impaired temperature regulation, causing body temperature to rise quickly.
* Increased muscle fatigue and a higher risk of cramping.

## 2. Designing a Hydration Strategy
For optimal performance:
* **Before Exercise:** Drink 400-600ml of fluids 2 hours before your workout.
* **During Exercise:** Sip 150-250ml of water or electrolytes every 15-20 minutes.
* **After Exercise:** Rehydrate with 1.25 to 1.5 Liters of fluid for every kilogram of weight lost.
    `,
    faqs: [
      { id: 'ath-faq1', question: 'Is plain water best for long training runs?', answer: 'For workouts lasting over 60 minutes, a balanced electrolyte drink is recommended to replenish lost sodium and support hydration.' }
    ],
    relatedCalculators: ['water-intake-calculator', 'sweat-rate-calculator']
  },
  {
    slug: 'electrolytes-and-performance',
    title: 'Electrolytes and Performance: Sodium, Potassium, Magnesium',
    shortDescription: 'Understand the roles of essential minerals in muscle firing, nerve conduction, and hydration.',
    metaDescription: 'Discover the science of electrolytes in physical performance. Master sodium, potassium, and magnesium replenishment.',
    category: 'Hydration',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'the-minerals', text: '1. The Roles of Key Electrolytes' },
      { id: 'replenishing', text: '2. Rehydration Guidelines' }
    ],
    content: `
## 1. The Roles of Key Electrolytes
* **Sodium:** Regulates extracellular fluid balance, blood pressure, and active nerve signals. It is the primary mineral lost in sweat.
* **Potassium:** Supports intracellular hydration, heart rhythm, and muscular contraction.
* **Magnesium:** Crucial for energy production, protein synthesis, and muscle relaxation.

## 2. Rehydration Guidelines
Replenishing these key electrolytes alongside fluids helps prevent cramping, supports nerve function, and accelerates recovery.
    `,
    faqs: [
      { id: 'el-faq1', question: 'How much sodium is lost in sweat?', answer: 'Sweat contains an average of 900mg of sodium per Liter, but individual losses can vary from 500mg to over 1500mg.' }
    ],
    relatedCalculators: ['electrolyte-calculator', 'sodium-loss-calculator']
  },
  {
    slug: 'sodium-loss-during-exercise',
    title: 'Sodium Loss During Exercise: Endurance Fueling',
    shortDescription: 'Learn how to calculate and replace sodium during long-distance training and races.',
    metaDescription: 'The ultimate guide to sodium replacement during long-distance training. Prevent cramping and muscle fatigue.',
    category: 'Hydration',
    readTime: '5 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'sodium-loss', text: '1. The Impact of Sodium Depletion' },
      { id: 'replacement', text: '2. Target Replenishment Guidelines' }
    ],
    content: `
## 1. The Impact of Sodium Depletion
Endurance athletes who sweat heavily over several hours can lose significant amounts of sodium. If not replenished, this can lead to muscle cramping, fatigue, and hyponatremia.

## 2. Target Replenishment Guidelines
For workouts lasting over 2 hours:
* Calculate your hourly sweat rate and estimate your sodium concentration.
* Target replenishing **300 to 900mg of sodium** per hour of exercise, depending on your individual sweat profile.
    `,
    faqs: [
      { id: 'sod-faq1', question: 'What is hyponatremia?', answer: 'Hyponatremia is a potentially dangerous condition that occurs when blood sodium levels drop too low, often caused by drinking excess plain water without adequate electrolytes.' }
    ],
    relatedCalculators: ['sodium-loss-calculator', 'electrolyte-calculator']
  },
  {
    slug: 'sweat-rate-testing-guide',
    title: 'Sweat Rate Testing Guide: Find Your Fluid Loss',
    shortDescription: 'A step-by-step guide to measuring your hourly sweat rate to build a personalized hydration plan.',
    metaDescription: 'Learn how to perform a sweat rate test at home. Track pre and post-workout weight to optimize hydration.',
    category: 'Hydration',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'the-test', text: '1. Step-by-Step Sweat Test' },
      { id: 'calculations', text: '2. Applying Your Results' }
    ],
    content: `
## 1. Step-by-Step Sweat Test
To calculate your hourly sweat rate:
1. Weigh yourself in minimal clothing immediately before your workout.
2. Complete 60 minutes of your typical exercise, keeping track of any water consumed.
3. Towel off completely and weigh yourself in the same minimal clothing immediately after.
4. Calculate: (Pre-Weight - Post-Weight) + Fluid Consumed = Total Sweat Loss.

## 2. Applying Your Results
Use your test results to build a personalized hydration plan, aiming to replace **70% to 80%** of your hourly fluid loss during training.
    `,
    faqs: [
      { id: 'test-faq1', question: 'How often should I test my sweat rate?', answer: 'Test your sweat rate at least twice a year—once in warm conditions and once in cooler weather—to understand how your body responds to different temperatures.' }
    ],
    relatedCalculators: ['sweat-rate-calculator', 'water-intake-calculator']
  },
  {
    slug: 'preventing-dehydration',
    title: 'Preventing Dehydration: Key Indicators and Tips',
    shortDescription: 'Learn how to identify early signs of dehydration and maintain healthy hydration habits daily.',
    metaDescription: 'Keep dehydration at bay. Discover key hydration markers, thirst signals, and daily hydration tips.',
    category: 'Hydration',
    readTime: '4 min read',
    publishedDate: '2026-06-25',
    author: 'Dr. Michael Vance, FACC',
    toc: [
      { id: 'indicators', text: '1. Early Indicators of Dehydration' },
      { id: 'tips', text: '2. Simple Daily Hydration Habits' }
    ],
    content: `
## 1. Early Indicators of Dehydration
Don\'t wait until you feel thirsty to hydrate. Early indicators of dehydration include:
* **Urine Color:** Dark honey or amber-colored urine suggests dehydration.
* **Physical Feelings:** Dry mouth, mild headache, or fatigue.
* **Brain Fog:** Reduced focus, clarity, or reaction time.

## 2. Simple Daily Hydration Habits
Keep your hydration on track with these easy habits:
* Carry a reusable water bottle throughout the day.
* Check your urine color in the morning to assess your baseline hydration.
* Include water-rich foods like cucumbers, melons, and berries in your diet.
    `,
    faqs: [
      { id: 'prev-faq1', question: 'Does drinking water help with weight loss?', answer: 'Yes. Drinking water before meals can support portion control and help maintain a healthy metabolic rate.' }
    ],
    relatedCalculators: ['hydration-status-calculator', 'water-intake-calculator']
  }
];
