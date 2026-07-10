import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800" id="main-footer">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        
        {/* Column 1: FitMetricsHub & Mission Statement */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            id="footer-logo-btn"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              FitMetrics<span className="text-emerald-600 dark:text-emerald-400">Hub</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
            FitMetricsHub is committed to improving global health literacy by providing peer-reviewed, medically validated, and highly accurate metabolic calculations and comprehensive educational fitness tools.
          </p>

        </div>

        {/* Column 2: Calculators */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Calculators
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/calculators/bmi-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                BMI Calculator
              </Link>
            </li>
            <li>
              <Link to="/calculators/calorie-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Calorie Calculator
              </Link>
            </li>
            <li>
              <Link to="/calculators/ideal-weight-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Ideal Weight
              </Link>
            </li>
            <li>
              <Link to="/calculators/protein-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Protein Calculator
              </Link>
            </li>
            <li>
              <Link to="/calculators/macro-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Macro Calculator
              </Link>
            </li>
            <li>
              <Link to="/calculators/water-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Water Intake
              </Link>
            </li>
            <li>
              <Link to="/calculators/body-fat-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Body Fat
              </Link>
            </li>
            <li>
              <Link to="/calculators/lean-body-mass-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Lean Body Mass
              </Link>
            </li>
            <li>
              <Link to="/calculators/bmr-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                BMR Calculator
              </Link>
            </li>
            <li>
              <Link to="/calculators/walking-calories-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Walking Calories
              </Link>
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
              <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Weight Management
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Nutrition & Macros
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Body Composition
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Fitness Performance
              </Link>
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
              <Link to="/guides/what-is-bmi" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                What Is BMI?
              </Link>
            </li>
            <li>
              <Link to="/guides/how-many-calories-should-i-eat" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Understanding BMR
              </Link>
            </li>
            <li>
              <Link to="/guides/weight-loss-fundamentals" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Daily Calorie Needs
              </Link>
            </li>
            <li>
              <Link to="/guides/protein-intake-guide" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Protein Intake Guide
              </Link>
            </li>
            <li>
              <Link to="/guides/understanding-body-fat-percentage" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Body Fat Percentage
              </Link>
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
              <Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline">
                Editorial Policy
              </Link>
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
              <Link to="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-privacy-btn">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-terms-btn">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-disclaimer-btn">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:underline" id="footer-sitemap-btn">
                Sitemap
              </Link>
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
