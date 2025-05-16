import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaUser, FaTimes, FaCode, FaBook, FaSpotify, FaGamepad, FaGithub, FaHome, FaStream, FaEnvelope } from 'react-icons/fa';
import { RiRocketLine, RiTerminalBoxFill, RiTestTubeFill } from 'react-icons/ri';
import MediaSection from './MediaSection';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, SoftShadows } from '@react-three/drei';

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

const professionalSections = [
  {
    title: 'Architecture & Patterns',
    icon: <FaCode className="text-2xl text-blue-400 mb-4" />,
    items: [
      'Clean Architecture & SOLID Principles',
      'Event-Driven & Microservices',
      'Domain-Driven Design',
      'Test-Driven Development',
    ],
  },
  {
    title: 'Learning Resources',
    icon: <FaBook className="text-2xl text-green-400 mb-4" />,
    items: [
      'Clean Code by Robert C. Martin',
      'Design Patterns by GoF',
      'Pragmatic Programmer',
      'System Design Interview',
    ],
  },
  {
    title: 'Tech Stack Deep Dives',
    icon: <RiTerminalBoxFill className="text-2xl text-purple-400 mb-4" />,
    items: [
      'React & Next.js Ecosystem',
      'Node.js & Express',
      'MongoDB & PostgreSQL',
      'AWS & Cloud Architecture',
    ],
  },
  {
    title: 'Project Showcase',
    icon: <RiTestTubeFill className="text-2xl text-yellow-400 mb-4" />,
    items: [
      'E-commerce Platform',
      'Real-time Chat Application',
      'AI-powered Analytics Dashboard',
      'Mobile-first Social Platform',
    ],
  },
  {
    title: 'Development Tools',
    icon: <FaGithub className="text-2xl text-red-400 mb-4" />,
    items: [
      'VS Code & JetBrains Suite',
      'Docker & Kubernetes',
      'Git & GitHub Actions',
      'Postman & Insomnia',
    ],
  },
  {
    title: 'Learning Path',
    icon: <FaGithub className="text-2xl text-orange-400 mb-4" />,
    items: [
      'System Design & Architecture',
      'Cloud Native Development',
      'AI & Machine Learning',
      'Web3 & Blockchain',
    ],
  },
];

const TechArsenal3D = () => (
  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <SoftShadows />
      <TorusKnot
        args={[1.5, 0.5, 128, 32]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.18}
        />
      </TorusKnot>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
    </Canvas>
  </div>
);

const featuredProjects = [
  {
    title: 'AI Code Assistant',
    description: 'AI-powered code review and suggestions for developers.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    tags: ['AI', 'OpenAI', 'FastAPI', 'React'],
    github: 'https://github.com/yourusername/ai-assistant',
    demo: 'https://ai-assistant-demo.vercel.app',
  },
  {
    title: 'Smart Home Dashboard',
    description: 'Real-time dashboard for monitoring and controlling smart home devices.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    tags: ['IoT', 'React', 'Node.js', 'MQTT'],
    github: 'https://github.com/yourusername/smart-home',
    demo: 'https://smart-home-demo.vercel.app',
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    logo: 'https://d1.awsstatic.com/training-and-certification/Certification%20Badges/AWS-Certified_Solutions-Architect_Associate_512x512.1b7d5d8c8e.png',
    link: 'https://www.credly.com/badges/aws-solutions-architect',
  },
  {
    name: 'Google Cloud Professional',
    logo: 'https://cloud.google.com/images/certifications/cloud-architect-certificate.png',
    link: 'https://www.credential.net/google-cloud-professional',
  },
];

const blogPosts = [
  {
    title: 'Scaling Microservices: Lessons Learned',
    link: 'https://dev.to/yourusername/scaling-microservices-lessons-learned-1234',
    date: '2024-04-10',
  },
  {
    title: 'Optimizing React Apps for Performance',
    link: 'https://yourblog.com/react-performance',
    date: '2024-03-22',
  },
];

const openSource = [
  {
    name: 'OpenAPI Generator',
    description: 'Generate REST API clients in any language.',
    github: 'https://github.com/OpenAPITools/openapi-generator',
    stars: 17000,
  },
  {
    name: 'Awesome IoT',
    description: 'Curated list of awesome IoT frameworks and tools.',
    github: 'https://github.com/yourusername/awesome-iot',
    stars: 1200,
  },
];

