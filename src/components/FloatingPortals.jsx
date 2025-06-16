import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaTimes, FaCode, FaHome, FaStream, FaEnvelope } from 'react-icons/fa';
import MediaSection from './MediaSection';

// eslint-disable-next-line no-unused-vars
const FloatingButton = ({ icon: Icon, onClick, position, color, pulseColor, isActive }) => (
  <motion.button
    onClick={onClick}
    className={`fixed ${position} z-50 p-4 rounded-full ${color} shadow-lg ${isActive ? 'ring-2 ring-white ring-opacity-50' : ''}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      initial={{ opacity: 0.5, scale: 1 }}
      animate={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ backgroundColor: pulseColor }}
    />
    <Icon className="text-2xl text-white relative z-10" />
  </motion.button>
);

const PortalOverlay = ({ isOpen, onClose, children, from }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, ...(from === 'right' ? { x: '100%' } : { x: '-100%' }) }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, ...(from === 'right' ? { x: '100%' } : { x: '-100%' }) }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-40 bg-gray-900/95"
      >
        <div className="absolute inset-0 backdrop-blur-md" onClick={onClose} />
        <motion.div 
          className="absolute inset-0 w-full h-full bg-gray-900/95 shadow-2xl"
          initial={{ opacity: 0, x: from === 'right' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: from === 'right' ? 100 : -100 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors z-50"
          >
            <FaTimes className="text-gray-400 hover:text-white" />
          </button>
          <div 
            className="h-full py-16 px-6 max-w-7xl mx-auto overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const PersonalContent = () => (
  <div className="space-y-8">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
    >
      Beyond the Code
    </motion.h2>
    <MediaSection />
  </div>
);

const navLinks = [
  { href: '#hero', icon: <FaHome />, label: 'Home' },
  { href: '#about', icon: <FaUser />, label: 'About' },
  { href: '#skills', icon: <FaCode />, label: 'Skills' },
  { href: '#timeline', icon: <FaStream />, label: 'Timeline' },
  { href: '#contact', icon: <FaEnvelope />, label: 'Contact' },
];

const Sidebar = () => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.aside
      className="fixed top-1/2 left-0 z-50 flex flex-col items-center"
      initial={{ x: '-80%' }}
      animate={{ x: hovered ? 0 : '-80%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: 'translateY(-50%)' }}
    >
      <div className={`bg-gray-900/90 dark:bg-gray-800/90 rounded-r-2xl shadow-2xl flex flex-col items-center py-4 px-2 transition-all duration-300 ${hovered ? 'w-48' : 'w-12'}`}
        style={{ minHeight: '320px' }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 my-2 group"
          >
            <span className="text-xl text-blue-400 group-hover:scale-110 transition-transform">{link.icon}</span>
            <span className={`text-gray-200 whitespace-nowrap transition-opacity duration-300 ${hovered ? 'opacity-100 ml-2' : 'opacity-0 ml-0'}`}>{link.label}</span>
          </a>
        ))}
      </div>
    </motion.aside>
  );
};

const FloatingPortals = () => {
  const [personalOpen, setPersonalOpen] = useState(false);

  const handlePersonalClick = () => {
    setPersonalOpen(!personalOpen);
  };

  return (
    <>
      <Sidebar />
      <FloatingButton
        icon={FaUser}
        onClick={handlePersonalClick}
        position="bottom-8 right-8"
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        pulseColor="#8b5cf6"
        isActive={personalOpen}
      />

      <PortalOverlay 
        isOpen={personalOpen} 
        onClose={() => setPersonalOpen(false)}
        from="right"
      >
        <PersonalContent />
      </PortalOverlay>
    </>
  );
};

export default FloatingPortals; 