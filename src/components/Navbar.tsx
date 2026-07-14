import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { profileData } from "../data";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", key: "home" },
    { label: "About", href: "/about", key: "about" },
    { label: "Projects", href: "/projects", key: "projects" },
    { label: "Study Case", href: "/study-case", key: "study-case" },
    { label: "Blog", href: "/blog", key: "blog" },
    { label: "Contact", href: "/contact", key: "contact" }
  ];

  // Helper to determine if link is active berdasarkan path saat ini
  const isActive = (key: string) => {
    const path = location.pathname;
    if (key === "home") return path === "/";
    return path === `/${key}` || path.startsWith(`/${key}/`);
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-page-bg/95 backdrop-blur-md border-b border-neutral-300/40">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <Link 
          id="nav-logo"
          to="/" 
          className="flex items-center gap-2 font-bold text-sky-900 text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-800 flex items-center justify-center text-white" aria-hidden="true">
            <Terminal className="w-4 h-4" />
          </div>
          <span>{profileData.full_name}</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1" aria-label="Navigasi Utama">
            {navItems.map((item) => {
              const active = isActive(item.key);
              return (
                <Link
                  id={`nav-item-${item.key}`}
                  key={item.key}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-sky-50 text-sky-800"
                      : "text-neutral-700 hover:text-sky-800 hover:bg-sky-50/50"
                  }`}
                  style={{ borderRadius: "8px" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle Button (Accessible & WCAG compliant) */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-300/60 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:bg-sky-50 dark:hover:bg-sky-950 transition-all focus-visible:outline-2 focus-visible:outline-sky-400 flex items-center justify-center"
            aria-label={theme === "light" ? "Aktifkan Mode Gelap (Dark Mode)" : "Aktifkan Mode Terang (Light Mode)"}
            title={theme === "light" ? "Aktifkan Mode Gelap" : "Aktifkan Mode Terang"}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-sky-800" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </button>

          {/* Mobile Nav Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-sky-400"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-page-bg border-b border-neutral-300/40 px-4 py-4 space-y-2 flex flex-col animate-in fade-in slide-in-from-top-5 duration-200"
          aria-label="Navigasi Utama Mobile"
        >
          {navItems.map((item) => {
            const active = isActive(item.key);
            return (
              <Link
                id={`mobile-nav-item-${item.key}`}
                key={item.key}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-base font-medium flex items-center transition-all ${
                  active
                    ? "bg-sky-50 text-sky-800"
                    : "text-neutral-700 hover:text-sky-800 hover:bg-sky-50/30"
                }`}
                style={{ borderRadius: "8px" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
