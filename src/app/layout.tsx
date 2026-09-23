import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Providers from './providers';
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
    <html lang="en" className={`${jetbrains.variable} ${space.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
