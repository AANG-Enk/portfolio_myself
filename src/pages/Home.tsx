import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, FolderGit2, Star, Briefcase, Eye, Zap, Laptop } from "lucide-react";
import { profileData, projectsData, studyCasesData, testimonialsData, partnersData } from "../data";
import CTA from "../components/CTA";
import Head from "../components/Head";
import { trackCardClick } from "../lib/analytics";
import { useSectionView } from "../lib/useSectionView";

export default function Home() {
  const navigate = useNavigate();
  const onNavigate = (page: string, slug?: string) => {
    if (page === "study-case-detail" && slug) return navigate(`/study-case/${slug}`);
    if (page === "project-detail" && slug) return navigate(`/projects/${slug}`);
    navigate(`/${page === "home" ? "" : page}`);
  };

  // Tracking GTM: section mana yang paling banyak dilihat/diam di sana
  const heroRef = useSectionView<HTMLElement>("hero_section");
  const whatIHelpRef = useSectionView<HTMLElement>("what_do_i_help_section");
  const featuredStudyCaseRef = useSectionView<HTMLElement>("featured_study_case_section");
  const featuredProjectsRef = useSectionView<HTMLElement>("featured_projects_section");
  const testimonialsRef = useSectionView<HTMLElement>("testimonials_section");
  const partnersRef = useSectionView<HTMLElement>("partners_section");

  // Filter featured data
  const featuredStudyCases = studyCasesData.filter(sc => sc.featured);
  const featuredProjects = projectsData.filter(p => p.featured);
  const featuredTestimonials = testimonialsData.filter(t => t.featured);

  return (
    <>
    <Head
      title="Senior Frontend Engineer & Web Accessibility Specialist"
      description="Website portofolio profesional Farhan Mohaemin Saparidja. Membangun antarmuka web presisi tinggi dengan kepatuhan penuh standar aksesibilitas WCAG 2.1 AA."
      path="/"
    />
    <div id="home-page" className="animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION (MODERN STUDIO STYLE - INSPIRED BY BINJAN) */}
      <section 
        id="hero-section" 
        ref={heroRef}
        className="bg-sky-50/60 py-16 md:py-24 border-b border-sky-100/40 relative overflow-hidden"
      >
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Kolom Kiri: Greeting, Email, Pengalaman */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-800">
                  Senior Frontend Engineer
                </p>
                <h1 
                  id="hero-headline"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-900 tracking-tight leading-none"
                >
                  Hey There,<br />I'm Farhan
                </h1>
                
                {/* Email link with terracotta color accent */}
                <div className="pt-2">
                  <a 
                    href={`mailto:${profileData.email}`}
                    className="text-sm font-semibold text-[#D95D39] hover:underline transition-all tracking-wide break-all"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>

              {/* Years of Experience Block */}
              <div className="pt-4 flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl font-extrabold text-sky-900 leading-none">5</span>
                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider leading-tight">
                  TAHUN<br />BERKARYA<br />DI WEB
                </div>
              </div>
            </div>

            {/* Kolom Tengah: Portrait with Artistic Blob Splash */}
            <div className="lg:col-span-4 flex justify-center relative">
              {/* Organic blobs mimicking paint strokes */}
              <div 
                className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-forest-50/80 rounded-[40%_60%_70%_30%_/_40%_40%_60%_50%] -rotate-6 animate-pulse duration-[6000ms]" 
                aria-hidden="true"
              />
              <div 
                className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-sky-100/50 rounded-[60%_40%_50%_50%_/_50%_30%_70%_50%] rotate-12" 
                aria-hidden="true"
              />
              
              {/* Profile Image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl z-10 bg-neutral-100">
                <img
                  src={profileData.profile_photo}
                  alt={`Potret profesional resmi dari ${profileData.full_name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 bg-white px-4 py-2 rounded-full border border-neutral-300/50 shadow-sm flex items-center gap-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-400 animate-pulse" />
                <span className="text-xs font-bold text-neutral-800">Tersedia untuk Kolaborasi</span>
              </div>
            </div>

            {/* Kolom Kanan: Tagline, Certification Stamp, & CTA Actions */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <p 
                  id="hero-subtext"
                  className="text-sky-900 text-base sm:text-lg leading-relaxed font-normal"
                >
                  {profileData.bio}
                </p>
              </div>

              {/* Circular Accreditation Badge / Stamp */}
              <div className="flex items-center gap-4 pt-2">
                <div 
                  className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full border border-dashed border-neutral-400 bg-white/40 shadow-sm hover:rotate-12 transition-transform shrink-0"
                  aria-hidden="true"
                >
                  <div className="absolute inset-1.5 rounded-full border border-sky-100/60 flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[8px] font-bold text-sky-800 uppercase tracking-widest leading-none">DESAIN</span>
                    <span className="text-[10px] font-bold text-forest-800 leading-none mt-0.5">RAMAH</span>
                    <span className="text-[7px] text-neutral-500 uppercase mt-0.5 tracking-tighter">UNTUK SEMUA</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed">
                  <span className="font-bold text-neutral-800 block uppercase tracking-wide text-[10px]">Fokus Kenyamanan</span>
                  Setiap website dibuat agar sangat mudah dibaca, nyaman di mata, dan ramah untuk semua pengunjung.
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div id="hero-actions" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <CTA 
                  type="whatsapp" 
                  label="Hubungi via WhatsApp" 
                  message="Halo Farhan, saya tertarik untuk mendiskusikan peluang proyek kerjasama."
                  className="shadow-sm hover:translate-y-[-1px] active:translate-y-0 transition-all text-xs"
                />
                <Link
                  id="hero-study-case-link"
                  to="/study-case"
                  className="inline-flex items-center justify-center gap-1.5 border border-sky-200 bg-white text-sky-800 font-bold text-xs hover:bg-sky-100/50 transition-all focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2"
                  style={{ borderRadius: "10px", padding: "10px 16px" }}
                >
                  <span>Lihat Studi Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1B. "BAGAI MANA SAYA MEMBANTU" (WHAT DO I HELP SECTION - INSPIRED BY BINJAN) */}
      <section 
        id="what-do-i-help-section" 
        ref={whatIHelpRef}
        className="py-16 md:py-24 border-b border-neutral-300/30"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Sisi Kiri: 3 Service Cards Deck */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Card 1 */}
              <div className="bg-card-bg border border-neutral-300/40 p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center shrink-0">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Pembuatan Website yang Nyaman</h4>
                  <p className="text-xs text-neutral-500 mt-1">Membuat website yang cepat dibuka, terlihat indah di HP maupun laptop, dan mudah digunakan.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-card-bg border border-neutral-300/40 p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Desain yang Ramah untuk Semua</h4>
                  <p className="text-xs text-neutral-500 mt-1">Memastikan website Anda bisa diakses dengan nyaman oleh siapa saja, termasuk lansia dan difabel.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-card-bg border border-neutral-300/40 p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-900 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Kecepatan Loading Maksimal</h4>
                  <p className="text-xs text-neutral-500 mt-1">Membuat website Anda terbuka secara instan tanpa menunggu lama, menghemat kuota dan waktu pengunjung.</p>
                </div>
              </div>

            </div>

            {/* Sisi Kanan: Headline & Impact Metrics */}
            <div className="lg:col-span-7 space-y-6 lg:pl-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-900 tracking-tight leading-tight">
                Bagaimana Saya Membantu Proyek Anda?
              </h2>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                Saya membantu merancang dan membangun website yang tidak hanya tampak cantik dan modern, tetapi juga terasa sangat nyaman saat digunakan. Dengan pendekatan yang ramah dan berfokus pada kemudahan pengguna, saya memastikan setiap pengunjung website Anda mendapatkan pengalaman yang menyenangkan, lancar, dan cepat.
              </p>
              
              {/* Metrics block */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-300/50">
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-sky-900 block">15JT+</span>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">PENGUNJUNG TERBANTU</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-forest-800 block">100%</span>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">KERAMAHAN WEBSITE</span>
                </div>
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#D95D39] block">Sangat Ringan</span>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">UKURAN AKSES CEPAT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED STUDY CASE SECTION */}
      {featuredStudyCases.length > 0 && (
      <section 
        id="featured-study-case-section" 
        ref={featuredStudyCaseRef}
        className="py-16 md:py-24"
      >
        <div className="container-custom">
          <div className="space-y-4 mb-10">
            <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight">
              Studi Kasus Unggulan
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base max-w-2xl">
              Melihat lebih dekat bagaimana saya membantu merancang, memecahkan masalah, dan memberikan solusi terbaik untuk setiap proyek.
            </p>
          </div>

          {/* 1-2 card besar (bukan grid kecil), tampilkan title + problem_statement */}
          <div className="space-y-8">
            {featuredStudyCases.map((sc) => (
              <article
                id={`featured-sc-${sc.slug}`}
                key={sc.slug}
                className="border border-neutral-300/40 rounded-2xl bg-card-bg overflow-hidden flex flex-col lg:flex-row transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-sky-400"
                style={{ borderRadius: "16px" }}
              >
                {/* Image side */}
                <div className="lg:w-1/2 h-64 lg:h-auto min-h-[300px] relative bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-300/40">
                  <img
                    src={sc.gallery_images[0] || "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=450&q=80"}
                    alt={`Gambar demonstrasi studi kasus: ${sc.title}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-sky-900 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Studi Kasus
                  </div>
                </div>

                {/* Content side */}
                <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">
                      {sc.context}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                      {sc.title}
                    </h3>
                    <div className="space-y-2 bg-sky-50/60 p-4 rounded-xl border border-sky-100/40">
                      <span className="text-[10px] font-extrabold text-sky-800 uppercase tracking-widest">
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
                        className="px-2.5 py-1 bg-[#FAF8F5] text-neutral-700 text-xs font-semibold rounded-md border border-neutral-300/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-300/40 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-mono">
                      Dirilis: {sc.date}
                    </span>
                    <button
                      id={`read-sc-${sc.slug}`}
                      onClick={() => {
                        trackCardClick("study_case", sc.slug, "home_featured");
                        onNavigate("study-case-detail", sc.slug);
                      }}
                      className="inline-flex items-center gap-1 text-sky-800 hover:text-sky-950 font-bold text-sm group"
                      aria-label={`Baca detail studi kasus: ${sc.title}`}
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 3. FEATURED PROJECTS SECTION */}
      {featuredProjects.length > 0 && (
      <section 
        id="featured-projects-section" 
        ref={featuredProjectsRef}
        className="py-16 md:py-24 bg-page-bg border-t border-b border-neutral-300/30"
      >
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight">
                Proyek Pilihan
              </h2>
              <p className="text-neutral-700 text-sm sm:text-base max-w-2xl">
                Beberapa hasil karya terbaik saya dalam membantu pemilik usaha dan komunitas menghadirkan produk digital yang bermanfaat.
              </p>
            </div>
            <div>
              <Link
                id="view-all-projects-btn"
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sky-800 font-bold text-sm hover:underline hover:text-sky-950"
              >
                <span>Lihat semua proyek</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Grid 3 kolom (mobile: 1 kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((p) => (
              <article
                id={`featured-project-${p.slug}`}
                key={p.slug}
                className="group bg-card-bg/50 border border-neutral-300/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sky-400/40 hover:bg-card-bg hover:shadow-lg hover:shadow-sky-900/5 focus-within:ring-2 focus-within:ring-sky-400 transition-all duration-300"
                style={{ borderRadius: "16px" }}
              >
                {/* Cover Image */}
                <div className="h-48 overflow-hidden relative bg-neutral-100 border-b border-neutral-300/20">
                  <img
                    src={p.cover_image}
                    alt={`Sampul proyek: ${p.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-extrabold text-sky-800 tracking-wider uppercase">
                      {p.role}
                    </p>
                    <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight group-hover:text-sky-800 transition-colors duration-300 line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {p.short_description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-sky-100/60 text-sky-800 text-[10px] font-bold rounded-md border border-sky-200/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-neutral-300/30 flex items-center justify-between">
                      <span className="text-xs text-neutral-500 font-mono">
                        {p.date}
                      </span>
                      <button
                        id={`read-project-${p.slug}`}
                        onClick={() => {
                          trackCardClick("project", p.slug, "home_featured");
                          onNavigate("project-detail", p.slug);
                        }}
                        className="inline-flex items-center gap-1.5 text-sky-800 hover:text-sky-950 font-bold text-xs"
                        aria-label={`Lihat detail proyek: ${p.title}`}
                      >
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 4. TESTIMONIAL SECTION */}
      {featuredTestimonials.length > 0 && (
      <section 
        id="testimonials-section" 
        ref={testimonialsRef}
        className="py-16 md:py-24"
      >
        <div className="container-custom">
          <div className="space-y-4 mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-sky-900 tracking-tight">
              Testimoni Klien &amp; Rekan Kerja
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base">
              Kata mereka yang pernah bekerja sama dan merasakan manfaat nyata dari hasil kolaborasi kami.
            </p>
          </div>

          {/* Grid 2 kolom, card dengan border-left 3px warna forest-400, teks italic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTestimonials.map((t, idx) => (
              <div
                id={`testimonial-card-${idx}`}
                key={idx}
                className="bg-card-bg border border-neutral-300/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
                style={{ 
                  borderRadius: "16px", 
                  borderLeftWidth: "3px", 
                  borderLeftColor: "var(--color-forest-400)" 
                }}
              >
                <div className="absolute top-6 right-6 text-neutral-300/20" aria-hidden="true">
                  <Quote className="w-12 h-12" />
                </div>
                
                {/* Teks Italic */}
                <blockquote className="text-neutral-700 italic leading-relaxed text-sm sm:text-base z-10">
                  &ldquo;{t.testimonial_text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pt-4 border-t border-neutral-300/30">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={`Foto ${t.name}`}
                      className="w-12 h-12 rounded-full object-cover border border-neutral-300/40"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <cite className="not-italic font-bold text-sm sm:text-base text-neutral-900 block">
                      {t.name}
                    </cite>
                    <span className="text-xs text-neutral-500 block">
                      {t.role} di <span className="font-semibold text-neutral-700">{t.company}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 5. PARTNER/KLIEN SECTION */}
      {partnersData.length > 0 && (
      <section 
        id="partners-section" 
        ref={partnersRef}
        className="py-12 md:py-16 bg-page-bg border-t border-neutral-300/30"
      >
        <div className="container-custom">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-neutral-500 mb-8">
            Telah Dipercaya oleh Berbagai Mitra &amp; Organisasi
          </p>
          
          {/* Baris nama/klien grayscale yang rapi */}
          <div id="partners-grid" className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {partnersData.map((p, idx) => (
              <a
                id={`partner-link-${idx}`}
                key={idx}
                href={p.website_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 text-neutral-700 hover:text-sky-800 transition-colors"
              >
                <span className="font-bold text-base md:text-lg tracking-tight uppercase">
                  {p.name}
                </span>
                {p.description && (
                  <span className="text-[10px] text-neutral-500 font-mono mt-0.5">
                    {p.type}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
      )}

    </div>
    </>
  );
}
