'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-caveat',
});

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

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

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`w-full py-8 bg-gray-900 text-gray-100 ${caveat.variable}`}
      style={{ backgroundImage: 'url(/images/map-texture.png)', backgroundRepeat: 'repeat', backgroundSize: '200px', backgroundColor: 'rgba(17, 24, 39, 0.95)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <div className="fade-in-up" data-animate>
          <p className="text-lg font-caveat">
            Luca Norrell Photography &copy; {new Date().getFullYear()}
          </p>
          <p className="mt-2 text-base font-caveat">
            Crafted with care by{' '}
            <Link
              href="https://tapecode.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              Tapecode
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}