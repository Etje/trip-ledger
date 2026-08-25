'use client';

import { useTripStore } from '../../lib/useTripStore';

const currencyFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

export default function TripList() {
    const trips = useTripStore((state) => state.trips);

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="p-3">Datum</th>
                        <th className="p-3">Van</th>
                        <th className="p-3">Naar</th>
                        <th className="p-3">Vervoer</th>
                        <th className="p-3">Betaald</th>
                        <th className="p-3">Normale prijs</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="p-4 text-center">
                                Nog geen trips opgeslagen.
                            </td>
                        </tr>
                    ) : (
                        trips.map((trip, index) => (
                            <tr key={`${trip.date}-${trip.from}-${trip.to}-${index}`} className="border-b border-border last:border-b-0">
                                <td className="p-3">{trip.date}</td>
                                <td className="p-3">{trip.from}</td>
                                <td className="p-3">{trip.to}</td>
                                <td className="p-3">{trip.mode}</td>
                                <td className="p-3">{currencyFormatter.format(trip.actualCost)}</td>
                                <td className="p-3">{currencyFormatter.format(trip.normalCost)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}