'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, Store, ShoppingBag, Shield, ArrowRight } from 'lucide-react';
import { useLanguage, TranslationKey } from '@/context/LanguageContext';

export default function DemoAccountsCard() {
  const { t } = useLanguage();

  const DEMO_PROFILES: Array<{
    roleKey: TranslationKey;
    username: string;
    password: string;
    name: string;
    descKey: TranslationKey;
    icon: typeof Store;
    badgeColor: string;
    link: string;
  }> = [
    {
      roleKey: 'demoRoleRestaurant',
      username: 'pizza',
      password: 'demo123',
      name: 'Pizza House',
      descKey: 'demoDescPizza',
      icon: Store,
      badgeColor: 'bg-emerald-100 text-emerald-800',
      link: '/login?role=restaurant&user=pizza',
    },
    {
      roleKey: 'demoRoleRestaurant',
      username: 'phobo',
      password: 'demo123',
      name: 'Pho Bo 24',
      descKey: 'demoDescPhobo',
      icon: Store,
      badgeColor: 'bg-emerald-100 text-emerald-800',
      link: '/login?role=restaurant&user=phobo',
    },
    {
      roleKey: 'demoRoleRestaurant',
      username: 'sushi',
      password: 'demo123',
      name: 'Sakura Sushi',
      descKey: 'demoDescSushi',
      icon: Store,
      badgeColor: 'bg-emerald-100 text-emerald-800',
      link: '/login?role=restaurant&user=sushi',
    },
    {
      roleKey: 'demoRoleCustomer',
      username: 'phucha',
      password: 'demo123',
      name: 'Phuc Ha',
      descKey: 'demoDescPhuc',
      icon: ShoppingBag,
      badgeColor: 'bg-teal-100 text-teal-800',
      link: '/login?role=customer&user=phucha',
    },
    {
      roleKey: 'demoRoleAdmin',
      username: 'admin',
      password: 'demo123',
      name: 'EcoSave Admin',
      descKey: 'demoDescAdmin',
      icon: Shield,
      badgeColor: 'bg-amber-100 text-amber-900',
      link: '/login?role=admin&user=admin',
    },
  ];

  return (
    <section id="demo-accounts" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('demoBadge')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t('demoTitle')}
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            {t('demoSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PROFILES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.username}
                className="bg-[#F6F8F7] border border-slate-200/90 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${p.badgeColor}`}>
                      {t(p.roleKey)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      pwd: <span className="text-slate-700 font-semibold">{p.password}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 font-bold shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                      <p className="text-[11px] font-mono text-slate-500">@{p.username}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{t(p.descKey)}</p>
                </div>

                <Link
                  href={p.link}
                  className="mt-5 w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-emerald-700 hover:text-white text-emerald-800 border border-emerald-300/80 text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{t('demoLoginAs')} {p.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
