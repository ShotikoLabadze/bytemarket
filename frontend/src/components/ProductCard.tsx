import React from "react";
import type { Product } from "../types/Product";
import styles from "../styles/ProductCard.module.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <span className={styles.categoryTag}>{product.category}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.cardFooter}>
          <span className={styles.price}>${product.price}</span>
          <button className={styles.viewBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        <Link to={`/product/${product._id}`}>View Product</Link>
      </div>
    </div>
  );
};

export default ProductCard;
