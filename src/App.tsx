import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOOverview from './components/SEOOverview';
import Homepage from './components/Homepage';
import CalculatorLayout from './components/CalculatorLayout';
import GuideView from './components/GuideView';
import { AboutPage, ContactPage, PrivacyPolicy, TermsOfService, DisclaimerPage } from './components/StaticPages';
import { CALCULATORS } from './data/calculators';
import { GUIDES } from './data/guides';
import { RouteState } from './types';

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
    // Treat any hash path or standard route pathname cleanly
    return window.location.pathname || '/';
  });

  const [inspectorOpen, setInspectorOpen] = useState(false);

  // Sync back-forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
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
            {getCalculatorComponent(slug)}
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

    // 404 Fallback to Home
    return <Homepage onNavigate={navigate} />;
  };

  const routeState: RouteState = {
    path: currentPath,
    params: {}
  };

  return (
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
  );
}
