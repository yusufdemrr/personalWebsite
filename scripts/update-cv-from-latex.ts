#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface ParsedCV {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    gpa: string;
    education: Array<{
        degree: string;
        institution: string;
        period: string;
        details: string[];
    }>;
    experience: Array<{
        role: string;
        company: string;
        location: string;
        period: string;
        responsibilities: string[];
    }>;
    volunteering: Array<{
        role: string;
        organization: string;
        period: string;
        description: string[];
    }>;
    projects: Array<{
        title: string;
        url: string;
        description: string[];
    }>;
    skills: {
        languages: string[];
        frameworks: string[];
        tools: string[];
    };
}

// Helper function to clean LaTeX text
function cleanLatexText(text: string): string {
    return text
        .replace(/\\\\/g, '&')  // Replace \\ with &
        .replace(/\\textbf\{([^}]+)\}/g, '$1')  // Remove \textbf{}
        .replace(/\\text\{([^}]+)\}/g, '$1')  // Remove \text{}
        .replace(/\\hspace\{[^}]+\}/g, '')  // Remove \hspace{}
        .replace(/\{\\footnotesize[^}]*\}/g, '')  // Remove footnotesize
        .replace(/\s+/g, ' ')  // Normalize whitespace
        .trim();
}

function parseLatexCV(latexContent: string): ParsedCV {
    // Remove LaTeX comments (lines starting with % or containing only %)
    const cleanContent = latexContent
        .split('\n')
        .filter(line => {
            const trimmed = line.trim();
            return !trimmed.startsWith('%');
        })
        .join('\n');

    const parsed: ParsedCV = {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        gpa: '',
        education: [],
        experience: [],
        volunteering: [],
        projects: [],
        skills: {
            languages: [],
            frameworks: [],
            tools: [],
        },
    };

    // Parse name
    const nameMatch = cleanContent.match(/\\fontsize\{25 pt\}\{25 pt\}\\selectfont\s+(.+)/);
    if (nameMatch) {
        parsed.name = nameMatch[1].trim();
    }

    // Parse location
    const locationMatch = cleanContent.match(/\\mbox\{([^}]+),\s*Türkiye\}/);
    if (locationMatch) {
        parsed.location = `${locationMatch[1]}, Türkiye`;
    }

    // Parse email
    const emailMatch = cleanContent.match(/\\hrefWithoutArrow\{mailto:([^}]+)\}/);
    if (emailMatch) {
        parsed.email = emailMatch[1];
    }

    // Parse phone
    const phoneMatch = cleanContent.match(/\\hrefWithoutArrow\{tel:([^}]+)\}\{([^}]+)\}/);
    if (phoneMatch) {
        parsed.phone = phoneMatch[2];
    }

    // Parse LinkedIn
    const linkedinMatch = cleanContent.match(/\\hrefWithoutArrow\{(https:\/\/www\.linkedin\.com\/in\/[^}]+)\}/);
    if (linkedinMatch) {
        parsed.linkedin = linkedinMatch[1];
    }

    // Parse GitHub
    const githubMatch = cleanContent.match(/\\hrefWithoutArrow\{(https:\/\/github\.com\/[^}]+)\}\{github\.com/);
    if (githubMatch) {
        parsed.github = githubMatch[1];
    }

    // Parse GPA
    const gpaMatch = cleanContent.match(/GPA:\s*([\d.]+\/[\d.]+)/);
    if (gpaMatch) {
        parsed.gpa = gpaMatch[1];
    }

    // Parse Education - only within Education section
    const educationSection = cleanContent.match(/\\section\{Education\}([\s\S]*?)\\section\{Experience\}/);
    if (educationSection) {
        const eduContent = educationSection[1];
        // Updated regex to handle nested braces in the first argument (dates) using (?:[^{}]|\{[^{}]*\})*
        const educationRegex = /\\begin\{twocolentry\}\{((?:[^{}]|\{[^{}]*\})*)\}[\s\S]*?\\textbf\{([^}]+)\},\s*([^\\]+)\\end\{twocolentry\}([\s\S]*?)(?=\\begin\{twocolentry\}|$)/g;
        let eduMatch;
        while ((eduMatch = educationRegex.exec(eduContent)) !== null) {
            const period = cleanLatexText(eduMatch[1]);
            const institution = eduMatch[2];
            const degree = cleanLatexText(eduMatch[3]);

            const details: string[] = [];
            const highlightsMatch = eduMatch[4].match(/\\begin\{highlights\}([\s\S]*?)\\end\{highlights\}/);
            if (highlightsMatch) {
                const items = highlightsMatch[1].match(/\\item\s+([^\n]+)/g);
                if (items) {
                    items.forEach(item => {
                        details.push(item.replace(/\\item\s+/, '').trim());
                    });
                }
            }

            parsed.education.push({
                degree,
                institution,
                period,
                details,
            });
        }
    }

    // Parse Experience
    const experienceSection = cleanContent.match(/\\section\{Experience\}([\s\S]*?)\\section\{Volunteering\}/);
    if (experienceSection) {
        const expContent = experienceSection[1];
        const expRegex = /\\begin\{twocolentry\}\{([^}]+)\}[\s\S]*?\\textbf\{([^}]+)\},\s*([^,\n]+)(?:,\s*([^\n\\]+))?[\s\S]*?\\end\{twocolentry\}([\s\S]*?)(?=\\begin\{twocolentry\}|\\vspace\{0\.2 cm\}|$)/g;

        let expMatch;
        while ((expMatch = expRegex.exec(expContent)) !== null) {
            const period = cleanLatexText(expMatch[1]);
            const role = cleanLatexText(expMatch[2]);
            const company = expMatch[3].trim();
            const location = expMatch[4] ? expMatch[4].trim() : 'Remote';

            const responsibilities: string[] = [];
            const highlightsMatch = expMatch[5].match(/\\begin\{highlights\}([\s\S]*?)\\end\{highlights\}/);
            if (highlightsMatch) {
                const items = highlightsMatch[1].match(/\\item\s+([^\n]+(?:\n(?!\s*\\item)[^\n]+)*)/g);
                if (items) {
                    items.forEach(item => {
                        let resp = item.replace(/\\item\s+/, '')
                            .replace(/\\textbf\{([^}]+)\}/g, '$1')
                            .replace(/\s+/g, ' ')
                            .trim();
                        responsibilities.push(resp);
                    });
                }
            }

            parsed.experience.push({
                role,
                company,
                location,
                period,
                responsibilities,
            });
        }
    }

    // Parse Volunteering
    const volunteeringSection = cleanContent.match(/\\section\{Volunteering\}([\s\S]*?)\\section\{Projects\}/);
    if (volunteeringSection) {
        const volContent = volunteeringSection[1];
        const volRegex = /\\begin\{twocolentry\}\{([^}]+)\}[\s\S]*?\\textbf\{([^}]+),\s*\}[\s\S]*?\\text\{([^}]+)\}[\s\S]*?\\end\{twocolentry\}([\s\S]*?)(?=\\begin\{twocolentry\}|\\end\{samepage\}|$)/g;

        let volMatch;
        while ((volMatch = volRegex.exec(volContent)) !== null) {
            const period = volMatch[1].trim();
            const role = cleanLatexText(volMatch[2]);
            const organization = volMatch[3].trim();

            const description: string[] = [];
            const highlightsMatch = volMatch[4].match(/\\begin\{highlights\}([\s\S]*?)\\end\{highlights\}/);
            if (highlightsMatch) {
                const items = highlightsMatch[1].match(/\\item\s+([^\n]+(?:\n(?!\s*\\item)[^\n]+)*)/g);
                if (items) {
                    items.forEach(item => {
                        let desc = item.replace(/\\item\s+/, '')
                            .replace(/\\textbf\{([^}]+)\}/g, '$1')
                            .replace(/\\\\/g, '&')
                            .replace(/\s+/g, ' ')
                            .trim();
                        description.push(desc);
                    });
                }
            }

            parsed.volunteering.push({
                role,
                organization,
                period,
                description,
            });
        }
    }

    // Parse Projects
    const projectsSection = cleanContent.match(/\\section\{Projects\}([\s\S]*?)\\section\{Skills/);
    if (projectsSection) {
        const projContent = projectsSection[1];
        const projRegex = /\\begin\{twocolentry\}\{([^}]+)\}[\s\S]*?\\textbf\{([^}]+)\}[\s\S]*?\\end\{twocolentry\}([\s\S]*?)(?=\\begin\{twocolentry\}|\\section|$)/g;

        let projMatch;
        while ((projMatch = projRegex.exec(projContent)) !== null) {
            const url = projMatch[1].match(/\\href\{([^}]+)\}/)?.[1] || '';
            const title = projMatch[2].trim();

            const description: string[] = [];
            const highlightsMatch = projMatch[3].match(/\\begin\{highlights\}([\s\S]*?)\\end\{highlights\}/);
            if (highlightsMatch) {
                const items = highlightsMatch[1].match(/\\item\s+([^\n]+)/g);
                if (items) {
                    items.forEach(item => {
                        description.push(item.replace(/\\item\s+/, '').trim());
                    });
                }
            }

            parsed.projects.push({
                title,
                url,
                description,
            });
        }
    }

    // Parse Skills
    const skillsSection = cleanContent.match(/\\section\{Skills And Competences\}([\s\S]*?)(?=\\end\{document\})/);
    if (skillsSection) {
        const skillsContent = skillsSection[1];

        const languagesMatch = skillsContent.match(/\\textbf\{Languages:\}\s*([^\\\n]+)/);
        if (languagesMatch) {
            parsed.skills.languages = languagesMatch[1].split(',').map(s => s.trim());
        }

        const frameworksMatch = skillsContent.match(/\\textbf\{Frameworks\/Libraries:\}\s*([^\\\n]+)/);
        if (frameworksMatch) {
            parsed.skills.frameworks = frameworksMatch[1].split(',').map(s => s.trim());
        }

        const toolsMatch = skillsContent.match(/\\textbf\{Tools\s*\\\\\s*\&\s*Platforms:\}\s*([^\n]+)/);
        if (toolsMatch) {
            parsed.skills.tools = toolsMatch[1].split(',').map(s => s.trim());
        }
    }

    return parsed;
}

