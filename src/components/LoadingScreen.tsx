import React, { useEffect, useState } from "react";

// Kumpulan tips ala game loading screen untuk menambah kesan interaktif dan ramah pengguna
const LOADING_TIPS = [
  "Tip: Website yang cepat menghemat kuota internet dan baterai HP Anda.",
  "Tip: Desain yang ramah memudahkan semua orang untuk mengakses informasi dengan nyaman.",
  "Tip: Menavigasi website dengan tombol Tab di keyboard sangat praktis bagi semua pengguna.",
  "Tip: Kontras warna yang baik membantu tulisan tetap mudah dibaca di bawah terik matahari.",
  "Tip: Kode yang bersih membuat halaman ini aman dan stabil saat dikunjungi banyak orang sekaligus.",
  "Tip: Website ini dirancang agar ringan dan ramah untuk segala jenis perangkat HP maupun laptop.",
  "Tip: Menggulir halaman kini terasa lebih mulus berkat optimasi scroll yang super ringan.",
  "Tip: Setiap detil di website ini dibuat dengan penuh empati, kepedulian, dan kehangatan."
];

interface LoadingScreenProps {
  key?: string;
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dots, setDots] = useState("");

  // Ambil tips secara acak dan stabil selama masa muat halaman ini
  const [currentTip] = useState(() => {
    const randomIndex = Math.floor(Math.random() * LOADING_TIPS.length);
    return LOADING_TIPS[randomIndex];
  });

  // Animasi titik-titik bergerak pada tulisan "Sedang Memuat Data..."
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(dotsInterval);
  }, []);

  // Animasi progress bar ala game
  useEffect(() => {
    setProgress(0);
    setFadeOut(false);
    setVisible(true);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Naikan progress dengan langkah acak (8% - 18% per interval) agar terasa dinamis
        const step = Math.floor(Math.random() * 11) + 8;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 70); // Sangat responsif (~500ms - 800ms total muat)

    return () => clearInterval(progressInterval);
  }, []);

  // Pantau progress untuk transisi penutupan
  useEffect(() => {
    if (progress === 100) {
      // Delay sejenak di 100% agar transisinya terasa memuaskan
      const fadeTimeout = setTimeout(() => {
        setFadeOut(true);
      }, 250);

      const hideTimeout = setTimeout(() => {
        setVisible(false);
        if (onComplete) {
          onComplete();
        }
      }, 750); // total transition fadeOut + delay

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [progress, onComplete]);

  if (!visible) return null;

  return (
    <div
      id="game-loading-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-page-bg select-none transition-opacity duration-500 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Container Tengah */}
      <div className="max-w-md w-full px-6 flex flex-col items-center text-center space-y-8">
        
        {/* Logo / Ikon Daun Berayun */}
        <div className="relative flex items-center justify-center">
          {/* Efek pendaran cahaya hangat di latar belakang */}
          <div className="absolute w-24 h-24 bg-sky-100 rounded-full blur-2xl opacity-50 animate-pulse duration-[2000ms]" />
          
          <div className="relative w-16 h-16 bg-card-bg border border-sky-200/50 rounded-2xl flex items-center justify-center shadow-sm">
            <svg
              className="w-8 h-8 text-sky-800 animate-bounce duration-[2000ms]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8.5C18.4 17 14 20 11 20z" />
              <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
            </svg>
          </div>
        </div>

        {/* Header Nama Kreator */}
        <div className="space-y-1">
          <h2 className="text-sm font-extrabold text-sky-900 tracking-widest uppercase">
            Farhan Mohaemin Saparidja
          </h2>
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
            Senior Frontend Specialist
          </span>
        </div>

        {/* Blok Status Loading & Progress ala Game */}
        <div className="w-full space-y-4 pt-4 flex flex-col items-center">
          {/* Teks utama tepat di atas progress bar sesuai request */}
          <div className="flex items-center justify-between w-64 sm:w-80 px-1 text-xs font-bold text-sky-900">
            <span className="tracking-wider inline-flex items-center">
              Sedang Memuat Data<span className="w-6 text-left pl-0.5">{dots}</span>
            </span>
            <span className="font-mono text-neutral-500">{progress}%</span>
          </div>

          {/* Bar Progress Utama */}
          <div className="w-64 sm:w-80 h-3 bg-sky-100 rounded-full overflow-hidden p-0.5 border border-sky-200/40 shadow-inner relative">
            <div
              className="h-full bg-sky-400 rounded-full transition-all duration-100 ease-out relative shadow-[0_0_10px_rgba(85,130,49,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tips ala game di bagian paling bawah untuk kenyamanan visual */}
        <div className="pt-6 border-t border-neutral-200/60 w-full max-w-xs sm:max-w-sm">
          <p className="text-[11px] text-neutral-500 leading-relaxed italic animate-pulse duration-[3000ms]">
            {currentTip}
          </p>
        </div>
      </div>
    </div>
  );
}
