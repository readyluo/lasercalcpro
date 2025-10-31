'use client';

import { useState } from 'react';
import { Save, Loader2, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Subscriber {
  id: number;
  email: string;
  preferences?: {
    weeklyUpdates?: boolean;
    tutorials?: boolean;
    productNews?: boolean;
    promotions?: boolean;
  };
  frequency?: string;
}

interface SubscriptionPreferencesFormProps {
  subscriber: Subscriber;
  token: string;
}

export function SubscriptionPreferencesForm({ subscriber, token }: SubscriptionPreferencesFormProps) {
  const defaultPreferences = {
    weeklyUpdates: true,
    tutorials: true,
    productNews: true,
    promotions: false,
  };

  const [preferences, setPreferences] = useState(subscriber.preferences || defaultPreferences);
  const [frequency, setFrequency] = useState(subscriber.frequency || 'weekly');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTogglePreference = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);

    try {
      const response = await fetch('/api/subscribe/update-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          preferences,
          frequency,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        What Would You Like to Receive?
      </h2>

      {/* Email Type Preferences */}
      <div className="mb-8 space-y-4">
        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
          <input
            type="checkbox"
            id="weekly-updates"
            checked={preferences.weeklyUpdates}
            onChange={() => handleTogglePreference('weeklyUpdates')}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="weekly-updates" className="flex-1 cursor-pointer">
            <div className="font-semibold text-gray-900">Weekly Tool Updates</div>
            <div className="text-sm text-gray-600">
              New calculator features, improvements, and tips
            </div>
          </label>
        </div>

        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
          <input
            type="checkbox"
            id="tutorials"
            checked={preferences.tutorials}
            onChange={() => handleTogglePreference('tutorials')}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="tutorials" className="flex-1 cursor-pointer">
            <div className="font-semibold text-gray-900">Tutorials & Guides</div>
            <div className="text-sm text-gray-600">
              Industry knowledge articles and how-to guides
            </div>
          </label>
        </div>

        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
          <input
            type="checkbox"
            id="product-news"
            checked={preferences.productNews}
            onChange={() => handleTogglePreference('productNews')}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="product-news" className="flex-1 cursor-pointer">
            <div className="font-semibold text-gray-900">Product News & Announcements</div>
            <div className="text-sm text-gray-600">
              Important updates about LaserCalc Pro
            </div>
          </label>
        </div>

        <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
          <input
            type="checkbox"
            id="promotions"
            checked={preferences.promotions}
            onChange={() => handleTogglePreference('promotions')}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="promotions" className="flex-1 cursor-pointer">
            <div className="font-semibold text-gray-900">Partner Promotions</div>
            <div className="text-sm text-gray-600">
              Special offers from our partners (optional)
            </div>
          </label>
        </div>
      </div>

      {/* Frequency Settings */}
      <div className="mb-8">
        <h3 className="mb-4 font-semibold text-gray-900">Email Frequency</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="realtime"
              name="frequency"
              value="realtime"
              checked={frequency === 'realtime'}
              onChange={(e) => setFrequency(e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="realtime" className="cursor-pointer text-gray-700">
              <span className="font-medium">Real-time</span>
              <span className="ml-2 text-sm text-gray-500">(receive updates as they happen)</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="weekly"
              name="frequency"
              value="weekly"
              checked={frequency === 'weekly'}
              onChange={(e) => setFrequency(e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="weekly" className="cursor-pointer text-gray-700">
              <span className="font-medium">Weekly Digest</span>
              <span className="ml-2 text-sm text-gray-500">(recommended)</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="monthly"
              name="frequency"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={(e) => setFrequency(e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="monthly" className="cursor-pointer text-gray-700">
              <span className="font-medium">Monthly Summary</span>
              <span className="ml-2 text-sm text-gray-500">(less frequent)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={handleSave}
          disabled={isSaving || saved}
          className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all ${
            saved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-primary-600 hover:bg-primary-700'
          } ${isSaving ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="h-5 w-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save Preferences
            </>
          )}
        </button>

        <Link
          href={`/subscribe/unsubscribe?token=${token}`}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-red-600 px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-50"
        >
          <Trash2 className="h-5 w-5" />
          Unsubscribe from All
        </Link>
      </div>
    </div>
  );
}

