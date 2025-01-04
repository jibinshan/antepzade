"use client";
import type { CartItem } from "@/types/cart-item.type";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  cartSheetOpen: boolean;
  setCartSheetOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartValue: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart) as CartItem[]);
    }
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (initialLoad) return;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, initialLoad]);

  const addItem = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i._idMenuItem === item._idMenuItem,
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i._idMenuItem === item._idMenuItem ? item : i,
        );
      }
      return [...prevItems, item];
    });
  };

  const cartValue = () => {
    return parseFloat(
      cartItems
        .reduce((acc, item) => {
          return acc + item.price.value;
        }, 0)
        .toFixed(2),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._idMenuItem !== id),
    );
  };

  const updateItem = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._idMenuItem === id ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        cartSheetOpen,
        setCartSheetOpen,
        cartValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
