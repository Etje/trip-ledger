import MonthlySummaryCard from "./components/MonthlySummaryCard";
import OverlayPanel from "./components/OverlayPanel";
import Topbar from "./components/Topbar";
import TripList from "./components/TripList";

export default function Home() {
  return (
    <div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <Topbar />
          <div className="flex flex-row items-start justify-center w-full gap-4 px-4 max-w-6xl">
            <MonthlySummaryCard />
            <div className="flex flex-col gap-y-4 w-full">
              <OverlayPanel />
              <TripList />
            </div>
          </div>
        </div>
    </div>
  );
}
