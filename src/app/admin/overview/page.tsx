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
  TrendingUp,
  Globe,
  Droplets,
  ArrowUpRight,
  Activity,
  Clock,
} from 'lucide-react';

const BADGE_COLORS: Record<string, string> = {
  'Planet Champion': 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
  'Green Hero': 'bg-teal-100 text-teal-900 border-teal-300 font-bold',
  'Green Starter': 'bg-blue-100 text-blue-900 border-blue-300 font-bold',
};

const BADGE_ICONS: Record<string, string> = {
  'Planet Champion': '🌍',
  'Green Hero': '🦸',
  'Green Starter': '🌱',
};

// Category Breakdown for Chart 2
const CATEGORY_BREAKDOWN = [
  { name: 'Pizza & Italian', count: 780, pct: 43, color: 'bg-emerald-600', text: 'text-emerald-900' },
  { name: 'Vietnamese Noodle', count: 540, pct: 30, color: 'bg-teal-600', text: 'text-teal-900' },
  { name: 'Japanese & Seafood', count: 320, pct: 17, color: 'bg-amber-500', text: 'text-amber-900' },
  { name: 'Healthy & Vegan', count: 180, pct: 10, color: 'bg-blue-600', text: 'text-blue-900' },
];

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
    <div className="max-w-7xl mx-auto pb-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" /> Executive Platform Control
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Platform Analytics Overview
          </h1>
          <p className="text-sm font-medium text-slate-700 mt-1">
            Aggregate environmental KPIs, growth trends, restaurant leaderboard, and ESG compliance.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 px-4 py-2 rounded-2xl text-xs font-mono font-bold text-emerald-900 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          📅 July 27, 2026 — Live Monitor
        </div>
      </div>

      {/* Prominent Platform KPI Cards (6 Grid Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {[
          {
            label: 'Meals Rescued',
            value: mounted ? impactRecord.mealsRescued.toLocaleString() : '—',
            icon: ShoppingBag,
            color: 'emerald',
            bgColor: 'bg-emerald-50 border-emerald-200',
            textColor: 'text-emerald-950',
            iconColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
            sub: 'Total meals saved',
            growth: '+18% MoM',
          },
          {
            label: 'CO2e Prevented',
            value: mounted ? `${impactRecord.co2eSavedKg.toLocaleString()}` : '—',
            unit: 'kg',
            icon: Leaf,
            color: 'teal',
            bgColor: 'bg-teal-50 border-teal-200',
            textColor: 'text-teal-950',
            iconColor: 'text-teal-700 bg-teal-100 border-teal-300',
            sub: 'Emissions offset',
            growth: '+22% MoM',
          },
          {
            label: 'Revenue Recovered',
            value: mounted ? `${(impactRecord.revenueRecovered / 1000000).toFixed(1)}M` : '—',
            unit: 'VND',
            icon: Banknote,
            color: 'amber',
            bgColor: 'bg-amber-50 border-amber-200',
            textColor: 'text-amber-950',
            iconColor: 'text-amber-800 bg-amber-100 border-amber-300',
            sub: 'Merchant payout',
            growth: '+15% MoM',
          },
          {
            label: 'Active Listings',
            value: mounted ? activeListings : '—',
            icon: BarChart3,
            color: 'blue',
            bgColor: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-950',
            iconColor: 'text-blue-700 bg-blue-100 border-blue-300',
            sub: 'Live on market',
            growth: 'Real-time',
          },
          {
            label: 'Partner Restaurants',
            value: mounted ? totalRestaurants : '—',
            icon: Store,
            color: 'purple',
            bgColor: 'bg-purple-50 border-purple-200',
            textColor: 'text-purple-950',
            iconColor: 'text-purple-700 bg-purple-100 border-purple-300',
            sub: 'Active merchants',
            growth: '+4 new',
          },
          {
            label: 'Total Transactions',
            value: mounted ? totalOrders : '—',
            icon: TrendingUp,
            color: 'rose',
            bgColor: 'bg-rose-50 border-rose-200',
            textColor: 'text-rose-950',
            iconColor: 'text-rose-700 bg-rose-100 border-rose-300',
            sub: 'Customer orders',
            growth: '100% success',
          },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={`bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">{kpi.label}</span>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${kpi.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {kpi.value}{' '}
                  {kpi.unit && <span className="text-sm font-bold text-slate-600">{kpi.unit}</span>}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">{kpi.sub}</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> {kpi.growth}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 Modern SaaS Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Revenue Recovered & CO2e Saved Growth Curve (8 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Revenue & CO2e Prevention Growth Trend
                </h3>
              </div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                Monthly cumulative revenue recovered (M VND) vs. CO2e emissions saved (kg).
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-bold shrink-0">
              <span className="flex items-center gap-1.5 text-emerald-900">
                <span className="w-3 h-3 rounded-full bg-emerald-600" /> Revenue (M đ)
              </span>
              <span className="flex items-center gap-1.5 text-teal-900">
                <span className="w-3 h-3 rounded-full bg-teal-500" /> CO2e Saved (kg)
              </span>
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="h-64 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Grid Y Axis labels */}
              <text x="32" y="24" textAnchor="end" className="text-[10px] font-bold fill-slate-500">70M</text>
              <text x="32" y="64" textAnchor="end" className="text-[10px] font-bold fill-slate-500">50M</text>
              <text x="32" y="104" textAnchor="end" className="text-[10px] font-bold fill-slate-500">30M</text>
              <text x="32" y="144" textAnchor="end" className="text-[10px] font-bold fill-slate-500">10M</text>

              {/* Revenue Area */}
              <path
                d="M 40,130 Q 113,115 186,95 T 333,55 T 480,25 L 480,170 L 40,170 Z"
                fill="url(#revGrad)"
              />
              {/* Revenue Line */}
              <path
                d="M 40,130 Q 113,115 186,95 T 333,55 T 480,25"
                fill="none"
                stroke="#059669"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* CO2 Area */}
              <path
                d="M 40,145 Q 113,132 186,115 T 333,78 T 480,48 L 480,170 L 40,170 Z"
                fill="url(#co2Grad)"
              />
              {/* CO2 Line */}
              <path
                d="M 40,145 Q 113,132 186,115 T 333,78 T 480,48"
                fill="none"
                stroke="#0d9488"
                strokeWidth="3"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Data points & X Axis Labels */}
              {[
                { x: 40, label: 'Jan', val: '22M' },
                { x: 113, label: 'Feb', val: '28.5M' },
                { x: 186, label: 'Mar', val: '35M' },
                { x: 260, label: 'Apr', val: '41M' },
                { x: 333, label: 'May', val: '48M' },
                { x: 406, label: 'Jun', val: '55.4M' },
                { x: 480, label: 'Jul', val: '62M' },
              ].map((pt, i) => (
                <g key={i}>
                  <line x1={pt.x} y1="170" x2={pt.x} y2="175" stroke="#cbd5e1" strokeWidth="1.5" />
                  <text
                    x={pt.x}
                    y="190"
                    textAnchor="middle"
                    className="text-[11px] font-bold fill-slate-700"
                  >
                    {pt.label}
                  </text>
                  {/* Point highlights on Jul */}
                  {i === 6 && (
                    <>
                      <circle cx={pt.x} cy="25" r="6" fill="#059669" className="animate-ping opacity-75" />
                      <circle cx={pt.x} cy="25" r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                      <circle cx={pt.x} cy="48" r="4" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                    </>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Chart 2: Category Volume & Meal Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-700" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Meals Rescued by Cuisine Category
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                1,820 total
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-2">
              Proportions of surplus meals rescued across core food categories.
            </p>

            {/* Custom Bar List */}
            <div className="space-y-4 mt-5">
              {CATEGORY_BREAKDOWN.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{cat.name}</span>
                    <span className={cat.text}>
                      {cat.count} meals ({cat.pct}%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                    <div
                      className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Peak category: Pizza & Italian</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              +24% waste reduction
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Leaderboard + Live Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Leaderboard */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Merchant Impact Leaderboard
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full">
              Ranked by meals saved
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {mounted &&
              leaderboard.map((r, idx) => (
                <div
                  key={r.name}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  {/* Rank Badge */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 shadow-2xs ${
                      idx === 0
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : idx === 1
                        ? 'bg-slate-200 text-slate-800 border border-slate-300'
                        : idx === 2
                        ? 'bg-orange-100 text-orange-900 border border-orange-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-extrabold text-slate-900 truncate">{r.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border ${
                          BADGE_COLORS[r.badge] || 'bg-slate-100 text-slate-800 border-slate-300 font-bold'
                        }`}
                      >
                        {BADGE_ICONS[r.badge]} {r.badge}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-emerald-800">
                      {r.mealsRescued} <span className="text-xs font-bold text-slate-600">meals</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {(r.revenue / 1000).toFixed(0)}K đ rev.
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Active Marketplace Monitor */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-700" />
              <h3 className="text-base font-extrabold text-slate-900">
                Live Marketplace Monitor
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Active Listings ({listings.length})
            </div>
          </div>
          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
            {mounted &&
              listings.map((listing) => (
                <div
                  key={listing.id}
                  className="px-6 py-3.5 flex items-center gap-3.5 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="w-11 h-11 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={listing.image}
                      alt={listing.mealName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {listing.mealName}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600">
                      {listing.restaurantName}
                    </div>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="text-xs font-black text-slate-900">×{listing.quantity}</div>
                    <div className="text-[10px] font-bold text-slate-600">avail</div>
                  </div>
                  <div className="shrink-0">
                    {listing.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Active
                      </span>
                    ) : listing.status === 'sold_out' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 bg-blue-100 border border-blue-300 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" /> Sold Out
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-full">
                        <XCircle className="w-3.5 h-3.5 text-slate-600" /> Expired
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Prominent ESG Results Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                ESG Governance & Sustainability Results
              </h3>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                Verified compliance breakdown for reporting period: <strong>{selectedPeriod}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              id="esg-period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs font-bold text-slate-800 border border-slate-300 rounded-xl px-3.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
              className={`text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-xs ${
                reportGenerated
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {generatingReport ? (
                <span className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : reportGenerated ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Generated!
                </span>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        {/* Prominent Larger Cards for ESG Metrics */}
        {mounted && currentReport && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                {
                  label: 'Meals Rescued',
                  value: currentReport.metrics.mealsRescued.toLocaleString(),
                  icon: ShoppingBag,
                  unit: 'meals',
                  bgColor: 'bg-emerald-50/80 border-emerald-200',
                  textColor: 'text-emerald-950',
                  iconColor: 'text-emerald-800 bg-emerald-100 border-emerald-300',
                },
                {
                  label: 'Food Waste Saved',
                  value: `${currentReport.metrics.foodSavedKg.toLocaleString()}`,
                  unit: 'kg',
                  icon: Globe,
                  bgColor: 'bg-teal-50/80 border-teal-200',
                  textColor: 'text-teal-950',
                  iconColor: 'text-teal-800 bg-teal-100 border-teal-300',
                },
                {
                  label: 'CO2e Prevented',
                  value: `${currentReport.metrics.co2eSavedKg.toLocaleString()}`,
                  unit: 'kg CO2e',
                  icon: Leaf,
                  bgColor: 'bg-green-50/80 border-green-200',
                  textColor: 'text-green-950',
                  iconColor: 'text-green-800 bg-green-100 border-green-300',
                },
                {
                  label: 'Revenue Recovered',
                  value: `${(currentReport.metrics.revenueRecovered / 1000000).toFixed(1)}M`,
                  unit: 'VND',
                  icon: Banknote,
                  bgColor: 'bg-amber-50/80 border-amber-200',
                  textColor: 'text-amber-950',
                  iconColor: 'text-amber-800 bg-amber-100 border-amber-300',
                },
                {
                  label: 'Water Saved',
                  value: `${currentReport.metrics.waterSavedL.toLocaleString()}`,
                  unit: 'Liters',
                  icon: Droplets,
                  bgColor: 'bg-blue-50/80 border-blue-200',
                  textColor: 'text-blue-950',
                  iconColor: 'text-blue-800 bg-blue-100 border-blue-300',
                },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className={`rounded-3xl p-5 border shadow-sm hover:shadow-md transition-all ${m.bgColor}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${m.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className={`text-2xl sm:text-3xl font-black ${m.textColor}`}>
                      {m.value} <span className="text-xs font-bold text-slate-700">{m.unit}</span>
                    </div>
                    <div className="text-xs font-extrabold text-slate-800 mt-1">{m.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Methodology & Metadata Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Official Calculation Methodology
                </div>
                <p className="text-xs font-medium text-slate-300 leading-relaxed max-w-2xl">
                  {currentReport.methodology}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 shrink-0">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Generated: {currentReport.generatedAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
