'use client';

import React, { useState } from 'react';
import { Calendar, CloudRain, Music, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function InfluencingFactorsCard() {
  const { forecast, runForecastSimulation, openForecastModal } = useEcoSaveStore();
  const factors = forecast.factors;

  const [weatherFactor, setWeatherFactor] = useState(factors.weatherFactor);
  const [eventFactor, setEventFactor] = useState(factors.eventFactor);

  const handleRecalculate = () => {
    runForecastSimulation({
      weatherFactor,
      eventFactor,
    });
    openForecastModal();
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">AI Influencing Factors</h3>
          <p className="text-xs text-slate-500">Deterministic regression variables driving today&apos;s demand forecast</p>
        </div>
        <button
          onClick={handleRecalculate}
          className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 sm:py-1.5 rounded-xl border border-emerald-200 transition-colors w-full sm:w-auto min-h-[40px] sm:min-h-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-run Formula</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Factor 1: Weekday */}
        <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold shrink-0">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800">Weekday Factor (Friday)</div>
              <div className="text-[11px] text-slate-600">Slightly lower lunch crowd (-5%)</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-300 shrink-0">
            0.95x
          </span>
        </div>

        {/* Factor 2: Weather */}
        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/70 flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                <CloudRain className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-blue-950">Weather Forecast (Evening Rain)</div>
                <div className="text-[11px] text-blue-700">Precipitation radar impact</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shrink-0">
              {weatherFactor}x ({weatherFactor < 1 ? `-${Math.round((1 - weatherFactor) * 100)}%` : '0%'})
            </span>
          </div>
          <input
            type="range"
            min="0.80"
            max="1.10"
            step="0.02"
            value={weatherFactor}
            onChange={(e) => setWeatherFactor(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-1"
          />
        </div>

        {/* Factor 3: Event */}
        <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                <Music className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-amber-950">Nearby Event (Music Concert)</div>
                <div className="text-[11px] text-amber-800">Pre-show dining foot traffic (+8%)</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-900 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
              {eventFactor}x (+{Math.round((eventFactor - 1) * 100)}%)
            </span>
          </div>
          <input
            type="range"
            min="0.90"
            max="1.25"
            step="0.02"
            value={eventFactor}
            onChange={(e) => setEventFactor(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600 mt-1"
          />
        </div>

        {/* Factor 4: Historical Trend */}
        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-emerald-950">Historical Growth Trend</div>
              <div className="text-[11px] text-emerald-700">4-week rolling average trend (+5%)</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
            1.05x
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-900 text-white rounded-2xl text-xs font-mono overflow-x-auto">
        <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" /> Deterministic Formula Result
        </div>
        <div className="text-emerald-200 font-medium">
          Predicted = 120 (avg) × {factors.weekdayFactor} × {weatherFactor} × {eventFactor} × 1.05 ≈{' '}
          <strong className="text-white text-sm font-bold">{forecast.predictedDemand} meals</strong>
        </div>
      </div>
    </div>
  );
}
