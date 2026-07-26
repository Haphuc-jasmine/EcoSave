'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

export default function CustomerMarketplacePlaceholder() {
  const { currentUser } = useEcoSaveStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Milestone 3 Verified Login
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, {currentUser?.name || 'Phuc Nguyen'}!
            </h1>
          </div>
        </div>

        <p className="text-sm text-slate-600 max-w-xl leading-relaxed mb-6">
          You have successfully logged in using your customer demo account (<code>@{currentUser?.username || 'phuc'}</code>).
          The full Customer Marketplace, Meal details, and Mock Checkout modules will be built in the next milestone.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
