'use client';

import React, { useState } from 'react';
import { Listing } from '@/types';
import {
  X,
  Star,
  MapPin,
  Clock,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Truck,
  Store,
} from 'lucide-react';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import PickupConfirmation from './PickupConfirmation';

interface MealDetailModalProps {
  listing: Listing;
  onClose: () => void;
}

export default function MealDetailModal({ listing, onClose }: MealDetailModalProps) {
  const { reserveMeal } = useEcoSaveStore();
  const [quantity, setQuantity] = useState(1);
  const [reserveState, setReserveState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [pickupCode, setPickupCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const maxQty = Math.min(listing.quantity, 10);
  const totalSalePrice = listing.salePrice * quantity;
  const totalSaved = (listing.originalPrice - listing.salePrice) * quantity;
  const co2Saved = quantity * 0.45 * 2.5;
  // Flat delivery fee of 25,000đ
  const deliveryFee = fulfillmentType === 'delivery' ? 25000 : 0;
  const grandTotal = totalSalePrice + deliveryFee;

  const handleReserve = () => {
    if (fulfillmentType === 'delivery' && deliveryAddress.trim().length < 5) {
      setErrorMsg('Please enter a valid delivery address.');
      return;
    }
    setReserveState('loading');
    setErrorMsg('');
    setTimeout(() => {
      const result = reserveMeal(
        listing.id,
        quantity,
        fulfillmentType,
        fulfillmentType === 'delivery' ? deliveryAddress.trim() : undefined
      );
      if (result.success && result.pickupCode) {
        setPickupCode(result.pickupCode);
        setReserveState('success');
      } else {
        setErrorMsg(result.message || 'Could not complete reservation. Please try again.');
        setReserveState('idle');
      }
    }, 600);
  };

  if (reserveState === 'success') {
    return (
      <PickupConfirmation
        pickupCode={pickupCode}
        mealName={listing.mealName}
        restaurantName={listing.restaurantName}
        pickupWindow={listing.pickupWindow}
        quantity={quantity}
        totalPaid={grandTotal}
        savedVnd={totalSaved}
        co2SavedKg={co2Saved}
        fulfillmentType={fulfillmentType}
        deliveryAddress={fulfillmentType === 'delivery' ? deliveryAddress : undefined}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-lg sm:mx-4 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Image Header */}
        <div className="relative h-40 sm:h-52 shrink-0">
          <img
            src={listing.image}
            alt={listing.mealName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          {/* Discount badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-extrabold px-3 py-1 rounded-full shadow">
            -{listing.discount}%
          </div>
          {/* Close button */}
          <button
            id="close-meal-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Title over image */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs font-semibold text-emerald-300">{listing.restaurantName}</div>
            <h2 className="text-lg font-extrabold text-white leading-snug">{listing.mealName}</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Meta Row */}
          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {listing.rating}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {listing.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Pickup: {listing.pickupWindow}
            </span>
          </div>

          {/* Dietary Tags */}
          {listing.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {listing.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1"
                >
                  <Leaf className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Availability */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">
              🔥 {listing.quantity} portions remaining
            </span>
            <span className="text-[10px] text-amber-600 font-mono">Expires in {listing.expiresAt}</span>
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-lg font-extrabold text-emerald-700">
                  {listing.salePrice.toLocaleString()} đ
                </div>
                <div className="text-xs text-slate-400 line-through">
                  {listing.originalPrice.toLocaleString()} đ per portion
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-red-600">Save {totalSaved.toLocaleString()} đ</div>
                <div className="text-[10px] text-slate-400">for {quantity} portion(s)</div>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-2 block">Select Quantity</label>
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <button
                id="qty-decrease-btn"
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
              >
                <Minus className="w-4 h-4 text-slate-700" />
              </button>
              <span className="text-xl font-extrabold text-slate-900 w-6 text-center">{quantity}</span>
              <button
                id="qty-increase-btn"
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                disabled={quantity >= maxQty}
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
              >
                <Plus className="w-4 h-4 text-slate-700" />
              </button>
              <div className="flex-1 text-right min-w-[100px]">
                <div className="text-base font-extrabold text-slate-900">
                  {totalSalePrice.toLocaleString()} đ
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  You save {totalSaved.toLocaleString()} đ
                </div>
              </div>
            </div>
          </div>

          {/* ── Fulfillment Selector ── */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-2 block">How do you want to get it?</label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Pickup option */}
              <button
                id="fulfillment-pickup-btn"
                type="button"
                onClick={() => { setFulfillmentType('pickup'); setErrorMsg(''); }}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-3 sm:p-4 transition-all duration-200 min-h-[44px] ${
                  fulfillmentType === 'pickup'
                    ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  fulfillmentType === 'pickup' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Store className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className={`text-sm font-extrabold ${fulfillmentType === 'pickup' ? 'text-emerald-800' : 'text-slate-700'}`}>
                    Self Pickup
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Free · Show code</div>
                </div>
                {fulfillmentType === 'pickup' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </button>

              {/* Delivery option */}
              <button
                id="fulfillment-delivery-btn"
                type="button"
                onClick={() => { setFulfillmentType('delivery'); setErrorMsg(''); }}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-3 sm:p-4 transition-all duration-200 min-h-[44px] ${
                  fulfillmentType === 'delivery'
                    ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  fulfillmentType === 'delivery' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className={`text-sm font-extrabold ${fulfillmentType === 'delivery' ? 'text-blue-800' : 'text-slate-700'}`}>
                    Delivery
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">+25,000 đ fee</div>
                </div>
                {fulfillmentType === 'delivery' && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                )}
              </button>
            </div>

            {/* Delivery address input */}
            {fulfillmentType === 'delivery' && (
              <div className="mt-3">
                <label htmlFor="delivery-address" className="text-xs font-bold text-slate-700 mb-1.5 block">
                  Delivery Address
                </label>
                <input
                  id="delivery-address"
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => { setDeliveryAddress(e.target.value); setErrorMsg(''); }}
                  placeholder="e.g. 123 Nguyen Hue, District 1, HCM"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
                <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Estimated delivery: 30–45 min from pickup window
                </p>
              </div>
            )}

            {/* Grand total with delivery fee breakdown */}
            {fulfillmentType === 'delivery' && (
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{totalSalePrice.toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Delivery fee</span>
                  <span className="font-semibold">25,000 đ</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-blue-800 border-t border-blue-200 pt-1 mt-1">
                  <span>Total</span>
                  <span>{grandTotal.toLocaleString()} đ</span>
                </div>
              </div>
            )}
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl">
              {errorMsg}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-3 sm:p-4 pt-3 border-t border-slate-100 bg-white shrink-0">
          <button
            id="reserve-meal-btn"
            onClick={handleReserve}
            disabled={listing.quantity === 0 || listing.status !== 'active' || reserveState === 'loading'}
            className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-2xl transition-all min-h-[44px] ${
              listing.status === 'active' && listing.quantity > 0
                ? fulfillmentType === 'delivery'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:scale-[1.01]'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 hover:scale-[1.01]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {reserveState === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing…
              </>
            ) : listing.status === 'active' && listing.quantity > 0 ? (
              <>
                {fulfillmentType === 'delivery' ? <Truck className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {fulfillmentType === 'delivery' ? 'Order Delivery' : 'Reserve for Pickup'} — {grandTotal.toLocaleString()} đ
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Sold Out
              </>
            )}
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            {fulfillmentType === 'pickup'
              ? 'Free cancellation before pickup window. No prepayment required.'
              : 'Delivery fee collected at drop-off. Allow 30–45 min after pickup window.'}
          </p>
        </div>
      </div>
    </div>
  );
}
