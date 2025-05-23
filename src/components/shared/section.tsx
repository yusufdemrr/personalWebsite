import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  titleClassName?: string;
}

export const Section = ({ title, subtitle, children, className, id, titleClassName }: SectionProps) => (
  <section id={id} className={cn("py-12 md:py-20", className)}>
    <div className="max-w-5xl mx-auto">
      {title && (
        <div className="mb-10 md:mb-12 text-center">
          <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight text-primary mb-2", titleClassName)}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);
