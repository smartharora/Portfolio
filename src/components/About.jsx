import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaGraduationCap, FaRocket, FaGamepad, FaPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const hoverEffect = {
  scale: 1.02,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

const sections = [
  {
    title: "Education & Foundation",
    icon: <FaGraduationCap className="text-3xl mb-4" />,
    content: "I hold a Master's in Software Engineering and a Bachelor's in Computer Science. My academic journey laid the foundation for my passion in building scalable systems and solving complex technical challenges.",
    achievements: [
      "Graduated with First Class Honors",
      "Published research on cloud computing optimization",
      "Led technical workshops and coding competitions"
    ]
  },
  {
    title: "Technical Expertise",
    icon: <FaCode className="text-3xl mb-4" />,
    content: "I've architected microservices handling millions of messages per day, optimized deployment workflows to reduce build times by over 50%, and fine-tuned database queries to cut latency in half. I thrive at the intersection of backend architecture and frontend finesse.",
    achievements: [
      "Reduced system latency by 50% through optimization",
      "Implemented scalable microservices architecture",
      "Achieved 99.99% system uptime"
    ]
  },
  {
    title: "Current Focus",
    icon: <FaRocket className="text-3xl mb-4" />,
    content: "Today, I design end-to-end systems that ingest telemetry from hundreds of thousands of devices and deliver sub-second processing performance. My work spans across IoT backends, CI/CD automation, and modern frontend development.",
    achievements: [
      "Leading IoT platform development",
      "Implementing real-time analytics",
      "Building scalable cloud infrastructure"
    ]
  },
  {
    title: "Beyond Code",
    icon: <FaGamepad className="text-3xl mb-4" />,
    content: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or solving problems on LeetCode. I'm also passionate about music production and traveling.",
    achievements: [
      "Top 5% on LeetCode",
      "Active open-source contributor",
      "Avid traveler and photographer"
    ]
  }
];

const EasterEgg = () => {
  const [showEgg, setShowEgg] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
    if (count >= 2) {
      setShowEgg(true);
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
      >
        Let's Work Together
      </motion.button>

      <AnimatePresence>
        {showEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-500"
          >
            <div className="flex items-center gap-2">
              <FaPlane className="text-blue-400 animate-bounce" />
              <span className="text-white">Great! I wanna work with you too! 🚀✨ Let's connect! 🎯</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-gray-800 text-white">
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 
          variants={item}
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={hoverEffect}
              className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-colors"
            >
              <div className="text-blue-400">{section.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{section.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">{section.content}</p>
              <ul className="space-y-2">
                {section.achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="text-blue-400">•</span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={item}
          className="mt-12 text-center"
        >
          <EasterEgg />
        </motion.div>
      </motion.div>
    </section>
  );
}
