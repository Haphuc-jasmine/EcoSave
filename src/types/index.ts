export type UserRole = 'restaurant' | 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  restaurantId?: string;
}

export interface RestaurantSettings {
  autoPublishSurplus: boolean;
  defaultDiscountPct: number;
  notificationEmail: string;
  autoAcceptRecommendations: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  badge: string;
  logoUrl?: string;
  openingHours?: string;
  co2FactorProfile?: string;
  settings?: RestaurantSettings;
}

export interface Meal {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  image: string;
  allergens: string[];
  basePrice: number;
}

export interface ForecastFactors {
  weekdayFactor: number;
  weatherFactor: number;
  eventFactor: number;
  historicalTrendFactor: number;
  promotionFactor: number;
  weatherDescription?: string;
  eventDescription?: string;
}

export interface Forecast {
  id: string;
  restaurantId: string;
  date: string;
  predictedDemand: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
  factors: ForecastFactors;
  recommendedPrep: number;
}

export interface DailyOperation {
  date: string;
  preparedQty: number;
  actualSold: number;
  surplusQty: number;
  recommendedPrep: number;
}

export interface Listing {
  id: string;
  mealId: string;
  restaurantId: string;
  restaurantName: string;
  mealName: string;
  image: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
  discount: number;
  expiresAt: string;
  status: 'active' | 'sold_out' | 'expired';
  distance: string;
  rating: number;
  pickupWindow: string;
  dietaryTags: string[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  listingId: string;
  restaurantId: string;
  restaurantName: string;
  mealName: string;
  quantity: number;
  total: number;
  pickupCode: string;
  status: 'reserved' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  savedVnd: number;
  co2SavedKg: number;
}

export interface ImpactRecord {
  foodSavedKg: number;
  mealsRescued: number;
  co2eSavedKg: number;
  revenueRecovered: number;
  waterSavedL: number;
}

export interface ESGReport {
  id: string;
  restaurantId: string;
  period: string;
  metrics: ImpactRecord;
  methodology: string;
  generatedAt: string;
}

export interface Badge {
  name: string;
  tier: 'Green Starter' | 'Green Hero' | 'Planet Champion';
  threshold: number;
  progress: number;
}
