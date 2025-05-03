import React from 'react';
import {
  FaAws,
  FaPython,
  FaNode,
  FaReact,
  FaGithub,
  FaHtml5,
  FaCss3,
  FaJs,
  FaJava,
  FaLinux,
  FaDatabase,
  FaTerminal,
  FaDocker,
  FaGitAlt,
  FaServer,
  FaTools,
  FaCloud
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiDjango,
  SiFlask,
  SiSpring,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiRabbitmq,
  SiAnsible,
  SiTerraform,
  SiJenkins,
  SiBitbucket,
  SiGithubactions,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiElasticsearch,
  SiPrometheus,
  SiGrafana,
  SiDatadog,
  SiKibana,
  SiNginx,
  SiFirebase,
  SiGooglecloud,
  SiOkta,
  SiApache,
  SiCelery,
  SiAngular
} from 'react-icons/si';

export const skillsData = {
  "Frontend Development": {
    description: "Building modern, responsive, and interactive user interfaces",
    skills: [
      {
        name: "React",
        icon: <FaReact />,
        rating: 5,
        experience: "5+ yrs",
        details: "Component-driven UIs that scale.",
        projects: "Dashboards, SPAs."
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
        rating: 4,
        experience: "3+ yrs",
        details: "SSR & SSG magic for React.",
        projects: "Production web apps."
      },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
        rating: 4.5,
        experience: "4+ yrs",
        details: "Type safety for big codebases.",
        projects: "All recent frontends."
      },
      {
        name: "JavaScript",
        icon: <FaJs />,
        rating: 5,
        experience: "7+ yrs",
        details: "The lingua franca of modern web dev.",
        projects: "SPAs, Node.js microservices."
      },
      {
        name: "HTML & CSS",
        icon: <><FaHtml5 /><FaCss3 /></>,
        rating: 5,
        experience: "7+ yrs",
        details: "Structure + style for every UI I build.",
        projects: "Responsive layouts, Tailwind designs."
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        rating: 5,
        experience: "4+ yrs",
        details: "Utility-first styling on steroids.",
        projects: "Consistent design systems."
      },
      {
        name: "Angular",
        icon: <SiAngular />,
        rating: 3,
        experience: "2+ yrs",
        details: "Enterprise-grade frontend framework.",
        projects: "Business applications."
      }
    ]
  },

  "Backend & Infrastructure": {
    description: "Server-side development, databases, and system architecture",
    skills: [
      {
        name: "Python",
        icon: <FaPython />,
        rating: 5,
        experience: "7+ yrs",
        details: "My go-to for backend and automation magic.",
        projects: "Automation scripts, data pipelines, Django APIs."
      },
      {
        name: "Django",
        icon: <SiDjango />,
        rating: 5,
        experience: "6+ yrs",
        details: "Batteries-included for rapid API dev.",
        projects: "Enterprise web apps."
      },
      {
        name: "Node.js",
        icon: <FaNode />,
        rating: 4.5,
        experience: "5+ yrs",
        details: "Event-driven, non-blocking I/O.",
        projects: "Real-time data pipelines."
      },
      {
        name: "Java",
        icon: <FaJava />,
        rating: 4,
        experience: "6+ yrs",
        details: "OOP powerhouse for enterprise systems.",
        projects: "Spring Boot microservices."
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        rating: 5,
        experience: "6+ yrs",
        details: "Complex schemas, advanced queries.",
        projects: "Large-scale migrations."
      },
      {
        name: "MongoDB",
        icon: <SiMongodb />,
        rating: 4,
        experience: "4+ yrs",
        details: "Schema-flexible document store.",
        projects: "NoSQL microservices."
      },
      {
        name: "Redis",
        icon: <SiRedis />,
        rating: 4.5,
        experience: "5+ yrs",
        details: "Blazing-fast in-memory store.",
        projects: "Caching & sessions."
      },
      {
        name: "Elasticsearch",
        icon: <SiElasticsearch />,
        rating: 3.5,
        experience: "2+ yrs",
        details: "Search & analytics powerhouse.",
        projects: "Advanced search UX."
      }
    ]
  },

  "DevOps & Cloud": {
    description: "Cloud infrastructure, containerization, and deployment automation",
    skills: [
      {
        name: "AWS Services",
        icon: <FaAws />,
        rating: 5,
        experience: "5+ yrs",
        details: "EC2, S3, Lambda, RDS & more.",
        projects: "Production infrastructure."
      },
      {
        name: "Docker",
        icon: <FaDocker />,
        rating: 5,
        experience: "5+ yrs",
        details: "Containers for every app.",
        projects: "All modern deployments."
      },
      {
        name: "Kubernetes",
        icon: <SiKubernetes />,
        rating: 4,
        experience: "3+ yrs",
        details: "Orchestrating at scale.",
        projects: "Production clusters."
      },
      {
        name: "Terraform",
        icon: <SiTerraform />,
        rating: 4,
        experience: "3+ yrs",
        details: "IaC for cloud infra.",
        projects: "AWS provisioning."
      },
      {
        name: "GitHub Actions",
        icon: <SiGithubactions />,
        rating: 4,
        experience: "2+ yrs",
        details: "Modern CI/CD runner.",
        projects: "GitHub-hosted pipelines."
      },
      {
        name: "Nginx",
        icon: <SiNginx />,
        rating: 4.5,
        experience: "5+ yrs",
        details: "Reverse proxy & static host.",
        projects: "Production front-ends."
      }
    ]
  },

  "Tools & Technologies": {
    description: "Development tools, monitoring, and essential technologies",
    skills: [
      {
        name: "Git",
        icon: <FaGitAlt />,
        rating: 5,
        experience: "7+ yrs",
        details: "Version control wizardry.",
        projects: "Every codebase ever."
      },
      {
        name: "Linux/Unix",
        icon: <FaLinux />,
        rating: 5,
        experience: "7+ yrs",
        details: "My daily driver for dev & prod servers.",
        projects: "Docker hosts, Kubernetes nodes."
      },
      {
        name: "Datadog",
        icon: <SiDatadog />,
        rating: 4.5,
        experience: "3+ yrs",
        details: "APM + logs in one pane.",
        projects: "Full-stack dashboards."
      },
      {
        name: "Grafana",
        icon: <SiGrafana />,
        rating: 4,
        experience: "3+ yrs",
        details: "Beautiful dashboards.",
        projects: "Operational views."
      },
      {
        name: "RabbitMQ",
        icon: <SiRabbitmq />,
        rating: 4.5,
        experience: "5+ yrs",
        details: "Reliable message broker, decoupling systems.",
        projects: "Async pipelines."
      },
      {
        name: "Firebase",
        icon: <SiFirebase />,
        rating: 3.5,
        experience: "2+ yrs",
        details: "Realtime DB, hosting & auth.",
        projects: "UI sync features."
      }
    ]
  }
};
