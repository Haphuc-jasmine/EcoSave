'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  Leaf,
  Sparkles,
  User,
  Bell,
  RotateCcw,
  Menu,
  X,
} from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';

const RESTAURANT_NAV: Array<{
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
}> = [
  { label: 'Dashboard', href: '/restaurant/dashboard', icon: LayoutDashboard },
  { label: 'AI Forecast', href: '/restaurant/forecast', icon: TrendingUp },
  { label: 'Surplus Meals', href: '/restaurant/surplus', icon: Package },
  { label: 'Marketplace Listings', href: '/restaurant/listings', icon: ShoppingBag },
  { label: 'ESG Dashboard', href: '/restaurant/esg', icon: BarChart3 },
  { label: 'Profile & Settings', href: '/restaurant/profile', icon: Settings },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, resetDemo, openForecastModal } = useEcoSaveStore();
  const mounted = useHasMounted();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleReset = () => {
    if (confirm('Reset demo state to initial seed data?')) {
      resetDemo();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col md:flex-row">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 max-w-[85vw] md:w-64 md:max-w-none bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 transition-transform duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:h-auto h-screen overflow-y-auto`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/50">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">EcoSave</span>
              <span className="block text-[10px] font-mono text-emerald-400">RESTAURANT PORTAL</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Restaurant Info */}
        <div className="p-4 mx-3 my-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-emerald-700/50 flex items-center justify-center text-emerald-300 font-bold text-sm">
            🍕
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">
              {mounted && currentUser?.name ? currentUser.name : 'Pizza House'}
            </h4>
            <p className="text-[10px] text-emerald-400 font-mono">ID: rest_pizza</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {RESTAURANT_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 md:py-2.5 rounded-xl text-xs font-medium transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Forecast Trigger Action */}
        <div className="p-3">
          <button
            onClick={openForecastModal}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-md shadow-emerald-950/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Run AI Simulation</span>
          </button>
        </div>

        {/* Reset Demo Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">MVP Version 1.0</span>
          {mounted && (
            <button
              onClick={handleReset}
              title="Reset Demo Data"
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Workspace Header */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-1 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              Restaurant Operational Portal
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Notification Indicator */}
            <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800">
                  {mounted && currentUser?.name ? currentUser.name : 'Pizza House'}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold uppercase">
                  Green Hero Badge
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <div className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
