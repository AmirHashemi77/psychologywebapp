import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiFilter } from "react-icons/fi";

import { toPersianNumber } from "@/utils/ToPersionDigits";
import FilterTags from "../../component/modules/articles/FilterTags";
import Pagination from "../../component/modules/articles/Pagination";
import { FC } from "react";
import { Metadata } from "next";

type Article = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  tags: string[];
  imageUrl: string;
};

const articles: Article[] = [
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

const pageSize = 6;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const normalizeTags = (value?: string | string[]): string[] => {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return Array.from(
    new Set(
      values
        .flatMap((item) => item.split(","))
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
};

const parsePageNumber = (value?: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  // در Next.js 15 باید searchParams را await کنید
  const sp = await searchParams;

  // استخراج پارامترها
  const page = Number(sp?.page) || 1;
  const rawTags = sp?.tag;
  const activeTags = rawTags ? (Array.isArray(rawTags) ? rawTags : [rawTags]).join("، ") : null;

  // 2. ساخت تایتل هوشمند
  // مثال خروجی: "مقالات اضطراب و افسردگی - صفحه ۲ | نام برند"
  let title = "مقالات روانشناسی و سلامت روان";
  if (activeTags) {
    title = `مقالات درباره ${activeTags}`;
  }
  if (page > 1) {
    title += ` - صفحه ${toPersianNumber(page)}`;
  }

  // 3. ساخت توضیحات (Description)
  const description = activeTags
    ? `لیست جدیدترین مقالات و مطالب علمی روانشناسی پیرامون موضوعات ${activeTags}. راهکارهای علمی برای بهبود کیفیت زندگی.`
    : "مرجع کامل مقالات علمی روانشناسی، درمان افسردگی، اضطراب، وسواس و مشاوره خانواده زیر نظر تیم درمان خمسه.";

  // 4. ساخت آدرس کانونیکال (برای جلوگیری از Duplicate Content)
  // پارامترهای URL را بازسازی می‌کنیم
  const params = new URLSearchParams();
  if (sp?.tag) {
    const tagsArr = Array.isArray(sp.tag) ? sp.tag : [sp.tag];
    tagsArr.forEach((t) => params.append("tag", t));
  }
  if (page > 1) params.set("page", page.toString());

  const queryString = params.toString();
  const canonicalPath = `/articles${queryString ? `?${queryString}` : ""}`;

  return {
    title: title,
    description: description,

    // تنظیمات Open Graph برای اشتراک‌گذاری در سوشال مدیا
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: canonicalPath,
      images: [
        {
          // تصویر پیش‌فرض بخش بلاگ (حتما این فایل را در public قرار دهید)
          url: "/images/blog-og-cover.jpg",
          width: 1200,
          height: 630,
          alt: "آرشیو مقالات روانشناسی",
        },
      ],
    },

    // آدرس کانونیکال
    alternates: {
      canonical: canonicalPath,
    },

    // ربات‌ها: صفحه اول و تگ‌های اصلی ایندکس شوند
    robots: {
      index: true,
      follow: true,
    },
  };
}

const page: FC<PageProps> = async ({ searchParams }) => {
  const resolvingSearchParams = await searchParams;
  const activeTags = normalizeTags(resolvingSearchParams?.tag);

  const totalArticles = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / pageSize));
  const currentPage = Math.min(parsePageNumber(resolvingSearchParams?.page as string), totalPages);
  const visibleArticles = articles.slice(0, pageSize);
  const displayStart = totalArticles ? 1 : 0;
  const displayEnd = Math.min(pageSize, totalArticles);
  const tagList = Array.from(new Set(articles.flatMap((item) => item.tags)));

  return (
    <section className="min-h-screen bg-background pb-16">
      <Image src="/images/article.png" alt="article-vector" className="hidden xl:block absolute top-2/3 right-0 z-0" width={500} height={200} />
      <div className="relative isolate overflow-hidden bg-gradient-to-l from-primary/10 via-background to-secondary/10">
        <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -right-14 bottom-6 h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 pt-24 text-right">
          <div className="flex items-center gap-3 text-secondary font-vazir text-sm md:text-base">
            <FiFilter className="h-5 w-5" />
            <span> مقالات و یادداشت‌های روانشناسی</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-vazir font-black text-primary leading-tight">مقالات روانشناسی</h1>
          <p className="max-w-3xl text-foreground/80 font-vazir leading-8">لیست جدیدترین مقالات روانشناسی | یادگیری مهارت‌های روانی برای زندگی بهتر </p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-vazir text-foreground/70">
            <span className="rounded-full bg-primary/10 px-4 py-2 font-bold text-primary">مجموع: {toPersianNumber(articles.length)} مقاله</span>
            {activeTags.length > 0 ? (
              <Link href="/articles" className="rounded-full border border-secondary/40 px-4 py-2 text-secondary transition hover:bg-secondary/10 cursor-pointer">
                پاک کردن فیلترها
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 -mt-10 lg:-mt-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <aside className="order-1 lg:col-span-1">
            <FilterTags tags={tagList} activeTags={activeTags} />
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-3 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-3 text-sm font-vazir text-foreground/70 p-3 rounded-2xl border border-primary/10 bg-white/80 shadow-xl shadow-primary/10 backdrop-blur ">
              <div>
                نمایش {toPersianNumber(displayStart)} تا {toPersianNumber(displayEnd)} از {toPersianNumber(totalArticles)} مقاله
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{activeTags.length ? `تگ‌های فعال: ${activeTags.map((tag) => `#${tag}`).join("، ")}` : "بدون فیلتر تگ"}</span>
            </div>

            {visibleArticles.length ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg shadow-primary/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      <div className="absolute right-3 top-3 flex flex-wrap gap-2">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="rounded-full bg-white/90 px-3 py-1 text-xs font-vazir text-primary shadow">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="flex items-center justify-between text-xs font-vazir text-foreground/70">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="h-4 w-4" />
                          <span>{toPersianNumber(article.publishDate)}</span>
                        </div>
                        <span className="rounded-full bg-primary/5 px-2 py-1 text-primary">{article.author}</span>
                      </div>
                      <h3 className="text-lg font-vazir font-extrabold text-primary leading-snug">
                        <Link className="text-lg font-vazir font-extrabold text-primary leading-snug" href={`/article/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm font-vazir text-foreground/80 leading-7">{article.subtitle}</p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-primary/10 bg-primary/5 px-2 py-1 text-[11px] font-vazir text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-10 text-center font-vazir text-primary">هیچ مقاله‌ای با تگ‌های انتخابی یافت نشد.</div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
