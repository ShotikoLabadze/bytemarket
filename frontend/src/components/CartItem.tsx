import styles from "../styles/CartItem.module.css";

export interface CartItemData {
  productId: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  gradient?: string;
  icon?: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <div
        className={styles.itemImage}
        style={{ background: item.gradient || "#333" }}
      >
        {item.icon || "📦"}
      </div>
      <div className={styles.itemDetails}>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.itemCategory}>{item.category}</div>
      </div>
      <div className={styles.itemControls}>
        <div className={styles.quantityControl}>
          <button
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.productId, item.qty - 1)}
          >
            −
          </button>
          <span className={styles.qtyValue}>{item.qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.productId, item.qty + 1)}
          >
            +
          </button>
        </div>
        <span className={styles.itemPrice}>${item.price * item.qty}</span>
        <button
          className={styles.removeBtn}
          onClick={() => onRemoveItem(item.productId)}
        >
          <svg
            className={styles.removeBtnIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
