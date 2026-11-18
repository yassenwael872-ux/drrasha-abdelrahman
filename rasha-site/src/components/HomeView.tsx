"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, BadgeCheck, ArrowLeft } from "lucide-react";
import { useContent } from "./ContentProvider";
import { BookButton } from "./BookButton";
import { WaButton } from "./WaButton";
import { NavDots, Particles, Parallax, Reveal, SplitText } from "./Motion";
import {
  CareSection,
  CheckList,
  ConsultChoice,
  FaqAccordion,
  FinalCta,
  Media,
  SectionTitle,
  ServiceCard,
  TestimonialCarousel,
  VideoCard,
  publicTestimonials,
} from "./Common";
import { courseMessage } from "@/lib/whatsapp";

const SECTIONS = [
  { id: "hero", label: "الرئيسية" },
  { id: "qualifications", label: "المؤهلات" },
  { id: "about", label: "تعرف على د. رشا" },
  { id: "services", label: "الخدمات" },
  { id: "consult", label: "طريقة الاستشارة" },
  { id: "course", label: "الكورس" },
  { id: "videos", label: "الفيديوهات" },
  { id: "steps", label: "ابدأ رحلتك" },
  { id: "testimonials", label: "آراء العملاء" },
  { id: "faq", label: "الأسئلة الشائعة" },
];

