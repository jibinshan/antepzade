import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Connect: React.FC = () => {
  return (
    <section
      className="h-full w-full px-4 py-12 md:px-32 md:py-24"
      style={{
        backgroundImage: "url('/images/home/connect/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-16">
        <h3 className="text-center text-2xl tracking-[1.1px] text-black md:text-3xl">
          CONNECT WITH US
        </h3>
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="relative">
            <div className="absolute bottom-6 right-6 h-full w-full">
              <Image
                src="/images/home/about/frame.svg"
                width={100}
                height={100}
                alt="frame"
                className="h-[315px] w-[258px]"
              />
            </div>

            <Image
              src="/images/home/connect/image1.png"
              width={373}
              height={468}
              alt="image1"
              className="h-[315px] w-[258px]"
            />
          </div>

          <div className="relative">
            <div className="absolute right-6 top-6 h-full w-full">
              <Image
                src="/images/home/about/frame.svg"
                width={100}
                height={100}
                alt="frame"
                className="h-[315px] w-[258px]"
              />
            </div>

            <Image
              src="/images/home/connect/image2.png"
              width={373}
              height={468}
              alt="image2"
              className="h-[315px] w-[258px]"
            />
          </div>
          <div className="relative">
            <div className="absolute bottom-6 left-6 h-full w-full">
              <Image
                src="/images/home/about/frame.svg"
                width={100}
                height={100}
                alt="frame"
                className="h-[315px] w-[258px]"
              />
            </div>

            <Image
              src="/images/home/connect/image3.png"
              width={373}
              height={468}
              alt="image3"
              className="h-[315px] w-[258px]"
            />
          </div>
        </div>
        <div>
          <Button className="rounded-none bg-[#896E47] px-9 py-6 font-poppins text-sm font-[500] uppercase text-white hover:text-black">
            FOLLOW US ON INSTAGRAM{" "}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Connect;
