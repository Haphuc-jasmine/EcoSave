'use client';

import React from 'react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function HourlyDemandChart() {
  const { forecast } = useEcoSaveStore();

  const totalDemand = forecast.predictedDemand;
  const lowerBound = forecast.lowerBound;
  const upperBound = forecast.upperBound;

  // Breakdown across 13 hourly slots (10:00 to 22:00)
  const proportions = [0.03, 0.07, 0.19, 0.16, 0.06, 0.04, 0.05, 0.10, 0.19, 0.14, 0.09, 0.04, 0.02];
  const hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  const chartData = hours.map((h, i) => {
    const val = Math.round(totalDemand * proportions[i]);
    const minVal = Math.round(lowerBound * proportions[i]);
    const maxVal = Math.round(upperBound * proportions[i]);
    return { hour: h, val, minVal, maxVal };
  });

  const svgWidth = 600;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 20;
  const maxMeals = 30;

  const getX = (i: number) => paddingX + (i / (chartData.length - 1)) * (svgWidth - paddingX * 2);
  const getY = (val: number) => svgHeight - paddingY - (val / maxMeals) * (svgHeight - paddingY * 2);

  // Upper polygon points
  const upperPoints = chartData.map((d, i) => `${getX(i)},${getY(d.maxVal)}`).join(' ');
  const lowerPoints = chartData.slice().reverse().map((d, i) => `${getX(chartData.length - 1 - i)},${getY(d.minVal)}`).join(' ');
  const bandPolygon = `${upperPoints} ${lowerPoints}`;

  const mainPath = chartData.map((d, i) => `${getX(i)},${getY(d.val)}`).join(' ');

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Hourly Demand Curve & Confidence Band</h3>
          <p className="text-xs text-slate-500">Shaded area represents 86% statistical confidence bounds</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-3 h-3 bg-emerald-200 border border-emerald-400 rounded" />
            <span>Confidence Range ({lowerBound}–{upperBound})</span>
          </span>
          <span className="flex items-center gap-1 text-slate-800">
            <span className="w-3 h-3 bg-emerald-700 rounded-full" />
            <span>Mean Expected</span>
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          {/* Grid lines */}
          {[0, 10, 20, 30].map((val) => (
            <g key={val}>
              <line
                x1={paddingX}
                y1={getY(val)}
                x2={svgWidth - paddingX}
                y2={getY(val)}
                stroke="#F1F5F9"
                strokeWidth="1"
              />
              <text x={paddingX - 8} y={getY(val) + 3} fill="#94A3B8" fontSize="9" textAnchor="end">
                {val}
              </text>
            </g>
          ))}

          {/* Confidence Band Area */}
          <polygon points={bandPolygon} fill="#D1FAE5" opacity="0.6" />

          {/* Mean Expected Line */}
          <polyline fill="none" stroke="#047857" strokeWidth="3" points={mainPath} />

          {/* Data Points */}
          {chartData.map((d, i) => (
            <g key={d.hour}>
              <circle cx={getX(i)} cy={getY(d.val)} r="4" fill="#047857" stroke="#FFFFFF" strokeWidth="2" />
              <text x={getX(i)} y={svgHeight - 2} fill="#64748B" fontSize="9" textAnchor="middle">
                {d.hour}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
