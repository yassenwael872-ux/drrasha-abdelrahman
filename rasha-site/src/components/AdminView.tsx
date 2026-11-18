"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Pencil, LogOut, RotateCcw } from "lucide-react";
import { useContent } from "./ContentProvider";
import type { SiteContent } from "@/lib/site-data";

/* ============ مصادقة محلية (نسخة تجريبية) ============ */
const PASS_KEY = "rasha-admin-pass-v1";
const SESSION_KEY = "rasha-admin-session";

async function sha(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function Gate({ onOk }: { onOk: () => void }) {
  const [hasPass, setHasPass] = useState<boolean | null>(null);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => setHasPass(!!localStorage.getItem(PASS_KEY)), []);
  if (hasPass === null) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!hasPass) {
      if (p1.length < 8) return setErr("كلمة المرور يجب ألا تقل عن 8 أحرف.");
      if (p1 !== p2) return setErr("كلمتا المرور غير متطابقتين.");
      localStorage.setItem(PASS_KEY, await sha(p1));
      sessionStorage.setItem(SESSION_KEY, "1");
      return onOk();
    }
    if ((await sha(p1)) === localStorage.getItem(PASS_KEY)) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onOk();
    } else setErr("كلمة المرور غير صحيحة.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper p-4">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-extrabold text-brand-dark">لوحة التحكم</h1>
        <p className="rounded-xl bg-sun/20 p-3 text-xs leading-6 text-ink/70">
          نسخة تجريبية: كلمة المرور والبيانات تُحفظ في هذا المتصفح فقط، وهذه ليست حماية خادم حقيقية. للإدارة الآمنة الدائمة يلزم ربط Supabase (راجع README).
        </p>
        <label className="block text-sm font-bold">
          {hasPass ? "كلمة المرور" : "اختاري كلمة مرور جديدة"}
          <input type="password" value={p1} onChange={(e) => setP1(e.target.value)} className="input mt-1" autoComplete={hasPass ? "current-password" : "new-password"} required />
        </label>
        {!hasPass && (
          <label className="block text-sm font-bold">
            تأكيد كلمة المرور
            <input type="password" value={p2} onChange={(e) => setP2(e.target.value)} className="input mt-1" required />
          </label>
        )}
        {err && <p role="alert" className="text-sm text-coral">{err}</p>}
        <button className="w-full rounded-full bg-brand py-3 font-bold text-white hover:bg-brand-dark">{hasPass ? "دخول" : "إنشاء كلمة المرور والدخول"}</button>
      </form>
    </div>
  );
}

/* ============ حقول ============ */
type Field =
  | { k: string; label: string; t: "text" | "textarea" | "url" | "number" | "image" | "bool" | "lines" | "curriculum" | "qa"; req?: boolean; hint?: string }
  | { k: string; label: string; t: "select"; options: [string, string][]; req?: boolean };

function toText(v: unknown, t: Field["t"]): string {
  if (t === "lines") return ((v as string[]) ?? []).join("\n");
  if (t === "curriculum") return ((v as { title: string; lessons: string[] }[]) ?? []).map((m) => `${m.title} :: ${m.lessons.join(" | ")}`).join("\n");
  if (t === "qa") return ((v as { q: string; a: string }[]) ?? []).map((m) => `${m.q} :: ${m.a}`).join("\n");
  return String(v ?? "");
}
function fromText(s: string, t: Field["t"]) {
  const lines = s.split("\n").map((x) => x.trim()).filter(Boolean);
  if (t === "lines") return lines;
  if (t === "curriculum") return lines.map((l) => { const [title, rest = ""] = l.split("::"); return { title: title.trim(), lessons: rest.split("|").map((x) => x.trim()).filter(Boolean) }; });
  if (t === "qa") return lines.map((l) => { const [q, ...a] = l.split("::"); return { q: q.trim(), a: a.join("::").trim() }; });
  return s;
}

function readImage(file: File, cb: (d: string) => void) {
  if (file.size > 600_000) return alert("الصورة كبيرة (أكثر من 600 كيلوبايت). استخدمي صورة أصغر لأن الحفظ في هذه النسخة محلي.");
  const r = new FileReader();
  r.onload = () => cb(String(r.result));
  r.readAsDataURL(file);
}

