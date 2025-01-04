"use client";
import { useEffect } from "react";

// Define the type for the giftup function
interface GiftUp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (command: string, ...args: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  q?: any[];
}

// Extend the Window interface to include giftup
declare global {
  interface Window {
    giftup: GiftUp;
  }
}

const Vouchers = ({}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.giftup.app/dist/gift-up.js";
    script.onload = () => {
      console.log("GiftUp script loaded");
    };
    script.onerror = () => {
      console.error("Failed to load GiftUp script");
    };
    document.body.appendChild(script);

    // Initialize the GiftUp widget
    window.giftup =
      window.giftup ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (command: string, ...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        (window.giftup.q = window.giftup.q ?? []).push([command, ...args]);
      };
  }, []);

  return (
    <div className="flex w-full max-w-[1300px] items-center gap-[1.2rem]">
      <div className="flex h-full w-full items-center justify-center px-2 py-10">
        <div
          className="gift-up-target w-[1200px] max-w-full"
          data-site-id="144a6bb3-ad14-4719-7e4c-08dcea4e3c17"
          data-platform="Other"
        ></div>
      </div>
    </div>
  );
};

export default Vouchers;

// cSpell:ignore giftup
