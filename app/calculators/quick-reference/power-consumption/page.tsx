'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateFAQSchema, generateSoftwareApplicationSchema } from '@/lib/seo/schema';
import Link from 'next/link';
import { Zap, Info, DollarSign, Gauge, Workflow } from 'lucide-react';

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
      answer:
        'In the example tables on this page, a 6 kW fiber laser system draws on the order of 11-13 kW total including chiller, exhaust, and controls. At an electricity rate of $0.12/kWh, that corresponds to roughly $1.3-1.6 per operating hour. Actual draw and cost depend on your specific machine, duty cycle, and tariff, and many legacy CO2 systems measure significantly higher total kW for similar cutting capacity.',
    },
    {
      question: 'Why do fiber lasers use less power than CO2 lasers?',
      answer:
        'Many modern fiber lasers have higher electrical efficiency than older CO2 designs. As an illustrative example, some 3 kW fiber installations measure total system power around the mid-single-digit kW range, while certain 3 kW CO2 systems can be in the low-20 kW range. Always use vendor datasheets and measured kW at your own site for any precise comparison.',
    },
    {
      question: 'What is the biggest power consumer in a laser system?',
      answer:
        'On many fiber laser systems, the laser module is one of the largest electrical consumers, with the chiller also contributing a substantial share. On many CO2 systems, the RF power supply is a major consumer. Your own breakdown may differ, so refer to OEM documentation and measured load profiles from your equipment.',
    },
  ]);
  const softwareSchema = generateSoftwareApplicationSchema('Power Consumption Reference');

  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={softwareSchema} />
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
                <h1 className="text-4xl font-bold text-gray-900">Laser Equipment Power Consumption Reference</h1>
                <p className="text-gray-600">Complete guide to energy usage and electricity costs</p>
              </div>
            </div>
          </div>

          {/* Fiber Laser Power Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Fiber Laser Power Consumption</h2>
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
              Fiber lasers are generally more electrically efficient than legacy CO2 cutting sources. The example rows here
              reflect internal reference values; actual wall-plug efficiency and system power vary by brand, configuration,
              and duty cycle.
            </p>
          </div>

          {/* CO2 Laser Power Table */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">CO2 Laser Power Consumption</h2>
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
              CO2 cutting sources usually operate at a lower electrical efficiency than comparable fiber sources. In many
              real-world installations, measured total system kW for CO2 equipment is several times higher than for fiber
              systems of similar cutting capacity, but your exact ratio should come from your own equipment data.
            </p>
          </div>

          {/* Cost Comparison */}
          <div className="card mb-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Operating Cost Comparison</h2>
                <p className="mt-1 text-gray-700">Annual electricity costs at different usage levels</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">6 kW Fiber Laser</h3>
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
                <h3 className="mb-3 font-semibold text-gray-900">3 kW CO2 Laser</h3>
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
                <strong>Illustrative 5-year energy difference:</strong> Using the duty cycles and rates shown in this example,
                the modeled electricity spend for the fiber system is several thousand dollars lower per year than for the
                CO2 system, adding up to tens of thousands of dollars over five years at 40 hours/week. Your actual savings
                will depend on your own run-hours, tariffs, and measured kW draw.
              </p>
            </div>
          </div>

          {/* Conversion & Demand Planning */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Gauge className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Conversion & Demand Planning</h2>
                <p className="mt-1 text-gray-700">
                  Keep these factors handy when translating OEM specs into facility load studies and quotes.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Quick conversions</p>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  <li>Amps = (kW x 1000) / (Voltage x 1.732 for 3-phase).</li>
                  <li>kWh per shift ≈ average kW draw x hours; you can add an extra margin for idle or partial-load time based on your own logs (some facilities start with a 10-15% adder as a rough check).</li>
                  <li>Demand charge impact ≈ peak kW x your utility's demand rate (for example, some tariffs quote single- to low-double-digit dollars per kW of demand).</li>
                </ul>
                <p className="mt-2 text-gray-600">
                  Record the worst-case scenario (pierce, thick plate) for electrical engineers and utility filings.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">Facility checklist</p>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  <li>Verify transformer tap (208 vs 480 V) before scheduling installs.</li>
                  <li>Log chiller/exhaust location to size HVAC makeup air.</li>
                  <li>
                    Feed measured draw into the{' '}
                    <Link href="/calculators/energy" className="text-primary-700 underline-offset-2 hover:underline">
                      Energy calculator
                    </Link>{' '}
                    to compare against utility bills.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Power Factor & Load */}
          <div className="card mb-8">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Understanding Power Consumption</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Peak vs. Average Power</h3>
                <p className="text-gray-700">
                  The power ratings shown are peak consumption during cutting. Actual average power depends on duty cycle:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Continuous cutting (example):</strong> average draw can be relatively close to peak power when uptime is high.</li>
                  <li><strong>Job shop example:</strong> including setup, loading, and programming time often pulls the average below peak; use your own machine logs to quantify this.</li>
                  <li><strong>Prototype/low volume:</strong> frequent stops and changeovers usually reduce average draw further relative to the nameplate peak.</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Electrical Service Requirements</h3>
                <p className="text-gray-700">
                  Ensure your facility has adequate electrical capacity:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>1-3 kW fiber:</strong> 208V 3-phase, 30-50A service</li>
                  <li><strong>4-8 kW fiber:</strong> 208V or 480V 3-phase, 60-100A service</li>
                  <li><strong>10-15 kW fiber:</strong> 480V 3-phase, 100-150A service</li>
                  <li><strong>CO2 lasers:</strong> Typically require 480V 3-phase, add 50% capacity for RF supply</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Chiller Power Consumption</h3>
                <p className="text-gray-700">
                  Chillers are the second-largest power consumer. Factors affecting chiller power:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Ambient temperature:</strong> hot summer conditions can noticeably increase chiller power draw compared to cooler seasons.</li>
                  <li><strong>Chiller efficiency:</strong> newer, higher-efficiency designs can use significantly less power than older models; check vendor data for your specific unit.</li>
                  <li><strong>Maintenance:</strong> poor airflow and dirty condensers can increase power consumption; use your maintenance logs and meter readings to quantify the impact.</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Standby Power</h3>
                <p className="text-gray-700">
                  Lasers consume power even when idle:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li><strong>Fiber laser standby:</strong> 1-2 kW (chiller, controls, laser module warmup)</li>
                  <li><strong>CO2 laser standby:</strong> 3-5 kW (higher due to gas circulation)</li>
                  <li><strong>Tip:</strong> Turning off equipment during extended breaks (lunch, overnight) can avoid unnecessary idle kWh; in some shops this reduces total energy use by a noticeable margin, depending on schedules and tariffs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Energy Efficiency Tips */}
          <div className="card mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Energy Efficiency Optimization</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">1. Optimize Cutting Parameters</h3>
                <p className="text-sm text-gray-700">
                  In some processes, operating slightly below maximum speed and power can reduce energy use while still
                  meeting cut quality requirements. Using significantly more power than needed for the job can waste
                  energy, so validate parameter changes with test cuts and, where possible, meter readings on your own
                  machine.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">2. Maintain Chiller Efficiency</h3>
                <p className="text-sm text-gray-700">
                  Clean condenser coils regularly and follow manufacturer maintenance schedules. A well-maintained chiller
                  can use noticeably less power than a neglected one. Vendors of variable-speed compressor chillers often
                  publish efficiency improvements compared to older fixed-speed units; use their data together with your
                  own measurements to estimate potential savings.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">3. Batch Similar Jobs</h3>
                <p className="text-sm text-gray-700">
                  Minimize start/stop cycles where practical. Startup and warmup periods add non-productive time at higher
                  power draw. Batching similar jobs can reduce this overhead; some shops see meaningful energy reductions
                  when grouping work instead of cycling equipment frequently.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">4. Consider Time-of-Use Rates</h3>
                <p className="text-sm text-gray-700">
                  Many utilities offer lower rates during off-peak hours (nights, weekends). Shifting part of your
                  production to off-peak windows can materially reduce electricity spend where time-of-use pricing is
                  available. Check your actual tariff table to quantify the impact.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">5. Monitor Power Factor</h3>
                <p className="text-sm text-gray-700">
                  Poor power factor in your facility can result in utility penalties under some tariffs. Review your
                  utility bills and metering data, and consult with your utility or an electrical engineer before adding
                  power factor correction equipment. Many modern laser systems advertise improved power factor compared
                  to older CO2 designs, but you should confirm this for your specific installation.
                </p>
              </div>
            </div>
          </div>

          {/* Cost Workflow */}
          <div className="card mb-8 bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-full bg-primary-100 p-2">
                <Workflow className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Energy Cost Workflow</h2>
                <p className="mt-1 text-gray-700">
                  Connect electrical data to the calculators so quotes, ROI, and shop rates share the same inputs.
                </p>
              </div>
            </div>
            <ol className="space-y-4 text-sm text-gray-800">
              <li>
                <span className="font-semibold text-gray-900">1. Capture utility assumptions.</span> Note $/kWh, demand
                charge ($/kW), and operating hours inside your sourcing log or{' '}
                <Link href="/calculators/energy" className="text-primary-700 underline-offset-2 hover:underline">
                  Energy calculator
                </Link>{' '}
                presets.
              </li>
              <li>
                <span className="font-semibold text-gray-900">2. Convert to hourly burden.</span> Feed the measured kW and
                rates into the{' '}
                <Link href="/calculators/quick/hourly-rate" className="text-primary-700 underline-offset-2 hover:underline">
                  Hourly Rate calculator
                </Link>{' '}
                so gas, power, labor, and overhead align.
              </li>
              <li>
                <span className="font-semibold text-gray-900">3. Push downstream.</span> Reference the same energy burden
                when modeling payback in the{' '}
                <Link href="/calculators/roi" className="text-primary-700 underline-offset-2 hover:underline">
                  ROI calculator
                </Link>{' '}
                and when pricing parts in the{' '}
                <Link href="/calculators/laser-cutting" className="text-primary-700 underline-offset-2 hover:underline">
                  Laser Cutting calculator
                </Link>
                .
              </li>
            </ol>
          </div>

          {/* FAQ */}
          <div className="card mb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem
                question="How much electricity does a laser cutter use?"
                answer="In the example tables on this page, a 6 kW fiber laser system draws on the order of 11-13 kW total including chiller, exhaust, and controls. At an electricity rate of $0.12/kWh, that corresponds to roughly $1.3-1.6 per operating hour. Actual draw and cost depend on your specific machine, duty cycle, and tariff, and many legacy CO2 systems measure significantly higher total kW for similar cutting capacity."
              />
              <FAQItem
                question="Why do fiber lasers use less power than CO2 lasers?"
                answer="Many modern fiber lasers have higher electrical efficiency than older CO2 designs. As an illustrative example, some 3 kW fiber installations measure total system power around the mid-single-digit kW range, while certain 3 kW CO2 systems can be in the low-20 kW range. Always use vendor datasheets and measured kW at your own site for any precise comparison."
              />
              <FAQItem
                question="What is the biggest power consumer in a laser system?"
                answer="On many fiber laser systems, the laser module is one of the largest electrical consumers, with the chiller also contributing a substantial share. On many CO2 systems, the RF power supply is a major consumer. Your own breakdown may differ, so refer to OEM documentation and measured load profiles from your equipment."
              />
              <FAQItem
                question="Can I run a laser on single-phase power?"
                answer="Small lasers (<2 kW) may run on single-phase, but most industrial lasers require 3-phase power for efficiency and to handle high current loads. Converting single-phase to 3-phase with a phase converter is possible but inefficient."
              />
              <FAQItem
                question="How much does it cost to run a laser for a year?"
                answer="Using the example of a 6 kW fiber laser at 40 operating hours per week and $0.12/kWh, the modeled electricity cost in the table is on the order of $3,000 per year. Under the same assumptions, a comparable CO2 setup in the example is several thousand dollars higher per year. Over a decade, that gap can accumulate into tens of thousands of dollars in electricity spend, but your actual numbers should be computed using your own tariffs, run-hours, and measured kW draw."
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
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
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
