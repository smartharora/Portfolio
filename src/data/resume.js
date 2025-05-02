// src/data/resume.js
export const resume = {
    hero: {
      name: "Smarth Arora",
      tagline: ["Software Engineer", "Full-Stack Dev", "Portfolio Creator"],
      bio: "Passionate software engineer with a knack for building scalable backends and a growing love for frontend animations.",
      contact: {
        phone: "+1 (408) 786-4673",
        email: "iamsmartharora@gmail.com",
        linkedin: "https://linkedin.com/in/smartharora",
        github: "https://github.com/smartharora",
      }
    },
    education: [
      {
        school: "San Jose State University",
        degree: "M.S. Software Engineering",
        dates: "Aug 2022 – May 2024"
      },
      {
        school: "Punjab Technical University",
        degree: "B.Tech Computer Science",
        dates: "Aug 2014 – May 2018"
      }
    ],
    skills: [
      "Python", "Core Java", "HTML", "JavaScript", "Django", "Flask", "Linux/Unix",
      "Ansible", "Docker", "Kubernetes", "AWS EC2", "AWS S3", "AWS RDS",
      "AWS SQS", "AWS SNS", "CloudWatch", "ELB", "Terraform", "Lambda",
      "MongoDB", "MySQL", "PostgreSQL", "Firebase", "RabbitMQ", "Celery",
      "Flower", "Kibana", "Munin", "Prometheus", "Grafana", "Datadog",
      "Jenkins", "Nginx", "Git", "Shell Script", "MQTT",
      "React", "SpringBoot", "Node.js", "Express.js"
    ],
    work: [
      {
        company: "Brivo",
        role: "Software Engineer III",
        dates: "June 2023 – Present",
        bullets: [
          "Developed & scaled Brivo SmartHome, ingesting telemetry from 20K+ gateways & 100K+ devices in real time.",
          "Built REST APIs (DRF), integrated MQTT (HiveMQ/MosquittoMQ), RabbitMQ & Celery workers for sub-second message processing.",
          "Cut DB latency ~50% via Redis caching; optimized legacy ORM & executed large-scale PostgreSQL migrations.",
          "Revamped CI/CD (Bitbucket + Poetry caching) to speed builds/tests/deploys by ~45%.",
          "Integrated Datadog, Prometheus, Grafana, Munin, Kibana & CloudWatch for end-to-end observability."
        ]
      },
      {
        company: "Brivo",
        role: "Software Engineer Intern",
        dates: "Jan 2023 – May 2023",
        bullets: [
          "Worked on the SmartHome platform, developing backend services and APIs",
          "Implemented MQTT integration for real-time device communication",
          "Optimized database queries and improved system performance"
        ]
      },
      {
        company: "Zscaler",
        role: "Software Engineer",
        dates: "Jan 2021 – Aug 2022",
        bullets: [
          "Maintained Cloud Deployment App (CI/CD) across 20K+ units—60% faster deploys with Ansible, Docker & Kubernetes.",
          "Built Python/Flask/Django services; optimized CDN delivery + custom Ansible modules (40% efficiency gain).",
          "Architected rollback-safe pipelines; standardized dynamic Ansible inventories across 7+ regions.",
          "Led CCMS build for config audits on 20K+ VMs—50% faster audits; mentored interns on delivery.",
          "Developed Python APIs to orchestrate Ansible at scale (10K+ nodes) with parallel execution & real-time status."
        ]
      },
      {
        company: "Zscaler",
        role: "Software Engineer Intern",
        dates: "Jun 2020 – Dec 2020",
        bullets: [
          "Worked on cloud deployment automation and CI/CD pipelines",
          "Developed Ansible playbooks for infrastructure automation",
          "Assisted in building monitoring and logging solutions"
        ]
      }
    ],
    projects: [
      {
        name: "GroceryGo",
        date: "Dec 2022",
        desc: "Distributed e-commerce platform: Node.js, Flask, PostgreSQL on AWS EC2/Fargate, RDS, S3, Lambda & API Gateway."
      },
      {
        name: "TastyGenie",
        date: "Oct 2022",
        desc: "AI recipe recommender: Python, React, PostgreSQL, Scikit-learn, AWS SageMaker, with future TF integration."
      }
    ],
    honors: [
      "Bravo awards from Zscaler (Mar 2019, Jul 2021) for Ansible automation & cross-team cloud upgrade leadership."
    ]
  }
  