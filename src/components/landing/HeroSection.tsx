'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HERO_IMAGES = [
  {
    src: '/hero-1-new.jpg',
    alt: 'Fresh surplus gourmet meals in eco-friendly packaging',
  },
  {
    src: '/hero-2-new.jpg',
    alt: 'Modern restaurant kitchen preparing sustainable dishes',
  },
  {
    src: '/hero-3-new.jpg',
    alt: 'Urban organic farm garden promoting zero waste sustainability',
  },
];

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entrance animation — reveal content shortly after mount
    const t1 = setTimeout(() => setContentVisible(true), 80);

    if (reducedMotion.current) {
      setContentVisible(true);
      return () => clearTimeout(t1);
    }

    // Background image rotation
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    // Subtle parallax on background only
    const onScroll = () => {
      setParallaxY(window.scrollY * 0.18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="relative pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16 overflow-hidden">
      {/* Background Slideshow Layer — subtle parallax via translateY */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateY(${parallaxY}px)`, willChange: 'transform' }}
      >
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* White overlay layers — lightened so the background photography stands out, with a stronger radial boost behind the text for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/55 to-white/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(255,255,255,0.8),transparent_75%)]" />
      </div>

      {/* Subtle emerald tint bleed at top for brand feel */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center ${language === 'vi' ? 'max-w-4xl' : 'max-w-3xl'} mx-auto space-y-6 transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-900 border border-emerald-300/70 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('heroTitle1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            {t('heroSubtitle')}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/login?role=restaurant"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-700/25 hover:scale-[1.02]"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('heroCtaRestaurant')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/login?role=customer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-sm hover:border-emerald-300"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>{t('heroCtaCustomer')}</span>
            </Link>
          </div>

          {/* Value Prop Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('heroProp1')}
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" /> {t('heroProp2')}
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> {t('heroProp3')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
