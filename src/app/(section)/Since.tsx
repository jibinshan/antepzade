import Image from "next/image";
import React from "react";

const Since: React.FC = () => {
  return (
    <section
      className="h-full w-full px-4 py-12 md:px-32 md:py-24"
      style={{
        backgroundImage: "url('/images/home/since/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-center font-baskerville text-2xl font-[400] uppercase text-[#FFF]">
            Since 1992
          </h3>
          <Image
            src="/images/home/footer/s-line.svg"
            width={118}
            height={5}
            alt="s-line"
            className="h-[5px] w-[118px]"
          />
          <p className="w-full max-w-[600px] text-center font-inter text-sm font-[400] text-[#FFF] md:text-lg">
            At Antepzade, we pride ourselves on using only the finest
            ingredients, ensuring that every bite is a delightful experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Since;
