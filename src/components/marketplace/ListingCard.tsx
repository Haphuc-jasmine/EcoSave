'use client';

import React from 'react';
import { Listing } from '@/types';
import { Star, Clock, MapPin, Leaf } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  const isLow = listing.quantity <= 2 && listing.quantity > 0;

  return (
    <button
      id={`listing-card-${listing.id}`}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden text-left w-full"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.mealName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
          -{listing.discount}%
        </div>
        {/* Low stock badge */}
        {isLow && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            Only {listing.quantity} left!
          </div>
        )}
        {listing.status === 'sold_out' && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="text-white font-extrabold text-sm bg-slate-800/80 px-4 py-2 rounded-xl">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="text-[11px] font-semibold text-slate-500 mb-0.5">{listing.restaurantName}</div>
        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
          {listing.mealName}
        </h3>

        {/* Tags */}
        {listing.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {listing.dietaryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5"
              >
                <Leaf className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> {listing.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> {listing.expiresAt}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {listing.rating}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div>
            <span className="text-base font-extrabold text-emerald-700">
              {listing.salePrice.toLocaleString()} đ
            </span>
            <span className="text-xs text-slate-400 line-through ml-2">
              {listing.originalPrice.toLocaleString()} đ
            </span>
          </div>
          <span className="text-[11px] text-slate-500">×{listing.quantity} avail.</span>
        </div>
      </div>
    </button>
  );
}
