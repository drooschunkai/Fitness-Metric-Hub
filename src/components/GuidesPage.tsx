import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GUIDES } from '../data/guides';
import AdPlaceholder from './AdPlaceholder';
import { 
  BookOpen, Scale, Apple, Dumbbell, Activity, ShieldCheck, Heart, Sparkles, ArrowRight, Search, Baby, Hourglass
} from 'lucide-react';
import { GuideArticle } from '../types';

interface GuidesPageProps {
  onNavigate: (path: string) => void;
}

const filterCategories = [
  { id: 'all', label: 'All Guides', rawNames: [] },
  { id: 'weight-management', label: 'Weight Management', rawNames: ['weight management'] },
  { id: 'nutrition', label: 'Nutrition & Macros', rawNames: ['nutrition'] },
  { id: 'body-composition', label: 'Body Composition', rawNames: ['body composition'] },
  { id: 'fitness-performance', label: 'Fitness Performance', rawNames: ['fitness performance', 'performance', 'strength training', 'hydration'] },
  { id: 'pregnancy', label: 'Pregnancy & Life Stages', rawNames: ['womens-health', 'pregnancy', 'pregnancy & life stages'] },
  { id: 'longevity', label: 'Longevity & Aging', rawNames: ['longevity'] }
];

export default function GuidesPage({ onNavigate }: GuidesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter based on selected category and search query
  const filteredGuides = GUIDES.filter((guide) => {
    let matchesCategory = false;
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else {
      const catConfig = filterCategories.find(c => c.id === selectedCategory);
      if (catConfig) {
        matchesCategory = catConfig.rawNames.includes(guide.category.toLowerCase().trim());
      }
    }

    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categoriesOverview = [
    {
      id: 'weight-management',
      title: "Weight Management",
      introduction: "Sustainable body weight management is rooted in behavioral science and accurate metabolic measurements. Our peer-reviewed guides provide the metabolic logic behind caloric deficits, healthy weight loss timelines, and the biological rules of energy balance.",
      benefits: [
        "Understand calorie deficits and surplus pathways",
        "Discover how body weight is physiologically regulated",
        "Learn how to break fat loss plateaus scientifically"
      ],
      closing: "Empower your fitness transformation with reliable, medically-validated guidance.",
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
      introduction: "Macronutrient partitioning and dietary optimization dictate muscle recovery, metabolic efficiency, and general health longevity. Learn how to calculate perfect daily protein targets, allocate optimal carbohydrates, and establish healthy dietary fiber standards.",
      benefits: [
        "Optimize daily protein intake by activity goals",
        "Balance essential fats, complex carbs, and micro-nutrients",
        "Select the highest-quality, bioavailable nutrient sources"
      ],
      closing: "Build an optimized diet with solid scientific foundations.",
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
      introduction: "Beyond the scale, your exact body composition—the ratio of adipose tissue to lean skeletal muscle—is the true marker of athletic and general physical wellness. Access insights on body fat percentage standards, lean mass protection, and fat-free mass indices.",
      benefits: [
        "Learn the difference between subcutaneous and visceral fats",
        "Understand FFMI (Fat-Free Mass Index) standards",
        "Preserve lean tissue during calorie restriction phases"
      ],
      closing: "Adopt a body-composition first mindset to build a healthier, stronger body.",
      links: [
        { label: "Body Fat Calculator", path: "/calculators/body-fat-calculator" },
        { label: "Lean Body Mass Calculator", path: "/calculators/lean-body-mass-calculator" },
        { label: "FFMI Calculator", path: "/calculators/ffmi-calculator" }
      ],
      icon: Dumbbell,
    },
    {
      id: 'fitness-performance',
      title: "Fitness Performance",
      introduction: "Cardiovascular endurance and muscular strength are key indicators of physical fitness. Our performance guides cover the science of VO2 max, running pace zones, progressive overload models, and athletic hydration/electrolyte balance.",
      benefits: [
        "Optimize aerobic capacity with VO2 max protocols",
        "Implement progressive overload pathways in strength training",
        "Maximize workout recovery with targeted fluid and sodium replenishment"
      ],
      closing: "Unlock your body's peak performance potential with professional athletic principles.",
      links: [
        { label: "BMR Calculator", path: "/calculators/bmr-calculator" },
        { label: "Walking Calories Calculator", path: "/calculators/walking-calories-calculator" },
        { label: "One Rep Max Calculator", path: "/calculators/one-rep-max-calculator" }
      ],
      icon: Activity,
    },
    {
      id: 'pregnancy',
      title: "Pregnancy & Life Stages",
      introduction: "Hormonal changes and reproductive phases fundamentally alter nutritional, weight-management, and cardiovascular needs. Our clinical literature aims to guide maternal wellness, postpartum recovery, and biological cycle tracking safely.",
      benefits: [
        "Understand maternal BMI and weight-gain guidelines",
        "Track physiological and hormonal transition requirements",
        "Optimize nutrition and activity safely across life stages"
      ],
      closing: "Manage life's transitions with evidence-based wellness insights.",
      links: [
        { label: "Pregnancy Weight Gain", path: "/calculators/pregnancy-weight-gain-calculator" },
        { label: "Pregnancy BMI", path: "/calculators/pregnancy-bmi-calculator" },
        { label: "Due Date Calculator", path: "/calculators/due-date-calculator" }
      ],
      icon: Baby,
    },
    {
      id: 'longevity',
      title: "Longevity & Aging",
      introduction: "Maintaining physical capability, joint mobility, cardiovascular health, and cognitive function as we age requires proactive lifestyle changes. Our longevity guides explore active aging scores, strength preservation, and metabolic health restoration.",
      benefits: [
        "Discover lifestyle factors that slow biological aging",
        "Learn resistance training patterns for lifelong bone density",
        "Maintain insulin sensitivity and metabolic flexibility"
      ],
      closing: "Extend your healthspan alongside your lifespan through science-based habits.",
      links: [
        { label: "Biological Age", path: "/calculators/biological-age-calculator" },
        { label: "Resting Heart Rate", path: "/calculators/resting-heart-rate-calculator" },
        { label: "Life Expectancy", path: "/calculators/life-expectancy-calculator" }
      ],
      icon: Hourglass,
    }
  ];

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300" id="guides-page-root">
      
      {/* 1. PAGE HEADER HERO */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100/60 dark:border-emerald-900/30">
          <BookOpen className="h-3 w-3" />
          <span>Health & Fitness Guides Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Evidence-Based Health Literature
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Explore our collection of peer-reviewed, medically validated guides. Learn the science of weight control, macro optimization, cardio endurance, and strength development with clinical precision.
        </p>
      </div>

      {/* 2. SEARCH & FILTER DOCK */}
      <div className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 p-6 rounded-2xl space-y-5 shadow-xs" id="search-filter-dock">
        {/* Search Bar on Top */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search through all guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium shadow-2xs"
              id="guide-page-search"
            />
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Categories in a Single horizontal scrollable Lane */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex flex-nowrap gap-1.5 p-1 bg-slate-200/50 dark:bg-gray-950 border border-slate-200/50 dark:border-gray-800 rounded-xl w-max mx-auto min-w-full xl:min-w-0 justify-start xl:justify-center">
            {filterCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-gray-900/40'
                  }`}
                  id={`guide-page-tab-${cat.id}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. GUIDES LISTING GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-850 dark:text-white flex items-center gap-2">
            <BookOpen className="h-4.5 w-4.5 text-emerald-500" />
            <span>Matching Articles ({filteredGuides.length})</span>
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

        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200" id="guides-page-grid">
            {filteredGuides.map((guide) => (
              <div
                key={guide.slug}
                className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-950 transition-all shadow-sm"
                id={`guide-card-${guide.slug}`}
              >
                <div className="space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 block">
                    {guide.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed text-justify">
                    {guide.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-900 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold">{guide.readTime} • {guide.author}</span>
                  <button
                    onClick={() => onNavigate(`/guides/${guide.slug}`)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                    id={`guide-card-btn-${guide.slug}`}
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-gray-900/10 border border-slate-200 dark:border-gray-800 rounded-2xl">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3 animate-bounce" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No guides match your filter criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Try entering a different keyword or choosing another category tab.</p>
          </div>
        )}
      </div>

      {/* AD PLACEMENT MIDDLE */}
      <AdPlaceholder type="in-content" />

      {/* 4. FITNESS GUIDE CATEGORIES DETAILED CORNER */}
      <section className="space-y-8 pt-6" id="categories-detailed-overview">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Insights By Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Read expert-curated explanations and find mathematically integrated diagnostic utilities for each health category.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categoriesOverview.map((category) => {
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
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Key Topics Covered:</span>
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
                    Suggested Diagnostic Tools
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
