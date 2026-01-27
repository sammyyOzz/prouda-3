'use client';

import { useState } from 'react';

export default function Courses() {
  const [activeTab, setActiveTab] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/courses/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          course: formData.course,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.isSuccess) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          course: '',
          message: '',
        });
        setActiveTab(null);

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(result.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Course application error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const courses = [
    {
      id: 'practicum',
      title: 'ESL Teaching Practicum Course',
      badge: 'Beginner-Friendly',
      badgeColor: 'bg-blue-500',
      icon: '📚',
      shortDesc: 'Hands-on training for aspiring online ESL tutors',
      youtubeUrl: 'https://youtu.be/dKWf7WI78bc',
      description: 'The ESL Teaching Practicum is a hands-on training program designed to prepare aspiring teachers to become confident, job-ready online ESL tutors.',
      benefits: [
        'Earn a recognized teaching certification',
        'Build professional teaching materials',
        'Practice real interview and demo lessons',
        'Gain access to exclusive ESL job opportunities',
        'Learn in a supportive community',
        'Launch your ESL teaching career and start earning',
      ],
      idealFor: [
        'Beginners with little or no teaching experience',
        'Aspiring online ESL tutors',
        'Teachers looking to transition into online teaching',
        'Individuals seeking a structured, practical ESL training program',
        'Anyone who wants real practice, guidance, and job support',
      ],
    },
    {
      id: 'upskill',
      title: 'Upskill Teachers Program',
      badge: 'Advanced Level',
      badgeColor: 'bg-purple-500',
      icon: '⭐',
      shortDesc: 'Advanced training for experienced ESL teachers',
      description: 'The Upskill Teachers Program is an advanced training course designed for experienced online ESL teachers who want to grow, earn more, and position themselves for higher-paying opportunities.',
      benefits: [
        'Refine your teaching skills to stand out',
        'Strengthen your professional brand',
        'Learn how to attract better schools and private students',
        'Advanced classroom management techniques',
        'Effective use of AI and 21st-century teaching tools',
        'Strategies for becoming indispensable to schools',
        'Practical guidance on finding and working with private students',
        'Position yourself for raises and transitions',
      ],
      idealFor: [
        'ESL teachers already teaching online',
        'Teachers with experience who want more students or better-paying companies',
        'Tutors looking to request raises or renegotiate pay',
        'Teachers who want to attract private students or go independent',
        'Educators ready to use advanced tools and modern teaching strategies',
      ],
    },
    {
      id: 'creative',
      title: 'Creative Teacher Workshop',
      badge: 'FREE Community',
      badgeColor: 'bg-green-500',
      icon: '🎨',
      shortDesc: 'Free collaborative learning sessions for ESL teachers',
      description: 'Our Creative Teacher Workshops are free, collaborative learning sessions where ESL teachers come together to learn, share, and grow.',
      benefits: [
        'Explore diverse ESL topics from teaching young learners to teaching adults',
        'Learn practical and modern methodologies',
        'Connect with teachers from across Africa and beyond',
        'Access to WhatsApp teacher community',
        'Access to all Creative Workshops',
        'Collaborative learning environment',
      ],
      idealFor: [
        'Online ESL teachers seeking community',
        'Teachers who want to learn new methodologies',
        'Educators interested in practical teaching strategies',
        'Professionals looking to expand their network',
        'Anyone wanting to grow alongside other ESL teachers',
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 bg-[#f7dc6f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263d4d] mb-6">
              Our Courses
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#263d4d] max-w-3xl mx-auto leading-relaxed">
              A structured training program for beginners and transitioning teachers.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Sections */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-4">Explore Our Training Programs</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Choose the course that best fits your teaching journey</p>
            <div className="w-20 h-1 bg-[#f7dc6f] mx-auto mt-6"></div>
          </div>

          {/* Individual Course Sections */}
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Left Column - Information */}
              <div className={`${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="bg-white p-8">
                  {/* Badge and Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl sm:text-6xl">{course.icon}</div>
                    <span className={`${course.badgeColor} text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full h-fit`}>
                      {course.badge}
                    </span>
                  </div>

                  {/* Title and Short Description */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f7dc6f] mb-4">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  {/* Full Description */}
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    {course.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="mb-8">
                    <h4 className="font-bold text-[#f7dc6f] mb-4 text-lg">Key Benefits:</h4>
                    <ul className="space-y-3">
                      {course.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start gap-3 text-base text-gray-700">
                          <span className="text-[#1b5276] font-bold text-lg mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-10 bg-[#f7dc6f]/10 p-6 rounded-lg">
                    <h4 className="font-bold text-[#f7dc6f] mb-4 text-lg">Ideal For:</h4>
                    <ul className="space-y-2">
                      {course.idealFor.map((item, iidx) => (
                        <li key={iidx} className="flex items-start gap-3 text-base text-gray-700">
                          <span className="text-[#1b5276] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => {
                      setFormData({ ...formData, course: course.title });
                      document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Right Column - Video or Image */}
              <div className={`${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-full min-h-96 flex items-center justify-center">
                  {/* YouTube Video */}
                  {course.youtubeUrl && (
                    <div className="w-full h-full">
                      <div className="relative w-full h-full pb-[56.25%] lg:pb-0 lg:h-96">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full lg:relative"
                          src={`https://www.youtube.com/embed/${course.youtubeUrl.split('v=')[1] || course.youtubeUrl.split('/')[3]}`}
                          title={course.title}
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {/* Fallback Image if No Video */}
                  {!course.youtubeUrl && (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-amber-100 to-amber-200">
                      <div className="text-center">
                        <div className="text-7xl mb-4">{course.icon}</div>
                        <p className="text-lg font-semibold text-amber-900">{course.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* Application Form Section */}
      <section id="application-form" className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Apply for your preferred course and join our community of educators.
            </p>
          </div>

          {/* Application Form */}
          <div className="bg-linear-to-br from-[#F8F5ED] to-[#F8F5ED] border-2 border-[#f7dc6f]/30 rounded-lg p-8 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-7xl mb-4">✓</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f7dc6f] mb-3">Application Submitted!</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  Thank you for applying to our course.
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  We'll review your application and get in touch within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="text-red-800 text-sm sm:text-base">{error}</p>
                  </div>
                )}
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors text-base"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors text-base"
                    placeholder="Enter your last name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors text-base"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label htmlFor="course" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                    Select Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors text-base"
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                    Why are you interested in this course? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors resize-none text-base"
                    placeholder="Tell us about your teaching background and what you hope to achieve..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                  We typically review applications within 24-48 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Prouda Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-[#1b5276] to-[#153f5e] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose Prouda Tutors?</h2>
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto">
              Industry-leading training with real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🎓', title: 'Certified Trainers', desc: 'Learn from experienced educators' },
              { icon: '💼', title: 'Job Support', desc: 'Access to exclusive job opportunities' },
              { icon: '🌍', title: 'Global Community', desc: 'Network with teachers worldwide' },
              { icon: '⚡', title: 'Practical Training', desc: 'Real-world teaching scenarios' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 sm:p-8 text-center hover:bg-opacity-20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-6">
            Ready to Transform Your Teaching Career?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Join hundreds of teachers who have already started their journey with Prouda Tutors.
          </p>
          <a
            href="#application-form"
            className="inline-block bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
          >
            Apply for a Course Today
          </a>
        </div>
      </section>
    </>
  );
}
