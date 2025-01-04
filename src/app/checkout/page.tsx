import Navbar from "@/components/Navbar";
import { BetaMenuActive } from "@/lib/constants";
import { redirect } from "next/navigation";
import Checkout from "./(section)/Checkout";

const page = ({ }) => {
  // don't remove
  if (!BetaMenuActive) {
    redirect("/");
  }
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Navbar />
        <Checkout />
      </div>
    </main>
  )
};

export default page;
