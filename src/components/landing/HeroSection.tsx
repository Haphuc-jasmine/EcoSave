'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-[#F6F8F7]">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-200/20 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Premium ESG illustration */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center items-end">
        <svg
          className="w-full max-w-6xl h-auto opacity-80"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "none" }}
        >
          {/* Plate */}
          <circle cx="300" cy="150" r="120" fill="#F0F9F5" />
          {/* Surplus food stack */}
          <path d="M260 130 h80 v30 h-80 Z" fill="#A7D3A6" />
          <path d="M260 160 h80 v25 h-80 Z" fill="#81C784" />
          <path d="M260 185 h80 v20 h-80 Z" fill="#4CAF50" />
          {/* Fork */}
          <path d="M340 130 v40" stroke="#5D8233" strokeWidth="2" />
          <path d="M340 130 h-6 M340 130 h6" stroke="#5D8233" strokeWidth="2" />
          <path d="M340 170 h-8 v10 h16 v-10 h-8" fill="#5D8233" />
          {/* Leaf */}
          <path d="M200 180 c10 -20 30 -20 40 0 c-10 20 -30 20 -40 0" fill="#70A07A" />
          {/* AI spark elements */}
          <circle cx="420" cy="120" r="4" fill="#66BB6A" />
          <circle cx="440" cy="140" r="3" fill="#66BB6A" />
          <circle cx="460" cy="110" r="2" fill="#66BB6A" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${language === 'vi' ? 'max-w-4xl' : 'max-w-3xl'} mx-auto space-y-6`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 border border-emerald-300/50 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('heroTitle1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
              {t('heroTitle2')}
            </span>{' '}
            {t('heroTitle3')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {t('heroSubtitle')}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
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

        {/* Dashboard Preview Mockup Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-2xl p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 font-mono text-[11px]">app.ecosave.ai / dashboard / pizza-house</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
              {t('heroDemoBadge')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
              <div className="text-xs font-medium text-emerald-800">{t('heroCardExpectedOrders')}</div>
              <div className="text-2xl font-bold text-emerald-950 mt-1">128 {t('heroCardMeals')}</div>
              <div className="text-[11px] text-emerald-700 mt-1 font-medium">86% {t('heroCardConfidence')}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs font-medium text-slate-500">{t('heroCardCurrentSales')}</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">103 {t('heroCardMeals')}</div>
              <div className="text-[11px] text-slate-500 mt-1">{t('heroCardOnTrack')}</div>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/60">
              <div className="text-xs font-medium text-amber-900">{t('heroCardEstimatedSurplus')}</div>
              <div className="text-2xl font-bold text-amber-950 mt-1">19 {t('heroCardMeals')}</div>
              <div className="text-[11px] text-amber-800 mt-1 font-medium">{t('heroCardMarketplaceReady')}</div>
            </div>

            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-100">
              <div className="text-xs font-medium text-teal-800">{t('heroCardRevenueRecovered')}</div>
              <div className="text-2xl font-bold text-teal-950 mt-1">2,300,000 VND</div>
              <div className="text-[11px] text-teal-700 mt-1 font-medium">21.4 kg {t('heroCardCo2Saved')}</div>
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {t('heroAiBannerBadge')}
                </div>
                <div className="text-sm font-medium">
                  {t('heroAiBannerText')}
                </div>
              </div>
            </div>
            <Link
              href="/login?role=restaurant"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              {t('heroAiBannerAction')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
