import Image from "next/image";

const OurManagement = ({ }) => {
  return (
    <section className="relative flex h-full w-full items-center justify-center lg:py-24 p-4 bg-[#050505] max-w-[1300px]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-11 bg-[#050505]">
        <h2 className="font-oswald text-6xl text-[#f0dfc8] md:left-[15%] md:text-6xl text-center">
          Our Management
        </h2>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#050505] md:flex-row lg:px-24 lg:py-20">
          <div className="h-full w-full overflow-hidden p-4 md:w-1/2 md:p-0">
            <Image
              src="/images/about-us/member-1.png"
              width={639}
              height={704}
              alt="private dining"
              className="h-auto w-full rounded-lg md:rounded-none"
            />
          </div>
          <div className="flex h-full w-full flex-col items-center gap-[2.5rem] p-6 md:w-1/2 md:items-start lg:ml-24">
            <p className="max-w-[450px] text-center font-light leading-[160%] text-[#C1B6A6] md:text-start">
              Craving your favorite South Indian dishes? Enjoy the rich, authentic flavors of The Tiffin Box from the comfort of your home. Order online for a quick and easy delivery straight to your doorstep. Our dishes are prepared fresh and delivered fast, ensuring
              <br />
              <br />
              Craving your favorite South Indian dishes? Enjoy the rich, authentic flavors of The Tiffin Box from the comfort of your home. Order online for a quick and easy delivery straight to your doorstep.
            </p>
            <div>
              <h1 className="text-center font-oswald text-2xl md:text-start">
                Alex Mathew
              </h1>
              <p className="text-[#C1B6A6] font-roboto font-thin">Managing Director</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 lg:gap-9 lg:flex-row lg:justify-center">
          <div className="w-full lg:w-fit flex flex-col gap-4">
            <div className="h-full w-fit overflow-hidden p-4 md:p-0">
              <Image
                src="/images/about-us/member-1-alex.png"
                width={404}
                height={496}
                alt="private dining"
                className="h-auto w-fit rounded-lg md:rounded-none"
              />
            </div>
            <div className="w-full lg:w-fit">
              <h1 className="text-center font-oswald text-2xl md:text-start">
                Alex Mathew
              </h1>
              <p className="text-[#C1B6A6] font-manrope font-thin text-center lg:text-start">Managing Director</p>
            </div>
          </div>
          <div className="w-full lg:w-fit flex flex-col gap-4">
            <div className="h-full w-full overflow-hidden p-4  md:p-0">
              <Image
                src="/images/about-us/member-2.png"
                width={404}
                height={496}
                alt="private dining"
                className="h-auto w-full rounded-lg md:rounded-none"
              />
            </div>
            <div className="w-full lg:w-fit">
              <h1 className="text-center font-oswald text-2xl md:text-start">
                Jerrin Tom
              </h1>
              <p className="text-[#C1B6A6] font-manrope font-thin text-center lg:text-start">Managing Director</p>
            </div>
          </div>
          <div className="w-full lg:w-fit flex flex-col gap-4">
            <div className="h-full w-fit overflow-hidden p-4 md:p-0">
              <Image
                src="/images/about-us/member-3.png"
                width={639}
                height={704}
                alt="private dining"
                className="h-auto w-full rounded-lg md:rounded-none"
              />
            </div>
            <div className="w-full lg:w-fit">
              <h1 className="text-center font-oswald text-2xl md:text-start">
                Alex Mathew
              </h1>
              <p className="text-[#C1B6A6] font-manrope font-thin text-center lg:text-start">Managing Director</p>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
};

export default OurManagement;
