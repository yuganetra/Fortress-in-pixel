// app/layout.tsx

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { AppProvider } from '@/providers/app-provider';
import { Toaster } from 'sonner';
import Navbar from './(home)/_components/Navbar';

const font = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://yuvrajsinghlodh.vercel.app/'),
  title: {
    template: '%s | Fortress in Pixels',
    default: 'Fortress in Pixels',
  },
  authors: {
    name: 'Yuvraj',
  },
  icons: {
    icon: '/favicon.ico',
  },
  description: "Welcome to ExploreIndia.com, your ultimate guide to the rich and diverse cultural heritage of India! Discover the magnificent monuments that showcase the architectural marvels and historical significance of this vibrant country.",
  openGraph: {
    title: 'Fortress in Pixels',
    description: "Welcome to ExploreIndia.com, your ultimate guide to the rich and diverse cultural heritage of India! Discover the magnificent monuments that showcase the architectural marvels and historical significance of this vibrant country.",
    url: 'https://yuvrajsinghlodhi.vercel.app/',
    siteName: 'Fortress in Pixels',
    images: '/project-1.png',
    type: 'website',
  },
  keywords: ['Fortress', 'Fortress in Pixels', 'FortressinPixels'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar className="navbar-class hidden" isFooter={false} />
            {children}
            <Toaster richColors />
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
