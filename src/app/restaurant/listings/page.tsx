'use client';

import React from 'react';
import Link from 'next/link';
import PortalLayout from '@/components/layout/PortalLayout';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import {
  PackagePlus,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  TrendingDown,
  Leaf,
  Banknote,
} from 'lucide-react';

function StatusBadge({ status }: { status: 'active' | 'sold_out' | 'expired' }) {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="w-3 h-3" /> Active
      </span>
    );
  }
  if (status === 'sold_out') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="w-3 h-3" /> Sold Out
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
      <XCircle className="w-3 h-3" /> Expired
    </span>
  );
}

export default function RestaurantListingsPage() {
  const mounted = useHasMounted();
  const { listings, currentUser, impactRecord } = useEcoSaveStore();

  const restaurantId = currentUser?.restaurantId || 'rest_pizza';
  const myListings = listings.filter((l) => l.restaurantId === restaurantId);
  const activeCount = myListings.filter((l) => l.status === 'active').length;
  const soldOutCount = myListings.filter((l) => l.status === 'sold_out').length;

  return (
    <PortalLayout>
      <div className="max-w-6xl mx-auto pb-12 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full mb-2">
              <ShoppingBag className="w-3.5 h-3.5" /> Marketplace Listings
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Active Listings</h1>
            <p className="text-xs text-slate-500 mt-1">
              All surplus meal listings published by your restaurant on the EcoSave marketplace.
            </p>
          </div>
          <Link
            id="add-new-listing-btn"
            href="/restaurant/surplus"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <PackagePlus className="w-4 h-4" />
            Publish New Surplus
          </Link>
        </div>

        {/* Summary KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Listings', value: myListings.length, icon: ShoppingBag, color: 'slate' },
            { label: 'Active', value: activeCount, icon: CheckCircle2, color: 'emerald' },
            { label: 'Sold Out', value: soldOutCount, icon: TrendingDown, color: 'blue' },
            { label: 'CO2e Potential', value: `${(myListings.reduce((s, l) => s + l.quantity, 0) * 0.45 * 2.5).toFixed(0)} kg`, icon: Leaf, color: 'teal' },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${kpi.color}-50 text-${kpi.color}-700`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-slate-900">{mounted ? kpi.value : '—'}</div>
                  <div className="text-[10px] text-slate-500">{kpi.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Listings Table */}
        {mounted && myListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-base font-bold text-slate-800 mb-2">No Listings Yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Publish your first surplus meal to the marketplace and start recovering lost revenue.
            </p>
            <Link
              href="/restaurant/surplus"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              <PackagePlus className="w-4 h-4" />
              Publish Surplus Meal
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">All Marketplace Listings</h3>
              <span className="text-xs text-slate-500">{mounted ? myListings.length : 0} total</span>
            </div>

            <div className="divide-y divide-slate-100">
              {mounted && myListings.map((listing) => {
                return (
                  <div
                    key={listing.id}
                    className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={listing.image}
                        alt={listing.mealName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900 truncate">
                          {listing.mealName}
                        </span>
                        <StatusBadge status={listing.status} />
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {listing.pickupWindow}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400" /> {listing.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Leaf className="w-3 h-3 text-emerald-500" />{' '}
                          {listing.dietaryTags.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="text-right shrink-0">
                      <div className="text-sm font-extrabold text-emerald-700">
                        {listing.salePrice.toLocaleString()} đ
                      </div>
                      <div className="text-[11px] text-slate-400 line-through">
                        {listing.originalPrice.toLocaleString()} đ
                      </div>
                      <div className="text-[10px] font-bold text-red-600 bg-red-50 rounded px-1 mt-0.5">
                        -{listing.discount}%
                      </div>
                    </div>

                    {/* Qty */}
                    <div className="text-center shrink-0 w-16">
                      <div
                        className={`text-lg font-extrabold ${
                          listing.quantity === 0 ? 'text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {listing.quantity}
                      </div>
                      <div className="text-[10px] text-slate-400">left</div>
                    </div>

                    {/* Revenue potential */}
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-teal-700 flex items-center gap-1 justify-end">
                        <Banknote className="w-3.5 h-3.5" />
                        {(listing.salePrice * listing.quantity).toLocaleString()} đ
                      </div>
                      <div className="text-[10px] text-slate-400">recoverable</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cumulative Impact Card */}
        {mounted && (
          <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 border border-emerald-800 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">
              📊 Your Restaurant&apos;s Cumulative Platform Impact
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Meals Rescued', value: impactRecord.mealsRescued.toLocaleString(), unit: 'meals' },
                { label: 'Food Saved', value: `${impactRecord.foodSavedKg.toLocaleString()} kg`, unit: 'food waste' },
                { label: 'CO2e Saved', value: `${impactRecord.co2eSavedKg.toLocaleString()} kg`, unit: 'emissions' },
                { label: 'Revenue Recovered', value: `${(impactRecord.revenueRecovered / 1000000).toFixed(1)}M`, unit: 'VND' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-xl font-extrabold text-white">{m.value}</div>
                  <div className="text-[10px] text-emerald-300 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
