import type { Variants } from 'framer-motion';

/** Shared timing tokens (seconds) and easing. Keep motion values here, not in pages. */
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const duration = { fast: 0.18, base: 0.32, enter: 0.48 };
export const stagger = 0.04;
const MAX_STAGGER_STEPS = 5;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const terminalChrome: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Entrance props for a child of a parent with `initial="hidden"` and `animate="visible"`,
 * so the parent decides when the whole sequence starts. `data-reveal` lets CSS show the
 * element in its final state for reduced-motion visitors, even before hydration.
 */
export const reveal = (delay = 0, variants: Variants = fadeUp, dur = duration.enter) => ({
  'data-reveal': '',
  variants,
  transition: { duration: dur, ease, delay },
});

/** Staggered list item: pass the index as `custom`. Delay is capped so long lists stay snappy. */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast, ease, delay: Math.min(index, MAX_STAGGER_STEPS) * stagger },
  }),
};
