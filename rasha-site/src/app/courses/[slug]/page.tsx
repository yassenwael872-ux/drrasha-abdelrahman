import type { Metadata } from "next";
import { CourseDetailsView } from "@/components/PageViews";
import { defaultContent } from "@/lib/site-data";

export const dynamicParams = true;

export function generateStaticParams() {
  return defaultContent.courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = defaultContent.courses.find((x) => x.slug === slug);
  const title = c ? `كورس ${c.title}` : "تفاصيل الكورس";
  const description = c ? `${c.tagline} ${c.description}` : "تفاصيل الكورس مع د. رشا علي عبدالرحمن.";
  return { title, description, alternates: { canonical: `/courses/${slug}` }, openGraph: { title, description } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CourseDetailsView slug={slug} />;
}
