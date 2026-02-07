import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";
import styles from "../styles/ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  onViewProduct?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Featured Products",
  subtitle = `${products.length} products`,
  onViewProduct,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onView={onViewProduct}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
