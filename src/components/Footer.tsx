import React from "react";
import { Mail, ArrowUpRight, HelpCircle } from "lucide-react";
import { profileData, siteSettingsData } from "../data";
import { trackSocialClick } from "../lib/analytics";

export default function Footer() {
  // Helper to determine status color
  const getStatusColorClass = (status: "open" | "selective" | "closed") => {
    switch (status) {
      case "open":
        return "bg-forest-50 text-forest-800 border border-forest-400/20";
      case "selective":
        return "bg-sky-50 text-sky-800 border border-sky-400/20";
      case "closed":
        return "bg-neutral-50 text-neutral-500 border border-neutral-300";
    }
  };

  const getStatusLabel = (status: "open" | "selective" | "closed") => {
    switch (status) {
      case "open":
        return "Tersedia untuk Kerja Sama (Open)";
      case "selective":
        return "Selektif Menerima Proyek (Selective)";
      case "closed":
        return "Sedang Tidak Menerima Proyek (Closed)";
    }
  };

  const getDotColorClass = (status: "open" | "selective" | "closed") => {
    switch (status) {
      case "open":
        return "bg-forest-400 animate-pulse";
      case "selective":
        return "bg-sky-400";
      case "closed":
        return "bg-neutral-500";
    }
  };

  return (
    <footer id="site-footer" className="bg-page-bg border-t border-neutral-300/40 py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-between">
          {/* Sisi Kiri: Nama & Tagline */}
          <div className="space-y-4">
            <h2 id="footer-logo" className="text-xl font-bold text-neutral-900 tracking-tight">
              {profileData.full_name}
            </h2>
            <p id="footer-tagline" className="text-neutral-700 max-w-md leading-relaxed text-sm sm:text-base">
              {profileData.tagline}
            </p>
            
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 mt-2">
              <span 
                id="footer-availability-badge"
                className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColorClass(
                  siteSettingsData.availability_status
                )}`}
              >
                <span 
                  className={`w-2.5 h-2.5 rounded-full ${getDotColorClass(
                    siteSettingsData.availability_status
                  )}`} 
                  aria-hidden="true" 
                />
                <span>{getStatusLabel(siteSettingsData.availability_status)}</span>
              </span>
            </div>
          </div>

          {/* Sisi Kanan: Kontak & Sosial Media */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Email */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Hubungi via Email
              </h3>
              <a
                id="footer-email-link"
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-2 text-sky-800 font-medium hover:text-sky-900 transition-colors py-1 hover:underline decoration-sky-800"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm break-all">{profileData.email}</span>
              </a>
            </div>

            {/* Social Media Link Loops */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Jaringan Sosial
              </h3>
              <ul id="footer-social-list" className="space-y-2">
                {profileData.social_media.map((social, idx) => (
                  <li key={idx}>
                    <a
                      id={`footer-social-link-${idx}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSocialClick(social.platform, "footer")}
                      className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-sky-800 text-sm transition-colors group"
                    >
                      <span className="font-medium text-neutral-900 group-hover:text-sky-800">
                        {social.platform}
                      </span>
                      {social.label && (
                        <span className="text-xs text-neutral-500 font-normal">
                          ({social.label})
                        </span>
                      )}
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-sky-800 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-300 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p id="footer-copyright" className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {profileData.full_name}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p id="footer-designer-tag" className="text-xs text-neutral-500 font-mono">
            WCAG 2.1 AA Compliant &bull; Built with React &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
