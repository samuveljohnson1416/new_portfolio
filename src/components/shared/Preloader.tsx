'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchGitHubRepositories } from '../../services/githubService';
import { duration, ease } from '../motion/motionConfig';
import { BOOTED_KEY } from '../../constants/boot';

const MIN_VISIBLE_MS = 900;
const TASK_TIMEOUT_MS = 3000;

const BootContext = createContext(true);
/** False while the boot overlay covers the page; entrance animations wait for true. */
export const useBooted = () => useContext(BootContext);

type Status = 'wait' | 'ok' | 'warn';
type Task = { status: Status; text: string };

const withTimeout = <T,>(promise: Promise<T>) =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), TASK_TIMEOUT_MS)),
  ]);

const STATUS_LABEL: Record<Status, ReactNode> = {
  wait: <span className="text-gray-400">[ .. ]</span>,
  ok: <span className="text-neon-green">[ ok ]</span>,
  warn: <span className="text-yellow-400">[warn]</span>,
};

const Preloader = ({ children }: { children: ReactNode }) => {
  const [booted, setBooted] = useState(false);
  const [fonts, setFonts] = useState<Task>({ status: 'wait', text: 'loading fonts' });
  const [github, setGithub] = useState<Task>({ status: 'wait', text: 'fetching github repositories' });

  useEffect(() => {
    let alreadyBooted = false;
    try {
      alreadyBooted = sessionStorage.getItem(BOOTED_KEY) !== null;
    } catch {
      // Storage blocked: just show the boot sequence.
    }
    if (alreadyBooted || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBooted(true);
      return;
    }

    let cancelled = false;
    const fontsTask = withTimeout(document.fonts.ready).then(
      () => setFonts({ status: 'ok', text: 'fonts loaded' }),
      () => setFonts({ status: 'warn', text: 'fonts slow, using fallback' }),
    );
    // The request keeps running after a timeout; Home and Projects pick it up when it lands.
    const githubTask = withTimeout(fetchGitHubRepositories()).then(
      (repos) => setGithub({ status: 'ok', text: `${repos.length} repositories fetched from github` }),
      () => setGithub({ status: 'warn', text: 'github unreachable, continuing' }),
    );
    const minimum = new Promise((resolve) => setTimeout(resolve, MIN_VISIBLE_MS));

    Promise.all([fontsTask, githubTask, minimum]).then(() => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(BOOTED_KEY, '1');
      } catch {
        // Ignore: the boot screen will simply show again next load.
      }
      setBooted(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const tasks = [fonts, github];
  const done = tasks.filter((task) => task.status !== 'wait').length;

  return (
    <BootContext.Provider value={booted}>
      {children}
      <AnimatePresence>
        {!booted && (
          <motion.div
            key="preloader"
            role="status"
            aria-label="Loading portfolio"
            className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-dark-bg px-4"
            exit={{ y: '-100%', transition: { duration: duration.enter, ease: [0.7, 0, 0.84, 0] } }}
          >
            <div className="w-full max-w-md font-mono text-sm">
              <p className="text-neon-green">
                sj@portfolio:~$ <span className="text-white">./boot.sh</span>
              </p>
              <ul className="mt-3 space-y-1">
                {tasks.map((task, index) => (
                  <li key={index} className="text-gray-300">
                    {STATUS_LABEL[task.status]} {task.text}
                  </li>
                ))}
                {done === tasks.length && (
                  <li className="text-gray-300">{STATUS_LABEL.ok} ready</li>
                )}
              </ul>
              <div className="mt-4 h-px bg-neon-green/15 overflow-hidden">
                <motion.div
                  className="h-full bg-neon-green origin-left"
                  initial={{ scaleX: 0.1 }}
                  animate={{ scaleX: 0.1 + (0.9 * done) / tasks.length }}
                  transition={{ duration: duration.base, ease }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BootContext.Provider>
  );
};

export default Preloader;
