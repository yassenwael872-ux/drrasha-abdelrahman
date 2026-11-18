import type { Metadata } from "next";
import { ServicesView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "الخدمات",
  description: "استشارات تغذية في العيادة وأونلاين، متابعة غذائية، برامج غذائية وتوعية مع د. رشا علي عبدالرحمن.",
  alternates: { canonical: "/services" },
  openGraph: { title: "الخدمات", description: "استشارات تغذية في العيادة وأونلاين، متابعة غذائية، برامج غذائية وتوعية مع د. رشا علي عبدالرحمن." },
};

export default function Page() {
  return <ServicesView />;
}
