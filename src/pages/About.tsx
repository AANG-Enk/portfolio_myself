import React from "react";
import { Download, Calendar, Briefcase, Award, Cpu } from "lucide-react";
import { profileData, workExperiencesData } from "../data";
import Head from "../components/Head";
import { trackCvDownload } from "../lib/analytics";
import { useSectionView } from "../lib/useSectionView";
import EmptyState from "../components/EmptyState";

export default function About() {
  const profileRef = useSectionView<HTMLElement>("about_profile_section");
  const experienceRef = useSectionView<HTMLElement>("work_experience_section");

  const handleDownloadCV = () => {
    trackCvDownload();
    // Tidak perlu preventDefault/window.open manual — link asli sudah ada di href
    // (lihat <a href={profileData.cv_url}> di bawah), ini cuma catat event-nya ke GTM.
  };

  return (
    <>
    <Head
      title="Tentang Saya"
      description="Pelajari rekam jejak karir, keahlian teknis, dan komitmen Farhan Mohaemin Saparidja terhadap pengembangan web inklusif (WCAG 2.1 AA)."
      path="/about"
    />
    <div id="about-page" className="animate-in fade-in duration-300 py-16 md:py-24">
      <div className="container-custom">
        
        {/* 1. LAYOUT 2 KOLOM (PROFIL & FOTO) */}
        <section id="about-profile-section" ref={profileRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-20">
          {/* Kiri: Foto Profil */}
          <div className="md:col-span-5 flex justify-center relative py-6 md:py-0">
            {/* Organic blobs mimicking paint strokes */}
            <div 
              className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-forest-50/80 rounded-[40%_60%_70%_30%_/_40%_40%_60%_50%] -rotate-6 animate-pulse duration-[6000ms]" 
              aria-hidden="true"
            />
            <div 
              className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-sky-100/50 rounded-[60%_40%_50%_50%_/_50%_30%_70%_50%] rotate-12" 
              aria-hidden="true"
            />
            
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl z-10 bg-neutral-100">
              <img
                src={profileData.profile_photo}
                alt={`Foto profil resmi ${profileData.full_name}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Kanan: Nama, Bio, Download CV */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200">
              <span>Tentang Saya</span>
            </div>
            
            <h1 id="about-title" className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              {profileData.full_name}
            </h1>
            
            <p id="about-bio" className="text-neutral-700 text-base sm:text-lg leading-relaxed">
              {profileData.bio}
            </p>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Saya percaya bahwa keindahan sebuah website tidak hanya terletak pada tampilannya saja, tetapi juga pada kehangatan dan kemudahan yang dirasakan penggunanya. Setiap website yang saya buat dirancang dengan penuh empati, memastikan setiap orang—termasuk mereka yang memiliki keterbatasan—bisa menggunakannya dengan mudah dan tanpa hambatan.
            </p>

            {/* Tombol Download CV */}
            <div className="pt-4">
              <a
                id="download-cv-btn"
                href={profileData.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCV}
                className="inline-flex items-center justify-center gap-2 bg-sky-800 text-white font-medium hover:bg-sky-900 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2"
                style={{ borderRadius: "10px", padding: "11px 20px" }}
              >
                <Download className="w-5 h-5" />
                <span>Unduh CV Lengkap (PDF)</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2. TIMELINE PENGALAMAN KERJA DETAIL */}
        <section id="work-experience-section" ref={experienceRef} className="border-t border-neutral-300 pt-16">
          <div className="max-w-3xl space-y-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-sky-800" />
              <span>Rekam Jejak &amp; Pengalaman Profesional</span>
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Riwayat perjalanan profesional saya dalam merancang solusi digital yang berdampak nyata.
            </p>
          </div>

          {/* Timeline Wrapper */}
          {workExperiencesData.length === 0 ? (
            <EmptyState
              title="Riwayat pengalaman kerja segera hadir"
              description="Saya sedang menyusun rekam jejak profesional saya di sini."
            />
          ) : (
          <div id="experience-timeline" className="relative pl-6 sm:pl-8 border-l border-neutral-300 ml-4 space-y-12">
            {workExperiencesData.map((exp, idx) => {
              const isPresent = exp.end_date.toLowerCase() === "present";
              return (
                <article 
                  id={`experience-entry-${idx}`}
                  key={idx} 
                  className="relative group space-y-4"
                >
                  {/* Timeline Dot Accent */}
                  <span 
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-colors group-hover:scale-110 ${
                      isPresent ? "border-forest-400" : "border-neutral-500"
                    }`}
                    aria-hidden="true"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? "bg-forest-400 animate-ping" : "bg-neutral-500"}`} />
                  </span>

                  {/* Header metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.start_date} &mdash; {exp.end_date}</span>
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-sky-800">
                        {exp.company_logo && <span className="mr-1.5" aria-hidden="true">{exp.company_logo}</span>}
                        <span>{exp.company_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi Peran */}
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>

                  {/* Key Achievements (Bullet List) */}
                  <div className="space-y-2 bg-card-bg p-5 rounded-xl border border-neutral-300/40">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-sky-800" />
                      <span>Pencapaian Utama (Key Achievements)</span>
                    </h4>
                    <ul className="list-disc pl-5 space-y-2.5 text-neutral-700 text-sm sm:text-base leading-relaxed">
                      {exp.key_achievements.map((ach, achIdx) => (
                        <li key={achIdx} className="marker:text-sky-800">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Used (Badges) */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-sky-800" />
                      <span>Teknologi yang Digunakan</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech_stack_used.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-sky-50 text-sky-800 text-xs font-medium rounded-md border border-sky-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </article>
              );
            })}
          </div>
          )}
        </section>

      </div>
    </div>
    </>
  );
}