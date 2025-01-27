"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Delivery from "./Delivery";
import Pickup from "./Pickup";
import { useRestaurant } from "@/context/RestaurantContext";
import { calculateServiceCharge } from "@/lib/calculate-service-charge";
import { isAfter } from "date-fns";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, cartValue } = useCart();
  const [checkoutType, setCheckoutType] = useState<"delivery" | "pickup">(
    "pickup",
  );
  const [isPickupNow, setIsPickupNow] = useState(true);
  const [isDeliveryNow, setIsDeliveryNow] = useState(true);
  const { restaurant, items } = useRestaurant();

  const checkPickupTime = () => {
    const pickupstart = restaurant?.takeAwayWindow.find(
      (item) => item.startTime,
    )?.startTime;
    const pickupend = restaurant?.takeAwayWindow.find(
      (item) => item.startTime,
    )?.endTime;
    if (pickupstart) {
      const [hours, minutes] = pickupstart.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsPickupNow(true);
      } else {
        setIsPickupNow(false);
      }
    }

    if (pickupend) {
      const [hours, minutes] = pickupend.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsPickupNow(false);
      } else {
        setIsPickupNow(true);
      }
    }
  };

  const checkDeliveryTime = () => {
    const deliverystart = restaurant?.deliveryWindow.find(
      (item) => item.startTime,
    )?.startTime;
    const deliveryend = restaurant?.deliveryWindow.find(
      (item) => item.startTime,
    )?.endTime;
    if (deliverystart) {
      const [hours, minutes] = deliverystart.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsDeliveryNow(true);
      } else {
        setIsDeliveryNow(false);
      }
    }

    if (deliveryend) {
      const [hours, minutes] = deliveryend.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsDeliveryNow(false);
      } else {
        setIsDeliveryNow(true);
      }
    }
  };

  useEffect(() => {
    if (restaurant?.takeAwayWindow) {
      checkPickupTime();
      checkDeliveryTime();

      const interval = setInterval(() => {
        checkPickupTime();
        checkDeliveryTime();
      }, 300000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant?.takeAwayWindow]);

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[1300px] flex-col gap-[2.5rem] px-3 pt-3 md:pt-[2.5rem] pb-[2.5rem]">
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-28">
          <Tabs
            defaultValue="pickup"
            className="flex w-full flex-col gap-4 lg:w-2/3"
          >
            <Button
              className="w-fit p-0 text-[#FBEAD2] text-lg font-[500] tracking-[1px] hidden md:flex gap-2"
              onClick={() => router.back()}
              variant="link"
            >
              <MoveLeft /> <span>Back to Cart</span>
            </Button>
            <div className="flex w-full flex-col gap-3 border-b-[2px] border-[#131313] py-3 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-xl font-semibold text-[#7A7875]">
                {checkoutType === "delivery" ? "Delivery" : "Pickup"} Details
              </p>
              <TabsList className="flex h-fit w-fit gap-1 rounded-full bg-[#161616] px-1 py-1">
                <TabsTrigger
                  value="pickup"
                  className="rounded-full bg-transparent px-4 py-3 text-sm font-semibold text-gray-300 data-[state=active]:bg-primary data-[state=active]:text-gray-300"
                  onClick={() => setCheckoutType("pickup")}
                >
                  Pickup
                </TabsTrigger>
                {/* <TabsTrigger
                  value="delivery"
                  className="rounded-full bg-transparent px-4 py-3 text-sm font-semibold text-gray-300 data-[state=active]:bg-primary data-[state=active]:text-gray-300"
                  onClick={() => setCheckoutType("delivery")}
                >
                  Delivery
                </TabsTrigger> */}
              </TabsList>
            </div>
            <TabsContent value="pickup">
              {!restaurant?.isTakeAwayEnabled ? (
                <p>Pickup is unavailable at the moment.</p>
              ) : !isPickupNow ? (
                <p>Pickup is unavailable at the moment.</p>
              ) : restaurant?.minimumCollectionOrderAmount &&
                restaurant?.minimumCollectionOrderAmount >
                cartValue() +
                calculateServiceCharge(
                  cartValue(),
                  restaurant?.serviceCharge ?? 0,
                ) ? (
                <p>
                  The total amount must be greater than{" "}
                  {restaurant?.minimumCollectionOrderAmount}.
                </p>
              ) : (
                <Pickup />
              )}
            </TabsContent>
            <TabsContent value="delivery">
              {!restaurant?.isDeliveryEnabled ? (
                <p>Delivery is unavailable at the moment.</p>
              ) : !isDeliveryNow ? (
                <p>Delivery is unavailable at the moment.</p>
              ) : restaurant?.minimumDeliveryOrderAmount &&
                restaurant?.minimumDeliveryOrderAmount >
                cartValue() +
                calculateServiceCharge(
                  cartValue(),
                  restaurant?.serviceCharge ?? 0,
                ) ? (
                <p>
                  The total amount must be greater than{" "}
                  {restaurant?.minimumDeliveryOrderAmount}.
                </p>
              ) : (
                <Delivery />
              )}
            </TabsContent>
          </Tabs>

          <div className="flex w-full flex-col justify-end gap-3 lg:w-1/3 lg:flex-row mb-16 md:mb-0">
            <div className="flex h-fit w-full flex-col gap-7 rounded-md md:border-[2px] md:border-[#1e1e1e] md:px-4 md:py-5">
              <div className="w-full">
                <p className="text-xl font-[600] tracking-[0.6px] text-[#7A7875]">Order Summary</p>
              </div>
              <div className="flex flex-col">
                <div className="custom-scrollbar flex max-h-[300px] w-full flex-col overflow-x-auto overflow-y-scroll">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between border-b-[2px] border-b-[#1e1e1e] py-2"
                    >
                      <div className="flex items-center gap-2">
                        {item.images[0] ? (
                          <Image
                            src={item.images[0]}
                            alt="1"
                            width={435}
                            height={319}
                            className="aspect-square h-full max-h-[70px] w-auto rounded-md"
                          />
                        ) : (
                          <Image
                            src="/images/menu/items/item-placeholder.svg"
                            alt="item-placeholder"
                            width={106}
                            height={108}
                            className="aspect-square h-[70px] max-h-[70px] w-auto rounded-md"
                          />
                        )}
                        <div className="flex flex-col justify-between py-1">
                          <p className="line-clamp-1 text-lg font-normal text-[#FBEAD2]">
                            {item.name}
                          </p>
                          {/* {item.description && (
                            <p className="line-clamp-2 text-lg font-normal text-[#FBEAD2]">
                              {item.description}
                            </p>
                          )} */}
                          {item.modifiers.map((mod) => {
                            const modifier = items.find(
                              (item) => item._id === mod._idMenuItem,
                            )?.name;
                            return (
                              <div key={mod._idMenuItem}>
                                <p>1 X {modifier ? modifier : ""}</p>
                              </div>
                            );
                          })}
                          <p className="text-lg font-normal text-[#FBEAD2]">
                            {getCurrencySymbol(item.price.currency)}{" "}
                            {formattedItemPrice(item.price.value)}
                          </p>
                        </div>
                      </div>
                      {/* <Button
                        className="aspect-square p-2 hover:bg-transparent"
                        variant="ghost"
                        onClick={() => removeItem(item._idMenuItem)}
                      >
                        <Trash2 className="text-[#bc995d]" />
                      </Button> */}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <p className="text-lg font-light">Rewards & promos</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Gift or discount code"
                      className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 border-b-[#323232] bg-[#0c0c0c] outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                    />
                    <Button className="h-12">Apply</Button>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">Service Charge</p>
                    <p className="text-lg font-semibold">
                      {getCurrencySymbol("GBP")}{" "}
                      {calculateServiceCharge(
                        cartValue(),
                        restaurant?.serviceCharge ?? 0,
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Total Amount</p>
                    <p className="text-lg font-semibold">
                      {getCurrencySymbol("GBP")}{" "}
                      {(
                        cartValue() +
                        calculateServiceCharge(
                          cartValue(),
                          restaurant?.serviceCharge ?? 0,
                        )
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#a49e96]">
                      ALLERGIES:If you or someone you`re ordering for ha an
                      allergy, please contact the merchant directly to let them
                      know.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
