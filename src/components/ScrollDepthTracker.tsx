import { useEffect, useRef } from "react";
import { trackScrollDepth } from "../lib/analytics";

export default function ScrollDepthTracker() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((t) => {
        if (percent >= t && !fired.current.has(t)) {
          fired.current.add(t);
          trackScrollDepth(t);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
