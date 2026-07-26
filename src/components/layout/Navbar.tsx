'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, LogOut, RotateCcw, UserCheck, ChevronRight } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout, resetDemo } = useEcoSaveStore();
  const mounted = useHasMounted();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleReset = () => {
    if (confirm('Reset demo state to initial seed data?')) {
      resetDemo();
      router.push('/');
    }
  };

  const getPortalLink = () => {
    if (!currentUser) return '/login';
    switch (currentUser.role) {
      case 'restaurant':
        return '/restaurant/dashboard';
      case 'customer':
        return '/customer/marketplace';
      case 'admin':
        return '/admin/overview';
      default:
        return '/login';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 transition-all">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-emerald-950 flex items-center gap-1.5">
              EcoSave <span className="text-emerald-700">AI</span>
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-emerald-600 -mt-1">
              ESG & Surplus Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-emerald-700 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">
            How It Works
          </a>
          <a href="#impact" className="hover:text-emerald-700 transition-colors">
            Impact
          </a>
          <a href="#demo-accounts" className="hover:text-emerald-700 transition-colors">
            Demo Credentials
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {mounted && currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                href={getPortalLink()}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentUser.name}</span>
                <span className="bg-emerald-700 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                  {currentUser.role}
                </span>
              </Link>
              <Link
                href={getPortalLink()}
                className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm shadow-emerald-700/20"
              >
                <span>Go to Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-700/20"
              >
                <span>Try Demo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Reset Demo Button */}
          {mounted && (
            <button
              onClick={handleReset}
              title="Reset Demo Data"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden lg:inline">Reset Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