function FieldInput({ f, value, onChange }: { f: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = `f-${f.k}`;
  if (f.t === "bool")
    return (
      <label className="flex items-center gap-2 text-sm font-bold">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#008C53]" />
        {f.label}
      </label>
    );
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-bold">{f.label}{f.req && <span className="text-coral"> *</span>}</label>
      {f.t === "select" ? (
        <select id={id} className="input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      ) : f.t === "image" ? (
        <div className="flex items-center gap-3">
          {typeof value === "string" && value && /* eslint-disable-next-line @next/next/no-img-element */ <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" />}
          <input id={id} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readImage(e.target.files[0], onChange)} className="text-sm" />
          {typeof value === "string" && value && <button type="button" onClick={() => onChange("")} className="text-xs text-coral">حذف</button>}
        </div>
      ) : f.t === "textarea" || f.t === "lines" || f.t === "curriculum" || f.t === "qa" ? (
        <textarea id={id} rows={f.t === "textarea" ? 4 : 5} className="input" value={toText(value, f.t)} onChange={(e) => onChange(f.t === "textarea" ? e.target.value : fromText(e.target.value, f.t))} />
      ) : (
        <input id={id} type={f.t === "number" ? "number" : f.t === "url" ? "url" : "text"} dir={f.t === "url" ? "ltr" : undefined} className="input" value={String(value ?? "")} onChange={(e) => onChange(f.t === "number" ? Number(e.target.value) : e.target.value)} />
      )}
      {"hint" in f && f.hint && <p className="mt-1 text-xs text-ink/50">{f.hint}</p>}
    </div>
  );
}

/* ============ محرر مجموعات عام ============ */
type Item = Record<string, unknown> & { id: string };

