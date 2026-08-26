'use client';

import { useState } from 'react';
import { useTripStore } from '../../lib/useTripStore';
import { generateDaysOverlays } from "@/lib/overlays";

export default function DaysOverlays() {
    const trips = useTripStore((state) => state.trips);
    const overlays = generateDaysOverlays(trips);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (line: string, index: number) => {
        await navigator.clipboard.writeText(line);
        setCopiedIndex(index);
        setTimeout(() => {
            setCopiedIndex((current) => (current === index ? null : current));
        }, 1500);
    };

    if (!overlays.length) {
    
        return <p>No rides to overlay.</p>;
    }
        
    return (
        <div className="flex flex-col gap-y-2">
            {overlays.map((line, index) => (
                <li
                    key={index}
                    className="flex items-center justify-between gap-x-3 rounded border border-border px-3 py-2"
                >
                    <span className="text-[#e6e6e6]">{line}</span>
                    <button
                        onClick={() => handleCopy(line, index)}
                        className="shrink-0 rounded border border-border px-2 py-1 text-xs uppercase text-[#6b6b6b] transition-colors hover:border-green-600 hover:text-green-600"
                    >
                        {copiedIndex === index ? 'gekopieerd' : 'copy'}
                    </button>
                </li>
            ))}
        </div>
    );
}