import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";

const JoinUs = ({ }) => {
  return (
    <section
      className="relative flex h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url('/images/about-us/join-us.png')`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-4 md:flex-row">
        <div className="flex h-full w-full flex-col items-center justify-center gap-[2.5rem] p-6">
          <h1 className="max-w-[500px] text-center font-oswald text-5xl leading-[60px]">
            Join Us for an
            <br />
            Unforgettable Meal
          </h1>
          <p className="max-w-[450px] text-center font-light leading-[160%] text-[#C1B6A6]">
            Ready to experience the best steak of your life? Whether it`s a cozy
            dinner for two or a large celebration, Bavette welcomes you to come
            and savor the flavors we`ve perfected over the years. Let us show
            you what makes steak at Bavette an unforgettable experience.
          </p>
          <Button
            variant="outline"
            className="group w-fit items-center gap-[1.19rem] border-primary bg-transparent font-semibold uppercase text-white hover:bg-primary"
          >
            Book Now{" "}
            <Icons.rightArrow className="text-primary duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary-foreground" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
