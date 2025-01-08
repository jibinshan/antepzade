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
      className={`${position} top-5 z-50 flex h-[10vh] w-full max-w-[1300px] flex-col items-center bg-transparent p-4 transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-full w-full items-center justify-between">
        <Link href="/">
          <Image
            src="/images/home/footer/logo.svg"
            width={140}
            height={120}
            alt="logo"
            className="w-24"
          />
        </Link>

        <div className="hidden flex-row items-center justify-center gap-[3.48rem] md:flex">
          <Button
            asChild
            variant="link"
            className="px-0 font-semibold uppercase text-accent"
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            asChild
            variant="link"
            className="px-0 font-semibold uppercase text-accent"
          >
            <Link href="/menu">Menu</Link>
          </Button>
          <Button
            asChild
            variant="link"
            className="px-0 font-semibold uppercase text-accent"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <Button
            asChild
            variant="link"
            className="px-0 font-semibold uppercase text-accent"
          >
            <Link href="/table-booking">Table Booking</Link>
          </Button>

          <Link href="/menu">
            <Button
              className="group h-11 items-center gap-[1.19rem] rounded-full font-semibold uppercase hover:bg-primary"
              variant="secondary"
            >
              View Menu
              <Icons.rightArrow className="duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <Sidebar>
          <Button
            variant="ghost"
            className="flex px-1 py-1 text-primary hover:bg-transparent hover:text-primary"
          >
            <span className="sr-only">Menu</span>
            <Icons.menu />
          </Button>
        </Sidebar>
        <EqualizerIcon />
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