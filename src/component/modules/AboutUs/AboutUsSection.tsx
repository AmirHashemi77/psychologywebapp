import { FC } from "react";
import Image from "next/image";
interface Iprops {
  hasBrain?: boolean;
}

const AboutUsSection: FC<Iprops> = ({ hasBrain = true }) => {
  return (
    <div className="w-full relative overflow-hidden">
      {hasBrain && <Image src="/images/brain.png" width={300} height={400} alt="brain" className="hidden xl:block absolute -right-24 top-42 -z-10 opacity-50 -rotate-45" />}
      <div className="max-w-6xl w-full px-5 my-16 mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-foreground font-bold font-vazir text-3xl mb-3">دربــاره دکــتر مرضیــه خمســه</h3>
          <p className="text-base text-foreground/70 font-medium font-vazir">روان‌درمانگر و روان‌شناس با بیش از ۱۷ سال تجربه</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* تصویر دکتر */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/20 to-primary/5">
                <Image src="/images/dr-khamseh.png" alt="دکتر مرضیه خمسه" width={500} height={500} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* معرفی */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 shadow-sm">
              <h4 className="text-foreground font-bold font-vazir text-xl mb-4">معرفی</h4>
              <p className="text-foreground/80 font-vazir !leading-relaxed text-justify">
                دکتر مرضیه خمسه یک روان‌درمانگر و روان‌شناس ایرانی و عضو انجمن روانشناسی امریکا (APA) است. ایشان با بیش از ۱۷ سال تجربه در مشاوره و جلسات روان‌تحلیلی، خدمات تخصصی خود را به صورت حضوری
                و غیرحضوری (آنلاین) به ایرانیان داخل و خارج از کشور ارائه می‌نماید.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 shadow-sm">
              <h4 className="text-foreground font-bold font-vazir text-xl mb-4">عضویت در انجمن‌ها</h4>
              <ul className="space-y-2 text-foreground/80 font-vazir">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>عضو انجمن روانشناسی امریکا (APA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>عضو سازمان نظام روانشناسی و مشاوره ایران</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>عضو انجمن روانشناسی ایران</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>عضو سرای اهل قلم</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* خدمات ارائه شده */}
        <div className="mb-12">
          <h4 className="text-foreground font-bold font-vazir text-2xl mb-6 text-center">خدمات ارائه شده در تهران</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "روان‌درمانی تحلیلی",
              "طرحواره درمانی",
              "زوج درمانگری",
              "روان‌درمانی تحلیلی فردی",
              "مشاوره روابط بین‌فردی",
              "مشاوره قبل از ازدواج و پیش‌بینی ریسک",
              "مشاوره افسردگی",
              "مشاوره بهداشت روان",
              "کنترل خشم و پرخاشگری",
              "مشاوره اضطراب و استرس",
              "درمان کمال‌گرایی افراطی",
              "افزایش اعتماد به نفس",
              "کنترل ذهن و افزایش تمرکز",
              "درمان وسواس و نشخوار فکری",
              "مشاوره آنلاین و تلفنی",
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-foreground/80 font-vazir text-sm">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* آموزش مهارت‌های زندگی */}
        <div className="mb-12 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-8">
          <h4 className="text-foreground font-bold font-vazir text-2xl mb-6 text-center">آموزش مهارت‌های زندگی</h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {["کنترل خشم و پرخاشگری", "حل مسئله", "افزایش اعتماد به نفس", "نه گفتن", "بهبود روابط اجتماعی"].map((skill, index) => (
              <div key={index} className="bg-white/50 dark:bg-foreground/5 border border-primary/20 rounded-full px-5 py-2">
                <p className="text-foreground/80 font-vazir text-sm">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        {/* سوابق تحصیلی و حرفه‌ای */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* سوابق تحصیلی */}
          <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
            <h4 className="text-foreground font-bold font-vazir text-2xl mb-4 flex items-center gap-2">سوابق تحصیلی</h4>
            <ul className="space-y-3 text-foreground/80 font-vazir text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>دانشجوی دکتری روانشناسی علوم و تحقیقات تهران</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>کارشناسی ارشد روانشناسی از دانشگاه خوارزمی تهران</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>کارشناسی علوم تربیتی از دانشگاه علامه طباطبایی</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>دارای پروانه اشتغال از سازمان نظام روانشناسی و مشاوره ایران</span>
              </li>
            </ul>
          </div>

          {/* افتخارات */}
          <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
            <h4 className="text-foreground font-bold font-vazir text-2xl mb-4 flex items-center gap-2">افتخارات</h4>
            <ul className="space-y-3 text-foreground/80 font-vazir text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>مؤلف ۸ جلد کتاب در زمینه‌های روانشناسی</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>بیش از ۸۵۰ ساعت کارورزی در اتاق درمان مرکز مشاوره نفت</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>چاپ مقالات روانشناسی در ماهنامه مشاوره شرکت ملی نفت</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>تدریس دروس مهارت‌های زندگی در دوره ابتدایی</span>
              </li>
            </ul>
          </div>
        </div>

        {/* دوره‌های آموزشی */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/5 rounded-2xl p-8">
          <h4 className="text-foreground font-bold font-vazir text-2xl mb-6 text-center">دوره‌های آموزشی تخصصی</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "رفتار درمانی - شناختی (CBT) در دانشگاه تهران",
              "دوره‌های پیشرفته طرحواره درمانی",
              "دوره نشخوار فکری",
              "دوره شکست عشقی عاطفی",
              "دوره زوج درمانی",
              "دوره درمانی هیجان مدار",
              "دوره سبک‌های فرزندپروری در دانشگاه تهران",
              "دوره خانواده درمانی دانشگاه تهران",
              "دوره تشخیص و درمان اختلالات یادگیری در دانشگاه الزهراء",
            ].map((course, index) => (
              <div key={index} className="bg-white/50 dark:bg-foreground/5 rounded-lg p-3 text-center border border-primary/10 cursor-pointer">
                <p className="text-foreground/80 font-vazir text-xs !leading-relaxed">{course}</p>
              </div>
            ))}
          </div>
        </div>

        {/* خدمات آنلاین */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 via-primary/10 to-primary/10 rounded-2xl p-8 text-center">
          <h4 className="text-foreground font-bold font-vazir text-2xl mb-4">خدمات آنلاین و غیرحضوری</h4>
          <p className="text-foreground/80 font-vazir text-lg !leading-relaxed max-w-3xl mx-auto">ارائه خدمات تخصصی روانشناسی به ایرانیان خارج از کشور به صورت آنلاین و تلفنی</p>
        </div>
      </div>
    </div>
  );
};
export default AboutUsSection;
