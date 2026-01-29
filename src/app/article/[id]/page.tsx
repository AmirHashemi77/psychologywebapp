import Image from "next/image";
import { toPersianNumber } from "@/utils/ToPersionDigits";
import { Metadata } from "next";
import JsonLd from "@/component/seo/JsonLd";
import { organizationId, organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import { toAbsoluteUrl } from "@/lib/siteUrl";
import { getArticleItemServices } from "@/services/article.services";
import { notFound } from "next/navigation";
import React from "react";

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

type SlateText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

type SlateElement = {
  type?: string;
  align?: "left" | "center" | "right";
  url?: string;
  children?: SlateNode[];
  [key: string]: unknown;
};

type SlateNode = SlateText | SlateElement;

const isTextNode = (node: unknown): node is SlateText => !!node && typeof node === "object" && "text" in node && typeof (node as { text?: unknown }).text === "string";

const isElementNode = (node: unknown): node is SlateElement => !!node && typeof node === "object" && "children" in node && Array.isArray((node as { children?: unknown }).children);

const sanitizeUrl = (raw: string) => {
  const url = raw.trim();
  const lower = url.toLowerCase();
  if (!url) return "#";
  if (lower.startsWith("http://") || lower.startsWith("https://")) return url;
  if (lower.startsWith("data:") || lower.startsWith("blob:")) return url;
  if (lower.startsWith("mailto:") || lower.startsWith("tel:")) return url;
  return "#";
};

const getAlignClass = (align?: SlateElement["align"]) => {
  if (align === "left") return "text-left";
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-right";
};

const renderTextNode = (node: SlateText, key: string) => {
  let content: React.ReactNode = node.text;

  if (node.code) {
    content = <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.95em] text-slate-700 ring-1 ring-inset ring-slate-200">{content}</code>;
  }
  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;

  return <React.Fragment key={key}>{content}</React.Fragment>;
};

const extractCodeText = (nodes: SlateNode[]) =>
  nodes
    .map((node) => {
      if (isTextNode(node)) return node.text;
      if (isElementNode(node) && node.children) return extractCodeText(node.children);
      return "";
    })
    .join("\n");

const renderNode = (node: SlateNode, key: string): React.ReactNode => {
  if (isTextNode(node)) return renderTextNode(node, key);
  if (!isElementNode(node)) return null;

  const alignClass = getAlignClass(node.align);
  const children = (node.children ?? []).map((child, index) => renderNode(child, `${key}-${index}`));

  switch (node.type) {
    case "link":
      return (
        <a
          key={key}
          href={sanitizeUrl(typeof node.url === "string" ? node.url : "")}
          className="text-primary underline decoration-slate-300 underline-offset-4 hover:text-primary hover:decoration-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white font-bold"
        >
          {children}
        </a>
      );
    case "paragraph":
      return (
        <p key={key} className={`my-4 text-base md:text-lg leading-9 md:leading-10 text-slate-600 ${alignClass}`}>
          {children.length > 0 ? children : <br />}
        </p>
      );
    case "heading-two":
      return (
        <h2 key={key} className={`mt-16 scroll-mt-24 text-2xl font-bold !leading-tight tracking-tight text-primary sm:text-3xl md:text-4xl ${alignClass}`}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 key={key} className={`mt-8 scroll-mt-24 text-xl font-semibold !leading-snug tracking-tight text-primary sm:text-2xl md:text-3xl ${alignClass}`}>
          {children}
        </h3>
      );
    case "heading-one":
      return (
        <h2 key={key} className={`mt-16 scroll-mt-24 text-3xl font-bold !leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl ${alignClass}`}>
          {children}
        </h2>
      );
    case "block-quote":
      return (
        <blockquote key={key} className={`my-6 rounded-xl border-r-4 border-primary bg-slate-50 px-4 py-3 text-base md:text-lg italic leading-9 md:leading-10 text-slate-600 ${alignClass}`}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul key={key} className={`my-6 list-disc space-y-3 pr-6 text-base md:text-lg leading-9 md:leading-10 text-slate-600 marker:text-slate-400 ${alignClass}`}>
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol key={key} className={`my-6 list-decimal space-y-3 pr-6 text-base md:text-lg leading-9 md:leading-10 text-slate-600 marker:text-slate-400 ${alignClass}`}>
          {children}
        </ol>
      );
    case "list-item":
      return (
        <li key={key} className="leading-9 md:leading-10">
          {children}
        </li>
      );
    case "code-block": {
      const codeText = extractCodeText(node.children ?? []);
      return (
        <pre key={key} className="my-6 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm md:text-base leading-7 text-slate-600">
          <code>{codeText}</code>
        </pre>
      );
    }
    case "image": {
      const imageNode = node as { url?: string; alt?: string; width?: number; align?: SlateElement["align"] };
      const url = sanitizeUrl(typeof imageNode.url === "string" ? imageNode.url : "");
      const alt = typeof imageNode.alt === "string" ? imageNode.alt : "";
      const width = typeof imageNode.width === "number" ? Math.max(10, Math.min(imageNode.width, 100)) : undefined;
      const alignClass = imageNode.align === "center" ? "justify-center" : imageNode.align === "left" ? "justify-start" : "justify-end";
      const widthStyle = width ? { width: `${width}%` } : undefined;

      return (
        <figure key={key} className={`my-6 flex ${alignClass}`}>
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm" style={widthStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={alt} className="h-auto w-full rounded-xl object-cover" />
            {alt ? <figcaption className="mt-2 text-center text-xs text-slate-500">{alt}</figcaption> : null}
          </div>
        </figure>
      );
    }
    default:
      return (
        <p key={key} className={`my-4 text-base md:text-lg leading-9 md:leading-10 text-slate-600 ${alignClass}`}>
          {children}
        </p>
      );
  }
};

const renderSlateValue = (value: unknown[]) => value.map((node, index) => renderNode(node as SlateNode, `node-${index}`));

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

  const valueArray = (() => {
    if (Array.isArray(record.value)) return record.value as unknown[];
    if (typeof record.value === "string") {
      try {
        const parsed = JSON.parse(record.value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  })();

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-vazir font-black text-primary mb-6 !leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">{article.title}</h1>
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
            <p className="text-foreground/80 leading-9 md:leading-10 text-base md:text-lg font-vazir">{article.summary}</p>
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
          {article.value.length > 0 ? (
            <div className="text-foreground/80 font-vazir leading-9 md:leading-10 space-y-5 whitespace-pre-line text-base md:text-lg font-medium p-5 border-2 border-foreground/50 rounded-2xl">
              {renderSlateValue(article.value)}
            </div>
          ) : (
            <div className="text-foreground/60 font-vazir leading-9 md:leading-10 text-base md:text-lg font-medium p-5 border-2 border-foreground/20 rounded-2xl">
              محتوایی برای این مقاله ثبت نشده است.
            </div>
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
