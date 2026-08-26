'use client';

import { useTripStore } from '../../lib/useTripStore';
import { getCurrentMonthKey, summarizeMonth } from '../../lib/monthSummary';

const currencyFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

export default function MonthlySummaryCard() {
    const trips = useTripStore((state) => state.trips);
    const subscription = useTripStore((state) => state.subscription);

    const summary = summarizeMonth(trips, subscription, getCurrentMonthKey());

    return (
        <div className="w-full text-center border border-border p-4 rounded-lg font-mono text-sm">
            <span className="text-[#6b6b6b]">
                {subscription.name.toLowerCase()} {currencyFormatter.format(summary.subscriptionCost)}
            </span>
            <span className="text-[#6b6b6b]"> · waarde benut {currencyFormatter.format(summary.totalValue)}</span>
            <span className="text-[#e6e6e6]"> · bespaard </span>
            <span className="text-[#00ff9d] font-bold">{currencyFormatter.format(summary.saved)}</span>
        </div>
    );
}