"use client";
import React, { useEffect, useState, type FC } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import type { Stripe } from "@stripe/stripe-js";
import { useRestaurant } from "@/context/RestaurantContext";

const StripeWrapper: FC<{
  children: React.ReactNode;
  clientSecret: string;
}> = ({ children, clientSecret }) => {
  const { restaurant, stripePublishableKey } = useRestaurant();
  const [stripeObject, setStripeObject] = useState<Stripe | null>(null);

  useEffect(() => {
    const fetchStripeObject = async () => {
      // If there is no accountId, do not run the loadStripe function.
      if (restaurant?.paymentInfo?.destinationAccountId) {
        const res = await loadStripe(stripePublishableKey, {
          stripeAccount: restaurant.paymentInfo.destinationAccountId,
        });
        // When we have got the Stripe object, pass it into our useState.
        setStripeObject(res);
      }
    };
    void fetchStripeObject();
  }, [restaurant, stripePublishableKey]);

  if (!stripeObject) {
    return <p>Loading...</p>;
  }

  return (
    <Elements
      stripe={stripeObject}
      options={{
        clientSecret: clientSecret,
        appearance: {
          theme: "night",
        },
        loader: "always",
      }}
    >
      {children}
    </Elements>
  );
};

export default StripeWrapper;
