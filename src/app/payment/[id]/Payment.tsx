"use client";
import PaymentForm from "@/app/payment/[id]/PaymentForm";
import StripeWrapper from "@/app/payment/[id]/StripeWrapper";
import { Button } from "@/components/ui/button";
import { useRestaurant } from "@/context/RestaurantContext";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { Check } from "lucide-react";
import Link from "next/link";
import { type FC } from "react";

const Payment: FC<{
  _id: string;
}> = ({ _id }) => {
  const { apiUrl } = useRestaurant();

  const { data, error } = useQuery({
    queryKey: ["stripe", _id, "payment-intent"],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: {
          clientSecret: string;
          paymentIntentId: string;
        };
      }> = await axios.post(`${apiUrl}/stripe/${_id}/payment-intent`, {
        action: "create",
        customerName: "John Doe",
        customerEmail: "johndoe@foodo.ai",
      });

      return res.data.data;
    },
    retry: 0,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex aspect-square h-32 w-32 items-center justify-center rounded-full bg-primary p-4">
          <Check size={64} />
        </div>
        <p>
          {(
            error as AxiosError<{
              msg: string;
            }>
          )?.response?.data.msg ??
            "An error occurred while fetching payment information. Please try again later."}
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return <div className="text-primary">Loading...</div>;
  }

  return (
    <StripeWrapper clientSecret={data?.clientSecret}>
      <PaymentForm _id={_id} />
    </StripeWrapper>
  );
};

// const Payment: FC<PaymentProps> = ({ _id }) => {

//   if (!data?.clientSecret) {
//     return <div>Loading payment information...</div>;
//   }

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={{ clientSecret: data.clientSecret }}
//     >
//       <PaymentForm clientSecret={data.clientSecret} />
//     </Elements>
//   );
// };

export default Payment;
