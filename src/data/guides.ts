import { GuideArticle } from '../types';
import { CLUSTER_GUIDES } from './guides_clusters';

export const GUIDES: GuideArticle[] = [
  {
    slug: 'what-is-bmi',
    title: 'What Is BMI? Understanding Body Mass Index',
    shortDescription: 'Learn what Body Mass Index (BMI) is, how it is calculated, who it is for, and its limitations as a health metric.',
    metaDescription: 'Complete scientific guide to Body Mass Index (BMI). Understand BMI ranges, calculation formulas, health risks, and clinical limitations.',
    category: 'Weight Management',
    readTime: '5 min read',
    publishedDate: '2026-05-12',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'introduction', text: '1. What is Body Mass Index?' },
      { id: 'how-calculated', text: '2. How is BMI Calculated?' },
      { id: 'categories', text: '3. Standard BMI Categories' },
      { id: 'limitations', text: '4. Critical Limitations of BMI' },
      { id: 'health-risks', text: '5. High BMI Health Implications' },
      { id: 'summary', text: '6. Conclusion & Next Steps' }
    ],
    content: `
      <h2 id="introduction" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">1. What is Body Mass Index?</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Body Mass Index (BMI) is a simple, inexpensive medical screening tool used to estimate the amount of body fat a person has relative to their height. By dividing a person's weight by their height squared, doctors and health organizations can quickly classify individuals as underweight, normal weight, overweight, or obese.
      </p>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Invented in the early 19th century by Belgian mathematician Adolphe Quetelet, BMI has become the international standard for analyzing populations and tracking global health trends.
      </p>

      <h2 id="how-calculated" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">2. How is BMI Calculated?</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        The BMI formula differs slightly depending on whether you use the metric system or the imperial system:
      </p>
      <div class="bg-gray-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-md">
        <p class="font-semibold text-gray-800">Metric Formula:</p>
        <code class="block font-mono text-sm text-emerald-700 mt-1">BMI = Weight (kg) / [Height (m)]²</code>
      </div>
      <div class="bg-gray-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-md">
        <p class="font-semibold text-gray-800">Imperial Formula:</p>
        <code class="block font-mono text-sm text-emerald-700 mt-1">BMI = (Weight (lbs) × 703) / [Height (inches)]²</code>
      </div>

      <h2 id="categories" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">3. Standard BMI Categories</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        The World Health Organization (WHO) and National Institutes of Health (NIH) categorize BMI scores into four main classifications:
      </p>
      <div class="overflow-x-auto mb-6">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="bg-gray-100 border-b border-gray-200">
              <th class="p-3 font-semibold text-gray-700">BMI Range</th>
              <th class="p-3 font-semibold text-gray-700">Classification</th>
              <th class="p-3 font-semibold text-gray-700">Health Risk Level</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="p-3 font-mono">Below 18.5</td>
              <td class="p-3 text-blue-600 font-medium">Underweight</td>
              <td class="p-3 text-gray-600">Minimal to moderate (nutrient deficiency)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-3 font-mono">18.5 – 24.9</td>
              <td class="p-3 text-emerald-600 font-medium">Normal Weight</td>
              <td class="p-3 text-gray-600">Very Low Risk</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-3 font-mono">25.0 – 29.9</td>
              <td class="p-3 text-amber-600 font-medium">Overweight</td>
              <td class="p-3 text-gray-600">Increased Risk</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-3 font-mono">30.0 and above</td>
              <td class="p-3 text-red-600 font-medium">Obese</td>
              <td class="p-3 text-gray-600">High to Extremely High Risk</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="limitations" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">4. Critical Limitations of BMI</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        While BMI is useful for large population studies, it has major limitations when applied to single individuals:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Does not differentiate fat from muscle:</strong> Muscles are far denser than fat. A strength athlete or bodybuilder with low body fat can be classified as obese.</li>
        <li><strong>Does not account for fat distribution:</strong> Visceral fat (fat stored around abdominal organs) is highly dangerous, while subcutaneous fat (under the skin) is less harmful. BMI treats all body fat equally.</li>
        <li><strong>Varies by age and ethnicity:</strong> Elderly adults often lose muscle and gain fat even if their weight remains constant, and certain ethnic groups (such as South Asians) carry higher cardiac risk at lower BMI scores.</li>
      </ul>

      <h2 id="health-risks" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">5. High BMI Health Implications</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Clinical research demonstrates that carrying an excessive amount of fat tissue (as indicated by an elevated BMI) triggers chronic systemic inflammation. This substantially raises the likelihood of developing:
      </p>
      <ol class="list-decimal list-inside space-y-2 mb-4 text-gray-600">
        <li>Type 2 Diabetes mellitus</li>
        <li>Coronary heart disease and atherosclerosis</li>
        <li>Ischemic stroke</li>
        <li>Obstructive sleep apnea</li>
        <li>Osteoarthritis (joint wear due to physical weight load)</li>
      </ol>

      <h2 id="summary" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">6. Conclusion & Next Steps</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        BMI is a convenient initial screening baseline but should never be the sole indicator of health. If you have concerns, pair your BMI measurements with a waist circumference measurement or a body fat calculator to gain a clearer understanding of your overall body composition.
      </p>
    `,
    faqs: [
      {
        id: 'faq-bmi-1',
        question: 'Is BMI different for children and teens?',
        answer: 'Yes. For children and adolescents (ages 2 to 19), BMI is calculated using the same formula but interpreted using age-and-sex-specific percentiles. This is because their body compositions change rapidly during growth.'
      },
      {
        id: 'faq-bmi-2',
        question: 'Can you have a normal BMI and still be unhealthy?',
        answer: 'Absolutely. This is often referred to as "Normal Weight Obesity" or "skinny fat" — where a person has a healthy BMI but possesses a high proportion of body fat and low muscle mass, posing similar metabolic health risks.'
      }
    ],
    relatedCalculators: ['bmi-calculator', 'ideal-weight-calculator', 'body-fat-calculator']
  },
  {
    slug: 'how-many-calories-should-i-eat',
    title: 'How Many Calories Should I Eat Daily?',
    shortDescription: 'Discover how daily calorie needs are determined and learn how to adjust your calorie intake to meet weight loss, maintenance, or muscle gain goals.',
    metaDescription: 'Complete guide to understanding daily calorie needs, Basal Metabolic Rate (BMR), and Total Daily Energy Expenditure (TDEE). Adjust calorie deficits safely.',
    category: 'Nutrition',
    readTime: '6 min read',
    publishedDate: '2026-05-20',
    author: 'Michael Roberts, CSCS',
    toc: [
      { id: 'calorie-basics', text: '1. What Is a Calorie?' },
      { id: 'tdee-structure', text: '2. The TDEE Equation' },
      { id: 'goal-adjustment', text: '3. Adjusting Calories for Your Goal' },
      { id: 'tracking-tips', text: '4. Practical Tracking Strategies' }
    ],
    content: `
      <h2 id="calorie-basics" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">1. What Is a Calorie?</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        In nutrition, a calorie (specifically a kilocalorie or kcal) is a unit of energy. It represents the amount of heat energy required to raise the temperature of one kilogram of water by one degree Celsius. When we consume food, we ingest energy; when we perform activities, we burn it.
      </p>

      <h2 id="tdee-structure" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">2. The TDEE Equation</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Your Total Daily Energy Expenditure (TDEE) represents the total calories you burn in a single 24-hour period. It is composed of four main factors:
      </p>
      <ol class="list-decimal list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Basal Metabolic Rate (BMR) [60–70% of energy burn]:</strong> The calories your organs burn just keeping you alive at complete rest.</li>
        <li><strong>Non-Exercise Activity Thermogenesis (NEAT) [15–20%]:</strong> Energy used for normal daily movements like walking, fidgeting, carrying groceries, and typing.</li>
        <li><strong>Thermic Effect of Activity (TEA) [5–10%]:</strong> Energy burned through intentional exercise (workouts, running, cycling).</li>
        <li><strong>Thermic Effect of Food (TEF) [10%]:</strong> Calories used to chew, digest, absorb, and process food nutrients.</li>
      </ol>

      <h2 id="goal-adjustment" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">3. Adjusting Calories for Your Goal</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Once you calculate your active daily maintenance baseline (TDEE), you can adjust your calories based on your body composition goals:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div class="border border-red-100 bg-red-50 p-4 rounded-lg">
          <h3 class="font-bold text-red-800">Fat Loss</h3>
          <p class="text-sm text-gray-600 mt-1">Subtract 300 to 500 calories from your TDEE. This creates a safe, gradual, and sustainable caloric deficit.</p>
        </div>
        <div class="border border-emerald-100 bg-emerald-50 p-4 rounded-lg">
          <h3 class="font-bold text-emerald-800">Maintenance</h3>
          <p class="text-sm text-gray-600 mt-1">Eat exactly at your calculated TDEE. This stabilizes weight while allowing body recomposition.</p>
        </div>
        <div class="border border-blue-100 bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800">Muscle Gain</h3>
          <p class="text-sm text-gray-600 mt-1">Add 200 to 300 calories to your TDEE (lean bulking) accompanied by structured resistance training.</p>
        </div>
      </div>

      <h2 id="tracking-tips" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">4. Practical Tracking Strategies</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Calculators are scientific estimates. To verify your real-world progress:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Weigh yourself daily:</strong> Take a weekly average to smooth out water weight fluctuations.</li>
        <li><strong>Use a digital food scale:</strong> Estimating portions by eye can lead to underestimating calories by up to 50%.</li>
        <li><strong>Be consistent:</strong> Track condiments, cooking oils, and beverages, as these often contain hidden calories.</li>
      </ul>
    `,
    faqs: [
      {
        id: 'faq-cal-1',
        question: 'What is metabolic damage?',
        answer: 'Metabolic damage is a myth, but "metabolic adaptation" is real. When you lose weight, your body burns fewer calories because you are smaller. Your metabolic rate also adapts slightly to conserve energy, making diet breaks and structured calorie deficits important.'
      },
      {
        id: 'faq-cal-2',
        question: 'Should I eat back the calories my fitness tracker says I burned?',
        answer: 'It is highly recommended not to eat back exercise calories. Most fitness watches and fitness equipment overestimate active calories burned by 20% to 90%. Use a fixed calorie budget and adjust based on weekly weight scale averages.'
      }
    ],
    relatedCalculators: ['calorie-calculator', 'bmr-calculator', 'macro-calculator']
  },
  {
    slug: 'protein-intake-guide',
    title: 'Protein Intake Guide: How Much Do You Really Need?',
    shortDescription: 'Understand why protein is crucial for health and fitness, how to calculate your ideal intake, and the best sources of lean protein.',
    metaDescription: 'Complete nutritional guide to protein. Learn dietary requirements for building muscle, dropping fat, protein myths, and plant vs animal sources.',
    category: 'Nutrition',
    readTime: '5 min read',
    publishedDate: '2026-05-28',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'importance', text: '1. Why is Protein Vital?' },
      { id: 'requirements', text: '2. Protein Requirements Explained' },
      { id: 'sources', text: '3. High-Quality Sources' },
      { id: 'myths', text: '4. Common Protein Myths' }
    ],
    content: `
      <h2 id="importance" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">1. Why is Protein Vital?</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Protein is the primary building block of the human body. Made of organic compounds called amino acids, it is responsible for constructing and repairing skeletal muscles, manufacturing skin and hair tissues, producing vital hormones and enzymes, and maintaining overall immune function.
      </p>

      <h2 id="requirements" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">2. Protein Requirements Explained</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        The official Recommended Dietary Allowance (RDA) for protein is just <strong>0.8 grams per kilogram</strong> of body weight. However, this is merely the minimum threshold required to prevent severe nutrient deficiency in sedentary adults.
      </p>
      <p class="mb-4 text-gray-600 leading-relaxed">
        For optimal health, athletic performance, and body composition, research recommends significantly more:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Active Individuals / Endurance Sports:</strong> 1.2 to 1.6 g/kg of body weight.</li>
        <li><strong>Strength Athletes / Hypertrophy Training:</strong> 1.6 to 2.2 g/kg of body weight.</li>
        <li><strong>Weight Loss Diet (Calorie Deficit):</strong> 1.8 to 2.4 g/kg of body weight (to protect muscles from being metabolized for energy).</li>
      </ul>

      <h2 id="sources" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">3. High-Quality Sources</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        To hit your protein goals efficiently, focus on dense, nutrient-rich sources:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="border p-4 rounded-lg bg-gray-50">
          <h3 class="font-bold text-gray-800">Animal Sources (Complete Amino Profile)</h3>
          <ul class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            <li>Chicken and turkey breast (31g per 100g)</li>
            <li>Lean beef (26g per 100g)</li>
            <li>Salmon and tuna (25g per 100g)</li>
            <li>Egg whites (11g per 100g)</li>
            <li>Greek yogurt and Cottage cheese (10g per 100g)</li>
          </ul>
        </div>
        <div class="border p-4 rounded-lg bg-gray-50">
          <h3 class="font-bold text-gray-800">Plant Sources (Rich in Fiber)</h3>
          <ul class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            <li>Tempeh and Tofu (15-20g per 100g)</li>
            <li>Lentils and Chickpeas (9g per 100g cooked)</li>
            <li>Seitan (75g per 100g)</li>
            <li>Pumpkin seeds and Almonds (19-25g per 100g)</li>
            <li>Quinoa (4.4g per 100g cooked)</li>
          </ul>
        </div>
      </div>

      <h2 id="myths" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">4. Common Protein Myths</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        <strong>Myth: You can only absorb 30g of protein per meal.</strong> While 30g of fast-acting protein maximizes muscle protein synthesis (MPS) for a few hours, your body can absorb and utilize larger amounts over a longer period for metabolic maintenance and repair.
      </p>
      <p class="mb-4 text-gray-600 leading-relaxed">
        <strong>Myth: High protein diets damage your kidneys.</strong> In healthy people with normal organ function, high protein intakes do not affect kidney health. Only individuals with pre-existing, chronic renal diseases need to restrict protein.
      </p>
    `,
    faqs: [
      {
        id: 'faq-prot-1',
        question: 'Do I need to drink a protein shake immediately after my workout?',
        answer: 'The legendary "30-minute anabolic window" is highly exaggerated. While post-workout nutrition is useful, your total daily protein intake is vastly more critical for muscle repair and fat adaptation than exact, minute-by-minute timing.'
      },
      {
        id: 'faq-prot-2',
        question: 'Are plant proteins as effective as animal proteins for muscle gain?',
        answer: 'Yes, but plant proteins generally have lower levels of essential amino acids (like leucine) and lower bioavailability. Vegans should consume about 10% more total protein and combine varied sources (such as rice and beans) to ensure a complete amino acid profile.'
      }
    ],
    relatedCalculators: ['protein-calculator', 'macro-calculator', 'calorie-calculator']
  },
  {
    slug: 'understanding-body-fat-percentage',
    title: 'Understanding Body Fat Percentage: A Comprehensive Guide',
    shortDescription: 'Learn what body fat percentage is, how to measure it, and how to identify healthy body fat ranges for your body type.',
    metaDescription: 'Practical guide to body fat percentage. Compare measurement methods (US Navy, Calipers, DEXA) and discover target ranges for fitness levels.',
    category: 'Fitness Performance',
    readTime: '6 min read',
    publishedDate: '2026-06-05',
    author: 'Michael Roberts, CSCS',
    toc: [
      { id: 'what-is-bf', text: '1. What is Body Fat Percentage?' },
      { id: 'ranges', text: '2. Healthy Body Fat Ranges' },
      { id: 'methods', text: '3. Measurement Methods Compared' },
      { id: 'reduction', text: '4. How to Safely Reduce Body Fat' }
    ],
    content: `
      <h2 id="what-is-bf" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">1. What is Body Mass/Body Fat Percentage?</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Your body fat percentage is the total weight of your fat tissue divided by your total body weight, expressed as a percentage. This contains two main types of fat:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Essential Fat:</strong> Necessary to cushion organs, insulate your body, protect nerve pathways, and regulate vital reproductive hormones. For survival, men need at least 2-5% and women need 10-13%.</li>
        <li><strong>Storage Fat:</strong> Excess subcutaneous fat (under skin) and visceral fat (around organs) accumulated as stored energy.</li>
      </ul>

      <h2 id="ranges" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">2. Healthy Body Fat Ranges</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Healthy body fat ranges are significantly different for men and women due to biological and hormonal variations:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="border p-4 rounded-lg bg-gray-50">
          <h3 class="font-bold text-gray-800">Men\'s Ranges</h3>
          <ul class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            <li>Essential Fat: 2% – 5%</li>
            <li>Athletes: 6% – 13%</li>
            <li>Fitness: 14% – 17%</li>
            <li>Acceptable/Average: 18% – 24%</li>
            <li>Obese: 25% or higher</li>
          </ul>
        </div>
        <div class="border p-4 rounded-lg bg-gray-50">
          <h3 class="font-bold text-gray-800">Women\'s Ranges</h3>
          <ul class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            <li>Essential Fat: 10% – 13%</li>
            <li>Athletes: 14% – 20%</li>
            <li>Fitness: 21% – 24%</li>
            <li>Acceptable/Average: 25% – 31%</li>
            <li>Obese: 32% or higher</li>
          </ul>
        </div>
      </div>

      <h2 id="methods" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">3. Measurement Methods Compared</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        No method is 100% perfect. Here is how standard options compare:
      </p>
      <ol class="list-decimal list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>DEXA Scan (Clinical Gold Standard):</strong> Highly accurate dual-energy X-ray absorptiometry. Costly ($100+) but details bone density, lean mass, and regional fat.</li>
        <li><strong>US Navy Tape Method:</strong> Highly accessible and free. Relies on height, neck, waist (and hips for women) measurements. Very close to DEXA when measured consistently.</li>
        <li><strong>Skinfold Calipers:</strong> Measures subcutaneous skinfolds. Accurate if performed by an experienced trainer, but prone to human error.</li>
        <li><strong>Bioelectrical Impedance (Smart Scales):</strong> Sends a weak electrical current through your legs. Highly unreliable, heavily affected by hydration levels, and tends to overestimate or underestimate significantly.</li>
      </ol>

      <h2 id="reduction" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">4. How to Safely Reduce Body Fat</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        To lower your body fat percentage, you must burn more energy than you eat while protecting muscle mass:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li>Maintain a modest daily calorie deficit of 300 to 500 calories.</li>
        <li>Consume a high-protein diet (1.8 - 2.2 g/kg of body weight).</li>
        <li>Lift weights 3 to 5 times per week to trigger muscle preservation.</li>
        <li>Focus on deep sleep (7-9 hours) to prevent muscle loss.</li>
      </ul>
    `,
    faqs: [
      {
        id: 'faq-bf-3',
        question: 'Can you lose body fat in just one area (spot reduction)?',
        answer: 'No. Spot reduction is a biological impossibility. Your genetics determine the sequence in which your body fat is mobilized and burned. Fat loss occurs systematically across your entire body over time.'
      },
      {
        id: 'faq-bf-4',
        question: 'Why does body fat look different on different people?',
        answer: 'Two individuals can have the exact same body fat percentage but look completely different. This depends on muscle development, bone frame width, and individual genetic fat distribution.'
      }
    ],
    relatedCalculators: ['body-fat-calculator', 'lean-body-mass-calculator', 'bmi-calculator']
  },
  {
    slug: 'weight-loss-fundamentals',
    title: 'Weight Loss Fundamentals: Science-Backed Strategies',
    shortDescription: 'Uncover the foundational core principles of safe, long-term, and healthy fat loss without suffering or crash dieting.',
    metaDescription: 'Ditch the fads. Learn the actual physical rules of fat loss: energy balance, muscle retention, sleep hygiene, and nutritional consistency.',
    category: 'Weight Management',
    readTime: '6 min read',
    publishedDate: '2026-06-18',
    author: 'Dr. Sarah Jenkins, RD',
    toc: [
      { id: 'energy-balance', text: '1. The Law of Energy Balance' },
      { id: 'fat-vs-weight', text: '2. Fat Loss vs. Weight Loss' },
      { id: 'retention', text: '3. Retaining Muscle is Vital' },
      { id: 'habits', text: '4. Essential Lifestyle Habits' }
    ],
    content: `
      <h2 id="energy-balance" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">1. The Law of Energy Balance</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        At the core of all weight loss lies a physical law: **Thermodynamics**. Weight change is governed by the balance of energy entering your body (via food and drink) and leaving your body (via metabolic processes and movement).
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Caloric Surplus:</strong> Eat more calories than you burn. Excess energy is stored as body glycogen and fat.</li>
        <li><strong>Caloric Deficit:</strong> Consume fewer calories than your TDEE. Your body is forced to mobilize stored body fat and muscle tissue for survival.</li>
      </ul>

      <h2 id="fat-vs-weight" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">2. Fat Loss vs. Weight Loss</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Many people obsess over dropping weight on the scale, but the real target is **fat loss**. Scale weight includes bones, muscles, vital organs, blood, food digests, glycogen, and water weight. 
      </p>
      <p class="mb-4 text-gray-600 leading-relaxed">
        A crash diet with extreme starvation triggers rapid scale drops, but this is largely water loss and the catabolic destruction of precious muscle tissue, leading to a slower metabolism and high likelihood of weight rebound.
      </p>

      <h2 id="retention" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">3. Retaining Muscle is Vital</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Muscle mass is your metabolic engine. The more muscle tissue you have, the more calories you burn, even at rest. To ensure you lose fat rather than muscle:
      </p>
      <ol class="list-decimal list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Eat plenty of protein:</strong> Target around 1.6 to 2.2g of protein per kilogram of body weight.</li>
        <li><strong>Perform strength training:</strong> Resistance training tells your brain that muscles are actively needed, protecting them from catabolism.</li>
        <li><strong>Avoid extreme deficits:</strong> Restricting calories too heavily causes the body to degrade muscular tissues rapidly.</li>
      </ol>

      <h2 id="habits" class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">4. Essential Lifestyle Habits</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">
        Successful fat loss is 20% mechanics and 80% behavioral execution. Optimize these foundations:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-gray-600">
        <li><strong>Sleep 7-9 Hours:</strong> Sleep restriction spikes cortisol and ghrelin (the hunger hormone), triggering sugar cravings and causing up to 50% more muscle loss during deficits.</li>
        <li><strong>Hydrate well:</strong> Drink water before meals to increase satiety and support cellular fat metabolism.</li>
        <li><strong>Fulfill your steps:</strong> Maintain high Non-Exercise Activity (NEAT) by getting up and walking frequently throughout the day.</li>
      </ul>
    `,
    faqs: [
      {
        id: 'faq-loss-1',
        question: 'Which diet is best for fat loss?',
        answer: 'The "best" diet is the one you can stick to consistently. Keto, Paleo, intermittent fasting, and Mediterranean diets all work by creating a calorie deficit. Find a diet structured with high-protein and unprocessed foods that fits your lifestyle.'
      },
      {
        id: 'faq-loss-2',
        question: 'Why has my weight loss plateaued?',
        answer: 'If your weight hasn\'t changed in 3-4 weeks, you are likely eating at maintenance. As you lose weight, your BMR decreases. You may also be moving less unconsciously (lower NEAT), or tracking calories inaccurately. Re-calculate your needs and check your food portions.'
      }
    ],
    relatedCalculators: ['calorie-calculator', 'bmi-calculator', 'macro-calculator']
  },
  ...CLUSTER_GUIDES
];
