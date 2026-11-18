import type { Metadata } from "next";
import { ContactView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "احجزي استشارة تغذية في العيادة أو أونلاين عبر واتساب مع د. رشا علي عبدالرحمن.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "تواصل معنا", description: "احجزي استشارة تغذية في العيادة أو أونلاين عبر واتساب مع د. رشا علي عبدالرحمن." },
};

export default function Page() {
  return <ContactView />;
}
