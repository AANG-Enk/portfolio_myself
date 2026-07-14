import { Profile, SiteSettings, Project, StudyCase, BlogPost, WorkExperience, Testimonial, Partner } from "./types";

export const profileData: Profile = {
  full_name: "Farhan Mohaemin Saparidja",
  profile_photo: "https://lh3.googleusercontent.com/d/1weOBp_4IiGxsMenTEBepXUdmVquMedTh",
  tagline: "Membangun Website yang Indah, Hangat, dan Nyaman Digunakan untuk Semua Orang",
  bio: "Halo! Saya Farhan. Saya senang membantu merancang dan membangun website yang tidak hanya terlihat cantik dan alami, tetapi juga terasa sangat ringan dan nyaman saat digunakan. Bagi saya, website terbaik adalah website yang ramah, mudah dipahami, dan bisa diakses oleh siapa saja.",
  email: "farhanmohaeminsaparidja@gmail.com",
  whatsapp_number: "628979060191",
  cv_url: "https://drive.google.com/uc?export=download&id=GANTI_DENGAN_FILE_ID_KAMU",
  social_media: [
    {
      platform: "GitHub",
      label: "GitHub Utama",
      username: "AANG-ENk",
      url: "https://github.com/AANG-ENk"
    },
    {
      platform: "LinkedIn",
      label: "LinkedIn Profesional",
      username: "farhan-mohaemin-b69151264",
      url: "https://www.linkedin.com/in/farhan-mohaemin-b69151264/"
    },
    {
      platform: "Instagram",
      label: "Instagram Pribadi",
      username: "farhanmohaemins",
      url: "https://instagram.com/@farhanmohaemins"
    },
    // {
    //   platform: "Instagram",
    //   label: "Instagram Portofolio",
    //   username: "#",
    //   url: "https://instagram.com"
    // }
  ]
};

export const siteSettingsData: SiteSettings = {
  availability_status: "open",
  availability_note: "Tersedia untuk proyek kontrak, konsultasi frontend, atau peran penuh waktu."
};

export const projectsData: Project[] = [
  // {
  //   title: "Dashboard Keuangan Finansia",
  //   slug: "finansia-dashboard",
  //   short_description: "Aplikasi pengelolaan keuangan keluarga yang sederhana, bersih, dan mudah dipahami oleh siapa saja.",
  //   cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=450&q=80",
  //   tags: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
  //   role: "Perancang & Pengembang Website",
  //   problem_statement: "Klien menginginkan aplikasi pencatatan keuangan yang ramah dan mudah dibaca oleh semua kalangan, termasuk orang tua atau pengguna dengan keterbatasan penglihatan, tanpa membingungkan mereka dengan banyak angka rumit.",
  //   process: "Kami menyederhanakan cara penyajian data, memilih warna alam yang teduh dengan kontras yang jelas, serta memastikan navigasi bisa digunakan dengan mudah menggunakan keyboard maupun suara pembaca layar.",
  //   result: "Aplikasi ini kini sangat nyaman dibaca, ramah bagi penyandang disabilitas, dan mendapat tanggapan yang sangat positif karena tampilannya yang bersih dan menenangkan.",
  //   gallery_images: [
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
  //     "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&h=400&q=80"
  //   ],
  //   live_url: "https://github.com",
  //   repo_url: "https://github.com",
  //   featured: true,
  //   date: "Juni 2026"
  // },
  // {
  //   title: "Platform Belajar KursusKita",
  //   slug: "kursuskita-learning",
  //   short_description: "Tempat belajar online yang interaktif dengan pemutar video yang lancar dan kuis seru yang menyenangkan.",
  //   cover_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=450&q=80",
  //   tags: ["React", "Tailwind CSS", "Motion", "Web Audio API"],
  //   role: "Pengembang Aplikasi Web",
  //   problem_statement: "Banyak platform belajar online terasa membosankan dan lambat saat diakses dari HP dengan sinyal kurang bagus.",
  //   process: "Kami mengoptimalkan pemutar video agar tetap lancar diakses dengan koneksi internet apa pun, serta menambahkan animasi-animasi kecil yang manis saat siswa menyelesaikan kuis agar belajar terasa menyenangkan seperti bermain game.",
  //   result: "Aplikasi terasa sangat ringan dan cepat di HP, membuat siswa lebih betah belajar dan bersemangat menyelesaikan kuis-kuis mereka.",
  //   gallery_images: [
  //     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&h=400&q=80",
  //     "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80"
  //   ],
  //   live_url: "https://github.com",
  //   repo_url: "https://github.com",
  //   featured: true,
  //   date: "Maret 2026"
  // },
  // {
  //   title: "Toko Online Kerajinan Nusantara",
  //   slug: "nusantara-crafts",
  //   short_description: "Toko online hangat untuk memasarkan hasil kerajinan tangan khas Indonesia dengan sistem pencarian cepat dan proses belanja yang mudah.",
  //   cover_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=450&q=80",
  //   tags: ["React", "TypeScript", "Tailwind CSS", "Fuse.js"],
  //   role: "Pengembang Website",
  //   problem_statement: "Banyak calon pembeli kesulitan mencari produk kerajinan yang mereka inginkan dan sering membatalkan pesanan karena formulir belanja yang terlalu panjang dan rumit.",
  //   process: "Kami merancang ulang halaman belanja agar bisa diselesaikan dalam satu langkah mudah, memberikan petunjuk pengisian yang jelas, serta membuat pencarian pintar yang tetap bisa menemukan produk meski ada salah ketik.",
  //   result: "Proses belanja menjadi jauh lebih menyenangkan, pencarian produk terasa instan, dan para perajin lokal berhasil mendapatkan lebih banyak pesanan.",
  //   gallery_images: [
  //     "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&h=400&q=80",
  //     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80"
  //   ],
  //   live_url: "https://github.com",
  //   repo_url: "https://github.com",
  //   featured: false,
  //   date: "Januari 2026"
  // }
];

