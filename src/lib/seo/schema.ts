import { getSiteUrl, toAbsoluteUrl } from "@/lib/siteUrl";

const BRAND_NAME = "مرکز روانشناسی دکتر مرضیه خمسه";
const DOCTOR_NAME = "دکتر مرضیه خمسه";
const INSTAGRAM_URL = "http://www.instagram.com/khamseh_1216";

export const organizationId = (): string => `${getSiteUrl()}/#organization`;
export const websiteId = (): string => `${getSiteUrl()}/#website`;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId(),
  name: BRAND_NAME,
  url: getSiteUrl(),
  logo: toAbsoluteUrl("/images/whiteLogo.svg"),
  sameAs: [INSTAGRAM_URL],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+989304390117",
      email: "info@drkhamseh.com",
      availableLanguage: ["fa", "en"],
    },
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId(),
  url: getSiteUrl(),
  name: BRAND_NAME,
  inLanguage: "fa-IR",
  publisher: { "@id": organizationId() },
});

export const webPageSchema = (args: { path: string; name: string; description?: string; type?: string }) => ({
  "@context": "https://schema.org",
  "@type": args.type ?? "WebPage",
  "@id": `${toAbsoluteUrl(args.path)}#webpage`,
  url: toAbsoluteUrl(args.path),
  name: args.name,
  description: args.description,
  inLanguage: "fa-IR",
  isPartOf: { "@id": websiteId() },
  about: { "@id": organizationId() },
});

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${getSiteUrl()}/#person`,
  name: DOCTOR_NAME,
  url: getSiteUrl(),
  sameAs: [INSTAGRAM_URL],
});

