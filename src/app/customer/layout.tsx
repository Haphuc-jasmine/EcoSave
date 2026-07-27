'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, ShoppingBag, LogOut, User } from 'lucide-react';
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
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight">EcoSave AI</span>
              <span className="block text-[9px] font-mono text-emerald-600 leading-tight">CUSTOMER MARKETPLACE</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/customer/marketplace"
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Marketplace
            </Link>
          </nav>

          {/* User Info + Logout */}
          <div className="flex items-center gap-3">
            {mounted && currentUser && (
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span className="font-semibold text-slate-700">{currentUser.name}</span>
              </div>
            )}
            <button
              id="customer-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] text-slate-400">
          <span>© 2026 EcoSave AI — Fighting food waste, one meal at a time 🌱</span>
          <Link href="/" className="hover:text-emerald-600 transition-colors">Back to Home</Link>
        </div>
      </footer>
    </div>
  );
}
