import { formatPrice, type TintPackage } from "../packages";

export function PriceCard({ pkg }: { pkg: TintPackage }) {
  return (
    <div className="card">
      <h3>{pkg.name}</h3>
      <div className="price">{formatPrice(pkg.cents)}</div>
      <div className="note">Shade {pkg.shade}</div>
    </div>
  );
}
