'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { SwitchTheme } from './ThemeSwitch';
import { ChevronDown } from 'lucide-react';
import { ImHome } from "react-icons/im";

const mainNavItems = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="flex items-center justify-between mb-12 px-4 relative">
      <Link
        className="relative z-10 transition-all duration-300 hover:rotate-12"
        href="/"
        aria-label="Home"
      >
        <span
          className={`font-bold text-sm tracking-widest transition-colors duration-300 ${isHomePage
            ? 'text-foreground/80'
            : 'text-foreground hover:text-foreground/60'
            }`}
        >
          <ImHome />
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        {mainNavItems.map(({ name, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              data-href={href}
              className={`relative z-10 text-sm font-medium transition-all duration-300 ${isActive
                ? 'text-foreground decoration-2'
                : 'text-foreground/70 hover:text-foreground'
                }`}
            >
              {name}
            </Link>
          );
        })}

        <SwitchTheme />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 p-2 transition-transform"
          aria-label="Toggle menu"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <SwitchTheme />
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 mt-2 bg-background border border-border rounded-md p-4 shadow-lg z-20">
          {mainNavItems.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                data-href={href}
                className={`block py-2 text-sm font-medium transition-all duration-300 ${isActive
                    ? 'text-foreground'
                    : 'text-foreground hover:text-foreground/60'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}