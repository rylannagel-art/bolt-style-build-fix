export type TintPackage = { id: string; name: string; cents: number; shade: string };

export const PACKAGES: TintPackage[] = [
  { id: "basic", name: "Basic", cents: 19900, shade: "35%" },
  { id: "premium", name: "Premium Ceramic", cents: 34900, shade: "20%" },
  { id: "full", name: "Full Car", cents: 49900, shade: "5% to 50%" },
];

export function formatPrice(cents: number): string {
  return "$" + (cents / 100).toFixed(2);
}
