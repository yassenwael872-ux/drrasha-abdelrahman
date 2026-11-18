import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 pb-24 pt-44 text-center">
      <h1 className="text-5xl font-extrabold text-brand-dark">404</h1>
      <p className="mt-3 text-ink/60">الصفحة التي تبحثين عنها غير موجودة.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-brand px-7 py-3 font-bold text-white">العودة للرئيسية</Link>
    </div>
  );
}
