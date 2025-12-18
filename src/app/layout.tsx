import type { Metadata } from "next";

import "./globals.css";
import Header from "@/component/common/layout/header/Header";
import Footer from "@/component/common/layout/footer/Footer";
import ClientWrapper from "@/component/ClientWrapper";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  // 2. تنظیم Title با قابلیت Template
  title: {
    default: "مرکز روانشناسی دکتر مرضیه خمسه", // اگر صفحه‌ای تایتل نداشت، این نمایش داده می‌شود
    template: "%s | دکتر مرضیه خمسه", // در صفحات داخلی، %s با تایتل آن صفحه جایگزین می‌شود
  },

  // 3. توضیحات پیش‌فرض
  description: "مرکز روانشناسی دکتر مرضیه خمسه ارائه‌دهنده خدمات مشاوره فردی، زوج‌درمانی و خانواده‌درمانی با رویکرد علمی. رزرو نوبت آنلاین.",

  // 4. تنظیمات ربات‌ها
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 5. شبکه های اجتماعی (Open Graph)
  openGraph: {
    title: "مرکز روانشناسی دکتر مرضیه خمسه",
    description: "مرکز روانشناسی دکتر مرضیه خمسه با ارائه مشاوره تخصصی فردی، زوج‌درمانی و خانواده‌درمانی، همراه شما در مسیر آرامش و بهبود سلامت روان. نوبت‌دهی آنلاین.",
    url: "https://www.example.com",
    siteName: "دکتر مرضیه خمسه",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/whiteLogo.svg", // تصویر پیش‌فرض (1200x630)
        width: 1200,
        height: 630,
        alt: "مرضیه خمسه",
      },
    ],
  },

  // 6. توییتر
  twitter: {
    card: "summary_large_image",
    title: "مرکز روانشناسی دکتر مرضیه خمسه",
    description: "مرکز روانشناسی دکتر مرضیه خمسه با ارائه مشاوره تخصصی فردی، زوج‌درمانی و خانواده‌درمانی، همراه شما در مسیر آرامش و بهبود سلامت روان. نوبت‌دهی آنلاین.",
    images: ["/images/whiteLogo.svg"],
  },

  // 7. Canonical (بسیار مهم)
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
