"use client";

import { useState } from "react";
import Image from "next/image";

const tutors = [
  {
    id: 1,
    name: "Teacher Festi",
    image: "/tutors/festi.jpg",
    niche: "Kids | IELTS | Business",
  },
  {
    id: 2,
    name: "Teacher Rachael",
    image: "/tutors/rachael.jpg",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 3,
    name: "Teacher Zayy",
    image: "/tutors/zayy.jpg",
    niche: "Kids | General English",
  },
  {
    id: 4,
    name: "Teacher Bee",
    image: "/tutors/bee.png",
    niche: "Kids | IELTS | Business",
  },
  {
    id: 5,
    name: "Teacher Ruth",
    image: "/tutors/ruth.jpg",
    niche: "Kids | Phonics",
  },
  {
    id: 6,
    name: "Teacher Mary",
    image: "/tutors/mary.jpg",
    niche: "Kids | Conversational",
  },
  {
    id: 7,
    name: "Teacher Lilian",
    image: "/tutors/lilian.jpg",
    niche: "Kids | Phonics | Business",
  },
  {
    id: 8,
    name: "Teacher Rosie",
    image: "/tutors/rosie.png",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 9,
    name: "Teacher Lovelyn",
    image: "/tutors/lovelyn.jpg",
    niche: "Kids | Phonics",
  },
  {
    id: 10,
    name: "Teacher Rich",
    image: "/tutors/rich.jpg",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 11,
    name: "Teacher Esther",
    image: "/tutors/esther.jpg",
    niche: "Kids | Medical English",
  },
  {
    id: 12,
    name: "Teacher Annie",
    image: "/tutors/annie.jpg",
    niche: "Kids | French | Phonics",
  },
  {
    id: 13,
    name: "Teacher Fyne",
    image: "/tutors/fyne.jpg",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 14,
    name: "Teacher Enchy",
    image: "/tutors/enchy.jpg",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 15,
    name: "Teacher Eli",
    image: "/tutors/eli.png",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 16,
    name: "Teacher Bibi",
    image: "/tutors/bibi.jpg",
    niche: "Kids | Conversational",
  },
  {
    id: 17,
    name: "Teacher Jessica",
    image: "/tutors/jessica.jpg",
    niche: "Kids | IELTS | Business",
  },
  {
    id: 18,
    name: "Teacher Praise",
    image: "/tutors/praise.jpg",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 19,
    name: "Teacher Nika",
    image: "/tutors/nika.png",
    niche: "Kids | Business | Academic",
  },
  {
    id: 20,
    name: "Teacher Gika",
    image: "/tutors/gika.jpg",
    niche: "Kids | Phonics | Conversational",
  },
  {
    id: 21,
    name: "Teacher Faith",
    image: "/tutors/faith.jpg",
    niche: "Kids | Conversational",
  },
  {
    id: 22,
    name: "Teacher Alice",
    image: "/tutors/alice.png",
    niche: "Kids | Academic English",
  },
  {
    id: 23,
    name: "Teacher Nnenne",
    image: "/tutors/nnenne.png",
    niche: "Kids | Phonics | PET",
  },
  {
    id: 24,
    name: "Teacher Miracle",
    image: "/tutors/miracle.png",
    niche: "Kids | Adults | Phonics",
  },
  {
    id: 25,
    name: "Teacher Feyy",
    image: "/tutors/feyy.png",
    niche: "Kids | PET | Conversational",
  },
  {
    id: 26,
    name: "Teacher Menim",
    image: "/tutors/menim.png",
    niche: "Kids | Business | Spelling",
  },
  {
    id: 27,
    name: "Teacher Shere",
    image: "/tutors/shere.jpg",
    niche: "Kids | Adults | Diction",
  },
  {
    id: 28,
    name: "Teacher Esther",
    image: "/tutors/esther-2.jpg",
    niche: "IELTS | CAE | PET | KET",
  },
  {
    id: 29,
    name: "Teacher Oby",
    image: "/tutors/oby.jpg",
    niche: "Kids | Phonics | PET",
  },
  {
    id: 30,
    name: "Teacher Amen",
    image: "/tutors/amen.png",
    niche: "Kids | Young Adults | Phonics",
  },
  {
    id: 31,
    name: "Teacher Prince",
    image: "/tutors/prince.png",
    niche: "Kids | PET | KET",
  },
  {
    id: 32,
    name: "Teacher Rossy",
    image: "/tutors/rossy.png",
    niche: "Teenagers | Business",
  },
  {
    id: 33,
    name: "Teacher Temmy",
    image: "/tutors/temmy.jpg",
    niche: "General | Conversational",
  },
  {
    id: 34,
    name: "Teacher Susan",
    image: "/tutors/susan.png",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 35,
    name: "Teacher AJ",
    image: "/tutors/aj.png",
    niche: "Kids | Phonics | KET | PET",
  },
  {
    id: 36,
    name: "Teacher Ceecee",
    image: "/tutors/ceecee.png",
    niche: "Kids | Phonics | Vocabulary",
  },
];

