import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for LaserCalc Pro - Learn how we collect, use, and protect your data.',
  noindex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="card mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mb-8 text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose max-w-none">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">1. Introduction</h2>
              <p className="mb-6 text-gray-700">
                LaserCalc Pro ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit 
                our website lasercalcpro.com.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">2.1 Information You Provide</h3>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>Email address (when subscribing to our newsletter)</li>
                <li>Name and contact information (when submitting contact forms)</li>
                <li>Calculator input data (temporarily stored for generating reports)</li>
              </ul>

              <h3 className="mb-2 text-xl font-semibold text-gray-900">2.2 Automatically Collected Information</h3>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>IP address and geographic location (for analytics and security)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookie data (see Cookie Policy below)</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
              <p className="mb-2 text-gray-700">We use the collected information for:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Providing and improving our calculator services</li>
                <li>Sending newsletters and updates (with your consent)</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Analyzing website usage and improving user experience</li>
                <li>Detecting and preventing fraud and abuse</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">4. Cookies and Tracking Technologies</h2>
              <p className="mb-2 text-gray-700">We use cookies and similar tracking technologies to:</p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic with Google Analytics</li>
                <li>Display relevant advertisements with Google AdSense</li>
                <li>Track calculation history (stored locally in your browser)</li>
              </ul>
              <p className="mb-6 text-gray-700">
                You can control cookies through your browser settings. However, disabling cookies may limit some 
                functionality of our website.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">5. Data Sharing and Disclosure</h2>
              <p className="mb-2 text-gray-700">We do not sell your personal data. We may share information with:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li><strong>Service Providers:</strong> Cloudflare (hosting), Google Analytics (analytics), Google AdSense (advertising)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">6. Data Security</h2>
              <p className="mb-6 text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal data, including 
                SSL encryption, secure servers, and access controls. However, no method of transmission over the internet 
                is 100% secure.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">7. Your Rights (GDPR & CCPA)</h2>
              <p className="mb-2 text-gray-700">You have the right to:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="mb-6 text-gray-700">
                To exercise these rights, contact us at <a href="mailto:privacy@lasercalcpro.com" className="text-primary-600 hover:underline">privacy@lasercalcpro.com</a>.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">8. Data Retention</h2>
              <p className="mb-6 text-gray-700">
                We retain personal data only as long as necessary for the purposes outlined in this policy or as required 
                by law. Calculator data is retained for up to 12 months, and subscriber data is kept until you unsubscribe.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">9. Children's Privacy</h2>
              <p className="mb-6 text-gray-700">
                Our website is not intended for children under 16. We do not knowingly collect personal data from children. 
                If you believe we have collected data from a child, please contact us immediately.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">10. International Data Transfers</h2>
              <p className="mb-6 text-gray-700">
                Your data may be transferred to and processed in countries outside your residence. We ensure adequate 
                safeguards are in place for such transfers, in compliance with applicable data protection laws.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">11. Changes to This Policy</h2>
              <p className="mb-6 text-gray-700">
                We may update this privacy policy from time to time. We will notify you of significant changes by posting 
                the new policy on this page with an updated "Last updated" date.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">12. Contact Us</h2>
              <p className="mb-2 text-gray-700">
                If you have questions about this privacy policy or our data practices, contact us at:
              </p>
              <ul className="list-none space-y-1 text-gray-700">
                <li>Email: <a href="mailto:privacy@lasercalcpro.com" className="text-primary-600 hover:underline">privacy@lasercalcpro.com</a></li>
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









