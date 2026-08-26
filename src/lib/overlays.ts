import type { Trip } from "./types";

function formatOverlayAmount(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return `€${parseFloat(rounded.toFixed(2))}`;
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
    return `day ${day} - ${date}`;
  });
}
