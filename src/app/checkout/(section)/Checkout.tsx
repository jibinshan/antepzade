"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { MoveLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Delivery from "./Delivery";
import Pickup from "./Pickup";
import { useRestaurant } from "@/context/RestaurantContext";
import { calculateServiceCharge } from "@/lib/calculate-service-charge";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, removeItem, cartValue } = useCart();
  const [checkoutType, setCheckoutType] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const { restaurant } = useRestaurant();

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[1300px] flex-col gap-[2.5rem] px-2 py-[2.5rem]">
        <div className="flex flex-col-reverse gap-3 lg:flex-row lg:justify-between lg:gap-28">
          <Tabs
            defaultValue="delivery"
            className="flex w-full flex-col gap-4 lg:w-2/3"
          >
            <Button
              className="hidden w-fit p-0 text-white lg:flex lg:gap-2"
              onClick={() => router.back()}
              variant="link"
            >
              <MoveLeft /> <span>Back to Cart</span>
            </Button>
            <div className="flex w-full flex-col gap-3 border-b-[2px] border-primary py-3 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-xl font-semibold text-black">
                {checkoutType === "delivery" ? "Delivery" : "Pickup"} Details
              </p>
              <TabsList className="flex h-fit w-fit gap-1 rounded-full bg-[#f8f8f8] px-1 py-1">
                <TabsTrigger
                  value="pickup"
                  className="rounded-full bg-transparent px-4 py-3 text-sm font-semibold text-black data-[state=active]:bg-primary data-[state=active]:text-[#282828]"
                  onClick={() => setCheckoutType("pickup")}
                >
                  Pickup
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="rounded-full bg-transparent px-4 py-3 text-sm font-semibold text-black data-[state=active]:bg-primary data-[state=active]:text-[#282828]"
                  onClick={() => setCheckoutType("delivery")}
                >
                  Delivery
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="pickup">
              <Pickup />
            </TabsContent>
            <TabsContent value="delivery">
              <Delivery />
            </TabsContent>
          </Tabs>

          <div className="flex w-full flex-col justify-end gap-3 lg:w-1/3 lg:flex-row">
            <p
              className="flex gap-2 lg:hidden lg:w-0"
              onClick={() => router.back()}
            >
              <MoveLeft /> <span>Back to Cart</span>
            </p>
            <div className="flex h-fit w-full flex-col gap-7 rounded-md border-[2px] border-primary px-4 py-5">
              <div className="w-full">
                <p className="text-lg font-semibold text-black">Order Summary</p>
              </div>
              <div className="flex flex-col">
                <div className="custom-scrollbar flex max-h-[300px] w-full flex-col overflow-x-auto overflow-y-scroll">
                  {cartItems.map((item) => (
                    <div
                      key={item._idMenuItem}
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
                          <p className="line-clamp-1 text-lg font-normal text-black">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="line-clamp-2 text-lg font-normal text-black">
                              {item.description}
                            </p>
                          )}
                          <p className="text-lg font-normal text-black">
                            {getCurrencySymbol(item.price.currency)}{" "}
                            {formattedItemPrice(item.price.value)}
                          </p>
                        </div>
                      </div>
                      <Button
                        className="aspect-square p-2 hover:bg-transparent"
                        variant="ghost"
                        onClick={() => removeItem(item._idMenuItem)}
                      >
                        <Trash2 className="text-primary" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <p className="text-lg font-light text-black">Rewards & promos</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Gift or discount code"
                      className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 text-black bg-[#f8f8f8] outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                    />
                    <Button>Apply</Button>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-black">Service Charge</p>
                    <p className="text-lg font-semibold text-black">
                      {getCurrencySymbol("GBP")}{" "}
                      {calculateServiceCharge(
                        cartValue(),
                        restaurant?.serviceCharge ?? 0,
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-black">Total Amount</p>
                    <p className="text-lg font-semibold text-black">
                      {getCurrencySymbol("GBP")}{" "}
                      {cartValue() +
                        calculateServiceCharge(
                          cartValue(),
                          restaurant?.serviceCharge ?? 0,
                        )}
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
