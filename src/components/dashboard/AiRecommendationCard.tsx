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
    <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-800/80 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-amber-300 flex items-center justify-center border border-emerald-700/50">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                AI Recommendation Engine
              </div>
              <h3 className="text-lg font-bold text-white">Daily Preparation Target Guidance</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-800/80 text-emerald-200 border border-emerald-700/60 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {forecast.confidence}% Confidence
            </span>
          </div>
        </div>

        {/* Factors breakdown strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800/60 flex items-center gap-3">
            <CloudRain className="w-5 h-5 text-blue-300 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-emerald-100">Evening Rain Radar (-8%)</div>
              <div className="text-[11px] text-emerald-300/80">Expected precipitation around 7:00 PM</div>
            </div>
          </div>

          <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800/60 flex items-center gap-3">
            <Music className="w-5 h-5 text-amber-300 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-emerald-100">Nearby Music Concert (+8%)</div>
              <div className="text-[11px] text-emerald-300/80">Increased pre-show dining foot traffic</div>
            </div>
          </div>
        </div>

        {/* Proposal & Action Bar */}
        <div className="bg-emerald-800/40 p-4 rounded-2xl border border-emerald-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
          <div>
            <div className="text-xs font-semibold text-emerald-300">Proposed Action</div>
            <div className="text-sm font-bold text-white mt-0.5">
              Adjust prep target from 135 to{' '}
              <span className="text-amber-300 font-extrabold">{forecast.recommendedPrep} meals</span>
            </div>
            <p className="text-[11px] text-emerald-200/70 mt-1">
              Prevents overproduction of ~19 surplus meals while covering upper demand bound.
            </p>
          </div>

          {recommendationAccepted ? (
            <div className="bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-inner border border-emerald-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Target Set to {preparationTarget} Meals</span>
            </div>
          ) : (
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-400/20 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Accept & Apply Target</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Confirmation Toast Alert */}
        {showToast && (
          <div className="mt-3 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl flex items-center gap-2 text-xs text-emerald-200 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Kitchen preparation target updated to {preparationTarget} meals! Overproduction risk mitigated.</span>
          </div>
        )}
      </div>
    </div>
  );
}
