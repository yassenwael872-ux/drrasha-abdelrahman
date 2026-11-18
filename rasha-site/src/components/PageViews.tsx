"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Clock, ExternalLink, Laptop, MapPin, Phone, Search } from "lucide-react";
import { useContent } from "./ContentProvider";
import { BookButton } from "./BookButton";
import { WaButton } from "./WaButton";
import { Reveal } from "./Motion";
import {
  CareSection,
  CheckList,
  ConsultChoice,
  Empty,
  FaqAccordion,
  FinalCta,
  Media,
  PageHeader,
  ProgramCard,
  CourseCard,
  SectionTitle,
  Stars,
  TestimonialCard,
  VideoCard,
  publicTestimonials,
} from "./Common";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "./icons";
import { WA_MESSAGES, courseMessage, programMessage, serviceMessage } from "@/lib/whatsapp";

/* ---------------- ABOUT ---------------- */
export function AboutView() {
  const { content } = useContent();
  const s = content.settings;
  return (
    <>
      <PageHeader eyebrow="عن الدكتورة" title={s.doctorName} text={s.title} />
      <section className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[2.5rem] bg-brand-soft">
            {s.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.portrait} alt={s.doctorName} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 p-10 text-center">
                <Image src="/images/logo.png" alt="شعار الدكتورة" width={360} height={288} className="w-full" />
                <p className="text-xs text-ink/45">مساحة مخصصة لصورة الدكتورة – تُضاف من لوحة التحكم</p>
              </div>
            )}
          </div>
        </Reveal>
        <div className="space-y-10">
          <Reveal>
            <h2 className="h2">المؤهلات العلمية</h2>
            <CheckList items={s.qualifications} className="mt-4 [&_li]:text-base" />
          </Reveal>
          <Reveal>
            <h2 className="h2">نبذة مهنية</h2>
            <div className="mt-4 space-y-4 leading-9 text-ink/70">{s.about.preview.map((p) => <p key={p}>{p}</p>)}</div>
          </Reveal>
          <Reveal>
            <h2 className="h2">فلسفتي في التغذية</h2>
            <p className="mt-4 leading-9 text-ink/70">{s.about.philosophy}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal>
              <div className="card h-full">
                <Building2 className="text-brand" />
                <h3 className="mt-3 text-lg font-extrabold">الاستشارة داخل العيادة</h3>
                <p className="mt-2 text-sm leading-8 text-ink/65">{s.about.clinicApproach}</p>
                <WaButton message={WA_MESSAGES.clinic} className="mt-4">احجزي زيارة في العيادة</WaButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card h-full">
                <Laptop className="text-brand" />
                <h3 className="mt-3 text-lg font-extrabold">الاستشارة أونلاين</h3>
                <p className="mt-2 text-sm leading-8 text-ink/65">{s.about.onlineApproach}</p>
                <WaButton message={WA_MESSAGES.online} className="mt-4">احجزي استشارة أونلاين</WaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

/* ---------------- SERVICES ---------------- */
const CAT_LABEL: Record<string, string> = {
  clinic: "أ. خدمات العيادة",
  online: "ب. الاستشارات أونلاين",
  followup: "ج. المتابعة الغذائية",
  programs: "د. البرامج الغذائية",
  education: "هـ. التوعية والتثقيف الغذائي",
};

