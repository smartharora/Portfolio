import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    } 
  }
};

const item = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const hoverAnimation = {
  scale: 1.1,
  rotate: [0, -5, 5, -5, 0],
  transition: {
    duration: 0.5,
    ease: "easeInOut"
  }
};

const skillIcons = {
  "Python": "devicon-python-plain colored",
  "JavaScript": "devicon-javascript-plain colored",
  "HTML": "devicon-html5-plain colored",
  "React": "devicon-react-original colored",
  "Node.js": "devicon-nodejs-plain colored",
  "Express.js": "devicon-express-original colored",
  "MongoDB": "devicon-mongodb-plain colored",
  "MySQL": "devicon-mysql-plain colored",
  "PostgreSQL": "devicon-postgresql-plain colored",
  "Firebase": "devicon-firebase-plain colored",
  "Git": "devicon-git-plain colored",
  "Docker": "devicon-docker-plain colored",
  "Kubernetes": "devicon-kubernetes-plain colored",
  "AWS": "devicon-amazonwebservices-original colored",
  "Linux/Unix": "devicon-linux-plain colored",
  "Nginx": "devicon-nginx-original colored",
  "Jenkins": "devicon-jenkins-plain colored",
  "Terraform": "devicon-terraform-plain colored",
  "Ansible": "devicon-ansible-plain colored",
  "RabbitMQ": "devicon-rabbitmq-original colored",
  "Celery": "devicon-celery-plain colored",
  "MQTT": "devicon-mqtt-original colored",
  "SpringBoot": "devicon-spring-plain colored",
  "Core Java": "devicon-java-plain colored",
  "Django": "devicon-django-plain colored",
  "Flask": "devicon-flask-original colored"
};

const skillCategories = {
  "Frontend": ["HTML", "JavaScript", "React"],
  "Backend": ["Node.js", "Express.js", "Python", "Django", "Flask", "SpringBoot", "Core Java"],
  "Database": ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  "DevOps": ["Docker", "Kubernetes", "AWS", "Linux/Unix", "Nginx", "Jenkins", "Terraform", "Ansible"],
  "Tools": ["Git", "RabbitMQ", "Celery", "MQTT"]
};

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section id="skills" ref={ref} className="py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Skills & Tools
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={item}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{category}</h3>
              <div className="grid grid-cols-3 gap-3">
                {skills.map((skill) => {
                  const iconClass = skillIcons[skill];
                  return (
                    <motion.div
                      key={skill}
                      whileHover={hoverAnimation}
                      className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="w-12 h-12 mb-1 flex items-center justify-center">
                        {iconClass ? (
                          <i className={iconClass} style={{ fontSize: '2.5rem' }}></i>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-400 bg-gray-700/50 rounded-lg">
                            {skill.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-center text-gray-300">{skill}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
