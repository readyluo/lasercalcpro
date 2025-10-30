import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for LaserCalc Pro - Read our terms and conditions for using our calculators.',
  noindex: false,
});

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="card mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Terms of Service</h1>
            <p className="mb-8 text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose max-w-none">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              <p className="mb-6 text-gray-700">
                By accessing and using LaserCalc Pro ("the Service"), you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Service.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">2. Description of Service</h2>
              <p className="mb-6 text-gray-700">
                LaserCalc Pro provides free online calculators for manufacturing cost estimation, including but not limited to 
                laser cutting, CNC machining, ROI analysis, energy cost, and material utilization calculations. The Service is 
                provided "as is" without warranties of any kind.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">3. User Responsibilities</h2>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">3.1 Acceptable Use</h3>
              <p className="mb-2 text-gray-700">You agree to use the Service only for lawful purposes. You must not:</p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>Use the Service in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems or data</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated systems (bots, scrapers) without permission</li>
                <li>Transmit malicious code, viruses, or harmful content</li>
                <li>Misrepresent your identity or affiliation</li>
              </ul>

              <h3 className="mb-2 text-xl font-semibold text-gray-900">3.2 Accuracy of Information</h3>
              <p className="mb-6 text-gray-700">
                You are responsible for ensuring the accuracy of all data you input into our calculators. We are not 
                responsible for errors resulting from incorrect input data.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">4. Intellectual Property Rights</h2>
              <p className="mb-6 text-gray-700">
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos, 
                code, and software, are owned by LaserCalc Pro and protected by copyright, trademark, and other intellectual 
                property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">5. Disclaimer of Warranties</h2>
              <p className="mb-2 text-gray-700">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Accuracy, reliability, or completeness of calculations</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of data transmission</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">6. Limitation of Liability</h2>
              <p className="mb-6 text-gray-700">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LASERCALC PRO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES ARISING FROM:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Your use or inability to use the Service</li>
                <li>Errors, inaccuracies, or omissions in calculation results</li>
                <li>Business decisions made based on our calculators</li>
                <li>Unauthorized access to your data</li>
                <li>Interruption or termination of the Service</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">7. Indemnification</h2>
              <p className="mb-6 text-gray-700">
                You agree to indemnify, defend, and hold harmless LaserCalc Pro, its affiliates, officers, directors, employees, 
                and agents from any claims, liabilities, damages, losses, costs, or expenses arising from your use of the Service, 
                violation of these Terms, or infringement of any third-party rights.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">8. Third-Party Links and Services</h2>
              <p className="mb-6 text-gray-700">
                Our Service may contain links to third-party websites or services. We are not responsible for the content, 
                privacy policies, or practices of third-party sites. You access third-party services at your own risk.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">9. Advertising</h2>
              <p className="mb-6 text-gray-700">
                The Service displays advertisements through Google AdSense and other advertising partners. We are not responsible 
                for the content of advertisements or products/services advertised. Clicking on ads is at your own discretion and risk.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">10. Modifications to Service</h2>
              <p className="mb-6 text-gray-700">
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice. 
                We are not liable for any modification, suspension, or discontinuation of the Service.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">11. Termination</h2>
              <p className="mb-6 text-gray-700">
                We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, 
                including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">12. Governing Law</h2>
              <p className="mb-6 text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard 
                to its conflict of law provisions. Any disputes shall be resolved in the courts located in [Your Jurisdiction].
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">13. Changes to Terms</h2>
              <p className="mb-6 text-gray-700">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by updating 
                the "Last updated" date. Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">14. Severability</h2>
              <p className="mb-6 text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
                eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">15. Contact Information</h2>
              <p className="mb-2 text-gray-700">
                For questions about these Terms, please contact us at:
              </p>
              <ul className="list-none space-y-1 text-gray-700">
                <li>Email: <a href="mailto:legal@lasercalcpro.com" className="text-primary-600 hover:underline">legal@lasercalcpro.com</a></li>
                <li>Website: <a href="https://lasercalcpro.com/contact" className="text-primary-600 hover:underline">lasercalcpro.com/contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


