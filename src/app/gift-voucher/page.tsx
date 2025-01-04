import Hero from "@/app/gift-voucher/(section)/Hero";
import HowItWorks from "@/app/gift-voucher/(section)/HowItWorks";
import Vouchers from "@/app/gift-voucher/(section)/Vouchers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#000000]">
        <Navbar position="absolute" />
        <Hero />
        <Vouchers />
        <HowItWorks />
        <Footer />
      </div>
    </main>
  );
}
