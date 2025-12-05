import React, { useRef, useEffect, useCallback, useState } from 'react';
import { NODE_CONFIG, CONNECTION_CONFIG, PARTICLE_CONFIG } from '../../data/skillGraphConfig';

const SkillGraphCanvas = ({
  nodes,
  edges,
  particles,
  hoveredNode,
  selectedNode,
  activeCategory,
  onNodeHover,
  onNodeClick,
  onNodeDragStart,
  onNodeDrag,
  onNodeDragEnd,
  onBackgroundClick
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isDraggingRef = useRef(false);
  const dragNodeRef = useRef(null);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Find node at position
  const findNodeAtPosition = useCallback((x, y) => {
    // Check in reverse order (top nodes first)
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      const dx = x - node.x;
      const dy = y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= node.radius * NODE_CONFIG.hoverScale) {
        return node;
      }
    }
    return null;
  }, [nodes]);

  // Get canvas coordinates from event
  const getCanvasCoords = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }, []);

  // Mouse/Touch handlers
  const handleMouseMove = useCallback((e) => {
    const coords = getCanvasCoords(e);

    if (isDraggingRef.current && dragNodeRef.current) {
      onNodeDrag?.(dragNodeRef.current.id, coords.x, coords.y);
      return;
    }

    const node = findNodeAtPosition(coords.x, coords.y);
    onNodeHover?.(node);
  }, [getCanvasCoords, findNodeAtPosition, onNodeHover, onNodeDrag]);

  const handleMouseDown = useCallback((e) => {
    const coords = getCanvasCoords(e);
    const node = findNodeAtPosition(coords.x, coords.y);

    if (node) {
      isDraggingRef.current = true;
      dragNodeRef.current = node;
      onNodeDragStart?.(node.id);
    }
  }, [getCanvasCoords, findNodeAtPosition, onNodeDragStart]);

  const handleMouseUp = useCallback((e) => {
    const coords = getCanvasCoords(e);

    if (isDraggingRef.current && dragNodeRef.current) {
      onNodeDragEnd?.(dragNodeRef.current.id);
    } else {
      const node = findNodeAtPosition(coords.x, coords.y);
      if (node) {
        onNodeClick?.(node);
      } else {
        onBackgroundClick?.();
      }
    }

    isDraggingRef.current = false;
    dragNodeRef.current = null;
  }, [getCanvasCoords, findNodeAtPosition, onNodeClick, onNodeDragEnd, onBackgroundClick]);

  const handleMouseLeave = useCallback(() => {
    if (!isDraggingRef.current) {
      onNodeHover?.(null);
    }
  }, [onNodeHover]);

  // Check if node should be highlighted
  const isNodeHighlighted = useCallback((node) => {
    if (activeCategory && node.category !== activeCategory) return false;
    if (!hoveredNode && !selectedNode) return true;

    const focusNode = hoveredNode || selectedNode;
    if (node.id === focusNode.id) return true;

    // Check if connected
    return edges.some(edge => {
      const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
      const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
      return (sourceId === focusNode.id && targetId === node.id) ||
             (targetId === focusNode.id && sourceId === node.id);
    });
  }, [hoveredNode, selectedNode, activeCategory, edges]);

  // Check if edge should be highlighted
  const isEdgeHighlighted = useCallback((edge) => {
    const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
    const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;

    if (activeCategory) {
      const sourceNode = nodes.find(n => n.id === sourceId);
      const targetNode = nodes.find(n => n.id === targetId);
      if (sourceNode?.category !== activeCategory && targetNode?.category !== activeCategory) {
        return false;
      }
    }

    if (!hoveredNode && !selectedNode) return false;

    const focusNode = hoveredNode || selectedNode;
    return sourceId === focusNode.id || targetId === focusNode.id;
  }, [hoveredNode, selectedNode, activeCategory, nodes]);

  // Draw functions
  const drawConnection = useCallback((ctx, edge, isHighlighted) => {
    const sourceNode = nodes.find(n => n.id === (typeof edge.source === 'object' ? edge.source.id : edge.source));
    const targetNode = nodes.find(n => n.id === (typeof edge.target === 'object' ? edge.target.id : edge.target));

    if (!sourceNode || !targetNode) return;

    const gradient = ctx.createLinearGradient(
      sourceNode.x, sourceNode.y,
      targetNode.x, targetNode.y
    );
    gradient.addColorStop(0, sourceNode.color);
    gradient.addColorStop(1, targetNode.color);

    ctx.save();

    if (isHighlighted) {
      ctx.shadowColor = sourceNode.glowColor;
      ctx.shadowBlur = CONNECTION_CONFIG.glowBlur;
      ctx.globalAlpha = CONNECTION_CONFIG.hoverOpacity;
      ctx.lineWidth = CONNECTION_CONFIG.hoverLineWidth;
    } else {
      ctx.globalAlpha = CONNECTION_CONFIG.baseOpacity;
      ctx.lineWidth = CONNECTION_CONFIG.lineWidth;
      ctx.setLineDash(CONNECTION_CONFIG.dashPattern);
    }

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    ctx.stroke();

    ctx.restore();
  }, [nodes]);

  const drawNode = useCallback((ctx, node, isHovered, isSelected, isDimmed) => {
    const scale = isHovered || isSelected ? NODE_CONFIG.hoverScale : 1;
    const radius = node.radius * scale;

    ctx.save();

    if (isDimmed) {
      ctx.globalAlpha = NODE_CONFIG.dimmedOpacity;
    }

    // Glow effect
    if (isHovered || isSelected) {
      ctx.shadowColor = node.glowColor;
      ctx.shadowBlur = 25;
    }

    // Node circle with gradient
    const gradient = ctx.createRadialGradient(
      node.x - radius * 0.3, node.y - radius * 0.3, 0,
      node.x, node.y, radius
    );
    gradient.addColorStop(0, node.glowColor);
    gradient.addColorStop(0.7, node.color);
    gradient.addColorStop(1, adjustColor(node.color, -40));

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner highlight
    ctx.beginPath();
    ctx.arc(node.x - radius * 0.2, node.y - radius * 0.2, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();

    ctx.restore();

    // Label
    ctx.save();
    ctx.fillStyle = isDimmed ? 'rgba(255, 255, 255, 0.3)' : '#ffffff';
    ctx.font = isHovered || isSelected ? NODE_CONFIG.labelFontHover : NODE_CONFIG.labelFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Text shadow for readability
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;

    ctx.fillText(node.name, node.x, node.y + radius + 8);
    ctx.restore();
  }, []);

  const drawParticle = useCallback((ctx, particle, type) => {
    if (particle.x === undefined || particle.y === undefined) return;

    ctx.save();
    ctx.globalAlpha = particle.opacity;

    if (type === 'traveling') {
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = PARTICLE_CONFIG.traveling.glowBlur;
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();

    ctx.restore();
  }, []);

  // Main render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with device pixel ratio
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw connections (behind nodes)
    edges.forEach(edge => {
      const highlighted = isEdgeHighlighted(edge);
      drawConnection(ctx, edge, highlighted);
    });

    // Draw traveling particles on highlighted edges
    if (particles?.traveling) {
      particles.traveling.forEach(particle => {
        const edge = edges.find(e => e.id === particle.edgeId);
        if (edge && isEdgeHighlighted(edge)) {
          drawParticle(ctx, particle, 'traveling');
        }
      });
    }

    // Draw ambient particles
    if (particles?.ambient) {
      particles.ambient.forEach(particle => {
        const node = nodes.find(n => n.id === particle.nodeId);
        if (node && isNodeHighlighted(node)) {
          drawParticle(ctx, particle, 'ambient');
        }
      });
    }

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const isDimmed = !isNodeHighlighted(node);
      drawNode(ctx, node, isHovered, isSelected, isDimmed);
    });

  }, [nodes, edges, particles, hoveredNode, selectedNode, dimensions, drawConnection, drawNode, drawParticle, isNodeHighlighted, isEdgeHighlighted]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
    </div>
  );
};

// Helper: Adjust color brightness
function adjustColor(color, amount) {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

export default SkillGraphCanvas;
