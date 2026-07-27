'use client';

import React from 'react';
import { Cpu, Lightbulb, ShoppingCart, FileText, ArrowRight } from 'lucide-react';
import { useLanguage, TranslationKey } from '@/context/LanguageContext';

export default function WorkflowSection() {
  const { t, language } = useLanguage();

  const STEPS: Array<{
    step: string;
    icon: typeof Cpu;
    titleKey: TranslationKey;
    descKey: TranslationKey;
    color: string;
  }> = [
    {
      step: '01',
      icon: Cpu,
      titleKey: 'workflowStep1Title',
      descKey: 'workflowStep1Desc',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      step: '02',
      icon: Lightbulb,
      titleKey: 'workflowStep2Title',
      descKey: 'workflowStep2Desc',
      color: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      step: '03',
      icon: ShoppingCart,
      titleKey: 'workflowStep3Title',
      descKey: 'workflowStep3Desc',
      color: 'bg-teal-100 text-teal-900 border-teal-200',
    },
    {
      step: '04',
      icon: FileText,
      titleKey: 'workflowStep4Title',
      descKey: 'workflowStep4Desc',
      color: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${language === 'vi' ? 'max-w-3xl' : 'max-w-2xl'} mx-auto mb-16`}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            {t('workflowBadge')}
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {t('workflowTitle')}
          </p>
          <p className="mt-3 text-slate-600 text-sm">
            {t('workflowSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-[#F6F8F7] rounded-2xl p-6 border border-slate-200/80 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">STEP {item.step}</span>
                    <div className={`p-2.5 rounded-xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t(item.descKey)}</p>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