const benefits = [
  {
    icon: "✓",
    title: "Trained",
    description: "Certified through our rigorous training program",
  },
  {
    icon: "🔍",
    title: "Vetted",
    description: "Thoroughly screened for quality and professionalism",
  },
  {
    icon: "⭐",
    title: "Experienced",
    description: "Years of teaching experience in their specialties",
  },
  {
    icon: "🌍",
    title: "Globally Ready",
    description: "Prepared to teach international students worldwide",
  },
];

export default function Tutors() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    roleNeeded: "",
    teachingNiche: "",
    message: "",
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
      const response = await fetch("/api/tutors/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          email: formData.email,
          roleNeeded: formData.roleNeeded,
          teachingNiche: formData.teachingNiche,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.isSuccess) {
        setIsSubmitted(true);
        setFormData({
          companyName: "",
          email: "",
          roleNeeded: "",
          teachingNiche: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Tutor hire inquiry error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 bg-[#f7dc6f] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263d4d] mb-6">
              Hire Certified ESL Tutors
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#263d4d] max-w-3xl mx-auto leading-relaxed">
              Meet certified teachers trained by Prouda Tutors and ready for
              global classrooms.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-[#F8F5ED] to-[#F8F5ED] border-2 border-[#f7dc6f]/30 rounded-lg p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl sm:text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-[#f7dc6f] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Grid Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-4">
            Meet Our Certified Tutors
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Browse our team of skilled ESL educators ready to help your students succeed
          </p>
          <a
            href="https://sites.google.com/view/prouda-tutors/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1b5276] hover:bg-[#153f5e] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            View Full Profiles →
          </a>
          <div className="w-20 h-1 bg-[#f7dc6f] mx-auto mt-6"></div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  fill
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-[#f7dc6f] mb-2">{tutor.name}</h3>
                <p className="text-sm sm:text-base text-[#f7dc6f] font-semibold bg-[#f7dc6f]/20 px-3 py-1 rounded-full inline-block">
                  {tutor.niche}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA & Contact Form Section */}
      <section id="hire-tutor" className="py-16 sm:py-20 lg:py-24 bg-[#F8F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* CTA Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7dc6f] mb-4">
              Looking to Hire a Qualified ESL Tutor?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will match you with the
              perfect tutor for your needs.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-linear-to-br from-[#F8F5ED] to-[#F8F5ED] border-2 border-[#f7dc6f]/30 rounded-lg p-8 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-[#f7dc6f] mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your inquiry has been submitted successfully. We'll be in
                  touch soon with tutor recommendations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="text-red-800 text-sm sm:text-base">{error}</p>
                  </div>
                )}
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2"
                  >
                    Company/Institution Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Role Needed */}
                <div>
                  <label
                    htmlFor="roleNeeded"
                    className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2"
                  >
                    Role/Position Needed *
                  </label>
                  <select
                    id="roleNeeded"
                    name="roleNeeded"
                    value={formData.roleNeeded}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors"
                  >
                    <option value="">Select a role</option>
                    <option value="Full-time Tutor">Full-time Tutor</option>
                    <option value="Part-time Tutor">Part-time Tutor</option>
                    <option value="Corporate Trainer">Corporate Trainer</option>
                    <option value="Curriculum Developer">
                      Curriculum Developer
                    </option>
                  </select>
                </div>

                {/* Teaching Niche */}
                <div>
                  <label
                    htmlFor="teachingNiche"
                    className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2"
                  >
                    Teaching Niche *
                  </label>
                  <select
                    id="teachingNiche"
                    name="teachingNiche"
                    value={formData.teachingNiche}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors"
                  >
                    <option value="">Select a niche</option>
                    <option value="Kids & Beginners">Kids & Beginners</option>
                    <option value="Business English">Business English</option>
                    <option value="IELTS Preparation">IELTS Preparation</option>
                    <option value="TOEFL & Academic">TOEFL & Academic</option>
                    <option value="Conversational English">
                      Conversational English
                    </option>
                    <option value="Corporate Training">
                      Corporate Training
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm sm:text-base font-semibold text-[#f7dc6f] mb-2"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-[#f7dc6f]/30 rounded-lg focus:outline-none focus:border-[#f7dc6f] transition-colors resize-none"
                    placeholder="Tell us more about your requirements, class size, student level, etc."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1b5276] hover:bg-[#153f5e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "Submitting..." : "Hire a Tutor"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-[#1b5276] to-[#153f5e] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
            <div>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3">
                100+
              </h3>
              <p className="text-lg sm:text-xl text-white">
                Teachers Certified Tutors Ready to Teach
              </p>
            </div>
            <div>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3">
                20+
              </h3>
              <p className="text-lg sm:text-xl text-white">
                Institutions Partnering With Us
              </p>
            </div>
            <div>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3">
                10+
              </h3>
              <p className="text-lg sm:text-xl text-white">
                Niches Covered
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
