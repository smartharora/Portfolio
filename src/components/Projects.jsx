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

const projects = [
  {
    title: "Distributed E-commerce Platform",
    description: "A scalable microservices-based e-commerce platform built on AWS, handling thousands of concurrent users and transactions.",
    technologies: ["AWS", "Docker", "Kubernetes", "Node.js", "React"],
    image: "/project1.jpg"
  },
  {
    title: "AI Recipe Recommender",
    description: "An intelligent recipe recommendation system using natural language processing and machine learning to suggest personalized recipes.",
    technologies: ["Python", "TensorFlow", "React", "MongoDB"],
    image: "/project2.jpg"
  },
  {
    title: "IoT Device Management",
    description: "A real-time IoT device management system processing telemetry data from thousands of connected devices.",
    technologies: ["Python", "MQTT", "Redis", "React"],
    image: "/project3.jpg"
  }
];

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section id="projects" ref={ref} className="py-20 px-4 bg-gray-900 text-white">
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
          Selected Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="h-48 bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
            View More Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
} 