'use client';

import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';

export default function RecentOrdersTable() {
  const { orders } = useEcoSaveStore();
  const mounted = useHasMounted();

  const displayOrders = mounted ? orders : [];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Marketplace Reservations</h3>
          <p className="text-xs text-slate-500">Live mock customer orders & pickup verification codes</p>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          {displayOrders.length} Reservations
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
              <th className="pb-3">Order ID & Code</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Meal Item</th>
              <th className="pb-3">Qty</th>
              <th className="pb-3">Total (VND)</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayOrders.length > 0 ? (
              displayOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 font-mono">
                    <div className="font-bold text-slate-900">{ord.id}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                      {ord.pickupCode}
                    </div>
                  </td>
                  <td className="py-3 font-medium text-slate-800">{ord.customerName}</td>
                  <td className="py-3 text-slate-600 max-w-xs truncate">{ord.mealName}</td>
                  <td className="py-3 font-bold text-slate-800">{ord.quantity}x</td>
                  <td className="py-3 font-bold text-emerald-800">
                    {ord.total.toLocaleString()} VND
                  </td>
                  <td className="py-3">
                    {ord.status === 'reserved' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> Reserved (Pickup)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                  No marketplace reservations placed yet. Customer purchases will appear here live!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
