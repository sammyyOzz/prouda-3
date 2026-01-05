'use client';

import { useState } from 'react';

export default function Collaboration() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    partnershipType: '',
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
    console.log('Partnership form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        partnershipType: '',
        message: '',
      });
    }, 3000);
  };

  const partnershipTypes = [
    {
      id: 'hire',
      icon: '👨‍🏫',
      title: 'Hire Tutors',
      description: 'Access our pool of trained and certified ESL teachers for your institution',
      link: '/tutors',
    },
    {
      id: 'training',
      icon: '📚',
      title: 'Training Partnerships',
      description: 'Partner with us to deliver structured training, workshops, and capacity-building programs',
      benefits: [
        'Train teachers, tutors, and educators (online or in-person)',
        'Host skill-based workshops on online teaching, ESL instruction, curriculum design',
        'Support teacher upskilling and retraining programs',
        'Co-create custom training tailored to your audience',
      ],
    },
    {
      id: 'events',
      icon: '🎤',
      title: 'Events & Workshops',
      description: 'Collaborate with us for educational events, speaking engagements, and learning experiences',
      benefits: [
        'Educational conferences, summits, and webinars',
        'Teacher-focused events, panels, and live sessions',
        'Online or physical masterclasses',
        'Community or brand-hosted events on education and digital skills',
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
              Partner With Us
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
              Connecting trained African teachers to global schools
            </p>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Prouda Tutors collaborates with schools, platforms, and organizations to provide trained and certified teachers for global education needs.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">Partnership Opportunities</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Explore the different ways we can collaborate</p>
            <div className="w-20 h-1 bg-amber-400 mx-auto mt-6"></div>
          </div>

          {/* Partnership Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Hire Tutors Card */}
            <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-8 sm:p-10 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl mb-4">{partnershipTypes[0].icon}</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3">{partnershipTypes[0].title}</h3>
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">{partnershipTypes[0].description}</p>
              <a
                href={partnershipTypes[0].link}
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Browse Tutors →
              </a>
            </div>

            {/* Training Partnerships Card */}
            <div className="bg-linear-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-8 sm:p-10 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl mb-4">{partnershipTypes[1].icon}</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">{partnershipTypes[1].title}</h3>
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">{partnershipTypes[1].description}</p>
              <ul className="space-y-3 mb-6">
                {partnershipTypes[1].benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#form"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Learn More →
              </a>
            </div>

            {/* Events & Workshops Card */}
            <div className="bg-linear-to-br from-purple-50 to-white border-2 border-purple-200 rounded-lg p-8 sm:p-10 hover:shadow-lg transition-all duration-300">
              <div className="text-6xl mb-4">{partnershipTypes[2].icon}</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">{partnershipTypes[2].title}</h3>
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">{partnershipTypes[2].description}</p>
              <ul className="space-y-3 mb-6">
                {partnershipTypes[2].benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <span className="text-purple-600 font-bold mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#form"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Training Partnerships Details */}
          <div className="bg-white rounded-lg p-8 sm:p-10 lg:p-12 border-l-4 border-blue-600 shadow-md">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">📚</div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2">Training Partnerships</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  For schools, organisations, institutions, brands, and communities
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              This section is for schools, organisations, institutions, brands, and communities that would like to partner with us to deliver structured training, workshops, or capacity-building programs.
            </p>

            <h4 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">We collaborate with partners to:</h4>
            <ul className="space-y-3 mb-8 ml-4">
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                <span>Train teachers, tutors, and educators (online or in-person)</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                <span>Host skill-based workshops on online teaching, ESL instruction, curriculum design, classroom management, and digital teaching tools</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                <span>Support teacher upskilling, onboarding, and retraining programs</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                <span>Co-create custom training sessions tailored to your audience's needs</span>
              </li>
            </ul>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Whether you're a school, education company, NGO, startup, or learning community, we work closely with you to design training that is practical, impactful, and results-driven.
            </p>
          </div>

          {/* Events & Workshops Details */}
          <div className="bg-white rounded-lg p-8 sm:p-10 lg:p-12 border-l-4 border-purple-600 shadow-md">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">🎤</div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-900 mb-2">Events & Workshops</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  For event organisers, brands, institutions, and communities
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              This section is for event organisers, brands, institutions, and communities looking to collaborate with us for educational events, speaking engagements, or learning experiences.
            </p>

            <h4 className="text-xl sm:text-2xl font-bold text-purple-900 mb-4">We are open to participating in:</h4>
            <ul className="space-y-3 mb-8 ml-4">
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-purple-600 font-bold">•</span>
                <span>Educational conferences, summits, and webinars</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-purple-600 font-bold">•</span>
                <span>Teacher-focused events, panels, and live sessions</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-purple-600 font-bold">•</span>
                <span>Online or physical learning events and masterclasses</span>
              </li>
              <li className="flex items-start gap-3 text-base sm:text-lg text-gray-700">
                <span className="text-purple-600 font-bold">•</span>
                <span>Community or brand-hosted events related to education, online work, or digital skills</span>
              </li>
            </ul>

            <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
              Our involvement can include speaking, training, hosting sessions, moderating panels, or co-creating valuable educational content for your audience.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section id="form" className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below with your partnership details and our team will get in touch within 24-48 hours.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-8 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-7xl mb-4">✓</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3">Thank You!</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  Your partnership inquiry has been submitted successfully.
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  We'll review your details and get in touch soon.
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

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Company/Organization Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-base"
                    placeholder="Enter your organization name"
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

                {/* Partnership Type */}
                <div>
                  <label htmlFor="partnershipType" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Partnership Type *
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-base"
                  >
                    <option value="">Select a partnership type</option>
                    <option value="Hire Tutors">Hire Tutors</option>
                    <option value="Training Partnerships">Training Partnerships</option>
                    <option value="Events & Workshops">Events & Workshops</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-amber-800 mb-2">
                    Message / Additional Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors resize-none text-base"
                    placeholder="Tell us about your partnership interests, project details, timeline, and any specific requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
                  >
                    Submit Partnership Inquiry
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                  We typically respond to partnership inquiries within 24-48 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-amber-600 to-amber-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Why Partner With Prouda Tutors?</h2>
            <p className="text-lg sm:text-xl text-amber-50 max-w-2xl mx-auto">
              We bring expertise, commitment, and results to every partnership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '✓', title: 'Trained Teachers', desc: 'Certified professionals ready for global impact' },
              { icon: '🌍', title: 'Global Reach', desc: 'Access to qualified teachers across Africa' },
              { icon: '🎯', title: 'Tailored Solutions', desc: 'Custom programs designed for your needs' },
              { icon: '📈', title: 'Results-Driven', desc: 'Proven track record of successful partnerships' },
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-6">
            Let's Create Impact Together
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're looking to hire trained teachers, deliver training programs, or collaborate on educational events, Prouda Tutors is ready to partner with you.
          </p>
          <a
            href="#form"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
          >
            Start Your Partnership Journey
          </a>
        </div>
      </section>
    </>
  );
}
