'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, CloudRain, Music, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function AiRecommendationCard() {
  const { forecast, recommendationAccepted, preparationTarget, acceptRecommendation } =
    useEcoSaveStore();
  const [showToast, setShowToast] = useState(false);

  const handleAccept = () => {
    acceptRecommendation();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl border-2 border-emerald-600/80 relative overflow-hidden ring-1 ring-emerald-500/30">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40 shadow-inner shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <span>AI Recommendation Engine</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Daily Preparation Target Guidance</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {forecast.confidence}% Confidence
            </span>
          </div>
        </div>

        {/* Factors breakdown strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/60 flex items-center gap-3">
            <CloudRain className="w-5 h-5 text-blue-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-emerald-100">Evening Rain Radar (-8%)</div>
              <div className="text-emerald-300/80 mt-0.5">Expected precipitation around 7:00 PM</div>
            </div>
          </div>

          <div className="bg-emerald-900/50 p-3.5 rounded-2xl border border-emerald-700/60 flex items-center gap-3">
            <Music className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-emerald-100">Nearby Music Concert (+8%)</div>
              <div className="text-emerald-300/80 mt-0.5">Increased pre-show dining foot traffic</div>
            </div>
          </div>
        </div>

        {/* Proposal & Action Bar */}
        <div className="bg-emerald-900/70 p-4 sm:p-5 rounded-2xl border border-emerald-600/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Proposed Action</div>
            <div className="text-sm sm:text-base font-extrabold text-white mt-1">
              Adjust prep target from 135 to{' '}
              <span className="text-amber-300 text-base sm:text-lg font-black underline decoration-amber-400/50">{forecast.recommendedPrep} meals</span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Prevents overproduction of ~19 surplus meals while covering upper demand bound.
            </p>
          </div>

          {recommendationAccepted ? (
            <div className="w-full sm:w-auto justify-center bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-inner border border-emerald-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Target Set to {preparationTarget} Meals</span>
            </div>
          ) : (
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto min-h-[44px] bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-400/30 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-emerald-950"
            >
              <span>Accept & Apply Target</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Confirmation Toast Alert */}
        {showToast && (
          <div className="mt-4 p-3.5 bg-emerald-500/20 border border-emerald-400/50 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-200 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Kitchen preparation target updated to {preparationTarget} meals! Overproduction risk mitigated.</span>
          </div>
        )}
      </div>
    </div>
  );
}

