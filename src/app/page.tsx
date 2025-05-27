import Image from 'next/image';
import Link from 'next/link';
import { cvData } from '@/data/cv';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Section } from '@/components/shared/section';

function ProjectCard({ project }: { project: import('@/data/cv').Project }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={project.imageUrl || "https://placehold.co/600x400.png"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={project.dataAiHint || "technology abstract"}
          />
        </div>
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
            Detayları Gör <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <a href={cvData.cvPath} download={`${cvData.name.replace(' ', '_')}_CV.pdf`}>
                <Download className="mr-2 h-5 w-5" /> CV İndir
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/50 transition-shadow">
              <a href={`mailto:${cvData.email}?subject=${cvData.name}'in Web Sitesinden İletişim`}>
                <Mail className="mr-2 h-5 w-5" /> Bana Ulaşın
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section title="Hakkımda" id="about" subtitle="Yolculuğum ve tutkum hakkında biraz bilgi.">
        <Card className="p-6 md:p-8 shadow-lg">
          <CardContent>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-center md:text-left">
              {cvData.summary}
            </p>
          </CardContent>
        </Card>
      </Section>

      {/* Skills Section */}
      <Section title="Uzmanlık Alanlarım" id="skills" subtitle="Çalıştığım teknolojiler ve araçlar.">
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
      <Section title="İş Deneyimi" id="experience" subtitle="Profesyonel kariyerimdeki kilometre taşları.">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/70 md:before:mx-auto md:before:ml-0">
          {cvData.experience.map((exp, index) => (
            <div key={index} className="relative flex items-start md:grid md:grid-cols-2 md:gap-8">
              <div className="hidden md:flex md:flex-col md:items-end md:text-right pr-8">
                <p className="text-sm font-semibold text-primary">{exp.period}</p>
              </div>
              <div className="relative pl-10 before:absolute before:left-5 before:top-2 before:h-5 before:w-5 before:rounded-full before:bg-primary before:ring-4 before:ring-background md:pl-0 md:before:hidden">
                <Card className="shadow-lg w-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{exp.role}</CardTitle>
                    <CardDescription className="text-primary font-medium">{exp.company}</CardDescription>
                    <p className="text-xs text-muted-foreground md:hidden">{exp.period}</p>
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

      {/* Education Section */}
      <Section title="Eğitim" id="education" subtitle="Akademik geçmişim ve niteliklerim.">
         <div className="grid md:grid-cols-2 gap-8">
          {cvData.education.map((edu, index) => (
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

      {/* Projects Section */}
      <Section title="Öne Çıkan Projeler" id="projects" subtitle="Gurur duyduğum bazı projeler.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section title="İletişime Geçelim" id="contact" className="bg-card/30" subtitle="Yeni projeleri, yaratıcı fikirleri veya fırsatları görüşmeye her zaman açığım.">
        <div className="max-w-md mx-auto text-center">
          <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <a href={`mailto:${cvData.email}?subject=${cvData.name}'in Web Sitesinden Talep`}>
              <Mail className="mr-2 h-5 w-5" /> E-posta Gönder
            </a>
          </Button>
          <div className="mt-8 flex justify-center gap-6">
            {cvData.socials.map(social => social.name !== "Email" && ( // Exclude email as it's a button
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
