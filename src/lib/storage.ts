const isBrowser = typeof window !== "undefined";

export function getStoredValue<T>(key: string, fallback: T): T {
  if (!isBrowser) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}

export function setStoredValue<T>(key: string, value: T): void {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable or full. In-memory state remains usable.
  }
}

export function removeStoredValue(key: string): void {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage may be unavailable. There is nothing else to clean up.
  }
}