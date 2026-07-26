'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Leaf } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-[#F6F8F7]">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-200/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 border border-emerald-300/50 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>AI-Powered Restaurant ESG & Surplus Marketplace</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Predict Demand.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
              Prevent Waste.
            </span>{' '}
            Recover Revenue.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            An end-to-end ESG platform that helps restaurants forecast daily meal demand before overproduction happens,
            monetize surplus food, and automate carbon reduction reporting.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/login?role=restaurant"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-700/25 hover:scale-[1.02]"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Explore Restaurant Portal</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/login?role=customer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-sm hover:border-emerald-300"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Browse Customer Marketplace</span>
            </Link>
          </div>

          {/* Value Prop Highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Instant Demo Login
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" /> Zero Complex Backend Required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Real-time ESG Impact Calculation
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
              LIVE DEMO PREVIEW
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
              <div className="text-xs font-medium text-emerald-800">Expected Orders Today</div>
              <div className="text-2xl font-bold text-emerald-950 mt-1">128 meals</div>
              <div className="text-[11px] text-emerald-700 mt-1 font-medium">86% AI Confidence</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs font-medium text-slate-500">Current Sales (1:00 PM)</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">103 meals</div>
              <div className="text-[11px] text-slate-500 mt-1">On track (+4% vs last week)</div>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/60">
              <div className="text-xs font-medium text-amber-900">Estimated Surplus</div>
              <div className="text-2xl font-bold text-amber-950 mt-1">19 meals</div>
              <div className="text-[11px] text-amber-800 mt-1 font-medium">Marketplace Ready</div>
            </div>

            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-100">
              <div className="text-xs font-medium text-teal-800">Revenue Recovered</div>
              <div className="text-2xl font-bold text-teal-950 mt-1">2,300,000 VND</div>
              <div className="text-[11px] text-teal-700 mt-1 font-medium">21.4 kg CO2e Saved</div>
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
                  AI Recommendation Triggered
                </div>
                <div className="text-sm font-medium">
                  Reduce dinner batch preparation target from 135 to 115 meals due to expected evening rain (-8%).
                </div>
              </div>
            </div>
            <Link
              href="/login?role=restaurant"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Accept & Apply Target
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
