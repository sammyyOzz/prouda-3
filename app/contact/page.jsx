"use client"

import React, { useEffect } from "react";

export default function Contact() {
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
  
      return () => {
        observer.disconnect();
      };
    }, []);

  return (
    <section class="contact">
      <div class="contact-floating-shapes">
        <div class="contact-shape contact-shape-1"></div>
        <div class="contact-shape contact-shape-2"></div>
        <div class="contact-shape contact-shape-3"></div>
        <div class="contact-shape contact-shape-4"></div>
        <div class="contact-shape contact-shape-5"></div>
        <div class="contact-shape contact-shape-6"></div>
      </div>
      <div class="container">
        <h2 class="section-title fade-in">Contact Us</h2>

        <div class="contact-info-grid">
          <div class="contact-info-card">
            <div class="contact-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3>Phone</h3>
            <p>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
          </div>

          <div class="contact-info-card">
            <div class="contact-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <h3>Email</h3>
            <p>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </p>
          </div>

          <div class="contact-info-card">
            <div class="contact-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3>Address</h3>
            <p>
              123 ABC Street
              <br />
              lorem ipsum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
