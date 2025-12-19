import AboutUsSection from "@/component/modules/AboutUs/AboutUsSection";
import CommentSection from "@/component/modules/home-temp/CommentSection";
import HeroSection from "@/component/modules/home-temp/HeroSection";
import Services from "@/component/modules/home-temp/ServicesSection/Services";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";

const title = "مـــرکز روانـــشنــاسی و روان تحلیلی دکتر مــــرضیه خـــمســه";
const description = "مرکز روانشناسی دکتر مرضیه خمسه ارائه‌دهنده خدمات مشاوره فردی، زوج‌درمانی و خانواده‌درمانی با رویکرد علمی. رزرو نوبت آنلاین.";

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
  keywords: ["روانشناسی", "روان‌درمانی", "زوج‌درمانی", "طرحواره‌درمانی", "مشاوره آنلاین", "سلامت روان", "دکتر مرضیه خمسه"],
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
            name: "صفحه اصلی | مرکز روانشناسی دکتر مرضیه خمسه",
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
