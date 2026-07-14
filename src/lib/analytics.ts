declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// Visitor klik apa
export function trackCtaClick(params: {
  cta_name: string;
  cta_location: string;
  target_url?: string;
}) {
  pushEvent("cta_click", params);
}

export function trackSocialClick(platform: string, location: string) {
  pushEvent("social_link_click", { platform, location });
}

export function trackContactFormSubmit() {
  pushEvent("contact_form_submit", {});
}

export function trackCvDownload() {
  pushEvent("cv_download", {});
}

export function trackCardClick(type: "project" | "study_case" | "blog", slug: string, location: string) {
  pushEvent(`${type}_card_click`, { slug, location });
}

// Visitor lebih banyak diam di section mana
export function trackSectionView(sectionName: string) {
  pushEvent("section_view", { section_name: sectionName });
}

export function trackScrollDepth(percent: number) {
  pushEvent("scroll_depth", { percent_scrolled: percent });
}
