"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const About: React.FC = () => {
  return (
    <section className="h-full w-full bg-white px-4 py-12 md:px-32 md:py-24">
      <div className="flex flex-col-reverse items-center justify-center gap-12 md:flex-row md:gap-24">
        <div className="group relative">
          <div className="absolute bottom-6 left-6 h-full w-full transition-all duration-500 ease-in group-hover:bottom-0 group-hover:left-0">
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
            className="h-[315px] w-[258px] object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <h4 className="font-italiana text-2xl font-[500] uppercase tracking-[1.82px] text-[#000] md:text-3xl">
            About Us
          </h4>
          <p className="text-SM w-full max-w-[626px] font-inter font-[400] leading-[22px] tracking-[0.30px] text-black">
            Lorem Ipsum proin gravida nibh vel velit auctor aliquetenean
            sollicitudin, lorem qui bibendum auctor, nisi elit consequat gravida
            nibh vel velit auctor lorem qui bibendum auctor aliquetenean proin
            gravida nibh Ipsum proin gravida nibh vel velit nisi elit consequa.
            Nisi elit consequat gravida nibh vel.
          </p>
          <div>
            <Button className="rounded-none bg-black px-10 py-6 font-poppins text-sm font-[500] uppercase text-white hover:bg-gray-800">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
