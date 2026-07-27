'use client';

import React from 'react';
import { CheckCircle2, Leaf, Banknote, Clock, ShoppingBag, QrCode } from 'lucide-react';

interface PickupConfirmationProps {
  pickupCode: string;
  mealName: string;
  restaurantName: string;
  pickupWindow: string;
  quantity: number;
  totalPaid: number;
  savedVnd: number;
  co2SavedKg: number;
  onClose: () => void;
}

export default function PickupConfirmation({
  pickupCode,
  mealName,
  restaurantName,
  pickupWindow,
  quantity,
  totalPaid,
  savedVnd,
  co2SavedKg,
  onClose,
}: PickupConfirmationProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Success Header */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-300" />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
            Reservation Confirmed!
          </div>
          <h2 className="text-xl font-extrabold text-white">{mealName}</h2>
          <p className="text-sm text-emerald-200/70 mt-1">{restaurantName}</p>
        </div>

        {/* Pickup Code */}
        <div className="px-6 py-5">
          <div className="bg-slate-50 border-2 border-dashed border-emerald-400 rounded-2xl p-5 text-center mb-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <QrCode className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Your Pickup Code
              </span>
            </div>
            <div
              id="pickup-code-display"
              className="text-4xl font-extrabold tracking-widest text-emerald-800 font-mono my-2"
            >
              {pickupCode}
            </div>
            <p className="text-[11px] text-slate-400">Show this code at the restaurant counter</p>
          </div>

          {/* Pickup Details */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <ShoppingBag className="w-4 h-4 text-slate-400" /> Quantity
              </span>
              <span className="font-bold text-slate-900">{quantity} portion{quantity > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" /> Pickup Window
              </span>
              <span className="font-bold text-slate-900">{pickupWindow}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <Banknote className="w-4 h-4 text-slate-400" /> Total Paid
              </span>
              <span className="font-bold text-emerald-700">{totalPaid.toLocaleString()} đ</span>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900">Your Environmental Impact</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-lg font-extrabold text-emerald-800">
                  {savedVnd.toLocaleString()} đ
                </div>
                <div className="text-[10px] text-emerald-600">Money Saved</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-teal-800">
                  {co2SavedKg.toFixed(1)} kg
                </div>
                <div className="text-[10px] text-teal-600">CO2e Prevented</div>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 mt-2 pt-2 border-t border-emerald-200">
              🌍 That&apos;s equivalent to {(co2SavedKg * 4).toFixed(0)} km of car driving avoided!
            </p>
          </div>
        </div>

        {/* Close */}
        <div className="px-6 pb-6 pt-2">
          <button
            id="close-confirmation-btn"
            onClick={onClose}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-2xl transition-all hover:scale-[1.01]"
          >
            Done — Back to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}
