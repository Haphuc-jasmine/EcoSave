'use client';

import React, { useState } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import InfluencingFactorsCard from '@/components/forecast/InfluencingFactorsCard';
import HourlyDemandChart from '@/components/forecast/HourlyDemandChart';
import ForecastHistoryTable from '@/components/forecast/ForecastHistoryTable';
import ForecastSimulationModal from '@/components/forecast/ForecastSimulationModal';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { Sparkles, Calendar, Utensils, Play } from 'lucide-react';

export default function ForecastPage() {
  const { forecast, openForecastModal } = useEcoSaveStore();
  const [selectedDate, setSelectedDate] = useState('2026-07-26');
  const [selectedMenu, setSelectedMenu] = useState('all');

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                AI Demand Engine
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Demand Forecasting & Analysis
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Predict order volume, evaluate regression factors, and optimize kitchen prep targets.
            </p>
          </div>

          {/* Date & Menu Pickers */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold text-slate-700 w-full sm:w-auto">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold text-slate-700 w-full sm:w-auto">
              <Utensils className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedMenu}
                onChange={(e) => setSelectedMenu(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
              >
                <option value="all">All Menu Items</option>
                <option value="pizza">Pizzas & Calzones</option>
                <option value="pasta">Pastas & Sides</option>
              </select>
            </div>

            <button
              onClick={openForecastModal}
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 sm:py-2 rounded-xl transition-all shadow-md shadow-emerald-700/20 w-full sm:w-auto min-h-[44px] sm:min-h-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Generate New Forecast</span>
            </button>
          </div>
        </div>

        {/* Forecast Result Headline Card */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Official Prediction Output
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {forecast.predictedDemand} <span className="text-lg sm:text-xl font-normal text-emerald-200">expected meals</span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-2 max-w-lg leading-relaxed">
              Statistical confidence interval: <strong>{forecast.lowerBound} to {forecast.upperBound} meals</strong>.
              Recommended kitchen prep target set to <strong>{forecast.recommendedPrep} meals</strong>.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 shrink-0 w-full md:w-auto bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/80">
            <div className="text-center flex-1 md:flex-none">
              <div className="text-2xl font-extrabold text-amber-300">{forecast.confidence}%</div>
              <div className="text-[10px] text-emerald-300/80 uppercase font-bold mt-0.5">Confidence Rating</div>
            </div>
            <div className="h-10 w-px bg-emerald-800" />
            <div className="text-center flex-1 md:flex-none">
              <div className="text-2xl font-extrabold text-emerald-300">+4.2%</div>
              <div className="text-[10px] text-emerald-300/80 uppercase font-bold mt-0.5">Vs Last Week</div>
            </div>
          </div>
        </div>

        {/* Grid layout for Factors & Hourly Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfluencingFactorsCard />
          <HourlyDemandChart />
        </div>

        {/* Forecast History Log Table */}
        <ForecastHistoryTable />
      </div>

      {/* Forecast Simulation Modal */}
      <ForecastSimulationModal />
    </PortalLayout>
  );
}
