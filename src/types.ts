export type CategoryType = 'weight-management' | 'nutrition' | 'fitness-performance';

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
