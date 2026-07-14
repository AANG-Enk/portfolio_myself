# Portofolio Pribadi — Farhan Mohaemin Saparidja

Dibangun dengan React + Vite, di-render sebagai **SSG (Static Site Generation)** murni menggunakan `vite-react-ssg`. Tiap halaman (termasuk detail Project/Study Case/Blog) menghasilkan file HTML statis sendiri dengan meta tag unik — bukan SPA hash routing.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build untuk production

```bash
npm run build
```

Hasilnya ada di folder `dist/` — kumpulan file HTML statis siap di-deploy ke hosting statis manapun (Vercel, Netlify, Cloudflare Pages, GitHub Pages, dll). Tidak ada server Node yang perlu dijalankan.

## Struktur & cara update konten

Semua data ada di `src/data.ts` — array/objek biasa. Tambah/edit isi array (`projectsData`, `studyCasesData`, `blogPostsData`, `workExperiencesData`, `testimonialsData`, `partnersData`) sesuai skema di `src/types.ts`, lalu build ulang. `vite.config.ts` otomatis membaca slug dari `data.ts` untuk generate halaman detail.

## Tentang penghapusan `server.ts` (Express) — ke mana logic redirect-nya pindah?

Versi sebelumnya pakai server Express untuk 301 redirect (force HTTPS, hilangkan `www.`, bersihkan trailing slash). Karena sekarang situs 100% statis, server itu tidak jalan lagi. Logic itu dipindah ke config hosting:

- **`vercel.json`** — kalau deploy ke Vercel. Force HTTPS dan strip `www.` sudah otomatis ditangani Vercel di level domain (atur di Vercel dashboard → Domains), tidak perlu config tambahan untuk itu.
- **`netlify.toml`** — kalau deploy ke Netlify. Sama, HTTPS force otomatis dari Netlify.

Pilih salah satu sesuai hosting yang dipakai, file yang tidak dipakai boleh dihapus.

## SEO

- **Meta tag per halaman**: diatur lewat komponen `<Head/>` (`src/components/Head.tsx`), dipanggil di tiap page dengan title/description masing-masing. Saat build, ini ter-embed langsung ke HTML statis (bisa dicek: `grep title dist/projects/nama-slug.html`).
- **Sitemap**: `generate-sitemap.js` jalan otomatis sebelum build (`npm run build`), generate ulang `public/sitemap.xml` berdasarkan slug terbaru di `data.ts`, sudah pakai path asli (bukan hash).
- **Robots.txt**: `public/robots.txt`, statis.
- **JSON-LD structured data**: otomatis ditambahkan lewat `Head.tsx` (schema Person).

## Environment Variables

Salin `.env.example` jadi `.env` (lokal) dan isi juga di **Vercel dashboard → Settings → Environment Variables** (untuk production):

```
VITE_GTM_ID=GTM-XXXXXXX
GMAIL_USER=akunkamu@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
CONTACT_RECEIVER_EMAIL=akunkamu@gmail.com   # opsional
```

### Setup GTM

1. Buat container baru di [tagmanager.google.com](https://tagmanager.google.com), salin Container ID (`GTM-XXXXXXX`) ke `VITE_GTM_ID`
2. Di dalam GTM, buat Tag untuk GA4 Configuration, hubungkan ke GA4 Measurement ID kamu
3. Event yang sudah otomatis terkirim ke `dataLayer`: `cta_click`, `social_link_click`, `contact_form_submit`, `cv_download`, `section_view`, `scroll_depth` — tinggal buat Trigger & Tag di GTM untuk masing-masing

### Setup Gmail SMTP (kirim email dari contact form)

Gmail **tidak menerima password akun biasa** untuk SMTP pihak ketiga — wajib pakai **App Password**:

1. Aktifkan 2-Step Verification dulu di akun Google kamu (myaccount.google.com/security)
2. Buka [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Buat App Password baru (pilih nama bebas, misal "Portfolio Contact Form")
4. Copy 16-digit password yang muncul → masukkan ke `GMAIL_APP_PASSWORD` (bukan password Gmail biasa kamu)
5. `GMAIL_USER` diisi alamat Gmail kamu yang dipakai generate App Password itu

Endpoint kirim email ada di `api/contact.ts` — otomatis terdeteksi Vercel sebagai Serverless Function saat deploy, tidak perlu setup tambahan.

**Cara kerja:** form di `/contact` submit ke `/api/contact` → function ini pakai Nodemailer + Gmail SMTP (`smtp.gmail.com:465`) → email masuk ke `CONTACT_RECEIVER_EMAIL`.



- `server.ts` (Express) — dihapus, tidak relevan untuk arsitektur statis
- Dependency `@google/genai`, `dotenv`, `express` — dihapus, tidak terpakai
- Routing hash (`#projects/slug`) — diganti path asli (`/projects/slug`) pakai `react-router-dom` + `vite-react-ssg`

## Struktur halaman

```
/                       Home
/about                  About + timeline pengalaman kerja
/projects               Daftar project
/projects/:slug         Detail project
/study-case             Daftar study case
/study-case/:slug       Detail study case
/blog                   Daftar artikel
/blog/:slug             Detail artikel
/contact                Form kontak + availability status
```
