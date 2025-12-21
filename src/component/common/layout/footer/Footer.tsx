import Link from "next/link";
import { FC } from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import FooterLogo from "./FooterLogo";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-primary to-[#879476] p-5 mt-10 relative ">
      <Image src="/images/footer-bg.png" fill alt="bg-footer" className=" opacity-10 " />
      <div className="w-full max-w-6xl mx-auto relative inset-0 z-10">
        <div className="flex flex-col gap-28 md:gap-10 md:flex-row w-full items-center justify-between flex-wrap">
          <Link className="font-extrabold text-5xl text-primary-foreground " href="/">
            <FooterLogo />
          </Link>
          <div className="flex flex-row gap-10 md:flex-row w-full items-center md:items-start justify-between flex-wrap">
            <div className="flex flex-col items-start gap-5">
              <p className="text-primary-foreground text-3xl font-semibold font-vazir"> اطلاعات تماس</p>
              <div className="flex items-start gap-4">
                <FaLocationDot className="text-xl text-secondary" />
                <span className="text-primary-foreground font-medium max-w-xs">تهران، سعادت آباد ، میدان کتاب ، انتهای بلوار کوهستان</span>
              </div>
              <div className="flex items-start gap-4">
                <FaPhoneFlip className="text-xl text-secondary" />
                <span className="text-primary-foreground font-medium">۰۹۳۰۴۳۹۰۱۱۷</span>
              </div>
              <div className="flex items-start gap-4">
                <RiTelegram2Fill className="text-xl text-secondary" />
                <span className="text-primary-foreground font-medium max-w-xs">جهت رزرو وقت به شماره درج شده در تلگرام پیام دهید</span>
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <p className="text-primary-foreground text-3xl font-semibold font-vazir">دســـترسی ها</p>
              <Link className="text-primary-foreground  lg:text-lg font-vazir hover:text-muted-foreground transition-all duration-200 px-2" href="">
                سوالات متداول
              </Link>
              <Link className="text-primary-foreground  lg:text-lg font-vazir hover:text-muted-foreground transition-all duration-200 px-2" href="">
                نوبت دهی
              </Link>
              <Link className="text-primary-foreground  lg:text-lg font-vazir hover:text-muted-foreground transition-all duration-200 px-2" href="/blogs">
                مقالات
              </Link>
              <Link className="text-primary-foreground  lg:text-lg font-vazir hover:text-muted-foreground transition-all duration-200 px-2" href="/aboutus">
                درباره ما
              </Link>
            </div>
            <div className="flex flex-col items-start gap-5">
              <p className="text-primary-foreground text-xl font-semibold font-vazir">ما را دنبال کنید :</p>
              <div className="flex items-center gap-5">
                <Link href="#">
                  <FaFacebook className="text-3xl  text-secondary hover:text-primary-foreground transition-all duration-200" />
                </Link>
                <Link href="https://www.instagram.com/khamseh_1216">
                  <FaInstagram className="text-3xl  text-secondary hover:text-primary-foreground transition-all duration-200" />
                </Link>
                <Link href="#">
                  <FaWhatsapp className="text-3xl  text-secondary hover:text-primary-foreground transition-all duration-200" />
                </Link>
                <Link href="https://t.me/R0ADMIN">
                  <FaTelegram className="text-3xl  text-secondary hover:text-primary-foreground transition-all duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
