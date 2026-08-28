import { summarizeMonth } from "./monthSummary";
import type { Subscription, Trip } from "./types";

const DUTCH_MONTHS = [
  "jan", "feb", "mrt", "apr", "mei", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
];

function formatOverlayAmount(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return `€${parseFloat(rounded.toFixed(2))}`;
}

function formatOverlayDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${DUTCH_MONTHS[month - 1]} ${year}`;
}

function formatOverlayTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function getTripDayNumbers(trips: Trip[]): Map<string, number> {
  const uniqueDates = Array.from(new Set(trips.map((trip) => trip.date))).sort();
  return new Map(uniqueDates.map((date, index) => [date, index + 1]));
}

export function generateRidesOverlays(trips: Trip[]): string[] {
  const dayNumbers = getTripDayNumbers(trips);

  return [...trips]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((trip) => {
      const day = dayNumbers.get(trip.date)!;
      return `day ${day} - ${trip.from} → ${trip.to} / ${trip.mode} ${formatOverlayAmount(trip.actualCost)}`;
    });
}

export function generateDaysOverlays(trips: Trip[]): string[] {
  const dayNumbers = getTripDayNumbers(trips);

  return Array.from(dayNumbers.entries()).map(([date, day]) => {
    return `day ${day} - ${formatOverlayDate(date)}`;
  });
}

export function generateStationsOverlays(trips: Trip[]): string[] {
  return [...trips]
    .filter((trip) => !!trip.arrivalTime)
    .sort((a, b) => a.date.localeCompare(b.date) || a.arrivalTime!.localeCompare(b.arrivalTime!))
    .map((trip) => `${trip.to} - ${formatOverlayTime(trip.arrivalTime!)}`);
}

export function generateDistanceOverlays(trips: Trip[]): string[] {
  return [...trips]
    .filter((trip) => trip.distanceKm != null)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((trip) => `${trip.from} → ${trip.to} - ${trip.distanceKm} km`);
}

export function generateMonthOverlay(
  trips: Trip[],
  subscription: Subscription,
  monthKey: string,
): string {
  const summary = summarizeMonth(trips, subscription, monthKey);
  const [year, month] = monthKey.split("-").map(Number);
  return `${DUTCH_MONTHS[month - 1]} ${year} · ticket ${formatOverlayAmount(summary.subscriptionCost)} / value ${formatOverlayAmount(summary.totalValue)} / saved ${formatOverlayAmount(summary.saved)}`;
}
