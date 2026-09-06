import TripForm from "../components/TripForm";
import Topbar from "../components/Topbar";

export default function TripsPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-4">
            <Topbar />
            <TripForm />
        </div>
    );
}
