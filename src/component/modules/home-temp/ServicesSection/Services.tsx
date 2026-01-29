import CardSlider from "@/component/common/cardSlider/CardSlider";
import { FC } from "react";
import { servicesItems } from "./ServicesItems";
import ServicesCard from "./ServicesCard";
import Image from "next/image";

const Services: FC = () => {
  return (
    <div className="max-w-5xl w-full px-5 my-10 mx-auto">
      <div className="flex flex-col items-center gap-5 w-full">
        <p className="text-foreground font-vazir font-semibold !leading-10 text-center">
          <span className="text-primary font-vazir font-bold text-2xl !leading-10 text-center">دکــتر مــرضیه خــمسه</span> روان‌درمانگر و روان‌شناس در شهر تهران با بیش از ۱۷ سال تجربه در حوزه درمان
          تحلیلی، طرحواره‌درمانی، زوج‌درمانی و مشاوره فردی و بین‌فردی است و خدمات خود را به صورت حضوری و آنلاین ارائه می‌دهد. او دانشجوی دکتری روان‌شناسی، عضو APA، دارای پروانه اشتغال، مؤلف ۸ کتاب و
          گذرانده دوره‌های تخصصی متعدد در حوزه روان‌درمانی است.
        </p>

        <CardSlider>
          {servicesItems.map((item) => (
            <ServicesCard key={item.title} title={item.title} subtitle={item.subtitle} icon={item.icon} />
          ))}
        </CardSlider>
      </div>
    </div>
  );
};
export default Services;
