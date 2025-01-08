import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { type FC } from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[540px]">
        <SheetHeader>
          <SheetDescription className="flex w-full flex-col items-start justify-start gap-7 pt-14">
            <Link
              href="/"
              className="font-playfair flex w-full justify-start p-0 text-4xl font-normal text-accent"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="font-playfair flex w-full justify-start p-0 text-4xl font-normal text-accent"
            >
              Menu
            </Link>
            <Link
              href="/contact"
              className="font-playfair flex w-full justify-start p-0 text-4xl font-normal text-accent"
            >
              Contact
            </Link>
            <Link
              href="/table-booking"
              className="font-playfair flex w-full justify-start p-0 text-4xl font-normal text-accent text-black"
            >
              Table Booking
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