export const studyCasesData: StudyCase[] = [
  // {
  //   title: "Website Kesehatan Ramah Lansia & Disabilitas",
  //   slug: "portal-kesehatan-nasional",
  //   context: "Layanan Kesehatan yang Mudah untuk Semua Orang",
  //   problem_statement: "Banyak orang tua dan penyandang disabilitas kesulitan membaca informasi kesehatan penting karena hurufnya terlalu kecil, warna teks kurang jelas, dan tidak mendukung alat bantu pembaca layar.",
  //   constraints: "Tampilan baru harus tetap sangat cepat diakses di HP jadul, menjaga kerahasiaan data pasien, dan tidak mengganggu sistem server yang sudah ada.",
  //   tech_stack: ["React", "TypeScript", "Tailwind CSS", "Aria-Live", "Lighthouse Audit"],
  //   result: "Kini website sangat mudah dibaca oleh siapa saja termasuk lansia, loading terasa instan, dan masyarakat bisa mencari informasi kesehatan tanpa hambatan.",
  //   lesson_learned: "Merancang dengan rasa empati adalah hal paling utama. Ketika kita membuat website yang ramah untuk semua orang, kita sedang mempermudah kehidupan nyata mereka.",
  //   gallery_images: [
  //     "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=450&q=80",
  //     "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=450&q=80"
  //   ],
  //   featured: true,
  //   date: "Mei 2026",
  //   content: "Fase pertama dari proyek ini berfokus pada audit menyeluruh terhadap elemen HTML yang tidak semantis. Kami menemukan banyak tombol yang menggunakan tag div tanpa atribut keyboard listener. Saya merestrukturisasi komponen tombol tersebut menggunakan elemen HTML semantik <button> dan menambahkan state focus-visible yang kontras. Selanjutnya, kami merancang skema palet warna dengan rasio kontras 7:1 untuk teks utama. Melalui pengujian intensif bersama komunitas tuna netra pengguna NVDA screen reader, kami berhasil merumuskan navigasi skip-link yang memungkinkan pengguna melompati bagian navigasi utama langsung menuju konten inti."
  // },
  // {
  //   title: "Dashboard Kerja Cepat Bebas Loading",
  //   slug: "optimasi-dashboard-korporasi",
  //   context: "Dashboard Kerja yang Cepat dan Ringan",
  //   problem_statement: "Halaman pemantau data perusahaan terasa sangat lambat dan berat saat dibuka, membuat karyawan harus menunggu lama sebelum bisa mulai bekerja.",
  //   constraints: "Tampilan baru harus tetap menampilkan seluruh grafik perkembangan data secara lengkap tanpa menghilangkan riwayat penting.",
  //   tech_stack: ["React Lazy/Suspense", "Webpack Bundle Analyzer", "Tailwind CSS", "Recharts Dynamic Import"],
  //   result: "Halaman dashboard kini terbuka dengan sangat cepat secara instan, menghemat baterai perangkat, dan membantu karyawan bekerja dengan lebih santai tanpa stres menunggu loading.",
  //   lesson_learned: "Kunci dari website yang terasa ringan adalah memuat apa yang benar-benar dibutuhkan di depan mata terlebih dahulu. Hal kecil ini berdampak besar bagi kenyamanan harian pengguna.",
  //   gallery_images: [
  //     "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=450&q=80",
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=450&q=80"
  //   ],
  //   featured: true,
  //   date: "Februari 2026",
  //   content: "Analisis bundel JavaScript menunjukkan bahwa pustaka grafik menyumbang 60% dari ukuran file total. Solusi yang saya terapkan adalah membungkus komponen grafik di dalam React.lazy dan menampilkannya hanya saat pengguna menggulir layar mendekati area grafik (viewport lazy loading). Saya juga mengganti ikon SVG manual yang berukuran besar dengan Lucide-React yang di-tree-shake secara sempurna oleh Vite. Terakhir, optimasi CSS dilakukan dengan mengadopsi Tailwind CSS v4 yang menghasilkan file style super ringkas, meminimalkan waktu pemblokiran rendering pertama."
  // }
];

