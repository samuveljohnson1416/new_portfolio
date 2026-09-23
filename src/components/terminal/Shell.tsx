'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import resumeData from '../../constants/resumeData.json';
import { caseStudies } from '../../constants/caseStudies';

const PAGES = ['about', 'projects', 'resume', 'contact'];
const EMAIL = 'samuveljohnson.cv@gmail.com';
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/samuveljohnson1416' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuvel-johnson' },
];

const HELP: [string, string][] = [
  ['help', 'list commands'],
  ['whoami', 'who I am'],
  ['ls', 'list pages'],
  ['cd <page>', 'go to a page, e.g. cd projects'],
  ['projects', 'list case studies'],
  ['open <project>', 'read a case study'],
  ['experience', 'work history'],
  ['education', 'degrees'],
  ['skills', 'tech I use'],
  ['socials', 'where to find me'],
  ['email', 'how to reach me'],
  ['resume', 'open my resume'],
  ['pwd', 'current page'],
  ['echo <text>', 'print text'],
  ['history', 'commands you ran'],
  ['clear', 'clear the screen'],
];
const COMMANDS = [...HELP.map(([usage]) => usage.split(' ')[0]), 'exit'];
const ARGUMENTS: Record<string, string[]> = {
  cd: PAGES,
  open: caseStudies.map((study) => study.slug),
};

type Entry = { id: number; cwd: string; command: string; output: ReactNode };

type ShellProps = {
  /** Rendered above the command output, e.g. the hero boot lines. */
  intro?: ReactNode;
  /** Classes for the scrollable output area (height limits). */
  className?: string;
  /** Called after a command navigates, e.g. to close the dialog. */
  onNavigate?: () => void;
  /** Handles `exit`; without it, `exit` just prints a message. */
  onExit?: () => void;
};