const talks = [
  {
    title: 'Modern DevOps in the Cloud',
    video: 'https://www.youtube.com/embed/9No-FiEInLA',
    event: 'CloudConf 2024',
  },
  {
    title: 'Building Real-Time IoT Systems',
    video: 'https://www.youtube.com/embed/Ke90Tje7VS0',
    event: 'IoT Summit 2023',
  },
];

const ProfessionalContent = () => (
  <div className="relative space-y-16 overflow-hidden min-h-[1200px]">
    <TechArsenal3D />
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text mb-8 text-center relative z-10"
    >
      Tech Arsenal
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      {professionalSections.map((section, idx) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.7, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/70 to-gray-800/80 rounded-2xl p-8 border border-gray-700/60 shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
        >
          <div className="flex items-center gap-4 mb-4">
            {section.icon}
            <h3 className="text-2xl font-semibold text-blue-300 group-hover:text-cyan-400 transition-colors">{section.title}</h3>
          </div>
          <ul className="text-gray-300 space-y-3 pl-2">
            {section.items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-base"
              >
                <span className="text-blue-400">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <h3 className="text-2xl font-bold text-pink-400 mb-6">Featured Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((proj) => (
          <motion.div
            key={proj.title}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #a78bfa55' }}
            className="bg-gray-900/80 rounded-2xl p-6 border border-purple-700/40 shadow-lg flex flex-col gap-4 group"
          >
            <img src={proj.image} alt={proj.title} className="rounded-xl w-full h-40 object-cover mb-3 border border-gray-700/40" />
            <h4 className="text-xl font-semibold text-purple-300 mb-1">{proj.title}</h4>
            <p className="text-gray-300 mb-2">{proj.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {proj.tags.map((tag) => (
                <span key={tag} className="bg-purple-700/30 text-purple-200 px-2 py-1 rounded text-xs">{tag}</span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">GitHub</a>
              <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white underline">Live Demo</a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">Certifications & Badges</h3>
      <div className="flex flex-wrap gap-6">
        {certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-800/80 rounded-xl p-4 border border-yellow-600/30 shadow hover:scale-105 transition-transform"
          >
            <img src={cert.logo} alt={cert.name} className="w-12 h-12 object-contain rounded" />
            <span className="text-yellow-200 font-semibold">{cert.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <h3 className="text-2xl font-bold text-green-400 mb-6">Tech Blog Highlights</h3>
      <div className="flex flex-col gap-4">
        {blogPosts.map((post) => (
          <a
            key={post.title}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/80 rounded-lg p-4 border border-green-600/30 shadow hover:scale-[1.02] transition-transform flex flex-col md:flex-row md:items-center gap-2"
          >
            <span className="text-green-300 font-medium">{post.title}</span>
            <span className="text-xs text-gray-400 ml-auto">{post.date}</span>
          </a>
        ))}
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <h3 className="text-2xl font-bold text-blue-400 mb-6">Open Source Contributions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {openSource.map((repo) => (
          <a
            key={repo.name}
            href={repo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/80 rounded-xl p-5 border border-blue-600/30 shadow hover:scale-105 transition-transform flex flex-col gap-2"
          >
            <span className="text-blue-300 font-semibold text-lg">{repo.name}</span>
            <span className="text-gray-300 text-sm">{repo.description}</span>
            <span className="text-xs text-blue-200 mt-1">⭐ {repo.stars.toLocaleString()} stars</span>
          </a>
        ))}
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <h3 className="text-2xl font-bold text-cyan-400 mb-6">Recent Talks & Presentations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {talks.map((talk) => (
          <div key={talk.title} className="bg-gray-900/80 rounded-xl p-4 border border-cyan-600/30 shadow flex flex-col gap-2">
            <div className="aspect-w-16 aspect-h-9 w-full mb-2">
              <iframe
                src={talk.video}
                title={talk.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-56 rounded-lg border-none"
              />
            </div>
            <span className="text-cyan-300 font-semibold">{talk.title}</span>
            <span className="text-xs text-gray-400">{talk.event}</span>
          </div>
        ))}
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
      <Sidebar />
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