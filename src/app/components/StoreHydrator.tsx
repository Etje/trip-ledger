"use client";

import { useEffect } from "react";

import { useTripStore } from "../../lib/useTripStore";

export default function StoreHydrator() {
  useEffect(() => {
    useTripStore.getState().hydrate();
  }, []);

  return null;
}
