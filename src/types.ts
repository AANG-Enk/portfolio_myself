export interface SocialMedia {
  platform: string;
  label?: string;
  username: string;
  url: string;
}

export interface Profile {
  full_name: string;
  profile_photo: string;
  tagline: string;
  bio: string;
  email: string;
  whatsapp_number: string;
  social_media: SocialMedia[];
}

export interface SiteSettings {
  availability_status: "open" | "selective" | "closed";
  availability_note?: string;
}

export interface Project {
  title: string;
  slug: string;
  short_description: string;
  cover_image: string;
  tags: string[];
  role: string;
  problem_statement: string;
  process: string;
  result: string;
  gallery_images: string[];
  live_url?: string;
  repo_url?: string;
  featured: boolean;
  date: string;
}

export interface StudyCase {
  title: string;
  slug: string;
  context: string;
  problem_statement: string;
  constraints: string;
  tech_stack: string[];
  result: string;
  lesson_learned: string;
  gallery_images: string[];
  featured: boolean;
  date: string;
  content: string; // Long narrative of process & execution
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  category: string;
  tags: string[];
  published_date: string;
  reading_time: string;
  author: string;
  content: string;
}

export interface WorkExperience {
  company_name: string;
  role: string;
  start_date: string;
  end_date: string; // "Present" if still working
  description: string;
  key_achievements: string[];
  tech_stack_used: string[];
  company_logo?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  photo?: string;
  testimonial_text: string;
  rating?: number;
  featured: boolean;
  date: string;
}

export interface Partner {
  name: string;
  logo?: string;
  website_url?: string;
  type: "client" | "partner" | "collaborator";
  description?: string;
  featured: boolean;
}
