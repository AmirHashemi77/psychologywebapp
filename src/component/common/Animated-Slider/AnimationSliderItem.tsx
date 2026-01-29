import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { toPersianNumber } from "../../../utils/ToPersionDigits";

interface PropsType {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  items: {
    date: string;
    source: string;
    recommend: boolean;
    waitTime: string;
    comment: string;
    reason: string;
  }[];
}

const AnimationSliderItem: FC<PropsType> = ({ activeIndex, setActiveIndex, items }) => {
  return (
    <div className="relative w-[400px] h-[400px]">
      {/* 5. رندر کردن همه‌ی کارت‌ها */}
      {items.map((item, index) => {
        // 6. محاسبه موقعیت و استایل هر کارت بر اساس activeIndex
        let distance = index - activeIndex;
        const len = items.length;

        // مدیریت حالت چرخشی (wraparound)
        // (مثلاً اگر 5 آیتم داریم و فعال 0 است، آیتم 4 باید -1 در نظر گرفته شود)
        if (distance > len / 2) distance -= len;
        if (distance <= -len / 2) distance += len;

        let x, scale, opacity, zIndex;

        if (distance === 0) {
          // --- کارت فعال (وسط) ---
          x = "0%";
          scale = 1;
          opacity = 1;
          zIndex = 3;
        } else if (distance === -1) {
          // --- کارت سمت چپ ---
          x = "-60%"; // کمی به چپ (قابل تنظیم)
          scale = 0.8;
          opacity = 0.6; // همانطور که خواستید
          zIndex = 2;
        } else if (distance === 1) {
          // --- کارت سمت راست ---
          x = "60%"; // کمی به راست (قابل تنظیم)
          scale = 0.8;
          opacity = 0.6;
          zIndex = 1; // پشت کارت سمت چپ قرار می‌گیرد
        } else {
          // --- کارت‌های پنهان ---
          x = distance < 0 ? "-100%" : "100%"; // کاملاً خارج از دید
          scale = 0.5;
          opacity = 0;
          zIndex = 0;
        }

        // 7. استفاده از motion.div برای انیمیشن
        const stars = item.recommend ? 5 : 3;

        return (
          <motion.div
            key={item.comment}
            className="absolute w-full h-full flex items-center justify-center cursor-pointer"
            // initial={false} از انیمیشن در بارگذاری اولیه جلوگیری می‌کند
            initial={false}
            // animate به مقادیر محاسبه شده
            animate={{
              x: x,
              scale: scale,
              opacity: opacity,
              zIndex: zIndex,
            }}
            // transition برای نرمی حرکت
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1], // یک easing زیبا
            }}
            // با کلیک روی کارت‌های کناری هم فعال می‌شوند
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex flex-col items-center justify-center bg-primary rounded-xl h-[500px] p-5 w-full  mx-auto flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-5 ">
                {Array.from({ length: 5 - stars }).map((_, indx) => {
                  return <FaStar key={indx} className="text-xl text-gray-500" />;
                })}
                {Array.from({ length: stars }).map((_, indx) => {
                  return <FaStar key={indx} className="text-xl text-yellow-500" />;
                })}
              </div>
              <div className="relative w-[80%] mx-auto p-5 rounded-2xl my-10 shadow-2xl">
                <div className="w-16 h-16 rounded-full absolute -top-8 right-1/2 translate-x-1/2">
                  <Image src="/images/prof.png" fill alt={item.source} className="rounded-full object-cover object-top" />
                </div>
                <div className="flex flex-col items-center gap-3 mt-8">
                  <h4 className="text-card text-center font-medium font-vazir">{item.source}</h4>

                  <span className="font-vazir text-sm text-card text-center">
                    <span className="font-vazir text-sm text-card text-center font-bold">علت مراجعه:</span> {item.reason}
                  </span>

                  <p className="text-card text-sm !leading-5 text-center my-3 font-medium font-vazir">{item.comment}</p>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="self-end text-card opacity-75 font-medium font-vazir text-sm">تاریخ مراجعه</span>
                    <span className="self-end text-card opacity-75 font-medium font-vazir text-sm">{toPersianNumber(item.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
export default AnimationSliderItem;
