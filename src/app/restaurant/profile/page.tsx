'use client';

import React, { useState } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { useEcoSaveStore } from '@/store/useEcoSaveStore';
import { useHasMounted } from '@/lib/useHasMounted';
import {
  Store,
  MapPin,
  Clock,
  Mail,
  Leaf,
  Bell,
  Zap,
  Percent,
  CheckCircle2,
  Save,
  ChevronRight,
  Info,
} from 'lucide-react';

/* ─── Badge colour map ─────────────────────────────────────────────────── */
const BADGE_STYLES: Record<string, string> = {
  'Green Hero': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'Planet Champion': 'bg-teal-100 text-teal-800 border-teal-300',
  'Green Starter': 'bg-lime-100 text-lime-800 border-lime-300',
};

/* ─── Cuisine options ──────────────────────────────────────────────────── */
const CUISINE_OPTIONS = [
  'Italian & Pizza',
  'Vietnamese Noodle',
  'Japanese & Seafood',
  'Healthy & Vegan',
  'Burgers & Grills',
  'Chinese & Dim Sum',
  'Korean BBQ',
  'Mexican & Tacos',
  'Other',
];

/* ─── Toast notification ───────────────────────────────────────────────── */
function SaveToast({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-sm font-medium px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>Settings saved successfully</span>
    </div>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────────────── */
function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-emerald-600" />
        </div>
        <h2 className="text-sm font-bold text-slate-800">{title}</h2>
      </div>
      <div className="p-4 sm:p-6 space-y-5">{children}</div>
    </div>
  );
}

/* ─── Form field helpers ───────────────────────────────────────────────── */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-400 flex items-center gap-1"><Info className="w-3 h-3" />{hint}</p>}
    </div>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition-shadow placeholder:text-slate-300';

