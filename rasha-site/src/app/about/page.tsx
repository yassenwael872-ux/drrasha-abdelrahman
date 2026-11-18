import type { Metadata } from "next";
import { AboutView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "عن الدكتورة",
  description: "تعرفي على د. رشا علي عبدالرحمن، أخصائي الصحة العامة والتغذية العلاجية، مؤهلاتها وفلسفتها في التغذية.",
  alternates: { canonical: "/about" },
  openGraph: { title: "عن الدكتورة", description: "تعرفي على د. رشا علي عبدالرحمن، أخصائي الصحة العامة والتغذية العلاجية، مؤهلاتها وفلسفتها في التغذية." },
};

export default function Page() {
  return <AboutView />;
}
