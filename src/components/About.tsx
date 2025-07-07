import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'PostgreSQL', level: 75 },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mb-6 p-3 bg-dark-card border border-neon-green/30 rounded-lg"
          >
            <User className="text-neon-green" size={24} />
          </motion.button>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">&lt;</span>
            About Me
            <span className="text-neon-green">/&gt;</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono">
            Get to know the developer behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="text-neon-green" size={20} />
                <h3 className="text-xl font-display font-semibold">My Journey</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I'm a passionate full-stack developer with over 3 years of experience 
                building web applications. I love turning complex problems into simple, 
                beautiful, and intuitive solutions. When I'm not coding, you'll find me 
                exploring new technologies or contributing to open-source projects.
              </p>
            </div>

            <div className="bg-dark-card border border-neon-blue/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-neon-blue" size={20} />
                <h3 className="text-xl font-display font-semibold">What I Do</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I specialize in creating responsive web applications using modern 
                technologies like React, TypeScript, and Node.js. I'm passionate about 
                clean code, user experience, and building scalable solutions that make 
                a real impact.
              </p>
            </div>

            <div className="bg-dark-card border border-neon-pink/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-neon-pink" size={20} />
                <h3 className="text-xl font-display font-semibold">My Goals</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I'm always looking to learn new technologies and improve my skills. 
                Currently, I'm diving deeper into cloud technologies and exploring 
                machine learning applications in web development.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6">
              <h3 className="text-xl font-display font-semibold mb-6 text-center">
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">{skill.name}</span>
                      <span className="font-mono text-xs text-neon-green">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6">
              <h3 className="text-xl font-display font-semibold mb-4 text-center">
                Fun Facts
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-neon-green">▶</span>
                  <span className="text-gray-300">Coffee consumed: 1,247 cups ☕</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neon-blue">▶</span>
                  <span className="text-gray-300">Lines of code written: 50,000+ 💻</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neon-pink">▶</span>
                  <span className="text-gray-300">Projects completed: 25+ 🚀</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neon-green">▶</span>
                  <span className="text-gray-300">Bugs fixed: Countless 🐛</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;