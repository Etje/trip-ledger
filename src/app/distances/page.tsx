import Topbar from "../components/Topbar";
import DistanceForm from "../components/DistanceForm";
    
export default function DistancesPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Topbar />
            <DistanceForm />
        </div>
    );
}
