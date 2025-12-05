import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const SkillNodeTooltip = ({ node, containerRef }) => {
  const isMobile = window.innerWidth < 768;

  // Calculate smart position to avoid edges
  const position = useMemo(() => {
    if (!node || !containerRef?.current) {
      return { x: 0, y: 0, placement: 'right' };
    }

    const container = containerRef.current.getBoundingClientRect();
    const tooltipWidth = 280;
    const tooltipHeight = 200;
    const padding = 20;
    const nodeOffset = node.radius + 15;

    let x = node.x + nodeOffset;
    let y = node.y - tooltipHeight / 2;
    let placement = 'right';

    // Check if tooltip would overflow right
    if (node.x + nodeOffset + tooltipWidth + padding > container.width) {
      x = node.x - nodeOffset - tooltipWidth;
      placement = 'left';
    }

    // Check if tooltip would overflow left
    if (x < padding) {
      x = padding;
    }

    // Check vertical bounds
    if (y < padding) {
      y = padding;
    }
    if (y + tooltipHeight > container.height - padding) {
      y = container.height - tooltipHeight - padding;
    }

    return { x, y, placement };
  }, [node, containerRef]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-500" />);
      }
    }
    return stars;
  };

  // Mobile bottom sheet
  if (isMobile && node) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/98 backdrop-blur-lg rounded-t-3xl p-6 shadow-2xl border-t border-gray-700/50"
        >
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4" />

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: node.color + '30' }}
            >
              {node.icon || <span className="text-white font-bold">{node.name[0]}</span>}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{node.name}</h3>
              <span
                className="text-sm px-2 py-0.5 rounded-full"
                style={{ backgroundColor: node.color + '30', color: node.color }}
              >
                {node.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-0.5">{renderStars(node.rating)}</div>
            <span className="text-gray-400 text-sm">{node.experience}</span>
          </div>

          <p className="text-gray-300 mb-3">{node.details}</p>

          {node.projects && (
            <div className="text-sm">
              <span className="text-gray-500">Projects: </span>
              <span className="text-gray-300">{node.projects}</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop floating tooltip
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: position.placement === 'left' ? 10 : -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="absolute z-50 w-72 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-gray-700/50"
          style={{
            left: position.x,
            top: position.y,
            pointerEvents: 'none'
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
              style={{ backgroundColor: node.color + '30' }}
            >
              {node.icon || <span className="text-white font-bold">{node.name[0]}</span>}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{node.name}</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: node.color + '30', color: node.glowColor }}
              >
                {node.category}
              </span>
            </div>
          </div>

          {/* Rating & Experience */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-0.5 text-sm">{renderStars(node.rating)}</div>
            <span className="text-gray-400 text-sm">{node.experience}</span>
          </div>

          {/* Details */}
          <p className="text-gray-300 text-sm mb-2">{node.details}</p>

          {/* Projects */}
          {node.projects && (
            <div className="text-xs pt-2 border-t border-gray-700/50">
              <span className="text-gray-500">Projects: </span>
              <span className="text-gray-400">{node.projects}</span>
            </div>
          )}

          {/* Connections indicator */}
          {node.connects_to?.length > 0 && (
            <div className="text-xs mt-2 text-gray-500">
              Connected to {node.connects_to.length} other skills
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillNodeTooltip;