/* ─── Toggle switch ────────────────────────────────────────────────────── */
function Toggle({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex items-center h-6 w-11 rounded-full shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
          checked ? 'bg-emerald-500' : 'bg-slate-200'
        }`}
      >
        <span
          className={`inline-block w-4.5 h-4.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

/* ═══ Form (inner component – keyed by restaurantId for clean remount) ═══ */
import { Restaurant } from '@/types';

type FormState = {
  name: string;
  cuisine: string;
  address: string;
  openingHours: string;
  notificationEmail: string;
  defaultDiscountPct: number;
  autoPublishSurplus: boolean;
  autoAcceptRecommendations: boolean;
};

function ProfileForm({
  restaurant,
  restaurantId,
  updateRestaurant,
}: {
  restaurant: Restaurant | undefined;
  restaurantId: string;
  updateRestaurant: (id: string, patch: Record<string, unknown>) => void;
}) {
  const initialForm: FormState = {
    name: restaurant?.name ?? '',
    cuisine: restaurant?.cuisine ?? '',
    address: restaurant?.address ?? '',
    openingHours: restaurant?.openingHours ?? '',
    notificationEmail: restaurant?.settings?.notificationEmail ?? '',
    defaultDiscountPct: restaurant?.settings?.defaultDiscountPct ?? 40,
    autoPublishSurplus: restaurant?.settings?.autoPublishSurplus ?? true,
    autoAcceptRecommendations: restaurant?.settings?.autoAcceptRecommendations ?? true,
  };

  const [form, setForm] = useState<FormState>(initialForm);
  const [toastVisible, setToastVisible] = useState(false);
  const [dirty, setDirty] = useState(false);

  /* Patch a single field and mark dirty */
  const patch = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  /* Save handler */
  const handleSave = () => {
    updateRestaurant(restaurantId, {
      name: form.name.trim() || restaurant?.name,
      cuisine: form.cuisine,
      address: form.address.trim() || restaurant?.address,
      openingHours: form.openingHours,
      settings: {
        notificationEmail: form.notificationEmail.trim(),
        defaultDiscountPct: form.defaultDiscountPct,
        autoPublishSurplus: form.autoPublishSurplus,
        autoAcceptRecommendations: form.autoAcceptRecommendations,
      },
    });
    setDirty(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const badgeCls = BADGE_STYLES[restaurant?.badge ?? ''] ?? 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <>

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profile &amp; Settings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your restaurant information and operational preferences.
            </p>
          </div>
          {/* EcoSave badge pill */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${badgeCls}`}>
            <Leaf className="w-3.5 h-3.5" />
            {restaurant?.badge}
          </span>
        </div>

        {/* ── Identity card (read-only overview) ── */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-6 flex items-center gap-4 sm:gap-5 text-white shadow-lg shadow-emerald-900/20">
          <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl shrink-0 select-none">
            🍕
          </div>
          <div className="min-w-0">
            <p className="text-lg font-extrabold tracking-tight truncate">{form.name || restaurant?.name}</p>
            <p className="text-sm text-emerald-100 mt-0.5 truncate">{form.cuisine || restaurant?.cuisine}</p>
            <p className="text-xs text-emerald-200 mt-1 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {form.address || restaurant?.address}
            </p>
          </div>
          <div className="ml-auto hidden sm:flex flex-col items-end gap-1 text-right shrink-0">
            <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest">Restaurant ID</span>
            <span className="text-xs font-bold font-mono bg-white/10 px-2.5 py-1 rounded-lg">{restaurantId}</span>
          </div>
        </div>

        {/* ── Basic Information ── */}
        <Section title="Basic Information" icon={Store}>
          <Field label="Restaurant Name">
            <input
              id="profile-name"
              type="text"
              value={form.name}
              onChange={(e) => patch('name', e.target.value)}
              className={inputCls}
              placeholder="Your restaurant name"
            />
          </Field>

          <Field label="Cuisine Type">
            <select
              id="profile-cuisine"
              value={form.cuisine}
              onChange={(e) => patch('cuisine', e.target.value)}
              className={inputCls}
            >
              {CUISINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </Field>

          <Field label="Address" hint="Used for marketplace listing and customer navigation.">
            <input
              id="profile-address"
              type="text"
              value={form.address}
              onChange={(e) => patch('address', e.target.value)}
              className={inputCls}
              placeholder="123 Street, District, City"
            />
          </Field>

          <Field label="Opening Hours">
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="profile-hours"
                type="text"
                value={form.openingHours}
                onChange={(e) => patch('openingHours', e.target.value)}
                className={`${inputCls} pl-9`}
                placeholder="e.g. 10:00 AM – 10:00 PM"
              />
            </div>
          </Field>
        </Section>

        {/* ── Notification Settings ── */}
        <Section title="Notification Settings" icon={Bell}>
          <Field
            label="Alert Email"
            hint="Receives low-stock alerts and surplus publication confirmations."
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="profile-email"
                type="email"
                value={form.notificationEmail}
                onChange={(e) => patch('notificationEmail', e.target.value)}
                className={`${inputCls} pl-9`}
                placeholder="alerts@yourrestaurant.vn"
              />
            </div>
          </Field>
        </Section>

        {/* ── Operational Preferences ── */}
        <Section title="Operational Preferences" icon={Zap}>
          <Field
            label="Default Discount for Surplus Meals"
            hint="Applied automatically when publishing surplus listings."
          >
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="profile-discount"
                type="number"
                min={5}
                max={90}
                value={form.defaultDiscountPct}
                onChange={(e) => patch('defaultDiscountPct', Number(e.target.value))}
                className={`${inputCls} pl-9`}
              />
            </div>
            {/* Visual discount bar */}
            <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all"
                style={{ width: `${Math.min(form.defaultDiscountPct, 90)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Customers see meals at <strong>{form.defaultDiscountPct}% off</strong> original price.
            </p>
          </Field>

          <div className="border-t border-slate-100 pt-5 space-y-4">
            <Toggle
              id="toggle-auto-publish"
              checked={form.autoPublishSurplus}
              onChange={(v) => patch('autoPublishSurplus', v)}
              label="Auto-publish Surplus"
              description="Automatically list surplus meals on the marketplace without manual confirmation."
            />
            <Toggle
              id="toggle-auto-accept"
              checked={form.autoAcceptRecommendations}
              onChange={(v) => patch('autoAcceptRecommendations', v)}
              label="Auto-accept AI Recommendations"
              description="Apply AI prep-quantity suggestions instantly when a new forecast is generated."
            />
          </div>
        </Section>

        {/* ── Breadcrumb context ── */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <ChevronRight className="w-3 h-3" />
          <span>Changes are saved to your session. Reset Demo will restore defaults.</span>
        </div>

        {/* ── Save Button ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          {dirty && (
            <span className="text-xs text-amber-600 font-medium animate-pulse text-center sm:text-left">
              Unsaved changes
            </span>
          )}
          <button
            id="profile-save-btn"
            onClick={handleSave}
            disabled={!dirty}
            className={`flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 text-sm font-bold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 w-full sm:w-auto min-h-[44px] sm:min-h-0 ${
              dirty
                ? 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-md shadow-emerald-900/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

      <SaveToast visible={toastVisible} />
    </>
  );
}

/* ═══ Page Shell ════════════════════════════════════════════════════════ */
export default function RestaurantProfilePage() {
  const mounted = useHasMounted();
  const { currentUser, restaurants, updateRestaurant } = useEcoSaveStore();
  const restaurantId = currentUser?.restaurantId ?? 'rest_pizza';
  const restaurant = restaurants.find((r) => r.id === restaurantId) ?? restaurants[0];

  if (!mounted) return null;

  return (
    <PortalLayout>
      <ProfileForm
        key={restaurantId}
        restaurant={restaurant}
        restaurantId={restaurantId}
        updateRestaurant={updateRestaurant as (id: string, patch: Record<string, unknown>) => void}
      />
    </PortalLayout>
  );
}
