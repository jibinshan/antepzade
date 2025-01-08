import Navbar from "@/components/Navbar";
import About from "./(section)/About";
import Items from "./(section)/Items";
import Since from "./(section)/Since";
import Connect from "./(section)/Connect";
import Footer from "./(section)/Footer";
import Iframe from "./(section)/Iframe";
import Hero from "./(section)/Hero";
import Menu from "./(section)/Menu";
import Special from "./(section)/(special)/Special";
import Reviews from "./(section)/Review";

export default function HomePage() {
  return (
    <main className="relative flex h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Navbar position="absolute" />
        <Hero />
        <About />
        <Items />
        <Special />
        <Since />
        <Reviews />
        <Menu />
        <Connect />
        <Iframe />
        <Footer />
      </div>
      {/* <div className="fixed bottom-2 right-2 z-50 hidden md:flex">
        <ViewMenu />
      </div> */}
    </main>
  );
}