export const blogPostsData: BlogPost[] = [
  // {
  //   title: "Membuat Website yang Ramah dan Nyaman untuk Semua Pengunjung",
  //   slug: "memahami-desain-inklusif-wcag-react",
  //   excerpt: "Tips sederhana merancang halaman website yang mudah dibaca, diakses, dan nyaman digunakan oleh semua orang tanpa terkecuali.",
  //   cover_image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=450&q=80",
  //   category: "Desain Ramah",
  //   tags: ["Aksesibilitas", "Kenyamanan", "Web"],
  //   published_date: "12 Juli 2026",
  //   reading_time: "5 menit membaca",
  //   author: "Farhan Mohaemin Saparidja",
  //   content: "Merancang website yang ramah bukan sekadar memenuhi standar teknis, tetapi tentang memberikan kepedulian yang nyata kepada setiap pengunjung. Di artikel ini, kita akan membahas cara-cara mudah membuat tampilan menu, tombol, dan teks agar terasa nyaman dibaca oleh siapa saja, termasuk lansia atau mereka yang memiliki keterbatasan penglihatan."
  // },
  // {
  //   title: "Melihat Lebih Dekat Rahasia Website yang Cepat dan Ringan",
  //   slug: "mengenal-tailwind-css-v4-performa-baru",
  //   excerpt: "Bagaimana cara kerja teknologi terbaru yang membuat proses pembuatan tampilan website menjadi jauh lebih praktis dan instan.",
  //   cover_image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&h=450&q=80",
  //   category: "Tips & Trik",
  //   tags: ["Teknologi", "Website", "Performa"],
  //   published_date: "28 Juni 2026",
  //   reading_time: "4 menit membaca",
  //   author: "Farhan Mohaemin Saparidja",
  //   content: "Pernahkah Anda bertanya mengapa ada website yang bisa dibuka dalam sekejap mata? Di tulisan kali ini, saya ingin membagikan perkembangan alat bantu terbaru dalam dunia pembuatan website yang membantu kami sebagai pembuat kode merancang tampilan indah dengan ukuran file super kecil."
  // },
  // {
  //   title: "Menulis Kode yang Rapi Agar Website Bebas Error",
  //   slug: "panduan-typescript-aman-tanpa-any",
  //   excerpt: "Cara sederhana menyusun kode website agar selalu berjalan mulus tanpa masalah saat diakses oleh calon pelanggan.",
  //   cover_image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&h=450&q=80",
  //   category: "Tips Coding",
  //   tags: ["Kerapian", "Keamanan", "Sederhana"],
  //   published_date: "15 Mei 2026",
  //   reading_time: "6 menit membaca",
  //   author: "Farhan Mohaemin Saparidja",
  //   content: "Di balik website yang indah, ada susunan kode yang tertata dengan rapi. Saya akan berbagi cerita tentang kebiasaan baik dalam menulis aturan kode yang terstruktur agar website Anda terhindar dari kendala tidak terduga saat dikunjungi banyak orang sekaligus."
  // }
];

