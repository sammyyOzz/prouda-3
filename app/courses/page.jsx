'use client';

import Image from "next/image";

const courses = [
  {
    id: 'private-coaching',
    title: 'Private 1-on-1 ESL Coaching',
    subtitle: 'Personalized, results-focused training for focused learners',
    description:
      'This is our most personalized and results-focused training program, designed for individuals who want dedicated guidance from start to finish.',
    highlights: [
      'Two private coaching sessions each week',
      '60–90 minute sessions tailored to your learning needs',
      '8 private coaching sessions over one month',
      'Unlimited support and prompt responses to your questions',
      'Mock interview preparation and direct referrals',
    ],
    image: '/private-1-on-1.jpeg',
    link: 'http://nestuge.com/proudatutorsprivatecoaching',
    imageLabel: 'Private coaching preview',
  },
  {
    id: 'job-list',
    title: 'ESL Job List',
    subtitle: 'A curated list of ESL companies hiring globally',
    description:
      'Get access to companies with clear pay rates, platforms, requirements, and direct application details so you can apply with confidence.',
    highlights: [
      'Company names and pay rates clearly listed',
      'Teaching platform and requirements included',
      'Application details and direct contact information',
      'Useful job-landing and application strategies',
      'Tips for positioning yourself for better-paying roles',
    ],
    image: '/global-job-list.jpeg',
    link: 'https://proudatutors.selar.com/proudatutorsjoblist',
    imageLabel: 'Job list preview',
  },
  {
    id: 'self-paced-training',
    title: 'Self-Paced ESL Training',
    subtitle: 'Learn at your own pace and start teaching online confidently',
    description:
      'Our self-paced training is designed to help you start teaching online confidently while fitting learning around your schedule.',
    highlights: [
      'Full access to training materials and resources',
      'Monthly live mentorship sessions',
      'Access to an exclusive ESL job group',
      'Professional review of your demo video and CV',
      'Referral opportunities to hiring companies',
    ],
    image: '/practicum-course.jpeg',
    link: 'https://proudatutors.selar.com/eslpracticum',
    imageLabel: 'Self-paced training preview',
  },
  // {
  //   id: 'self-paced-course',
  //   title: 'Self-Paced ESL Teacher Training',
  //   subtitle: 'Flexible online teacher training with practical support',
  //   description:
  //     'Learn the foundations of online ESL teaching, build your profile, and prepare for real opportunities with flexible, practical training.',
  //   highlights: [
  //     'Online ESL teaching foundations',
  //     'Professional profile setup and optimization',
  //     'Teaching skills and classroom management',
  //     'Interview preparation and access to interviews',
  //     'Exclusive support community and job referrals',
  //   ],
  //   image: '/self-paced.jpeg',
  //   link: 'https://nestuge.com/proudatutorselfpaced',
  //   imageLabel: 'Self-paced course preview',
  // },
  {
    id: 'mentorship',
    title: '5-Week Intensive ESL Teacher Mentorship',
    subtitle: 'A practical path to becoming a confident online teacher',
    description:
      'This mentorship helps teachers, graduates, tutors, and aspiring online educators develop the skills and confidence needed to teach English online.',
    highlights: [
      '5 weeks of intensive practical training',
      'Live coaching and guided practice',
      'Real teaching sessions with students',
      'Professional profile guidance and certificate of completion',
      'Support throughout training and bonus resources',
    ],
    image: '/5-week-esl.jpeg',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSeyoxSHhVgfm2ZiuTd1JSzBMxVQnpFOhY93nKztfuYjw3Y-cA/viewform?usp=publish-editor',
    imageLabel: 'Mentorship preview',
  },
];

export default function Courses() {
  return (
    <>
      <section className="pt-32 bg-[#f7dc6f] px-4 pb-12 sm:px-6 lg:px-8 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-[#263d4d] sm:text-5xl lg:text-6xl">
            Our Courses
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#263d4d] sm:text-xl lg:text-2xl">
            Explore the five training options below and choose the path that fits your goals.
          </p>
        </div>
      </section>

      <section className="bg-[#F8F5ED] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {courses.map((course, index) => (
            <article
              key={course.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#f7dc6f]/40 bg-white shadow-sm"
            >
              <div className="flex h-150 items-center justify-center border-b border-[#f7dc6f]/30 bg-[#fff9e5] p-6 text-center relative">
                <Image src={course.image} alt={course.imageLabel} fill />
                {/* <div className="rounded-xl border border-dashed border-[#f7dc6f] bg-white/70 px-6 py-8 text-sm font-semibold text-[#263d4d]">
                  {course.imageLabel}
                  <div className="mt-2 text-xs font-normal text-gray-600">
                    Replace with your image later
                  </div>
                </div> */}
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-3 inline-flex w-fit rounded-full bg-[#1b5276] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Course {index + 1}
                </div>
                <h2 className="mb-3 text-2xl font-bold text-[#263d4d]">{course.title}</h2>
                <p className="mb-4 text-sm font-medium text-[#1b5276]">{course.subtitle}</p>
                <p className="mb-6 text-base leading-relaxed text-gray-700">{course.description}</p>

                <ul className="mb-8 space-y-2 text-sm text-gray-700">
                  {course.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-[#f7dc6f]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#1b5276] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#153f5e]"
                >
                  Open Course
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
