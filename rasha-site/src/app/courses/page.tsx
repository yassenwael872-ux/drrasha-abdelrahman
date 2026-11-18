import type { Metadata } from "next";
import { CoursesView } from "@/components/PageViews";

export const metadata: Metadata = {
  title: "كورسات التغذية",
  description: "كورسات التغذية أونلاين مع د. رشا، ومنها كورس خس من غير حرمان. الاشتراك عبر واتساب.",
  alternates: { canonical: "/courses" },
  openGraph: { title: "كورسات التغذية", description: "كورسات التغذية أونلاين مع د. رشا، ومنها كورس خس من غير حرمان. الاشتراك عبر واتساب." },
};

export default function Page() {
  return <CoursesView />;
}
