'use client';

import { useState } from 'react';
import { ChevronDown, Link as LinkIcon } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  categoryId: string;
  defaultOpenIndex?: number | null;
}

export function FAQAccordion({ faqs, categoryId, defaultOpenIndex = null }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const copyAnchorLink = (index: number) => {
    const anchor = `${categoryId}-q${index + 1}`;
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    navigator.clipboard.writeText(url);
    
    // Optional: Show a brief toast notification
    // You could implement a toast system here
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const anchorId = `${categoryId}-q${index + 1}`;
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            id={anchorId}
            className="group rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-primary-300 hover:shadow-md"
          >
            <button
              onClick={() => handleToggle(index)}
              className="flex w-full items-start justify-between gap-4 p-6 text-left"
              aria-expanded={isOpen}
              aria-controls={`answer-${anchorId}`}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                  {faq.question}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAnchorLink(index);
                  }}
                  className="rounded-lg p-2 text-gray-400 opacity-0 transition-all hover:bg-gray-100 hover:text-primary-600 group-hover:opacity-100"
                  aria-label="Copy link to this question"
                  title="Copy link"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
                <ChevronDown
                  className={`h-6 w-6 flex-shrink-0 text-primary-600 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>

            <div
              id={`answer-${anchorId}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                  <p className="leading-relaxed text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

