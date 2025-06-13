'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-caveat',
});

export default function About() {
  const skills = ['Portraits', 'Events', 'Landscapes', 'Weddings', 'Fine Art'];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-animate]').forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`w-full py-16 md:py-24 bg-stone-100 ${caveat.variable}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Polaroid Portrait */}
        <div
          className="polaroid w-full md:w-1/2 rotate-2 fade-in-pin"
          data-animate
        >
          <div className="relative h-[30vh] md:h-[40vh]">
            <Image
              src="/images/portrait.jpg"
              alt="Luca Norrell"
              fill
              className="object-cover"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => console.error('Failed to load image: /images/portrait.jpg')}
            />
          </div>
          <p className="text-center text-base md:text-lg font-caveat text-gray-900 mt-2">
            Luca
          </p>
        </div>

        {/* Bio and Skills */}
        <div className="w-full md:w-1/2 flex flex-col justify-center slide-in-right" data-animate>
          <h2 className="text-2xl md:text-4xl font-caveat text-gray-900">
            About <span className="highlight-underline">Luca Norrell</span>
          </h2>
          <p className="mt-4 text-lg font-caveat text-gray-700 leading-relaxed">
            Chasing light, crafting stories. Luca Norrell, a London-based photographer, weaves
            authenticity and artistry into every frame. With a passion for natural light and fleeting
            moments, Luca’s work captures the soul of each subject.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-caveat text-gray-900">Specialties</h3>
            <ul className="flex flex-wrap gap-3 mt-2">
              {skills.map((skill, index) => (
                <li
                  key={skill}
                  className="luggage-tag text-gray-700 font-caveat text-sm md:text-base swing-in"
                  data-animate
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="#contact"
            className="mt-6 inline-block stamp font-caveat text-base md:text-lg pulse"
            scroll={false}
            data-animate
            style={{ animationDelay: `${(skills.length + 1) * 200}ms` }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}