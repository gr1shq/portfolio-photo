'use client';

import { useEffect, useRef } from 'react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-caveat',
});

export default function Contact() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); 
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`w-full py-16 md:py-24 bg-gray-50 ${caveat.variable}`}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <h2 className="text-2xl md:text-4xl font-caveat text-gray-900 text-center">
          <span className="highlight-underline">Let’s Tell Your Story</span>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg fade-in-up outline"
          style={{ backgroundImage: 'url(/images/map-texture.png)', backgroundRepeat: 'repeat', backgroundSize: '200px' }}
          data-animate
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-caveat text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-transparent border-b-2 border-gray-300 text-gray-900 font-caveat text-lg focus:border-gray-900 transition-colors duration-300 outline-none"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-caveat text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-transparent border-b-2 border-gray-300 text-gray-900 font-caveat text-lg focus:border-gray-900 transition-colors duration-300 outline-none"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-caveat text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              className="w-full bg-transparent border-b-2 border-gray-300 text-gray-900 font-caveat text-lg focus:border-gray-900 transition-colors duration-300 h-24 resize-y outline-none"
              placeholder="Your message"
              required
            />
          </div>
          <button
            type="submit"
            className="polaroid mx-auto block text-center text-gray-900 font-caveat text-lg pulse"
            data-animate
            style={{ animationDelay: '400ms' }}
          >
            <span className="block px-6 py-2">Send</span>
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 font-caveat text-base">
          Or reach out at{' '}
          <a href="mailto:luca@norrellphoto.com" className="underline hover:text-gray-900">
            luca@norrellphoto.com
          </a>
        </p>
      </div>
    </section>
  );
}