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
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaLinkedin />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
