'use client';
import { useState } from 'react';

interface EmailSubscriptionProps {
  className?: string;
}

export default function EmailSubscription({ className = '' }: EmailSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const getCountryCode = (): string => {
    try {
      // Try to get country from browser locale (e.g., "en-US" → "US")
      const locale: string = Intl.DateTimeFormat().resolvedOptions().locale;
      if (locale?.includes('-')) {
        return locale.split('-')[1];
      }
      // Fallback to navigator.language (e.g., "en-US" → "US")
      if (navigator.language?.includes('-')) {
        return navigator.language.split('-')[1];
      }
      // Default fallback
      return 'US';
    } catch (error) {
      console.warn('Could not detect country, using default:', error);
      return 'US';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const country = getCountryCode();
      const response = await fetch('/api/shopify/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, country }),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (response.ok) {
        setIsSuccess(true);
        setMessage('Thank you for subscribing to our email list!');
        setEmail('');
      } else {
        setIsSuccess(false);
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="relative max-w-[450px] mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border border-black w-full p-4 pr-12 focus:outline-none focus:ring-0 focus:border-black bg-transparent"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="hover:opacity-70 transition-opacity"
            >
              <title>Submit email</title>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 text-sm max-w-[450px] mx-auto ${
            isSuccess
              ? 'bg-green-500/20 border border-green-500/30'
              : 'bg-red-500/20 border border-red-500/30'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
