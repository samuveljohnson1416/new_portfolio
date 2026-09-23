import Link from 'next/link';
import { notes } from '../constants/notes';

// Measured on the production build (Lighthouse 13, homepage). Re-run and update after big changes.
const LIGHTHOUSE = {
  date: '24 September 2026',
  rows: [
    { device: 'Desktop', performance: 99, accessibility: 100, bestPractices: 100, seo: 100, lcp: '0.9 s' },
    { device: 'Mobile', performance: 85, accessibility: 100, bestPractices: 100, seo: 100, lcp: '4.4 s' },
  ],
};

const STACK: [string, string][] = [
  ['Next.js 14', 'App Router with static export: every page is prerendered HTML, no server needed'],
  ['React 18 + TypeScript', 'strict mode, no unused code allowed by the build'],
  ['Tailwind CSS', 'the neon palette lives in one config file'],
  ['Framer Motion', 'every duration and easing comes from one shared token file'],
  ['GitHub REST API', 'the projects page lists my repositories live'],
  ['EmailJS', 'the contact form sends mail without a backend'],
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-12">
    <h2 className="text-2xl font-display font-semibold text-white mb-4">{title}</h2>
    {children}
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="border-l-2 border-neon-green/40 pl-4 text-gray-300 leading-relaxed">{item}</li>
    ))}
  </ul>
);

const Colophon = () => (
  <article className="min-h-screen py-16 px-4">
    <div className="max-w-3xl mx-auto">
      <p className="text-sm font-mono text-gray-400">
        <span className="text-neon-green">$</span> cat colophon.md
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-neon-green">How this site is built</h1>
      <p className="mt-4 text-lg text-gray-200 leading-relaxed">
        A portfolio is also a code sample. Here is what runs this one, and the checks it has to pass.
      </p>

      <Section title="Stack">
        <dl className="grid sm:grid-cols-[auto_1fr] gap-x-6 gap-y-3">
          {STACK.map(([name, detail]) => (
            <div key={name} className="contents">
              <dt className="font-mono text-neon-green">{name}</dt>
              <dd className="text-gray-300">{detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Lighthouse">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="text-gray-400">
              <tr>
                <th scope="col" className="py-2 pr-4 font-normal">Homepage</th>
                <th scope="col" className="py-2 pr-4 font-normal">Performance</th>
                <th scope="col" className="py-2 pr-4 font-normal">Accessibility</th>
                <th scope="col" className="py-2 pr-4 font-normal">Best practices</th>
                <th scope="col" className="py-2 pr-4 font-normal">SEO</th>
                <th scope="col" className="py-2 font-normal">LCP</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {LIGHTHOUSE.rows.map((row) => (
                <tr key={row.device} className="border-t border-neon-green/10">
                  <th scope="row" className="py-2 pr-4 font-normal text-gray-300">{row.device}</th>
                  <td className="py-2 pr-4">{row.performance}</td>
                  <td className="py-2 pr-4">{row.accessibility}</td>
                  <td className="py-2 pr-4">{row.bestPractices}</td>
                  <td className="py-2 pr-4">{row.seo}</td>
                  <td className="py-2">{row.lcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-gray-300 leading-relaxed">
          Measured {LIGHTHOUSE.date} on the production build. The mobile paint time is a deliberate trade-off: the
          hero waits for the one-time boot screen that loads fonts and GitHub data. Returning visitors in the same tab
          skip it.
        </p>
      </Section>

      <Section title="Performance">
        <List
          items={[
            'Every page is static HTML, so the first paint does not wait for a server.',
            'Fonts are self-hosted through next/font, which keeps layout shift near zero.',
            'The boot screen, homepage and projects page share a single GitHub request per page load.',
            'The animated background renders fewer elements on phones and nothing at all for reduced-motion visitors.',
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <List
          items={[
            'Reduced-motion settings are respected in CSS and in JavaScript: no boot screen, no loops, no count-up, content shown immediately.',
            'Every control works from the keyboard with a visible focus ring. Escape closes the menu and the terminal.',
            'The terminal is a native <dialog>, so focus is trapped while it is open and returns where it was when it closes. Tab only autocompletes when there is text to complete.',
            'Text meets WCAG AA contrast (4.5:1). An audit caught dim grey labels below that, and they were fixed.',
          ]}
        />
      </Section>

      <Section title="Stories from the build">
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="text-neon-blue hover:underline rounded">
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Source">
        <p className="text-gray-300 leading-relaxed">
          The full code is on{' '}
          <a
            href="https://github.com/samuveljohnson1416/new_portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue hover:underline rounded"
          >
            GitHub
          </a>
          .
        </p>
      </Section>
    </div>
  </article>
);

export default Colophon;
