import type { ElementType } from 'react';
import { Briefcase, GraduationCap, Cpu, Code, Database, Zap, Users, Linkedin, Github, FileText, Mail, Star, Award, UsersRound } from 'lucide-react';

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
  location?: string;
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
  category: 'Programming Languages' | 'Frameworks/Libraries' | 'Tools' | 'General' | 'Databases' | 'DevOps';
}

export interface VolunteeringEntry {
  role: string;
  organization: string;
  period: string;
  description: string[];
  icon?: ElementType;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon?: ElementType;
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  location?: string;
  shortIntro: string;
  summary: string;
  skills: Skill[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  volunteering: VolunteeringEntry[];
  projects: Project[];
  certifications: Certification[];
  cvPath: string;
  socials: { name: string; url: string; icon: ElementType }[];
}

export const cvData: CVData = {
  name: "Yusuf Demir",
  title: "Computer Engineering Student & AI Developer",
  email: "yusufdemir.tech@gmail.com",
  location: "Ankara, Türkiye",
  shortIntro: "A proactive Computer Engineering student at Hacettepe University with hands-on experience in software development, machine learning, and AI research. Passionate about building innovative solutions.",
  summary: `Driven Computer Engineering student at Hacettepe University (GPA: 3.49/4.0) with a strong foundation in software development and a keen interest in Artificial Intelligence.
Proven ability to contribute to research projects, develop AI models, and work with diverse technologies. Actively involved in tech communities through volunteering and leadership roles. Eager to apply skills and learn in challenging environments.`,
  skills: [
    { name: "Python", category: "Programming Languages", icon: Code },
    { name: "Java", category: "Programming Languages", icon: Code },
    { name: "C++", category: "Programming Languages", icon: Code },
    { name: "JavaScript", category: "Programming Languages", icon: Code },
    { name: "PyTorch", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Stable Baselines3", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Ray", category: "Frameworks/Libraries", icon: Cpu },
    { name: "OpenCV", category: "Frameworks/Libraries", icon: Cpu },
    { name: "LangChain", category: "Frameworks/Libraries", icon: Cpu },
    { name: "React", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Spring Boot", category: "Frameworks/Libraries", icon: Cpu },
    { name: "FastAPI", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Agile Methodologies", category: "General", icon: Users },
    { name: "Problem Solving", category: "General", icon: Star },
    { name: "Team Collaboration", category: "General", icon: Users }
  ],
  experience: [
    {
      role: "Intern \& Part-time Software Engineer",
      company: "Goaltech",
      location: "Ankara",
      period: "June – Aug 2025, Oct 2025 – Present",
      responsibilities: [
        "Contributed to the backend development of a cryptocurrency app using FastAPI, including real-time data streaming with Centrifugo, data ingestion via Apache NiFi, and robust error handling.",
        "Designed and deployed cloud-native LLM-based agent systems on AWS using Amazon Bedrock, focusing on scalable orchestration, retrieval integration, and production-grade deployment.",
        "Built backend services with Docker and integrated them into a CI/CD DevOps pipeline for cloud deployment."
      ],
      icon: Briefcase,
    },
    {
      role: "Research Intern",
      company: "Hacettepe Biological Data Science Laboratory",
      location: "Remote",
      period: "March 2025 – Present",
      responsibilities: [
        "Contributed to the MIND project under Prof.\ Dr.\ Tunca Doğan, developing a universal AI foundation model that unifies diverse biomolecular entities (proteins, RNAs, small molecules, complexes) into a shared representation for downstream AI tasks.",
        "Developed Graph Transformer-based models integrating multi-modal biological data.",
        "Optimized data loading and batching pipelines, enabling efficient large-scale pretraining."
      ],
      icon: Briefcase,
    },
    {
      role: "Data Science Intern",
      company: "Jotform",
      location: "Ankara",
      period: "August 2025 – September 2025",
      responsibilities: [
        "Built an autonomous web agent using Python, LangGraph, and RAG with Qdrant.",
        "Designed the agent's reasoning loop and deployed it via a FastAPI-based RESTful service."
      ],
      icon: Briefcase,
    },
    {
      role: "Software Engineer Intern",
      company: "Rocksoft",
      location: "Ankara",
      period: "June – Nov 2024, Jan – Feb 2025",
      responsibilities: [
        "Built RL models for an Electronic Warfare project, which received TÜBİTAK 1501 funding.",
        "Designed and tested simulations for intelligent system behaviors using Stable-Baselines3, Unity, and Python.",
        "Worked on jamming type selection and power control optimization for countering multifunction radars with Deep Reinforcement Learning."
      ],
      icon: Briefcase,
    }
  ],
  education: [
    {
      degree: "Bachelor's degree, Computer Engineering",
      institution: "Hacettepe University",
      period: "September 2021 - July 2026",
      details: ["GPA: 3.49/4.0"],
      icon: GraduationCap,
    }
  ],
  volunteering: [
    {
      role: "Captain of the R\&D AI Unit",
      organization: "ACM Hacettepe",
      period: "August 2024 - June 2025",
      description: [
        "Led AI projects, guided teams, and taught a Reinforcement Learning course to R\&D members."
      ],
      icon: UsersRound,
    }
  ],
  certifications: [
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "January 2024",
      icon: Award,
    },
    {
      name: "Machine Learning Summer Camp",
      issuer: "Miuul",
      date: "August 2023",
      icon: Award,
    }
  ],
  projects: [
    {
      id: "low-light-object-detection-via-super-resolution",
      title: "Low-Light Object Detection via Super-Resolution",
      shortDescription: "Trained custom SRCNN variants to enhance low-light images before detection. Fine-tuned YOLOv8 and compared detection performance across SRCNN, Enhance...",
      longDescription: "Trained custom SRCNN variants to enhance low-light images before detection. Fine-tuned YOLOv8 and compared detection performance across SRCNN, EnhancedSRCNN, and YASR using SSIM and mAP.",
      technologies: ["Trained", "SRCNN", "Fine", "YOLOv8", "EnhancedSRCNN", "YASR"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "project technology",
      repoUrl: "",
    },
    {
      id: "jotpilot-ai-powered-web-agent",
      title: "JotPilot: AI-Powered Web Agent",
      shortDescription: "Built a LangGraph agent that can reason and interact with any webpage via clicks, typing, or navigation. Used RAG-based context and custom tools, depl...",
      longDescription: "Built a LangGraph agent that can reason and interact with any webpage via clicks, typing, or navigation. Used RAG-based context and custom tools, deployed through a FastAPI service.",
      technologies: ["Built", "LangGraph", "Used", "RAG", "FastAPI"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "project technology",
      repoUrl: "",
    }
  ],
  cvPath: "/Yusuf_Demir_CV.pdf",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/yusufdemrr/", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/yusufdemrr", icon: Github },
    { name: "Email", url: "mailto:yusufdemir.tech@gmail.com", icon: Mail },
  ]
};
