// Small helper: fetch JSON, cache it in localStorage for `ttlMs`, and fall back to
// the last cached copy (even if stale) if the network request fails or is rate-limited.
// This matters for GitHub's unauthenticated API, which is capped at 60 requests/hour/IP.

const TTL_DEFAULT = 1000 * 60 * 60; // 1 hour

export async function fetchWithCache(url, { key, ttlMs = TTL_DEFAULT, headers = {} } = {}) {
  const cacheKey = `pf-cache:${key || url}`;

  const readCache = () => {
    try {
      const raw = localStorage.getItem(cacheKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const writeCache = (data) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ data, savedAt: Date.now() }));
    } catch {
      // storage full / unavailable — non-fatal, just skip caching
    }
  };

  const cached = readCache();
  if (cached && Date.now() - cached.savedAt < ttlMs) {
    return { data: cached.data, fromCache: true, stale: false };
  }

  try {
    const res = await fetch(url, { headers: { Accept: "application/json", ...headers } });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    writeCache(data);
    return { data, fromCache: false, stale: false };
  } catch (err) {
    if (cached) {
      // Network failed or we got rate-limited — serve the stale cache rather than nothing.
      return { data: cached.data, fromCache: true, stale: true };
    }
    throw err;
  }
}
