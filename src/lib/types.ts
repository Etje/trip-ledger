export type TransportMode =
	| "train"
	| "bus"
	| "tram"
	| "metro"
	| "bike"
	| "walk"
	| "car"
	| "other";

export interface Trip {
	id: string;
	date: string;
	from: string;
	to: string;
	mode: TransportMode;
	actualCost: number;
	normalCost: number;
	note?: string;
	arrivalTime?: string;
	distanceKm?: number;
}

export type NewTrip = Omit<Trip, "id">;

export interface Subscription {
	name: string;
	monthlyCost: number;
}

export interface MonthSummary {
	month: string;
	subscriptionCost: number;
	totalValue: number;
	saved: number;
}