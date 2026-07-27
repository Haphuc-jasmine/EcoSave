'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PortalLayout from '@/components/layout/PortalLayout';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import {
  PackagePlus,
  Sparkles,
  Tag,
  Clock,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Info,
  Percent,
} from 'lucide-react';
import { Listing } from '@/types';

const DIETARY_OPTIONS = [
  'Vegan',
  'Vegetarian',
  'Gluten-Free Option',
  'Contains Dairy',
  'Freshly Baked',
  'Hot Soup',
  'Fresh Seafood',
  'High Fiber',
  'Omega-3 Rich',
  'Spicy',
];

const CATEGORIES = [
  'Pizza & Calzone',
  'Pasta & Sides',
  'Burger & Sandwich',
  'Sushi & Japanese',
  'Vietnamese Noodle',
  'Salad & Bowl',
  'Dessert',
  'Beverage',
  'Other',
];

function computeDynamicDiscount(pickupWindow: string): number {
  // Heuristic: parse first hour from "8:30 PM - 9:30 PM" → closing gap
  const lowerWindow = pickupWindow.toLowerCase();
  if (lowerWindow.includes('30m') || lowerWindow.includes('20m')) return 55;
  // Simple bucket based on text length / format — use hours-to-close approximation
  const match = pickupWindow.match(/(\d+)h/);
  const hours = match ? parseInt(match[1]) : 1;
  if (hours <= 1) return 50;
  if (hours <= 2) return 35;
  return 20;
}

