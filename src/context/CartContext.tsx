import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Medicine } from "../pages/medicine page/MedicinesPage";

type CartItem = Medicine & { quantity: number };

interface CartContextProps {
  cart: CartItem[];
  addToCart: (medicine: Medicine, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromLocalStorage());

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const addToCart = (medicine: Medicine, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === medicine._id);
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...medicine, quantity }];
        return newCart;
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
