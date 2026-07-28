import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  Restaurant,
  Listing,
  Order,
  ImpactRecord,
  ESGReport,
  Forecast,
  ForecastFactors,
  DailyOperation,
  Badge,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_RESTAURANTS,
  INITIAL_LISTINGS,
  INITIAL_IMPACT,
  INITIAL_FORECAST,
  INITIAL_ESG_REPORTS,
  INITIAL_DAILY_OPERATIONS,
  INITIAL_BADGES,
} from '../data/seedData';

interface EcoSaveStore {
  currentUser: User | null;
  users: User[];
  restaurants: Restaurant[];
  listings: Listing[];
  orders: Order[];
  impactRecord: ImpactRecord;
  esgReports: ESGReport[];
  forecast: Forecast;
  dailyOperations: DailyOperation[];
  badges: Badge[];
  recommendationAccepted: boolean;
  preparationTarget: number;
  isForecastModalOpen: boolean;
  actualSalesToday: number;

  // Actions
  login: (username: string) => boolean;
  logout: () => void;
  resetDemo: () => void;
  acceptRecommendation: () => void;
  addListing: (listing: Listing) => void;
  reserveMeal: (listingId: string, quantity: number) => { success: boolean; pickupCode?: string; message?: string };
  generateESGReport: (period: string, customMetrics?: ImpactRecord) => ESGReport;
  openForecastModal: () => void;
  closeForecastModal: () => void;
  runForecastSimulation: (customFactors?: Partial<ForecastFactors>) => void;
  recordActualSales: (sales: number) => void;
  updateRestaurant: (restaurantId: string, patch: Partial<Restaurant>) => void;
}

