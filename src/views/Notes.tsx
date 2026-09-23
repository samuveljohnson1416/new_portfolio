import Link from 'next/link';
import { formatNoteDate, notes } from '../constants/notes';

const Notes = () => (
  <div className="min-h-screen py-16 px-4">
    <div className="max-w-3xl mx-auto">
      <p className="text-sm font-mono text-gray-400">
        <span className="text-neon-green">$</span> ls notes/
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-neon-green">Notes</h1>
      <p className="mt-4 text-lg text-gray-300 leading-relaxed">
        Short write-ups of real problems I hit while building things, and what I learned from them.
      </p>

      <ul className="mt-12 space-y-6">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="group block bg-dark-card border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/60 transition-colors duration-200"
            >
              <time dateTime={note.date} className="text-xs font-mono text-gray-400">
                {formatNoteDate(note.date)}
              </time>
              <h2 className="mt-2 text-xl font-display font-semibold text-white group-hover:text-neon-green transition-colors">
                {note.title}
              </h2>
              <p className="mt-2 text-gray-300 leading-relaxed">{note.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Notes;
