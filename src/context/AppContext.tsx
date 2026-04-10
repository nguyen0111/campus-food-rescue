"use client";

import { Guild, Order, OrderItem, UserProfile, getCanteenById, getMealById, guilds, initialProfile } from "@/lib/data";
import React, { createContext, useCallback, useContext, useState } from "react";

type FilterType = "latest" | "co2" | "urgent" | "vegan";

interface AppState {
  profile: UserProfile;
  orders: Order[];
  currentOrder: Order | null;
  cart: { mealId: string; quantity: number }[];
  searchQuery: string;
  filterType: FilterType;
  showSuccessModal: boolean;
  lastOrderCO2: number;
  guilds: Guild[];
}

interface AppContextType extends AppState {
  setSearchQuery: (q: string) => void;
  setFilterType: (f: FilterType) => void;
  addToCart: (mealId: string, quantity: number) => void;
  placeOrder: (priceType: "student" | "regular", items?: { mealId: string; quantity: number }[]) => Order | null;
  verifyStudent: () => void;
  clearCurrentOrder: () => void;
  toggleFavoriteCanteen: (canteenId: string) => void;
  closeSuccessModal: () => void;
  setUserGuild: (guildId: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [cart, setCart] = useState<{ mealId: string; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("latest");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderCO2, setLastOrderCO2] = useState(0);
  const [guildsState, setGuildsState] = useState<Guild[]>(guilds);

  const addToCart = useCallback((mealId: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.mealId === mealId);
      if (existing) {
        return prev.map((item) =>
          item.mealId === mealId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { mealId, quantity }];
    });
  }, []);

  const placeOrder = useCallback((priceType: "student" | "regular", directItems?: { mealId: string; quantity: number }[]) => {
    // Use directItems if provided (avoids stale cart state), otherwise fall back to cart
    const orderItems = directItems || cart;
    if (orderItems.length === 0) return null;

    const firstMeal = getMealById(orderItems[0].mealId);
    if (!firstMeal) return null;

    const canteen = getCanteenById(firstMeal.canteenId);
    if (!canteen) return null;

    let totalPrice = 0;
    let totalCO2 = 0;
    const items: OrderItem[] = orderItems.map((item) => {
      const meal = getMealById(item.mealId);
      const price = meal 
        ? (priceType === "student" ? meal.studentPrice : meal.regularPrice) * item.quantity 
        : 0;
      totalPrice += price;
      totalCO2 += meal ? meal.co2Saved * item.quantity : 0;
      return { mealId: item.mealId, quantity: item.quantity };
    });

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      canteenId: firstMeal.canteenId,
      canteenName: canteen.name,
      canteenAddress: canteen.address,
      pickupTime: firstMeal.pickupTime,
      totalPrice: Math.round(totalPrice * 100) / 100,
      createdAt: new Date().toISOString(),
      qrCode: `QR-${Date.now().toString(36).toUpperCase()}`,
      co2Saved: Math.round(totalCO2 * 10) / 10,
    };

    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

    setOrders((prev) => [order, ...prev]);
    setCurrentOrder(order);
    setCart([]);
    setLastOrderCO2(Math.round(totalCO2 * 10) / 10);
    setProfile((prev) => ({
      ...prev,
      totalSaved: Math.round((prev.totalSaved + totalPrice * 0.5) * 100) / 100,
      co2Prevented: Math.round((prev.co2Prevented + totalCO2) * 10) / 10,
      ordersCount: prev.ordersCount + totalQuantity,
    }));

    // Update guild stats if user has a guild
    if (profile.guildId) {
      setGuildsState((prev) =>
        prev.map((g) =>
          g.id === profile.guildId
            ? { ...g, mealsRescued: g.mealsRescued + totalQuantity, co2Saved: g.co2Saved + totalCO2 }
            : g
        )
      );
    }

    setShowSuccessModal(true);
    return order;
  }, [cart, profile.guildId]);

  const verifyStudent = useCallback(() => {
    setProfile((prev) => ({ ...prev, isVerified: true }));
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  const toggleFavoriteCanteen = useCallback((canteenId: string) => {
    setProfile((prev) => {
      const favorites = prev.favoriteCanteens || [];
      if (favorites.includes(canteenId)) {
        return { ...prev, favoriteCanteens: favorites.filter((id) => id !== canteenId) };
      }
      return { ...prev, favoriteCanteens: [...favorites, canteenId] };
    });
  }, []);

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  const setUserGuild = useCallback((guildId: string | null) => {
    setProfile((prev) => ({ ...prev, guildId }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        profile,
        orders,
        currentOrder,
        cart,
        searchQuery,
        filterType,
        showSuccessModal,
        lastOrderCO2,
        guilds: guildsState,
        setSearchQuery,
        setFilterType,
        addToCart,
        placeOrder,
        verifyStudent,
        clearCurrentOrder,
        toggleFavoriteCanteen,
        closeSuccessModal,
        setUserGuild,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
