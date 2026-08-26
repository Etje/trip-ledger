import type { MonthSummary, Subscription, Trip } from "./types";

export function getMonthKey(date: string): string {
  return date.slice(0, 7);
}

export function getCurrentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

export function summarizeMonth(
  trips: Trip[],
  subscription: Subscription,
  monthKey: string,
): MonthSummary {
  const totalValue = trips
    .filter((trip) => getMonthKey(trip.date) === monthKey)
    .reduce((sum, trip) => sum + trip.normalCost, 0);

  return {
    month: monthKey,
    subscriptionCost: subscription.monthlyCost,
    totalValue,
    saved: totalValue - subscription.monthlyCost,
  };
}
