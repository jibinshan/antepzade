const Hero = ({ }) => {
  return (
    <section
      id="hero"
      className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-[1.38rem] text-[1.5rem] leading-[110%]"
      style={{
        background:
          "linear-gradient(170deg, rgba(0, 0, 0, 0.00) 7.51%, rgba(0, 0, 0, 0.80) 92.93%), url(/images/gift-voucher/hero.png) lightgray 50% / cover no-repeat",
      }}
    >
      <h1 className="text-center font-oswald text-[3rem] leading-[66px] sm:text-[4.75rem]">
        Istanbul Gift
        <br />
        Vouchers
      </h1>
    </section>
  );
};

export default Hero;
