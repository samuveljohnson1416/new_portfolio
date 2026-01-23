import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, Star, Filter, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { getAllProjects, ProjectData } from '../services/githubService';
import AnimatedBackground from './AnimatedBackground';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from GitHub on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedProjects = await getAllProjects();
      setProjects(fetchedProjects);
    } catch (err) {
      setError('Failed to load projects from GitHub. Please try again later.');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Dynamically generate categories based on actual projects
  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    ...Array.from(new Set(projects.map(p => p.category)))
      .sort()
      .map(cat => ({
        id: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: projects.filter(p => p.category === cat).length
      }))
  ];

  // Dynamically generate language filters based on actual projects
  const languages = [
    { id: 'all', label: 'All Languages', count: projects.length },
    ...Array.from(new Set(projects.map(p => p.language).filter(Boolean)))
      .sort()
      .map(lang => ({
        id: lang,
        label: lang,
        count: projects.filter(p => p.language === lang).length
      }))
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesLanguage = languageFilter === 'all' || project.language === languageFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesLanguage && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const otherProjects = filteredProjects.filter(project => !project.featured);

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
            <Folder className="text-neon-green" size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">{'<'}</span>
            Projects
            <span className="text-neon-green">{'/>'}</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono">
            {loading 
              ? 'Loading projects from GitHub...' 
              : `${projects.length} projects from GitHub`}
          </p>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 text-red-400 text-sm font-mono"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
              <button
                onClick={loadProjects}
                className="ml-2 text-neon-green hover:underline"
              >
                Retry
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-4"
        >
          {/* Header with Clear Filters */}
          {(filter !== 'all' || languageFilter !== 'all' || searchTerm) && (
            <div className="flex items-center justify-between">
              <div className="text-sm font-mono text-gray-400">
                Active filters applied
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilter('all');
                  setLanguageFilter('all');
                  setSearchTerm('');
                }}
                className="text-xs font-mono text-neon-pink hover:underline"
              >
                Clear all filters
              </motion.button>
            </div>
          )}
          
          {/* Category Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter className="text-neon-green" size={20} />
              <span className="text-gray-400 text-sm font-mono">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
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
                  <span className={`ml-2 text-xs ${
                    filter === category.id ? 'text-dark-bg/70' : 'text-gray-500'
                  }`}>
                    ({category.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Language Filters */}
          {languages.length > 1 && (
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter className="text-neon-blue" size={20} />
                <span className="text-gray-400 text-sm font-mono">Language:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguageFilter(lang.id)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 ${
                      languageFilter === lang.id
                        ? 'bg-neon-blue text-dark-bg'
                        : 'bg-dark-card text-gray-400 hover:text-neon-blue border border-gray-700 hover:border-neon-blue/30'
                    }`}
                  >
                    {lang.label}
                    <span className={`ml-1.5 text-xs ${
                      languageFilter === lang.id ? 'text-dark-bg/70' : 'text-gray-500'
                    }`}>
                      ({lang.count})
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Search and Refresh */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-sm font-mono text-gray-500">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-2">
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
              
              {/* Refresh button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={loadProjects}
                disabled={loading}
                className="p-2 bg-dark-card border border-gray-700 rounded-lg hover:border-neon-green transition-colors disabled:opacity-50"
                title="Refresh projects from GitHub"
              >
                <RefreshCw className={`text-neon-green ${loading ? 'animate-spin' : ''}`} size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <RefreshCw className="text-neon-green animate-spin mx-auto mb-4" size={48} />
            <p className="text-gray-400 font-mono">Loading projects from GitHub...</p>
          </motion.div>
        )}

        {/* Featured Projects */}
        <AnimatePresence>
          {!loading && featuredProjects.length > 0 && (
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
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Folder className="text-neon-green" size={24} />
                            {project.stars > 0 && (
                              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                                <Star size={12} fill="currentColor" />
                                <span>{project.stars}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-display font-semibold text-neon-green mb-3">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          {project.github && (
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
                          )}
                          {project.live && (
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
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm font-mono leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-neon-green/10 text-neon-green text-xs font-mono rounded border border-neon-green/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-500 font-mono">
                        Last updated: {project.lastUpdated}
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
          {!loading && otherProjects.length > 0 && (
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
                        {project.github && (
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
                        )}
                        {project.live && (
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
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-display font-semibold text-white">
                        {project.title}
                      </h3>
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <Star size={12} fill="currentColor" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm font-mono leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
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
                    
                    <div className="text-xs text-gray-600 font-mono">
                      Updated: {project.lastUpdated}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <AlertCircle className="text-gray-500 mx-auto mb-4" size={48} />
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
