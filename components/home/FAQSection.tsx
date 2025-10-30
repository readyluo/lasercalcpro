'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Are the calculators really free to use?',
    answer: 'Yes! All our calculators are 100% free with no hidden fees, registration requirements, or usage limits. We believe in providing valuable tools to the manufacturing community.'
  },
  {
    question: 'How accurate are the cost calculations?',
    answer: 'Our calculators use industry-standard formulas and are calibrated against real-world data, achieving approximately 98% accuracy. However, results are estimates and should be verified by professionals before making business decisions. Actual costs may vary based on specific conditions.'
  },
  {
    question: 'Can I export calculation results?',
    answer: 'Absolutely! Every calculator allows you to export your results as professional PDF reports. These reports include detailed cost breakdowns, charts, and all input parameters - perfect for client presentations, internal reviews, or record keeping.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account required! You can use all calculators instantly without signing up. However, subscribing to our newsletter gives you access to exclusive tips, industry insights, and calculator updates.'
  },
  {
    question: 'What makes LaserCalc Pro different from other cost calculators?',
    answer: 'We offer comprehensive, professionally-designed calculators that cover multiple aspects of manufacturing costs - not just basic estimates. Our tools include material utilization optimization, batch pricing, detailed breakdowns, and PDF export capabilities, all with a focus on accuracy and ease of use.'
  },
  {
    question: 'Can I use these calculators for commercial quotes?',
    answer: 'Yes, many manufacturers use our calculators as a starting point for customer quotes and internal cost analysis. However, we recommend adding appropriate safety margins (typically 10-20%) and verifying critical calculations independently.'
  },
  {
    question: 'Are calculations stored or shared?',
    answer: 'Your calculation data is processed locally in your browser and not stored on our servers. We respect your privacy and do not collect or share specific calculation details. See our Privacy Policy for more information.'
  },
  {
    question: 'What browsers and devices are supported?',
    answer: 'Our calculators work on all modern browsers (Chrome, Firefox, Safari, Edge) and are fully responsive for desktop, tablet, and mobile devices. For the best experience, we recommend using the latest browser version.'
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl" id="faq">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our calculators
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ${
                  openIndex === index
                    ? 'grid-rows-[1fr] opacity-100 mt-3'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-block rounded-lg border-2 border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
