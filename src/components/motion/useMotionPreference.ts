import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * True when nonessential JS motion should be skipped. Reports "reduce" until
 * hydration so the first client render matches the prerendered HTML.
 */
export function useMotionPreference() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return !hydrated || prefersReducedMotion === true;
}
