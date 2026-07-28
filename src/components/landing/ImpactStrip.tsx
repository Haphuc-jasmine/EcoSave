'use client';

import React from 'react';
import { Utensils, Scale, CloudOff, Banknote, Droplets } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ImpactStrip() {
  const { impactRecord } = useEcoSaveStore();
  const mounted = useHasMounted();
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const meals = mounted ? impactRecord.mealsRescued : 1820;
  const foodKg = mounted ? impactRecord.foodSavedKg : 819;
  const co2eKg = mounted ? impactRecord.co2eSavedKg : 2050;
  const revenueVnd = mounted ? impactRecord.revenueRecovered : 62000000;
  const waterL = mounted ? impactRecord.waterSavedL : 45500;

  return (
    <section id="impact" ref={sectionRef} className="py-16 bg-emerald-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {t('impactBadge')}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mt-1 text-white">
            {t('impactTitle')}
          </h2>
          <p className="text-xs text-emerald-200/70 mt-2">
            {t('impactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div
            className={`bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 backdrop-blur-sm transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: isVisible ? '80ms' : '0ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {meals.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-emerald-300/80 mt-1">{t('impactMealsRescued')}</div>
          </div>

          <div
            className={`bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 backdrop-blur-sm transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: isVisible ? '160ms' : '0ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-amber-300 flex items-center justify-center mx-auto mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {foodKg.toLocaleString()} kg
            </div>
            <div className="text-xs font-medium text-emerald-300/80 mt-1">{t('impactFoodSaved')}</div>
          </div>

          <div
            className={`bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 backdrop-blur-sm transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: isVisible ? '240ms' : '0ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-teal-300 flex items-center justify-center mx-auto mb-3">
              <CloudOff className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {(co2eKg / 1000).toFixed(2)} t
            </div>
            <div className="text-xs font-medium text-emerald-300/80 mt-1">{t('impactCo2Reduced')}</div>
          </div>

          <div
            className={`bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 backdrop-blur-sm transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: isVisible ? '320ms' : '0ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Banknote className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              {(revenueVnd / 1000000).toFixed(1)}M VND
            </div>
            <div className="text-xs font-medium text-emerald-300/80 mt-1">{t('impactRevenueRecovered')}</div>
          </div>

          <div
            className={`bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 backdrop-blur-sm col-span-2 md:col-span-1 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-blue-300 flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {waterL.toLocaleString()} L
            </div>
            <div className="text-xs font-medium text-emerald-300/80 mt-1">{t('impactWaterConserved')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
