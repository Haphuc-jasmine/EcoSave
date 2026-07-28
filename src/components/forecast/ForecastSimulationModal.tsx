'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, CloudRain, Music, Sparkles, CheckCircle2, X } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

const PHASES = [
  { step: 1, text: 'Analyzing 90-day historical order patterns...', icon: Cpu },
  { step: 2, text: 'Processing weather radar & local event APIs...', icon: CloudRain },
  { step: 3, text: 'Evaluating Friday foot traffic & concert impact...', icon: Music },
  { step: 4, text: 'Synthesizing ML demand forecast & prep recommendation...', icon: Sparkles },
];

export default function ForecastSimulationModal() {
  const { isForecastModalOpen, closeForecastModal, runForecastSimulation, forecast } = useEcoSaveStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isForecastModalOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }

        const next = prev + 4;
        if (next > 75) setCurrentStep(3);
        else if (next > 45) setCurrentStep(2);
        else if (next > 20) setCurrentStep(1);
        else setCurrentStep(0);

        return next;
      });
    }, 90);

    return () => {
      clearInterval(interval);
    };
  }, [isForecastModalOpen]);

  const handleClose = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsCompleted(false);
    closeForecastModal();
  };

  // Trigger forecast simulation once progress completes
  useEffect(() => {
    if (isCompleted) {
      runForecastSimulation();
    }
  }, [isCompleted, runForecastSimulation]);

  if (!isForecastModalOpen) return null;

  const ActiveIcon = PHASES[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div className="py-4 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <ActiveIcon className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Running AI Demand Forecast</h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                {PHASES[currentStep].text}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Simulation Progress</span>
                <span className="text-emerald-700 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="space-y-2.5 pt-2">
              {PHASES.map((p, idx) => {
                const Icon = p.icon;
                const active = idx === currentStep;
                const done = idx < currentStep;
                return (
                  <div
                    key={p.step}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all ${
                      active
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-sm'
                        : done
                        ? 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                        : 'bg-white border-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="truncate flex-1">{p.text}</span>
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">AI Forecast Generated!</h3>
            <p className="text-sm text-slate-600 mb-4">Demand calculation finalized with 86% confidence level.</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 text-left">
              <div className="text-xs font-bold text-emerald-900 mb-1">Simulation Outcome:</div>
              <div className="text-sm font-extrabold text-slate-900">
                Predicted Demand: <span className="text-emerald-700">{forecast.predictedDemand} meals</span> (range {forecast.lowerBound} – {forecast.upperBound})
              </div>
              <div className="text-xs text-emerald-800 mt-1">
                Recommended kitchen prep target: <strong>{Math.round(forecast.predictedDemand * 1.02)}</strong> meals
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

