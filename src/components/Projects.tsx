import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, Star, Filter, Search } from 'lucide-react';

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
      image: '/assets/portfoliov1.png',
      featured: true,
      category: 'fullstack',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Todo List Application',
      description: 'A responsive todo list application with CRUD operations, local storage, and clean user interface. Built with React and modern CSS.',
      longDescription: 'Interactive todo application featuring add, edit, delete, and mark complete functionality with persistent storage and responsive design.',
      tech: ['React', 'JavaScript', 'CSS3', 'Local Storage', 'Responsive Design'],
      github: 'https://github.com/samuveljohnson1416/todo-app',
      live: 'https://samjportfolio.netlify.app',
      image: '/assets/image.png',
      featured: true,
      category: 'fullstack',
      status: 'completed'
    },
   
    
    
    {
      id: 3,
      title: 'Inventory Management System',
      description: 'A comprehensive inventory management system built with Node.js and MySQL for tracking inventory items with CRUD operations.',
      longDescription: 'Full-featured inventory management system with add, edit, delete, and view functionality. Includes MySQL database integration with clean web interface for managing inventory items, categories, and pricing.',
      tech: ['Node.js', 'Express.js', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
      github: 'https://github.com/samuveljohnson1416/inventory-management',
      live: 'https://samjportfolio.netlify.app',
      image: '/assets/INventory_management.png',
      featured: true,
      category: 'fullstack',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Student Enrollment System',
      description: 'A Java-based student enrollment system with JDBC connectivity for managing student records and course enrollments.',
      longDescription: 'Academic project demonstrating JDBC connectivity with Java servlets. Features student registration, course enrollment, and database management using Eclipse IDE and Tomcat server.',
      tech: ['Java', 'JDBC', 'Servlets', 'Tomcat', 'Eclipse IDE'],
      github: 'https://github.com/samuveljohnson1416/StudentEnrollmentSystem',
      live: 'https://samjportfolio.netlify.app',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      category: 'backend',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Portfolio Website v2.0',
      description: 'Modern portfolio website built with React, TypeScript and Tailwind CSS featuring animations and responsive design.',
      longDescription: 'Current portfolio website showcasing projects, skills, and experience. Built with React, TypeScript, Vite, and Tailwind CSS with smooth animations using Framer Motion.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
      github: 'https://github.com/samuveljohnson1416/new_portfolio',
      live: 'https://samjportfolio.netlify.app',
      image: '/assets/portfoliov2.png',
      featured: true,
      category: 'frontend',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Connect4 Game',
      description: 'Interactive Connect4 game built with vanilla JavaScript, HTML5, and CSS3 featuring game logic, player vs player mode, and responsive design.',
      longDescription: 'Classic Connect4 game implementation with interactive gameplay, win detection algorithm, player turn management, and clean user interface. Deployed with modern web technologies.',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Game Development', 'DOM Manipulation', 'Responsive Design'],
      github: 'https://github.com/samuveljohnson1416/connect4_game_deployment',
      live: 'https://www.figma.com/proto/SVg16X7PyJcCPhxQYQMcPF/connect4?node-id=4-2090&t=nGueBZEm7nvNWvyg-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A2090&show-proto-sidebar=1',
      image: '/assets/c4.png',
      featured: true,
      category: 'frontend',
      status: 'completed'
    },
    {
      id: 7,
      title: 'Medify',
      description: 'A UI/UX design application for hospital bed booking.',
      longDescription: 'Medify is a modern UI/UX design for a hospital bed booking application, focusing on seamless user experience and clean interface.',
      tech: ['UI/UX', 'Figma', 'Design'],
      github: '',
      live: '',
      image: '/assets/medify.jpg',
      featured: true,
      category: 'frontend',
      status: 'completed'
    }
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
                      {project.media ? (
                        <div className="w-full h-48 flex items-center justify-center bg-black">
                          {project.media}
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
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