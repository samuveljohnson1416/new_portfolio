import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type CountUpProps = {
  value: string;
  duration?: number;
};

const STAT_VALUE_PATTERN = /^(\d+)(.*)$/;

/**
 * Animates a numeric stat once it becomes visible, while keeping the original
 * suffix (for example, "22+"). Motion-sensitive visitors receive the final
 * value immediately.
 */
const CountUp = ({ value, duration = 650 }: CountUpProps) => {
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.7 });

  const match = value.match(STAT_VALUE_PATTERN);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? '';
  const [displayValue, setDisplayValue] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null || prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    const startTime = performance.now();
    let animationFrame = 0;

    const updateValue = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(`${Math.round(target * easedProgress)}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };

    setDisplayValue(`0${suffix}`);
    animationFrame = requestAnimationFrame(updateValue);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, isInView, prefersReducedMotion, suffix, target, value]);

  return <span ref={elementRef}>{displayValue}</span>;
};

export default CountUp;
