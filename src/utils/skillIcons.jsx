import {
  FaReact,
  FaNode,
  FaAws,
  FaDocker,
  FaBrain,
  FaDatabase,
  FaPython,
  FaJava,
  FaLinux,
  FaGitAlt,
  FaHtml5,
  FaCss3,
  FaAngular
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiOpenai,
  SiVercel,
  SiPrisma,
  SiNextdotjs,
  SiDjango,
  SiFlask,
  SiSpring,
  SiExpress,
  SiRedis,
  SiElasticsearch,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiNginx,
  SiDatadog,
  SiGrafana,
  SiPrometheus,
  SiRabbitmq,
  SiFirebase,
  SiTailwindcss
} from 'react-icons/si';

export const getSkillIcon = (skillName) => {
  const icons = {
    'React': FaReact,
    'TypeScript': SiTypescript,
    'Next.js': SiNextdotjs,
    'JavaScript': SiJavascript,
    'HTML & CSS': () => (
      <div className="flex gap-1">
        <FaHtml5 />
        <FaCss3 />
      </div>
    ),
    'Tailwind CSS': SiTailwindcss,
    'Angular': FaAngular,
    'Python': FaPython,
    'Django': SiDjango,
    'Flask': SiFlask,
    'Node.js': FaNode,
    'Express': SiExpress,
    'Java': FaJava,
    'Spring': SiSpring,
    'MongoDB': SiMongodb,
    'PostgreSQL': SiPostgresql,
    'Redis': SiRedis,
    'Elasticsearch': SiElasticsearch,
    'AWS': FaAws,
    'Docker': FaDocker,
    'Kubernetes': SiKubernetes,
    'Terraform': SiTerraform,
    'GitHub Actions': SiGithubactions,
    'Nginx': SiNginx,
    'Git': FaGitAlt,
    'Linux/Unix': FaLinux,
    'Datadog': SiDatadog,
    'Grafana': SiGrafana,
    'Prometheus': SiPrometheus,
    'RabbitMQ': SiRabbitmq,
    'Firebase': SiFirebase,
    'OpenAI API': SiOpenai,
    'LangChain': FaBrain,
    'Vector DBs': FaDatabase,
    'Prisma': SiPrisma,
    'Vercel': SiVercel
  };

  const Icon = icons[skillName];
  return Icon ? (typeof Icon === 'function' ? <Icon /> : Icon) : null;
}; 