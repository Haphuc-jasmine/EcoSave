'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, CloudRain, Music, Sparkles, CheckCircle2, X } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import HourlyDemandChart from './HourlyDemandChart';
import InfluencingFactorsCard from './InfluencingFactorsCard';

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
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left – chart (≈70%) */}
            <div className="flex-1 md:w-7/10 min-w-0">
              <HourlyDemandChart />
            </div>
            {/* Right – controls (≈30%) */}
            <div className="md:w-3/10 w-full">
              <InfluencingFactorsCard />
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
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-2 rounded-xl transition-all shadow-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
