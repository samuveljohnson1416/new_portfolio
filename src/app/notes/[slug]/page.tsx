import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NotePost from '../../../views/NotePost';
import { getNote, notes } from '../../../constants/notes';

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const note = getNote(params.slug);
  return note ? { title: `${note.title} - Samuvel Johnson`, description: note.summary } : {};
}

export default function NotePage({ params }: Params) {
  const note = getNote(params.slug);
  if (!note) notFound();
  return <NotePost note={note} />;
}
