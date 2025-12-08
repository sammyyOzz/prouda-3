'use client';

import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title fade-in">About Us</h2>
        <div className="about-content">
          <div className="about-image slide-in-left"></div>
          <div className="about-text slide-in-right">
            <h3>Lorem ipsum dolor sit amet consecutor</h3>
            <p>Lorem ipsum dolor sit amet consecutor, Lorem ipsum dolor sit amet consecutor Lorem ipsum dolor sit amet consecutor Lorem ipsum dolor sit amet consecutor.</p>
            <p>Lorem ipsum dolor sit amet consecutor, Lorem ipsum dolor sit amet consecutor Lorem ipsum dolor sit amet consecutor Lorem ipsum dolor sit amet consecutor.</p>
            <p>Lorem ipsum dolor sit amet consecutor, Lorem ipsum dolor sit amet consecutor Lorem ipsum dolor sit amet consecutor Lorem ipsum dolor sit amet consecutor.</p>
          </div>
        </div>
      </div>
    </section>
  );
}