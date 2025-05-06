import React from 'react';
import {
  FaReact,
  FaNode,
  FaHtml5,
  FaCss3,
  FaDatabase,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaBrain
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiAngular,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiOpenai,
  SiVercel,
  SiSupabase
} from 'react-icons/si';

export const skillsData = {
  "Frontend": {
    description: "Building modern, responsive, and interactive user interfaces",
    skills: [
      {
        name: "React",
        icon: <FaReact />,
        rating: 5,
        experience: "5+ yrs",
        details: "Component-driven UIs that scale",
        projects: "Dashboards, SPAs"
      },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
        rating: 4.5,
        experience: "4+ yrs",
        details: "Type safety for big codebases",
        projects: "All recent frontends"
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
        rating: 4,
        experience: "3+ yrs",
        details: "SSR & SSG magic for React",
        projects: "Production web apps"
      },
      {
        name: "HTML & CSS",
        icon: <><FaHtml5 /><FaCss3 /></>,
        rating: 5,
        experience: "7+ yrs",
        details: "Structure + style for every UI I build",
        projects: "Responsive layouts, Tailwind designs"
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        rating: 5,
        experience: "4+ yrs",
        details: "Utility-first styling on steroids",
        projects: "Consistent design systems"
      },
      {
        name: "Angular",
        icon: <SiAngular />,
        rating: 3,
        experience: "2+ yrs",
        details: "Enterprise-grade frontend framework",
        projects: "Business applications"
      }
    ]
  },

  "Backend": {
    description: "Server-side development, databases, and system architecture",
    skills: [
      {
        name: "Node.js",
        icon: <FaNode />,
        rating: 4.5,
        experience: "5+ yrs",
        details: "Event-driven, non-blocking I/O",
        projects: "Real-time data pipelines"
      },
      {
        name: "MongoDB",
        icon: <SiMongodb />,
        rating: 4,
        experience: "4+ yrs",
        details: "Schema-flexible document store",
        projects: "NoSQL microservices"
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        rating: 4,
        experience: "6+ yrs",
        details: "Complex schemas, advanced queries",
        projects: "Large-scale migrations"
      },
      {
        name: "Prisma",
        icon: <SiPrisma />,
        rating: 4,
        experience: "2+ yrs",
        details: "Next-gen Node.js ORM",
        projects: "Type-safe database access"
      }
    ]
  },

  "AI & ML": {
    description: "Artificial Intelligence and Machine Learning",
    skills: [
      {
        name: "OpenAI API",
        icon: <SiOpenai />,
        rating: 4.5,
        experience: "1+ yr",
        details: "GPT integration for smart applications",
        projects: "AI-powered features"
      },
      {
        name: "LangChain",
        icon: <FaBrain />,
        rating: 4,
        experience: "1+ yr",
        details: "Building LLM-powered applications",
        projects: "AI chatbots and agents"
      },
      {
        name: "Vector DBs",
        icon: <FaDatabase />,
        rating: 3.5,
        experience: "1+ yr",
        details: "Semantic search and embeddings",
        projects: "AI search systems"
      },
      {
        name: "Supabase",
        icon: <SiSupabase />,
        rating: 4,
        experience: "1+ yr",
        details: "Open source Firebase alternative",
        projects: "Real-time databases"
      }
    ]
  },

  "Cloud & DevOps": {
    description: "Cloud infrastructure, containerization, and deployment automation",
    skills: [
      {
        name: "AWS",
        icon: <FaAws />,
        rating: 5,
        experience: "5+ yrs",
        details: "EC2, S3, Lambda, RDS & more",
        projects: "Production infrastructure"
      },
      {
        name: "Docker",
        icon: <FaDocker />,
        rating: 5,
        experience: "5+ yrs",
        details: "Containers for every app",
        projects: "All modern deployments"
      },
      {
        name: "Vercel",
        icon: <SiVercel />,
        rating: 4.5,
        experience: "3+ yrs",
        details: "Zero-config deployments for Next.js",
        projects: "JAMstack applications"
      }
    ]
  },

  "Tools & Technologies": {
    description: "Development tools and essential technologies",
    skills: [
      {
        name: "Git",
        icon: <FaGitAlt />,
        rating: 5,
        experience: "7+ yrs",
        details: "Version control wizardry",
        projects: "Every codebase ever"
      },
      {
        name: "Linux/Unix",
        icon: <FaLinux />,
        rating: 5,
        experience: "7+ yrs",
        details: "My daily driver for dev & prod servers",
        projects: "Docker hosts, Kubernetes nodes"
      }
    ]
  }
};

