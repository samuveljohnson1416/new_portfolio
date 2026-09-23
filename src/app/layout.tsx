import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Providers from './providers';
import { BOOTED_KEY } from '../constants/boot';
import '../index.css';

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Samuvel Johnson - Portfolio',
  description: 'Samuvel Johnson - Full Stack Developer Portfolio',
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script may add data-booted before React hydrates.
    <html lang="en" className={`${jetbrains.variable} ${space.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide the boot overlay before first paint if this tab already saw it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{sessionStorage.getItem('${BOOTED_KEY}')&&document.documentElement.setAttribute('data-booted','')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
