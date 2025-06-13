'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-caveat',
});

export default function Portfolio() {
  const images = [
    { src: '/images/hero1.jpg', alt: 'Portrait 1', category: 'Portraits' },
    { src: '/images/hero4.jpg', alt: 'Event 1', category: 'Events' },
    { src: '/images/hero2.jpg', alt: 'Landscape 2', category: 'Landscapes' },
    { src: '/images/hero3.jpg', alt: 'Wedding 2', category: 'Weddings' },
    { src: '/images/portrait.jpg', alt: 'Fine Art 1', category: 'Fine Art' },
  ];
  const categories = ['All', 'Portraits', 'Events', 'Landscapes', 'Weddings', 'Fine Art'];
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-animate]').forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredImages =
    activeCategory === 'All'
      ? images
      : images.filter((image) => image.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className={`w-full py-16 md:py-24 bg-white ${caveat.variable}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-2xl md:text-4xl font-caveat text-gray-900 text-center">
          <span className="highlight-underline">Portfolio</span>
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`filter-tab font-caveat text-lg text-gray-600 ${activeCategory === category ? 'active' : ''} slide-in-left`}
              onClick={() => setActiveCategory(category)}
              data-animate
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="columns-2 md:columns-3 gap-4 mt-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.src}
              className="relative mb-4 break-inside-avoid fade-in-up"
              data-animate
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                quality={85}
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
                onError={() => console.error(`Failed to load image: ${image.src}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}