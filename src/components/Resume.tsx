import { useState } from 'react';
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
      technologies: ['Manufacturing Processes', 'Quality Control', 'Industry Analysis']
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
      degree: 'Higher Secondary Education',
      school: "St.Antony's Matric Higher Sec School",
      period: '2009 - 2023',
      location: 'Neyveli',
      gpa: '89%',
      description: 'Completed higher secondary education with strong academic performance, building foundation in mathematics, science, and computer studies.',
      coursework: [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'English',
        'Tamil'
      ]
    }
  ];

  const certifications = [
    {
      name: 'MATLAB Onramp',
      issuer: 'MathWorks',
      date: '20 November 2023',
      credentialId: 'MATLAB-2023-001',
      link: '#'
    },
    {
      name: 'Simulink Onramp',
      issuer: 'MathWorks',
      date: '14 March 2024',
      credentialId: 'SIMULINK-2024-001',
      link: '#'
    },
    {
      name: 'Python Basics Program',
      issuer: 'SkillRack',
      date: '2023',
      credentialId: 'SkillRack-2023',
      link: '#'
    },
    
   
    {
      name: 'Fundamentals of Statistics and Visualization in Python',
      issuer: 'Infosys Springboard',
      date: '27 August 2024',
      credentialId: 'Verify at verify.onwingspan.com',
      link: 'https://verify.onwingspan.com'
    },
    {
      name: 'Certificate of Appreciation - MAKE A DIFFERENCE CLUB',
      issuer: 'Loyola-ICAM College of Engineering and Technology (LICET)',
      date: '6th & 13th November 2024',
      credentialId: 'TECHATHON2K24',
      link: '#'
    },
    {
      name: 'Two-day Drone Workshop',
      issuer: 'IIT-Madras in association with Entrench Electronics',
      date: '22nd & 23rd February 2025',
      credentialId: 'EWS250',
      link: '#'
    },
    {
      name: 'AngularJS for Beginners: Getting Started',
      issuer: 'Coursera Project Network',
      date: '3 June 2025',
      credentialId: 'CNFVCT7X4KBZ',
      link: 'https://coursera.org/verify/CNFVCT7X4KBZ'
    },
    {
      name: 'GitHub Foundations Badge',
      issuer: 'GitHub',
      date: '1 June 2025',
      credentialId: 'Valid until 1 June 2028',
      link: 'https://credly.com/go/7hW9nuP3'
    },
    {
      name: 'Prompt Engineering',
      issuer: 'Infosys Springboard',
      date: '6 June 2025',
      credentialId: 'Verify at verify.onwingspan.com',
      link: 'https://verify.onwingspan.com'
    },
    {
      name: 'Artificial Intelligence Primer Certification',
      issuer: 'Infosys Springboard',
      date: '17 June 2025',
      credentialId: 'Verify at verify.onwingspan.com',
      link: 'https://verify.onwingspan.com'
    }
  ];

  const skills = {
    'Frontend': ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design','vibecoding','Tailwind CSS', 'Figma',"Canva"],
    'Backend': ['Node.js', , 'Angular', 'Python'],
    'Database': ['MongoDB', 'MySQL', 'Database Design', 'PostgreSQL', 'SQL'],
    'Tools': ['Git', 'GitHub', 'VS Code',, 'npm',"Ai tools"],
    'Other': ['Problem Solving', 'Team Collaboration', 'Agile', 'Code Review', 'Testing',"prompt engineering"]
  };

  const sections = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  const downloadResume = () => {
    // Download the actual resume PDF from public folder
    const link = document.createElement('a');
    link.href = '/SAMUVEL-JOHNSON_resume.pdf';
    link.download = 'SAMUVEL-JOHNSON_resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
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