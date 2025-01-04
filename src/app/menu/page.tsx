"use client";
import Hero from "@/app/menu/(sections)/Hero";
import Menu from "@/app/menu/(sections)/menu/Menu";
import CartButton from "@/components/cart/CartButton";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [showScrollToTopArrow, setShowScrollToTopArrow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTopArrow(true);
      } else {
        setShowScrollToTopArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Navbar />
        <Hero />
        <Menu />
      </div>
      <CartButton />
      {showScrollToTopArrow && (
        <Button
          className="fixed bottom-14 right-3 z-50 rounded-full bg-[#f8f8f8] px-2 py-1"
          variant="ghost"
          onClick={scrollToTop}
        >
          <span className="sr-only">Scroll to Top</span>
          <ArrowUp className="transform text-black hover:text-primary" />
        </Button>
      )}
    </main>
  );
}
