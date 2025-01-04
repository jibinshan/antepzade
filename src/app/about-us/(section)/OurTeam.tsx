import Image from "next/image";

const OurTeam = ({ }) => {
  return (
    <section className="relative flex h-full w-full items-center justify-center lg:pt-16 p-4 lg:p-0">
      <div className="flex h-full w-full flex-col items-center justify-center gap-11 bg-[#070707]">
        <div className="w-full flex flex-col md:flex-row gap-8">
          <h2 className="w-full md:w-1/2 font-oswald text-8xl text-[#262626] md:left-[15%] md:text-8xl flex justify-center">
            Meet<br />
            the Team
          </h2>
          <h1 className="w-full md:w-1/2 font-oswald text-4xl text-[#fbead2] md:left-[15%] md:text-4xl flex justify-center items-end">The Faces<br />
            Behind the Flavor</h1>
        </div>
        <Image src='/images/about-us/team.png' width={1920} height={750} alt="hero" />
      </div >
    </section >
  )
};

export default OurTeam;
