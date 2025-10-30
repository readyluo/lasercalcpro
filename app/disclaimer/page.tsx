import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';
import { AlertTriangle } from 'lucide-react';

export const metadata = generateMetadata({
  title: 'Disclaimer',
  description: 'Important disclaimer regarding the use of LaserCalc Pro calculators and cost estimates.',
  noindex: false,
});

export default function DisclaimerPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="card mx-auto max-w-4xl">
            <div className="mb-6 flex items-start gap-4">
              <AlertTriangle className="h-10 w-10 flex-shrink-0 text-yellow-600" />
              <div>
                <h1 className="mb-2 text-4xl font-bold text-gray-900">Disclaimer</h1>
                <p className="text-gray-600">
                  Important information about using LaserCalc Pro calculators
                </p>
              </div>
            </div>

            <div className="prose max-w-none">
              <div className="mb-6 rounded-lg bg-yellow-50 p-4">
                <p className="text-sm font-semibold text-yellow-900">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">General Disclaimer</h2>
              <p className="mb-6 text-gray-700">
                The information and calculations provided by LaserCalc Pro are for <strong>informational and educational 
                purposes only</strong>. While we strive to provide accurate and reliable tools, the results should not be 
                considered as professional advice or guaranteed cost estimates.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Calculator Accuracy</h2>
              <p className="mb-4 text-gray-700">
                Our calculators use industry-standard formulas and reasonable assumptions. However:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Results are estimates and may vary from actual costs by ±5-20% or more</li>
                <li>Calculations depend on the accuracy of user-provided input data</li>
                <li>Real-world factors (equipment efficiency, operator skill, material quality, etc.) significantly affect actual costs</li>
                <li>Market conditions, supplier pricing, and regional variations can cause substantial differences</li>
                <li>We do not guarantee the accuracy, completeness, or reliability of any calculations</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">No Professional Advice</h2>
              <p className="mb-6 text-gray-700">
                LaserCalc Pro <strong>does not provide professional manufacturing, engineering, financial, or business 
                consulting advice</strong>. The calculators are tools to assist with preliminary estimates only. For critical 
                business decisions, always consult with:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Qualified manufacturing engineers</li>
                <li>Certified financial advisors</li>
                <li>Industry experts with relevant experience</li>
                <li>Your equipment suppliers and vendors</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">User Responsibility</h2>
              <p className="mb-4 text-gray-700">
                By using our Service, you acknowledge and agree that:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>You are solely responsible for verifying all calculation results</li>
                <li>You will not rely solely on our calculators for business-critical decisions</li>
                <li>You understand that actual costs may differ significantly from estimates</li>
                <li>You will validate estimates with real quotes from suppliers and manufacturers</li>
                <li>You accept all risks associated with using our calculators</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              <p className="mb-6 text-gray-700">
                LaserCalc Pro, its owners, operators, and contributors shall <strong>NOT be liable</strong> for:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Any financial losses resulting from business decisions based on our calculations</li>
                <li>Errors, inaccuracies, or omissions in calculation results</li>
                <li>Differences between estimated and actual manufacturing costs</li>
                <li>Lost profits, revenue, or business opportunities</li>
                <li>Equipment purchases or investment decisions</li>
                <li>Project failures or cost overruns</li>
                <li>Any direct, indirect, incidental, or consequential damages</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Factors Affecting Real Costs</h2>
              <p className="mb-2 text-gray-700">
                Actual manufacturing costs are influenced by numerous factors that our calculators cannot fully account for:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Equipment age, condition, and maintenance status</li>
                <li>Operator experience and skill level</li>
                <li>Material quality variations and supplier pricing</li>
                <li>Production volume and batch size effects</li>
                <li>Setup time and tooling costs</li>
                <li>Scrap rates and rework requirements</li>
                <li>Overhead allocation and indirect costs</li>
                <li>Regional labor and utility cost differences</li>
                <li>Currency exchange rates and inflation</li>
                <li>Supply chain disruptions and lead times</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Third-Party Content</h2>
              <p className="mb-6 text-gray-700">
                Our website may display third-party advertisements and links. We are not responsible for the accuracy, 
                legality, or content of external sites or advertisements. Interactions with third parties are at your own risk.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">No Warranty</h2>
              <p className="mb-6 text-gray-700">
                The Service is provided "as is" and "as available" <strong>without any warranties</strong>, express or implied, 
                including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. 
                We do not warrant that:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>Results will be accurate, reliable, or complete</li>
                <li>Any errors or defects will be corrected</li>
                <li>The Service will meet your specific requirements</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Formula Sources</h2>
              <p className="mb-6 text-gray-700">
                Our calculators are based on publicly available industry formulas, engineering handbooks, and manufacturing 
                best practices. While we believe these sources to be reliable, we cannot guarantee their accuracy or 
                applicability to your specific situation.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Updates and Changes</h2>
              <p className="mb-6 text-gray-700">
                We reserve the right to modify, update, or discontinue any calculator or feature at any time without notice. 
                Formulas and calculation methods may be updated based on user feedback and industry developments.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Regional Variations</h2>
              <p className="mb-6 text-gray-700">
                Cost factors vary significantly by geographic region. Our calculators use general industry averages and may 
                not accurately reflect costs in your specific location. Always verify with local suppliers and service providers.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Recommendation</h2>
              <div className="mb-6 rounded-lg bg-blue-50 p-6">
                <p className="font-semibold text-blue-900">Best Practice:</p>
                <p className="mt-2 text-blue-800">
                  Use LaserCalc Pro calculators as a <strong>starting point</strong> for cost estimation. Always:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-6 text-blue-800">
                  <li>Get multiple quotes from actual suppliers</li>
                  <li>Validate assumptions with industry experts</li>
                  <li>Add safety margins (10-30%) to estimates</li>
                  <li>Test with pilot runs before full production</li>
                  <li>Consult professionals for major investments</li>
                </ul>
              </div>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">Contact</h2>
              <p className="text-gray-700">
                If you have questions about this disclaimer or our calculators, please{' '}
                <a href="/contact" className="text-primary-600 hover:underline">
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}









