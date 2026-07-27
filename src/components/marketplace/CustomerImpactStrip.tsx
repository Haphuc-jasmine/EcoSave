'use client';

import React from 'react';
import { Leaf, Zap, Banknote, ShoppingBag } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-emerald-700/60 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Leaf className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
          Your Environmental Impact
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-800/60 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white">{mealsRescued}</div>
            <div className="text-[10px] text-emerald-300">Meals Rescued</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-800/60 flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-teal-300" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white">{co2SavedKg.toFixed(1)} kg</div>
            <div className="text-[10px] text-teal-300">CO2e Saved</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-800/60 flex items-center justify-center shrink-0">
            <Banknote className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white">
              {savedVnd >= 1000000
                ? `${(savedVnd / 1000000).toFixed(1)}M`
                : `${(savedVnd / 1000).toFixed(0)}K`}{' '}
              đ
            </div>
            <div className="text-[10px] text-amber-300">Money Saved</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-800/60 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-blue-300" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-white">{orderCount}</div>
            <div className="text-[10px] text-blue-300">Orders Placed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
