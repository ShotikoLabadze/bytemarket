import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";

interface CartItem extends Product {
  productId: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalPrice(total);
  }, [cart]);

  const addToCart = (item: Product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.productId === item._id);
      if (exists) {
        return prev.map((i) =>
          i.productId === item._id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [...prev, { ...item, productId: item._id, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.productId !== id));

  const incrementQty = (id: string) =>
    setCart((prev) =>
      prev.map((i) => (i.productId === id ? { ...i, qty: i.qty + 1 } : i)),
    );

  const decrementQty = (id: string) =>
    setCart((prev) =>
      prev.map((i) =>
        i.productId === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i,
      ),
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
