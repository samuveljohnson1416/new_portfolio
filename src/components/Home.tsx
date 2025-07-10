import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal, Code, Zap, Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Let's build something amazing together!";

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

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const quickStats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'Code Commits', value: '2K+' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-green/5 to-transparent"></div>
        
        {/* Matrix-style falling code */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-green/20 font-mono text-xs"
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: -100,
            }}
          >
            {Math.random().toString(36).substring(2, 15)}
          </motion.div>
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
              <span className="text-xs font-mono text-gray-400">alex@portfolio:~$</span>
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
              React • TypeScript • Node.js • Python • AWS • UI/UX
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
            <span className="text-neon-green"><</span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-r from-white via-neon-green to-neon-blue bg-clip-text text-transparent"
            >
              Alex Johnson
            </motion.span>
            <span className="text-neon-green">/></span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 font-mono max-w-3xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with{' '}
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
              <div className="text-2xl font-bold text-neon-green">{stat.value}</div>
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
            <span className="text-sm font-mono">Cloud Solutions</span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/projects')}
            className="group bg-neon-green text-dark-bg px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-green/90 transition-all duration-300 flex items-center gap-3"
          >
            View My Work
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="bg-transparent border-2 border-neon-green text-neon-green px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
          >
            Let's Talk
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/resume')}
            className="bg-transparent border-2 border-neon-blue text-neon-blue px-8 py-4 rounded-lg font-mono font-semibold hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 flex items-center gap-2"
          >
            <Download size={18} />
            Resume
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Github, href: 'https://github.com/yourusername', color: 'hover:text-neon-green', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', color: 'hover:text-neon-blue', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:alex.johnson@example.com', color: 'hover:text-neon-pink', label: 'Email' },
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

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neon-green hover:text-neon-green/80 transition-colors group"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            Scroll to explore
          </span>
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Home;