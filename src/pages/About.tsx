import { motion } from 'framer-motion';
import { User, Code2, Lightbulb, Target, Heart } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const About = () => {
  const skills = [
    { name: 'React.js' },
    { name: 'Java/JavaScript' },
    { name: 'Node.js' },
    { name: 'MongoDB/MySQL' },
    { name: 'HTML/CSS' },
    { name: 'Git/GitHub' },
  ];

  // Stats section removed as requested

  const leetcode = {
    icon: Code2,
    label: 'LeetCode',
    href: 'https://leetcode.com/u/Samuvel_Johnson/',
    color: 'hover:text-neon-pink',
    username: 'u/Samuvel_Johnson'
  };

  const interests = [
    'Full Stack Web Development',
    'Problem Solving',
    'Learning New Tech',
    'Team Collaboration'
  ];

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-dark-card border border-neon-green/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center"
          >
            <User className="text-neon-green" size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">{'<'}</span>
            About Me
            <span className="text-neon-green">{'/>'}</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono">
            Build not just with code, but with purpose—because every line you write can shape someone’s world.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="text-neon-green" size={24} />
                <h3 className="text-xl font-display font-semibold">My Journey</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I'm a passionate full-stack developer with over 2 years of hands-on experience building meaningful and scalable web applications. What began as a simple 'Hello World' quickly grew into a deep love for crafting real solutions that people actually use. I specialize in React and Node.js, and I’m driven by the idea of building efficient, user-friendly systems that make a difference. For me, it’s not just about writing code—it’s about building experiences that matter
              </p>
            </div>

            <div className="bg-dark-card border border-neon-blue/20 rounded-lg p-6 hover:border-neon-blue/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-neon-blue" size={24} />
                <h3 className="text-xl font-display font-semibold">What I Do</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I specialize in full-stack development using React, Node.js, Express, 
                and MongoDB. I'm passionate about creating responsive, user-friendly 
                applications and have experience with both frontend and backend development. 
                I enjoy working with modern JavaScript frameworks and building efficient APIs.
              </p>
            </div>

            <div className="bg-dark-card border border-neon-pink/20 rounded-lg p-6 hover:border-neon-pink/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-neon-pink" size={24} />
                <h3 className="text-xl font-display font-semibold">My Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I’m currently focused on mastering Django, REST APIs, PostgreSQL, and advanced React techniques.
Exploring full-stack development through real-world fintech projects like IPO web applications.
I’m passionate about building scalable, user-focused solutions with clean architecture and smart design.
Every line of code is part of my journey to create impactful and reliable software.
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
              <ul className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-neon-green/10 text-neon-green px-3 py-2 rounded-lg text-xs font-mono text-center border border-neon-green/20"
                  >
                    {skill.name}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Personal Interests */}
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-neon-pink" size={20} />
                <h3 className="text-xl font-display font-semibold">Interests</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="bg-neon-green/10 text-neon-green px-3 py-2 rounded-lg text-xs font-mono text-center border border-neon-green/20"
                  >
                    {interest}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

  {/* Stats Section removed as requested */}

        {/* LeetCode Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="max-w-xs mx-auto mb-12"
        >
          <a
            href={leetcode.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 bg-dark-card border border-neon-pink/30 rounded-lg p-4 shadow-lg transition-colors duration-300 hover:border-neon-pink/60 ${leetcode.color}`}
          >
            <leetcode.icon size={32} className="text-neon-pink" />
            <div>
              <div className="font-display font-semibold text-lg text-neon-pink">{leetcode.label}</div>
              <div className="font-mono text-xs text-gray-400">{leetcode.username}</div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;