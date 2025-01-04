"use client";
import EmblaCarousel from "@/app/(section)/(special)/MenuCarousel";
import type { EmblaOptionsType } from "embla-carousel";

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
const Special = ({ }) => {
  return (
    <section className="relative flex h-full w-full justify-center">
      <div className="flex h-full w-full max-w-[1300px] flex-col items-center justify-center gap-4 py-12">
        <h3 className="font-bai uppercase italic">Dishes</h3>
        <h1 className="max-w-[600px] text-center font-forum text-5xl sm:text-7xl">
          Featured Dishes
        </h1>
        <p className="max-w-[500px] px-2 text-center font-light leading-[160%] md:px-0">
          We bring the finest foods and drinks to Istanbul with a commitment to quality and sustainability. Embracing the city`s vibrant culinary heritage, each dish reflects our dedication to responsible sourcing. Experience dining that honors both our guests and the environment.
        </p>
        <div className="relative z-20 flex min-h-[400px] w-full flex-col justify-center px-2">
          <EmblaCarousel slides={slideData} options={OPTIONS} />
        </div>
      </div>
    </section>
  );
};

export default Special;
