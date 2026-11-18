"use client";

import type { ReactNode } from "react";
import { useBooking } from "./BookingProvider";

export function BookButton({
  children = "احجز استشارتك",
  className = "",
  variant = "solid",
}: {
  children?: ReactNode;
  className?: string;
  variant?: "solid" | "light" | "outline";
}) {
  const { open } = useBooking();
  const styles = {
    solid: "bg-brand text-white hover:bg-brand-dark shadow-soft",
    light: "bg-white text-brand-dark hover:bg-lime",
    outline: "border border-brand/30 text-brand-dark hover:bg-brand-soft",
  }[variant];
  return (
    <button
      type="button"
      onClick={open}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
