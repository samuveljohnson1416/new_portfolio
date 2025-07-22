import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, Star, Filter, Search } from 'lucide-react';
import portfolioImage from '../assets/portfoliov1.png';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'MyPortfolio version 1.0',
      description: 'A complete portfolio website built with HTML, CSS, and JavaScript.',
      longDescription: 'Full-featured portfolio website with professional info, project browsing, and contact form.',
      tech: ['Html', 'CSS', 'JavaScript','Google Form'],
      github: 'https://github.com/samuveljohnson1416/my_Portfolio',
      live: 'https://samjportfolio.netlify.app',
      image: portfolioImage,
      featured: true,
      category: 'Webdevelopment',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Inventory Management Web Application',
      description: 'A responsive inventory management application with CRUD operations, local storage, and clean user interface. Built with HTML,CSS, JavaScript, Nodejs, and MySQL.',
      longDescription: 'Interactive inventory management application featuring add, edit, delete, and mark complete functionality with persistent storage and responsive design.',
      tech: ['HTML', 'JavaScript', 'CSS', 'MySQL', 'Node.js'],
      github: 'https://github.com/samuveljohnson1416/inventory-management',
      image: 'src/assets/Inventory_management.png',
      featured: true,
      category: 'fullstack',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Student Enrollment System',
      description: 'A Java web application for student registration with JDBC connectivity. Built using Java Servlets, JSP, and MySQL database.',
      longDescription: 'Complete student enrollment system featuring registration forms, database connectivity through JDBC, and dynamic web pages using JSP and Servlets.',
      tech: ['Java', 'JSP', 'Servlets', 'MySQL', 'JDBC', 'Tomcat', 'HTML'],
      github: 'https://github.com/samuveljohnson1416/StudentEnrollmentSystem',
      image: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      category: 'fullstack & backend',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Portfolio Website v2.0',
      description: 'A cutting-edge portfolio website built with React, TypeScript, and Framer Motion. Features cyberpunk-inspired design with neon accents and smooth animations.',
      longDescription: 'Modern portfolio showcasing advanced React development skills with TypeScript, custom CSS animations, responsive design, and interactive components. Built with Vite for optimal performance.',
      tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'Responsive Design'],
      github: 'https://github.com/samuveljohnson1416/new_portfolio',
      live: '#',
      image: 'src/assets/portfoliov2.png',
      featured: true,
      category: 'frontend',
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'Weather Website',
      description: 'A basic weather application that provides real-time temperature and humidity data using weather API. Built during first year as a learning project.',
      longDescription: 'Simple weather website featuring current weather conditions, temperature, humidity, and location-based weather data. Created as an introductory project to learn API integration and basic web development.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Weather API', 'Responsive Design'],
      github: '',
      live: '',
      image: '',
      featured: false,
      category: 'frontend',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Java Quiz Game',
      description: 'A console-based quiz game application built in Java that runs entirely in terminal. Features multiple-choice questions, score tracking, interactive gameplay and with time limits.',
      longDescription: 'Terminal-based quiz game mini project featuring question management, user input handling, score calculation, and game flow control. Built as a Java learning project to practice OOP concepts and console I/O.',
      tech: ['Java', 'Console Application', 'OOP', 'File Handling', 'Scanner Class'],
      github: '',
      image: '',
      featured: false,
      category: 'backend',
      status: 'completed'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const otherProjects = filteredProjects.filter(project => !project.featured);

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
            <Folder className="text-neon-green" size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">{'<'}</span>
            Projects
            <span className="text-neon-green">{'/>'}</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono">
            Some things I've built with passion and code
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex items-center gap-2">
              <Filter className="text-neon-green" size={20} />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                      filter === category.id
                        ? 'bg-neon-green text-dark-bg'
                        : 'bg-dark-card text-gray-400 hover:text-neon-green border border-gray-700 hover:border-neon-green/30'
                    }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-dark-card border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none transition-colors font-mono text-sm w-64"
              />
            </div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        <AnimatePresence>
          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <Star className="text-neon-green" size={24} />
                <h2 className="text-2xl font-display font-semibold">Featured Projects</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="group bg-dark-card border border-neon-green/20 rounded-lg overflow-hidden hover:border-neon-green/40 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.github ? (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-dark-bg/80 rounded-full text-gray-400 hover:text-neon-green transition-colors"
                          >
                            <Github size={16} />
                          </motion.a>
                        ) : (
                          <motion.div
                            className="relative p-2 bg-dark-bg/80 rounded-full text-gray-600 cursor-not-allowed group"
                          >
                            <Github size={16} />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Files not uploaded
                            </div>
                          </motion.div>
                        )}
                        {project.live ? (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-dark-bg/80 rounded-full text-gray-400 hover:text-neon-green transition-colors"
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        ) : (
                          <motion.div
                            className="relative p-2 bg-dark-bg/80 rounded-full text-gray-600 cursor-not-allowed group"
                          >
                            <ExternalLink size={16} />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Demo not available
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-display font-semibold mb-3 text-neon-green">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm font-mono leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-neon-green/10 text-neon-green text-xs font-mono rounded border border-neon-green/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Projects */}
        <AnimatePresence>
          {otherProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-display font-semibold mb-8">Other Projects</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-dark-card border border-gray-700 rounded-lg p-6 hover:border-neon-green/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Folder className="text-neon-green" size={24} />
                      <div className="flex gap-2">
                        {project.github ? (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-neon-green transition-colors"
                          >
                            <Github size={18} />
                          </motion.a>
                        ) : (
                          <motion.div
                            className="relative text-gray-600 cursor-not-allowed group"
                          >
                            <Github size={18} />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Files not uploaded
                            </div>
                          </motion.div>
                        )}
                        {project.live ? (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-neon-green transition-colors"
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        ) : (
                          <motion.div
                            className="relative text-gray-600 cursor-not-allowed group"
                          >
                            <ExternalLink size={18} />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Demo not available
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display font-semibold mb-2 text-white">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm font-mono leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 text-xs font-mono text-gray-500">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 font-mono text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 font-mono mb-6">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/samuveljohnson1416"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-transparent border-2 border-neon-green text-neon-green px-6 py-3 rounded-lg font-mono font-semibold hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
          >
            <Github size={20} />
            View GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;