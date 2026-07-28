'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import ListingCard from '@/components/marketplace/ListingCard';
import MealDetailModal from '@/components/marketplace/MealDetailModal';
import CustomerImpactStrip from '@/components/marketplace/CustomerImpactStrip';
import { Listing } from '@/types';
import { Search, SlidersHorizontal, MapPin, Tag, X, ArrowLeft } from 'lucide-react';

type SortMode = 'discount' | 'distance' | 'rating' | 'price_asc';

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'discount', label: '% Discount' },
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating' },
  { value: 'price_asc', label: 'Price: Low to High' },
];

function parseDistance(d: string): number {
  const m = d.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 99;
}

export default function CustomerMarketplacePage() {
  const mounted = useHasMounted();
  const { listings, orders, currentUser } = useEcoSaveStore();

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('discount');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);

  // Derive customer impact from their orders
  const myOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter((o) => o.customerId === currentUser.id && o.status === 'reserved');
  }, [orders, currentUser]);

  const totalMealsRescued = myOrders.reduce((s, o) => s + o.quantity, 0);
  const totalCo2Saved = myOrders.reduce((s, o) => s + o.co2SavedKg, 0);
  const totalVndSaved = myOrders.reduce((s, o) => s + o.savedVnd, 0);

  // Filter & sort listings
  const filteredListings = useMemo(() => {
    let result = listings.filter((l) => l.status !== 'expired');

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.mealName.toLowerCase().includes(q) ||
          l.restaurantName.toLowerCase().includes(q) ||
          l.dietaryTags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (minDiscount > 0) {
      result = result.filter((l) => l.discount >= minDiscount);
    }

    result = [...result].sort((a, b) => {
      switch (sortMode) {
        case 'discount':
          return b.discount - a.discount;
        case 'distance':
          return parseDistance(a.distance) - parseDistance(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'price_asc':
          return a.salePrice - b.salePrice;
        default:
          return 0;
      }
    });

    return result;
  }, [listings, sortMode, searchQuery, minDiscount]);

  const activeListings = filteredListings.filter((l) => l.status === 'active');
  const soldOutListings = filteredListings.filter((l) => l.status === 'sold_out');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Surplus Meal Marketplace
          </h1>
          <p className="text-sm font-medium text-slate-600 mt-1">
            Rescue discounted surplus meals from nearby restaurants — save money and the planet. 🌱
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-3 rounded-2xl transition-all shadow-md hover:scale-[1.02] shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Customer Impact Strip */}
      {mounted && (
        <CustomerImpactStrip
          mealsRescued={totalMealsRescued}
          co2SavedKg={totalCo2Saved}
          savedVnd={totalVndSaved}
          orderCount={myOrders.length}
        />
      )}

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="marketplace-search"
            type="text"
            placeholder="Search meals, restaurants, dietary tags…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            id="sort-select"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none pr-2"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort by: {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Toggle */}
        <button
          id="filter-toggle-btn"
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
            showFilters || minDiscount > 0
              ? 'bg-emerald-700 text-white border-emerald-700'
              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters {minDiscount > 0 && `(≥${minDiscount}%)`}
        </button>
      </div>

      {/* Expanded Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">
              Minimum Discount: {minDiscount}%
            </span>
          </div>
          <input
            id="min-discount-slider"
            type="range"
            min={0}
            max={60}
            step={5}
            value={minDiscount}
            onChange={(e) => setMinDiscount(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Any discount</span>
            <span>60%+ off</span>
          </div>
          {minDiscount > 0 && (
            <button
              onClick={() => setMinDiscount(0)}
              className="mt-2 text-[11px] text-red-600 font-semibold hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
      )}

      {/* Results Summary */}
      {mounted && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            <span className="font-bold text-slate-800">{activeListings.length}</span> meals available
            {searchQuery && (
              <span>
                {' '}
                for &ldquo;<span className="text-emerald-700">{searchQuery}</span>&rdquo;
              </span>
            )}
          </p>
          {(searchQuery || minDiscount > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setMinDiscount(0);
              }}
              className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Listing Grid — Active */}
      {mounted && activeListings.length > 0 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activeListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={() => setSelectedListing(listing)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Sold Out Section */}
      {mounted && soldOutListings.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sold Out — Claimed Before You!
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 opacity-60">
            {soldOutListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={() => setSelectedListing(listing)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {mounted && filteredListings.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-base font-bold text-slate-800 mb-2">No Meals Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : 'No surplus meals match your current filters. Try adjusting the discount filter.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setMinDiscount(0);
            }}
            className="mt-4 inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Meal Detail Modal */}
      {selectedListing && (
        <MealDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