export default function SurplusPublishPage() {
  const router = useRouter();
  const { addListing, currentUser } = useEcoSaveStore();

  const [form, setForm] = useState({
    mealName: '',
    category: CATEGORIES[0],
    quantity: 5,
    originalPrice: 120000,
    pickupWindow: '8:00 PM - 9:00 PM',
    dietaryTags: [] as string[],
  });

  const [manualDiscount, setManualDiscount] = useState(false);
  const [manualDiscountPct, setManualDiscountPct] = useState(35);
  const [submitted, setSubmitted] = useState(false);
  const [newPickupCode, setNewPickupCode] = useState('');

  const dynamicDiscount = computeDynamicDiscount(form.pickupWindow);
  const appliedDiscount = manualDiscount ? manualDiscountPct : dynamicDiscount;
  const salePrice = Math.round(form.originalPrice * (1 - appliedDiscount / 100));
  const savedVnd = (form.originalPrice - salePrice) * form.quantity;
  const foodSavedKg = form.quantity * 0.45;
  const co2Saved = foodSavedKg * 2.5;

  const isValid = form.mealName.trim().length > 0 && form.quantity > 0 && form.originalPrice > 0;

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      dietaryTags: prev.dietaryTags.includes(tag)
        ? prev.dietaryTags.filter((t) => t !== tag)
        : [...prev.dietaryTags, tag],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const restaurantId = currentUser?.restaurantId || 'rest_pizza';
    const restaurantName = currentUser?.name || 'Pizza House';
    const code = `ECO-${Math.floor(1000 + Math.random() * 9000)}`;

    const newListing: Listing = {
      id: `list_${Date.now()}`,
      mealId: `meal_${Date.now()}`,
      restaurantId,
      restaurantName,
      mealName: form.mealName,
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      quantity: form.quantity,
      originalPrice: form.originalPrice,
      salePrice,
      discount: appliedDiscount,
      expiresAt: '1h 30m',
      status: 'active',
      distance: '0.0 km',
      rating: 4.8,
      pickupWindow: form.pickupWindow,
      dietaryTags: form.dietaryTags,
    };

    addListing(newListing);
    setNewPickupCode(code);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PortalLayout>
        <div className="max-w-2xl mx-auto pb-12">
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 shadow-2xl border border-emerald-700 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
              ✅ Listing Published!
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">{form.mealName}</h1>
            <p className="text-sm text-emerald-200/80 mb-6">
              Your surplus meal is now live on the EcoSave marketplace.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-800/40 rounded-2xl p-4 border border-emerald-700/40">
                <div className="text-xl font-extrabold text-amber-300">
                  {appliedDiscount}%
                </div>
                <div className="text-[11px] text-emerald-300 mt-1">Discount Applied</div>
              </div>
              <div className="bg-emerald-800/40 rounded-2xl p-4 border border-emerald-700/40">
                <div className="text-xl font-extrabold text-white">{form.quantity}</div>
                <div className="text-[11px] text-emerald-300 mt-1">Meals Listed</div>
              </div>
              <div className="bg-emerald-800/40 rounded-2xl p-4 border border-emerald-700/40">
                <div className="text-xl font-extrabold text-emerald-300">
                  {co2Saved.toFixed(1)} kg
                </div>
                <div className="text-[11px] text-emerald-300 mt-1">CO2e Potential</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/restaurant/listings')}
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                View My Listings
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    mealName: '',
                    category: CATEGORIES[0],
                    quantity: 5,
                    originalPrice: 120000,
                    pickupWindow: '8:00 PM - 9:00 PM',
                    dietaryTags: [],
                  });
                }}
                className="inline-flex items-center justify-center gap-2 bg-emerald-800/60 hover:bg-emerald-700/60 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all border border-emerald-700"
              >
                Publish Another
              </button>
            </div>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto pb-12 space-y-6">
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full mb-2">
            <PackagePlus className="w-3.5 h-3.5" /> Surplus Publishing
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Publish Surplus Meal to Marketplace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            List your remaining inventory at a dynamic discount — recovered revenue is better than zero.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Main Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Meal Details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Meal Details
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Meal Name *</label>
                <input
                  id="meal-name-input"
                  type="text"
                  value={form.mealName}
                  onChange={(e) => setForm((p) => ({ ...p, mealName: e.target.value }))}
                  placeholder="e.g. Combo Pizza (Pepperoni & Cheese)"
                  className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <select
                    id="category-select"
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full text-sm text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Quantity Available *</label>
                  <input
                    id="quantity-input"
                    type="number"
                    min={1}
                    max={200}
                    value={form.quantity}
                    onChange={(e) => setForm((p) => ({ ...p, quantity: parseInt(e.target.value) || 0 }))}
                    className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Pickup Window
                </label>
                <input
                  id="pickup-window-input"
                  type="text"
                  value={form.pickupWindow}
                  onChange={(e) => setForm((p) => ({ ...p, pickupWindow: e.target.value }))}
                  placeholder="e.g. 8:00 PM - 9:30 PM"
                  className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" /> Pricing Configuration
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Original (Full) Price (VND) *</label>
                <input
                  id="original-price-input"
                  type="number"
                  min={1000}
                  step={1000}
                  value={form.originalPrice}
                  onChange={(e) => setForm((p) => ({ ...p, originalPrice: parseInt(e.target.value) || 0 }))}
                  className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                  required
                />
              </div>

              {/* Dynamic Pricing Banner */}
              {!manualDiscount && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-900">
                      Dynamic Pricing Suggestion: {dynamicDiscount}% off
                    </div>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Based on your pickup window timing. Sale price:{' '}
                      <strong>{salePrice.toLocaleString()} VND</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Manual Override */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="manual-discount-toggle"
                  onClick={() => setManualDiscount((v) => !v)}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 transition-colors ${
                    manualDiscount
                      ? 'bg-amber-500 border-amber-500'
                      : 'bg-slate-200 border-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transition-transform ${
                      manualDiscount ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <label className="text-xs font-semibold text-slate-700">
                  Set Manual Discount
                </label>
              </div>

              {manualDiscount && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Discount: {manualDiscountPct}%
                    </label>
                    <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      Sale: {salePrice.toLocaleString()} VND
                    </span>
                  </div>
                  <input
                    id="manual-discount-slider"
                    type="range"
                    min={5}
                    max={80}
                    step={5}
                    value={manualDiscountPct}
                    onChange={(e) => setManualDiscountPct(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>5% off</span>
                    <span>80% off</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dietary Tags */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" /> Dietary Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    id={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                      form.dietaryTags.includes(tag)
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Live Preview */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 border border-slate-700 shadow-xl sticky top-24">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-3">
                Live Preview
              </div>

              {/* Mock card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-28 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-4xl relative">
                  🍽️
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                    -{appliedDiscount}%
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {form.mealName || 'Your Meal Name…'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {currentUser?.name || 'Pizza House'} • {form.category}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-xs font-extrabold text-emerald-700">
                        {salePrice.toLocaleString()} đ
                      </span>
                      <span className="text-[10px] text-slate-400 line-through ml-1">
                        {form.originalPrice.toLocaleString()} đ
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">×{form.quantity}</span>
                  </div>
                </div>
              </div>

              {/* Impact estimate */}
              <div className="mt-4 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Potential Impact
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Revenue recovered</span>
                  <span className="font-bold text-emerald-300">
                    {(salePrice * form.quantity).toLocaleString()} đ
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Food waste prevented</span>
                  <span className="font-bold text-amber-300">{foodSavedKg.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">CO2e saved (if sold out)</span>
                  <span className="font-bold text-teal-300">{co2Saved.toFixed(1)} kg</span>
                </div>
              </div>

              {/* Info notice */}
              <div className="mt-4 flex items-start gap-2 p-3 bg-slate-700/60 rounded-xl border border-slate-600/50">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Listing goes live instantly. Customers can see and reserve this meal in the
                  marketplace.
                </p>
              </div>

              <button
                id="publish-listing-btn"
                type="submit"
                disabled={!isValid}
                className={`mt-4 w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-all ${
                  isValid
                    ? 'bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-md shadow-amber-400/20 hover:scale-[1.01]'
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
              >
                <PackagePlus className="w-4 h-4" />
                Publish to Marketplace
              </button>
            </div>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
}
