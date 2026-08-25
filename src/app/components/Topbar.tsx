import { PlusIcon } from "@heroicons/react/24/outline";

export default function TopBar() {
    return (
        <div className="flex flex-row items-center justify-between w-full p-4 border-b border-border">
            <div>
                <h1 className="font-bold uppercase">trip ledger</h1>
            </div>
            <div className="flex flex-row items-center space-x-4">
                <button className="text-white font-bold py-2 px-4 rounded border border-border">
                    <PlusIcon className="w-4 h-4 mr-2 inline-block" />
                    Add Trip
                </button>
                <button className="text-white font-bold py-2 px-4 rounded border border-border">
                    <PlusIcon className="w-4 h-4 mr-2 inline-block" />
                    Add Distance
                </button>
            </div>
        </div>
    );
}