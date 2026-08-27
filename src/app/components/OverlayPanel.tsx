'use client';

import { useState } from 'react';
import Button from "./Button";
import RidesOverlays from "./RidesOverlays";
import DaysOverlays from "./DaysOverlays";
import StationsOverlays from "./StationsOverlays";

type OverlayTab = 'ritten' | 'dagen' | 'maand' | 'afstand' | 'stations';

export default function OverlayPanel() {
    const [activeTab, setActiveTab] = useState<OverlayTab>('ritten');

    const tabs: { id: OverlayTab; label: string }[] = [
        { id: 'ritten', label: '[Ritten]' },
        { id: 'dagen', label: '[Dagen]' },
        { id: 'stations', label: '[Stations]' },
        { id: 'afstand', label: '[Afstand]' },
    ];

    return (
        <div className="w-full rounded-lg border border-border p-4">
        <h1 className="font-mono text-sm text-[#e6e6e6]">OVERLAY PANEL</h1>

        {/* Tabs */}
        <div className="mt-4 flex flex-row items-center gap-x-3">
            {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
                <Button
                    key={tab.id}
                    withIcon={false}
                    onClick={() => setActiveTab(tab.id)}
                    extraClasses={`
                        w-full transition-colors
                        ${isActive
                        ? 'border-green-500 text-green-500'
                        : 'hover:border-green-600 hover:text-green-600'
                        }
                    `}
                    >
                    {tab.label}
                </Button>
            );
            })}
        </div>

        {/* Hier komt later de content van de actieve tab */}
        <div className="mt-6 font-mono text-sm text-[#6b6b6b]">
            {activeTab === 'ritten' && <RidesOverlays />}
            {activeTab === 'dagen' && <DaysOverlays />}
            {activeTab === 'stations' && <StationsOverlays />}
            {activeTab === 'afstand' && <p>Afstand overlays komen hier...</p>}
        </div>
        </div>
    );
}