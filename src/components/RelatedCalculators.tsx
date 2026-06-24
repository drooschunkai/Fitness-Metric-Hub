import { CALCULATORS } from '../data/calculators';
import CalculatorCard from './CalculatorCard';

interface RelatedCalculatorsProps {
  slugs: string[];
  onNavigate: (path: string) => void;
}

export default function RelatedCalculators({ slugs, onNavigate }: RelatedCalculatorsProps) {
  // Retrieve corresponding config objects
  const list = CALCULATORS.filter(c => slugs.includes(c.slug)).slice(0, 3);

  if (list.length === 0) return null;

  return (
    <div className="my-8" id="related-calculators-section">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        Related Health & Fitness Calculators
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((calc) => (
          <CalculatorCard
            key={calc.slug}
            config={calc}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
