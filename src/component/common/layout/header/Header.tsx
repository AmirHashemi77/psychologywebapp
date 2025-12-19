"use client";
import Link from "next/link";
import { FC, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../../sidebar/Sidebar";
import HeaderLogo from "./HeaderLogo";
import { usePathname } from "next/navigation";

const navBarArr = [
  {
    title: "خانه",
    url: "/",
  },
  {
    title: "مقالات",
    url: "/articles",
  },
  {
    title: "خدمات",
    url: "/services",
  },
  {
    title: "مشاوره خارج کشور",
    url: "/international-treatment",
  },
  {
    title: "همکاران",
    url: "#",
  },
  {
    title: "تماس با ما",
    url: "/contactus",
  },
  {
    title: " درباره ما",
    url: "/aboutus",
  },
];

const Header: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={`flex items-center justify-center absolute top-0 right-0  z-50 w-full h-14 px-5 ${pathname === "/" ? "bg-transparent" : "bg-primary/95 py-3"}`}>
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <ul className="hidden lg:flex items-center gap-10">
          {navBarArr.map((item) => (
            <li className="text-primary-foreground text-md  font-vazir" key={item.url}>
              <Link href={item.url}>{item.title}</Link>
            </li>
          ))}
          {/* <li></li> */}
        </ul>
        <HeaderLogo />
        {/* <h1 className="text-primary-foreground  font-vazir font-bold">جا لوگویی روانشناس</h1> */}
        <div className="lg:hidden flex items-center gap-5">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden bg-primary-foreground rounded-lg p-0.5 hover:bg-[#fbefd8b0] transition-all">
            <GiHamburgerMenu className="text-primary text-2xl" />
          </button>
        </div>
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </header>
  );
};
export default Header;
