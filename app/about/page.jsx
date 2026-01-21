'use client';

import { useEffect } from 'react';
import Image from 'next/image';

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

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 bg-[#f7dc6f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263d4d] mb-6">About Prouda Tutors</h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A teacher training and recruitment academy focused on preparing educators for global online teaching opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="slide-in-left">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/tutoring.avif"
                  alt="Prouda Tutors - Teachers teaching globally"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="slide-in-right px-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-6">Who We Are</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  We support teachers through <span className="font-semibold text-[#1b5276]">structured training</span>, professional certification, and access to international teaching roles.
                </p>
                <p className="text-lg leading-relaxed">
                  At Prouda Tutors, we believe every teacher deserves the opportunity to teach on a global stage. We're committed to breaking barriers and creating pathways for educators to succeed internationally.
                </p>
              </div>

              {/* Key Points Icons */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-4 items-start scale-in">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-100">
                      <svg className="h-6 w-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f7dc6f] mb-1">Comprehensive Training</h3>
                    <p className="text-gray-600">Industry-standard curriculum designed for global teaching excellence</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start scale-in" style={{ animationDelay: '0.1s' }}>
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-100">
                      <svg className="h-6 w-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f7dc6f] mb-1">Professional Certification</h3>
                    <p className="text-gray-600">Recognized credentials that open doors to international opportunities</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-100">
                      <svg className="h-6 w-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm8 0c1.66 0 2.99-1.34 2.99-3S25.66 5 24 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f7dc6f] mb-1">Global Placement Support</h3>
                    <p className="text-gray-600">Direct connections to schools and education companies worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-[#1b5276] to-[#153f5e] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 px-4">
            {/* Mission */}
            <div className="fade-in bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f7dc6f] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f7dc6f]">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To equip teachers with the skills, confidence, and opportunities to <span className="font-semibold text-[#1b5276]">teach globally</span>.
              </p>
            </div>

            {/* Vision */}
            <div className="fade-in bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f7dc6f]">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become a leading bridge between trained <span className="font-semibold text-[#1b5276]">African teachers</span> and global education institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Journey Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-4 fade-in">Our Growth Journey</h2>
            <p className="text-lg sm:text-xl text-gray-600 fade-in">Celebrating milestones and expanding our impact across continents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 px-4">
            {/* Stats Card 1 */}
            <div className="bg-linear-to-br from-[#F8F5ED] to-white border-2 border-[#f7dc6f]/30 rounded-lg p-8 sm:p-10 text-center hover:shadow-xl transition-all duration-300 scale-in">
              <div className="mb-6">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#f7dc6f] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold text-[#1b5276] mb-3">100+</h3>
              <p className="text-xl text-gray-700 font-semibold">Teachers Successfully Placed in Schools Worldwide</p>
            </div>

            {/* Stats Card 2 */}
            <div className="bg-linear-to-br from-[#F8F5ED] to-white border-2 border-[#f7dc6f]/30 rounded-lg p-8 sm:p-10 text-center hover:shadow-xl transition-all duration-300 scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="mb-6">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#f7dc6f] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5 9h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM5 5h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z" />
                </svg>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold text-[#1b5276] mb-3">20+</h3>
              <p className="text-xl text-gray-700 font-semibold">Partnerships with Schools across Asia, Europe & Middle East</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-[#1b5276] to-[#153f5e] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 fade-in">Join Our Community</h2>
          <p className="text-lg sm:text-xl text-white mb-10 leading-relaxed fade-in">
            Be part of a movement empowering teachers to teach without borders. Whether you're looking to advance your career or support teacher development, we're here for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 fade-in">
            <a
              href="/courses"
              className="inline-block bg-white hover:bg-[#F8F5ED] text-[#1b5276] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Training →
            </a>
            <a
              href="/contact"
              className="inline-block bg-[#f7dc6f] hover:bg-[#f7dc6f]/90 text-[#263d4d] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}