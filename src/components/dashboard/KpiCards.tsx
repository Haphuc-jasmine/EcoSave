'use client';

import React from 'react';
import { Utensils, ShoppingCart, AlertTriangle, Banknote, Leaf, TrendingUp } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function KpiCards() {
  const { forecast, actualSalesToday } = useEcoSaveStore();

  const expectedOrders = forecast.predictedDemand;
  const currentOrders = actualSalesToday;
  const estimatedSurplus = Math.max(0, expectedOrders - currentOrders);
  const confidence = forecast.confidence;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Card 1: Expected Orders */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Expected Orders</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {expectedOrders} <span className="text-xs font-normal text-slate-500">meals</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {confidence}% Confidence
          </span>
          <span className="text-slate-400 font-mono">Today</span>
        </div>
      </div>

      {/* Card 2: Current Orders */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Current Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentOrders} <span className="text-xs font-normal text-slate-500">meals</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-blue-700 font-semibold">On Track (+4% vs last wk)</span>
          <span className="text-slate-400 font-mono">1:00 PM</span>
        </div>
      </div>

      {/* Card 3: Estimated Surplus */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/80 bg-amber-50/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-amber-900">Estimated Surplus</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-950 tracking-tight">
            {estimatedSurplus} <span className="text-xs font-normal text-amber-800">meals</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
          <span className="text-amber-800 font-semibold">Marketplace Ready</span>
          <span className="text-amber-700 font-mono">Target</span>
        </div>
      </div>

      {/* Card 4: Revenue Recovered Today */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Revenue Recovered</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 tracking-tight">
            2,300,000 <span className="text-xs font-normal text-slate-500">VND</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-teal-700 font-semibold">+18% Surplus Margin</span>
          <span className="text-slate-400 font-mono">Today</span>
        </div>
      </div>

      {/* Card 5: CO2e Saved Today */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 bg-emerald-50/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-emerald-900">CO2e Saved Today</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-950 tracking-tight">
            21.4 <span className="text-xs font-normal text-emerald-800">kg</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
          <span className="text-emerald-800 font-semibold">≈ 85 km car drive avoided</span>
        </div>
      </div>
    </div>
  );
}
