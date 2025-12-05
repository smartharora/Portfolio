import { useMemo } from 'react';
import skillsJson from '../../../data/skills.json';
import { skillsData } from '../../../data/skillsData';
import { CATEGORY_COLORS, NODE_CONFIG } from '../../../data/skillGraphConfig';

// Normalize skill name to create consistent IDs
const normalizeId = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

// Map category names between different data sources
const CATEGORY_MAP = {
  "DevOps & Cloud": "Cloud & DevOps",
  "Cloud & DevOps": "DevOps & Cloud"
};

// Get icon from skillsData by matching name
const getIconForSkill = (skillName, category) => {
  // Try direct category match first
  const categoryData = skillsData[category] || skillsData[CATEGORY_MAP[category]];
  if (categoryData) {
    const skill = categoryData.skills.find(s => s.name === skillName);
    if (skill) return skill.icon;
  }

  // Search all categories
  for (const cat of Object.values(skillsData)) {
    const skill = cat.skills.find(s => s.name === skillName);
    if (skill) return skill.icon;
  }

  return null;
};

export const useSkillGraphData = () => {
  return useMemo(() => {
    const nodes = [];
    const edges = [];
    const nodeMap = new Map(); // For quick lookup when building edges

    // Build nodes from skills.json (has full data + connects_to)
    Object.entries(skillsJson).forEach(([category, categoryData]) => {
      const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS["Tools & Technologies"];

      categoryData.skills.forEach((skill) => {
        const id = normalizeId(skill.name);
        const icon = getIconForSkill(skill.name, category);

        // Calculate radius based on rating (1-5 scale)
        const ratingNormalized = (skill.rating - 1) / 4; // 0 to 1
        const radius = NODE_CONFIG.minRadius +
          ratingNormalized * (NODE_CONFIG.maxRadius - NODE_CONFIG.minRadius);

        const node = {
          id,
          name: skill.name,
          category,
          color: colors.primary,
          glowColor: colors.glow,
          rating: skill.rating,
          experience: skill.experience,
          details: skill.details,
          description: skill.description,
          projects: skill.projects,
          connects_to: skill.connects_to || [],
          icon,
          radius,
          // Position will be set by force simulation
          x: 0,
          y: 0
        };

        nodes.push(node);
        nodeMap.set(id, node);
        nodeMap.set(skill.name.toLowerCase(), node); // Also map by lowercase name
      });
    });

    // Build edges from connects_to relationships
    const edgeSet = new Set(); // Prevent duplicate edges

    nodes.forEach((node) => {
      node.connects_to.forEach((targetName) => {
        const targetId = normalizeId(targetName);
        const targetNode = nodeMap.get(targetId) || nodeMap.get(targetName.toLowerCase());

        if (targetNode) {
          // Create consistent edge key (alphabetically sorted to avoid duplicates)
          const edgeKey = [node.id, targetNode.id].sort().join('-');

          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            edges.push({
              id: edgeKey,
              source: node.id,
              target: targetNode.id,
              sourceNode: node,
              targetNode: targetNode
            });
          }
        }
      });
    });

    // Get unique categories for legend
    const categories = [...new Set(nodes.map(n => n.category))].map(cat => ({
      name: cat,
      color: CATEGORY_COLORS[cat]?.primary || "#8B5CF6",
      count: nodes.filter(n => n.category === cat).length
    }));

    return { nodes, edges, categories, nodeMap };
  }, []);
};

export default useSkillGraphData;
