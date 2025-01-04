"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = ({ }) => {
  const router = useRouter();
  const { cartItems, updateItem, removeItem, cartValue } = useCart();
  const totalAmount = parseFloat(
    cartItems
      .reduce((total, item) => {
        return total + (item.price?.value || 0);
      }, 0)
      .toFixed(2),
  );
  return (
    <section className="flex h-full min-h-[90vh] w-full max-w-[1300px] flex-col gap-4 pt-4">
      <div className="px-6">
        <Card className="flex max-h-[500px] w-full flex-1 flex-col justify-between border-[1px]">
          <h1 className="flex items-end gap-4 border-b-[1px] border-dashed p-4 font-playfair text-3xl font-semibold text-black">
            Cart
          </h1>
          <div className="custom-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-scroll py-4 pl-4 pr-4 text-black">
            {cartItems.map((item, index) => (
              <div
                key={item._idMenuItem}
                className={`flex max-h-[150px] w-full items-center justify-between gap-2 py-4 ${index !== cartItems.length - 1
                  ? "border-b border-dashed border-[#BC995D66]"
                  : ""
                  }`}
              >
                <div className="flex gap-2">
                  <div className="flex flex-col items-start justify-between">
                    <p className="font-semibold">{item.name}</p>
                    <p className="font-semibold">
                      £ {formattedItemPrice(item.price.value)}
                    </p>
                  </div>
                </div>
                <div className="flex h-fit w-fit items-center gap-3 bg-[#BC995D] p-2 text-black">
                  <Button
                    className="h-fit w-fit rounded-full bg-transparent p-0 hover:bg-transparent"
                    onClick={() => {
                      if (item.quantity <= 1) {
                        return removeItem(item._idMenuItem);
                      }
                      updateItem(item._idMenuItem, item.quantity - 1);
                    }}
                  >
                    <Icons.remove className="text-[#282828]" />
                  </Button>
                  {item.quantity}
                  <Button
                    className="h-fit w-fit rounded-full bg-transparent p-0 hover:bg-transparent"
                    onClick={() => {
                      updateItem(item._idMenuItem, item.quantity + 1);
                    }}
                  >
                    <Icons.add className="text-[#282828]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-t-[1px] border-dashed p-4 text-lg font-semibold">
            <p className="text-primary">Items: {cartItems.length || 0}</p>
            <p className="text-primary">Total: £ {totalAmount || 0}</p>
          </div>
        </Card>
      </div>
      <div className="fixed bottom-0 flex w-full max-w-[1300px] gap-3 px-4 py-3">
        <Button
          type="button"
          className="w-1/2 cursor-pointer justify-center rounded-md h-12 text-black hover:text-black"
          variant="outline"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          type="submit"
          className={cn(
            "w-1/2 justify-between rounded-md h-12",
            cartItems.length === 0 && "pointer-events-none cursor-not-allowed",
          )}
          asChild
          disabled={cartItems.length === 0 ? true : false}
        >
          <Link href="/checkout">
            Checkout
            <span className="font-semibold text-[#282828]">
              £ {formattedItemPrice(cartValue())}
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Cart;
