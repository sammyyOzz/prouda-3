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
    <section id="portfolio" className="portfolio">
      <div className="container">
        <h2 className="section-title fade-in">Courses</h2>
        <div className="portfolio-grid">
          {courses.map((course) => (
            <div key={course.id} className="portfolio-item">
              <div className="portfolio-image"></div>
              <div className="portfolio-content">
                <h4>{course.title}</h4>
                <p>{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}