'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './Input';
import { Button } from './Button';
import { Mail, CheckCircle } from 'lucide-react';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type SubscribeInput = z.infer<typeof subscribeSchema>;

interface SubscribeFormProps {
  sourceTool?: string;
  sourcePage?: string;
  compact?: boolean;
}

export function SubscribeForm({ sourceTool, sourcePage, compact = false }: SubscribeFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeInput>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source_tool: sourceTool,
          source_page: sourcePage || window.location.pathname,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center">
        <CheckCircle className="mx-auto mb-2 h-12 w-12 text-green-600" />
        <p className="font-semibold text-green-900">Successfully subscribed!</p>
        <p className="mt-1 text-sm text-green-700">
          Please check your email to confirm your subscription.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<Mail className="h-4 w-4" />}
        >
          Subscribe
        </Button>
      </form>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-2 text-lg font-bold text-gray-900">
        Get Manufacturing Insights
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        Subscribe to receive tips, guides, and updates on manufacturing cost optimization.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          label="Email Address"
          error={errors.email?.message}
          leftIcon={<Mail className="h-4 w-4" />}
        />

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe for Free'}
        </Button>

        <p className="text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}









