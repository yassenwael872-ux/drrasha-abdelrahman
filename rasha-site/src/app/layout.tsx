import type { Metadata, Viewport } from "next";
import "@fontsource-variable/cairo/index.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";


export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "د. رشا علي عبدالرحمن | أخصائي الصحة العامة والتغذية العلاجية",
    template: "%s | د. رشا علي عبدالرحمن",
  },
  description:
    "د. رشا علي عبدالرحمن، أخصائي الصحة العامة والتغذية العلاجية. استشارات تغذية في العيادة وأونلاين، متابعة غذائية، وكورس «خس من غير حرمان». احجزي استشارتك عبر واتساب.",
  keywords: [
    "د. رشا علي عبدالرحمن",
    "التغذية العلاجية",
    "أخصائي التغذية العلاجية",
    "استشارات تغذية أونلاين",
    "استشارات تغذية في العيادة",
    "الصحة العامة",
    "خس من غير حرمان",
    "كورسات التغذية",
    "حجز استشارة تغذية",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "د. رشا علي عبدالرحمن",
    title: "د. رشا علي عبدالرحمن | أخصائي الصحة العامة والتغذية العلاجية",
    description: "استشارات تغذية داخل العيادة وأونلاين، متابعة غذائية وكورسات تثقيفية.",
    images: [{ url: "/images/logo.png", width: 1400, height: 1120, alt: "شعار د. رشا عبدالرحمن" }],
  },
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = { themeColor: "#008C53", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          تخطي إلى المحتوى
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
