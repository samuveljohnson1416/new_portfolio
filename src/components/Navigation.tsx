import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Folder, FileText, Mail, Move } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/projects', icon: Folder, label: 'Projects' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <motion.nav
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ touchAction: 'none' }}
    >
      <div className="bg-dark-card/90 backdrop-blur-md border border-neon-green/20 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <motion.div
            className="p-2 text-gray-400 hover:text-neon-green transition-colors cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Move size={16} />
          </motion.div>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-600"></div>

          {/* Navigation Items */}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.path}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    navigate(item.path);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-neon-green text-dark-bg'
                    : 'text-gray-400 hover:text-neon-green hover:bg-neon-green/10'
                }`}
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
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

      {/* Drag Instructions (shows on first hover) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-dark-card/90 border border-neon-green/20 rounded-lg px-3 py-2 pointer-events-none"
      >
        <span className="text-xs font-mono text-gray-300 whitespace-nowrap">
          Drag to move • Click to navigate
        </span>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-green/20"></div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;