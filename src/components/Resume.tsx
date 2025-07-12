import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2022 - Present',
      location: 'Remote',
      description: 'Developing full-stack web applications using modern technologies. Creating responsive user interfaces and robust backend APIs. Working with clients to deliver custom solutions.',
      achievements: [
        'Built 15+ responsive web applications',
        'Implemented RESTful APIs with Node.js and Express',
        'Developed interactive UIs using React and modern CSS',
        'Integrated databases with MongoDB and MySQL'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML/CSS']
    },
    {
      title: 'Web Developer Intern',
      company: 'Tech Startup',
      period: '2021 - 2022',
      location: 'Remote',
      description: 'Assisted in developing web applications and learned modern development practices. Worked on frontend components and basic backend functionality.',
      achievements: [
        'Contributed to 5+ web development projects',
        'Learned React, Node.js, and database management',
        'Collaborated with senior developers on code reviews',
        'Implemented responsive design principles'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub']
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'Anna University',
      period: '2018 - 2022',
      location: 'Tamil Nadu, India',
      gpa: '8.2/10.0',
      description: 'Focused on software engineering, web development, and computer programming. Completed various projects in full-stack development.',
      coursework: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Systems',
        'Web Technologies',
        'Object Oriented Programming',
        'Operating Systems'
      ]
    }
  ];

  const certifications = [
    {
      name: 'Full Stack Web Development',
      issuer: 'Online Course Platform',
      date: '2023',
      credentialId: 'FSWD-2023-001',
      link: '#'
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'FreeCodeCamp',
      date: '2022',
      credentialId: 'FCC-JS-2022-456',
      link: '#'
    },
    {
      name: 'Responsive Web Design',
      issuer: 'FreeCodeCamp',
      date: '2022',
      credentialId: 'FCC-RWD-2022-789',
      link: '#'
    },
    {
      name: 'React Development',
      issuer: 'Online Learning Platform',
      date: '2021',
      credentialId: 'REACT-DEV-2021-123',
      link: '#'
    }
  ];

  const skills = {
    'Frontend': ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'],
    'Backend': ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Middleware'],
    'Database': ['MongoDB', 'MySQL', 'Database Design', 'Mongoose', 'SQL'],
    'Tools': ['Git', 'GitHub', 'VS Code', 'Postman', 'npm', 'Webpack'],
    'Other': ['Problem Solving', 'Team Collaboration', 'Agile', 'Code Review', 'Testing']
  };

  const sections = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  const downloadResume = () => {
    // In a real application, this would download the actual PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be your actual resume PDF
    link.download = 'Alex_Johnson_Resume.pdf';
    link.click();
  };

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
            <FileText className="text-neon-green" size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">{'<'}</span>
            Resume
            <span className="text-neon-green">{'/>'}</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono mb-8">
            My professional journey and qualifications
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 136, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadResume}
            className="inline-flex items-center gap-3 bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-mono font-semibold hover:bg-neon-green/90 transition-all duration-300"
          >
            <Download size={20} />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-neon-green text-dark-bg'
                    : 'bg-dark-card text-gray-400 hover:text-neon-green border border-gray-700 hover:border-neon-green/30'
                }`}
              >
                <Icon size={16} />
                {section.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/40 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-neon-green mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-300 font-mono text-lg">{job.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neon-blue mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300 text-sm font-mono flex items-start gap-2">
                          <span className="text-neon-green mt-1">▶</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
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
            </motion.div>
          )}

          {activeSection === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-neon-blue/20 rounded-lg p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-neon-blue mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-300 font-mono text-lg">{edu.school}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{edu.location}</span>
                        </div>
                        <span className="text-neon-blue">GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                    {edu.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-semibold text-neon-blue mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-xs font-mono rounded-full border border-neon-blue/20"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-neon-pink/20 rounded-lg p-6"
                >
                  <h3 className="text-lg font-display font-semibold text-neon-pink mb-4">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {skillList.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-gray-300 font-mono text-sm"
                      >
                        <span className="text-neon-pink">▶</span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Award className="text-neon-green" size={24} />
                    <motion.a
                      href={cert.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-neon-green transition-colors"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                  
                  <h3 className="text-lg font-display font-semibold text-neon-green mb-2">
                    {cert.name}
                  </h3>
                  
                  <p className="text-gray-300 font-mono text-sm mb-2">
                    {cert.issuer}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>Issued: {cert.date}</span>
                    <span>ID: {cert.credentialId}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Resume;