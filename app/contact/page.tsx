'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement actual contact form submission
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contact form data:', data);
      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
              <p className="text-xl text-gray-600">
                Have questions, feedback, or need support? We're here to help!
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="card">
                  <div className="mb-3 flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">Email</h3>
                  </div>
                  <p className="text-gray-700">support@lasercalcpro.com</p>
                  <p className="mt-2 text-sm text-gray-600">
                    We typically respond within 24 hours.
                  </p>
                </div>

                <div className="card">
                  <div className="mb-3 flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">Support</h3>
                  </div>
                  <p className="text-gray-700">
                    For technical issues, calculator questions, or feature requests.
                  </p>
                </div>

                <div className="card bg-primary-50">
                  <h3 className="mb-2 font-semibold text-gray-900">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/blog" className="text-primary-600 hover:underline">
                        Blog & Tutorials
                      </a>
                    </li>
                    <li>
                      <a href="/disclaimer" className="text-primary-600 hover:underline">
                        Disclaimer
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="text-primary-600 hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-primary-600 hover:underline">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="card lg:col-span-2">
                {isSubmitted ? (
                  <div className="rounded-lg bg-green-50 p-8 text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
                    <h3 className="mb-2 text-xl font-semibold text-green-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                      {...register('name')}
                      label="Name"
                      placeholder="Your name"
                      error={errors.name?.message}
                    />

                    <Input
                      {...register('email')}
                      type="email"
                      label="Email"
                      placeholder="your@email.com"
                      error={errors.email?.message}
                      leftIcon={<Mail className="h-4 w-4" />}
                    />

                    <Input
                      {...register('subject')}
                      label="Subject"
                      placeholder="What is this about?"
                      error={errors.subject?.message}
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        {...register('message')}
                        rows={6}
                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
                          errors.message
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                        }`}
                        placeholder="Tell us more..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      leftIcon={<Send className="h-4 w-4" />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}









