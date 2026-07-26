'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const HOURLY_DATA = [
  { time: '10:00', forecast: 4, actual: 5 },
  { time: '11:00', forecast: 8, actual: 9 },
  { time: '12:00', forecast: 22, actual: 21 },
  { time: '13:00', forecast: 19, actual: 18 },
  { time: '14:00', forecast: 7, actual: 6 },
  { time: '15:00', forecast: 5, actual: 5 },
  { time: '16:00', forecast: 6, actual: 7 },
  { time: '17:00', forecast: 12, actual: 11 },
  { time: '18:00', forecast: 24, actual: 21 },
  { time: '19:00', forecast: 18, actual: null }, // Rain impact window
  { time: '20:00', forecast: 12, actual: null },
  { time: '21:00', forecast: 6, actual: null },
  { time: '22:00', forecast: 2, actual: null },
];

export default function SalesForecastChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = 30;
  const svgHeight = 220;
  const svgWidth = 650;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index: number) =>
    paddingX + (index / (HOURLY_DATA.length - 1)) * (svgWidth - paddingX * 2);

  const getY = (val: number) =>
    svgHeight - paddingY - (val / maxVal) * (svgHeight - paddingY * 2);

  // Construct path strings for forecast line and actual line
  const forecastPoints = HOURLY_DATA.map((d, i) => `${getX(i)},${getY(d.forecast)}`).join(' ');
  
  const actualDataPoints = HOURLY_DATA.filter((d) => d.actual !== null);
  const actualPoints = actualDataPoints
    .map((d, i) => `${getX(i)},${getY(d.actual as number)}`)
    .join(' ');

  const activeItem = hoveredIndex !== null ? HOURLY_DATA[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Hourly Demand: Actual vs AI Forecast</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              LIVE TODAY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparing recorded kitchen sales against AI prediction curve. Rain expected at 7 PM.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
            <span className="text-slate-700">Actual Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-teal-500 bg-teal-50 inline-block" />
            <span className="text-slate-700">AI Forecast</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {/* Horizontal Grid lines */}
          {[0, 10, 20, 30].map((val) => (
            <g key={val}>
              <line
                x1={paddingX}
                y1={getY(val)}
                x2={svgWidth - paddingX}
                y2={getY(val)}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={paddingX - 10}
                y={getY(val) + 4}
                fill="#94A3B8"
                fontSize="10"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Rain Impact Highlight Zone (19:00 to 21:00) */}
          <rect
            x={getX(9) - 15}
            y={paddingY}
            width={getX(11) - getX(9) + 30}
            height={svgHeight - paddingY * 2}
            fill="#FEE2E2"
            opacity="0.4"
            rx="8"
          />
          <text
            x={getX(10)}
            y={paddingY + 14}
            fill="#991B1B"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
          >
            🌧️ Rain Impact (-8%)
          </text>

          {/* AI Forecast Line */}
          <polyline
            fill="none"
            stroke="#0D9488"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            points={forecastPoints}
          />

          {/* Actual Sales Area & Line */}
          <polyline
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            points={actualPoints}
          />

          {/* Data Points */}
          {HOURLY_DATA.map((d, i) => {
            const cx = getX(i);
            const cyForecast = getY(d.forecast);
            const cyActual = d.actual !== null ? getY(d.actual) : null;
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={d.time}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Vertical hover line */}
                {isHovered && (
                  <line
                    x1={cx}
                    y1={paddingY}
                    x2={cx}
                    y2={svgHeight - paddingY}
                    stroke="#1E293B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Forecast Point */}
                <circle
                  cx={cx}
                  cy={cyForecast}
                  r={isHovered ? '5' : '3.5'}
                  fill="#0D9488"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />

                {/* Actual Point */}
                {cyActual !== null && (
                  <circle
                    cx={cx}
                    cy={cyActual}
                    r={isHovered ? '6' : '4.5'}
                    fill="#059669"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                )}

                {/* X Axis Label */}
                <text
                  x={cx}
                  y={svgHeight - 4}
                  fill={isHovered ? '#059669' : '#64748B'}
                  fontSize="10"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {d.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {activeItem && (
          <div className="mt-3 bg-slate-900 text-white text-xs p-3 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold">{activeItem.time} Slot</span>
            </div>
            <div className="flex items-center gap-4">
              <span>
                AI Forecast: <strong className="text-teal-300">{activeItem.forecast} meals</strong>
              </span>
              <span>
                Actual Sales:{' '}
                <strong className="text-emerald-400">
                  {activeItem.actual !== null ? `${activeItem.actual} meals` : 'Upcoming'}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
