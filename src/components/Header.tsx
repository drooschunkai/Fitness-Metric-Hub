import { useState } from 'react';
import { Activity, Menu, X, HelpCircle, Phone, Info, ShieldCheck, FileText } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Calculators', path: '/calculators', icon: Activity },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: Phone }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95" id="main-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          id="header-logo-btn"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Activity className="h-4.5 w-4.5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white flex items-center">
            FitMetrics<span className="text-emerald-600">Hub</span>
          </span>
        </button>

        {/* Search Bar in Header - Desktop only */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar onNavigate={onNavigate} />
        </div>

        {/* Desktop Navigation Link Actions */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {links.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors cursor-pointer py-1.5 px-2 rounded-md hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/10'
                    : ''
                }`}
                id={`nav-link-${link.path.replace('/', 'root')}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu trigger button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown strip (visible on small mobile screens below md) */}
      <div className="border-t border-gray-50 dark:border-gray-900 bg-gray-50/80 dark:bg-gray-950/80 px-4 py-2 md:hidden">
        <SearchBar onNavigate={onNavigate} placeholder="Quick search tools..." />
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white dark:bg-slate-950 px-4 py-6 shadow-md animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              const LinkIcon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                  id={`mobile-nav-link-${link.path.replace('/', 'root')}`}
                >
                  {LinkIcon && <LinkIcon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`} />}
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 grid grid-cols-2 gap-2 text-center text-xs text-gray-500">
              <button onClick={() => handleLinkClick('/privacy')} className="py-2 hover:text-emerald-600">Privacy Policy</button>
              <button onClick={() => handleLinkClick('/terms')} className="py-2 hover:text-emerald-600">Terms of Service</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
