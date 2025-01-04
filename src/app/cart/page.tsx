import { BetaMenuActive } from "@/lib/constants";
import { redirect } from "next/navigation";
import Cart from "./(section)/Cart";
import Navbar from "@/components/Navbar";

const page = ({}) => {
  if (!BetaMenuActive) {
    redirect("/");
  }
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Navbar />
        <Cart />
      </div>
    </main>
  );
};

export default page;
