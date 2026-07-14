import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, User, AlertCircle } from "lucide-react";
import { blogPostsData } from "../data";
import ShareButtons from "../components/ShareButtons";
import Head from "../components/Head";
import { trackCardClick } from "../lib/analytics";

export default function Blog() {
  const { slug: selectedSlug } = useParams();
  const navigate = useNavigate();
  const onNavigate = (page: string, slug?: string) => {
    if (page === "blog-detail" && slug) return navigate(`/blog/${slug}`);
    navigate(`/${page}`);
  };

  // JIKA ADA SLUG, TAMPILKAN DETAIL BLOG
  if (selectedSlug) {
    const post = blogPostsData.find((p) => p.slug === selectedSlug);

    // Proteksi jika slug tidak ditemukan
    if (!post) {
      return (
        <>
        <Head title="Artikel Tidak Ditemukan" description="Artikel yang Anda cari tidak tersedia." path={`/blog/${selectedSlug}`} />
        <div className="container-custom py-24 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-neutral-500 mx-auto" />
          <h1 className="text-2xl font-bold text-neutral-900">Artikel Tidak Ditemukan</h1>
          <p className="text-neutral-700">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => onNavigate("blog")}
            className="inline-flex items-center gap-2 text-sky-800 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Blog</span>
          </button>
        </div>
        </>
      );
    }

    // EDITORIAL LAYOUT: max-width sempit (~680px), tampilkan reading_time & published_date
    return (
      <>
      <Head title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <article id={`blog-detail-${post.slug}`} className="animate-in fade-in duration-300 py-12">
        <div className="container-custom max-w-[680px] space-y-8">
          
          {/* Back button */}
          <div>
            <button
              id="back-to-blog"
              onClick={() => onNavigate("blog")}
              className="inline-flex items-center gap-2 text-sky-800 hover:text-sky-950 font-bold text-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Blog</span>
            </button>
          </div>

          {/* Header Metadata */}
          <header className="space-y-4">
            <span className="px-2.5 py-1 bg-sky-50 text-sky-800 text-xs font-semibold uppercase tracking-wider rounded border border-sky-100">
              {post.category}
            </span>
            <h1 id="blog-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
              {post.title}
            </h1>
            
            {/* Metadata (Reading Time, Date, Author) */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 pt-2 border-y border-neutral-300 py-3 text-xs sm:text-sm text-neutral-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span>{post.published_date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>{post.reading_time}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-neutral-500" />
                <span>{post.author}</span>
              </span>
            </div>
          </header>

          {/* Cover Image */}
          <div className="aspect-[16/9] rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100">
            <img
              src={post.cover_image}
              alt={`Sampul artikel: ${post.title}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Long Article Content */}
          <section id="blog-content" className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
              {post.excerpt}
            </p>
            <div className="text-neutral-700 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-6">
              {post.content}
            </div>
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mt-6">
              Kemudahan aksesibilitas pada akhirnya menguntungkan seluruh ekosistem pengguna. Ketika kita mendesain produk dengan prinsip-prinsip inklusi, kita tidak hanya melayani minoritas pengguna dengan kemampuan fisik terbatas, namun juga memberikan alternatif penggunaan terbaik untuk situasi-situasi temporer yang menuntut kepraktisan penuh.
            </p>
          </section>

          {/* Social Share Buttons (Forest Theme) */}
          <ShareButtons title={post.title} path={`/blog/${post.slug}`} />

          {/* Tags */}
          <div className="pt-6 border-t border-neutral-300 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs text-neutral-700 bg-neutral-50 px-2.5 py-1 rounded border border-neutral-300/60"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

        </div>
      </article>
      </>
    );
  }

  // JIKA TIDAK ADA SLUG, TAMPILKAN LIST ARTIKEL
  return (
    <>
    <Head
      title="Artikel & Tulisan Teknis"
      description="Kumpulan artikel, tips pemrograman, rilis teknologi baru, dan tutorial seputar pengembangan web modern."
      path="/blog"
    />
    <div id="blog-list-page" className="animate-in fade-in duration-300 py-16 md:py-24">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-sky-200 inline-block">
            Artikel &amp; Blog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Tulisan &amp; Catatan Berbagi
          </h1>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
            Tempat saya berbagi cerita, tips sederhana, serta panduan praktis untuk membuat website yang indah, cepat, dan nyaman bagi semua orang.
          </p>
        </div>

        {/* List: card horizontal (thumbnail kiri, judul+excerpt kanan) */}
        <div className="space-y-8 max-w-4xl">
          {blogPostsData.map((post) => (
            <article
              id={`blog-card-${post.slug}`}
              key={post.slug}
              className="bg-card-bg border border-neutral-300 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-sky-200 transition-all focus-within:ring-2 focus-within:ring-sky-400"
              style={{ borderRadius: "16px" }}
            >
              {/* Thumbnail Kiri */}
              <div className="md:w-1/3 h-52 md:h-auto min-h-[200px] relative bg-neutral-100 border-b md:border-b-0 md:border-r border-neutral-300">
                <img
                  src={post.cover_image}
                  alt={`Sampul untuk artikel: ${post.title}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Judul & Excerpt Kanan */}
              <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-sky-50 text-sky-800 text-[10px] font-bold uppercase tracking-wider rounded border border-sky-100">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.reading_time}</span>
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 tracking-tight hover:text-sky-800 transition-colors">
                    <button
                      onClick={() => {
                        trackCardClick("blog", post.slug, "blog_list_title");
                        onNavigate("blog-detail", post.slug);
                      }}
                      className="text-left font-bold text-neutral-900 hover:text-sky-800 focus:outline-none"
                    >
                      {post.title}
                    </button>
                  </h2>
                  <p className="text-neutral-700 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-300 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.published_date}</span>
                  </span>
                  <button
                    id={`read-article-btn-${post.slug}`}
                    onClick={() => {
                      trackCardClick("blog", post.slug, "blog_list_button");
                      onNavigate("blog-detail", post.slug);
                    }}
                    className="inline-flex items-center gap-1 text-sky-800 hover:text-sky-950 font-semibold text-sm group"
                    aria-label={`Baca artikel lengkap: ${post.title}`}
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180 transition-transform group-hover:translate-x-1" />
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
