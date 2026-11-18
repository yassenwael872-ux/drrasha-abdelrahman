export const DEFAULT_WA_NUMBER = "201066220846";

export const WA_MESSAGES = {
  clinic: "مرحبًا دكتورة رشا، أرغب في حجز موعد لزيارة العيادة، برجاء إرسال العنوان والمواعيد المتاحة.",
  online: "مرحبًا دكتورة رشا، أرغب في حجز استشارة تغذية أونلاين، برجاء إرسال التفاصيل والمواعيد المتاحة.",
  course:
    "مرحبًا دكتورة رشا، أرغب في الاشتراك في كورس خس من غير حرمان، برجاء إرسال تفاصيل الكورس والسعر وطريقة الاشتراك.",
  program: "مرحبًا دكتورة رشا، أرغب في معرفة تفاصيل البرامج الغذائية المتاحة.",
  general: "مرحبًا دكتورة رشا، لدي استفسار وأرغب في التواصل مع حضرتك.",
  review: "مرحبًا دكتورة رشا، أرغب في مشاركة رأيي وتجربتي مع حضرتك.",
} as const;

export function courseMessage(title: string) {
  return `مرحبًا دكتورة رشا، أرغب في الاشتراك في كورس ${title}، برجاء إرسال تفاصيل الكورس والسعر وطريقة الاشتراك.`;
}

export function serviceMessage(title: string) {
  return `مرحبًا دكتورة رشا، أرغب في الاستفسار عن خدمة: ${title}.`;
}

export function programMessage(title: string) {
  return title === "البرامج الغذائية"
    ? WA_MESSAGES.program
    : `مرحبًا دكتورة رشا، أرغب في معرفة تفاصيل برنامج ${title}.`;
}

/** يبني رابط واتساب مع رسالة عربية مشفّرة بشكل صحيح */
export function waUrl(message: string, number: string = DEFAULT_WA_NUMBER) {
  const digits = number.replace(/\D/g, "") || DEFAULT_WA_NUMBER;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
