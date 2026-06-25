export type CategoryType = 'weight-management' | 'nutrition' | 'fitness-performance' | 'body-composition';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ExampleCalculation {
  scenario: string;
  inputs: string;
  result: string;
}

export interface DynamicInput {
  name: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'slider';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  unitType?: 'weight' | 'height' | 'none';
  options?: { label: string; value: any }[];
}

export interface DynamicOutputMetric {
  label: string;
  valueKey: string;
  unit?: string;
  color?: string;
  isCustomText?: boolean;
}

export interface CalculatorConfig {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  category: CategoryType;
  formula: {
    name: string;
    description: string;
    latex?: string;
  };
  examples: ExampleCalculation[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  relatedGuideSlugs: string[];
  // Phase 8 Dynamic Properties
  isDynamic?: boolean;
  inputs?: DynamicInput[];
  outputs?: DynamicOutputMetric[];
  calculate?: (inputs: Record<string, any>, unit: 'metric' | 'imperial') => Record<string, any>;
  resultExplanation?: (inputs: Record<string, any>, results: Record<string, any>, unit: 'metric' | 'imperial') => string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  toc: { id: string; text: string }[];
  content: string; // HTML or Markdown format
  faqs: FAQItem[];
  relatedCalculators: string[];
}

export interface RouteState {
  path: string; // e.g. '/', '/calculators/bmi-calculator', '/guides/what-is-bmi', '/about', '/contact', '/privacy', '/terms', '/disclaimer'
  params: Record<string, string>;
}
