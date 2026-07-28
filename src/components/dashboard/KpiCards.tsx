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
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Expected Orders</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {expectedOrders} <span className="text-sm font-medium text-slate-500">meals</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> {confidence}% Confidence
          </span>
          <span className="text-slate-400 font-mono">Today</span>
        </div>
      </div>

      {/* Card 2: Current Orders */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Current Orders</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentOrders} <span className="text-sm font-medium text-slate-500">meals</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-blue-700 font-bold">On Track (+4% vs last wk)</span>
          <span className="text-slate-400 font-mono">1:00 PM</span>
        </div>
      </div>

      {/* Card 3: Estimated Surplus */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200 bg-amber-50/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Estimated Surplus</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-950 tracking-tight">
            {estimatedSurplus} <span className="text-sm font-medium text-amber-800">meals</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-amber-200/70 flex items-center justify-between text-xs">
          <span className="text-amber-800 font-bold">Marketplace Ready</span>
          <span className="text-amber-700 font-mono">Target</span>
        </div>
      </div>

      {/* Card 4: Revenue Recovered Today */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Revenue Recovered</span>
            <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            2.3M <span className="text-sm font-medium text-slate-500">VND</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-teal-700 font-bold">+18% Surplus Margin</span>
          <span className="text-slate-400 font-mono">Today</span>
        </div>
      </div>

      {/* Card 5: CO2e Saved Today */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-200 bg-emerald-50/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">CO2e Saved Today</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-950 tracking-tight">
            21.4 <span className="text-sm font-medium text-emerald-800">kg</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-emerald-200/70 flex items-center justify-between text-xs">
          <span className="text-emerald-800 font-bold">≈ 85 km car drive avoided</span>
        </div>
      </div>
    </div>
  );
}

