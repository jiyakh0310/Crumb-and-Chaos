import { useEffect, useState } from "react";

/**
 * True only for devices with an accurate pointer (mouse/trackpad).
 * Used to gate desktop-only interactions like the custom cursor.
 */
export function useFinePointer() {
  const [isFine, setIsFine] = useState(() => window.matchMedia("(pointer: fine)").matches);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const onChange = (e) => setIsFine(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isFine;
}
