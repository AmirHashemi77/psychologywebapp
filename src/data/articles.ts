export type ArticleSummary = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  tags: string[];
  imageUrl: string;
};

export const articles: ArticleSummary[] = [
  {
    id: "stress-management",
    title: "مدیریت استرس در زندگی روزمره",
    subtitle: "تمرین‌های ساده برای آرام کردن ذهن و کاهش تنش‌های روزانه.",
    author: "دکتر مرضیه خمسه",
    publishDate: "1403/09/12",
    tags: ["استرس", "سلامت روان", "مدیتیشن"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "healthy-boundaries",
    title: "چطور مرزهای سالم در رابطه ایجاد کنیم؟",
    subtitle: "گام‌به‌گام تا ساختن احترام متقابل در روابط عاطفی و کاری.",
    author: "تیم درمان خمسه",
    publishDate: "1403/08/28",
    tags: ["روابط", "زوج درمانی", "خودشناسی"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "sleep-hygiene",
    title: "بهداشت خواب و تاثیر آن بر مغز",
    subtitle: "چگونه با عادت‌های کوچک، کیفیت خواب و تمرکز را بالا ببریم.",
    author: "دکتر مرضیه خمسه",
    publishDate: "1403/08/10",
    tags: ["سلامت روان", "خواب", "آرامش"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "anxiety-grounding",
    title: "تکنیک گراندینگ برای اضطراب",
    subtitle: "آموزش تکنیک ۵-۴-۳-۲-۱ برای بازگرداندن ذهن به لحظه حال.",
    author: "تیم درمان خمسه",
    publishDate: "1403/07/30",
    tags: ["اضطراب", "ذهن آگاهی", "تمرین عملی"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "children-emotions",
    title: "همدلی با احساسات کودکان",
    subtitle: "چگونه والدین می‌توانند تنظیم هیجانی را به فرزندان بیاموزند.",
    author: "دکتر مرضیه خمسه",
    publishDate: "1403/07/15",
    tags: ["والدگری", "کودک", "سلامت خانواده"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "self-compassion",
    title: "خودمهربانی؛ مهارتی برای درمان افسردگی",
    subtitle: "با تکنیک‌های مبتنی بر شفقت، گفتگوی درونی را تغییر دهید.",
    author: "تیم درمان خمسه",
    publishDate: "1403/06/28",
    tags: ["افسردگی", "خودشناسی", "سلامت روان"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "anger-mapping",
    title: "نقشه خشم؛ از محرک تا واکنش سالم",
    subtitle: "شناخت چرخه خشم و راهکارهای توقف قبل از انفجار.",
    author: "دکتر مرضیه خمسه",
    publishDate: "1403/06/05",
    tags: ["خشم", "کنترل احساسات", "زوج درمانی"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "productivity-balance",
    title: "تعادل بهره‌وری و استراحت",
    subtitle: "پروتکل ۵۰/۱۰ برای جلوگیری از فرسودگی شغلی.",
    author: "تیم درمان خمسه",
    publishDate: "1403/05/18",
    tags: ["فرسودگی", "سلامت روان", "محیط کار"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "communication-art",
    title: "هنر گوش دادن فعال",
    subtitle: "سه مرحله برای شنیدن، فهمیدن و پاسخ دادن بدون قضاوت.",
    author: "دکتر مرضیه خمسه",
    publishDate: "1403/05/02",
    tags: ["روابط", "زوج درمانی", "مهارت ارتباطی"],
    imageUrl: "/images/article-sample.png",
  },
  {
    id: "grief-processing",
    title: "سوگ؛ مسیر عبور از فقدان",
    subtitle: "راه‌هایی برای پذیرش، بیان و معنا دادن به غم از دست دادن.",
    author: "تیم درمان خمسه",
    publishDate: "1403/04/21",
    tags: ["سوگ", "سلامت روان", "ذهن آگاهی"],
    imageUrl: "/images/article-sample.png",
  },
];

