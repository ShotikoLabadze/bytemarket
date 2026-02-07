import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import type { Product } from "../types/Product";
import api from "../api/axios";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductGrid
        products={products}
        title="Latest Products"
        subtitle={`${products.length} products`}
      />
    </div>
  );
};

export default HomePage;
