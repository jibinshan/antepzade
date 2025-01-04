const Hero = ({ }) => {
  return (
    <section
      id="hero"
      className="hidden h-full min-h-[400px] w-full flex-col items-center justify-center gap-[1.38rem] text-[1.5rem] leading-[110%] md:flex"
      style={{
        background:
          "linear-gradient(170deg, rgba(0, 0, 0, 0.00) 7.51%, rgba(0, 0, 0, 0.80) 92.93%), url(/images/menu/burak-babayigit-H93eflR6608-unsplash.jpg) lightgray 50% / cover no-repeat",
      }}
    >
      <h1 className="font-playfair text-[4.75rem] leading-[80%]">Our Menu</h1>
      <p>Choose & Taste what you like</p>
    </section>
  );
};

export default Hero;
