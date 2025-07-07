import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';

const Resume = () => {
  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and improved team productivity by 30%.',
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'MongoDB']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Co.',
      period: '2021 - 2022',
      description: 'Developed responsive web applications and improved user experience across multiple client projects. Collaborated with design teams to implement pixel-perfect interfaces.',
      technologies: ['React', 'JavaScript', 'SASS', 'Webpack', 'Git']
    },
    {
      title: 'Junior Web Developer',
      company: 'StartUp Ventures',
      period: '2020 - 2021',
      description: 'Built and maintained company websites and web applications. Gained experience in full-stack development and agile methodologies.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      period: '2016 - 2020',
      description: 'Graduated with honors. Focused on software engineering, algorithms, and web development.'
    }
  ];

  const certifications = [
    'AWS Certified Developer Associate',
    'React Developer Certification',
    'Node.js Application Developer',
    'MongoDB Certified Developer'
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
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
            <FileText className="text-neon-green" size={24} />
          </motion.button>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">&lt;</span>
            Resume
            <span className="text-neon-green">/&gt;</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono mb-8">
            My professional journey and qualifications
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-mono font-semibold hover:bg-neon-green/90 transition-all duration-300"
          >
            <Download size={20} />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-neon-green" size={24} />
            <h2 className="text-2xl font-display font-semibold">Experience</h2>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                className="bg-dark-card border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/40 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neon-green">
                      {job.title}
                    </h3>
                    <p className="text-gray-300 font-mono">{job.company}</p>
                  </div>
                  <span className="text-sm font-mono text-gray-400 mt-2 md:mt-0">
                    {job.period}
                  </span>
                </div>
                
                <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neon-green/10 text-neon-green text-xs font-mono rounded-full border border-neon-green/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-neon-blue" size={24} />
            <h2 className="text-2xl font-display font-semibold">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="bg-dark-card border border-neon-blue/20 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neon-blue">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-300 font-mono">{edu.school}</p>
                  </div>
                  <span className="text-sm font-mono text-gray-400 mt-2 md:mt-0">
                    {edu.period}
                  </span>
                </div>
                
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-neon-pink" size={24} />
            <h2 className="text-2xl font-display font-semibold">Certifications</h2>
          </div>

          <div className="bg-dark-card border border-neon-pink/20 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-neon-pink/5 rounded-lg border border-neon-pink/10"
                >
                  <Award className="text-neon-pink" size={16} />
                  <span className="font-mono text-sm text-gray-300">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;