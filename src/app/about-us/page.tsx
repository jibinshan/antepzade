import BavetteStory from "@/app/about-us/(section)/BavetteStory";
import Hero from "@/app/about-us/(section)/Hero";
import JoinUs from "@/app/about-us/(section)/JoinUs";
import OurManagement from "@/app/about-us/(section)/OurManagement";
import OurTeam from "@/app/about-us/(section)/OurTeam";
import Review from "@/app/about-us/(section)/Review";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const page = ({ }) => {
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#050505]">
        <Navbar position="absolute" />
        <Hero />
        <BavetteStory />
        <OurTeam />
        <OurManagement />
        <JoinUs />
        <Review />
        <Footer />
      </div>
    </main>
  );
};

export default page;

// Images:
// public/images/about-us
