import React from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800" id="main-footer">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        
        {/* Column 1: FitMetricsHub & Mission Statement */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2 text-slate-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            id="footer-logo-btn"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              FitMetrics<span className="text-emerald-600 dark:text-emerald-400">Hub</span>
            </span>
          </a>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
            FitMetricsHub is committed to improving global health literacy by providing peer-reviewed, medically validated, and highly accurate metabolic calculations and comprehensive educational fitness tools.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-500 font-bold">
            <ShieldCheck className="h-4 w-4 shrink-0 text-amber-600" />
            <span>AdSense & Privacy Ready</span>
          </div>
        </div>

        {/* Column 2: Calculators */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Calculators
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/calculators/bmi-calculator" onClick={(e) => handleLinkClick(e, '/calculators/bmi-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                BMI Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/calorie-calculator" onClick={(e) => handleLinkClick(e, '/calculators/calorie-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Calorie Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/ideal-weight-calculator" onClick={(e) => handleLinkClick(e, '/calculators/ideal-weight-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Ideal Weight
              </a>
            </li>
            <li>
              <a href="/calculators/protein-calculator" onClick={(e) => handleLinkClick(e, '/calculators/protein-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Protein Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/macro-calculator" onClick={(e) => handleLinkClick(e, '/calculators/macro-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Macro Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/water-calculator" onClick={(e) => handleLinkClick(e, '/calculators/water-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Water Intake
              </a>
            </li>
            <li>
              <a href="/calculators/body-fat-calculator" onClick={(e) => handleLinkClick(e, '/calculators/body-fat-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Body Fat
              </a>
            </li>
            <li>
              <a href="/calculators/lean-body-mass-calculator" onClick={(e) => handleLinkClick(e, '/calculators/lean-body-mass-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Lean Body Mass
              </a>
            </li>
            <li>
              <a href="/calculators/bmr-calculator" onClick={(e) => handleLinkClick(e, '/calculators/bmr-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                BMR Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/walking-calories-calculator" onClick={(e) => handleLinkClick(e, '/calculators/walking-calories-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Walking Calories
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Categories
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Weight Management
              </a>
            </li>
            <li>
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Nutrition & Macros
              </a>
            </li>
            <li>
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Body Composition
              </a>
            </li>
            <li>
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Fitness Performance
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Guides */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Guides
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/guides/what-is-bmi" onClick={(e) => handleLinkClick(e, '/guides/what-is-bmi')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                What Is BMI?
              </a>
            </li>
            <li>
              <a href="/guides/how-many-calories-should-i-eat" onClick={(e) => handleLinkClick(e, '/guides/how-many-calories-should-i-eat')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Understanding BMR
              </a>
            </li>
            <li>
              <a href="/guides/weight-loss-fundamentals" onClick={(e) => handleLinkClick(e, '/guides/weight-loss-fundamentals')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Daily Calorie Needs
              </a>
            </li>
            <li>
              <a href="/guides/protein-intake-guide" onClick={(e) => handleLinkClick(e, '/guides/protein-intake-guide')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Protein Intake Guide
              </a>
            </li>
            <li>
              <a href="/guides/understanding-body-fat-percentage" onClick={(e) => handleLinkClick(e, '/guides/understanding-body-fat-percentage')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Body Fat Percentage
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Company */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Company
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Editorial Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 6: Legal */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Legal
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-privacy-btn">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-terms-btn">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/disclaimer" onClick={(e) => handleLinkClick(e, '/disclaimer')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-disclaimer-btn">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="/sitemap" onClick={(e) => handleLinkClick(e, '/sitemap')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-sitemap-btn">
                Sitemap
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Medical disclaimer mandated by AdSense and health guidelines */}
      <div className="border-t border-slate-200 bg-slate-100/50 dark:border-slate-800 dark:bg-slate-950/40 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
            <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1">Disclaimer of Liability:</strong> 
            The metrics, formulas, index values (BMI, BMR, fat estimate ranges, and macronutrient divisions) provided on FitMetricsHub.com are mathematical predictions based on published clinical trials (Mifflin-St Jeor, Boer formulas, and US Navy parameters). They are strictly designed for educational and informational purposes. They do not constitute certified medical diagnoses, health advice, physical therapy prescriptions, or sports counseling. You should always consult with a board-certified physician, registered dietitian, or personal care practitioner prior to embarking on any dietary caloric deficit, body composition plan, heavy resistance training regimen, or intensive water/protein load.
          </p>
          
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> for health seekers globally.
            </span>
            <span className="font-medium text-slate-500 dark:text-slate-400">
              &copy; {currentYear} FitMetricsHub. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
