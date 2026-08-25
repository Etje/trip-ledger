import Button from "./Button";
import Link from "next/link";

export default function Topbar() {
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
                <Button withIcon={true} withLink="/distances" extraClasses="hover:text-green-600 hover:border-green-600">
                    Afstand
                </Button>
            </div>
        </div>
    );
}