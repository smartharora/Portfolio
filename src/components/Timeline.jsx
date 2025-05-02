import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap, FaFilter } from 'react-icons/fa';

const experiences = [
  {
    title: "Software Engineer III",
    company: "Brivo",
    location: "San Jose, CA",
    date: "Jun 2024 - Present",
    type: "work",
    category: "Full-time",
    description: [
      "Leading the development of Brivo SmartHome platform's core services and APIs, focusing on scalability and real-time processing capabilities.",
      "Architecting and implementing high-performance microservices handling telemetry from 20K+ gateways and 100K+ IoT devices.",
      "Spearheading the adoption of modern monitoring solutions and implementing robust error handling and recovery mechanisms.",
      "Mentoring junior developers and interns, conducting code reviews, and establishing best practices for the team."
    ],
    skills: ["Python", "Django", "MQTT", "Redis", "RabbitMQ", "Docker", "AWS"]
  },
  {
    title: "Software Engineering Intern (Co-op)",
    company: "Brivo",
    location: "San Jose, CA",
    date: "Aug 2023 - Jun 2024",
    type: "work",
    category: "Internship",
    description: [
      "Developed and scaled the Brivo SmartHome SaaS platform for access-control and automation services.",
      "Engineered scalable REST APIs using Django REST Framework and implemented real-time communication via MQTT.",
      "Improved platform stability and reduced database query latency by ~50% through Redis caching.",
      "Integrated monitoring tools including Datadog, Prometheus, and Grafana for enhanced system observability."
    ],
    skills: ["Python", "Django", "Redis", "MQTT", "Docker"]
  },
  {
    title: "Master's in Software Engineering",
    company: "San José State University",
    location: "San Jose, CA",
    date: "Aug 2022 - Aug 2024",
    type: "education",
    category: "Education",
    description: [
      "Specialized in Distributed Systems and Cloud Computing",
      "Key coursework: Advanced Software Systems Architecture, Cloud Technologies, Distributed Systems",
      "Research focus on IoT systems and real-time data processing",
      "Maintained a 3.9 GPA while working as a Software Engineer"
    ],
    skills: ["Cloud Computing", "Distributed Systems", "System Design"]
  },
  {
    title: "Software Engineer",
    company: "Zscaler",
    location: "Mohali, Punjab",
    date: "May 2020 - Aug 2022",
    type: "work",
    category: "Full-time",
    description: [
      "Led the development of Cloud Deployment Application (CDA), managing deployments across 20,000+ units",
      "Improved CDN delivery efficiency by 40% through optimization of core server-side applications",
      "Architected modular deployment pipelines with automated validation and rollback capabilities",
      "Created Cloud Configuration Management System (CCMS) for configuration auditing across VM fleet"
    ],
    skills: ["Python", "Flask", "Django", "Ansible", "CI/CD"]
  },
  {
    title: "Associate Software Engineer",
    company: "Zscaler",
    location: "Chandigarh, India",
    date: "Oct 2018 - May 2020",
    type: "work",
    category: "Full-time",
    description: [
      "Developed automation APIs orchestrating Ansible workflows for 10,000+ cloud nodes",
      "Implemented secure payload handling and real-time deployment monitoring",
      "Contributed to core infrastructure automation initiatives"
    ],
    skills: ["Python", "Ansible", "Automation", "Cloud Infrastructure"]
  },
  {
    title: "Software Engineering Intern",
    company: "Zscaler",
    location: "Chandigarh, India",
    date: "Jan 2018 - Sep 2018",
    type: "work",
    category: "Internship",
    description: [
      "Created automation playbooks and container orchestration scripts",
      "Implemented monitoring solutions for deployment workflows",
      "Gained expertise in cloud infrastructure and automation"
    ],
    skills: ["Python", "Docker", "Automation"]
  },
  {
    title: "B.Tech in Computer Science",
    company: "DAV Institute of Engineering and Technology",
    location: "Punjab, India",
    date: "2014 - 2018",
    type: "education",
    category: "Education",
    description: [
      "Graduated with First Class Honors",
      "Core focus: Data Structures, Algorithms, Software Engineering",
      "Led technical workshops and coding competitions",
      "Published research paper on cloud computing optimization"
    ],
    skills: ["Computer Science", "Data Structures", "Algorithms"]
  }
];

export default function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState('all');

  const filteredExperiences = filter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === filter);

  return (
    <section id="experience" ref={ref} className="py-20 bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Experience & Education
        </h2>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Full-time')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'Full-time'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Full-time
          </button>
          <button
            onClick={() => setFilter('Internship')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'Internship'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setFilter('Education')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'Education'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Education
          </button>
        </div>
        
        <VerticalTimeline>
          {filteredExperiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: 'rgba(17, 24, 39, 0.8)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              contentArrowStyle={{ borderRight: '7px solid rgba(17, 24, 39, 0.8)' }}
              date={exp.date}
              iconStyle={{
                background: exp.type === 'work' 
                  ? exp.category === 'Internship' 
                    ? '#4F46E5' 
                    : '#3B82F6'
                  : '#8B5CF6',
                color: '#fff',
              }}
              icon={exp.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
            >
              <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
              <h4 className="text-lg font-semibold text-purple-400">{exp.company}</h4>
              <p className="text-sm text-gray-400 mb-4">{exp.location}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-sm">{item}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </section>
  );
}
