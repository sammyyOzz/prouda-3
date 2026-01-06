'use client';

import Link from 'next/link';
import Image from 'next/image';
import FacebookIcon from '@/icons/facebook';
import InstagramIcon from '@/icons/instagram';
import YoutubeIcon from '@/icons/youtube';
import TiktokIcon from '@/icons/tiktok';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/proudatutors?igsh=MW9pYmN0dTdnYXUxaA==',
      icon: InstagramIcon,
      color: 'hover:text-pink-600',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@proudatutorsbychimy',
      icon: YoutubeIcon,
      color: 'hover:text-red-600',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@proudatutors?_r=1&_t=ZS-92Ku2zatFIK',
      icon: TiktokIcon,
      color: 'hover:text-gray-400',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1GM62TNXZq/',
      icon: FacebookIcon,
      color: 'hover:text-blue-600',
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-start">
            <Image
              src="/prouda-logo.webp"
              alt="Prouda Tutors Logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Empowering ESL teachers with professional training and career support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/collaboration"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Hire a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/collaboration"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Partnerships
                </Link>
              </li>
              <li>
                <a
                  href="mailto:proudatutors@gmail.com"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Get Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                    className={`text-gray-400 transition-colors ${link.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
            <p className="text-gray-400 text-sm sm:text-base">
              &copy; {new Date().getFullYear()} Prouda Tutors. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}