import React, { useState } from "react";
import { Send, CheckCircle, MessageSquare, Mail, ShieldAlert, Sparkles } from "lucide-react";
import { profileData, siteSettingsData } from "../data";
import CTA from "../components/CTA";
import Head from "../components/Head";
import { trackContactFormSubmit } from "../lib/analytics";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // State untuk melacak kesalahan validasi formulir dan percobaan submit
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Fungsi validasi mandiri per kolom formulir sesuai WCAG 2.1 AA
  const validateField = (fieldName: "name" | "email" | "message", value: string) => {
    let errorMsg = "";
    if (fieldName === "name") {
      if (!value.trim()) {
        errorMsg = "Nama Lengkap wajib diisi agar saya tahu dengan siapa saya berkomunikasi.";
      } else if (value.trim().length < 2) {
        errorMsg = "Nama Lengkap minimal terdiri dari 2 karakter.";
      }
    } else if (fieldName === "email") {
      if (!value.trim()) {
        errorMsg = "Alamat Email wajib diisi agar saya bisa menghubungi Anda kembali.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          errorMsg = "Format alamat email tidak valid. Harap gunakan format yang benar (contoh: nama@domain.com).";
        }
      }
    } else if (fieldName === "message") {
      if (!value.trim()) {
        errorMsg = "Detail Pesan wajib diisi untuk menjelaskan gagasan atau rencana kerja sama Anda.";
      } else if (value.trim().length < 10) {
        errorMsg = "Detail Pesan terlalu singkat. Mohon tulis minimal 10 karakter agar saya dapat memahami rincian dengan baik.";
      }
    }
    return errorMsg;
  };

  const handleFieldChange = (fieldName: "name" | "email" | "message", val: string) => {
    if (fieldName === "name") setName(val);
    else if (fieldName === "email") setEmail(val);
    else if (fieldName === "message") setMessage(val);

    if (submitAttempted) {
      const err = validateField(fieldName, val);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: err ? err : undefined,
      }));
    }
  };

  const handleFieldBlur = (fieldName: "name" | "email" | "message") => {
    const val = fieldName === "name" ? name : fieldName === "email" ? email : message;
    const err = validateField(fieldName, val);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: err ? err : undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    const nameErr = validateField("name", name);
    const emailErr = validateField("email", email);
    const messageErr = validateField("message", message);

    const newErrors = {
      ...(nameErr && { name: nameErr }),
      ...(emailErr && { email: emailErr }),
      ...(messageErr && { message: messageErr }),
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Fokus ke elemen summary kesalahan untuk aksesibilitas pembaca layar (Screen Reader)
      setTimeout(() => {
        const summaryElement = document.getElementById("error-summary-alert");
        if (summaryElement) {
          summaryElement.scrollIntoView({ behavior: "smooth", block: "center" });
          summaryElement.focus();
        } else {
          // Fallback fokus ke input pertama yang salah
          const firstErrorKey = Object.keys(newErrors)[0];
          const errorElement = document.getElementById(`${firstErrorKey}-input`);
          if (errorElement) {
            errorElement.focus();
          }
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Gagal mengirim pesan, coba lagi nanti.");
      }

      trackContactFormSubmit();
      setSubmitSuccess(true);
      setSubmitAttempted(false);
      setErrors({});
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal mengirim pesan, coba lagi nanti."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper colors for status
  const getStatusColorClass = (status: "open" | "selective" | "closed") => {
    switch (status) {
      case "open":
        return "bg-forest-50 text-forest-800 border-forest-400/20";
      case "selective":
        return "bg-sky-50 text-sky-800 border-sky-400/20";
      case "closed":
        return "bg-neutral-50 text-neutral-500 border-neutral-300";
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

  return (
    <>
    <Head
      title="Hubungi Saya / Memulai Kerjasama"
      description="Diskusikan proyek kustom, kebutuhan konsultasi audit aksesibilitas, atau tawarkan penawaran peran profesional."
      path="/contact"
    />
    <div id="contact-page" className="animate-in fade-in duration-300 py-16 md:py-24">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200 inline-block">
            Hubungi Saya
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Mari Mulai Kolaborasi Digital Anda
          </h1>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
            Punya ide menarik yang ingin diwujudkan, ingin membuat website usaha Anda jadi lebih ramah pengguna, atau sekadar ingin mengobrol santai? Pintu saya selalu terbuka untuk Anda.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* KOLOM KIRI: Form (Nama, Email, Pesan) */}
          <div className="lg:col-span-7 bg-card-bg border border-neutral-300 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-800" />
              <span>Kirim Formulir Pesan</span>
            </h2>

            {submitSuccess ? (
              <div 
                id="submit-success-card"
                className="bg-forest-50 border border-forest-400/20 text-forest-800 p-6 rounded-xl space-y-4 flex flex-col items-center text-center"
              >
                <CheckCircle className="w-12 h-12 text-forest-400" />
                <div className="space-y-1">
                  <h3 className="font-bold text-base sm:text-lg">Formulir Terkirim Berhasil!</h3>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    Terima kasih telah menghubungi saya. Pesan simulasi Anda telah berhasil diproses secara frontend. Saya akan meninjau dan meresponsnya sesegera mungkin.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2 text-xs font-bold text-sky-800 hover:underline"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* 1. Ringkasan Kesalahan (Error Summary) untuk WCAG Accessibility */}
                {Object.keys(errors).length > 0 && (
                  <div
                    id="error-summary-alert"
                    role="alert"
                    tabIndex={-1}
                    className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-rose-900 space-y-2 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="flex items-start gap-2 font-bold text-sm sm:text-base text-rose-800">
                      <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                      <span>Mohon perbaiki {Object.keys(errors).length} kesalahan sebelum mengirim pesan:</span>
                    </div>
                    <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 pl-1">
                      {errors.name && (
                        <li>
                          <a href="#name-input" className="hover:underline font-semibold focus:ring-1 focus:ring-rose-500 rounded px-1">
                            Nama Lengkap: {errors.name}
                          </a>
                        </li>
                      )}
                      {errors.email && (
                        <li>
                          <a href="#email-input" className="hover:underline font-semibold focus:ring-1 focus:ring-rose-500 rounded px-1">
                            Alamat Email: {errors.email}
                          </a>
                        </li>
                      )}
                      {errors.message && (
                        <li>
                          <a href="#message-input" className="hover:underline font-semibold focus:ring-1 focus:ring-rose-500 rounded px-1">
                            Detail Pesan: {errors.message}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Nama input */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-sm font-semibold text-neutral-700 block">
                    Nama Lengkap <span className="text-sky-800" aria-hidden="true">*</span>
                    <span className="sr-only">(wajib diisi)</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    onBlur={() => handleFieldBlur("name")}
                    placeholder="Masukkan nama lengkap Anda"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-xl text-neutral-900 bg-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.name
                        ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-neutral-300 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150"
                      role="status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email input */}
                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-sm font-semibold text-neutral-700 block">
                    Alamat Email <span className="text-sky-800" aria-hidden="true">*</span>
                    <span className="sr-only">(wajib diisi)</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={() => handleFieldBlur("email")}
                    placeholder="nama@perusahaan.com"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-xl text-neutral-900 bg-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-neutral-300 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150"
                      role="status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Pesan input */}
                <div className="space-y-2">
                  <label htmlFor="message-input" className="text-sm font-semibold text-neutral-700 block">
                    Detail Pesan <span className="text-sky-800" aria-hidden="true">*</span>
                    <span className="sr-only">(wajib diisi)</span>
                  </label>
                  <textarea
                    id="message-input"
                    rows={5}
                    value={message}
                    onChange={(e) => handleFieldChange("message", e.target.value)}
                    onBlur={() => handleFieldBlur("message")}
                    placeholder="Tuliskan gagasan proyek, pertanyaan, atau rincian kerjasama Anda di sini..."
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-xl text-neutral-900 bg-white placeholder-neutral-500 focus:outline-none transition-colors resize-y ${
                      errors.message
                        ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                        : "border-neutral-300 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150"
                      role="status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Pesan error kirim (misal gagal terhubung ke server email) */}
                {submitError && (
                  <p
                    id="submit-error-alert"
                    role="alert"
                    className="text-rose-800 text-sm font-medium flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{submitError}</span>
                  </p>
                )}

                {/* Submit button */}
                <div>
                  <button
                    id="form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-sky-800 text-white font-medium hover:bg-sky-900 transition-colors disabled:opacity-50"
                    style={{ borderRadius: "10px", padding: "11px 20px" }}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sedang Mengirim..." : "Kirim Formulir"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* KOLOM KANAN: Availability Status, WhatsApp, Email, Notes */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability status card */}
            <div className="bg-card-bg border border-neutral-300 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Status Ketersediaan
              </h3>
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span 
                    id="contact-availability-badge"
                    className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColorClass(
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
                
                {siteSettingsData.availability_note && (
                  <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-300/40">
                    {siteSettingsData.availability_note}
                  </p>
                )}
              </div>
            </div>

            {/* Quick CTAs Card */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-bold text-sky-900 tracking-tight">
                Hubungi Secara Instan
              </h3>
              
              <div className="space-y-4">
                {/* CTA WhatsApp button */}
                <div className="space-y-2">
                  <span className="text-xs text-sky-800 font-medium block">
                    Respon Tercepat:
                  </span>
                  <CTA
                    type="whatsapp"
                    label="Kirim Pesan WhatsApp Instan"
                    message="Halo Farhan, saya tertarik mendiskusikan penawaran kerja sama langsung via chat."
                    className="w-full text-center py-3"
                  />
                </div>

                {/* Email Direct mailto Link */}
                <div className="space-y-2 pt-2 border-t border-sky-200">
                  <span className="text-xs text-sky-800 font-medium block">
                    Kirim Surat Elektronik:
                  </span>
                  <a
                    id="contact-direct-email-link"
                    href={`mailto:${profileData.email}`}
                    className="inline-flex items-center justify-center gap-2 w-full border-1.5 border-sky-200 bg-white text-sky-800 font-medium hover:bg-sky-50 transition-colors"
                    style={{ borderRadius: "10px", padding: "11px 20px" }}
                  >
                    <Mail className="w-5 h-5" />
                    <span>{profileData.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Inclusivity Commitment Note */}
            <div className="border border-neutral-300 p-5 rounded-2xl space-y-3 bg-card-bg">
              <div className="flex items-center gap-2 text-neutral-700 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-sky-800" />
                <span>Komitmen Kenyamanan Pengguna</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Setiap website yang saya buat dirancang agar ramah dan mudah diakses oleh siapa saja. Jika Anda memiliki saran atau menemukan kendala kenyamanan saat membaca halaman ini, silakan beri tahu saya.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
    </>
  );
}
