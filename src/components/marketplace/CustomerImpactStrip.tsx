'use client';

import React from 'react';
import { Leaf, Zap, Banknote, ShoppingBag, Sparkles } from 'lucide-react';

interface CustomerImpactStripProps {
  mealsRescued: number;
  co2SavedKg: number;
  savedVnd: number;
  orderCount: number;
}

export default function CustomerImpactStrip({
  mealsRescued,
  co2SavedKg,
  savedVnd,
  orderCount,
}: CustomerImpactStripProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-600/70 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800 border border-emerald-500/60 flex items-center justify-center text-emerald-300 shadow-inner">
            <Leaf className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-300" /> Environmental Impact
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Your Personal Sustainability Achievements
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-200 bg-emerald-900/80 border border-emerald-600/60 px-4 py-1.5 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Cumulative Impact
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 relative z-10">
        {/* Metric 1: Meals Rescued */}
        <div className="bg-emerald-900/50 border border-emerald-700/70 rounded-2xl p-3 sm:p-5 flex items-center gap-2.5 sm:gap-4 hover:border-emerald-400 transition-all shadow-md">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-emerald-800/90 border border-emerald-500/60 flex items-center justify-center shrink-0 shadow-inner">
            <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-300" />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {mealsRescued}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-emerald-200 mt-1">Meals Rescued</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-300/90 font-medium">Diverted from waste</div>
          </div>
        </div>

        {/* Metric 2: CO2e Saved */}
        <div className="bg-teal-900/50 border border-teal-700/70 rounded-2xl p-3 sm:p-5 flex items-center gap-2.5 sm:gap-4 hover:border-teal-400 transition-all shadow-md">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-teal-800/90 border border-teal-500/60 flex items-center justify-center shrink-0 shadow-inner">
            <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-teal-300" />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {co2SavedKg.toFixed(1)} <span className="text-sm font-bold text-teal-200">kg</span>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-teal-200 mt-1">CO2e Saved</div>
            <div className="text-[10px] sm:text-[11px] text-teal-300/90 font-medium">Emissions prevented</div>
          </div>
        </div>

        {/* Metric 3: Money Saved */}
        <div className="bg-amber-900/50 border border-amber-700/70 rounded-2xl p-3 sm:p-5 flex items-center gap-2.5 sm:gap-4 hover:border-amber-400 transition-all shadow-md">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-amber-800/90 border border-amber-500/60 flex items-center justify-center shrink-0 shadow-inner">
            <Banknote className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300" />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-3xl lg:text-4xl font-black text-amber-300 tracking-tight">
              {savedVnd >= 1000000
                ? `${(savedVnd / 1000000).toFixed(1)}M`
                : `${(savedVnd / 1000).toFixed(0)}K`}{' '}
              <span className="text-sm font-bold text-amber-200">đ</span>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-amber-200 mt-1">Money Saved</div>
            <div className="text-[10px] sm:text-[11px] text-amber-300/90 font-medium">Marketplace discount</div>
          </div>
        </div>

        {/* Metric 4: Orders Placed */}
        <div className="bg-blue-900/50 border border-blue-700/70 rounded-2xl p-3 sm:p-5 flex items-center gap-2.5 sm:gap-4 hover:border-blue-400 transition-all shadow-md">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-blue-800/90 border border-blue-500/60 flex items-center justify-center shrink-0 shadow-inner">
            <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-blue-300" />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {orderCount}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-blue-200 mt-1">Orders Placed</div>
            <div className="text-[10px] sm:text-[11px] text-blue-300/90 font-medium">Completed reservations</div>
          </div>
        </div>
      </div>
    </div>
  );
}

