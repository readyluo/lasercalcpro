import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const metadata = generateMetadata({
  title: 'Contact LaserCalc Pro | Manufacturing Cost Support',
  description: 'Reach the LaserCalc Pro team for calculator support, partnership requests, or ROI consulting. Typical response time: under one business day.',
  keywords: ['contact LaserCalc Pro', 'manufacturing calculator support', 'laser cutting cost support'],
});

export default function ContactPage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Navigation />
      <SchemaMarkup schema={organizationSchema} />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Get In Touch</h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Have questions, feedback, or need support? We respond within one business day.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <div className="card">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-6 w-6 text-primary-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <a href="mailto:support@lasercalcpro.com" className="text-primary-600 hover:underline">
                        support@lasercalcpro.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-6 w-6 text-primary-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <a href="tel:+1-555-0123" className="text-primary-600 hover:underline">
                        +1 (555) 012-3456
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-6 w-6 text-primary-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <p className="text-gray-600">
                        123 Manufacturing Street
                        <br />
                        Industrial Park, CA 94000
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-primary-50">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Business Hours</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="card bg-gray-100 mt-12">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Common Questions</h2>
            <p className="mb-4 text-gray-700">Before contacting us, you might find the answer in our frequently asked questions.</p>
            <a href="/#faq" className="inline-block font-semibold text-primary-600 hover:underline">
              View FAQ →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