function generateCVTS(parsed: ParsedCV): string {
    const template = `import type { ElementType } from 'react';
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
  name: "${parsed.name}",
  title: "Computer Engineering Student & AI Developer",
  email: "${parsed.email}",
  location: "${parsed.location}",
  shortIntro: "A proactive Computer Engineering student at Hacettepe University with hands-on experience in software development, machine learning, and AI research. Passionate about building innovative solutions.",
  summary: \`Driven Computer Engineering student at Hacettepe University (GPA: ${parsed.gpa}) with a strong foundation in software development and a keen interest in Artificial Intelligence.
Proven ability to contribute to research projects, develop AI models, and work with diverse technologies. Actively involved in tech communities through volunteering and leadership roles. Eager to apply skills and learn in challenging environments.\`,
  skills: [
${generateSkills(parsed.skills)}
  ],
  experience: [
${generateExperience(parsed.experience)}
  ],
  education: [
${generateEducation(parsed.education)}
  ],
  volunteering: [
${generateVolunteering(parsed.volunteering)}
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
${generateProjects(parsed.projects)}
  ],
  cvPath: "/Yusuf_Demir_CV.pdf",
  socials: [
    { name: "LinkedIn", url: "${parsed.linkedin}", icon: Linkedin },
    { name: "GitHub", url: "${parsed.github}", icon: Github },
    { name: "Email", url: "mailto:${parsed.email}", icon: Mail },
  ]
};
`;

    return template;
}

