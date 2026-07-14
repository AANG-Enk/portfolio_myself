import fs from "fs";
import path from "path";

// 1. Tentukan path file data sumber dan file sitemap target
const dataPath = path.join(process.cwd(), "src", "data.ts");
const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

try {
  console.log("[SEO] Memulai pembuatan sitemap.xml secara dinamis...");
  
  // Baca file data.ts
  const dataContent = fs.readFileSync(dataPath, "utf-8");

  // 2. Fungsi pembantu (helper) untuk mengekstrak slugs berdasarkan nama variabel array di TypeScript
  function extractSlugs(fileContent, arrayName) {
    const regex = new RegExp(`export const ${arrayName}[\\s\\S]*?= \\[([\\s\\S]*?)\\];`, "m");
    const match = fileContent.match(regex);
    if (!match) {
      console.warn(`[SEO] Peringatan: Tidak dapat menemukan array ${arrayName} di data.ts`);
      return [];
    }
    const arrayContent = match[1];
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const slugs = [];
    let slugMatch;
    while ((slugMatch = slugRegex.exec(arrayContent)) !== null) {
      slugs.push(slugMatch[1]);
    }
    return slugs;
  }

  // 3. Ekstrak slug secara real-time dari berkas kode sumber
  const projectSlugs = extractSlugs(dataContent, "projectsData");
  const studyCaseSlugs = extractSlugs(dataContent, "studyCasesData");
  const blogSlugs = extractSlugs(dataContent, "blogPostsData");

  console.log(`[SEO] Berhasil menemukan: ${projectSlugs.length} Proyek, ${studyCaseSlugs.length} Studi Kasus, dan ${blogSlugs.length} Artikel Blog.`);

  // 4. Bangun konten XML
  const today = new Date().toISOString().split("T")[0];
  const baseUrl = "https://farhanmohaemin.dev";

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Halaman Utama Utama -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/study-case</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Proyek Detail (Dinamis) -->`;

  projectSlugs.forEach((slug) => {
    xmlContent += `
  <url>
    <loc>${baseUrl}/projects/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xmlContent += `\n\n  <!-- Studi Kasus Detail (Dinamis) -->`;
  studyCaseSlugs.forEach((slug) => {
    xmlContent += `
  <url>
    <loc>${baseUrl}/study-case/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xmlContent += `\n\n  <!-- Blog Detail (Dinamis) -->`;
  blogSlugs.forEach((slug) => {
    xmlContent += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xmlContent += `\n</urlset>\n`;

  // 5. Tulis sitemap.xml baru ke direktori public
  fs.writeFileSync(sitemapPath, xmlContent, "utf-8");
  console.log("[SEO] Sukses menulis file sitemap.xml baru di folder public!");
} catch (error) {
  console.error("[SEO] Kesalahan saat memproses sitemap:", error);
}
