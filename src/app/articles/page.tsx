import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiFilter } from "react-icons/fi";

import { toPersianNumber } from "@/utils/ToPersionDigits";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import { toAbsoluteUrl } from "@/lib/siteUrl";
import FilterTags from "../../component/modules/articles/FilterTags";
import Pagination from "../../component/modules/articles/Pagination";
import { FC } from "react";
import { Metadata } from "next";
import type { ArticleSummary } from "@/data/articles";
import { getArticlesServices } from "@/services/article.services";
import { getTagsServices } from "@/services/tag.services";

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
        .filter(Boolean),
    ),
  );
};

const parsePageNumber = (value?: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
};

const coerceArticle = (value: unknown): ArticleSummary | null => {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;

  const id = typeof record.id === "string" ? record.id : typeof record.slug === "string" ? record.slug : null;
  if (!id) return null;

  const title = typeof record.title === "string" ? record.title : "";
  const subtitle = typeof record.subtitle === "string" ? record.subtitle : typeof record.summary === "string" ? record.summary : "";
  const author = typeof record.author === "string" ? record.author : "";
  const createdAt = typeof record.createdAt === "string" ? record.createdAt : typeof record.createdAt === "string" ? record.createdAt : "";
  const tags = Array.isArray(record.tags) ? (record.tags.filter((t) => typeof t === "string") as string[]) : [];
  const imageUrl = typeof record.imageUrl === "string" ? record.imageUrl : typeof record.image === "string" ? record.image : "/images/article-sample.png";

  return { id, title, subtitle, author, createdAt, tags, imageUrl };
};

const normalizeArticlesResponse = (
  response: unknown,
): {
  items: ArticleSummary[];
  total?: number;
  totalPages?: number;
} => {
  const toItems = (values: unknown) => (Array.isArray(values) ? values.map(coerceArticle).filter(Boolean) : []) as ArticleSummary[];

  if (Array.isArray(response)) {
    return { items: toItems(response) };
  }

  if (response && typeof response === "object") {
    const record = response as Record<string, unknown>;
    const items = toItems(record.items ?? record.data ?? record.articles ?? record.results);

    const total = typeof record.total === "number" ? record.total : typeof record.count === "number" ? record.count : undefined;
    const totalPages = typeof record.totalPages === "number" ? record.totalPages : typeof record.pages === "number" ? record.pages : undefined;

    return { items, total, totalPages };
  }

  return { items: [] };
};

const normalizeTagsResponse = (response: unknown): string[] => {
  const coerceTag = (value: unknown): string | null => {
    if (typeof value === "string") return value.trim() || null;
    if (!value || typeof value !== "object") return null;
    const record = value as Record<string, unknown>;
    const tag = typeof record.name === "string" ? record.name : typeof record.title === "string" ? record.title : typeof record.slug === "string" ? record.slug : null;
    return tag?.trim() || null;
  };

  const toTags = (value: unknown) => (Array.isArray(value) ? (value.map(coerceTag).filter(Boolean) as string[]) : []);

  if (Array.isArray(response)) return toTags(response);
  if (response && typeof response === "object") {
    const record = response as Record<string, unknown>;
    return toTags(record.tags ?? record.data ?? record.items ?? record.results);
  }
  return [];
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
    : "مرجع کامل مقالات علمی روانشناسی، درمان افسردگی، اضطراب، وسواس و مشاوره خانواده زیر نظر دکتر مرضیه خمسه.";

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

  const requestedPage = parsePageNumber(resolvingSearchParams?.page as string);
  const tagParam = activeTags.length ? activeTags.join(",") : undefined;

  const [articlesResponse, tagsResponse] = await Promise.all([getArticlesServices(requestedPage, pageSize, tagParam), getTagsServices().catch(() => undefined)]);

  const { items: fetchedArticles, total, totalPages: apiTotalPages } = normalizeArticlesResponse(articlesResponse);
  const visibleArticles = fetchedArticles;

  const totalArticles = total ?? (requestedPage - 1) * pageSize + visibleArticles.length;
  const totalPages = apiTotalPages ?? (typeof total === "number" ? Math.max(1, Math.ceil(total / pageSize)) : 1);
  const currentPage = Math.min(requestedPage, totalPages);

  const displayStart = visibleArticles.length ? (currentPage - 1) * pageSize + 1 : 0;
  const displayEnd = (currentPage - 1) * pageSize + visibleArticles.length;

  const tagList = (() => {
    const tagsFromApi = normalizeTagsResponse(tagsResponse);
    const fromArticles = Array.from(new Set(fetchedArticles.flatMap((item) => item.tags ?? [])));
    return Array.from(new Set([...tagsFromApi, ...fromArticles, ...activeTags]));
  })();

  return (
    <section className="min-h-screen bg-background pb-16">
      <JsonLd
        idPrefix="articles"
        data={[
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/articles",
            type: "CollectionPage",
            name: "مقالات روانشناسی | دکتر مرضیه خمسه",
            description: "آرشیو مقالات روانشناسی و سلامت روان؛ آموزش مهارت‌های روانی برای زندگی بهتر.",
          }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${toAbsoluteUrl("/articles")}#itemlist`,
            itemListElement: visibleArticles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: toAbsoluteUrl(`/article/${article.id}`),
              name: article.title,
            })),
          },
        ]}
      />
      <Image src="/images/article.png" alt="article-vector" className="hidden xl:block absolute top-2/3 right-0 z-0" width={500} height={200} />
      <div className="relative isolate overflow-hidden bg-gradient-to-l from-primary/10 via-background to-secondary/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 pt-24 text-right">
          <div className="flex items-center gap-3 text-secondary font-vazir text-sm md:text-base">
            <FiFilter className="h-5 w-5" />
            <span> مقالات و یادداشت‌های روانشناسی</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-vazir font-black text-primary leading-tight">مقالات روانشناسی</h1>
          <p className="max-w-3xl text-foreground/80 font-vazir leading-8">لیست جدیدترین مقالات روانشناسی | یادگیری مهارت‌های روانی برای زندگی بهتر </p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-vazir text-foreground/70">
            <span className="rounded-full bg-primary/10 px-4 py-2 font-bold text-primary">مجموع: {toPersianNumber(totalArticles)} مقاله</span>
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
                      {article.imageUrl.startsWith("http") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <Image src={article.imageUrl} alt={article.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                      )}
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
                          <span>{toPersianNumber(new Date(article.createdAt).toLocaleDateString("fa", { dateStyle: "long" }))}</span>
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
