import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { formatNoteDate, type Note } from '../constants/notes';

const NotePost = ({ note }: { note: Note }) => (
  <article className="min-h-screen py-16 px-4">
    <div className="max-w-3xl mx-auto">
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-green transition-colors rounded"
      >
        <ArrowLeft size={16} />
        All notes
      </Link>

      <time dateTime={note.date} className="mt-10 block text-sm font-mono text-gray-400">
        {formatNoteDate(note.date)}
      </time>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-neon-green">{note.title}</h1>
      <p className="mt-4 text-lg md:text-xl text-gray-200 leading-relaxed">{note.summary}</p>

      {note.sections.map((section, index) => (
        <section key={index} className="mt-12">
          {section.heading && (
            <h2 className="text-2xl font-display font-semibold text-white mb-4">{section.heading}</h2>
          )}
          <div className="space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-300 leading-relaxed">{paragraph}</p>
            ))}
          </div>
          {section.code && (
            <pre className="mt-4 overflow-x-auto bg-dark-card border border-neon-green/20 rounded-lg p-4 text-sm text-gray-200">
              <code>{section.code}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  </article>
);

export default NotePost;
