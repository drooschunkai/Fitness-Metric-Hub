import React, { useState } from 'react';
import { Network, Calculator, FileText, ArrowRight, Home, Globe } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export default function SitemapPage({ onNavigate }: SitemapPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const mainPages = [
    { title: 'Homepage', path: '/', desc: 'All tools, guides, and medical resources.' },
    { title: 'About FitMetricsHub', path: '/about', desc: 'Our clinical mission, methodologies, and editorial policies.' },
    { title: 'Contact Support', path: '/contact', desc: 'Get in touch with our certified nutritional consultants.' },
    { title: 'Privacy Policy', path: '/privacy', desc: 'How we process and protect your body composition data.' },
    { title: 'Terms of Service', path: '/terms', desc: 'Agreement and usage conditions of our calculators.' },
    { title: 'Medical Disclaimer', path: '/disclaimer', desc: 'Critical liability waiver and health guidance.' },
    { title: 'Sitemap Index', path: '/sitemap', desc: 'This page - quick visual layout of our site map directory.' },
  ];

  const calculators = CALCULATORS.map(c => ({
    title: c.title,
    path: `/calculators/${c.slug}`,
    desc: c.shortDescription
  }));

  const guides = GUIDES.map(g => ({
    title: g.title,
    path: `/guides/${g.slug}`,
    desc: g.shortDescription
  }));

  const filteredMainPages = mainPages.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCalculators = calculators.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuides = guides.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300" id="sitemap-page">
      {/* Title Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Network className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
          Sitemap Directory
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Quickly browse and access any page across our clinically-validated health platform. Use the search filter below to isolate specific metabolic tools or educational articles.
        </p>
      </div>

      {/* Interactive Quick Search */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Filter sitemap resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50 focus:bg-white focus:outline-emerald-500 text-sm placeholder-slate-400"
          id="sitemap-search-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        
        {/* Section 1: Core Pages */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-2">
            <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-gray-950 dark:text-white">Core Pages</h2>
          </div>
          <p className="text-xs text-slate-400">Essential navigation, legal requirements, and company info.</p>
          
          <ul className="space-y-3">
            {filteredMainPages.length > 0 ? (
              filteredMainPages.map((page, idx) => (
                <li key={idx} className="group">
                  <a
                    href={`#${page.path}`}
                    onClick={(e) => handleLinkClick(e, page.path)}
                    className="flex flex-col p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-100 dark:bg-gray-900/40 dark:border-gray-850 dark:hover:bg-emerald-950/10 transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                      {page.title} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                      {page.desc}
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No matching pages found.</p>
            )}
          </ul>
        </div>

        {/* Section 2: Clinical Calculators */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-2">
            <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-gray-950 dark:text-white font-sans">Fitness Calculators</h2>
          </div>
          <p className="text-xs text-slate-400">Peer-reviewed biological math estimators & fitness tools.</p>
          
          <ul className="space-y-3">
            {filteredCalculators.length > 0 ? (
              filteredCalculators.map((calc, idx) => (
                <li key={idx} className="group">
                  <a
                    href={`#${calc.path}`}
                    onClick={(e) => handleLinkClick(e, calc.path)}
                    className="flex flex-col p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-100 dark:bg-gray-900/40 dark:border-gray-850 dark:hover:bg-emerald-950/10 transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                      {calc.title} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                      {calc.desc}
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No matching calculators found.</p>
            )}
          </ul>
        </div>

        {/* Section 3: Educational Guides */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-gray-800 pb-2">
            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-gray-950 dark:text-white">Scientific Guides</h2>
          </div>
          <p className="text-xs text-slate-400">Nutritional analyses, hydration formulas, and calorie guides.</p>
          
          <ul className="space-y-3">
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide, idx) => (
                <li key={idx} className="group">
                  <a
                    href={`#${guide.path}`}
                    onClick={(e) => handleLinkClick(e, guide.path)}
                    className="flex flex-col p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-100 dark:bg-gray-900/40 dark:border-gray-850 dark:hover:bg-emerald-950/10 transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5 line-clamp-1">
                      {guide.title} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed line-clamp-2 text-justify">
                      {guide.desc}
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No matching guides found.</p>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}
