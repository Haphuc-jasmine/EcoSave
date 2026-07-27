'use client';

import React from 'react';
import { BrainCircuit, Tag, Store, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage, TranslationKey } from '@/context/LanguageContext';

export default function FeatureCards() {
  const { t, language } = useLanguage();

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

  return (
    <section id="features" className="py-20 bg-[#F6F8F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            {t('featuresBadge')}
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {language === 'vi' ? (
              <>
                Tất Cả Những Gì Nhà Hàng <br />& Khách Hàng Cần
              </>
            ) : (
              t('featuresTitle')
            )}
          </p>
          <p className="mt-3 text-slate-600 text-sm">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.titleKey}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100/80 text-emerald-800 px-2.5 py-1 rounded-full">
                      {t(feat.badgeKey)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t(feat.titleKey)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{t(feat.descKey)}</p>
                </div>

                <Link
                  href={feat.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all"
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
