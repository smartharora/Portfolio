import { useEffect, useRef, useState, useCallback } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY
} from 'd3-force';
import { FORCE_CONFIG } from '../../../data/skillGraphConfig';

export const useForceSimulation = (initialNodes, edges, dimensions) => {
  const [nodes, setNodes] = useState([]);
  const simulationRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousPositionsRef = useRef(new Map());

  // Initialize simulation
  useEffect(() => {
    if (!initialNodes.length || !dimensions.width || !dimensions.height) return;

    // Stop any existing simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // Save current positions before creating new simulation
    if (nodes.length > 0) {
      nodes.forEach(node => {
        if (node.x !== undefined && node.y !== undefined) {
          previousPositionsRef.current.set(node.id, { x: node.x, y: node.y });
        }
      });
    }

    // Deep clone nodes, preserving positions if they exist
    const nodesCopy = initialNodes.map(node => {
      const prevPos = previousPositionsRef.current.get(node.id);
      if (prevPos) {
        // Use previous position if available
        return {
          ...node,
          x: prevPos.x,
          y: prevPos.y
        };
      } else {
        // Spread new nodes around the center (not all at center)
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        return {
          ...node,
          x: dimensions.width / 2 + Math.cos(angle) * distance,
          y: dimensions.height / 2 + Math.sin(angle) * distance
        };
      }
    });

    // Create edges with node references
    const edgesCopy = edges.map(edge => ({
      ...edge,
      source: edge.source,
      target: edge.target
    }));

    // Create simulation with gentler initial settings
    const simulation = forceSimulation(nodesCopy)
      .force('link', forceLink(edgesCopy)
        .id(d => d.id)
        .distance(FORCE_CONFIG.linkDistance)
        .strength(FORCE_CONFIG.linkStrength)
      )
      .force('charge', forceManyBody()
        .strength(FORCE_CONFIG.chargeStrength)
        .distanceMax(FORCE_CONFIG.chargeDistanceMax)
      )
      .force('center', forceCenter(dimensions.width / 2, dimensions.height / 2)
        .strength(FORCE_CONFIG.centerStrength)
      )
      .force('collide', forceCollide()
        .radius(d => d.radius + FORCE_CONFIG.collideRadius)
        .strength(FORCE_CONFIG.collideStrength)
      )
      .force('x', forceX(dimensions.width / 2).strength(0.02))
      .force('y', forceY(dimensions.height / 2).strength(0.02))
      .alphaMin(FORCE_CONFIG.alphaMin)
      .alphaDecay(FORCE_CONFIG.alphaDecay)
      .velocityDecay(0.4) // Add velocity decay to reduce jittering
      .on('tick', () => {
        // Keep nodes within bounds
        nodesCopy.forEach(node => {
          const padding = node.radius + 20;
          node.x = Math.max(padding, Math.min(dimensions.width - padding, node.x));
          node.y = Math.max(padding, Math.min(dimensions.height - padding, node.y));
        });
        setNodes([...nodesCopy]);
      });

    // Start with lower alpha if we have previous positions (smoother transition)
    const hasExistingPositions = initialNodes.some(n => previousPositionsRef.current.has(n.id));
    if (hasExistingPositions) {
      simulation.alpha(0.3); // Gentler restart
    }

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNodes, edges, dimensions.width, dimensions.height]);

  // Drag handlers
  const startDrag = useCallback((nodeId) => {
    if (!simulationRef.current) return;

    isDraggingRef.current = true;
    simulationRef.current.alphaTarget(0.3).restart();

    const node = simulationRef.current.nodes().find(n => n.id === nodeId);
    if (node) {
      node.fx = node.x;
      node.fy = node.y;
    }
  }, []);

  const drag = useCallback((nodeId, x, y) => {
    if (!simulationRef.current || !isDraggingRef.current) return;

    const node = simulationRef.current.nodes().find(n => n.id === nodeId);
    if (node) {
      node.fx = x;
      node.fy = y;
    }
  }, []);

  const endDrag = useCallback((nodeId) => {
    if (!simulationRef.current) return;

    isDraggingRef.current = false;
    simulationRef.current.alphaTarget(0);

    const node = simulationRef.current.nodes().find(n => n.id === nodeId);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
  }, []);

  // Reheat simulation (useful after category filter changes)
  const reheat = useCallback(() => {
    if (simulationRef.current) {
      simulationRef.current.alpha(0.2).restart(); // Gentler reheat
    }
  }, []);

  return {
    nodes,
    startDrag,
    drag,
    endDrag,
    reheat
  };
};

export default useForceSimulation;
