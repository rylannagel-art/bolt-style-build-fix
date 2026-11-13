// The quote API address comes from the environment (see .env.example). Vite bakes VITE_ variables in at BUILD
// time, so a missing one must show a clear message instead of throwing before React renders (a blank page).
export type ApiConfig = { ok: true; base: URL } | { ok: false; problem: string };

export function readApiConfig(raw: string | undefined = import.meta.env.VITE_API_BASE_URL): ApiConfig {
  if (!raw) return { ok: false, problem: "VITE_API_BASE_URL is not set. Copy .env.example to .env (or set it in your host's build settings) and build again." };
  try {
    return { ok: true, base: new URL(raw) };
  } catch {
    return { ok: false, problem: `VITE_API_BASE_URL is not a valid URL: "${raw}".` };
  }
}