export function HomeView() {
  const { content } = useContent();
  const s = content.settings;
  const services = content.services.filter((x) => x.published);
  const course = content.courses.find((c) => c.published && c.featured) ?? content.courses.find((c) => c.published);
  const videos = content.videos.filter((v) => v.published).slice(0, 3);
  const reviews = publicTestimonials(content.testimonials);
  const faqs = content.faqs.filter((f) => f.published);
  const quals = [GraduationCap, Award, BadgeCheck];

  return (
    <>
      <NavDots sections={SECTIONS} />

      {/* 1. HERO */}
      <section id="hero" className="grain relative overflow-hidden bg-gradient-to-b from-brand-soft via-paper to-paper pt-28 md:pt-32">
        <Particles count={16} />
        <Parallax speed={50} className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-lime/25 blur-3xl">
          <span />
        </Parallax>
        <Parallax speed={90} className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-sun/20 blur-3xl">
          <span />
        </Parallax>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 sm:px-6 md:min-h-[88vh] md:grid-cols-2 md:pb-24">
          <div>
            <Reveal>
              <span className="eyebrow">{s.title}</span>
            </Reveal>
            <h1 className="text-4xl font-extrabold leading-[1.35] text-brand-dark sm:text-5xl lg:text-6xl">
              <SplitText text={s.hero.headline} />
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-xl text-base leading-9 text-ink/70 md:text-lg">{s.hero.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <BookButton className="!px-8 !py-4 text-base">احجز استشارتك</BookButton>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-7 py-4 text-base font-bold text-brand-dark transition hover:-translate-y-0.5 hover:bg-brand-soft"
                >
                  اكتشف الكورسات <ArrowLeft size={18} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-brand to-lime/70 opacity-90" aria-hidden />
              <div className="glass absolute inset-3 overflow-hidden rounded-[2.2rem] shadow-soft">
                {s.portrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.portrait} alt={s.doctorName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 bg-white/60 p-8 text-center">
                    <Image src="/images/logo.png" alt="شعار د. رشا عبدالرحمن" width={320} height={256} className="w-3/4" priority />
                    <p className="text-xs text-ink/45">مساحة مخصصة لصورة الدكتورة – تُضاف من لوحة التحكم</p>
                  </div>
                )}
              </div>
              <span className="sway absolute -right-4 top-10 h-12 w-12 rounded-[60%_0_60%_0] bg-lime" aria-hidden />
              <span className="sway absolute -left-3 bottom-16 h-9 w-9 rounded-[60%_0_60%_0] bg-sun" aria-hidden />
              <span className="absolute -bottom-3 right-10 h-6 w-6 rounded-full bg-coral" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. QUALIFICATIONS */}
      <section id="qualifications" className="section !py-14 md:!py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {s.qualifications.map((q, i) => {
            const Icon = quals[i % quals.length];
            return (
              <Reveal key={q} delay={i * 0.1}>
                <div className="card card-hover flex h-full items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon size={22} />
                  </span>
                  <p className="pt-1 text-base font-bold leading-8 text-ink">{q}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section id="about" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-brand-soft">
            {s.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.portrait} alt={s.doctorName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-10">
                <Image src="/images/logo.png" alt="" width={360} height={288} className="w-full" />
              </div>
            )}
          </div>
        </Reveal>
        <div>
          <SectionTitle eyebrow="عن الدكتورة" title="تعرف على د. رشا" />
          <Reveal delay={0.2}>
            <div className="mt-5 space-y-4 text-base leading-9 text-ink/70">
              {s.about.preview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark">
              اعرف المزيد <ArrowLeft size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="services" className="bg-white">
        <div className="section">
          <SectionTitle eyebrow="خدماتنا" title="خدمات تناسب احتياجك" text="تفاصيل الخدمات والأسعار تُؤكَّد معك مباشرة عبر واتساب." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((sv, i) => (
              <ServiceCard key={sv.id} s={sv} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLINIC & ONLINE */}
      <section id="consult" className="section">
        <SectionTitle center eyebrow="طرق الاستشارة" title="اختاري الطريقة المناسبة ليكي" text="سواء كنتِ تفضلين زيارة العيادة أو الحصول على استشارتك أونلاين، يمكنك التواصل مع د. رشا لمعرفة التفاصيل والمواعيد المتاحة." />
        <div className="mt-12">
          <ConsultChoice />
        </div>
      </section>

      {/* 6. FEATURED COURSE */}
      {course && (
        <section id="course" className="grain relative overflow-hidden bg-brand-dark text-white">
          <Particles count={8} />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
            <Reveal>
              <div className="aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20">
                <Media src={course.image} label={`غلاف كورس ${course.title}`} tone="sun" />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <span className="mb-3 inline-flex rounded-full bg-lime px-4 py-1.5 text-xs font-extrabold text-brand-dark">الكورس المميز</span>
              </Reveal>
              <h2 className="text-4xl font-extrabold md:text-5xl">
                <SplitText text={course.title} />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-4 text-lg font-semibold text-lime">{course.tagline}</p>
                <p className="mt-4 text-base leading-8 text-white/75">{course.description}</p>
                <h3 className="mt-6 font-bold">ماذا ستتعلمين؟</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {course.learn.map((l) => (
                    <li key={l} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-white/70">{course.price ? `السعر: ${course.price}` : "السعر يُرسل عبر واتساب عند التواصل"}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <WaButton message={courseMessage(course.title)} variant="light">
                    اشترك في الكورس عبر واتساب
                  </WaButton>
                  <Link href={`/courses/${course.slug}`} className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold transition hover:bg-white/10">
                    تفاصيل الكورس
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* 7. VIDEOS */}
      <section id="videos" className="section">
        <SectionTitle eyebrow="محتوى تعليمي" title="اتعلم مع د. رشا" text="فيديوهات تعليمية من صفحات د. رشا الرسمية." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <VideoCard key={v.id} v={v} i={i} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/videos" className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-7 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-soft">
            شاهد كل الفيديوهات <ArrowLeft size={16} />
          </Link>
        </Reveal>
      </section>

      {/* 8. HOW IT WORKS */}
      <section id="steps" className="bg-white">
        <div className="section">
          <SectionTitle center eyebrow="خطوات بسيطة" title="ابدأ رحلتك بسهولة" />
          <div className="relative mt-14 grid gap-6 md:grid-cols-4">
            <div className="absolute inset-x-[12%] top-8 hidden h-0.5 bg-gradient-to-l from-brand/10 via-brand/40 to-brand/10 md:block" aria-hidden />
            {[
              "اختاري الخدمة المناسبة ليكي.",
              "حددي إذا كنتِ تفضلين العيادة أو الاستشارة أونلاين.",
              "تواصلي مع الدكتورة عبر واتساب لمعرفة التفاصيل وتأكيد الموعد.",
              "ابدئي رحلتك.",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 0.12}>
                <div className="relative text-center">
                  <span className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-extrabold text-white shadow-soft ring-8 ring-white">
                    {i + 1}
                  </span>
                  <p className="text-sm font-bold leading-8 text-ink/80">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section id="testimonials" className="section">
        {reviews.length > 0 ? (
          <>
            <SectionTitle center eyebrow="آراء العملاء" title="تجارب وآراء العملاء" text="تعرف على تجارب الأشخاص مع خدمات ومحتوى د. رشا." />
            <div className="mt-12">
              <TestimonialCarousel items={reviews} />
            </div>
          </>
        ) : (
          <CareSection />
        )}
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="bg-white">
        <div className="section">
          <SectionTitle center eyebrow="أسئلة شائعة" title="الأسئلة الشائعة" />
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <FinalCta />
    </>
  );
}

export { CheckList };
