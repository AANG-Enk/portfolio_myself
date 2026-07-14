import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Mail } from "lucide-react";
import { profileData } from "../data";
import { trackCtaClick } from "../lib/analytics";

interface CTAProps {
  type: "whatsapp" | "contact";
  message?: string; // Pre-filled message for WhatsApp
  label?: string; // Custom label for button
  className?: string;
  location?: string; // untuk tracking GTM: di section/halaman mana CTA ini dipasang
}

export default function CTA({
  type,
  message = "Halo Farhan, saya tertarik dengan portofolio Anda dan ingin berdiskusi lebih lanjut.",
  label,
  className = "",
  location = "unknown",
}: CTAProps) {
  if (type === "whatsapp") {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${profileData.whatsapp_number}?text=${encodedMessage}`;

    return (
      <a
        id="cta-whatsapp-link"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackCtaClick({ cta_name: "whatsapp", cta_location: location, target_url: whatsappUrl })
        }
        className={`inline-flex items-center justify-center gap-2 bg-sky-800 text-white font-medium hover:bg-sky-900 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2 ${className}`}
        style={{ borderRadius: "10px", padding: "11px 20px" }}
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        <span>{label || "Hubungi Saya via WhatsApp"}</span>
      </a>
    );
  }

  // contact page CTA
  return (
    <Link
      id="cta-contact-link"
      to="/contact"
      onClick={() => trackCtaClick({ cta_name: "contact_page", cta_location: location })}
      className={`inline-flex items-center justify-center gap-2 border-1.5 border-sky-200 bg-transparent text-sky-800 font-medium hover:bg-sky-50 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2 ${className}`}
      style={{ borderRadius: "10px", padding: "11px 20px" }}
    >
      <Mail className="w-5 h-5" aria-hidden="true" />
      <span>{label || "Kirim Pesan"}</span>
    </Link>
  );
}
