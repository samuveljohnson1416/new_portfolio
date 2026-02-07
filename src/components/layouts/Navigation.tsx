import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Folder, FileText, Mail, Menu, X, Code, Briefcase, Users, GraduationCap } from 'lucide-react';
import { usePersona, UserPersona } from '../../context/PersonaContext';


const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { persona, setPersona } = usePersona();

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'text-neon-green' },
    { path: '/about', icon: User, label: 'About', color: 'text-neon-blue' },
    { path: '/projects', icon: Folder, label: 'Projects', color: 'text-neon-pink' },
    { path: '/resume', icon: FileText, label: 'Resume', color: 'text-neon-green' },
    { path: '/contact', icon: Mail, label: 'Contact', color: 'text-neon-blue' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const getPageTitle = () => {
    const currentPage = navItems.find(item => item.path === location.pathname);
    return currentPage ? currentPage.label : 'Portfolio';
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-dark-card/95 backdrop-blur-md border-b border-neon-green/20 shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Code className="text-dark-bg" size={20} />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg">
                  <span className="text-neon-green">{'<'}</span>
                  SJ
                  <span className="text-neon-green">{'/>'}</span>
                </span>
                <div className="text-xs font-mono text-gray-400">
                  {getPageTitle()}
                </div>
              </div>
            </motion.div>

            {/* Center - Current Time & Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex items-center gap-4 bg-dark-card/50 px-4 py-2 rounded-lg border border-neon-green/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-gray-300">Available for work</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <span className="text-xs font-mono text-neon-green">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>

            {/* Persona Toggles (Desktop) */}
            {/* Persona Toggles (Desktop - Only on Projects Page) */}
            <AnimatePresence>
              {location.pathname === '/projects' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="hidden xl:flex items-center gap-2 bg-dark-card/50 p-1.5 rounded-lg border border-neon-green/20 ml-4"
                >
                  <div className="mr-2 text-[10px] font-mono text-gray-400 uppercase tracking-wider">Mode:</div>
                  {[
                    { id: 'RECRUITER', icon: Briefcase, label: 'Recruiter' },
                    { id: 'CLIENT', icon: Users, label: 'Client' },
                    { id: 'STUDENT', icon: GraduationCap, label: 'Student' }
                  ].map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setPersona(mode.id as UserPersona)}
                        className={`p-2 rounded-md transition-all duration-300 relative group ${persona === mode.id
                          ? 'bg-neon-green text-dark-bg shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        title={mode.label}
                      >
                        <Icon size={16} />
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleNavigation(item.path)}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${isActive
                      ? `${item.color} bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/30`
                      : 'text-gray-400 hover:text-neon-green hover:bg-neon-green/5'
                      }`}
                  >
                    <Icon size={16} />
                    <span className="hidden lg:block">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-neon-green rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-400 hover:text-neon-green transition-colors relative"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-dark-bg/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-80 bg-dark-card border-l border-neon-green/20 p-6"
            >
              <div className="flex items-center justify-between mb-8 mt-16">
                <h2 className="text-xl font-display font-bold text-neon-green">Navigation</h2>
                <div className="text-xs font-mono text-gray-400">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavigation(item.path)}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg font-mono transition-all duration-300 ${isActive
                        ? `${item.color} bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/20`
                        : 'text-gray-400 hover:text-neon-green hover:bg-neon-green/5'
                        }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-neon-green rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-4 bg-dark-bg rounded-lg border border-neon-green/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-neon-green">Available for work</span>
                </div>
                <p className="text-xs font-mono text-gray-400">
                  Open to new opportunities and collaborations
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;