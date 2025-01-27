"use client";
import { useEffect, useState, type FC } from "react";
import { useRestaurant } from "@/context/RestaurantContext";
import { getMenuItemById } from "@/lib/get-menu-item-by-id";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Triangle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GetModifiersFromItemId } from "@/lib/get-modifiers-from-item-id";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import type { MenuItem } from "@/types/menu";
import type { CartItem, CartItemModifier } from "@/types/cart-item.type";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/Icon";
import { Textarea } from "@/components/ui/textarea";

interface MenuItemProps {
    itemId: string;
}

const MenuItems: FC<MenuItemProps> = ({ itemId }) => {
    const [selectedModifiers, setSelectedModifiers] = useState<MenuItem[]>([]);
    const { items } = useRestaurant();
    const { cartItems, updateItem } = useCart();

    // Find the cart item using the index
    const cartItemIndex = parseInt(itemId);
    const reversedCartItems = [...cartItems].reverse();
    const cartItem = reversedCartItems[cartItemIndex];
    const item = cartItem ? getMenuItemById(cartItem._idMenuItem, items) : null;
    const [selectedRadioValue, setSelectedRadioValue] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(item?.price?.value);
    const [note, setNote] = useState("");
    const [showNote, setShowNote] = useState(false);
    const router = useRouter();

    const handleModifierChange = (modifier: MenuItem, isChecked: boolean) => {
        setSelectedModifiers((prev) => {
            if (isChecked) {
                return [...prev, modifier];
            } else {
                return prev.filter((m) => m._id !== modifier._id);
            }
        });
    };

    const handleRadioChange = (modifier: MenuItem) => {
        // setSelectedModifiers((prev) => {
        //     if (prev) {
        //         prev.filter((m) => {
        //             item?.modifiers.find((i) => !i.multiSelection)?.items.map((mod) => {
        //                 if (m._id === mod) {
        //                     return m._id !== mod
        //                 }
        //                 return [...prev, modifier]
        //             }
        //             )
        //         })
        //     } else {

        //         return [modifier]
        //     }
        // });

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

    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity ?? 1);
            setNote(cartItem.notes ?? "");
            if (cartItem.notes) {
                setShowNote(true)
            }
            // Clear existing selections
            setSelectedModifiers([]);

            // Add current modifiers
            if (cartItem.modifiers) {
                const modifiers = cartItem.modifiers
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
    }, [cartItem, items]);

    const modifierquantity = (modifier: MenuItem) => {
        const quantity = selectedModifiers.filter((i) => i._id === modifier._id)
        return quantity.length
    }

    return (
        <section className="w-full flex flex-col gap-6 px-4 py-10 md:px-[100px] bg-menubackground">
            <Button className="flex w-fit items-center justify-center gap-2 bg-menuprimary px-6 py-6 font-manrope text-lg font-[600] text-menuforeground hover:bg-buttonhover rounded-none" onClick={() => router.push("/menu")}>
                <Image src="/images/arrowleft.svg" width={26} height={19} alt="Back" className="h-5 w-5" />
                <span className="leading-none">Menu</span>
            </Button>

            <div className="mb-[13vh] flex w-full items-start justify-center gap-5">
                <div
                    className={cn(
                        "flex w-full max-w-[700px] flex-col items-start justify-center gap-4 bg-itembackground px-5 py-5",
                        item?.modifiers.length !== 0 && "w-1/3",
                        !item && "hidden h-0 w-0"
                    )}
                >
                    <div className="relative w-full">
                        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-end justify-center overflow-hidden">
                            <Image src="/images/image.svg" width={1175} height={119} alt="image" className="h-auto w-full object-cover" />
                        </div>
                        {item && item.images.length > 0 ? (
                            <Image src={item.images[0]!} className="h-auto w-full object-cover md:max-h-[350px]" alt={item.name} width={1980} height={1080} />
                        ) : (
                            <div className="z-10 h-[350px] w-full bg-black/30 object-cover md:max-h-[350px]"></div>
                        )}
                    </div>
                    <p className="font-manrope text-2xl font-[700] tracking-[1px] text-menusecondary">{item?.name}</p>
                    <p className="max-w-[70%] font-manrope text-base font-[500] lowercase text-itemdescription">{item?.description}</p>
                    <div className="flex items-center justify-center gap-4">
                        <p className="rounded-full bg-menusecondary-foreground px-4 py-1 text-xl font-[400] tracking-[1.5px] text-menuprimary">
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
                                                item?.modifiers.map((mod, index) => (
                                                    GetModifiersFromItemId(item, items, index).map((modifier) => {
                                                        if (modifier._id === item.modifiers.find((modifier) => modifier.defaultSelection)?.defaultSelection) {
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
                        <p>{item?.isVeg && <span className="rounded-full bg-[#1a8425] px-3 py-1 font-manrope text-lg font-[700] text-white">V</span>}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <p>
                            <span className="rounded-full bg-[#2752a7] px-3 py-1 font-manrope text-sm font-[700] text-white">i</span>
                        </p>
                        <p className="font-manrope text-base text-menusecondary tracking-[1px] underline">Allergens & Nutrition</p>
                    </div>
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
                <div className={cn("flex w-full flex-col gap-5 md:w-2/3", item?.modifiers.length === 0 && "hidden w-0")}>
                    {item?.modifiers.map((mod, index) => {
                        return (
                            <div className="w-full bg-itembackground p-5" key={index}>
                                <div className="flex flex-col items-start justify-center gap-2 border-b-[0.1px] border-b-menuprimary py-3">
                                    <div className="flex items-center justify-start gap-5">
                                        <Triangle fill="#AA8B55" className="rotate-90 text-menuprimary" />
                                        <p className="font-manrope text-xl font-[700] leading-none tracking-[1px] text-menusecondary">{mod.header}</p>
                                    </div>
                                    {mod.required ? (
                                        <p className="font-manrope text-base font-[500] leading-none tracking-[1px] text-menusecondary">
                                            Select any options (Minimum One)
                                        </p>
                                    ) :
                                        (
                                            <p className="font-manrope text-base font-[500] leading-none tracking-[1px] text-menusecondary">
                                                Addons are optional.
                                            </p>
                                        )
                                    }
                                </div>
                                {
                                    mod.multiSelection ? (
                                        item && GetModifiersFromItemId(item, items, index).length > 0 && (
                                            <div>
                                                {GetModifiersFromItemId(item, items, index).map((modifier) => (
                                                    <div className="flex items-center justify-between gap-5 border-b-[1px] border-b-menuprimary py-5" key={modifier._id}>
                                                        <div className="flex items-center justify-center gap-5">
                                                            <Checkbox
                                                                id={modifier._id}
                                                                checked={selectedModifiers.some((m) => m._id === modifier._id)}
                                                                onCheckedChange={(checked) => handleModifierChange(modifier, checked as boolean)}
                                                                className="h-6 w-6 border-menuprimary"
                                                            />
                                                            <div className="flex flex-col items-start justify-center">
                                                                <Label htmlFor={modifier._id} className="items-center gap-2 text-lg font-[700] text-menusecondary">
                                                                    {modifier.name}
                                                                </Label>
                                                                <Label htmlFor={modifier._id} className="items-center gap-2 font-manrope text-base font-[400] text-menusecondary">
                                                                    {modifier.description}
                                                                </Label>
                                                            </div>
                                                        </div>

                                                        <div className="w-fit flex justify-center items-center gap-5">
                                                            {modifierquantity(modifier) > 0 && mod.extraAllowed && (
                                                                <div className="flex gap-3 items-center justify-center">
                                                                    <Button
                                                                        className="rounded-full border-[2px] border-menusecondary bg-transparent p-0 px-2 py-0 text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
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
                                                                    </Button>
                                                                    <p className="text-base text-menuprimary font-[500]">
                                                                        {
                                                                            modifierquantity(modifier)
                                                                        }
                                                                    </p>
                                                                    <Button
                                                                        className="rounded-full border-[2px] border-menusecondary bg-transparent p-0 px-2 py-0 text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                                                                        onClick={() => {
                                                                            setSelectedModifiers((prev) => [...prev, modifier]);
                                                                        }}
                                                                    >
                                                                        <Plus className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            )}
                                                            <p className="font-manrope text-lg font-[700] tracking-[1px] text-menuprimary">
                                                                {modifier.price &&
                                                                    modifier.price.value > 0 ?
                                                                    `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`
                                                                    :
                                                                    "FREE"
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        item && GetModifiersFromItemId(item, items, index).length > 0 && (
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
                                                        <div className="flex items-center justify-between gap-5 border-b-[1px] border-b-menuprimary py-5" key={modifier._id}>
                                                            <div className="flex items-center justify-center gap-5">
                                                                <RadioGroupItem
                                                                    id={modifier._id}
                                                                    value={modifier._id}
                                                                    className="h-6 w-6 border-menuprimary"
                                                                />
                                                                <div className="flex flex-col items-start justify-center">
                                                                    <Label htmlFor={modifier._id} className="items-center gap-2 text-lg font-[700] text-menusecondary">
                                                                        {modifier.name}
                                                                    </Label>
                                                                    <Label htmlFor={modifier._id} className="items-center gap-2 font-manrope text-base font-[400] text-menusecondary">
                                                                        {modifier.description}
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                            <p className="font-manrope text-lg font-[700] tracking-[1px] text-menuprimary">
                                                                {modifier.price &&
                                                                    modifier.price.value > 0 ?
                                                                    `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`
                                                                    :
                                                                    "FREE"
                                                                }
                                                            </p>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="fixed bottom-0 right-0 z-40 flex h-fit w-full items-center justify-center gap-10 bg-menuforeground py-5 pr-[14%]">
                <div className="flex items-center justify-center gap-5">
                    <button
                        className="rounded-full border-[2px] border-menusecondary bg-transparent px-1 py-1 text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                        onClick={() => {
                            setQuantity((prev) => Math.max(prev - 1, 1));
                        }}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <p className="font-manrope text-5xl font-[600] text-menuprimary">{quantity && quantity}</p>
                    <button
                        className="rounded-full border-[2px] border-menusecondary bg-transparent px-1 py-1 text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                        onClick={() => {
                            setQuantity((prev) => prev + 1);
                        }}
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <Button
                    className="relative flex w-[400px] items-center justify-between bg-menuprimary px-5 py-7 font-manrope text-lg font-[700] text-menuforeground hover:bg-buttonhover rounded-none"
                    onClick={() => {
                        if (!cartItem || !item) {
                            toast.error("Cart item not found");
                            return;
                        }

                        // Convert selected modifiers to CartItemModifier format
                        const modifiers: CartItemModifier[] = selectedModifiers.map((mod) => ({
                            _idModifiers: item.modifiers[0]?._id ?? "",
                            _idMenuItem: mod._id,
                            price: mod.price,
                        }));

                        // Create updated item while preserving the original item's properties
                        const updatedItem: CartItem = {
                            ...cartItem,
                            quantity,
                            price: {
                                value: price ?? 0,
                                currency: item.price.currency,
                            },
                            notes: note,
                            modifiers,
                        };

                        updateItem(updatedItem, cartItemIndex);
                        toast.success("Item updated");
                        router.push("/menu");
                    }}
                >
                    <span className="absolute -top-2 left-4">
                        <Triangle fill="#fbead2" className="rotate-180 text-menusecondary" />
                    </span>
                    <span className="font-bold">UPDATE ITEM</span>
                    <span>
                        {item && getCurrencySymbol(item.price.currency)} {price && formattedItemPrice(price)}
                    </span>
                </Button>
            </div>
        </section>
    );
};

export default MenuItems;
