'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth/auth-provider';

// #f7dc6f, #1b5276, #F8F5ED - Color codes

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const moreRef = useRef(null);
  const userMenuRef = useRef(null);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

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
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
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

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tutors', href: '/tutors' },
    { name: 'Courses', href: '/courses' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const moreNavItems = [
    { name: 'Career Quiz', href: '/career-quiz' },
    { name: 'Platform Finder', href: '/platform-finder' },
    { name: 'Collaboration', href: '/collaboration' },
    { name: 'Video Script Generator', href: '/video-script-generator' },
    { name: 'Mock Interview', href: '/mock-interview' },
    { name: 'CV / Resume Builder', href: '/cv-builder' },
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

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {isAuthenticated ? (
              <div className="user-menu" ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-menu-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#1b5276',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  <span>{user?.first_name}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      listStyle: 'none',
                      padding: '8px 0',
                      minWidth: '160px',
                      zIndex: 1000,
                    }}
                  >
                    <li>
                      <span
                        style={{
                          display: 'block',
                          padding: '8px 16px',
                          color: '#666',
                          fontSize: '14px',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {user?.email}
                      </span>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 16px',
                          color: '#dc2626',
                          fontSize: '14px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: '8px 16px',
                    color: '#1b5276',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#1b5276',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#144058'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1b5276'}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

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
          {/* Mobile Auth Links */}
          <li style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '16px', paddingTop: '16px' }}>
            {isAuthenticated ? (
              <div style={{ padding: '0 20px' }}>
                <p style={{ color: '#f7dc6f', marginBottom: '8px', fontSize: '14px' }}>
                  Signed in as {user?.first_name}
                </p>
                <button
                  onClick={() => { handleLogout(); closeMobileMenu(); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 20px' }}>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '18px',
                    fontWeight: 500,
                  }}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  style={{
                    color: '#f7dc6f',
                    textDecoration: 'none',
                    fontSize: '18px',
                    fontWeight: 500,
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </li>
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
