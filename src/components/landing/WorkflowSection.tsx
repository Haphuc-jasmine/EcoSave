'use client';

import React from 'react';
import { Cpu, Lightbulb, ShoppingCart, FileText, ArrowRight } from 'lucide-react';
import { useLanguage, TranslationKey } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function WorkflowSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-14 bg-white border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-10 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 mb-1.5">
            {t('workflowBadge')}
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('workflowTitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`relative bg-[#F8FAF9] hover:bg-white rounded-xl p-4 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-md transition-all duration-200 group flex flex-col justify-between ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: isVisible ? `${idx * 90}ms` : '0ms',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-extrabold tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2 py-0.5 rounded-md shadow-2xs">
                      STEP {item.step}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5 tracking-tight group-hover:text-emerald-700 transition-colors">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                    {t(item.descKey)}
                  </p>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4.5 -translate-y-1/2 z-20 items-center justify-center w-7 h-7 rounded-full bg-white border border-emerald-300 shadow-sm text-emerald-700">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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


