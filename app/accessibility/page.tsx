import type { Metadata } from 'next';
import { Eye, Keyboard, VolumeX, Gauge, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement | LaserCalc Pro',
  description: 'LaserCalc Pro is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility features and commitment to WCAG compliance.',
  openGraph: {
    title: 'Accessibility Statement | LaserCalc Pro',
    description: 'LaserCalc Pro is committed to ensuring digital accessibility for people with disabilities.',
  },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-8 w-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Accessibility Statement
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Commitment */}
        <section className="mb-12">
          <div className="p-6 bg-primary-50 rounded-lg border border-primary-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Commitment to Accessibility
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              LaserCalc Pro is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that everyone, regardless of ability, should have access to accurate laser cutting and CNC machining cost calculations. Accessibility is not just a legal requirement—it's the right thing to do.
            </p>
          </div>
        </section>

        {/* WCAG Compliance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Conformance Status
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  WCAG 2.1 Level AA Compliance
                </h3>
                <p className="text-gray-700 mb-3">
                  The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. LaserCalc Pro aims to conform to WCAG 2.1 Level AA.
                </p>
                <div className="bg-gray-50 rounded p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Conformance levels explained:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Level A:</strong> Minimum level of conformance</li>
                    <li><strong>Level AA:</strong> Deals with the biggest barriers for disabled users (our target)</li>
                    <li><strong>Level AAA:</strong> Highest level of conformance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Partial Compliance
                </h3>
                <p className="text-gray-700">
                  While we strive for full WCAG 2.1 Level AA conformance, some content may not yet meet all success criteria. We are actively working to address these areas and welcome feedback to help us improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Accessibility Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Keyboard Navigation */}
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-3">
                <Keyboard className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Keyboard Navigation
                  </h3>
                  <p className="text-gray-700 text-sm">
                    All interactive elements can be accessed and operated using a keyboard alone. Use Tab to navigate forward, Shift+Tab to navigate backward, and Enter/Space to activate elements.
                  </p>
                </div>
              </div>
            </div>

            {/* Screen Reader Support */}
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-3">
                <VolumeX className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Screen Reader Compatibility
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Our site is designed to work with popular screen readers including JAWS, NVDA, and VoiceOver. All meaningful content is accessible via assistive technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Design */}
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-3">
                <Eye className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Visual Accessibility
                  </h3>
                  <p className="text-gray-700 text-sm">
                    High contrast text, sufficient color contrast ratios (minimum 4.5:1 for normal text), and clear visual indicators for focus states help users with low vision or color blindness.
                  </p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-3">
                <Gauge className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Fast Performance
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Optimized page load times and responsive interactions benefit users with cognitive disabilities and those using assistive technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Technical Specifications
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              Accessibility of LaserCalc Pro relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>HTML5</strong> for structure and semantics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>WAI-ARIA</strong> for enhanced accessibility semantics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>CSS</strong> for styling and visual presentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span><strong>JavaScript</strong> for enhanced interactivity</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4 text-sm">
              These technologies are relied upon for conformance with the accessibility standards used.
            </p>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Known Limitations
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              Despite our best efforts to ensure accessibility, there may be some limitations. Below are known areas we are working to improve:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Complex Calculators</h4>
                <p className="text-sm text-gray-700">
                  Some advanced calculator interfaces with dynamic form fields may present challenges for screen reader users. We are working on enhanced ARIA labels and live region announcements.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">PDF Exports</h4>
                <p className="text-sm text-gray-700">
                  Generated PDF reports may not be fully accessible to screen readers. We are exploring accessible PDF generation solutions.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">Third-Party Content</h4>
                <p className="text-sm text-gray-700">
                  Third-party embedded content (such as advertisements) may not meet our accessibility standards. We are working with our partners to improve this.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Assessment Approach
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              LaserCalc Pro assessed the accessibility of this website by the following approaches:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Self-evaluation:</strong> Internal accessibility reviews and testing with assistive technologies</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Automated testing:</strong> Using tools like axe DevTools, Lighthouse, and WAVE</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Manual testing:</strong> Keyboard navigation, screen reader testing (NVDA, JAWS, VoiceOver)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>User feedback:</strong> Incorporating feedback from users with disabilities</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Feedback */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg border border-primary-200 p-8">
            <div className="flex items-start gap-4 mb-4">
              <MessageSquare className="h-8 w-8 text-primary-600 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  We Welcome Your Feedback
                </h2>
                <p className="text-gray-700 mb-4">
                  We welcome your feedback on the accessibility of LaserCalc Pro. Please let us know if you encounter accessibility barriers:
                </p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li><strong>Email:</strong> accessibility@lasercalcpro.com</li>
                  <li><strong>Contact Form:</strong> <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Visit our contact page</a></li>
                </ul>
                <p className="text-gray-700 text-sm">
                  We try to respond to accessibility feedback within 3-5 business days. If you require assistance in a specific format (such as large print or audio), please let us know and we will do our best to accommodate your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formal Complaints */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Formal Complaints
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              If you are not satisfied with our response to your accessibility concerns, you have the right to file a complaint with:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>United States:</strong>
                <br />
                <a href="https://www.ada.gov/filing_complaint.htm" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  U.S. Department of Justice - ADA Complaint Filing →
                </a>
              </li>
              <li>
                <strong>European Union:</strong>
                <br />
                <a href="https://ec.europa.eu/info/law/better-regulation/have-your-say_en" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  European Commission - Web Accessibility Directive →
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Compatibility */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Compatibility with Browsers and Assistive Technology
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              LaserCalc Pro is designed to be compatible with the following assistive technologies:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Desktop Browsers</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Chrome (latest version)</li>
                  <li>• Firefox (latest version)</li>
                  <li>• Safari (latest version)</li>
                  <li>• Edge (latest version)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Screen Readers</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• JAWS (recent versions)</li>
                  <li>• NVDA (recent versions)</li>
                  <li>• VoiceOver (macOS/iOS)</li>
                  <li>• TalkBack (Android)</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-4 text-sm">
              LaserCalc Pro is not compatible with browsers older than 3 major versions or assistive technologies older than 2 major versions.
            </p>
          </div>
        </section>

        {/* Updates */}
        <section>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Statement Updates
            </h2>
            <p className="text-gray-700 text-sm">
              This accessibility statement was created on {new Date('2025-01-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and was last reviewed on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

