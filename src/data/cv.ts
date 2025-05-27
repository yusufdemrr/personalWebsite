
import type { ElementType } from 'react';
import { Briefcase, GraduationCap, Cpu, Code, Database, Zap, Users, Linkedin, Github, FileText, Mail, Star, Award, UsersRound } from 'lucide-react'; // Added Award, UsersRound

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
  category: 'Programming Languages' | 'Frameworks/Libraries' | 'Tools' | 'General' | 'Databases' | 'DevOps'; // Adjusted categories
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
  phone?: string;
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
  title: "Computer Engineering Student & AI Developer", // Updated title
  email: "yusufdemrr@hotmail.com",
  phone: "+90 536 989 95 65",
  location: "Ankara, Türkiye",
  shortIntro: "A proactive Computer Engineering student at Hacettepe University with hands-on experience in software development, machine learning, and AI research. Passionate about building innovative solutions.",
  summary: `Driven Computer Engineering student at Hacettepe University (GPA: 3.43/4.0) with a strong foundation in software development and a keen interest in Artificial Intelligence.
Proven ability to contribute to research projects, develop AI models, and work with diverse technologies including Python, C++, Java, JavaScript, PyTorch, React, and Spring Boot.
Actively involved in tech communities through volunteering and leadership roles, such as Captain of the R&D AI Unit at ACM Hacettepe and Social Media & Graphic Design Team Coordinator at GDSC Hacettepe. Eager to apply skills and learn in challenging environments.`,
  skills: [
    { name: "Python", category: "Programming Languages", icon: Code },
    { name: "Java", category: "Programming Languages", icon: Code },
    { name: "C++", category: "Programming Languages", icon: Code },
    { name: "JavaScript", category: "Programming Languages", icon: Code },
    { name: "PyTorch", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Stable Baselines3", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Ray", category: "Frameworks/Libraries", icon: Cpu },
    { name: "OpenCV", category: "Frameworks/Libraries", icon: Code },
    { name: "React", category: "Frameworks/Libraries", icon: Code },
    { name: "Spring Boot", category: "Frameworks/Libraries", icon: Cpu },
    { name: "Git", category: "Tools", icon: Github },
    { name: "TensorBoard", category: "Tools", icon: Zap },
    { name: "Unity", category: "Tools", icon: Zap }, // Consider a game engine icon if available
    { name: "Pandas", category: "Frameworks/Libraries", icon: Database },
    { name: "NumPy", category: "Frameworks/Libraries", icon: Database },
    { name: "Matplotlib", category: "Frameworks/Libraries", icon: Zap }, // Consider a chart icon
    { name: "Agile Methodologies", category: "General", icon: Users },
    { name: "Problem Solving", category: "General", icon: Star },
    { name: "Team Collaboration", category: "General", icon: Users },
  ],
  experience: [
    {
      role: "Research Intern",
      company: "Hacettepe Biological Data Science Laboratory",
      location: "Ankara (Assumed)",
      period: "March 2025 - Present",
      responsibilities: [
        "Contributing to the MIND project under the supervision of Prof. Dr. Tunca Doğan.",
        "Focusing on transformer-based foundation models for molecular representation learning."
      ],
      icon: Briefcase,
    },
    {
      role: "Software Engineer Intern",
      company: "Rocksoft",
      location: "Ankara",
      period: "June - Nov 2024, Jan - Feb 2025",
      responsibilities: [
        "Developed AI models for an Electronic Warfare project using Reinforcement Learning.",
        "Contributed to all stages of development; the project was later awarded funding under the TÜBİTAK 1501 Industrial R&D Support program.",
        "Designed and tested simulations for intelligent system behaviors using Stable-Baselines3, Unity, and Python.",
        "Worked on jamming type selection and power control optimization for countering multifunction radars with Deep Reinforcement Learning."
      ],
      icon: Briefcase,
    },
    {
      role: "Intern",
      company: "Akça Medikal",
      location: "Remote",
      period: "July 2022 - October 2022",
      responsibilities: [
        "Enhanced Akça Medikal's website visibility through SEO strategies, contributing to its top ranking in Turkey for stethoscope-related searches."
      ],
      icon: Briefcase,
    },
  ],
  education: [
    {
      degree: "Bachelor's degree, Computer Engineering",
      institution: "Hacettepe University",
      period: "September 2021 - July 2026 (Expected)",
      details: ["GPA: 3.43/4.0"],
      icon: GraduationCap,
    },
  ],
  volunteering: [
    {
      role: "Captain of the R&D AI Unit",
      organization: "ACM Hacettepe",
      period: "August 2024 - Present",
      description: [
        "Led AI projects, guided teams.",
        "Taught a Reinforcement Learning course to R&D members."
      ],
      icon: UsersRound,
    },
    {
      role: "Social Media and Graphic Design Team Coordinator",
      organization: "GDSC Hacettepe",
      period: "October 2022 - July 2023",
      description: [
        // CV doesn't list specific responsibilities here, can be left as is or a generic one added
        "Coordinated social media presence and graphic design efforts for the Google Developer Student Club."
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
      id: "image-processing-edge-detection",
      title: "Image Processing and Edge Detection",
      shortDescription: "A C++ system for image manipulation, including convolution, sharpening, Sobel edge detection, and LSB steganography.",
      longDescription: "Developed an image processing system using C++ for performing matrix-based operations such as convolution, image sharpening, and Sobel edge detection. The system also includes an additional functionality to encode and decode hidden messages using LSB (Least Significant Bit) steganography, allowing for covert data embedding within images.",
      technologies: ["C++", "Image Processing", "Steganography", "Algorithm Development"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "image processing algorithm",
      repoUrl: "https://github.com/demrr/repo1",
    },
    {
      id: "16-personality-knn",
      title: "16 Personality (KNN Classification)",
      shortDescription: "A Python-based K-Nearest Neighbor (KNN) algorithm for a real-world classification problem, using Pandas, NumPy, and Matplotlib.",
      longDescription: "Implemented a Python-based K-Nearest Neighbor (KNN) algorithm to solve a real-world classification problem. This project involved data preprocessing, model training, and evaluation, utilizing popular data science libraries such as Pandas for data manipulation, NumPy for numerical operations, and Matplotlib for data visualization to understand the dataset and model performance.",
      technologies: ["Python", "K-Nearest Neighbor (KNN)", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "machine learning classification",
      repoUrl: "https://github.com/demrr/repo2",
    },
  ],
  cvPath: "/Yusuf_Demir_CV.pdf", // Updated CV path
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/yusufdemrr", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/yusufdemrr", icon: Github },
    { name: "Email", url: "mailto:yusufdemrr@hotmail.com", icon: Mail },
  ]
};
