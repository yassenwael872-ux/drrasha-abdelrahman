import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = {
  title: { absolute: "د. رشا علي عبدالرحمن | أخصائي الصحة العامة والتغذية العلاجية" },
  description:
    "استشارات تغذية في العيادة وأونلاين مع د. رشا علي عبدالرحمن، متابعة غذائية، وكورس «خس من غير حرمان». احجزي استشارتك عبر واتساب.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeView />;
}
