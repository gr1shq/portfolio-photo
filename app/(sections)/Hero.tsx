'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-caveat',
});

export default function Hero() {
  const images = [
    { src: '/images/hero1.jpg', alt: 'Portrait photography', caption: 'Moments' },
    { src: '/images/hero2.jpg', alt: 'Landscape photography', caption: 'Nature' },
    { src: '/images/hero3.jpg', alt: 'Event photography', caption: 'Celebrations' },
    { src: '/images/hero4.jpg', alt: 'Wedding photography', caption: 'Love' },
    { src: '/images/hero5.jpg', alt: 'Fine art photography', caption: 'Art' },
  ];
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return; 
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax').forEach((el, index) => {
        const element = el as HTMLElement;
        const offset = scrollY * (0.1 * (index % 2 === 0 ? 1 : -1));
        element.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full !min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black ${caveat.variable} py-12 md:py-20`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative">
        {/* Text in Top-Left */}
        <div
          className="absolute top-4 left-4 md:top-8 md:left-8 text-gray-100 z-20 text-backdrop fade-in-up"
          data-animate
          style={{ animationDelay: `${images.length * 200}ms` }}
        >
          <h1 className="text-2xl md:text-4xl font-caveat drop-shadow-md">
            Luca Norrell
          </h1>
        </div>

        {/* Polaroid Collage */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10 mt-16 md:mt-24">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`polaroid ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} parallax`}
              data-animate
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-[15vh] md:h-[20vh]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onError={() => console.error(`Failed to load image: ${image.src}`)}
                />
              </div>
              <p className="text-center text-sm md:text-base font-caveat text-gray-900 mt-2">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}