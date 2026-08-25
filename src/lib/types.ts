/* eslint-disable @typescript-eslint/no-empty-object-type */

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
	date: string;
	from: string;
	to: string;
	mode: TransportMode;
	actualCost: number;
	normalCost: number;
	note?: string;
}

export interface PointOfInterest {}

export interface Overlay {}

export interface Subscription {}

export interface MonthSummary {}