import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAws, FaDocker, FaPython, FaJava, FaReact, FaNode, FaDatabase, 
  FaHtml5, FaJs, FaCss3, FaGitAlt, FaGithub, FaBitbucket, 
  FaLinux, FaNpm, FaServer, FaChevronDown 
} from 'react-icons/fa';
import { 
  SiKubernetes, SiDjango, SiFlask, SiMongodb, SiPostgresql, SiRedis, 
  SiGrafana, SiTerraform, SiJenkins, SiNginx, SiMysql, SiFirebase, 
  SiCelery, SiTailwindcss, SiTensorflow, SiSpring
} from 'react-icons/si';
import { BiGitBranch } from 'react-icons/bi';
import { GrActions } from 'react-icons/gr';

const skillsData = {
  "Languages & Core": [
    { name: "Python", icon: <FaPython />, years: 7, proficiency: 95 },
    { name: "Java", icon: <FaJava />, years: 5, proficiency: 85 },
    { name: "JavaScript", icon: <FaJs />, years: 4, proficiency: 90 },
    { name: "HTML/CSS", icon: <FaHtml5 />, years: 4, proficiency: 90 },
    { name: "SQL", icon: <FaDatabase />, years: 6, proficiency: 85 },
    { name: "Shell Script", icon: <FaLinux />, years: 5, proficiency: 80 },
  ],
  "Frameworks & Libraries": [
    { name: "React", icon: <FaReact />, years: 3, proficiency: 90 },
    { name: "Django", icon: <SiDjango />, years: 5, proficiency: 95 },
    { name: "Flask", icon: <SiFlask />, years: 4, proficiency: 90 },
    { name: "Node.js", icon: <FaNode />, years: 3, proficiency: 85 },
    { name: "Spring Boot", icon: <SiSpring />, years: 2, proficiency: 75 },
    { name: "TensorFlow", icon: <SiTensorflow />, years: 2, proficiency: 70 },
  ],
  "Cloud & DevOps": [
    { name: "AWS Services", icon: <FaAws />, years: 5, proficiency: 90 },
    { name: "Docker", icon: <FaDocker />, years: 4, proficiency: 90 },
    { name: "Kubernetes", icon: <SiKubernetes />, years: 3, proficiency: 85 },
    { name: "Terraform", icon: <SiTerraform />, years: 3, proficiency: 85 },
    { name: "Jenkins", icon: <SiJenkins />, years: 4, proficiency: 80 },
    { name: "Nginx", icon: <SiNginx />, years: 4, proficiency: 85 },
  ],
  "Databases & Storage": [
    { name: "PostgreSQL", icon: <SiPostgresql />, years: 5, proficiency: 90 },
    { name: "MongoDB", icon: <SiMongodb />, years: 4, proficiency: 85 },
    { name: "Redis", icon: <SiRedis />, years: 4, proficiency: 85 },
    { name: "MySQL", icon: <SiMysql />, years: 3, proficiency: 80 },
    { name: "Firebase", icon: <SiFirebase />, years: 2, proficiency: 75 },
  ],
  "Monitoring & Tools": [
    { name: "Grafana", icon: <SiGrafana />, years: 3, proficiency: 85 },
    { name: "Git Flow", icon: <BiGitBranch />, years: 6, proficiency: 95 },
    { name: "GitHub Actions", icon: <GrActions />, years: 3, proficiency: 85 },
    { name: "Bitbucket", icon: <FaBitbucket />, years: 4, proficiency: 85 },
    { name: "Celery", icon: <SiCelery />, years: 3, proficiency: 80 },
  ]
};

export default function Skills() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Technical Expertise
        </motion.h2>

        <div className="space-y-4">
          {Object.entries(skillsData).map(([category, skills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <h3 className="text-xl font-semibold text-blue-400">{category}</h3>
                <motion.div
                  animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-blue-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedCategory === category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-700/50 rounded-md p-3 group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl text-blue-400 group-hover:text-blue-300">
                              {skill.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-white truncate">{skill.name}</h4>
                                <span className="text-xs text-gray-400 ml-2">{skill.years}y</span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.proficiency}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                  />
                                </div>
                                <span className="text-xs text-gray-400">{skill.proficiency}%</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
