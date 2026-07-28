import React from 'react';
import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100/80 border-t border-emerald-900/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">EcoSave</span>
            </div>
            <p className="text-xs text-emerald-200/70 max-w-sm leading-relaxed">
              AI-powered ESG platform enabling restaurants to forecast demand, eliminate food waste,
              sell surplus meals, and automate ESG compliance reporting.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Platform Demo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Restaurant Portal
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Customer Marketplace
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Admin Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Built For MVP
            </h4>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Designed according to EcoSave Product Blueprint v1.0 (July 2026).
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-4">
          <p>© 2026 EcoSave. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
            <span>for sustainable food systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
