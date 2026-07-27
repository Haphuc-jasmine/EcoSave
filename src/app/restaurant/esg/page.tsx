'use client';

import React, { useState } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import {
  BarChart3,
  Leaf,
  FileText,
  CheckCircle2,
  Droplets,
  Banknote,
  Globe,
  Clock,
  Sparkles,
  Download,
} from 'lucide-react';

export default function RestaurantESGPage() {
  const mounted = useHasMounted();
  const { impactRecord, esgReports, generateESGReport, currentUser } = useEcoSaveStore();
  const [selectedPeriod, setSelectedPeriod] = useState('July 2026');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateESGReport(selectedPeriod);
      setIsGenerating(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 600);
  };

  const restaurantName = currentUser?.name || 'Pizza House';

  return (
    <PortalLayout>
      <div className="max-w-6xl mx-auto pb-12 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full mb-2">
              <BarChart3 className="w-3.5 h-3.5" /> Sustainability & Compliance
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              ESG Dashboard & Impact Reporting
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track carbon offset, food waste diversion, and generate verified monthly ESG compliance reports for {restaurantName}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              id="esg-period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="July 2026">July 2026</option>
              <option value="June 2026">June 2026</option>
              <option value="Q2 2026">Q2 2026 Aggregate</option>
            </select>
            <button
              id="generate-esg-report-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-700/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {showToast && (
          <div className="p-4 bg-emerald-900 text-white rounded-2xl flex items-center justify-between border border-emerald-700 shadow-lg animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-semibold">
                ESG Monthly Report for <strong>{selectedPeriod}</strong> generated successfully! Available in report history below.
              </span>
            </div>
            <button onClick={() => setShowToast(false)} className="text-xs text-emerald-300 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Core Environmental Impact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">Food Waste Saved</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {mounted ? impactRecord.foodSavedKg.toLocaleString() : '—'} <span className="text-xs font-normal text-slate-500">kg</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Total diverted from landfill
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">CO2e Emissions Prevented</span>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {mounted ? impactRecord.co2eSavedKg.toLocaleString() : '—'} <span className="text-xs font-normal text-slate-500">kg CO2e</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-teal-700 font-semibold flex items-center gap-1">
              ≈ {mounted ? Math.round(impactRecord.co2eSavedKg * 4) : 0} km driven avoided
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">Revenue Recovered</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Banknote className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {mounted ? (impactRecord.revenueRecovered / 1000000).toFixed(1) : '—'} <span className="text-xs font-normal text-slate-500">M VND</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-amber-800 font-semibold">
              From surplus marketplace sales
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">Embedded Water Saved</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {mounted ? impactRecord.waterSavedL.toLocaleString() : '—'} <span className="text-xs font-normal text-slate-500">Liters</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-semibold">
              Agricultural water footprint
            </div>
          </div>
        </div>

        {/* ESG Audit Methodology Card */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> GHG Protocol & Audit Standard
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Certified Environmental Calculation Methodology</h3>
          <p className="text-xs text-emerald-200/80 leading-relaxed max-w-3xl">
            CO2e metrics are derived using an average meal weight factor of <strong>0.45 kg/portion</strong> and a standard mixed-cuisine carbon conversion rate of <strong>2.5 kg CO2e / kg food waste</strong>. Water savings assume an embedded agricultural water cost of 25L per meal portion.
          </p>
        </div>

        {/* ESG Reports History */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Generated ESG Compliance Reports</h3>
            <span className="text-xs text-slate-500">{mounted ? esgReports.length : 0} report(s)</span>
          </div>

          <div className="divide-y divide-slate-100">
            {mounted && esgReports.map((report) => (
              <div key={report.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{report.period} ESG Report</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Generated: {report.generatedAt}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">
                        {report.metrics.co2eSavedKg} kg CO2e saved
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Downloading PDF report for ${report.period}...`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
