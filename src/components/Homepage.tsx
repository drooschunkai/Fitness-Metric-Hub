import React, { useState } from 'react';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';
import CalculatorCard from './CalculatorCard';
import AdPlaceholder from './AdPlaceholder';
import SearchBar from './SearchBar';
import { 
  Activity, Scale, Apple, Dumbbell, ShieldCheck, Zap, Smartphone, 
  ArrowRight, Sparkles, BookOpen, Mail, Send, Check, Droplets, Flame,
  ChevronDown, ChevronUp
} from 'lucide-react';

interface HomepageProps {
  onNavigate: (path: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Snapshot Metrics Count Up State Animation
  const [metrics, setMetrics] = React.useState({
    bmi: 15.0,
    calories: 1200,
    protein: 80,
    water: 1.0,
    bodyFat: 10,
  });

  React.useEffect(() => {
    let start = 0;
    const end = 50;
    const duration = 1200; // 1.2s smooth animation
    const stepTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start++;
      const progress = start / end;
      const ease = 1 - Math.pow(1 - progress, 3); // Smooth cubic ease-out

      setMetrics({
        bmi: parseFloat((18.0 + (22.4 - 18.0) * ease).toFixed(1)),
        calories: Math.round(1500 + (2350 - 1500) * ease),
        protein: Math.round(100 + (155 - 100) * ease),
        water: parseFloat((1.5 + (3.1 - 1.5) * ease).toFixed(1)),
        bodyFat: Math.round(28 - (28 - 18) * ease)
      });

      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const handleExploreClick = () => {
    onNavigate('/calculators');
  };

  const trustIndicators = [
    "10+ Free Fitness Calculators",
    "Science-Based Formulas",
    "Instant Results",
    "Mobile Friendly"
  ];

  const popularCalculators = [
    { title: "BMI Calculator", path: "/calculators/bmi-calculator" },
    { title: "Calorie Calculator", path: "/calculators/calorie-calculator" },
    { title: "Protein Calculator", path: "/calculators/protein-calculator" },
    { title: "Macro Calculator", path: "/calculators/macro-calculator" },
    { title: "Body Fat Calculator", path: "/calculators/body-fat-calculator" }
  ];

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300" id="homepage-root">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-gray-900 py-12 md:py-20" id="hero-landmark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: Hero Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Trust Pill Announcement Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100/60 dark:border-emerald-900/30">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>Premium Fitness & Diet Modeling Suite</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
                Free Fitness Calculators for Smarter Health & Nutrition Decisions
              </h1>

              {/* Subheadline Description */}
              <p className="text-sm sm:text-base text-black dark:text-white leading-relaxed max-w-2xl">
                Calculate BMI, calories, protein intake, body fat percentage, macros, water needs, and more using science-backed fitness formulas. Fast, accurate, and completely free.
              </p>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExploreClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer text-sm"
                  id="hero-cta-btn"
                >
                  <span>Explore Calculators</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigate('/calculators/bmi-calculator')}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-250 font-bold py-2.5 px-5 rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer text-sm dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800"
                  id="hero-secondary-btn"
                >
                  <span>Calculate BMI</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {trustIndicators.map((item, index) => (
                    <div 
                      key={index} 
                      className="inline-flex items-center gap-1 bg-slate-50 dark:bg-gray-900 border border-slate-150 dark:border-gray-800/80 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 shadow-xs"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom SEO Search bar integrated in Column */}
              <div className="space-y-3 max-w-xl pt-4">
                <label htmlFor="search-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quick Calculators Search
                </label>
                <SearchBar 
                  onNavigate={onNavigate} 
                  placeholder="Search calculators..." 
                  className="w-full shadow-xs"
                />
              </div>

              {/* Popular Searches */}
              <div className="space-y-2 max-w-xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Popular Calculators
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularCalculators.map((calc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigate(calc.path)}
                      className="bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 dark:bg-gray-900 dark:hover:bg-emerald-950/20 dark:text-gray-300 dark:hover:text-emerald-400 border border-slate-200 dark:border-gray-800 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                      id={`popular-calc-chip-${idx}`}
                    >
                      {calc.title}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Dashboard Card Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-15 dark:opacity-20 animate-pulse"></div>
              
              <div className="relative bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                
                {/* Dashboard Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800 dark:text-white text-base">Fitness Snapshot</h2>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase">Clinically Modeled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>Status: Healthy</span>
                  </div>
                </div>

                {/* Grid Layout of Snapshot Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* BMI Widget */}
                  <div className="bg-slate-50 dark:bg-gray-950/40 border border-slate-150 dark:border-gray-800/80 p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">BMI</span>
                      <Scale className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{metrics.bmi}</span>
                      <span className="text-xs text-slate-400 font-medium">kg/m²</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/60 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (metrics.bmi / 35) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">Perfect Balance</span>
                  </div>

                  {/* Calories Widget */}
                  <div className="bg-slate-50 dark:bg-gray-950/40 border border-slate-150 dark:border-gray-800/80 p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Calories</span>
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{metrics.calories.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-medium">kcal</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/60 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (metrics.calories / 3000) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-orange-500 font-bold uppercase tracking-wider">Target Metabolic Rate</span>
                  </div>

                  {/* Protein Widget */}
                  <div className="bg-slate-50 dark:bg-gray-950/40 border border-slate-150 dark:border-gray-800/80 p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Protein</span>
                      <Apple className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{metrics.protein}g</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/60 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (metrics.protein / 200) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-blue-500 font-bold uppercase tracking-wider">Lean Muscle Mass</span>
                  </div>

                  {/* Water Needs Widget */}
                  <div className="bg-slate-50 dark:bg-gray-950/40 border border-slate-150 dark:border-gray-800/80 p-4 rounded-2xl flex flex-col justify-between space-y-3 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Water Needs</span>
                      <Droplets className="h-3.5 w-3.5 text-sky-500" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{metrics.water}L</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/60 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (metrics.water / 4) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-sky-500 font-bold uppercase tracking-wider">Optimal Hydration</span>
                  </div>

                  {/* Body Fat Ratio Wide Slider widget */}
                  <div className="col-span-2 bg-slate-50 dark:bg-gray-950/40 border border-slate-150 dark:border-gray-800/80 p-4 rounded-2xl flex items-center justify-between hover:scale-[1.01] transition-transform duration-300">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Body Fat Ratio</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{metrics.bodyFat}%</span>
                        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">Athletic Baseline</span>
                      </div>
                    </div>
                    <div className="w-16 h-16 relative flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
                        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="4.5" className="text-slate-200/70 dark:text-gray-800" fill="transparent" />
                        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="4.5" strokeDasharray={`${2 * Math.PI * 26}`} strokeDashoffset={`${2 * Math.PI * 26 * (1 - metrics.bodyFat / 100)}`} className="text-emerald-500 transition-all duration-300" fill="transparent" strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-[10px] font-bold text-slate-700 dark:text-white">{metrics.bodyFat}%</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: POPULAR FITNESS CALCULATORS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="popular-calculators-section">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Fitness Calculators
          </h2>
          <p className="text-sm text-black dark:text-white mt-1.5 max-w-2xl">
            Explore our most popular and scientifically validated fitness calculators. Get instant body mass index estimation, calorie expenditure calculation, and macro distributions with zero subscriptions or sign-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "BMI Calculator",
              slug: "bmi-calculator",
              category: "weight-management",
              shortDescription: "Check your body mass index (BMI) immediately to determine if your body weight falls within healthy clinical ranges relative to your height."
            },
            {
              title: "Calorie Calculator",
              slug: "calorie-calculator",
              category: "nutrition",
              shortDescription: "Calculate your daily calorie needs and total daily energy expenditure (TDEE) based on science-backed metabolic rate formulas."
            },
            {
              title: "Protein Intake Calculator",
              slug: "protein-calculator",
              category: "nutrition",
              shortDescription: "Estimate your optimal daily protein requirements in grams to build lean muscle mass, protect metabolic activity, and optimize recovery."
            },
            {
              title: "Body Fat Calculator",
              slug: "body-fat-calculator",
              category: "weight-management",
              shortDescription: "Estimate your precise body fat percentage and lean tissue weight using the standardized US Navy body circumference formulas."
            },
            {
              title: "Macro Calculator",
              slug: "macro-calculator",
              category: "nutrition",
              shortDescription: "Optimize your physical nutrition plan by calculating your ideal daily macronutrient split of protein, carbohydrates, and fats."
            },
            {
              title: "Water Intake Calculator",
              slug: "water-calculator",
              category: "nutrition",
              shortDescription: "Determine your recommended daily water hydration requirements in liters or ounces to sustain peak cellular function and health."
            }
          ].map((p) => {
            const original = CALCULATORS.find(c => c.slug === p.slug);
            if (!original) return null;
            const config = { ...original, ...p } as any;
            return (
              <CalculatorCard
                key={config.slug}
                config={config}
                onNavigate={onNavigate}
              />
            );
          })}
        </div>

        <div className="flex justify-center pt-6">
          <button
            onClick={() => onNavigate('/calculators')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-lg cursor-pointer text-sm"
            id="view-all-calculators-btn"
          >
            <span>Explore All 10+ Calculators</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* SECTION 2: FITNESS CALCULATOR CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="calculator-categories-section">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fitness Calculator Categories
          </h2>
          <p className="text-sm text-black dark:text-white mt-1.5 max-w-2xl">
            Sift through our specialized health estimation categories to formulate your metabolic, performance, or dietary strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: "Weight Management",
              introduction: "Weight management calculators help estimate healthy body metrics and calorie requirements. Accurate tracking of body mass index (BMI) is fundamental for understanding your current metabolic status and health risks. Our advanced algorithms integrate your physical indicators to calculate precise calorie targets necessary for sustainable maintenance, fat reduction, or healthy mass gain.",
              benefits: [
                "Calculate BMI relative to height",
                "Estimate healthy weight ranges",
                "Plan realistic weight-loss goals"
              ],
              closing: "Use these science-backed tools to establish progressive body parameters and make informed health decisions.",
              links: [
                { label: "BMI Calculator", path: "/calculators/bmi-calculator" },
                { label: "Calorie Calculator", path: "/calculators/calorie-calculator" },
                { label: "Ideal Weight Calculator", path: "/calculators/ideal-weight-calculator" }
              ],
              icon: Scale,
            },
            {
              title: "Nutrition & Macros",
              introduction: "Proper nutrition and macro distribution are key physiological factors in body reconstruction, muscle protein synthesis, and cognitive energy preservation. Our specialized macro estimators break down your precise dietary composition into grams of protein, lipids, and carbohydrates tailored to your custom activity profiles and training methodologies.",
              benefits: [
                "Optimize daily protein intake",
                "Calculate macronutrient distributions",
                "Determine ideal hydration targets"
              ],
              closing: "Fuel your daily activities, accelerate recovery, and support long-term metabolic health with zero nutritional deficits.",
              links: [
                { label: "Protein Calculator", path: "/calculators/protein-calculator" },
                { label: "Macro Calculator", path: "/calculators/macro-calculator" },
                { label: "Water Intake Calculator", path: "/calculators/water-calculator" }
              ],
              icon: Apple,
            },
            {
              title: "Body Composition",
              introduction: "Tracking changes in adipose tissue versus lean skeletal muscle provides a highly accurate reflection of fitness progress compared to standard scale weight alone. Our body composition estimators utilize recognized clinical models, including the US Navy Circumference regression formula, to help you understand your muscular development and structural fitness status.",
              benefits: [
                "Estimate precise body fat percentage",
                "Calculate lean body mass ratio",
                "Monitor skeletal mass percentages"
              ],
              closing: "Achieve a data-driven understanding of your muscular development and overall physiological health markers.",
              links: [
                { label: "Body Fat Calculator", path: "/calculators/body-fat-calculator" },
                { label: "Lean Body Mass Calculator", path: "/calculators/lean-body-mass-calculator" }
              ],
              icon: Dumbbell,
            },
            {
              title: "Fitness Performance",
              introduction: "Your basal metabolic rate (BMR) represents the foundational caloric baseline required to sustain vital organ functions at complete rest. Integrating your active metrics with specific metabolic equivalent of task (MET) values during activities like walking, jogging, or weightlifting allows for perfect metabolic synchronization and clinical training precision.",
              benefits: [
                "Determine baseline BMR expenditure",
                "Estimate calorie burn during activities",
                "Analyze MET cardiovascular conditioning"
              ],
              closing: "Sync your physical energy cost with recovery meals to maximize performance and prevent athletic overtraining.",
              links: [
                { label: "BMR Calculator", path: "/calculators/bmr-calculator" },
                { label: "Walking Calories Calculator", path: "/calculators/walking-calories-calculator" }
              ],
              icon: Activity,
            }
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="bg-slate-50/50 dark:bg-gray-900/35 border border-slate-150 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 hover:shadow-xs transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl text-emerald-600 shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="text-xs text-black dark:text-white space-y-3 leading-relaxed">
                    <p className="text-justify">{category.introduction}</p>
                    <div className="py-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Key Benefits:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-black dark:text-white">
                        {category.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="italic text-black dark:text-white">{category.closing}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/50 dark:border-gray-850">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">
                    Explore Included Calculators
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.path}
                        onClick={(e) => { e.preventDefault(); onNavigate(link.path); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-xs font-semibold text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 border border-slate-200 dark:border-gray-800 rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: WHY TRUST FITMETRICSHUB */}
      <section className="bg-slate-50/60 dark:bg-gray-900/10 border-y border-slate-150 dark:border-gray-900 py-16" id="why-trust-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Trust FitMetricsHub?
            </h2>
            <p className="text-sm text-black dark:text-white max-w-2xl mx-auto leading-relaxed">
              Our calculators are built using widely accepted scientific formulas and industry-standard methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                title: "Science-Based Formulas",
                description: "All calculations use recognized formulas such as BMI, Mifflin-St Jeor, Hamwi, and US Navy methods.",
                icon: ShieldCheck,
              },
              {
                title: "Fast & Accurate Results",
                description: "Get instant calculations without creating an account or storing sensitive details.",
                icon: Zap,
              },
              {
                title: "Mobile Friendly",
                description: "Use all our calculators flawlessly across desktop, tablet, or mobile devices on-the-go.",
                icon: Smartphone,
              },
              {
                title: "Always Free",
                description: "Access all features and calculators completely without any hidden subscriptions or fees.",
                icon: Sparkles,
              },
              {
                title: "Educational Resources",
                description: "Every single calculator includes detailed scientific explanations, raw formulas, and guidance.",
                icon: BookOpen,
              }
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4 hover:scale-[1.01] transition-transform duration-300"
                >
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/25 text-emerald-600 rounded-xl w-fit">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                    {card.title}
                  </h3>
                  <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AD PLACEMENT #1 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder type="top-banner" />
      </div>

      {/* SECTION 4: FEATURED GUIDES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="featured-guides-section">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fitness & Nutrition Guides
          </h2>
          <p className="text-sm text-black dark:text-white mt-1.5 max-w-2xl">
            Learn the science behind the numbers and make informed health decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              slug: 'what-is-bmi',
              title: 'What Is BMI?',
              category: 'Weight Management',
              excerpt: 'Understand BMI, how it is calculated, and what your result means.',
              readTime: '5 min read',
              author: 'FitMetrics Medical Advisory Board'
            },
            {
              slug: 'how-many-calories-should-i-eat',
              title: 'Understanding BMR',
              category: 'Nutrition',
              excerpt: 'Learn how your Basal Metabolic Rate affects calorie requirements.',
              readTime: '6 min read',
              author: 'FitMetrics Medical Advisory Board'
            },
            {
              slug: 'weight-loss-fundamentals',
              title: 'Daily Calorie Needs Explained',
              category: 'Weight Management',
              excerpt: 'Find out how many calories you should consume each day.',
              readTime: '7 min read',
              author: 'FitMetrics Medical Advisory Board'
            },
            {
              slug: 'protein-intake-guide',
              title: 'Protein Intake Guide',
              category: 'Nutrition',
              excerpt: 'How much protein do you need for muscle gain or weight loss?',
              readTime: '7 min read',
              author: 'FitMetrics Medical Advisory Board'
            },
            {
              slug: 'understanding-body-fat-percentage',
              title: 'Understanding Body Fat Percentage',
              category: 'Body Composition',
              excerpt: 'Learn how body fat is measured and why it matters.',
              readTime: '6 min read',
              author: 'FitMetrics Medical Advisory Board'
            }
          ].map((item) => {
            return (
              <div
                key={item.slug}
                className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-950 transition-all shadow-sm"
                id={`home-guide-card-${item.slug}`}
              >
                <div className="space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 block">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-black dark:text-white line-clamp-3 leading-relaxed text-justify">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-900 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold">{item.readTime} • {item.author}</span>
                  <a
                    href={`/guides/${item.slug}`}
                    onClick={(e) => { e.preventDefault(); onNavigate(`/guides/${item.slug}`); }}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                    id={`home-guide-card-btn-${item.slug}`}
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-slate-800 text-white rounded-2xl p-8 md:p-12 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Subtle design circles */}
          <div className="absolute bottom-[-2rem] right-[-2rem] w-32 h-32 bg-emerald-500/10 rounded-full pointer-events-none" />

          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-700 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
              <Mail className="h-3 w-3" /> Monthly Newsletter
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Get Scientific Health Templates Straight to Your Inbox
            </h2>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed text-justify">
              Subscribe to receive monthly metabolic recipes, carbohydrate schedules, and direct access to new calculative widgets. Zero spam, unsubscribe anytime.
            </p>
          </div>

          <div className="w-full max-w-sm shrink-0">
            {newsletterSubscribed ? (
              <div className="p-4 bg-slate-750 border border-slate-700 rounded-xl text-center space-y-1 animate-in zoom-in-95">
                <Check className="h-6 w-6 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-white text-sm">Successfully Subscribed!</h3>
                <p className="text-[10px] text-slate-300">Please check your inbox for our initial wellness starter guide.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm w-full"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-lg transition-all cursor-pointer text-sm shadow-xs flex items-center justify-center gap-1"
                  id="newsletter-submit-btn"
                >
                  <Send className="h-4 w-4" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOMEPAGE FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="faq-section">
        <div className="border border-slate-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-950 p-6 md:p-8 shadow-sm space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-black dark:text-white mt-1">
              Got questions? We have answers. Find out how to use our tools and get the most out of your fitness journey.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What formulas do your calculators use?",
                a: "Our calculators use industry-standard, scientifically validated formulas. For example, the Calorie Calculator uses the Mifflin-St Jeor equation (known for its high accuracy), the BMR Calculator uses the Harris-Benedict equation, and the Body Fat Calculator relies on the US Navy Circumference method. This ensures that you receive the most precise and reliable estimations possible."
              },
              {
                q: "Are the calculators accurate?",
                a: "While our calculators are based on highly regarded scientific equations, they should be treated as estimations. Individual metabolic rates, body compositions, and activity levels vary. These tools provide an excellent baseline for planning, but they are not a substitute for professional medical advice or clinical assessments."
              },
              {
                q: "How often should I recalculate my metrics?",
                a: "We recommend recalculating your metrics every 2-4 weeks or whenever you experience a significant change in your weight, activity level, or fitness goals. Your body adapts to changes in diet and exercise, so updating your parameters ensures your plans remain aligned with your current physical state."
              },
              {
                q: "Is my personal data safe?",
                a: "Absolutely. FitMetricsHub does not store, share, or sell your personal or physical data. All calculations are performed instantly in your browser, and no user input is retained on our servers. Your privacy is our absolute priority."
              },
              {
                q: "Can I use these calculators for weight loss?",
                a: "Yes! Our calculators are excellent tools for managing weight loss. You can use the Calorie and Macro calculators to establish a safe calorie deficit, calculate your macronutrient distribution, and set progressive targets. Remember to consult a medical professional before starting any extreme calorie restriction or training regimen."
              },
              {
                q: "Do you offer personalized coaching?",
                a: "While we do not provide one-on-one personal coaching directly through the platform, we offer comprehensive, scientifically backed guides, educational resources, and standard fitness frameworks to help you self-direct your training and nutrition. We also feature trusted, high-quality sponsored services to help you reach your goals."
              }
            ].map((item, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-slate-50/10 dark:bg-gray-900/10 transition-colors duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-gray-900/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-expanded={isExpanded}
                    id={`faq-btn-${idx}`}
                  >
                    <span>{item.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-emerald-600 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 hover:text-emerald-600 transition-transform duration-200" />
                    )}
                  </button>

                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'max-h-[30rem] opacity-100 border-t border-slate-200 dark:border-gray-800 p-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs text-black dark:text-white leading-relaxed text-justify">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://fitmetricshub.com/#organization",
                "name": "FitMetricsHub",
                "url": "https://fitmetricshub.com",
                "logo": "https://fitmetricshub.com/logo.png",
                "sameAs": []
              },
              {
                "@type": "WebSite",
                "@id": "https://fitmetricshub.com/#website",
                "url": "https://fitmetricshub.com",
                "name": "FitMetricsHub",
                "description": "Calculate BMI, calories, protein intake, body fat, macros, water needs and more using science-backed formulas. Fast, accurate, and completely free.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://fitmetricshub.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://fitmetricshub.com/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://fitmetricshub.com"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://fitmetricshub.com/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What formulas do your calculators use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our calculators use industry-standard, scientifically validated formulas. For example, the Calorie Calculator uses the Mifflin-St Jeor equation (known for its high accuracy), the BMR Calculator uses the Harris-Benedict equation, and the Body Fat Calculator relies on the US Navy Circumference method. This ensures that you receive the most precise and reliable estimations possible."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are the calculators accurate?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "While our calculators are based on highly regarded scientific equations, they should be treated as estimations. Individual metabolic rates, body compositions, and activity levels vary. These tools provide an excellent baseline for planning, but they are not a substitute for professional medical advice or clinical assessments."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How often should I recalculate my metrics?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We recommend recalculating your metrics every 2-4 weeks or whenever you experience a significant change in your weight, activity level, or fitness goals. Your body adapts to changes in diet and exercise, so updating your parameters ensures your plans remain aligned with your current physical state."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is my personal data safe?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely. FitMetricsHub does not store, share, or sell your personal or physical data. All calculations are performed instantly in your browser, and no user input is retained on our servers. Your privacy is our absolute priority."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I use these calculators for weight loss?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! Our calculators are excellent tools for managing weight loss. You can use the Calorie and Macro calculators to establish a safe calorie deficit, calculate your macronutrient distribution, and set progressive targets. Remember to consult a medical professional before starting any extreme calorie restriction or training regimen."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer personalized coaching?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "While we do not provide one-on-one personal coaching directly through the platform, we offer comprehensive, scientifically backed guides, educational resources, and standard fitness frameworks to help you self-direct your training and nutrition. We also feature trusted, high-quality sponsored services to help you reach your goals."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />

    </div>
  );
}
