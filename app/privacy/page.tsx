import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Shield, Lock, Eye, Database, UserX, Mail } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - LaserCalc Pro',
  description: 'Learn how LaserCalc Pro collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Last updated: October 30, 2025
            </p>
          </div>

          {/* Quick Overview */}
          <div className="mb-12 card bg-primary-50">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Commitment to Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              At LaserCalc Pro, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website. We are committed to 
              ensuring that your privacy is protected and that your data is handled responsibly.
            </p>
          </div>

          {/* Main Content */}
          <div className="card prose prose-lg max-w-none">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Database className="h-6 w-6 text-primary-600" />
              Information We Collect
            </h2>
            
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Subscribe to our newsletter or email updates</li>
              <li>Fill out contact forms</li>
              <li>Request customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>
              This information may include: name, email address, phone number, and company information.
            </p>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul>
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Calculation inputs and results (anonymized)</li>
            </ul>

            <h3>Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, including:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics)</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (Google AdSense)</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Eye className="h-6 w-6 text-primary-600" />
              How We Use Your Information
            </h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li><strong>Provide Services:</strong> To deliver our calculation tools and generate reports</li>
              <li><strong>Communication:</strong> To respond to inquiries and send updates you've subscribed to</li>
              <li><strong>Analytics:</strong> To analyze usage patterns and improve our services</li>
              <li><strong>Marketing:</strong> To send newsletters and promotional materials (with your consent)</li>
              <li><strong>Security:</strong> To protect against fraud, abuse, and unauthorized access</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Lock className="h-6 w-6 text-primary-600" />
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure database storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
            <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <strong>Important:</strong> While we strive to protect your personal information, no method of 
              transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our website (e.g., hosting, analytics)</li>
              <li><strong>Advertising Partners:</strong> Google AdSense for displaying relevant advertisements</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h3>Third-Party Services</h3>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Google Analytics:</strong> For website analytics - <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Privacy Policy</a></li>
              <li><strong>Google AdSense:</strong> For displaying advertisements - <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Ad Policy</a></li>
              <li><strong>Cloudflare:</strong> For website hosting and security - <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Privacy Policy</a></li>
            </ul>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <UserX className="h-6 w-6 text-primary-600" />
              Your Privacy Rights
            </h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to our processing of your personal information</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
            </ul>
            <p>
              To exercise these rights, please contact us at <a href="mailto:privacy@lasercalcpro.com" className="text-primary-600 hover:underline">privacy@lasercalcpro.com</a>
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required by law. Calculation history 
              is anonymized and may be retained for analytics purposes.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children. If you become aware that a child has provided us with personal 
              information, please contact us immediately.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure 
              that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to 
              review this Privacy Policy periodically.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Mail className="h-6 w-6 text-primary-600" />
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 not-prose">
              <p className="mb-2"><strong>Email:</strong> <a href="mailto:privacy@lasercalcpro.com" className="text-primary-600 hover:underline">privacy@lasercalcpro.com</a></p>
              <p className="mb-2"><strong>Mail:</strong> LaserCalc Pro, 123 Manufacturing Street, Industrial Park, CA 94000, United States</p>
              <p><strong>Phone:</strong> +1 (555) 012-3456</p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <a href="/terms" className="card-hover group">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                Terms of Service →
              </h3>
              <p className="text-gray-600">Read our terms and conditions for using LaserCalc Pro</p>
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
