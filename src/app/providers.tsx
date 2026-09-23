'use client';

import { MotionConfig } from 'framer-motion';
import { PersonaProvider } from '../context/PersonaContext';
import Navigation from '../components/layouts/Navigation';
import Preloader from '../components/shared/Preloader';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": Framer skips transform/layout animation for reduced-motion visitors site-wide.
    <MotionConfig reducedMotion="user">
      <PersonaProvider>
        <Preloader>
          <div className="min-h-screen bg-dark-bg text-white font-mono">
            <Navigation />
            {children}
          </div>
        </Preloader>
      </PersonaProvider>
    </MotionConfig>
  );
}
