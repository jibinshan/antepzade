import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute left-0 top-0 h-full w-full object-cover"
      >
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/50">
        <div className="text-center text-white">
          <h1 className="font-italiana text-center text-3xl font-[400] text-white md:text-6xl">
            Welcome to Antepzade, <br /> Where Every Moment Sparkles
          </h1>
          <div className="mt-5 flex h-full w-full justify-center">
            <Image
              src="/images/home/hero/line.png"
              width={118}
              height={5}
              alt="line"
              className="h-[1px] w-[70%]"
            />
          </div>
          <p className="font-baskerville mt-5 text-lg font-[400] italic text-white md:text-2xl">
            in North London
          </p>
          <div>
            <Button className="mt-4 rounded-none px-9 py-6 font-poppins text-sm font-[500] uppercase text-white">
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
