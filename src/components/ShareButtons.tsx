import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Linkedin, Twitter, Link, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  path: string; // e.g. '#blog/aksesibilitas-web' atau '#study-case/optimasi-performa'
}

export default function ShareButtons({ title, path }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Basis domain produksi resmi atau fallback ke domain saat ini di preview
  const getShareUrl = () => {
    const base = "https://farhanmohaemin.dev";
    return `${base}${path}`;
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin tautan:", err);
    }
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  return (
    <section 
      id="share-section" 
      className="bg-card-bg border border-sky-200 rounded-2xl p-6 sm:p-8 space-y-4 my-8"
      style={{ borderRadius: "16px" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-sm sm:text-base uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-sky-400" />
            <span>Bagikan Konten</span>
          </div>
          <p className="text-neutral-700 text-xs sm:text-sm">
            Bagikan artikel atau studi kasus ini jika menurut Anda bermanfaat bagi rekan pengembang lain.
          </p>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* LinkedIn Share */}
          <motion.a
            id="share-linkedin-btn"
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-50 hover:bg-sky-50 text-neutral-900 hover:text-sky-800 px-4 py-2.5 rounded-xl border border-neutral-300 hover:border-sky-400 transition-colors duration-200 font-semibold text-sm focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none"
            aria-label="Bagikan artikel ini ke LinkedIn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
            <span>LinkedIn</span>
          </motion.a>

          {/* Twitter/X Share */}
          <motion.a
            id="share-twitter-btn"
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-50 hover:bg-sky-50 text-neutral-900 hover:text-sky-800 px-4 py-2.5 rounded-xl border border-neutral-300 hover:border-sky-400 transition-colors duration-200 font-semibold text-sm focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none"
            aria-label="Bagikan artikel ini ke Twitter"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
            <span>Twitter</span>
          </motion.a>

          {/* Copy Link Button */}
          <motion.button
            id="share-copy-btn"
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 font-semibold text-sm focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none ${
              copied
                ? "bg-sky-800 border-sky-800 text-white"
                : "bg-neutral-50 hover:bg-sky-50 text-neutral-900 hover:text-sky-800 border-neutral-300 hover:border-sky-400"
            }`}
            aria-label="Salin tautan artikel ini ke papan klip"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-white" />
                  <span>Tautan Disalin!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="link"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <Link className="w-4 h-4 text-neutral-500 group-hover:text-sky-800" />
                  <span>Salin Tautan</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
