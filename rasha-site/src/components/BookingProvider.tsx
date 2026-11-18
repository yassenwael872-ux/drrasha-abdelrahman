"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Laptop, X } from "lucide-react";
import { useContent } from "./ContentProvider";
import { WhatsAppIcon } from "./icons";
import { WA_MESSAGES, waUrl } from "@/lib/whatsapp";

const Ctx = createContext<{ open: () => void } | null>(null);

export function useBooking() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBooking outside provider");
  return v;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const { content } = useContent();
  const num = content.settings.whatsappIntl;
  const av = content.settings.availability;
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const options = [
    {
      key: "clinic",
      icon: Building2,
      title: "حجز في العيادة",
      desc: "اطلبي موعدًا لزيارة العيادة وسنرسل لكِ العنوان والمواعيد المتاحة.",
      note: av.clinic ? "" : "تواصلي لمعرفة المواعيد المتاحة حاليًا.",
      href: waUrl(WA_MESSAGES.clinic, num),
    },
    {
      key: "online",
      icon: Laptop,
      title: "حجز استشارة أونلاين",
      desc: "استشارة عن بُعد وتوجيه غذائي أينما كنتِ.",
      note: av.online ? "" : "تواصلي لمعرفة المواعيد المتاحة حاليًا.",
      href: waUrl(WA_MESSAGES.online, num),
    },
  ];

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                aria-label="إغلاق"
                className="absolute left-4 top-4 rounded-full p-2 text-ink/60 transition hover:bg-paper hover:text-ink"
              >
                <X size={20} />
              </button>
              <h2 id="booking-title" className="text-2xl font-extrabold text-brand-dark">
                احجزي استشارتك
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink/65">
                اختاري الطريقة المناسبة، وستُفتح محادثة واتساب برسالة جاهزة. يتم تأكيد الموعد بعد التواصل مع الدكتورة.
              </p>
              <div className="mt-6 grid gap-3">
                {options.map((o) => (
                  <a
                    key={o.key}
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl border border-brand/15 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft hover:shadow-soft"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                      <o.icon size={22} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold text-ink">{o.title}</span>
                      <span className="block text-sm leading-6 text-ink/60">{o.desc}</span>
                      {o.note && <span className="block text-xs text-coral">{o.note}</span>}
                    </span>
                    <WhatsAppIcon className="text-brand" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
