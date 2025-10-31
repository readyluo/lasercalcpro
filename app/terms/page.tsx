import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FileText, AlertCircle, Scale, Ban } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - LaserCalc Pro',
  description: 'Read the Terms of Service for using LaserCalc Pro. Understand your rights and responsibilities when using our manufacturing cost calculators.',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Terms of Service
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Last updated: October 30, 2025
            </p>
          </div>

          {/* Agreement Notice */}
          <div className="mb-12 card border-l-4 border-primary-600 bg-primary-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">Agreement to Terms</h2>
                <p className="text-gray-700">
                  By accessing and using LaserCalc Pro, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to abide by these Terms of Service, please do not use this website.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="card prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900">1. Use of Service</h2>
            
            <h3>1.1 Eligibility</h3>
            <p>
              You must be at least 18 years old to use this service. By using LaserCalc Pro, you represent and 
              warrant that you have the legal capacity to enter into these Terms of Service.
            </p>

            <h3>1.2 License Grant</h3>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to:
            </p>
            <ul>
              <li>Access and use our calculators for lawful purposes</li>
              <li>Generate and download calculation reports for personal or commercial use</li>
              <li>Share calculation results with proper attribution to LaserCalc Pro</li>
            </ul>

            <h3>1.3 Prohibited Uses</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Copy, modify, or create derivative works of our calculators</li>
              <li>Remove or alter any copyright, trademark, or proprietary notices</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Scale className="h-6 w-6 text-primary-600" />
              2. Intellectual Property Rights
            </h2>

            <h3>2.1 Ownership</h3>
            <p>
              All content, features, and functionality of LaserCalc Pro, including but not limited to text, graphics, 
              logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of 
              LaserCalc Pro and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3>2.2 Trademarks</h3>
            <p>
              "LaserCalc Pro" and related marks are trademarks of LaserCalc Pro. You may not use these trademarks 
              without our prior written permission.
            </p>

            <h3>2.3 User-Generated Content</h3>
            <p>
              When you submit feedback, suggestions, or other materials to us, you grant us a worldwide, perpetual, 
              irrevocable, royalty-free license to use, reproduce, modify, and distribute such materials.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>3. Calculation Accuracy and Disclaimers</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 not-prose">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Important Notice</h3>
              <p className="text-gray-700">
                While we strive for accuracy, our calculators provide estimates only. Results should be verified by 
                qualified professionals before making business decisions. See our <a href="/disclaimer" className="text-primary-600 hover:underline">Disclaimer</a> for full details.
              </p>
            </div>

            <p>
              Our calculators use industry-standard formulas, but actual costs may vary based on numerous factors 
              including but not limited to:
            </p>
            <ul>
              <li>Market conditions and material prices</li>
              <li>Equipment specifications and efficiency</li>
              <li>Operator skill and experience</li>
              <li>Local labor rates and overhead costs</li>
              <li>Specific project requirements and complexity</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Ban className="h-6 w-6 text-primary-600" />
              4. Limitation of Liability
            </h2>

            <p>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>

            <p>
              LaserCalc Pro and its affiliates, officers, employees, agents, and licensors shall not be liable for any:
            </p>
            <ul>
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Costs of obtaining substitute goods or services</li>
              <li>Business interruption or system failures</li>
            </ul>

            <p>
              This applies whether based on warranty, contract, tort, or any other legal theory, even if we have been 
              advised of the possibility of such damages.
            </p>

            <p>
              Our total liability for any claims arising from your use of the service shall not exceed $100 USD or 
              the amount you paid us in the past 12 months, whichever is less.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>5. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless LaserCalc Pro and its affiliates from any claims, 
              damages, losses, liabilities, costs, or expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul>
              <li>Your use or misuse of the service</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you submit or share through the service</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2>6. Privacy and Data</h2>
            <p>
              Your use of LaserCalc Pro is also governed by our <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>. 
              By using the service, you consent to our collection and use of information as described in the Privacy Policy.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>7. Third-Party Links and Services</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by 
              LaserCalc Pro. We have no control over and assume no responsibility for the content, privacy policies, 
              or practices of any third-party sites or services.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>8. Modifications to Service</h2>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Modify or discontinue any part of the service at any time</li>
              <li>Change, suspend, or discontinue any feature or functionality</li>
              <li>Impose limits on certain features or restrict access</li>
            </ul>
            <p>
              We will make reasonable efforts to notify users of significant changes, but we are not obligated to do so.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>9. Term and Termination</h2>
            <p>
              These Terms remain in effect while you use LaserCalc Pro. We may terminate or suspend your access 
              immediately, without prior notice or liability, for any reason, including:
            </p>
            <ul>
              <li>Breach of these Terms of Service</li>
              <li>Request by law enforcement or government agency</li>
              <li>Discontinuation of the service</li>
              <li>Technical or security issues</li>
              <li>Fraudulent, abusive, or illegal activity</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2>10. Governing Law and Dispute Resolution</h2>

            <h3>10.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, 
              United States, without regard to its conflict of law provisions.
            </p>

            <h3>10.2 Dispute Resolution</h3>
            <p>
              Any disputes arising from these Terms or your use of LaserCalc Pro shall be resolved through:
            </p>
            <ol>
              <li><strong>Informal Negotiation:</strong> Contact us to attempt to resolve the issue informally</li>
              <li><strong>Arbitration:</strong> If informal resolution fails, disputes shall be resolved through binding arbitration in California</li>
              <li><strong>Class Action Waiver:</strong> You agree to bring claims only in your individual capacity</li>
            </ol>

            <hr className="my-8 border-gray-200" />

            <h2>11. General Provisions</h2>

            <h3>11.1 Entire Agreement</h3>
            <p>
              These Terms, together with our Privacy Policy and Disclaimer, constitute the entire agreement between 
              you and LaserCalc Pro regarding the service.
            </p>

            <h3>11.2 Severability</h3>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
            </p>

            <h3>11.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h3>11.4 Assignment</h3>
            <p>
              You may not assign or transfer these Terms without our prior written consent. We may assign our rights 
              without restriction.
            </p>

            <h3>11.5 Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of material changes by 
              posting the updated Terms and updating the "Last updated" date. Your continued use of the service after 
              changes constitutes acceptance of the new Terms.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 not-prose">
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:legal@lasercalcpro.com" className="text-primary-600 hover:underline">legal@lasercalcpro.com</a></p>
              <p className="mb-2"><strong>Mail:</strong> LaserCalc Pro Legal Department, 123 Manufacturing Street, Industrial Park, CA 94000, United States</p>
              <p><strong>Phone:</strong> +1 (555) 012-3456</p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <a href="/privacy" className="card-hover group">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Privacy Policy →
              </h3>
              <p className="text-gray-600">Learn how we protect and handle your personal information</p>
            </a>
            
            <a href="/disclaimer" className="card-hover group">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Disclaimer →
              </h3>
              <p className="text-gray-600">Important information about calculation accuracy and liability</p>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
