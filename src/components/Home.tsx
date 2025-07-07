import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal, Code, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="matrix-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-green/5 to-transparent"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4"
      >
        {/* Terminal Window */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-dark-card border border-neon-green/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <Terminal className="ml-auto text-neon-green" size={16} />
          </div>
          
          <div className="text-left font-mono text-sm">
            <div className="text-neon-green">
              <span className="text-gray-400">$</span> whoami
            </div>
            <div className="text-white mt-2">
              Full Stack Developer
            </div>
            <div className="text-neon-green mt-4">
              <span className="text-gray-400">$</span> cat skills.txt
            </div>
            <div className="text-white mt-2">
              React • TypeScript • Node.js • Python
            </div>
            <div className="text-neon-green mt-4">
              <span className="text-gray-400">$</span> echo "Let's build something amazing!"
            </div>
            <div className="text-white mt-2">
              Let's build something amazing!
            </div>
            <div className="text-neon-green mt-4 flex items-center">
              <span className="text-gray-400">$</span>
              <span className="ml-2 terminal-cursor">_</span>
            </div>
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        >
          <span className="text-neon-green">&lt;</span>
          Your Name
          <span className="text-neon-green">/&gt;</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 font-mono"
        >
          Full Stack Developer & Problem Solver
        </motion.p>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-lg border border-neon-green/20">
            <Code className="text-neon-green" size={20} />
            <span className="text-sm font-mono">Frontend</span>
          </div>
          <div className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-lg border border-neon-blue/20">
            <Terminal className="text-neon-blue" size={20} />
            <span className="text-sm font-mono">Backend</span>
          </div>
          <div className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-lg border border-neon-pink/20">
            <Zap className="text-neon-pink" size={20} />
            <span className="text-sm font-mono">DevOps</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 136, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent border-2 border-neon-green text-neon-green px-8 py-3 rounded-lg font-mono font-semibold hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
        >
          View My Work
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-neon-green"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-green rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-neon-blue rounded-full opacity-40"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-neon-pink rounded-full opacity-25"
        />
      </div>
    </div>
  );
};

export default Home;