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
import type { CartItem, CartItemModifier } from "@/types/cart-item.type";
import type { MenuItem } from "@/types/menu";
import { type FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Drawer, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { useRestaurant } from "@/context/RestaurantContext";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

interface MenuItemPopupProps {
    children: React.ReactNode;
    item: CartItem;
    index: number;
}

const EditMenuItemDrawer: FC<MenuItemPopupProps> = ({ children, item, index }) => {
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(item.price.value);
    const [selectedModifiers, setSelectedModifiers] = useState<MenuItem[]>([]);
    const [selectedRadioValue, setSelectedRadioValue] = useState('');
    const [showNote, setShowNote] = useState(false);
    const { items } = useRestaurant();
    const { updateItem } = useCart();
    // console.log(index, item, "===inde");

    // Find the cart item using the index
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");

    const handleModifierChange = (modifier: MenuItem, isChecked: boolean) => {
        setSelectedModifiers((prev) => (isChecked ? [...prev, modifier] : prev.filter((m) => m._id !== modifier._id)));
    };
    const menuitem = items.find((i) => i._id === item._idMenuItem)

    const handleRadioChange = (modifier: MenuItem) => {
        setSelectedModifiers((prev) => {
            const newModifiers = prev.filter((m) => {
                return !menuitem?.modifiers.find((i) => !i.multiSelection)?.items.some((mod) => m._id === mod);
            });
            return [...newModifiers, modifier];
        });

        setSelectedRadioValue(modifier._id);
    };

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity ?? 1);
            setNote(item.notes ?? "");
            if (item.notes) {
                setShowNote(true)
            }
            // Clear existing selections
            setSelectedModifiers([]);

            // Add current modifiers
            if (item.modifiers) {
                const modifiers = item.modifiers
                    .map((mod) => {
                        const modifier = items.find((item) => item._id === mod._idMenuItem);
                        return modifier;
                    })
                    .filter((mod): mod is MenuItem => mod !== undefined);

                setSelectedModifiers(modifiers);
                const multiselect = items.find((m) => m.modifiers.some((mod) => !mod.multiSelection))?.modifiers.find((m) => !m.multiSelection);
                if (multiselect) {
                    multiselect?.items.map((mod) => {
                        if (mod === modifiers.find((m) => m._id)?._id) {
                            setSelectedRadioValue(mod)
                        }
                    })
                }
            }
        }
    }, [item, items])


    // useEffect(() => {
    //     if (!item || !selectedModifiers || quantity === 0) return;

    //     const basePrice = menuitem?.price.value;

    //     // Calculate the total price of selected modifiers

    //     // Calculate the total price as: (basePrice + modifiersTotal) * quantity
    //     const modifiersTotal = selectedModifiers.reduce((sum, mod) => sum + mod.price.value, 0);
    //     if (basePrice) {
    //         const totalPrice = parseFloat(((basePrice + modifiersTotal) * quantity).toFixed(2));
    //         setPrice(totalPrice);
    //     }


    // }, [menuitem?.price.value, selectedModifiers, quantity, item]);

    useEffect(() => {
        let price = 0;
        if (menuitem) {
            if (menuitem.takeawayPrice.value > 0) {
                price = menuitem.takeawayPrice.value;
            } else if (menuitem.price.value > 0) {
                price = menuitem.price.value;
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
        const quantity = selectedModifiers.filter((i) => i._id === modifier._id)
        return quantity.length
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className={cn("flex w-full flex-col justify-end border-[1px] border-menubackground bg-menubackground md:hidden lg:w-0", !item.modifiers ? "h-[50%]" : "h-[90%]")}>
                <DrawerTitle></DrawerTitle>
                <div
                    style={{
                        backgroundImage: item.images[0] ? `url(${item.images[0]})` : "/images/menu/items/item-placeholder.svg",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    className={cn(
                        "fixed top-0 h-[230px] w-full rounded-t-xl",
                        !item.images[0] && "h-0",
                    )}
                ></div>
                <Button className="bg-black/50 absolute right-2 top-2 z-50 rounded-full px-3" variant="ghost" onClick={() => setOpen(false)}>
                    <Icons.close className="h-4 w-4" />
                </Button>
                <div className={cn(
                    "z-40 flex h-[90%] flex-col gap-5 overflow-y-scroll  px-4",
                    !item.images[0] && "h-[90%]",
                )}>
                    <div className={cn("pt-48", !item.images[0] && "pt-0")}>
                        <div className="rounded-md bg-menuforeground px-5 py-6">
                            {menuitem && (
                                <div className="flex flex-col gap-2">
                                    <div className="z-40 flex w-full justify-between gap-2">
                                        <p className="text-lg font-semibold text-menusecondary">{menuitem?.name}</p>
                                        <p className="text-lg font-semibold text-menusecondary">
                                            {menuitem && menuitem.takeawayPrice.value > 0 ? (
                                                <>
                                                    {getCurrencySymbol(menuitem.takeawayPrice.currency)} {formattedItemPrice(menuitem.takeawayPrice.value)}
                                                </>
                                            ) : (
                                                <>
                                                    {menuitem && menuitem.price.value > 0 ? (
                                                        <>
                                                            {getCurrencySymbol(menuitem.price.currency)} {formattedItemPrice(menuitem.price.value)}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {menuitem && menuitem.modifiers.length === 0 ? (
                                                                <>Free</>
                                                            ) : (
                                                                menuitem?.modifiers.map((mod, index) => (
                                                                    GetModifiersFromItemId(menuitem, items, index).map((modifier) => {
                                                                        if (modifier._id === menuitem.modifiers.find((modifier) => modifier.defaultSelection)?.defaultSelection) {
                                                                            return `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`;
                                                                        }
                                                                    })
                                                                ))
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <p className="text-itemdescription text-sm font-[400]">{item.description}</p>
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
                                            className="flex w-fit cursor-pointer items-center gap-2 text-menuprimary hover:underline hover:text-menuprimary"
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
                    {menuitem?.modifiers.map((mod, index) => {
                        return (
                            <div className="rounded-xl bg-menuforeground px-5 py-6" key={index}>
                                <div className="flex flex-col gap-4 space-y-2">
                                    <div>
                                        <p className="w-full text-lg font-semibold text-itemdescription">
                                            {mod.header}
                                        </p>
                                        {mod.required ? (
                                            <p className="font-manrope text-sm font-[500] leading-none tracking-[1px] text-itemdescription">
                                                Select any options (Minimum One)
                                            </p>
                                        ) :
                                            (
                                                <p className="font-manrope text-sm font-[500] leading-none tracking-[1px] text-itemdescription">
                                                    Addons are optional.
                                                </p>
                                            )
                                        }
                                    </div>
                                    <div className="z-40 flex h-full w-full flex-col gap-6">
                                        {
                                            mod?.multiSelection ? (
                                                GetModifiersFromItemId(menuitem, items, index).map(
                                                    (modifier) => (
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
                                                            <div className="w-fit flex justify-center items-center gap-5">
                                                                <Label
                                                                    htmlFor={modifier._id}
                                                                    className="flex items-center gap-2 text-menusecondary"
                                                                >
                                                                    {modifier.name}
                                                                </Label>
                                                                {modifierquantity(modifier) > 0 && mod.extraAllowed && (
                                                                    <div className="flex gap-3 items-center justify-center">
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
                                                                        <p className="text-base text-menuprimary font-[500]">
                                                                            {
                                                                                modifierquantity(modifier)
                                                                            }
                                                                        </p>
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
                                                                <Label
                                                                    htmlFor={modifier._id}
                                                                    className="flex items-center gap-2 text-menusecondary"
                                                                >
                                                                    {modifier.price &&
                                                                        modifier.price.value > 0 ?
                                                                        `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`
                                                                        :
                                                                        "FREE"
                                                                    }
                                                                </Label>
                                                                <Checkbox
                                                                    id={modifier._id}
                                                                    checked={selectedModifiers.some(
                                                                        (m) => m._id === modifier._id,
                                                                    )}
                                                                    onCheckedChange={(checked) =>
                                                                        handleModifierChange(modifier, checked as boolean)
                                                                    }
                                                                    className="border-menusecondary"
                                                                />
                                                            </div>
                                                        </div>
                                                    ),
                                                )
                                            ) :
                                                (
                                                    item && GetModifiersFromItemId(menuitem, items, index).length > 0 && (
                                                        <div>
                                                            <RadioGroup
                                                                value={selectedRadioValue}
                                                                onValueChange={(value) => {
                                                                    const selectedradio = GetModifiersFromItemId(menuitem, items, index).find((m) => m._id === value);
                                                                    if (selectedradio) {
                                                                        handleRadioChange(selectedradio);
                                                                    }
                                                                }}
                                                            >
                                                                {GetModifiersFromItemId(menuitem, items, index).map((modifier) => (
                                                                    <div className="flex items-center justify-between gap-5 py-5" key={modifier._id}>
                                                                        <div className="flex flex-col items-start justify-center">
                                                                            <Label htmlFor={modifier._id} className="items-center gap-2 text-menusecondary">
                                                                                {modifier.name}
                                                                            </Label>
                                                                            <Label htmlFor={modifier._id} className="items-center gap-2 font-manrope text-base font-[400] text-menusecondary">
                                                                                {modifier.description}
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex items-center justify-center gap-1">
                                                                            <Label
                                                                                htmlFor={modifier._id}
                                                                                className="flex items-center gap-2 text-menusecondary">
                                                                                {modifier.price &&
                                                                                    modifier.price.value > 0 ?
                                                                                    `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`
                                                                                    :
                                                                                    "FREE"
                                                                                }
                                                                            </Label>
                                                                            <RadioGroupItem
                                                                                id={modifier._id}
                                                                                value={modifier._id}
                                                                                className="h-4 w-4 border-menuprimary"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </div>
                                                    )
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {BetaMenuActive && (
                    <DrawerFooter className="flex w-full flex-row justify-start gap-5">
                        <div className="flex h-12 w-1/2 items-center justify-center gap-3 rounded-none bg-menuprimary text-menuforeground p-2 text-menu">
                            <Button
                                className="h-full w-1/3 rounded-full bg-transparent p-0 hover:bg-transparent"
                                onClick={() => {
                                    setQuantity((prev) => Math.max(prev - 1, 1));
                                }}
                            >
                                <Minus className="text-menuforeground" />
                            </Button>
                            {quantity}
                            <Button
                                className="h-full w-1/3 rounded-full bg-transparent p-0 hover:bg-transparent"
                                onClick={() => {
                                    setQuantity((prev) => prev + 1);
                                }}
                            >
                                <Plus className="text-menuforeground" />
                            </Button>
                        </div>
                        <Button
                            type="submit"
                            className="w-1/2 h-12 text-base text-menuforeground bg-menuprimary hover:bg-menuprimary font-medium rounded-none"
                            onClick={() => {
                                if (!item || !item) {
                                    toast.error("Cart item not found");
                                    return;
                                }

                                // Convert selected modifiers to CartItemModifier format
                                const modifiers: CartItemModifier[] = selectedModifiers.map((mod) => ({
                                    _idModifiers: menuitem?.modifiers[0]?._id ?? "",
                                    _idMenuItem: mod._id,
                                    price: mod.price,
                                }));

                                // Create updated item while preserving the original item's properties
                                const updatedItem: CartItem = {
                                    ...item,
                                    quantity,
                                    price: {
                                        value: price ?? 0,
                                        currency: item.price.currency,
                                    },
                                    notes: note,
                                    modifiers,
                                };

                                updateItem(updatedItem, index);
                                console.log(updatedItem, index, "===update");

                                toast.success("Item updated");
                                setOpen(false);
                                setQuantity(1);
                                setSelectedModifiers([]);

                            }}
                        >
                            Update . &nbsp;{getCurrencySymbol(item.price.currency)}
                            <span className="tracking-[1px]">
                                {formattedItemPrice(price)}
                            </span>
                        </Button>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer >
    );
};

export default EditMenuItemDrawer;
