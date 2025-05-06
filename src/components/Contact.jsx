import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { resume } from '../data/resume';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { phone, email, linkedin, github } = resume.hero.contact;
  
  return (
    <section id="contact" ref={ref} className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">Get In Touch</h2>
        <p className="mb-4"><FaPhone className="inline mr-2" />{phone}</p>
        <p className="mb-4">
          <FaEnvelope className="inline mr-2" />
          <a href={`mailto:${email}`} className="underline">{email}</a>
        </p>
        <div className="flex justify-center space-x-6 text-2xl">
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-500 flex items-center gap-3 group"
          >
            <div className="relative flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-blue-400 transition-colors">
                <img 
                  src="/images/profile.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <FaLinkedin className="text-2xl transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium">
              Let's Connect
            </span>
          </a>
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-400 flex items-center gap-2 group"
          >
            <FaGithub className="text-3xl transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium">
              See my portfolio code
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
