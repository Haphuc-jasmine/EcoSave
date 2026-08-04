'use client';

import React from 'react';
import { Leaf, Trees, Droplets, ArrowUpRight } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function EnvironmentalMiniCard() {
  const { impactRecord } = useEcoSaveStore();

  const co2Kg = impactRecord.co2eSavedKg;
  const trees = Math.round(co2Kg / 20); // ~20kg CO2 per tree year
  const water = impactRecord.waterSavedL;

  return (
    <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md border border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-emerald-300">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Sustainability Impact Highlights</h4>
            <p className="text-[11px] text-emerald-300/80">Estimated environmental equivalencies</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 my-2">
        <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0">
            <Trees className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{trees} Trees</div>
            <div className="text-[10px] text-emerald-300/80">Annual growth equivalent</div>
          </div>
        </div>

        <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-blue-300 flex items-center justify-center shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{water.toLocaleString()} L</div>
            <div className="text-[10px] text-emerald-300/80">Embedded water saved</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300">
        <span>Green Hero Level: Tier 2</span>
        <span className="flex items-center gap-1 font-semibold hover:underline cursor-pointer">
          ESG Audit Preview <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
