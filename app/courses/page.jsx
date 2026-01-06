'use client';

import { useState } from 'react';

export default function Courses() {
  const [activeTab, setActiveTab] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course application submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        course: '',
        message: '',
      });
      setActiveTab(null);
    }, 3000);
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
      title: 'Creative Teacher Workshops',
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
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 bg-linear-to-b from-amber-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-800 mb-6">
              Our Courses
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A structured training program for beginners and transitioning teachers.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Cards Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">Explore Our Training Programs</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Choose the course that best fits your teaching journey</p>
            <div className="w-20 h-1 bg-amber-400 mx-auto mt-6"></div>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Card Header */}
                <div className="bg-linear-to-r from-amber-50 to-amber-100 p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{course.icon}</div>
                    <span className={`${course.badgeColor} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full`}>
                      {course.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-2">{course.title}</h3>
                  <p className="text-gray-700 text-base sm:text-lg">{course.shortDesc}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">{course.description}</p>

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h4 className="font-bold text-amber-800 mb-3 text-base sm:text-lg">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {course.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                          <span className="text-amber-500 font-bold mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 sm:p-8 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => setActiveTab(activeTab === course.id ? null : course.id)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    {activeTab === course.id ? 'Hide Details' : 'Learn More'}
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, course: course.title });
                      document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white border-2 border-amber-500 text-amber-600 font-semibold py-3 px-6 rounded-lg hover:bg-amber-50 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Course Details */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {courses.map((course) => (
            activeTab === course.id && (
              <div key={course.id} className="bg-white rounded-lg p-8 sm:p-10 lg:p-12 shadow-md border-l-4 border-amber-500">
                {/* Course Video */}
                {course.youtubeUrl && (
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-amber-800 mb-6">Course Overview Video</h3>
                    <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${course.youtubeUrl.split('v=')[1] || course.youtubeUrl.split('/')[3]}`}
                        title={course.title}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Full Description */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">About This Course</h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">{course.description}</p>
                </div>

                {/* All Benefits */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-amber-800 mb-6">What You'll Get</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg">
                        <span className="text-amber-600 font-bold text-xl mt-1">✓</span>
                        <span className="text-gray-700 text-base">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div>
                  <h3 className="text-2xl font-bold text-amber-800 mb-6">Who Is This Course For?</h3>
                  <p className="text-gray-700 text-base sm:text-lg mb-4">This course is ideal for:</p>
                  <ul className="space-y-3">
                    {course.idealFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Apply for your preferred course and join our community of educators.
            </p>
          </div>

          {/* Application Form */}
          <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-8 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-7xl mb-4">✓</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3">Application Submitted!</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  Thank you for applying to our course.
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  We'll review your application and get in touch within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-base"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label htmlFor="course" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Select Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-base"
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
                  <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Why are you interested in this course? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors resize-none text-base"
                    placeholder="Tell us about your teaching background and what you hope to achieve..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
                  >
                    Submit Application
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
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-amber-600 to-amber-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose Prouda Tutors?</h2>
            <p className="text-lg sm:text-xl text-amber-50 max-w-2xl mx-auto">
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
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-6">
            Ready to Transform Your Teaching Career?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Join hundreds of teachers who have already started their journey with Prouda Tutors.
          </p>
          <a
            href="#application-form"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
          >
            Apply for a Course Today
          </a>
        </div>
      </section>
    </>
  );
}
