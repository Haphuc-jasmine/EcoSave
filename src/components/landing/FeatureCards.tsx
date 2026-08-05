'use client';

import React from 'react';
import { BrainCircuit, Tag, Store, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage, TranslationKey } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FeatureCards() {
  const { t, language } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const FEATURES: Array<{
    icon: typeof BrainCircuit;
    titleKey: TranslationKey;
    badgeKey: TranslationKey;
    descKey: TranslationKey;
    link: string;
  }> = [
    {
      icon: BrainCircuit,
      titleKey: 'feat1Title',
      badgeKey: 'feat1Badge',
      descKey: 'feat1Desc',
      link: '/login?role=restaurant',
    },
    {
      icon: Tag,
      titleKey: 'feat2Title',
      badgeKey: 'feat2Badge',
      descKey: 'feat2Desc',
      link: '/login?role=restaurant',
    },
    {
      icon: Store,
      titleKey: 'feat3Title',
      badgeKey: 'feat3Badge',
      descKey: 'feat3Desc',
      link: '/login?role=customer',
    },
    {
      icon: BarChart3,
      titleKey: 'feat4Title',
      badgeKey: 'feat4Badge',
      descKey: 'feat4Desc',
      link: '/login?role=restaurant',
    },
  ];

  const CARD_STYLES = [
    {
      // AI (Emerald)
      bg: 'bg-white border-emerald-200',
      hover: 'hover:border-emerald-300',
      shadow: 'shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10',
      iconBg: 'bg-emerald-600 text-white border-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700',
    },
    {
      // Pricing (Amber)
      bg: 'bg-white border-amber-200',
      hover: 'hover:border-amber-300',
      shadow: 'shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10',
      iconBg: 'bg-amber-500 text-white border-amber-500',
      badge: 'bg-amber-50 text-amber-700',
    },
    {
      // Marketplace (Teal)
      bg: 'bg-white border-teal-200',
      hover: 'hover:border-teal-300',
      shadow: 'shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10',
      iconBg: 'bg-teal-600 text-white border-teal-600',
      badge: 'bg-teal-50 text-teal-700',
    },
    {
      // ESG (Sky Blue)
      bg: 'bg-white border-sky-200',
      hover: 'hover:border-sky-300',
      shadow: 'shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10',
      iconBg: 'bg-sky-600 text-white border-sky-600',
      badge: 'bg-sky-50 text-sky-700',
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-[#F6F8F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            {t('featuresBadge')}
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight lg:text-4xl">
            {language === 'vi' ? (
              <>
                Nhà hàng và khách hàng cần gì?
              </>
            ) : (
              t('featuresTitle')
            )}
          </p>
          <p className="mt-3 text-slate-600 text-sm">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            const style = CARD_STYLES[idx];
            return (
              <div
                key={feat.titleKey}
                className={`${style.bg} ${style.hover} ${style.shadow} rounded-2xl p-5 sm:p-6 lg:p-8 border-2 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 ${style.iconBg}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${style.badge}`}>
                      {t(feat.badgeKey)}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">{t(feat.titleKey)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{t(feat.descKey)}</p>
                </div>

                <Link
                  href={feat.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all"
                >
                  <span>{t('featuresExpDemo')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
