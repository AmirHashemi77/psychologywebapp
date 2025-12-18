import AboutUsSection from "@/component/modules/AboutUs/AboutUsSection";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "دکتر مرضیه خمسه یک روان‌درمانگر و روان‌شناس ایرانی و عضو انجمن روانشناسی امریکا (APA) است. ایشان با بیش از ۱۷ سال تجربه در مشاوره و جلسات روان‌تحلیلی، خدمات تخصصی خود را به صورت حضوری و غیرحضوری (آنلاین) به ایرانیان داخل و خارج از کشور ارائه می‌نماید.",
  alternates: {
    canonical: "/aboutus",
  },
};

const AboutUsPage: FC = () => {
  return (
    <div className="mt-40 max-w-4xl mx-auto">
      <JsonLd
        idPrefix="aboutus"
        data={[
          organizationSchema(),
          personSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/aboutus",
            type: "AboutPage",
            name: "درباره ما | دکتر مرضیه خمسه",
            description:
              "دکتر مرضیه خمسه یک روان‌درمانگر و روان‌شناس ایرانی و عضو انجمن روانشناسی امریکا (APA) است. ایشان با بیش از ۱۷ سال تجربه در مشاوره و جلسات روان‌تحلیلی، خدمات تخصصی خود را به صورت حضوری و غیرحضوری (آنلاین) ارائه می‌نماید.",
          }),
        ]}
      />
      <AboutUsSection hasBrain={false} />
    </div>
  );
};
export default AboutUsPage;
