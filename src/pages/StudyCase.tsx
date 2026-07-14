import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, Bookmark, Compass, Target, ShieldAlert, Cpu, Trophy, Sparkles } from "lucide-react";
import { studyCasesData } from "../data";
import CTA from "../components/CTA";
import ShareButtons from "../components/ShareButtons";
import Head from "../components/Head";
import { trackCardClick } from "../lib/analytics";

export default function StudyCase() {
  const { slug: selectedSlug } = useParams();
  const navigate = useNavigate();
  const onNavigate = (page: string, slug?: string) => {
    if (page === "study-case-detail" && slug) return navigate(`/study-case/${slug}`);
    if (page === "study-case") return navigate(`/study-case`);
    navigate(`/${page}`);
  };

  // Jika ada selectedSlug, tampilkan detail studi kasus
  if (selectedSlug) {
    const sc = studyCasesData.find((item) => item.slug === selectedSlug);

    // Proteksi jika slug tidak ditemukan
    if (!sc) {
      return (
        <>
        <Head title="Studi Kasus Tidak Ditemukan" description="Studi kasus yang Anda cari tidak tersedia." path={`/study-case/${selectedSlug}`} />
        <div className="container-custom py-24 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-neutral-500 mx-auto" />
          <h1 className="text-2xl font-bold text-neutral-900">Studi Kasus Tidak Ditemukan</h1>
          <p className="text-neutral-700">Maaf, studi kasus yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => onNavigate("study-case")}
            className="inline-flex items-center gap-2 text-sky-800 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Studi Kasus</span>
          </button>
        </div>
        </>
      );
    }

    // DETAIL STUDY CASE: WAJIB STRUKTUR 6 BAGIAN URUT (HEADER, 3-KOLOM, NARASI, TECH STACK, 2-KOLOM, CTA AKHIR)
    return (
      <>
      <Head title={sc.title} description={`${sc.context} ${sc.problem_statement}`} path={`/study-case/${sc.slug}`} />
      <article id={`study-case-detail-${sc.slug}`} className="animate-in fade-in duration-300 py-12">
        <div className="container-custom max-w-4xl space-y-12">
          
          {/* Back button */}
          <div>
            <button
              id="back-to-study-cases"
              onClick={() => onNavigate("study-case")}
              className="inline-flex items-center gap-2 text-sky-800 hover:text-sky-950 font-bold text-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Semua Studi Kasus</span>
            </button>
          </div>

          {/* 1. HEADER (Title) */}
          <header id="sc-header" className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Analisis Studi Kasus</span>
            </div>
            <h1 id="sc-detail-title" className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
              {sc.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
              <span>Tanggal: {sc.date}</span>
              <span>&bull;</span>
              <span>Kategori: Optimasi Tampilan</span>
            </div>
          </header>

          {/* 2. 3 KOLOM SEJAJAR DI ATAS: Context | Problem | Constraints (card kecil, ringkas) */}
          <section id="sc-trio-columns" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kolom 1: Context */}
            <div className="bg-card-bg border border-neutral-300 p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Latar Belakang</span>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed">
                {sc.context}
              </p>
            </div>

            {/* Kolom 2: Problem */}
            <div className="bg-card-bg border border-neutral-300 p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Masalah Utama</span>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed">
                {sc.problem_statement}
              </p>
            </div>

            {/* Kolom 3: Constraints */}
            <div className="bg-card-bg border border-neutral-300 p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Batasan Proyek</span>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed">
                {sc.constraints}
              </p>
            </div>
          </section>

          {/* 3. NARASI PANJANG: Process/Approach dan Execution (dari field content) */}
          <section id="sc-narrative" className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2.5 border-b border-neutral-300 pb-3">
              <span>Proses &amp; Langkah Penyelesaian</span>
            </h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {sc.content}
              </p>
            </div>
            
            {/* Gallery Images */}
            {sc.gallery_images && sc.gallery_images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {sc.gallery_images.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-neutral-300 bg-neutral-50">
                    <img
                      src={img}
                      alt={`Dokumentasi proses studi kasus ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 4. TECH STACK (badge/tag) */}
          <section id="sc-tech-stack" className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-800" />
              <span>Teknologi yang Terlibat (Tech Stack)</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {sc.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-sky-50 text-sky-800 text-xs font-medium rounded-md border border-sky-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 5. 2 KOLOM: Result dan Lesson learned */}
          <section id="sc-results-and-lessons" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-300">
            {/* Kolom Kiri: Result */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2 text-forest-800">
                <Trophy className="w-5 h-5 text-forest-400" />
                <span>Hasil Akhir &amp; Dampak</span>
              </h3>
              <div className="bg-forest-50 border border-forest-400/20 p-5 rounded-xl text-forest-800 text-sm sm:text-base leading-relaxed">
                {sc.result}
              </div>
            </div>

            {/* Kolom Kanan: Lesson learned */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2 text-sky-800">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <span>Pelajaran Penting</span>
              </h3>
              <div className="bg-sky-50 border border-sky-200 p-5 rounded-xl text-sky-900 text-sm sm:text-base leading-relaxed">
                {sc.lesson_learned}
              </div>
            </div>
          </section>

          {/* Social Share Buttons (Forest Theme) */}
          <ShareButtons title={sc.title} path={`/study-case/${sc.slug}`} />

          {/* 6. CTA DI AKHIR: "Tertarik kerja sama? Hubungi saya" + tombol WhatsApp */}
          <section id="sc-cta" className="bg-neutral-50 border border-neutral-300 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-neutral-900 text-lg">Tertarik Kerja Sama dengan Saya?</h3>
              <p className="text-neutral-700 text-sm">Hubungi saya untuk berdiskusi santai mengenai proyek atau pembuatan website Anda.</p>
            </div>
            <CTA
              type="whatsapp"
              label="Hubungi Saya via WhatsApp"
              message={`Halo Farhan, saya membaca detail studi kasus "${sc.title}" Anda dan tertarik untuk bekerja sama dalam proyek optimasi web.`}
              className="w-full sm:w-auto text-center"
            />
          </section>

        </div>
      </article>
      </>
    );
  }

  // JIKA TIDAK ADA SLUG, TAMPILKAN DAFTAR STUDY CASES
  return (
    <>
    <Head
      title="Daftar Analisis Studi Kasus"
      description="Dokumentasi komprehensif mengenai analisis tantangan, batasan teknologi, pendekatan arsitektur, dan solusi optimasi web."
      path="/study-case"
    />
    <div id="study-case-list-page" className="animate-in fade-in duration-300 py-16 md:py-24">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200 inline-block">
            Studi Kasus
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Kisah Sukses &amp; Studi Kasus
          </h1>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
            Berikut adalah cerita perjalanan di balik penyelesaian proyek, tantangan yang dihadapi, serta dampak positif yang berhasil dihadirkan.
          </p>
        </div>

        {/* List of Study Cases */}
        <div className="space-y-8">
          {studyCasesData.map((sc) => (
            <article
              id={`study-case-card-${sc.slug}`}
              key={sc.slug}
              className="border border-neutral-300 rounded-2xl bg-card-bg overflow-hidden flex flex-col lg:flex-row transition-all hover:border-sky-200 focus-within:ring-2 focus-within:ring-sky-400"
              style={{ borderRadius: "16px" }}
            >
              {/* Image side */}
              <div className="lg:w-1/2 h-64 lg:h-auto min-h-[250px] relative bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-300">
                <img
                  src={sc.gallery_images[0]}
                  alt={`Gambar demonstrasi studi kasus: ${sc.title}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-sky-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Studi Kasus
                </div>
              </div>

              {/* Content side */}
              <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    {sc.context}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                    {sc.title}
                  </h3>
                  <div className="space-y-2 bg-sky-50 p-4 rounded-xl border border-sky-100">
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                      Problem Statement:
                    </span>
                    <p className="text-neutral-700 text-sm leading-relaxed">
                      {sc.problem_statement}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {sc.tech_stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-neutral-50 text-neutral-700 text-xs font-medium rounded-md border border-neutral-300/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-300 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono">
                    Dirilis: {sc.date}
                  </span>
                  <button
                    id={`view-sc-btn-${sc.slug}`}
                    onClick={() => {
                      trackCardClick("study_case", sc.slug, "study_case_list");
                      onNavigate("study-case-detail", sc.slug);
                    }}
                    className="inline-flex items-center gap-1 text-sky-800 hover:text-sky-950 font-semibold text-sm group"
                    aria-label={`Baca detail studi kasus: ${sc.title}`}
                  >
                    <span>Baca Studi Kasus</span>
                    <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
    </>
  );
}
