import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const experience = [
    {
      title: 'Software Developer Intern',
      company: 'Bluestock Fintech',
      period: '01-07-2025 to 31-08-2025',
      location: 'virtual',
      description: 'Developing full-stack IPO web applications using modern technologies. Creating responsive user interfaces and robust backend Rest APIs. Working with clients to deliver custom solutions.',
      achievements: [
        'Built responsive IPO web applications',
        'Implemented RESTful APIs with Node.js and Python Django',
        'Developed interactive UIs using React and modern CSS',
        'Integrated databases with PostgreSQL',
      ],
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JavaScript', 'HTML/CSS']
    },
    {
      title: 'Inplant Trainee',
      company: 'Tamilnadu Co Operative Milk Producers Federation Ltd',
      period: '15-07-2024 to 22-07-2024',
      location: 'On-site',
      description: 'Gained knowledge about how the industry works and practical knowledge about how dairy products are manufactured.',
      achievements: [
        'Learned about dairy production processes',
        'Bridged theoretical knowledge with real-world production practices.',
        'Gained comprehensive insight into the functioning of the dairy industry.'
      ],
      technologies: ['Industrial Training', 'Dairy Production', 'Quality Control', 'Process Management']
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering in Information Technology',
      school: 'Loyola ICAM college of Engineering and Technology',
      period: '2023 - 2027',
      location: 'Nungambakkam,chennai,Tamil Nadu, India',
      gpa: '8.6/10.0',
      description: 'Focused on software engineering, web development, and computer programming. Completed various projects in full-stack development.',
      coursework: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Web Technologies',
        'Object Oriented Programming',
        'Operating Systems',
        'Computer Networks',
        'Database Management Systems',
        'Operating Systems',
        'OOPs',
        'Theory of Computation',
        'Artificial Intelligence and Machine Learning',
      ]
    },
    {
      degree: 'Higher Secondary Education (Pre-KG to 12th)',
      school: 'St.Antony\'s Matriculation Higher Sec School',
      period: 'Pre-KG - 2023',
      location: 'block-29,Neyveli,Cuddalore, Tamil Nadu, India',
      gpa: '89%',
      description: 'Completed comprehensive schooling from Pre-Kindergarten through 12th grade, building strong foundational knowledge across all core subjects.',
      coursework: [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'English ',
        'Science',
        'Social Studies'
      ]
    }
  ];

  const certifications = [
    
    {
      name: 'Artificial Intelligence Primer Certification',
      issuer: 'Infosys SpringBoard',
      date: 'June 17, 2025',
      credentialId: '',
      link: 'https://drive.google.com/file/d/17STOj1ziK-ih7cqdfrac2J5UJjujEGgG/view?usp=drive_link'
    },
    {
      name: 'MatLab Onramp',
      issuer: 'Infosys SpringBoard',
      date: 'November 20, 2023',
      credentialId: 'N/A',
      link: 'https://drive.google.com/file/d/13zy-txFYb37SMjl-7m9jViKoXZ3-2EGA/view?usp=drive_link'
    },
    {
      name: 'Introduction to Data Science',
      issuer: 'Infosys SpringBoard',
      date: 'June 15, 2025',
      credentialId: 'N/A',
      link: 'https://drive.google.com/file/d/1vxeqSmtN-Hp0eadKrMeAEPyh9CwJypvp/view?usp=sharing'
    },
    
    {
      name: 'Prompt Engineering',
      issuer: 'Infosys SpringBoard',
      date: 'June 6, 2025',
      credentialId: 'N/A',
      link: 'https://drive.google.com/file/d/1hGHBGxqxR9v2NIFBxJASDQirWoyZTURN/view?usp=drive_link'
    },
    
    {
      name: 'Introduction to OpenAI GPT Models',
      issuer: 'Infosys SpringBoard',
      date: 'June 16, 2025',
      credentialId: 'N/A',
      link: 'https://drive.google.com/file/d/1lgokzaYH158hTx_c9JAmL1ZcCtJWzH43/view?usp=sharing'
    },
    {
      name: 'GitHub Foundations',
      issuer: 'GitHub',
      date: 'June 1, 2025',
      credentialId: 'Verified at Credly',
      link: 'https://www.credly.com/badges/e83c4d6a-d6db-4cef-a9d6-399fa77abf39/linked_in?t=sx6a4v'
    },
    {
      name: 'IOT WorkShop',
      issuer: 'LICET',
      date: 'December 9, 202',
      credentialId: '',
      link: 'https://drive.google.com/file/d/1r8d0Vq3xj2y9c6j1m5h8l4Y2Z7eX5JbN/view?usp=drive_link'
    },
    {
      name: 'Artificial Intelligence Primer Certification',
      issuer: 'Infosys SpringBoard',
      date: 'June 17, 2025',
      credentialId: '',
      link: 'https://drive.google.com/file/d/17STOj1ziK-ih7cqdfrac2J5UJjujEGgG/view?usp=drive_link'
    },
      
      {
        name: 'Python 3.0',
        issuer: 'SkillRack',
        date: 'August 30, 2024',
        credentialId: 'N/A',
        link: 'https://drive.google.com/file/d/1cflZ3yDmwNkx6u9xpaHmfRppNCXCZZ1L/view?usp=sharing'
      },
      {
        name: 'Introduction to Data Science',
        issuer: 'Infosys SpringBoard',
        date: 'June 15, 2025',
        credentialId: 'N/A',
        link: 'https://drive.google.com/file/d/1vxeqSmtN-Hp0eadKrMeAEPyh9CwJypvp/view?usp=sharing'
      },
      
      {
        name: 'Prompt Engineering',
        issuer: 'Infosys SpringBoard',
        date: 'June 6, 2025',
        credentialId: 'N/A',
        link: 'https://drive.google.com/file/d/1hGHBGxqxR9v2NIFBxJASDQirWoyZTURN/view?usp=drive_link'
      },
      
      {
        name: 'Introduction to OpenAI GPT Models',
        issuer: 'Infosys SpringBoard',
        date: 'June 16, 2025',
        credentialId: 'N/A',
        link: 'https://drive.google.com/file/d/1lgokzaYH158hTx_c9JAmL1ZcCtJWzH43/view?usp=sharing'
      },
      {
        name: 'GitHub Foundations',
        issuer: 'GitHub',
        date: 'June 1, 2025',
        credentialId: 'Verified at Credly',
        link: 'https://www.credly.com/badges/e83c4d6a-d6db-4cef-a9d6-399fa77abf39/linked_in?t=sx6a4v'
      },
      {
      name: 'Techathon\'24',
      issuer: 'MADCLUB - LICET',
      date: 'November 13, 2024',
      credentialId: '',
      link: 'https://drive.google.com/file/d/1ETiy3yyj0i8DBI-jKadhp5D4L-fxMA9F/view?usp=sharing'
    },
    {
      name: 'Fundamentals of Statistics and Visualization in Python',
      issuer: 'Infosys SpringBoard',
      date: 'August 27, 2025',
      credentialId: '',
      link: 'https://drive.google.com/file/d/1ETiy3yyj0i8DBI-jKadhp5D4L-fxMA9F/view?usp=sharing'
    },
    {
      name: 'C Programming',
      issuer: 'SkillRack',
      date: 'October 23, 2024',
      credentialId: '',
      link: 'https://drive.google.com/file/d/1ETiy3yyj0i8DBI-jKadhp5D4L-fxMA9F/view?usp=sharing'
    },
    {
      name: 'ThinkUp Ideathon',
      issuer: 'VIT Chennai',
      date: 'September 12, 2024',
      credentialId: '',
      link: 'https://drive.google.com/file/d/1ETiy3yyj0i8DBI-jKadhp5D4L-fxMA9F/view?usp=sharing'
    },
    {
      name: 'Drone Workshop',
      issuer: 'Entrench Electricals',
      date: 'February 23, 2025',
      credentialId: '',
      link: 'https://drive.google.com/file/d/1ETiy3yyj0i8DBI-jKadhp5D4L-fxMA9F/view?usp=sharingq'
    }
  ];

  const skills = {
    'Frontend': ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design'],
    'Backend': ['Node.js', 'REST APIs', 'Django','Python'],
    'Database': ['MongoDB', 'MySQL', 'Database Design', 'PostgreSQL'],
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
    // For now, we'll open the PDF in a new tab
    // In production, you should move SJ_resume.pdf to the public folder
    try {
      const link = document.createElement('a');
      link.href = 'src/assets/SJ_resume.pdf'; // This assumes the PDF is in the public folder
      link.download = 'Samuvel_Johnson_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback: just alert the user
      alert('Resume download is currently unavailable. Please contact me directly for my resume.');
    }
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
                  
                  {job.technologies && (
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
                  )}
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