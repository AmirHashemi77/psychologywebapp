import { Metadata } from "next";
import Image from "next/image";
import { FC, FormEvent } from "react";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با ما در ارتباط باشید",
  alternates: {
    canonical: "/contactus",
  },
};

const ContactUsPage: FC = () => {
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

  return (
    <div className="w-full relative overflow-hidden">
      <JsonLd
        idPrefix="contactus"
        data={[
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            path: "/contactus",
            type: "ContactPage",
            name: "تماس با ما | دکتر مرضیه خمسه",
            description: "برای رزرو وقت مشاوره، پرسش درباره خدمات یا هماهنگی جلسات آنلاین و حضوری، از راه‌های ارتباطی این صفحه استفاده کنید.",
          }),
        ]}
      />
      <Image src="/images/conectUs.png" width={500} height={400} alt="phone" className="hidden xl:block absolute -right-24 top-42 -z-10 opacity-50 " />
      <div className="max-w-5xl w-full mx-auto px-5 pt-32 lg:pt-32 ">
        <div className="text-center space-y-10 mb-10">
          <p className="text-secondary font-vazir font-bold text-lg">در ارتباط باشیم</p>
          <h1 className="text-foreground font-vazir font-bold text-3xl">تماس با دکتر مرضیه خمسه</h1>
          <p className="text-foreground/70 font-vazir text-base leading-relaxed">
            برای رزرو وقت مشاوره، پرسش درباره خدمات یا هماهنگی جلسات آنلاین و حضوری، از راه‌های زیر با ما تماس بگیرید. پاسخ‌گویی در سریع‌ترین زمان ممکن انجام می‌شود.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "شماره تماس", value: "۰۹۳۰-۴۳۹-۰۱۱۷", note: "پاسخ گویی شنبه تا چهارشنبه ۹ تا ۱۴ و ۱۸:۳۰ تا ۲۰" },
            { title: "تلگرام", value: "۰۹۳۰-۴۳۹-۰۱۱۷", note: "برای هماهنگی جلسات آنلاین" },
            { title: "ایمیل", value: "info@drkhamseh.com", note: "ارسال پرسش‌ها و مدارک" },
            { title: "آدرس مطب", value: "سعادت آباد ، میدان کتاب ، انتهای بلوار کوهستان", note: "امکان رزرو حضور در مطب (لطفا بدون هماهنگی قبلی به مطب مراجعه نفرمایید)" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-primary/15 bg-gradient-to-b   from-primary/80  to-primary/85 backdrop-blur px-4 py-5 shadow-sm">
              <p className="text-primary-foreground font-vazir font-semibold text-md mb-1">{item.title}</p>
              <p className="text-primary-foreground font-vazir font-bold text-lg mb-1">{item.value}</p>
              <p className="text-primary-foreground/70 font-vazir text-sm leading-7">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-6 mt-12 items-start">
          <div className="md:col-span-3 bg-white/70 rounded-2xl p-6 shadow-sm">
            <h2 className="text-foreground font-vazir font-bold text-xl mb-4">فرم درخواست نوبت و پیام</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col items-start gap-1">
                  <label className="text-foreground/80 font-vazir text-sm p-2 font-medium" htmlFor="name">
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="w-full rounded-lg border border-primary/20 bg-white/70 px-3 py-2 text-foreground font-vazir focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="مثال: سارا احمدی"
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <label className="text-foreground/80 font-vazir text-sm p-2 font-medium" htmlFor="phone">
                    شماره تماس
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border border-primary/20 bg-white/70 px-3 py-2 text-foreground font-vazir focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="مثال: ۰۹۱۲..."
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col items-start gap-1">
                <label className="text-foreground/80 font-vazir text-sm p-2 font-medium" htmlFor="subject">
                  موضوع درخواست
                </label>
                <input
                  id="subject"
                  name="subject"
                  className="w-full rounded-lg border border-primary/20 bg-white/70 px-3 py-2 text-foreground font-vazir focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="رزرو وقت، سوال درباره خدمات، پیگیری جلسه"
                />
              </div>

              <div className="flex flex-col items-start gap-1">
                <label className="text-foreground/80 font-vazir text-sm p-2 font-medium" htmlFor="message">
                  توضیحات
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full rounded-lg border border-primary/20 bg-white/70 px-3 py-3 min-h-[140px] text-foreground font-vazir focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="به اختصار بنویسید چگونه می‌توانیم کمک کنیم"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-vazir font-semibold px-6 py-2.5 transition hover:bg-primary/90"
              >
                ارسال پیام
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center md:col-span-2 gap-4 h-full">
            <div className="w-full rounded-2xl border border-primary/15 bg-white/70 backdrop-blur p-6 shadow-sm">
              <h3 className="text-foreground font-vazir font-bold text-xl mb-3">ساعات پاسخ‌گویی</h3>
              <ul className="space-y-3 text-foreground/80 font-vazir">
                <li className="font-vazir">شنبه تا چهار شنبه</li>
                <li className="font-vazir">صبح: ۹ صبح تا ۱۴</li>
                <li className="font-vazir"> بعد از ظهر : ۱۸:۳۰ صبح تا ۲۰</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-white/70 p-6 shadow-sm flex-1 h-full">
              <h3 className="text-foreground font-vazir font-bold text-xl mb-3">راهنمای حضور در مطب</h3>
              <p className="text-foreground/80 font-vazir leading-10 mb-3">
                پس از رزرو، موقعیت دقیق مطب و زمان دقیق نوبت از طریق تلگرام برای شما ارسال می‌شود. لطفاً ۱۰ دقیقه زودتر در محل حضور داشته باشید.
              </p>
              <div className="rounded-lg border border-primary/10 bg-white/70 px-4 py-3 text-foreground/70 font-vazir text-sm">
                پارکینگ عمومی در ابتدای خیابان قرار دارد و دسترسی به مترو و BRT کمتر از ۵ دقیقه پیاده است.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUsPage;
