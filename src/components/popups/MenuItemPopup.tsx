"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { BetaMenuActive } from "@/lib/constants";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { GetModifiersFromItemId } from "@/lib/get-modifiers-from-item-id";
import type { CartItemModifier } from "@/types/cart-item.type";
import type { MenuItem } from "@/types/menu-item.type";
import Image from "next/image";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface MenuItemPopupProps {
  children: React.ReactNode;
  item: MenuItem;
}

const MenuItemPopup: FC<MenuItemPopupProps> = ({ children, item }) => {
  const [showNote, setShowNote] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(item.price.value);
  const [note, setNote] = useState("");
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
        ?
        [...prev, modifier]
        :
        prev.filter((m) => m._id !== modifier._id),
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="hidden md:flex flex-col gap-3 max-w-0 bg-background lg:max-w-[625px] max-h-[625px] p-0">
        <div className="hidden md:flex flex-col overflow-y-scroll hidden-scrollbar rounded-lg pb-[50px]">
          {item.images[0] && (
            <Image
              src={item.images[0]}
              width={1980}
              height={1080}
              alt={item.name}
              className="h-auto md:max-h-[350px] w-full object-cover"
            />
          )}
          <div className="px-6 py-6 flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle className="text-black">{item.name}</DialogTitle>
              <DialogDescription>
                {item.description ?? "No description available"}
              </DialogDescription>
            </DialogHeader>
            {showNote ? (
              <div className="flex w-full flex-col gap-2 overflow-y-scroll hidden-scrollbar">
                <Label
                  htmlFor="note"
                  className="flex cursor-pointer items-center gap-2 text-black"
                  onClick={() => {
                    setShowNote(false);
                  }}
                >
                  <Icons.pencil />
                  Add Note
                </Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="border-none bg-gray-200"
                />
              </div>
            ) : (
              <p
                className="flex w-fit cursor-pointer items-center gap-2 underline"
                onClick={() => {
                  setShowNote(true);
                }}
              >
                <Icons.pencil />
                Write a note
              </p>
            )}
            {GetModifiersFromItemId(item).length > 0 && (
              <div className="space-y-2">
                <Label className="text-lg font-semibold text-black">
                  Modifiers
                </Label>
                {/* max-h-[100px] */}
                <div className="custom-scrollbar flex h-full max-h-[200px] w-full flex-col gap-2 overflow-y-scroll">
                  {GetModifiersFromItemId(item).map((modifier) => (
                    <div
                      key={modifier._id}
                      className="flex w-full cursor-pointer items-center gap-4"
                    // onClick={() =>
                    //   handleModifierChange(
                    //     modifier,
                    //     !selectedModifiers.some((m) => m._id === modifier._id),
                    //   )
                    // }
                    >
                      <Checkbox
                        id={modifier._id}
                        checked={selectedModifiers.some(
                          (m) => m._id === modifier._id,
                        )}
                        onCheckedChange={(checked) =>
                          handleModifierChange(modifier, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={modifier._id}
                        className="flex items-center gap-2 text-black"
                      >
                        {modifier.name}
                        {modifier.price &&
                          `(+${getCurrencySymbol(modifier.price.currency)}${modifier.price.value})`}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {BetaMenuActive && (
          <DialogFooter className="fixed bottom-0 bg-white w-full h-fit flex flex-row justify-end gap-2 p-2 rounded-lg">
            <div className="flex h-full w-fit items-center gap-3 bg-gray-300 p-2 text-primary rounded-lg px-6 py-2">
              <Button
                className="h-full w-fit rounded-full bg-transparent p-0 hover:bg-transparent"
                onClick={() => {
                  setQuantity((prev) => Math.max(prev - 1, 1));
                }}
              >
                <Icons.remove className="text-[#282828]" />
              </Button>
              {quantity}
              <Button
                className="h-full w-fit rounded-full bg-transparent p-0 hover:bg-transparent"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                <Icons.add className="text-[#282828]" />
              </Button>
            </div>
            <Button
              type="submit"
              className="text-base font-medium leading-[80%] py-5 px-5 text-white"
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
                setNote("");
                setSelectedModifiers([]);
              }}
            >
              Add to cart - {getCurrencySymbol(item.price.currency)}
              {price}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemPopup;