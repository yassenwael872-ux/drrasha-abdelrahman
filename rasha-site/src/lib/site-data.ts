/**
 * ملف المحتوى الافتراضي للموقع.
 * كل البيانات هنا قابلة للتعديل من لوحة /admin (تُحفظ محليًا في المتصفح في النسخة التجريبية)
 * أو مباشرة من هذا الملف. لا توجد هنا أي معلومات غير مؤكدة من الدكتورة.
 */

export type Platform = "youtube" | "facebook";

export interface Settings {
  doctorName: string;
  doctorNameEn: string;
  title: string;
  whatsappLocal: string; // 01066220846
  whatsappIntl: string; // 201066220846 (أرقام فقط)
  facebook: string;
  instagram: string;
  youtube: string;
  portrait: string; // رابط أو data URL للصورة الشخصية (فارغ = مكان مخصص)
  hero: { headline: string; text: string };
  qualifications: string[];
  about: { preview: string[]; philosophy: string; clinicApproach: string; onlineApproach: string };
  clinic: {
    address: string;
    governorate: string;
    city: string;
    workingDays: string;
    workingHours: string;
    mapsUrl: string;
    phone: string;
  };
  availability: { clinic: boolean; online: boolean };
}

export interface Service {
  id: string;
  category: "clinic" | "online" | "followup" | "programs" | "education";
  icon: "stethoscope" | "video" | "refresh" | "clipboard" | "book";
  title: string;
  short: string;
  description: string;
  benefits: string[];
  suitable: string[];
  how: string[];
  published: boolean;
}

export interface Program {
  id: string;
  title: string;
  image: string;
  description: string;
  objectives: string[];
  price: string;
  published: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  objectives: string[];
  learn: string[];
  curriculum: { title: string; lessons: string[] }[];
  audience: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  price: string; // فارغ = يُرسل عبر واتساب
  status: string;
  featured: boolean;
  published: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  platform: Platform;
  category: string;
  date: string;
  featured: boolean;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  photo: string;
  anonymous: boolean;
  isDemo: boolean;
  permissionObtained: boolean;
  published: boolean;
}

export interface Faq {
  id: string;
  q: string;
  a: string;
  published: boolean;
}

export interface SiteContent {
  settings: Settings;
  services: Service[];
  programs: Program[];
  courses: Course[];
  videos: VideoItem[];
  testimonials: Testimonial[];
  faqs: Faq[];
}

export const defaultContent: SiteContent = {
  settings: {
    doctorName: "د. رشا علي عبدالرحمن",
    doctorNameEn: "Dr. Rasha Ali Abdelrahman",
    title: "أخصائي الصحة العامة والتغذية العلاجية",
    whatsappLocal: "01066220846",
    whatsappIntl: "201066220846",
    facebook: "https://www.facebook.com/profile.php?id=61570779380470",
    instagram: "https://www.instagram.com/khes_mn_kher_herman_kol_w_khes/",
    youtube: "",
    portrait: "",
    hero: {
      headline: "صحتك تبدأ من اختياراتك اليومية",
      text: "مع د. رشا علي عبدالرحمن، ابدأ رحلتك نحو نمط حياة صحي من خلال التوجيه الغذائي والاستشارات داخل العيادة أو أونلاين، مع المتابعة المناسبة لاحتياجاتك.",
    },
    qualifications: [
      "ماجستير الصحة العامة",
      "دبلومة التغذية العلاجية – المعهد القومي للتغذية بالقاهرة",
      "أخصائي الصحة العامة والتغذية العلاجية",
    ],
    about: {
      preview: [
        "د. رشا علي عبدالرحمن، أخصائي الصحة العامة والتغذية العلاجية، حاصلة على ماجستير الصحة العامة ودبلومة التغذية العلاجية من المعهد القومي للتغذية بالقاهرة.",
        "تهدف إلى تقديم التوجيه الغذائي المناسب لكل شخص وفقًا لاحتياجاته وأهدافه الصحية، من خلال الاستشارات داخل العيادة والاستشارات أونلاين والمتابعة الغذائية، مع التركيز على بناء عادات غذائية صحية ومستدامة.",
      ],
      philosophy:
        "تؤمن د. رشا بأن التغذية الصحية رحلة تُبنى بالعادات اليومية البسيطة، وليست حرمانًا ولا قواعد جامدة. لذلك يركّز التوجيه الغذائي على فهم احتياج كل شخص وأهدافه الصحية، وبناء عادات يمكن الاستمرار عليها.",
      clinicApproach:
        "في العيادة تتم المقابلة شخصيًا، مع التعرّف على احتياجاتك وأهدافك الصحية للوصول إلى توجيه غذائي مناسب لك. للاستفسار عن العنوان والمواعيد، تواصلي عبر واتساب.",
      onlineApproach:
        "الاستشارة أونلاين تتيح لكِ الحصول على التوجيه الغذائي والمتابعة من أي مكان. للاستفسار عن تفاصيل الاستشارة والمواعيد المتاحة، تواصلي عبر واتساب.",
    },
    clinic: {
      address: "",
      governorate: "",
      city: "",
      workingDays: "",
      workingHours: "",
      mapsUrl: "",
      phone: "",
    },
    availability: { clinic: true, online: true },
  },

  services: [
    {
      id: "svc-clinic",
      category: "clinic",
      icon: "stethoscope",
      title: "الاستشارات الغذائية داخل العيادة",
      short: "قابلي د. رشا شخصيًا واحصلي على توجيه غذائي يناسب احتياجاتك.",
      description:
        "مقابلة شخصية مع د. رشا داخل العيادة للتعرّف على احتياجاتك وأهدافك الصحية، والحصول على التوجيه الغذائي المناسب.",
      benefits: ["مقابلة شخصية مباشرة", "توجيه غذائي يراعي احتياجاتك وأهدافك", "فرصة لطرح كل أسئلتك وجهًا لوجه"],
      suitable: ["من يفضّل المقابلة الشخصية", "من يرغب في بداية منظمة مع أخصائية"],
      how: ["اطلبي موعدًا عبر واتساب", "استلمي العنوان والمواعيد المتاحة", "يتم تأكيد الموعد بعد التواصل مع الدكتورة"],
      published: true,
    },
    {
      id: "svc-online",
      category: "online",
      icon: "video",
      title: "الاستشارات الغذائية أونلاين",
      short: "استشارة عن بُعد وتوجيه غذائي أينما كنتِ.",
      description:
        "استشارة تغذية عن بُعد تتيح لكِ الحصول على التوجيه الغذائي والمتابعة من أي مكان، بدون الحاجة لزيارة العيادة.",
      benefits: ["مرونة في المكان", "توجيه غذائي عن بُعد", "إمكانية الاستفسار عن تفاصيل المتابعة"],
      suitable: ["من يصعب عليه زيارة العيادة", "المقيمين في محافظات أو دول أخرى"],
      how: ["اطلبي الاستشارة أونلاين عبر واتساب", "استلمي التفاصيل والمواعيد المتاحة", "يتم تأكيد الموعد بعد التواصل مع الدكتورة"],
      published: true,
    },
    {
      id: "svc-followup",
      category: "followup",
      icon: "refresh",
      title: "المتابعة الغذائية",
      short: "متابعة مناسبة لاحتياجاتك بعد الاستشارة.",
      description:
        "متابعة غذائية تساعدك على الاستمرار في عاداتك الصحية. تفاصيل المتابعة وآلياتها تُؤكَّد مع الدكتورة.",
      benefits: ["دعم مستمر لعاداتك الغذائية", "فرصة لتعديل الخطة حسب احتياجك"],
      suitable: ["من بدأ رحلته الغذائية ويرغب في الاستمرار بدعم"],
      how: ["اسألي عن تفاصيل المتابعة عبر واتساب", "تُحدَّد آلية المتابعة بالاتفاق مع الدكتورة"],
      published: true,
    },
    {
      id: "svc-programs",
      category: "programs",
      icon: "clipboard",
      title: "البرامج الغذائية",
      short: "برامج غذائية تُؤكَّد تفاصيلها مع الدكتورة.",
      description:
        "برامج غذائية تهدف إلى بناء عادات صحية مستدامة. تفاصيل البرامج المتاحة وأسعارها تُؤكَّد عبر التواصل مع د. رشا.",
      benefits: ["تنظيم أوضح للعادات الغذائية", "التزام أسهل بخطوات واضحة"],
      suitable: ["من يرغب في برنامج منظم بدل المحاولات العشوائية"],
      how: ["اسألي عن البرامج المتاحة عبر واتساب", "تُؤكَّد التفاصيل والسعر قبل الاشتراك"],
      published: true,
    },
    {
      id: "svc-education",
      category: "education",
      icon: "book",
      title: "التوعية والتثقيف الغذائي",
      short: "كورسات ومحتوى تعليمي مبسّط عن التغذية.",
      description:
        "محتوى تعليمي وكورسات أونلاين لشرح أساسيات التغذية الصحية بطريقة بسيطة، من خلال الفيديوهات والكورسات.",
      benefits: ["معلومات مبسّطة وسهلة الفهم", "محتوى تستطيعين الرجوع إليه"],
      suitable: ["من يرغب في التعلّم والفهم قبل أو بعد الاستشارة"],
      how: ["شاهدي الفيديوهات المجانية", "تعرّفي على الكورسات واشتركي عبر واتساب"],
      published: true,
    },
  ],

  programs: [
    {
      id: "prog-general",
      title: "البرامج الغذائية",
      image: "",
      description:
        "تقدّم د. رشا برامج غذائية تُبنى على احتياج كل شخص. تفاصيل البرامج المتاحة وأسعارها تُؤكَّد معك مباشرة عبر واتساب.",
      objectives: ["بناء عادات غذائية صحية ومستدامة", "تنظيم الوجبات اليومية", "متابعة مناسبة لاحتياجاتك"],
      price: "",
      published: true,
    },
  ],

  courses: [
    {
      id: "course-khis",
      slug: "khis-men-gheir-hirman",
      title: "خس من غير حرمان",
      tagline: "اتعلم إزاي تبني عادات غذائية صحية من غير حرمان.",
      image: "",
      description:
        "كورس أونلاين مع د. رشا علي عبدالرحمن يشرح لكِ بطريقة بسيطة كيف تبنين عادات غذائية صحية دون الشعور بالحرمان.",
      objectives: ["فهم أساسيات العادات الغذائية الصحية", "بناء علاقة متوازنة مع الأكل", "تنظيم الوجبات اليومية بخطوات بسيطة"],
      learn: [
        "أساسيات التغذية بشكل مبسّط",
        "كيف تنظمين وجباتك وعاداتك اليومية",
        "كيف تتجنبين الشعور بالحرمان أثناء رحلتك",
      ],
      curriculum: [
        { title: "الوحدة الأولى (عنوان قابل للتعديل)", lessons: ["الدرس الأول (قابل للتعديل)", "الدرس الثاني (قابل للتعديل)"] },
        { title: "الوحدة الثانية (عنوان قابل للتعديل)", lessons: ["الدرس الأول (قابل للتعديل)"] },
      ],
      audience: ["كل من يرغب في فهم أساسيات التغذية الصحية", "من يريد بناء عادات غذائية بدون حرمان"],
      benefits: ["محتوى مبسّط يمكن الرجوع إليه", "تعلّم بسرعتك الخاصة"],
      faqs: [
        { q: "كيف أشترك في الكورس؟", a: "الاشتراك يتم عبر واتساب، وستصلك تفاصيل الكورس والسعر وطريقة الاشتراك." },
        {
          q: "هل الكورس بديل عن الاستشارة الطبية؟",
          a: "الكورس محتوى تثقيفي عام ولا يغني عن الاستشارة الغذائية أو الطبية الفردية، خاصة لمن لديه حالة صحية.",
        },
      ],
      price: "",
      status: "التسجيل مفتوح عبر واتساب – السعر والتفاصيل تُرسل عند التواصل",
      featured: true,
      published: true,
    },
  ],

  videos: [
    {
      id: "vid-1",
      title: "فيديو تعريفي من د. رشا (يُضاف الرابط قريبًا)",
      description: "مكان مخصص لأول فيديو تعليمي. يمكن إضافة رابط يوتيوب أو فيسبوك من لوحة التحكم.",
      thumbnail: "",
      url: "",
      platform: "youtube",
      category: "تعريفي",
      date: "",
      featured: true,
      published: true,
    },
    {
      id: "vid-2",
      title: "نصيحة غذائية (يُضاف الرابط قريبًا)",
      description: "مكان مخصص لفيديو من صفحة فيسبوك الرسمية.",
      thumbnail: "",
      url: "",
      platform: "facebook",
      category: "نصائح",
      date: "",
      featured: false,
      published: true,
    },
    {
      id: "vid-3",
      title: "معلومة غذائية (يُضاف الرابط قريبًا)",
      description: "مكان مخصص لفيديو من قناة يوتيوب الرسمية.",
      thumbnail: "",
      url: "",
      platform: "youtube",
      category: "نصائح",
      date: "",
      featured: false,
      published: true,
    },
  ],

  // بيانات تجريبية لاختبار التصميم فقط – ليست آراء حقيقية ولا تظهر للزوار أبدًا
  testimonials: [
    {
      id: "demo-1",
      name: "سارة أحمد",
      text: "التجربة كانت منظمة، والمعلومات الغذائية كانت واضحة وسهلة الفهم.",
      rating: 5,
      date: "",
      photo: "",
      anonymous: false,
      isDemo: true,
      permissionObtained: false,
      published: false,
    },
    {
      id: "demo-2",
      name: "منى محمود",
      text: "استفدت من المعلومات الخاصة بتنظيم الوجبات والعادات الغذائية اليومية.",
      rating: 5,
      date: "",
      photo: "",
      anonymous: false,
      isDemo: true,
      permissionObtained: false,
      published: false,
    },
    {
      id: "demo-3",
      name: "ندى محمد",
      text: "طريقة شرح المعلومات كانت بسيطة وساعدتني أفهم أساسيات التغذية بشكل أفضل.",
      rating: 5,
      date: "",
      photo: "",
      anonymous: false,
      isDemo: true,
      permissionObtained: false,
      published: false,
    },
    {
      id: "demo-4",
      name: "آية مصطفى",
      text: "المحتوى كان مفيدًا، وعجبني الاهتمام بتوضيح المعلومات الغذائية بطريقة سهلة.",
      rating: 5,
      date: "",
      photo: "",
      anonymous: false,
      isDemo: true,
      permissionObtained: false,
      published: false,
    },
  ],

  faqs: [
    {
      id: "faq-1",
      q: "كيف تتم الاستشارة داخل العيادة؟",
      a: "تتم الاستشارة بمقابلة شخصية مع د. رشا في العيادة. اطلبي موعدًا عبر واتساب وسيتم إرسال العنوان والمواعيد المتاحة، ويتم تأكيد الحجز بعد التواصل مع الدكتورة.",
      published: true,
    },
    {
      id: "faq-2",
      q: "كيف تتم الاستشارة أونلاين؟",
      a: "الاستشارة أونلاين تتم عن بُعد. اطلبي الحجز عبر واتساب وسيتم إرسال التفاصيل والمواعيد المتاحة، ويتم تأكيد الموعد بعد التواصل مع الدكتورة.",
      published: true,
    },
    {
      id: "faq-3",
      q: "كيف يمكن معرفة عنوان العيادة؟",
      a: "تواصلي معنا عبر واتساب باستخدام زر حجز زيارة العيادة، وسيتم إرسال العنوان ومواعيد الحجز.",
      published: true,
    },
    {
      id: "faq-4",
      q: "إزاي أحجز مع الدكتورة؟",
      a: "اضغطي على «احجز استشارتك» واختاري حجز في العيادة أو أونلاين، وستُفتح محادثة واتساب برسالة جاهزة. الموعد لا يُعتبر مؤكدًا إلا بعد الرد من الدكتورة.",
      published: true,
    },
    {
      id: "faq-5",
      q: "هل يوجد متابعة بعد الاستشارة؟",
      a: "يمكنك الاستفسار عن المتابعة الغذائية وتفاصيلها عبر واتساب، وتُحدَّد آلية المتابعة بالاتفاق مع الدكتورة.",
      published: true,
    },
    {
      id: "faq-6",
      q: "إزاي أقدر أشترك في الكورس؟",
      a: "الاشتراك يتم عبر واتساب. اضغطي على «اشترك في الكورس عبر واتساب» وستصلك تفاصيل الكورس والسعر وطريقة الاشتراك.",
      published: true,
    },
    {
      id: "faq-7",
      q: "هل الكورس مناسب لكل الأشخاص؟",
      a: "الكورس محتوى تثقيفي عام. إذا كان لديك مرض مزمن أو حالة صحية خاصة، يُفضَّل استشارة أخصائي قبل تغيير نظامك الغذائي.",
      published: true,
    },
    {
      id: "faq-8",
      q: "إزاي أتواصل مع الدكتورة؟",
      a: "التواصل الأساسي عبر واتساب على الرقم 01066220846، كما يمكنك متابعة الصفحات الرسمية على فيسبوك وإنستجرام.",
      published: true,
    },
  ],
};
