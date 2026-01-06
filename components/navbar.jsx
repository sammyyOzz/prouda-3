'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [pathname]);

  useEffect(() => {
    // Handle body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tutors', href: '/tutors' },
    { name: 'Courses', href: '/courses' },
    { name: 'Collaboration', href: '/collaboration' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container relative h-16">
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
            <Image
              src="/prouda-logo.webp"
              alt="Prouda Tutors Logo"
              width={70}
              height={100}
              priority
              className="h-auto w-auto"
            />
          </Link>
          <div className='invisible'>.</div>
          
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
          
          <div
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            id="mobileMenuToggle"
            onClick={toggleMobileMenu}
            role="button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="hamburger"></div>
            <div className="hamburger"></div>
            <div className="hamburger"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        id="mobileMenu"
      >
        <ul className="mobile-nav-links">
          {navItems.map((item, index) => (
            <li key={item.name} style={{ transitionDelay: `${(index + 1) * 0.1}s` }}>
              <Link href={item.href} onClick={closeMobileMenu}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}