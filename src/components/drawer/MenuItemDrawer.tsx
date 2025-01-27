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
import { isRestaurantOpen } from "@/lib/is-restaurant-open";
import type { CartItemModifier } from "@/types/cart-item.type";
import type { MenuItem } from "@/types/menu";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { useRestaurant } from "@/context/RestaurantContext";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";

interface MenuItemPopupProps {
    children: React.ReactNode;
    item: MenuItem;
    setChoose: (open: boolean) => void;
}

const MenuItemDrawer: FC<MenuItemPopupProps> = ({ children, item, setChoose }) => {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedRadioValue, setSelectedRadioValue] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedModifiers, setSelectedModifiers] = useState<MenuItem[]>([]);
    const [showNote, setShowNote] = useState(false);
    const [note, setNote] = useState("");
    const { addItem } = useCart();
    const { items, restaurant } = useRestaurant();
    const isOpen = isRestaurantOpen(restaurant);

    useEffect(() => {
        item?.modifiers.map((_, index) =>
            GetModifiersFromItemId(item, items, index).map((modifier) => {
                if (modifier._id === item.modifiers.find((modifier) => modifier.defaultSelection)?.defaultSelection) {
                    if (selectedModifiers.length === 0) {
                        setSelectedModifiers([modifier]);
                        setSelectedRadioValue(modifier._id);
                    }
                }
            })
        );
    }, [item, selectedModifiers]);

    const handleModifierChange = (modifier: MenuItem, isChecked: boolean) => {
        setSelectedModifiers((prev) => (isChecked ? [...prev, modifier] : prev.filter((m) => m._id !== modifier._id)));
    };

    const handleRadioChange = (modifier: MenuItem) => {
        setSelectedModifiers((prev) => {
            const newModifiers = prev.filter((m) => {
                return !item?.modifiers.find((i) => !i.multiSelection)?.items.some((mod) => m._id === mod);
            });
            return [...newModifiers, modifier];
        });

        setSelectedRadioValue(modifier._id);
    };

    useEffect(() => {
        let price = 0;
        if (item) {
            if (item.takeawayPrice.value > 0) {
                price = item.takeawayPrice.value;
            } else if (item.price.value > 0) {
                price = item.price.value;
            } else {
                price = 0;
            }
        }
        for (const selectedModifier of selectedModifiers) {
            if (price) {
                price += selectedModifier.price.value;
            } else {
                price = selectedModifier.price.value;
            }
        }

        if (price) {
            price = parseFloat((price * quantity).toFixed(2));
        }

        setPrice(price);
    }, [item?.price.value, quantity, selectedModifiers]);

    const modifierquantity = (modifier: MenuItem) => {
        const quantity = selectedModifiers.filter((i) => i._id === modifier._id);
        return quantity.length;
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent
                className={cn("flex w-full flex-col justify-end border-[1px] border-menubackground bg-menubackground md:hidden lg:w-0", !item.modifiers ? "h-[50%]" : "h-[90%]")}
            >
                <DrawerTitle></DrawerTitle>
                <div
                    style={{
                        backgroundImage: item.images[0] && !item?.extras.hideMenuThumbNailImages ? `url(${item.images[0]})` : "/images/menu/items/item-placeholder.svg",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    className={cn("fixed top-0 h-[230px] w-full rounded-t-xl", (item.extras.hideMenuThumbNailImages || !item.images[0]) && "h-0")}
                ></div>
                <Button className="absolute right-2 top-2 z-50 rounded-full bg-black/50 px-3" variant="ghost" onClick={() => setOpen(false)}>
                    <Icons.close className="h-4 w-4" />
                </Button>
                <div className={cn("z-40 flex h-[90%] flex-col gap-5 overflow-y-scroll px-4", !item.images[0] && "h-[90%]")}>
                    <div className={cn("pt-48", (item.extras.hideMenuThumbNailImages || !item.images[0]) && "pt-0")}>
                        <div className="rounded-xl bg-menuforeground px-5 py-6">
                            {item && (
                                <div className="flex flex-col gap-2">
                                    <div className="z-40 flex w-full justify-between gap-2">
                                        <p className="w-[70%] text-lg font-semibold text-menusecondary">{item.name}</p>
                                        <p className="w-[30%] text-end text-lg font-semibold text-menusecondary">
                                            {item && item.takeawayPrice.value > 0 ? (
                                                <>
                                                    {getCurrencySymbol(item.takeawayPrice.currency)} {formattedItemPrice(item.takeawayPrice.value)}
                                                </>
                                            ) : (
                                                <>
                                                    {item && item.price.value > 0 ? (
                                                        <>
                                                            {getCurrencySymbol(item.price.currency)} {formattedItemPrice(item.price.value)}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {item && item.modifiers.length === 0 ? (
                                                                <>Free</>
                                                            ) : (
                                                                item?.modifiers.map((mod, index) =>
                                                                    GetModifiersFromItemId(item, items, index).map((modifier) => {
                                                                        if (modifier._id === item.modifiers.find((modifier) => modifier.defaultSelection)?.defaultSelection) {
                                                                            return `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`;
                                                                        } else {
                                                                            const _item = GetModifiersFromItemId(item, items, index);
                                                                            if (!_item[0]) return null;
                                                                            return `${getCurrencySymbol(_item[0].price.currency)} ${formattedItemPrice(_item[0].price.value)}`;
                                                                        }
                                                                    })
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <p className="text-sm font-[400] text-itemdescription">{item.description}</p>
                                    {showNote ? (
                                        <div className="flex w-full flex-col gap-2">
                                            <Label
                                                htmlFor="note"
                                                className="flex cursor-pointer items-center gap-2 text-menuprimary"
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
                                                className="border-none bg-menusecondary-foreground"
                                            />
                                        </div>
                                    ) : (
                                        <p
                                            className="flex w-fit cursor-pointer items-center gap-2 text-menuprimary hover:text-menuprimary hover:underline"
                                            onClick={() => {
                                                setShowNote(true);
                                            }}
                                        >
                                            <Icons.pencil />
                                            Write a note
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {item.modifiers.map((mod, index) => {
                        return (
                            <div className="rounded-xl bg-menuforeground px-5 py-6" key={index}>
                                <div className="flex flex-col gap-4 space-y-2">
                                    <div>
                                        <p className="w-full text-lg font-semibold text-itemdescription">{mod.header}</p>
                                        {mod.required ? (
                                            <p className="font-manrope text-sm font-[500] leading-none tracking-[1px] text-itemdescription">Select any options (Minimum One)</p>
                                        ) : (
                                            <p className="font-manrope text-sm font-[500] leading-none tracking-[1px] text-itemdescription">Addons are optional.</p>
                                        )}
                                    </div>
                                    <div className="z-40 flex h-full w-full flex-col gap-6">
                                        {mod?.multiSelection
                                            ? GetModifiersFromItemId(item, items, index).map((modifier) => (
                                                  <div
                                                      key={modifier._id}
                                                      className="flex w-full cursor-pointer items-center justify-between gap-4"
                                                      // onClick={() =>
                                                      //   handleModifierChange(
                                                      //     modifier,
                                                      //     !selectedModifiers.some(
                                                      //       (m) => m._id === modifier._id,
                                                      //     ),
                                                      //   )
                                                      // }
                                                  >
                                                      <div className="flex w-fit items-center justify-center gap-5">
                                                          <Label htmlFor={modifier._id} className="flex items-center gap-2 text-menusecondary">
                                                              {modifier.name}
                                                          </Label>
                                                          {modifierquantity(modifier) > 0 && mod.extraAllowed && (
                                                              <div className="flex items-center justify-center gap-3">
                                                                  <button
                                                                      className="rounded-full bg-transparent p-0 px-2 py-0 text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                                                                      onClick={() => {
                                                                          setSelectedModifiers((prev) => {
                                                                              const index = prev.findIndex((m) => m._id === modifier._id);
                                                                              if (index !== -1) {
                                                                                  const newModifiers = [...prev];
                                                                                  newModifiers.splice(index, 1);
                                                                                  return newModifiers;
                                                                              }
                                                                              return prev;
                                                                          });
                                                                      }}
                                                                  >
                                                                      <Minus className="h-4 w-4" />
                                                                  </button>
                                                                  <p className="text-base font-[500] text-menuprimary">{modifierquantity(modifier)}</p>
                                                                  <button
                                                                      className="rounded-full bg-transparent p-0 px-2 py-0 text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                                                                      onClick={() => {
                                                                          setSelectedModifiers((prev) => [...prev, modifier]);
                                                                      }}
                                                                  >
                                                                      <Plus className="h-4 w-4" />
                                                                  </button>
                                                              </div>
                                                          )}
                                                      </div>
                                                      <div className="flex gap-1">
                                                          <Label htmlFor={modifier._id} className="flex items-center gap-2 text-menusecondary">
                                                              {modifier.price && modifier.price.value > 0
                                                                  ? `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`
                                                                  : "FREE"}
                                                          </Label>
                                                          <Checkbox
                                                              id={modifier._id}
                                                              checked={selectedModifiers.some((m) => m._id === modifier._id)}
                                                              onCheckedChange={(checked) => handleModifierChange(modifier, checked as boolean)}
                                                              className="border-menusecondary"
                                                          />
                                                      </div>
                                                  </div>
                                              ))
                                            : item &&
                                              GetModifiersFromItemId(item, items, index).length > 0 && (
                                                  <div>
                                                      <RadioGroup
                                                          value={selectedRadioValue}
                                                          onValueChange={(value) => {
                                                              const selectedradio = GetModifiersFromItemId(item, items, index).find((m) => m._id === value);
                                                              if (selectedradio) {
                                                                  handleRadioChange(selectedradio);
                                                              }
                                                          }}
                                                      >
                                                          {GetModifiersFromItemId(item, items, index).map((modifier) => (
                                                              <div className="flex items-center justify-between gap-5 py-5" key={modifier._id}>
                                                                  <div className="flex flex-col items-start justify-center">
                                                                      <Label htmlFor={modifier._id} className="items-center gap-2 text-menusecondary">
                                                                          {modifier.name}
                                                                      </Label>
                                                                      <Label
                                                                          htmlFor={modifier._id}
                                                                          className="items-center gap-2 font-manrope text-base font-[400] text-menusecondary"
                                                                      >
                                                                          {modifier.description}
                                                                      </Label>
                                                                  </div>
                                                                  <div className="flex items-center justify-center gap-1">
                                                                      <Label htmlFor={modifier._id} className="flex items-center gap-2 text-menusecondary">
                                                                          {modifier.price && modifier.price.value > 0
                                                                              ? `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`
                                                                              : "FREE"}
                                                                      </Label>
                                                                      <RadioGroupItem id={modifier._id} value={modifier._id} className="h-4 w-4 border-menuprimary" />
                                                                  </div>
                                                              </div>
                                                          ))}
                                                      </RadioGroup>
                                                  </div>
                                              )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {BetaMenuActive && isOpen && item.extras?.availability?.days.includes(format(Date.now(), "EEEE").toLowerCase()) && item.extras?.menuItemOrderType === "both" && (
                    <DrawerFooter className="flex w-full flex-row justify-start gap-5">
                        <div className="flex h-12 w-1/2 items-center justify-center gap-3 rounded-none bg-menuprimary p-2 text-menuforeground">
                            <Button
                                className="h-full w-1/3 rounded-full bg-transparent p-0 text-menuforeground shadow-none hover:bg-transparent"
                                onClick={() => {
                                    setQuantity((prev) => Math.max(prev - 1, 1));
                                }}
                            >
                                <Minus className="text-menuforeground" />
                            </Button>
                            <span className="text-lg font-medium text-menuforeground">{quantity}</span>
                            <Button
                                className="h-full w-1/3 rounded-full bg-transparent p-0 shadow-none hover:bg-transparent"
                                onClick={() => {
                                    setQuantity((prev) => prev + 1);
                                }}
                            >
                                <Plus className="text-menuforeground" />
                            </Button>
                        </div>
                        <Button
                            type="submit"
                            className="h-12 w-1/2 rounded-none bg-menuprimary text-lg font-medium text-menuforeground"
                            onClick={() => {
                                const modifiers: CartItemModifier[] = [];
                                for (const selectedModifier of selectedModifiers) {
                                    modifiers.push({
                                        _idModifiers: item?.modifiers[0]?._id ? item?.modifiers[0]?._id : "",
                                        price: selectedModifier.price,
                                        _idMenuItem: selectedModifier._id,
                                    });
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
                                    notes: note,
                                    images: item.images,
                                    description: item.description,
                                });
                                toast.success("Item added to cart");
                                setOpen(false);
                                setChoose(false);
                                setQuantity(1);
                                setSelectedModifiers([]);
                            }}
                        >
                            Add &nbsp;{getCurrencySymbol(item.price.currency)}
                            <span className="tracking-[1px]">{formattedItemPrice(price)}</span>
                        </Button>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default MenuItemDrawer;
