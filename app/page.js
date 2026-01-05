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
              <button className="cta-button">Become a Prouda Tutor</button>
              <button className="cta-button">Hire a Tutor</button>
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
    </>
  );
}
