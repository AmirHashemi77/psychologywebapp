import { FC } from "react";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";

const serviceItems = [
  "روان‌درمانگر تحلیلی",
  "طرحواره‌درمانی",
  "زوج‌درمانگر",
  "روان‌درمانی تحلیلی فردی",
  "مشاوره روابط بین‌فردی",
  "مشاوره پیش از ازدواج و پیش‌بینی ریسک",
  "مشاوره افسردگی",
  "مشاوره بهداشت روان: افسردگی، کنترل خشم، اضطراب، استرس، کمال‌گرایی افراطی، عدم اعتمادبه‌نفس و...",
  "کنترل ذهن و بهبود تمرکز",
  "وسواس و نشخوار فکری",
  "مشاوره آنلاین و تلفنی",
  "آموزش مهارت‌های زندگی: کنترل خشم و پرخاشگری، حل مسئله، اعتمادبه‌نفس، نه گفتن، روابط اجتماعی و...",
];

const educationAndCareer = [
  "دانشجوی دکتری روان‌شناسی، واحد علوم و تحقیقات تهران",
  "کارشناسی ارشد روان‌شناسی از دانشگاه خوارزمی تهران",
  "کارشناسی علوم تربیتی از دانشگاه علامه طباطبایی",
  "دارای پروانه اشتغال از سازمان نظام روان‌شناسی و مشاوره ایران",
  "مؤلف ۸ جلد کتاب در حوزه روان‌شناسی",
  "تدریس مهارت‌های زندگی در دوره ابتدایی",
  "بیش از ۸۵۰ ساعت کارورزی در اتاق درمان مرکز مشاوره نفت",
  "چاپ مقالات روان‌شناسی در ماهنامه مشاوره شرکت ملی نفت",
];

const trainings = [
  "دوره رفتاردرمانی-شناختی (CBT) در دانشگاه تهران",
  "دوره‌های متعدد پیشرفته طرحواره‌درمانی",
  "دوره نشخوار فکری",
  "دوره شکست عشقی و عاطفی",
  "دوره زوج‌درمانی",
  "دوره درمان هیجان‌مدار",
  "دوره سبک‌های فرزندپروری در دانشگاه تهران",
  "دوره خانواده‌درمانی در دانشگاه تهران",
  "دوره تشخیص و درمان اختلالات یادگیری در دانشگاه الزهراء",
];

const memberships = ["عضو انجمن روان‌شناسی آمریکا (APA)", "عضو سازمان نظام روان‌شناسی و مشاوره ایران", "عضو انجمن روان‌شناسی ایران", "عضو سرای اهل قلم"];

const ServicesPage: FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 pt-32 pb-16">
      <JsonLd
        idPrefix="services"
        data={[
          organizationSchema(),
          personSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/services",
            name: "خدمات | دکتر مرضیه خمسه",
            description:
              "خدمات روان‌درمانی و مشاوره فردی، زوج‌درمانی، طرحواره‌درمانی، مشاوره آنلاین و تلفنی زیر نظر دکتر مرضیه خمسه.",
          }),
        ]}
      />
      <section className="bg-white/70 border border-primary/10 rounded-2xl p-8 shadow-sm">
        <p className="text-secondary font-vazir font-bold text-lg mb-3">خدمات</p>
        <h1 className="text-foreground font-vazir font-bold text-3xl mb-4">دکتر مرضیه خمسه</h1>
        <p className="text-foreground/80 font-vazir leading-9">
          دکتر مرضیه خمسه روان‌درمانگر و روان‌شناس ایرانی با بیش از ۱۷ سال تجربه در جلسات حضوری و آنلاین (برای ایرانیان داخل و خارج از کشور) است. عضو انجمن روان‌شناسی آمریکا (APA) و فعال در تهران برای
          ارائه درمان تحلیلی، طرحواره‌درمانی، زوج‌درمانی و مشاوره فردی و بین‌فردی.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          {["۱۷+ سال تجربه مشاوره حضوری و آنلاین", "عضو انجمن روان‌شناسی آمریکا (APA)", "ارائه خدمات در تهران و به صورت آنلاین", "تجربه کار با مراجعان داخل و خارج از کشور"].map((item) => (
            <div key={item} className="rounded-xl border border-primary/15 bg-primary/90 px-4 py-3">
              <p className="text-primary-foreground font-vazir text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-4">حوزه‌های تخصصی</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {serviceItems.map((service) => (
              <li key={service} className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-foreground/90 font-vazir leading-8">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">هماهنگی و نوبت</h3>
          <p className="text-foreground/80 font-vazir leading-8 mb-3">برای رزرو جلسات حضوری، تلفنی یا آنلاین لطفاً در تلگرام پیام ارسال کنید.</p>
          <div className="rounded-xl border border-primary/15 bg-primary/90 px-4 py-4">
            <p className="text-primary-foreground font-vazir text-sm">تلگرام</p>
            <p className="text-primary-foreground font-vazir font-bold text-lg" dir="ltr">
              00989304390117
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-foreground/80 font-vazir">آدرس: سعادت‌آباد، میدان کتاب، انتهای بلوار کوهستان</p>
            <a href="http://www.instagram.com/khamseh_1216" className="text-primary font-vazir font-semibold hover:underline">
              اینستاگرام: khamseh_1216
            </a>
          </div>
        </div>
      </section>

      <section className="mt-10 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
        <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">خدمات آنلاین</h2>
        <p className="text-foreground/80 font-vazir leading-9">
          ارائه خدمات تخصصی روان‌شناسی به ایرانیان خارج از کشور و امکان برگزاری جلسات آنلاین یا تلفنی با حفظ کیفیت درمانی. برای هماهنگی، پیام تلگرامی به شماره 00989304390117 ارسال شود.
        </p>
      </section>
    </div>
  );
};

export default ServicesPage;
