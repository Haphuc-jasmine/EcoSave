'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, PlusCircle, PackagePlus, FileText, Check } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function QuickActions() {
  const { openForecastModal, actualSalesToday, recordActualSales } = useEcoSaveStore();
  const [isEditingSales, setIsEditingSales] = useState(false);
  const [salesInput, setSalesInput] = useState(actualSalesToday.toString());

  const handleSaveSales = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(salesInput, 10);
    if (!isNaN(val) && val >= 0) {
      recordActualSales(val);
      setIsEditingSales(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Kitchen Actions</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1: Run Forecast */}
        <button
          onClick={openForecastModal}
          className="p-4 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-2xl text-left transition-all group flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-950">Run AI Simulation</div>
            <div className="text-[10px] text-emerald-700">Predict demand</div>
          </div>
        </button>

        {/* Action 2: Add Actual Sales */}
        <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-2xl text-left transition-all flex flex-col justify-between h-28">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            {!isEditingSales && (
              <button
                onClick={() => setIsEditingSales(true)}
                className="text-[10px] font-bold text-blue-700 hover:underline"
              >
                Update
              </button>
            )}
          </div>
          <div>
            <div className="text-xs font-bold text-blue-950">Actual Sales</div>
            {isEditingSales ? (
              <form onSubmit={handleSaveSales} className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  value={salesInput}
                  onChange={(e) => setSalesInput(e.target.value)}
                  className="w-14 px-1.5 py-0.5 text-xs border border-blue-300 rounded font-bold"
                  autoFocus
                />
                <button type="submit" className="p-1 bg-blue-600 text-white rounded">
                  <Check className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <div className="text-[11px] text-blue-800 font-semibold mt-0.5">
                {actualSalesToday} meals recorded
              </div>
            )}
          </div>
        </div>

        {/* Action 3: Upload Surplus */}
        <Link
          href="/login?role=restaurant"
          className="p-4 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 rounded-2xl text-left transition-all group flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <PackagePlus className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-950">Publish Surplus</div>
            <div className="text-[10px] text-amber-800">Add listing</div>
          </div>
        </Link>

        {/* Action 4: Generate ESG Report */}
        <Link
          href="/login?role=restaurant"
          className="p-4 bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200/80 rounded-2xl text-left transition-all group flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-teal-950">Generate Report</div>
            <div className="text-[10px] text-teal-800">Export ESG PDF</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
