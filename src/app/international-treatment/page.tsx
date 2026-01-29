import { Metadata } from "next";
import { FC } from "react";
import JsonLd from "@/component/seo/JsonLd";
import { organizationSchema, personSchema, websiteSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "بهترین روانشناس ایرانی | دکتر مرضیه خمسه",
  description:
    "معرفی بهترین روانشناس ایرانی برای ایرانیان داخل و خارج از کشور با زوج‌درمانی، مشاوره ازدواج و درمان فردی به‌صورت حضوری و آنلاین.",
  keywords: [
    "روانشناس ایرانی",
    "بهترین روان‌درمانگر",
    "زوج درمانگر",
    "مشاوره ازدواج",
    "مشاوره فردی برای ایرانیان خارج از کشور",
    "دکتر روانشناس",
    "روان‌درمانگر",
    "ایران",
    "مرضیه خمسه",
    "مشاوره",
    "طرحواره",
    "درمان",
  ],
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
            name: "بهترین روانشناس ایرانی | دکتر مرضیه خمسه",
            description:
              "بهترین روانشناس ایرانی برای ایرانیان داخل و خارج از کشور با خدمات زوج‌درمانی، مشاوره ازدواج، مشاوره فردی و درمان آنلاین.",
          }),
        ]}
      />

      <section className="bg-white/70 border border-primary/10 rounded-2xl p-8 shadow-sm">
        <p className="text-secondary font-vazir font-bold text-lg mb-3">برای ایرانیان داخل و خارج از کشور</p>
        <h1 className="text-foreground font-vazir font-bold text-3xl mb-4">بهترین روانشناس ایرانی برای ایرانیان داخل و خارج از کشور</h1>
        <p className="text-foreground/80 font-vazir leading-9">
          در این صفحه با بهترین روانشناس ایرانی آشنا می‌شوید؛ خدمات زوج‌درمانی، مشاوره ازدواج و درمان فردی برای ایرانیان داخل و خارج از کشور ارائه می‌شود.
        </p>
        <p className="mt-4 text-foreground/80 font-vazir leading-9">
          یک روانشناس ایرانی بهترین کسی است که می‌تواند به ایرانیان در جای‌جای این کره‌ی خاکی کمک کند تا بر چالش‌ها و بحران‌های زندگی خود فائق آیند.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          {["روانشناس ایرانی آشنا با فرهنگ و خرده‌فرهنگ‌ها", "آموزش‌محور و کمک به مهارت‌آموزی کوتاه‌مدت", "تجربه، مدارک معتبر و چارچوب حرفه‌ای", "پاسخ‌گویی به نیازهای ایرانیان داخل و خارج از کشور"].map(
            (item) => (
              <div key={item} className="rounded-xl border border-primary/15 bg-primary/90 px-4 py-3">
                <p className="text-primary-foreground font-vazir text-sm font-semibold">{item}</p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">چرا روانشناس ایرانی اهمیت دارد؟</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            تا به حال به این موضوع فکر کرده‌اید که چرا آدم‌ها در موقعیت‌های مختلف متفاوت عمل می‌کنند؟ دنیای امروز پر از تضادهای درونی و بیرونی است؛ تضادهایی
            که ایرانی‌ها مخصوصاً مهاجران با انواع آن‌ها آشنایی کامل دارند. برخی افراد بنا به هر دلیلی آموخته‌های مناسب و سودمندی در چنته ندارند. در چنین شرایطی
            مداخله و حضور یک روانشناس ایرانی با تجربه مخصوصاً برای ایرانیان خارج از کشور اهمیت زیادی پیدا می‌کند. اما به چه کسی می‌توان اعتماد کرد؟
          </p>

          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">ویژگی‌های یک روانشناس ایرانی و روان‌درمانگر معتبر</h3>
          <ul className="grid gap-3">
            {[
              "آشنایی با فرهنگ سنتی و جمع‌گرای ایران و حرکت به سمت مدرنیته و فرهنگ‌های غربی.",
              "تسلط به حوزه‌های مختلف، به‌ویژه خانواده؛ نقش تربیت خانواده در شکل‌گیری شخصیت بسیار بارز است.",
              "آموزش‌های روانی و مهارت‌آموزی در درمان‌های کوتاه‌مدت برای اثربخشی بهتر.",
              "مدارک معتبر دانشگاهی و غیر دانشگاهی همراه با تجربه عملی.",
            ].map((item) => (
              <li key={item} className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3 text-foreground/90 font-vazir leading-8">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">برای رزرو وقت آنلاین</h3>
          <p className="text-foreground/80 font-vazir leading-8 mb-4">
            روانشناس ایرانی خود را محدود به مکان و زمان نمی‌داند و ضمن در نظر گرفتن شرایط، به شکل حضوری یا آنلاین به مراجعین داخلی یا ایرانیان خارج از کشور کمک می‌کند.
          </p>
          <div className="rounded-xl border border-primary/15 bg-primary/90 px-4 py-4">
            <p className="text-primary-foreground font-vazir text-sm">تلگرام</p>
            <p className="text-primary-foreground font-vazir font-bold text-lg" dir="ltr">
              {TELEGRAM_NUMBER}
            </p>
            <a className="inline-flex mt-3 text-primary-foreground/90 font-vazir font-semibold underline underline-offset-4" href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
              رزرو وقت از طریق تلگرام
            </a>
          </div>
          <ul className="mt-4 space-y-2 text-foreground/80 font-vazir leading-7">
            <li>نام و نام‌خانوادگی</li>
            <li>کشور/شهر محل سکونت</li>
            <li>موضوع کلی مراجعه</li>
            <li>روزها و ساعت‌های پیشنهادی</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-2 gap-6">
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">روانشناس ایرانی دکتر مرضیه خمسه کیست؟</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            دکتر مرضیه خمسه یک طرحواره درمانگر و روانشناس ایرانی عضو انجمن روانشناسی امریکا (APA) و عضو سازمان نظام روانشناسی و مشاوره کشور با کد شماره ۸۱۸۵ است که
            ضمن فعالیت حرفه‌ای در شهر تهران آماده‌ی خدمت‌رسانی به ایرانیان خارج از کشور می‌باشد.
          </p>
          <p className="text-foreground/80 font-vazir leading-9">
            خانم دکتر مرضیه خمسه دارای بیش از ۱۵ سال سابقه مشاوره و درمان حضوری و غیرحضوری در حوزه‌های گوناگون است و برای ایرانیان خارج از کشور روزنه‌ای مطمئن
            فراهم کرده‌اند.
          </p>
        </div>
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">حوزه‌های درمانی و مشاوره</h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-foreground/90 font-vazir leading-8">
            {[
              "روان‌درمانی تحلیلی",
              "طرحواره‌درمانی",
              "زوج‌درمانی",
              "روان‌درمانی تحلیلی فردی",
              "مشاوره روابط بین‌فردی",
              "مشاوره قبل از ازدواج و پیش‌بینی ریسک",
              "مشاوره افسردگی",
              "مشاوره بهداشت روان (اضطراب، استرس، کمال‌گرایی، اعتماد به نفس)",
              "کنترل ذهن و عدم تمرکز",
              "وسواس و نشخوار فکری",
              "مشاوره آنلاین و تلفنی",
              "آموزش مهارت‌های زندگی (حل مسئله، کنترل خشم، نه گفتن و روابط اجتماعی)",
            ].map((item) => (
              <li key={item} className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">زوج درمانگر و مشاوره ازدواج برای ایرانیان خارج از کشور</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            فارغ از این که همسر مورد نظرتان ایرانی یا خارجی است، می‌توانید در مشاوره‌های پیش از ازدواج دکتر خمسه شرکت کنید و تست‌های مختلف را انجام دهید. طی مشاوره ازدواج،
            ضمن بررسی شخصیت، طرحواره‌ها، اعتقادات و باورهای طرفین، میزان ریسک یک رابطه مشخص خواهد شد.
          </p>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            یک زوج درمانگر باید بتواند مشکلات فردی افراد را شناسایی کند و در صورت نیاز به هر کدام از زوج‌ها مشاوره فردی دهد. این موضوع در مورد مشاوره ازدواج نیز مصداق دارد.
          </p>
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">مشاوره ازدواج چه کمکی می‌کند؟</h3>
          <ol className="grid sm:grid-cols-2 gap-3 text-foreground/90 font-vazir leading-8 list-decimal list-inside">
            {[
              "کمک به شناسایی و مرور نقاط قوت و ضعف طرفین",
              "رفع مشکلات ارتباطی",
              "شناسایی ارزش‌های زندگی و شریک زندگی",
              "روشن کردن ابهامات و اشتباهات در رابطه",
              "تصمیم‌گیری بهتر درباره زمان ازدواج و موضوعات مالی و مرتبط",
              "آمادگی برای شروع زندگی با شریک خود",
            ].map((item) => (
              <li key={item} className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3">
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">پایان دادن به بحران با زوج درمانی</h3>
          <p className="text-foreground/80 font-vazir leading-8 mb-4">
            دکتر مرضیه خمسه با جدیدترین رویکردهای زوج درمانی به رابطه شما نگاه می‌کند و از شما حمایت می‌کند تا از مارپیچ مشاجرات خارج شوید و دوباره یک رابطه رضایت‌بخش
            داشته باشید.
          </p>
          <ul className="space-y-2 text-foreground/80 font-vazir leading-7">
            <li>حل اختلاف و رشد روابط با فضای سازنده و آرام</li>
            <li>کمک به شناخت باورهای قدیمی و تجربیات استرس‌زا</li>
            <li>یادگیری مرزبندی در روابط و مدیریت رابطه سمی</li>
            <li>امکان درمان فردی در صورت عدم مشارکت کامل زوجین</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-2 gap-6">
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">نوجوان و بلوغ</h2>
          <p className="text-foreground/80 font-vazir leading-9">
            روانشناسی نوجوان و بلوغ زیرمجموعه‌ای از روانشناسی رشد است. نوجوان‌هایی که به کشورهای غربی مهاجرت می‌کنند با کمک یک روان‌درمانگر و مشاوره فردی می‌توانند
            این دوران پر تلاطم را به خوبی پشت سر بگذارند.
          </p>
        </div>
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">درمان فردی</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            در درمان انفرادی جلساتی با مشارکت مراجعه کننده و درمانگر برگزار می‌شود. درمانگر با تمرکز بر شکایت و انتظارات فعلی، بر خودشناسی و افزایش توانایی ارائه راه‌حل
            کار می‌کند.
          </p>
          <p className="text-foreground/80 font-vazir leading-9">
            مدت زمان جلسات ۴۵ دقیقه است و تناوب جلسات با توجه به نیاز مراجعه‌کننده از یک‌بار در هفته تا هر دو هفته یک‌بار قابل تنظیم است.
          </p>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">مشاوره فردی آنلاین یا داخل مطب</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            با چند جلسه درمان به شما کمک می‌کنیم تا مشکلات مختلفی مانند فرسودگی شغلی، احساسات سرکوب شده، اختلالات اضطرابی، حملات پانیک و... را حل کنید. برای رزرو وقت
            مشاوره آنلاین می‌توانید در تلگرام، واتساپ و ایمو پیام بدهید یا تماس بگیرید.
          </p>
          <p className="text-foreground/80 font-vazir leading-9">
            دکتر مرضیه خمسه تجربه زیادی در راهنمایی خانواده‌ها (از جمله ایرانیان خارج از کشور) دارد که به دلیل تضاد بین دو فرهنگ با مشکلاتی روبرو هستند.
          </p>
        </div>
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-foreground font-vazir font-bold text-xl mb-3">امکان برگزاری جلسه از کشورهای مختلف</h3>
          <p className="text-foreground/80 font-vazir leading-8">
            ارتباط از هر کشوری امکان‌پذیر است؛ از کشورهای آسیای شرقی تا اروپا، آمریکا و حوزه خلیج فارس. ایرانیان خارج از کشور می‌توانند از مشاوره فردی، مشاوره ازدواج و
            زوج‌درمانی بهره ببرند.
          </p>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-2 gap-6">
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">بررسی سوابق تحصیلی و حرفه‌ای</h2>
          <ul className="space-y-2 text-foreground/80 font-vazir leading-7">
            <li>دانشجوی دکتری روانشناسی علوم و تحقیقات تهران</li>
            <li>کارشناسی ارشد روانشناسی از دانشگاه خوارزمی تهران</li>
            <li>کارشناسی علوم تربیتی از دانشگاه علامه طباطبایی تهران</li>
            <li>دارای پروانه اشتغال از سازمان نظام روانشناسی و مشاوره ایران</li>
            <li>عضو سازمان نظام روانشناسی و مشاوره کشور</li>
            <li>عضو انجمن روانشناسی آمریکا (APA)</li>
            <li>مؤلف ۸ جلد کتاب در زمینه‌های روانشناسی</li>
            <li>تدریس دروس مهارت‌های زندگی در دوره ابتدایی</li>
            <li>۸۵۰ ساعت کارورزی در مرکز مشاوره نفت</li>
            <li>چاپ مقالات روانشناسی در ماهنامه مشاوره شرکت ملی نفت</li>
          </ul>
        </div>
        <div className="bg-white/70 border border-primary/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-foreground font-vazir font-bold text-2xl mb-3">طرحواره درمانی رویکردی قابل اعتماد</h2>
          <p className="text-foreground/80 font-vazir leading-9 mb-4">
            طرحواره درمانی یکی از کوتاه‌ترین روش‌ها برای افزایش بینش در افراد به حساب می‌آید و رویکرد CBT را نیز تکمیل می‌کند. در این مسیر کنار شما خواهیم بود تا با کمترین
            تنش و اضطراب از تله‌ها و الگوهای ناسازگار رهایی یابید.
          </p>
          <p className="text-foreground/80 font-vazir leading-9">
            هنگام درمان تله‌ها (طرحواره‌ها) ابتدا باید فهمید که آن‌ها چطور شکل گرفته‌اند و چگونه در رفتارها و انتخاب‌ها دخالت می‌کنند.
          </p>
        </div>
      </section>
    </div>
  );
};

export default InternationalTreatmentPage;