export function ServicesView() {
  const { content } = useContent();
  const c = content.settings.clinic;
  const services = content.services.filter((x) => x.published);
  return (
    <>
      <PageHeader eyebrow="الخدمات" title="خدماتنا" text="تفاصيل الخدمات والأسعار تُؤكَّد مع الدكتورة عبر واتساب. المحتوى هنا إرشادي ولا يمثل تشخيصًا أو وعدًا بنتائج محددة." />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-14 sm:px-6">
        {services.map((s) => (
          <Reveal key={s.id}>
            <section id={s.category} className="card grid gap-8 md:grid-cols-[1fr_1.4fr]">
              <div>
                <span className="eyebrow">{CAT_LABEL[s.category]}</span>
                <h2 className="text-2xl font-extrabold text-brand-dark">{s.title}</h2>
                <p className="mt-3 text-sm leading-8 text-ink/65">{s.description}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <WaButton message={serviceMessage(s.title)}>استفسار عبر واتساب</WaButton>
                </div>
                {s.category === "clinic" && (
                  <div className="mt-6 rounded-2xl bg-brand-soft p-4 text-sm leading-8">
                    <p><b>العنوان:</b> {c.address || "تواصلي معنا لمعرفة عنوان العيادة ومواعيد الحجز."}</p>
                    <p><b>مواعيد العمل:</b> {[c.workingDays, c.workingHours].filter(Boolean).join(" – ") || "تواصلي معنا لمعرفة المواعيد."}</p>
                    <p><b>واتساب:</b> <span dir="ltr">{content.settings.whatsappLocal}</span></p>
                  </div>
                )}
                {s.category === "online" && (
                  <div className="mt-6 rounded-2xl bg-brand-soft p-4 text-sm leading-8">
                    <b>طريقة الحجز:</b> اضغطي على زر واتساب وسيتم إرسال التفاصيل والمواعيد المتاحة، ويتم تأكيد الموعد بعد التواصل مع الدكتورة.
                  </div>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <div><h3 className="mb-2 font-bold text-brand">الفوائد</h3><CheckList items={s.benefits} /></div>
                <div><h3 className="mb-2 font-bold text-brand">قد تناسب</h3><CheckList items={s.suitable} /></div>
                <div>
                  <h3 className="mb-2 font-bold text-brand">كيف تعمل الخدمة</h3>
                  <ol className="space-y-2 text-sm leading-7 text-ink/75">
                    {s.how.map((h, i) => (
                      <li key={h} className="flex gap-2"><b className="text-brand">{i + 1}.</b>{h}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <FinalCta />
    </>
  );
}

/* ---------------- PROGRAMS ---------------- */
export function ProgramsView() {
  const { content } = useContent();
  const list = content.programs.filter((p) => p.published);
  return (
    <>
      <PageHeader eyebrow="البرامج الغذائية" title="البرامج الغذائية" text="تفاصيل البرامج المتاحة وأسعارها تُؤكَّد مع د. رشا مباشرة قبل الاشتراك." />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <ProgramCard key={p.id} p={p} i={i} />)}
          </div>
        ) : (
          <Empty title="سيتم إضافة البرامج قريبًا" text="تواصلي مع د. رشا لمعرفة تفاصيل البرامج الغذائية المتاحة.">
            <WaButton message={WA_MESSAGES.program}>استفسري عن البرامج</WaButton>
          </Empty>
        )}
      </div>
      <FinalCta />
    </>
  );
}

/* ---------------- COURSES ---------------- */
export function CoursesView() {
  const { content } = useContent();
  const list = content.courses.filter((c) => c.published);
  return (
    <>
      <PageHeader eyebrow="الكورسات" title="الكورسات" text="كورسات أونلاين لتعلّم أساسيات التغذية الصحية. الاشتراك يتم عبر واتساب." />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {list.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => <CourseCard key={c.id} c={c} i={i} />)}
          </div>
        ) : (
          <Empty title="لا توجد كورسات حاليًا" text="سيتم إضافة الكورسات قريبًا. تواصلي معنا للاستفسار.">
            <WaButton message={WA_MESSAGES.general}>تواصلي معنا</WaButton>
          </Empty>
        )}
      </div>
      <FinalCta />
    </>
  );
}

export function CourseDetailsView({ slug }: { slug: string }) {
  const { content, ready } = useContent();
  const c = content.courses.find((x) => x.slug === slug && x.published);
  if (!c) {
    return (
      <div className="px-4 pb-20 pt-40">
        {!ready ? (
          <p className="text-center text-ink/50">جارٍ التحميل…</p>
        ) : (
          <Empty title="الكورس غير موجود" text="ربما تم حذف الكورس أو تغيير رابطه.">
            <Link href="/courses" className="font-bold text-brand underline">العودة إلى الكورسات</Link>
          </Empty>
        )}
      </div>
    );
  }
  return (
    <>
      <PageHeader eyebrow="تفاصيل الكورس" title={c.title} text={c.tagline} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          <div className="aspect-video overflow-hidden rounded-3xl"><Media src={c.image} label={`غلاف كورس ${c.title}`} tone="sun" /></div>
          <Reveal><h2 className="h2">مقدمة الكورس</h2><p className="mt-3 leading-9 text-ink/70">{c.description}</p></Reveal>
          <Reveal><h2 className="h2">أهداف الكورس</h2><CheckList items={c.objectives} className="mt-3" /></Reveal>
          <Reveal><h2 className="h2">ماذا ستتعلمين؟</h2><CheckList items={c.learn} className="mt-3" /></Reveal>
          <Reveal>
            <h2 className="h2">المنهج</h2>
            <div className="mt-4 space-y-3">
              {c.curriculum.map((m, i) => (
                <div key={m.title + i} className="card !p-5">
                  <h3 className="font-extrabold text-brand-dark">{m.title}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-ink/65">{m.lessons.map((l) => <li key={l}>• {l}</li>)}</ul>
                </div>
              ))}
              <p className="text-xs text-ink/45">تفاصيل المنهج وعدد الدروس ومدة الكورس تُؤكَّد عند التواصل.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal><h2 className="text-xl font-extrabold text-brand-dark">لمن الكورس؟</h2><CheckList items={c.audience} className="mt-3" /></Reveal>
            <Reveal><h2 className="text-xl font-extrabold text-brand-dark">فوائد الكورس</h2><CheckList items={c.benefits} className="mt-3" /></Reveal>
          </div>
          {c.faqs.length > 0 && (
            <div><h2 className="h2 mb-5">أسئلة عن الكورس</h2><FaqAccordion items={c.faqs} /></div>
          )}
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card border-brand/25">
            <p className="text-sm text-ink/60">السعر</p>
            <p className="text-2xl font-extrabold text-brand-dark">{c.price || "يُرسل عبر واتساب"}</p>
            <p className="mt-3 text-sm leading-7 text-ink/65"><b>حالة التسجيل:</b> {c.status}</p>
            <WaButton message={courseMessage(c.title)} className="mt-5 w-full">اشترك في الكورس عبر واتساب</WaButton>
            <p className="mt-3 text-xs leading-6 text-ink/45">لا يوجد دفع عبر الموقع. الاشتراك يتم بعد التواصل مع الدكتورة.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ---------------- VIDEOS ---------------- */
export function VideosView() {
  const { content } = useContent();
  const all = content.videos.filter((v) => v.published);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("الكل");
  const [plat, setPlat] = useState("all");
  const cats = useMemo(() => ["الكل", ...Array.from(new Set(all.map((v) => v.category).filter(Boolean)))], [all]);
  const featured = all.find((v) => v.featured);
  const list = all.filter(
    (v) =>
      (cat === "الكل" || v.category === cat) &&
      (plat === "all" || v.platform === plat) &&
      (v.title + v.description).includes(q.trim())
  );
  return (
    <>
      <PageHeader eyebrow="الفيديوهات" title="اتعلم مع د. رشا" text="فيديوهات تعليمية من يوتيوب وفيسبوك." />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {featured && (
          <div className="mb-12">
            <h2 className="h2 mb-5">فيديو مميز</h2>
            <div className="mx-auto max-w-3xl"><VideoCard v={featured} /></div>
          </div>
        )}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحثي عن فيديو" aria-label="بحث" className="input !pr-10" />
          </div>
          <select value={plat} onChange={(e) => setPlat(e.target.value)} aria-label="المنصة" className="input !w-auto">
            <option value="all">كل المنصات</option>
            <option value="youtube">يوتيوب</option>
            <option value="facebook">فيسبوك</option>
          </select>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${cat === c ? "bg-brand text-white" : "bg-white text-ink/70 hover:bg-brand-soft"}`}>
              {c}
            </button>
          ))}
        </div>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((v, i) => <VideoCard key={v.id} v={v} i={i} />)}</div>
        ) : (
          <Empty title="لا توجد نتائج" text="جرّبي كلمة بحث أو تصنيفًا آخر." />
        )}
      </div>
    </>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function TestimonialsView() {
  const { content } = useContent();
  const reviews = publicTestimonials(content.testimonials);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  return (
    <>
      <PageHeader eyebrow="آراء العملاء" title="تجارب وآراء العملاء" text="تعرف على تجارب الأشخاص مع خدمات ومحتوى د. رشا." />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {reviews.length ? (
          <>
            <div className="mb-8 flex items-center gap-3"><Stars n={Math.round(avg)} /><span className="text-sm text-ink/60">{reviews.length} رأي موثّق</span></div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{reviews.map((t) => <Reveal key={t.id}><TestimonialCard t={t} /></Reveal>)}</div>
          </>
        ) : (
          <CareSection />
        )}
        <Reveal className="mt-14">
          <div className="card mx-auto max-w-2xl bg-brand-soft text-center">
            <h2 className="text-xl font-extrabold text-brand-dark">جرّبتِ خدمات د. رشا؟ شاركينا رأيك</h2>
            <p className="mt-2 text-sm leading-7 text-ink/65">رأيك يساعد غيرك. لا يُنشر أي رأي إلا بعد موافقتك.</p>
            <WaButton message={WA_MESSAGES.review} className="mt-5">شاركينا رأيك عبر واتساب</WaButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}

/* ---------------- CONTACT ---------------- */
export function ContactView() {
  const { content } = useContent();
  const s = content.settings;
  const c = s.clinic;
  const has = c.address || c.workingDays || c.workingHours || c.mapsUrl || c.phone || c.governorate || c.city;
  const socials = [
    { label: "فيسبوك", url: s.facebook, Icon: FacebookIcon },
    { label: "إنستجرام", url: s.instagram, Icon: InstagramIcon },
    { label: "يوتيوب", url: s.youtube, Icon: YouTubeIcon },
  ];
  return (
    <>
      <PageHeader eyebrow="تواصل معنا" title="تواصل معنا" text="واتساب هو وسيلة التواصل الأساسية لطلب الحجز. لا يُعتبر الموعد مؤكدًا إلا بعد الرد من الدكتورة." />
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:px-6">
        <ConsultChoice />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <h2 className="text-xl font-extrabold text-brand-dark">{s.doctorName}</h2>
              <p className="text-sm text-ink/60">{s.title}</p>
              <p className="mt-5 flex items-center gap-2 font-bold"><WhatsAppIcon className="text-[#25D366]" /> <span dir="ltr">{s.whatsappLocal}</span> <span className="text-xs font-normal text-ink/45">(<span dir="ltr">+{s.whatsappIntl}</span>)</span></p>
              <WaButton message={WA_MESSAGES.general} className="mt-4">تواصلي عبر واتساب</WaButton>
              <div className="mt-6 space-y-3">
                {socials.map(({ label, url, Icon }) =>
                  url ? (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold text-brand-dark hover:text-brand"><Icon /> {label} <ExternalLink size={14} /></a>
                  ) : (
                    <p key={label} className="flex items-center gap-3 text-sm text-ink/40"><Icon /> {label}: سيتم إضافة الرابط قريبًا</p>
                  )
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full">
              <h2 className="flex items-center gap-2 text-xl font-extrabold text-brand-dark"><Building2 size={22} /> معلومات العيادة</h2>
              {has ? (
                <dl className="mt-5 space-y-3 text-sm leading-7">
                  {c.address && <div className="flex gap-2"><MapPin size={18} className="mt-1 shrink-0 text-brand" /><span>{c.address}</span></div>}
                  {(c.governorate || c.city) && <p><b>المنطقة:</b> {[c.governorate, c.city].filter(Boolean).join(" – ")}</p>}
                  {c.workingDays && <div className="flex gap-2"><Clock size={18} className="mt-1 shrink-0 text-brand" /><span><b>أيام العمل:</b> {c.workingDays}</span></div>}
                  {c.workingHours && <p><b>ساعات العمل:</b> {c.workingHours}</p>}
                  {c.phone && <div className="flex gap-2"><Phone size={18} className="mt-1 shrink-0 text-brand" /><span dir="ltr">{c.phone}</span></div>}
                  {c.mapsUrl && <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-brand underline">فتح الموقع على الخريطة <ExternalLink size={14} /></a>}
                </dl>
              ) : (
                <p className="mt-5 rounded-2xl bg-brand-soft p-5 text-sm font-semibold leading-8 text-brand-dark">تواصلي معنا لمعرفة عنوان العيادة ومواعيد الحجز.</p>
              )}
              <h3 className="mt-7 flex items-center gap-2 font-extrabold text-brand-dark"><Laptop size={20} /> الاستشارات أونلاين</h3>
              <p className="mt-2 text-sm leading-8 text-ink/65">استشارة عن بُعد من أي مكان. اطلبي الحجز عبر واتساب لمعرفة التفاصيل والمواعيد المتاحة.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

/* ---------------- FAQ ---------------- */
export function FaqView() {
  const { content } = useContent();
  return (
    <>
      <PageHeader eyebrow="أسئلة شائعة" title="الأسئلة الشائعة" text="إجابات عامة وقابلة للتعديل. للاستفسار عن حالتك الخاصة تواصلي مع الدكتورة." />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><FaqAccordion items={content.faqs.filter((f) => f.published)} /></div>
      <FinalCta />
    </>
  );
}

export { BookButton, SectionTitle, programMessage };
