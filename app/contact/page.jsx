'use client';

import { useState } from 'react';
import FacebookIcon from '@/icons/facebook';
import InstagramIcon from '@/icons/instagram';
import YoutubeIcon from '@/icons/youtube';
import TiktokIcon from '@/icons/tiktok';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/proudatutors?igsh=MW9pYmN0dTdnYXUxaA==',
      color: 'hover:text-pink-600',
    },
    {
      name: 'YouTube',
      icon: YoutubeIcon,
      url: 'https://www.youtube.com/@proudatutorsbychimy',
      color: 'hover:text-red-600',
    },
    {
      name: 'TikTok',
      icon: TiktokIcon,
      url: 'https://www.tiktok.com/@proudatutors?_r=1&_t=ZS-92Ku2zatFIK',
      color: 'hover:text-gray-900',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: 'https://www.facebook.com/share/1GM62TNXZq/',
      color: 'hover:text-blue-600',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 bg-[#f7dc6f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263d4d] mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#263d4d] max-w-3xl mx-auto leading-relaxed">
              We would love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-10 px-4">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-6">Get In Touch</h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                  Have questions about our courses, partnerships, or anything else? We're here to help! Reach out to us through any of the channels below.
                </p>
              </div>

              {/* Email */}
              <div className="bg-linear-to-r from-[#F8F5ED] to-[#F8F5ED] border-2 border-[#f7dc6f]/30 rounded-lg p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">✉️</div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f7dc6f] mb-2">Email</h3>
                    <p className="text-gray-600 text-base sm:text-lg mb-3">
                      Feel free to reach out to us directly via email
                    </p>
                    <a
                      href="mailto:proudatutors@gmail.com"
                      className="inline-block text-[#1b5276] hover:text-[#153f5e] font-semibold text-base sm:text-lg transition-colors"
                    >
                      proudatutors@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#f7dc6f] mb-6">Follow Us</h3>
                <p className="text-gray-600 text-base sm:text-lg mb-6">
                  Connect with us on social media for updates, tips, and community highlights
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#f7dc6f] transition-all duration-300 ${link.color}`}
                      >
                        <div className="mb-2">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-semibold text-gray-700">{link.name}</p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 sm:p-8 rounded-r-lg">
                <h4 className="font-bold text-blue-900 mb-2">Quick Response</h4>
                <p className="text-blue-800 text-base">
                  We typically respond to emails within 24-48 hours. For urgent inquiries, please use the contact form below.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div id="send-message" className="px-4">
              <div className="bg-linear-to-br from-[#F8F5ED] to-[#F8F5ED] border-2 border-[#f7dc6f]/30 rounded-lg p-8 sm:p-10 lg:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f7dc6f] mb-2">Send Us a Message</h3>
                <p className="text-gray-600 text-base mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-12 bg-green-50 rounded-lg">
                    <div className="text-6xl mb-4">✓</div>
                    <h4 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h4>
                    <p className="text-green-700">
                      Thank you for reaching out. We'll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors text-base"
                        placeholder="Enter your full name"
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

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors text-base"
                        placeholder="What is this about?"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors resize-none text-base"
                        placeholder="Tell us your message or inquiry..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg sm:text-xl text-gray-600">Have questions? We might have answers!</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How long does it take to get a response?',
                a: 'We aim to respond to all inquiries within 24-48 hours during business days.',
              },
              {
                q: 'Can I apply for multiple courses?',
                a: 'Yes! You can apply for multiple courses. Just fill out separate application forms for each course.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Please contact us directly at proudatutors@gmail.com for information about our refund policy.',
              },
              {
                q: 'How can I become a partner?',
                a: 'Visit our Collaboration & Partnership page to learn about partnership opportunities and submit your inquiry.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border-l-4 border-[#f7dc6f] rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-[#f7dc6f] mb-3">{faq.q}</h3>
                <p className="text-gray-700 text-base sm:text-lg">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-[#1b5276] to-[#153f5e] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed max-w-2xl mx-auto">
            Whether you're ready to start your teaching journey or looking to partner with us, we're excited to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="#send-message"
              className="inline-block bg-white text-[#1b5276] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg hover:bg-[#F8F5ED] transition-all duration-300 shadow-lg text-base sm:text-lg"
            >
              Send a Message
            </a>
            <a
              href="/courses"
              className="inline-block border-2 border-white text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg hover:bg-white hover:text-[#1b5276] transition-all duration-300 text-base sm:text-lg"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