const Shell = ({ intro, className = '', onNavigate, onExit }: ShellProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const cwd = `~${pathname === '/' ? '' : pathname}`;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest output in view without scrolling the page itself.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [entries]);

  const print = (command: string, output: ReactNode) =>
    setEntries((current) => [...current, { id: nextId.current++, cwd, command, output }]);

  const go = (path: string) => {
    router.push(path);
    onNavigate?.();
    return <span className="text-gray-400">Opening ~{path === '/' ? '' : path}</span>;
  };

  const runButton = (command: string, label = command) => (
    <button
      type="button"
      onClick={() => run(command)}
      className="text-neon-blue hover:underline rounded text-left"
    >
      {label}
    </button>
  );

  const execute = (name: string, arg: string, pastCommands: string[]): ReactNode => {
    switch (name) {
      case '':
        return null;
      case 'help':
        return (
          <div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4">
              {HELP.map(([usage, description]) => (
                <div key={usage} className="contents">
                  {usage.includes('<') ? <span className="text-neon-blue">{usage}</span> : runButton(usage)}
                  <span className="text-gray-400">{description}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-gray-500">
              Tab completes, Up/Down recalls history, Ctrl+L clears, Ctrl+K opens this terminal on any page.
            </p>
          </div>
        );
      case 'whoami': {
        const school = resumeData.education[0];
        return `Samuvel Johnson. Full Stack Developer & Creative Problem Solver, studying IT at ${school.school} (${school.period}).`;
      }
      case 'ls':
        return (
          <div className="flex flex-wrap gap-x-4">
            {PAGES.map((page) => (
              <span key={page}>{runButton(`cd ${page}`, `${page}/`)}</span>
            ))}
          </div>
        );
      case 'cd': {
        const target = arg.replace(/^~?\/?/, '').replace(/\/$/, '');
        if (target === '' || target === '..') return go('/');
        if (PAGES.includes(target)) return go(`/${target}`);
        const slug = target.replace(/^projects\//, '');
        if (caseStudies.some((study) => study.slug === slug)) return go(`/projects/${slug}`);
        return <span className="text-neon-pink">cd: no such page: {arg}. Try ls.</span>;
      }
      case 'projects':
        return (
          <div className="space-y-1">
            {caseStudies.map((study) => (
              <div key={study.slug}>
                {runButton(`open ${study.slug}`, study.slug)}
                <span className="text-gray-400"> {study.summary}</span>
              </div>
            ))}
            <p className="text-gray-500">All GitHub repositories: {runButton('cd projects')}</p>
          </div>
        );
      case 'open': {
        const study = caseStudies.find((item) => item.slug === arg.toLowerCase());
        if (study) return go(`/projects/${study.slug}`);
        return <span className="text-neon-pink">open: unknown project{arg && `: ${arg}`}. Try projects.</span>;
      }
      case 'experience':
        return (
          <ul className="space-y-1">
            {resumeData.experience.map((job) => (
              <li key={job.title}>
                <span className="text-white">{job.title}</span>
                <span className="text-gray-400"> at {job.company} ({job.period})</span>
              </li>
            ))}
          </ul>
        );
      case 'education':
        return (
          <ul className="space-y-1">
            {resumeData.education.map((item) => (
              <li key={item.degree}>
                <span className="text-white">{item.degree}</span>
                <span className="text-gray-400">, {item.school} ({item.period}), {item.gpa}</span>
              </li>
            ))}
          </ul>
        );
      case 'skills':
        return (
          <ul>
            {Object.entries(resumeData.skills).map(([group, skills]) => (
              <li key={group}>
                <span className="text-neon-green">{group}:</span> <span className="text-gray-300">{skills.join(', ')}</span>
              </li>
            ))}
          </ul>
        );
      case 'socials':
        return (
          <ul>
            {SOCIALS.map((social) => (
              <li key={social.label}>
                {social.label}:{' '}
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">
                  {social.href.replace('https://', '')}
                </a>
              </li>
            ))}
          </ul>
        );
      case 'email':
        return (
          <span>
            <a href={`mailto:${EMAIL}`} className="text-neon-blue hover:underline">{EMAIL}</a>
            <span className="text-gray-400"> or use the form: </span>
            {runButton('cd contact')}
          </span>
        );
      case 'resume':
        return go('/resume');
      case 'pwd':
        return cwd;
      case 'echo':
        return arg;
      case 'history':
        return (
          <ol>
            {pastCommands.map((command, index) => (
              <li key={index}>
                <span className="text-gray-500">{index + 1}</span> {command}
              </li>
            ))}
          </ol>
        );
      case 'exit':
        return "You're already home. Try cd projects.";
      case 'sudo':
        return <span className="text-neon-pink">sj is not in the sudoers file. This incident will be reported to the recruiter.</span>;
      default:
        return <span className="text-neon-pink">command not found: {name}. Type help to see what I can do.</span>;
    }
  };

  const run = (raw: string) => {
    const command = raw.trim();
    const pastCommands = command ? [...history, command] : history;
    setHistory(pastCommands);
    setHistoryIndex(null);
    setValue('');
    inputRef.current?.focus({ preventScroll: true });

    const [name = '', ...args] = command.split(/\s+/);
    if (name === 'clear') return setEntries([]);
    if (name === 'exit' && onExit) return onExit();
    print(command, execute(name.toLowerCase(), args.join(' '), pastCommands));
  };

  const complete = () => {
    const [name, ...rest] = value.trimStart().split(' ');
    const typingArgument = rest.length > 0;
    const options = typingArgument ? ARGUMENTS[name] ?? [] : COMMANDS;
    const partial = typingArgument ? rest.join(' ') : name;
    const matches = options.filter((option) => option.startsWith(partial));
    if (matches.length === 1) setValue(typingArgument ? `${name} ${matches[0]}` : `${matches[0]} `);
    else if (matches.length > 1) print(value, matches.join('  '));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Consume Enter: if the command closes the dialog, focus returns to the trigger button,
      // and an unconsumed Enter would activate that button and reopen the dialog.
      event.preventDefault();
      run(value);
    } else if (event.key === 'Tab' && value.trim()) {
      // Only capture Tab when there is something to complete, so keyboard users can still tab away.
      event.preventDefault();
      complete();
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
    } else if (event.key === 'ArrowUp' && history.length) {
      event.preventDefault();
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(history[index]);
    } else if (event.key === 'ArrowDown' && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      setHistoryIndex(index < history.length ? index : null);
      setValue(index < history.length ? history[index] : '');
    }
  };

  const prompt = (path: string) => (
    <span className="text-neon-green shrink-0">
      sj@portfolio:<span className="text-neon-blue">{path}</span>$
    </span>
  );

  return (
    <div ref={scrollRef} className={`overflow-y-auto text-left font-mono text-sm ${className}`}>
      {intro}
      <div role="log" aria-live="polite" className="space-y-2 mt-2">
        {entries.map((entry) => (
          <div key={entry.id}>
            <div className="break-all">
              {prompt(entry.cwd)} <span className="text-white">{entry.command}</span>
            </div>
            {entry.output !== null && <div className="text-gray-200 break-words">{entry.output}</div>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 -mx-1 px-1 rounded focus-within:ring-1 focus-within:ring-neon-green/60">
        {prompt(cwd)}
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command"
          placeholder="type help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent text-white text-base sm:text-sm placeholder:text-gray-600 caret-neon-green focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Shell;