export const workExperiencesData: WorkExperience[] = [
  // {
  //   company_name: "TechSolusi Digital Utama",
  //   role: "Senior Frontend Specialist",
  //   start_date: "Maret 2024",
  //   end_date: "Present",
  //   description: "Memimpin tim dalam merancang ulang aplikasi keuangan agar tampil lebih segar, modern, mudah dipahami, dan cepat diakses oleh pelanggan korporat.",
  //   key_achievements: [
  //     "Mengurangi waktu tunggu halaman hingga 35%, membuat website terasa jauh lebih responsif dan ringan.",
  //     "Menyempurnakan seluruh bagian halaman agar ramah bagi penyandang disabilitas, meningkatkan kepuasan pengguna hingga 80%.",
  //     "Membuat panduan desain tampilan bersama yang mempercepat waktu pembuatan fitur baru hingga 40%."
  //   ],
  //   tech_stack_used: ["React", "TypeScript", "Tailwind CSS", "Vite", "Recharts", "Jest"],
  //   company_logo: "🏢"
  // },
  // {
  //   company_name: "CreativeDev Indonesia",
  //   role: "Pengembang Website",
  //   start_date: "Juli 2021",
  //   end_date: "Februari 2024",
  //   description: "Membantu lebih dari 15 bisnis dan organisasi dari berbagai bidang seperti toko online, kesehatan, hingga sekolah dalam membuat website yang ramah pengguna.",
  //   key_achievements: [
  //     "Mengoptimalkan performa kecepatan website toko online agar pengunjung bisa mencari barang dengan sangat cepat tanpa hambatan.",
  //     "Membantu mengintegrasikan sistem pembayaran lokal yang aman dan pelacakan kurir pengiriman secara langsung pada halaman belanja.",
  //     "Merancang sistem kuis belajar interaktif yang menyenangkan dan telah digunakan oleh lebih dari 50.000 siswa aktif."
  //   ],
  //   tech_stack_used: ["React", "JavaScript", "Tailwind CSS", "REST API", "Framer Motion"],
  //   company_logo: "💻"
  // }
];

export const testimonialsData: Testimonial[] = [
  // {
  //   name: "Ahmad Subagio",
  //   role: "Chief Technology Officer",
  //   company: "Finansia Corp",
  //   photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  //   testimonial_text: "Farhan memiliki kemampuan yang luar biasa dalam memadukan keindahan tampilan dengan kemudahan akses bagi pengguna. Hasil kerjanya pada sistem dashboard kami sangat bersih, mudah dipahami, dan sangat ramah untuk diakses oleh siapa saja.",
  //   rating: 5,
  //   featured: true,
  //   date: "April 2026"
  // },
  // {
  //   name: "Siti Rahmawati",
  //   role: "Product Manager",
  //   company: "KursusKita",
  //   photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  //   testimonial_text: "Sangat menyenangkan bekerja bersama Farhan. Dia selalu mendengarkan kebutuhan pengguna dengan penuh empati. Sistem belajar interaktif yang dia rancang berhasil membuat siswa kami merasa lebih bersemangat.",
  //   rating: 5,
  //   featured: true,
  //   date: "Maret 2026"
  // }
];

export const partnersData: Partner[] = [
  // {
  //   name: "Finansia Corp",
  //   website_url: "https://finansia.com",
  //   type: "client",
  //   description: "Pencatatan keuangan korporasi yang terpercaya.",
  //   featured: true
  // },
  // {
  //   name: "KursusKita",
  //   website_url: "https://kursuskita.com",
  //   type: "client",
  //   description: "Media belajar online yang menyenangkan untuk anak muda.",
  //   featured: true
  // },
  // {
  //   name: "Nusantara Crafts",
  //   website_url: "https://nusantaracrafts.com",
  //   type: "partner",
  //   description: "Sinergi para pengrajin lokal tradisional seluruh Indonesia.",
  //   featured: true
  // }
];
