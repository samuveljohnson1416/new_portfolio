import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { CaseStudy as CaseStudyData } from '../constants/caseStudies';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-12">
    <h2 className="text-2xl font-display font-semibold text-white mb-4">{title}</h2>
    {children}
  </section>
);

const CaseStudy = ({ study }: { study: CaseStudyData }) => (
  <article className="min-h-screen py-16 px-4">
    <div className="max-w-3xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-green transition-colors rounded"
      >
        <ArrowLeft size={16} />
        All projects
      </Link>

      <p className="mt-10 text-sm font-mono text-gray-500 break-all">
        <span className="text-neon-green">$</span> cat projects/{study.slug}/README.md
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-neon-green">{study.title}</h1>
      <p className="mt-4 text-lg md:text-xl text-gray-200 leading-relaxed">{study.summary}</p>
      <p className="mt-3 text-sm font-mono text-gray-400">{study.context}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={study.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-neon-green/40 text-neon-green px-4 py-2 rounded-lg font-mono text-sm hover:bg-neon-green hover:text-dark-bg transition-colors"
        >
          <Github size={16} />
          View source
        </a>
        {study.live && (
          <a
            href={study.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neon-blue/40 text-neon-blue px-4 py-2 rounded-lg font-mono text-sm hover:bg-neon-blue hover:text-dark-bg transition-colors"
          >
            <ExternalLink size={16} />
            Open live demo
          </a>
        )}
      </div>

      <Section title="The problem">
        <p className="text-gray-300 leading-relaxed">{study.problem}</p>
      </Section>

      <Section title="How I approached it">
        <ul className="space-y-6">
          {study.approach.map((item) => (
            <li key={item.title} className="border-l-2 border-neon-green/40 pl-4">
              <h3 className="font-display font-semibold text-neon-green">{item.title}</h3>
              <p className="mt-1 text-gray-300 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {study.challenge && (
        <Section title="Hardest part">
          <div className="bg-dark-card border border-neon-pink/30 rounded-lg p-5">
            <h3 className="font-display font-semibold text-neon-pink">{study.challenge.title}</h3>
            <p className="mt-2 text-gray-300 leading-relaxed">{study.challenge.detail}</p>
          </div>
        </Section>
      )}

      {study.result && (
        <Section title="Result">
          <p className="text-gray-300 leading-relaxed">{study.result}</p>
        </Section>
      )}

      <Section title="Stack">
        <ul className="flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="px-2 py-1 bg-neon-green/10 text-neon-green text-xs font-mono rounded border border-neon-green/20"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  </article>
);

export default CaseStudy;
