
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cvData } from '@/data/cv';
import type { Project } from '@/data/cv';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github as GithubIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/shared/section';

export async function generateStaticParams() {
  return cvData.projects.map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = cvData.projects.find(p => p.id === projectId);
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }
  return {
    title: project.title,
    description: project.shortDescription,
  }
}


interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = cvData.projects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <Section title={project.title} className="py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" asChild className="group">
          <Link href="/#projects" scroll={false}>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Projects
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={project.imageUrl || "https://placehold.co/1200x675.png"}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.dataAiHint || "project technology"}
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-10">
          <CardDescription className="text-sm text-muted-foreground mb-4">{project.shortDescription}</CardDescription>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="default">{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-primary mb-2">Project Overview:</h3>
            <div className="text-foreground/90 leading-relaxed space-y-4 whitespace-pre-line">
              {project.longDescription.split('\\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {project.projectUrl && (
              <Button asChild size="lg" className="flex-1 sm:flex-none">
                <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                </Link>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" asChild size="lg" className="flex-1 sm:flex-none">
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-5 w-5" /> View Code
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
