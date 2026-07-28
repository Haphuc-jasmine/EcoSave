'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, ShieldCheck, BarChart3, LogOut, RotateCcw } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';

const ADMIN_NAV = [
  { label: 'Platform Overview', href: '/admin/overview', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout, resetDemo } = useEcoSaveStore();
  const router = useRouter();
  const mounted = useHasMounted();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleReset = () => {
    if (confirm('Reset demo state to initial seed data?')) {
      resetDemo();
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F8] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">EcoSave</span>
              <span className="block text-[10px] font-mono text-amber-400">ADMIN CONTROL PANEL</span>
            </div>
          </Link>
        </div>

        {/* Admin Badge */}
        <div className="p-4 mx-3 my-3 bg-amber-900/30 rounded-2xl border border-amber-800/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-700/40 border border-amber-600/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              {mounted && currentUser?.name ? currentUser.name : 'EcoSave Admin'}
            </div>
            <div className="text-[10px] text-amber-400 font-mono">System Administrator</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all bg-amber-600 text-white font-bold shadow-sm"
              >
                <Icon className="w-4 h-4 text-white" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-[11px] text-slate-400 hover:text-red-400 transition-colors py-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
          {mounted && (
            <button
              onClick={handleReset}
              className="w-full flex items-center gap-2 text-[11px] text-slate-400 hover:text-amber-400 transition-colors py-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Admin Control Panel — Platform Analytics
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500 font-mono">Live Demo Mode</span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
