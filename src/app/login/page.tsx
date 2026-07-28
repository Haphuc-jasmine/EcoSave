'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Store, ShoppingBag, ShieldCheck, KeyRound, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useEcoSaveStore();

  const roleParam = searchParams.get('role');
  const userParam = searchParams.get('user');

  const initialRole: 'restaurant' | 'customer' | 'admin' =
    roleParam === 'customer' || roleParam === 'admin' || roleParam === 'restaurant'
      ? roleParam
      : 'restaurant';

  const initialUsername =
    userParam ||
    (initialRole === 'customer' ? 'phuc' : initialRole === 'admin' ? 'admin' : 'pizza');

  const [activeTab, setActiveTab] = useState<'restaurant' | 'customer' | 'admin'>(initialRole);
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState('demo123');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleTabChange = (role: 'restaurant' | 'customer' | 'admin') => {
    setActiveTab(role);
    setErrorMessage('');
    if (role === 'restaurant') setUsername('pizza');
    if (role === 'customer') setUsername('phuc');
    if (role === 'admin') setUsername('admin');
    setPassword('demo123');
  };

  const handleQuickFill = (uname: string) => {
    setUsername(uname);
    setPassword('demo123');
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== 'demo123') {
      setErrorMessage('Invalid password for demo account. Password must be "demo123".');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(username);
      if (success) {
        if (username === 'admin') {
          router.push('/admin/overview');
        } else if (username === 'phuc') {
          router.push('/customer/marketplace');
        } else {
          router.push('/restaurant/dashboard');
        }
      } else {
        setIsLoading(false);
        setErrorMessage(`Account "@${username}" not found. Try one of the demo usernames below.`);
      }
    }, 400);
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setErrorMessage('');

    // Future Google OAuth Handler Fallback: Perform instant authentication with current active role demo user
    setTimeout(() => {
      const targetUser = activeTab === 'customer' ? 'phuc' : activeTab === 'admin' ? 'admin' : 'pizza';
      const success = login(targetUser);
      if (success) {
        if (targetUser === 'admin') {
          router.push('/admin/overview');
        } else if (targetUser === 'phuc') {
          router.push('/customer/marketplace');
        } else {
          router.push('/restaurant/dashboard');
        }
      } else {
        setGoogleLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50/50 via-white to-[#F6F8F7]">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
        
        {/* Left Side: Brand Visual */}
        <div className="md:col-span-5 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">EcoSave AI</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-amber-300" /> Demo Authentication
            </span>

            <h2 className="text-2xl font-bold leading-tight mb-3">
              Role-Based Instant Portal Access
            </h2>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Experience EcoSave AI across restaurant operator, customer diner, and platform administrator viewpoints.
            </p>
          </div>

          <div className="space-y-3 my-6 pt-6 border-t border-emerald-800/60">
            <div className="flex items-center gap-3 text-xs text-emerald-200">
              <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                <Store className="w-3.5 h-3.5" />
              </div>
              <span><strong>Restaurant:</strong> Demand forecast & surplus listing</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-emerald-200">
              <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-teal-300 shrink-0">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span><strong>Customer:</strong> Reserve meals & view personal impact</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-emerald-200">
              <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span><strong>Admin:</strong> Platform governance & aggregate ESG</span>
            </div>
          </div>

          <div className="text-[11px] text-emerald-400/80">
            Password for all demo accounts: <code className="bg-emerald-800 px-1.5 py-0.5 rounded text-white font-mono">demo123</code>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-slate-900 mb-1">Welcome to EcoSave AI</h3>
          <p className="text-xs text-slate-500 mb-6">Select a demo role to inspect pre-seeded data</p>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleTabChange('restaurant')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'restaurant'
                  ? 'bg-white text-emerald-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Restaurant</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('customer')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'customer'
                  ? 'bg-white text-emerald-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('admin')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-emerald-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Premium "Continue with Google" Button */}
          <button
            type="button"
            id="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-2xs hover:shadow-xs disabled:opacity-50"
          >
            {googleLoading ? (
              <span className="flex items-center gap-2 text-slate-600">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                Authenticating with Google…
              </span>
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                Or sign in with demo account
              </span>
            </div>
          </div>

          {/* Quick Pre-fill selector */}
          <div className="mb-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Available Demo Accounts for {activeTab}
            </div>
            <div className="flex flex-wrap gap-2">
              {activeTab === 'restaurant' && (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('pizza')}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      username === 'pizza'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🍕 Pizza House (@pizza)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('phobo')}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      username === 'phobo'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🍜 Pho Bo 24 (@phobo)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('sushi')}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      username === 'sushi'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🍣 Sakura Sushi (@sushi)
                  </button>
                </>
              )}
              {activeTab === 'customer' && (
                <button
                  type="button"
                  onClick={() => handleQuickFill('phuc')}
                  className="text-xs px-3 py-1.5 rounded-lg border bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                >
                  👤 Phuc Nguyen (@phuc)
                </button>
              )}
              {activeTab === 'admin' && (
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin')}
                  className="text-xs px-3 py-1.5 rounded-lg border bg-emerald-50 border-emerald-500 text-emerald-900 font-bold"
                >
                  🛡️ EcoSave Admin (@admin)
                </button>
              )}
            </div>
          </div>

          {/* Inline Error */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all pr-10"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Preset password: <span className="font-mono text-slate-600">demo123</span></p>
            </div>

            <button
              type="submit"
              disabled={isLoading || googleLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-700/20 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Enter {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading demo login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
