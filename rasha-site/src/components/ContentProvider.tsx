"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "@/lib/site-data";

const KEY = "rasha-site-content-v1";

interface Ctx {
  content: SiteContent;
  ready: boolean;
  update: (next: SiteContent) => void;
  reset: () => void;
  hasOverrides: boolean;
}

const C = createContext<Ctx | null>(null);

/**
 * النسخة التجريبية: التعديلات من لوحة /admin تُحفظ في localStorage لهذا المتصفح فقط.
 * للإدارة الدائمة الحقيقية يلزم ربط قاعدة بيانات (مثل Supabase) – راجع README.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [ready, setReady] = useState(false);
  const [hasOverrides, setHas] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SiteContent>;
        setContent({
          ...defaultContent,
          ...saved,
          settings: {
            ...defaultContent.settings,
            ...saved.settings,
            hero: { ...defaultContent.settings.hero, ...saved.settings?.hero },
            about: { ...defaultContent.settings.about, ...saved.settings?.about },
            clinic: { ...defaultContent.settings.clinic, ...saved.settings?.clinic },
            availability: { ...defaultContent.settings.availability, ...saved.settings?.availability },
          },
        });
        setHas(true);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  const update = useCallback((next: SiteContent) => {
    setContent(next);
    setHas(true);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      alert("تعذّر الحفظ: ربما حجم الصور كبير. جرّبي صورة أصغر.");
    }
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setContent(defaultContent);
    setHas(false);
  }, []);

  const value = useMemo(() => ({ content, ready, update, reset, hasOverrides }), [content, ready, update, reset, hasOverrides]);
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useContent() {
  const v = useContext(C);
  if (!v) throw new Error("useContent must be inside ContentProvider");
  return v;
}
