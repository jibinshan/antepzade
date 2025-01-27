"use client";
import { useState, type FC } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import type { MenuItem } from "@/types/menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";

interface MenuChoosingProps {
    children: React.ReactNode;
    item: MenuItem;
}

const MenuItemMinus: FC<MenuChoosingProps> = ({ children, item }) => {

    const [open, setOpen] = useState(false);
    const { cartItems } = useCart();
    const { items } = useRestaurant();
    const cartitem = cartItems.filter((items) => items._idMenuItem === item._id);
    const modifiers = cartitem[cartitem.length - 1]?.modifiers;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[625px] w-[90%] flex flex-col gap-3 bg-menubackground p-0 md:w-[625px]">
                <DialogHeader className="px-5 py-5">
                    <DialogTitle>
                        <p className="text-menusecondary">{item.name}</p>
                    </DialogTitle>
                    <p className="text-menusecondary">If you want to decrease Redirect to cart. </p>
                </DialogHeader>
                <div className="px-5">
                    <div className="rounded-xl bg-menuforeground px-5 py-6">
                        <p className="flex items-center justify-start gap-1 font-manrope text-menusecondary text-sm">
                            {item.name}:&nbsp;
                            {modifiers?.map((mod) => {
                                const modifier = items.find((item) => item._id === mod._idMenuItem)?.name;
                                return <span key={mod._idMenuItem}>{modifier}</span>;
                            })}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex w-full items-center justify-center gap-4 px-5 py-5">
                        <Button variant="outline" onClick={() => setOpen(false)} className="w-1/2 text-menusecondary md:hidden">
                            Cancel
                        </Button>

                        <Link href='/cart' className="w-1/2">
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                }}
                                className="w-full bg-menuprimary text-menuforeground hover:bg-buttonhover"
                            >
                                Go To Cart
                            </Button>
                        </Link>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default MenuItemMinus