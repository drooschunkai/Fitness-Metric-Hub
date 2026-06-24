import { Activity, ShieldCheck, Heart, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800" id="main-footer">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand statement */}
        <div className="md:col-span-2">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-slate-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 transition-colors mb-4 cursor-pointer text-left"
            id="footer-logo-btn"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              FitMetrics<span className="text-emerald-600 dark:text-emerald-400">Hub</span>
            </span>
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            FitMetricsHub provides premium, mathematically accurate fitness and health calculators modeled after peer-reviewed clinical energy expenditure literature.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-500 font-semibold">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>AdSense Compliant Content & Privacy Assured.</span>
          </div>
        </div>

        {/* Dynamic Calculator Shortcuts */}
        <div>
          <h3 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-3">Calculators</h3>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => onNavigate('/calculators/bmi-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left">
                BMI Weight Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/calculators/bmr-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left">
                BMR Metabolic Estimator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/calculators/calorie-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left">
                TDEE Calorie Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/calculators/macro-calculator')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Macronutrient Ratios
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Policy compliance links */}
        <div>
          <h3 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-3">Legal & Policies</h3>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => onNavigate('/privacy')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left" id="footer-privacy-btn">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/terms')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left" id="footer-terms-btn">
                Terms of Service
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/disclaimer')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left" id="footer-disclaimer-btn">
                Medical Disclaimer
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Methodology & Contact
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Medical disclaimer mandated by AdSense and health guidelines */}
      <div className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
            <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1">Disclaimer of Liability:</strong> 
            The metrics, formulas, index values (BMI, BMR, fat estimate ranges, and macronutrient divisions) provided on FitMetricsHub.com are mathematical predictions based on published clinical trials (Mifflin-St Jeor, Boer formulas, and US Navy parameters). They are strictly designed for educational and informational purposes. They do not constitute certified medical diagnoses, health advice, physical therapy prescriptions, or sports counseling. You should always consult with a board-certified physician, registered dietitian, or personal care practitioner prior to embarking on any dietary caloric deficit, body composition plan, heavy resistance training regimen, or intensive water/protein load.
          </p>
          
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> for health seekers globally.
            </span>
            <span>
              &copy; {currentYear} FitMetricsHub. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
