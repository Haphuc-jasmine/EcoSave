import React from 'react';
import { BrainCircuit, Tag, Store, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'AI Demand Forecast',
    badge: 'Core Engine',
    description:
      'Predict order volume per hour with 78–92% confidence. Evaluates weather impact, day of week, local concerts, and historic trends.',
    link: '/login?role=restaurant',
  },
  {
    icon: Tag,
    title: 'Dynamic Time Pricing',
    badge: 'Revenue Maximizer',
    description:
      'Automatically adjust meal pricing as expiration windows shrink (>90m = 20% off, 45–90m = 35% off, <45m = 50% off) to ensure 100% sell-through.',
    link: '/login?role=restaurant',
  },
  {
    icon: Store,
    title: 'Surplus Marketplace',
    badge: 'Customer Portal',
    description:
      'Connect eco-conscious diners with discounted meals nearby. Instant pickup codes, distance sorting, and live stock countdowns.',
    link: '/login?role=customer',
  },
  {
    icon: BarChart3,
    title: 'Automated ESG Reporting',
    badge: 'Audit Ready',
    description:
      'Transform kitchen operations into verified environmental achievements: CO2e reduced, food weight saved, water conserved, and badges unlocked.',
    link: '/login?role=restaurant',
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 bg-[#F6F8F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            Powerful Capabilities
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Everything Restaurants & Diners Need
          </p>
          <p className="mt-3 text-slate-600 text-sm">
            Designed for intuitive kitchen management and smooth consumer meal reservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100/80 text-emerald-800 px-2.5 py-1 rounded-full">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{feat.description}</p>
                </div>

                <Link
                  href={feat.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all"
                >
                  <span>Experience in Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
