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
    <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-700/60 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center text-emerald-300">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Environmental Impact
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Your Personal Sustainability Achievements
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 bg-emerald-900/60 border border-emerald-700/50 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Cumulative Impact
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {/* Metric 1: Meals Rescued */}
        <div className="bg-emerald-900/40 border border-emerald-700/50 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-emerald-500/80 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-600/60 flex items-center justify-center shrink-0 shadow-inner">
            <ShoppingBag className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {mealsRescued}
            </div>
            <div className="text-xs font-bold text-emerald-200 mt-0.5">Meals Rescued</div>
            <div className="text-[10px] text-emerald-300/80 font-medium">Diverted from waste</div>
          </div>
        </div>

        {/* Metric 2: CO2e Saved */}
        <div className="bg-teal-900/40 border border-teal-700/50 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-teal-500/80 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-teal-800/80 border border-teal-600/60 flex items-center justify-center shrink-0 shadow-inner">
            <Leaf className="w-6 h-6 text-teal-300" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {co2SavedKg.toFixed(1)} <span className="text-sm font-semibold text-teal-200">kg</span>
            </div>
            <div className="text-xs font-bold text-teal-200 mt-0.5">CO2e Saved</div>
            <div className="text-[10px] text-teal-300/80 font-medium">Emissions prevented</div>
          </div>
        </div>

        {/* Metric 3: Money Saved */}
        <div className="bg-amber-900/40 border border-amber-700/50 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-amber-500/80 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-800/80 border border-amber-600/60 flex items-center justify-center shrink-0 shadow-inner">
            <Banknote className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
              {savedVnd >= 1000000
                ? `${(savedVnd / 1000000).toFixed(1)}M`
                : `${(savedVnd / 1000).toFixed(0)}K`}{' '}
              <span className="text-sm font-semibold text-amber-200">đ</span>
            </div>
            <div className="text-xs font-bold text-amber-200 mt-0.5">Money Saved</div>
            <div className="text-[10px] text-amber-300/80 font-medium">Marketplace discount</div>
          </div>
        </div>

        {/* Metric 4: Orders Placed */}
        <div className="bg-blue-900/40 border border-blue-700/50 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-blue-500/80 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-800/80 border border-blue-600/60 flex items-center justify-center shrink-0 shadow-inner">
            <Zap className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {orderCount}
            </div>
            <div className="text-xs font-bold text-blue-200 mt-0.5">Orders Placed</div>
            <div className="text-[10px] text-blue-300/80 font-medium">Completed reservations</div>
          </div>
        </div>
      </div>
    </div>
  );
}
