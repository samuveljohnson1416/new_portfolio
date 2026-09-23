// Short engineering notes. Each one is a real problem hit while building this site.

export interface Note {
  slug: string;
  title: string;
  date: string; // ISO date
  summary: string;
  sections: { heading?: string; paragraphs: string[]; code?: string }[];
}

export const notes: Note[] = [
  {
    slug: 'enter-key-reopened-my-dialog',
    title: 'The Enter key that reopened my terminal',
    date: '2026-09-24',
    summary: 'A command closed my Ctrl+K terminal, and the same key press opened it again. Focus restoration was the reason.',
    sections: [
      {
        heading: 'What happened',
        paragraphs: [
          'This site has a terminal you can open from any page with Ctrl+K or a button in the navigation. It lives in a native <dialog>. Commands that change page, like open last-look, close the dialog and navigate.',
          'Opened with Ctrl+K, that worked. Opened with the navigation button, the dialog closed, the page changed, and the dialog was immediately open again.',
        ],
      },
      {
        heading: 'Why',
        paragraphs: [
          'When a modal dialog closes, the browser moves focus back to the element that was focused before it opened. With Ctrl+K that is the page body. With the button, it is the button.',
          'I closed the dialog inside the keydown handler for Enter. The browser still had its default action for that same key press to run, and by then focus was on the Open terminal button. Enter on a focused button clicks it, so the one key press both closed and reopened the dialog.',
        ],
      },
      {
        heading: 'The fix',
        paragraphs: ['The input now consumes Enter itself, so the key press has no default action left to run:'],
        code: `if (event.key === 'Enter') {
  event.preventDefault();
  run(value);
}`,
      },
      {
        heading: 'What I took from it',
        paragraphs: [
          'Focus restoration is a feature of <dialog>, and it is exactly what keyboard users need. The bug was in treating a key press as finished once my handler returned.',
          'A Playwright test caught it only because it opened the terminal with the button instead of the shortcut. Testing each way into a feature, not just the one I use myself, is now part of how I check keyboard flows.',
        ],
      },
    ],
  },
  {
    slug: 'one-github-request-per-page-load',
    title: 'Three components, one GitHub request',
    date: '2026-09-24',
    summary: 'My loading screen, homepage and projects page each fetched the same repositories. Sharing one promise fixed it in a few lines.',
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'This portfolio lists my repositories live from the GitHub API. The loading screen fetches them to show a count, the homepage uses the count as a stat, and the projects page shows the full list.',
          'Each one called fetch on its own. Without a token, GitHub allows 60 requests an hour per IP address, so one visitor clicking around could use several of them for identical data.',
        ],
      },
      {
        heading: 'The fix',
        paragraphs: [
          'The service keeps the in-flight promise in a module-level variable. Every caller gets the same promise, so there is one request per page load no matter who asks first.',
        ],
        code: `let reposRequest: Promise<GitHubRepo[]> | null = null;

export function fetchGitHubRepositories(force = false) {
  if (force || !reposRequest) {
    const request = requestGitHubRepositories();
    reposRequest = request;
    request.catch(() => {
      if (reposRequest === request) reposRequest = null;
    });
  }
  return reposRequest;
}`,
      },
      {
        heading: 'Two details that matter',
        paragraphs: [
          'A failed request clears the cache so the next caller can retry, but only if no newer request has replaced it. Without that check, an old failure could wipe out a fresh request that is still loading.',
          'The Refresh button on the projects page passes force, because a person pressing refresh expects new data, not the cached promise.',
        ],
      },
    ],
  },
];

export const getNote = (slug: string) => notes.find((note) => note.slug === slug);

export const formatNoteDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
