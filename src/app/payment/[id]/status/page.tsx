"use client";

import { Button } from "@/components/ui/button";
import { BetaMenuActive } from "@/lib/constants";
import type { RefreshPayment } from "@/types/refresh-payment.type";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface pageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: pageProps) {
  if (!BetaMenuActive) {
    redirect("/");
  }
  //   const searchParams = useSearchParams();

  //   const redirectStatus = searchParams.get("redirect_status");
  //   const paymentIntent = searchParams.get("payment_intent");
  //   const paymentIntentClientSecret = searchParams.get(
  //     "payment_intent_client_secret",
  //   );
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data } = useQuery({
    queryKey: ["stripe", params.id, "refresh-payment"],
    queryFn: async () => {
      return await axios
        .get(`${apiUrl}/stripe/${params.id}/refresh-payment`)
        .then(
          (
            res: AxiosResponse<{
              data: RefreshPayment;
            }>,
          ) => res.data.data,
        );
    },
    enabled: !!params.id,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
      <div className="flex aspect-square h-32 w-32 items-center justify-center rounded-full bg-green-700 p-4">
        <Check size={64} />
      </div>
      <h1 className="mt-4 text-3xl font-bold">Thank You!</h1>
      <p className="mt-2 text-center text-lg">
        Your order <span className="font-bold">#{params.id}</span> has been
        placed.
      </p>
      <p className="mt-2 pt-8 text-center text-lg">
        We sent an email to{" "}
        <span className="font-bold">{data?.userDetails.email}</span> with your
        order confirmation and bill.
      </p>
      <p className="mt-2 text-center text-lg">
        Time placed: {new Date(data?.createdAt).toLocaleString()}
      </p>
      <p className="mt-2 text-center text-lg">
        Expected Time of {data.orderType === 2 ? "Delivery" : "Pickup"}:{" "}
        {new Date(data?.deliveryTime ?? new Date()).toLocaleString()}
      </p>

      <Button className="mt-4" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </main>
  );
}
