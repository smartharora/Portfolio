import { useRef, useCallback, useEffect } from 'react';
import { PARTICLE_CONFIG } from '../../../data/skillGraphConfig';

// Create ambient particles for a node
const createAmbientParticles = (node, count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      nodeId: node.id,
      angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
      orbitRadius: PARTICLE_CONFIG.ambient.orbitRadius + (Math.random() - 0.5) * 10,
      radius: PARTICLE_CONFIG.ambient.minRadius +
        Math.random() * (PARTICLE_CONFIG.ambient.maxRadius - PARTICLE_CONFIG.ambient.minRadius),
      opacity: PARTICLE_CONFIG.ambient.minOpacity +
        Math.random() * (PARTICLE_CONFIG.ambient.maxOpacity - PARTICLE_CONFIG.ambient.minOpacity),
      speed: PARTICLE_CONFIG.ambient.speed * (0.8 + Math.random() * 0.4),
      color: node.glowColor
    });
  }
  return particles;
};

// Create traveling particles for an edge
const createTravelingParticles = (edge, count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      edgeId: edge.id,
      progress: i / count, // Spread particles evenly along the edge
      speed: PARTICLE_CONFIG.traveling.speed * (0.8 + Math.random() * 0.4),
      radius: PARTICLE_CONFIG.traveling.radius,
      opacity: PARTICLE_CONFIG.traveling.opacity,
      color: edge.sourceNode.glowColor,
      direction: Math.random() > 0.5 ? 1 : -1 // Some travel in reverse
    });
  }
  return particles;
};

export const useParticleSystem = (nodes, edges, isActive) => {
  const ambientParticlesRef = useRef([]);
  const travelingParticlesRef = useRef([]);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Initialize particles when nodes/edges change
  useEffect(() => {
    if (!nodes.length) return;

    // Create ambient particles for each node
    const isMobile = window.innerWidth < 768;
    const ambientCount = isMobile
      ? Math.ceil(PARTICLE_CONFIG.ambient.countPerNode * 0.4)
      : PARTICLE_CONFIG.ambient.countPerNode;

    ambientParticlesRef.current = nodes.flatMap(node =>
      createAmbientParticles(node, ambientCount)
    );

    // Create traveling particles for each edge
    const travelingCount = isMobile
      ? 1
      : PARTICLE_CONFIG.traveling.countPerConnection;

    travelingParticlesRef.current = edges.flatMap(edge =>
      createTravelingParticles(edge, travelingCount)
    );
  }, [nodes, edges]);

  // Update particle positions
  const updateParticles = useCallback((nodes, edges, deltaTime) => {
    // Update ambient particles (orbit around nodes)
    ambientParticlesRef.current.forEach(particle => {
      const node = nodes.find(n => n.id === particle.nodeId);
      if (node) {
        particle.angle += particle.speed * deltaTime * 0.06;
        particle.x = node.x + Math.cos(particle.angle) * particle.orbitRadius;
        particle.y = node.y + Math.sin(particle.angle) * particle.orbitRadius;
      }
    });

    // Update traveling particles (move along edges)
    travelingParticlesRef.current.forEach(particle => {
      const edge = edges.find(e => e.id === particle.edgeId);
      if (edge) {
        const sourceNode = nodes.find(n => n.id === (typeof edge.source === 'object' ? edge.source.id : edge.source));
        const targetNode = nodes.find(n => n.id === (typeof edge.target === 'object' ? edge.target.id : edge.target));

        if (sourceNode && targetNode) {
          // Update progress
          particle.progress += particle.speed * particle.direction * deltaTime * 0.06;

          // Loop back when reaching ends
          if (particle.progress > 1) particle.progress = 0;
          if (particle.progress < 0) particle.progress = 1;

          // Calculate position along edge
          particle.x = sourceNode.x + (targetNode.x - sourceNode.x) * particle.progress;
          particle.y = sourceNode.y + (targetNode.y - sourceNode.y) * particle.progress;
        }
      }
    });
  }, []);

  // Get current particles with positions
  const getParticles = useCallback(() => ({
    ambient: ambientParticlesRef.current,
    traveling: travelingParticlesRef.current
  }), []);

  // Animation loop control
  const startAnimation = useCallback((renderCallback) => {
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (deltaTime < 100) { // Skip if tab was inactive
        renderCallback(deltaTime);
      }

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  }, [isActive]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  // Handle visibility change (pause when tab not visible)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [stopAnimation]);

  return {
    getParticles,
    updateParticles,
    startAnimation,
    stopAnimation
  };
};

export default useParticleSystem;
