import Image from "next/image";

const Hero = ({ }) => {
  return (
    <section id="hero" className="flex w-full items-center justify-center">
      <div className="relative flex min-h-[100vh] w-full items-center justify-center">
        <div className="w-full flex flex-col lg:flex-row px-4 lg:px-0 gap-6 lg:gap-0">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="flex flex-col gap-6 items-start lg:w-8/12 mt-20 lg:mt-0">
              <h1 className="font-oswald text-[#fbead2] leading-[66px] font-semibold text-5xl lg:text-6xl">Welcome to<br /> Istanbul - Where<br /> Every Bite is an<br /> Art Form</h1>
              <p className="text-[#C1B6A6] font-manrope font-normal">Indulge in the finest cuts, masterfully prepared to perfection. At Istanbul, we don`t just serve steak—we serve an experience. Savor the richness, embrace the flavor, and discover the steak you`ve been waiting for.</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6">
            <Image src='/images/about-us/hero.png' width={951} height={975} alt="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
