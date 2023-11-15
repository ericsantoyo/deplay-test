import NewMarketDown from "@/app/components/market/NewMarketDown";
import NewMarketUp from "@/app/components/market/NewMarketUp";


export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NewMarketUp />
      <NewMarketDown />
    </main>
  );
}
