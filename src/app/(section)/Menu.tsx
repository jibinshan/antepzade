import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Menu: React.FC = () => {
  return (
    <section className="relative h-full w-full bg-[#D5DE93] px-4 py-12 md:px-24 md:py-20">
      <div className="absolute -top-28 right-0 hidden md:block">
        <Image
          src="/images/home/menu/pista.png"
          width={420}
          height={348}
          alt="line"
          className="h-[220px] w-[290px]"
        />
      </div>

      <div className="flex h-full w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="font-baskerville text-2xl font-[400] uppercase tracking-[1.82px] text-black md:text-3xl">
            Menu
          </h2>
          <Image
            src="/images/home/footer/underline.png"
            width={391}
            height={50}
            alt="line"
            className="h-[30px] w-[100%]"
          />
        </div>

        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col gap-6 md:gap-14">
            {[1, 2, 3].map((item) => (
              <div
                key={`left-item-${item}`}
                className="flex w-full flex-row items-center justify-center gap-4"
              >
                <div>
                  <Image
                    src={`/images/home/menu/left${item}.png`}
                    width={118}
                    height={76}
                    alt={`left${item}`}
                    className="h-[45px] w-[130px] object-contain"
                  />
                </div>
                <div className="flex w-auto flex-col md:w-[488px]">
                  <p className="font-inter text-lg font-[600] text-[#493D35] md:text-xl">
                    Cake Sweet Bite
                  </p>
                  <p className="font-inter text-sm font-[500] text-[#493D35] md:text-lg">
                    Lorem ipsum dolor, feugiat decilata
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <Image
                      src="/images/home/menu/line.svg"
                      width={66}
                      height={8}
                      alt="line"
                      className="h-[8px] w-[116px]"
                    />
                  </div>
                  <p className="it font-interems-end flex text-lg font-[600] text-[#493D35]">
                    25.00$
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:gap-14">
            {[1, 2, 3].map((item) => (
              <div
                key={`right-item-${item}`}
                className="flex w-full flex-row items-center justify-center gap-4"
              >
                <div>
                  <Image
                    src={`/images/home/menu/right${item}.png`}
                    width={118}
                    height={76}
                    alt={`right${item}`}
                    className="h-[45px] w-[130px] object-contain"
                  />
                </div>
                <div className="flex w-auto flex-col md:w-[488px]">
                  <p className="font-inter text-lg font-[600] text-[#493D35] md:text-xl">
                    Cake Sweet Bite
                  </p>
                  <p className="font-inter text-sm font-[500] text-[#493D35] md:text-lg">
                    Lorem ipsum dolor, feugiat decilata
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <Image
                      src="/images/home/menu/line.svg"
                      width={66}
                      height={8}
                      alt="line"
                      className="h-[8px] w-[116px]"
                    />
                  </div>
                  <p className="it font-interems-end flex text-lg font-[600] text-[#493D35]">
                    25.00$
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Button className="mt-5 rounded-none bg-[#896E47] px-10 py-6 font-poppins text-sm font-[500] tracking-[0.65px] text-white hover:text-black">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
