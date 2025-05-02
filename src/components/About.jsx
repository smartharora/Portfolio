import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

const sections = [
  {
    title: "Education & Foundation",
    content: "I hold a Master's in Software Engineering and a Bachelor's in Computer Science. My academic journey laid the foundation for my passion in building scalable systems and solving complex technical challenges."
  },
  {
    title: "Technical Expertise",
    content: "I've architected microservices handling millions of messages per day, optimized deployment workflows to reduce build times by over 50%, and fine-tuned database queries to cut latency in half. I thrive at the intersection of backend architecture and frontend finesse."
  },
  {
    title: "Current Focus",
    content: "Today, I design end-to-end systems that ingest telemetry from hundreds of thousands of devices and deliver sub-second processing performance. My work spans across IoT backends, CI/CD automation, and modern frontend development."
  }
];

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

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{section.title}</h3>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={item}
          className="mt-12 text-center"
        >
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Let's Work Together
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