function Collection({
  items, fields, onSave, newItem, titleKey, validate,
}: {
  items: Item[]; fields: Field[]; onSave: (next: Item[]) => void; newItem: () => Item; titleKey: string;
  validate?: (it: Item) => string | null;
}) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [errs, setErrs] = useState<string[]>([]);

  const save = () => {
    if (!editing) return;
    const e: string[] = [];
    fields.forEach((f) => {
      const v = editing[f.k];
      if ("req" in f && f.req && !String(v ?? "").trim()) e.push(`الحقل «${f.label}» مطلوب.`);
      if (f.t === "url" && v && !/^https?:\/\//.test(String(v))) e.push(`«${f.label}» يجب أن يبدأ بـ https://`);
    });
    const custom = validate?.(editing);
    if (custom) e.push(custom);
    setErrs(e);
    if (e.length) return;
    onSave(isNew ? [...items, editing] : items.map((x) => (x.id === editing.id ? editing : x)));
    setEditing(null);
  };

  if (editing)
    return (
      <div className="card space-y-4">
        <h2 className="text-lg font-extrabold">{isNew ? "إضافة جديد" : "تعديل"}</h2>
        {fields.map((f) => <FieldInput key={f.k} f={f} value={editing[f.k]} onChange={(v) => setEditing({ ...editing, [f.k]: v })} />)}
        {errs.length > 0 && <ul role="alert" className="rounded-xl bg-coral/10 p-3 text-sm text-coral">{errs.map((e) => <li key={e}>• {e}</li>)}</ul>}
        <div className="flex gap-3">
          <button onClick={save} className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white">حفظ</button>
          <button onClick={() => { setEditing(null); setErrs([]); }} className="rounded-full border px-6 py-2.5 text-sm font-bold">إلغاء</button>
        </div>
      </div>
    );

  return (
    <div className="space-y-3">
      <button onClick={() => { setEditing(newItem()); setIsNew(true); setErrs([]); }} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white"><Plus size={16} /> إضافة</button>
      {items.length === 0 && <p className="text-sm text-ink/50">لا توجد عناصر.</p>}
      {items.map((it) => (
        <div key={it.id} className="card flex items-center justify-between gap-3 !p-4">
          <div>
            <p className="font-bold">{String(it[titleKey])}</p>
            <p className="text-xs text-ink/50">
              {it.published ? "منشور" : "غير منشور"}{it.isDemo ? " • بيانات تجريبية" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button aria-label="تعديل" onClick={() => { setEditing({ ...it }); setIsNew(false); setErrs([]); }} className="rounded-full p-2 hover:bg-brand-soft"><Pencil size={18} /></button>
            <button aria-label="حذف" onClick={() => confirm("حذف هذا العنصر نهائيًا؟") && onSave(items.filter((x) => x.id !== it.id))} className="rounded-full p-2 text-coral hover:bg-coral/10"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

const uid = () => Math.random().toString(36).slice(2, 9);

/* ============ الإعدادات ============ */
function SettingsEditor() {
  const { content, update } = useContent();
  const [s, setS] = useState(content.settings);
  const [msg, setMsg] = useState("");
  const [errs, setErrs] = useState<string[]>([]);
  useEffect(() => setS(content.settings), [content.settings]);

  const set = (path: string, v: unknown) => {
    const next = structuredClone(s) as unknown as Record<string, unknown>;
    const keys = path.split(".");
    let o = next;
    keys.slice(0, -1).forEach((k) => (o = o[k] as Record<string, unknown>));
    o[keys[keys.length - 1]] = v;
    setS(next as unknown as typeof s);
  };

  const F = (path: string, label: string, t: Field["t"] = "text") => {
    const v = path.split(".").reduce((a: unknown, k) => (a as Record<string, unknown>)[k], s);
    return <FieldInput key={path} f={{ k: path, label, t } as Field} value={v} onChange={(x) => set(path, x)} />;
  };

  const save = () => {
    const e: string[] = [];
    (["facebook", "instagram", "youtube", "clinic.mapsUrl"] as const).forEach((p) => {
      const v = p.split(".").reduce((a: unknown, k) => (a as Record<string, unknown>)[k], s) as string;
      if (v && !/^https?:\/\//.test(v)) e.push(`رابط ${p} يجب أن يبدأ بـ https://`);
    });
    if (!/^\d{11,15}$/.test(s.whatsappIntl.replace(/\D/g, ""))) e.push("رقم واتساب الدولي غير صالح.");
    setErrs(e);
    if (e.length) return;
    update({ ...content, settings: { ...s, whatsappIntl: s.whatsappIntl.replace(/\D/g, "") } });
    setMsg("تم الحفظ ✓");
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="space-y-8">
      <section className="card space-y-4"><h2 className="font-extrabold">الصفحة الرئيسية والتعريف</h2>
        {F("hero.headline", "العنوان الرئيسي")}{F("hero.text", "النص التعريفي", "textarea")}{F("portrait", "صورة الدكتورة", "image")}
        {F("qualifications", "المؤهلات (سطر لكل مؤهل)", "lines")}{F("about.preview", "نبذة (فقرة لكل سطر)", "lines")}
        {F("about.philosophy", "فلسفة التغذية", "textarea")}{F("about.clinicApproach", "منهج الاستشارة في العيادة", "textarea")}{F("about.onlineApproach", "منهج الاستشارة أونلاين", "textarea")}
      </section>
      <section className="card space-y-4"><h2 className="font-extrabold">التواصل والروابط</h2>
        {F("whatsappLocal", "رقم واتساب (محلي)")}{F("whatsappIntl", "رقم واتساب الدولي (أرقام فقط)")}
        {F("facebook", "رابط فيسبوك", "url")}{F("instagram", "رابط إنستجرام", "url")}{F("youtube", "رابط يوتيوب", "url")}
      </section>
      <section className="card space-y-4"><h2 className="font-extrabold">معلومات العيادة</h2>
        <p className="text-xs text-ink/50">اتركي الحقل فارغًا إذا لم تتوفر المعلومة، وستظهر رسالة «تواصلي معنا لمعرفة العنوان».</p>
        {F("clinic.address", "عنوان العيادة")}{F("clinic.governorate", "المحافظة")}{F("clinic.city", "المدينة / الحي")}
        {F("clinic.workingDays", "أيام العمل")}{F("clinic.workingHours", "ساعات العمل")}{F("clinic.mapsUrl", "رابط خرائط جوجل", "url")}{F("clinic.phone", "هاتف العيادة")}
      </section>
      <section className="card space-y-4"><h2 className="font-extrabold">التوفر</h2>
        {F("availability.clinic", "الحجز في العيادة متاح", "bool")}{F("availability.online", "الاستشارة أونلاين متاحة", "bool")}
        <p className="text-xs text-ink/50">عند إيقاف الخيار تظهر ملاحظة «تواصلي لمعرفة المواعيد» ويبقى الزر يعمل.</p>
      </section>
      {errs.length > 0 && <ul role="alert" className="rounded-xl bg-coral/10 p-3 text-sm text-coral">{errs.map((e) => <li key={e}>• {e}</li>)}</ul>}
      <div className="flex items-center gap-3"><button onClick={save} className="rounded-full bg-brand px-8 py-3 font-bold text-white">حفظ الإعدادات</button><span className="text-sm text-brand">{msg}</span></div>
    </div>
  );
}

/* ============ اللوحة ============ */
const TABS = ["الإعدادات", "الخدمات", "البرامج", "الكورسات", "الفيديوهات", "آراء العملاء", "الأسئلة الشائعة"] as const;

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { content, update, reset, hasOverrides } = useContent();
  const [tab, setTab] = useState<(typeof TABS)[number]>("الإعدادات");
  const set = <K extends keyof SiteContent>(k: K, v: unknown) => update({ ...content, [k]: v } as SiteContent);
  const pub: Field = { k: "published", label: "منشور", t: "bool" };

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="font-extrabold text-brand-dark">لوحة تحكم الموقع</h1>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="font-bold text-brand">عرض الموقع</Link>
            <button onClick={onLogout} className="inline-flex items-center gap-1 text-ink/60"><LogOut size={16} /> خروج</button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="mb-5 rounded-xl bg-sun/20 p-3 text-xs leading-6 text-ink/70">
          نسخة تجريبية: التعديلات تُحفظ في هذا المتصفح فقط ولا يراها زوار الموقع الآخرون. للنشر الدائم يلزم ربط قاعدة بيانات (Supabase) أو تعديل ملف <code dir="ltr">src/lib/site-data.ts</code>.
          {hasOverrides && <button onClick={() => confirm("استرجاع كل المحتوى الافتراضي؟") && reset()} className="mr-3 inline-flex items-center gap-1 font-bold text-coral"><RotateCcw size={12} /> استرجاع الافتراضي</button>}
        </p>
        <div role="tablist" className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === t ? "bg-brand text-white" : "bg-white hover:bg-brand-soft"}`}>{t}</button>
          ))}
        </div>

        {tab === "الإعدادات" && <SettingsEditor />}
        {tab === "الخدمات" && (
          <Collection titleKey="title" items={content.services as unknown as Item[]} onSave={(v) => set("services", v)}
            newItem={() => ({ id: uid(), category: "clinic", icon: "stethoscope", title: "", short: "", description: "", benefits: [], suitable: [], how: [], published: true })}
            fields={[
              { k: "title", label: "العنوان", t: "text", req: true },
              { k: "category", label: "التصنيف", t: "select", options: [["clinic", "خدمات العيادة"], ["online", "استشارات أونلاين"], ["followup", "المتابعة الغذائية"], ["programs", "البرامج الغذائية"], ["education", "التوعية والتثقيف"]] },
              { k: "icon", label: "الأيقونة", t: "select", options: [["stethoscope", "سماعة"], ["video", "فيديو"], ["refresh", "متابعة"], ["clipboard", "برنامج"], ["book", "كتاب"]] },
              { k: "short", label: "وصف مختصر", t: "textarea", req: true }, { k: "description", label: "الوصف", t: "textarea" },
              { k: "benefits", label: "الفوائد (سطر لكل فائدة)", t: "lines" }, { k: "suitable", label: "قد تناسب (سطر لكل بند)", t: "lines" }, { k: "how", label: "كيف تعمل (سطر لكل خطوة)", t: "lines" }, pub,
            ]} />
        )}
        {tab === "البرامج" && (
          <Collection titleKey="title" items={content.programs as unknown as Item[]} onSave={(v) => set("programs", v)}
            newItem={() => ({ id: uid(), title: "", image: "", description: "", objectives: [], price: "", published: false })}
            fields={[
              { k: "title", label: "اسم البرنامج", t: "text", req: true }, { k: "image", label: "صورة", t: "image" }, { k: "description", label: "الوصف", t: "textarea", req: true },
              { k: "objectives", label: "الأهداف (سطر لكل هدف)", t: "lines" }, { k: "price", label: "السعر (اتركيه فارغًا إن لم يُحدد)", t: "text" }, pub,
            ]} />
        )}
        {tab === "الكورسات" && (
          <Collection titleKey="title" items={content.courses as unknown as Item[]} onSave={(v) => set("courses", v)}
            newItem={() => ({ id: uid(), slug: "course-" + uid(), title: "", tagline: "", image: "", description: "", objectives: [], learn: [], curriculum: [], audience: [], benefits: [], faqs: [], price: "", status: "التسجيل عبر واتساب", featured: false, published: false })}
            validate={(it) => (!/^[a-z0-9-]+$/.test(String(it.slug)) ? "الرابط (slug) يقبل حروفًا إنجليزية صغيرة وأرقامًا وشرطات فقط." : content.courses.some((c) => c.slug === it.slug && c.id !== it.id) ? "الرابط مستخدم من كورس آخر." : null)}
            fields={[
              { k: "title", label: "عنوان الكورس", t: "text", req: true }, { k: "slug", label: "الرابط (إنجليزي)", t: "text", req: true }, { k: "tagline", label: "الجملة التعريفية", t: "text" },
              { k: "image", label: "صورة الغلاف", t: "image" }, { k: "description", label: "المقدمة", t: "textarea", req: true },
              { k: "objectives", label: "الأهداف (سطر لكل هدف)", t: "lines" }, { k: "learn", label: "ماذا ستتعلمين (سطر لكل بند)", t: "lines" },
              { k: "curriculum", label: "المنهج: كل سطر «عنوان الوحدة :: درس1 | درس2»", t: "curriculum" },
              { k: "audience", label: "لمن الكورس (سطر لكل بند)", t: "lines" }, { k: "benefits", label: "الفوائد (سطر لكل بند)", t: "lines" },
              { k: "faqs", label: "الأسئلة: كل سطر «السؤال :: الجواب»", t: "qa" },
              { k: "price", label: "السعر (فارغ = يُرسل عبر واتساب)", t: "text" }, { k: "status", label: "حالة التسجيل", t: "text" },
              { k: "featured", label: "كورس مميز في الرئيسية", t: "bool" }, pub,
            ]} />
        )}
        {tab === "الفيديوهات" && (
          <Collection titleKey="title" items={content.videos as unknown as Item[]} onSave={(v) => set("videos", v)}
            newItem={() => ({ id: uid(), title: "", description: "", thumbnail: "", url: "", platform: "youtube", category: "", date: "", featured: false, published: true })}
            fields={[
              { k: "title", label: "العنوان", t: "text", req: true }, { k: "description", label: "الوصف", t: "textarea" },
              { k: "platform", label: "المنصة", t: "select", options: [["youtube", "يوتيوب"], ["facebook", "فيسبوك"]] },
              { k: "url", label: "رابط الفيديو", t: "url" }, { k: "thumbnail", label: "صورة مصغرة (اختياري)", t: "image" },
              { k: "category", label: "التصنيف", t: "text" }, { k: "date", label: "تاريخ النشر", t: "text" },
              { k: "featured", label: "فيديو مميز", t: "bool" }, pub,
            ]} />
        )}
        {tab === "آراء العملاء" && (
          <>
            <p className="mb-4 rounded-xl bg-brand-soft p-3 text-xs leading-6">
              الآراء التجريبية (isDemo) لا تظهر للزوار أبدًا. لنشر رأي حقيقي: عدّلي النص والاسم، ألغي «بيانات تجريبية»، فعّلي «تم أخذ الموافقة»، ثم «منشور».
            </p>
            <Collection titleKey="name" items={content.testimonials as unknown as Item[]} onSave={(v) => set("testimonials", v)}
              newItem={() => ({ id: uid(), name: "", text: "", rating: 5, date: "", photo: "", anonymous: false, isDemo: false, permissionObtained: false, published: false })}
              validate={(it) => (it.published && (it.isDemo || !it.permissionObtained) ? "لا يمكن نشر رأي تجريبي أو بدون موافقة العميل." : Number(it.rating) < 1 || Number(it.rating) > 5 ? "التقييم من 1 إلى 5." : null)}
              fields={[
                { k: "name", label: "اسم العرض", t: "text", req: true }, { k: "text", label: "نص الرأي", t: "textarea", req: true },
                { k: "rating", label: "التقييم (1–5)", t: "number" }, { k: "date", label: "التاريخ", t: "text" }, { k: "photo", label: "صورة (بموافقة)", t: "image" },
                { k: "anonymous", label: "إخفاء الاسم (رأي مجهول)", t: "bool" }, { k: "isDemo", label: "بيانات تجريبية", t: "bool" },
                { k: "permissionObtained", label: "تم أخذ موافقة العميل على النشر", t: "bool" }, pub,
              ]} />
          </>
        )}
        {tab === "الأسئلة الشائعة" && (
          <Collection titleKey="q" items={content.faqs as unknown as Item[]} onSave={(v) => set("faqs", v)}
            newItem={() => ({ id: uid(), q: "", a: "", published: true })}
            fields={[{ k: "q", label: "السؤال", t: "text", req: true }, { k: "a", label: "الإجابة", t: "textarea", req: true }, pub]} />
        )}
      </div>
    </div>
  );
}

export function AdminView() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => setAuthed(sessionStorage.getItem(SESSION_KEY) === "1"), []);
  if (authed === null) return null;
  if (!authed) return <Gate onOk={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }} />;
}
