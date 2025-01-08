"use client";
import EmblaCarousel from "@/app/(section)/(special)/MenuCarousel";
import { Button } from "@/components/ui/button";
import type { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";

const OPTIONS: EmblaOptionsType = { loop: true };

const slideData: {
  modelUrl: string;
  price: string;
  name: string;
}[] = [
  {
    name: "Chicken Shish",
    price: "40",
    modelUrl: "/models/chicken-shish.glb",
  },
  {
    name: "Grilled Sea Bass",
    price: "50",
    modelUrl: "/models/grilled-sea-bass-(levrek).glb",
  },
  {
    name: "Lamb Doner",
    price: "60",
    modelUrl: "/models/lamb-doner.glb",
  },
  {
    name: "Lamb Kofte Beyti",
    price: "80",
    modelUrl: "/models/lamb-kofte-beyti.glb",
  },
  {
    name: "Lamb Shank",
    price: "100",
    modelUrl: "/models/lamb-shank.glb",
  },
  {
    name: "Mix Kebab",
    price: "100",
    modelUrl: "/models/mix-kebab-for-one.glb",
  },
  {
    name: "Mix Platter",
    price: "100",
    modelUrl: "/models/mix-platter-for-2.glb",
  },
];
const Special = ({}) => {
  return (
    <section className="relative flex h-full w-full justify-center">
      <div className="flex h-full w-full max-w-[1300px] flex-col items-center justify-center gap-4 py-12">
        <div className="relative">
          <div className="absolute left-24 top-24 z-10 md:left-[500px] md:top-0">
            <Button className="rounded-3xl px-6 py-6 font-poppins text-sm font-[500] tracking-[0.58px] text-white">
              View Menu
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 md:gap-28">
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-italiana text-center text-3xl font-[400] uppercase text-black">
                Antepzade Specials
              </h3>
              <Image
                src="/images/home/footer/underline.png"
                width={391}
                height={50}
                alt="frame"
                className="h-[30px] w-[80%]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex min-h-[400px] w-full flex-col justify-center px-2">
          <EmblaCarousel slides={slideData} options={OPTIONS} />
        </div>
      </div>
    </section>
  );
};

export default Special;
