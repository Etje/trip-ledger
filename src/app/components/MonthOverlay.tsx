'use client';

import { useState } from 'react';
import { useTripStore } from '../../lib/useTripStore';
import { generateMonthOverlay } from '../../lib/overlays';
import { getCurrentMonthKey } from '../../lib/monthSummary';

export default function MonthOverlay() {
    const trips = useTripStore((state) => state.trips);
    const subscription = useTripStore((state) => state.subscription);
    const [copied, setCopied] = useState(false);

    const line = generateMonthOverlay(trips, subscription, getCurrentMonthKey());

    const handleCopy = async () => {
        await navigator.clipboard.writeText(line);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex flex-col items-center gap-y-3">
            <span className="text-center text-[#e6e6e6] lowercase">{line}</span>
            <button
                onClick={handleCopy}
                className="shrink-0 rounded border border-border px-2 py-1 text-xs uppercase text-[#6b6b6b] transition-colors hover:border-green-600 hover:text-green-600"
            >
                {copied ? 'gekopieerd' : 'copy'}
            </button>
        </div>
    );
}
