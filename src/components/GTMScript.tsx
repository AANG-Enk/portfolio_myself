import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

export default function GTMScript() {
  useEffect(() => {
    if (!GTM_ID || document.getElementById("gtm-script")) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }, []);

  return null;
}

// Fallback <noscript> iframe — dirender langsung ke HTML statis (bukan lewat useEffect)
// supaya tetap berfungsi walau JS dimatikan. Di-import terpisah karena JSX di sini
// perlu dirender saat SSG, bukan cuma di client.
export function GTMNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
