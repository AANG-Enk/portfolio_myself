import React from "react";
import { Head as SSGHead } from "vite-react-ssg";

interface HeadProps {
  title: string;
  description: string;
  path?: string;
}

const SITE_NAME = "Farhan Mohaemin Saparidja";
const SITE_URL = "https://farhanmohaemin.dev";

export default function Head({ title, description, path = "" }: HeadProps) {
  const formattedTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Senior Frontend Engineer & Accessibility Specialist",
    description:
      "Spesialis Next.js, React, TypeScript, dan Tailwind CSS yang mengutamakan aksesibilitas (WCAG 2.1 AA), performa, dan kenyamanan pengguna.",
    url: SITE_URL,
  };

  return (
    <SSGHead>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </SSGHead>
  );
}
