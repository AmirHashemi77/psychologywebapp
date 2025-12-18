import { FC } from "react";
import Image from "next/image";
import { toPersianNumber } from "@/utils/ToPersionDigits";
import { Metadata, ResolvingMetadata } from "next";
import JsonLd from "@/component/seo/JsonLd";
import { organizationId, organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import { toAbsoluteUrl } from "@/lib/siteUrl";

// نوع داده مقاله - می‌توانید این را در یک فایل types جداگانه قرار دهید
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  imageUrl: string;
}

// داده نمونه - این را با API واقعی جایگزین کنید
const sampleArticle: Article = {
  id: "1",
  title: "روانشناسی رفتار انسان در موقعیت‌های استرس‌زا",
  summary: "در این مقاله به بررسی واکنش‌های روانی و رفتاری افراد در مواجهه با موقعیت‌های استرس‌زا می‌پردازیم و راهکارهای مقابله با آن را ارائه می‌دهیم.",
  author: "دکتر  مرضیه خمسه",
  publishDate: "1403/09/17",
  tags: ["روانشناسی", "استرس", "سلامت روان", "مدیریت استرس"],
  imageUrl: "/images/article-sample.png",
  content: `
    
    <div style={{ lineHeight: "1.8", direction: "rtl", textAlign: "right", fontFamily: "sans-serif" }}>
      <h2>استرس</h2>
      <p>
        استرس یکی از پدیده‌های رایج در زندگی مدرن است که تقریباً همه افراد در طول
        زندگی خود با آن مواجه می‌شوند.
      </p>

      <h3>تعریف استرس</h3>
      <p>
        استرس واکنش بدن به هر تقاضا یا چالشی است که با آن مواجه می‌شود. این واکنش می‌تواند
        فیزیکی، ذهنی یا احساسی باشد.
      </p>

      <h3>انواع استرس</h3>
      <ol>
        <li>
          <strong>استرس حاد:</strong> این نوع استرس کوتاه‌مدت است و معمولاً در پاسخ به یک
          رویداد خاص ایجاد می‌شود.
        </li>
        <li>
          <strong>استرس مزمن:</strong> این نوع استرس طولانی‌مدت است و می‌تواند اثرات جدی بر
          سلامت جسمی و روانی داشته باشد.
        </li>
      </ol>

      <h3>علائم استرس</h3>
      <ul>
        <li>افزایش ضربان قلب</li>
        <li>تنش عضلانی</li>
        <li>اضطراب و نگرانی</li>
        <li>مشکلات خواب</li>
        <li>تغییرات اشتها</li>
      </ul>

      <h3>راهکارهای مدیریت استرس</h3>
      <p>
        یکی از مهم‌ترین راه‌های مقابله با استرس، شناخت منابع آن است. با شناسایی عوامل
        استرس‌زا، می‌توانیم برنامه‌های موثرتری برای مدیریت آن طراحی کنیم.
      </p>

      <h4>تکنیک‌های مقابله</h4>
      <ul>
        <li><strong>تمرینات تنفسی عمیق:</strong> این تکنیک‌ها به آرام‌سازی سیستم عصبی کمک می‌کنند.</li>
        <li><strong>ورزش منظم:</strong> فعالیت بدنی منظم می‌تواند سطح هورمون‌های استرس را کاهش دهد.</li>
        <li><strong>مدیتیشن و یوگا:</strong> این روش‌ها به ذهن کمک می‌کنند تا آرامش یابد.</li>
        <li><strong>حمایت اجتماعی:</strong> صحبت با دوستان و خانواده می‌تواند فشار روانی را کاهش دهد.</li>
      </ul>

      <h3>نتیجه‌گیری</h3>
      <p>
        مدیریت استرس یک مهارت ضروری در زندگی مدرن است. با یادگیری تکنیک‌های مناسب و ایجاد
        عادات سالم، می‌توانیم تأثیرات منفی استرس را کاهش دهیم و کیفیت زندگی خود را بهبود
        بخشیم.
      </p>
    </div>
  
  `,
};

interface ArticleDetailsProps {
  params: {
    id: string;
  };
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// تابع تولید متادیتای داینامیک
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // 1. خواندن پارامتر
  const slug = params.slug;

  // 2. فچ کردن داده (Next.js درخواست‌های تکراری را De-duplicate می‌کند)
  // const product = await fetch(`https://api.example.com/products/${slug}`).then((res) => res.json());
  const article = sampleArticle;
  // 3. دسترسی به تصاویر والد (اختیاری)
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      images: [article.imageUrl],
    },
    alternates: {
      canonical: `/article/${slug}`,
    },
  };
}

const ArticleDetails: FC<ArticleDetailsProps> = ({ params }) => {
  // در اینجا باید داده‌های واقعی مقاله را از API یا دیتابیس دریافت کنید
  // برای مثال: const article = await fetchArticle(params.id);
  const article = sampleArticle;

  // استفاده از params.id برای دریافت مقاله مورد نظر

  return (
    <div className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <JsonLd
        idPrefix="article"
        data={[
          organizationSchema(),
          personSchema(),
          websiteSchema(),
          webPageSchema({
            path: `/article/${params.id}`,
            type: "Article",
            name: article.title,
            description: article.summary,
          }),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${toAbsoluteUrl(`/article/${params.id}`)}#blogposting`,
            url: toAbsoluteUrl(`/article/${params.id}`),
            headline: article.title,
            description: article.summary,
            image: [toAbsoluteUrl(article.imageUrl)],
            inLanguage: "fa-IR",
            keywords: article.tags.join(", "),
            author: { "@id": `${toAbsoluteUrl("/")}#person` },
            publisher: { "@id": organizationId() },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${toAbsoluteUrl(`/article/${params.id}`)}#webpage` },
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
              <span className="font-bold text-sm md:text-base">{toPersianNumber(article.publishDate)}</span>
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
          <Image src="/images/article-sample.png" alt={article.title} fill className="object-cover" priority />
        </div>

        {/* محتوای اصلی مقاله */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="text-foreground font-vazir leading-relaxed space-y-4 whitespace-pre-line text-base md:text-lg font-medium p-5 border-2 border-foreground/50 rounded-2xl"
          />
        </div>

        {/* بخش انتهایی */}
        <footer className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4 font-vazir">
            <div className="text-sm text-foreground/60">آخرین بروزرسانی: {toPersianNumber(article.publishDate)}</div>
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
