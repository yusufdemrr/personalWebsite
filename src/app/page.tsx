
import Image from 'next/image';
import Link from 'next/link';
import { cvData } from '@/data/cv';
import type { Project, ExperienceEntry, EducationEntry, VolunteeringEntry, Certification } from '@/data/cv';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, ArrowRight, MapPin } from 'lucide-react';
import { Section } from '@/components/shared/section';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 bg-card/80 backdrop-blur-sm p-6">
      <CardHeader className="p-0">
      </CardHeader>

      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/projects/${project.id}`} className="w-full">
          <Button variant="outline" className="w-full group">
            View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function HomePage() {
  const skillCategories = Array.from(new Set(cvData.skills.map(s => s.category)));

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 -z-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
            {cvData.name}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-6">
            {cvData.title}
          </p>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-10 text-lg">
            {cvData.shortIntro}
          </p>
           <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-muted-foreground mb-6">
            {cvData.location && (
              <span className="flex items-center">
                <MapPin className="mr-1.5 h-4 w-4" /> {cvData.location}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <a href={`mailto:${cvData.email}?subject=Contact from ${cvData.name}'s Website`}>
                <Mail className="mr-2 h-5 w-5" /> Contact Me
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Section title="My Skills" id="skills" subtitle="Technologies and tools I work with.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(category => (
            <Card key={category} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-primary/90">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cvData.skills.filter(s => s.category === category).map(skill => (
                    <li key={skill.name} className="flex items-center text-sm text-foreground/80">
                      {skill.icon && <skill.icon className="h-4 w-4 mr-2 text-primary" />}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section title="Work Experience" id="experience" subtitle="Milestones in my professional career.">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/70 md:before:mx-auto md:before:ml-0">
          {cvData.experience.map((exp: ExperienceEntry, index) => (
            <div key={index} className="relative flex items-start md:grid md:grid-cols-2 md:gap-8">
              <div className="hidden md:flex md:flex-col md:items-end md:text-right pr-8">
                <p className="text-sm font-semibold text-primary">{exp.period}</p>
                {exp.location && <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>}
              </div>
              <div className="relative pl-10 before:absolute before:left-5 before:top-2 before:h-5 before:w-5 before:rounded-full before:bg-primary before:ring-4 before:ring-background md:pl-0 md:before:hidden">
                <Card className="shadow-lg w-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{exp.role}</CardTitle>
                    <CardDescription className="text-primary font-medium">{exp.company}</CardDescription>
                     <p className="text-xs text-muted-foreground md:hidden">{exp.period} {exp.location && `• ${exp.location}`}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                      {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      {/* Volunteering Section */}
      <Section title="Volunteering" id="volunteering" subtitle="Giving back to the community.">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/70 md:before:mx-auto md:before:ml-0">
          {cvData.volunteering.map((vol: VolunteeringEntry, index) => (
            <div key={index} className="relative flex items-start md:grid md:grid-cols-2 md:gap-8">
              <div className="hidden md:flex md:flex-col md:items-end md:text-right pr-8">
                <p className="text-sm font-semibold text-primary">{vol.period}</p>
              </div>
              <div className="relative pl-10 before:absolute before:left-5 before:top-2 before:h-5 before:w-5 before:rounded-full before:bg-primary before:ring-4 before:ring-background md:pl-0 md:before:hidden">
                <Card className="shadow-lg w-full">
                  <CardHeader>
                    {vol.icon && <vol.icon className="h-6 w-6 text-primary mb-1" />}
                    <CardTitle className="text-xl text-foreground">{vol.role}</CardTitle>
                    <CardDescription className="text-primary font-medium">{vol.organization}</CardDescription>
                    <p className="text-xs text-muted-foreground md:hidden">{vol.period}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                      {vol.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Education Section */}
      <Section title="Education" id="education" subtitle="My academic background and qualifications.">
         <div className="grid md:grid-cols-1 gap-8">
          {cvData.education.map((edu: EducationEntry, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                {edu.icon && <edu.icon className="h-8 w-8 text-primary mb-2" />}
                <CardTitle className="text-xl text-foreground">{edu.degree}</CardTitle>
                <CardDescription className="text-primary font-medium">{edu.institution}</CardDescription>
                <p className="text-xs text-muted-foreground">{edu.period}</p>
              </CardHeader>
              {edu.details && edu.details.length > 0 && (
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                    {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications Section */}
      <Section title="Certifications" id="certifications" subtitle="My professional certifications and achievements.">
         <div className="grid md:grid-cols-2 gap-8">
          {cvData.certifications.map((cert: Certification, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                {cert.icon && <cert.icon className="h-8 w-8 text-primary mb-2" />}
                <CardTitle className="text-xl text-foreground">{cert.name}</CardTitle>
                <CardDescription className="text-primary font-medium">{cert.issuer}</CardDescription>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section title="Featured Projects" id="projects" subtitle="Some projects I'm proud of.">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {cvData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section title="Get In Touch" id="contact" className="bg-card/30" subtitle="I'm always open to discussing new projects, creative ideas, or opportunities.">
        <div className="max-w-md mx-auto text-center">
          <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <a href={`mailto:${cvData.email}?subject=Inquiry from ${cvData.name}'s Website`}>
              <Mail className="mr-2 h-5 w-5" /> Send Email
            </a>
          </Button>
          <div className="mt-8 flex justify-center gap-6">
            {cvData.socials.map(social => social.name !== "Email" && ( 
              <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <social.icon className="h-8 w-8" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
