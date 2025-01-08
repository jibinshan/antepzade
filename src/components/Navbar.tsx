"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import CartSheet from "./cart/CartSheet";
import { BetaMenuActive } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Navbar = ({
  position = "static",
}: {
  position?: "static" | "fixed" | "absolute";
}) => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <nav
      className={`${position} top-5 z-50 flex h-[10vh] w-full flex-col items-center gap-6 bg-transparent py-4 transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-full w-full max-w-[1300px] items-center justify-between">
        <Sidebar>
          <Button
            variant="ghost"
            className="flex px-1 py-1 text-primary hover:bg-transparent hover:text-primary"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-row gap-2">
              <EqualizerIcon />
              <span className="font-poppins text-sm font-[400] text-white">
                Menu
              </span>
            </div>
          </Button>
        </Sidebar>
        <Link href="/">
          <Image
            src="/images/home/footer/logo.svg"
            width={140}
            height={120}
            alt="logo"
            className="h-28 w-28"
          />
        </Link>

        <div className="hidden flex-row items-center justify-center gap-[3.48rem] md:flex">
          <Link href="/menu">
            <Button
              className="group h-11 items-center gap-[1.19rem] rounded-full bg-[#896E47] text-center font-poppins text-sm font-[500] uppercase tracking-[0.60px] text-white hover:bg-primary"
              variant="secondary"
            >
              FIND A TABLE
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex flex-col gap-6">
          <Image
            src="/images/home/hero/underline.png"
            width={1726}
            height={2}
            alt="logo"
            className="w-full"
          />
          <div className="flex h-full w-full items-center justify-center">
            <ul className="flex flex-row gap-10">
              <li>
                <Button
                  asChild
                  variant="link"
                  className="px-0 font-poppins text-sm font-[400] uppercase leading-[20px] tracking-[2.40px] text-accent"
                >
                  <Link href="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  variant="link"
                  className="px-0 font-poppins text-sm font-[400] uppercase leading-[20px] tracking-[2.40px] text-accent"
                >
                  <Link href="/">About Us</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  variant="link"
                  className="px-0 font-poppins text-sm font-[400] uppercase leading-[20px] tracking-[2.40px] text-accent"
                >
                  <Link href="/">Gallery</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  variant="link"
                  className="px-0 font-poppins text-sm font-[400] uppercase leading-[20px] tracking-[2.40px] text-accent"
                >
                  <Link href="/">VIRTUAL TOUR</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  variant="link"
                  className="px-0 font-poppins text-sm font-[400] uppercase leading-[20px] tracking-[2.40px] text-accent"
                >
                  <Link href="/">RESERVATION</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  variant="link"
                  className="px-0 font-poppins text-sm font-[400] uppercase leading-[20px] tracking-[2.40px] text-accent"
                >
                  <Link href="/">CONTACT US</Link>
                </Button>
              </li>
            </ul>
          </div>
          <Image
            src="/images/home/hero/underline.png"
            width={1726}
            height={2}
            alt="logo"
            className="w-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const EqualizerIcon: React.FC = () => {
  return (
    <div className="equalizer-icon rotate">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};
