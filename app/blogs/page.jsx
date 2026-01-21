'use client';

import { useEffect } from 'react';

export default function Courses() {
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

    // Staggered animation for portfolio items
    const portfolioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.portfolio-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    const portfolioSection = document.querySelector('.portfolio-grid');
    if (portfolioSection) {
      portfolioObserver.observe(portfolioSection);
    }

    return () => {
      observer.disconnect();
      portfolioObserver.disconnect();
    };
  }, []);

  const courses = [
    {
      id: 1,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor.'
    },
    {
      id: 2,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor.'
    },
    {
      id: 3,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor.'
    },
    {
      id: 4,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor.'
    },
    {
      id: 5,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor.'
    },
    {
      id: 6,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor, ipsum dolor sit amet consecutor.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 bg-[#f7dc6f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263d4d] mb-6">
              Our Blogs
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Insights, tips, and stories from the world of online teaching
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {courses.map((course) => (
              <div key={course.id} className="portfolio-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="portfolio-image h-48 bg-linear-to-br from-[#f7dc6f] to-[#f7dc6f]/70"></div>
                <div className="portfolio-content p-6">
                  <h4 className="text-xl font-bold text-[#f7dc6f] mb-3">{course.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">{course.description}</p>
                  <a href="#" className="inline-block text-[#1b5276] hover:text-[#153f5e] font-semibold transition-colors">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}