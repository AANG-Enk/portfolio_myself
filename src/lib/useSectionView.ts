import { useEffect, useRef } from "react";
import { trackSectionView } from "./analytics";

export function useSectionView<T extends HTMLElement>(sectionName: string) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(sectionName);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}
