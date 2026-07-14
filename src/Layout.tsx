import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import GTMScript, { GTMNoScript } from "./components/GTMScript";
import ScrollDepthTracker from "./components/ScrollDepthTracker";

// Custom hook untuk mendeteksi preferensi reduced motion (WCAG 2.1)
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
}

export default function Layout() {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Inisialisasi tema dari localStorage atau preferensi sistem operasi (WCAG 2.1 AA)
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Efek sinkronisasi kelas elemen utama HTML dengan state tema aktif
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Gulung ke atas saat rute berpindah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-page-bg">
      {/* Google Tag Manager */}
      <GTMScript />
      <GTMNoScript />
      <ScrollDepthTracker />

      {/* 0. Loading Screen Ringan & Hangat yang Terpicu Saat Navigasi atau Refresh */}
      <LoadingScreen key={`loading-${location.pathname}`} />

      {/* 1. Skip-to-content Link untuk Aksesibilitas WCAG AA Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-sky-800 focus:text-white focus:px-4 focus:py-2.5 focus:font-semibold focus:rounded-lg focus:outline-2 focus:outline-sky-400"
      >
        Lompati ke Konten Utama
      </a>

      {/* 2. Global Navigation Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* 3. Main Area Konten */}
      <motion.main
        id="main-content"
        key={`main-${location.pathname}`}
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className="flex-grow focus:outline-none"
        tabIndex={-1}
      >
        <Outlet />
      </motion.main>

      {/* 4. Global Footer */}
      <Footer />
    </div>
  );
}
