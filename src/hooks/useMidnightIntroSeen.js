import { useState } from "react";

const STORAGE_KEY = "midnightIntroSeen";

function readSeen() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // sessionStorage unavailable (private mode, disabled) — the
    // intro will just replay each visit, which is harmless.
  }
}

/**
 * Tracks whether the Midnight Menu intro has already played this
 * browser session. Deliberately sessionStorage (not localStorage) —
 * it's fine, even nice, for the intro to return on a future visit.
 */
export function useMidnightIntroSeen() {
  const [seen, setSeen] = useState(readSeen);

  const markSeen = () => {
    writeSeen();
    setSeen(true);
  };

  return [seen, markSeen];
}
