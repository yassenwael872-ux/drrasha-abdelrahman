# موقع د. رشا علي عبدالرحمن

Next.js 16 + TypeScript + Tailwind 3 + Framer Motion. عربي RTL، الخطوط (Cairo/Poppins) مدمجة محليًا عبر @fontsource.

## التشغيل
npm install
npm run dev      # http://localhost:3000
npm run build && npm start

## متغيرات البيئة
NEXT_PUBLIC_SITE_URL=https://your-domain.com   # للـ sitemap و Open Graph
(لا توجد مفاتيح أخرى مطلوبة. Supabase غير مفعّل.)

## النشر
ارفعي المشروع على Vercel (Import من GitHub) وأضيفي NEXT_PUBLIC_SITE_URL. أي استضافة Node تعمل بـ npm run build && npm start.

## تعديل المحتوى
- دائم: ملف src/lib/site-data.ts (الخدمات، الكورسات، الفيديوهات، الأسئلة، العيادة، الروابط).
- لوحة /admin: نسخة تجريبية تحفظ في متصفح المستخدم فقط (localStorage) وكلمة المرور محلية وليست حماية خادم.
  للإدارة الدائمة الحقيقية يلزم ربط Supabase (Auth + جداول + RLS) ثم استبدال ContentProvider.

## ما ينقص
صورة الدكتورة، رابط يوتيوب، روابط الفيديوهات، عنوان العيادة/المحافظة/المدينة/أيام وساعات العمل/خرائط جوجل/هاتف العيادة، أسعار الكورس والبرامج، منهج الكورس الفعلي، صور أغلفة الكورسات.
