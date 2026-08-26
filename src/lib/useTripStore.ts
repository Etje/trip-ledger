"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { getStoredValue, removeStoredValue, setStoredValue } from "./storage";
import type { PointOfInterest, Subscription, Trip } from "./types";

const storageKey = "trip-ledger-store";

const defaultSubscription: Subscription = {
  name: "Deutschlandticket",
  monthlyCost: 58,
};

type TripStore = {
  trips: Trip[];
  pointsOfInterest: PointOfInterest[];
  subscription: Subscription;
  addTrip: (trip: Trip) => void;
  removeTrip: (trip: Trip) => void;
  addPointOfInterest: (pointOfInterest: PointOfInterest) => void;
  removePointOfInterest: (pointOfInterest: PointOfInterest) => void;
  setSubscription: (subscription: Subscription) => void;
  clear: () => void;
};

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      trips: [],
      pointsOfInterest: [],
      subscription: defaultSubscription,
      addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
      removeTrip: (trip) =>
        set((state) => ({
          trips: state.trips.filter((currentTrip) => currentTrip !== trip),
        })),
      addPointOfInterest: (pointOfInterest) =>
        set((state) => ({
          pointsOfInterest: [...state.pointsOfInterest, pointOfInterest],
        })),
      removePointOfInterest: (pointOfInterest) =>
        set((state) => ({
          pointsOfInterest: state.pointsOfInterest.filter(
            (currentPointOfInterest) => currentPointOfInterest !== pointOfInterest,
          ),
        })),
      setSubscription: (subscription) => set({ subscription }),
      clear: () =>
        set({ trips: [], pointsOfInterest: [], subscription: defaultSubscription }),
    }),
    {
      name: storageKey,
      storage: createJSONStorage(() => ({
        getItem: (key) => JSON.stringify(getStoredValue(key, null)),
        setItem: (key, value) => setStoredValue(key, value),
        removeItem: (key) => removeStoredValue(key),
      })),
    },
  ),
);