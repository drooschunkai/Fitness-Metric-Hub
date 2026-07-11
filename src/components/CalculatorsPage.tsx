import React, { useState } from 'react';
import { CALCULATORS } from '../data/calculators';
import CalculatorCard from './CalculatorCard';
import AdPlaceholder from './AdPlaceholder';
import SearchBar from './SearchBar';
import { 
  Activity, Scale, Apple, Dumbbell, Sparkles, ArrowRight, BookOpen, Search
} from 'lucide-react';

interface CalculatorsPageProps {
  onNavigate: (path: string) => void;
}

export default function CalculatorsPage({ onNavigate }: CalculatorsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weight-management' | 'nutrition' | 'fitness-performance' | 'body-composition' | 'hydration-health' | 'endurance-performance' | 'strength-training' | 'womens-health' | 'longevity'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter based on both category selection and search query
  const filteredCalculators = CALCULATORS.filter((calc) => {
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    {
      id: 'weight-management',
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
      id: 'nutrition',
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
      id: 'body-composition',
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
      id: 'fitness-performance',
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
  ];

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300" id="calculators-page-root">
      
      {/* 1. PAGE HEADER HERO */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100/60 dark:border-emerald-900/30">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Interactive Calculators Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Complete Health & Fitness Estimators
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Access our suite of scientifically validated calculators. Instantly analyze your body mass index, basal metabolic rate, water hydration thresholds, target daily protein, and macronutrient distributions for free.
        </p>
      </div>

      {/* 2. SEARCH & FILTER DOCK */}
      <div className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 p-6 rounded-2xl space-y-5 shadow-xs" id="search-filter-dock">
        {/* Search Bar on Top */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search through all estimators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium shadow-2xs"
              id="calculator-page-search"
            />
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Categories in a Single horizontal scrollable Lane */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex flex-nowrap gap-1.5 p-1 bg-slate-200/50 dark:bg-gray-950 border border-slate-200/50 dark:border-gray-800 rounded-xl w-max mx-auto min-w-full md:min-w-0 justify-start md:justify-center">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'weight-management', label: 'Weight' },
              { id: 'nutrition', label: 'Nutrition' },
              { id: 'fitness-performance', label: 'Performance' },
              { id: 'body-composition', label: 'Composition' },
              { id: 'hydration-health', label: 'Hydration' },
              { id: 'endurance-performance', label: 'Running' },
              { id: 'strength-training', label: 'Strength' },
              { id: 'womens-health', label: 'Women\'s' },
              { id: 'longevity', label: 'Longevity' }
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-gray-900/40'
                  }`}
                  id={`calc-page-tab-${cat.id}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. CALCULATORS LISTING GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-850 dark:text-white flex items-center gap-2">
            <Activity className="h-4.5 w-4.5 text-emerald-500" />
            <span>Matching Calculators ({filteredCalculators.length})</span>
          </h2>
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200" id="calculators-page-grid">
            {filteredCalculators.map((calc) => (
              <CalculatorCard
                key={calc.slug}
                config={calc}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-gray-900/10 border border-slate-200 dark:border-gray-800 rounded-2xl">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-bounce" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No calculators match your filter criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Try entering a different keyword or choosing "All Tools" category.</p>
          </div>
        )}
      </div>

      {/* AD PLACEMENT MIDDLE */}
      <AdPlaceholder type="in-content" />

      {/* 4. FITNESS CALCULATOR CATEGORIES DETAILED CORNER */}
      <section className="space-y-8 pt-6" id="categories-detailed-overview">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Fitness Categories Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Review detailed medical & sports-science descriptions for each health tracking perspective.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                className="bg-slate-50/50 dark:bg-gray-900/30 border border-slate-200 dark:border-gray-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 hover:shadow-xs transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl text-emerald-600 shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
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

                <div className="pt-4 border-t border-slate-200/50 dark:border-gray-800/80">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">
                    Jump Direct to Included Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.links.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigate(link.path)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-xs font-semibold text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 border border-slate-200 dark:border-gray-850 rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AD PLACEMENT BOTTOM (RELOCATED FROM TOP) */}
      <div className="pt-6">
        <AdPlaceholder type="top-banner" />
      </div>

    </div>
  );
}
