'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Zap, Github, Linkedin, Mail, ArrowRight, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProjectCount } from '../services/githubService';
import CountUp from '../components/motion/CountUp';
import MagneticButton from '../components/motion/MagneticButton';
import AnimatedBackground from '../components/shared/AnimatedBackground';
import Shell from '../components/terminal/Shell';
import { useBooted } from '../components/shared/Preloader';
import { duration, reveal, terminalChrome } from '../components/motion/motionConfig';

// Hero timeline (seconds). Everything settles by ~1s; controls work from the first frame.
const HERO = {
  chrome: 0,
  whoami: 0.25,
  specialties: 0.45,
  message: 0.65,
  heading: 0.1,
  tagline: 0.2,
  stats: 0.3,
  stack: 0.35,
  ctas: 0.4,
  socials: 0.45,
};

const Home = () => {
  const router = useRouter();
  const booted = useBooted();
  const [projectCount, setProjectCount] = useState('6+');
  const message = "Let's build something amazing together!";

  // Fetch project count from GitHub
  useEffect(() => {
    const fetchProjectCount = async () => {
      const count = await getProjectCount();
      setProjectCount(count);
    };
    fetchProjectCount();
  }, []);

  const quickStats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: projectCount },
    { label: 'Technologies', value: '15+' },
    { label: 'Hackathons', value: '5+' }
  ];

  // Boot lines stay as the terminal intro; visitors can type below them.
  const bootLines = (
    <div className="space-y-2">
      <motion.div {...reveal(HERO.whoami, undefined, duration.fast)}>
        <div className="text-neon-green">
          <span className="text-gray-400">$</span> whoami
        </div>
        <div className="text-white">Full Stack Developer & Creative Problem Solver</div>
      </motion.div>

      <motion.div {...reveal(HERO.specialties, undefined, duration.fast)}>
        <div className="text-neon-green">
          <span className="text-gray-400">$</span> cat specialties.txt
        </div>
        <div className="text-white">
          React • Java • Node.js • Python • MySQL • UI/UX  • Figma • Git
        </div>
      </motion.div>

      <motion.div {...reveal(HERO.message, undefined, duration.base)}>
        <div className="text-neon-green">
          <span className="text-gray-400">$</span> echo &quot;{message}&quot;
        </div>
        <div className="text-white">{message}</div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <AnimatedBackground />

      {/* Main Content */}
      {/* The hero sequence starts once the boot overlay leaves. */}
      <motion.div
        initial="hidden"
        animate={booted ? 'visible' : 'hidden'}
        className="text-center z-10 px-4 max-w-5xl mx-auto"
      >
        {/* Terminal Window */}
        <motion.div
          {...reveal(HERO.chrome, terminalChrome, 0.25)}
          className="bg-dark-card border border-neon-green/30 rounded-lg p-6 mb-8 backdrop-blur-sm shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex items-center gap-2 ml-auto">
              <Terminal className="text-neon-green" size={16} />
              <span className="text-xs font-mono text-gray-400">sj@portfolio:~$</span>
            </div>
          </div>

          <Shell className="max-h-72" intro={bootLines} />
        </motion.div>

        {/* Hero Text */}
        <div className="mb-6">
          <motion.h1
            {...reveal(HERO.heading)}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
          >
            <span className="text-neon-green">{'<'}</span>
            <span className="bg-gradient-to-r from-white via-neon-green to-neon-blue bg-clip-text text-transparent">
              Samuvel Johnson
            </span>
            <span className="text-neon-green">{'/>'}</span>
          </motion.h1>

          <motion.p
            {...reveal(HERO.tagline)}
            className="text-xl md:text-2xl text-gray-300 font-mono max-w-3xl mx-auto leading-relaxed"
          >
            <span className="text-neon-green">{'<'}</span>
            <span className="text-neon-green">Full Stack Developer</span>
            <span className="text-neon-green">{'/>'}</span>  crafting digital experiences with{' '}
            <span className="text-neon-green">clean code</span> and{' '}
            <span className="text-neon-blue">creative solutions</span>
          </motion.p>
        </div>

        {/* Quick Stats */}
        <motion.div
          {...reveal(HERO.stats)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-dark-card/50 border border-neon-green/20 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-neon-green">
                <CountUp value={stat.value} />
              </div>
              <div className="text-xs font-mono text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          {...reveal(HERO.stack)}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-lg border border-neon-green/20 hover:border-neon-green/40 transition-colors duration-300"
          >
            <Code className="text-neon-green" size={20} />
            <span className="text-sm font-mono">Frontend Magic</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-lg border border-neon-blue/20 hover:border-neon-blue/40 transition-colors duration-300"
          >
            <Terminal className="text-neon-blue" size={20} />
            <span className="text-sm font-mono">Backend Power</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-lg border border-neon-pink/20 hover:border-neon-pink/40 transition-colors duration-300"
          >
            <Zap className="text-neon-pink" size={20} />
            <span className="text-sm font-mono">API&apos;s</span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...reveal(HERO.ctas)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <MagneticButton
            onClick={() => router.push('/projects')}
            className="group bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-green/90 transition-colors duration-300 flex items-center gap-3"
          >
            View My Work
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={() => router.push('/contact')}
            className="bg-transparent border-2 border-neon-green text-neon-green px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-green hover:text-dark-bg transition-colors duration-300"
          >
            Let&apos;s Talk
          </MagneticButton>

          <MagneticButton
            onClick={() => router.push('/resume')}
            className="bg-transparent border-2 border-neon-blue text-neon-blue px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-blue hover:text-dark-bg transition-colors duration-300 flex items-center gap-2"
          >
            <Eye size={18} />
            Resume
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          {...reveal(HERO.socials)}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Github, href: 'https://github.com/samuveljohnson1416', color: 'hover:text-neon-green', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/samuvel-johnson', color: 'hover:text-neon-blue', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:samuveljohnson.cv@gmail.com', color: 'hover:text-neon-pink', label: 'Email' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`text-gray-400 ${social.color} transition-colors duration-300 p-3 rounded-lg hover:bg-gray-800/50`}
              title={social.label}
              aria-label={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
