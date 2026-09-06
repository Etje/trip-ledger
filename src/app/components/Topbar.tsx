'use client'

import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTripStore } from '../../lib/useTripStore';
import { createClient } from '../../lib/supabase/browser';

export default function Topbar() {
    const router = useRouter();
    const trips = useTripStore((state) => state.trips);
    const showDistanceButton = trips?.length === 0 ? false : true;

    async function handleSignOut() {
        await createClient().auth.signOut();
        router.push("/login");
        router.refresh();
    }
        
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
                <button type="button" onClick={handleSignOut} className="text-sm hover:text-red-600">
                    Uitloggen
                </button>
            </div>
        </div>
    );
}