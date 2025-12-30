import Image from "next/image";
import { toPersianNumber } from "@/utils/ToPersionDigits";
import { Metadata } from "next";
import JsonLd from "@/component/seo/JsonLd";
import { organizationId, organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import { toAbsoluteUrl } from "@/lib/siteUrl";
import { getArticleItemServices } from "@/services/article.services";
import { notFound } from "next/navigation";

// نوع داده مقاله - می‌توانید این را در یک فایل types جداگانه قرار دهید
interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  image: string;
  status: "draft" | "published";
  tags: string[];
  value: unknown[];
  html: string;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}

const coerceArticle = (value: unknown): Article | null => {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;

  const id = typeof record.id === "string" ? record.id : typeof record.slug === "string" ? record.slug : null;
  if (!id) return null;

  const title = typeof record.title === "string" ? record.title : "";
  const summary = typeof record.summary === "string" ? record.summary : typeof record.subtitle === "string" ? record.subtitle : "";
  const author = typeof record.author === "string" ? record.author : typeof record.authorName === "string" ? record.authorName : "";
  const image = typeof record.image === "string" ? record.image : typeof record.imageUrl === "string" ? record.imageUrl : "/images/article-sample.png";
  const status = record.status === "draft" || record.status === "published" ? record.status : "published";

  const tags = (() => {
    if (Array.isArray(record.tags)) return record.tags.filter((t) => typeof t === "string") as string[];
    if (typeof record.tags === "string")
      return record.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    return [];
  })();

  const valueArray = Array.isArray(record.value) ? (record.value as unknown[]) : [];

  const html =
    typeof record.html === "string"
      ? record.html
      : typeof record.content === "string"
      ? record.content
      : typeof record.contentHtml === "string"
      ? record.contentHtml
      : typeof record.body === "string"
      ? record.body
      : "";

  const createdAt =
    typeof record.createdAt === "string" ? record.createdAt : typeof record.publishDate === "string" ? record.publishDate : typeof record.publishedAt === "string" ? record.publishedAt : "";

  const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : createdAt;

  return { id, title, summary, author, image, status, tags, value: valueArray, html, createdAt, updatedAt };
};

const normalizeArticleItemResponse = (response: unknown): Article | null => {
  if (!response) return null;
  if (response && typeof response === "object") {
    const record = response as Record<string, unknown>;
    return coerceArticle(record.item ?? record.data ?? record.article ?? record.result ?? record);
  }
  return null;
};

const fetchArticle = async (id: string): Promise<Article | null> => {
  const response = await getArticleItemServices(id);
  return normalizeArticleItemResponse(response);
};

type ArticlePageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// تابع تولید متادیتای داینامیک
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;

  const article = await fetchArticle(id);
  if (!article) {
    return {
      title: "مقاله یافت نشد",
      robots: { index: false, follow: false },
      alternates: { canonical: `/article/${id}` },
    };
  }

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      images: [toAbsoluteUrl(article.image)],
    },
    alternates: {
      canonical: `/article/${id}`,
    },
  };
}

const ArticleDetails = async ({ params }: ArticlePageProps) => {
  const { id } = await params;
  const article = await fetchArticle(id);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <JsonLd
        idPrefix="article"
        data={[
          organizationSchema(),
          personSchema(),
          websiteSchema(),
          webPageSchema({
            path: `/article/${id}`,
            type: "Article",
            name: article.title,
            description: article.summary,
          }),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${toAbsoluteUrl(`/article/${id}`)}#blogposting`,
            url: toAbsoluteUrl(`/article/${id}`),
            headline: article.title,
            description: article.summary,
            image: [toAbsoluteUrl(article.image)],
            inLanguage: "fa-IR",
            keywords: article.tags.join(", "),
            author: { "@id": `${toAbsoluteUrl("/")}#person` },
            publisher: { "@id": organizationId() },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${toAbsoluteUrl(`/article/${id}`)}#webpage` },
          },
        ]}
      />
      <article className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="relative mb-8">
            {/* تایتل اصلی */}
            <h1 className="text-4xl md:text-5xl  font-vazir font-black text-primary mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">{article.title}</h1>
          </div>

          {/* اطلاعات نویسنده و تاریخ با طراحی مدرن */}
          <div className="flex items-center gap-6 text-foreground mb-8 font-vazir animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
            <div className="flex items-center gap-3 bg-primary/5 px-4 py-2.5 rounded-full border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <div className="p-1.5 bg-primary rounded-full">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-bold text-sm md:text-base">{article.author}</span>
            </div>

            <div className="flex items-center gap-3 bg-primary/5 px-4 py-2.5 rounded-full border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              <div className="p-1.5 bg-primary rounded-full">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm md:text-base">{toPersianNumber(new Date(article.createdAt).toLocaleDateString("fa", { dateStyle: "long" }))}</span>
            </div>
          </div>

          {/* تگ‌های مقاله */}
          <div className="flex flex-wrap gap-2 mb-8 font-vazir">
            {article.tags.map((tag, index) => (
              <span key={index} className="px-4 py-2 bg-secondary/20 text-primary rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors border border-secondary/30">
                #{tag}
              </span>
            ))}
          </div>

          {/* خلاصه مقاله */}
          <div className="bg-primary/5 border-r-4 border-secondary p-6 rounded-lg mb-8">
            <h2 className="text-xl font-vazir font-bold text-primary mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              خلاصه مقاله
            </h2>
            <p className="text-foreground leading-relaxed text-lg font-vazir">{article.summary}</p>
          </div>
        </header>

        {/* تصویر اصلی مقاله */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl mb-12 border-4 border-secondary/20">
          {article.image.startsWith("http") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" loading="eager" />
          ) : (
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          )}
        </div>

        {/* محتوای اصلی مقاله */}
        <div className="prose prose-lg max-w-none">
          {article.html ? (
            <div
              dangerouslySetInnerHTML={{ __html: article.html }}
              className="text-foreground font-vazir leading-relaxed space-y-4 whitespace-pre-line text-base md:text-lg font-medium p-5 border-2 border-foreground/50 rounded-2xl"
            />
          ) : (
            <div className="text-foreground/70 font-vazir leading-relaxed text-base md:text-lg font-medium p-5 border-2 border-foreground/20 rounded-2xl">محتوایی برای این مقاله ثبت نشده است.</div>
          )}
        </div>

        {/* بخش انتهایی */}
        <footer className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4 font-vazir">
            <div className="text-sm text-foreground/60">آخرین بروزرسانی: {toPersianNumber(new Date(article.updatedAt).toLocaleDateString("fa", { dateStyle: "long" }))}</div>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium cursor-pointer">اشتراک‌گذاری</button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default ArticleDetails;
