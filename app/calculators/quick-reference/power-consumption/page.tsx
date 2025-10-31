'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Zap, Info, DollarSign } from 'lucide-react';

const fiberLaserPower = [
  { power: '1 kW', laserModule: '1 kW', chiller: '1.5 kW', exhaust: '0.5 kW', control: '0.3 kW', total: '3.3 kW', typical: '3-4 kW' },
  { power: '2 kW', laserModule: '2 kW', chiller: '2.0 kW', exhaust: '0.7 kW', control: '0.3 kW', total: '5.0 kW', typical: '5-6 kW' },
  { power: '3 kW', laserModule: '3 kW', chiller: '2.5 kW', exhaust: '0.8 kW', control: '0.5 kW', total: '6.8 kW', typical: '7-8 kW' },
  { power: '4 kW', laserModule: '4 kW', chiller: '3.0 kW', exhaust: '1.0 kW', control: '0.5 kW', total: '8.5 kW', typical: '9-10 kW' },
  { power: '6 kW', laserModule: '6 kW', chiller: '3.5 kW', exhaust: '1.2 kW', control: '0.5 kW', total: '11.2 kW', typical: '11-13 kW' },
  { power: '8 kW', laserModule: '8 kW', chiller: '4.0 kW', exhaust: '1.5 kW', control: '0.5 kW', total: '14.0 kW', typical: '14-16 kW' },
  { power: '12 kW', laserModule: '12 kW', chiller: '5.0 kW', exhaust: '2.0 kW', control: '0.8 kW', total: '19.8 kW', typical: '20-22 kW' },
  { power: '15 kW', laserModule: '15 kW', chiller: '6.0 kW', exhaust: '2.5 kW', control: '1.0 kW', total: '24.5 kW', typical: '25-28 kW' },
];

const co2LaserPower = [
  { power: '1 kW', laserTube: '1 kW', rfPower: '4 kW', chiller: '3 kW', exhaust: '1 kW', control: '0.5 kW', total: '9.5 kW', typical: '10-12 kW' },
  { power: '2 kW', laserTube: '2 kW', rfPower: '8 kW', chiller: '4 kW', exhaust: '1.5 kW', control: '0.5 kW', total: '16.0 kW', typical: '16-20 kW' },
  { power: '3 kW', laserTube: '3 kW', rfPower: '12 kW', chiller: '5 kW', exhaust: '2.0 kW', control: '0.8 kW', total: '22.8 kW', typical: '23-28 kW' },
  { power: '4 kW', laserTube: '4 kW', rfPower: '16 kW', chiller: '6 kW', exhaust: '2.5 kW', control: '1.0 kW', total: '29.5 kW', typical: '30-35 kW' },
  { power: '6 kW', laserTube: '6 kW', rfPower: '24 kW', chiller: '8 kW', exhaust: '3.0 kW', control: '1.2 kW', total: '42.2 kW', typical: '42-50 kW' },
];

