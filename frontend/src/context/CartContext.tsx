import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  totalPrice: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.productId === item.productId);
      if (exist) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
    } else {
      setCart((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, qty } : i)),
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
