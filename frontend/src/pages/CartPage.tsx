import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const { cart, totalPrice, incrementQty, decrementQty, removeFromCart } =
    useCart();

  const subtotal = totalPrice;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 29;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (id: string, newQty: number) => {
    const item = cart.find((i) => i.productId === id);
    if (!item) return;

    if (newQty > item.qty) {
      incrementQty(id);
    } else if (newQty < item.qty) {
      decrementQty(id);
    }
  };

  return (
    <Layout>
      <div className={styles.cartPage}>
        <h1 className={styles.pageTitle}>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
            <p>Add some products to get started</p>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.itemsList}>
              {cart.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={removeFromCart}
                />
              ))}
            </div>

            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal</span>
                  <span className={styles.summaryValue}>${subtotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryValue}>
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Tax</span>
                  <span className={styles.summaryValue}>${tax}</span>
                </div>
                <div className={styles.divider} />
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
              <div className={styles.secureNote}>
                <svg
                  className={styles.secureIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
