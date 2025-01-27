import MenuItemDrawer from "@/components/drawer/MenuItemDrawer";
import MenuChoosing from "@/components/popups/MenuChoosing";
import MenuItemMinus from "@/components/popups/MenuItemMinus";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { BetaMenuActive } from "@/lib/constants";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { getMenuItemById } from "@/lib/get-menu-item-by-id";
import { GetModifiersFromItemId } from "@/lib/get-modifiers-from-item-id";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/menu";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState, type FC } from "react";
import { isRestaurantOpen } from "@/lib/is-restaurant-open";

interface MenuItemProps {
    id: string;
}

const MenuItemMobile: FC<MenuItemProps> = ({ id }) => {
    const { items, restaurant } = useRestaurant();
    const { cartItems } = useCart();
    const item = getMenuItemById(id, items);
    const [open, setOpen] = useState(false);
    const isOpen = isRestaurantOpen(restaurant);

    console.log(open);

    const getcartitem = (item: MenuItem) => {
        const cartitem = cartItems.filter((cartItem) => cartItem._idMenuItem === item._id);
        return cartitem[cartitem.length - 1]?.quantity;
    };

    return (
        item && (
            <section className="z-10 flex h-fit w-full flex-row items-center overflow-hidden bg-itembackground px-4 py-4">
                <div
                    className={cn(
                        "flex w-[60%] flex-col items-start justify-between gap-4 py-[1rem] md:flex-row",
                        (item.extras.hideMenuThumbNailImages || !item.images[0]) && "w-full"
                    )}
                >
                    <div className="flex w-full flex-col gap-2">
                        <MenuItemDrawer item={item} setChoose={setOpen}>
                            <h2 className="font-inter w-full text-xl font-[600] capitalize leading-[150%] tracking-[1px] text-white">{item.name}</h2>
                        </MenuItemDrawer>
                        <MenuItemDrawer item={item} setChoose={setOpen}>
                            <p className="line-clamp-3 w-[95%] text-sm font-medium lowercase text-itemdescription" style={{ wordSpacing: "0.10rem" }}>
                                {item.description}
                            </p>
                        </MenuItemDrawer>
                        <div className={cn("justify-start", (item.extras.hideMenuThumbNailImages || !item.images[0]) && "flex w-full items-center justify-between pr-8")}>
                            <MenuItemDrawer item={item} setChoose={setOpen}>
                                <p className="mt-3 w-fit rounded-3xl bg-menusecondary-foreground p-2 px-3 py-3 text-base font-medium leading-[80%] tracking-[1px] text-menuprimary">
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
                                </p>
                            </MenuItemDrawer>
                            {isOpen && (
                                <div className={cn("hidden", (item.extras.hideMenuThumbNailImages || !item.images[0]) && "flex items-center justify-center")}>
                                    {cartItems.find((cartItem) => cartItem._idMenuItem === item._id) === undefined ? (
                                        <MenuItemDrawer item={item} setChoose={setOpen}>
                                            <Button
                                                className={cn(
                                                    "bottom-2 w-fit rounded-none bg-menuprimary py-5 text-[1.25rem] font-medium leading-[80%] text-menuforeground hover:bg-menuprimary",
                                                    !BetaMenuActive && "hidden"
                                                )}
                                            >
                                                Add
                                            </Button>
                                        </MenuItemDrawer>
                                    ) : (
                                        <div className="flex h-fit w-fit items-center gap-3 bg-menuprimary p-2 text-menuforeground">
                                            <MenuItemMinus item={item}>
                                                <Button
                                                    className={cn("h-fit w-fit rounded-full bg-transparent p-0 hover:bg-transparent", !BetaMenuActive && "hidden")}
                                                    // onClick={() => {
                                                    //   if (
                                                    //     cartItems.find(
                                                    //       (cartItem) => cartItem._idMenuItem === item._id,
                                                    //     )!.quantity <= 1
                                                    //   ) {
                                                    //     return removeItem(item._id);
                                                    //   }
                                                    //   if (cartitem?.quantity) {
                                                    //     updateItem(
                                                    //       {
                                                    //         ...cartitem,
                                                    //         quantity: cartitem?.quantity - 1,
                                                    //       },
                                                    //       0,
                                                    //     );
                                                    //   }
                                                    // }}
                                                >
                                                    <Minus className="text-menuforeground" />
                                                </Button>
                                            </MenuItemMinus>
                                            {getcartitem(item)}
                                            <MenuChoosing item={item}>
                                                <Button
                                                    className="h-fit w-fit rounded-full bg-transparent p-0 hover:bg-transparent"
                                                    // onClick={() => {
                                                    //   if (cartitem?.quantity) {
                                                    //     updateItem(
                                                    //       {
                                                    //         ...cartitem,
                                                    //         quantity: cartitem?.quantity + 1,
                                                    //       },
                                                    //       0,
                                                    //     );
                                                    //   }
                                                    // }}
                                                >
                                                    <Plus className="text-menuforeground" />
                                                </Button>
                                            </MenuChoosing>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cn("relative z-10 flex h-full w-[40%] py-4", (item.extras.hideMenuThumbNailImages || !item.images[0]) && "hidden")}>
                    {!item.extras.hideMenuThumbNailImages && item.images.length > 0 && (
                        <Image src={item.images[0]!} width={1980} height={1080} alt={item.name} className="z-10 aspect-square h-auto w-full rounded-xl object-cover" />
                    )}
                    {isOpen && (
                        <div
                            className={cn("absolute -bottom-2 z-50 flex w-full items-center justify-center", (item.extras.hideMenuThumbNailImages || !item.images[0]) && "hidden")}
                        >
                            {cartItems.find((cartItem) => cartItem._idMenuItem === item._id) === undefined ? (
                                <MenuItemDrawer item={item} setChoose={setOpen}>
                                    <Button
                                        className={cn(
                                            "bottom-2 w-fit rounded-none bg-menuprimary text-[1.25rem] font-medium leading-[80%] text-menuforeground hover:bg-menuprimary",
                                            !BetaMenuActive && "hidden"
                                        )}
                                    >
                                        Add
                                    </Button>
                                </MenuItemDrawer>
                            ) : (
                                <div className="flex h-fit w-fit items-center gap-3 bg-primary p-2 text-menuforeground">
                                    <MenuItemMinus item={item}>
                                        <Button
                                            className={cn("h-fit w-fit rounded-full bg-transparent p-0 hover:bg-transparent", !BetaMenuActive && "hidden")}
                                            // onClick={() => {
                                            //   if (
                                            //     cartItems.find(
                                            //       (cartItem) => cartItem._idMenuItem === item._id,
                                            //     )!.quantity <= 1
                                            //   ) {
                                            //     return removeItem(item._id);
                                            //   }
                                            //   if (cartitem?.quantity) {
                                            //     updateItem(
                                            //       {
                                            //         ...cartitem,
                                            //         quantity: cartitem?.quantity - 1,
                                            //       },
                                            //       0,
                                            //     );
                                            //   }
                                            // }}
                                        >
                                            <Minus className="text-menuforeground" />
                                        </Button>
                                    </MenuItemMinus>
                                    {getcartitem(item)}
                                    <MenuChoosing item={item}>
                                        <Button
                                            className="h-fit w-fit rounded-full bg-transparent p-0 hover:bg-transparent"
                                            // onClick={() => {
                                            //   if (cartitem?.quantity) {
                                            //     updateItem(
                                            //       {
                                            //         ...cartitem,
                                            //         quantity: cartitem?.quantity + 1,
                                            //       },
                                            //       0,
                                            //     );
                                            //   }
                                            // }}
                                        >
                                            <Plus className="text-menuforeground" />
                                        </Button>
                                    </MenuChoosing>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        )
    );
};

export default MenuItemMobile;
