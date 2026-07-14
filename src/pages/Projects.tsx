import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Sparkles, AlertCircle, BookOpen, MessageSquare } from "lucide-react";
import { projectsData } from "../data";
import CTA from "../components/CTA";
import Head from "../components/Head";
import { trackCardClick } from "../lib/analytics";
import EmptyState from "../components/EmptyState";

export default function Projects() {
  const { slug: selectedSlug } = useParams();
  const navigate = useNavigate();
  const onNavigate = (page: string, slug?: string) => {
    if (page === "project-detail" && slug) return navigate(`/projects/${slug}`);
    navigate(`/${page}`);
  };

  // Jika ada selectedSlug, tampilkan detail proyek
  if (selectedSlug) {
    const project = projectsData.find((p) => p.slug === selectedSlug);

    // Proteksi jika slug tidak ditemukan
    if (!project) {
      return (
        <>
        <Head title="Proyek Tidak Ditemukan" description="Proyek yang Anda cari tidak tersedia." path={`/projects/${selectedSlug}`} />
        <div className="container-custom py-24 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-neutral-500 mx-auto" />
          <h1 className="text-2xl font-bold text-neutral-900">Proyek Tidak Ditemukan</h1>
          <p className="text-neutral-700">Maaf, proyek dengan tautan yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => onNavigate("projects")}
            className="inline-flex items-center gap-2 text-sky-800 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Proyek</span>
          </button>
        </div>
        </>
      );
    }

    // DETAIL LAYOUT: Hero image -> Role -> Problem -> Process -> Result -> tombol live_url/repo_url -> CTA WhatsApp di akhir
    return (
      <>
      <Head title={project.title} description={project.short_description} path={`/projects/${project.slug}`} />
      <article id={`project-detail-${project.slug}`} className="animate-in fade-in duration-300 py-12">
        <div className="container-custom space-y-12 max-w-4xl">
          
          {/* Back button */}
          <div>
            <button
              id="back-to-projects-btn"
              onClick={() => onNavigate("projects")}
              className="inline-flex items-center gap-2 text-sky-800 hover:text-sky-950 font-bold text-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Semua Proyek</span>
            </button>
          </div>

          {/* 1. HERO IMAGE (Besar & Megah) */}
          <div id="project-hero" className="space-y-6">
            <div className="h-[250px] sm:h-[400px] rounded-2xl overflow-hidden border border-neutral-300 bg-neutral-50 relative">
              <img
                src={project.cover_image}
                alt={`Gambar sampul besar untuk proyek: ${project.title}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Title & Date */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-500">{project.date}</span>
              <h1 id="project-detail-title" className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>
          </div>

          {/* 2. ROLE */}
          <section id="project-role" className="bg-sky-50 border border-sky-100 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 block">
              Peran Saya
            </span>
            <p className="text-sky-900 font-bold text-lg sm:text-xl">
              {project.role}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white text-sky-800 text-xs font-medium rounded-md border border-sky-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* 3. PROBLEM STATEMENT */}
          <section id="project-problem" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-sky-800 rounded-full" />
              <span>Tantangan &amp; Masalah</span>
            </h2>
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed bg-card-bg p-6 rounded-2xl border border-neutral-300/40">
              {project.problem_statement}
            </p>
          </section>

          {/* 4. PROCESS */}
          <section id="project-process" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-sky-800 rounded-full" />
              <span>Langkah Penyelesaian</span>
            </h2>
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {project.process}
            </p>
          </section>

          {/* 5. RESULT */}
          <section id="project-result" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-sky-800 rounded-full" />
              <span>Hasil Akhir &amp; Dampak</span>
            </h2>
            <div className="text-neutral-700 text-base sm:text-lg leading-relaxed bg-forest-50 p-6 rounded-2xl border border-forest-400/20 text-forest-800 font-medium">
              {project.result}
            </div>
          </section>

          {/* Gallery Images (Opsional, jika ada) */}
          {project.gallery_images && project.gallery_images.length > 0 && (
            <section id="project-gallery" className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Galeri Implementasi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery_images.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-neutral-300">
                    <img
                      src={img}
                      alt={`Dokumentasi sistem proyek ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. TOMBOL live_url / repo_url */}
          {(project.live_url || project.repo_url) && (
            <section id="project-links" className="pt-6 border-t border-neutral-300 flex flex-wrap gap-4">
              {project.live_url && (
                <a
                  id="project-live-btn"
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-sky-800 text-white font-medium hover:bg-sky-900 transition-colors"
                  style={{ borderRadius: "10px", padding: "11px 20px" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kunjungi Situs Live</span>
                </a>
              )}
              {project.repo_url && (
                <a
                  id="project-repo-btn"
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-1.5 border-sky-200 bg-transparent text-sky-800 font-medium hover:bg-sky-50 transition-colors"
                  style={{ borderRadius: "10px", padding: "11px 20px" }}
                >
                  <Github className="w-4 h-4" />
                  <span>Lihat Repositori Code</span>
                </a>
              )}
            </section>
          )}

          {/* 7. CTA WHATSAPP DI AKHIR */}
          <section id="project-cta" className="bg-sky-50 border border-sky-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-sky-900 text-lg">Tertarik mengobrol mengenai proyek ini?</h3>
              <p className="text-sky-800 text-sm">Hubungi saya untuk berdiskusi atau membuat website serupa.</p>
            </div>
            <CTA
              type="whatsapp"
              label="Diskusikan via WhatsApp"
              message={`Halo Farhan, saya melihat detail proyek "${project.title}" di portofolio Anda dan ingin berkonsultasi mengenai solusi pengerjaan web.`}
              className="w-full sm:w-auto text-center"
            />
          </section>

        </div>
      </article>
      </>
    );
  }

  // JIKA TIDAK ADA SLUG, TAMPILKAN LIST PROYEK
  return (
    <>
    <Head
      title="Portofolio Proyek Pilihan"
      description="Jelajahi galeri aplikasi web interaktif, sistem dashboard, dan kontribusi open-source berbasis React dan Tailwind CSS."
      path="/projects"
    />
    <div id="projects-list-page" className="animate-in fade-in duration-300 py-16 md:py-24">
      <div className="container-custom">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200 inline-block">
            Semua Proyek
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Galeri Portofolio Proyek
          </h1>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
            Berikut adalah beberapa hasil karya digital saya yang dirancang dengan penuh empati, kenyamanan visual, dan kemudahan akses bagi setiap pengguna.
          </p>
        </div>

        {/* Grid List */}
        {projectsData.length === 0 ? (
          <EmptyState
            title="Belum ada project dipublikasikan"
            description="Saya sedang menyiapkan dokumentasi project terbaik saya. Silakan cek kembali dalam waktu dekat, atau hubungi saya langsung untuk melihat portofolio lengkap."
          />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <article
              id={`project-card-${project.slug}`}
              key={project.slug}
              className="group bg-card-bg/50 border border-neutral-300/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sky-400/40 hover:bg-card-bg hover:shadow-lg hover:shadow-sky-900/5 focus-within:ring-2 focus-within:ring-sky-400 transition-all duration-300"
              style={{ borderRadius: "16px" }}
            >
              {/* Cover Image */}
              <div className="h-52 overflow-hidden relative bg-neutral-100 border-b border-neutral-300/20">
                <img
                  src={project.cover_image}
                  alt={`Sampul proyek: ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <p className="text-[10px] font-extrabold text-sky-800 tracking-wider uppercase">
                    {project.role}
                  </p>
                  <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight group-hover:text-sky-800 transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.short_description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
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
                      {project.date}
                    </span>
                    <button
                      id={`view-detail-btn-${project.slug}`}
                      onClick={() => {
                        trackCardClick("project", project.slug, "projects_list");
                        onNavigate("project-detail", project.slug);
                      }}
                      className="inline-flex items-center gap-1.5 text-sky-800 hover:text-sky-950 font-bold text-xs"
                      aria-label={`Lihat detail proyek: ${project.title}`}
                    >
                      <span>Lihat Detail</span>
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

      </div>
    </div>
    </>
  );
}
