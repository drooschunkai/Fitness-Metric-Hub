import React, { useState } from 'react';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';
import CalculatorCard from './CalculatorCard';
import AdPlaceholder from './AdPlaceholder';
import SearchBar from './SearchBar';
import { 
  Activity, Scale, Apple, Dumbbell, ShieldCheck, Zap, Smartphone, 
  ArrowRight, Sparkles, BookOpen, Mail, Send, Check, Droplets, Flame 
} from 'lucide-react';

interface HomepageProps {
  onNavigate: (path: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weight-management' | 'nutrition' | 'fitness-performance'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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

  React.useEffect(() => {
    if (window.location.pathname === '/calculators') {
      const el = document.getElementById('calculators-grid-section');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  // Filtered calculators
  const filteredCalculators = selectedCategory === 'all'
    ? CALCULATORS
    : CALCULATORS.filter(c => c.category === selectedCategory);

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
    const el = document.getElementById('calculators-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
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
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">Fitness Snapshot</h3>
                      <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Clinically Modeled</p>
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
                      <svg className="w-full h-full transform -rotate-90">
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

      {/* 2. AD PLACEMENT ABOVE CALCS */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder type="top-banner" />
      </div>

      {/* 3. CORE CALCULATORS CATEGORY FILTERING GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="calculators-grid-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
              Interactive Fitness Estimators
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a specialized category to narrow down your analysis tools.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-gray-900 p-1 border border-slate-200/50 rounded-lg w-fit">
            {(['all', 'weight-management', 'nutrition', 'fitness-performance'] as const).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  id={`home-cat-tab-${cat}`}
                >
                  {cat === 'all' ? 'All Tools' : cat.replace('-', ' ')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real Dynamic Grid displaying matched estimators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="homepage-calculators-grid">
          {filteredCalculators.map((calc) => (
            <CalculatorCard
              key={calc.slug}
              config={calc}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* 4. CLINICAL REVENUE IN-CONTENT AD SLOT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdPlaceholder type="in-content" />
      </div>

      {/* 5. BENEFITS SECTION */}
      <section className="bg-white dark:bg-gray-950/50 border-y border-slate-200 dark:border-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3.5 p-6 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl shadow-sm">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-lg w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Clinically Validated</h3>
            <p className="text-xs text-slate-500 leading-relaxed text-justify">
              All tools use standard clinical equations such as Mifflin-St Jeor (resting energy expenditure), Boer (lean mass indices), and the US Navy circumference regression formula.
            </p>
          </div>

          <div className="space-y-3.5 p-6 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl shadow-sm">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 rounded-lg w-fit">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Instant Response Limits</h3>
            <p className="text-xs text-slate-500 leading-relaxed text-justify">
              Entirely server-database-free. Every sliding scale or weight parameter compiles immediately in the browser, providing instantaneous results with zero lag.
            </p>
          </div>

          <div className="space-y-3.5 p-6 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl shadow-sm">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-lg w-fit">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Mobile-First UI</h3>
            <p className="text-xs text-slate-500 leading-relaxed text-justify">
              Optimized for smartphone viewports. Simple touch targets, clear input sliders, and a readable sticky design make on-the-go tracking highly accessible.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LATEST GUIDES / BLOG INSIGHTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="homepage-guides-section">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Staff Insights & Wellness Guides
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Topical nutrition and energy metabolism analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.slice(0, 3).map((guide) => (
            <div
              key={guide.slug}
              className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-950 transition-all shadow-sm"
              id={`home-guide-card-${guide.slug}`}
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 block mb-2">{guide.category}</span>
                <h3 className="text-base font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed text-justify">
                  {guide.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-900 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold">{guide.readTime} • {guide.author}</span>
                <button
                  onClick={() => onNavigate(`/guides/${guide.slug}`)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                  id={`home-guide-card-btn-${guide.slug}`}
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
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
              Subscribe to recieve monthly metabolic recipes, carbohydrate schedules, and direct access to new calculative widgets. Zero spam, unsubscribe anytime.
            </p>
          </div>

          <div className="w-full max-w-sm shrink-0">
            {newsletterSubscribed ? (
              <div className="p-4 bg-slate-750 border border-slate-700 rounded-xl text-center space-y-1 animate-in zoom-in-95">
                <Check className="h-6 w-6 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Successfully Subscribed!</h4>
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

      {/* 8. GENERAL OVERALL FAQs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-6">FitMetricsHub Support FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-700 dark:text-white">How reliable are these fitness calculations?</h4>
              <p className="text-xs text-slate-500 leading-relaxed text-justify">
                Our calculators deploy equations used in clinical medical diagnostics and dietetics globally. However, because they rely on demographic regressions, they cannot account for specific muscular hypertrophy variations. They are intended as a guidance baseline.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-700 dark:text-white">Does FitMetricsHub save my personal measurement logs?</h4>
              <p className="text-xs text-slate-500 leading-relaxed text-justify">
                No. To ensure 100% compliance with HIPAA guidelines, Google AdSense regulations, and visitor trust, all calculations are processed locally inside your web browser. No personal measurements are sent to external servers or logged.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
