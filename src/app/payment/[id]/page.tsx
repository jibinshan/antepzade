import Payment from "@/app/payment/[id]/Payment";
import { BetaMenuActive } from "@/lib/constants";
import { redirect } from "next/navigation";
import type { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  if (!BetaMenuActive) {
    redirect("/");
  }
  if (!params?.id) return redirect("/checkout");
  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center">
      <Payment _id={params.id} />
    </main>
  );
};

export default page;
