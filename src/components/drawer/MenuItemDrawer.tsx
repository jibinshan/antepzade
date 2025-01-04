"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { BetaMenuActive } from "@/lib/constants";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { GetModifiersFromItemId } from "@/lib/get-modifiers-from-item-id";
import type { CartItemModifier } from "@/types/cart-item.type";
import type { MenuItem } from "@/types/menu-item.type";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";

interface MenuItemPopupProps {
  children: React.ReactNode;
  item: MenuItem;
}

const MenuItemDrawer: FC<MenuItemPopupProps> = ({ children, item }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(item.price.value);
  const [selectedModifiers, setSelectedModifiers] = useState<MenuItem[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    let price = item.price.value;

    for (const selectedModifier of selectedModifiers) {
      price += selectedModifier.price.value;
    }

    price = parseFloat((price * quantity).toFixed(2));

    setPrice(price);
  }, [item.price.value, quantity, selectedModifiers]);

  const handleModifierChange = (modifier: MenuItem, isChecked: boolean) => {
    setSelectedModifiers((prev) =>
      isChecked
        ? [...prev, modifier]
        : prev.filter((m) => m._id !== modifier._id),
    );
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex min-h-[620px] w-full flex-col justify-end border-[1px] bg-[#f8f8f8] lg:hidden lg:w-0 rounded-t-xl">
        <div
          style={{
            backgroundImage: item.images[0]
              ? `url(${item.images[0]})`
              : "/images/menu/items/item-placeholder.svg",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="fixed top-0 h-[230px] w-full rounded-t-xl"
        ></div>
        <Button
          className="/50 absolute right-2 top-2 z-50 rounded-full bg-black px-2 py-1"
          variant="ghost"
          onClick={() => setOpen(false)}
        >
          <Icons.close className="h-4 w-4" />
        </Button>
        <div className="z-40 flex h-[550px] flex-col gap-5 overflow-y-scroll px-4">
          <div className="pt-48">
            <div className="rounded-lg bg-gray-200 px-5 py-6">
              {item && (
                <div className="flex flex-col gap-2">
                  <div className="z-40 flex w-full justify-between gap-2">
                    <p className="text-lg font-semibold text-black">{item.name}</p>
                    <p className="text-lg font-semibold text-black">
                      {getCurrencySymbol(item?.price?.currency)}{" "}
                      {formattedItemPrice(item.price.value)}
                    </p>
                  </div>
                  <p className="text-black">{item.description}</p>
                </div>
              )}
            </div>
          </div>
          {GetModifiersFromItemId(item).length > 0 && (
            <div className="rounded-lg bg-gray-200 px-5 py-6">
              <div className="flex flex-col gap-4 space-y-2">
                <p className="w-full border-b-[0.5px] pb-3 text-lg font-semibold text-black">
                  Modifiers
                </p>
                <div className="z-40 flex h-full w-full flex-col gap-2">
                  {GetModifiersFromItemId(item).map((modifier) => (
                    <div
                      key={modifier._id}
                      className="flex w-full cursor-pointer items-center justify-between gap-4"
                      onClick={() =>
                        handleModifierChange(
                          modifier,
                          !selectedModifiers.some(
                            (m) => m._id === modifier._id,
                          ),
                        )
                      }
                    >
                      <Label
                        htmlFor={modifier._id}
                        className="flex items-center gap-2 text-black"
                      >
                        {modifier.name}
                      </Label>
                      <div className="flex gap-1">
                        <Label
                          htmlFor={modifier._id}
                          className="flex items-center gap-2 text-[#FBEAD2]"
                        >
                          {getCurrencySymbol(modifier?.price?.currency)}{" "}
                          {formattedItemPrice(modifier.price.value)}
                        </Label>
                        <Checkbox
                          id={modifier._id}
                          checked={selectedModifiers.some(
                            (m) => m._id === modifier._id,
                          )}
                          onCheckedChange={(checked) =>
                            handleModifierChange(modifier, checked as boolean)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {BetaMenuActive && (
          <DrawerFooter className="flex w-full flex-row justify-start gap-2">
            <div className="flex h-12 w-1/2 items-center justify-center gap-3 bg-gray-200 p-2 text-black rounded-lg">
              <Button
                className="h-full w-1/3 rounded-full bg-transparent p-0 hover:bg-transparent"
                onClick={() => {
                  setQuantity((prev) => Math.max(prev - 1, 1));
                }}
              >
                <Icons.remove className="text-[#282828]" />
              </Button>
              {quantity}
              <Button
                className="h-full w-1/3 rounded-full bg-transparent p-0 hover:bg-transparent"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                <Icons.add className="text-[#282828]" />
              </Button>
            </div>
            <Button
              type="submit"
              className="w-1/2 rounded-md text-base font-medium py-6 text-white"
              onClick={() => {
                const modifiers: CartItemModifier[] = [];
                for (const selectedModifier of selectedModifiers) {
                  const modifier = item.modifiers.find(
                    (m) => m._id === selectedModifier._id,
                  );
                  if (modifier) {
                    modifiers.push({
                      _idModifiers: modifier._id!,
                      price: modifier.price,
                    });
                  }
                }
                addItem({
                  name: item.name,
                  _idMenuItem: item._id,
                  quantity,
                  price: {
                    value: price,
                    currency: item.price.currency,
                  },
                  modifiers: modifiers,
                  images: item.images,
                  description: item.description,
                });
                toast.success("Item added to cart");
                setOpen(false);
                setQuantity(1);
                setSelectedModifiers([]);
              }}
            >
              Add to cart - {getCurrencySymbol(item.price.currency)}
              {price}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MenuItemDrawer;
