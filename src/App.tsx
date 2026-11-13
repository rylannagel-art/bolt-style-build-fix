import { PriceCard } from "./components/PriceCard";
import { PACKAGES, formatPrice } from "./packages";
import { readApiConfig } from "./config";

export default function App() {
  const cheapest: string = formatPrice(Math.min(...PACKAGES.map((p) => p.cents)));
  const api = readApiConfig();
  return (
    <main>
      <h1>Window Tint Quotes</h1>
      {!api.ok && (
        <div className="warn" role="alert">
          <strong>Setup needed:</strong> {api.problem}
        </div>
      )}
      <p className="note">
        From {cheapest}.{api.ok ? ` Quotes are sent to ${api.base.host}.` : " Quotes are off until the API address is set."}
      </p>
      <div className="grid">
        {PACKAGES.map((p) => (
          <PriceCard key={p.id} pkg={p} />
        ))}
      </div>
    </main>
  );
}
