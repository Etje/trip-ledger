'use client';

import { useTripStore } from '../../lib/useTripStore';
import { summarizeMonth } from '../../lib/monthSummary';
import { useMemo } from 'react';
import { getCurrentMonthKey } from '../../lib/monthSummary';

const currencyFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

export default function MonthlySummaryCard() {
    const trips = useTripStore((state) => state.trips);
    const subscription = useTripStore((state) => state.subscription);
    const status = useTripStore((state) => state.status);
    const summary = useMemo(
        () => status === 'loaded'
            ? summarizeMonth(trips, subscription, getCurrentMonthKey())
            : null,
        [status, trips, subscription],
    );

    if (status !== 'loaded' || !summary) {
        return (
            <div className="w-full text-center border border-border p-4 rounded-lg font-mono text-sm text-[#6b6b6b]">
                Laden...
            </div>
        );
    }

    const isNegative = summary.saved < 0;
    const label = isNegative ? 'kost' : 'bespaard';
    const amountColor = isNegative ? 'text-[#ff5c5c]' : 'text-[#00ff9d]';
    const amount = Math.abs(summary.saved);

    return (
        <div className="w-full text-center border border-border p-4 rounded-lg font-mono text-sm">
            <span className="text-[#6b6b6b]">
                {subscription.name.toLowerCase()} {currencyFormatter.format(summary.subscriptionCost)}
            </span>
            <span className="text-[#6b6b6b]"> · waarde benut {currencyFormatter.format(summary.totalValue)}</span>
            <span className="text-[#e6e6e6]"> · {label} </span>
            <span className={`${amountColor} font-bold`}>{currencyFormatter.format(amount)}</span>
        </div>
    );
}