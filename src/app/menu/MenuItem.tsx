"use client";

import MenuChoosing from "@/components/popups/MenuChoosing";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { GetModifiersFromItemId } from "@/lib/get-modifiers-from-item-id";
import { isRestaurantOpen } from "@/lib/is-restaurant-open";
import type { MenuItem } from "@/types/menu";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function MenuItem({ item }: { item: MenuItem }) {
    const { items, restaurant } = useRestaurant();
    const { cartItems } = useCart();
    const isOpen = isRestaurantOpen(restaurant);

    return (
        <div className="flex w-full flex-col items-center justify-between gap-4 bg-itembackground p-4">
            <Link className="flex w-full flex-row justify-between gap-4" href={`/menu/${item._id}`}>
                <div>
                    <p className="text-lg font-bold text-white">
                        {item.name} {item.isVeg && <span className="rounded-full bg-[#46f781] px-2 py-1 text-sm text-white">V</span>}
                    </p>
                    <p className="line-clamp-2 text-sm text-itemdescription">{item.description}</p>
                </div>
                <div>
                    {!item.extras.hideMenuThumbNailImages && item.images.length > 0 ? (
                        <Image src={item.images[0]!} className="max-h-28 min-h-28 min-w-28 max-w-28 object-cover" alt={item.name} width={1980} height={1080} />
                    ) : (
                        <div className="h-28 w-28 rounded-md"></div>
                    )}
                </div>
            </Link>
            <div className="flex w-full flex-row items-center justify-between gap-4">
                <Link className="rounded-3xl bg-menusecondary-foreground p-2 px-2 py-1 tracking-[1px] text-menuprimary" href={`/menu/${item._id}`}>
                    {item.takeawayPrice.value > 0 ? (
                        <>
                            {getCurrencySymbol(item.takeawayPrice.currency)} {formattedItemPrice(item.takeawayPrice.value)}
                        </>
                    ) : (
                        <>
                            {item.price.value > 0 ? (
                                <>
                                    {getCurrencySymbol(item.price.currency)} {formattedItemPrice(item.price.value)}
                                </>
                            ) : (
                                <>
                                    {item.modifiers.length === 0 ? (
                                        <>Free</>
                                    ) : (
                                        item.modifiers.map((mod, index) =>
                                            GetModifiersFromItemId(item, items, index).map((modifier) => {
                                                if (modifier._id === item.modifiers.find((modifier) => modifier.defaultSelection)?.defaultSelection) {
                                                    return `${getCurrencySymbol(modifier.price.currency)} ${modifier.price.value}`;
                                                }
                                            })
                                        )
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Link>
                {isOpen &&
                    item.extras?.availability?.days.includes(format(Date.now(), "EEEE").toLowerCase()) &&
                    item.extras?.menuItemOrderType === "both" &&
                    (cartItems.find((cart) => cart._idMenuItem === item._id)?._idMenuItem === item._id ? (
                        item && (
                            <MenuChoosing item={item}>
                                <Button variant="secondary" className="rounded-none bg-menuprimary px-8 text-lg font-bold text-menuforeground hover:bg-menuprimary">
                                    Add
                                </Button>
                            </MenuChoosing>
                        )
                    ) : (
                        <Link href={`/menu/${item._id}`}>
                            <Button variant="secondary" className="rounded-none bg-menuprimary px-8 text-lg font-bold text-menuforeground hover:bg-menuprimary">
                                Add
                            </Button>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
