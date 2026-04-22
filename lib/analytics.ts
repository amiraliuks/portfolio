'use client';

import { track } from '@vercel/analytics';

type PropertyValue = string | number | boolean | null | undefined;

export function trackEvent(name: string, properties?: Record<string, PropertyValue>) {
  try {
    track(name, properties);
  } catch {
    // Tracking should never break user interactions.
  }
}