function generateSkills(skills: ParsedCV['skills']): string {
    const skillsArray: string[] = [];

    skills.languages.forEach(lang => {
        skillsArray.push(`    { name: "${lang}", category: "Programming Languages", icon: Code }`);
    });

    skills.frameworks.forEach(fw => {
        skillsArray.push(`    { name: "${fw}", category: "Frameworks/Libraries", icon: Cpu }`);
    });

    skills.tools.forEach(tool => {
        skillsArray.push(`    { name: "${tool}", category: "Tools", icon: Zap }`);
    });

    // Add general skills
    skillsArray.push(`    { name: "Agile Methodologies", category: "General", icon: Users }`);
    skillsArray.push(`    { name: "Problem Solving", category: "General", icon: Star }`);
    skillsArray.push(`    { name: "Team Collaboration", category: "General", icon: Users }`);

    return skillsArray.join(',\n');
}

function generateExperience(experiences: ParsedCV['experience']): string {
    return experiences.map(exp => {
        const responsibilities = exp.responsibilities.map(r => `        "${r}"`).join(',\n');
        return `    {
      role: "${exp.role}",
      company: "${exp.company}",
      location: "${exp.location}",
      period: "${exp.period}",
      responsibilities: [
${responsibilities}
      ],
      icon: Briefcase,
    }`;
    }).join(',\n');
}

