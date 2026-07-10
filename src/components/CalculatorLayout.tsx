import { ReactNode } from 'react';
import { CalculatorConfig, RouteState } from '../types';
import Breadcrumbs from './Breadcrumbs';
import AdPlaceholder from './AdPlaceholder';
import FAQSection from './FAQSection';
import RelatedCalculators from './RelatedCalculators';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';
import { BookOpen, ChevronRight } from 'lucide-react';

interface CalculatorLayoutProps {
  config: CalculatorConfig;
  route: RouteState;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

export default function CalculatorLayout({ config, route, onNavigate, children }: CalculatorLayoutProps) {
  // Breadcrumb paths
  const breadcrumbItems = [
    { label: 'Calculators' },
    { label: config.title }
  ];

  // Programmatically resolve the most relevant guides for this calculator (up to 4)
  const getProgrammaticGuides = (): typeof GUIDES => {
    const baseWord = config.slug.replace('-calculator', '');
    
    const scoredGuides = GUIDES.map(g => {
      let score = 0;
      
      // 1. Explicitly requested in calculator config
      if (config.relatedGuideSlugs && config.relatedGuideSlugs.includes(g.slug)) {
        score += 100;
      }
      
      // 2. Guide explicitly references this calculator
      if (g.relatedCalculators && g.relatedCalculators.includes(config.slug)) {
        score += 50;
      }
      
      // 3. Slug similarity matching (e.g. guide slug contains "bmi")
      if (g.slug.includes(baseWord)) {
        score += 40;
        if (g.slug.startsWith(baseWord)) {
          score += 10;
        }
      }
      
      // 4. Category grouping fallback
      const calcCat = config.category.toLowerCase().replace('-', ' ').trim();
      const guideCat = g.category.toLowerCase().trim();
      if (calcCat === 'weight management' && guideCat === 'weight management') {
        score += 10;
      } else if (calcCat === 'nutrition' && guideCat === 'nutrition') {
        score += 10;
      } else if (calcCat === 'body composition' && guideCat === 'body composition') {
        score += 10;
      } else if (
        (calcCat === 'fitness performance' || calcCat === 'endurance performance' || calcCat === 'strength training' || calcCat === 'hydration health') &&
        (guideCat === 'fitness performance' || guideCat === 'performance' || guideCat === 'strength training' || guideCat === 'hydration')
      ) {
        score += 10;
      }
      
      return { guide: g, score };
    });
    
    const sorted = scoredGuides
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.guide);
      
    return sorted.slice(0, 4);
  };

  const linkedGuides = getProgrammaticGuides();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id={`calculator-layout-${config.slug}`}>
      {/* Dynamic top banner ad slot */}
      <AdPlaceholder type="top-banner" />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} onNavigate={onNavigate} />

      {/* Primary Layout Split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
        {/* Main Content Pane */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Title and Header Details */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-md">
              {config.category.replace('-', ' ')} tool
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-white mt-3 tracking-tight">
              {config.title}
            </h1>
            <p className="text-base text-slate-500 mt-2.5 leading-relaxed">
              {config.shortDescription}
            </p>
          </div>

          {/* Calculator Interface Container */}
          <div className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            {children}
          </div>

          {/* Dynamic In-Content Ad */}
          <AdPlaceholder type="in-content" />

          {/* Scientific Methodology / Formula Section */}
          <section className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-3">
              Methodology & Formula: {config.formula.name}
            </h2>
            <div className="text-sm text-slate-650 dark:text-gray-400 leading-relaxed whitespace-pre-wrap text-justify">
              {config.formula.description}
            </div>
          </section>

          {/* Practical Calculation Examples */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-850 dark:text-white">
              Standard Reference Calculations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.examples.map((ex, index) => (
                <div key={index} className="border border-slate-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-950 shadow-xs">
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{ex.scenario}</h4>
                  <div className="text-xs text-slate-500 mt-2">
                    <span className="font-bold">Inputs:</span> {ex.inputs}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    <span className="font-bold">Output:</span> {ex.result}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ section */}
          {config.faqs && config.faqs.length > 0 && (
            <FAQSection faqs={config.faqs} />
          )}

          {/* Related Calculators section */}
          {config.relatedSlugs && config.relatedSlugs.length > 0 && (
            <RelatedCalculators slugs={config.relatedSlugs} onNavigate={onNavigate} />
          )}

          {/* Related Guides section mirroring GuideView tool recommendations */}
          {linkedGuides && linkedGuides.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-gray-800/80 mt-6" id="calculator-related-guides">
              <h2 className="text-lg font-bold text-slate-850 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Related Guides & Science
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {linkedGuides.map((guide) => (
                  <div
                    key={guide.slug}
                    className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-950 transition-all shadow-sm"
                    id={`related-guide-card-${guide.slug}`}
                  >
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 block">
                        {guide.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed text-justify">
                        {guide.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-900 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-semibold">{guide.readTime}</span>
                      <button
                        onClick={() => onNavigate(`/guides/${guide.slug}`)}
                        className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                        id={`related-guide-card-btn-${guide.slug}`}
                      >
                        <span>Read Guide</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Desktop Sidebar Layout Pane */}
        <div className="space-y-6">
          
          {/* Linked Guides / Blog Articles block */}
          {linkedGuides.length > 0 && (
            <div className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-emerald-500" />
                Related Reading & Guides
              </h2>
              <div className="space-y-3">
                {linkedGuides.map((guide) => (
                   <button
                     key={guide.slug}
                     onClick={() => onNavigate(`/guides/${guide.slug}`)}
                     className="w-full text-left group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                     id={`sidebar-guide-${guide.slug}`}
                   >
                     <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5 group-hover:text-emerald-500 transition-colors" />
                     <div>
                       <div className="text-sm font-semibold text-slate-700 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                         {guide.title}
                       </div>
                       <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                         {guide.readTime} • {guide.author}
                       </span>
                     </div>
                   </button>
                ))}
              </div>
            </div>
          )}

          {/* Ad Placeholder for Sidebar */}
          <AdPlaceholder type="sidebar" />

          {/* Top Calculators Quick Links Widget */}
          <div className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">
              Top Calculators Suite
            </h2>
            <div className="space-y-2">
              {CALCULATORS.filter(c => c.slug !== config.slug).slice(0, 5).map((calc) => (
                <button
                  key={calc.slug}
                  onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                  className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-900 text-xs font-semibold text-slate-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  id={`sidebar-suite-link-${calc.slug}`}
                >
                  <span>{calc.title}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
