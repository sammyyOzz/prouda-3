'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      type: 'video',
      id: 'oyvseOS2g0w',
      title: 'Testimonial 1',
    },
    {
      type: 'image',
      src: '/testimonials/1.png',
      alt: 'Testimonial 1',
    },
    {
      type: 'video',
      id: 'lvVJY4f0SnE',
      title: 'Testimonial 2',
    },
    {
      type: 'image',
      src: '/testimonials/2.png',
      alt: 'Testimonial 2',
    },
    {
      type: 'video',
      id: '8SGMlgF3-EA',
      title: 'Testimonial 3',
    },
    {
      type: 'image',
      src: '/testimonials/3.png',
      alt: 'Testimonial 3',
    },
    {
      type: 'video',
      id: 'py5_5qko4PI',
      title: 'Testimonial 4',
    },
    {
      type: 'image',
      src: '/testimonials/4.png',
      alt: 'Testimonial 4',
    },
    {
      type: 'image',
      src: '/testimonials/5.png',
      alt: 'Testimonial 5',
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="space-y-8 px-4">
      {/* Main Slider */}
      <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
        {/* Slide Container */}
        <div className={`relative w-full aspect-video ${currentTestimonial.type === 'image' ? 'bg-gray-900 flex items-center justify-center' : ''}`}>
          {currentTestimonial.type === 'video' ? (
            <iframe
              key={`video-${currentIndex}`}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentTestimonial.id}?autoplay=1&mute=1`}
              title={currentTestimonial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0"
            ></iframe>
          ) : (
            <Image
              src={currentTestimonial.src}
              alt={currentTestimonial.alt}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {currentIndex + 1} / {testimonials.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-0 py-3 sm:py-2 justify-start sm:justify-start">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-2 ring-amber-500 scale-105'
                : 'ring-1 ring-gray-300 hover:ring-amber-300'
            }`}
          >
            {testimonial.type === 'video' ? (
              <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-800 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                  YT
                </span>
              </div>
            ) : (
              <Image
                src={testimonial.src}
                alt={testimonial.alt}
                width={80}
                height={96}
                className="w-16 h-20 sm:w-20 sm:h-24 object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="flex gap-2 justify-center">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-amber-500 w-3 h-3'
                : 'bg-gray-300 w-2 h-2 hover:bg-amber-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            isAutoPlay
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {isAutoPlay ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </div>
  );
}
