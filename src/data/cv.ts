import type { ElementType } from 'react';
import { Briefcase, GraduationCap, Cpu, Code, Database, Zap, Users, Linkedin, Github, FileText, Mail, Star } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  repoUrl?: string;
  dataAiHint?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  icon?: ElementType;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
  icon?: ElementType;
}

export interface Skill {
  name: string;
  icon?: ElementType;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Databases' | 'Tools' | 'General';
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  shortIntro: string;
  summary: string;
  skills: Skill[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: Project[];
  cvPath: string;
  socials: { name: string; url: string; icon: ElementType }[];
}

export const cvData: CVData = {
  name: "Yusuf Demir",
  title: "Full-Stack Developer & AI Innovator",
  email: "yusuf.demir@example.com",
  shortIntro: "Crafting intelligent web solutions with a passion for cutting-edge technology.",
  summary: "A dynamic and results-oriented Full-Stack Developer with over 5 years of expertise in designing, developing, and deploying robust web applications and AI-driven features. Adept at leading project lifecycles from concept to launch, with a strong commitment to continuous learning and leveraging emerging technologies. Seeking to contribute to ambitious projects that push the boundaries of web and AI.",
  skills: [
    { name: "JavaScript (ES6+)", category: "Frontend", icon: Code },
    { name: "TypeScript", category: "Frontend", icon: Code },
    { name: "React", category: "Frontend", icon: Code },
    { name: "Next.js", category: "Frontend", icon: Code },
    { name: "HTML5 & CSS3", category: "Frontend", icon: Code },
    { name: "Tailwind CSS", category: "Frontend", icon: Code },
    { name: "Node.js", category: "Backend", icon: Cpu },
    { name: "Python", category: "Backend", icon: Cpu },
    { name: "Express.js", category: "Backend", icon: Cpu },
    { name: "FastAPI", category: "Backend", icon: Cpu },
    { name: "GraphQL", category: "Backend", icon: Zap },
    { name: "REST APIs", category: "Backend", icon: Zap },
    { name: "PostgreSQL", category: "Databases", icon: Database },
    { name: "MongoDB", category: "Databases", icon: Database },
    { name: "Docker", category: "DevOps", icon: Zap },
    { name: "Kubernetes", category: "DevOps", icon: Zap },
    { name: "AWS", category: "DevOps", icon: Zap },
    { name: "Git & GitHub", category: "Tools", icon: Github },
    { name: "Agile Methodologies", category: "General", icon: Users },
    { name: "Problem Solving", category: "General", icon: Star },
    { name: "Team Collaboration", category: "General", icon: Users },
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Innovatech Solutions",
      period: "Jan 2021 - Present",
      responsibilities: [
        "Led a team of 5 developers in architecting and implementing a new microservices-based platform, enhancing system scalability by 40% and reducing latency by 15%.",
        "Developed and maintained critical features for the company's flagship SaaS product using React, Node.js, and TypeScript, serving over 10,000 active users.",
        "Engineered and integrated an AI-powered recommendation engine, which uplifted user engagement metrics by 25%.",
        "Championed best practices in code quality, testing, and CI/CD pipelines; mentored junior engineers."
      ],
      icon: Briefcase,
    },
    {
      role: "Software Developer",
      company: "Tech Startup Inc.",
      period: "Jun 2018 - Dec 2020",
      responsibilities: [
        "Key contributor to the development of a CRM platform, focusing on front-end features with Angular and back-end services with Python (Django).",
        "Successfully delivered multiple product modules, from requirement gathering to deployment, in a fast-paced agile environment.",
        "Implemented robust testing strategies, increasing code coverage by 30%."
      ],
      icon: Briefcase,
    },
  ],
  education: [
    {
      degree: "M.S. in Computer Science",
      institution: "Stanford University",
      period: "2016 - 2018",
      details: ["Specialization: Artificial Intelligence", "Thesis: 'Scalable Machine Learning Models for Web Applications'", "GPA: 3.9/4.0"],
      icon: GraduationCap,
    },
    {
      degree: "B.S. in Software Engineering",
      institution: "University of California, Berkeley",
      period: "2012 - 2016",
      details: ["Graduated with High Honors", "Dean's List 2014-2016", "Capstone Project: 'Real-time Collaborative Editor'"],
      icon: GraduationCap,
    },
  ],
  projects: [
    {
      id: "ai-content-platform",
      title: "AI-Powered Content Platform",
      shortDescription: "A revolutionary platform for generating and curating high-quality blog content using advanced NLP models and generative AI.",
      longDescription: "This project involved building a full-stack application enabling users to generate article ideas, draft content with AI assistance (GPT-3.5/4 based), and manage their publications seamlessly. The backend, built with Python (FastAPI), interfaces with various NLP models. The frontend, developed using Next.js and Tailwind CSS, offers a modern and intuitive user experience. Key features include real-time collaboration, version history, plagiarism checking, and SEO optimization tools.",
      technologies: ["Next.js", "Python", "FastAPI", "Generative AI", "NLP", "Tailwind CSS", "PostgreSQL", "Docker", "Stripe API"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "AI writing blog",
      projectUrl: "#",
      repoUrl: "#",
    },
    {
      id: "ecom-analytics-dashboard",
      title: "E-commerce Analytics Dashboard",
      shortDescription: "A comprehensive analytics dashboard providing actionable insights and visualizations for e-commerce businesses.",
      longDescription: "Developed a powerful analytics dashboard that integrates seamlessly with major e-commerce platforms like Shopify and WooCommerce via their APIs. It visualizes key performance indicators such as sales trends, customer lifetime value, conversion rates, and inventory turnover. Built with React, Recharts for dynamic charting, Node.js, and Express, leveraging a ClickHouse data warehouse for efficient large-scale data querying and aggregation.",
      technologies: ["React", "Recharts", "Node.js", "Express", "MongoDB", "ClickHouse", "Shopify API", "OAuth"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "dashboard chart",
      projectUrl: "#",
    },
    {
      id: "smart-iot-controller",
      title: "Smart Home IoT Controller",
      shortDescription: "A cross-platform mobile app to control and monitor diverse smart home devices via a secure, custom IoT platform.",
      longDescription: "Created a user-friendly cross-platform mobile application using React Native that communicates with a custom-built IoT platform. Users can manage various smart devices (lights, thermostats, security cameras), set complex automation schedules, and receive real-time notifications and alerts. The backend infrastructure was developed using Go for high performance and MQTT protocol for efficient, low-latency device communication. Implemented end-to-end encryption for device data.",
      technologies: ["React Native", "Go", "MQTT", "Firebase Auth", "IoT", "SQLite", "Bluetooth LE"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "smart home mobile",
      repoUrl: "#",
    },
  ],
  cvPath: "/yusuf_demir_cv.pdf",
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/example", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/example", icon: Github },
    { name: "Email", url: "mailto:yusuf.demir@example.com", icon: Mail },
  ]
};
