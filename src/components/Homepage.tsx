import React, { useState } from 'react';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';
import CalculatorCard from './CalculatorCard';
import AdPlaceholder from './AdPlaceholder';
import SearchBar from './SearchBar';
import { Activity, Scale, Apple, Dumbbell, ShieldCheck, Zap, Smartphone, ArrowRight, Sparkles, BookOpen, Mail, Send, Check } from 'lucide-react';

interface HomepageProps {
  onNavigate: (path: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weight-management' | 'nutrition' | 'fitness-performance'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300" id="homepage-root">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-emerald-950/10 dark:via-gray-950 dark:to-gray-950 border-b border-slate-200 dark:border-gray-900 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Tagline / Announcement badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100/60 dark:border-emerald-900/30">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            <span>FitMetricsHub v1.0 • Clinically Modeled Algorithms</span>
          </div>

          {/* Primary Titles */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">
              Free Fitness Calculators & <span className="text-emerald-600 dark:text-emerald-500">Health Tools</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Calculate BMI, calories, protein intake, body fat, macros and more. Backed by clinical metabolic research and nutritional science.
            </p>
          </div>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleExploreClick}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
              id="hero-cta-btn"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('/about')}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold py-3.5 px-8 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
              id="hero-secondary-btn"
            >
              <span>Our Methodology</span>
            </button>
          </div>

          {/* Mini Search box centered under hero */}
          <div className="max-w-md mx-auto pt-4">
            <SearchBar onNavigate={onNavigate} />
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
      <section className="bg-slate-50 dark:bg-gray-900/50 border-y border-slate-200 dark:border-gray-900 py-16">
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
