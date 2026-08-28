"use client";

import { create } from "zustand";

import { fetchTrips, insertTrip, deleteTrip, updateTripDistance } from "./api/trips";
import { fetchSubscription, saveSubscription } from "./api/subscription";
import type { NewTrip, Subscription, Trip } from "./types";

const defaultSubscription: Subscription = {
  name: "Deutschlandticket",
  monthlyCost: 58,
};

type Status = "idle" | "loading" | "loaded" | "error";

type TripStore = {
  trips: Trip[];
  subscription: Subscription;
  status: Status;
  error: string | null;
  hydrate: () => Promise<void>;
  addTrip: (trip: NewTrip) => Promise<void>;
  removeTrip: (id: string) => Promise<void>;
  updateTripDistance: (id: string, distanceKm: number) => Promise<void>;
  setSubscription: (subscription: Subscription) => Promise<void>;
};

let hasHydrated = false;

export const useTripStore = create<TripStore>()((set) => ({
  trips: [],
  subscription: defaultSubscription,
  status: "idle",
  error: null,
  hydrate: async () => {
    if (hasHydrated) return;
    hasHydrated = true;

    set({ status: "loading", error: null });
    try {
      const [trips, subscription] = await Promise.all([
        fetchTrips(),
        fetchSubscription(),
      ]);
      set({ trips, subscription, status: "loaded" });
    } catch (err) {
      hasHydrated = false;
      set({
        status: "error",
        error: err instanceof Error ? err.message : "Failed to load data",
      });
    }
  },
  addTrip: async (trip) => {
    const created = await insertTrip(trip);
    set((state) => ({ trips: [created, ...state.trips] }));
  },
  removeTrip: async (id) => {
    await deleteTrip(id);
    set((state) => ({ trips: state.trips.filter((trip) => trip.id !== id) }));
  },
  updateTripDistance: async (id, distanceKm) => {
    const updated = await updateTripDistance(id, distanceKm);
    set((state) => ({
      trips: state.trips.map((trip) => (trip.id === id ? updated : trip)),
    }));
  },
  setSubscription: async (subscription) => {
    await saveSubscription(subscription);
    set({ subscription });
  },
}));
