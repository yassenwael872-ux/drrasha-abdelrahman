import type { Metadata } from "next";
import { VideosView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "الفيديوهات",
  description: "فيديوهات تعليمية في التغذية من يوتيوب وفيسبوك مع د. رشا علي عبدالرحمن.",
  alternates: { canonical: "/videos" },
  openGraph: { title: "الفيديوهات", description: "فيديوهات تعليمية في التغذية من يوتيوب وفيسبوك مع د. رشا علي عبدالرحمن." },
};

export default function Page() {
  return <VideosView />;
}
