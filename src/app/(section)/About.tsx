import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const About: React.FC = () => {
  return (
    <section className="h-full w-full bg-white px-4 py-12 md:px-32 md:py-24">
      <div className="flex flex-col-reverse items-center justify-center gap-12 md:flex-row md:gap-24">
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
            src="/images/home/about/image.png"
            width={373}
            height={468}
            alt="cake"
            className="h-[315px] w-[258px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <h4 className="text-2xl font-[400] uppercase tracking-[1.82px] text-black">
            About Us
          </h4>
          <p className="w-full max-w-[826px] text-lg font-[400] leading-[22px] tracking-[0.30px] text-black">
            Lorem Ipsum proin gravida nibh vel velit auctor aliquetenean
            sollicitudin, lorem qui bibendum <br /> auctor, nisi elit consequat
            gravida nibh vel velit auctor lorem qui bibendum auctor <br />{" "}
            aliquetenean proin gravida nibh Ipsum proin gravida nibh vel velit
            nisi elit consequa. <br />
            Nisi elit consequat gravida nibh vel.
          </p>
          <div>
            <Button className="rounded-none bg-black px-9 py-6 font-poppins text-sm font-[500] uppercase text-white">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
