'use client';

import React, { useState, useMemo } from 'react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import {
  ShieldCheck,
  ShoppingBag,
  Leaf,
  Banknote,
  BarChart3,
  Store,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Globe,
  Droplets,
} from 'lucide-react';

const BADGE_COLORS: Record<string, string> = {
  'Planet Champion': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Green Hero': 'bg-teal-100 text-teal-800 border-teal-200',
  'Green Starter': 'bg-blue-100 text-blue-800 border-blue-200',
};

const BADGE_ICONS: Record<string, string> = {
  'Planet Champion': '🌍',
  'Green Hero': '🦸',
  'Green Starter': '🌱',
};

export default function AdminOverviewPage() {
  const mounted = useHasMounted();
  const { listings, orders, restaurants, impactRecord, esgReports, generateESGReport } =
    useEcoSaveStore();

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    esgReports[0]?.period || 'July 2026'
  );
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Platform KPIs
  const activeListings = listings.filter((l) => l.status === 'active').length;
  const totalOrders = orders.length;
  const totalRestaurants = restaurants.length;

  // Restaurant leaderboard — count meals rescued per restaurant
  const leaderboard = useMemo(() => {
    const map: Record<string, { name: string; mealsRescued: number; badge: string; revenue: number }> = {};
    restaurants.forEach((r) => {
      map[r.id] = { name: r.name, mealsRescued: 0, badge: r.badge, revenue: 0 };
    });
    orders.forEach((o) => {
      if (map[o.restaurantId]) {
        map[o.restaurantId].mealsRescued += o.quantity;
        map[o.restaurantId].revenue += o.total;
      }
    });
    return Object.values(map).sort((a, b) => b.mealsRescued - a.mealsRescued);
  }, [restaurants, orders]);

  // ESG period report
  const currentReport = esgReports.find((r) => r.period === selectedPeriod) || esgReports[0];

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
      generateESGReport(selectedPeriod);
      setGeneratingReport(false);
      setReportGenerated(true);
      setTimeout(() => setReportGenerated(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Dashboard
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Platform Analytics Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregate KPIs, restaurant leaderboard, live marketplace status, and ESG reporting.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-emerald-800">
          📅 July 27, 2026 — Live
        </div>
      </div>

      {/* Platform KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: 'Meals Rescued',
            value: mounted ? impactRecord.mealsRescued.toLocaleString() : '—',
            icon: ShoppingBag,
            color: 'emerald',
            sub: 'Platform total',
          },
          {
            label: 'CO2e Saved',
            value: mounted ? `${impactRecord.co2eSavedKg.toLocaleString()} kg` : '—',
            icon: Leaf,
            color: 'teal',
            sub: 'Emissions prevented',
          },
          {
            label: 'Revenue Recovered',
            value: mounted ? `${(impactRecord.revenueRecovered / 1000000).toFixed(1)}M đ` : '—',
            icon: Banknote,
            color: 'amber',
            sub: 'For restaurants',
          },
          {
            label: 'Active Listings',
            value: mounted ? activeListings : '—',
            icon: BarChart3,
            color: 'blue',
            sub: 'Right now',
          },
          {
            label: 'Restaurants',
            value: mounted ? totalRestaurants : '—',
            icon: Store,
            color: 'purple',
            sub: 'Onboarded',
          },
          {
            label: 'Total Orders',
            value: mounted ? totalOrders : '—',
            icon: TrendingUp,
            color: 'rose',
            sub: 'All time',
          },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div
                className={`w-9 h-9 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-700 flex items-center justify-center mb-3`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-lg font-extrabold text-slate-900">{kpi.value}</div>
              <div className="text-[10px] font-semibold text-slate-500 mt-0.5">{kpi.label}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Leaderboard + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Leaderboard */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Restaurant Activity Leaderboard</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {mounted && leaderboard.map((r, idx) => (
              <div
                key={r.name}
                className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/60 transition-colors"
              >
                {/* Rank */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 ${
                    idx === 0
                      ? 'bg-amber-100 text-amber-800'
                      : idx === 1
                      ? 'bg-slate-100 text-slate-600'
                      : idx === 2
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">{r.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        BADGE_COLORS[r.badge] || 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {BADGE_ICONS[r.badge]} {r.badge}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-extrabold text-emerald-700">
                    {r.mealsRescued} meals
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {(r.revenue / 1000).toFixed(0)}K đ rev.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Marketplace Monitor */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Live Marketplace Monitor</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>
          <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
            {mounted && listings.map((listing) => (
              <div
                key={listing.id}
                className="px-6 py-3.5 flex items-center gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={listing.image}
                    alt={listing.mealName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{listing.mealName}</div>
                  <div className="text-[10px] text-slate-500">{listing.restaurantName}</div>
                </div>
                <div className="text-center shrink-0">
                  <div className="text-xs font-bold text-slate-800">×{listing.quantity}</div>
                  <div className="text-[9px] text-slate-400">qty left</div>
                </div>
                <div className="shrink-0">
                  {listing.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : listing.status === 'sold_out' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Sold Out
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" /> Expired
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ESG Results by Period */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">ESG Results by Period</h3>
          </div>
          <div className="flex items-center gap-3">
            <select
              id="esg-period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {esgReports.map((r) => (
                <option key={r.id} value={r.period}>
                  {r.period}
                </option>
              ))}
              <option value="August 2026">August 2026</option>
            </select>
            <button
              id="generate-esg-btn"
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                reportGenerated
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-900 hover:bg-slate-700 text-white'
              }`}
            >
              {generatingReport ? (
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating…
                </span>
              ) : reportGenerated ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Generated!
                </span>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        {mounted && currentReport && (
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  label: 'Meals Rescued',
                  value: currentReport.metrics.mealsRescued.toLocaleString(),
                  icon: ShoppingBag,
                  unit: 'meals',
                  color: 'emerald',
                },
                {
                  label: 'Food Waste Saved',
                  value: `${currentReport.metrics.foodSavedKg.toLocaleString()} kg`,
                  icon: Globe,
                  unit: 'food',
                  color: 'teal',
                },
                {
                  label: 'CO2e Prevented',
                  value: `${currentReport.metrics.co2eSavedKg.toLocaleString()} kg`,
                  icon: Leaf,
                  unit: 'CO2e',
                  color: 'green',
                },
                {
                  label: 'Revenue Recovered',
                  value: `${(currentReport.metrics.revenueRecovered / 1000000).toFixed(1)}M đ`,
                  icon: Banknote,
                  unit: 'VND',
                  color: 'amber',
                },
                {
                  label: 'Water Saved',
                  value: `${currentReport.metrics.waterSavedL.toLocaleString()} L`,
                  icon: Droplets,
                  unit: 'water',
                  color: 'blue',
                },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className={`bg-${m.color}-50 border border-${m.color}-100 rounded-2xl p-4`}
                  >
                    <Icon className={`w-5 h-5 text-${m.color}-600 mb-2`} />
                    <div className={`text-lg font-extrabold text-${m.color}-900`}>{m.value}</div>
                    <div className={`text-[10px] font-semibold text-${m.color}-700 mt-0.5`}>
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Generated: <strong>{currentReport.generatedAt}</strong> · Period:{' '}
                  <strong>{currentReport.period}</strong>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 italic">{currentReport.methodology}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
