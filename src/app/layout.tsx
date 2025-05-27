import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/components/layout/main-layout';
import { Toaster } from "@/components/ui/toaster";
import { cvData } from '@/data/cv';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: `Yusuf Demir | Kişisel Web Sitesi`,
    template: `%s | Yusuf Demir`,
  },
  description: `${cvData.name}'in kişisel portfolyo ve özgeçmiş sitesi. ${cvData.title}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
