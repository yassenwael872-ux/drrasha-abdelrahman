import type { Metadata } from "next";
import { FaqView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات عن أسئلة الحجز والاستشارات والكورسات مع د. رشا علي عبدالرحمن.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "الأسئلة الشائعة", description: "إجابات عن أسئلة الحجز والاستشارات والكورسات مع د. رشا علي عبدالرحمن." },
};

export default function Page() {
  return <FaqView />;
}
