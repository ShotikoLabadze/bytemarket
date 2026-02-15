import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import type { Product } from "../types/Product";
import api from "../api/axios";
import styles from "../styles/HomePage.module.css";

interface HomePageProps {
  searchQuery: string;
}

const HomePage = ({ searchQuery }: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [availableCategories, setAvailableCategories] = useState<string[]>([
    "All",
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (products.length === 0) setLoading(true);

        const params = new URLSearchParams();
        if (selectedCategory !== "All")
          params.append("category", selectedCategory);
        if (sortOrder !== "default") params.append("sort", sortOrder);

        let url = "/products";
        if (searchQuery) {
          url = "/products/search";
          params.append("term", searchQuery);
        }

        const { data } = await api.get(`${url}?${params.toString()}`);
        setProducts(data);

        if (availableCategories.length === 1 && data.length > 0) {
          const { data: fullList } = await api.get("/products");
          const uniqueCats = [
            "All",
            ...new Set(fullList.map((p: any) => p.category)),
          ];
          setAvailableCategories(uniqueCats as string[]);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortOrder, searchQuery]);
  if (loading && products.length === 0) {
    return <div className={styles.loader}>Loading amazing tech...</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.filterBar}>
        <div className={styles.selectGroup}>
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label>Price</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {products.length === 0 && !loading ? (
        <div className={styles.noResults}>
          <h3>No products found in this category.</h3>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSortOrder("default");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <ProductGrid
          products={products}
          title={
            searchQuery
              ? `Search: "${searchQuery}"`
              : selectedCategory === "All"
                ? "Latest Products"
                : selectedCategory
          }
          subtitle={`${products.length} products found`}
        />
      )}
    </div>
  );
};

export default HomePage;
