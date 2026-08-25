import MonthlySummaryCard from "./components/MonthlySummaryCard";
import OverlayPanel from "./components/OverlayPanel";
import TopBar from "./components/Topbar";

export default function Home() {
  return (
    <div>
        <div className="flex flex-col items-center justify-center">
          <TopBar />
          <div className="flex flex-row items-start justify-center w-full gap-4 p-4">
            <MonthlySummaryCard />
            <OverlayPanel />
          </div>
        </div>
    </div>
  );
}
