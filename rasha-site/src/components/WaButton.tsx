"use client";

import type { ReactNode } from "react";
import { useContent } from "./ContentProvider";
import { WhatsAppIcon } from "./icons";
import { waUrl } from "@/lib/whatsapp";

export function WaButton({
  message,
  children,
  variant = "solid",
  className = "",
  icon = true,
}: {
  message: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
  icon?: boolean;
}) {
  const { content } = useContent();
  const styles = {
    solid: "bg-brand text-white hover:bg-brand-dark shadow-soft",
    outline: "border border-brand/30 text-brand-dark hover:bg-brand-soft hover:border-brand",
    light: "bg-white text-brand-dark hover:bg-lime",
  }[variant];
  return (
    <a
      href={waUrl(message, content.settings.whatsappIntl)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {icon && <WhatsAppIcon width={18} height={18} />}
      {children}
    </a>
  );
}