function generateEducation(education: ParsedCV['education']): string {
    return education.map(edu => {
        const details = edu.details.map(d => `"${d}"`).join(', ');
        return `    {
      degree: "${edu.degree}",
      institution: "${edu.institution}",
      period: "${edu.period}",
      details: [${details}],
      icon: GraduationCap,
    }`;
    }).join(',\n');
}

function generateVolunteering(volunteering: ParsedCV['volunteering']): string {
    return volunteering.map(vol => {
        const description = vol.description.map(d => `        "${d}"`).join(',\n');
        return `    {
      role: "${vol.role}",
      organization: "${vol.organization}",
      period: "${vol.period}",
      description: [
${description}
      ],
      icon: UsersRound,
    }`;
    }).join(',\n');
}

function generateProjects(projects: ParsedCV['projects']): string {
    return projects.map((proj, index) => {
        const id = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const description = proj.description.join(' ');
        const technologies = proj.description.join(' ').match(/\b[A-Z][a-zA-Z0-9+#.]+\b/g) || [];
        const uniqueTechs = [...new Set(technologies)].slice(0, 6);

        return `    {
      id: "${id}",
      title: "${proj.title}",
      shortDescription: "${description.substring(0, 150)}...",
      longDescription: "${description}",
      technologies: [${uniqueTechs.map(t => `"${t}"`).join(', ')}],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "project technology",
      repoUrl: "${proj.url}",
    }`;
    }).join(',\n');
}

// Main execution
function findCVFile(dataDir: string): string | null {
    const files = fs.readdirSync(dataDir);

    // Look for files matching *_cv.txt or cv.txt pattern
    const cvFile = files.find(file =>
        file.endsWith('_cv.txt') || file === 'cv.txt'
    );

    return cvFile ? path.join(dataDir, cvFile) : null;
}

const dataDir = path.join(__dirname, '../src/data');
const outputPath = path.join(dataDir, 'cv.ts');

try {
    const latexPath = findCVFile(dataDir);

    if (!latexPath) {
        console.error('❌ No CV file found in src/data/');
        console.error('   Please create a file named "cv.txt" or "*_cv.txt" (e.g., "john_cv.txt")');
        process.exit(1);
    }

    console.log(`📖 Reading CV from: ${path.basename(latexPath)}`);

    const latexContent = fs.readFileSync(latexPath, 'utf-8');
    const parsed = parseLatexCV(latexContent);
    const generatedCode = generateCVTS(parsed);

    fs.writeFileSync(outputPath, generatedCode, 'utf-8');
    console.log('✅ CV data successfully updated from LaTeX file!');
    console.log(`📄 Output written to: ${outputPath}`);
} catch (error) {
    console.error('❌ Error updating CV:', error);
    process.exit(1);
}
