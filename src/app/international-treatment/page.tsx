import { Metadata } from "next";
import { FC } from "react";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "مشاوره خارج از کشور",
  description: "مشاوره آنلاین برای ایرانیان خارج از کشور با امکان رزرو وقت از طریق تلگرام و حفظ کیفیت درمان.",
  alternates: {
    canonical: "/international-treatment",
  },
};

const TELEGRAM_NUMBER = "۰۰۹۸۹۳۰۴۳۹۰۱۱۷";
const TELEGRAM_LINK = "https://t.me/+989304390117";

const InternationalTreatmentPage: FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 pt-32 pb-16">
      <JsonLd
        idPrefix="international-treatment"
        data={[
          organizationSchema(),
          personSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/international-treatment",
            name: "مشاوره خارج از کشور | دکتر مرضیه خمسه",
            description: "مشاوره آنلاین برای ایرانیان خارج از کشور با رزرو وقت از طریق تلگرام. جلسات با استانداردهای حرفه‌ای و حفظ کیفیت درمانی برگزار می‌شود.",
          }),
        ]}
      />

      <section className="bg-white/70 border border-primary/10 rounded-2xl p-8 shadow-sm">
        <p className="text-secondary font-vazir font-bold text-lg mb-3">برای ایرانیان خارج از کشور</p>
        <h1 className="text-foreground font-vazir font-bold text-3xl mb-4">مشاوره خارج از کشور</h1>
        <p className="text-foreground/80 font-vazir leading-9">
          اگر خارج از ایران زندگی می‌کنید و نیاز به جلسات روان‌درمانی/مشاوره دارید، می‌توانید به صورت آنلاین (تصویری یا صوتی) با زمان‌بندی متناسب با اختلاف ساعت، جلسه رزرو کنید.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          {["جلسات آنلاین با هماهنگی اختلاف ساعت", "امکان ادامه درمان به‌صورت منظم", "حفظ محرمانگی و چارچوب حرفه‌ای", "هماهنگی سریع برای تعیین وقت"].map((item) => (
            <div key={item} className="rounded-xl border border-primary/15 bg-primary/90 px-4 py-3">
              <p className="text-primary-foreground font-vazir text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">نحوه رزرو وقت از طریق تلگرام</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            برای رزرو وقت، کافی است در تلگرام پیام بدهید. همکاران ما زمان‌های پیشنهادی را (براساس کشور/شهر شما) هماهنگ می‌کنند و جزئیات جلسه ارسال می‌شود.
          </p>

          <div className="rounded-xl border border-primary/15 bg-primary/90 px-4 py-4 mb-4">
            <p className="text-primary-foreground font-vazir text-sm">تلگرام</p>
            <p className="text-primary-foreground font-vazir font-bold text-lg" dir="ltr">
              {TELEGRAM_NUMBER}
            </p>
            <a className="inline-flex mt-3 text-primary-foreground/90 font-vazir font-semibold underline underline-offset-4" href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
              رزرو وقت از طریق تلگرام
            </a>
          </div>

          <h3 className="text-foreground font-vazir font-bold text-xl mb-2">برای هماهنگی سریع، این موارد را ارسال کنید:</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {["نام و نام‌خانوادگی", "کشور/شهر محل سکونت (برای اختلاف ساعت)", "موضوع کلی مراجعه (در حد چند کلمه)", "روزها و ساعت‌های پیشنهادی شما"].map((item) => (
              <li key={item} className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-foreground/90 font-vazir leading-8">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">اطمینان از کیفیت مشاوره</h3>
          <ul className="space-y-3 text-foreground/80 font-vazir leading-8">
            <li>جلسات با همان چارچوب حرفه‌ای درمان حضوری و با زمان مشخص برگزار می‌شود.</li>
            <li>در آغاز، ارزیابی اولیه انجام می‌شود و مسیر درمانی/اهداف جلسه شفاف می‌گردد.</li>
            <li>محرمانگی، حریم خصوصی و اصول اخلاقی درمان به طور کامل رعایت می‌شود.</li>
            <li>برای ثبات درمان، پیگیری و برنامه‌ریزی منظم جلسات پیشنهاد می‌شود.</li>
            <li>در صورت نیاز، تمرین‌ها و توصیه‌های بین جلسات برای پیشرفت بهتر ارائه می‌شود.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
        <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">پاسخ به چند سؤال رایج</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              q: "جلسات به چه صورت برگزار می‌شود؟",
              a: "جلسات آنلاین (ویدئویی یا صوتی) انجام می‌شود و قبل از جلسه، راهنمای اتصال و زمان دقیق برای شما ارسال می‌گردد.",
            },
            {
              q: "اگر اختلاف ساعت زیاد باشد چه می‌شود؟",
              a: "با توجه به کشور/شهر شما، چند بازه زمانی مناسب پیشنهاد می‌شود تا جلسه در ساعت قابل‌قبول برای شما تنظیم شود.",
            },
            {
              q: "آیا کیفیت درمان آنلاین مثل حضوری است؟",
              a: "با رعایت چارچوب حرفه‌ای، تداوم جلسات و ارتباط درمانی مناسب، درمان آنلاین می‌تواند کیفیت بالایی داشته باشد و برای بسیاری از مراجعان مؤثر است.",
            },
            {
              q: "برای شروع چه کار کنم؟",
              a: "در تلگرام پیام بدهید و نام، کشور/شهر و زمان‌های پیشنهادی را ارسال کنید تا هماهنگی انجام شود.",
            },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-primary/10 bg-primary/5 p-5">
              <h3 className="text-foreground font-vazir font-bold text-lg mb-2">{item.q}</h3>
              <p className="text-foreground/80 font-vazir leading-8">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InternationalTreatmentPage;
