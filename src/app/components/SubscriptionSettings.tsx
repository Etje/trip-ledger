'use client';

import { useState } from 'react';
import { useTripStore } from '../../lib/useTripStore';

export default function SubscriptionSettings() {
    const subscription = useTripStore((state) => state.subscription);
    const setSubscription = useTripStore((state) => state.setSubscription);
    const [syncedCost, setSyncedCost] = useState(subscription.monthlyCost);
    const [value, setValue] = useState(String(subscription.monthlyCost));
    const [saved, setSaved] = useState(false);

    if (subscription.monthlyCost !== syncedCost) {
        setSyncedCost(subscription.monthlyCost);
        setValue(String(subscription.monthlyCost));
    }

    const handleSave = async () => {
        const monthlyCost = Number(value);
        if (Number.isNaN(monthlyCost) || monthlyCost <= 0) return;

        await setSubscription({ ...subscription, monthlyCost });
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    return (
        <div className="flex w-full items-center justify-center gap-x-2 rounded-lg border border-border p-3 font-mono text-sm">
            <label className="text-xs uppercase tracking-wider text-[#6b6b6b]">
                {subscription.name.toLowerCase()} / maand
            </label>
            <input
                type="number"
                min="0"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-20 rounded border border-border px-2 py-1 text-right outline-none"
            />
            <button
                type="button"
                onClick={handleSave}
                className="rounded border border-border px-2 py-1 text-xs uppercase text-[#6b6b6b] transition-colors hover:border-green-600 hover:text-green-600"
            >
                {saved ? 'opgeslagen' : 'opslaan'}
            </button>
        </div>
    );
}
