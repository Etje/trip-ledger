'use client'

import Button from "./Button";
import Link from "next/link";

import { useTripStore } from '../../lib/useTripStore';

export default function Topbar() {
    const trips = useTripStore((state) => state.trips);
    const showDistanceButton = trips?.length === 0 ? false : true;
        
    return (
        <div className="flex flex-row items-center justify-between w-full p-4 border-b border-border">
            <div>
                <Link href="/">
                    <h1>trip ledger</h1>
                </Link>
            </div>
            <div className="flex flex-row items-center gap-x-4">
                <Button withIcon={true} withLink="/trips" extraClasses="hover:text-green-600 hover:border-green-600">
                    Trip
                </Button>
                {showDistanceButton 
                    ? <Button withIcon={true} withLink="/distances" extraClasses="hover:text-green-600 hover:border-green-600">
                        Afstand
                    </Button> 
                    : ''
                }
            </div>
        </div>
    );
}