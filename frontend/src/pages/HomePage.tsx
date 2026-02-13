import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import type { Product } from "../types/Product";
import api from "../api/axios";

interface HomePageProps {
  searchQuery: string;
}

const HomePage = ({ searchQuery }: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          color: "var(--text-dim)",
        }}
      >
        Loading amazing tech...
      </div>
    );
  }

  return (
    <div>
      <ProductGrid
        products={filteredProducts}
        title={searchQuery ? `Search: "${searchQuery}"` : "Latest Products"}
        subtitle={
          searchQuery
            ? `${filteredProducts.length} results found`
            : `${products.length} products total`
        }
      />
    </div>
  );
};

export default HomePage;
