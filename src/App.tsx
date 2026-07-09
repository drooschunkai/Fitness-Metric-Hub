import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOOverview from './components/SEOOverview';
import Homepage from './components/Homepage';
import CalculatorsPage from './components/CalculatorsPage';
import CalculatorLayout from './components/CalculatorLayout';
import GuideView from './components/GuideView';
import SitemapPage from './components/SitemapPage';
import { AboutPage, ContactPage, PrivacyPolicy, TermsOfService, DisclaimerPage } from './components/StaticPages';
import { CALCULATORS } from './data/calculators';
import { GUIDES } from './data/guides';
import { RouteState } from './types';
import DynamicCalculator from './components/DynamicCalculator';
import { SearchResultsPage, CategoryPage, TagPage } from './components/SearchAndCategoryPages';

// Import Calculators
import {
  BmiCalculator,
  BmrCalculator,
  CalorieCalculator,
  ProteinCalculator,
  WaterCalculator,
  BodyFatCalculator,
  LeanBodyMassCalculator,
  IdealWeightCalculator,
  MacroCalculator,
  WalkingCaloriesCalculator,
} from './components/CalculatorsSuite';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Standard pathname routing for clean URLs
    const pathname = window.location.pathname || '/';
    return pathname;
  });

  const [inspectorOpen, setInspectorOpen] = useState(false);

  // Sync back-forward history navigation
  useEffect(() => {
    const handleNavigation = () => {
      const pathname = window.location.pathname || '/';
      setCurrentPath(pathname);
    };
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Automated SEO & Schema Injection Engine
  useEffect(() => {
    let title = 'FitMetricsHub - Free Fitness Calculators & Health Tools';
    let desc = 'Calculate BMI, calories, protein intake, body fat, macros and more with scientifically accurate clinical models.';
    let jsonLd: any = {};
    const currentUrl = `https://fitmetricshub.com${currentPath}`;

    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
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
          'target': 'https://fitmetricshub.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
    } else if (currentPath.startsWith('/calculators/')) {
      const slug = currentPath.split('/calculators/')[1];
      const calc = CALCULATORS.find(c => c.slug === slug);
      if (calc) {
        title = `${calc.title} - Free Health & Fitness Estimator | FitMetricsHub`;
        desc = calc.metaDescription;
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
    } else if (currentPath.startsWith('/guides/')) {
      const slug = currentPath.split('/guides/')[1];
      const guide = GUIDES.find(g => g.slug === slug);
      if (guide) {
        title = `${guide.title} | FitMetricsHub Guide`;
        desc = guide.metaDescription;
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
      const sub = currentPath.replace('/', '');
      const capitalized = sub ? sub.charAt(0).toUpperCase() + sub.slice(1) : 'Health';
      title = `${capitalized} - FitMetricsHub`;
      desc = `FitMetricsHub official ${sub} information and tools designed for clinical precision.`;
    }

    // Set document title
    document.title = title;

    // Set or create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Set or create Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Inject JSON-LD Schema Script
    let schemaScript = document.getElementById('dynamic-jsonld-schema');
    if (schemaScript) {
      schemaScript.remove();
    }
    if (Object.keys(jsonLd).length > 0) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'dynamic-jsonld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(schemaScript);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    // Standard clean pathname routing
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Map slugs to components
  const getCalculatorComponent = (slug: string) => {
    switch (slug) {
      case 'bmi-calculator': return <BmiCalculator />;
      case 'bmr-calculator': return <BmrCalculator />;
      case 'calorie-calculator': return <CalorieCalculator />;
      case 'protein-calculator': return <ProteinCalculator />;
      case 'water-calculator': return <WaterCalculator />;
      case 'body-fat-calculator': return <BodyFatCalculator />;
      case 'lean-body-mass-calculator': return <LeanBodyMassCalculator />;
      case 'ideal-weight-calculator': return <IdealWeightCalculator />;
      case 'macro-calculator': return <MacroCalculator />;
      case 'walking-calories-calculator': return <WalkingCaloriesCalculator />;
      default: return null;
    }
  };

  // Route router matcher
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '' || currentPath === '/index.html') {
      return <Homepage onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    if (currentPath === '/privacy') {
      return <PrivacyPolicy />;
    }

    if (currentPath === '/terms') {
      return <TermsOfService />;
    }

    if (currentPath === '/disclaimer') {
      return <DisclaimerPage />;
    }

    if (currentPath === '/sitemap') {
      return <SitemapPage onNavigate={navigate} />;
    }

    if (currentPath === '/calculators' || currentPath === '/calculators/') {
      return <CalculatorsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/calculators/')) {
      const slug = currentPath.split('/calculators/')[1];
      const calcConfig = CALCULATORS.find(c => c.slug === slug);
      if (calcConfig) {
        return (
          <CalculatorLayout
            config={calcConfig}
            route={{ path: currentPath, params: { slug } }}
            onNavigate={navigate}
          >
            {calcConfig.isDynamic ? (
              <DynamicCalculator config={calcConfig} />
            ) : (
              getCalculatorComponent(slug)
            )}
          </CalculatorLayout>
        );
      }
    }

    if (currentPath.startsWith('/guides/')) {
      const slug = currentPath.split('/guides/')[1];
      const guideConfig = GUIDES.find(g => g.slug === slug);
      if (guideConfig) {
        return (
          <GuideView
            article={guideConfig}
            route={{ path: currentPath, params: { slug } }}
            onNavigate={navigate}
          />
        );
      }
    }

    if (currentPath.startsWith('/search')) {
      return <SearchResultsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/categories/')) {
      const categorySlug = currentPath.split('/categories/')[1];
      return <CategoryPage categorySlug={categorySlug} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/tags/')) {
      const tagSlug = currentPath.split('/tags/')[1];
      return <TagPage tagSlug={tagSlug} onNavigate={navigate} />;
    }

    // 404 Fallback to Home
    return <Homepage onNavigate={navigate} />;
  };

  const routeState: RouteState = {
    path: currentPath,
    params: {}
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        {/* Sticky header containing logo & menu triggers */}
        <Header currentPath={currentPath} onNavigate={navigate} />

        {/* Primary dynamic content route */}
        <main className="flex-grow">
          {renderRoute()}
        </main>

        {/* Interactive Developer SEO Sandbox overlay footer */}
        <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-150 dark:border-gray-800 py-6 px-4">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Developer Sandboxed Audit Suite
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  FitMetricsHub operates dynamic SEO optimization & sitemaps directly. Expand the tool below to audit JSON-LD & meta schemas.
                </p>
              </div>
              <button
                onClick={() => setInspectorOpen(!inspectorOpen)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-xs py-2 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
                id="toggle-seo-inspector-btn"
              >
                {inspectorOpen ? 'Collapse Schema Inspector' : 'Inspect Dynamic SEO & AdSense Metas'}
              </button>
            </div>

            {inspectorOpen && (
              <div className="animate-in slide-in-from-bottom-2 duration-300">
                <SEOOverview route={routeState} />
              </div>
            )}
          </div>
        </div>

        {/* Standard legal disclaimer and shortcuts footer */}
        <Footer onNavigate={navigate} />
      </div>
    </BrowserRouter>
  );
}
