import AboutUsSection from "@/component/modules/AboutUs/AboutUsSection";
import CommentSection from "@/component/modules/home-temp/CommentSection";
import HeroSection from "@/component/modules/home-temp/HeroSection";
import Services from "@/component/modules/home-temp/ServicesSection/Services";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";

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
            description: "مرکز روانشناسی دکتر مرضیه خمسه ارائه‌دهنده خدمات مشاوره فردی، زوج‌درمانی و خانواده‌درمانی با رویکرد علمی. رزرو نوبت آنلاین.",
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
