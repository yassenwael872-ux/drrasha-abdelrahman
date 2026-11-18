"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ContentProvider, useContent } from "./ContentProvider";
import { BookingProvider } from "./BookingProvider";
import { BookButton } from "./BookButton";
import { ProgressBar } from "./Motion";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "./icons";
import { WA_MESSAGES, waUrl } from "@/lib/whatsapp";

export const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الدكتورة" },
  { href: "/services", label: "الخدمات" },
  { href: "/programs", label: "البرامج الغذائية" },
  { href: "/courses", label: "الكورسات" },
  { href: "/videos", label: "الفيديوهات" },
  { href: "/testimonials", label: "آراء العملاء" },
  { href: "/contact", label: "تواصل معنا" },
];

function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (h: string) => (h === "/" ? pathname === "/" : pathname.startsWith(h));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="د. رشا علي عبدالرحمن – الرئيسية">
          <Image src="/images/logo.png" alt="شعار د. رشا عبدالرحمن" width={150} height={120} className="h-14 w-auto" priority />
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`relative rounded-full px-3 py-2 text-[13.5px] font-semibold transition ${
                isActive(n.href) ? "text-brand" : "text-ink/75 hover:text-brand"
              }`}
            >
              {n.label}
              {isActive(n.href) && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-brand" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <BookButton className="hidden !px-5 !py-2.5 sm:inline-flex">احجز استشارتك</BookButton>
          <button
            className="rounded-full p-2.5 text-ink lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="فتح القائمة"
            aria-expanded={open}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[80] flex w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label="القائمة"
            >
              <div className="flex items-center justify-between">
                <Image src="/images/logo.png" alt="" width={120} height={96} className="h-12 w-auto" />
                <button onClick={() => setOpen(false)} aria-label="إغلاق القائمة" className="rounded-full p-2 hover:bg-paper">
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
                {NAV.map((n, i) => (
                  <motion.div key={n.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.04 }}>
                    <Link
                      href={n.href}
                      className={`block rounded-xl px-4 py-3 text-base font-bold ${
                        isActive(n.href) ? "bg-brand-soft text-brand" : "text-ink hover:bg-paper"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div onClick={() => setOpen(false)}>
                <BookButton className="w-full">احجز استشارتك</BookButton>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const { content } = useContent();
  const s = content.settings;
  const socials = [
    { url: s.facebook, label: "فيسبوك", Icon: FacebookIcon },
    { url: s.instagram, label: "إنستجرام", Icon: InstagramIcon },
    { url: s.youtube, label: "يوتيوب", Icon: YouTubeIcon },
  ].filter((x) => x.url);
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-extrabold">{s.doctorName}</h3>
          <p className="mt-2 text-sm text-white/70">{s.title}</p>
          <p className="mt-4 text-sm leading-7 text-white/60">استشارات داخل العيادة وأونلاين، متابعة غذائية، وكورسات تثقيفية.</p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-lime">روابط سريعة</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {[...NAV, { href: "/faq", label: "الأسئلة الشائعة" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/75 transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-lime">تواصلي معنا</h4>
          <a
            href={waUrl(WA_MESSAGES.general, s.whatsappIntl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20"
          >
            <WhatsAppIcon /> واتساب: <span dir="ltr">{s.whatsappLocal}</span>
          </a>
          <div className="mt-5 flex gap-3">
            {socials.map(({ url, label, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-lime hover:text-brand-dark"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {s.doctorName}. جميع الحقوق محفوظة.
        <span className="mx-2">•</span>
        المحتوى تثقيفي ولا يغني عن الاستشارة الطبية الفردية.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const { content } = useContent();
  return (
    <motion.a
      href={waUrl(WA_MESSAGES.general, content.settings.whatsappIntl)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.08 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <WhatsAppIcon width={28} height={28} className="relative" />
    </motion.a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <ContentProvider>{children}</ContentProvider>;
  }
  return (
    <ContentProvider>
      <BookingProvider>
        <ProgressBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </BookingProvider>
    </ContentProvider>
  );
}
