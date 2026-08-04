'use client';

import React, { useState, useMemo } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import { PERIOD_METRICS } from '@/data/seedData';
import {
  BarChart3,
  Leaf,
  FileText,
  CheckCircle2,
  Droplets,
  Banknote,
  Globe,
  Clock,
  Sparkles,
  Download,
  Printer,
  TreePine,
  Car,
  ShowerHead,
  Trash2,
  TrendingUp,
  ShoppingBag,
  X,
  FlaskConical,
} from 'lucide-react';

type PeriodKey = 'Week' | 'Month' | 'Quarter' | 'Year';

const PERIOD_LABELS: Record<PeriodKey, string> = {
  Week: 'This Week',
  Month: 'July 2026',
  Quarter: 'Q2 2026',
  Year: '2026 YTD',
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatRevenue(vnd: number) {
  if (vnd >= 1_000_000) return `${(vnd / 1_000_000).toFixed(1)}M`;
  if (vnd >= 1_000) return `${(vnd / 1_000).toFixed(0)}K`;
  return vnd.toString();
}

// ─── Mini SVG Line Chart ────────────────────────────────────────────────────
function ESGTrendChart({ trend }: { trend: { label: string; co2: number; revenue: number; meals: number }[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxCo2 = Math.max(...trend.map((d) => d.co2));
  const minCo2 = Math.min(...trend.map((d) => d.co2));
  const maxRev = Math.max(...trend.map((d) => d.revenue));
  const minRev = Math.min(...trend.map((d) => d.revenue));

  // Extra padding on right for secondary Y-axis labels (Revenue M VND)
  const W = 500, H = 180, PAD_L = 44, PAD_R = 44, PAD_T = 20, PAD_B = 36;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const n = trend.length;

  const co2Y = (v: number) => {
    const range = (maxCo2 - minCo2) || 1;
    return PAD_T + chartH - ((v - minCo2) / range) * chartH;
  };

  // Give Revenue Y-axis a padded domain so the amber line sits at a distinct height
  const revY = (v: number) => {
    const minDomain = Math.min(0, minRev * 0.8);
    const maxDomain = maxRev * 1.15;
    const range = (maxDomain - minDomain) || 1;
    return PAD_T + chartH - ((v - minDomain) / range) * chartH;
  };

  const xPos = (i: number) => PAD_L + (i / (n - 1 || 1)) * chartW;

  // Build SVG path strings
  const co2Path = trend.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i).toFixed(1)},${co2Y(d.co2).toFixed(1)}`).join(' ');
  const revPath = trend.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i).toFixed(1)},${revY(d.revenue).toFixed(1)}`).join(' ');

  const co2AreaClose = ` L ${xPos(n - 1).toFixed(1)},${(PAD_T + chartH).toFixed(1)} L ${PAD_L},${(PAD_T + chartH).toFixed(1)} Z`;
  const revAreaClose = ` L ${xPos(n - 1).toFixed(1)},${(PAD_T + chartH).toFixed(1)} L ${PAD_L},${(PAD_T + chartH).toFixed(1)} Z`;

  // Left Y-axis ticks (CO2)
  const yTicksCo2 = [0, 0.33, 0.66, 1].map((t) => {
    const val = minCo2 + t * (maxCo2 - minCo2 || 1);
    return { y: co2Y(val), label: val >= 1000 ? `${(val / 1000).toFixed(1)}t` : `${Math.round(val)}` };
  });

  // Right Y-axis ticks (Revenue M VND)
  const yTicksRev = [0, 0.5, 1].map((t) => {
    const minDomain = Math.min(0, minRev * 0.8);
    const maxDomain = maxRev * 1.15;
    const val = minDomain + t * (maxDomain - minDomain);
    return { y: revY(val), label: `${val.toFixed(0)}M` };
  });

  const activeItem = hoveredIdx !== null ? trend[hoveredIdx] : null;

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full overflow-visible select-none" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="co2AreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="revAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Grid lines (from Left CO2 axis) */}
        {yTicksCo2.map((tick, i) => (
          <g key={`co2-tick-${i}`}>
            <line x1={PAD_L} y1={tick.y} x2={W - PAD_R} y2={tick.y} stroke="#f1f5f9" strokeWidth="1.5" />
            <text x={PAD_L - 6} y={tick.y + 4} textAnchor="end" fontSize="9.5" fill="#059669" fontWeight="700">
              {tick.label}
            </text>
          </g>
        ))}

        {/* Right Y-axis ticks (Revenue in Amber) */}
        {yTicksRev.map((tick, i) => (
          <text key={`rev-tick-${i}`} x={W - PAD_R + 6} y={tick.y + 4} textAnchor="start" fontSize="9.5" fill="#d97706" fontWeight="700">
            {tick.label}
          </text>
        ))}

        {/* Revenue area + line (Vibrant Amber / Gold) */}
        <path d={revPath + revAreaClose} fill="url(#revAreaGrad)" />
        <path d={revPath} fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="6 3" strokeLinecap="round" strokeLinejoin="round" />

        {/* CO2 area + line (Emerald Green) */}
        <path d={co2Path + co2AreaClose} fill="url(#co2AreaGrad)" />
        <path d={co2Path} fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Vertical hover guideline */}
        {hoveredIdx !== null && (
          <line
            x1={xPos(hoveredIdx)}
            y1={PAD_T}
            x2={xPos(hoveredIdx)}
            y2={PAD_T + chartH}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}

        {/* Data points + X labels */}
        {trend.map((d, i) => {
          const cx = xPos(i);
          const cyCo2 = co2Y(d.co2);
          const cyRev = revY(d.revenue);
          const isHovered = hoveredIdx === i;
          const isLast = i === n - 1;

          return (
            <g key={i}>
              {/* Baseline tick */}
              <line x1={cx} y1={PAD_T + chartH} x2={cx} y2={PAD_T + chartH + 5} stroke="#cbd5e1" strokeWidth="1.5" />
              {/* X label */}
              <text
                x={cx}
                y={H - 2}
                textAnchor="middle"
                fontSize="9.5"
                fill={isHovered ? '#0f172a' : isLast ? '#059669' : '#64748b'}
                fontWeight={isHovered || isLast ? '700' : '600'}
              >
                {d.label}
              </text>

              {/* Revenue dot (Amber) */}
              <circle
                cx={cx}
                cy={cyRev}
                r={isHovered ? 6 : 4}
                fill="#d97706"
                stroke="#fff"
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="transition-all duration-150"
              />

              {/* CO2 dot (Emerald) */}
              <circle
                cx={cx}
                cy={cyCo2}
                r={isHovered ? 6 : isLast ? 4.5 : 4}
                fill="#059669"
                stroke="#fff"
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="transition-all duration-150"
              />

              {/* Transparent invisible touch/hover hit box */}
              <rect
                x={cx - chartW / (2 * (n - 1 || 1))}
                y={PAD_T}
                width={chartW / (n - 1 || 1)}
                height={chartH + PAD_B}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            </g>
          );
        })}
      </svg>

      {/* Compact Floating Tooltip Box */}
      {hoveredIdx !== null && activeItem && (
        <div
          className="absolute z-30 pointer-events-none bg-slate-900/95 text-white text-[10px] rounded-lg px-2.5 py-1.5 shadow-lg border border-slate-700/80 backdrop-blur-sm whitespace-nowrap transition-all transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(xPos(hoveredIdx) / W) * 100}%`,
            top: `${Math.min(co2Y(activeItem.co2), revY(activeItem.revenue)) - 10}px`,
          }}
        >
          <div className="font-extrabold text-amber-400 text-[10px] leading-none mb-1 pb-1 border-b border-slate-800 flex items-center justify-between gap-2">
            <span>{activeItem.label}</span>
            <span className="text-[9px] font-medium text-slate-400">({activeItem.meals} meals)</span>
          </div>
          <div className="space-y-0.5 font-semibold text-[10px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                CO₂:
              </span>
              <strong className="text-white font-bold">{activeItem.co2 >= 1000 ? `${(activeItem.co2 / 1000).toFixed(2)}t` : `${activeItem.co2} kg`}</strong>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                Rev:
              </span>
              <strong className="text-white font-bold">{activeItem.revenue.toFixed(1)}M VND</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Monthly Bar Chart ──────────────────────────────────────────────────────
function MonthlyBarChart({ data }: { data: { month: string; meals: number; co2: number; revenue: number }[] }) {
  const maxMeals = Math.max(...data.map((d) => d.meals));

  return (
    <div className="space-y-3">
      {data.map((d, i) => {
        const isLast = i === data.length - 1;
        const pct = maxMeals > 0 ? (d.meals / maxMeals) * 100 : 0;
        return (
          <div key={d.month} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={isLast ? 'text-emerald-700' : 'text-slate-700'}>{d.month}</span>
              <span className={isLast ? 'text-emerald-800' : 'text-slate-600'}>
                {d.meals.toLocaleString()} meals · {d.co2 >= 1000 ? `${(d.co2 / 1000).toFixed(2)}t` : `${d.co2}kg`} CO2e
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isLast ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-teal-600 to-teal-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Report Preview Modal ───────────────────────────────────────────────────
function ReportModal({
  report,
  onClose,
}: {
  report: { period: string; generatedAt: string; metrics: { foodSavedKg: number; mealsRescued: number; co2eSavedKg: number; revenueRecovered: number; waterSavedL: number } };
  onClose: () => void;
}) {
  const { metrics, period, generatedAt } = report;
  const trees = Math.round(metrics.co2eSavedKg / 20);
  const kmAvoided = Math.round(metrics.co2eSavedKg * 4);

  const handlePrint = () => window.print();
  const handleDownload = () => {
    alert(`PDF download for "${period} ESG Report" would be generated server-side via headless Chrome or PDF library. This is a mock download trigger.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:hidden" onClick={onClose}>
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 rounded-t-3xl px-4 sm:px-6 pt-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-slate-900">ESG Compliance Report</h2>
              <p className="text-xs text-slate-500 font-medium truncate">{period} · Generated {generatedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-2 rounded-xl transition-all"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all shrink-0"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6" id="esg-report-print-area">
          {/* Title block */}
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" /> GHG Protocol Verified
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">Environmental, Social &amp; Governance Report</h3>
            <p className="text-sm text-slate-500 font-medium">Reporting Period: <strong className="text-slate-800">{period}</strong></p>
          </div>

          {/* Core KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Meals Rescued', value: metrics.mealsRescued.toLocaleString(), unit: 'meals', color: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-900' },
              { label: 'Food Waste Saved', value: metrics.foodSavedKg.toLocaleString(), unit: 'kg', color: 'bg-teal-50 border-teal-200', text: 'text-teal-900' },
              { label: 'CO\u2082 Emissions Prevented', value: metrics.co2eSavedKg.toLocaleString(), unit: 'kg CO\u2082', color: 'bg-green-50 border-green-200', text: 'text-green-900' },
              { label: 'Revenue Recovered', value: `${(metrics.revenueRecovered / 1_000_000).toFixed(1)}M`, unit: 'VND', color: 'bg-amber-50 border-amber-200', text: 'text-amber-900' },
              { label: 'Water Saved', value: metrics.waterSavedL.toLocaleString(), unit: 'Liters', color: 'bg-blue-50 border-blue-200', text: 'text-blue-900' },
              { label: 'Trees Equivalent', value: trees.toLocaleString(), unit: 'tree-years', color: 'bg-lime-50 border-lime-200', text: 'text-lime-900' },
            ].map((m) => (
              <div key={m.label} className={`rounded-2xl p-3 border ${m.color}`}>
                <div className={`text-xl font-black ${m.text}`}>{m.value} <span className="text-xs font-semibold text-slate-600">{m.unit}</span></div>
                <div className="text-[11px] font-bold text-slate-600 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Equivalencies */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">Environmental Equivalencies</h4>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2"><TreePine className="w-4 h-4 text-emerald-600 shrink-0" /> {trees} trees growing for a full year</div>
              <div className="flex items-center gap-2"><Car className="w-4 h-4 text-slate-600 shrink-0" /> {kmAvoided.toLocaleString()} km of passenger car travel avoided</div>
              <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-600 shrink-0" /> {metrics.waterSavedL.toLocaleString()} litres of embedded agricultural water saved</div>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-slate-900 text-white rounded-2xl p-4">
            <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2">Calculation Methodology</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              CO2e metrics use a meal weight factor of <strong>0.45 kg/portion</strong> and a mixed-cuisine carbon conversion of <strong>2.5 kg CO2e / kg food</strong>. Water savings assume an embedded agricultural cost of <strong>25L per meal portion</strong>. Compliant with GHG Protocol Scope 3 standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function RestaurantESGPage() {
  const mounted = useHasMounted();
  const { esgReports, generateESGReport, currentUser } = useEcoSaveStore();

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('Month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [previewReport, setPreviewReport] = useState<(typeof esgReports)[0] | null>(null);

  const periodData = useMemo(() => PERIOD_METRICS[selectedPeriod], [selectedPeriod]);
  const impact = periodData.impact;
  const trend = periodData.trend;
  const categoryBreakdown = periodData.categoryBreakdown;
  const monthlyComparison = periodData.monthlyComparison;

  const restaurantName = currentUser?.name || 'Pizza House';

  // Environmental equivalencies derived from impact
  const trees = Math.round(impact.co2eSavedKg / 20);
  const kmAvoided = Math.round(impact.co2eSavedKg * 4);
  const showers = Math.round(impact.waterSavedL / 65); // avg shower = 65L
  const landfillM3 = (impact.foodSavedKg / 600).toFixed(2); // ~600kg / m3 density

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newReport = generateESGReport(PERIOD_LABELS[selectedPeriod], impact);
      setIsGenerating(false);
      setShowToast(true);
      setPreviewReport(newReport);
      setTimeout(() => setShowToast(false), 5000);
    }, 800);
  };

  const kpiCards = [
    {
      id: 'kpi-meals-rescued',
      label: 'Meals Rescued',
      value: mounted ? impact.mealsRescued.toLocaleString() : '—',
      unit: 'meals',
      icon: ShoppingBag,
      gradient: 'from-emerald-50 to-emerald-100/60',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
      valueTxt: 'text-emerald-950',
      sub: '0.45 kg food / meal',
      badge: '+18% vs last period',
    },
    {
      id: 'kpi-food-saved',
      label: 'Food Waste Diverted',
      value: mounted ? `${impact.foodSavedKg.toLocaleString()}` : '—',
      unit: 'kg',
      icon: Globe,
      gradient: 'from-teal-50 to-teal-100/60',
      border: 'border-teal-200',
      iconBg: 'bg-teal-100 text-teal-700',
      valueTxt: 'text-teal-950',
      sub: 'From landfill',
      badge: `${periodData.wasteReductionPct}% reduction rate`,
    },
    {
      id: 'kpi-co2e',
      label: 'CO₂ Emissions Prevented',
      value: mounted ? impact.co2eSavedKg >= 1000 ? `${(impact.co2eSavedKg / 1000).toFixed(2)}` : `${impact.co2eSavedKg}` : '—',
      unit: impact.co2eSavedKg >= 1000 ? 'tonnes CO₂' : 'kg CO₂',
      icon: Leaf,
      gradient: 'from-green-50 to-green-100/60',
      border: 'border-green-200',
      iconBg: 'bg-green-100 text-green-700',
      valueTxt: 'text-green-950',
      sub: '2.5 kg CO₂ / kg food',
      badge: '+22% emissions offset',
    },
    {
      id: 'kpi-revenue',
      label: 'Revenue Recovered',
      value: mounted ? formatRevenue(impact.revenueRecovered) : '—',
      unit: 'VND',
      icon: Banknote,
      gradient: 'from-amber-50 to-amber-100/60',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700',
      valueTxt: 'text-amber-950',
      sub: 'Surplus marketplace sales',
      badge: '+15% revenue recovery',
    },
    {
      id: 'kpi-water-saved',
      label: 'Embedded Water Saved',
      value: mounted ? impact.waterSavedL.toLocaleString() : '—',
      unit: 'L',
      icon: Droplets,
      gradient: 'from-blue-50 to-blue-100/60',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100 text-blue-700',
      valueTxt: 'text-blue-950',
      sub: '25L water / meal portion',
      badge: 'Agricultural footprint',
    },
  ];

  return (
    <PortalLayout>
      {/* ── Print Styles (injected via style tag) ─────────────────────── */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #esg-report-print-area { display: block !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto pb-16 space-y-6">

        {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full mb-2">
              <BarChart3 className="w-3.5 h-3.5" /> Sustainability &amp; Compliance
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ESG Dashboard &amp; Impact Reporting
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-lg">
              Track carbon offset, food waste diversion and generate verified ESG compliance reports for <strong>{restaurantName}</strong>.
            </p>
          </div>

          {/* Period Tabs + CTA */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {/* Pill Period Selector */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-2xl p-1 gap-0.5 overflow-x-auto w-full sm:w-auto">
              {(['Week', 'Month', 'Quarter', 'Year'] as PeriodKey[]).map((p) => (
                <button
                  key={p}
                  id={`period-tab-${p.toLowerCase()}`}
                  onClick={() => setSelectedPeriod(p)}
                  className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                    selectedPeriod === p
                      ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              id="generate-esg-report-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 disabled:opacity-50 w-full sm:w-auto min-h-[44px] sm:min-h-0"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Period Label Banner */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Showing data for:</span>
          <span className="inline-flex items-center gap-1 font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {PERIOD_LABELS[selectedPeriod]}
          </span>
        </div>

        {/* ── TOAST ───────────────────────────────────────────────────── */}
        {showToast && (
          <div className="p-4 bg-emerald-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-emerald-700 shadow-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-xs font-semibold">
                ESG Report for <strong>{PERIOD_LABELS[selectedPeriod]}</strong> generated! —{' '}
                <button
                  onClick={() => previewReport && setPreviewReport(previewReport)}
                  className="underline font-bold"
                >
                  Preview Report
                </button>
              </span>
            </div>
            <button onClick={() => setShowToast(false)} className="text-xs text-emerald-300 hover:underline sm:ml-4 shrink-0 self-end sm:self-auto">Dismiss</button>
          </div>
        )}

        {/* ── KPI CARDS ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.id}
                id={kpi.id}
                className={`bg-gradient-to-b ${kpi.gradient} rounded-3xl p-4 sm:p-5 border ${kpi.border} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col min-h-[160px]`}
              >
                {/* Header: label + icon */}
                <div className="flex items-start justify-between mb-auto">
                  <span className="text-[11px] font-bold text-slate-500 leading-tight pr-2 uppercase tracking-wide">{kpi.label}</span>
                  <div className={`w-9 h-9 rounded-xl ${kpi.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                {/* Primary metric */}
                <div className="mt-3">
                  <div className={`text-2xl sm:text-3xl font-black ${kpi.valueTxt} tracking-tight leading-none`}>
                    {kpi.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">{kpi.unit}</div>
                </div>
                {/* Supporting info */}
                <div className="text-[10px] font-semibold text-slate-400 mt-2">{kpi.sub}</div>
                {/* Footer badge */}
                <div className="mt-3 pt-2.5 border-t border-white/60">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white/90 border border-emerald-200 px-2 py-1 rounded-full whitespace-nowrap">
                    <TrendingUp className="w-2.5 h-2.5" />
                    {kpi.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CHARTS ROW ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ESG Trend Line Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-extrabold text-slate-900">ESG Impact Trend</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-bold text-slate-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shrink-0" /> CO₂ Prevented</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block shrink-0" /> Revenue (M VND)</span>
              </div>
            </div>
            <div className="h-52 w-full pt-2">
              {mounted && <ESGTrendChart trend={trend} />}
            </div>
          </div>

          {/* Impact Breakdown by Category (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-extrabold text-slate-900">Impact by Food Category</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {impact.mealsRescued.toLocaleString()} total
              </span>
            </div>
            <div className="space-y-4 flex-1">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">{cat.name}</span>
                    <span className={cat.text}>{cat.count.toLocaleString()} meals ({cat.pct}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className={`h-full rounded-full ${cat.color} transition-all duration-700`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-600 flex items-center justify-between">
              <span>Top category: Pizza &amp; Italian</span>
              <span className="text-emerald-700 font-bold">43% market share</span>
            </div>
          </div>
        </div>

        {/* ── MONTHLY ESG COMPARISON ──────────────────────────────────── */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-extrabold text-slate-900">ESG Comparison — Period Over Period</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {selectedPeriod} view
            </span>
          </div>
          {mounted && <MonthlyBarChart data={monthlyComparison} />}
        </div>

        {/* ── ENVIRONMENTAL EQUIVALENCIES ─────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TreePine className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-extrabold text-slate-900">Environmental Equivalencies</h3>
            <span className="text-[11px] font-medium text-slate-500 ml-1">What your impact really means</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: TreePine,
                iconBg: 'bg-emerald-100 text-emerald-700',
                cardBg: 'from-emerald-50 to-white border-emerald-200',
                value: mounted ? trees.toLocaleString() : '—',
                unit: 'Trees',
                desc: 'Growing for a full year',
                sub: `≈ ${Math.round(impact.co2eSavedKg / 20)} tree-year carbon absorption`,
              },
              {
                icon: Car,
                iconBg: 'bg-slate-100 text-slate-700',
                cardBg: 'from-slate-50 to-white border-slate-200',
                value: mounted ? kmAvoided.toLocaleString() : '—',
                unit: 'km',
                desc: 'Of car travel avoided',
                sub: `CO₂ equivalent to passenger vehicle`,
              },
              {
                icon: ShowerHead,
                iconBg: 'bg-blue-100 text-blue-700',
                cardBg: 'from-blue-50 to-white border-blue-200',
                value: mounted ? showers.toLocaleString() : '—',
                unit: 'Showers',
                desc: 'Of water conserved',
                sub: `${impact.waterSavedL.toLocaleString()}L embedded agricultural water`,
              },
              {
                icon: Trash2,
                iconBg: 'bg-orange-100 text-orange-700',
                cardBg: 'from-orange-50 to-white border-orange-200',
                value: mounted ? landfillM3 : '—',
                unit: 'm³',
                desc: 'Landfill volume diverted',
                sub: `${impact.foodSavedKg.toLocaleString()} kg food from landfill`,
              },
            ].map((eq) => {
              const Icon = eq.icon;
              return (
                <div
                  key={eq.unit + eq.desc}
                  className={`bg-gradient-to-b ${eq.cardBg} rounded-3xl p-5 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-2xl ${eq.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 leading-none">{eq.value}</div>
                  <div className="text-sm font-extrabold text-slate-700 mt-0.5">{eq.unit}</div>
                  <div className="text-xs font-bold text-slate-600 mt-1">{eq.desc}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-2 pt-2 border-t border-slate-100/80">{eq.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── GENERATED REPORTS HISTORY ───────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-extrabold text-slate-900">Generated ESG Compliance Reports</h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
              {mounted ? esgReports.length : 0} report(s)
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {mounted && esgReports.length === 0 && (
              <div className="px-4 sm:px-6 py-8 text-center text-xs text-slate-400 font-semibold">
                No reports yet. Generate your first ESG report using the button above.
              </div>
            )}
            {mounted && esgReports.map((report) => (
              <div key={report.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900">{report.period} ESG Report</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Generated: {report.generatedAt}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">
                        {report.metrics.co2eSavedKg.toLocaleString()} kg CO₂ prevented
                      </span>
                      <span>•</span>
                      <span className="text-teal-700 font-semibold">
                        {report.metrics.mealsRescued.toLocaleString()} meals rescued
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewReport(report)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-all flex-1 sm:flex-none"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    Preview
                  </button>
                  <button
                    onClick={() => alert(`PDF download for "${report.period} ESG Report" — mock trigger. In production, this would call a server-side PDF generation endpoint.`)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all flex-1 sm:flex-none"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CALCULATION METHODOLOGY (bottom) ────────────────────────── */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4" /> GHG Protocol &amp; Audit Standard
          </div>
          <h3 className="text-base font-extrabold text-white mb-3">Certified Environmental Calculation Methodology</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Meal Weight Factor', value: '0.45 kg / portion', desc: 'Standard average across mixed cuisines' },
              { label: 'CO₂ Conversion', value: '2.5 kg CO₂ / kg food', desc: 'GHG Protocol Scope 3, Category 5' },
              { label: 'Embedded Water', value: '25 L / meal portion', desc: 'Agricultural water footprint estimate' },
            ].map((f) => (
              <div key={f.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{f.label}</div>
                <div className="text-base font-extrabold text-white">{f.value}</div>
                <div className="text-[11px] text-slate-400 mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── REPORT PREVIEW MODAL ────────────────────────────────────────── */}
      {previewReport && (
        <ReportModal report={previewReport} onClose={() => setPreviewReport(null)} />
      )}
    </PortalLayout>
  );
}
