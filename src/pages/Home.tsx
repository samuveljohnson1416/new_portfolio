import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Zap, Github, Linkedin, Mail, ArrowRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectCount } from '../services/githubService';
import CountUp from '../components/motion/CountUp';
import MagneticButton from '../components/motion/MagneticButton';

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [projectCount, setProjectCount] = useState('6+');
  const fullText = "Let's build something amazing together!";

  // Reactive window height — avoids raw window.innerHeight in JSX and handles resize
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-compute random values once so they don't re-randomize on every render
  const matrixItems = useMemo(
    () =>
      [...Array(15)].map(() => ({
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        left: Math.random() * 100,
        text: Math.random().toString(36).substring(2, 15),
      })),
    []
  );

  const particles = useMemo(
    () =>
      [...Array(20)].map(() => ({
        dx: Math.random() * 200 - 100,
        dy: Math.random() * 200 - 100,
        duration: Math.random() * 10 + 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
      })),
    []
  );

  // Fetch project count from GitHub
  useEffect(() => {
    const fetchProjectCount = async () => {
      const count = await getProjectCount();
      setProjectCount(count);
    };
    fetchProjectCount();
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Blink cursor after typing is complete
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, fullText]);



  const quickStats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: projectCount },
    { label: 'Technologies', value: '15+' },
    { label: 'Hackathons', value: '5+' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-green/5 to-transparent"></div>

        {/* Matrix-style falling code — values memoized to prevent re-randomizing on re-render */}
        {matrixItems.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-green/20 font-mono text-xs"
            animate={{
              y: [0, windowHeight + 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            style={{
              left: `${item.left}%`,
              top: -100,
            }}
          >
            {item.text}
          </motion.div>
        ))}

        {/* Floating particles — values memoized to prevent re-randomizing on re-render */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full opacity-30"
            animate={{
              x: [0, p.dx],
              y: [0, p.dy],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4 max-w-5xl mx-auto"
      >
        {/* Terminal Window */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
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

          <div className="text-left font-mono text-sm space-y-2">
            <div className="text-neon-green">
              <span className="text-gray-400">$</span> whoami
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white"
            >
              Full Stack Developer & Creative Problem Solver
            </motion.div>

            <div className="text-neon-green">
              <span className="text-gray-400">$</span> cat specialties.txt
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white"
            >
              React • Java • Node.js • Python • MySQL • UI/UX  • Figma • Git
            </motion.div>

            <div className="text-neon-green">
              <span className="text-gray-400">$</span> echo "{typedText}"
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-white"
            >
              {typedText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4">
            <span className="text-neon-green">{'<'}</span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-r from-white via-neon-green to-neon-blue bg-clip-text text-transparent"
            >
              Samuvel Johnson
            </motion.span>
            <span className="text-neon-green">{'/>'}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 font-mono max-w-3xl mx-auto leading-relaxed"
          >
            <span className="text-neon-green">{'<'}</span>
            <span className="text-neon-green">Full Stack Developer</span>
            <span className="text-neon-green">{'/>'}</span>  crafting digital experiences with{' '}
            <span className="text-neon-green">clean code</span> and{' '}
            <span className="text-neon-blue">creative solutions</span>
          </motion.p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="bg-dark-card/50 border border-neon-green/20 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-neon-green">
                <CountUp value={stat.value} />
              </div>
              <div className="text-xs font-mono text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-lg border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300"
          >
            <Code className="text-neon-green" size={20} />
            <span className="text-sm font-mono">Frontend Magic</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-lg border border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300"
          >
            <Terminal className="text-neon-blue" size={20} />
            <span className="text-sm font-mono">Backend Power</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-lg border border-neon-pink/20 hover:border-neon-pink/40 transition-all duration-300"
          >
            <Zap className="text-neon-pink" size={20} />
            <span className="text-sm font-mono">API's</span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <MagneticButton
            onClick={() => navigate('/projects')}
            className="group bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-green/90 transition-all duration-300 flex items-center gap-3"
          >
            View My Work
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={() => navigate('/contact')}
            className="bg-transparent border-2 border-neon-green text-neon-green px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
          >
            Let's Talk
          </MagneticButton>

          <MagneticButton
            onClick={() => navigate('/resume')}
            className="bg-transparent border-2 border-neon-blue text-neon-blue px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 flex items-center gap-2"
          >
            <Eye size={18} />
            Resume
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
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
              className={`text-gray-400 ${social.color} transition-all duration-300 p-3 rounded-lg hover:bg-gray-800/50`}
              title={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator removed as requested */}
    </div>
  );
};

export default Home;
