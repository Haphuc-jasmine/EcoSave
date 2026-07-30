'use client';

import React from 'react';
import { Clock, CheckCircle2, Truck, Store } from 'lucide-react';
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
        <table className="w-full text-left text-xs border-collapse border border-slate-200/80">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px]">
              <th className="p-3 border border-slate-200/80">Order ID & Code</th>
              <th className="p-3 border border-slate-200/80">Customer</th>
              <th className="p-3 border border-slate-200/80">Meal Item</th>
              <th className="p-3 border border-slate-200/80">Qty</th>
              <th className="p-3 border border-slate-200/80">Total (VND)</th>
              <th className="p-3 border border-slate-200/80">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 border border-slate-200/80 font-mono">
                    <div className="font-bold text-slate-900">{ord.id}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">
                      {ord.pickupCode}
                    </div>
                  </td>
                  <td className="p-3 border border-slate-200/80 font-medium text-slate-800">{ord.customerName}</td>
                  <td className="p-3 border border-slate-200/80 text-slate-600 max-w-xs truncate">{ord.mealName}</td>
                  <td className="p-3 border border-slate-200/80 font-bold text-slate-800">{ord.quantity}x</td>
                  <td className="p-3 border border-slate-200/80 font-bold text-emerald-800">
                    {ord.total.toLocaleString()} VND
                  </td>
                  <td className="p-3 border border-slate-200/80">
                    <div className="flex flex-col gap-1">
                      {ord.status === 'reserved' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" /> Reserved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                      {ord.fulfillmentType === 'delivery' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                          <Truck className="w-3 h-3" /> Delivery
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          <Store className="w-3 h-3" /> Pickup
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 text-xs border border-slate-200/80">
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
