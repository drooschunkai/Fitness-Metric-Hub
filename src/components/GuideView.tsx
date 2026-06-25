import { GuideArticle, RouteState } from '../types';
import Breadcrumbs from './Breadcrumbs';
import AdPlaceholder from './AdPlaceholder';
import FAQSection from './FAQSection';
import CalculatorCard from './CalculatorCard';
import { CALCULATORS } from '../data/calculators';
import { BookOpen, User, Calendar, Clock, ChevronRight, Scale } from 'lucide-react';
import { parseMarkdownToHtml } from '../utils/markdown';

interface GuideViewProps {
  article: GuideArticle;
  route: RouteState;
  onNavigate: (path: string) => void;
}

export default function GuideView({ article, route, onNavigate }: GuideViewProps) {
  // Breadcrumb paths
  const breadcrumbItems = [
    { label: 'Health Guides' },
    { label: article.title }
  ];

  // Resolve calculators linked to this guide
  const linkedCalculators = CALCULATORS.filter(c => article.relatedCalculators.includes(c.slug));

  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id={`guide-view-${article.slug}`}>
      {/* Top Banner Ad Unit */}
      <AdPlaceholder type="top-banner" />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} onNavigate={onNavigate} />

      {/* Split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        
        {/* Left Side Table of Contents sticky panel - Desktop only */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Table of Contents
            </h2>
            <nav className="space-y-2.5">
              {article.toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTocClick(item.id)}
                  className="w-full text-left text-xs font-semibold text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors cursor-pointer block truncate py-1 border-l-2 border-transparent hover:border-emerald-500 pl-2.5"
                  id={`toc-link-${item.id}`}
                >
                  {item.text}
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/80">
              <AdPlaceholder type="sidebar" />
            </div>
          </div>
        </div>

        {/* Main Article Content Container */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Article Header Metadata */}
          <div className="space-y-4">
            <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 rounded-md">
              Category: {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-gray-400" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{article.publishedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Render article contents */}
          <article className="prose prose-sm md:prose max-w-none text-gray-700 dark:text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: article.content.trim().startsWith('<') ? article.content : parseMarkdownToHtml(article.content) }} />
          </article>

          {/* Dynamic In-Article Ad Unit */}
          <AdPlaceholder type="in-content" />

          {/* Article-specific Q&A section with schema */}
          {article.faqs && article.faqs.length > 0 && (
            <FAQSection
              faqs={article.faqs}
              title="Article FAQ Schema"
              description="Review additional questions and references discussed in this health literature."
            />
          )}

          {/* Linked Tools Carousel/Grid */}
          {linkedCalculators.length > 0 && (
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80">
              <h2 className="text-lg font-bold text-gray-950 dark:text-white mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-emerald-500" />
                Recommended Interactive Tools for this Article
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {linkedCalculators.map((calc) => (
                  <CalculatorCard
                    key={calc.slug}
                    config={calc}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
