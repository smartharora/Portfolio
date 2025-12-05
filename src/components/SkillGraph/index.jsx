import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SkillGraphCanvas from './SkillGraphCanvas';
import SkillNodeTooltip from './SkillNodeTooltip';
import CategoryLegend from './CategoryLegend';
import { useSkillGraphData } from './hooks/useSkillGraphData';
import { useForceSimulation } from './hooks/useForceSimulation';
import { useParticleSystem } from './hooks/useParticleSystem';

const SkillGraph = ({ onClose: _onClose }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [particles, setParticles] = useState({ ambient: [], traveling: [] });

  // Get graph data
  const { nodes: initialNodes, edges, categories } = useSkillGraphData();

  // Filter nodes by category if one is active
  const filteredNodes = activeCategory
    ? initialNodes.filter(n => n.category === activeCategory)
    : initialNodes;

  // Create a set of filtered node IDs for quick lookup
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

  // Only include edges where BOTH source and target exist in filtered nodes
  const filteredEdges = activeCategory
    ? edges.filter(e => {
        return filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target);
      })
    : edges;

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    // Small delay to ensure container is properly sized
    const timer = setTimeout(() => {
      updateDimensions();
      setIsReady(true);
    }, 100);

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Force simulation
  const { nodes, startDrag, drag, endDrag, reheat } = useForceSimulation(
    filteredNodes,
    filteredEdges,
    dimensions
  );

  // Particle system
  const { getParticles, updateParticles, startAnimation, stopAnimation } = useParticleSystem(
    nodes,
    filteredEdges,
    isReady
  );

  // Animation loop
  useEffect(() => {
    if (!isReady || !nodes.length) return;

    const animate = () => {
      updateParticles(nodes, filteredEdges, 16);
      setParticles(getParticles());
    };

    startAnimation(animate);

    return () => stopAnimation();
  }, [isReady, nodes, filteredEdges, updateParticles, getParticles, startAnimation, stopAnimation]);

  // Reheat simulation when category changes
  useEffect(() => {
    if (isReady) {
      reheat();
    }
  }, [activeCategory, isReady, reheat]);

  // Handlers
  const handleNodeHover = useCallback((node) => {
    setHoveredNode(node);
  }, []);

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(prev => prev?.id === node.id ? null : node);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleCategoryClick = useCallback((category) => {
    setActiveCategory(prev => prev === category ? null : category);
    setSelectedNode(null);
    setHoveredNode(null);
  }, []);

  const handleDragStart = useCallback((nodeId) => {
    startDrag(nodeId);
  }, [startDrag]);

  const handleDrag = useCallback((nodeId, x, y) => {
    drag(nodeId, x, y);
  }, [drag]);

  const handleDragEnd = useCallback((nodeId) => {
    endDrag(nodeId);
  }, [endDrag]);

  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            left: '10%',
            top: '20%'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            right: '10%',
            bottom: '20%'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.12, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-0 right-0 z-50 text-center pointer-events-none"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text">
          Skill Constellation
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          {filteredNodes.length} skills • {filteredEdges.length} connections
        </p>
      </motion.div>

      {/* Main canvas container */}
      <div
        ref={containerRef}
        className="absolute inset-0 pt-24 pb-4"
      >
        {isReady && nodes.length > 0 && (
          <SkillGraphCanvas
            nodes={nodes}
            edges={filteredEdges}
            particles={particles}
            hoveredNode={hoveredNode}
            selectedNode={selectedNode}
            activeCategory={activeCategory}
            onNodeHover={handleNodeHover}
            onNodeClick={handleNodeClick}
            onNodeDragStart={handleDragStart}
            onNodeDrag={handleDrag}
            onNodeDragEnd={handleDragEnd}
            onBackgroundClick={handleBackgroundClick}
          />
        )}

        {/* Loading state */}
        {!isReady && (
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full"
            />
          </div>
        )}
      </div>

      {/* Category Legend */}
      <CategoryLegend
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* Tooltip */}
      <SkillNodeTooltip
        node={hoveredNode || selectedNode}
        containerRef={containerRef}
      />

      {/* Stats footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 right-6 text-xs text-gray-500"
      >
        {activeCategory && (
          <span className="mr-4">
            Showing: <span className="text-gray-300">{activeCategory}</span>
          </span>
        )}
        {(hoveredNode || selectedNode) && (
          <span>
            Focused: <span className="text-gray-300">{(hoveredNode || selectedNode).name}</span>
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default SkillGraph;
