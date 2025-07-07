import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Folder, FileText, Mail } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/projects', icon: Folder, label: 'Projects' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-dark-card/80 backdrop-blur-md border border-neon-green/20 rounded-full px-6 py-3">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-neon-green text-dark-bg'
                    : 'text-gray-400 hover:text-neon-green hover:bg-neon-green/10'
                }`}
              >
                <Icon size={20} />
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-dark-bg border border-neon-green/30 rounded-lg px-3 py-1 pointer-events-none"
                >
                  <span className="text-xs font-mono text-neon-green whitespace-nowrap">
                    {item.label}
                  </span>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-green/30"></div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;