import type { Metadata } from "next";
import { AdminView } from "@/components/AdminView";

export const metadata: Metadata = { title: "لوحة التحكم", robots: { index: false, follow: false } };

export default function Page() {
  return <AdminView />;
}
