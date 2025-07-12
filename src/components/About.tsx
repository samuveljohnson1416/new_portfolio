import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Lightbulb, Target, Coffee, Clock, Award, Heart } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'React/Next.js', level: 90, color: 'from-neon-green to-neon-blue' },
    { name: 'JavaScript/TypeScript', level: 85, color: 'from-neon-blue to-neon-pink' },
    { name: 'Node.js/Express', level: 88, color: 'from-neon-pink to-neon-green' },
    { name: 'MongoDB/MySQL', level: 80, color: 'from-neon-green to-neon-blue' },
    { name: 'HTML/CSS', level: 92, color: 'from-neon-blue to-neon-pink' },
    { name: 'Git/GitHub', level: 85, color: 'from-neon-pink to-neon-green' },
  ];

  const stats = [
    { icon: Coffee, label: 'Coffee Cups', value: '1,200+', color: 'text-neon-green' },
    { icon: Code2, label: 'Lines of Code', value: '50K+', color: 'text-neon-blue' },
    { icon: Clock, label: 'Hours Coding', value: '2,000+', color: 'text-neon-pink' },
    { icon: Award, label: 'Projects Done', value: '15+', color: 'text-neon-green' },
  ];

  const interests = [
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Problem Solving',
    'Learning New Tech',
    'Team Collaboration'
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
            The story behind the code
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
                I'm a passionate full-stack developer with over 2 years of experience 
                building scalable web applications. My journey started with a simple 
                "Hello World" and evolved into creating complex, user-centric solutions 
                that solve real-world problems. I specialize in React, Node.js, and modern 
                web technologies, with a strong focus on creating efficient and scalable solutions.
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
                <h3 className="text-xl font-display font-semibold">My Goals</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                I'm constantly learning and exploring new technologies. Currently, I'm 
                expanding my knowledge in cloud technologies, microservices architecture, 
                and advanced React patterns. My goal is to build scalable applications 
                that provide excellent user experiences and solve real-world problems.
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
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-dark-card border border-gray-700 rounded-lg p-6 text-center hover:border-neon-green/30 transition-all duration-300"
            >
              <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
              <div className="text-2xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-mono text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;