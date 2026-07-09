import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';
import CalculatorCard from './CalculatorCard';
import { BookOpen, Scale, Search, Tag, Activity, ArrowRight, CornerDownRight } from 'lucide-react';

interface SearchResultsPageProps {
  onNavigate: (path: string) => void;
}

export function SearchResultsPage({ onNavigate }: SearchResultsPageProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const cleanQuery = query.trim().toLowerCase();

  const matchingCalculators = CALCULATORS.filter(
    (c) =>
      c.title.toLowerCase().includes(cleanQuery) ||
      c.shortDescription.toLowerCase().includes(cleanQuery) ||
      c.category.toLowerCase().includes(cleanQuery)
  );

  const matchingGuides = GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(cleanQuery) ||
      g.shortDescription.toLowerCase().includes(cleanQuery) ||
      g.category.toLowerCase().includes(cleanQuery) ||
      g.content.toLowerCase().includes(cleanQuery)
  );

  const totalMatches = matchingCalculators.length + matchingGuides.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Search className="h-7 w-7 text-emerald-500" />
          Search Results
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          Showing {totalMatches} matches for "<span className="font-bold text-slate-800 dark:text-slate-200">{query}</span>" across the entire FitMetricsHub platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Results list */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Calculators Results Block */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-900 pb-2">
              <Scale className="h-4 w-4 text-emerald-500" />
              Calculators & Tools ({matchingCalculators.length})
            </h2>

            {matchingCalculators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchingCalculators.map((calc) => (
                  <CalculatorCard key={calc.slug} config={calc} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-450 dark:text-gray-500 italic">No calculators matched this search.</p>
            )}
          </div>

          {/* Guides Results Block */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-900 pb-2">
              <BookOpen className="h-4 w-4 text-emerald-500" />
              Clinical Articles & Guides ({matchingGuides.length})
            </h2>

            {matchingGuides.length > 0 ? (
              <div className="space-y-3">
                {matchingGuides.map((guide) => (
                  <button
                    key={guide.slug}
                    onClick={() => onNavigate(`/guides/${guide.slug}`)}
                    className="w-full text-left p-5 rounded-2xl bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-900 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer block"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-500/5 px-2.5 py-0.5 rounded-md">
                      {guide.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-500 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {guide.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-3 hover:underline">
                      Read scientific article <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-450 dark:text-gray-500 italic">No guides matched this search.</p>
            )}
          </div>

        </div>

        {/* Right 1 Column: Suggestions & Related tags */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Popular Search Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {['BMI', 'Calorie', 'Protein', 'BMR', 'Sugar', 'Fat', 'Deficit', 'FFMI'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onNavigate(`/search?q=${tag.toLowerCase()}`)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-850 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 cursor-pointer shadow-xs hover:border-emerald-500"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
}

export function CategoryPage({ categorySlug, onNavigate }: CategoryPageProps) {
  const cleanSlug = categorySlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Map category slugs to readable titles
  const categoryTitleMap: Record<string, string> = {
    'weight-management': 'Weight Management',
    'nutrition': 'Nutrition & Macro Diet',
    'fitness-performance': 'Fitness & Performance',
    'body-composition': 'Body Composition',
    'hydration-health': 'Hydration & Health Metrics',
    'endurance-performance': 'Running & Endurance',
    'strength-training': 'Strength Training',
    'womens-health': 'Pregnancy & Women\'s Fitness',
    'longevity': 'Aging & Longevity'
  };

  const categoryTitle = categoryTitleMap[cleanSlug] || 'Health Directory';

  const matchingCalculators = CALCULATORS.filter(
    (c) => c.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug
  );

  const matchingGuides = GUIDES.filter(
    (g) => g.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300">
      <div className="space-y-3 border-b border-gray-150 dark:border-gray-850 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-500/5 px-2.5 py-1 rounded-md">
          Category Folder
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1.5">
          {categoryTitle} Estimators & Lit
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          Access our comprehensive collection of {matchingCalculators.length} medical calculators and {matchingGuides.length} peer-reviewed wellness guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Grid: Included Calculators */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-900">
            <Scale className="h-4.5 w-4.5 text-emerald-500" />
            Interactive Tools ({matchingCalculators.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchingCalculators.map((calc) => (
              <CalculatorCard key={calc.slug} config={calc} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Right Grid: Scientific Articles */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-900">
            <BookOpen className="h-4.5 w-4.5 text-emerald-500" />
            Medical Guides ({matchingGuides.length})
          </h2>
          <div className="space-y-3">
            {matchingGuides.map((guide) => (
              <button
                key={guide.slug}
                onClick={() => onNavigate(`/guides/${guide.slug}`)}
                className="w-full text-left p-4 rounded-xl bg-white dark:bg-gray-950 border border-slate-150 dark:border-gray-900 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer block"
              >
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                  <CornerDownRight className="h-3.5 w-3.5" />
                  {guide.title}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{guide.shortDescription}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TagPageProps {
  tagSlug: string;
  onNavigate: (path: string) => void;
}

export function TagPage({ tagSlug, onNavigate }: TagPageProps) {
  const matchingGuides = GUIDES.filter((g) =>
    g.title.toLowerCase().includes(tagSlug.toLowerCase()) ||
    g.shortDescription.toLowerCase().includes(tagSlug.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300">
      <div className="space-y-2 pb-6 border-b border-gray-100 dark:border-gray-900">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-500/5 px-2.5 py-1 rounded-md">
          Tag Index
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
          <Tag className="h-7 w-7 text-emerald-500" />
          #{tagSlug} Resources
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400">
          Showing {matchingGuides.length} articles filtered by our editorial tag database.
        </p>
      </div>

      <div className="max-w-3xl space-y-4">
        {matchingGuides.map((guide) => (
          <button
            key={guide.slug}
            onClick={() => onNavigate(`/guides/${guide.slug}`)}
            className="w-full text-left p-5 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-900 hover:border-emerald-500 rounded-2xl cursor-pointer block"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors">
              {guide.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{guide.shortDescription}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
