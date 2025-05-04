import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaUser, FaTimes, FaCode, FaBook, FaYoutube, FaSpotify, FaGamepad, FaGithub, FaLightbulb, FaTools, FaBookReader } from 'react-icons/fa';
import { RiRocketLine, RiTerminalBoxFill, RiTestTubeFill } from 'react-icons/ri';
import MediaSection from './MediaSection';

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
        className="fixed inset-0 z-40"
      >
        <div className="absolute inset-0 backdrop-blur-md" onClick={onClose} />
        <motion.div 
          className={`absolute inset-y-0 ${from === 'right' ? 'right-0' : 'left-0'} w-full md:w-2/3 lg:w-1/2 bg-gray-900/95 shadow-2xl`}
          initial={{ opacity: 0, x: from === 'right' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: from === 'right' ? 100 : -100 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <FaTimes className="text-gray-400 hover:text-white" />
          </button>
          <div className="h-full overflow-auto py-16 px-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfessionalContent = () => (
  <div className="space-y-8">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
    >
      Tech Arsenal
    </motion.h2>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
        <FaCode className="text-2xl text-blue-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Architecture & Patterns</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• Clean Architecture & SOLID Principles</li>
          <li>• Event-Driven & Microservices</li>
          <li>• Domain-Driven Design</li>
          <li>• Test-Driven Development</li>
        </ul>
      </div>
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
        <FaBookReader className="text-2xl text-green-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Learning Resources</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• Clean Code by Robert C. Martin</li>
          <li>• Design Patterns by GoF</li>
          <li>• Pragmatic Programmer</li>
          <li>• System Design Interview</li>
        </ul>
      </div>
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
        <RiTerminalBoxFill className="text-2xl text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Tech Stack Deep Dives</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• React & Next.js Ecosystem</li>
          <li>• Node.js & Express</li>
          <li>• MongoDB & PostgreSQL</li>
          <li>• AWS & Cloud Architecture</li>
        </ul>
      </div>
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
        <RiTestTubeFill className="text-2xl text-yellow-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Project Showcase</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• E-commerce Platform</li>
          <li>• Real-time Chat Application</li>
          <li>• AI-powered Analytics Dashboard</li>
          <li>• Mobile-first Social Platform</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
        <FaTools className="text-2xl text-red-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Development Tools</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• VS Code & JetBrains Suite</li>
          <li>• Docker & Kubernetes</li>
          <li>• Git & GitHub Actions</li>
          <li>• Postman & Insomnia</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
        <FaLightbulb className="text-2xl text-orange-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Learning Path</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• System Design & Architecture</li>
          <li>• Cloud Native Development</li>
          <li>• AI & Machine Learning</li>
          <li>• Web3 & Blockchain</li>
        </ul>
      </div>
    </motion.div>
  </div>
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

const FloatingPortals = () => {
  const [professionalOpen, setProfessionalOpen] = useState(false);
  const [personalOpen, setPersonalOpen] = useState(false);

  const handleProfessionalClick = () => {
    if (personalOpen) {
      setPersonalOpen(false);
    }
    setProfessionalOpen(!professionalOpen);
  };

  const handlePersonalClick = () => {
    if (professionalOpen) {
      setProfessionalOpen(false);
    }
    setPersonalOpen(!personalOpen);
  };

  return (
    <>
      <FloatingButton
        icon={FaBriefcase}
        onClick={handleProfessionalClick}
        position="bottom-8 right-24"
        color="bg-gradient-to-r from-blue-500 to-cyan-500"
        pulseColor="#3b82f6"
        isActive={professionalOpen}
      />
      
      <FloatingButton
        icon={FaUser}
        onClick={handlePersonalClick}
        position="bottom-8 right-8"
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        pulseColor="#8b5cf6"
        isActive={personalOpen}
      />

      <PortalOverlay 
        isOpen={professionalOpen} 
        onClose={() => setProfessionalOpen(false)}
        from="right"
      >
        <ProfessionalContent />
      </PortalOverlay>

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