import { useState, useEffect } from 'react';
import { Sparkles, Code, FileText, Globe, Check, CheckCircle2, ShieldAlert } from 'lucide-react';
import { RouteState } from '../types';
import { CALCULATORS } from '../data/calculators';
import { GUIDES } from '../data/guides';

interface SEOOverviewProps {
  route: RouteState;
}

export default function SEOOverview({ route }: SEOOverviewProps) {
  const [activeTab, setActiveTab] = useState<'meta' | 'schema' | 'robots' | 'sitemap'>('meta');
  const [copied, setCopied] = useState(false);

  // Derive page specific dynamic SEO states
  let title = 'FitMetricsHub - Free Fitness Calculators & Health Tools';
  let desc = 'Calculate BMI, calories, protein intake, body fat, macros and more with scientifically accurate clinical models.';
  let ogType = 'website';
  let jsonLd: any = {};

  const currentUrl = `https://fitmetricshub.com${route.path}`;

  if (route.path === '/') {
    title = 'FitMetricsHub - Smart Fitness Calculators for Better Health Decisions';
    desc = 'Discover the absolute best suite of free health calculators. Scientifically estimate your BMI, daily calorie limits, macro ratios, body fat, protein, and water needs.';
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'FitMetricsHub',
      'url': 'https://fitmetricshub.com',
      'description': desc,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://fitmetricshub.com/?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
  } else if (route.path.startsWith('/calculators/')) {
    const slug = route.path.split('/calculators/')[1];
    const calc = CALCULATORS.find(c => c.slug === slug);
    if (calc) {
      title = `${calc.title} - Free Health & Fitness Estimator | FitMetricsHub`;
      desc = calc.metaDescription;
      ogType = 'article';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': calc.title,
        'url': currentUrl,
        'applicationCategory': 'HealthAndFitnessApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires HTML5 and JavaScript support',
        'description': calc.shortDescription,
        'creator': {
          '@type': 'Organization',
          'name': 'FitMetricsHub',
          'url': 'https://fitmetricshub.com'
        },
        'about': {
          '@type': 'Thing',
          'name': calc.title,
          'description': 'Online clinical calculator for fitness indices'
        }
      };
    }
  } else if (route.path.startsWith('/guides/')) {
    const slug = route.path.split('/guides/')[1];
    const guide = GUIDES.find(g => g.slug === slug);
    if (guide) {
      title = `${guide.title} | FitMetricsHub Guide`;
      desc = guide.metaDescription;
      ogType = 'article';
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': guide.title,
        'description': guide.metaDescription,
        'url': currentUrl,
        'datePublished': guide.publishedDate,
        'author': {
          '@type': 'Person',
          'name': guide.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'FitMetricsHub',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://fitmetricshub.com/assets/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': currentUrl
        }
      };
    }
  } else {
    // Other static routes
    const sub = route.path.replace('/', '');
    const capitalized = sub.charAt(0).toUpperCase() + sub.slice(1);
    title = `${capitalized} - FitMetricsHub Legal & Policy`;
    desc = `FitMetricsHub official ${sub} terms and specifications designed for transparency and AdSense policy guidelines.`;
  }

  // Trigger copy
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaString = JSON.stringify(jsonLd, null, 2);

  // Dynamic robots.txt content
  const robotsTxt = `# Robots.txt for FitMetricsHub.com - Maximize crawl budget
User-agent: *
Allow: /
Allow: /calculators/*
Allow: /guides/*
Disallow: /api/*

# XML Sitemap Location
Sitemap: https://fitmetricshub.com/sitemap.xml`;

  // Dynamic Sitemap.xml content
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core pages -->
  <url>
    <loc>https://fitmetricshub.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fitmetricshub.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://fitmetricshub.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- 10 Calculators -->
  ${CALCULATORS.map(c => `
  <url>
    <loc>https://fitmetricshub.com/calculators/${c.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}

  <!-- Guides & Blog -->
  ${GUIDES.map(g => `
  <url>
    <loc>https://fitmetricshub.com/guides/${g.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-2xl bg-slate-900 text-slate-100 p-6 shadow-xl" id="seo-inspector-container">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white tracking-tight uppercase">
              SEO & Schema Inspector
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Simulating production headers in real-time
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/40 py-1 px-2 rounded-md">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>SEO Optimal</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs">
        <button
          onClick={() => { setActiveTab('meta'); }}
          className={`flex items-center gap-1.5 py-2 px-3 border-b-2 font-semibold transition-all cursor-pointer ${
            activeTab === 'meta' ? 'border-emerald-500 text-white bg-slate-800/30' : 'border-transparent text-slate-400 hover:text-white'
          }`}
          id="seo-tab-meta"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Meta Tags</span>
        </button>
        <button
          onClick={() => { setActiveTab('schema'); }}
          className={`flex items-center gap-1.5 py-2 px-3 border-b-2 font-semibold transition-all cursor-pointer ${
            activeTab === 'schema' ? 'border-emerald-500 text-white bg-slate-800/30' : 'border-transparent text-slate-400 hover:text-white'
          }`}
          id="seo-tab-schema"
        >
          <Code className="h-3.5 w-3.5" />
          <span>JSON-LD Schema</span>
        </button>
        <button
          onClick={() => { setActiveTab('robots'); }}
          className={`flex items-center gap-1.5 py-2 px-3 border-b-2 font-semibold transition-all cursor-pointer ${
            activeTab === 'robots' ? 'border-emerald-500 text-white bg-slate-800/30' : 'border-transparent text-slate-400 hover:text-white'
          }`}
          id="seo-tab-robots"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Robots.txt</span>
        </button>
        <button
          onClick={() => { setActiveTab('sitemap'); }}
          className={`flex items-center gap-1.5 py-2 px-3 border-b-2 font-semibold transition-all cursor-pointer ${
            activeTab === 'sitemap' ? 'border-emerald-500 text-white bg-slate-800/30' : 'border-transparent text-slate-400 hover:text-white'
          }`}
          id="seo-tab-sitemap"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Sitemap.xml</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="mt-4 text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-72 overflow-y-auto relative">
        <button
          onClick={() => {
            const copyContent = {
              meta: `Title: ${title}\nDescription: ${desc}\nCanonical: ${currentUrl}\nog:type: ${ogType}`,
              schema: schemaString,
              robots: robotsTxt,
              sitemap: sitemapXml
            }[activeTab];
            copyText(copyContent);
          }}
          className="absolute right-3 top-3 bg-slate-800 text-slate-300 hover:text-white py-1 px-2 rounded-md font-sans text-[10px] cursor-pointer"
          id="copy-seo-text-btn"
        >
          {copied ? <span className="text-emerald-400 flex items-center gap-1">Copied!</span> : 'Copy Content'}
        </button>

        {activeTab === 'meta' && (
          <div className="space-y-3">
            <div>
              <span className="text-slate-500 font-sans block font-semibold mb-0.5">Page Title:</span>
              <span className="text-white text-xs">{title}</span>
            </div>
            <div>
              <span className="text-slate-500 font-sans block font-semibold mb-0.5">Meta Description:</span>
              <span className="text-emerald-300 text-xs leading-relaxed block">{desc}</span>
            </div>
            <div>
              <span className="text-slate-500 font-sans block font-semibold mb-0.5">OpenGraph tags:</span>
              <div className="text-slate-400 space-y-0.5 pl-2 border-l border-slate-800">
                <span className="block">&lt;meta property="og:title" content="{title}" /&gt;</span>
                <span className="block">&lt;meta property="og:description" content="{desc}" /&gt;</span>
                <span className="block">&lt;meta property="og:type" content="{ogType}" /&gt;</span>
                <span className="block">&lt;meta property="og:url" content="{currentUrl}" /&gt;</span>
                <span className="block">&lt;meta name="twitter:card" content="summary_large_image" /&gt;</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schema' && (
          <pre className="text-blue-300 overflow-x-auto select-all whitespace-pre-wrap">{schemaString}</pre>
        )}

        {activeTab === 'robots' && (
          <pre className="text-amber-300 overflow-x-auto select-all whitespace-pre-wrap">{robotsTxt}</pre>
        )}

        {activeTab === 'sitemap' && (
          <pre className="text-purple-300 overflow-x-auto select-all whitespace-pre-wrap">{sitemapXml}</pre>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 border-t border-slate-800/60 pt-3">
        <ShieldAlert className="h-3 w-3 text-emerald-400" />
        <span>Sitemap generated dynamically for Vercel crawler. Perfect indexing.</span>
      </div>
    </div>
  );
}
