import { supabase } from "../supabase";
import type { NewTrip, Trip } from "../types";

type TripRow = {
  id: string;
  date: string;
  from_location: string;
  to_location: string;
  mode: Trip["mode"];
  actual_cost: number;
  normal_cost: number;
  note: string | null;
  arrival_time: string | null;
};

function rowToTrip(row: TripRow): Trip {
  return {
    id: row.id,
    date: row.date,
    from: row.from_location,
    to: row.to_location,
    mode: row.mode,
    actualCost: row.actual_cost,
    normalCost: row.normal_cost,
    note: row.note ?? undefined,
    arrivalTime: row.arrival_time ?? undefined,
  };
}

function tripToRow(trip: NewTrip) {
  return {
    date: trip.date,
    from_location: trip.from,
    to_location: trip.to,
    mode: trip.mode,
    actual_cost: trip.actualCost,
    normal_cost: trip.normalCost,
    note: trip.note ?? null,
    arrival_time: trip.arrivalTime ?? null,
  };
}

export async function fetchTrips(): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data as TripRow[]).map(rowToTrip);
}

export async function insertTrip(trip: NewTrip): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .insert(tripToRow(trip))
    .select()
    .single();

  if (error) throw error;
  return rowToTrip(data as TripRow);
}

export async function deleteTrip(id: string): Promise<void> {
  const { error } = await supabase.from("trips").delete().eq("id", id);
  if (error) throw error;
}
