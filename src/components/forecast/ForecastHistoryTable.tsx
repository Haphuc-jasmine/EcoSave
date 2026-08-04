'use client';

import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';

export default function ForecastHistoryTable() {
  const mounted = useHasMounted();
  const { dailyOperations } = useEcoSaveStore();

  const logs = mounted && dailyOperations && dailyOperations.length > 0
    ? dailyOperations.map((op) => {
        const errorVal = Math.abs(op.recommendedPrep - op.actualSold);
        const errorPct = ((errorVal / (op.actualSold || 1)) * 100).toFixed(1);
        const accuracy = (100 - parseFloat(errorPct)).toFixed(1);
        const surplusQty = Math.max(0, op.preparedQty - op.actualSold);

        return {
          date: op.date,
          predicted: op.recommendedPrep,
          actual: op.actualSold,
          prepTarget: op.preparedQty,
          surplusQty,
          errorPct: `${errorPct}%`,
          accuracy: `${accuracy}%`,
          status: parseFloat(accuracy) >= 95 ? 'Optimal' : 'Good',
        };
      })
    : [
        {
          date: '2026-07-25',
          predicted: 125,
          actual: 121,
          prepTarget: 128,
          surplusQty: 7,
          errorPct: '3.2%',
          accuracy: '96.8%',
          status: 'Optimal',
        },
        {
          date: '2026-07-24',
          predicted: 118,
          actual: 115,
          prepTarget: 120,
          surplusQty: 5,
          errorPct: '2.5%',
          accuracy: '97.5%',
          status: 'Optimal',
        },
        {
          date: '2026-07-23',
          predicted: 110,
          actual: 104,
          prepTarget: 115,
          surplusQty: 11,
          errorPct: '5.4%',
          accuracy: '94.6%',
          status: 'Good',
        },
        {
          date: '2026-07-22',
          predicted: 105,
          actual: 108,
          prepTarget: 110,
          surplusQty: 2,
          errorPct: '2.8%',
          accuracy: '97.2%',
          status: 'Optimal',
        },
      ];

  const avgAccuracy = (
    logs.reduce((sum, item) => sum + parseFloat(item.accuracy), 0) / logs.length
  ).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">
            Historical Forecast Performance & Prediction Error Log
          </h3>
          <p className="text-xs font-medium text-slate-600">
            Deterministic prediction error |predictedDemand - actualSold| and surplus formula: max(preparedQty - actualSold, 0).
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{avgAccuracy}% Average Accuracy</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
              <th className="pb-3">Date</th>
              <th className="pb-3">Predicted Demand</th>
              <th className="pb-3">Prepared Qty</th>
              <th className="pb-3">Actual Sold</th>
              <th className="pb-3">Surplus Qty</th>
              <th className="pb-3">Prediction Error</th>
              <th className="pb-3">Accuracy</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.date} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 font-bold text-slate-800">{log.date}</td>
                <td className="py-3 font-bold text-teal-800">{log.predicted} meals</td>
                <td className="py-3 font-mono text-slate-700">{log.prepTarget} meals</td>
                <td className="py-3 font-extrabold text-slate-900">{log.actual} meals</td>
                <td className="py-3 font-mono font-bold text-amber-800">
                  {log.surplusQty} meals
                </td>
                <td className="py-3 font-mono font-bold text-slate-700">{log.errorPct}</td>
                <td className="py-3 font-extrabold text-emerald-800">{log.accuracy}</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" /> {log.status}
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
