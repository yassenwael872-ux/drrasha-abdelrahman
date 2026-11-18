import type { Metadata } from "next";
import { ProgramsView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "البرامج الغذائية",
  description: "البرامج الغذائية مع د. رشا علي عبدالرحمن. استفسري عن التفاصيل عبر واتساب.",
  alternates: { canonical: "/programs" },
  openGraph: { title: "البرامج الغذائية", description: "البرامج الغذائية مع د. رشا علي عبدالرحمن. استفسري عن التفاصيل عبر واتساب." },
};

export default function Page() {
  return <ProgramsView />;
}
