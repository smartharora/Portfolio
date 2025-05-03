import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { skillsData } from '../data/skillsData.jsx';

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalf key="half" className="text-yellow-400" />);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};

const SkillPopup = ({ skill, position }) => {
  // Calculate if popup should appear above or below based on viewport position
  const isBottom = position.y > window.innerHeight / 2;
  const isRight = position.x > window.innerWidth / 2;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: isBottom ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isBottom ? 10 : -10 }}
      style={{
        position: 'fixed',
        top: isBottom ? 'auto' : position.y + 40,
        bottom: isBottom ? window.innerHeight - position.y + 10 : 'auto',
        left: isRight ? 'auto' : position.x,
        right: isRight ? window.innerWidth - position.x - 100 : 'auto',
      }}
      className="z-[100] bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-700/50 w-72"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl text-blue-400">{skill.icon}</span>
        <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
      </div>
      <div className="mb-3">
        <StarRating rating={skill.rating} />
      </div>
      <p className="text-blue-300 text-sm mb-1">Experience: {skill.experience}</p>
      <p className="text-gray-300 text-sm mb-2">{skill.details}</p>
      <p className="text-gray-400 text-sm italic">{skill.projects}</p>
    </motion.div>,
    document.body
  );
};

const SkillTag = ({ skill }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top });
    setShowPopup(true);
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowPopup(false)}
        className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors"
      >
        <span className="text-lg">{skill.icon}</span>
        {skill.name}
      </motion.div>
      <AnimatePresence>
        {showPopup && (
          <SkillPopup skill={skill} position={position} />
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillModel = ({ title, description, skills }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50"
    >
      <h3 className="text-2xl font-bold text-blue-400 mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillTag key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Tech Stack & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsData).map(([title, { description, skills }]) => (
            <SkillModel
              key={title}
              title={title}
              description={description}
              skills={skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