export default function PowerConsumptionReferencePage() {
  const faqSchema = generateFAQSchema([
    {
      question: 'How much electricity does a laser cutter use?',
      answer: 'A 6kW fiber laser system typically draws 11-13kW total power including chiller, exhaust, and controls. At $0.12/kWh, this costs about $1.32-1.56 per hour of operation. CO2 lasers use 3-4x more power for equivalent cutting capacity.',
    },
    {
      question: 'Why do fiber lasers use less power than CO2 lasers?',
      answer: 'Fiber lasers are 25-30% electrically efficient vs 8-12% for CO2 lasers. A 3kW fiber laser draws ~7kW total power, while a 3kW CO2 laser draws ~23kW. This 3x difference significantly impacts operating costs.',
    },
    {
      question: 'What is the biggest power consumer in a laser system?',
      answer: 'For fiber lasers, the laser module itself is the largest consumer (50-60% of total). For CO2 lasers, the RF power supply uses the most (60-70%). Chillers are the second-largest consumer in both systems.',
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-3">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Laser Equipment Power Consumption Reference</h1>
                <p className="text-gray-600">Complete guide to energy usage and electricity costs</p>
              </div>
            </div>
          </div>

          {/* Fiber Laser Power Table */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Fiber Laser Power Consumption</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Laser Power</th>
                    <th className="pb-2 text-right font-semibold">Laser Module</th>
                    <th className="pb-2 text-right font-semibold">Chiller</th>
                    <th className="pb-2 text-right font-semibold">Exhaust</th>
                    <th className="pb-2 text-right font-semibold">Controls</th>
                    <th className="pb-2 text-right font-semibold">Total System</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {fiberLaserPower.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{row.power}</td>
                      <td className="py-2 text-right">{row.laserModule}</td>
                      <td className="py-2 text-right">{row.chiller}</td>
                      <td className="py-2 text-right">{row.exhaust}</td>
                      <td className="py-2 text-right">{row.control}</td>
                      <td className="py-2 text-right font-semibold">{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Fiber lasers are highly efficient: 25-30% wall-plug efficiency. Actual power varies by brand and configuration.
            </p>
          </div>

          {/* CO2 Laser Power Table */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">CO2 Laser Power Consumption</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="pb-2 text-left font-semibold">Laser Power</th>
                    <th className="pb-2 text-right font-semibold">Laser Tube</th>
                    <th className="pb-2 text-right font-semibold">RF Supply</th>
                    <th className="pb-2 text-right font-semibold">Chiller</th>
                    <th className="pb-2 text-right font-semibold">Exhaust</th>
                    <th className="pb-2 text-right font-semibold">Total System</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {co2LaserPower.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{row.power}</td>
                      <td className="py-2 text-right">{row.laserTube}</td>
                      <td className="py-2 text-right">{row.rfPower}</td>
                      <td className="py-2 text-right">{row.chiller}</td>
                      <td className="py-2 text-right">{row.exhaust}</td>
                      <td className="py-2 text-right font-semibold">{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              CO2 lasers are less efficient: 8-12% wall-plug efficiency. They consume 3-4x more power than equivalent fiber lasers.
            </p>
          </div>

          {/* Cost Comparison */}
          <div className="card mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Operating Cost Comparison</h2>
                <p className="mt-1 text-gray-700">Annual electricity costs at different usage levels</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">6kW Fiber Laser</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total power draw:</span>
                    <span className="font-semibold">12 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per hour ($0.12/kWh):</span>
                    <span className="font-semibold">$1.44</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>20 hrs/week:</span>
                      <span className="font-semibold">$1,498/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>40 hrs/week:</span>
                      <span className="font-semibold">$2,995/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>60 hrs/week:</span>
                      <span className="font-semibold">$4,493/year</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">3kW CO2 Laser</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total power draw:</span>
                    <span className="font-semibold">25 kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per hour ($0.12/kWh):</span>
                    <span className="font-semibold">$3.00</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>20 hrs/week:</span>
                      <span className="font-semibold text-red-600">$3,120/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>40 hrs/week:</span>
                      <span className="font-semibold text-red-600">$6,240/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>60 hrs/week:</span>
                      <span className="font-semibold text-red-600">$9,360/year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-primary-100 p-4">
              <p className="text-sm text-gray-800">
                <strong>5-Year Energy Savings:</strong> A 6kW fiber laser saves $10k-25k in electricity costs compared 
                to a 3kW CO2 laser over 5 years (40 hrs/week operation). This often justifies the higher initial equipment cost.
              </p>
            </div>
          </div>

          {/* Power Factor & Load */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Understanding Power Consumption</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Peak vs. Average Power</h3>
                <p className="text-gray-700">
                  The power ratings shown are peak consumption during cutting. Actual average power depends on duty cycle:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Continuous cutting:</strong> 80-90% of peak power</li>
                  <li><strong>Typical job shop:</strong> 60-70% of peak (includes setup, loading, programming)</li>
                  <li><strong>Prototype/low volume:</strong> 40-50% of peak</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Electrical Service Requirements</h3>
                <p className="text-gray-700">
                  Ensure your facility has adequate electrical capacity:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>1-3kW fiber:</strong> 208V 3-phase, 30-50A service</li>
                  <li><strong>4-8kW fiber:</strong> 208V or 480V 3-phase, 60-100A service</li>
                  <li><strong>10-15kW fiber:</strong> 480V 3-phase, 100-150A service</li>
                  <li><strong>CO2 lasers:</strong> Typically require 480V 3-phase, add 50% capacity for RF supply</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Chiller Power Consumption</h3>
                <p className="text-gray-700">
                  Chillers are the second-largest power consumer. Factors affecting chiller power:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Ambient temperature:</strong> +20% power in summer vs. winter</li>
                  <li><strong>Chiller efficiency:</strong> Modern scroll compressors use 30% less than older models</li>
                  <li><strong>Maintenance:</strong> Dirty condensers increase power by 15-25%</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 font-semibold text-gray-900">Standby Power</h3>
                <p className="text-gray-700">
                  Lasers consume power even when idle:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Fiber laser standby:</strong> 1-2 kW (chiller, controls, laser module warmup)</li>
                  <li><strong>CO2 laser standby:</strong> 3-5 kW (higher due to gas circulation)</li>
                  <li><strong>Tip:</strong> Turn off equipment during extended breaks (lunch, overnight) to save 10-20% on energy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Energy Efficiency Tips */}
          <div className="card mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Energy Efficiency Optimization</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">1. Optimize Cutting Parameters</h3>
                <p className="text-sm text-gray-700">
                  Running at 80-90% of maximum speed often uses 20-30% less power than maximum speed while maintaining 
                  acceptable cut quality. Over-powering (using 6kW when 4kW suffices) wastes energy.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">2. Maintain Chiller Efficiency</h3>
                <p className="text-sm text-gray-700">
                  Clean condenser coils quarterly, check refrigerant levels annually. A well-maintained chiller uses 
                  15-25% less power. Consider upgrading to variable-speed compressor chillers for 30% energy savings.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">3. Batch Similar Jobs</h3>
                <p className="text-sm text-gray-700">
                  Minimize start/stop cycles. Each laser startup consumes 2-5 minutes of full power for warmup. 
                  Batching jobs saves 10-15% on energy costs compared to frequent on/off cycling.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">4. Consider Time-of-Use Rates</h3>
                <p className="text-sm text-gray-700">
                  Many utilities offer lower rates during off-peak hours (nights, weekends). Shifting production to 
                  off-peak can save 30-50% on electricity costs. Check if your utility offers time-of-use pricing.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">5. Monitor Power Factor</h3>
                <p className="text-sm text-gray-700">
                  Poor power factor (&lt;0.85) can result in utility penalties. Install power factor correction capacitors 
                  if needed. Most modern laser systems have good power factor (&gt;0.90), but older CO2 lasers may need correction.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="How much electricity does a laser cutter use?"
                answer="A 6kW fiber laser system typically draws 11-13kW total power including chiller, exhaust, and controls. At $0.12/kWh, this costs about $1.32-1.56 per hour of operation. CO2 lasers use 3-4x more power for equivalent cutting capacity."
              />
              <FAQItem
                question="Why do fiber lasers use less power than CO2 lasers?"
                answer="Fiber lasers are 25-30% electrically efficient vs 8-12% for CO2 lasers. A 3kW fiber laser draws ~7kW total power, while a 3kW CO2 laser draws ~23kW. This 3x difference significantly impacts operating costs."
              />
              <FAQItem
                question="What is the biggest power consumer in a laser system?"
                answer="For fiber lasers, the laser module itself is the largest consumer (50-60% of total). For CO2 lasers, the RF power supply uses the most (60-70%). Chillers are the second-largest consumer in both systems."
              />
              <FAQItem
                question="Can I run a laser on single-phase power?"
                answer="Small lasers (<2kW) may run on single-phase, but most industrial lasers require 3-phase power for efficiency and to handle high current loads. Converting single-phase to 3-phase with a phase converter is possible but inefficient."
              />
              <FAQItem
                question="How much does it cost to run a laser for a year?"
                answer="A 6kW fiber laser at 40 hrs/week costs approximately $3,000/year in electricity ($0.12/kWh). A comparable CO2 laser costs $6,000-7,000/year. Over 10 years, fiber lasers save $30k-40k in energy costs alone."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/calculators/energy" className="card-hover group border-l-4 border-yellow-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Energy Cost Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate detailed power consumption and electricity costs for your equipment
                </p>
              </Link>

              <Link href="/calculators/quick/hourly-rate" className="card-hover group border-l-4 border-indigo-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Hourly Rate Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Include electricity costs in your true hourly operating rate
                </p>
              </Link>

              <Link href="/calculators/roi" className="card-hover group border-l-4 border-purple-600">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Equipment ROI Calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Factor in energy savings when comparing fiber vs CO2 laser investments
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg border border-gray-200 transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-gray-900">{question}</h3>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

