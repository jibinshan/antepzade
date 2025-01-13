import Image from "next/image";
import React from "react";

const Items: React.FC = () => {
  return (
    <section
      className="h-full w-full px-4 py-12 md:px-32 md:py-16"
      style={{
        backgroundImage: "url('/images/home/items/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center font-italiana text-3xl font-[400] uppercase text-black">
            Our Special Items
          </h3>
          <Image
            src="/images/home/footer/underline.png"
            width={391}
            height={50}
            alt="frame"
            className="h-[30px] w-[100%]"
          />
        </div>
        <div>
          <ul className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20">
            <li className="flex flex-col gap-5">
              <div>
                <Image
                  src="/images/home/items/image1.svg"
                  width={100}
                  height={100}
                  alt="frame"
                  className="h-[200px] w-[200px] rounded-full object-contain md:h-[238px] md:w-[238px]"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h5 className="font-inter text-3xl font-[400] text-[#BC995D]">
                  Baklava
                </h5>
                <p className="text-center font-inter text-sm font-[400] text-[#5D5D5D]">
                  Lorem Ipsum proin gravida <br /> nibh vel velit auctor{" "}
                </p>
              </div>
            </li>
            <li className="flex flex-col gap-5">
              <div>
                <Image
                  src="/images/home/items/image2.svg"
                  width={100}
                  height={100}
                  alt="frame"
                  className="h-[200px] w-[200px] rounded-full object-contain md:h-[238px] md:w-[238px]"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h5 className="font-inter text-3xl font-[400] text-[#BC995D]">
                  Baklava
                </h5>
                <p className="text-center font-inter text-sm font-[400] text-[#5D5D5D]">
                  Lorem Ipsum proin gravida <br /> nibh vel velit auctor{" "}
                </p>
              </div>
            </li>
            <li className="flex flex-col gap-5">
              <div>
                <Image
                  src="/images/home/items/image3.svg"
                  width={100}
                  height={100}
                  alt="frame"
                  className="h-[200px] w-[200px] rounded-full object-contain md:h-[238px] md:w-[238px]"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h5 className="font-inter text-3xl font-[400] text-[#BC995D]">
                  Baklava
                </h5>
                <p className="text-center font-inter text-sm font-[400] text-[#5D5D5D]">
                  Lorem Ipsum proin gravida <br /> nibh vel velit auctor{" "}
                </p>
              </div>
            </li>
            <li className="flex flex-col gap-5">
              <div>
                <Image
                  src="/images/home/items/image4.svg"
                  width={100}
                  height={100}
                  alt="frame"
                  className="h-[200px] w-[200px] rounded-full object-contain md:h-[238px] md:w-[238px]"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h5 className="font-inter text-3xl font-[400] text-[#BC995D]">
                  Baklava
                </h5>
                <p className="text-center font-inter text-sm font-[400] text-[#5D5D5D]">
                  Lorem Ipsum proin gravida <br /> nibh vel velit auctor{" "}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Items;
