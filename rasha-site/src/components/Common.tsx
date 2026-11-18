"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  ChevronDown,
  ClipboardList,
  Laptop,
  Play,
  RefreshCw,
  Star,
  Stethoscope,
  Video,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Particles, Reveal, SplitText } from "./Motion";
import { WaButton } from "./WaButton";
import { BookButton } from "./BookButton";
import { FacebookIcon, YouTubeIcon, WhatsAppIcon } from "./icons";
import { useContent } from "./ContentProvider";
import { WA_MESSAGES, courseMessage, serviceMessage, programMessage, waUrl } from "@/lib/whatsapp";
import { embedUrl, thumbUrl } from "@/lib/video";
import type { Course, Faq, Program, Service, Testimonial, VideoItem } from "@/lib/site-data";

/* ---------- عناصر أساسية ---------- */

export function PageHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-brand-soft to-paper pt-32 pb-14 md:pt-40 md:pb-20">
      <Particles count={8} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="text-4xl font-extrabold leading-tight text-brand-dark md:text-5xl">
          <SplitText text={title} />
        </h1>
        {text && (
          <Reveal delay={0.2}>
            <p className="lead">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <h2 className="h2">
        <SplitText text={title} />
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className={`lead ${center ? "mx-auto" : ""}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}

/** صورة بديلة أنيقة قابلة للاستبدال */
export function Media({ src, label, className = "", tone = "green" }: { src?: string; label: string; className?: string; tone?: "green" | "sun" | "coral" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  const bg = { green: "from-brand to-brand-dark", sun: "from-sun to-lime", coral: "from-coral to-sun" }[tone];
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${bg} ${className}`} role="img" aria-label={label}>
      <svg viewBox="0 0 100 100" className="absolute -bottom-6 -left-6 h-40 w-40 text-white/15" fill="currentColor" aria-hidden>
        <path d="M10 90C8 50 30 12 90 10c2 50-26 78-72 80z" />
      </svg>
      <span className="relative px-6 text-center text-sm font-bold text-white/90">{label}</span>
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className={i < n ? "fill-sun text-sun" : "text-ink/20"} />
      ))}
    </div>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-sm leading-7 text-ink/75">
          <Check size={17} className="mt-1.5 shrink-0 text-brand" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Empty({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return (
    <div className="card mx-auto max-w-xl text-center">
      <h3 className="text-xl font-extrabold text-brand-dark">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-ink/65">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

/* ---------- الخدمات ---------- */

const ICONS = { stethoscope: Stethoscope, video: Video, refresh: RefreshCw, clipboard: ClipboardList, book: BookOpen };

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  const Icon = ICONS[s.icon] ?? Stethoscope;
  return (
    <Reveal delay={i * 0.07}>
      <article className="card card-hover flex h-full flex-col">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <Icon size={26} />
        </span>
        <h3 className="text-lg font-extrabold text-ink">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-7 text-ink/65">{s.short}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href={`/services#${s.category}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5 transition-all">
            اعرفي المزيد <ArrowLeft size={16} />
          </Link>
          <WaButton message={serviceMessage(s.title)} variant="outline" className="!px-4 !py-2 text-xs">
            استفسار
          </WaButton>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- اختيار نوع الاستشارة ---------- */

export function ConsultChoice() {
  const { content } = useContent();
  const av = content.settings.availability;
  const cards = [
    {
      icon: Building2,
      title: "الاستشارات داخل العيادة",
      desc: "احجزي موعدك لمقابلة د. رشا شخصيًا والحصول على التوجيه الغذائي المناسب لاحتياجاتك.",
      points: ["إمكانية طلب موعد لزيارة العيادة", "معرفة العنوان والمواعيد من خلال التواصل", "التواصل عبر واتساب لتأكيد الحجز"],
      cta: "احجزي زيارة في العيادة",
      msg: WA_MESSAGES.clinic,
      note: av.clinic ? "" : "تواصلي معنا لمعرفة المواعيد المتاحة حاليًا.",
      tone: "bg-white",
    },
    {
      icon: Laptop,
      title: "الاستشارات أونلاين",
      desc: "احصلي على التوجيه الغذائي والمتابعة من خلال الاستشارات أونلاين، أينما كنتِ.",
      points: ["استشارة عن بُعد", "إمكانية الاستفسار عن تفاصيل المتابعة", "التواصل عبر واتساب لتأكيد الحجز"],
      cta: "احجزي استشارة أونلاين",
      msg: WA_MESSAGES.online,
      note: av.online ? "" : "تواصلي معنا لمعرفة المواعيد المتاحة حاليًا.",
      tone: "bg-white",
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.12}>
          <div className="card card-hover relative flex h-full flex-col overflow-hidden border-brand/20">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-lime/20" aria-hidden />
            <span className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
              <c.icon size={26} />
            </span>
            <h3 className="relative text-2xl font-extrabold text-brand-dark">{c.title}</h3>
            <p className="relative mt-3 text-sm leading-7 text-ink/65">{c.desc}</p>
            <CheckList items={c.points} className="relative mt-5 flex-1" />
            {c.note && <p className="mt-3 text-xs text-coral">{c.note}</p>}
            <WaButton message={c.msg} className="relative mt-7 w-full">
              {c.cta}
            </WaButton>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- الكورسات ---------- */

export function CourseCard({ c, i = 0 }: { c: Course; i?: number }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="card card-hover flex h-full flex-col overflow-hidden !p-0">
        <div className="aspect-[16/10]">
          <Media src={c.image} label={`غلاف كورس ${c.title}`} />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-xl font-extrabold text-brand-dark">{c.title}</h3>
          <p className="mt-1 text-sm font-semibold text-brand">{c.tagline}</p>
          <p className="mt-3 text-sm leading-7 text-ink/65">{c.description}</p>
          <CheckList items={c.objectives.slice(0, 3)} className="mt-4 flex-1" />
          <p className="mt-4 text-sm font-bold text-ink">{c.price ? `السعر: ${c.price}` : "السعر يُرسل عبر واتساب"}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/courses/${c.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-brand/30 px-5 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-soft"
            >
              تفاصيل الكورس
            </Link>
            <WaButton message={courseMessage(c.title)}>اشترك عبر واتساب</WaButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- الفيديوهات ---------- */

export function VideoCard({ v, i = 0 }: { v: VideoItem; i?: number }) {
  const [playing, setPlaying] = useState(false);
  const emb = embedUrl(v);
  const thumb = thumbUrl(v);
  const PIcon = v.platform === "youtube" ? YouTubeIcon : FacebookIcon;
  return (
    <Reveal delay={i * 0.07}>
      <article className="card card-hover flex h-full flex-col overflow-hidden !p-0">
        <div className="relative aspect-video bg-ink/5">
          {playing && emb ? (
            <iframe
              src={emb}
              title={v.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <>
              <Media src={thumb} label={v.title} tone={v.platform === "youtube" ? "coral" : "green"} />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-dark shadow">
                <PIcon width={18} height={18} />
              </span>
              {emb && (
                <button
                  onClick={() => setPlaying(true)}
                  aria-label={`تشغيل: ${v.title}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/25"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand shadow-lg">
                    <Play size={26} className="fill-brand" />
                  </span>
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          {v.category && <span className="mb-2 text-xs font-bold text-brand">{v.category}</span>}
          <h3 className="font-extrabold leading-7 text-ink">{v.title}</h3>
          <p className="mt-1 flex-1 text-sm leading-7 text-ink/60">{v.description}</p>
          {v.url ? (
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">
              <PIcon width={16} height={16} /> شاهد الفيديو
            </a>
          ) : (
            <span className="mt-4 text-xs text-ink/45">سيتم إضافة الفيديو قريبًا</span>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- آراء العملاء ---------- */

export function publicTestimonials(list: Testimonial[]) {
  return list.filter((t) => t.published && !t.isDemo && t.permissionObtained);
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  const name = t.anonymous ? "عميلة (اسم غير معلن)" : t.name;
  return (
    <figure className="card flex h-full flex-col border-t-4 border-t-brand">
      <Stars n={t.rating} />
      <blockquote className="mt-4 flex-1 text-base leading-8 text-ink/80">“{t.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {t.photo && !t.anonymous ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.photo} alt={name} className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft font-bold text-brand">{name.charAt(0)}</span>
        )}
        <span>
          <span className="block text-sm font-bold">{name}</span>
          {t.date && <span className="block text-xs text-ink/50">{t.date}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const perView = 1;
  const n = items.length;
  const go = (d: number) => setIdx((p) => (p + d + n) % n);
  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div key={items[idx].id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <TestimonialCard t={items[idx]} />
          </motion.div>
        </AnimatePresence>
      </div>
      {n > perView && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={() => go(1)} aria-label="التالي" className="rounded-full border border-brand/30 p-3 text-brand transition hover:bg-brand hover:text-white">
            <ArrowLeft size={18} className="rotate-180" />
          </button>
          <div className="flex gap-2">
            {items.map((t, i) => (
              <button key={t.id} onClick={() => setIdx(i)} aria-label={`رأي ${i + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-brand" : "w-2 bg-brand/25"}`} />
            ))}
          </div>
          <button onClick={() => go(-1)} aria-label="السابق" className="rounded-full border border-brand/30 p-3 text-brand transition hover:bg-brand hover:text-white">
            <ArrowLeft size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export function CareSection() {
  return (
    <div className="card mx-auto max-w-3xl text-center">
      <h3 className="text-2xl font-extrabold text-brand-dark">نهتم بتجربتك من أول استشارة</h3>
      <p className="mt-3 text-sm leading-8 text-ink/65">
        نحرص على أن تكون تجربتك واضحة ومنظمة من أول تواصل، سواء اخترتِ زيارة العيادة أو الاستشارة أونلاين. آراء العملاء الحقيقية ستظهر هنا بعد الحصول على موافقتهم.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <BookButton>احجزي استشارتك</BookButton>
        <WaButton message={WA_MESSAGES.general} variant="outline">
          لديكِ استفسار؟
        </WaButton>
      </div>
    </div>
  );
}

/* ---------- الأسئلة الشائعة ---------- */

export function FaqAccordion({ items }: { items: { id?: string; q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.id ?? f.q} className={`rounded-2xl border bg-white transition ${isOpen ? "border-brand/40 shadow-soft" : "border-brand/10"}`}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right font-bold text-ink"
              >
                {f.q}
                <ChevronDown size={20} className={`shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-8 text-ink/70">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-brand-dark text-white">
      <Particles count={10} />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
        <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
          <SplitText text="خطوتك الأولى نحو عادات صحية تبدأ هنا" />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
            سواء كنتِ تفضلين زيارة العيادة أو الاستشارة أونلاين، تواصلي مع د. رشا لمعرفة التفاصيل والمواعيد المتاحة.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookButton variant="light">احجزي استشارتك</BookButton>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <a href={waUrl(WA_MESSAGES.clinic)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-bold transition hover:bg-white/10">
              <Building2 size={16} /> حجز في العيادة
            </a>
            <a href={waUrl(WA_MESSAGES.online)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-bold transition hover:bg-white/10">
              <Laptop size={16} /> حجز أونلاين
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProgramCard({ p, i = 0 }: { p: Program; i?: number }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="card card-hover flex h-full flex-col overflow-hidden !p-0">
        <div className="aspect-[16/10]">
          <Media src={p.image} label={p.title} tone="sun" />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-xl font-extrabold text-brand-dark">{p.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink/65">{p.description}</p>
          <h4 className="mt-5 text-sm font-bold">أهداف البرنامج</h4>
          <CheckList items={p.objectives} className="mt-2 flex-1" />
          <p className="mt-4 text-sm font-bold">{p.price ? `السعر: ${p.price}` : "السعر والتفاصيل تُؤكَّد عبر واتساب"}</p>
          <WaButton message={programMessage(p.title)} className="mt-4 w-full">
            استفسري عن البرنامج
          </WaButton>
        </div>
      </article>
    </Reveal>
  );
}

export { WhatsAppIcon };
export type { Faq };
