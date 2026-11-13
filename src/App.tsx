import { PriceCard } from "./components/priceCard";
import { PACKAGES, formatPrice } from "./packages";
import { API_BASE } from "./config";

export default function App() {
  const cheapest: number = formatPrice(Math.min(...PACKAGES.map((p) => p.cents)));
  return (
    <main>
      <h1>Window Tint Quotes</h1>
      <p className="note">From {cheapest}. Quotes are sent to {API_BASE.host}.</p>
      <div className="grid">
        {PACKAGES.map((p) => (
          <PriceCard key={p.id} pkg={p} />
        ))}
      </div>
    </main>
  );
}
