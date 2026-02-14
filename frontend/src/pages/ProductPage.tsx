import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import type { Product } from "../types/Product";
import styles from "../styles/ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <Layout>
        <div className={styles.loading}>Loading product details...</div>
      </Layout>
    );

  if (!product) {
    return (
      <Layout>
        <div className={styles.notFound}>
          <h2>Product not found</h2>
          <Link to="/" className={styles.backLink}>
            ← Back to shop
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to shop
        </Link>
        <div className={styles.content}>
          <div className={styles.imageArea}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.mainImage}
              onError={(e) =>
                (e.currentTarget.src = "https://via.placeholder.com/600")
              }
            />
            <span className={styles.categoryTag}>{product.category}</span>
          </div>

          <div className={styles.details}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.description}>
              {product.description ||
                `Premium quality ${product.name} built for performance and style.`}
            </p>

            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price}</span>
            </div>

            <button
              className={styles.addToCartBtn}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
