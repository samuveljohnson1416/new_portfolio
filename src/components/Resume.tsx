import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2023 - Present',
      location: 'San Francisco, CA',
      description: 'Leading a team of 5 developers in building scalable web applications. Architected microservices infrastructure that improved system performance by 40%. Mentored junior developers and established coding standards.',
      achievements: [
        'Reduced application load time by 60% through optimization',
        'Led migration to cloud infrastructure (AWS)',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Mentored 3 junior developers who were promoted'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations Inc.',
      period: '2021 - 2023',
      location: 'Remote',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to implement pixel-perfect interfaces and optimized user experiences.',
      achievements: [
        'Built 15+ responsive web applications',
        'Improved client satisfaction scores by 25%',
        'Reduced bug reports by 45% through comprehensive testing',
        'Implemented real-time features using WebSocket'
      ],
      technologies: ['React', 'Vue.js', 'Node.js', 'MongoDB', 'Socket.io', 'SASS']
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Ventures',
      period: '2020 - 2021',
      location: 'New York, NY',
      description: 'Focused on creating engaging user interfaces and improving user experience. Worked closely with UX designers to implement responsive designs and interactive features.',
      achievements: [
        'Increased user engagement by 35%',
        'Reduced bounce rate by 28%',
        'Implemented accessibility standards (WCAG 2.1)',
        'Built component library used across 5 projects'
      ],
      technologies: ['React', 'JavaScript', 'CSS3', 'Webpack', 'Jest', 'Figma']
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      period: '2016 - 2020',
      location: 'Berkeley, CA',
      gpa: '3.8/4.0',
      description: 'Graduated Magna Cum Laude. Focused on software engineering, algorithms, and web development. Active member of the Computer Science Society.',
      coursework: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Systems',
        'Computer Networks',
        'Machine Learning',
        'Web Development'
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-CSA-2023-001',
      link: '#'
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022',
      credentialId: 'META-REACT-2022-456',
      link: '#'
    },
    {
      name: 'Node.js Application Developer',
      issuer: 'OpenJS Foundation',
      date: '2022',
      credentialId: 'NODEJS-DEV-2022-789',
      link: '#'
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      date: '2021',
      credentialId: 'MONGO-DEV-2021-123',
      link: '#'
    }
  ];

  const skills = {
    'Frontend': ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'SASS'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django', 'GraphQL', 'REST APIs'],
    'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma', 'Supabase'],
    'DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Nginx'],
    'Tools': ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'Cypress']
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
            <span className="text-neon-green"><</span>
            Resume
            <span className="text-neon-green">/></span>
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