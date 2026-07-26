'use client';

import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import KpiCards from '@/components/dashboard/KpiCards';
import AiRecommendationCard from '@/components/dashboard/AiRecommendationCard';
import SalesForecastChart from '@/components/dashboard/SalesForecastChart';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import EnvironmentalMiniCard from '@/components/dashboard/EnvironmentalMiniCard';
import ForecastSimulationModal from '@/components/forecast/ForecastSimulationModal';

export default function RestaurantDashboardPage() {
  return (
    <PortalLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Today&apos;s Operating Picture</h1>
            <p className="text-xs text-slate-500 mt-1">
              Live kitchen metrics, AI demand prediction curve, and waste prevention guidance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl">
              📅 Sunday, July 26, 2026
            </span>
          </div>
        </div>

        {/* 5 Core KPI Cards */}
        <KpiCards />

        {/* AI Recommendation Engine Banner */}
        <AiRecommendationCard />

        {/* Hourly Demand & Sales Chart */}
        <SalesForecastChart />

        {/* Quick Kitchen Action triggers */}
        <QuickActions />

        {/* Recent Orders & Environmental Mini Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrdersTable />
          </div>
          <div>
            <EnvironmentalMiniCard />
          </div>
        </div>
      </div>

      {/* Staged AI Forecast Simulation Modal */}
      <ForecastSimulationModal />
    </PortalLayout>
  );
}
