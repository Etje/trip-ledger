'use client';

import { useState } from 'react';
import { useTripStore } from '../../lib/useTripStore';

export default function DistanceForm() {
    const trips = useTripStore((state) => state.trips);
    const updateTripDistance = useTripStore((state) => state.updateTripDistance);
    const [drafts, setDrafts] = useState<Record<string, string>>({});
    const [savedId, setSavedId] = useState<string | null>(null);

    const sortedTrips = [...trips].sort((a, b) => a.date.localeCompare(b.date));

    const handleChange = (id: string, value: string) => {
        setDrafts((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = async (id: string) => {
        const raw = drafts[id];
        const value = Number(raw);
        if (!raw || Number.isNaN(value) || value <= 0) return;

        await updateTripDistance(id, value);
        setSavedId(id);
        setTimeout(() => {
            setSavedId((current) => (current === id ? null : current));
        }, 1500);
    };

    if (sortedTrips.length === 0) {
        return (
            <div className="w-full rounded-lg border border-border bg-background p-4 max-w-6xl font-mono text-sm text-[#6b6b6b]">
                Nog geen trips opgeslagen.
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg border border-border bg-background p-4 max-w-6xl">
            <ul className="flex flex-col gap-y-2 font-mono text-sm">
                {sortedTrips.map((trip) => {
                    const draft = drafts[trip.id] ?? (trip.distanceKm != null ? String(trip.distanceKm) : '');

                    return (
                        <li
                            key={trip.id}
                            className="flex items-center justify-between gap-x-3 rounded border border-border px-3 py-2"
                        >
                            <span className="text-[#e6e6e6]">
                                {trip.from} → {trip.to}
                                <span className="ml-2 text-xs text-[#6b6b6b]">{trip.date}</span>
                            </span>
                            <div className="flex items-center gap-x-2 shrink-0">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={draft}
                                    onChange={(e) => handleChange(trip.id, e.target.value)}
                                    placeholder="km"
                                    className="w-20 rounded border border-border px-2 py-1 text-right outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleSave(trip.id)}
                                    className="rounded border border-border px-2 py-1 text-xs uppercase text-[#6b6b6b] transition-colors hover:border-green-600 hover:text-green-600"
                                >
                                    {savedId === trip.id ? 'opgeslagen' : 'opslaan'}
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
