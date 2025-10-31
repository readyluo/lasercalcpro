'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, AlertTriangle } from 'lucide-react';

interface UnsubscribeFormProps {
  email: string;
  token: string;
}

const unsubscribeReasons = [
  { value: 'too_frequent', label: 'Emails are too frequent' },
  { value: 'not_relevant', label: 'Content is not relevant to me' },
  { value: 'no_longer_needed', label: 'I no longer need these tools' },
  { value: 'privacy_concerns', label: 'Privacy concerns' },
  { value: 'other', label: 'Other (please specify)' },
];

export function UnsubscribeForm({ email, token }: UnsubscribeFormProps) {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReason) {
      alert('Please select a reason for unsubscribing');
      return;
    }

    if (selectedReason === 'other' && !otherReason.trim()) {
      alert('Please tell us why you\'re unsubscribing');
      return;
    }

    // Confirm action
    const confirmed = window.confirm(
      `Are you sure you want to unsubscribe from all LaserCalc Pro emails?\n\nYour email: ${email}`
    );

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          reason: selectedReason === 'other' ? otherReason : selectedReason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to unsubscribe');
      }

      // Redirect to success page
      router.push('/subscribe/unsubscribe-success');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      alert('Failed to unsubscribe. Please try again or contact support.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleUnsubscribe}>
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Before you go, please tell us why
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Your feedback helps us improve. This is optional but appreciated.
        </p>

        <div className="space-y-3">
          {unsubscribeReasons.map((reason) => (
            <div key={reason.value} className="flex items-start gap-3">
              <input
                type="radio"
                id={`reason-${reason.value}`}
                name="reason"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="mt-1 h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
              />
              <label
                htmlFor={`reason-${reason.value}`}
                className="flex-1 cursor-pointer text-gray-700"
              >
                {reason.label}
              </label>
            </div>
          ))}
        </div>

        {selectedReason === 'other' && (
          <div className="mt-4">
            <textarea
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Please tell us more..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
        <div className="text-sm text-orange-800">
          <p className="font-semibold">This action will:</p>
          <ul className="mt-2 space-y-1 pl-4">
            <li>• Remove your email from our mailing list</li>
            <li>• Stop all future emails from LaserCalc Pro</li>
            <li>• Cannot be undone (you'll need to resubscribe manually)</li>
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={!selectedReason || isSubmitting}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all ${
            !selectedReason || isSubmitting
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Unsubscribing...
            </>
          ) : (
            <>
              <Check className="h-5 w-5" />
              Confirm Unsubscribe
            </>
          )}
        </button>

        <a
          href="/"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          Cancel & Go Home
        </a>
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        You'll receive a confirmation email once you unsubscribe
      </p>
    </form>
  );
}

