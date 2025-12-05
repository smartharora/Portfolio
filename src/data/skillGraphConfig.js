// Skill Graph Configuration
// Colors, physics constants, and particle settings

export const CATEGORY_COLORS = {
  "Frontend": { primary: "#3B82F6", glow: "#60A5FA" },           // Blue
  "Backend": { primary: "#10B981", glow: "#34D399" },            // Green
  "DevOps & Cloud": { primary: "#F59E0B", glow: "#FBBF24" },     // Amber
  "Tools & Technologies": { primary: "#8B5CF6", glow: "#A78BFA" }, // Purple
  "AI & ML": { primary: "#EC4899", glow: "#F472B6" }             // Pink
};

export const FORCE_CONFIG = {
  linkDistance: 120,
  linkStrength: 0.4,
  chargeStrength: -400,
  chargeDistanceMax: 350,
  collideRadius: 25,
  collideStrength: 0.8,
  centerStrength: 0.05,
  alphaMin: 0.001,
  alphaDecay: 0.02
};

export const NODE_CONFIG = {
  baseRadius: 28,
  minRadius: 20,
  maxRadius: 40,
  hoverScale: 1.15,
  dimmedOpacity: 0.2,
  labelOffset: 20,
  labelFont: '12px Inter, system-ui, sans-serif',
  labelFontHover: '14px Inter, system-ui, sans-serif'
};

export const CONNECTION_CONFIG = {
  baseOpacity: 0.15,
  hoverOpacity: 0.8,
  lineWidth: 1.5,
  hoverLineWidth: 2.5,
  glowBlur: 15,
  dashPattern: [4, 4]
};

export const PARTICLE_CONFIG = {
  ambient: {
    countPerNode: 4,
    minRadius: 1.5,
    maxRadius: 3,
    minOpacity: 0.3,
    maxOpacity: 0.6,
    orbitRadius: 35,
    speed: 0.015
  },
  traveling: {
    countPerConnection: 2,
    radius: 2.5,
    opacity: 0.9,
    speed: 0.008,
    glowBlur: 8
  }
};

export const MOBILE_CONFIG = {
  breakpoint: 768,
  nodeRadiusScale: 0.7,
  particleCountScale: 0.4,
  initialZoom: 0.65
};

export const ANIMATION_CONFIG = {
  entryDuration: 0.5,
  entryStagger: 0.03,
  connectionDrawDuration: 0.8,
  exitDuration: 0.3
};
