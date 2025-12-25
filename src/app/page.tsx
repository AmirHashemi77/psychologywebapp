import AboutUsSection from "@/component/modules/AboutUs/AboutUsSection";
import CommentSection from "@/component/modules/home-temp/CommentSection";
import HeroSection from "@/component/modules/home-temp/HeroSection";
import Services from "@/component/modules/home-temp/ServicesSection/Services";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";

const focusKeyword = "بهترین کلینیک روانشناسی تهران";
const title = `مرکز روانشناسی و روان تحلیلی دکتر مرضیه خمسه | ${focusKeyword}`;
const description = `${focusKeyword}؛ مرکز روانشناسی دکتر مرضیه خمسه ارائه‌دهنده خدمات مشاوره فردی، زوج‌درمانی و خانواده‌درمانی با رویکرد علمی. رزرو نوبت آنلاین.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/whiteLogo.svg",
        width: 1200,
        height: 630,
        alt: "مرکز روانشناسی دکتر مرضیه خمسه",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/whiteLogo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    focusKeyword,
    "بهترین کلینینک روانشناسی تهران",
    "روانشناسی",
    "روان‌درمانی",
    "زوج‌درمانی",
    "طرحواره‌درمانی",
    "مشاوره آنلاین",
    "سلامت روان",
    "دکتر مرضیه خمسه",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd
        idPrefix="home"
        data={[
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/",
            name: `صفحه اصلی | ${focusKeyword} | مرکز روانشناسی دکتر مرضیه خمسه`,
            description,
          }),
        ]}
      />
      <HeroSection />
      <Services />
      <AboutUsSection />
      <CommentSection />
    </>
  );
}
