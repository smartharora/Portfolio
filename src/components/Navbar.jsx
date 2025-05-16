import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ onDashboardToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleDashboardClick = () => {
    setShowDashboard(!showDashboard);
    onDashboardToggle(!showDashboard);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="#home" className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Your Name
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
              <a href="#timeline" className="text-gray-300 hover:text-white transition-colors">Timeline</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-yellow-400 dark:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={handleDashboardClick}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span>Dashboard</span>
              <FaChevronRight className={`transform transition-transform ${showDashboard ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-md"
          >
            <div className="h-full overflow-auto pt-24">
              {/* This is where MediaSection will go */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 