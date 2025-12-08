'use client';

import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // Parallax effect for hero background
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
      }
      ticking = false;
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
      </div>
      <div className="hero-content">
        <div className="hero-subtitle">Lorem ipsum</div>
        <h1>The main title goes here</h1>
        <p className="subtitle">Lorem ipsum dolor sit amet consecutor...</p>
        {/* <a href="portfolio.html" className="cta-button">Explore My Work</a> */}
      </div>
      {/* <div className="scroll-indicator" onClick={() => window.location.href='about.html'}></div> */}
    </section>
  );
}