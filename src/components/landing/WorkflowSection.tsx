import React from 'react';
import { Cpu, Lightbulb, ShoppingCart, FileText, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Cpu,
    title: 'Forecast Demand',
    description:
      'Predict daily meal orders using AI analysis factoring weekday trends, rain/weather forecasts, local events, and historical demand.',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    step: '02',
    icon: Lightbulb,
    title: 'Recommend Action',
    description:
      'Receive actionable prep recommendations to adjust kitchen prep targets and avoid overproducing food before waste happens.',
    color: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  {
    step: '03',
    icon: ShoppingCart,
    title: 'Sell Surplus',
    description:
      'Convert actual end-of-day leftovers into discounted marketplace listings with dynamic pricing based on time remaining.',
    color: 'bg-teal-100 text-teal-900 border-teal-200',
  },
  {
    step: '04',
    icon: FileText,
    title: 'Report ESG Impact',
    description:
      'Quantify food saved, CO2e emissions reduced, and revenue recovered to export audit-ready monthly ESG reports.',
    color: 'bg-slate-100 text-slate-800 border-slate-200',
  },
];

export default function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            The EcoSave Workflow
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            From Demand Prediction to Carbon Offset Reporting
          </p>
          <p className="mt-3 text-slate-600 text-sm">
            A seamless cycle that stops food waste before it starts and monetizes unavoidable surplus.
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
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
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
