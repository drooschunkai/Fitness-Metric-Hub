import { useState, useRef, useEffect } from 'react';
import { Search, Calculator, BookOpen, X } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';

interface SearchBarProps {
  onNavigate: (path: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onNavigate, placeholder = "Search calculators or health guides...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items
  const normalizedQuery = query.toLowerCase().trim();
  
  const matchedCalculators = normalizedQuery
    ? CALCULATORS.filter(
        c => c.title.toLowerCase().includes(normalizedQuery) || 
             c.shortDescription.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedGuides = normalizedQuery
    ? GUIDES.filter(
        g => g.title.toLowerCase().includes(normalizedQuery) || 
             g.shortDescription.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const handleSelect = (path: string) => {
    onNavigate(path);
    setQuery('');
    setIsOpen(false);
  };

  const hasResults = matchedCalculators.length > 0 || matchedGuides.length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-gray-100 placeholder-slate-400 border border-slate-200 dark:border-gray-800 rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
          id="search-input"
        />
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-650 cursor-pointer"
            id="clear-search-btn"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-lg shadow-md z-50 max-h-96 overflow-y-auto">
          {hasResults ? (
            <div className="p-2 space-y-2">
              {matchedCalculators.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Calculators
                  </div>
                  {matchedCalculators.map((calc) => (
                    <button
                      key={calc.slug}
                      onClick={() => handleSelect(`/calculators/${calc.slug}`)}
                      className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-emerald-950/20 text-left cursor-pointer transition-colors group"
                      id={`search-calc-${calc.slug}`}
                    >
                      <div className="p-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-md mt-0.5 animate-pulse">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {calc.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {calc.shortDescription}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {matchedGuides.length > 0 && (
                <div className="border-t border-slate-100 dark:border-gray-800 pt-2">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Guides & Articles
                  </div>
                  {matchedGuides.map((guide) => (
                    <button
                      key={guide.slug}
                      onClick={() => handleSelect(`/guides/${guide.slug}`)}
                      className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-blue-950/20 text-left cursor-pointer transition-colors group"
                      id={`search-guide-${guide.slug}`}
                    >
                      <div className="p-1.5 bg-slate-100 text-slate-700 dark:bg-blue-950/30 dark:text-blue-400 rounded-md mt-0.5">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-blue-400">
                          {guide.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {guide.shortDescription}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-slate-500 text-sm">
              No results found for "<span className="font-bold text-slate-700 dark:text-gray-300">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
