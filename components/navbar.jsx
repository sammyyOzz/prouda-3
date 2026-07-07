'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// #f7dc6f, #1b5276, #F8F5ED - Color codes

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menus on route change
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    document.body.style.overflow = 'auto';
  }, [pathname]);

  useEffect(() => {
    // Handle body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        if (isMoreOpen) {
          setIsMoreOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isMoreOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tutors', href: '/tutors' },
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' },
  ];

  const moreNavItems = [
    { name: 'Career Quiz', href: '/career-quiz' },
    { name: 'Platform Finder', href: '/platform-finder' },
    { name: 'Collaboration', href: '/collaboration' },
    { name: 'Video Script Generator', href: '/video-script-generator' },
    // { name: 'Blogs', href: '/blogs' },
  ];

  const isMoreActive = moreNavItems.some((item) => item.href === pathname);
  const allNavItems = [...mainNavItems, ...moreNavItems];

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
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={pathname === item.href ? 'active' : ''}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="nav-dropdown" ref={moreRef}>
              <button
                type="button"
                className={`nav-dropdown-toggle ${isMoreActive ? 'active' : ''}`}
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                More
                <svg
                  className={`nav-dropdown-chevron ${isMoreOpen ? 'open' : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isMoreOpen && (
                <ul className="nav-dropdown-menu">
                  {moreNavItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={pathname === item.href ? 'active' : ''}
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
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
          {allNavItems.map((item, index) => (
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
