import React from 'react';
import { motion } from 'framer-motion';

const CategoryLegend = ({ categories, activeCategory, onCategoryClick }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className={`absolute z-40 ${
        isMobile
          ? 'top-4 left-4 right-4'
          : 'top-6 left-6'
      }`}
    >
      <div className={`bg-gray-900/80 backdrop-blur-md rounded-xl p-3 border border-gray-700/50 ${
        isMobile ? 'flex flex-wrap gap-2' : 'space-y-2'
      }`}>
        {/* All button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryClick(null)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
            isMobile ? 'text-sm' : 'w-full text-left'
          } ${
            !activeCategory
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-pink-500" />
          <span className="font-medium">All</span>
          <span className="text-xs text-gray-500 ml-auto">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </motion.button>

        {/* Category buttons */}
        {categories.map((category) => (
          <motion.button
            key={category.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryClick(category.name)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              isMobile ? 'text-sm' : 'w-full text-left'
            } ${
              activeCategory === category.name
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="font-medium truncate">{category.name}</span>
            <span className="text-xs text-gray-500 ml-auto">{category.count}</span>
          </motion.button>
        ))}
      </div>

      {/* Instructions - desktop only */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-3 text-xs text-gray-500 space-y-1"
        >
          <p>Hover nodes to explore connections</p>
          <p>Drag nodes to rearrange</p>
          <p>Click category to filter</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryLegend;
