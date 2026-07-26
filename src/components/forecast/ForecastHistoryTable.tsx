'use client';

import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const FORECAST_LOGS = [
  {
    date: '2026-07-25 (Thu)',
    predicted: 125,
    actual: 121,
    prepTarget: 128,
    variance: '-3.2%',
    accuracy: '96.8%',
    status: 'Optimal',
    weather: 'Clear',
  },
  {
    date: '2026-07-24 (Wed)',
    predicted: 118,
    actual: 115,
    prepTarget: 120,
    variance: '-2.5%',
    accuracy: '97.5%',
    status: 'Optimal',
    weather: 'Sunny',
  },
  {
    date: '2026-07-23 (Tue)',
    predicted: 110,
    actual: 104,
    prepTarget: 115,
    variance: '-5.4%',
    accuracy: '94.6%',
    status: 'Good',
    weather: 'Light Rain',
  },
  {
    date: '2026-07-22 (Mon)',
    predicted: 105,
    actual: 108,
    prepTarget: 110,
    variance: '+2.8%',
    accuracy: '97.2%',
    status: 'Optimal',
    weather: 'Clear',
  },
  {
    date: '2026-07-21 (Sun)',
    predicted: 142,
    actual: 139,
    prepTarget: 145,
    variance: '-2.1%',
    accuracy: '97.9%',
    status: 'Optimal',
    weather: 'Sunny Weekend',
  },
];

export default function ForecastHistoryTable() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Historical Forecast Performance Log</h3>
          <p className="text-xs text-slate-500">Tracking daily prediction error and kitchen target variance</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>96.8% Average Accuracy</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
              <th className="pb-3">Date</th>
              <th className="pb-3">Predicted Demand</th>
              <th className="pb-3">Actual Sales</th>
              <th className="pb-3">Prep Target</th>
              <th className="pb-3">Variance</th>
              <th className="pb-3">Accuracy</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {FORECAST_LOGS.map((log) => (
              <tr key={log.date} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 font-semibold text-slate-800">{log.date}</td>
                <td className="py-3 font-bold text-teal-800">{log.predicted} meals</td>
                <td className="py-3 font-bold text-slate-900">{log.actual} meals</td>
                <td className="py-3 font-mono text-slate-600">{log.prepTarget} meals</td>
                <td className="py-3 font-mono font-semibold text-slate-600">{log.variance}</td>
                <td className="py-3 font-bold text-emerald-700">{log.accuracy}</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