export const useEcoSaveStore = create<EcoSaveStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: INITIAL_USERS,
      restaurants: INITIAL_RESTAURANTS,
      listings: INITIAL_LISTINGS,
      orders: [
        {
          id: 'ord_101',
          customerId: 'cust_phuc',
          customerName: 'Phuc Ha',
          listingId: 'list_1',
          restaurantId: 'rest_pizza',
          restaurantName: 'Pizza House',
          mealName: 'Combo Pizza (Pepperoni & Cheese)',
          quantity: 2,
          total: 190000,
          pickupCode: 'ECO-8492',
          status: 'reserved',
          createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
          expiresAt: '1h 15m',
          savedVnd: 170000,
          co2SavedKg: 2.25,
        },
        {
          id: 'ord_102',
          customerId: 'cust_minh',
          customerName: 'Minh Tran',
          listingId: 'list_1',
          restaurantId: 'rest_pizza',
          restaurantName: 'Pizza House',
          mealName: 'Combo Pizza (Pepperoni & Cheese)',
          quantity: 1,
          total: 95000,
          pickupCode: 'ECO-3104',
          status: 'completed',
          createdAt: new Date(Date.now() - 110 * 60000).toISOString(),
          expiresAt: 'Expired',
          savedVnd: 85000,
          co2SavedKg: 1.12,
        },
      ],
      impactRecord: INITIAL_IMPACT,
      esgReports: INITIAL_ESG_REPORTS,
      forecast: INITIAL_FORECAST,
      dailyOperations: INITIAL_DAILY_OPERATIONS,
      badges: INITIAL_BADGES,
      recommendationAccepted: false,
      preparationTarget: INITIAL_FORECAST.predictedDemand,
      isForecastModalOpen: false,
      actualSalesToday: 103,

      login: (username: string) => {
        let currentUsers = get().users;
        // Migration/Sync check for persisted local storage state
        INITIAL_USERS.forEach((initUser) => {
          if (!currentUsers.some((u) => u.username === initUser.username)) {
            currentUsers = [...currentUsers, initUser];
          }
        });
        set({ users: currentUsers });

        const foundUser = currentUsers.find(
          (u) => u.username.toLowerCase() === username.trim().toLowerCase()
        );
        if (foundUser) {
          set({ currentUser: foundUser });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
      },

      resetDemo: () => {
        set({
          currentUser: null,
          users: INITIAL_USERS,
          restaurants: INITIAL_RESTAURANTS,
          listings: INITIAL_LISTINGS,
          orders: [],
          impactRecord: INITIAL_IMPACT,
          esgReports: INITIAL_ESG_REPORTS,
          forecast: INITIAL_FORECAST,
          dailyOperations: INITIAL_DAILY_OPERATIONS,
          badges: INITIAL_BADGES,
          recommendationAccepted: false,
          preparationTarget: INITIAL_FORECAST.predictedDemand,
          isForecastModalOpen: false,
          actualSalesToday: 103,
        });
      },

      acceptRecommendation: () => {
        const currentForecast = get().forecast;
        set({
          recommendationAccepted: true,
          preparationTarget: currentForecast.recommendedPrep,
        });
      },

      openForecastModal: () => set({ isForecastModalOpen: true }),
      closeForecastModal: () => set({ isForecastModalOpen: false }),

      updateRestaurant: (restaurantId: string, patch: Partial<Restaurant>) => {
        set((state) => ({
          restaurants: state.restaurants.map((r) =>
            r.id === restaurantId ? { ...r, ...patch } : r
          ),
        }));
      },

      runForecastSimulation: (customFactors?: Partial<ForecastFactors>) => {
        const current = get().forecast;
        const updatedFactors: ForecastFactors = {
          ...current.factors,
          ...customFactors,
        };

        // Deterministic forecast calculation per Blueprint §7.2 formula:
        // predictedDemand = recentAverage (120) * weekdayFactor * weatherFactor * eventFactor * promotionFactor
        const baseAvg = 120;
        const predicted = Math.round(
          baseAvg *
            updatedFactors.weekdayFactor *
            updatedFactors.weatherFactor *
            updatedFactors.eventFactor *
            updatedFactors.promotionFactor
        );

        // Confidence derived from factor variance in range 78–92% per Blueprint §7.2
        const factorSum =
          updatedFactors.weekdayFactor +
          updatedFactors.weatherFactor +
          updatedFactors.eventFactor +
          updatedFactors.promotionFactor;
        const confidence = Math.min(92, Math.max(78, Math.round(78 + (factorSum % 0.15) * 100)));
        
        const lowerBound = Math.round(predicted * 0.92);
        const upperBound = Math.round(predicted * 1.08);

        const updatedForecast: Forecast = {
          ...current,
          predictedDemand: predicted,
          lowerBound,
          upperBound,
          confidence,
          recommendedPrep: Math.round(predicted * 1.02),
          factors: updatedFactors,
        };

        set({
          forecast: updatedForecast,
          recommendationAccepted: false,
        });
      },

      recordActualSales: (sales: number) => {
        const prep = get().preparationTarget;
        // Blueprint §7.3: surplusQty = max(preparedQty - actualSold, 0)
        const surplusQty = Math.max(0, prep - sales);

        const todayOp: DailyOperation = {
          date: new Date().toISOString().split('T')[0],
          preparedQty: prep,
          actualSold: sales,
          surplusQty,
          recommendedPrep: get().forecast.recommendedPrep,
        };

        set((state) => ({
          actualSalesToday: sales,
          dailyOperations: [todayOp, ...state.dailyOperations.filter((d) => d.date !== todayOp.date)],
        }));
      },

      addListing: (newListing: Listing) => {
        set((state) => ({
          listings: [newListing, ...state.listings],
        }));
      },

      reserveMeal: (listingId: string, quantity: number) => {
        const state = get();
        const listing = state.listings.find((l) => l.id === listingId);
        if (!listing || listing.quantity < quantity || listing.status !== 'active') {
          return { success: false, message: 'Listing unavailable or out of stock' };
        }

        const pickupCode = `ECO-${Math.floor(1000 + Math.random() * 9000)}`;
        const total = listing.salePrice * quantity;
        const savedVnd = (listing.originalPrice - listing.salePrice) * quantity;
        const foodSavedKg = quantity * 0.45;
        const co2SavedKg = foodSavedKg * 2.5;

        const newOrder: Order = {
          id: `order_${Date.now()}`,
          customerId: state.currentUser?.id || 'cust_guest',
          customerName: state.currentUser?.name || 'Phuc Ha',
          listingId: listing.id,
          restaurantId: listing.restaurantId,
          restaurantName: listing.restaurantName,
          mealName: listing.mealName,
          quantity,
          total,
          pickupCode,
          status: 'reserved',
          createdAt: new Date().toISOString(),
          expiresAt: listing.expiresAt,
          savedVnd,
          co2SavedKg,
        };

        const updatedListings = state.listings.map((l) => {
          if (l.id === listingId) {
            const newQty = l.quantity - quantity;
            return {
              ...l,
              quantity: newQty,
              status: newQty <= 0 ? ('sold_out' as const) : l.status,
            };
          }
          return l;
        });

        const updatedImpact: ImpactRecord = {
          ...state.impactRecord,
          mealsRescued: state.impactRecord.mealsRescued + quantity,
          foodSavedKg: state.impactRecord.foodSavedKg + foodSavedKg,
          co2eSavedKg: state.impactRecord.co2eSavedKg + co2SavedKg,
          revenueRecovered: state.impactRecord.revenueRecovered + total,
          waterSavedL: state.impactRecord.waterSavedL + quantity * 25,
        };

        set({
          listings: updatedListings,
          orders: [newOrder, ...state.orders],
          impactRecord: updatedImpact,
        });

        return { success: true, pickupCode };
      },

      generateESGReport: (period: string, customMetrics?: ImpactRecord) => {
        const state = get();
        const newReport: ESGReport = {
          id: `esg_${Date.now()}`,
          restaurantId: state.currentUser?.restaurantId || 'rest_pizza',
          period,
          metrics: customMetrics ? { ...customMetrics } : { ...state.impactRecord },
          methodology: 'Calculated using 0.45 kg/meal weight factor and 2.5 kg CO2e/kg emission conversion.',
          generatedAt: new Date().toISOString().split('T')[0],
        };

        set((s) => ({
          esgReports: [newReport, ...s.esgReports],
        }));

        return newReport;
      },
    }),
    {
      name: 'ecosave-storage',
    }
  )
);
