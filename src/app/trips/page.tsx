import TripForm from "../components/TripForm";
import TripList from "../components/TripList";
import Topbar from "../components/Topbar";

export default function TripsPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-4">
            <Topbar />
            <TripForm />
        </div>
    );
}
