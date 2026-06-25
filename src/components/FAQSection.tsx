import { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions", description = "Get answers to common queries based on clinical literature and fitness research." }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="my-8" aria-labelledby="faq-section-heading" id="faq-section">
      <div className="border border-slate-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 p-6 md:p-8 shadow-sm">
        <div className="flex items-start gap-3.5 mb-6">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-xl">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h2 id="faq-section-heading" className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all duration-300 ${
                  isOpen
                    ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/10 dark:bg-emerald-950/5 shadow-xs'
                    : 'border-slate-200 dark:border-gray-800/80 hover:border-slate-300 dark:hover:border-gray-700 bg-white dark:bg-gray-950'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left font-semibold text-slate-800 dark:text-gray-100 text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl"
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-slate-100 dark:border-gray-800' : 'max-h-0'
                  }`}
                >
                  <p className="p-4 text-sm text-black dark:text-white leading-relaxed text-justify">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
