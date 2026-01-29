import Image from "next/image";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { toPersianNumber } from "../../../utils/ToPersionDigits";

interface PropsType {
  auther: string;
  date: string;
  stars: number;
  comment: string;
  reason: string;
}

const CommentCard: FC<PropsType> = ({ auther, comment, date, reason, stars }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-card rounded-xl p-5 w-full lg:w-[40%] shadow-2xl mx-auto flex-shrink-0">
      <div className="flex items-center justify-center gap-2 mb-5">
        {Array.from({ length: 5 - stars }).map((_, indx) => {
          return <FaStar key={indx} className="text-xl text-gray-500" />;
        })}
        {Array.from({ length: stars }).map((_, indx) => {
          return <FaStar key={indx} className="text-xl text-yellow-500" />;
        })}
      </div>
      <div className="bg-card-foreground relative w-[80%] mx-auto p-5 rounded-2xl my-10 shadow-2xl">
        <div className="w-16 h-16 rounded-full absolute -top-8 right-1/2 translate-x-1/2 ">
          <Image src="/images/prof.png" fill alt={auther} className="rounded-full object-cover object-top" />
        </div>
        <div className="flex flex-col items-center gap-3 mt-8">
          <h4 className="text-card text-center font-medium font-vazir ">{auther}</h4>
          <div className="flex items-center justify-center gap-2 opacity-65">
            <p className="font-vazir text-sm text-card">علت مراجعه:</p>
            <p className="font-vazir text-sm text-card">{reason}</p>
          </div>
          <p className="text-card text-sm !leading-5 text-center my-3 font-medium font-vazir">{comment}</p>
          <span className="self-end text-card opacity-75 font-medium font-vazir text-sm">{toPersianNumber(date)}</span>
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
