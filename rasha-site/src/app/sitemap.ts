import type { MetadataRoute } from "next";
import { defaultContent } from "@/lib/site-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/programs", "/courses", "/videos", "/testimonials", "/contact", "/faq"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...defaultContent.courses.map((c) => ({ url: `${BASE}/courses/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
