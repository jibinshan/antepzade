import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface CartSheetProps {
    children: React.ReactNode;
}

const CartSheet: FC<CartSheetProps> = ({ children }) => {
    const {
        cartSheetOpen,
        setCartSheetOpen,
        cartValue,
        cartItems,
        updateItem,
        removeItem,
    } = useCart();
    return (
        <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="h-screen">
                <SheetHeader>
                    <SheetTitle className="flex items-end gap-4 font-playfair text-3xl font-normal leading-[80%]">
                        Cart
                        <span className="font-manrope text-base leading-[80%]">
                            ({cartItems.length || 0})
                        </span>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex h-full w-full flex-col justify-between pb-4">
                    <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-scroll py-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={item._idMenuItem}
                                className={`flex max-h-[150px] w-full items-center justify-between gap-2 py-4 ${index !== cartItems.length - 1
                                        ? "border-b border-[#BC995D66]"
                                        : ""
                                    }`}
                            >
                                <div className="flex gap-2">
                                    {item.images[0] && (
                                        <Image
                                            src={item.images[0]}
                                            width={1980}
                                            height={1080}
                                            alt={item.name}
                                            className="aspect-square h-full w-full max-w-[60px]"
                                        />
                                    )}
                                    <div className="flex flex-col items-start justify-between">
                                        <p className="">{item.name}</p>
                                        <p>£ {item.price.value}</p>
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

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="w-full justify-between" asChild>
                                <Link href="/checkout">
                                    Checkout
                                    <span className="font-semibold text-[#282828]">
                                        £ {cartValue()}
                                    </span>
                                </Link>
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
