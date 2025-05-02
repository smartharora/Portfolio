import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';
import { FaDownload } from 'react-icons/fa';

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

const downloadButton = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section id="hero" ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1 
          variants={item}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Hello, I'm <span className="text-white">Smarth Arora</span>
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          Full-Stack Developer & Platform Engineer with{' '}
          <span className="text-blue-400 font-semibold">7+ years</span> crafting scalable, high-performance systems.
        </motion.p>

        <motion.div 
          variants={item}
          className="text-xl md:text-2xl mb-12 h-12 text-blue-400"
        >
          <Typewriter
            words={[
              'I build real-time IoT back-ends',
              'I automate CI/CD pipelines',
              'I experiment with modern frontend',
              'I optimize database performance',
              'I design microservices architecture'
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.a>
          
          <motion.a
            href="/resume/SmarthArora-Resume.pdf"
            download
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            variants={downloadButton}
            whileHover="hover"
            whileTap="tap"
          >
            <FaDownload />
            Download Resume
          </motion.a>
        </motion.div>

        <motion.div 
          variants={item}
          className="mt-12 text-gray-400 text-sm"
        >
          Scroll down to explore more
        </motion.div>
      </motion.div>
    </section>
  );
}
