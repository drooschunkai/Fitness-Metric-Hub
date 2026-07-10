interface AdPlaceholderProps {
  type: 'top-banner' | 'in-content' | 'sidebar' | 'footer-anchor';
  className?: string;
}

export default function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
  // Configure appropriate CSS classes for AdSense sizing to prevent Cumulative Layout Shift (CLS)
  const sizeClasses = {
    'top-banner': 'min-h-[90px] md:min-h-[90px] min-h-[50px] w-full max-w-[728px]',
    'in-content': 'min-h-[250px] w-full max-w-[336px]',
    'sidebar': 'min-h-[600px] w-full max-w-[300px]',
    'footer-anchor': 'min-h-[90px] w-full max-w-[970px]'
  }[type];

  return (
    <div 
      className={`ad-container mx-auto my-6 bg-slate-50/20 dark:bg-slate-900/10 border border-dashed border-slate-200/50 dark:border-slate-800/30 rounded-lg ${sizeClasses} ${className}`} 
      id={`ad-wrapper-${type}`}
    >
      {/* Container is empty and prepared for AdSense dynamic injection */}
    </div>
  );
}
