import type { Metadata } from "next";
import { TestimonialsView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "آراء العملاء",
  description: "تجارب وآراء العملاء مع خدمات ومحتوى د. رشا علي عبدالرحمن.",
  alternates: { canonical: "/testimonials" },
  openGraph: { title: "آراء العملاء", description: "تجارب وآراء العملاء مع خدمات ومحتوى د. رشا علي عبدالرحمن." },
};

export default function Page() {
  return <TestimonialsView />;
}
