import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { projectsData, studyCasesData, blogPostsData } from './src/data';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    ssgOptions: {
      includedRoutes(paths) {
        // Buang template ":slug" generik, ganti dengan slug asli dari data.ts
        // supaya tiap Project/Study Case/Blog Post dapat file HTML statis sendiri.
        const staticPaths = paths.filter((p) => !p.includes(':slug'));
        const projectPaths = projectsData.map((p) => `/projects/${p.slug}`);
        const studyCasePaths = studyCasesData.map((s) => `/study-case/${s.slug}`);
        const blogPaths = blogPostsData.map((b) => `/blog/${b.slug}`);
        return [...staticPaths, ...projectPaths, ...studyCasePaths, ...blogPaths, "/404"];
      },
    },
  };
});
