import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AlertTriangle, Calculator, TrendingUp, Shield } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer - LaserCalc Pro',
  description: 'Important disclaimer about the accuracy and limitations of our manufacturing cost calculators. Understand the proper use of calculation results.',
  robots: 'index, follow',
};

export default function DisclaimerPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Disclaimer
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Important information about the use and limitations of our calculators
            </p>
          </div>

          {/* Warning Banner */}
          <div className="mb-12 card border-l-4 border-yellow-500 bg-yellow-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">Please Read Carefully</h2>
                <p className="text-gray-700">
                  The information and calculators provided on LaserCalc Pro are for <strong>estimation and educational purposes only</strong>. 
                  Actual results may vary significantly based on numerous factors. Always consult with qualified professionals 
                  before making business or financial decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="card prose prose-lg max-w-none">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Calculator className="h-6 w-6 text-primary-600" />
              1. General Disclaimer
            </h2>
            <p>
              The calculators, tools, and content provided on LaserCalc Pro are intended for general informational and 
              educational purposes only. They are not intended to be and should not be construed as:
            </p>
            <ul>
              <li>Professional engineering advice</li>
              <li>Financial or investment advice</li>
              <li>Accounting or tax advice</li>
              <li>Legal advice</li>
              <li>Binding quotations or estimates</li>
            </ul>
            <p>
              Always seek the advice of qualified professionals with any questions you may have regarding specific 
              manufacturing processes, financial decisions, or business operations.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>2. Accuracy of Calculations</h2>
            
            <h3>2.1 Estimation Nature</h3>
            <p>
              While we strive to provide accurate calculations based on industry-standard formulas, our results are 
              <strong> estimates only</strong>. Actual costs and performance may differ significantly due to:
            </p>
            <ul>
              <li><strong>Material Variations:</strong> Quality, grade, availability, and market pricing fluctuations</li>
              <li><strong>Equipment Differences:</strong> Make, model, age, condition, and maintenance status</li>
              <li><strong>Operational Factors:</strong> Operator skill level, workflow efficiency, and setup procedures</li>
              <li><strong>Environmental Conditions:</strong> Temperature, humidity, power quality, and facility conditions</li>
              <li><strong>Regional Variations:</strong> Local labor rates, utility costs, and regulatory requirements</li>
              <li><strong>Project Complexity:</strong> Unique specifications, tolerances, and design requirements</li>
            </ul>

            <h3>2.2 No Guarantee of Accuracy</h3>
            <p>
              We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, 
              reliability, suitability, or availability of the calculations or information provided.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 not-prose">
              <p className="text-red-900 font-semibold">
                ⚠️ Results should always be verified by qualified professionals before being used for:
              </p>
              <ul className="mt-2 text-red-800 list-disc list-inside">
                <li>Client quotations or bidding</li>
                <li>Equipment purchase decisions</li>
                <li>Financial planning or budgeting</li>
                <li>Production scheduling</li>
                <li>Contract negotiations</li>
              </ul>
            </div>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Shield className="h-6 w-6 text-primary-600" />
              3. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, LaserCalc Pro and its affiliates, officers, directors, employees, 
              and agents shall not be liable for any:
            </p>
            <ul>
              <li>Financial losses resulting from calculation inaccuracies</li>
              <li>Business losses, including lost profits, revenue, or contracts</li>
              <li>Equipment purchase decisions based on our ROI calculator</li>
              <li>Cost overruns or underestimation in project quotes</li>
              <li>Material waste or inefficiencies</li>
              <li>Production delays or failures</li>
              <li>Damage to equipment or property</li>
              <li>Personal injury or death</li>
            </ul>
            <p>
              You use the calculators and information at your own risk. Any reliance you place on such information is 
              strictly at your own discretion and risk.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>4. Specific Calculator Disclaimers</h2>

            <h3>4.1 Laser Cutting Cost Calculator</h3>
            <p>
              This calculator provides cost estimates based on standard formulas and typical operational parameters. 
              Actual laser cutting costs depend on:
            </p>
            <ul>
              <li>Specific laser type (fiber, CO2, crystal) and power rating</li>
              <li>Material grade, surface condition, and cutting complexity</li>
              <li>Assist gas type, purity, and consumption rates</li>
              <li>Lens and nozzle condition and replacement frequency</li>
              <li>Actual power consumption vs. rated capacity</li>
            </ul>

            <h3>4.2 CNC Machining Cost Estimator</h3>
            <p>
              CNC machining costs vary widely based on:
            </p>
            <ul>
              <li>Machine type, size, and capabilities</li>
              <li>Tooling requirements and tool life</li>
              <li>Material machinability and hardness</li>
              <li>Complexity of operations and required tolerances</li>
              <li>Setup time and batch size economies of scale</li>
            </ul>

            <h3>4.3 Equipment ROI Calculator</h3>
            <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <strong>Investment Warning:</strong> This calculator is for preliminary analysis only. Equipment investment 
              decisions should be based on comprehensive financial analysis including:
            </p>
            <ul>
              <li>Detailed cash flow projections</li>
              <li>Tax implications and depreciation schedules</li>
              <li>Financing terms and interest costs</li>
              <li>Market demand and capacity utilization</li>
              <li>Maintenance and operational costs</li>
              <li>Technological obsolescence risks</li>
            </ul>
            <p>
              Consult with financial advisors, accountants, and industry experts before making significant capital investments.
            </p>

            <h3>4.4 Energy Cost Calculator</h3>
            <p>
              Energy consumption estimates are based on theoretical power ratings and do not account for:
            </p>
            <ul>
              <li>Actual duty cycle and load variations</li>
              <li>Power factor and efficiency losses</li>
              <li>Ancillary equipment (chillers, compressors, exhaust systems)</li>
              <li>Seasonal variations in utility rates</li>
              <li>Peak demand charges and time-of-use pricing</li>
            </ul>

            <h3>4.5 Material Utilization Calculator</h3>
            <p>
              Material optimization calculations assume ideal conditions and may not reflect:
            </p>
            <ul>
              <li>Practical nesting limitations and constraints</li>
              <li>Kerf width variations and cutting path optimization</li>
              <li>Material defects and unusable areas</li>
              <li>Edge distance requirements and safety margins</li>
              <li>Grain direction or material orientation needs</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2>5. No Professional Relationship</h2>
            <p>
              Your use of LaserCalc Pro does not create any professional relationship between you and LaserCalc Pro. 
              We are not responsible for:
            </p>
            <ul>
              <li>Decisions made based on calculator results</li>
              <li>Contracts entered into using our estimates</li>
              <li>Equipment purchased based on ROI projections</li>
              <li>Production planning based on our calculations</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2>6. Third-Party Content and Links</h2>
            <p>
              Our website may contain links to third-party websites, products, or services. We do not endorse or assume 
              responsibility for any third-party content, and we make no warranties regarding third-party information or services.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>7. Changes and Updates</h2>
            <p>
              We reserve the right to modify, update, or discontinue any calculator or feature at any time without notice. 
              Calculation formulas may be updated to reflect industry changes or improvements, which may result in different 
              results for the same inputs.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>8. User Responsibility</h2>
            <p>
              By using LaserCalc Pro, you acknowledge and agree that:
            </p>
            <ul>
              <li>You are responsible for verifying all calculation results</li>
              <li>You will not rely solely on our calculators for business decisions</li>
              <li>You will consult with qualified professionals when appropriate</li>
              <li>You understand the limitations and assumptions of each calculator</li>
              <li>You accept full responsibility for the use of any information provided</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2>9. Governing Documents</h2>
            <p>
              This Disclaimer should be read in conjunction with our:
            </p>
            <ul>
              <li><a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a> - Legal terms governing your use of the website</li>
              <li><a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> - How we collect and use your information</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Disclaimer or need clarification about calculator limitations, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 not-prose">
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:support@lasercalcpro.com" className="text-primary-600 hover:underline">support@lasercalcpro.com</a></p>
              <p className="mb-2"><strong>Mail:</strong> LaserCalc Pro, 123 Manufacturing Street, Industrial Park, CA 94000, United States</p>
              <p><strong>Phone:</strong> +1 (555) 012-3456</p>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 not-prose">
              <p className="text-blue-900 font-semibold mb-2">
                ✓ Best Practices for Using Our Calculators:
              </p>
              <ol className="text-blue-800 list-decimal list-inside space-y-1">
                <li>Use results as preliminary estimates only</li>
                <li>Verify all critical calculations independently</li>
                <li>Add appropriate safety margins (typically 10-20%)</li>
                <li>Consult industry experts for complex projects</li>
                <li>Keep detailed records of all assumptions</li>
                <li>Update calculations as conditions change</li>
                <li>Compare results with actual costs when possible</li>
              </ol>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <a href="/about" className="card-hover group">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                About Us →
              </h3>
              <p className="text-gray-600">Learn more about LaserCalc Pro and our mission</p>
            </a>
            
            <a href="/contact" className="card-hover group">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Contact Support →
              </h3>
              <p className="text-gray-600">Get help or ask questions about our calculators</p>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
