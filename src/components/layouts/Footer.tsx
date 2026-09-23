import Link from 'next/link';

const linkClass = 'hover:text-neon-green transition-colors rounded';

const Footer = () => (
  <footer className="border-t border-neon-green/10 py-8 px-4 text-sm font-mono text-gray-400">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Samuvel Johnson</p>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/notes" className={linkClass}>Notes</Link>
        <Link href="/colophon" className={linkClass}>How this site is built</Link>
        <a
          href="https://github.com/samuveljohnson1416/new_portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Source code
        </a>
      </nav>
    </div>
  </footer>
);

export default Footer;
