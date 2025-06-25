'use client';

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

// export const metadata = {
//   title: 'Auth App',
//   description: 'Next.js Auth App by Riya',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-cover bg-center text-white transition-colors duration-300 relative"
        style={{ backgroundImage: "url('/images.jpg')" }}>

        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/20 dark:bg-black/30 backdrop-blur-lg">
          <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-wide">
            <img src="/authlogo.JPG" className="w-8 h-8 rounded-full" />
            <span>Auth App</span>
          </Link>

         
        </header>

        {/* Page content */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
