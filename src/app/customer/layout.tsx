'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, ShoppingBag, LogOut, User, ArrowLeft } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useEcoSaveStore();
  const router = useRouter();
  const mounted = useHasMounted();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-slate-900 tracking-tight">EcoSave AI</span>
                <span className="block text-[9px] font-mono text-emerald-600 leading-tight">CUSTOMER MARKETPLACE</span>
              </div>
            </Link>

            {/* Prominent Back to Home Secondary CTA */}
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:scale-[1.02]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            <Link
              href="/customer/marketplace"
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-200 hover:bg-emerald-200/80 px-3 py-1.5 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Marketplace
            </Link>
            
            {/* Mobile Back to Home */}
            <Link
              href="/"
              className="md:hidden flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>Home</span>
            </Link>
          </nav>

          {/* User Info + Logout */}
          <div className="flex items-center gap-3">
            {mounted && currentUser && (
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <div className="w-7.5 h-7.5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-emerald-800" />
                </div>
                <span className="font-bold text-slate-800">{currentUser.name}</span>
              </div>
            )}
            <button
              id="customer-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 px-3 py-1.5 rounded-xl transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span className="font-medium">© 2026 EcoSave AI — Fighting food waste, one meal at a time 🌱</span>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-1.5 rounded-xl transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
            <span>Back to Home</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
