'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { SwitchTheme } from './ThemeSwitch';
import { ChevronDown } from 'lucide-react';
import { ImHome } from "react-icons/im";
import { trackEvent } from '@/lib/analytics';

const mainNavItems = [
  { name: 'About', href: '/about' },
  { name: 'Research', href: '/research' },
  { name: 'Projects', href: '/projects' },
  { name: 'Writeups', href: '/writeups' },
  { name: 'Blog', href: '/blog' },
  { name: 'Certifications', href: '/certifications' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const mobileMenuId = 'mobile-navigation-menu';

  const handleNavigationClick = (href: string, source: 'desktop' | 'mobile') => {
    trackEvent('internal_navigation_click', {
      source,
      href,
    });
  };

  return (
    <header className="relative mb-12 flex items-center justify-between px-4" aria-label="Primary">
      <Link
        className="relative z-10 transition-all duration-300 hover:rotate-12"
        href="/"
        aria-label="Home"
        onClick={() => handleNavigationClick('/', 'desktop')}
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

      <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-6">
        {mainNavItems.map(({ name, href }) => {
          const isActive =
            pathname === href ||
            (href === '/blog' && pathname.startsWith('/blog/')) ||
            (href === '/writeups' && pathname.startsWith('/writeups/'));
          return (
            <Link
              key={href}
              href={href}
              data-href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative z-10 text-sm font-medium transition-all duration-300 ${isActive
                ? 'text-foreground decoration-2'
                : 'text-foreground/70 hover:text-foreground'
                }`}
              onClick={() => handleNavigationClick(href, 'desktop')}
            >
              {name}
            </Link>
          );
        })}

        <SwitchTheme />
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 p-2 transition-transform"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls={mobileMenuId}
          type="button"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <SwitchTheme />
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav
          id={mobileMenuId}
          aria-label="Mobile navigation"
          className="md:hidden absolute top-full right-0 mt-2 bg-background border border-border rounded-md p-4 shadow-lg z-20"
        >
          {mainNavItems.map(({ name, href }) => {
            const isActive =
              pathname === href ||
              (href === '/blog' && pathname.startsWith('/blog/')) ||
              (href === '/writeups' && pathname.startsWith('/writeups/'));
            return (
              <Link
                key={href}
                href={href}
                data-href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`block py-2 text-sm font-medium transition-all duration-300 ${isActive
                    ? 'text-foreground'
                    : 'text-foreground hover:text-foreground/60'
                  }`}
                onClick={() => {
                  setIsOpen(false);
                  handleNavigationClick(href, 'mobile');
                }}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}