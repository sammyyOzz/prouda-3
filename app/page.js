import Countdown from '@/components/countdown';
import TestimonialsSlider from '@/components/testimonials-slider';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="min-h-screen bg-amber-800">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
        </div>

        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8 items-center lg:items-center mb-14">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-14 w-full lg:w-1/2">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight">Train. Teach.<br /> Earn Globally</h1>
            <p className="text-lg sm:text-2xl lg:text-3xl text-white max-w-full lg:max-w-[80%] leading-relaxed">
              Prouda Tutors trains, certifies, and connects teachers to global
              online teaching opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/courses" className="cta-button">Become a Prouda Tutor</Link>
              <Link href="/tutors#hire-tutor" className="cta-button">Hire a Tutor</Link>
            </div>
          </div>

          <div className="flex w-full lg:w-1/2 aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NY-V7BJnkKQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Stylish Tagline */}
        <div className="flex justify-center items-center pb-8 lg:pb-12">
          <div className="text-center">
            <p className="text-lg sm:text-xl lg:text-3xl text-white font-light tracking-wide italic">
              Empowering teachers to teach beyond borders.
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">What We Do</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1: Teacher Training */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 hover:bg-amber-200 transition-colors">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">Teacher Training</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">We equip aspiring and transitioning teachers with practical ESL teaching skills.</p>
            </div>

            {/* Card 2: Professional Certification */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 hover:bg-amber-200 transition-colors">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5 9h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM5 5h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">Professional Certification</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Our programs include certifications that support global teaching applications.</p>
            </div>

            {/* Card 3: Teacher Recruitment */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 hover:bg-amber-200 transition-colors">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm8 0c1.66 0 2.99-1.34 2.99-3S25.66 5 24 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">Teacher Recruitment</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">We connect trained teachers to schools and education companies worldwide.</p>
            </div>

            {/* Card 4: Ongoing Support */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 hover:bg-amber-200 transition-colors">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">Ongoing Support</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Through workshops and community learning, teachers continue to grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-r from-amber-700 to-amber-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">Trusted By</h2>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <p className="text-lg sm:text-xl lg:text-2xl text-white font-light">20+ partner schools/companies across Asia, Middle East and Europe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">What Our Teachers Say</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Hear from our community of educators and discover how Prouda Tutors is transforming teaching careers worldwide.</p>
            <div className="w-20 h-1 bg-amber-400 mx-auto mt-6"></div>
          </div>

          {/* Testimonials Slider */}
          <TestimonialsSlider />
        </div>
      </section>

      {/* Launching Soon Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">Launching Soon</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 lg:mb-16">Get ready for something amazing. Our platform is coming soon!</p>
            
            {/* Countdown Component */}
            <Countdown />
          </div>
        </div>
      </section>

      {/* Courses Highlight Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">Our Training Programs</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Explore our comprehensive courses designed to equip you with the skills needed to teach English globally.</p>
            <div className="w-20 h-1 bg-amber-400 mx-auto mt-6"></div>
          </div>

          {/* Courses Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 px-4">
            {/* Course Card 1 */}
            <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-3">Our Training Programs</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive curricula designed to transform aspiring teachers into confident ESL professionals ready for the global classroom.</p>
            </div>

            {/* Course Card 2 */}
            <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-3">ESL Teaching Practicum</h3>
              <p className="text-gray-600 leading-relaxed">Hands-on practical experience with real students, combining teaching methodology with live classroom interaction and feedback.</p>
            </div>

            {/* Course Card 3 */}
            <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-3">Upskill Teachers Program</h3>
              <p className="text-gray-600 leading-relaxed">Advanced training for experienced teachers looking to upgrade their certifications and expand their teaching opportunities worldwide.</p>
            </div>
          </div>

          {/* View Courses Button */}
          <div className="flex justify-center">
            <a
              href="/courses"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Courses →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-amber-600 to-amber-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Start Your Global Teaching Journey</h2>
          <p className="text-lg sm:text-xl text-amber-50 mb-10 leading-relaxed">Join thousands of teachers who are earning globally and making a difference in students' lives worldwide. Your journey starts here.</p>
          
          <a
            href="/courses"
            className="inline-block bg-white hover:bg-amber-50 text-amber-700 font-bold py-4 px-10 sm:py-5 sm:px-12 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
          >
            Explore Courses Now
          </a>
        </div>
      </section>
    </>
  );
}
