'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, LogOut, RotateCcw, UserCheck, ChevronRight, Menu, X, Globe } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const router = useRouter();
  const { currentUser, logout, resetDemo } = useEcoSaveStore();
  const mounted = useHasMounted();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // run once on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-white border-b border-slate-100/80 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 transition-all duration-300">
            <Leaf className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 transition-colors duration-300 whitespace-nowrap">
              EcoSave
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-wider font-semibold text-emerald-600 -mt-1 whitespace-nowrap">
              {t('navTagline')}
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-emerald-700 transition-colors">
            Features
          </a>
          <a href="#impact" className="hover:text-emerald-700 transition-colors">
            ESG Reports
          </a>
          <a href="/login?role=customer" className="hover:text-emerald-700 transition-colors">
            Marketplace
          </a>
          <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">
            About
          </a>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              title="English"
              className={`px-2 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-sm leading-none">🇬🇧</span>
              <span className="text-[11px]">EN</span>
            </button>
            <button
              onClick={() => setLanguage('vi')}
              title="Tiếng Việt"
              className={`px-2 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                language === 'vi'
                  ? 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-sm leading-none">🇻🇳</span>
              <span className="text-[11px]">VI</span>
            </button>
          </div>

          {mounted && currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href={getPortalLink()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors max-w-[110px] sm:max-w-none"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{currentUser.name}</span>
                <span className="hidden sm:inline bg-emerald-700 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                  {currentUser.role}
                </span>
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
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 px-2 sm:px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                href="/login?role=restaurant"
                className="inline-flex items-center gap-1 sm:gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 hover:scale-[1.02] whitespace-nowrap shrink-0"
              >
                <span>Get Demo</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          )}

          {/* Reset Demo Button */}
          {mounted && (
            <button
              onClick={handleReset}
              title="Reset Demo Data"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-4 space-y-1.5 max-h-[calc(100vh-72px)] overflow-y-auto">
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 min-h-[44px] flex items-center"
          >
            Features
          </a>
          <a
            href="#impact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 min-h-[44px] flex items-center"
          >
            ESG Reports
          </a>
          <a
            href="/login?role=customer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 min-h-[44px] flex items-center"
          >
            Marketplace
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 min-h-[44px] flex items-center"
          >
            About
          </a>
          <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 px-3 py-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-600" /> Language
            </span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                title="English"
                className={`px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  language === 'en'
                    ? 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <span className="text-sm leading-none">🇬🇧</span>
                <span className="text-[11px]">EN</span>
              </button>
              <button
                onClick={() => setLanguage('vi')}
                title="Tiếng Việt"
                className={`px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  language === 'vi'
                    ? 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <span className="text-sm leading-none">🇻🇳</span>
                <span className="text-[11px]">VI</span>
              </button>
            </div>
          </div>
          {mounted && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleReset();
              }}
              className="w-full flex items-center gap-2 py-3 px-3 rounded-lg text-sm font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/50 min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Demo Data
            </button>
          )}
        </div>
      )}
    </header>
  );
}
