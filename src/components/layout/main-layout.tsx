
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Menu, X, Home as HomeIcon } from 'lucide-react'; // Added HomeIcon
import { cvData } from '@/data/cv';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
 <>
    <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={onLinkClick}>
 Home
 </Link>
 <Link href="/#experience" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={onLinkClick}>
      Experience
    </Link>
    <Link href="/#volunteering" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={onLinkClick}>
      Volunteering
    </Link>
    <Link href="/#projects" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={onLinkClick}>
      Projects
    </Link>
    <Link href="/#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={onLinkClick}>
      Contact
    </Link>
  </>
);

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-center px-4 md:px-6">
          <nav className="hidden md:flex gap-6 items-center text-center">
            <NavLinks />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6">
                <div className="flex flex-col items-start gap-2">
                  <VisuallyHidden>
                    <DialogTitle>Mobile menu</DialogTitle>
                  </VisuallyHidden>
                 <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                  <nav className="flex flex-col gap-4 w-full">
                    <NavLinks onLinkClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 md:px-6">{children}</main>
      <footer className="py-8 md:px-6 md:py-10 border-t border-border/40">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            {cvData.socials.map(social => (
              <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {cvData.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
